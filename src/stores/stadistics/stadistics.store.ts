import { StateCreator, create } from "zustand";
import { fetchService } from "../../services";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";


export interface StatisticsState {
    totalManAndWoman: {man: number, woman: number};
    anomalyProbabilityPatient: number;
    totalMessagesDoctor: number;
    getTotalManAndWomanDoctor: () => void;
    getTotalMessagesSendedDoctor: () => void;
    getAnomalyProbabilityPatient: (patientId:string) => void;
}

export const statisticsSlice: StateCreator<StatisticsState, [["zustand/immer", never]]> = (set, get) => ({
    totalManAndWoman: {man: 0, woman: 0},
    anomalyProbabilityPatient: 0,
    totalMessagesDoctor: 0,
    getTotalManAndWomanDoctor: async () => {
        try {
            const response = await fetchService.get<{man: number, woman: number}>('/patient/doctor/total');
            set({ totalManAndWoman: response });
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getTotalMessagesSendedDoctor: async () => {
        try {
            const response = await fetchService.get<number>('/doctor/statistics/messages');

            set({ totalMessagesDoctor: response });
        } catch (error) {
            console.log(error);
            throw error;
        }
    
    },
    getAnomalyProbabilityPatient: async (patientId) => {
        try {
            const response = await fetchService.get<number>(`/patient/anomaly-probablity/${patientId}`);
            set({ anomalyProbabilityPatient: response });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
})

export const useStatisticsState = create<StatisticsState>()(devtools(immer(statisticsSlice)));