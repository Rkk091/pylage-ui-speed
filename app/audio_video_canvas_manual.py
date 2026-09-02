"""Manual demo for PyLage Media & Graphic components (Audio, Video, Canvas, Image, Icon)."""

from pylage import (
    Audio,
    Video,
    Canvas,
    Image,
    Icon,
    Column,
    Row,
    Card,
    Heading,
    Text,
    Button,
    State,
    Style,
)


def get_app() -> Column:
    is_playing_audio = State(False)
    canvas_clicks = State(0)

    title = Heading("🎨 Media & Graphic Components Manual", level=1)
    desc = Text(
        "Demonstrates Audio, Video, HTML5 Canvas, Image rendering, and Icon components in PyLage.",
        style=Style(color="#64748b", margin_bottom="1.5rem"),
    )

    # 1. Image Component
    img_card = Card(
        Heading("1. Image Component", level=3),
        Text("Responsive image with alt text and rounded border styling:"),
        Image(
            src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop&q=80",
            alt="Gradient abstract artwork",
            width="100%",
            height="180px",
            style=Style(border_radius="0.5rem", object_fit="cover", margin_top="0.75rem"),
        ),
        style=Style(padding="1.25rem", margin_bottom="1rem", background="#ffffff", border="1px solid #e2e8f0", border_radius="0.75rem"),
    )

    # 2. Audio & Video Components
    media_card = Card(
        Heading("2. Audio & Video Elements", level=3),
        Text("Native multimedia controls integrated directly into the reactive tree:"),
        Row(
            Column(
                Heading("Audio Player", level=4),
                Audio(
                    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                    controls=True,
                    style=Style(width="100%", margin_top="0.5rem"),
                ),
                style=Style(flex="1"),
            ),
            Column(
                Heading("Video Player", level=4),
                Video(
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                    controls=True,
                    width="100%",
                    height="160px",
                    style=Style(border_radius="0.5rem", margin_top="0.5rem"),
                ),
                style=Style(flex="1"),
            ),
            style=Style(gap="1.5rem", margin_top="0.75rem"),
        ),
        style=Style(padding="1.25rem", margin_bottom="1rem", background="#ffffff", border="1px solid #e2e8f0", border_radius="0.75rem"),
    )

    # 3. Canvas & Icon
    def handle_canvas_click():
        canvas_clicks.set(canvas_clicks.value + 1)

    canvas_card = Card(
        Heading("3. Canvas & Icon Visuals", level=3),
        Text("Interactive Canvas element with reactive click tracking:"),
        Row(
            Icon(name="activity", size="24", color="#3b82f6"),
            Text("Canvas Click Count: "),
            Text(canvas_clicks, style=Style(font_weight="bold", color="#3b82f6")),
            style=Style(align_items="center", gap="0.5rem", margin_bottom="0.75rem"),
        ),
        Canvas(
            width="400",
            height="100",
            on_click=handle_canvas_click,
            style=Style(
                background="#f8fafc",
                border="2px dashed #cbd5e1",
                border_radius="0.5rem",
                width="100%",
                cursor="pointer",
            ),
        ),
        Text("Click the canvas area above to trigger reactive state updates.", style=Style(font_size="0.875rem", color="#94a3b8", margin_top="0.5rem")),
        style=Style(padding="1.25rem", margin_bottom="1rem", background="#ffffff", border="1px solid #e2e8f0", border_radius="0.75rem"),
    )

    return Column(
        title,
        desc,
        img_card,
        media_card,
        canvas_card,
        style=Style(padding="2rem", max_width="900px", margin="0 auto"),
    )
