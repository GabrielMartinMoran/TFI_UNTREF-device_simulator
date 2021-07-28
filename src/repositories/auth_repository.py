import requests
import config
from src.models.user import User
from src.repositories.base_repository import BaseRepository


class AuthRepository(BaseRepository):
    ENDPOINT = '/auth'

    def get_user_data(self) -> User:
        response = self.get(f"{config.API_URL}{self.ENDPOINT}/get_data")
        return User(response['username'], response['email'])
