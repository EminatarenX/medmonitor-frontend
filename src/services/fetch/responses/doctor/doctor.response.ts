export interface CreateDoctorResponse {
    id:         string;
    name:       string;
    lastName:   string;
    email:      string;
    phone:      string;
    birthDate:  Date;
    password:   string;
    role:       string;
    specialty:  string;
    area:       string;
    gender:     string;
    active:     boolean;
    joinDate:   Date;
    experience: string;
    education:  string;
    hospitalId: string;
    createdAt:  Date;
}
export interface GetDoctorsResponse {
    total:   number;
    doctors: Doctor[];
}

export interface Doctor {
    id:         string;
    name:       string;
    lastName:   string;
    email:      string;
    phone:      string;
    birthDate:  Date;
    password:   string;
    role:       string;
    specialty:  string;
    area:       string;
    gender:     string;
    active:     boolean;
    joinDate:   Date;
    experience: string;
    education:  string;
    hospitalId: string;
    createdAt:  Date;
}

export interface GetPatientsResponse {
    total:    number;
    patients: Patient[];
}

export interface GetPatientByHospitalResponse {
    total:    number;
    patients: Patient[];
}

export interface Patient {
    id:         string;
    name:       string;
    lastName:   string;
    email:      string;
    birthDate:  Date;
    phone:      string;
    role:       string;
    address:    string;
    gender:     string;
    hospitalId: string;
    doctorId:   string;
    active:     boolean;
    createdAt:  Date;
    doctor:     Doctor;
}


export interface Patient {
    id:         string;
    name:       string;
    lastName:   string;
    email:      string;
    birthDate:  Date;
    phone:      string;
    role:       string;
    address:    string;
    gender:     string;
    hospitalId: string;
    active:     boolean;
    doctorId:   string;
    createdAt:  Date;
}

