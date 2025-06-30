const INCIDENTS_KEY = "incidents";

export function getIncidents() {
  const incidents = localStorage.getItem(INCIDENTS_KEY);

  if (incidents) {
    return JSON.parse(incidents);
  } else {
    localStorage.setItem(INCIDENTS_KEY, JSON.stringify([]));
    return [];
  }
}


export function saveIncidents(data) {
  localStorage.setItem(INCIDENTS_KEY, JSON.stringify(data));
}

export function getIncidentsByPatient(patientId) {
  const all = getIncidents();
  return all.filter(function (incident) {
    return incident.patientId === patientId;
  });
}
