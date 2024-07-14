const especialidades = [
"Cardiología".toLowerCase(),
"Dermatología".toLowerCase(),
"Endocrinología".toLowerCase(),
"Gastroenterología".toLowerCase(),
"Geriatría".toLowerCase(),
"Ginecología".toLowerCase(),
"Hematología".toLowerCase(),
"Infectología".toLowerCase(),
"Nefrología".toLowerCase(),
"Neurología".toLowerCase(),
"Obstetricia".toLowerCase(),
"Oncología".toLowerCase(),
"Oftalmología".toLowerCase(),
"Ortopedia".toLowerCase(),
"Otorrinolaringología".toLowerCase(),
"Pediatría".toLowerCase(),
"Psiquiatría".toLowerCase(),
"Radiología".toLowerCase(),
"Reumatología".toLowerCase(),
"Urología".toLowerCase(),
"Anestesiología".toLowerCase(),
"Cirugía General".toLowerCase(),
"Cirugía Plástica".toLowerCase(),
"Medicina Interna".toLowerCase(),
"Medicina de Emergencias".toLowerCase(),
"Medicina Familiar".toLowerCase(),
"Patología".toLowerCase(),
"Neumología".toLowerCase(),
"Medicina Física y Rehabilitación".toLowerCase()
].sort()

const areas = [
"Urgencias".toLowerCase(),
"Cuidados Intensivos".toLowerCase(),
"Quirófano".toLowerCase(),
"Hospitalización".toLowerCase(),
"Consulta Externa".toLowerCase(),
"Radiología".toLowerCase(),
"Laboratorio".toLowerCase(),
"Farmacia".toLowerCase(),
"Unidad de Cuidados Intermedios".toLowerCase(),
"Sala de Partos".toLowerCase(),
"Neonatología".toLowerCase(),
"Terapia Física".toLowerCase(),
"Nutrición y Dietética".toLowerCase(),
"Salud Mental".toLowerCase(),
"Administración".toLowerCase(),
"Limpieza y Mantenimiento".toLowerCase(),
"Seguridad".toLowerCase(),
"Servicios Sociales".toLowerCase(),
"Servicios de Diagnóstico".toLowerCase(),
"Admisión y Registro".toLowerCase(),
"Cocina y Alimentación".toLowerCase(),
"Unidad de Trasplantes".toLowerCase(),
"Banco de Sangre".toLowerCase(),
"Epidemiología".toLowerCase(),
"Educación y Capacitación".toLowerCase()
].sort()

const formatPhoneNumber = (phone: string = '') => {
    if(phone.length < 10) return ''
    return phone.split('').map((letter, i) => i == 2 || i == 5 ? letter + " ": letter)

}

export const useHelpers = () => {
    const formatDate = (date: string) => {
        const returnData = new Date(date).toLocaleString();
        const dateReturned = returnData.split(", ")[0];
        const hourReturned = returnData.split(", ")[1];
        const hour = hourReturned.split(":")[0];
        const minutes = hourReturned.split(":")[1];
        const time = hourReturned.split(":")[2].split(" ")[1]
        return `${dateReturned} a las ${hour}:${minutes} ${time}`;
      }
    
    return {
        formatDate,
        especialidades,
        areas,
        formatPhoneNumber   
    }
}