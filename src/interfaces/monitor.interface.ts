
export interface Monitor {
    id:           string;
    doctorId:     string;
    patientId:    string;
    hospitalId:   string;
    channel: string
    createdAt:    Date;
    patient:      Patient;
    monitor_data: MonitorDatum[];
}

export interface MonitorDatum {
    id:        number;
    monitorId: string;
    bpm:       number;
    spo2:      number;
    createdAt: Date;
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
