# YouTueb Clone -MERN Stack

This projet is a full-stack Youtube clone developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It simulates a video-sharing platform where users can interact with videos, add comments, create channels, and more.

## Project Overview
The project aims to reacreate a simplified version of youtube where user can:
- Register and login using JWT authentication.
- Browse a grid of video thumbnails, and filter them by title and category.
- View individual videos and comments and like/dislike options.
- Create and manage personal channels with the ability to upload, edit and delete videos.
- Interact with comments, logged user can add, edit and delete their comments on videos.

## Technologies Used

- **Frontend**:
    - React.js
    - React Router
    - Axios (for making HTTP requests)
    - JWT (for authentication)
    - Tailwind CSS (for styling)
    - Cloudinary (For storing images and videos)

- **Backend**:
    - Node.js
    - Express.js
    - MongoDB (for storing backend data)
    - JWT (for authentication)

- **Version Control**: Git

## Features

### Front-End Features
- **Home Page**:
    - Header with sign-in functionality
    - Sidebar that can be toggled via a hamburder menu.
    - Grid of video to filter by title.
    - Filter buttons to filter videos by category.
    - Search bar to filter videos by title.

- **User Autentication**:
    - User registration and login using JWT.
    - After sing-in, users profile pic is displayed in the header.

- **Video Player Page**:
    - Video Player for watching the videos.
    - Like and dislike buttons.
    - Comment section where user can add, edit, or delete comments.

- **Channel Page**:
    - User can create their channel after sign in
    - View videos associated with the user's channel.
    - Ability to edit or delete videos.

- **Responsive Design**:
    - The app is fully responsive and works seamlessly across mobile, tablet, and desktop devices.

### Back-End Features
- **User Authentication**:
    - Users can sign-up, log-in, and authenticate using JWT  tokens.
- **Video Management**:
    - APIs for fetching, adding, editing, and deleting Videos.
    - Video metadata (title, description, thumbnail, etc.) is stored in MongoDB.
- **Comment Management**:
    - APIs for adding, editing, fetching and deleting comments.
- **Like & Dislike Management**:
    - Single user can like or dislike any video only once.