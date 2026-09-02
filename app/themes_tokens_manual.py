"""Manual demo for PyLage Design Tokens & Theme Engine (Tokens, Light, Dark, Factory)."""

from pylage import (
    Column,
    Row,
    Card,
    Heading,
    Text,
    Button,
    Badge,
    State,
    Style,
    Theme,
)
from pylage_layout.tokens import COLORS, FONTS, RADIUS, SPACING, validate_tokens
from pylage_layout.themes.light import LIGHT_THEME
from pylage_layout.themes.dark import DARK_THEME


def get_app() -> Column:
    is_dark = State(False)

    title = Heading("🎨 Design Tokens & Theme System Manual", level=1)
    desc = Text(
        "Demonstrates design tokens, color scales, typography mappings, and dynamic theme switching.",
        style=Style(color="#64748b", margin_bottom="1.5rem"),
    )

    # 1. Token validation card
    is_valid = validate_tokens()
    token_status = Card(
        Heading("1. Design Tokens Status", level=3),
        Row(
            Text("Token Engine Status: "),
            Badge("VALIDATED ✅" if is_valid else "INVALID ❌", variant="success" if is_valid else "danger"),
            style=Style(align_items="center", gap="0.75rem", margin_top="0.5rem"),
        ),
        style=Style(padding="1.25rem", margin_bottom="1.5rem", background="#ffffff", border="1px solid #e2e8f0", border_radius="0.75rem"),
    )

    # 2. Color Palette Swatches
    color_swatches = []
    for key, hex_val in list(COLORS.items())[:8]:
        color_swatches.append(
            Column(
                Row(
                    style=Style(
                        width="36px",
                        height="36px",
                        background=hex_val,
                        border_radius="0.375rem",
                        border="1px solid #e2e8f0",
                    )
                ),
                Text(key, style=Style(font_size="0.75rem", font_weight="bold", margin_top="0.25rem")),
                Text(hex_val, style=Style(font_size="0.675rem", color="#64748b")),
                style=Style(align_items="center", min_width="80px"),
            )
        )

    palette_card = Card(
        Heading("2. Token Color Palette Swatches", level=3),
        Row(*color_swatches, style=Style(gap="1rem", flex_wrap="wrap", margin_top="0.75rem")),
        style=Style(padding="1.25rem", margin_bottom="1.5rem", background="#ffffff", border="1px solid #e2e8f0", border_radius="0.75rem"),
    )

    # 3. Theme Toggle Card
    theme_card = Card(
        Heading("3. Theme Switcher", level=3),
        Text("Toggle between light and dark design tokens:"),
        Row(
            Button("Switch Theme Mode", on_click=lambda: is_dark.set(not is_dark.value)),
            Badge("Mode: Dark" if is_dark.value else "Mode: Light", variant="primary"),
            style=Style(align_items="center", gap="1rem", margin_top="0.75rem"),
        ),
        style=Style(padding="1.25rem", background="#ffffff", border="1px solid #e2e8f0", border_radius="0.75rem"),
    )

    return Column(
        title,
        desc,
        token_status,
        palette_card,
        theme_card,
        style=Style(padding="2rem", max_width="1000px", margin="0 auto"),
    )
