from bottle import route, request, response
import json
from backend.heat import HeatRodSolver

"""
Файл обработки действий на страницы "Теплопроводность стержня" (heat.tpl):
- обрабатывает нажатие на кнопку "Расчитать" и "Загрузка из файла"
- проводит валидацию введёных значений
- расчитывает результат
- работает с js скриптами для отрисовки значений
"""

@route('/api/heat/calculate/', method='POST')
def calculate_heat():
    """
    Обработка клика по кнопке "Рассчитать" с валидацией данных и расчётом.
    """
    length_str = request.forms.get('length', '').strip()
    temp_left_str = request.forms.get('tempLeft', '').strip()
    temp_right_str = request.forms.get('tempRight', '').strip()
    nodes_str = request.forms.get('nodes', '').strip()

    # Валидация
    error = validateFields(length_str, temp_left_str, temp_right_str, nodes_str)
    if error:
        return json.dumps({'success': False, 'error': error})

    # Преобразование в числа
    length = float(length_str)
    temp_left = float(temp_left_str)
    temp_right = float(temp_right_str)
    nodes = int(nodes_str)

    try:
        solver = HeatRodSolver(length, temp_left, temp_right, nodes)
        x_vals, t_vals = solver.solve()
        return json.dumps({'success': True, 'x': x_vals, 'T': t_vals})
    except ValueError as e:
        return json.dumps({'success': False, 'error': str(e)})
    except Exception as e:
        # Логирование ошибки (можно добавить logger)
        return json.dumps({'success': False, 'error': 'Внутренняя ошибка сервера'})


def validateFields(length_str, temp_left_str, temp_right_str, nodes_str):
    """
    Валидация значений формы (строки).
    Возвращает None, если всё OK, иначе строку с ошибкой.
    """
    # Проверки на пустоту
    if not length_str:
        return "Ошибка! Поле длины не заполнено"
    if not temp_left_str:
        return "Ошибка! Поле левой температуры не заполнено"
    if not temp_right_str:
        return "Ошибка! Поле правой температуры не заполнено"
    if not nodes_str:
        return "Ошибка! Поле количества узлов не заполнено"

    # Проверки числовых диапазонов (с преобразованием)
    try:
        length = float(length_str)
        temp_left = float(temp_left_str)
        temp_right = float(temp_right_str)
        nodes = int(nodes_str)
    except ValueError:
        return "Ошибка! Введите корректные числовые значения"

    if not (0.1 <= length <= 5):
        return "Ошибка! Длина вне диапазона [0.1; 5] м"
    if not (-50 <= temp_left <= 200):
        return "Ошибка! Левая температура вне диапазона [-50; 200] ℃"
    if not (-50 <= temp_right <= 200):
        return "Ошибка! Правая температура вне диапазона [-50; 200] ℃"
    if not (2 <= nodes <= 100):
        return "Ошибка! Количество узлов вне диапазона [2; 100]"

    return None