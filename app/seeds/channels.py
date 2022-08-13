from app.models import db, Channel


def seed_channels():
    server1_chan1 = Channel(
        name="RIFT", 
        server_id=1
    )
    server1_chan2 = Channel(
        name="ARAM", 
        server_id=1
    )
    server1_chan3 = Channel(
        name="RANDOM", 
        server_id=1
    )
    server1_chan4 = Channel(
        name="TFT??", 
        server_id=1
    )

    server2_chan1 = Channel(
        name="images and art", 
        server_id=2
    )
    server2_chan2 = Channel(
        name="suggestions", 
        server_id=2
    )
    server2_chan3 = Channel(
        name="devils", 
        server_id=2
    )
    server3_chan1 = Channel(
        name="Anya's", 
        server_id=3
    )
    server3_chan2 = Channel(
        name="Yorrrr and Loid", 
        server_id=3
    )
    server3_chan3 = Channel(
        name="ARTS", 
        server_id=3
    )
    server4_chan1 = Channel(
        name="general", 
        server_id=4
    )
    server4_chan2 = Channel(
        name="coding-questions", 
        server_id=4
    )
    server4_chan3 = Channel(
        name="homework-help", 
        server_id=4
    )
    server4_chan4 = Channel(
        name="networking", 
        server_id=4
    )
    server4_chan5 = Channel(
        name="note-resources", 
        server_id=4
    )
    server4_chan6 = Channel(
        name="random", 
        server_id=4
    )
    server5_chan1 = Channel(
        name="Welcome", 
        server_id=5
    )
    server5_chan2 = Channel(
        name="Announcements", 
        server_id=5
    )
    server5_chan3 = Channel(
        name="poll", 
        server_id=5
    )

    server6_chan1 = Channel(
        name="Welcome", 
        server_id=6
    )
    server6_chan2 = Channel(
        name="Lofi Music", 
        server_id=6
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

    db.session.add(server4_chan1)
    db.session.add(server4_chan2)
    db.session.add(server4_chan3)
    db.session.add(server4_chan4)
    db.session.add(server4_chan5)
    db.session.add(server4_chan6)

    db.session.add(server5_chan1)
    db.session.add(server5_chan2)
    db.session.add(server5_chan3) 

    db.session.add(server6_chan1)
    db.session.add(server6_chan2)   
    db.session.commit()


def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
