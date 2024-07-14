import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHelpers } from "../../../../hooks/helpers/useHelpers";
import { useDoctorProfile } from "../../../../hooks/admin/useDoctorProfile";
import { EditDoctorComponent } from "../../../../components/admin/doctors/edit-doctor.component";
import { Phone, Email, Edit, Delete, School, Work } from "@mui/icons-material";

export const ProfileDoctorPage = () => {
  const params = useParams<{ id: string }>();
  const { handleDelete, currentDoctor, getDoctor } = useDoctorProfile();
  const { formatPhoneNumber } = useHelpers();
  const [editDoctor, setEditDoctor] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        getDoctor(params.id!);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      <EditDoctorComponent 
        isOpen={editDoctor} 
        onClose={() => setEditDoctor(!editDoctor)} 
        doctor={currentDoctor!}
      />
      <header className="border-b border-neutral-700 p-5">
        <h1 className="text-2xl font-semibold">Doctor Profile</h1>
      </header>
      <div className="container mx-auto px-4">
        <section className="flex flex-col lg:flex-row my-8 gap-8">
          <article className="flex justify-center items-center rounded-lg bg-neutral-800 p-4 shadow-lg lg:w-1/3">
            <img
              src={currentDoctor?.gender === "M" ? "/man.svg" : "/woman.svg"}
              alt="doctor-image"
              className="w-64 h-64 object-cover rounded-full"
            />
          </article>
          <article className="lg:w-2/3">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-sky-400">
                Dr{currentDoctor?.gender === "F" ? "a" : ""}. {currentDoctor?.name} {currentDoctor?.lastName}
              </h2>
              <div className="flex gap-4">
                <button 
                  className="p-2 rounded-full bg-neutral-700 hover:bg-neutral-600 transition-colors"
                  onClick={() => setEditDoctor(!editDoctor)}
                >
                  <Edit className="text-sky-400" />
                </button>
                <button
                  className="p-2 rounded-full bg-red-900 hover:bg-red-800 transition-colors"
                  onClick={() => handleDelete(params?.id!)}
                >
                  <Delete className="text-red-400" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-4">
              <span className="px-3 py-1 rounded-full bg-sky-900 text-sky-100">
                {currentDoctor?.specialty}
              </span>
              <span className="px-3 py-1 rounded-full bg-green-900 text-green-100">
                +10 Years Experience
              </span>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="text-sky-400" />
                <span>+52 {formatPhoneNumber(currentDoctor?.phone)}</span>
              </div>
              <div className="flex items-center gap-3">
                <Email className="text-sky-400" />
                <span>{currentDoctor?.email}</span>
              </div>
            </div>
          </article>
        </section>
        
        <section className="grid lg:grid-cols-2 gap-8 mb-8">
          <article className="p-6 rounded-lg bg-neutral-800 shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <School className="text-sky-400" />
              Education
            </h3>
            <p>{currentDoctor?.education}</p>
          </article>
          <article className="p-6 rounded-lg bg-neutral-800 shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Work className="text-sky-400" />
              Experience
            </h3>
            <p>{currentDoctor?.experience}</p>
          </article>
        </section>
      </div>
    </div>
  );
};