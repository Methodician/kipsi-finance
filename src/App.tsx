import "./App.css";

import ProjectList from "./components/projects/ProjectList";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";
import ProjectDetail from "./components/projects/ProjectDetail/project-detail";

function App() {
  return (
    <div className="App">
      <header className="App-header">Kipsi Finance Demo</header>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <Router>
          <Route exact path="/" component={ProjectList} />
          <Route path="/projects/:id" component={ProjectDetail} />
        </Router>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
