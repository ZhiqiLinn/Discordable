from flask import Blueprint, request
from app.forms import CreateServerForm, UpdateServerForm
from app.forms.join_server_form import JoinServerForm
from app.models import db, Server, User
from flask_login import login_required

join_server_routes = Blueprint('join-server', __name__)

#-------------------------SERVER VALIDATIONS------------------
def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages
    
#-------------------------GET ALL SERVER----------------------
@join_server_routes.route('', methods=['POST'])
@login_required
def join_a_server():
    form = JoinServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        member_id=form.data['member_id']
        server_id=form.data['server_id']
        curr_server = Server.query.get(server_id)
        new_member = User.query.get(member_id)
        curr_server.members.append(new_member)
        new_member.joined_servers.append(curr_server)
        db.session.commit()
        return {'message':'Successfully Joined'}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

