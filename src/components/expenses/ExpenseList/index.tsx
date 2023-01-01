import { Project } from "../../../models/project.models";
import AddExpenseDialog from "../AddExpenseDialog/add-expense-dialog";
import Container from "./expense-list-container";

interface Props {
  project: Project;
  expenseIds: string[];
}
function ExpenseList({ project, expenseIds }: Props) {
  return (
    <>
      <AddExpenseDialog projectId={project.id} />
      <Container expenseIds={expenseIds} project={project} />
    </>
  );
}

export default ExpenseList;
