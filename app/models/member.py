from .db import db

class Member(db.Model):
    __tablename__ = "members"

    id = db.Column(db.Integer, primary_key=True)
    server_nickname = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey("roles.id"), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey("servers.id"), nullable=False)


def to_dict(self):
        return {
                'id': self.id,
                'server_nickname': self.server_nickname,
                'user_id': self.user_id,
                'role_id': self.role_id,
                'server_id': self.server_id
        }