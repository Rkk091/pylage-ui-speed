"""Common responsive default styles for layout components."""

from pylage.styling.style import Style
from pylage.styling.responsive import ResponsiveStyle


def default_responsive_style() -> ResponsiveStyle:
    return ResponsiveStyle(
        base=Style(
            width="100%",
            flex_direction="column",
        ),
        md=Style(
            flex_direction="row",
        ),
        lg=Style(
            gap="2rem",
        ),
    )


def resolve_style(custom_style: Style | ResponsiveStyle | None) -> Style | ResponsiveStyle:
    if custom_style is not None:
        return custom_style
    return default_responsive_style()
