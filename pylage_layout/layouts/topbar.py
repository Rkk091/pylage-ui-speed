from typing import Any
from pylage.components.basic import Navigation
from pylage.core.component import Component
from pylage.styling.style import Style


def Topbar(*children: Any, style: Style | None = None, **props: Any) -> Component:
    base_style = Style(
        display="flex",
        align_items="center",
        justify_content="space-between",
        width="100%",
        padding="0.75rem 1.5rem",
    )
    return Navigation(*children, style=style or base_style, **props)


__all__ = ["Topbar"]
