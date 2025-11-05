from flask import request
from flask_restx import Resource, Namespace, fields
from models import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required

auth_ns = Namespace('auth', description='Authentication related operations')

signup_model = auth_ns.model(
    'Signup',
    {
        'username': fields.String(required=True, description='The user username'),
        'email': fields.String(required=True, description='The user description'),
        'password': fields.String(required=True, description='The user password')

    }
)

login_model = auth_ns.model(
    'Login',
    {
        'username': fields.String(required=True, description='The user username'),
        'password': fields.String(required=True, description='The user password')

    }
)

@auth_ns.route('/signup')
class SignUp(Resource):

    @auth_ns.expect(signup_model)
    def post(self):
        '''User signup endpoint'''
        
        data = request.get_json()

        username=data.get('username')

        db_user = User.query.filter_by(username=username).first()

        if db_user is not None:
            return {'message': f'User with username {username} already exists'}, 400

        new_user = User(
            username=data.get('username'),
            email=data.get('email'),
            password=generate_password_hash(data.get('password'))
        )

        new_user.save()

        return {'message': 'User created successfully'}, 201

@auth_ns.route('/login')
class Login(Resource):
    
    @auth_ns.expect(login_model)
    def post(self):
        '''User login endpoint'''
        
        data = request.get_json()

        username=data.get('username')
        password=data.get('password')

        db_user = User.query.filter_by(username=username).first()

        if db_user and check_password_hash(db_user.password, password):

            access_token = create_access_token(identity=db_user.username)
            refresh_token = create_refresh_token(identity=db_user.username)

            return {'access_token': access_token, 'refresh_token': refresh_token}, 201
        
        return {'message': 'Invalid username or password'}, 401
    
@auth_ns.route('/refresh')
class RefreshResource(Resource):

    @jwt_required(refresh=True)
    def post(self):
        '''Token refresh endpoint'''
        
        current_user = get_jwt_identity()

        new_access_token = create_access_token(identity=current_user)

        return {'access_token': new_access_token}, 201