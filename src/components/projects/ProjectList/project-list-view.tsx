import * as React from "react";
import { Button, List, ListItem, ListItemText } from "@material-ui/core";
import { Project } from "../../../models/project.models";

interface Props {
  projects: Project[];
  onUpdateProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
}

export const ProjectList: React.FC<Props> = ({
  projects,
  onUpdateProject,
  onDeleteProject,
}) => {
  return (
    <List>
      {projects.map((project) => (
        <ListItem key={project.id}>
          <ListItemText primary={project.name} />
          <Button onClick={() => onUpdateProject(project)}>Update</Button>
          <Button onClick={() => onDeleteProject(project.id)}>Delete</Button>
        </ListItem>
      ))}
    </List>
  );
};
