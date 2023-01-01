import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Project } from "../../../models/project.models";
import { getProjectService } from "../../../firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import ExpenseList from "../../expenses/ExpenseList";

const useStyles = makeStyles({
  root: {
    margin: "25px",
    minWidth: "300px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    display: "flex",
    justifyContent: "flex-start",
    fontSize: "2rem",
  },
  description: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "1rem",
    fontSize: "1.5rem",
  },
  dates: {
    display: "flex",
    justifyContent: "flex-start",
  },
});

function ProjectDetail() {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const { projectById$ } = getProjectService();

  useEffect(() => {
    if (!id) {
      throw new Error("No id provided");
    }

    const { project$, cleanup } = projectById$(id);
    project$.subscribe((project) => setProject(project));

    return cleanup;
  }, [id]);

  if (!project) {
    return <h1>Loading...</h1>;
  }

  const { name, description, startDate, endDate } = project;

  return (
    <>
      <Button href={"/"}>Back</Button>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Typography className={classes.title}>{name}</Typography>
          <Typography className={classes.description}>{description}</Typography>
          <Typography className={classes.dates}>
            Start Date: {startDate.toLocaleDateString()}
          </Typography>
          <Typography className={classes.dates}>
            End Date: {endDate.toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
      <ExpenseList expenseIds={project.expenseIds} project={project} />
    </>
  );
}

export default ProjectDetail;
