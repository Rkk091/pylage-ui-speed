"""Public page templates for PyLage Layout."""

from .landing import LandingPage
from .dashboard import Dashboard
from .admin import AdminPanel
from .authentication import Authentication
from .profile import ProfilePage
from .settings import Settings, SettingsPage
from .documentation import Documentation

Admin = AdminPanel
Landing = LandingPage
Profile = ProfilePage

__all__ = [
    "LandingPage",
    "Landing",
    "Dashboard",
    "AdminPanel",
    "Admin",
    "Authentication",
    "ProfilePage",
    "Profile",
    "Settings",
    "SettingsPage",
    "Documentation",
]
