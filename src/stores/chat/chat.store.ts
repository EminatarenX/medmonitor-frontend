import { create, StateCreator } from "zustand";
import { fetchService } from "../../services";
import { Chat } from "../../interfaces/chat.interface";
import { Message } from "../../interfaces/message.interface";
import { devtools } from "zustand/middleware";
import { GetPatientChatResponse } from "../../services/fetch/responses/auth/response";
import { immer } from "zustand/middleware/immer";
import { socket } from "../ws/websocket";


interface ChatState {
  chat?: Chat;
  messages: Record<string, Message>;
  loading: boolean;
  createChat: (doctorId: string) => Promise<void>;
  getPatientChat: (userId: string) => Promise<void>;
  sendMessage: (chatId: string, to: string, message: string) => Promise<void>;
  setNewMessage: (message: Message) => void;
  doctorCreateChat: ( patientId: string) => void;
  
}

export const chatStore: StateCreator<
  ChatState,
  [["zustand/immer", never]]
> = (set) => ({
  chat: undefined,
  messages: {},
  loading: false,
  createChat: async (doctorId: string) => {
    set({ loading: true });
    try {
      const chat = await fetchService.post<Chat>("/chat", { doctorId });
      set({ chat });
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  doctorCreateChat: async( patientId: string) => {

  },
  getPatientChat: async (patientID: string) => {
    set({ loading: true });
    try {
      const response = await fetchService.get<GetPatientChatResponse>(
        `/chat/patient/${patientID}`
      );
      if(!response) return;
      const messagesConverted = response.messages.reduce((acc, doctor) => {
        acc[doctor.id] = doctor;
        return acc;
      }, {} as Record<string, Message>);

      set((state) => {
        state.chat = response.chat;
        state.messages = messagesConverted;
      });

    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  sendMessage: async (chatId: string, to: string, content: string) => {
    set({ loading: true });
    try {
      const response = await fetchService.post<Message>('/chat/message', {chatId, to, content });
      
      set( state => {
          state.messages[response.id!] = response;
      })
      socket.emit('message', response)
    } catch (error) {
      throw error;
    }
  },

  setNewMessage: (message: Message) => {
    set( state => {
      state.messages[message.id!] = message;
    })
  }
});

export const useChatState = create<ChatState>()(devtools(immer(chatStore)));
