export interface TaskInterface<T extends any[] = any[], R = void> {
  run: (...args: T) => R;
}
