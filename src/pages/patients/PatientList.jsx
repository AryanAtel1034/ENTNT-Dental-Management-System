import React, { useEffect, useState } from "react";
import { getPatients, savePatients } from "../../utils/storage";
import { v4 as uuidv4 } from "uuid";
import PatientForm from "./PatientForm";
import IncidentList from "./IncidentList";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [selected, setSelected] = useState(null);
  const [openIncidentsFor, setOpenIncidentsFor] = useState(null); 

  useEffect(() => {
    setPatients(getPatients());
  }, []);

  const handleSave = (data) => {
    let updated;
    if (data.id) {
      updated = patients.map(p => (p.id === data.id ? data : p));
    } else {
      data.id = uuidv4();
      updated = [...patients, data];
    }
    setPatients(updated);
    savePatients(updated);
    setSelected(null);
  };

  const handleDelete = (id) => {
    const updated = patients.filter(p => p.id !== id);
    setPatients(updated);
    savePatients(updated);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Manage Patients</h2>
      <PatientForm onSave={handleSave} selectedPatient={selected} onCancel={() => setSelected(null)} />

      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">DOB</th>
            <th className="p-2">Contact</th>
            <th className="p-2">Health Info</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <React.Fragment key={p.id}>
              <tr className="border-t">
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.dob}</td>
                <td className="p-2">{p.contact}</td>
                <td className="p-2">{p.healthInfo}</td>
                <td className="p-2 space-x-2">
                  <button onClick={() => setSelected(p)} className="bg-yellow-400 px-2 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                  <button onClick={() => setOpenIncidentsFor(openIncidentsFor === p.id ? null : p.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded">
                    {openIncidentsFor === p.id ? "Hide" : "Manage Incidents"}
                  </button>
                </td>
              </tr>

              {openIncidentsFor === p.id && (
                <tr>
                  <td colSpan="5" className="bg-gray-50 p-4">
                    <IncidentList patientId={p.id} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
