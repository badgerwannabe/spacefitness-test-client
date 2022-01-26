import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import "./App.css";
import BackendPage from "./pages/BackendPage";

import AddTrainerForm from "./components/trainer-components/AddTrainerForm";
import AddTrainingForm from "./components/training-components/AddTrainingForm";
import AddTemplateForm from "./components/template-components/addTemplateForm";
import SingleTrainer from "./components/trainer-components/SingleTrainer";
import SingleTraining from "./components/training-components/SingleTraining";

function App() {
  return (
    <Router>
      <Container className={"basic-container"} fluid>
        <Route exact path="/" component={BackendPage} activeItem={"schedule"} />
        <Route
          exact
          path="/trainers"
          component={BackendPage}
          activeItem={"trainers"}
        />
        <Route
          exact
          path="/users"
          component={BackendPage}
          activeItem={"users"}
        />
        <Route
          exact
          path="/trainings"
          component={BackendPage}
          activeItem={"trainings"}
        />
        <Route
          exact
          path="/templates"
          component={BackendPage}
          activeItem={"templates"}
        />
        <Route
          exact
          path="/passes"
          component={BackendPage}
          activeItem={"passes"}
        />
        <Route
          exact
          path="/schedule"
          component={BackendPage}
          activeItem={"schedule"}
        />
        <Route exact path="/add-trainer" component={AddTrainerForm} />
        <Route exact path="/add-training" component={AddTrainingForm} />
        <Route exact path="/add-template" component={AddTemplateForm} />

        <Route exact path="/trainers/:trainerId" component={SingleTrainer} />
        <Route exact path="/trainings/:trainingId" component={SingleTraining} />
          
      
      </Container>
    </Router>
  );
}

export default App;
