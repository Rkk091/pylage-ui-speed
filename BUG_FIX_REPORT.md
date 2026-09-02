# PyLage UI Engine — Bug Tracking & Fix Log (`BUG_FIX_REPORT.md`)

This report tracks all bugs audited and resolved in the PyLage reactive UI transpiler, WebSocket state engine, component registry, and layout subsystem (`pylage` and `pylage_layout`).

Every issue follows the strict verification lifecycle:
1. **Bug Identification & Root Cause Analysis**
2. **Automated Unit & Regression Tests** in `test/`
3. **Engine Fix** (preserving all existing public API and performance contracts)
4. **Live Manual Testing Script** in `app/`
5. **Verification**: 100% test suite pass (130 unit/integration tests)

---

## 📋 Bug Resolution Index

| Bug ID | Component / Module | Severity | Title | Test File | Manual Script | Status |
|--------|-------------------|----------|-------|-----------|---------------|--------|
| **BUG-01** | `pylage/components/basic.py` (`Accordion`) | Medium | Accordion value binding and reactive section contract | `test/test_accordion_component.py` | `app/accordion_manual.py` | **FIXED** |
| **BUG-02** | `pylage/components/basic.py` (`Carousel`) | Medium | Carousel value / slide index reactive binding | `test/test_carousel_component.py` | `app/carousel_manual.py` | **FIXED** |
| **BUG-03** | `pylage/core/registry.py` (`Dialog`) | Medium | Dialog boolean `open` attribute rendering without `open="False"` string artifact | `test/test_dialog_component.py` | `app/dialog_manual.py` | **FIXED** |
| **BUG-04** | `pylage/core/registry.py` (`Drawer`) | Medium | Drawer boolean `open` attribute rendering and reactive state binding | `test/test_drawer_component.py` | `app/drawer_manual.py` | **FIXED** |
| **BUG-05** | `pylage/core/registry.py` (`Tabs`) | Low | Tabs active value synchronization and reactive state binding | `test/test_tabs_component.py` | `app/tabs_manual.py` | **FIXED** |
| **BUG-06** | `pylage/components/basic.py` (`DatePicker`) | Low | DatePicker value ISO binding and min/max attribute support | `test/test_datepicker_component.py` | `app/datepicker_manual.py` | **FIXED** |
| **BUG-07** | `pylage/core/registry.py` (`Popover`, `Tooltip`, `Menu`) | Low | Popover and Tooltip prop definitions and children rendering | `test/test_popover_component.py`, `test/test_tooltip_component.py` | `app/popover_tooltip_manual.py` | **FIXED** |
| **BUG-08** | `pylage/core/registry.py` (`Pagination`) | Low | Pagination navigation container and action buttons | `test/test_pagination_component.py` | `app/pagination_manual.py` | **FIXED** |
| **BUG-09** | `pylage/core/events.py`, `pylage/core/binding.py`, `pylage/runtime/websocket.py` | Critical | Dynamic Subtree Indexing & JSON-safe State unwrapping after WebSocketServer start | `test/test_tree_dynamic_binding.py` | `app/accordion_manual.py`, `app/nav_interaction_manual.py` | **FIXED** |
| **BUG-10** | `pylage_layout/layouts/*`, `pylage_layout/tokens/*` | High | Missing layout primitives and design tokens causing import errors in `pylage_layout` | `test/test_01_tokens_audit.py`, `test/test_02_layouts_audit.py`, `test/test_03_layouts_audit.py`, `test/test_08_public_api_audit.py` | `app/layout_primitives_manual.py`, `app/themes_tokens_manual.py` | **FIXED** |
| **BUG-11** | `pylage/core/component.py` (`component()`) | High | Keyword collision when `type` passed in component props (`TypeError: component() got multiple values for argument 'type'`) | `test/test_component_protocol.py` | `app/table_manual.py`, `app/data_feedback_manual.py` | **FIXED** |
| **BUG-12** | `pylage/styling/style.py` (`Style`) | Medium | Missing standard CSS properties (`object_fit`, `object_position`, `cursor`, `overflow_x`, `overflow_y`, `aspect_ratio`, `user_select`) in `Style` dataclass | `test/test_style.py` | `app/audio_video_canvas_manual.py` | **FIXED** |
| **BUG-13** | `pylage_layout/layouts/drawer.py` | Medium | Missing `NavigationDrawer` & `MobileSidebar` responsive factory exports | `test/test_7E_Navigation Responsiveness.py` | `app/drawer_manual.py` | **FIXED** |
| **BUG-14** | `pylage/core/component.py` (`Component.__eq__`) | High | Reference equality vs deep attribute comparison in dynamic tree mutations (`remove`/`replace`) | `test/test_tree_remove_runtime.py`, `test/test_tree_replace_runtime.py` | `app/table_manual.py` | **FIXED** |
| **BUG-15** | `app/` | Feature | Missing interactive demo manuals for `pylage` components and `pylage_layout` templates/patterns | All integration test suites | `app/manual_overview.py` + 33 dedicated manual files | **COMPLETED** |

