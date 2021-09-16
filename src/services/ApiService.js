import axios from "axios";

import {baseApiUrl} from "@/config/global";

class ApiService {

    login(loginForm){
        return axios['post'](`${baseApiUrl}/api/auth/signin` , loginForm)
    }

    register(registerForm){
        return axios['post'](`${baseApiUrl}/api/auth/signup` , registerForm)
    }

    getPotencialAsteroid(date){
        return axios['get'](`${baseApiUrl}/api/v1/potentially-hazardous-asteroid/${date}`)
    }

}

export default new ApiService();
