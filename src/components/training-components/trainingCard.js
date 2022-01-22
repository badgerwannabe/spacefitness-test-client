import React from "react";
import {  Card, Image, List, Button } from "semantic-ui-react";
import moment from "moment";
import DeleteButton from "../DeleteButton";


import {
  FETCH_TRAINER_QUERY
} from "../../utils/graphql";

import { useQuery,useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

function TrainingCard({
    training: { trainingName, createdAt, id,  trainingDescription,trainingImage, trainerId},
  }) {

    const {loading, data: { getTrainer } = {} } = useQuery(FETCH_TRAINER_QUERY, {
      variables: {
        trainerId,
      },
    });

  let relatedTrainer;
  if (!getTrainer) {
    relatedTrainer = <p>No training data...</p>;
  } else {
    relatedTrainer = getTrainer.name;
  }
    return (
      <Card fluid>
      <Card.Content>
        <Image floated="right" size="medium" src={trainingImage} />
        <Card.Header>{trainingName}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Meta>{id}</Card.Meta>
        <Card.Description>{trainingDescription}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <List>
          <List.Item>
            <List.Icon name="user" />
            <List.Content> Trainer: {relatedTrainer}</List.Content>
          </List.Item>
        </List>
      </Card.Content>
      <Card.Content extra>
        <Button
          onClick={console.log("Edit training")}
          as={Link}
          to={`/trainings/${id}`}
          primary
        >
          Edytuj
        </Button>
        <DeleteButton trainingId={id} />
      </Card.Content>
    </Card>
    );
  }
  export default TrainingCard;
  
