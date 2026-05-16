import math
import model.point
g = 9.81

class Boat:
    def calculate(mass: float, k: float, start_speed: float, alpha: int, delta_t: float):
        result = []
        
        alpha_rad = math.radians(alpha)
        
        vx = start_speed * math.cos(alpha_rad)
        vy = start_speed * math.sin(alpha_rad)
        
        x = 0.0
        y = 0.0
        t = 0.0
        
        max_height = 0.0
        
        prev_x = 0.0
        prev_y = 0.0
        
        while y >= 0:
            v = math.sqrt(math.pow(vx, 2) + math.pow(vy, 2))
            
            ax = (-1) * (k / mass) * v * vx
            ay = (-1) * g - (k / mass) * v * vy
            
            vx = vx + ax * delta_t
            vy = vy + ay * delta_t
            
            prev_x = x
            prev_y = y
            
            x = x + vx * delta_t
            y = y + vy * delta_t
            
            if y > max_height:
                max_height = y
            
            t = t + delta_t
            
            point = model.point.Point(x, y)
            result.append(point)  
        
        range_distance = 0.0

        if prev_y > 0 and y <= 0:
            if y != prev_y:  
                range_distance = prev_x - prev_y * (x - prev_x) / (y - prev_y)
        
        return {
            'trajectory': result,
            'max_height': max_height,
            'range': range_distance
        }