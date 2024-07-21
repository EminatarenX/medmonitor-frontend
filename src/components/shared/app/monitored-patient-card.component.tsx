import { useEffect, useRef, useState } from "react";
import { Patient } from "../../../interfaces/patient.interface";
import { DobleLineChart } from "../charts/line-chart";
import { Monitor } from "../../../interfaces/monitor.interface";
import { socket } from "../../../stores/ws/websocket";
import { TrashIcon } from "../../../shared/icons/trash.icon";
import Swal from "sweetalert2";
import { useHelpers } from "../../../hooks/helpers/useHelpers";
import { Alerts } from "../../../services/alerts/toastify";
import { useMonitorState } from "../../../stores/monitor/monitor.store";
import { AxiosError } from "axios";
import { useLocation } from "react-router-dom";
interface Props {
  monitor: Monitor;
}

const MonitoredPatientCard = ({ monitor }: Props) => {
  const location = useLocation();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const { formatTime } = useHelpers();
  const deleteMonitor = useMonitorState((state) => state.deleteMonitor);

  const updateWidth = () => {
    if (chartContainerRef.current) {
      setWidth(chartContainerRef.current.clientWidth);
    }
  };

  const handleDelete = async (id: string) => {
    const response = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (response.isConfirmed) {
      try {
        await deleteMonitor(id);
        Swal.fire("Eliminado", "El monitor ha sido eliminado", "success");
      } catch (e) {
        const error = e as AxiosError<any>;
        Alerts.toastify(
          error.response?.data.message || "Hubo un error, intenta mas tarde",
          "error"
        );
      }
    }
  };

  useEffect(() => {
    updateWidth();

    window.addEventListener("resize", updateWidth);
    if (socket) {
      socket.emit("health/monitor", { monitor: monitor.id });
    }
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  useEffect(() => {
    const checkMonitorStatus = () => {};
    setInterval(() => {
      checkMonitorStatus();
    }, 10000);
    checkMonitorStatus();
  }, []);
  return (
    <div className="bg-neutral-800 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <h2 className="text-xl font-bold text-neutral-100 ">
            {monitor?.patient?.name} {monitor.patient?.lastName.split(" ")[0]}
          </h2>
          {location.pathname === "/patient/dashboard" ? null : location.pathname === '/patient/chat' ? null: location.pathname === '/admin/monitor' ? null : (
            <button
              type="button"
              className=" text-white px-2 rounded-lg ml-2"
              onClick={() => handleDelete(monitor.id)}
            >
              <TrashIcon sx={{ color: "red" }} />
            </button>
          )}
        </div>
        <span className="bg-neutral-700 text-neutral-300 py-1 px-3 rounded-full text-sm">
          ID: {monitor?.patient?.id}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-neutral-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-neutral-300 mb-2">
            Pulsación por minuto
          </h3>
          <p className="text-3xl font-bold text-sky-400">
            {monitor?.monitor_data[0]?.bpm || ""} BPM
          </p>
        </div>
        <div className="bg-neutral-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-neutral-300 mb-2">
            Oxigenación en sangre
          </h3>
          <p className="text-3xl font-bold text-green-400">
            {monitor?.monitor_data[0]?.spo2 || ""}%
          </p>
        </div>
      </div>

      <div className="bg-neutral-900 p-4 rounded-lg" ref={chartContainerRef}>
        <h3 className="text-lg font-semibold text-neutral-300 mb-4">
          Ultima actualización
        </h3>
        {!monitor.monitor_data || monitor.monitor_data.length === 0 ? (
          <p className="text-neutral-300">No hay datos</p>
        ) : (
          <DobleLineChart
            width={width}
            height={300}
            labels={monitor.monitor_data.map((data) =>
              formatTime(data.createdAt.toString())
            )}
            firstData={monitor.monitor_data.map((data) => data.bpm).reverse()}
            secondData={monitor.monitor_data.map((data) => data.spo2).reverse()}
            firstLabel="Pulsación por minuto"
            secondLabel="Oxigenación en sangre"
          />
        )}
      </div>
    </div>
  );
};

export default MonitoredPatientCard;
