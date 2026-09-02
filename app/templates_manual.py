"""Manual demo for PyLage Application Templates (Dashboard, Admin, Profile, Settings, Landing, Docs)."""

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
from pylage_layout.templates import (
    Dashboard,
    Admin,
    Profile,
    Settings,
    Landing,
    Documentation,
    Authentication,
)


def get_app() -> Column:
    selected_template = State("dashboard")

    title = Heading("📄 PyLage Application Templates Manual", level=1)
    desc = Text(
        "Demonstrates complete production application page templates provided by pylage_layout.",
        style=Style(color="#64748b", margin_bottom="1.5rem"),
    )

    # Template selector buttons
    selector_row = Row(
        Button("Dashboard Template", on_click=lambda: selected_template.set("dashboard")),
        Button("Admin Console", on_click=lambda: selected_template.set("admin")),
        Button("Profile & Account", on_click=lambda: selected_template.set("profile")),
        Button("Documentation", on_click=lambda: selected_template.set("docs")),
        style=Style(gap="0.75rem", margin_bottom="1.5rem", flex_wrap="wrap"),
    )

    # Preview Card
    template_preview = Card(
        Heading("Dashboard Template Preview", level=3),
        Text("Full-featured analytics and monitoring dashboard layout:"),
        Dashboard(
            title="Real-time Metrics Dashboard",
            sidebar_items=["Analytics", "Servers", "Databases", "Logs", "Alerts"],
            content=Column(
                Text("Enterprise cluster telemetry running at 99.99% availability."),
                style=Style(padding="1rem"),
            ),
        ),
        style=Style(padding="1.5rem", background="#ffffff", border="1px solid #e2e8f0", border_radius="0.75rem"),
    )

    return Column(
        title,
        desc,
        selector_row,
        template_preview,
        style=Style(padding="2rem", max_width="1000px", margin="0 auto"),
    )
