import firebase from "firebase/app";
import "firebase/firestore";
import { filter, map } from "rxjs/operators";
import { Observable, from } from "rxjs";

export interface Expense {
  id: string;
  amount: number;
  isQualified: boolean;
  timestamp: Date;
}

export class ExpenseService {
  private db: firebase.firestore.Firestore;

  constructor(db: firebase.firestore.Firestore) {
    this.db = db;
  }

  createExpense(expense: Expense, projectId: string) {
    return this.db
      .collection("expenses")
      .add(expense)
      .then((doc) => {
        const expenseId = doc.id;
        this.db.doc(`projects/${projectId}`).update({
          expenseIds: firebase.firestore.FieldValue.arrayUnion(expenseId),
        });
      });
  }

  updateExpense(expense: Expense): Promise<void> {
    return this.db.doc(`expenses/${expense.id}`).update(expense);
  }

  getExpenseById(id: string): Observable<Expense> {
    return from(this.db.doc(`expenses/${id}`).get()).pipe(
      map((doc) => doc.data() as Expense),
      filter((expense) => !!expense)
    );
  }

  getExpenses(): Observable<Expense[]> {
    return from(this.db.collection("expenses").get()).pipe(
      map((snapshot) => snapshot.docs.map((doc) => doc.data() as Expense))
    );
  }
}
