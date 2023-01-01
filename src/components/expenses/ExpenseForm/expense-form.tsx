import * as React from "react";
import { TextField, Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { Expense, ExpenseCreate } from "../../../models/expense.models";

interface Props {
  onChange: (change: { name: keyof Expense; value: any }) => void;
  onSubmit: () => void;
  expense: ExpenseCreate | Expense;
}

function ExpenseForm(props: Props) {
  const {
    onChange,
    onSubmit,
    expense: { date, amount, isQualified, description },
  } = props;

  const emitChange = (name: keyof Expense, value: any) => {
    onChange({ name, value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <Grid container direction="column">
      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <DatePicker
            label="Date"
            name="date"
            value={date}
            onChange={(date) =>
              emitChange("date", date?.toJSDate() || new Date())
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Amount"
            name="amount"
            type="number"
            value={amount}
            onChange={($e) => emitChange("amount", Number($e.target.value))}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={description}
            onChange={($e) => emitChange("description", $e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isQualified}
                onChange={($e) => emitChange("isQualified", $e.target.checked)}
                name="isQualified"
              />
            }
            label="Qualified?"
          />
        </Grid>
      </form>
    </Grid>
  );
}

export default ExpenseForm;
