from django.core.management.base import BaseCommand
from octofit_tracker.models import Team, User, Activity, Workout, Leaderboard
from django.utils import timezone
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clean up all collections
        Activity.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Users
        users = [
            User.objects.create(email='tony@stark.com', name='Iron Man', team=marvel),
            User.objects.create(email='steve@rogers.com', name='Captain America', team=marvel),
            User.objects.create(email='bruce@wayne.com', name='Batman', team=dc),
            User.objects.create(email='clark@kent.com', name='Superman', team=dc),
        ]

        # Activities
        Activity.objects.create(user=users[0], type='run', duration=30, calories=300, date=timezone.now().date())
        Activity.objects.create(user=users[1], type='cycle', duration=45, calories=400, date=timezone.now().date())
        Activity.objects.create(user=users[2], type='swim', duration=60, calories=500, date=timezone.now().date())
        Activity.objects.create(user=users[3], type='yoga', duration=40, calories=200, date=timezone.now().date())

        # Workouts
        w1 = Workout.objects.create(name='Hero HIIT', description='High intensity for heroes')
        w2 = Workout.objects.create(name='Power Yoga', description='Yoga for super strength')
        w1.suggested_for.add(marvel)
        w2.suggested_for.add(dc)

        # Leaderboard
        Leaderboard.objects.create(team=marvel, score=700)
        Leaderboard.objects.create(team=dc, score=600)

        # Ensure unique index on email in users collection
        client = MongoClient('mongodb://localhost:27017')
        db = client['octofit_db']
        db.user.create_index('email', unique=True)
        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
