from .db import db

class Server(db.Model):
    __tablename__ = "servers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    server_pic = db.Column(db.Text, nullable=True)
    default_role = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)


def to_dict(self):
        return {
                'id': self.id,
                'name': self.name,
                'server_pic': self.server_pic,
                'default_role': self.default_role,
                'user_id': self.user_id,

        }