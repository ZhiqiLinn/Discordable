from .db import db
from sqlalchemy.sql import func

class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(500), nullable=False)
#     member_id = db.Column(db.Integer, db.ForeignKey("members.id"), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())

    channel = db.relationship('Channel', back_populates='messages')


    def to_dict(self):
        return {
                'id': self.id,
                'message': self.message,
                # 'member_id': self.member_id,
                'channel_id': self.channel_id,
                'user_id': self.user_id,
                'created_at': self.created_at

        }