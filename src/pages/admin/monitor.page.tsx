import { useEffect, useState } from "react"
import { Title } from "../../components/shared/text/title.component"
import { useMonitorState } from "../../stores/monitor/monitor.store"
import { GridContainer } from "../../components/shared/container/grid-container.component"
import MonitoredPatientCard from "../../components/shared/app/monitored-patient-card.component"

export const AdminMonitorPage = () => {
  const monitores = useMonitorState( state => state.monitors)
  const getMonitors = useMonitorState( state => state.findAllByHospital)
  const totalMonitors = useMonitorState( state => state.totalMonitors)
  const limit = 10
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(totalMonitors/ limit)
  useEffect(() => {

    const interval = setInterval( async () => {
      await getMonitors(limit, page)
    },10000)


    const init = async () => {
      await getMonitors(limit, page)
    }
    init()

    return () => {
      clearInterval(interval)
    }
  })
  return (
    <section className="m-5">
      <article>
        <Title value="Monitores" color="white" />
      </article>

       <section className="mt-5">
       <GridContainer>
          {
            !monitores ? (
              <div>
                No data to show
              </div>
            ) : Object.values(monitores).map( monitor => (
              <MonitoredPatientCard monitor={monitor} />
                
            ))
          }
        </GridContainer>
       </section>
    </section>
  )
}
