from flask import render_template, request, flash, redirect, url_for, jsonify
from app.main import bp
from app.models import User, Patient, Doctor, Appointment
from app import db
from datetime import datetime

@bp.route('/')
@bp.route('/index')
def index():
    return render_template('index.html')

@bp.route('/patients', methods=['GET', 'POST'])
def patients():
    if request.method == 'POST':
        try:
            # Get form data
            service_type = request.form.get('serviceType')
            doctor_preference = request.form.get('doctorSelect')
            appointment_date = request.form.get('appointmentDate')
            appointment_time = request.form.get('appointmentTime')
            first_name = request.form.get('firstName')
            last_name = request.form.get('lastName')
            email = request.form.get('email')
            phone = request.form.get('phone')
            date_of_birth = request.form.get('dateOfBirth')
            insurance = request.form.get('insuranceProvider')
            visit_reason = request.form.get('visitReason')
            medications = request.form.get('currentMedications')
            
            # Combine date and time
            datetime_str = f"{appointment_date} {appointment_time}"
            appointment_datetime = datetime.strptime(datetime_str, '%Y-%m-%d %H:%M')
            
            # Create or find patient user
            user = User.query.filter_by(email=email).first()
            if not user:
                user = User(
                    username=email,
                    email=email,
                    role='patient'
                )
                db.session.add(user)
                db.session.flush()  # Get the user ID
                
                # Create patient profile
                patient = Patient(
                    user_id=user.id,
                    first_name=first_name,
                    last_name=last_name,
                    phone=phone,
                    date_of_birth=datetime.strptime(date_of_birth, '%Y-%m-%d').date() if date_of_birth else None
                )
                db.session.add(patient)
            else:
                patient = user.patient_profile
                if not patient:
                    patient = Patient(
                        user_id=user.id,
                        first_name=first_name,
                        last_name=last_name,
                        phone=phone,
                        date_of_birth=datetime.strptime(date_of_birth, '%Y-%m-%d').date() if date_of_birth else None
                    )
                    db.session.add(patient)
            
            db.session.flush()  # Get the patient ID
            
            # Find or assign a doctor (for now, we'll assign the first doctor or create a default one)
            doctor = Doctor.query.first()
            if not doctor:
                # Create a default doctor for demo purposes
                doctor_user = User(
                    username='dr.martinez',
                    email='dr.martinez@womenshealth.com',
                    role='doctor'
                )
                db.session.add(doctor_user)
                db.session.flush()
                
                doctor = Doctor(
                    user_id=doctor_user.id,
                    first_name='Sarah',
                    last_name='Martinez',
                    specialty='Gynecologist',
                    phone='(555) 123-4567'
                )
                db.session.add(doctor)
                db.session.flush()
            
            # Create appointment
            appointment = Appointment(
                patient_id=patient.id,
                doctor_id=doctor.id,
                appointment_date=appointment_datetime,
                status='pending',
                reason=f"{service_type}: {visit_reason}" if visit_reason else service_type,
                notes=f"Insurance: {insurance}, Medications: {medications}" if insurance or medications else None
            )
            db.session.add(appointment)
            db.session.commit()
            
            return jsonify({
                'success': True, 
                'message': 'Appointment booked successfully! You will receive a confirmation email within 24 hours.',
                'appointment_id': appointment.id
            })
            
        except Exception as e:
            db.session.rollback()
            return jsonify({
                'success': False, 
                'message': f'Error booking appointment: {str(e)}'
            }), 400
    
    return render_template('patients.html')

@bp.route('/doctors')
def doctors():
    return render_template('doctors.html')

@bp.route('/services/<service>')
def services(service):
    available_services = {
        'breast-cancer': {
            'title': 'Breast Cancer Screening',
            'subtitle': 'Early Detection Saves Lives',
            'template': 'services/breast_cancer.html'
        },
        'hpv': {
            'title': 'HPV Vaccination',
            'subtitle': 'Protection Against HPV-Related Cancers',
            'template': 'services/hpv.html'
        },
        'pap-smear': {
            'title': 'Pap Smear Testing',
            'subtitle': 'Cervical Cancer Screening',
            'template': 'services/pap_smear.html'
        },
        'reproductive': {
            'title': 'Reproductive Health',
            'subtitle': 'Comprehensive Women\'s Care',
            'template': 'services/reproductive.html'
        }
    }
    
    if service in available_services:
        service_info = available_services[service]
        return render_template(service_info['template'], service=service_info)
    else:
        return f"Service '{service}' not found", 404

@bp.route('/admin/appointments')
def admin_appointments():
    appointments = Appointment.query.order_by(Appointment.appointment_date.desc()).all()
    return render_template('admin/appointments.html', appointments=appointments)

@bp.route('/template-test')
def template_test():
    return render_template('base.html')

@bp.route('/test')
def test():
    return '<h1>Simple Test</h1><p>This route works!</p>'

@bp.route('/test-db')
def test_db():
    try:
        from app.models import User, Patient, Doctor, Appointment
        user_count = User.query.count()
        patient_count = Patient.query.count()
        doctor_count = Doctor.query.count()
        appointment_count = Appointment.query.count()
        return f'<h1>Database Test</h1><p>Users: {user_count}</p><p>Patients: {patient_count}</p><p>Doctors: {doctor_count}</p><p>Appointments: {appointment_count}</p><p>Database works! 🎉</p>'
    except Exception as e:
        return f'<h1>Database Error</h1><p>Error: {str(e)}</p>'