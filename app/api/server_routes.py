from flask import Blueprint, request
from app.forms import CreateServerForm, UpdateServerForm
from app.models import db, Server

server_routes = Blueprint('servers', __name__)

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
@server_routes.route('', methods=['GET'])
def get_all_servers():
    servers = Server.query.all()
    return {'Server': [server.to_dict() for server in servers]}
#-------------------------GET ONE SERVER----------------------
@server_routes.route('/<int:id>')
def get_one_server(id):
    server = Server.query.get(id)
    return server.to_dict()
#-------------------------POST ONE SERVER---------------------
@server_routes.route('', methods=['POST'])
def create_one_server():
    form = CreateServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_server = Server(
            name=form.data['bane'],
            user_id=form.data['user_id']
            profile_pic=form.data['profile_pic']
            default_role=form.data['default_role']
        )
        db.session.add(new_server)
        db.session.commit()
        return new_server.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#-------------------------UPDATE ONE SERVER-------------------
@server_routes.route('/<int:id>', methods=['PUT'])
def update_one_server(id):
    form = UpdateServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        curr_server = Server.query.get(id)
        curr_server.name=form.data['bane'],
        curr_server.user_id=form.data['user_id'],
        curr_server.profile_pic=form.data['profile_pic'],
        curr_server.default_role=form.data['default_role']
        db.session.commit()
        return curr_server.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
#-------------------------DELETE ONE SERVER-------------------
@server_routes.route('/<int:id>', methods=['DELETE'])
def delete_one_server(id):
    server = Server.query.get(id)
    db.session.delete(server)
    db.session.commit()
    return {"message": "Sucessfully Deleted."}