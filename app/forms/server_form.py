from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Length

class CreateServerForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    user_id = IntegerField('User', validators=[DataRequired()])
    server_pic = TextAreaField('Server_pic', validators=[DataRequired()])
    default_role = StringField('Default_role', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    category = SelectField('category', choices=['Gaming', 'Music', 'Education', 'Science & Tech', 'Entertainment' ],validators=[DataRequired()])
    explore_pic = TextAreaField('Server_pic', validators=[DataRequired()])

class UpdateServerForm(FlaskForm):
    id = IntegerField('id')
    name = StringField('Name', validators=[DataRequired(), Length(min=3, max=50, message="Length should be between 3-50 characters")])
    user_id = IntegerField('User', validators=[DataRequired()])
    server_pic = TextAreaField('Server_pic', validators=[DataRequired()])
    default_role = StringField('Default_role', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    category = SelectField('category', choices=['Gaming', 'Music', 'Education', 'Science & Tech', 'Entertainment' ],validators=[DataRequired()])
    explore_pic = TextAreaField('Server_pic', validators=[DataRequired()])