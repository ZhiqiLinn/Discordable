from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message="Please enter your username"), Length(min=3, max=50, message="Length should be between 3-50 characters"), username_exists])
    email = StringField('email', validators=[DataRequired(message="Please enter your email"), user_exists, Email("Please enter a valid email address")])
    password = StringField('password', validators=[DataRequired(message="Please enter your password"), Length(min=6, message="Password must be at least 6 characters")])
    repeatPassword = StringField('confirm password', validators=[DataRequired(message="Please enter your confirm password"), EqualTo('password', message="Confirmed password doesnt match")])

