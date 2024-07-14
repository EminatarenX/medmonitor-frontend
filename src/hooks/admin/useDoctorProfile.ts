import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDoctorState } from "../../stores/auth/admin/doctor.store";

export const useDoctorProfile = () => {
  const navigate = useNavigate();  
  const getDoctor = useDoctorState((state) => state.getDoctor);
  const currentDoctor = useDoctorState((state) => state.currentDoctor);
  const removeDoctor = useDoctorState((state) => state.removeDoctor); // Mueve useDoctorState aquí

  const handleDelete = async (id: string) => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: '¿Estás seguro de eliminar este doctor?',
        icon: 'warning',
        iconColor: 'blue',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminarlo',
        confirmButtonColor: 'red',
        cancelButtonText: 'No, cancelar',
        cancelButtonColor: 'gray',
      });
      if (!isConfirmed) return;
      await removeDoctor(id!);
      Swal.fire({
        title: 'Doctor eliminado',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      navigate('/admin/doctors');
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleDelete,
    getDoctor,
    currentDoctor,
  };
};
