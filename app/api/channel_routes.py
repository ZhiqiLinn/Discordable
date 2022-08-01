from flask import Blueprint, request
from app.forms import CreateChannelForm, UpdateChannelForm

channel_routes = Blueprint('channels', __name__)