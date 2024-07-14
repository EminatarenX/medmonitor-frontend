export interface Doctor {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: Date;
  password?: string;
  role?: string;
  area: string;
  gender: string;
  experience?: string;
  education?: string;
  joinDate?: Date;
  specialty: string;
  active?: boolean;
  hospitalId?: string;
  createdAt?: Date;
}

//   patients patient[]
//   register register[]
//   appointment appointment[]
// {
//   "id": "b2cbbfa7-78f8-4e6c-878d-aa85130f9b5e",
//   "name": "eminataren2002@gmail.com",
//   "lastName": "Nataren Dele Rivero",
//   "email": "eminataren2002@gmail.com",
//   "phone": "9614497858",
//   "birthDate": "2000-01-01T00:00:00.000Z",
//   "password": "Sgijn^kkfnrt",
//   "role": "doctor",
//   "specialty": "neurología",
//   "area": "cocina y alimentación",
//   "gender": "M",
//   "active": true,
//   "joinDate": "2024-07-04T00:00:00.000Z",
//   "experience": "",
//   "education": "",
//   "hospitalId": "9854eb28-5044-4af5-9856-0d6b5433574a",
//   "createdAt": "2024-07-04T18:08:33.371Z"
// }