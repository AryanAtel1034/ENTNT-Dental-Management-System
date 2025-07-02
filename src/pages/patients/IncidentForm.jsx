import React, { useState, useEffect } from "react";

const IncidentForm = ({ onSave, selectedIncident, onCancel }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    comments: "",
    appointmentDate: "",
    cost: "",
    treatment: "",
    status: "",
    nextDate: "",
    files: [],
  });

  useEffect(() => {
    if (selectedIncident) setForm(selectedIncident);
  }, [selectedIncident]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onloadend = () => resolve({ name: file.name, url: reader.result });
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(results => {
      setForm(prev => ({ ...prev, files: [...prev.files, ...results] }));
    });
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({
      title: "",
      description: "",
      comments: "",
      appointmentDate: "",
      cost: "",
      treatment: "",
      status: "",
      nextDate: "",
      files: []
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <label className="block mb-1 text-sm font-medium">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="Toothache"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Upper molar pain"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Comments</label>
        <input
          name="comments"
          value={form.comments}
          onChange={handleChange}
          placeholder="e.g. Sensitive to cold"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Appointment Date & Time</label>
        <input
          type="datetime-local"
          name="appointmentDate"
          value={form.appointmentDate}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Cost (₹)</label>
        <input
          name="cost"
          value={form.cost}
          onChange={handleChange}
          placeholder="e.g. 500"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Treatment Description</label>
        <input
          name="treatment"
          value={form.treatment}
          onChange={handleChange}
          placeholder="e.g. Root Canal"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Status</label>
        <input
          name="status"
          value={form.status}
          onChange={handleChange}
          placeholder="e.g. Completed / Pending"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Next Appointment Date (Optional)</label>
        <input
          type="date"
          name="nextDate"
          value={form.nextDate}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Upload Files</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {selectedIncident ? "Update" : "Add"} Incident
        </button>
        {selectedIncident && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default IncidentForm;
