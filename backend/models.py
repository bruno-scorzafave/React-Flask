from exts import db

"""
class Recipe:
    id: int primary key
    title:str
    description:str (text)
"""""

class Recipe(db.Model):
    __tablename__ = 'recipes'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), nullable=False)
    description = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f"<Recipe {self.title}>"
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, title: str, description: str):
        self.title = title
        self.description = description
        db.session.commit()

"""
class User:
    id: int primary key
    username: str unique
    email: str unique
    password: str
"""

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"<User {self.username}>"
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, username: str, email: str, password: str):
        self.username = username
        self.email = email
        self.password = password
        db.session.commit()