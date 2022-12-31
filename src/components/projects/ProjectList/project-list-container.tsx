import { useState, useEffect } from "react";
import { getProjectService } from "../../../firebase";
import { Project } from "../../../models/project.models";
import CreateProjectDialog from "../CreateProjectDialog/create-project-dialog";
import ProjectList from "./project-list-view";

function ProjectListContainer() {
  const projectService = getProjectService();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const { projects$, cleanup } = projectService.allProjects$();
    projects$.subscribe((projects) => setProjects(projects));
    return cleanup;
  }, [projectService]);

  return (
    <>
      <CreateProjectDialog />
      <ProjectList projects={projects} />
    </>
  );
}

export default ProjectListContainer;
