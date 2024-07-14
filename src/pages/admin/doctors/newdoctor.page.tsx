
import { NewDoctorForm } from "../../../components/admin/doctors/newdoctorform.component";
export const NewDoctorPage = () => {

  return (
    <>
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center  py-6 px-8 bg-neutral-800">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-100">
          Registrar Doctor
        </h1>
        <p className="text-neutral-400 mt-2">
        </p>
      </div>
      
    </header>
      <div
        className="mt-5 rounded"
      >

        <NewDoctorForm />
      </div>
    </>
  );
};
