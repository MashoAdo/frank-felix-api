export interface TaskInterface<T extends any[] = any[], R = void> {
  run: (...args: T) => R;
}

export interface SignInInterface {
  phone_number: number;
  password: string;
}
