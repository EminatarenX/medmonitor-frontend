import { NewPatientForm } from "../../../components/admin/patients/newpatientform.component"


export const NewPatientPage = () => {

  return (
    <>

      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center  py-6 px-8 bg-neutral-800">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-100">
        Nuevo Paciente
        </h1>
        <p className="text-neutral-400 mt-2">
        Agrega un nuevo paciente al sistema para llevar registros del mismo
        </p>
      </div>
      
    </header>
      <div className="">
        <NewPatientForm/>
      </div>
      </>
  )
}
