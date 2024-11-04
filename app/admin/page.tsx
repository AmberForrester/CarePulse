import Image from "next/image";
import Link from "next/link";
import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { Appointment } from "@/types/appwrite.types";



const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();

  const saveAppointments = appointments || {
    scheduledCount: 0,
    pendingCount: 0,
    cancelledCount: 0,
    documents: [] as Appointment[],
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
            style={{ width: "auto", height: "auto" }}
          />
        </Link>

        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Kick off an incredible day by organizing your new appointments!
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={saveAppointments.scheduledCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={saveAppointments.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={saveAppointments.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        <DataTable<Appointment, unknown>
          columns={columns}
          data={saveAppointments.documents as Appointment[]}
        />
      </main>
    </div>
  );
};

export default AdminPage;