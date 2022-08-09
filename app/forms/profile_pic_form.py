from flask_wtf import FlaskForm
from wtforms import TextAreaField


class ProfilePicForm(FlaskForm):
    profile_pic = TextAreaField("profile_pic")