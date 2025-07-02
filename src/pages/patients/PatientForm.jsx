import React, { useState, useEffect } from "react";

const PatientForm = ({ onSave, selectedPatient, onCancel }) => {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    contact: "",
    healthInfo: "",
  });

  useEffect(() => {
    if (selectedPatient) {
      setForm(selectedPatient);
    }
  }, [selectedPatient]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({ name: "", dob: "", contact: "", healthInfo: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <input name="name" value={form.name} onChange={handleChange} required placeholder="Full Name"
        className="w-full border px-3 py-2 rounded" />
      <input name="dob" value={form.dob} onChange={handleChange} type="date" required
        className="w-full border px-3 py-2 rounded" />
      <input name="contact" value={form.contact} onChange={handleChange} required placeholder="Contact"
        className="w-full border px-3 py-2 rounded" />
      <input name="healthInfo" value={form.healthInfo} onChange={handleChange} placeholder="Health Info"
        className="w-full border px-3 py-2 rounded" />
      <div className="flex gap-4">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {selectedPatient ? "Update" : "Add"}
        </button>
        {selectedPatient && (
          <button type="button" onClick={onCancel} className="bg-gray-400 px-4 py-2 rounded">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default PatientForm;
