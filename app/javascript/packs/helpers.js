export function dispatchEvent(element, type, eventInit = {}) {
  const { disabled } = element;
  const { bubbles, cancelable, detail } = eventInit;
  const event = document.createEvent("Event");

  event.initEvent(type, bubbles || true, cancelable || true);
  event.detail = detail || {};

  try {
    element.disabled = false;
    element.dispatchEvent(event);
  } finally {
    element.disabled = disabled;
  }

  return event;
}