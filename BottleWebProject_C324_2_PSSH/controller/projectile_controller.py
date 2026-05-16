"""
Controller for ballistic calculator
"""

from bottle import request, HTTPResponse
import json
import random
import sys
import os

# Добавляем путь к корневой папке
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.projectile import ProjectileCalculator

def api_calculate():
    """API для расчета траектории"""
    try:
        data = json.loads(request.body.read().decode('utf-8'))
        
        mass = float(data.get('mass', 1.0))
        k = float(data.get('drag', 0.1))
        velocity = float(data.get('velocity', 20.0))
        angle = float(data.get('angle', 45.0))
        delta_t = float(data.get('deltaTime', 0.02))
        
        is_valid, errors = ProjectileCalculator.validate_parameters(mass, k, velocity, angle, delta_t)
        
        if not is_valid:
            return HTTPResponse(
                status=400,
                body=json.dumps({'error': 'Ошибка валидации', 'details': errors})
            )
        
        result = ProjectileCalculator.calculate_with_drag(
            mass=mass, k=k, start_speed=velocity, angle_deg=angle, delta_t=delta_t
        )
        
        trajectory_points = []
        for point in result['trajectory']:
            trajectory_points.append({
                'x': point.get_x(),
                'y': point.get_y()
            })
        
        response_data = {
            'success': True,
            'trajectory': trajectory_points,
            'max_height': round(result['max_height'], 2),
            'range': round(result['range'], 2),
            'flight_time': round(result['flight_time'], 2),
            'final_speed': round(result['final_speed'], 2)
        }
        
        return json.dumps(response_data)
        
    except Exception as e:
        return HTTPResponse(
            status=500,
            body=json.dumps({'error': str(e)})
        )

def api_random(param_name):
    """Случайное значение параметра"""
    ranges = {
        'mass': (0.01, 100),
        'drag': (0.00001, 50),
        'velocity': (5, 900),
        'angle': (0, 90),
        'deltaTime': (0.001, 0.05)
    }
    
    if param_name in ranges:
        min_val, max_val = ranges[param_name]
        if param_name == 'angle':
            value = random.randint(int(min_val), int(max_val))
        elif param_name == 'deltaTime':
            value = round(random.uniform(min_val, max_val), 4)
        else:
            value = round(random.uniform(min_val, max_val), 2)
        
        return json.dumps({'value': value})
    
    return HTTPResponse(status=404, body=json.dumps({'error': 'Parameter not found'}))

def api_random_all():
    """Все случайные параметры"""
    return json.dumps({
        'mass': round(random.uniform(0.01, 100), 2),
        'drag': round(random.uniform(0.00001, 50), 6),
        'velocity': round(random.uniform(5, 900), 1),
        'angle': random.randint(0, 90),
        'deltaTime': round(random.uniform(0.001, 0.05), 4)
    })