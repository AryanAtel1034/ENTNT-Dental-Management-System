const PATIENTS_KEY = "patients";

export function getPatients() {
  const data = localStorage.getItem(PATIENTS_KEY);

  if (data) {
    return JSON.parse(data);
  } else {
    const defaultPatients = [
      {
        id: "p1",
        name: "John Doe",
        dob: "1990-05-10",
        contact: "1234567890",
        healthInfo: "No allergies"
      }
    ];

    localStorage.setItem(PATIENTS_KEY, 
        JSON.stringify(defaultPatients));
    return defaultPatients;
  }
}


export function savePatients(list) {
       localStorage.setItem(PATIENTS_KEY, JSON.stringify(list));
}
