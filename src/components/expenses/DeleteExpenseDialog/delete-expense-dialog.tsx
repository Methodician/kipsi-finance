import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { useState } from "react";
import { getExpenseService, getProjectService } from "../../../firebase";
import { Delete } from "@material-ui/icons";
import { Expense } from "../../../models/expense.models";
import { Project } from "../../../models/project.models";

interface Props {
  expense: Expense;
  project: Project;
}

const DeleteExpenseDialog = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { deleteExpense } = getExpenseService();
  const { updateProject } = getProjectService();

  const onConfirmClick = () => {
    // Should do this transactional and probably in a service
    const { project } = props;
    const expenseIds = project.expenseIds.filter(
      (id) => id !== props.expense.id
    );
    updateProject({ id: project.id, expenseIds });
    deleteExpense(props.expense.id);
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Delete Expense</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the expense{" "}
          <i>"{props.expense.description}"</i>?
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirmClick}>Confirm</Button>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <IconButton onClick={() => setIsOpen(true)}>
        <Delete />
      </IconButton>
    </>
  );
};

export default DeleteExpenseDialog;
