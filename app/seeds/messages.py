from app.models import db, Message


def seed_messages():
    chan1_msg1 = Message(
        message="Hello from DEMO User", 
        channel_id=1,
        user_id=1
    )
    chan1_msg2 = Message(
        message="Anyone alive??", 
        channel_id=1,
        user_id=1
    )
    chan1_msg3 = Message(
        message="Heyy this is rena", 
        channel_id=1,
        user_id=2
    )
    chan1_msg4 = Message(
        message="wanna play league?", 
        channel_id=1,
        user_id=2
    )

    db.session.add(chan1_msg1)
    db.session.add(chan1_msg2)
    db.session.add(chan1_msg3)
    db.session.add(chan1_msg4)

    
    db.session.commit()


def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
