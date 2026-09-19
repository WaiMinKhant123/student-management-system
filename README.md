# Student Management System (Laravel 11 API + React)
## Application Screenshots

![Student List View](./screenshots/student-list.png)
![Register Student](./screenshots/register.png)
![Edit Student](./screenshots/edit.png)

## Setup & Installation
Make sure you have the following installed on your machine:
- **PHP** >= 8.2
- **Composer**
- **Node.js** >= 18.x & **npm**
- **MySQL** Database Server

- ### 1. Backend Setup (Laravel API)

 Open terminal and navigate to the backend directory:
- **cd backend**
- **composer install**
- **cp .env.example .env**
- **edit .env file**
- **php artisan key:generate**
- **php artisan migrate:fresh --seed**
- **php artisan serve**
- **Backend API will run at: http://127.0.0.1:8000**

- ### 2. Frontend Setup (React Vite)
Open a new terminal tab and navigate to the frontend directory:
- **cd frontend**
- **npm install**
- **npm run dev**   
