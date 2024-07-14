
import { Title } from '../../../components/shared/text/title.component'
import { DarkCardContainer } from '../../../components/shared/container/dark-card.component'
import MonitoredPatientCard from '../../../components/shared/app/monitored-patient-card.component'
import { ArticleTitle } from '../../../components/shared/text/articletitle.component'
import { useEffect } from 'react'
import { useDoctorState } from '../../../stores/auth/admin/doctor.store'
import { useAuthState } from '../../../stores/auth/auth.store'
import { ChatContainer } from '../../../components/shared/container/chat-container.component'
import { useChatState } from '../../../stores/chat/chat.store'
import { socket } from '../../../stores/ws/websocket'
import { ModalVideoCall } from '../../../components/shared/app/modal-video-call.component'
import { useVideoCallState } from '../../../stores/chat/videocall.store'


export const PatientChatPage = () => {
    const getDoctorInformation = useDoctorState( state => state.getDoctor)
    const patient = useAuthState(state => state.patient)
    const doctor = useDoctorState( state => state.currentDoctor)
    const createChat = useChatState(state => state.createChat)
    const patientName = () => patient && patient.name + " " + patient.lastName; 
    const getPatientChat = useChatState(state => state.getPatientChat)
    const chat = useChatState(state => state.chat)
    const messages = useChatState(state => state.messages)
    const loading = useChatState(state => state.loading)
    const sendMessage = useChatState(state => state.sendMessage)
    const setNewMessage = useChatState(state => state.setNewMessage)
    const leaveCall = useVideoCallState(state => state.leaveCall)

    useEffect(() => {
        const getData = async () => {
            await getDoctorInformation(patient?.doctorId!)
            await getPatientChat(patient?.id!)
        }

        
        getData()
    },[])

    

    useEffect(() => {
        socket?.on('message-server', (message) => {
            setNewMessage(message)
        })
    
    })

    const handleInitializeChat = async () => {
        await createChat(patient?.doctorId!)
    }

    
  return (
    <section className='m-5'>
        <Title value='Consulta' color='white' />
        <DarkCardContainer width='w-full'>
            <header>
                <ArticleTitle value={`Dr. ${doctor?.name} ${doctor?.lastName}`} color='white' />
            </header>

            <section className='flex flex-col lg:flex-row justify-between'>
                <article className='flex gap-2 flex-col shadow-xl bg-neutral-900 border-neutral-700 rounded-2xl mt-5 lg:w-1/3 '>
                    <header>
                        <h1 className='text-2xl font-semibold text-neutral-500'>Monitor</h1>
                    </header>

                       <MonitoredPatientCard patient={{
                            id: patient?.id!,
                            name: patientName() || '',
                            heartRate: 80,
                            oxygenSaturation: 98,
                            timeLabels: ['Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre'],
                            heartRateData: [7, 4, 8, 23, 22],
                            oxygenData: [5, 10, 15, 20, 25]
                        }} />
                  
                </article>
                <DarkCardContainer width='w-2/3'>
                    <ChatContainer user={patient?.id!} sendMessage={sendMessage} create={handleInitializeChat}  chat={chat} messages={messages} loading={loading}/>
                </DarkCardContainer>
            </section>

        </DarkCardContainer>

        <ModalVideoCall leaveCall={leaveCall}/>
    </section>
  )
}
