from flask import render_template
from app.main import bp

@bp.route('/')
@bp.route('/index')
def index():
    return render_template('index.html')

@bp.route('/patients')
def patients():
    return render_template('patients.html')

@bp.route('/doctors')
def doctors():
    return render_template('doctors.html')

@bp.route('/services/<service>')
def services(service):
    # Define which services are available
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

@bp.route('/test')
def test():
    return '<h1>Simple Test</h1><p>This route works!</p>'

@bp.route('/template-test')
def template_test():
    return render_template('base.html')

@bp.route('/test-db')
def test_db():
    try:
        from app.models import User, Patient, Doctor, Appointment
        user_count = User.query.count()
        return f'<h1>Database Test</h1><p>Users: {user_count}</p><p>Database works! 🎉</p>'
    except Exception as e:
        return f'<h1>Database Error</h1><p>Error: {str(e)}</p>'