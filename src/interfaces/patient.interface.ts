import { Doctor } from "./doctor.interface";

export interface Patient {
    id?: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: Date | string;
    password?: string;
    role?: string;
    gender: string;
    active?: boolean;
    address?: string;
    doctorId?: string;
    hospitalId?: string;
    createdAt?: Date;
    doctor? : Doctor;
  }