from datetime import datetime 
from app import db 

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique = True, nullable=False)
    password_hash = db.Column(db.String(128))
    role = db.Column(db.String(20), nullable=False) #'patient' or 'doctor' 
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    #Relationships
    patient_profile = db.relationship('Patient', backref='user', uselist=False)
    doctor_profile = db.relationship('Doctor', backref='user', uselist=False)

    def __repr__(self):
        return f'<User {self.username}>'
    
class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    first_name = db.Column(db.String(64), nullable=False)
    last_name = db.Column(db.String(64), nullable=False)
    phone = db.Column(db.String(20))
    date_of_birth = db.Column(db.Date)

    #Relationships
    appointments = db.relationship('Appointment', backref='patient', lazy='dynamic')
    
    def __repr__(self):
        return f'<Patient {self.first_name} {self.last_name}>'
    
class Doctor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    first_name = db.Column(db.String(64), nullable=False)
    last_name = db.Column(db.String(64), nullable=False)
    specialty = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    
    # Relationships
    appointments = db.relationship('Appointment', backref='doctor', lazy='dynamic')
    availability = db.relationship('DoctorAvailability', backref='doctor', lazy='dynamic')
    
    def __repr__(self):
        return f'<Doctor {self.first_name} {self.last_name}>'
    
class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.id'), nullable=False)
    appointment_date = db.Column(db.DateTime, nullable=False)
    duration_minutes = db.Column(db.Integer, default=30)
    status = db.Column(db.String(20), default='pending')  # pending, confirmed, cancelled, completed
    reason = db.Column(db.Text)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<Appointment {self.id}: {self.appointment_date}>'
    
class DoctorAvailability(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.id'), nullable=False)
    day_of_week = db.Column(db.Integer, nullable=False)  # 0=Monday, 6=Sunday
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)
    is_available = db.Column(db.Boolean, default=True)
    
    def __repr__(self):
        return f'<Availability {self.doctor_id}: Day {self.day_of_week}>'
    
    