"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import EventCard from "../Components/EventCart";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import AddEventModal from "../Components/EventModal";
import { Spinner } from "@heroui/spinner";

type EventType = {
  id: string | number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  color?: string;
  type: string;
};

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<EventType[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const modalRef = useRef<{ openModalWithDate: (d: string) => void }>(null);

  const eventTypeLabels: Record<string, { label: string; color: string }> = {
    BIRTHDAY: { label: "Birthday", color: "bg-pink-500" },
    MEETING: { label: "Meeting", color: "bg-blue-500" },
    HOLIDAY: { label: "Holiday", color: "bg-green-500" },
    PERSONAL: { label: "Personal", color: "bg-purple-500" },
    GENERAL: { label: "General", color: "bg-gray-500" },
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/event/GetEvent");
      setEvents(res.data.data);
    } catch (err) {
      console.error(err);
      setEvents([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);
  const refetchData = fetchData;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-2">
        <Spinner className="text-green-500 animate-spin" size="lg" />
        <span className="text-green-500 font-semibold">Loading...</span>
      </div>
    );

  // Build calendar days
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`}></div>);

  for (let day = 1; day <= totalDays; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();
    const dayEvents = events.filter((e) => e.date.startsWith(dateStr));
    const eventCounts: Record<string, number> = {};
    dayEvents.forEach((e) => {
      eventCounts[e.type] = (eventCounts[e.type] || 0) + 1;
    });

    days.push(
      <div
        key={day}
        onClick={() => {
          setSelectedDate(dateStr);
          modalRef.current?.openModalWithDate(dateStr);
        }}
        className={`relative border p-2 min-h-30 cursor-pointer transition ${isToday ? "border-blue-500 bg-gray-900 text-white" : "border-gray-200 bg-gray-800 text-white"} hover:bg-gray-700`}
      >
        <div className="font-semibold flex items-center justify-center text-sm">
          {day}
        </div>
        <div className="absolute bottom-1 left-1 right-1 flex flex-wrap gap-1 text-xs">
          {Object.entries(eventCounts).map(([type, count]) => (
            <div
              key={type}
              className={`px-1 py-0.5 rounded text-white ${eventTypeLabels[type].color} truncate`}
              title={`${count} ${eventTypeLabels[type].label}`}
            >
              {count} {eventTypeLabels[type].label}
            </div>
          ))}
        </div>
      </div>,
    );
  }

  const selectedEvents = selectedDate
    ? events.filter((e) => e.date.startsWith(selectedDate))
    : [];

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-900">
      {/* Calendar container - full width */}
      <div className="flex flex-col w-full mb-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={prevMonth}
            className="px-3 py-1 bg-gray-600 text-white rounded-xl hover:bg-gray-500"
          >
            <FaAngleLeft size={20} />
          </button>
          <h2 className="text-xl font-bold text-white">
            {currentDate.toLocaleString("default", { month: "long" })} {year}
          </h2>
          <button
            onClick={nextMonth}
            className="px-3 py-1 bg-gray-600 text-white rounded-xl hover:bg-gray-500"
          >
            <FaAngleRight size={20} />
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-2 text-white font-semibold">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>

      {/* Event cards appear below calendar, NOT inside cells */}
      {selectedEvents.length > 0 && (
        <div className="flex flex-col w-full mt-6">
          <h3 className="text-white font-bold mb-2">
            {selectedDate === today.toISOString().slice(0, 10)
              ? "Today's Events"
              : `Events on ${selectedDate}`}
          </h3>
          {selectedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {/* Modal */}
      <AddEventModal ref={modalRef} onSave={refetchData} />
    </div>
  );
}
