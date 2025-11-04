from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required
from flask import request
from models import Recipe

recipe_ns = Namespace('recipes', description='Recipe related operations')

recipe_model = recipe_ns.model(
    'Recipe',
    {
        'id': fields.Integer(readonly=True, description='The recipe unique identifier'),
        'title': fields.String(required=True, description='The recipe title'),
        'description': fields.String(required=True, description='The recipe description'),
    }
)

@recipe_ns.route('/hello')
class HelloWorld(Resource):
    
    def get(self):
        '''A simple hello world endpoint'''
        return {'hello': 'world'}
    
@recipe_ns.route('/recipes')
class RecipeResource(Resource):
    def get(self):
        '''Get all recipes'''
        
        recipes = Recipe.query.all()
        
        return [ {'id': r.id, 'title': r.title, 'description': r.description} for r in recipes ]
    
    @recipe_ns.marshal_with(recipe_model)
    @recipe_ns.expect(recipe_model)
    @jwt_required()
    def post(self):
        '''Create a new recipe'''

        data = request.get_json()
        
        new_recipe = Recipe(title=data.get('title'), description=data.get('description'))

        new_recipe.save()

        return new_recipe, 201

@recipe_ns.route('/recipes/<int:id>')
class RecipeResource(Resource):

    @recipe_ns.marshal_with(recipe_model)
    def get(self, id):
        '''Get a recipe by ID'''

        recipe = Recipe.query.get_or_404(id)
        
        return recipe
    
    @recipe_ns.marshal_with(recipe_model)
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
    
    @recipe_ns.marshal_with(recipe_model)
    @jwt_required()
    def delete(self, id):
        '''Delete a recipe by ID'''

        recipe_to_delete = Recipe.query.get_or_404(id)

        recipe_to_delete.delete()

        return recipe_to_delete