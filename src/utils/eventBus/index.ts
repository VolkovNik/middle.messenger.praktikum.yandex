type EventBusCallbackType = (...args: Array<any>) => void;

export class EventBus {
  private readonly listeners: Record<string, Array<EventBusCallbackType>>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: EventBusCallbackType) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: EventBusCallbackType) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event: string, ...args: Array<unknown>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
