import { TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import { getProjectService } from "../../../firebase";
import { Project } from "../../../models/project.models";
import ProjectList from "./project-list-view";

function ProjectListContainer() {
  const projectService = getProjectService();
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery === "") {
      const { projects$, cleanup } = projectService.allProjects$();
      projects$.subscribe((projects) => setProjects(projects));
      return cleanup;
    } else {
      const { filteredProjects$, cleanup } =
        projectService.filteredProjects$(searchQuery);
      filteredProjects$.subscribe((projects) => setProjects(projects));
      return cleanup;
    }
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <TextField
        placeholder="Search Projects"
        type="search"
        value={searchQuery}
        onChange={handleSearch}
      />
      <ProjectList projects={projects} />
    </>
  );
}

export default ProjectListContainer;
