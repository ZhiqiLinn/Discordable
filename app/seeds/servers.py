from app.models import db, Server


def seed_servers():
    server1 = Server(
        name="LOL GAMING CLUB", 
        server_pic="https://www.pentagram.com/work/league-of-legends#31463", 
        default_role="Summoners", 
        user_id="1"
    )
    server2 = Server(
        name="Makima's Dogs", 
        server_pic="https://ibb.co/X3Fy1ff", 
        default_role="Dogs or Hunters", 
        user_id="1"
    )
    server3 = Server(
        name="Spy Family!!!", 
        server_pic="https://ibb.co/PTTyNV5", 
        default_role="Anya", 
        user_id="1"
    )

    db.session.add(server1)
    db.session.add(server2)
    db.session.add(server3)

    db.session.commit()


def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
