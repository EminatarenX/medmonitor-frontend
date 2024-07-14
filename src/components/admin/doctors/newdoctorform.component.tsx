import password from "secure-random-password";
import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useHelpers } from "../../../hooks/helpers/useHelpers";
import { useDoctorState } from "../../../stores/auth/admin/doctor.store";
import { Alerts } from "../../../services/alerts/toastify";
import { useNavigate } from "react-router-dom";

export interface IFormNewDoctor {
  name: string;
  lastName: string;
  specialty: string;
  phone: string;
  email: string;
  birthDate: string;
  experience: string;
  education: string;
  password: string;
  gender: string;
  joinDate: Date;
  area: string;
}

export const NewDoctorForm = () => {
  const navigate = useNavigate();
  const addDoctor = useDoctorState((state) => state.addDoctor);
  const { areas, especialidades } = useHelpers();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormNewDoctor>();

  const handleGeneratePassword = () => {
    const pass = password.randomPassword();
    setValue("password", pass, { shouldValidate: true, shouldDirty: true });
  };

  const handleSubmitDoctor = async (data: IFormNewDoctor) => {
    try {
      await addDoctor(data)
      Alerts.toastify("Doctor agregado correctamente", "success")
      navigate('/admin/doctors')
    } catch (error: any) {
      console.log(error)
      Alerts.toastify(error.response.data.message, 'error')
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitDoctor)}
      className="flex flex-col gap-6 p-6 bg-neutral-800 rounded-lg shadow-lg"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          {errors.name && (
            <span className="bg-red-900 text-red-200 w-full text-center py-2 rounded">
              El nombre es requerido
            </span>
          )}
          <TextField
            {...register("name", { required: true })}
            label="Nombres"
            variant="outlined"
            className="w-full"
            sx={{input: {color: 'white'}, label: {color: 'white'}, colorScheme: 'dark', backgroundColor: '#404040' }}
          />

          <TextField
            {...register("lastName", { required: true })}
            label="Apellidos"
            variant="outlined"
            className="w-full"
            sx={{input: {color: 'white'}, label: {color: 'white'}, colorScheme: 'dark', backgroundColor: '#404040' }}
          />

          <TextField
            {...register("phone", { required: true })}
            
            label="Teléfono"
            variant="outlined"
            className="w-full"
            sx={{input: {color: 'white'}, label: {color: 'white'}, colorScheme: 'dark', backgroundColor: '#404040' }}
          />
          <TextField
            {...register("email", { required: true })}
            label="Correo"
            variant="outlined"
            className="w-full"
            sx={{input: {color: 'white'}, label: {color: 'white'}, colorScheme: 'dark', backgroundColor: '#404040' }}
          />

          {/* Repeat this pattern for other fields */}
          {/* ... */}

          <div className="flex flex-col">
            <label htmlFor="gender" className="text-sm text-neutral-400 mb-2">
              Género
            </label>
            <select
              id="gender"
              {...register("gender", { required: true })}
              className="p-3 bg-neutral-700 text-neutral-100 rounded outline-none"
            >
              <option value="">-- Selecciona una opción --</option>
              <option value="M">Hombre</option>
              <option value="F">Mujer</option>
            </select>
          </div>

            <TextField
              {...register("birthDate", { required: true })}
              label="Fecha de nacimiento"
              sx={{input: {color: 'white'}, label: {color: 'white'}, colorScheme: 'dark' }}
              type="date"
              variant="outlined"
              className="w-full "
              InputLabelProps={{shrink: true }}
           
            />
          <TextField
            {...register("joinDate", { required: true })}
            label="Fecha de ingreso"
            sx={{input: {color: 'white'}, label: {color: 'white'}, colorScheme: 'dark' }}
            type="date"
            variant="outlined"
            className="w-full"
            InputLabelProps={{shrink: true }}
          />

          {/* ... */}
        </div>


        
        <div className="flex flex-col gap-6">

          <select className="p-3 bg-neutral-700 text-neutral-100 rounded outline-none" {...register("area", { required: true })}>
            <option value="">-- Selecciona un area --</option>
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          <select className="p-3 bg-neutral-700 text-neutral-100 rounded outline-none" {...register("specialty", { required: true })}>
            <option value="">-- Selecciona una especialidad --</option>
            {especialidades.map((especialidad) => (
              <option key={especialidad} value={especialidad}>
                {especialidad}
              </option>
            ))}
          </select>

          <div>
            <input
              type="text"
              {...register("password", { required: true })}
              placeholder="Contraseña"
              className="w-full p-3 bg-neutral-700 text-neutral-100 rounded outline-none mb-2"
            />
            <button
              type="button"
              onClick={handleGeneratePassword}
              className="p-2 bg-blue-600 w-full text-white font-semibold capitalize rounded hover:bg-blue-700 transition-colors"
            >
              Generar
            </button>
          </div>

          <TextField
            {...register("education", { required: false })}
            label="Education"
            multiline
            sx={{input: {color: 'white'}, label: {color: 'white'}, colorScheme: 'dark', backgroundColor: '#404040' }}
            rows={5}
            className="w-full"
            InputLabelProps={{ className: "text-neutral-400" }}
            InputProps={{ className: "text-neutral-100 bg-neutral-700" }}
          />
          <TextField
          sx={{input: {color: 'white'}, label: {color: 'white'}, colorScheme: 'dark', backgroundColor: '#404040' }}
            {...register("experience", { required: false })}
            label="Experiencia"
            multiline
            rows={5}
            className="w-full"
            InputLabelProps={{ className: "text-neutral-400" }}
            InputProps={{ className: "text-neutral-100 bg-neutral-700" }}
          />

          {/* ... */}
        </div>
      </div>
      
      <Button
        type="submit"
        variant="contained"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition-colors"
      >
        Guardar
      </Button>
    </form>
  );
};

