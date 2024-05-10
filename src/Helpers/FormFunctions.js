
//basic
export function handleChange (event) {
    console.log(event)
    this.setState({
        formData: {
            ...this.state.formData,
            [event?.target?.name]: event?.target?.value
        }   
    });
}


//situational
export function handleCurrancyChange (event) {
    this.setState({
        formData: {
            ...this.state.formData,
            [event?.target?.name]: parseFloat(event?.target?.value).toFixed(2)
        }   
    });
}
