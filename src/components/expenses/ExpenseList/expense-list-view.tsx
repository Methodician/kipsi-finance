import * as React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { Expense } from "../../../models/expense.models";
import DeleteExpenseDialog from "../DeleteExpenseDialog/delete-expense-dialog";
import { Project } from "../../../models/project.models";

interface Props {
  expenses: Expense[];
  project: Project;
}

const ExpenseListView: React.FC<Props> = ({ expenses, project }) => {
  return (
    <List>
      {expenses.map((expense) => (
        <ListItem key={expense.id}>
          <ListItemText
            primary={expense.description}
            secondary={`${
              expense.isQualified ? "Qualified" : "Unqualified"
            } | ${expense.amount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })} | ${expense.date.toLocaleDateString()}`}
          />
          <ListItemSecondaryAction>
            <DeleteExpenseDialog expense={expense} project={project} />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default ExpenseListView;
