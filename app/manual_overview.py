"""Master Component & Pattern Manual Aggregator for PyLage and PyLage Layout."""

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
)

from app import (
    button_manual,
    card_manual,
    form_manual,
    grid_manual,
    input_manual,
    heading_manual,
    text_manual,
    row_manual,
    column_manual,
    media_manual,
    switch_manual,
    select_manual,
    modern_button_manual,
    nav_interaction_manual,
    data_feedback_manual,
    table_manual,
    accordion_manual,
    carousel_manual,
    dialog_manual,
    drawer_manual,
    tabs_manual,
    datepicker_manual,
    popover_tooltip_manual,
    pagination_manual,
    avatar_badge_divider_manual,
    audio_video_canvas_manual,
    slider_radio_checkbox_manual,
    menu_breadcrumbs_pagination_manual,
    patterns_manual,
    templates_manual,
    layout_primitives_manual,
    themes_tokens_manual,
)


MANUAL_REGISTRY = {
    "Overview": None,
    "Buttons & Modern Actions": modern_button_manual.get_app,
    "Inputs & Form Fields": input_manual.get_app,
    "Sliders, Radios & Checkboxes": slider_radio_checkbox_manual.get_app,
    "Headings & Typography": heading_manual.get_app,
    "Cards & Surfaces": card_manual.get_app,
    "Layout Columns & Rows": column_manual.get_app,
    "CSS Grid Layouts": grid_manual.get_app,
    "Layout Primitives & AppShell": layout_primitives_manual.get_app,
    "Interactive Forms & Validation": form_manual.get_app,
    "Switches & Toggles": switch_manual.get_app,
    "Select Dropdowns": select_manual.get_app,
    "DatePickers": datepicker_manual.get_app,
    "Tables & Data Grids": table_manual.get_app,
    "Tabs & Segmented Controls": tabs_manual.get_app,
    "Accordions & Collapsibles": accordion_manual.get_app,
    "Carousels & Sliders": carousel_manual.get_app,
    "Dialogs & Modals": dialog_manual.get_app,
    "Drawers & Sidepanels": drawer_manual.get_app,
    "Popovers & Tooltips": popover_tooltip_manual.get_app,
    "Navigation & Menus": menu_breadcrumbs_pagination_manual.get_app,
    "Media, Canvas & Graphics": audio_video_canvas_manual.get_app,
    "Badges, Avatars & Dividers": avatar_badge_divider_manual.get_app,
    "Feedback, Progress & Toast": data_feedback_manual.get_app,
    "Layout Patterns (Hero, FAQ, Stats)": patterns_manual.get_app,
    "Application Templates": templates_manual.get_app,
    "Design Tokens & Themes": themes_tokens_manual.get_app,
}


def get_app() -> Column:
    active_section = State("Overview")

    header = Row(
        Heading("⚡ PyLage UI Engine — Interactive Component Manual", level=2, style=Style(margin=0)),
        Badge("v1.0.0 Stable", variant="success"),
        style=Style(display="flex", justify_content="space-between", align_items="center", margin_bottom="1.5rem"),
    )

    overview_summary = Card(
        Heading("Welcome to the PyLage & PyLage Layout Manual", level=3),
        Text(
            "PyLage is a Python-first reactive UI framework (similar to Streamlit & Reflex) providing full "
            "declarative tree composition, two-way State bindings, WebSocket delta patching, and enterprise design tokens."
        ),
        Row(
            Badge("38 UI Components", variant="primary"),
            Badge("15 Layout Patterns", variant="secondary"),
            Badge("7 Application Templates", variant="info"),
            Badge("100% Test Suite Pass", variant="success"),
            style=Style(gap="0.5rem", margin_top="1rem"),
        ),
        style=Style(padding="1.5rem", background="#ffffff", border="1px solid #e2e8f0", border_radius="0.75rem", margin_bottom="1.5rem"),
    )

    # Component Catalog Grid
    catalog_items = []
    for section_name in MANUAL_REGISTRY.keys():
        if section_name == "Overview":
            continue
        catalog_items.append(
            Button(
                section_name,
                on_click=lambda name=section_name: active_section.set(name),
                style=Style(
                    padding="0.625rem 1rem",
                    text_align="left",
                    background="#f8fafc",
                    border="1px solid #e2e8f0",
                    border_radius="0.5rem",
                    cursor="pointer",
                    font_size="0.875rem",
                ),
            )
        )

    nav_grid = Card(
        Heading("📚 Component & Module Manual Catalog", level=4),
        Row(*catalog_items, style=Style(display="grid", grid_template_columns="repeat(auto-fill, minmax(240px, 1fr))", gap="0.75rem", margin_top="1rem")),
        style=Style(padding="1.5rem", background="#ffffff", border="1px solid #e2e8f0", border_radius="0.75rem"),
    )

    return Column(
        header,
        overview_summary,
        nav_grid,
        style=Style(padding="2rem", max_width="1100px", margin="0 auto"),
    )
