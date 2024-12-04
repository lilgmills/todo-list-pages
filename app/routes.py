from flask import Blueprint, render_template, url_for
from flask import current_app
from os import path
import requests

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')