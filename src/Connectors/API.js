import axios from "axios";
import Constants from "Constants";
import AuthHelper from "Helpers/AuthHelper";

const initialState = {
    baseURL: Constants.apiBaseRoot,
    timeout: Constants.apiTimeout,

    headers: {
        authToken: AuthHelper.getAuthToken()
    },

    responseType: "json",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true'
}

class API {
    constructor(){
        this.token = null;
        this.config = initialState;
    }

    get(url, data, config={}){
        this.#setConfig(config);
        return this.#run('get',url, data)
    }

    post(url, data, config={}){
        this.#setConfig(config);
        return this.#run('post',url, data)
    }

    //Static methods
    #run(method, url, data){

        let config = this.config;

        if (method === "get"){
            config.params = data;
        } else {
            config.data = data;
        }

        return axios({
            method: method,
            url: url,
            ...config
        }).then(res => res.data);
    }

    #setConfig(config){
        this.config={
            ...this.config,
            ...config
        }
    }
}

export default new API();