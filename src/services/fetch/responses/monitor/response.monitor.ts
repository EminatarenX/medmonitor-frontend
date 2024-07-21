export interface GetMonitorsResponse {
    total:    number;
    monitors: Monitor[];
}

export interface Monitor {
    id:           string;
    channel:      string;
    doctorId:     string;
    patientId:    string;
    hospitalId:   string;
    createdAt:    Date;
    patient:      Patient;
    monitor_data: any[];
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
}
