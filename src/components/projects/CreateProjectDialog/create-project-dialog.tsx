import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { useState } from "react";
import { getProjectService } from "../../../firebase";
import { Project, ProjectCreate } from "../../../models/project.models";
import ProjectForm from "../ProjectForm/project-form";
const PROJECT_STUB: ProjectCreate = {
  name: "",
  description: "",
  startDate: new Date(),
  endDate: new Date(),
};

const CreateProjectDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState<ProjectCreate>(PROJECT_STUB);
  const { createProject } = getProjectService();

  const handleChange = (change: { name: keyof Project; value: any }) => {
    setProject({ ...project, [change.name]: change.value });
  };

  const handleSubmit = () => {
    createProject(project);
    setProject(PROJECT_STUB);
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Create Project</DialogTitle>
        <DialogContent>
          <ProjectForm
            project={project}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Create</Button>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Button onClick={() => setIsOpen(true)}>Create Project</Button>
    </>
  );
};

export default CreateProjectDialog;
