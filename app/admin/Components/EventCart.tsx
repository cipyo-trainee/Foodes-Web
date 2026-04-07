"use client";

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

type EventCardProps = {
  events: EventType[];
  onClose: () => void;
};

export default function EventCard({ events, onClose }: EventCardProps) {
  return (
    <div
      className="bg-gray-800 text-white p-4 rounded shadow-md flex flex-col gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="self-end text-gray-300 hover:text-white font-bold"
      >
        X
      </button>
      {events.map((event) => (
        <div
          key={event.id}
          className="p-2 rounded-md"
          style={{
            backgroundColor: event.color || "#555",
          }}
        >
          <div className="font-semibold">{event.title}</div>
          <div className="text-xs">
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
          <div className="text-sm">{event.description}</div>
          <div className="text-sm">{event.type}</div>
        </div>
      ))}
    </div>
  );
}
