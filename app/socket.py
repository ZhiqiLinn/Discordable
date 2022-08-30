from flask_socketio import SocketIO, emit, join_room
import os

#if we only include our Heroku app on the list of allowed origins, then our websockets won’t work when we run the app locally. One solution is to set the allowed origins based on whether the app is running in production or not:
if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://discordable.herokuapp.com",
        "https://discordable.herokuapp.com"
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)

users = []

# handle chat messages
# will emit the message to all connected users.
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)

@socketio.on('join')
def joinroom(data):

    username = data['username']
    room = data['channel_id']
    join_room(room)

    emit("welcome", f"{username}", room=room)