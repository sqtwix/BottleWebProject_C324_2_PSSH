import numpy as np


class HeatRodSolver:
    """
    �������� ������������ ������ ���������������� �������.
    
    ������������ ������������� �������:
        T(x) = T_L + (T_R - T_L) * x / L
    """
    
    def __init__(self, length: float, temp_left: float, temp_right: float, n: int):
        """
        ��������� ������:
        :param length:      ����� ������� L, �
        :param temp_left:   ����������� ������ ����� T_L, �C
        :param temp_right:  ����������� ������� ����� T_R, �C
        :param nodes:       ���������� ����� (������� �����), N >= 2
        """
        if length <= 0:
            raise ValueError("����� ������� ������ ���� �������������")
        if n < 2:
            raise ValueError("���������� ����� ������ ���� �� ����� 2")

        self.L = length
        self.TL = temp_left
        self.TR = temp_right
        self.N = n

    def solve(self):
        """
        ��������� ������������� �����������.
        :return: (x_array, T_array) - ���������� � ����������� � �����
        """
        x = np.linspace(0, self.L, self.N)
        # ������������� �������
        T = self.TL + (self.TR - self.TL) * (x / self.L)
        return x.tolist(), T.tolist()
    
    def get_temperature_at(self, x: float) -> float:
        """����������� � ������������ ����� x (0 <= x <= L)"""
        if x < 0 or x > self.L:
            raise ValueError("x ��� ��������� �������")
        return self.TL + (self.TR - self.TL) * (x / self.L)

    def get_heat_flux(self, thermal_conductivity: float = 1.0) -> float:
        """
        ��������� ��������� ������ q = -k * (T_R - T_L)/L
        :param thermal_conductivity: ����������� ���������������� k (��/(��))
        """
        return -thermal_conductivity * (self.TR - self.TL) / self.L
