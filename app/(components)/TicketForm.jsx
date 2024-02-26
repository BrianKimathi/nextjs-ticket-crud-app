"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const TicketForm = ({ ticket }) => {
  const EDITMODE = ticket._id === "new" ? false : true;

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    // Add the 'e' parameter here
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to Update Ticket");
      }
      router.refresh();
      router.push("/");
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to create Ticket");
      }
      router.refresh();
      router.push("/");
    }
  };

  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Issues",
  };

  if (EDITMODE) {
    startingTicketData["title"] = ticket.title;
    startingTicketData["description"] = ticket.description;
    startingTicketData["priority"] = ticket.priority;
    startingTicketData["progress"] = ticket.progress;
    startingTicketData["status"] = ticket.status;
    startingTicketData["category"] = ticket.category;
  }

  const [formData, setFormData] = useState(startingTicketData);

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}>
        <h3>{EDITMODE ? "Update Your Ticket" : "Create Your Ticket"}</h3>

        <label>Title</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          required
          value={formData.title}
        />

        <label>Description</label>
        <textarea
          type="text"
          id="description"
          name="description"
          onChange={handleChange}
          required
          value={formData.description}
          rows="5"
        />

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}>
          <option value="Hardware Issues">Hardware Issues</option>
          <option value="Software Issues">Software Issues</option>
          <option value="Network Issues">Network Issues</option>
        </select>

        <label>Priority</label>
        <div>
          <input
            id="priority-1"
            type="radio"
            name="priority"
            value={1}
            onChange={handleChange}
            checked={formData.priority == 1}
          />
          <label>1</label>

          <input
            id="priority-2"
            type="radio"
            name="priority"
            value={2}
            onChange={handleChange}
            checked={formData.priority == 2}
          />
          <label>2</label>

          <input
            id="priority-3"
            type="radio"
            name="priority"
            value={3}
            onChange={handleChange}
            checked={formData.priority == 3}
          />
          <label>3</label>

          <input
            id="priority-4"
            type="radio"
            name="priority"
            value={4}
            onChange={handleChange}
            checked={formData.priority == 4}
          />
          <label>4</label>

          <input
            id="priority-5"
            type="radio"
            name="priority"
            value={5}
            onChange={handleChange}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>
        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />

        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done </option>
        </select>

        <input
          type="submit"
          className="btn"
          value={`${EDITMODE ? "Update Ticket" : "Create Ticket"}`}
        />
      </form>
    </div>
  );
};

export default TicketForm;
