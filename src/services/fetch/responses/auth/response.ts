export interface RegisterResponse {
  id: string;
  email: string;
  token: null;
  active: boolean;
  createdAt: Date;
}

export interface ProfileResponse {
  user: User;
  access_token: string;
  id?: string
}

export interface User {
  id: string;
  email: string;
  token: null;
  active: boolean;
  createdAt: Date;
}
export interface LoginResponse {
  user: User;
  access_token: string;
}

export interface User {
  id: string;
  email: string;
  token: null;
  active: boolean;
  createdAt: Date;
}

export interface LoginDoctorResponse {
  user: User;
  access_token: string;
}

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: Date;
  role: string;
  specialty: string;
  area: string;
  gender: string;
  active: boolean;
  joinDate: Date;
  experience: string;
  education: string;
  hospitalId: string;
  createdAt: Date;
}

export interface PatientLoginResponse {
  user: User;
  access_token: string;
}

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  birthDate: Date;
  phone: string;
  role: string;
  address: string;
  gender: string;
  hospitalId: string;
  active: boolean;
  doctorId: string;
  createdAt: Date;
}
export interface GetPatientChatResponse {
    chat:     Chat;
    messages: any[];
}

export interface Chat {
    id:        string;
    patientId: string;
    doctorId:  string;
}
