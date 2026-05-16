import math
from model.point import Point

g = 9.81

class ProjectileCalculator:
    """Класс для расчета движения тела с сопротивлением воздуха"""
    
    @staticmethod
    def calculate_with_drag(mass, k, start_speed, angle_deg, delta_t):
        """
        Расчет траектории с учетом сопротивления воздуха
        
        Возвращает словарь:
        - trajectory: список объектов Point
        - max_height: максимальная высота (м)
        - range: дальность полета (м)
        - flight_time: время полета (с)
        - final_speed: конечная скорость (м/с)
        """
        result = []
        
        angle_rad = math.radians(angle_deg)
        
        vx = start_speed * math.cos(angle_rad)
        vy = start_speed * math.sin(angle_rad)
        
        x = 0.0
        y = 0.0
        t = 0.0
        
        max_height = 0.0
        
        prev_x = 0.0
        prev_y = 0.0
        prev_vx = vx
        prev_vy = vy
        
        while y >= 0:
            v = math.sqrt(vx**2 + vy**2)
            
            ax = -(k / mass) * v * vx
            ay = -g - (k / mass) * v * vy
            
            prev_x = x
            prev_y = y
            prev_vx = vx
            prev_vy = vy
            
            vx += ax * delta_t
            vy += ay * delta_t
            
            x += vx * delta_t
            y += vy * delta_t
            
            if y > max_height:
                max_height = y
            
            t += delta_t
            
            point = Point(x, y)
            result.append(point)
        
        flight_time = t
        final_speed = math.sqrt(prev_vx**2 + prev_vy**2)
        
        range_distance = 0.0
        if prev_y > 0 and y <= 0:
            if y != prev_y:
                range_distance = prev_x - prev_y * (x - prev_x) / (y - prev_y)
        
        return {
            'trajectory': result,
            'max_height': max_height,
            'range': range_distance,
            'flight_time': flight_time,
            'final_speed': final_speed
        }
    
    @staticmethod
    def validate_parameters(mass, k, velocity, angle, delta_t):
        """Валидация параметров"""
        errors = {}
        
        if mass < 0.01:
            errors['mass'] = f'Масса должна быть не менее 0.01 кг'
        elif mass > 100:
            errors['mass'] = f'Масса должна быть не более 100 кг'
        
        if k < 0.00001:
            errors['drag'] = f'Коэффициент сопротивления должен быть не менее 0.00001'
        elif k > 50:
            errors['drag'] = f'Коэффициент сопротивления должен быть не более 50'
        
        if velocity < 5:
            errors['velocity'] = f'Скорость должна быть не менее 5 м/с'
        elif velocity > 900:
            errors['velocity'] = f'Скорость должна быть не более 900 м/с'
        
        if angle < 0:
            errors['angle'] = f'Угол должен быть не менее 0°'
        elif angle > 90:
            errors['angle'] = f'Угол должен быть не более 90°'
        
        if delta_t < 0.001:
            errors['deltaTime'] = f'Шаг времени должен быть не менее 0.001 с'
        elif delta_t > 0.05:
            errors['deltaTime'] = f'Шаг времени должен быть не более 0.05 с'
        
        return len(errors) == 0, errors