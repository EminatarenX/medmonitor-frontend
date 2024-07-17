import { StateCreator, create } from "zustand";
import { Patient } from "../interfaces/patient.interface";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { fetchService } from "../services";
import { GetPatientsByDoctorResponse } from "../services/fetch/responses/doctor/doctor.response";

export interface PatientState {
  patients: Record<string, Patient>;
  currentPatient: Patient | null;
  totalPatients: number;
  loading: boolean;
  addPatient: (patient: Patient) => Promise<void>;  
  // removePatient: (patientId: string) => void;
  getPatientsForDoctor: (limit?: number, offset?: number) => void;
  getPatient: (patientId: string) => void;
  // updatePatient: (patient: Patient) => void;
}

export const patientSlice: StateCreator<
  PatientState,
  [["zustand/immer", never]]
> = (set, get) => ({
  patients: {},
  totalPatients: 0,
  currentPatient: null,
  loading: false,

  addPatient: async (patient) => {
    try {
      const response = await fetchService.post<Patient>("/patient", {
        ...patient,
        birthDate: new Date(patient.birthDate),
      });
     
      set((state) => {
        state.patients[response.id!] = response;
      });

    } catch (error) {
      throw error;
    }
  },
   getPatientsForDoctor: async (limit: number = 6, offset: number = 1) => {
    set({ loading: true});
    try {
        const response = await fetchService.get<GetPatientsByDoctorResponse>(`/doctor/patients?limit=${limit}&offset=${offset}`);
        
        const patientsConverted = response.patients.reduce((acc, patient) => {
            acc[patient.id] = patient;
            return acc;
        }, {} as Record<string, Patient>)
        set(( state ) => {
            state.patients = patientsConverted;
            state.totalPatients = response.total;

        })
    } catch (error) {
        throw error;
    }finally{
        set({ loading: false});
    }
  },
  getPatient: async (patientId) => {
    set({ loading: true});
    try {
        const response = await fetchService.get<Patient>(`/patient/${patientId}`);
        set({ currentPatient: response });
    } catch (error) {
        throw error;
    }finally{
        set({ loading: false});
    }
  },
});

export const usePatientState = create<PatientState>()(
    devtools(immer(patientSlice))
)