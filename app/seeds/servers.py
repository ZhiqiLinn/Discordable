from app.models import db, Server



def seed_servers():
    server1 = Server(
        name="LOL GAMING CLUB", 
        server_pic="https://pm1.narvii.com/6960/934dc101f23b3f416d181f6eeba6ea314b7d1538r1-1000-1000v2_hq.jpg", 
        default_role="Summoners", 
        user_id=1,
        description='Welcome to League of Legends! A community-ran Discord server for all things LoL; run in collaboration with Riot Games.',
        category='Gaming',
        explore_pic='https://cdn.discordapp.com/discovery-splashes/776821526589997056/b09baca887846c7d627c4ac1ddf7933f.jpg?size=240'
    )
    server2 = Server(
        name="buildapc", 
        server_pic="https://cdn.discordapp.com/icons/286168815585198080/a_e1016a9b8d8f7c97dafef6b655e0d1b1.webp?size=40", 
        default_role="Bouncers", 
        user_id=2,
        description='All things PC building, part selection, and troubleshooting. Plus discussions on latest tech and games!',
        category='Science & Tech',
        explore_pic='https://cdn.discordapp.com/discovery-splashes/286168815585198080/478286bad48bd65638a16ac9d5b50056.jpg?size=300'
    )
    server3 = Server(
        name="Spy Family!!!", 
        server_pic="https://i.ibb.co/9ww0Ndq/https-hiddenremote-com-files-image-exchange-2022-06-ie-87887.jpg", 
        default_role="Anya", 
        user_id=1,
        description='Welcome to a community with fans of SPY X FAMILY, a heart-warming comedy series by Tatsuya Endo!',
        category='Entertainment',
        explore_pic='https://cdn.discordapp.com/discovery-splashes/574093012620279818/93c78999d88e37ccc933b725eeec28dd.jpg?size=240'
    )
    server4 = Server(
        name="March '22 a/A Cohort", 
        server_pic="https://top10codingbootcamps.com/wp-content/uploads/2022/05/603820afd31232aab368ea6f_New-Red-logo-emblem-150x150.png", 
        default_role="Programmers", 
        user_id=3,
        description='app Academy March 2022 cohort.',
        category='Education',
        explore_pic='https://i0.wp.com/calmatters.org/wp-content/uploads/2021/08/class-size.jpg?resize=1200%2C700&ssl=1'
    )
    server5 = Server(
        name="BeluGANG", 
        server_pic="https://images.chesscomfiles.com/uploads/v1/group/358841.6424f314.160x160o.ffb7a9e8a4dc.jpeg", 
        default_role="Gang", 
        user_id=4,
        description='The official Beluga Discord Server!',
        category='Entertainment',
        explore_pic='https://cdn.discordapp.com/discovery-splashes/846496831533088768/84b27a1f2c8e8552e400f7048bb44853.jpg?size=240'
    )
    server6 = Server(
        name="Lofi Girl", 
        server_pic="https://upload.wikimedia.org/wikipedia/en/thumb/2/23/Lofi_girl_logo.jpg/250px-Lofi_girl_logo.jpg", 
        default_role="Lofi Artist", 
        user_id=5,
        description='The friendliest community on Discord 🧡 Join now to meet amazing people from all around  the world 🌎',
        category='Music',
        explore_pic='https://cdn.discordapp.com/discovery-splashes/707230275175841915/8bf77b3c25c974afa3dfde952ba04c71.jpg?size=240'
    )
    server7 = Server(
        name="VALORANT", 
        server_pic="https://seeklogo.com/images/V/valorant-logo-FAB2CA0E55-seeklogo.com.png", 
        default_role="Agents", 
        user_id=1,
        description='The official VALORANT Discord server, in collaboration with Riot Games. Find the latest news and talk about the game!',
        category='Gaming',
        explore_pic='https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltc9ebc37d81a976c3/5e8cdc21baf2bd3cc4753c7a/IMAGE_2.jpg'
    )
    server8 = Server(
        name="Genshin Impact Official", 
        server_pic="https://i.etsystatic.com/27866823/r/il/e69b4e/3113889932/il_1140xN.3113889932_rpyg.jpg", 
        default_role="Travelers", 
        user_id=5,
        description='Welcome to Teyvat, Traveler! This is the place to discuss with others about your favorite game: Genshin Impact!',
        category='Gaming',
        explore_pic='https://cdn.mos.cms.futurecdn.net/xYnvzntXvDcofW2ry6UFxa-970-80.jpg'
    )
    server9 = Server(
        name="MINECRAFT", 
        server_pic="https://seeklogo.com/images/M/minecraft-logo-5EAD3A1535-seeklogo.com.png", 
        default_role="Zombies", 
        user_id=2,
        description='The Official Minecraft Discord!',
        category='Gaming',
        explore_pic='https://cdn.discordapp.com/discovery-splashes/302094807046684672/579507dff86d89cd5decd8e016a54706.jpg?size=240'
    )
    server10 = Server(
        name="MrBeast Gaming", 
        server_pic="https://seeklogo.com/images/M/mrbeast-logo-DDADF44FFB-seeklogo.com.png", 
        default_role="Beast", 
        user_id=7,
        description='This is the Discord for MrBeast Gaming challenges!',
        category='Gaming',
        explore_pic='https://cdn.discordapp.com/discovery-splashes/706661525439512597/1da7b334b9c3398fd2571ec37fa8e21d.jpg?size=240'
    )



    db.session.add(server1)
    db.session.add(server2)
    db.session.add(server3)
    db.session.add(server4)
    db.session.add(server5)
    db.session.add(server6)
    db.session.add(server7)
    db.session.add(server8)
    db.session.add(server9)
    db.session.add(server10)

    


    db.session.commit()


def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
