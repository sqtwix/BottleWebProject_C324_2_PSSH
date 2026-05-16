from bottle import route, request, template, redirect
import datetime

@route('/boat', method='GET')
def boat_form():
    return template('boat',
                    title='Движение лодки с парусом',
                    year=datetime.datetime.now().year,
                    v_cur=1.0, v_wind=5.0, c=10, k_wind=1.2,
                    v_max=None, theta_opt=None,
                    error=None)

@route('/boat/calculate', method='POST')
def boat_calc():
    v_cur = request.forms.get('v_cur', '').strip()
    v_wind = request.forms.get('v_wind', '').strip()
    c = request.forms.get('c', '').strip()
    k_wind = request.forms.get('k_wind', '').strip()

    error = None

    # Проверка на пустоту
    if not v_cur or not v_wind or not c or not k_wind:
        error = "Все поля должны быть заполнены"
        return template('boat',
                        title='Движение лодки с парусом',
                        year=datetime.datetime.now().year,
                        v_cur=v_cur, v_wind=v_wind, c=c, k_wind=k_wind,
                        error=error, v_max=None, theta_opt=None)

    # Преобразование в числа
    try:
        v_cur = float(v_cur)
        v_wind = float(v_wind)
        c = float(c)
        k_wind = float(k_wind)
    except ValueError:
        error = "Ввести можно только числа"
        return template('boat',
                        title='Движение лодки с парусом',
                        year=datetime.datetime.now().year,
                        v_cur=v_cur, v_wind=v_wind, c=c, k_wind=k_wind,
                        error=error, v_max=None, theta_opt=None)

    # Проверка диапазонов
    if not (0.5 <= v_cur <= 5):
        error = "Скорость течения должна быть от 0.5 до 5"
    elif not (0 <= v_wind <= 20):
        error = "Скорость ветра должна быть от 0 до 20"
    elif not (5 <= c <= 20):
        error = "Коэффициент сопротивления должен быть от 5 до 20" 
    elif not (0.5 <= k_wind <= 5):
        error = "Коэффициент парусности должен быть от 0.5 до 5"

    if error:
        return template('boat',
                        title='Движение лодки с парусом',
                        year=datetime.datetime.now().year,
                        v_cur=v_cur, v_wind=v_wind, c=c, k_wind=k_wind,
                        error=error, v_max=None, theta_opt=None)

    # Все проверки пройдены – выполняем расчёт
    result = calculate_boat(v_cur, v_wind, c, k_wind)
    v_max = result['v_max']
    theta_opt = result['theta_opt']

    return template('boat',
                    title='Движение лодки с парусом',
                    year=datetime.datetime.now().year,
                    v_cur=v_cur, v_wind=v_wind, c=c, k_wind=k_wind,
                    error=None, v_max=v_max, theta_opt=theta_opt)

# Временная заглушка
def calculate_boat(v_cur, v_wind, c, k_wind):
    return {'v_max': 2.85, 'theta_opt': 47}