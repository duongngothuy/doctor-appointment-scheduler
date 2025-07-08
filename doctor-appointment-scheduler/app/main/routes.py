from app.main import bp 

@bp.route('/')
@bp.route('/index')

def index():
    return '<h1>Doctor Appointment Scheduler</h1><p> Welcome to your Flask app!</p>'

@bp.route('/patients')
def patients():
    return '<h1>Patient Portal</h1><p> Patient Login coming soon... </p>'

@bp.route('/doctors')
def doctors():
    return '<h1>Doctor Portal</h1><p>Doctor login coming soon...</p>'

@bp.route('/test')
def test():
    return '<h1>Simple Test</h1><p>This route works!</p>'

@bp.route('/test-db')
def test_db():
    try:
        from app.models import User, Patient, Doctor, Appointment
        user_count = User.query.count()
        return f'<h1>Database Test</h1><p>Users: {user_count}</p><p>Database works! 🎉</p>'
    except Exception as e:
        return f'<h1>Database Error</h1><p>Error: {str(e)}</p>'