export interface Expense {
  id: string;
  date: Date;
  amount: number;
  isQualified: boolean;
  description: string;
  projectId: string;
}

export interface DbExpense {
  id: string;
  date: firebase.firestore.Timestamp;
  amount: number;
  isQualified: boolean;
  description: string;
  projectId: string;
}

export interface ExpenseCreate {
  date: Date;
  amount: number;
  isQualified: boolean;
  description: string;
  projectId: string;
}

export interface ExpenseUpdate {
  id: string;
  date?: Date;
  amount?: number;
  isQualified?: boolean;
  description?: string;
  projectId?: string;
}
