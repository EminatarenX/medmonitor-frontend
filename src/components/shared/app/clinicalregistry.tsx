import React from 'react';
import type { ClinicalRegistry, Field } from "../../../interfaces/clinical-history.interface";
import { useHelpers } from '../../../hooks/helpers/useHelpers';

interface Props {
  clinicalRegistry: ClinicalRegistry;
}

const FieldList: React.FC<{ title: string, fields: Field[] }> = ({ title, fields }) => (
  <div className="mb-4">
    <h3 className="text-lg font-semibold text-neutral-200 mb-2">{title}</h3>
    <ul className="list-disc list-inside">
      {fields.map((field, index) => (
        <li key={index} className="text-neutral-300">{field.content}</li>
      ))}
    </ul>
  </div>
);

export const ClinicalRegistryComponent: React.FC<Props> = ({ clinicalRegistry }) => {
  const { formatDayMonthYear } = useHelpers()
  return (
    <div className="p-6 rounded-lg bg-neutral-800 shadow-lg mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-neutral-100">Registro Médico</h2>
        <span className="text-sm text-neutral-400"> {formatDayMonthYear(clinicalRegistry.createdAt?.toString()!)}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <FieldList title="Antecedentes" fields={clinicalRegistry.background} />
          <FieldList title="Diagnósticos" fields={clinicalRegistry.diagnoses} />
          <FieldList title="Tratamientos" fields={clinicalRegistry.treatments} />
        </div>
        <div>
          <FieldList title="Medicaciones" fields={clinicalRegistry.medications} />
          <FieldList title="Alergias" fields={clinicalRegistry.allergies} />
          <FieldList title="Observaciones" fields={clinicalRegistry.observations} />
        </div>
      </div>
      
      <div className="mt-6 border-t border-neutral-700 pt-4">
        <h3 className="text-lg font-semibold text-neutral-200 mb-2">Declaración</h3>
        <p className="text-neutral-300 mb-2">{clinicalRegistry.declaration.content}</p>
        <p className="text-neutral-400 text-sm">Firma: {clinicalRegistry.declaration.signature}</p>
      </div>
      
      <div className="mt-4 text-sm text-neutral-500">
        <p>Doctor ID: {clinicalRegistry.doctorId}</p>
        <p>Hospital ID: {clinicalRegistry.hospitalId}</p>
      </div>
    </div>
  );
};