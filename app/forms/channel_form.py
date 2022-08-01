from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class CreateChannelForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    server_id = IntegerField('Server_id', validators=[DataRequired()])


class UpdateChannelForm(FlaskForm):
    id = IntegerField('id')
    name = StringField('Name', validators=[DataRequired()])
    server_id = IntegerField('Server_id', validators=[DataRequired()])
