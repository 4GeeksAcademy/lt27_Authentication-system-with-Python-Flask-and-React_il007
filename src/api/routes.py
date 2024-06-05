"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS


from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager



api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    print("hello")
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



@api.route('/user', methods=['GET'])
def get_users():
    all_users = User.query.all()
    results = list(map(lambda elemento: elemento.serialize(), all_users))
    return jsonify(results), 200



@api.route('/private', methods=['POST', 'GET'])
@jwt_required()
def private():

    email = get_jwt_identity()

    user = User.query.filter_by(email=email).first()


    if user is None:
        return jsonify({"msg": "The user/email is not in the system"}), 404
    response_body = {
        "message": "This is a private service"
    }

    return jsonify(response_body), 200





@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    print(email)


    user = User.query.filter_by(email=email).first()


    if user is None:
        return jsonify({"msg": "The user/email is not in the system"}), 404
    
    good_password = current_app.bcrypt.check_password_hash(user.password, password)
    
    # if email != user.email or password != user.password:
    if email != user.email or not good_password:
        return jsonify({"msg": "Wrong email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token, user=user.serialize())



@api.route("/signup", methods=["POST"])
def signup():
    body = request.get_json()
    print (body)

    user = User.query.filter_by(email=body["email"]).first()
    print (user)
    if user == None:
        pw_hash = current_app.bcrypt.generate_password_hash(body["password"]).decode('utf-8')
        user = User(email=body["email"], password=pw_hash, is_active = True)
        #  user = User(email=body["email"], password=body["password"], is_active = True)
        db.session.add(user)
        db.session.commit()
        response_body ={
            "msg": "User created"
        }
        return jsonify (response_body), 200
    else:
        return jsonify({"msg": "There is an user created with email provided"}), 401
