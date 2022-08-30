from flask import Blueprint, request
from app.forms import CreateServerForm, UpdateServerForm, JoinServerForm
from app.models import db, Server, User
from flask_login import current_user, login_required

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
            name=form.data['name'],
            user_id=form.data['user_id'],
            server_pic=form.data['server_pic'],
            default_role=form.data['default_role'],
            description=form.data['description'],
            category=form.data['category']


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
        curr_server.name=form.data['name'],
        curr_server.user_id=form.data['user_id'],
        curr_server.server_pic=form.data['server_pic'],
        curr_server.explore_pic=form.data['explore_pic'],
        curr_server.default_role=form.data['default_role'],
        curr_server.description=form.data['description'],
        curr_server.category=form.data['category']
        db.session.commit()
        return curr_server.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#-------------------------DELETE ONE SERVER-------------------
@server_routes.route('/<int:id>', methods=['DELETE'])
def delete_one_server(id):
    # print("!!!!BEFORE")
    server = Server.query.get(id)
    # print("!!!!AFTER", server.to_dict())

    db.session.delete(server)
    db.session.commit()
    return {"message": "Sucessfully Deleted."}


#-------------------------DELETE ONE JOINED SERVER-------------------
@server_routes.route('/<int:id>/delete', methods=['PUT'])
def quit_a_server(id):
    server = Server.query.get(id)
    current_user.joined_servers.remove(server)
    db.session.commit()
    return server.to_dict()
