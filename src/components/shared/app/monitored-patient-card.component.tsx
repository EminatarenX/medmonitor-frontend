
import { useEffect, useRef, useState } from 'react';
import { Patient } from '../../../interfaces/patient.interface';
import { DobleLineChart } from '../charts/line-chart';
interface Props {
    patient: {
        id: string | number;
        name: string;
        heartRate: number;
        oxygenSaturation: number;
        timeLabels: string[];
        heartRateData: number[];
        oxygenData: number[];
    };
}

const MonitoredPatientCard = ({ patient }: Props) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    const updateWidth = () => {
        if(chartContainerRef.current) {
            setWidth(chartContainerRef.current.clientWidth);
        }
    }
    useEffect(() => {
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);
  return (
    <div className="bg-neutral-800 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-neutral-100">{patient.name}</h2>
        <span className="bg-neutral-700 text-neutral-300 py-1 px-3 rounded-full text-sm">
          ID: {patient.id}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-neutral-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-neutral-300 mb-2">Pulsación por minuto</h3>
          <p className="text-3xl font-bold text-sky-400">{patient.heartRate} BPM</p>
        </div>
        <div className="bg-neutral-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-neutral-300 mb-2">Oxigenación en sangre</h3>
          <p className="text-3xl font-bold text-green-400">{patient.oxygenSaturation}%</p>
        </div>
      </div>
      
      <div className="bg-neutral-900 p-4 rounded-lg" ref={chartContainerRef}>
        <h3 className="text-lg font-semibold text-neutral-300 mb-4">Gráfica en tiempo real</h3>
        <DobleLineChart
          width={width}
          height={300}
          labels={patient.timeLabels}
          firstData={patient.heartRateData}
          secondData={patient.oxygenData}
            firstLabel="Pulsación por minuto"
            secondLabel="Oxigenación en sangre"
        />
      </div>
    </div>
  );
};

export default MonitoredPatientCard;