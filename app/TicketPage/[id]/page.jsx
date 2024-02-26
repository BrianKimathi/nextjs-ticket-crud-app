import TicketForm from "@/app/(components)/TicketForm";
import React from "react";

const getTicketById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to get ticket.");
    }

    // Await and return the result of res.json()
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

const TicketPage = async ({ params }) => {
  const EDITMODE = params.id === "new" ? false : true;

  let updateTicketData = {};

  if (EDITMODE) {
    updateTicketData = await getTicketById(params.id);
    updateTicketData = updateTicketData.foundTicket;
  } else {
    updateTicketData = { _id: "new" };
  }

  return (
    <div>
      <TicketForm ticket={updateTicketData} />
    </div>
  );
};

export default TicketPage;
