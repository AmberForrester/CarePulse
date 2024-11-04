import Image from "next/image";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";



const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  console.log("Received userId in Appointment page:", userId);

  const patient = await getPatient(userId);

  if (!patient) {
    console.warn("No patient found with userId:", userId);

    return <div>Patient not found</div>;
  }

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
            style={{ width: "auto", height: "auto" }}
          />

          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
          />

          <p className="copyright mt-10 py-12">© 2024 CarePulse</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
        style={{ width: "auto", height: "auto" }}
      />
    </div>
  );
};

export default Appointment;