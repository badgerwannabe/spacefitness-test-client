import React from "react";
import { Card, Image, List, Button, Grid } from "semantic-ui-react";
import moment from "moment";
import DeleteButton from "../DeleteButton";

import {
  FETCH_TRAINER_QUERY,
  FETCH_DAYS_QUERY,
  FETCH_TRAININGS_QUERY,
  FETCH_TRAINING_QUERY,
} from "../../utils/graphql";

import { useQuery, useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";

function ScheduledTrainingCard({
  day: {
    id,
    date,
    createdAt,
    dayTrainings: [{ trainer, training, time }],
  },
}) {
  const { loading, data: { getTrainer } = {} } = useQuery(FETCH_TRAINER_QUERY, {
    variables: {
      trainer,
    },
  });

  const { loading1, data: { getTraining } = {} } = useQuery(
    FETCH_TRAINING_QUERY,
    {
      variables: {
        training,
      },
    }
  );

  let relatedTrainer;
  if (!getTrainer) {
    relatedTrainer = <p>No trainer data...</p>;
  } else {
    relatedTrainer = getTrainer.name;
  }

  let relatedTraining;
  if (!getTraining) {
    relatedTraining = <p>No training data...</p>;
  } else {
    relatedTraining = getTraining.trainingName;
  }
  console.log(trainer);
  console.log(training);
  return (
    <Card.Group>
      <Card fluid color="red">
        <Grid>
          <Grid.Column width={5}>
            <Image
              src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1469&q=80"
              wrapped
            />
          </Grid.Column>

          <Grid.Column verticalAlign={"middle"} width={7}>
            <Card.Content>
              <Card.Meta>
                <span className="time">{time}</span>
              </Card.Meta>
              <Card.Header>
                <h2>{relatedTraining}</h2>
              </Card.Header>
              <Card.Meta>
                <span className="trainer">Trainer: {relatedTrainer}</span>
              </Card.Meta>
              <Card.Meta>
                <span className="trainer">ID: {id}</span>
              </Card.Meta>
              <Card.Meta>
                <span className="trainer">date: {date}</span>
              </Card.Meta>
              <Card.Description>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Cumque placeat tenetur fugit sint beatae amet asperiores
                  perferendis nobis voluptatem magni!
                </p>
              </Card.Description>
            </Card.Content>
          </Grid.Column>
          <Grid.Column width={3} verticalAlign={"middle"}>
            <Card.Content extra>
              <Card.Description style={{ textAlign: "center" }}>
                <b style={{ fontSize: "1.5rem", lineHeight: "175    %" }}>
                  Miejsca: <br></br> 9/18
                </b>
              </Card.Description>
              <div style={{ margin: "4rem 0 0 0" }}>
                <Button onClick={console.log("Edit scheduled")} primary>
                  Edytuj
                </Button>
                <Button onClick={console.log("delete scheduled")} negative>
                  Usuń
                </Button>
              </div>
            </Card.Content>
          </Grid.Column>
        </Grid>
      </Card>
    </Card.Group>
  );
}
export default ScheduledTrainingCard;
