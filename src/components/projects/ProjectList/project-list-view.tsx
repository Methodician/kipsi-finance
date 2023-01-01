import * as React from "react";
import {
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Project } from "../../../models/project.models";
import UpdateProjectDialog from "../UpdateProjectDialog/update-project-dialog";
import DeleteProjectDialog from "../DeleteProjectDialog/delete-project-dialog";
import { OpenInNew } from "@material-ui/icons";

interface Props {
  projects: Project[];
}

const ProjectList: React.FC<Props> = ({ projects }) => {
  const displayDates = (project: Project) => {
    const startDate = project.startDate.toLocaleDateString();
    const endDate = project.endDate.toLocaleDateString();
    return `Start: ${startDate} | End: ${endDate}`;
  };

  return (
    <List>
      {projects.map((project) => (
        <ListItem key={project.id}>
          <ListItemText
            primary={project.name}
            secondary={displayDates(project)}
          />
          <Link href={`/projects/${project.id}`}>
            <IconButton>
              <OpenInNew />
            </IconButton>
          </Link>
          <UpdateProjectDialog project={project} />
          <DeleteProjectDialog project={project} />
        </ListItem>
      ))}
    </List>
  );
};

export default ProjectList;
