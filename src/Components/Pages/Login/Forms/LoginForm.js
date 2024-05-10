import React from "react";

// material ui
import { Button, Grid, TextField } from "@mui/material";

//app imports
import API from 'Connectors/API';
import { setUser } from 'Connectors/Redux/Actions/User/User';
import { handleChange } from "Helpers/FormFunctions";
import { connect } from 'react-redux';

const initialState = () => ({
    isLoading: false,
    formData: {
        username: '',
        Password: '',
    }
})

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = initialState();

        this.handleChange = handleChange.bind(this);
    }

    login = () => {
        API.post('/auth/login', this.state.formData).then((response) => {
            if (!response.errors){
                this.props.setUser(
                    response.user,
                    response.jwt
                )
                this.props.setLoggedIn(1)
            }
        })
    }

    render() {

        const { username, password } = this.state.formData;

        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField 
                        name='username'
                        value={username}
                        onChange={this.handleChange}
                        label='Username'
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='Password'
                        type='password'
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant='contained'
                        color='primary'
                        disabled={!username || !password}
                        onClick={this.login}
                    >
                        Login
                    </Button>
                </Grid>
            </Grid>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    setUser: (user, jwt) => dispatch(setUser(user, jwt)),
})

export default connect(null, mapDispatchToProps)(LoginForm);