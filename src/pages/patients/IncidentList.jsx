import React, { useEffect, useState } from "react";
import { getIncidents, saveIncidents } from "../../utils/incidentStorage";
import { v4 as uuidv4 } from "uuid";
import IncidentForm from "./IncidentForm";

const IncidentList = ({ patientId }) => {
  const [incidents, setIncidents] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const all = getIncidents().filter(i => i.patientId === patientId);
    setIncidents(all);
  }, [patientId]);

  const handleSave = (incident) => {
    let updated;
    if (incident.id) {
      updated = getIncidents().map(i => i.id === incident.id ? incident : i);
    } else {
      incident.id = uuidv4();
      incident.patientId = patientId;
      updated = [...getIncidents(), incident];
    }
    saveIncidents(updated);
    setIncidents(updated.filter(i => i.patientId === patientId));
    setSelected(null);
  };

  const handleDelete = (id) => {
    const updated = getIncidents().filter(i => i.id !== id);
    saveIncidents(updated);
    setIncidents(updated.filter(i => i.patientId === patientId));
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Incidents for Patient</h3>
      <IncidentForm onSave={handleSave} selectedIncident={selected} onCancel={() => setSelected(null)} />
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Title</th>
            <th className="p-2">Date</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map(inc => (
            <tr key={inc.id} className="border-t">
              <td className="p-2">{inc.title}</td>
              <td className="p-2">{new Date(inc.appointmentDate).toLocaleString()}</td>
              <td className="p-2">{inc.status || "Pending"}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => setSelected(inc)} className="bg-yellow-400 px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(inc.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentList;
