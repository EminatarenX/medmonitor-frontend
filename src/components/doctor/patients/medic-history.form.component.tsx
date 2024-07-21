import React, { useState } from "react";
import { useForm, useFieldArray, FieldArrayWithId } from "react-hook-form";
import { FlexRowSection } from "../../shared/container/flex-row.component";
import { TextField } from "../../shared/fields/textfield";
import { SubTitle } from "../../shared/text/subtitle.component";
import { PlusIcon } from "../../../shared/icons/plus.icon";
import { CloseRounded, InfoOutlined } from "@mui/icons-material";
import { Modal } from "@mui/material";
import { Title } from "../../shared/text/title.component";
import { ClinicalRegistry } from "../../../interfaces/clinical-history.interface";
import { Alerts } from "../../../services/alerts/toastify";
import { AxiosError } from "axios";
import { useClinicalRegistryState } from "../../../stores/medical-registry/clinical-registr.store";
import { useNavigate } from "react-router-dom";


export const HistorialClinicoForm = ({ patientId }: { patientId?: string }) => {
    const [modalAntecedentes, setModalAntecedentes] = useState(false)
    const addRegistry = useClinicalRegistryState( state => state.addClinicalRegistry)
    const navigate = useNavigate()
  const { register, control, handleSubmit } = useForm<ClinicalRegistry>({
    defaultValues: {
      patientId: "",
      background: [{content: ""}],
      diagnoses: [{ content: "" }],
      treatments: [{ content: "" }],
      medications: [{ content: "" }],
      allergies: [{ content: "" }],
      observations: [{ content: "" }],
      declaration: { content: "", signature: "" },
    },
  });

  const { fields: backgroundFields, append: appendBackground } = useFieldArray({
    control,
    name: 'background'
  })

  const { fields: diagnosesFields, append: appendDiagnosis } = useFieldArray({
    control,
    name: "diagnoses",
  });

  const { fields: treatmentsFields, append: appendTreatment } = useFieldArray({
    control,
    name: "treatments",
  });

  const { fields: medicationsFields, append: appendMedication } = useFieldArray(
    {
      control,
      name: "medications",
    }
  );

  const { fields: allergiesFields, append: appendAllergy } = useFieldArray({
    control,
    name: "allergies",
  });

  const { fields: observationsFields, append: appendObservation } =
    useFieldArray({
      control,
      name: "observations",
    });

  const onSubmit = async (data: ClinicalRegistry) => {
    const nuevaData = {...data, patientId: patientId}
    try {
      await addRegistry(nuevaData)
      Alerts.toastify('Registro Agregado exitosamente', 'success')
      navigate(`/doctor/patients/${patientId}`)
      
    } catch (error) {
      const e = error as AxiosError<any>
      Alerts.toastify(e?.response?.data?.message || 'error inesperado', 'error')
    }
    
  };

  return (
    <FlexRowSection>
        <Modal
            open={modalAntecedentes}
            onClose={() => setModalAntecedentes(false)}
        >
            <div className="flex flex-col items-center justify-center h-screen">
               <div className="flex gap-3">
               <Title value="Guia antecedentes" color="white" />
               <button className="bg-neutral-800 text-white p-3 rounded-lg flex items-center gap-3"
                onClick={() => setModalAntecedentes(false)}
               >Cerrar <CloseRounded/></button>
               </div>
                <img className="w-3/4 lg:w-2/3" src="/antecedentes.png" alt="antecedentes.png" />

            </div>
        </Modal>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">

        <div className=" flex gap-3 lg:flex-row flex-col">
          <div className="w-full flex flex-col gap-5">
            <div >
           <div className="flex gap-1">
           <SubTitle value="Antecedentes" color="white" />
            <button
                type="button"
                onClick={() => setModalAntecedentes(true)}
            >
                <InfoOutlined sx={{height: 15, width: 15, color: 'white', marginTop: -2}}/>
            </button>
           </div>
             {backgroundFields.map((field, index) => (
                <div className="flex gap-3">
                <TextField
                  key={field.id}
                  type="text"
                  placeholder={`Antecedente ${index + 1}`}
                  id={`background.${index}`}
                  color="white"
                  register={register(`background.${index}.content` as const)}
                />
                {
                    index === (backgroundFields.length -1) &&(
                        <button
                        type="button"
                        onClick={() => appendBackground({ content: "" })}
                        className="mt-2 px-4 py-2 border-b-2 border-neutral-600 text-white "
                      >
                        <PlusIcon />
                      </button>
                    )

                }
                </div>
              ))}
            </div>

            {/* Diagnósticos */}
            <div>
              <SubTitle value="Diagnósticos" color="white" />
              {diagnosesFields.map((field, index) => (
                <div className="flex gap-3">
                <TextField
                  key={field.id}
                  type="text"
                  placeholder={`Diagnóstico ${index + 1}`}
                  id={`diagnoses.${index}`}
                  color="white"
                  register={register(`diagnoses.${index}.content` as const)}
                />
                {
                    index === (diagnosesFields.length -1) &&(
                        <button
                        type="button"
                        onClick={() => appendDiagnosis({ content: "" })}
                        className="mt-2 px-4 py-2 border-b-2 border-neutral-600 text-white "
                      >
                        <PlusIcon />
                      </button>
                    )

                }
                </div>
              ))}
             
            </div>

            {/* Tratamientos */}
            <div>
              <SubTitle value="Tratamientos" color="white" />
              {treatmentsFields.map((field, index) => (
                <div className="flex gap-2">
                <TextField
                  key={field.id}
                  type="text"
                  placeholder={`Tratamiento ${index + 1}`}
                  id={`treatments.${index}`}
                  color="white"
                  register={register(`treatments.${index}.content` as const)}
                />
                    {
                        index === (treatmentsFields.length -1) && (
                            <button
                            type="button"
                            onClick={() => appendTreatment({ content: "" })}
                            className="mt-2 px-4 py-2 border-b-2 border-neutral-600 text-white "
                          >
                            <PlusIcon />
                          </button>
                        )
                    }
                </div>
              ))}
              
            </div>

            {/* Medicaciones */}
            <div>
              <SubTitle value="Medicaciones" color="white" />
              {medicationsFields.map((field, index) => (
                <div className="flex gap-2">
                    <TextField
                  key={field.id}
                  type="text"
                  placeholder={`Medicación ${index + 1}`}
                  id={`medications.${index}`}
                  color="white"
                  register={register(`medications.${index}.content` as const)}
                />
                {
                    index === (medicationsFields.length -1) &&  (
                        <button
                            type="button"
                            onClick={() => appendMedication({ content: "" })}
                            className="mt-2 px-4 py-2 border-b-2 border-neutral-600 text-white "
                          >
                            <PlusIcon />
                          </button>
                    )
                }
                </div>
              ))}
             
            </div>
          </div>

          <div className="w-full flex flex-col gap-5">
            {/* Alergias */}
            <div>
              <SubTitle value="Alergias" color="white" />
              {allergiesFields.map((field, index) => (
                <div className="flex gap-2">
                    <TextField
                  key={field.id}
                  type="text"
                  placeholder={`Alergia ${index + 1}`}
                  id={`allergies.${index}.content`}
                  color="white"
                  register={register(`allergies.${index}.content` as const)}
                />{
                    index === (allergiesFields.length -1) && (
                        <button
                        type="button"
                        onClick={() => appendAllergy({ content: "" })}
                        className="mt-2 px-4 py-2 border-b-2 border-neutral-600 text-white "
                      >
                        <PlusIcon/>
                      </button>
                    )
                }
                </div>
              ))}
            
            </div>

            {/* Observaciones */}
            <div>
              <SubTitle value="Observaciones" color="white" />
              {observationsFields.map((field, index) => (
                <div className="flex gap-2">
                    <TextField
                  key={field.id}
                  type="text"
                  placeholder={`Observación ${index + 1}`}
                  id={`observations.${index}.content`}
                  color="white"
                  register={register(`observations.${index}.content` as const)}
                />
                {
                    index === (observationsFields.length - 1) && (
                        <button
                        type="button"
                        onClick={() => appendObservation({ content: "" })}
                        className="mt-2 px-4 py-2 border-b-2 border-neutral-600 text-white "
                      >
                       <PlusIcon />
                      </button>
                    )
                }
                </div>
              ))}
             
            </div>

            {/* Declaración */}
            <div>
              <SubTitle value="Declaración" color="white" />
              <TextField
                type="text"
                placeholder="Contenido de la declaración"
                id="declaration.content"
                color="white"
                register={register("declaration.content")}
              />
              <TextField
                type="text"
                placeholder="Firma"
                id="declaration.signature"
                color="white"
                register={register("declaration.signature")}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 bg-sky-600 text-white font-bold rounded "
        >
          Enviar Historial Clínico
        </button>
      </form>
    </FlexRowSection>
  );
};
