import { StateCreator, create } from "zustand";
import { fetchService } from "../../services";
import { immer } from 'zustand/middleware/immer'
import { ClinicalRegistry } from "../../interfaces/clinical-history.interface";
import { devtools } from "zustand/middleware";
import { GetPatientRegistriesResponse } from "../../services/fetch/responses/clinical-registries";


export interface ClinicalRegistryState {
    registries: Record<string, ClinicalRegistry>
    total: number;
    currentRegistry: ClinicalRegistry | null
    totalRegistries: number;
    loading: boolean
    addClinicalRegistry: (data: ClinicalRegistry) => void;
    findAllPatientRegistries: (patientId: string) => void;
}

export const clinicalRegistrySlice: StateCreator< ClinicalRegistryState, [["zustand/immer", never]]> = (set, get) => ({
    registries: {},
    currentRegistry: null,
    total: 0,
    totalRegistries: 0,
    loading: false,
    addClinicalRegistry: async (data) => {
        try {
            const response = await fetchService.post<ClinicalRegistry>('/clinical-registry', data)
            set( state => {
                state.registries[response.id!] = response
            })
        } catch (error) {
      
            throw error
        }

    },
    findAllPatientRegistries: async (patientId: string) => {
        try {
            const response = await fetchService.get<GetPatientRegistriesResponse>(`/clinical-registry/patient/${patientId}`)
            console.log(response)
            const clinicalRegistriesConverted = response.registries.reduce( ( acc, registry) => {
                acc[registry.id] = registry
                return acc
            }, {} as Record<string, ClinicalRegistry>)
            set({ registries: clinicalRegistriesConverted})
        } catch (error) {
            console.log(error)
            throw error
        }
    }
})

export const useClinicalRegistryState = create<ClinicalRegistryState>()(
    devtools(immer(clinicalRegistrySlice))
)