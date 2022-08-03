from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

association_table=db.Table(
    'association_table',
    db.Column('member_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('server_id', db.Integer, db.ForeignKey('servers.id'))

)
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    profile_pic = db.Column(db.Text, default="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    servers = db.relationship('Server', back_populates='owner')
    joined_servers = db.relationship('Server', secondary=association_table, back_populates='members',cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        userJoinedServers = {}
        for joinedServer in self.joined_servers:
            userJoinedServers[joinedServer.id] = {
                "joinedServer_id" : joinedServer.id,
                "joinedServer_name" : joinedServer.name,
                "joinedServer_server_pic" : joinedServer.server_pic,
                "joinedServer_default_role" : joinedServer.default_role,
                "joinedServer_user_id" : joinedServer.user_id,
            }

        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_pic': self.profile_pic,
            'userJoinedServers' : userJoinedServers
        }



class Server(db.Model):
    __tablename__ = "servers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    server_pic = db.Column(db.Text, nullable=True)
    default_role = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    owner = db.relationship('User', back_populates='servers')
    channels = db.relationship('Channel', back_populates='server', cascade="all, delete-orphan")

    members = db.relationship('User', secondary=association_table, back_populates='joined_servers', cascade="all, delete-orphan")

    def to_dict(self): 
        serverMembers = {}
        for member in self.members:
            serverMembers[member.id] = {
                "member_id":member.id,
                "member_username":member.username,
                "member_profile_pic":member.profile_pic,
            }

        return {
                'id': self.id,
                'name': self.name,
                'server_pic': self.server_pic,
                'default_role': self.default_role,
                'user_id': self.user_id,
                'serverMembers' : serverMembers
        }


