# i-Manage - A White-Label booking platform 

A comprehensive white-label platform designed for micro and small businesses to streamline client scheduling and payment processing. Built with modern web technologies and integrated with industry-leading services.

## 📽 Project Demo

[![Watch the demo](https://img.youtube.com/vi/Ys5FP0LKm3E/0.jpg)](https://youtu.be/Ys5FP0LKm3E)

## 💡 Motivation

I noticed that small businesses often have long waiting times. Then I thought: what if my barber had a website where I could book and pay for my haircut in advance?

That insight led me to create i-Manage — a platform that helps small businesses easily build a website, manage their clients, and handle appointments through a simple and intuitive interface.

## 🚀 Overview

i-Manage is a powerful, customizable business management solution that enables entrepreneurs and small business owners to:

- **Schedule Management**: Efficiently manage client appointments and bookings
- **Payment Processing**: Seamlessly handle transactions with Stripe integration
- **Calendar Integration**: Sync with Google Calendar for seamless scheduling
- **White-Label Solution**: Customizable branding for different businesses
- **Client Portal**: Professional interface for client interactions

## 🛠️ Technology Stack

- **Frontend**: Next.js
- **Backend**: Python/Django
- **Database**: PostgreSQL
- **Payment**: Stripe API integration
- **Calendar**: Google Calendar API
- **Authentication**: Djoser, JWT

## ✨ Key Features

### 🔐 White-Label Capabilities

- Custom branding and domain support
- Tailored color schemes and logos
- Business-specific customization options

### 📅 Smart Scheduling

- Google Calendar integration
- Automated appointment booking
- Conflict detection and resolution
- Reminder notifications

### 💳 Payment Processing

- Stripe payment gateway integration
- Secure transaction handling

### 👥 Client Management

- Client portal and dashboard
- Booking history

## 🚀 Getting Started

1. Clone the repository
2. Create a virtual enviroment
3. Configure enviroment variables according to the .env.example file
4. Install dependencies (backend and frontend) and run the app

# Backend

```bash
cd backend
conda create -n i-manage python=3.10
conda activate i-manage
pip install -r requirements.txt
python -m manage migrate
python -m manage runserver
ngrok http --url=burro-charmed-hermit.ngrok-free.app 8000
```

# Frontend (Open a new terminal)

```bash
cd frontend
npm install
npm run dev
```
