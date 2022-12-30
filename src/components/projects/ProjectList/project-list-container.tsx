import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProjectService } from "../../../firebase";
import { Project } from "../../../models/project.models";
import { ProjectList } from "./project-list-view";

function ProjectListContainer() {
  const projectService = getProjectService();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const { projects$, cleanup } = projectService.allProjects$();
    projects$.subscribe((projects) => setProjects(projects));
    projects$.subscribe((projects) => console.log(projects));
    return cleanup;
  }, [projectService]);

  const updateProject = (project: Project) => {
    projectService.updateProject(project);
  };

  const deleteProject = (id: string) => {
    projectService.deleteProject(id);
  };

  return (
    <>
      <Link to="/project/create">Create Project</Link>
      <ProjectList
        projects={projects}
        onUpdateProject={updateProject}
        onDeleteProject={deleteProject}
      />
    </>
  );
}

export default ProjectListContainer;
