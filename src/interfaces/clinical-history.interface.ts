export interface ClinicalRegistry {
    id?: string;
    patientId?:    string;
    background:   Field[];
    diagnoses:    Field[];
    treatments:   Field[];
    medications:  Field[];
    allergies:    Field[];
    observations: Field[];
    declaration:  Declaration;
    doctorId?: string
    hospitalId?: string
    createdAt?: Date
}

export interface Field {
    content: string;
}

export interface Declaration {
    content:   string;
    signature: string;
}
