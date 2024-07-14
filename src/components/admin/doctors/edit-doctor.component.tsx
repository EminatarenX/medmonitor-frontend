import { Button, Modal, TextField } from "@mui/material"
import { Doctor } from "../../../interfaces"
import { useForm } from "react-hook-form";
import { useHelpers } from "../../../hooks/helpers/useHelpers";
import { useEffect } from "react";
import password from 'secure-random-password'
import { useDoctorState } from "../../../stores/auth/admin/doctor.store";
import { Alerts } from "../../../services/alerts/toastify";

interface EditDoctorComponentProps {
    onClose: () => void;
    doctor: Doctor;
    isOpen: boolean;
}

export const EditDoctorComponent = ({onClose,doctor, isOpen}: EditDoctorComponentProps  )=> {
    const { especialidades, areas } = useHelpers();
    const editDoctor = useDoctorState( state => state.updateDoctor)
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<Doctor>({mode: "onBlur"});

    const handleEditDoctor = async(data: Doctor) => {
        try {
            await editDoctor(data)
            Alerts.toastify('Informacion actualizada', 'success')
            onClose()
        } catch (error) {
            Alerts.toastify('Error al actualizar la informacion', 'error')
        }
    }

    const handleGeneratePassword = () => {
        const pass = password.randomPassword();
        setValue("password", pass, { shouldValidate: true, shouldDirty: true });
      };

      useEffect(() => {
        if (doctor) {
          Object.entries(doctor).forEach(([key, value]) => {
            if(key === 'joinDate' || key === 'birthDate') {
                value = new Date(value).toISOString().split('T')[0]
            }
            setValue(key as keyof Doctor, value);
          });
        }
      }, [doctor, setValue]);
  return (
    <Modal
        onClose={onClose}
        open={isOpen}
        className="flex justify-center items-center "
    >
        <section
            className="bg-white shadow p-5 rounded-lg max-h-[90%] overflow-y-scroll"
        >
            <form
        onSubmit={handleSubmit(handleEditDoctor)}
        className="flex flex-col gap-5 p-5"
      >
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex flex-col lg:w-1/2 gap-5">
            {errors.name && (
              <span className="border border-rose-500 text-rose-500 w-full text-center py-2 rounded">
                El nombre es requerido
              </span>
            )}
            <TextField
              {...register("name", { required: true})}
              id="standard-basic"
              label="Nombre"
              variant="standard"
              className="w-full"
              
            />
            {errors.lastName && (
              <span className="border border-rose-500 text-rose-500 w-full text-center py-2 rounded">
                Los apellidos son requeridos
              </span>
            )}
            <TextField
              {...register("lastName", { required: true })}
              id="standard-basic"
              label="Apellidos"
              variant="standard"
              className="w-full"
              
            />
            {errors.gender && (
              <span className="border border-rose-500 text-rose-500 w-full text-center py-2 rounded">
                El genero es requerido
              </span>
            )}
            <div className="flex flex-col">
              <label htmlFor="gender" className="text-sm text-slate-700">
                Genero
              </label>
              <select
                id="gender"
                {...register("gender", { required: true })}
                className="shadow p-3 bg-white outline-none"
              >
                <option value="">-- Selecciona una opción --</option>
                <option value="M">Hombre</option>
                <option value="F">Mujer</option>
              </select>
            </div>

            {errors.phone && (
              <span className="border border-rose-500 text-rose-500 w-full text-center py-2 rounded">
                El teléfono es requerido
              </span>
            )}

            <TextField
              {...register("phone", { required: true })}
              id="standard-basic"
              label="Numero de teléfono"
              variant="standard"
              className="w-full"
            />
            {errors.email && (
              <span className="border border-rose-500 text-rose-500 w-full text-center py-2 rounded">
                El correo electrónico es requerido
              </span>
            )}

            <TextField
              {...register("email", { required: true })}
              id="standard-basic"
              label="Correo electrónico"
              variant="standard"
              className="w-full"
            />
  
            {errors.birthDate && (
              <span className="border border-rose-500 text-rose-500 w-full text-center py-2 rounded">
                La fecha de nacimiento es requerida
              </span>
            )}

            <div className="relative mt-2">
              <label htmlFor="birthDay" className=" text-sm text-slate-700  ">
                Fecha de nacimiento
              </label>
              <input
                {...register("birthDate", { required: true })}
                id="birthDay"
                placeholder="Fecha de nacimiento"
                type="date"
                className="w-full  px-2 py-3 shadow "
              />
            </div>
            {errors.specialty && (
              <span className="border border-rose-500 text-rose-500 w-full text-center py-2 rounded">
                La especialidad es requerida
              </span>
            )}

            <div>
              <label htmlFor="specialty" className="text-sm text-slate-700">
                Especialidad
              </label>
              <select
                {...register("specialty", { required: true })}
                className="w-full shadow p-3 bg-white outline-none"
              >
                <option value="">-- Selecciona una opción --</option>
                {especialidades.map((especialidad) => (
                  <option
                    key={especialidad}
                    value={especialidad}
                    className="capitalize"
                  >
                    {especialidad}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col lg:w-1/2 gap-5">
            {errors.area && (
              <span className="border border-rose-500 text-rose-500 w-full text-center py-2 rounded">
                El área es requerida
              </span>
            )}
            <div>
              <label htmlFor="area" className="text-sm text-slate-700">
                Área
              </label>
              <select
                {...register("area", { required: true })}
                className="w-full shadow p-3 bg-white outline-none"
              >
                <option value="">-- Selecciona una opción --</option>
                {areas.map((area) => (
                  <option key={area} value={area} className="capitalize">
                    {area}
                  </option>
                ))}
              </select>
            </div>

            {errors.joinDate && (
              <span className="border border-rose-500 text-rose-500 w-full text-center py-2 rounded">
                La fecha de ingreso es obligatoria
              </span>
            )}
            <div className="relative mt-2">
              <label htmlFor="joinDate" className=" text-sm text-slate-700  ">
                Fecha de ingreso
              </label>
              <input
                id="joinDate"
                placeholder="Fecha de ingreso"
                className="p-2 border-b border-neutral-200 w-full"
                type="date"
                {...register("joinDate", { required: true })}
              />
            </div>
            {errors.password && (
              <span className="border border-rose-500 text-rose-500 w-full text-center py-2 rounded">
                La Contraseña es obligatoria
              </span>
            )}
            <div>
              <input
                type="text"
                {...register("password", { required: true })}
                placeholder="Contraseña"
                className="w-full p-3 outline-none mb-2 border-b`"
              />
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="p-2 bg-blue-600 w-full text-white font-semibold capitalize"
              >
                Generar
              </button>
            </div>

            <TextField
              {...register("education", { required: false })}
              id="outlined-multiline-static"
              label="Education"
              multiline
              rows={5}
              className="w-full"
            />
            <TextField
              {...register("experience", { required: false })}
              id="outlined-multiline-static"
              label="Experience"
              multiline
              rows={5}
              className="w-full"
            />
          </div>
        </div>
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#6498C3", padding: 2, color: "white" }}
          className="w-full"
        >
          Guardar
        </Button>
      </form>
        </section>
    </Modal>
  )
}
