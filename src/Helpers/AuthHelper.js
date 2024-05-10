
class AuthHelper {

    isLoggedIn(){
        if (this.#getUserToken()){
            return true;
        }
        return false;
    }

    setUserToken(token){
        this.#setLocalKey('userToken', token);
    }

    logOut(){
        this.#setLocalKey('userToken', null);
        window.location.reload();
    }

    getAuthToken(){
        let authToken = this.#getUserToken();
        authToken && this.isAuthTokenExpired();
        
        return authToken;
    }

    isAuthTokenExpired(){
        let token = localStorage.getItem('userToken');
        let dec = JSON.parse(atob(token.split(".")[1]));
        if (dec.exp * 1000 < Date.now()){
            this.logOut();
        }
    }

    //private methods
    #getUserToken(){
        return this.#getLocalKey('userToken');
    }

    #getLocalKey(key){
        return JSON.parse(localStorage.getItem(key));
    }

    #setLocalKey(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }

}

export default new AuthHelper()