"""
Controller for ballistic calculator
"""

from bottle import request, HTTPResponse
import json
import random
import sys
import os

# Добавляем путь к корневой папке для импорта projectile
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
        
        # Принудительные ограничения
        mass = max(0.01, min(100, mass))
        k = max(0.00001, min(50, k))
        velocity = max(5, min(900, velocity))
        angle = max(0, min(90, angle))
        delta_t = max(0.001, min(0.05, delta_t))
        
        result = ProjectileCalculator.calculate_with_drag(
            mass=mass, k=k, start_speed=velocity, angle_deg=angle, delta_t=delta_t
        )
        
        # Правильное преобразование точек в словари
        trajectory_points = []
        for point in result['trajectory']:
            if hasattr(point, 'get_x') and hasattr(point, 'get_y'):
                trajectory_points.append({
                    'x': point.get_x(),
                    'y': point.get_y()
                })
            elif isinstance(point, dict):
                trajectory_points.append(point)
            else:
                trajectory_points.append({
                    'x': point[0],
                    'y': point[1]
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
        import traceback
        traceback.print_exc()
        return HTTPResponse(
            status=500,
            body=json.dumps({'error': str(e)})
        )

def api_random(param_name):
    """Случайное значение параметра в допустимых пределах"""
    ranges = {
        'mass': (0.5, 50),  # Ограничиваем для стабильности
        'drag': (0.001, 5),
        'velocity': (10, 100),
        'angle': (10, 80),
        'deltaTime': (0.01, 0.05)
    }
    
    if param_name in ranges:
        min_val, max_val = ranges[param_name]
        if param_name == 'angle':
            value = random.randint(int(min_val), int(max_val))
        elif param_name == 'deltaTime':
            value = round(random.uniform(min_val, max_val), 3)
        else:
            value = round(random.uniform(min_val, max_val), 2)
        
        return json.dumps({'value': value})
    
    return HTTPResponse(status=404, body=json.dumps({'error': 'Parameter not found'}))

def api_random_all():
    """Все случайные параметры в допустимых пределах"""
    return json.dumps({
        'mass': round(random.uniform(0.5, 50), 2),
        'drag': round(random.uniform(0.001, 5), 4),
        'velocity': round(random.uniform(10, 100), 1),
        'angle': random.randint(10, 80),
        'deltaTime': round(random.uniform(0.01, 0.05), 3)
    })