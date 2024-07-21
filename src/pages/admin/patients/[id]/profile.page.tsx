import { useEffect } from "react"
import { usePatientState } from "../../../../stores/patient.store"
import { useParams } from "react-router-dom"
import { EmailRounded, PhoneRounded } from "@mui/icons-material"
import { useHelpers } from "../../../../hooks/helpers/useHelpers"
import { DarkCardContainer } from "../../../../components/shared/container/dark-card.component"
import { SubTitle } from "../../../../components/shared/text/subtitle.component"
import { FlexRowSection } from "../../../../components/shared/container/flex-row.component"
import { ClinicalRegistryComponent } from "../../../../components/shared/app/clinicalregistry"
import { useClinicalRegistryState } from "../../../../stores/medical-registry/clinical-registr.store"

export const PatientProfilePage = () => {
  const { id } = useParams()
  const patient = usePatientState( state => state.currentPatient)
  const getPatient = usePatientState(state => state.getPatient)
  const clinicalRegistries = useClinicalRegistryState( state => state.registries) 
  const getClinicalRegistries = useClinicalRegistryState( state => state.findAllPatientRegistries)
  
  const { formatPhoneNumber } = useHelpers()
  useEffect(() => {
    const init = async () => {
      await getPatient(id!)
      await getClinicalRegistries(id!)
    }
    init()
  },[])
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">

      <header className="border-b border-neutral-700 p-5">
        <h1 className="text-2xl font-semibold">Perfil del paciente</h1>
      </header>
      <div className="container mx-auto px-4">
        <section className="flex flex-col lg:flex-row my-8 gap-8">
          <article className="flex justify-center items-center rounded-lg bg-neutral-800 p-4 shadow-lg lg:w-1/3">
            <img
              src={'/patient.svg'}
              alt="doctor-image"
              className="w-64 h-64 object-cover rounded-full"
            />
          </article>
          <article className="lg:w-2/3">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-sky-400">
                {patient?.name} {patient?.lastName}
              </h2>

            </div>

            <div className="mt-4 flex flex-wrap gap-4">
              <span className="px-3 py-1 rounded-full bg-sky-900 text-sky-100">
                {patient?.gender === 'F' ? 'Mujer' : 'Hombre'}
              </span>
              <span className="px-3 py-1 rounded-full bg-green-900 text-green-100">
                {(patient?.address!)}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <PhoneRounded className="text-sky-400" />
                <span>+52 {formatPhoneNumber(patient?.phone)}</span>
              </div>
              <div className="flex items-center gap-3">
                <EmailRounded className="text-sky-400" />
                <span>{patient?.email}</span>
              </div>
            </div>
          </article>
        </section>
        
        <DarkCardContainer width="full" >
          <SubTitle value="Historial clinico" color="white" />
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!clinicalRegistries || Object.keys(clinicalRegistries).length === 0 ? (
            <div className="flex justify-center col-span-3">
              <span className="text-white col-span-3 text-center">No hay registros por mostrar</span>
            </div>
          ) : (
            Object.values(clinicalRegistries).map((registry) => (
              <ClinicalRegistryComponent clinicalRegistry={registry} />
            ))
          )}
        </section>
        </DarkCardContainer>
      </div>
    </div>
  )
}