---

## 🛠️ Detailed Bug Fix Summaries

### BUG-09: Dynamic Subtree Indexing & Reactive Binding in WebSocket Runtime
- **Issue**: Components added dynamically to the tree via `root.add(...)` or `root.replace(...)` after `WebSocketServer` initialization were not indexed by `EventDispatcher` and not bound by `StateBinding`. Additionally, serializing components containing `State` objects in `TreeAddMessage` raised `TypeError: Object of type State is not JSON serializable`.
- **Root Cause**: `EventDispatcher` and `StateBinding` only indexed nodes during their `__init__`.
- **Fix**:
  1. Added `index(node)` and `deindex(node)` to `EventDispatcher` (`pylage/core/events.py`).
  2. Added `bind(node)` to `StateBinding` (`pylage/core/binding.py`).
  3. Integrated automatic dynamic indexing, binding, and `_json_safe` prop resolution into `WebSocketServer._on_tree_mutation` for `add`, `replace`, `set_children`, `remove`, and `clear` mutations.
- **Tests Added**: `test/test_tree_dynamic_binding.py` (`test_dynamic_component_added_after_server_init_has_event_dispatch`, `test_dynamic_component_added_after_server_init_receives_state_binding`).

### BUG-10: Layout Primitives and Design Tokens in `pylage_layout`
- **Issue**: `pylage_layout` had circular imports and missing `layouts` and `tokens` packages, causing `test_01_tokens_audit.py`, `test_02_layouts_audit.py`, `test_03_layouts_audit.py`, and `test_08_public_api_audit.py` to fail.
- **Root Cause**: Missing subpackages `pylage_layout/layouts/` and `pylage_layout/tokens/`.
- **Fix**:
  1. Implemented `pylage_layout/tokens/` with `COLORS`, `FONTS`, `RADIUS`, `SPACING`, and `validate_tokens()`.
  2. Implemented `pylage_layout/layouts/` with `AppShell`, `Center`, `Container`, `Footer`, `Header`, `Navigation`, `Pagination`, `Menu`, `Section`, `SidebarLayout`, `Split`, `Stack`, `TwoColumn`, `ThreeColumn`, `Navbar`, `Topbar`, `NavigationControls`, `NavigationDrawer`, `MobileSidebar`.
- **Verification**: `01_tokens_audit: ALL PASSED`, `02_layouts_audit: ALL PASSED`, `03_layouts_audit: ALL PASSED`, `08_public_api_audit: ALL PASSED`.

### BUG-11: Component Helper Positional Parameter Collision with `type` Prop
- **Issue**: Calling `component("Alert", type="warning")` or `Alert(type="info")` raised `TypeError: component() got multiple values for argument 'type'`.
- **Root Cause**: The first positional argument in `def component(type: str, *children, **props)` was named `type`, colliding with any prop dictionary containing a `type` key (e.g. Alert type, Button type, Input type).
- **Fix**: Changed the parameter signature to `def component(type_: str, *children: Child, **props: Any) -> Component:`.
- **Verification**: All Alert, Button, and Input manuals initialize cleanly without keyword collisions.

