from __future__ import annotations

import threading
from pylage.core.component import Component
from pylage.core.graph import DependencyGraph
from pylage.core.state import State


class DirtyNodes:
    """Tracks components invalidated by reactive state changes."""

    def __init__(self) -> None:
        self._nodes: set[Component] = set()
        self._ordered_nodes: list[Component] = []
        self._lock = threading.Lock()

    def mark(self, component: Component) -> None:
        with self._lock:
            if component in self._nodes:
                return

            self._nodes.add(component)
            self._ordered_nodes.append(component)

    def nodes(self) -> list[Component]:
        """Return dirty components in deterministic insertion order."""
        with self._lock:
            return list(self._ordered_nodes)

    def mark_from_state(
        self,
        state: State,
        graph: DependencyGraph,
    ) -> None:
        for component, _prop_name in graph.get_dependents(state):
            self.mark(component)

    def contains(self, component: Component) -> bool:
        with self._lock:
            return component in self._nodes

    def clear(self) -> None:
        with self._lock:
            self._nodes.clear()
            self._ordered_nodes.clear()

    def __len__(self) -> int:
        with self._lock:
            return len(self._nodes)

