from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class JoinServerForm(FlaskForm):
    member_id = IntegerField('Member', validators=[DataRequired()])
    server_id = IntegerField('Server', validators=[DataRequired()])
