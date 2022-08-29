from flask_socketio import SocketIO, emit
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

# handle chat messages
# will emit the message to all connected users.
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)