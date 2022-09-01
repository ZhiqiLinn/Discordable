from flask import Blueprint, request
from app.forms import CreateServerForm, UpdateServerForm, JoinServerForm, ServerPicForm, ExplorePicForm
from app.models import db, Server, User
from flask_login import current_user, login_required
from app.awsS3 import (
    upload_file_to_s3, allowed_file, get_unique_filename)

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


#--------------------------UPDATE SERVER PIC-------------------------


# @server_routes.route('/<int:id>', methods=['PUT'])
# def update_server_picture(id):
#     form = UpdateServerForm()

#     server = Server.query.get(id)

#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         if request.form.get('name'):
#             server.name = request.form.get('name')

#         if request.form.get('description'):
#             server.description = request.form.get('description')

#         if request.form.get('default_role'):
#             server.default_role = request.form.get('default_role')

#         if request.form.get('user_id'):
#             server.user_id = request.form.get('user_id')  

#         if request.form.get('category'):
#             server.category = request.form.get('category') 

#         if request.form.get('explore_pic'):
#             server.explore_pic = request.form.get('explore_pic')

#         if 'explore_pic' in request.files:
#             image = request.files["explore_pic"]

#             if not allowed_file(image.filename):
#                 return { "errors": "Image file type must end with .jpg, .jpeg, or .png" }, 400
            
#             image.filename = get_unique_filename(image.filename)

#             upload = upload_file_to_s3(image)

#             if "url" not in upload:
#                 return upload, 400

#             explore_pic = upload["url"]
#         server.explore_pic = explore_pic     

#         if 'server_pic' in request.files:
#             image = request.files["server_pic"]

#             if not allowed_file(image.filename):
#                 return { "errors": "Image file type must end with .jpg, .jpeg, or .png" }, 400
            
#             image.filename = get_unique_filename(image.filename)

#             upload = upload_file_to_s3(image)

#             if "url" not in upload:
#                 return upload, 400

#             server_pic = upload["url"]
#         server.server_pic = server_pic
#         # db.session.add(server)
#         db.session.commit()
#         print("!!!!!!!!!!!!!!!!!!!!!!", server.to_dict())
#         return server.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401