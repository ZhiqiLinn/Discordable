from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length

class CreateServerForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    user_id = IntegerField('User', validators=[DataRequired()])
    server_pic = TextAreaField('Server_pic', validators=[DataRequired()])
    default_role = StringField('Default_role', validators=[DataRequired()])


class UpdateServerForm(FlaskForm):
    id = IntegerField('id')
    name = StringField('Name', validators=[DataRequired(), Length(min=3, max=50, message="Length should be between 3-50 characters")])
    user_id = IntegerField('User', validators=[DataRequired()])
    server_pic = TextAreaField('Server_pic', validators=[DataRequired()])
    default_role = StringField('Default_role', validators=[DataRequired()])
