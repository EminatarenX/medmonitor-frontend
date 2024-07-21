export interface GetPatientRegistriesResponse {
    total: number;
    registries: ClinicalRegistry[];
  }
  
  export interface Registry {
    id:           string;
    patientId:    string;
    doctorId:     string;
    hospitalId:   string;
    createdAt:    Date;
    updatedAt:    Date;
    background:   Allergy[];
    diagnoses:    Allergy[];
    treatments:   Allergy[];
    medications:  Allergy[];
    allergies:    Allergy[];
    observations: Allergy[];
    declaration:  Declaration[]; // This is an array
  }
  
  export interface Allergy {
    id:               string;
    medicalHistoryId: string;
    content:          string;
  }
  
  export interface Declaration {
    id:               string;
    medicalHistoryId: string;
    content:          string;
    signature:        string;
    dateSigned:       Date;
  }
  
  // Assuming ClinicalRegistry looks like this:
  export interface ClinicalRegistry {
    id:           string;
    patientId:    string;
    doctorId:     string;
    hospitalId:   string;
    createdAt:    Date;
    updatedAt:    Date;
    background:   Allergy[];
    diagnoses:    Allergy[];
    treatments:   Allergy[];
    medications:  Allergy[];
    allergies:    Allergy[];
    observations: Allergy[];
    declaration:  Declaration; // This is a single object
  }
  