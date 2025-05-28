from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
import json

class CheckInTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.login(username='testuser', password='testpass')

    def test_checkin_within_radius(self):
        data = {
            "lat": 23.0225,
            "lng": 72.5714
        }
        response = self.client.post(reverse('checkin'), data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
