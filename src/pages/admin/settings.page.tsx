import { Title } from "../../components/shared/text/title.component"
import { SubTitle } from "../../components/shared/text/subtitle.component"
export const HospitalSettingsPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Title value="Configuración" color="white" />
      <SubTitle value="Próximamente" color="white" />
      <img src="/9.svg" alt="Ilustración de doctor" className="w-1/3" />
    </div>
  )
}
