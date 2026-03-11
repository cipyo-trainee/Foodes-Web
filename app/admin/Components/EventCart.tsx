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

export default function EventCard({
  event,
  onClose,
}: {
  event: EventType;
  onClose?: () => void;
}) {
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
    <div className="relative border-gray-500 text-white    bg-gray-800 shadow-lg rounded-lg p-6">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 left-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>
      )}

      {badgeText && (
        <span
          className={`absolute top-2 right-2 text-white text-xs px-2 py-1 rounded-full ${badgeColor}`}
        >
          {badgeText}
        </span>
      )}

      <h2 className="text-xl font-bold mb-2">{event.title}</h2>

      <p className="text-white mb-1">
        <span className="font-semibold">Date:</span>{" "}
        {eventDate.toLocaleDateString()}
      </p>

      <p className="text-white mb-1">
        <span className="font-semibold">Time:</span>{" "}
        {new Date(event.startTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}{" "}
        -{" "}
        {new Date(event.endTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          
        })}
      </p>

      <p className="text-white">{event.description}</p>
      <p className="text-white">{event.type}</p>
    </div>
  );
}
