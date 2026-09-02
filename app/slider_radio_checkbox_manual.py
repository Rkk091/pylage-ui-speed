"""Manual demo for PyLage Input Controls (Slider, RadioGroup, Checkbox, Switch, DatePicker)."""

from pylage import (
    Slider,
    RadioGroup,
    Checkbox,
    Switch,
    DatePicker,
    Input,
    Button,
    Column,
    Row,
    Card,
    Heading,
    Text,
    Badge,
    State,
    Style,
)


def get_app() -> Column:
    slider_val = State(45)
    selected_plan = State("pro")
    agree_terms = State(True)
    enable_notifications = State(True)
    selected_date = State("2026-09-01")

    title = Heading("🎛️ Form & Interactive Controls Manual", level=1)
    desc = Text(
        "Demonstrates Slider, RadioGroup, Checkbox, Switch, and DatePicker interactive two-way bindings.",
        style=Style(color="#64748b", margin_bottom="1.5rem"),
    )

    # 1. Slider Control
    slider_card = Card(
        Heading("1. Slider & Range Input", level=3),
        Row(
            Text("Volume / Threshold: "),
            Badge(slider_val, variant="primary"),
            style=Style(align_items="center", gap="0.75rem", margin_bottom="0.5rem"),
        ),
        Slider(
            min=0,
            max=100,
            step=1,
            value=slider_val,
            on_change=lambda e: slider_val.set(int(e.get("value", 0))),
            style=Style(width="100%"),
        ),
        style=Style(padding="1.25rem", margin_bottom="1rem", background="#ffffff", border="1px solid #e2e8f0", border_radius="0.75rem"),
    )

    # 2. RadioGroup & Checkbox
    options_card = Card(
        Heading("2. RadioGroup & Checkbox Controls", level=3),
        Text("Select Subscription Tier:"),
        RadioGroup(
            name="plan",
            options=["starter", "pro", "enterprise"],
            value=selected_plan,
            on_change=lambda e: selected_plan.set(e.get("value", "pro")),
            style=Style(margin_top="0.5rem", margin_bottom="1rem"),
        ),
        Row(
            Checkbox(
                checked=agree_terms,
                on_change=lambda e: agree_terms.set(e.get("checked", False)),
            ),
            Text("I agree to the Terms of Service & Privacy Policy"),
            style=Style(align_items="center", gap="0.5rem", margin_bottom="0.5rem"),
        ),
        Row(
            Switch(
                checked=enable_notifications,
                on_change=lambda e: enable_notifications.set(e.get("checked", False)),
            ),
            Text("Enable Real-Time Push Notifications"),
            style=Style(align_items="center", gap="0.5rem"),
        ),
        style=Style(padding="1.25rem", margin_bottom="1rem", background="#ffffff", border="1px solid #e2e8f0", border_radius="0.75rem"),
    )

    # 3. DatePicker Control
    date_card = Card(
        Heading("3. DatePicker Calendar Control", level=3),
        Row(
            Text("Selected Deployment Date: "),
            Badge(selected_date, variant="secondary"),
            style=Style(align_items="center", gap="0.75rem", margin_bottom="0.75rem"),
        ),
        DatePicker(
            value=selected_date,
            on_change=lambda e: selected_date.set(e.get("value", "")),
            style=Style(padding="0.5rem", border="1px solid #cbd5e1", border_radius="0.375rem"),
        ),
        style=Style(padding="1.25rem", margin_bottom="1rem", background="#ffffff", border="1px solid #e2e8f0", border_radius="0.75rem"),
    )

    return Column(
        title,
        desc,
        slider_card,
        options_card,
        date_card,
        style=Style(padding="2rem", max_width="900px", margin="0 auto"),
    )
