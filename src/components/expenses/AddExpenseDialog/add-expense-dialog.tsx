import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { getExpenseService } from "../../../firebase";
import { Expense, ExpenseCreate } from "../../../models/expense.models";
import ExpenseForm from "../ExpenseForm/expense-form";

interface Props {
  projectId: string;
}

const EXPENSE_STUB: ExpenseCreate = {
  date: new Date(),
  amount: 0,
  isQualified: false,
  description: "",
  projectId: "", // must always be set before use
};

const AddExpenseDialog = ({ projectId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expense, setExpense] = useState<ExpenseCreate>({
    ...EXPENSE_STUB,
    projectId,
  });

  useEffect(() => {
    setExpense({ ...expense, projectId });
  }, [projectId]);

  const { createExpense } = getExpenseService();

  const handleChange = (change: { name: keyof Expense; value: any }) =>
    setExpense({ ...expense, [change.name]: change.value });

  const handleSubmit = () => {
    createExpense(expense);
    setExpense({ ...EXPENSE_STUB, projectId });
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Create Expense</DialogTitle>
        <DialogContent>
          <ExpenseForm
            expense={expense}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Create</Button>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Button onClick={() => setIsOpen(true)}>Add Expense</Button>
    </>
  );
};

export default AddExpenseDialog;
