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

@route('/api/heat/upload', method='POST')
def upload_heat_data():
    """
    Загрузка данных из файла (JSON или CSV).
    Ожидается файл с полями: length, tempLeft, tempRight, nodes.
    """
    try:
        # Проверяем, что файл был отправлен
        upload = request.files.get('dataFile')
        if not upload:
            return json.dumps({'success': False, 'error': 'Файл не выбран'})

        # Читаем содержимое файла (в зависимости от расширения)
        filename = upload.filename.lower()
        content = upload.file.read().decode('utf-8')

        if filename.endswith('.json'):
            data = json.loads(content)
        elif filename.endswith('.csv'):
            # Простой CSV: первая строка заголовки, вторая данные
            lines = content.strip().split('\n')
            if len(lines) < 2:
                raise ValueError('CSV должен содержать заголовки и строку данных')
            headers = [h.strip().lower() for h in lines[0].split(',')]
            values = lines[1].split(',')
            data = dict(zip(headers, values))
        else:
            return json.dumps({'success': False, 'error': 'Поддерживаются только JSON и CSV'})

        # Извлекаем параметры (поддерживаем разные варианты написания ключей)
        length = data.get('length') or data.get('L')
        temp_left = data.get('tempLeft') or data.get('TL') or data.get('temp_left')
        temp_right = data.get('tempRight') or data.get('TR') or data.get('temp_right')
        nodes = data.get('nodes') or data.get('N')

        # Валидация (можно использовать уже существующую validateFields)
        error = validateFields(str(length), str(temp_left), str(temp_right), str(nodes))
        if error:
            return json.dumps({'success': False, 'error': error})

        # Возвращаем данные, чтобы фронтенд подставил их в форму
        return json.dumps({
            'success': True,
            'length': float(length),
            'tempLeft': float(temp_left),
            'tempRight': float(temp_right),
            'nodes': int(nodes)
        })
    except Exception as e:
        return json.dumps({'success': False, 'error': f'Ошибка чтения файла: {str(e)}'})

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