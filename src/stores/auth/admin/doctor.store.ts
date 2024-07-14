import { StateCreator, create } from "zustand";
import { Doctor } from "../../../interfaces";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { fetchService } from "../../../services";
import { IFormNewDoctor } from "../../../components/admin/doctors/newdoctorform.component";
import {
  CreateDoctorResponse,
  GetDoctorsResponse,
} from "../../../services/fetch/responses/doctor/doctor.response";

export interface DoctorState {
  doctors: Record<string, Doctor>;
  currentDoctor: Doctor | null;
  totalDoctors: number;
  loading: boolean;
  addDoctor: (doctor: IFormNewDoctor) => Promise<void>;
  removeDoctor: (doctorId: string) => void;
  getDoctors: (limit?: number, offset?: number) => void;
  getDoctor: (doctorId: string) => void;
  updateDoctor: (doctor: Doctor) => void;
}

export const doctorSlice: StateCreator<
  DoctorState,
  [["zustand/immer", never]]
> = (set) => ({
  doctors: {},
  totalDoctors: 0,
  currentDoctor: null,
  loading: false,

  addDoctor: async (data) => {
    try {
      const response = await fetchService.post<CreateDoctorResponse>(
        "/doctor",
        {
          ...data,
          joinDate: new Date(data.joinDate),
          birthDate: new Date(data.birthDate),
        }
      );
      set((state) => {
        state.doctors[response.id!] = response;
      });
    } catch (error) {
      throw error;
    }
  },
  removeDoctor: async (doctorId) => {
    try {
      await fetchService.delete(`/doctor/${doctorId}`);
      set((state) => {
        delete state.doctors[doctorId];
      });
      set({ currentDoctor: null });
      return true;
    } catch (error) {
      throw error;
    }
  },
  getDoctors: async (limit: number = 10, offset: number = 1) => {
    try {
      const response = await fetchService.get<GetDoctorsResponse>(
        `/doctor?limit=${limit}&offset=${offset}`
      );
      const doctorsConverted = response.doctors.reduce((acc, doctor) => {
        acc[doctor.id] = doctor;
        return acc;
      }, {} as Record<string, Doctor>);
      set((state) => {
        state.doctors = doctorsConverted;
        state.totalDoctors = response.total;
      });
    } catch (error) {
      throw error;
    }
  },
  getDoctor: async (doctorId) => {
    set({ currentDoctor: null, loading: true });
    try {
      const response = await fetchService.get<Doctor>(`/doctor/${doctorId}`);
      set({ currentDoctor: response });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateDoctor: async (doctor) => {
    const doctorToUpdate = {
      ...doctor,
      hospitalId: undefined,
      createdAt: undefined,
      active: undefined,
      role: undefined,
      id: undefined,
    };
    try {
      await fetchService.patch(`/doctor/${doctor.id}`, doctorToUpdate);
      set((state) => {
        state.doctors[doctor.id!] = doctor;
        state.currentDoctor = doctor;
      });
    } catch (error) {
      throw error;
    }
  },
});

export const useDoctorState = create<DoctorState>()(
  devtools(immer(doctorSlice))
);
