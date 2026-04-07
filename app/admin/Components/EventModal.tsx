"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {
  onSave?: () => void;
  selectedDate?: string | null;
};

export default function AddEventModal({ onSave, selectedDate }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const allowedTypes = [
    "MEETING",
    "BIRTHDAY",
    "HOLIDAY",
    "PERSONAL",
    "GENERAL",
  ];

  useEffect(() => {
    if (selectedDate) {
      (async () => {
        await setDate(selectedDate);
      })();
    }
  }, [selectedDate]);

  const createEvent = async () => {
    if (!title || !date || !startTime || !endTime) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const startDateTime = new Date(`${date}T${startTime}`).toISOString();
      const endDateTime = new Date(`${date}T${endTime}`).toISOString();
      await axios.post("http://localhost:4000/api/event/createEvent", {
        title,
        date,
        startTime: startDateTime,
        endTime: endDateTime,
        description,
        type,
      });

      setIsOpen(false);
      setTitle("");
      setDate("");
      setStartTime("");
      setEndTime("");
      setDescription("");
      setType("");
      if (onSave) onSave();
    } catch (err) {
      console.error(err);
      alert("Failed to create event");
    }
  };

  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gray-800 text-white w-full px-4 py-2 rounded-lg hover:bg-gray-700 transition"
      >
        Create Event
      </button>
    );

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-gray-700 text-white p-6 rounded-xl w-full max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Add Event</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 p-2 border border-gray-500 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-3 p-2 border border-gray-500 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2 mb-3">
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-1/2 p-2 border border-gray-500 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-1/2 p-2 border border-gray-500 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-3 p-2 border border-gray-500 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full mb-3 p-2 border border-gray-500 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" className="bg-gray-800 text-white">
            Select type
          </option>

          {allowedTypes.map((t) => (
            <option key={t} value={t} className="bg-gray-800 text-white">
              {t}
            </option>
          ))}
        </select>

        <button
          onClick={createEvent}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
        >
          Save Event
        </button>
      </div>
    </div>
  );
}
