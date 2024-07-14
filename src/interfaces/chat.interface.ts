import { Message } from "./message.interface";

export interface Chat {
    id: string;
    patientId: string;
    doctorId: string;
    messages?: Message[];
}