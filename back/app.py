from flask import Flask, request, jsonify
import json
from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy
from flask_swagger_ui import get_swaggerui_blueprint

from models.database import db

def create_app(db=db):
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///colorPalette.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    

    swagger_url = '/api/docs'
    api_url = '/static/swagger.json'
    swaggerui_blueprint = get_swaggerui_blueprint(
        swagger_url,
        api_url,
        config={
            'app_name': "Daily Inspiration API"
        }
    )
    app.register_blueprint(swaggerui_blueprint, url_prefix=swagger_url)

    # jwt
    app.config["JWT_SECRET_KEY"] = "key"  # test
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=1)
    return app

if __name__ == '__main__':
    app = create_app()
    import routes
    app.run(debug=True)
