# Women's Health Center - Appointment Scheduling System

A comprehensive full-stack web application for scheduling and managing women's health appointments, featuring patient portals, doctor profiles, and an admin dashboard.

**Live Demo:** [https://doctor-appointment-scheduler.onrender.com/](https://doctor-appointment-scheduler.onrender.com/)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)


## Features

### For Patients
- **Online Appointment Booking** - Schedule appointments with preferred doctors and time slots
- **Service Information Pages** - Detailed information about:
  - Breast Cancer Screening
  - HPV Vaccination
  - Pap Smear Testing
  - Reproductive Health Services
- **Medical History Collection** - Comprehensive intake forms for better care
- **Insurance Information** - Track insurance providers and coverage

### For Doctors
- **Appointment Management Dashboard** - View and manage patient appointments
- **Doctor Profiles** - Detailed professional profiles with credentials and specializations
- **Schedule Overview** - Daily and weekly appointment calendars

### For Administrators
- **Admin Dashboard** - Comprehensive view of all appointments
- **Patient Information Management** - Access to patient records and appointment history
- **Appointment Status Tracking** - Monitor pending, confirmed, and completed appointments

## Technologies Used

### Backend
- **Python 3.12** - Core programming language
- **Flask 3.1.1** - Web framework
- **SQLAlchemy 2.0.41** - ORM for database operations
- **Flask-SQLAlchemy 3.1.1** - Flask integration for SQLAlchemy
- **Flask-Migrate 4.1.0** - Database migrations
- **Gunicorn 23.0.0** - WSGI HTTP Server for production

### Frontend
- **HTML5 & CSS3** - Markup and styling
- **Bootstrap 5.1.3** - Responsive UI framework
- **JavaScript (ES6+)** - Client-side interactivity
- **Font Awesome 6.0.0** - Icon library

### Database
- **SQLite** - Lightweight relational database for development and production

### Development Tools
- **Git & GitHub** - Version control and repository hosting
- **python-dotenv** - Environment variable management
- **Alembic** - Database migration tool

### Deployment
- **Render.com** - Cloud application platform
- **Gunicorn** - Production WSGI server

## Project Structure
```
doctor-appointment-scheduler/
├── app/
│   ├── __init__.py              # Application factory
│   ├── models.py                # Database models
│   ├── main/
│   │   ├── __init__.py          # Blueprint initialization
│   │   └── routes.py            # Application routes
│   ├── templates/
│   │   ├── base.html            # Base template with navigation
│   │   ├── index.html           # Homepage
│   │   ├── patients.html        # Patient appointment booking portal
│   │   ├── doctors.html         # Doctor dashboard
│   │   ├── admin/
│   │   │   └── appointments.html # Admin appointment management
│   │   └── services/
│   │       ├── breast_cancer.html
│   │       ├── hpv.html
│   │       ├── pap_smear.html
│   │       └── reproductive.html
│   └── static/
│       └── images/              # Static image assets
├── migrations/                  # Database migration files
├── config.py                    # Application configuration
├── run.py                       # Application entry point
├── requirements.txt             # Python dependencies
├── Procfile                     # Deployment configuration
├── .env.example                 # Environment variables template
└── README.md                    # Project documentation
```

## Installation

### Prerequisites
- Python 3.12 or higher
- pip (Python package manager)
- Git

### Local Setup

1. **Clone the repository**
```bash
git clone https://github.com/duongngothuy/doctor-appointment-scheduler.git
cd doctor-appointment-scheduler
```

2. **Create a virtual environment**
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. **Initialize the database**
```bash
export FLASK_APP=run.py
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

6. **Run the application**
```bash
python run.py
```

7. **Access the application**
Open your browser and navigate to `http://localhost:5000`

## Usage

### Booking an Appointment (Patient)
1. Navigate to the homepage
2. Click "I'm a Patient" or use the Patient Portal in the navigation
3. Fill out the appointment booking form:
   - Select a service (e.g., Breast Cancer Screening)
   - Choose preferred doctor (optional)
   - Select date and time
   - Provide personal information
   - Submit medical history
4. Submit the form to book your appointment

### Managing Appointments (Doctor/Admin)
1. Navigate to the Doctor Portal or Admin Dashboard
2. View all appointments with patient details
3. Review appointment status (pending, confirmed, completed)
4. Access patient information and appointment history

### Exploring Services
1. Navigate to the Services section from the homepage
2. Browse detailed information about:
   - Breast Cancer Screening procedures and guidelines
   - HPV Vaccination schedules and benefits
   - Pap Smear Testing process and preparation
   - Reproductive Health services and care

## Database Schema

### Core Models

**User**
- `id` (Primary Key)
- `username` (Unique)
- `email` (Unique)
- `password_hash`
- `role` (patient/doctor)
- `created_at`

**Patient**
- `id` (Primary Key)
- `user_id` (Foreign Key → User)
- `first_name`
- `last_name`
- `phone`
- `date_of_birth`

**Doctor**
- `id` (Primary Key)
- `user_id` (Foreign Key → User)
- `first_name`
- `last_name`
- `specialty`
- `phone`

**Appointment**
- `id` (Primary Key)
- `patient_id` (Foreign Key → Patient)
- `doctor_id` (Foreign Key → Doctor)
- `appointment_date`
- `duration`
- `status` (pending/confirmed/cancelled/completed)
- `reason`
- `notes`
- `created_at`

**DoctorAvailability**
- `id` (Primary Key)
- `doctor_id` (Foreign Key → Doctor)
- `day_of_week` (0-6)
- `start_time`
- `end_time`
- `is_available`

## Deployment

This application is deployed on [Render.com](https://render.com).

### Deployment Steps

1. **Push code to GitHub**
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

2. **Configure Render**
   - Connect GitHub repository
   - Set root directory: `doctor-appointment-scheduler`
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn --bind 0.0.0.0:$PORT run:app`

3. **Set environment variables**
   - `SECRET_KEY`: Your secret key for Flask sessions
   - `FLASK_ENV`: `production`

4. **Deploy**
   - Render automatically deploys on push to main branch

### Environment Variables

Required environment variables for production:
```
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///app.db
FLASK_ENV=production
```
