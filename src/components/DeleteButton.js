import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Button, Confirm, Icon } from "semantic-ui-react";
import { FETCH_TRAINERS_QUERY } from "../utils/graphql";

function DeleteButton({ trainerId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutation = DELETE_TRAINER_MUTATION;
  const [deleteElement] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);

      const data = proxy.readQuery({
        query: FETCH_TRAINERS_QUERY,
      });

      proxy.writeQuery({
        query: FETCH_TRAINERS_QUERY,
        data: {
          getTrainers: data.getTrainers.filter((p) => p.id !== trainerId),
        },
      });

      if (callback) callback();
    },
    variables: {
      trainerId,
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

export default DeleteButton;
