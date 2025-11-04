from decouple import config
import os

BASE_DIR = os.path.dirname(os.path.realpath(__file__))

class Config:
    DEBUG: bool = config('DEBUG', default=False, cast=bool)
    SECRET_KEY: str = config('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS: bool = config('SQLALCHEMY_TRACK_MODIFICATIONS', default=False, cast=bool)

class DevConfig(Config):
    DEBUG: bool = True
    SQLALCHEMY_DATABASE_URI: str = "sqlite:///"+os.path.join(BASE_DIR, 'dev_database.db')
    SQLALCHEMY_ECHO: bool = True

class ProdConfig(Config):
    pass

class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI: str = "sqlite:///test.db"
    SQLALCHEMY_ECHO: bool = False
    TESTING: bool = True