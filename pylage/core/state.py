from __future__ import annotations

from typing import Any, Callable


Subscriber = Callable[[Any, Any], None]


class CircularStateDependencyError(RuntimeError):
    """Raised when a State.set() call re-enters the same State mid-notification."""


class State:
    """Reactive state value used by the pylage runtime."""

    def __init__(self, value: Any = None):
        self._value = value
        self._subscribers: list[Subscriber] = []
        self._notifying = False

    @property
    def value(self) -> Any:
        return self._value

    def set(self, value: Any) -> None:
        old_value = self._value

        try:
            unchanged = bool(old_value == value)
        except (ValueError, TypeError):
            # Fallback for types whose equality is ambiguous (e.g., NumPy arrays)
            unchanged = old_value is value

        if unchanged:
            return

        if self._notifying:
            raise CircularStateDependencyError(
                "State.set() was called re-entrantly on the same State "
                "instance while it was still notifying subscribers. "
                "This indicates a circular dependency between States — "
                "break the cycle instead of chaining .set() calls in subscribers."
            )

        self._value = value
        self._notifying = True
        try:
            for subscriber in tuple(self._subscribers):
                subscriber(old_value, value)
        finally:
            self._notifying = False

    def subscribe(self, callback: Subscriber) -> Callable[[], None]:
        if not callable(callback):
            raise TypeError("subscriber must be callable")

        self._subscribers.append(callback)

        def unsubscribe() -> None:
            if callback in self._subscribers:
                self._subscribers.remove(callback)

        return unsubscribe

    def __repr__(self) -> str:
        return f"State({self._value!r})"

