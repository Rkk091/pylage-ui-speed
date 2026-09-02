"""Manual demo for PyLage Layout Patterns (Hero, Features, Pricing, FAQ, Stats, Auth, CTA)."""

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
from pylage_layout.patterns import (
    Hero,
    FeatureSection,
    PricingSection,
    FAQ,
    MetricCard,
    StatsSection,
    Testimonial,
    ContactSection,
    NewsletterSection,
    CTA,
    SearchBar,
    EmptyState,
    Loading,
)


def get_app() -> Column:
    search_query = State("")

    title = Heading("🧩 PyLage Layout Patterns Manual", level=1)
    desc = Text(
        "Demonstrates high-level enterprise UI patterns built with pure Python.",
        style=Style(color="#64748b", margin_bottom="1.5rem"),
    )

    # 1. Hero Pattern
    hero_pattern = Hero(
        title="Modern Python-First Web Applications",
        description="Build reactive, full-stack enterprise web UIs with declarative Python syntax without writing JavaScript.",
        actions=[
            Button("Get Started Free"),
            Button("Explore Docs"),
        ],
    )

    # 2. Stats & Metric Cards
    stats_pattern = StatsSection(
        metrics=[
            {"label": "Active Nodes", "value": "1,420", "change": "+12.4%"},
            {"label": "Requests / Sec", "value": "89.2k", "change": "+8.1%"},
            {"label": "P99 Latency", "value": "4.2ms", "change": "-18.5%"},
        ]
    )

    # 3. Feature Section
    features_pattern = FeatureSection(
        title="Why Choose PyLage?",
        features=[
            {"title": "Zero Build Steps", "description": "Native real-time WebSocket diffing engine delivers instant UI synchronization."},
            {"title": "Type Safe", "description": "Strongly typed component interfaces and ergonomic design tokens out of the box."},
            {"title": "Reactive State", "description": "Seamless two-way bound reactive primitives with graph-based reconciliation."},
        ]
    )

    # 4. Search & Empty State
    search_box = Card(
        Heading("Interactive Search & State Pattern", level=3),
        SearchBar(
            placeholder="Search documentation...",
            on_search=lambda q: search_query.set(q),
        ),
        EmptyState(
            title="No Results Found",
            description="Try adjusting your search criteria or explore our popular template sections.",
        ),
        style=Style(padding="1.25rem", margin_top="1.5rem", background="#ffffff", border="1px solid #e2e8f0", border_radius="0.75rem"),
    )

    # 5. Call To Action (CTA)
    cta_pattern = CTA(
        title="Ready to transform your Python workflow?",
        description="Deploy your first reactive PyLage application in under five minutes.",
        action=Button("Deploy to Cloud"),
    )

    return Column(
        title,
        desc,
        hero_pattern,
        stats_pattern,
        features_pattern,
        search_box,
        cta_pattern,
        style=Style(padding="2rem", max_width="1000px", margin="0 auto", gap="2rem"),
    )
