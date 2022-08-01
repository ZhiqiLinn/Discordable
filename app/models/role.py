from .db import db

class Role(db.Model):
    __tablename__ = "roles"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey("servers.id"), nullable=False)


def to_dict(self):
        return {
                'id': self.id,
                'title': self.title,
                'role': self.role,
                'server_id': self.user_id,
        }