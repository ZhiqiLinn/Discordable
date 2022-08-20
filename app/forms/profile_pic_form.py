from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo, Length

class ProfilePicForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message="Please enter your username"), Length(min=3, max=50, message="Length should be between 3-50 characters")])
    profile_pic = TextAreaField("profile_pic")