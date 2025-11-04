from flask import Flask, request
from flask_restx import Api, Resource, fields
from config import DevConfig
from models import Recipe, User
from exts import db
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity

app = Flask(__name__)
app.config.from_object(DevConfig)

db.init_app(app)

migrate = Migrate(app, db)
JWTManager(app)

api=Api(app, doc='/docs')

recipe_model = api.model(
    'Recipe',
    {
        'id': fields.Integer(readonly=True, description='The recipe unique identifier'),
        'title': fields.String(required=True, description='The recipe title'),
        'description': fields.String(required=True, description='The recipe description'),
    }
)

signup_model = api.model(
    'Signup',
    {
        'username': fields.String(required=True, description='The user username'),
        'email': fields.String(required=True, description='The user description'),
        'password': fields.String(required=True, description='The user password')

    }
)

login_model = api.model(
    'Login',
    {
        'username': fields.String(required=True, description='The user username'),
        'password': fields.String(required=True, description='The user password')

    }
)

@api.route('/hello')
class HelloWorld(Resource):
    
    def get(self):
        '''A simple hello world endpoint'''
        return {'hello': 'world'}
    
@api.route('/signup')
class SignUp(Resource):

    @api.expect(signup_model)
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
    
@api.route('/login')
class Login(Resource):
    
    @api.expect(login_model)
    def post(self):
        '''User login endpoint'''
        
        data = request.get_json()

        username=data.get('username')
        password=data.get('password')

        db_user = User.query.filter_by(username=username).first()

        if db_user and check_password_hash(db_user.password, password):

            access_token = create_access_token(identity=db_user.username)
            refresh_token = create_refresh_token(identity=db_user.username)

            return {'access token': access_token, 'refresh_token': refresh_token}, 201
        
        return {'message': 'Invalid username or password'}, 401
    
@api.route('/recipes')
class RecipeResource(Resource):
    def get(self):
        '''Get all recipes'''
        
        recipes = Recipe.query.all()
        
        return [ {'id': r.id, 'title': r.title, 'description': r.description} for r in recipes ]
    
    @api.marshal_with(recipe_model)
    @api.expect(recipe_model)
    @jwt_required()
    def post(self):
        '''Create a new recipe'''

        data = request.get_json()
        
        new_recipe = Recipe(title=data.get('title'), description=data.get('description'))

        new_recipe.save()

        return new_recipe, 201

@api.route('/recipes/<int:id>')
class RecipeResource(Resource):

    @api.marshal_with(recipe_model)
    def get(self, id):
        '''Get a recipe by ID'''

        recipe = Recipe.query.get_or_404(id)
        
        return recipe
    
    @api.marshal_with(recipe_model)
    @jwt_required()
    def put(self, id):
        '''Update a recipe by ID'''

        recipe_to_update = Recipe.query.get_or_404(id)
        
        data = request.get_json()
        
        recipe_to_update.update(
            title=data.get('title'),
            description=data.get('description')
        )

        return recipe_to_update
    
    @api.marshal_with(recipe_model)
    @jwt_required()
    def delete(self, id):
        '''Delete a recipe by ID'''

        recipe_to_delete = Recipe.query.get_or_404(id)

        recipe_to_delete.delete()

        return recipe_to_delete
    
@app.shell_context_processor
def make_shell_context():
    return {
        'db': db,
        'Recipe': Recipe
        }
    
if __name__ == '__main__':
    app.run()