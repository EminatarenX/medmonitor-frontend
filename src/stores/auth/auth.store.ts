import { StateCreator, create } from "zustand";
import { AuthStatus, Doctor, User } from "../../interfaces";
import { devtools, persist } from "zustand/middleware";
import { fetchService } from "../../services";
import { LoginDoctorResponse, LoginResponse, PatientLoginResponse, ProfileResponse } from "../../services/fetch/responses/auth/response";
import { Patient } from "../../interfaces/patient.interface";


interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User | Patient | Doctor;
    doctor?: Doctor;
    patient?: Patient;
    id?: string;

    loginHospital: (email: string, password: string) => Promise<void>;
    loginDoctor: (email: string, password: string) => Promise<void>;
    loginPatient: (id: string) => Promise<void>;
    checkAuthStatus: () => void
    checkDoctorAuthStatus: () => void
    checkPatientAuthStatus: () => void
    logout: () => void
}


export const authStore: StateCreator<AuthState> = (set) => ({
    status: 'pending',
    token: undefined,
    user: undefined,
    doctor: undefined,
    patient: undefined,
    id: undefined,

    loginHospital: async (email: string, password: string) => {
        try {
            const { access_token, user } = await fetchService.post<LoginResponse>('/auth/login',{password, email});
            set({ status: 'authorized', token: access_token, user})
        } catch (error) {
            set({ status: 'unauthorized', token: undefined, user: undefined});
            throw error;
        }
    },
    checkAuthStatus: async () => {
        try {
          const {access_token, user, id} = await fetchService.get<ProfileResponse>('/auth/profile');
            set( { status: 'authorized', token: access_token, user, id } );
        } catch ( error ) {
          set( { status: 'unauthorized', token: undefined, user: undefined } );
            throw 'unauthorized';
        } 
      },
    loginDoctor: async (email: string, password: string) => {
        try {
            const { access_token, user } = await fetchService.post<LoginDoctorResponse>('/auth/doctor/login', {email, password})

            set({ status: 'authorized', token: access_token, doctor: user})
        } catch (error) {
            set({ status: 'unauthorized', token: undefined, doctor: undefined});
            throw error;
        }

    },
    loginPatient: async (id: string) => {
        try {
            const { access_token, user } = await fetchService.post<PatientLoginResponse>('/auth/patient/login', {id})

            set({ status: 'authorized', token: access_token, patient: user})
        } catch (error) {
            set({ status: 'unauthorized', token: undefined, patient: undefined});
            throw error;
        }
    },
    checkPatientAuthStatus: async() => {
        try {
            const {access_token, user} = await fetchService.get<ProfileResponse>('/auth/patient/profile');
            set({ status: 'authorized', token: access_token, patient: user})
        } catch (error) {
            set({ status: 'unauthorized', token: undefined, patient: undefined});
            throw 'unauthorized';
        }
    },
    checkDoctorAuthStatus: async () => {
        try {
          const {access_token, user} = await fetchService.get<ProfileResponse>('/auth/doctor/profile');
            set( { status: 'authorized', token: access_token, doctor: user } );
        } catch ( error ) {
            set( { status: 'unauthorized', token: undefined, doctor: undefined } );
                throw 'unauthorized';
            }
    },
    logout: () => {
        set({ status: 'unauthorized', token: undefined, user: undefined});
    
    }
}) 

export const useAuthState = create<AuthState>()(
    devtools(
        persist(
            authStore,
            {name: 'auth-storage'}
        )
    )
);