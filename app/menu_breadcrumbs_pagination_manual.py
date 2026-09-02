"""Manual demo for PyLage Navigation & Wayfinding components (Menu, Breadcrumbs, Pagination, Navigation)."""

from pylage import (
    Menu,
    Breadcrumbs,
    Pagination,
    Navigation,
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


def get_app() -> Column:
    current_page = State(1)
    active_nav_tab = State("Overview")

    title = Heading("🧭 Navigation & Wayfinding Manual", level=1)
    desc = Text(
        "Demonstrates Navigation, Breadcrumbs, Pagination, and Menu components in PyLage.",
        style=Style(color="#64748b", margin_bottom="1.5rem"),
    )

    # 1. Breadcrumbs Component
    crumbs_card = Card(
        Heading("1. Breadcrumb Trail", level=3),
        Text("Hierarchical path navigation with active current item:"),
        Breadcrumbs(
            items=["Home", "Workspaces", "Production Cluster", "App Settings"],
            style=Style(margin_top="0.75rem", font_size="0.875rem", color="#475569"),
        ),
        style=Style(padding="1.25rem", margin_bottom="1rem", background="#ffffff", border="1px solid #e2e8f0", border_radius="0.75rem"),
    )

    # 2. Navigation & Menu
    nav_card = Card(
        Heading("2. Top Navigation Bar & Action Menu", level=3),
        Navigation(
            Row(
                Heading("⚡ PyLage Cloud", level=4, style=Style(margin=0, color="#1e293b")),
                Row(
                    Button("Dashboard", on_click=lambda: active_nav_tab.set("Dashboard")),
                    Button("Analytics", on_click=lambda: active_nav_tab.set("Analytics")),
                    Button("Settings", on_click=lambda: active_nav_tab.set("Settings")),
                    style=Style(gap="0.5rem"),
                ),
                style=Style(display="flex", justify_content="space-between", align_items="center", width="100%"),
            ),
            style=Style(
                background="#f8fafc",
                padding="0.75rem 1rem",
                border="1px solid #e2e8f0",
                border_radius="0.5rem",
                margin_top="0.75rem",
            ),
        ),
        Row(
            Text("Active Selected View: "),
            Badge(active_nav_tab, variant="primary"),
            style=Style(align_items="center", gap="0.5rem", margin_top="0.75rem"),
        ),
        style=Style(padding="1.25rem", margin_bottom="1rem", background="#ffffff", border="1px solid #e2e8f0", border_radius="0.75rem"),
    )

    # 3. Pagination Component
    def handle_page_change(e):
        page = int(e.get("page", 1))
        current_page.set(page)

    page_card = Card(
        Heading("3. Reactive Pagination", level=3),
        Row(
            Text("Current Active Page: "),
            Badge(current_page, variant="secondary"),
            style=Style(align_items="center", gap="0.5rem", margin_bottom="0.75rem"),
        ),
        Pagination(
            total_pages=10,
            current_page=current_page,
            on_page_change=handle_page_change,
            style=Style(margin_top="0.5rem"),
        ),
        style=Style(padding="1.25rem", margin_bottom="1rem", background="#ffffff", border="1px solid #e2e8f0", border_radius="0.75rem"),
    )

    return Column(
        title,
        desc,
        crumbs_card,
        nav_card,
        page_card,
        style=Style(padding="2rem", max_width="900px", margin="0 auto"),
    )
