import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { useState } from "react";
import { getProjectService } from "../../../firebase";
import { Project, ProjectUpdate } from "../../../models/project.models";
import ProjectForm from "../ProjectForm/project-form";
import { Edit } from "@material-ui/icons";

interface Props {
  project: Project;
}

const UpdateProjectDialog = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectUpdate, setProjectUpdate] = useState<ProjectUpdate>({
    id: props.project.id,
  });
  const [sourceProject, setSourceProject] = useState<Project>(props.project);
  const { updateProject } = getProjectService();

  const handleChange = (change: { name: keyof Project; value: any }) => {
    setProjectUpdate({ ...projectUpdate, [change.name]: change.value });
    setSourceProject({ ...sourceProject, [change.name]: change.value });
  };

  const handleSubmit = () => {
    updateProject(projectUpdate);
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Update Project</DialogTitle>
        <DialogContent>
          <ProjectForm
            project={sourceProject}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Save Changes</Button>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <IconButton onClick={() => setIsOpen(true)}>
        <Edit />
      </IconButton>
    </>
  );
};

export default UpdateProjectDialog;
