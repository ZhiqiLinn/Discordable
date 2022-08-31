from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    rena = User(
        username='rena', email='rena@aa.io', password='password')
    dave = User(
        username='dave', email='dave@aa.io', password='password')
    Beluga = User(
        username='Beluga', email='belu@aa.io', password='password')
    LofiGirl = User(
        username='LofiGirl', email='lofi@aa.io', password='password')
    Riot = User(
        username='Riot', email='riot@aa.io', password='password')
    mrbeast = User(
        username='mrbeast', email='mrbeast@aa.io', password='password')
    
    db.session.add(demo)
    db.session.add(rena)
    db.session.add(dave)
    db.session.add(Beluga)
    db.session.add(LofiGirl)
    db.session.add(Riot)
    db.session.add(mrbeast)
    

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
