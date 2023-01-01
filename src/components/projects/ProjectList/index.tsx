import CreateProjectDialog from "../CreateProjectDialog/create-project-dialog";
import Container from "./project-list-container";

function ProjectList() {
  return (
    <>
      <CreateProjectDialog />
      <Container />
    </>
  );
}

export default ProjectList;
