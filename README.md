## CryptoVault Dashboard

A secure, full-stack portfolio intelligence platform for real-time cryptocurrency tracking and analysis.

## Demo video 

A short walkthrough demonstrating authentication, asset management, and live portfolio calculations:

 https://drive.google.com/file/d/1XuDvSzRXvxGlgv-2eSOpwDGSpX2BtrzM/view?usp=sharing
 
## Live Deployment

Frontend (Vercel)
https://cryptovault-dashboard.vercel.app/

Backend (Railway)
Deployed as a Dockerized Node.js service on Railway.

Database (MySQL)
Hosted on Clever Cloud.

Note: The application is fully functional on desktop/laptop browsers. On some mobile devices, authentication behavior may vary due to stricter mobile browser cookie policies when using HttpOnly cookies across cross-domain services.
This is a known deployment constraint, and it can be addressed with adjustments to cookie configuration and authentication strategy. I am currently working on resolving this to ensure consistent behavior across all devices.


## Table of Contents

  - Project Overview

  - Key Features

  - System Architecture

  - Deployment Architecture

  - Technical Stack

  - Database Schema

  - API Documentation

  - Installation and Setup

  - Environment Variables

  - Scalability and Future Roadmap


## Project Overview

CryptoVault is designed for users who need a centralized, secure solution to monitor their digital asset performance. Unlike basic crypto trackers, this application combines persistent user portfolio data with volatile real-time market prices to deliver an accurate and continuously updated view of portfolio health.

This project demonstrates strong understanding of:

 - Secure authentication using JWT and HttpOnly cookies

 - Backend validation and protected routes

 - Integration of third-party market APIs

 - Containerized deployment using Docker

The goal is to showcase practical, production-ready full-stack engineering practices commonly expected in FinTech and Web3 platforms.

## Key Features
-Security

 --JWT Authentication using HttpOnly Cookies to prevent XSS attacks

 --Password hashing with Bcrypt

 --Middleware-protected routes for all sensitive endpoints

-Portfolio Intelligence

 --Real-time cryptocurrency price synchronization

 --Automatic portfolio valuation and 24-hour performance calculations

 --Client-side search and filtering by asset name or symbol

-DevOps and UI

 --Fully Dockerized frontend and backend using Docker Compose and deployed

 --Responsive UI built with Tailwind CSS

## System Architecture

User Browser
→ React + Tailwind Frontend
→ JWT stored in HttpOnly Cookie
→ Node.js + Express Backend API
→ MySQL Database (Clever Cloud)
→ External Cryptocurrency Market API

## Deployment Architecture

Frontend: React application deployed on Vercel

Backend: Node.js + Express REST API deployed on Railway

Database: MySQL hosted on Clever Cloud

Infrastructure: Docker and Docker Compose for local development and consistency

## Technical Stack
-Frontend

 --React

 --Tailwind CSS

 --React Hook Form

-Backend

 --Node.js

 --Express.js

-Authentication and Security

 --JWT

 --Bcrypt

-Database

 --MySQL (Clever Cloud)

-Infrastructure

 --Docker
 --Docker Compose
 --Vercel
 --Railway
 --Clever Cloud


## Database Schema

Users Table

- id (primary key)

- username

- email

- password (hashed)

- created_at

- updated_at

Assets Table

- id (primary key)

- user_id (foreign key)

- name

- symbol

- quantity

- created_at

- updated_at

## API Documentation

-Authentication Endpoints

POST /api/auth/register
Creates a new user account

POST /api/auth/login
Authenticates user and sets JWT in HttpOnly cookie

POST /api/auth/logout
Clears authentication cookie

GET /api/auth/me
Returns authenticated user details

-Portfolio Endpoints (Protected)

GET /api/assets
Returns user-specific assets

POST /api/assets
Adds a new crypto holding

PUT /api/assets/:id
Updates asset quantity

DELETE /api/assets/:id
Deletes an asset

-Profile Endpoints (protected)

PUT /api/profile/update-name
Updates username

PUT /api/profile/change-password
Changes password

## Installation and Setup

Prerequisites

 -Docker and Docker Desktop

 -Node.js v20 (only if running without Docker)

Using Docker (Recommended)

 -Clone the repository
  git clone https://github.com/PoojahariniK/cryptovault-dashboard.git

 -Create a .env file in the backend directory using the template below

 -Build and run the application
  docker compose build
  docker compose up -d


 -Access the application
  Frontend: http://localhost:3000
  Backend API: http://localhost:5000

## Environment Variables
-backend
PORT
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_super_secret_key
FRONTEND_URL=your_frontend_base_url

-frontend
REACT_APP_API_URL=your_backend_base_url

## Scalability and Future Roadmap

WebSocket integration for live price streaming

Historical portfolio charts using Chart.js or Recharts

Multi-currency portfolio support (USD, EUR, INR)

Role-based access control for advanced features

Author

Poojaharini K
