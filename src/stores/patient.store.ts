import { StateCreator, create } from "zustand";
import { Patient } from "../interfaces/patient.interface";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { fetchService } from "../services";
import { GetPatientsResponse } from "../services/fetch/responses/doctor/doctor.response";

export interface PatientState {
  patients: Record<string, Patient>;
  currentPatient: Patient | null;
  totalPatients: number;
  loading: boolean;
  addPatient: (patient: Patient) => Promise<void>;
  addPatientByHospital: (patient: Patient) => Promise<void>;
  getPatientsForDoctor: (limit?: number, offset?: number) => void;
  getPatient: (patientId: string) => void;
  getPatientsHospital: (limit?: number, offset?: number) => void;
  filterPatients: (reference: string) => void;
}

export const patientSlice: StateCreator<
  PatientState,
  [["zustand/immer", never]]
> = (set, get) => ({
  patients: {},
  totalPatients: 0,
  currentPatient: null,
  loading: false,
  filterPatients: (reference) => {
    set((state) => {
      // Obtener los pacientes almacenados
      let patientsStored = Object.values(state.patients);
  
      // Filtrar los pacientes por apellido
      patientsStored = patientsStored.filter((patient) => {
        return patient.lastName.toLowerCase().includes(reference);
      });
  
      // Verificar si el filtro resultó en una lista vacía
      if (patientsStored.length === 0) {
        return { patients: {}, totalPatients: 0 };
      }
  
      // Convertir la lista filtrada a un objeto con el formato requerido
      const patientsConverted = patientsStored.reduce(
        (acc, patient) => {
          acc[patient.id!] = patient;
          return acc;
        },
        {} as Record<string, Patient>
      );
  
      // Calcular el total de pacientes filtrados
      const total = Object.keys(patientsConverted).length;
  
      // Actualizar el estado con los pacientes filtrados y el total
      return { totalPatients: total, patients: patientsConverted };
    });
  },  
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
  addPatientByHospital: async (patient) => {
    try {
      const response = await fetchService.post<Patient>("/patient/create", {
        ...patient,
        birthDate: new Date(patient.birthDate),
      });
      console.log(response);

      set((state) => {
        state.patients[response.id!] = response;
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getPatientsForDoctor: async (limit: number = 6, offset: number = 1) => {
    set({ loading: true });
    try {
      const response = await fetchService.get<GetPatientsResponse>(
        `/doctor/patients?limit=${limit}&offset=${offset}`
      );

      const patientsConverted = response.patients.reduce((acc, patient) => {
        acc[patient.id] = patient;
        return acc;
      }, {} as Record<string, Patient>);
      set((state) => {
        state.patients = patientsConverted;
        state.totalPatients = response.total;
      });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getPatient: async (patientId) => {
    set({ loading: true });
    try {
      const response = await fetchService.get<Patient>(`/patient/${patientId}`);
      set({ currentPatient: response });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getPatientsHospital: async (limit: number = 6, offset: number = 1) => {
    set({ loading: true });
    try {
      const response = await fetchService.get<GetPatientsResponse>(
        `/user/patients?limit=${limit}&offset=${offset}`
      );
      console.log(response);
      const patientsConverted = response.patients.reduce((acc, patient) => {
        acc[patient.id] = patient;
        return acc;
      }, {} as Record<string, Patient>);
      set((state) => {
        state.patients = patientsConverted;
        state.totalPatients = response.total;
      });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
});

export const usePatientState = create<PatientState>()(
  devtools(immer(patientSlice))
);
