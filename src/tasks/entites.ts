export interface Task {
  id: number;
  name: string;
  description : string;
  completed: boolean;
  creatAt?: Date,
}
