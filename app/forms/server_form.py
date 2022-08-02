from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired

class CreateServerForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    user_id = IntegerField('User', validators=[DataRequired()])
    server_pic = TextAreaField('Server_pic', validators=[DataRequired()])
    default_role = StringField('Default_role', validators=[DataRequired()])


class UpdateServerForm(FlaskForm):
    id = IntegerField('id')
    name = StringField('Name', validators=[DataRequired()])
    user_id = IntegerField('User', validators=[DataRequired()])
    server_pic = TextAreaField('Server_pic', validators=[DataRequired()])
    default_role = StringField('Default_role', validators=[DataRequired()])
