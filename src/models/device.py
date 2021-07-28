class Device:
    def __init__(self, name, ble_id=None, active=True, turned_on=False):
        self.name = name
        self.ble_id = ble_id
        self.last_measure = None
        self.active = active
        self.turned_on = turned_on

    def to_json(self):
        return {
            'name': self.name,
            'ble_id': self.ble_id,
            'active': self.active,
            'turned_on': self.turned_on
        }

    def set_last_measure(self, measure):
        self.last_measure = measure

    @staticmethod
    def from_json(json_data):
        return Device(json_data['name'], json_data['ble_id'], active=json_data['active'],
                      turned_on=json_data['turned_on'])
