import { useState } from "react"
import { useAuthState } from "../../stores/auth/auth.store"
import { useChatState } from "../../stores/chat/chat.store"
import { usePatientState } from "../../stores/patient.store"

export const usePatientChatPage = () => {
    const [messageLength, setMessageLength] = useState<number>(0)
    const getPatientInformation = usePatientState( state => state.getPatient)
    const currentPatient = usePatientState( state => state.currentPatient)
    const patientName = () => currentPatient && currentPatient.name + ' ' + currentPatient.lastName
    const getPatientChat = useChatState( state => state.getPatientChat)
    const chat = useChatState( state => state.chat)
    const messages = useChatState( state => state.messages)
    const doctor = useAuthState( state => state.doctor)
    const loading = useChatState( state => state.loading)
    const sendMessage = useChatState( state => state.sendMessage)
    const setNewMessage = useChatState(state => state.setNewMessage)
    return {
        getPatientInformation,
        messageLength,
        setMessageLength,
        currentPatient,
        patientName,
        getPatientChat,
        chat,
        messages,
        doctor,
        loading,
        sendMessage,
        setNewMessage
    }
}