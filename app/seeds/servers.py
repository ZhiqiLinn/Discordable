from app.models import db, Server



def seed_servers():
    server1 = Server(
        name="LOL GAMING CLUB", 
        server_pic="https://pm1.narvii.com/6960/934dc101f23b3f416d181f6eeba6ea314b7d1538r1-1000-1000v2_hq.jpg", 
        default_role="Summoners", 
        user_id=1
    )
    server2 = Server(
        name="Makima's", 
        server_pic="https://i.ibb.co/jW3Vm99/412024.jpg", 
        default_role="Hunters", 
        user_id=1
    )
    server3 = Server(
        name="Spy Family!!!", 
        server_pic="https://i.ibb.co/9ww0Ndq/https-hiddenremote-com-files-image-exchange-2022-06-ie-87887.jpg", 
        default_role="Anya", 
        user_id=1
    )



    db.session.add(server1)
    db.session.add(server2)
    db.session.add(server3)

    db.session.commit()


def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
