from pathlib import Path

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
    manual_overview,
)

from pylage import run

overview_app = manual_overview.get_app()

if __name__ == "__main__":
    run(
        overview_app,
        title="PyLage Component & Layout Manual",
        output=Path("index.html"),
        serve=True,
        host="127.0.0.1",
        port=8080,
        open_browser=True,
    )

