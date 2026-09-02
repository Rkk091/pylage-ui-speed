from typing import Any
from pylage.components.basic import Drawer as PDrawer
from pylage.core.component import Component
from pylage.styling.style import Style
from pylage.styling.responsive import ResponsiveStyle


def Drawer(*children: Any, style: Style | ResponsiveStyle | None = None, **props: Any) -> Component:
    return PDrawer(*children, style=style, **props)


def NavigationDrawer(*children: Any, style: Style | ResponsiveStyle | None = None, **props: Any) -> Component:
    return PDrawer(*children, style=style, **props)


def MobileSidebar(*children: Any, style: Style | ResponsiveStyle | None = None, **props: Any) -> Component:
    return PDrawer(*children, style=style, **props)


__all__ = ["Drawer", "NavigationDrawer", "MobileSidebar"]
