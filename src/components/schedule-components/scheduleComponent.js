import _ from "lodash";
import React, { useState } from "react";
import {
  Dropdown,
  Image,
  Transition,
  Menu,
  Grid,
  Segment,
  Text,
  Button,
  Card,
  Container,
  GridColumn,
  CardContent,
} from "semantic-ui-react";
// import scheduledTraining from "./scheduledTraining";
import { useQuery } from "@apollo/client";
import { FETCH_DAYS_QUERY, FETCH_TRAINERS_QUERY } from "../../utils/graphql";
import { Link } from "react-router-dom";
import ScheduledTrainingCard from "./scheduledTrainingCard";

function ScheduleComponent(props) {
  const { loading, data: { getDays: days } = {} } = useQuery(FETCH_DAYS_QUERY);

  const columns = _.times(7, (i) => (
    <Grid.Column key={i}>
      <Button>{i + 1}</Button>
    </Grid.Column>
  ));

  const ScheduleComponent = (
    <Transition.Group>
      <Container style={{ textAlign: "left" }}>
        <h1 style={{ textAlign: "center" }}>Grafik Treningów</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          dolor unde repudiandae culpa ullam, asperiores officiis ratione
          repellat quaerat nihil vel corporis distinctio vero doloribus dolore
          optio commodi voluptatum inventore.
        </p>

        <Container>
          <Grid style={{ margin: "2rem auto" }} centered>
            {columns}
          </Grid>
          <Grid style={{ margin: "2rem auto" }} relaxed>
            <Button>PN, 5.07</Button>
            <Button>WT, 6.07</Button>
            <Button>SR, 7.07</Button>
            <Button>CZ, 8.07</Button>
            <Button>PT, 9.07</Button>
            <Button>SB, 10.07</Button>
            <Button>ND, 11.07</Button>
            <Button primary>Add day</Button>
          </Grid>
        </Container>

        {days &&
          days.map((day) => (
            <Grid.Column key={day.id} style={{ marginBottom: 20 }}>
              <ScheduledTrainingCard day={day} />
            </Grid.Column>
          ))}
      </Container>
    </Transition.Group>
  );
  return ScheduleComponent;
}

export default ScheduleComponent;
