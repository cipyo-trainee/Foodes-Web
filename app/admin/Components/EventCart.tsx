"use client";

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

export default function EventCard({ event }: { event: EventType }) {
  const eventDate = new Date(event.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);

  let badgeText = "";
  let badgeColor = "";

  if (eventDate < today) {
    badgeText = "Closed Event";
    badgeColor = "bg-red-500";
  } else if (eventDate.getTime() === today.getTime()) {
    badgeText = "Happening Today";
    badgeColor = "bg-yellow-500";
  } else {
    badgeText = "Upcoming Event";
    badgeColor = "bg-green-500";
  }

  return (
    <div className="relative bg-white shadow-md rounded-lg p-6 mb-4">
      {badgeText && (
        <span
          className={`absolute top-2 right-2 text-white text-xs px-2 py-1 rounded-full ${badgeColor}`}
        >
          {badgeText}
        </span>
      )}
      <h2 className="text-xl font-bold mb-2">{event.title}</h2>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Date:</span>{" "}
        {eventDate.toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Time:</span>{" "}
        {new Date(event.startTime).toLocaleTimeString()} -{" "}
        {new Date(event.endTime).toLocaleTimeString()}
      </p>

      <p className="text-gray-700">{event.description}</p>
    </div>
  );
}
