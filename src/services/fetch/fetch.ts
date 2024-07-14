import axios,{ Axios } from "axios"
import { BACKEND_URL } from '../../env.d'
import { useAuthState } from "../../stores/auth/auth.store"

export class FetchService {
    private client: Axios
    constructor(){
        this.client = axios.create({
            baseURL: `${BACKEND_URL!}/api/v1`
        })

        this.client.interceptors.request.use( 
            config => {
                const token = useAuthState.getState().token
                if(token) {
                    config.headers.Authorization = `Bearer ${token}`
                }
                return config
            }
        )
    }

     async get<T>(path: string) {
        const response = await this.client.get<T>(path)
        return response.data
    }
    async getAuthorization(path: string, token: string) {
        const response = await this.client.get(path, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },

        })

        return response.data    
    }

    async post<T>(path: string, data: any) {
        const response = await this.client.post<T>(path, data)

        return response.data
    }

    async postAuthorization(path: string, data: any, token: string) {
        const response = await this.client.post(path, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }, data)

        return response
    }

    async delete(path: string) {
        const response = await this.client.delete(path)
        return response.data
    }
    async patch(path: string, data: any) {
        const response = await this.client.patch(path, data)
        return response.data
    }
}