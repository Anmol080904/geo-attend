Th# 📍 Location-Based Attendance Monitoring System

A full-stack web application that allows companies to manage employee attendance using geolocation. Built using Django (backend), React (frontend), and PostgreSQL (database).

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Django (DRF)
- **Database**: PostgreSQL
- **Authentication**: JWT (Djoser or Simple JWT)
- **APIs**: HTML5 Geolocation API

---

## ✅ Features

### 👨‍💼 Admin
- Register/Login
- Add/view/edit/delete employees
- View attendance reports by employee/date
- Export data (CSV)

### 👷 Employee
- Register/Login
- Check-in from allowed location only
- View personal attendance history

### 🌍 Location-Based Attendance
- Uses Geolocation API to capture employee's location
- Allows check-in only within a configured radius of the office

---

## ⚙️ Installation Guide

### 🔧 Backend (Django)

```bash
# 1. Clone the repo
git clone https://github.com/your-username/geo-attend.git
cd geo-attend/backend

# 2. Set up a virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Set up environment variables (.env file)
DEBUG=True
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=127.0.0.1,localhost
DATABASE_URL=postgres://user:password@localhost:5432/your-db-name

# 5. Run migrations and server
python manage.py migrate
python manage.py runserver
