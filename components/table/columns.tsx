"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import { AppointmentModal } from "../AppointmentModal";
import { StatusBadge } from "../StatusBadge";



export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>
  },

  {
    accessorKey: "patient",
    header: "Patient", 
    cell: ({ row }) => <p className="text-14-medium">{row.original.patient.name}</p>
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
        <div className="min-w-[115px]">
          <StatusBadge status={row.original.appointment.status} />
        </div>
      )
  },

  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
          {formatDateTime(row.original.appointment.schedule).dateTime}
      </p>
    )
  },

  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {

      const doctor = Doctors.find(
        (doctor) => doctor.name === row.original.appointment.primaryPhysician);

      return (
        <div className="flex items-center gap-3">
          <Image 
            src={doctor?.image ?? "/assets/images/default-image.png"} 
            alt={doctor ? `Photo of Dr. ${doctor.name}` : "Default doctor image"} 
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },

  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data} }) => {

      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            title="Schedule Appointment"
            description="Please confirm the details of your appointment."
          />

          <AppointmentModal
            type="cancel"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            title="Cancel Appointment"
            description="Are you sure you want to cancel this appointment?"
          />
        </div>
      );
    },
  },
];