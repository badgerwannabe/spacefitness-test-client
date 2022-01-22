import React, { useState } from "react";
import { Menu, Grid } from "semantic-ui-react";

import TrainersComponent from "./trainer-components/trainersComponent";
import TrainingComponent from "./training-components/trainingComponent";
import TemplateComponent from "./template-components/templateComponent";
import ScheduleComponent from "./schedule-components/scheduleComponent";
import { Link } from "react-router-dom";

function MainContainer(props) {

  const pathname = window.location.pathname;

  const path = pathname === "/" ? "schedule" : pathname.substr(1);
  console.log(pathname)

  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name);
  console.log(activeItem)
  const MainContainer = (
    <Grid>
      <Grid.Row>
        <Grid.Column stretched width={4}>
          <Menu secondary vertical size="massive">
            <Menu.Item
              content="Training schedule"
              name="schedule"
              active={activeItem === "schedule"}
              onClick={handleItemClick}
              as={Link}
              to={"/schedule"}
            />
            <Menu.Item
              content="Templates"
              name="templates"
              active={activeItem === "templates"}
              onClick={handleItemClick}
              as={Link}
              to={"/templates"}
            />

            <Menu.Item
              content="Trainings"
              name="trainings"
              active={activeItem === "trainings"}
              onClick={handleItemClick}
              as={Link}
              to={"/trainings"}
            />
            <Menu.Item
              content="Trainers"
              name="trainers"
              active={activeItem === "trainers"}
              as={Link}
              to={"/trainers"}
              onClick={handleItemClick}
            />
            <Menu.Item
              content="Users"
              name="users"
              active={activeItem === "users"}
              as={Link}
              to={"/users"}
              onClick={handleItemClick}
            />
            <Menu.Item
              content="Passes"
              name="passes"
              active={activeItem === "passes"}
              onClick={handleItemClick}
              as={Link}
              to={"/passes"}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column width={12}>
          <Grid  centered padded columns={3}>
            {activeItem === "trainers" ? <TrainersComponent /> : ""}
            {activeItem === "trainings" ? <TrainingComponent /> : ""}
            {activeItem === "templates" ? <TemplateComponent /> : ""}
            {activeItem === "schedule" ? <ScheduleComponent /> : ""}
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  return MainContainer;
}

export default MainContainer;
