import "./App.css";

import ProjectList from "./components/projects/ProjectList";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProjectForm from "./components/projects/ProjectForm/project-form";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";

function App() {
  return (
    <div className="App">
      <header className="App-header">Kipsi Thing</header>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <Router>
          <Route exact path="/" component={ProjectList} />
          <Route exact path="/project/create" component={ProjectForm} />
          <Route exact path="/project/update/:id" component={ProjectForm} />
        </Router>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
