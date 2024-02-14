# PollPit

Welcome to PollPit! PollPit is a web application where users can create, participate in, and view the results of polls. Users can also comment on polls, and creators receive notifications for comments. The application features four main pages: Home Page, Create Poll Page, Results Page, and Profile Page, along with live notifications . PollPit utilizes React for the frontend, Node.js and Express for the backend, MongoDB for the database, Cloudinary for profile image uploading, and JWT for authentication and authorization.Voting on polls , commenting on polls and notifications all are realtime build using the websockets.

## Features

- **Poll Creation**: Users can create polls with titles, descriptions, and two options.
- **Poll Participation**: Users can vote on polls created by other users.
- **Poll Results**: Users can view the results of polls they have participated in.
- **Commenting**: Users can comment on polls.
- **Notifications**: Creators receive notifications when users comment on their polls.
- **Authentication**: Implemented JWT-based authentication for user login and authorization.

## Pages

### 1. Home Page

![Home Page](/public/home_page.png)

- **Features**:
  - Display a list of recent polls.
  - Navigate to other pages: Create Poll, Results, Profile.

### 2. Create Poll Page

![Create Poll Page](/public/create_poll_page.png)

- **Features**:
  - Form for creating new polls with title, description, and two options.

### 3. Results Page

![Results Page](./public/results_page.png)

- **Features**:
  - Display the results of a poll after a user has voted.

### 4. Profile Page

![Profile Page](/public//profile_page.png)

- **Features**:
  - Display user information such as username, email, polls created by the user and the polls on which the user has voted on .

## Technologies Used

- **Frontend**: React
- **Socket.io** 
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **File Upload**: Cloudinary
- **Authentication**: JWT (JSON Web Tokens)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AmanSharma061/pp-client.git
   ```
   
2. Jump to pp-client directory
   ```bash
   cd pp-client
   ```
   
   
3. In the root directory create .env file for environment variables

4. Install the dependencies 
   ```bash
   npm install
   ```
5. Configure the environment variables i.e. VITE_CLOUDINARY_API_KEY

6. Visit the [Sever Repo ](https://github.com/AmanSharma061/pp-server) to setup the server also 

7. In the terminal typw thw given command
   ```bash
   npm run dev
   ```
8. In Your Browser Proceed to http://localhost:5173 to see the demo 
   
