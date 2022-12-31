import { Grid, TextField } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { Project, ProjectCreate } from "../../../models/project.models";

interface Props {
  onChange: (change: { name: keyof Project; value: any }) => void;
  onSubmit: () => void;
  project: ProjectCreate | Project;
}

function ProjectForm(props: Props) {
  const {
    onChange,
    onSubmit,
    project: { name, description, startDate, endDate },
  } = props;

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (
      name === "startDate" ||
      name === "endDate" ||
      name === "name" ||
      name === "description"
    ) {
      emitChange(name, value);
    }
  };

  const emitChange = (name: keyof Project, value: any) => {
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
          <TextField
            label="Name"
            name="name"
            value={name}
            onChange={handleTextChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={description}
            onChange={handleTextChange}
          />
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            label="Start Date"
            name="startDate"
            value={startDate}
            onChange={(date) =>
              emitChange("startDate", date?.toJSDate() || new Date())
            }
          />
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            label="End Date"
            name="endDate"
            value={endDate}
            onChange={(date) =>
              emitChange("endDate", date?.toJSDate() || new Date())
            }
          />
        </Grid>
      </form>
    </Grid>
  );
}

export default ProjectForm;
