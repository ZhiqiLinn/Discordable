from flask import Blueprint, request
from app.forms import CreateMessageForm, UpdateMessageForm

message_routes = Blueprint('messages', __name__)