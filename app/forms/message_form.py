from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, IntegerField, TextAreaField

class CreateMessageForm(FlaskForm):
    message = StringField('Message', validators=[DataRequired()])
    channel_id = IntegerField('Channel_id', validators=[DataRequired()])
    user_id = IntegerField('User', validators=[DataRequired()])


class UpdateMessageForm(FlaskForm):
    id = IntegerField('id')
    message = StringField('Message', validators=[DataRequired()])
    channel_id = IntegerField('Channel_id', validators=[DataRequired()])
    user_id = IntegerField('User', validators=[DataRequired()])
