import React from "react";
import {
  FETCH_TRAINER_QUERY,
  FETCH_TRAININGS_QUERY,
  EDIT_TRAININGS_MUTATION,
  FETCH_TRAINING_QUERY,
  FETCH_TRAINERS_QUERY,
} from "../../utils/graphql";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Button, Form, Dropdown } from "semantic-ui-react";
import { useForm } from "../../utils/hooks";

const { loading, data: { getTraining } = {} } = useQuery(FETCH_TRAINING_QUERY, {
  variables: {
    trainingId,
  },
});

function findOne(array, trainerId) {
  const findTrainer = array.find(function (element, index) {
    if (element.id === trainerId) return element.name;
  });
}

export const findTrainerByTraining = () => {
  return;
};