### BUG-12: Missing CSS Properties in `Style` Dataclass
- **Issue**: Specifying standard styling properties like `object_fit`, `object_position`, `cursor`, `overflow_x`, `overflow_y`, `aspect_ratio`, `user_select`, and `text_overflow` raised `TypeError: Style.__init__() got an unexpected keyword argument`.
- **Fix**: Expanded the `Style` dataclass in `pylage/styling/style.py` to support all standard layout and rendering properties.
- **Verification**: Verified in `test_style.py` and `app/audio_video_canvas_manual.py`.

### BUG-13: Missing `NavigationDrawer` & `MobileSidebar` in `pylage_layout.layouts.drawer`
- **Issue**: `test_7E_Navigation Responsiveness.py` failed with `ImportError: cannot import name 'NavigationDrawer' from 'pylage_layout.layouts.drawer'`.
- **Fix**: Added `NavigationDrawer`, `MobileSidebar`, and `Drawer` factory functions in `pylage_layout/layouts/drawer.py` supporting `ResponsiveStyle`.
- **Verification**: `7E FINAL RESULT: PASS` (100% assertion pass).

### BUG-03 & BUG-04: Dialog & Drawer Boolean `open` Prop Registry Contract
- **Issue**: Setting `open=False` on `Dialog` or `Drawer` rendered `<dialog open="False">` because `open` was registered as a standard attribute instead of a boolean attribute.
- **Root Cause**: `Dialog` and `Drawer` entries in `pylage/core/registry.py` were missing `"open": PropDefinition("open", kind="boolean", html_name="open")`.
- **Fix**: Added `open` boolean prop definitions to `Dialog` and `Drawer` in `pylage/core/registry.py`.
- **Tests Added**: `test/test_dialog_component.py` and `test/test_drawer_component.py`.

### BUG-01, BUG-02 & BUG-05: Accordion, Carousel & Tabs Reactive Value Prop Contract
- **Issue**: `Accordion`, `Carousel`, and `Tabs` lacked registered `value` props for binding active sections/slides/tabs dynamically.
- **Fix**: Added `"value": PropDefinition("value", kind="attribute", html_name="value")` in `pylage/components/basic.py` and `pylage/core/registry.py`.
- **Tests Added**: `test_accordion_supports_value_and_reactivity`, `test_carousel_supports_value_and_reactivity`, `test_tabs_supports_value_and_reactivity`.

---

## 🚀 Component & Layout Manual Coverage

The `app/` suite now contains 33 comprehensive manual scripts and an interactive aggregator (`app/manual_overview.py`):
- **Core Primitives & Inputs**: `button_manual.py`, `modern_button_manual.py`, `input_manual.py`, `slider_radio_checkbox_manual.py`, `switch_manual.py`, `select_manual.py`, `datepicker_manual.py`, `form_manual.py`
- **Structure & Layout**: `column_manual.py`, `row_manual.py`, `grid_manual.py`, `card_manual.py`, `heading_manual.py`, `text_manual.py`, `avatar_badge_divider_manual.py`, `layout_primitives_manual.py`
- **Data & Feedback**: `table_manual.py`, `data_feedback_manual.py`, `accordion_manual.py`, `carousel_manual.py`, `tabs_manual.py`, `dialog_manual.py`, `drawer_manual.py`, `popover_tooltip_manual.py`
- **Navigation & Media**: `menu_breadcrumbs_pagination_manual.py`, `nav_interaction_manual.py`, `media_manual.py`, `audio_video_canvas_manual.py`
- **Layouts & Templates**: `patterns_manual.py`, `templates_manual.py`, `themes_tokens_manual.py`, `manual_overview.py`
