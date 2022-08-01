from .db import db

class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(500), nullable=False)
    member_id = db.Column(db.Integer, db.ForeignKey("members.id"), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"), nullable=False)


def to_dict(self):
        return {
                'id': self.id,
                'message': self.message,
                'member_id': self.member_id,
                'channel_id': self.channel_id
        }