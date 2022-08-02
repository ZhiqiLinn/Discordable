from app.models import db, Channel


def seed_channels():
    server1_chan1 = Channel(
        name="RIFT", 
        server_id="1"
    )
    server1_chan2 = Channel(
        name="ARAM", 
        server_id="1"
    )
    server1_chan3 = Channel(
        name="RANDOM", 
        server_id="1"
    )
    server1_chan4 = Channel(
        name="TFT??", 
        server_id="1"
    )

    server2_chan1 = Channel(
        name="images and art", 
        server_id="2"
    )
    server2_chan2 = Channel(
        name="suggestions", 
        server_id="2"
    )
    server2_chan3 = Channel(
        name="devils", 
        server_id="2"
    )
    server3_chan1 = Channel(
        name="Anya's", 
        server_id="3"
    )
    server3_chan2 = Channel(
        name="Yorrrr and Loid", 
        server_id="3"
    )
    server3_chan3 = Channel(
        name="ARTS", 
        server_id="3"
    )

    db.session.add(server1_chan1)
    db.session.add(server1_chan2)
    db.session.add(server1_chan3)
    db.session.add(server1_chan4)
    db.session.add(server2_chan1)
    db.session.add(server2_chan2)
    db.session.add(server2_chan3)
    db.session.add(server3_chan1)
    db.session.add(server3_chan2)
    db.session.add(server3_chan3)
    
    db.session.commit()


def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
