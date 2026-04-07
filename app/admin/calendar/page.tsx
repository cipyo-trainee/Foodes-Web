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

const typeLabels: Record<string, string> = {
  MEETING: "Meeting",
  BIRTHDAY: "Birthday",
  HOLIDAY: "Holiday",
  PERSONAL: "Personal",
  GENERAL: "General",
};

const formatDate = (date: Date | string) =>
  new Date(date).toLocaleDateString("en-CA");

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"day" | "week" | "month">("week");
  const [selectedEvents, setSelectedEvents] = useState<EventType[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

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

  // ✅ FIXED MONTH FUNCTION (ONLY CHANGE)
  const getMonthDays = (date: Date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const days: (Date | null)[] = [];
    // padding before first day
    const startDay = start.getDay();
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    // actual days
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    // padding after
    while (days.length % 7 !== 0) {
      days.push(null);
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
      <div className="flex flex-col justify-center items-center h-screen gap-4 bg-gray-950">
        <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>{" "}
        <p className="text-white">Loadind...</p>
      </div>
    );

  return (
    <div
      className="p-6 bg-gray-950 min-h-screen text-white"
      onClick={() => setSelectedEvents([])}
    >
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6 bg-gray-900 p-4 rounded-xl shadow-lg">
        <div className="flex gap-3 items-center">
          <button
            onClick={prev}
            className="p-2 bg-gray-800 hover:bg-indigo-600 transition rounded-lg"
          >
            <FaArrowLeft />
          </button>
          <div className="text-xl font-bold tracking-wide">
            {view === "day" && currentDate.toLocaleDateString()}

            {view === "week" &&
              (() => {
                const start = new Date(currentDate);
                start.setDate(currentDate.getDate() - currentDate.getDay());

                return `Week of ${start.toLocaleDateString()}`;
              })()}

            {view === "month" &&
              currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
          </div>
          <button
            onClick={next}
            className="p-2 bg-gray-800  hover:bg-indigo-600 transition rounded-lg"
          >
            <FaArrowRight />
          </button>
        </div>

        <div className="flex gap-2">
          {["day", "week", "month"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v as "day" | "week" | "month")}
              className={`px-4 py-1 rounded-lg font-medium transition ${
                view === v
                  ? "bg-indigo-500 shadow-md"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      {/* MONTH VIEW */}
      {view === "month" ? (
        <div className="grid grid-cols-7 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="bg-gray-900 text-center p-3 text-sm font-semibold border-b border-gray-800"
            >
              {day}
            </div>
          ))}

          {currentDates.map((day, idx) => {
            // ✅ handle empty cells
            if (!day) {
              return (
                <div
                  key={idx}
                  className="border border-gray-800 h-28 bg-gray-950"
                />
              );
            }

            const dateStr = formatDate(day);
            const dayEvents = events.filter(
              (e) => formatDate(e.date) === dateStr,
            );

            const grouped = dayEvents.reduce<Record<string, EventType[]>>(
              (acc, e) => {
                if (!acc[e.type]) acc[e.type] = [];
                acc[e.type].push(e);
                return acc;
              },
              {},
            );
            return (
              <div
                key={dateStr}
                className="border border-gray-800 h-28 p-2 bg-gray-900 hover:bg-gray-800 transition cursor-pointer rounded-md relative"
                onClick={(ev) => {
                  ev.stopPropagation();
                  setSelectedEvents(dayEvents);
                  setSelectedDate(dateStr);
                }}
              >
                <div className="text-sm font-bold text-gray-400">
                  {day.getDate()}
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  {Object.entries(grouped).map(([type, list]) => (
                    <div
                      key={type}
                      className="text-[10px] px-2 py-1 rounded-full text-white w-fit"
                      style={{
                        backgroundColor: typeColors[type] || typeColors.DEFAULT,
                      }}
                    >
                      {list.length} {typeLabels[type]}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* DAY / WEEK VIEW (UNCHANGED) */
        <div
          className="grid border border-gray-800 rounded-xl overflow-hidden shadow-lg relative"
          style={{
            gridTemplateColumns: `80px repeat(${currentDates.length}, 1fr)`,
          }}
        >
          <div className="bg-gray-900 flex items-center justify-center text-gray-400 font-medium">
            Time
          </div>
          {currentDates.map((day) => {
            if (!day) return null;
            return (
              <div
                key={day.toString()}
                className="bg-gray-900 text-center p-2 border-l border-gray-800"
              >
                <div className="text-sm text-gray-400">
                  {day.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
                <div className="font-semibold">{day.getDate()}</div>
              </div>
            );
          })}
          {hours.map((hour) => (
            <div key={hour} className="contents">
              <div className=" bg-gray-900 text-gray-400 text-sm border-t border-gray-800 flex items-center justify-center">
                {hour}:00
              </div>
              {currentDates.map((day) => {
                if (!day) return null; // ✅ important check for null
                const dateStr = formatDate(day);
                const cellEvents = events.filter((event) => {
                  const startHour = new Date(event.startTime).getHours();
                  return (
                    formatDate(event.date) === dateStr && startHour === hour
                  );
                });
                return (
                  <div
                    key={`${dateStr}-${hour}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvents(cellEvents);
                      setSelectedDate(dateStr);
                    }}
                    className="relative h-20 border-b border-gray-800 cursor-pointer"
                  >
                    {cellEvents.length > 0 &&
                      (() => {
                        // Group events in this cell by type
                        const groupedEvents = cellEvents.reduce<
                          Record<string, EventType[]>
                        >((acc, ev) => {
                          const typeKey = ev.type.toUpperCase();
                          if (!acc[typeKey]) acc[typeKey] = [];
                          acc[typeKey].push(ev);
                          return acc;
                        }, {});

                        return Object.entries(groupedEvents).map(
                          ([type, list]) => {
                            const durationHours = Math.max(
                              (new Date(list[0].endTime).getTime() -
                                new Date(list[0].startTime).getTime()) /
                                (1000 * 60 * 60),
                              0.5,
                            );
                            const count = Object.keys(groupedEvents).length;
                            const width = `calc(${100 / count}% - 4px)`;
                            const left = `${(Object.keys(groupedEvents).indexOf(type) * 100) / count}%`;

                            return (
                              <div
                                key={type}
                                className="absolute top-0 p-1 text-xs overflow-hidden box-border"
                                style={{
                                  borderColor:
                                    typeColors[type] || typeColors.DEFAULT,
                                  width,
                                  left,
                                  borderStyle: "solid",
                                  borderWidth: "1px",
                                  height: `${durationHours * 100}%`,
                                }}
                              >
                                <div
                                  className="font-bold truncate "
                                  style={{
                                    color:
                                      typeColors[type] || typeColors.DEFAULT,
                                  }}
                                >
                                  {list.length > 1
                                    ? `${list.length} ${typeLabels[type]}`
                                    : list[0].title}
                                </div>
                              </div>
                            );
                          },
                        );
                      })()}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
      <div className="mt-6 flex justify-between items-start gap-6 flex-wrap">
        {selectedEvents.length > 0 && (
          <div className="flex-1 min-w-[320px]">
            <EventCard
              events={selectedEvents}
              onClose={() => setSelectedEvents([])}
            />
          </div>
        )}
        {selectedEvents.length === 0 && (
          <div>
            <AddEventModal onSave={fetchData} selectedDate={selectedDate} />
          </div>
        )}
      </div>
    </div>
  );
}
