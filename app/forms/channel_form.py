from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class CreateChannelForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    server_id = IntegerField('Server_id', validators=[DataRequired()])


class UpdateChannelForm(FlaskForm):
    id = IntegerField('id')
    name = StringField('Name', validators=[DataRequired(), Length(min=3, max=50, message="Length should be between 3-50 characters")])
    server_id = IntegerField('Server_id', validators=[DataRequired()])
