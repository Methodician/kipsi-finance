import { useState, useEffect } from "react";
import ExpenseList from "./expense-list-view";
import { getExpenseService } from "../../../firebase";
import { Expense } from "../../../models/expense.models";
import { Project } from "../../../models/project.models";

interface Props {
  expenseIds?: string[];
  project: Project;
}

function ExpenseListContainer({ expenseIds, project }: Props) {
  const expenseService = getExpenseService();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    if (!expenseIds) return;

    const { expenses$, cleanup } = expenseService.expensesByIdList$(expenseIds);
    expenses$.subscribe((expenses) => setExpenses(expenses));
    return cleanup;
  }, [expenseIds]);

  return <ExpenseList expenses={expenses} project={project} />;
}

export default ExpenseListContainer;
