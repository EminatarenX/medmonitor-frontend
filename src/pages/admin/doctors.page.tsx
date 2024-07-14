import { DoctorsHeader } from "../../components/admin/doctors/header.component";
import { DoctorComponent } from "../../components/admin/doctors/doctor.component";
import { Pagination } from "@mui/material";
import { useDoctorState } from "../../stores/auth/admin/doctor.store";
import { useEffect, useState } from "react";

export const DoctorsPage = () => {
  const limit = 5
  const [page, setpage] = useState(1);
  const doctors = useDoctorState((state) => state.doctors);
  const getDoctors = useDoctorState((state) => state.getDoctors);
  const totalDoctors = useDoctorState((state) => state.totalDoctors);
  const totalPages = Math.ceil(totalDoctors / limit);


  useEffect(() => {
    getDoctors(limit, page);
  }, [page]);
  return (
    <>
      <DoctorsHeader />

      {Object.values(doctors).length === 0 ? (
        <section className="flex justify-center items-center h-96">
          <h1 className="text-2xl font-semibold text-neutral-500">
            No hay doctores registrados
          </h1>
        </section>
      ) : (
        <section className="mx-5 my-5 flex flex-col gap-3 ">
          {Object.values(doctors).map((doctor) => (
            <DoctorComponent key={doctor.id} doctor={doctor} />
          ))}
        </section>
      )}

      <div className="flex justify-center w-full">
        <Pagination
          count={totalPages}
          page={page}
          shape="rounded"
          onChange={(_, value) => setpage(value)}
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#d1d5db',
              '&:hover': {
                backgroundColor: '#4b5563',
              },
              '&.Mui-selected': {
                backgroundColor: '#6b7280',
              },
            },
          }}
        />
      </div>
    </>
  );
};
