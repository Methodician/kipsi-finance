import firebase from "firebase/app";
import "firebase/firestore";
import { catchError, takeUntil } from "rxjs/operators";
import { Subject, combineLatest } from "rxjs";
import {
  DbExpense,
  Expense,
  ExpenseCreate,
  ExpenseUpdate,
} from "../models/expense.models";

export class ExpenseService {
  private static instance: ExpenseService;
  private db: firebase.firestore.Firestore;

  constructor(db: firebase.firestore.Firestore) {
    this.db = db;
  }

  public static getInstance(db: firebase.firestore.Firestore): ExpenseService {
    if (!ExpenseService.instance) {
      ExpenseService.instance = new ExpenseService(db);
    }
    return ExpenseService.instance;
  }

  createExpense = (expense: ExpenseCreate) => {
    const id = this.db.collection("expenses").doc().id;
    const newExpense = {
      ...expense,
      id,
    };
    return this.db
      .collection("expenses")
      .doc(id)
      .set(newExpense)
      .then(() => {
        // Ideally we would do this in a transaction
        this.db.doc(`projects/${expense.projectId}`).update({
          expenseIds: firebase.firestore.FieldValue.arrayUnion(id),
        });
      });
  };

  // Not currently used but we would likely want this later...
  updateExpense = (expense: ExpenseUpdate) => {
    return this.db.doc(`expenses/${expense.id}`).update(expense);
  };

  // Must be careful to remove the expense from the project's expenseIds
  // array. Ideally we would do this in a transaction.
  deleteExpense = (expenseId: string) => {
    return this.db.doc(`expenses/${expenseId}`).delete();
  };

  expenseById$ = (id: string) => {
    const _expense$ = new Subject<Expense>();
    const _finish$ = new Subject<void>();

    this.db
      .collection("expenses")
      .doc(id)
      .onSnapshot((doc) => {
        const dbExpense = doc.data() as DbExpense | undefined;
        if (dbExpense) {
          _expense$.next({
            ...dbExpense,
            date: dbExpense.date.toDate(),
          } as Expense);
        }
      });

    const cleanup = () => {
      _finish$.next();
      _finish$.complete();
    };

    const expense$ = _expense$.pipe(
      takeUntil(_finish$),
      catchError((err, caught) => {
        console.error(err);
        return caught;
      })
    );

    return { expense$, cleanup };
  };

  expensesByIdList$ = (idList: string[]) => {
    const _finish$ = new Subject<void>();

    const expenses$ = combineLatest(
      idList.map((id) => this.expenseById$(id)).map((x) => x.expense$)
    ).pipe(
      takeUntil(_finish$),
      catchError((err, caught) => {
        console.error(err);
        return caught;
      })
    );

    const cleanup = () => {
      _finish$.next();
      _finish$.complete();
    };

    return { expenses$, cleanup };
  };

  // Not actually used. Candidate for removal.
  allExpenses$ = () => {
    const _expenses$ = new Subject<Expense[]>();
    const _finish$ = new Subject<void>();

    this.db.collection("expenses").onSnapshot((snapshot) => {
      const expenses = snapshot.docs
        .map((doc) => doc.data() as DbExpense)
        .map(
          (dbExpense) =>
            ({
              ...dbExpense,
              date: dbExpense.date.toDate(),
            } as Expense)
        );
      _expenses$.next(expenses);
    });

    const cleanup = () => {
      _finish$.next();
      _finish$.complete();
    };

    const expenses$ = _expenses$.pipe(
      takeUntil(_finish$),
      catchError((err, caught) => {
        console.error(err);
        return caught;
      })
    );

    return { expenses$, cleanup };
  };
}
