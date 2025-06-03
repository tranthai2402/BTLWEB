# My Web App

This project is a simple web application built using ReactJS for the frontend and NodeJS for the backend. It features user authentication, a blog for posting and viewing content, and the ability to upload photos.

## Features

- User registration and login
- Display a personalized greeting upon successful login
- Add new blog posts
- View blog posts from other users
- Upload photos

## Project Structure

```
my-web-app
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── LoginRegister.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── Post.jsx
│   │   │   └── PhotoUpload.jsx
│   │   ├── pages
│   │   │   ├── Home.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── index.js
│   ├── public
│   │   └── index.html
│   └── package.json
├── backend
│   ├── src
│   │   ├── controllers
│   │   │   ├── authController.js
│   │   │   ├── postController.js
│   │   │   └── photoController.js
│   │   ├── models
│   │   │   ├── User.js
│   │   │   └── Post.js
│   │   ├── routes
│   │   │   ├── auth.js
│   │   │   ├── posts.js
│   │   │   └── photos.js
│   │   ├── middleware
│   │   │   └── auth.js
│   │   └── app.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Frontend

1. Navigate to the `frontend` directory.
2. Install dependencies using:
   ```
   npm install
   ```
3. Start the development server with:
   ```
   npm start
   ```

### Backend

1. Navigate to the `backend` directory.
2. Install dependencies using:
   ```
   npm install
   ```
3. Start the server with:
   ```
   npm start
   ```

## Usage

- Visit the frontend application in your browser to register or log in.
- After logging in, you can add new posts, view existing posts, and upload photos.

## License

This project is licensed under the MIT License.