"""
This script runs the application using a development server.
"""

import bottle
import os
import sys

# routes contains the HTTP handlers for our server and must be imported.
import controller.boat_controller
import routes

# ����������� �����������
from controller import projectile_controller

if '--debug' in sys.argv[1:] or 'SERVER_DEBUG' in os.environ:
    bottle.debug(True)

def wsgi_app():
    return bottle.default_app()

if __name__ == '__main__':
    PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
    STATIC_ROOT = os.path.join(PROJECT_ROOT, 'static').replace('\\', '/')
    HOST = os.environ.get('SERVER_HOST', 'localhost')
    try:
        PORT = int(os.environ.get('SERVER_PORT', '5555'))
    except ValueError:
        PORT = 5555

    @bottle.route('/static/<filepath:path>')
    def server_static(filepath):
        return bottle.static_file(filepath, root=STATIC_ROOT)

    # ������������ API �������� �� �����������
    bottle.route('/api/calculate', method='POST')(projectile_controller.api_calculate)
    bottle.route('/api/random/<param_name>', method='GET')(projectile_controller.api_random)
    bottle.route('/api/random-all', method='GET')(projectile_controller.api_random_all)

    # ��������� ������
    bottle.run(server='wsgiref', host=HOST, port=PORT)