"""Manual demo for PyLage Layout Primitives (AppShell, Center, Stack, Split, TwoColumn, ThreeColumn, SidebarLayout)."""

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
from pylage_layout.layouts import (
    AppShell,
    Center,
    Container,
    Section,
    Stack,
    Split,
    TwoColumn,
    ThreeColumn,
    SidebarLayout,
    Navbar,
    Footer,
)


def get_app() -> Column:
    title = Heading("🏗️ Layout Primitives Manual", level=1)
    desc = Text(
        "Demonstrates foundational layout primitives and responsive structural containers.",
        style=Style(color="#64748b", margin_bottom="1.5rem"),
    )

    # 1. AppShell Layout
    shell_demo = Card(
        Heading("1. AppShell Layout Structure", level=3),
        Text("Composed Header, Sidebar, and Content with responsive flow:"),
        AppShell(
            header=Navbar(Heading("App Header", level=4), Button("Logout")),
            sidebar=Column(Text("📁 Nav Item 1"), Text("⚙️ Nav Item 2"), style=Style(width="200px", padding="1rem", background="#f1f5f9")),
            content=Column(Heading("Main View Content", level=3), Text("Fluid responsive content zone."), style=Style(padding="1rem")),
            footer=Footer(Text("© 2026 PyLage Layout Primitives. All rights reserved.")),
            style=Style(border="1px solid #cbd5e1", border_radius="0.5rem", overflow="hidden", margin_top="0.75rem"),
        ),
        style=Style(padding="1.25rem", margin_bottom="1.5rem", background="#ffffff", border="1px solid #e2e8f0", border_radius="0.75rem"),
    )

    # 2. Split, TwoColumn, and ThreeColumn
    multi_col_demo = Card(
        Heading("2. Multi-Column Grid Primitives", level=3),
        Text("TwoColumn and ThreeColumn responsive containers:"),
        TwoColumn(
            Card(Heading("Left Column", level=4), Text("50% split on desktop, stacked on mobile.")),
            Card(Heading("Right Column", level=4), Text("50% split on desktop, stacked on mobile.")),
            style=Style(margin_top="0.75rem", margin_bottom="1rem"),
        ),
        ThreeColumn(
            Card(Heading("Column A", level=4), Text("1/3 width")),
            Card(Heading("Column B", level=4), Text("1/3 width")),
            Card(Heading("Column C", level=4), Text("1/3 width")),
        ),
        style=Style(padding="1.25rem", margin_bottom="1.5rem", background="#ffffff", border="1px solid #e2e8f0", border_radius="0.75rem"),
    )

    # 3. Center Primitive
    center_demo = Card(
        Heading("3. Center Alignment Container", level=3),
        Center(
            Card(
                Heading("Centered Dialog / Modal Box", level=4),
                Text("Horizontally and vertically centered inside the parent container."),
                Button("Confirm Action", style=Style(margin_top="0.5rem")),
                style=Style(padding="1.5rem", text_align="center", background="#f8fafc", border="1px solid #cbd5e1", border_radius="0.5rem"),
            ),
            style=Style(min_height="180px", background="#f1f5f9", border_radius="0.5rem", margin_top="0.75rem"),
        ),
        style=Style(padding="1.25rem", background="#ffffff", border="1px solid #e2e8f0", border_radius="0.75rem"),
    )

    return Column(
        title,
        desc,
        shell_demo,
        multi_col_demo,
        center_demo,
        style=Style(padding="2rem", max_width="1000px", margin="0 auto"),
    )
