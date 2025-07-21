export interface CounterReset {
  createDate: string;
}

export interface Counter {
  id: string;
  title: string;
  color?: string;
  resets: CounterReset[];
  createDate: string;
}
