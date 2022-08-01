from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, IntegerField, TextAreaField

class CreateServerForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    user_id = IntegerField('User', validators=[DataRequired()])
    profile_pic = TextAreaField('Profile_pic', validators=[DataRequired()])
    default_role = StringField('Default_role', validators=[DataRequired()])


class UpdateServerForm(FlaskForm):
    id = IntegerField('id')
    name = StringField('Name', validators=[DataRequired()])
    user_id = IntegerField('User', validators=[DataRequired()])
    profile_pic = TextAreaField('Profile_pic', validators=[DataRequired()])
    default_role = StringField('Default_role', validators=[DataRequired()])
