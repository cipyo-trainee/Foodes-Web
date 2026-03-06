"use client";

import axios from "axios";
import React, { forwardRef, useImperativeHandle, useState } from "react";

type Props = {
  onSave?: () => void; // callback to refresh events
};

const AddEventModal = forwardRef<
  { openModalWithDate: (d: string) => void },
  Props
>(({ onSave }, ref) => {
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
  ] as const;

  useImperativeHandle(ref, () => ({
    openModalWithDate(d: string) {
      setDate(d);
      setIsOpen(true);
    },
  }));

  const createEvent = async () => {
    if (!title || !date || !startTime || !endTime) {
      alert("Please fill in all required fields!");
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
    } catch (error) {
      console.error(error);
      alert("Failed to create event");
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center text-gray-500 bg-black/50 backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative bg-white w-full max-w-md p-6 rounded-xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              className="w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2 mb-3">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select event type</option>
              {allowedTypes.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0) + t.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={createEvent}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

AddEventModal.displayName = "AddEventModal";

export default AddEventModal;
