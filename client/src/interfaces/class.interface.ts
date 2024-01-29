export interface UserClass {
  _id: string;
  name: string;
  price?: {
    amount: string;
    recurring: Recurring;
  };
  schedule: ClassSchedule[];
}

export interface ClassSchedule {
  _id: string;
  day: string;
  time: string;
}

export type Recurring = 'monthly' | 'individual' | undefined;
