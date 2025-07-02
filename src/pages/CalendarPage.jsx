import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getIncidents } from "../utils/incidentStorage";
import "./calendar-custom.css";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [incidents, setIncidents] = useState([]);
  const [selectedIncidents, setSelectedIncidents] = useState([]);

  const toLocalDate = (d) => new Date(d).toLocaleDateString("en-CA");

  useEffect(() => {
    const all = getIncidents();
    setIncidents(all);
    handleDateSelect(new Date());
  }, []);

  const handleDateSelect = (selectedDate) => {
    const day = toLocalDate(selectedDate);
    const filtered = incidents.filter((i) => {
      const appt = i.appointmentDate ? toLocalDate(i.appointmentDate) : "";
      const next = i.nextDate ? toLocalDate(i.nextDate) : "";
      return appt === day || next === day;
    });

    setSelectedIncidents(filtered);
    setDate(selectedDate);
  };

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;
    const dateStr = toLocalDate(date);
    const marked = incidents.some((i) => {
      const appt = i.appointmentDate ? toLocalDate(i.appointmentDate) : "";
      const next = i.nextDate ? toLocalDate(i.nextDate) : "";
      return appt === dateStr || next === dateStr;
    });
    return marked ? <div className="appointment-dot" /> : null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-8">
        <h2 className="text-3xl font-bold text-center">Appointment Calendar</h2>

        <div className="flex justify-center">
          <Calendar
            onChange={handleDateSelect}
            value={date}
            tileContent={tileContent}
            className="react-calendar border-none shadow-md rounded-md"
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-center">
            Appointments on <span className="text-blue-600">{toLocalDate(date)}</span>
          </h3>

          {selectedIncidents.length === 0 ? (
            <p className="text-center text-gray-500">No appointments found.</p>
          ) : (
            <ul className="space-y-4">
              {selectedIncidents.map((i) => (
                <li
                  key={i.id}
                  className="border border-gray-200 p-4 rounded-lg bg-gray-50 shadow-sm"
                >
                  <p><strong>Title:</strong> {i.title}</p>
                  <p><strong>Status:</strong> {i.status || "Pending"}</p>
                  <p><strong>Treatment:</strong> {i.treatment || "N/A"}</p>
                  <p><strong>Cost:</strong> ₹{i.cost || 0}</p>
                  <p><strong>Appointment:</strong> {i.appointmentDate ? new Date(i.appointmentDate).toLocaleString() : "-"}</p>
                  {i.nextDate && (
                    <p><strong>Follow-up:</strong> {new Date(i.nextDate).toLocaleDateString()}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
