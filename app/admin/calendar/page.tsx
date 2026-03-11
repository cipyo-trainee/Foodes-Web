"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import EventCard from "../Components/EventCart";
import { Spinner } from "@heroui/spinner";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import AddEventModal from "../Components/EventModal";

type EventType = {
  id: number | string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  color?: string;
  type: string;
};

const typeColors: Record<string, string> = {
  MEETING: "#3b82f6",
  BIRTHDAY: "#f59e0b",
  HOLIDAY: "#10b981",
  PERSONAL: "#ef4444",
  GENERAL: "#8b5cf6",
  DEFAULT: "#9ca3af",
};

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"day" | "week" | "month">("week");
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/event/GetEvent");
      setEvents(res.data.data);
    } catch (err) {
      console.error(err);
      setEvents([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, [fetchData]);

  const getWeekDays = (date: Date) => {
    const start = new Date(date);

    start.setDate(date.getDate() - date.getDay());
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  const getMonthDays = (date: Date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const days: Date[] = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    return days;
  };

  const hours = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 8), []);

  const currentDates =
    view === "day"
      ? [currentDate]
      : view === "week"
        ? getWeekDays(currentDate)
        : getMonthDays(currentDate);
  const prev = () => {
    const d = new Date(currentDate);
    if (view === "day") d.setDate(d.getDate() - 1);
    else if (view === "week") d.setDate(d.getDate() - 7);
    else d.setMonth(d.getMonth() - 1);
    setCurrentDate(new Date(d));
  };

  const next = () => {
    const d = new Date(currentDate);
    if (view === "day") d.setDate(d.getDate() + 1);
    else if (view === "week") d.setDate(d.getDate() + 7);
    else d.setMonth(d.getMonth() + 1);
    setCurrentDate(new Date(d));
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-3 bg-gray-900">
        <Spinner className="text-green-500 animate-spin" size="lg" />
        <span className="text-green-400 font-semibold text-lg">
          Loading Events...
        </span>
      </div>
    );

  return (
    <div
      className="p-6 bg-gray-900 rounded-xl min-h-screen flex flex-col gap-6 relative"
      onClick={() => setSelectedEvent(null)}
    >
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="flex gap-2 items-center">
          <button
            onClick={prev}
            className="px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
          >
            <FaArrowLeft size={18} />
          </button>
          <div className="text-xl font-bold text-white">
            {view === "day" && currentDates[0].toLocaleDateString()}
            {view === "week" &&
              `Week of ${currentDates[0].toLocaleDateString()}`}
            {view === "month" &&
              currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
          </div>
          <button
            onClick={next}
            className="px-3 py-1  bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
          >
            <FaArrowRight size={18} />
          </button>
        </div>

        {/* View Buttons */}
        <div className="flex gap-2">
          {["day", "week", "month"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v as "day" | "week" | "month")}
              className={`px-3 py-1 rounded font-semibold transition ${
                view === v
                  ? "bg-indigo-500 text-white shadow-lg"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Views */}
      {view === "month" ? (
        <div className="grid grid-cols-7 gap-0 border border-gray-700 rounded-lg overflow-hidden">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="border-b  border-gray-700 bg-gray-800 text-white text-center p-2 font-semibold"
            >
              {day}
            </div>
          ))}
          {currentDates.map((day) => {
            const dateStr = day.toISOString().slice(0, 10);
            const dayEvents = events.filter(
              (e) => e.date.slice(0, 10) === dateStr,
            );
            return (
              <div
                key={dateStr}
                className="border p-2 h-28 flex flex-col gap-1 overflow-hidden  bg-gray-800 text-white rounded-md hover:bg-gray-700 transition cursor-pointer"
              >
                <div className="font-semibold text-sm">{day.getDate()}</div>
                {dayEvents.slice(0, 3).map((e) => (
                  <div
                    key={e.id}
                    className="text-[10px] px-1 py-0.5 rounded 
                     cursor-pointer truncate"
                    style={{
                      backgroundColor: typeColors[e.type] || typeColors.DEFAULT,
                    }}
                    onClick={(ev) => {
                      ev.stopPropagation();
                      setSelectedEvent(e);
                    }}
                  >
                    {e.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-[10px] text-gray-300">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        // Day/Week view with full event cells
        <div
          className="grid border border-gray-700 rounded-lg overflow-hidden"
          style={{
            gridTemplateColumns: `80px repeat(${currentDates.length}, 1fr)`,
          }}
        >
          {/* Time corner */}
          <div className="border-r border-b border-gray-700 bg-gray-800 text-white flex items-center justify-center font-semibold">
            Time
          </div>
          {/* Headers */}
          {currentDates.map((day) => (
            <div
              key={day.toISOString()}
              className="border-b border-gray-700 bg-gray-800 text-white text-center p-2 font-semibold"
            >
              {day.toLocaleDateString("en-US", { weekday: "short" })}
              <div className="text-sm">{day.getDate()}</div>
            </div>
          ))}
          {/* Hour rows */}
          {hours.map((hour) => (
            <div key={hour} className="contents">
              {/* Time label */}
              <div
                className="border-r border-b border-gray-700 bg-gray-800 text-gray-300 flex items-center justify-center font-mono text-sm"
                style={{ height: "80px" }}
              >
                {hour}:00
              </div>
              {currentDates.map((day) => {
                const dateStr = day.toISOString().slice(0, 10);
                const cellEvents = events.filter((event) => {
                  const eventDate = new Date(event.date)
                    .toISOString()
                    .slice(0, 10);
                  const startHour = new Date(event.startTime).getHours();
                  return eventDate === dateStr && startHour === hour;
                });
                return (
                  <div
                    key={`${dateStr}-${hour}`}
                    className="border-b border-r border-gray-700 flex flex-col gap-1 p-1 relative cursor-pointer"
                    style={{ height: "80px" }}
                    onClick={() => setSelectedEvent(null)}
                  >
                    {cellEvents.map((event) => (
                      <div
                        key={event.id}
                        className="w-full px-2 py-1 text-white text-xs rounded-md shadow-sm flex flex-col justify-center truncate"
                        style={{
                          backgroundColor:
                            typeColors[event.type] || typeColors.DEFAULT,
                          height: "70px",
                          width: "200px",

                          // fixed height
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(event);
                        }}
                      >
                        <div className="font-semibold truncate">
                          {event.title}
                        </div>
                        <div className="text-[10px] truncate">
                          {new Date(event.startTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          -{" "}
                          {new Date(event.endTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
      {selectedEvent && (
        <EventCard
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
      <AddEventModal />
    </div>
  );
}
