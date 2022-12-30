import { TextField, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getProjectService } from "../../../firebase";
import { DatePicker } from "@material-ui/pickers";

import { Project } from "../../../models/project.models";

// Might create a container to reduce complexity and improve composablity in a production app.
function ProjectForm() {
  const { createProject, updateProject, projectById$ } = getProjectService();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [project, setProject] = useState<Project | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const { project$, cleanup } = projectById$(id);
      project$.subscribe((project) => setProject(project));
      return cleanup;
    }
  }, [id]);

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
      setStartDate(project.startDate);
      setEndDate(project.endDate);
    }
  }, [project]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "startDate") {
      setStartDate(new Date(value));
    } else if (name === "endDate") {
      setEndDate(new Date(value));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (id) {
      updateProject({ id, name, description, startDate, endDate }).then(() =>
        history.push("/")
      );
    } else {
      createProject({ name, description, startDate, endDate }).then(() =>
        history.push("/")
      );
    }
  };

  return (
    <>
      <h1>{id ? "Edit" : "Create"} Project</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          value={description}
          onChange={handleChange}
        />
        <DatePicker
          label="Start Date"
          name="startDate"
          value={startDate}
          onChange={(date: Date | null) => setStartDate(date || new Date())}
        />
        <DatePicker
          label="End Date"
          name="endDate"
          value={endDate}
          onChange={(date: Date | null) => setEndDate(date || new Date())}
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </>
  );
}

export default ProjectForm;
