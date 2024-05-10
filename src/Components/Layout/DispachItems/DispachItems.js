import React from 'react';
import { connect } from 'react-redux';

//app components
import { setLists } from 'Connectors/Redux/Actions/Lists/Lists';
import _ from 'lodash';
import API from 'Connectors/API';

//items
import Dialog from './Dialog';
import Confirmation from './Confirmation';

const initialState = () => ({
    dialogs: [],
    confirmation: {}
})

class DispachItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState();
    }

    componentDidMount(){
        if (this.props.state.dialog.key){
            this.setState({dialogs: this.props.state.dialog.items});
        }

        if (this.props.state.confirmation.key && this.props.state.confirmation.open){
            this.setState({confirmation: this.props.state.confirmation});
        }

        this.setDefaults()
    }

    componentDidUpdate(prevProps){
        if (prevProps?.state?.dialog?.key !== this?.props?.state?.dialog?.key){
            this.setState({dialogs: this?.props?.state?.dialog?.dialogs})
        }
        if (prevProps?.state?.confirmation?.key !== this.props?.state?.confirmation?.key){
            this.setState({confirmation: this.props.state.confirmation});
        }

    }

    setDefaults = () => {
        let lists = [ 'users', 'reasons', 'dice' ]
        Promise.all(
            _.map(lists, i => API.get(`/lists/${i}`))
        ).then(res => {
            _.each(lists, (i,idx) =>{
                this.props.setLists(i,res[idx])
            })
        })
    }

    render() {
        const {dialogs, confirmation} = this.state;
        return (
            <>
                {dialogs && dialogs.length > 0 && dialogs.map(dialog => <Dialog dialog={dialog} />)}
                {confirmation && confirmation.show && <Confirmation confirmation={confirmation} />}
            </>
        )
    }

}


const mapDispatchToProps = (dispatch) => ({
    setLists: (k,v) => dispatch(setLists(k,v))
}) 

export default connect(null, mapDispatchToProps)(DispachItems);