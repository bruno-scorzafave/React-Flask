import unittest
from main import create_app
from config import TestConfig
from exts import db

class APITestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)
        self.client = self.app.test_client()
        
        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()
            db.engine.dispose()

    def test_signup(self):
        signup_response = self.client.post('/auth/signup', json={
            'username': 'testuser',
            'email': 'email',
            'password': 'password'
            }
        )
        self.assertEqual(signup_response.status_code, 201)
        self.assertIn('User created successfully', signup_response.json['message'])

    def test_login(self):
        signup_response = self.client.post('/auth/signup', json={
            'username': 'testuser',
            'email': 'email',
            'password': 'password'
            }
        )

        login_response = self.client.post('/auth/login', json={
            'username': 'testuser',
            'password': 'password'
            }
        )

        self.assertEqual(signup_response.status_code, 201)
        self.assertEqual(login_response.status_code, 201)

    def test_get_all_recipes(self):
        response = self.client.get('/recipes/recipes')
        
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)

    def test_get_one_recipe(self):
        signup_response = self.client.post('/auth/signup', json={
            'username': 'testuser',
            'email': 'email',
            'password': 'password'
            }
        )

        login_response = self.client.post('/auth/login', json={
            'username': 'testuser',
            'password': 'password'
            }
        )

        create_recipe_response = self.client.post('/recipes/recipes',
            json={
                'title': 'Test Recipe',
                'description': 'This is a test recipe.'
            },
            headers={'Authorization': f"Bearer {login_response.json['access_token']}"}
        )

        recipe_id = create_recipe_response.json['id']
        get_recipe_response = self.client.get(f'/recipes/recipes/{recipe_id}')
        
        self.assertEqual(get_recipe_response.status_code, 200)
        self.assertEqual(get_recipe_response.json['title'], 'Test Recipe')
        self.assertEqual(get_recipe_response.json['description'], 'This is a test recipe.')

    def test_create_recipe(self):
        signup_response = self.client.post('/auth/signup', json={
            'username': 'testuser',
            'email': 'email',
            'password': 'password'
            }
        )

        login_response = self.client.post('/auth/login', json={
            'username': 'testuser',
            'password': 'password'
            }
        )

        create_recipe_response = self.client.post('/recipes/recipes',
            json={
                'title': 'Test Recipe',
                'description': 'This is a test recipe.'
            },
            headers={'Authorization': f"Bearer {login_response.json['access_token']}"}
        )
        
        self.assertEqual(create_recipe_response.status_code, 201)
        self.assertEqual(create_recipe_response.json['title'], 'Test Recipe')
        self.assertEqual(create_recipe_response.json['description'], 'This is a test recipe.')

    def test_update_recipe(self):
        signup_response = self.client.post('/auth/signup', json={
            'username': 'testuser',
            'email': 'email',
            'password': 'password'
            }
        )

        login_response = self.client.post('/auth/login', json={
            'username': 'testuser',
            'password': 'password'
            }
        )

        create_recipe_response = self.client.post('/recipes/recipes',
            json={
                'title': 'Test Recipe',
                'description': 'This is a test recipe.'
            },
            headers={'Authorization': f"Bearer {login_response.json['access_token']}"}
        )

        recipe_id = create_recipe_response.json['id']

        update_recipe_response = self.client.put(f'/recipes/recipes/{recipe_id}',
            json={
                'title': 'Updated Recipe',
                'description': 'This is an updated test recipe.'
            },
            headers={'Authorization': f"Bearer {login_response.json['access_token']}"}
        )
        
        self.assertEqual(update_recipe_response.status_code, 200)
        self.assertEqual(update_recipe_response.json['title'], 'Updated Recipe')
        self.assertEqual(update_recipe_response.json['description'], 'This is an updated test recipe.')

    def test_delete_recipe(self):
        signup_response = self.client.post('/auth/signup', json={
            'username': 'testuser',
            'email': 'email',
            'password': 'password'
            }
        )

        login_response = self.client.post('/auth/login', json={
            'username': 'testuser',
            'password': 'password'
            }
        )

        create_recipe_response = self.client.post('/recipes/recipes',
            json={
                'title': 'Test Recipe',
                'description': 'This is a test recipe.'
            },
            headers={'Authorization': f"Bearer {login_response.json['access_token']}"}
        )

        recipe_id = create_recipe_response.json['id']

        delete_recipe_response = self.client.delete(f'/recipes/recipes/{recipe_id}',
            headers={'Authorization': f"Bearer {login_response.json['access_token']}"}
        )
        
        self.assertEqual(delete_recipe_response.status_code, 200)
        self.assertEqual(delete_recipe_response.json['title'], 'Test Recipe')
        self.assertEqual(delete_recipe_response.json['description'], 'This is a test recipe.')

    def test_hello_world(self):
        response = self.client.get('/recipes/hello')
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'hello': 'world'})

if __name__ == '__main__':
    unittest.main()