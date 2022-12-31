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
import { Delete } from "@material-ui/icons";
import { Project } from "../../../models/project.models";

interface Props {
  project: Project;
}

const DeleteProjectDialog = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { deleteProject } = getProjectService();

  const onConfirmClick = () => {
    deleteProject(props.project.id);
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Delete Project</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the project{" "}
          <i>"{props.project.name}"</i>?
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

export default DeleteProjectDialog;
