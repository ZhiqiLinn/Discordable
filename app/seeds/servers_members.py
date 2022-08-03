from app.models import db, Server, User


def seed_servers_members():
    
    server1 = Server.query.get(1)
    member1 = User.query.get(1)
    server1.members.append(member1)
    member1.joined_servers.append(server1)


    db.session.commit()


def undo_servers_members():
    db.session.execute('TRUNCATE association_table RESTART IDENTITY CASCADE;')
    db.session.commit()