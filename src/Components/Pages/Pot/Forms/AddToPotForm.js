import React from 'react';
import { connect } from 'react-redux';

//material ui
import { Grid, TextField, Box, Button } from '@mui/material';

//app components
import { handleChange, handleCurrancyChange } from 'Helpers/FormFunctions';
import API from 'Connectors/API';

//components
import Select from 'Components/Common/Inputs/Selects/Select';
import LoadingCircle from 'Components/Common/Loading/LoadingCircle';
import { deployConfirmation } from 'Connectors/Redux/Actions/Confirmation/ConfirmationActions';

const initialState = (props=null) => ({
    isLoading: true,
    formData: {
        pot: '20.00',
        payee: props?.user?.user?.id,
        reason: 1,
        notes: ''
    },
})

class AddToPotForm extends React.Component {
    constructor(props){
        super(props);

        this.state = initialState(props);

        //bindings
        this.handleChange = handleChange.bind(this);
        this.handleCurrancyChange = handleCurrancyChange.bind(this);
    }

    handleAddToPot = () => {
        this.setState({
            isLoading: true
        }, ()=>{
            API.post('/bank/pot', this.state.formData).then(res => {
                this.setState(initialState(this.props), this.props.closeDialog);
            })
        })
    }

    render() {

        const { isLoading, formData } = this.state;

        if (isLoading) {
            <LoadingCircle />
        }

        return (
            <Box pt={1}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            value={formData.pot}
                            name='pot'
                            onChange={this.handleChange}
                            onBlur={this.handleCurrancyChange}
                            InputProps={{ startAdornment: '£' }}
                            fullWidth
                            label='Amount'
                            type='number'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            onChange={this.handleChange}
                            name='payee'
                            fullWidth
                            options={
                                this.props.lists.users.map(i=>({
                                    value: i.id,
                                    label: i.name
                                }))
                            }
                            label='Payee'
                            value={formData.payee}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            onChange={this.handleChange}
                            options={
                                this.props.lists.reasons.map(i=>({
                                    value: i.id,
                                    label: i.name
                                }))
                            }
                            fullWidth
                            label='Reason'
                            name='reason'
                            value={parseInt(formData.reason)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={formData.notes}
                            name='notes'
                            onChange={this.handleChange}
                            fullWidth
                            placeholder='Additional notes'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant='contained'
                            disabled={
                                parseFloat(formData.pot) <= 0
                                || !formData.reason
                                || !formData.payee 
                            }
                            onClick={
                                ()=>this.props.deployConfirmation(
                                    'Are you sure you want to add to the pot?',
                                    this.handleAddToPot
                                )
                            }
                        >Add</Button>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    lists: state.lists
})

const mapDispatchToProps =  dispatch => ({
    deployConfirmation: (text, success) => dispatch(deployConfirmation(text, success)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddToPotForm);