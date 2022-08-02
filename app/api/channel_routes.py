from flask import Blueprint, request
from app.forms import CreateChannelForm, UpdateChannelForm
from app.models import db, Channel

channel_routes = Blueprint('channels', __name__)


#-------------------------CHANNEL VALIDATIONS------------------
def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages
#-------------------------GET ALL CHANNEL----------------------
@channel_routes.route('', methods=['GET'])
def get_all_channels():
    channels = Channel.query.all()
    return {'Channel': [channel.to_dict() for channel in channels]}
#-------------------------GET ONE CHANNEL----------------------
@channel_routes.route('/<int:id>')
def get_one_channel(id):
    channel = Channel.query.get(id)
    return channel.to_dict()
#-------------------------POST ONE CHANNEL---------------------
@channel_routes.route('', methods=['POST'])
def create_one_channel():
    form = CreateChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_channel = Channel(
            name=form.data['name'],
            server_id=form.data['server_id'],
        )
        db.session.add(new_channel)
        db.session.commit()
        return new_channel.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#-------------------------UPDATE ONE CHANNEL-------------------
@channel_routes.route('/<int:id>', methods=['PUT'])
def update_one_channel(id):
    form = UpdateChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        curr_channel = Channel.query.get(id)
        curr_channel.name=form.data['name'],
        curr_channel.server_id=form.data['server_id'],
        db.session.commit()
        return curr_channel.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
#-------------------------DELETE ONE CHANNEL-------------------
@channel_routes.route('/<int:id>', methods=['DELETE'])
def delete_one_channel(id):
    channel = Channel.query.get(id)
    db.session.delete(channel)
    db.session.commit()
    return {"message": "Sucessfully Deleted."}