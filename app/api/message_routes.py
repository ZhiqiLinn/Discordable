from flask import Blueprint, request
from app.forms import CreateMessageForm, UpdateMessageForm
from app.models import db, Message

message_routes = Blueprint('messages', __name__)


#-------------------------MESSAGE VALIDATIONS------------------
def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages
#-------------------------GET ALL MESSAGES---------------------
@message_routes.route('/chan/<int:id>', methods=['GET'])
def get_all_messages_by_channel(id):
    messages = Message.query.filter(Message.channel_id == id).all()
    return {'ChannelMessage': [message.to_dict() for message in messages]}
#-------------------------GET ONE MESSAGE----------------------
@message_routes.route('/<int:id>')
def get_one_message(id):
    message = Message.query.get(id)
    return message.to_dict()
#-------------------------POST ONE MESSAGE---------------------
@message_routes.route('', methods=['POST'])
def create_one_message():
    form = CreateMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_message = Message(
            message=form.data['message'],
            user_id=form.data['user_id'],
            channel_id=form.data['channel_id']
        )
        db.session.add(new_message)
        db.session.commit()
        return new_message.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#-------------------------UPDATE ONE MESSAGE-------------------
@message_routes.route('/<int:id>', methods=['PUT'])
def update_one_message(id):
    form = UpdateMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        curr_message = Message.query.get(id)
        curr_message.message=form.data['message'],
        curr_message.user_id=form.data['user_id'],
        curr_message.channel_id=form.data['channel_id']
        db.session.commit()
        return curr_message.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
#-------------------------DELETE ONE MESSAGE-------------------
@message_routes.route('/<int:id>', methods=['DELETE'])
def delete_one_message(id):
    message = Message.query.get(id)
    db.session.delete(message)
    db.session.commit()
    return {"message": "Sucessfully Deleted."}