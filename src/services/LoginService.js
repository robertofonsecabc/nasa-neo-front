import axios from "axios";
import {credentialKey} from "@/config/global";
import store from "../store"

class LoginService {

    /**
     * Receber um token e armazenar na sessão do usuário
     * @param tokenResponse
     */
    login(tokenResponse){

        axios.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.token}`
        localStorage.setItem(credentialKey, JSON.stringify( tokenResponse ))
        store.commit("login", tokenResponse)

    }

    logout(){

        axios.defaults.headers.common['Authorization'] = null
        localStorage.removeItem(credentialKey)
        store.commit("logout")

    }

    checkAuthentication() {
        if( !this.isAuthenticated() ){
            // Verificar o localStorage
            const storage = JSON.parse( localStorage.getItem(credentialKey) )
            if( storage != null ){
                store.commit('login', storage)
                return true
            }
        }
        return false;
    }

    isAuthenticated(){
        return store.getters.isAuthenticated
    }
}

export default new LoginService();
