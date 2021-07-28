import time
from datetime import datetime
from src.models.energy_sensor import EnergySensor
from src.models.console_display import ConsoleDisplay
from src.models.measure import Measure
from src.repositories.auth_repository import AuthRepository
from src.repositories.device_repository import DeviceRepository
import config

import sys
import select


class Orchestator:

    def __init__(self, device, ref_voltage, ref_current, user_secret):
        self.sensor = EnergySensor(ref_voltage, ref_current)
        self.display = ConsoleDisplay()
        self.device = device
        self.user_repository = AuthRepository(user_secret)
        self.device_repository = DeviceRepository(user_secret)
        self.user = self.user_repository.get_user_data()
        self.message = ''

    def loop(self):
        while True:
            measure = Measure(
                self.sensor.get_voltage(),
                self.sensor.get_current(),
                self.__get_timestamp()
            )
            try:
                self.device_repository.add_measure(self.device.ble_id, measure)
                self.message = 'Muestra enviada al servidor'
            except Exception as e:
                self.message = f'Error: {e}'
            self.device.set_last_measure(measure)
            self.display.set_ui(self.device, self.user, self.message)
            self.display.draw()
            time.sleep(config.TIME_BETWEEN_MEASUREMENTS)

            user_input = select.select([sys.stdin, ], [], [], 0.0)[0]
            if user_input:
                print("Have data!")
                while (True):
                    time.sleep(config.TIME_BETWEEN_MEASUREMENTS)
            else:
                print("No data")

    def __get_timestamp(self):
        return int(datetime.now().timestamp())
