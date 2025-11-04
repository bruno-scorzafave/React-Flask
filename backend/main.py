from flask import Flask, request
from flask_restx import Api, Resource, fields
from config import DevConfig
from models import Recipe
from exts import db
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(DevConfig)

db.init_app(app)

migrate = Migrate(app, db)

api=Api(app, doc="/docs")

recipe_model = api.model(
    'Recipe',
    {
        'id': fields.Integer(readonly=True, description='The recipe unique identifier'),
        'title': fields.String(required=True, description='The recipe title'),
        'description': fields.String(required=True, description='The recipe description'),
    }
)

@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}
    
@api.route('/recipes')
class RecipeResource(Resource):
    def get(self):
        recipes = Recipe.query.all()
        return [ {'id': r.id, 'title': r.title, 'description': r.description} for r in recipes ]
    
    @api.marshal_with(recipe_model)
    def post(self):
        # Implementation for creating a new recipe would go here
        data = request.get_json()
        
        new_recipe = Recipe(title=data.get('title'), description=data.get('description'))

        new_recipe.save()

        return new_recipe, 201

@api.route('/recipes/<int:id>')
class RecipeResource(Resource):

    @api.marshal_with(recipe_model)
    def get(self, id):
        recipe = Recipe.query.get_or_404(id)
        
        return recipe
    
    @api.marshal_with(recipe_model)
    def put(self, id):
        recipe_to_update = Recipe.query.get_or_404(id)
        
        data = request.get_json()
        
        recipe_to_update.update(
            title=data.get('title'),
            description=data.get('description')
        )

        return recipe_to_update
    
    @api.marshal_with(recipe_model)
    def delete(self, id):
        recipe_to_delete = Recipe.query.get_or_404(id)

        recipe_to_delete.delete()

        return recipe_to_delete
    
@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'Recipe': Recipe}
    
if __name__ == '__main__':
    app.run()