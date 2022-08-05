from flask import Blueprint, request
from app.forms import CreateServerForm, UpdateServerForm
from app.models import db, Server
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
    servers = Server.query.all()
    return {'Server': [server.to_dict() for server in servers]}

