import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Button, Confirm, Icon } from "semantic-ui-react";
import { FETCH_TRAINERS_QUERY, FETCH_TRAININGS_QUERY } from "../utils/graphql";

function DeleteButton({ trainerId, trainingId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
let mutation
  if(trainerId){
   mutation  = DELETE_TRAINER_MUTATION
  } else if (trainingId){
mutation = DELETE_TRAINING_MUTATION;
  } else{
mutation = DELETE_TEMPLATE_MUTATION
  } 
    

  const [deleteElement] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);

      if (!trainingId) {
        const data = proxy.readQuery({
          query: FETCH_TRAINERS_QUERY,
        });

        proxy.writeQuery({
          query: FETCH_TRAINERS_QUERY,
          data: {
            getTrainers: data.getTrainers.filter((p) => p.id !== trainerId),
          },
        });
      } else {
        const data = proxy.readQuery({
          query: FETCH_TRAININGS_QUERY,
        });

        proxy.writeQuery({
          query: FETCH_TRAININGS_QUERY,
          data: {
            getTrainings: data.getTrainings.filter((p) => p.id !== trainingId),
          },
        });
      }

      if (callback) callback();
    },
    variables: {
      trainerId,
      trainingId,
    },
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteElement}
      />
    </>
  );
}

const DELETE_TRAINER_MUTATION = gql`
  mutation deleteTrainer($trainerId: ID!) {
    deleteTrainer(trainerId: $trainerId)
  }
`;
const DELETE_TRAINING_MUTATION = gql`
  mutation deleteTraining($trainingId: ID!) {
    deleteTraining(trainingId: $trainingId)
  }
`;

const DELETE_TEMPLATE_MUTATION = gql`
  mutation deleteDay($id: ID!){
deleteDay(
 id:$id)
  }
`;

export default DeleteButton;
