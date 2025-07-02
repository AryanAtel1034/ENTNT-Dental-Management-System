# ENTNT Dental Management System

## Overview

The ENTNT Dental Management System is a React application that simplifies dental laboratory operations by digitizing key processes. Its comprehensive feature set includes appointment scheduling, Patient management, patient record keeping, real-time reporting, and Appointment calender communication tools.

### Features
-  Landing page with KPIs and navigation
-  Role-based login system (Admin / Patient)
-  Admin dashboard with:
  - KPI cards (revenue, top patients, pending/completed treatments)
  - Add/edit patients and incidents
  - Appointment management and calendar
-  Patient dashboard with:
  - Profile and personal appointments
  - File download & preview
-  Calendar view with appointment markers

## Technologies

Our application is built upon a carefully selected technology stack designed to enhance the performance, scalability, and maintainability of the software. Below is an outline of the key technologies used and the rationale behind their selection.

### [React ](https://react.dev/) 🚀

React serves as the core framework for building our web application. Its component-based architecture enables the creation of reusable, interactive UI elements with efficient state management. Powered by a virtual DOM, React ensures high performance and seamless user experiences. Backed by a strong community and maintained by Meta, it offers a robust ecosystem for developing scalable and maintainable web applications.


### [TailWind CSS](https://tailwindcss.com/) 🔥

Tailwind CSS is used as the utility-first CSS framework for styling our web application. It allows us to rapidly build modern, responsive UIs directly within our HTML or JSX by using pre-defined utility classes. This approach eliminates the need for writing custom CSS, enhances consistency across the design, and speeds up the development process. Its flexibility and responsiveness make it ideal for creating clean, scalable, and maintainable user interfaces.

### [React Router](https://reactrouter.com/) 🍃

We selected MongoDB as our primary database due to its flexibility and scalability. MongoDB's document-oriented structure is well-suited for storing complex and hierarchical data, which aligns perfectly with the diverse and dynamic data we deal with in the Dental Lab Management app. This enables us to iterate quickly, manage data efficiently, and scale as needed.



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need Node.js, npm, and React CLI installed on your system to run this application. If not installed, you can follow the instructions in the respective documentation:

- [Node.js](https://nodejs.org/en/download/package-manager/)
- [npm](https://www.npmjs.com/get-npm)
- [React Native CLI](https://react.dev/)

## Installation

To setup the project locally, follow the next steps:

1. Clone the repository:

```
git clone https://github.com/AryanAtel1034/ENTNT-Dental-Management-System.git
```

2. Navigate into the cloned repository directory:

```
cd entnt-dental-dashboard
```

3. Install the dependencies:

```
npm install
```

4. Additional Commands 
```
npm install react-router-dom
npm install -D tailwindcss@3
npx tailwindcss init
npm install react-calendar
npm install react-calendar --save
npm install lucide-react
```

## Running the webiste

To start the webiste, run:

```
npm start
```
or
```
npm run dev
```

### User Roles & Credentials
 ```
Admin
Email: admin@entnt.in
Password: admin123
```
```
Patient
Email: john@entnt.in
Password: patient123
```



## Contributing

We highly appreciate contributions to the ENTNT Dental Management system . If you would like to contribute, kindly fork the repository, make your changes and submit a pull request. Make sure your code adheres to our coding standards and conventions.

More details will be provided here in the future.

