import numpy as np


class HeatRodSolver:
    """
    Решатель стационарной задачи теплопроводности стержня.
    
    Используется аналитическое решение:
        T(x) = T_L + (T_R - T_L) * x / L
    """
    
    def __init__(self, length: float, temp_left: float, temp_right: float, n: int):
        """
        Параметры модели:
        :param length:      длина стержня L, м
        :param temp_left:   температура левого конца T_L, °C
        :param temp_right:  температура правого конца T_R, °C
        :param nodes:       количество узлов (включая концы), N >= 2
        """
        if length <= 0:
            raise ValueError("Длина стержня должна быть положительной")
        if n < 2:
            raise ValueError("Количество узлов должно быть не менее 2")

        self.L = length
        self.TL = temp_left
        self.TR = temp_right
        self.N = n

    def solve(self):
        """
        Вычисляет распределение температуры.
        :return: (x_array, T_array) - координаты и температуры в узлах
        """
        x = np.linspace(0, self.L, self.N)
        # Аналитическая формула
        T = self.TL + (self.TR - self.TL) * (x / self.L)
        return x.tolist(), T.tolist()
    
    def get_temperature_at(self, x: float) -> float:
        """Температура в произвольной точке x (0 <= x <= L)"""
        if x < 0 or x > self.L:
            raise ValueError("x вне диапазона стержня")
        return self.TL + (self.TR - self.TL) * (x / self.L)

    def get_heat_flux(self, thermal_conductivity: float = 1.0) -> float:
        """
        Плотность теплового потока q = -k * (T_R - T_L)/L
        :param thermal_conductivity: коэффициент теплопроводности k (Вт/(м·К))
        """
        return -thermal_conductivity * (self.TR - self.TL) / self.L
