import { StateCreator, create } from "zustand";
import { fetchService } from "../../services";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Monitor } from "../../interfaces/monitor.interface";
import { GetMonitorsResponse } from "../../services/fetch/responses/monitor/response.monitor";


export interface MonitorState {
    monitors: Record<string, Monitor>;
    currentMonitor: Monitor | null;
    totalMonitors: number;
    loading: boolean;
    notifications: string[];
    addMonitor: (patientId: string, channel: string) => Promise<void>;
    getMonitors: (limit?: number, offset?: number) => void;
    deleteMonitor: (id: string) => void;
    pushNotification: (notification: string) => void;
    findMonitor: (id: string) => void;
    findAllByHospital: (limit?: number, offset?: number) => void;

}

export const monitorSlice: StateCreator< MonitorState, [["zustand/immer", never]] > = (set, get) => ({
    monitors: {},
    totalMonitors: 0,
    currentMonitor: null,
    loading: false,
    notifications: [],
    findAllByHospital: async (limit = 6, offset = 1) => {
        try {
            const response = await fetchService.get<GetMonitorsResponse>(`/monitor/hospital?limit=${limit}&offset=${offset}`)
            set({totalMonitors: response.total})
            set( state => {
                state.monitors = response.monitors.reduce((acc, monitor) => {
                    acc[monitor.id] = monitor;
                    return acc;
                }, {} as Record<string, Monitor>)
            })
        } catch (error) {
            throw error
        }
    },
    findMonitor: async (id) => {
        try {
            const response = await fetchService.get<Monitor>(`/monitor/${id}`)
            set({currentMonitor: response})
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    deleteMonitor: async (id) => {
        try {
            await fetchService.delete(`/monitor/${id}`)
            set( state => {
                delete state.monitors[id]
            })
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    pushNotification: (notification: string) => {
        set( state => {
            state.notifications.push(notification);
        })
    },
    addMonitor: async ( patientId: string, channel: string ) => {
        try {
          const result = await fetchService.post<Monitor>(`/monitor`, {patientId, channel});
        } catch (error) {
          throw error;
        }
      
      },
    getMonitors: async (limit: number = 10, offset: number = 1) => {
        try {
            const result = await fetchService.get<GetMonitorsResponse>(`/monitor?limit=${limit}&offset=${offset}`);
            if(result.monitors.length === 0) return;
            console.log(result)
            set( state => {
                state.monitors = result.monitors.reduce((acc, monitor) => {
                    acc[monitor.id] = monitor;
                    return acc;
                }, {} as Record<string, Monitor>)
            })
        } catch (error) {
            throw error;
        }
    }

})

export const useMonitorState = create<MonitorState>()(
    devtools(immer(monitorSlice))
)