from flask import Flask, request, jsonify
import json
from flask_cors import CORS
from models.database import db
from models.colorPalette import ColorPalette
from __main__ import app

from datetime import timedelta
from flask_jwt_extended import create_access_token
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

jwt = JWTManager(app)

CORS(app)

@app.route('/api/login/<string:type>', methods = ['GET'])
def login(type):
    if type == 'admin':
        access_token = create_access_token(identity='admin')
        return jsonify(access_token=access_token), 200
    else:
        access_token = create_access_token(identity='user')
        return jsonify(access_token=access_token), 200
    
@app.route('/api/color_palette', methods = ['GET', 'POST'])
@jwt_required()
def color_palette_crud():
    if request.method == 'GET':
        # add pagination
        default_limit = 10
        default_skip = 0

        limit = request.args.get('limit', default=default_limit, type=int)
        offset = request.args.get('offset', default=default_skip, type=int)

        color_palette = ColorPalette.query.limit(limit).offset(offset).all()
        
        if color_palette is not None:
            result = []
            for color in color_palette:
                result.append({
                    "id": color.id,
                    "name": color.name,
                    "color": color.color
                })
            return jsonify(result), 200
        else:
            return jsonify({"error": "No color palettes found"}), 404
    elif request.method == 'POST':
        try:
            data = request.get_json()
            name = data.get('name')
            color = data.get('color')
            if name is None or color is None:
                return jsonify({"error": "Name and color are required"}), 418 # Unprocessable Entity 422
            color_palette = ColorPalette(name, color)
            db.session.add(color_palette)
            db.session.commit()
            return jsonify({"message": "Color palette added"}), 201
        except KeyError:
            return jsonify({"error": "Invalid data "}), 400 # Bad Request


@app.route('/api/color_palette/<int:id>', methods = ['GET', 'PUT', 'DELETE'])
@jwt_required()
def color_palette_by_id(id):
    if request.method == 'GET':
        color = ColorPalette.query.get(id)
        if color is not None:
            return jsonify({
                "id": color.id,
                "name": color.name,
                "color": color.color
            }), 200
        else:
            return jsonify({"error": "Color palette not found"}), 404
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            name = data.get('name')
            color = data.get('color')
            color_palette = ColorPalette.query.get(id)
            if name is not None:
                color_palette.name = name
            if color is not None:
                color_palette.color = color
            db.session.commit()
            return jsonify({"message": "Color palette updated"}), 200
        except AttributeError:
            return jsonify({"error": "Color palette not found"}), 404
        except KeyError:
            return jsonify({"error": "Invalid data"}), 400
        
    elif request.method == 'DELETE':
        if get_jwt_identity() != 'admin':
            return jsonify({"error": "Unauthorized"}), 401
        else:
            try:
                color_palette = ColorPalette.query.get(id)
                if color_palette is not None:
                    db.session.delete(color_palette)
                    db.session.commit()
                    return jsonify({"message": "Color palette deleted"}), 200
                else:
                    return jsonify({"error": "Color palette not found"}), 404
            except KeyError:
                return jsonify({"error": "Invalid data"}), 400

    
    