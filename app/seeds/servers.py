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
    server4 = Server(
        name="March '22 a/A Cohort", 
        server_pic="https://top10codingbootcamps.com/wp-content/uploads/2022/05/603820afd31232aab368ea6f_New-Red-logo-emblem-150x150.png", 
        default_role="Programmer", 
        user_id=3
    )
    server5 = Server(
        name="BeluGANG", 
        server_pic="https://images.chesscomfiles.com/uploads/v1/group/358841.6424f314.160x160o.ffb7a9e8a4dc.jpeg", 
        default_role="MOD", 
        user_id=4
    )
    server6 = Server(
        name="Lofi Girl", 
        server_pic="https://upload.wikimedia.org/wikipedia/en/thumb/2/23/Lofi_girl_logo.jpg/250px-Lofi_girl_logo.jpg", 
        default_role="Lofi Artist", 
        user_id=5
    )



    db.session.add(server1)
    db.session.add(server2)
    db.session.add(server3)
    db.session.add(server4)
    db.session.add(server5)
    db.session.add(server6)


    db.session.commit()


def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
