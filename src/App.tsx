import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { projectService } from "./firebase";
import { Project } from "./models/project.models";

function App() {
  const [projects, setProjects] = useState<Project[]>([]);

  // useEffect(() => {
  //   const unsubscribe = db.collection("projects").onSnapshot((snapshot) => {
  //     const updatedProjects = snapshot.docs.map((doc) => {
  //       return { id: doc.id, ...doc.data() };
  //     });
  //     setProjects(updatedProjects);
  //   });
  //   return unsubscribe;
  // }, [db]);

  useEffect(() => {
    const subscription = projectService
      .allProjects()
      .subscribe((projects) => setProjects(projects));
    return () => subscription.unsubscribe();
  }, [projectService]);
  console.log(projects);

  return (
    <div className="App">
      <header className="App-header">
        <h1>hello</h1>
        {/* <pre>{projects}</pre> */}
      </header>
    </div>
  );
}

export default App;
