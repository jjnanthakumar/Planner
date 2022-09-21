# Planner

<p style="margin: 3rem 0 4rem 0;" align="center">
<img src="./src/images/planner.png" alt="Planner Home Screen" />
</p>

[![Netlify Status](https://api.netlify.com/api/v1/badges/5886829b-1f1f-4ddb-9e2e-991cf1f5ec07/deploy-status)](https://app.netlify.com/sites/planner/deploys)

Get more done with Planner. 

Manage, capture and edit your daily events, notes and tasks.

# Introduction

Planner is a full stack web application built in MERN stack to keep a track of your activity every month, every day, every hour.

-   **Runtime used for whole application** - [Node.js](https://nodejs.org/)
-   **Frontend framework** - [React JS](https://reactjs.org/)
-   **CSS preprocessor** - [SASS](https://sass-lang.com/)
-   **Backend framework** - [Express](https://expressjs.com/)
-   **Database** - [MongoDB](https://www.mongodb.com/)

# Navigation

-   **Home Page** - Planner Home page contains links to different pages of the web app.

-   **Calendar** - Planner contains a calendar to view the days of any month of any year, withour any year limit. Unlike other calendars, it works on an algorithm.
<p align="center">
<img src="./src/images/help/0/0.png" alt="Calendar" style="width: 75%" />
</p>

-   **Events** - In the planner events, you can create, edit and delete an event. For e.g) vreate an event for your best friend's borthday to keep yourself reminded on the big day.
<p align="center">
<img src="./src/images/help/1/0.png" alt="Events" style="width: 75%" />
</p>

-   **Notes** - Use planner notes to record every thought that you want to track. Whether it is an article you saw on internet or a blog you want to save for later or a short poem that you just wrote.
<p align="center">
<img src="./src/images/help/2/0.png" alt="Noets" style="width: 75%" />
</p>

-   **Tasks** - Use planner tasks to keep track of your day-to-day activities. Create a task to remind you to buy groceries, prepare for an early test and schedule a meeting with your colleagues.
<p align="center">
<img src="./src/images/help/3/0.png" alt="Noets" style="width: 75%" />
</p>

-   **Help** - To get help on Planner, click on the Help button in the side bar to visit the help section of the planner.

-   **Feedback** - To leave a feedback to the developers, click on the feedback/report-a-bug button in the side bar of the app. Please be polite in any kind of feedback. Any appreciation of work or a bug report or any other kind of feedback is welcome.

# Themes

Planner's color palette has been synchronized and carefully chosen to provide the best user experince.

The app will switch to dark mode automatically after 8:00 PM and will switch back to light mode at 8:00 AM.

Though the user can still switch between different modes as per their convenience.

To switch between different modes, click on theme icon in the header.

-   **Light Mode**

<img src="./src/images/PlannerNav/2b.png" alt="Dark Mode" style="margin: 2rem 7rem" />

-   **Dark Mode**

<img src="./src/images/PlannerNav/2a.png" alt="Light Mode" style="margin: 2rem 7rem" />

# Development

To clone copy the following command in your terminal and start development.

```sh
git clone https://github.com/akshatmittal61/planner.git
```

cd into the directory

```sh
cd planner
```

Install all the dependencies
```sh
npm i
```

Run the project in development mode

```sh
npm run react
```

Run the backend server

```sh
npm run server
```
This will run the server on port [$PORT](http://localhost:5000) locally with nodemon to continuously watch every change.

If you don't have nodemon on your system, run
```sh
npm i nodemon -g
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Environment Variables:
Building the .env
- **MONGO_CONNECTION_URL:** Create a database in MongoDB cluster and paste the connection string in here

- **PORT:** Assign a PORT to run teh backend server (usually `4000` or `5000`)
- **JWT_SECRET:** Assign a string for the JWT web token or request the [developers](#author) to provide you with the official one.
- **REACT_APP_BACKEND_URL:** Create the backend URL for which React App will send the server requests to.

# Author

-   [Akshat Mittal](https://akshatmittal61.vercel.app/)
-   [Sneha Sharma](https://snehasharma1111.github.io/)

## References and Libraries Used

-   [Material 3 Designs](https://m3.material.io/)
-   [Google Keep](https://keep.google.com)
-   [AOS](https://github.com/michalsnik/aos)
-   [Axios](https://axios-http.com/)
-   [Moment](https://momentjs.com/)