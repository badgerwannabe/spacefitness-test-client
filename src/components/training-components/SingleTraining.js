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

function SingleTraining(props) {
  const trainingId = props.match.params.trainingId;

  const { values, onChange, onSubmit } = useForm(editTrainingCallback, {
    trainingName: "",
    trainingDescription: "",
    trainingImage: "",
    trainerId: "",
  });

  const {
    loading,
    error,
    data: { getTraining } = {},
  } = useQuery(FETCH_TRAINING_QUERY, {
    variables: {
      trainingId,
    },
  });

  const [editTraining, { loading: mutationLoading, error: mutationError }] =
    useMutation(EDIT_TRAININGS_MUTATION, {
      errorPolicy: "all",
      variables: values,
      update(cache, { data: { editTraining } }) {
        cache.modify({
          fields: {
            info(existingInfo = []) {
              const newInfoRef = cache.writeFragment({
                data: editTraining,
                fragment: gql`
                  fragment newInfo on Training {
                    trainingName
                    trainingDescription
                    trainerId
                    trainingImage
                  }
                `,
              });
              return [...existingInfo, newInfoRef];
            },
          },
        });
        props.history.push("/trainings");
      },
    });
  console.log(values);

  const {
    loading1,
    error1,
    data: { getTrainers: trainers } = {},
  } = useQuery(FETCH_TRAINERS_QUERY);

  function editTrainingCallback() {
    editTraining({ variables: { trainingId, values } });
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let trainingMarkup;
  if (!getTraining) {
    trainingMarkup = <p>Loading training...</p>;
  } else {
    const { trainingDescription, trainingName, trainerId, trainingImage } =
      getTraining;

    const options = [];
    trainers &&
      trainers.map((trainer) => {
        if (trainer.id === trainerId) {
          options.push({
            key: trainer.id,
            value: trainer.id,
            text: trainer.name,
            priority: "first",
          });
        } else {
          options.push({
            key: trainer.id,
            value: trainer.id,
            text: trainer.name,
          });
        }

        return options;
      });

    // let selected;
    // async function checkIfSelected(array) {
    //   let element = await array.find((el) => el.priority === "first");
    //   selected = element.key;
    //   console.log(selected);
    //   console.log(selected);
    //   return selected;
    // }

    trainingMarkup = (
      <>
        <Form onSubmit={onSubmit}>
          <h2>Edit a training :</h2>
          <Form.Field>
            <Form.Input
              defaultValue={trainingName}
              placeholder={trainingName}
              name="trainingName"
              onChange={onChange}
              values={values.trainingName}
              error={error ? true : false}
            />
            <Form.Input
              defaultValue={trainingDescription}
              placeholder={trainingDescription}
              name="trainingDescription"
              onChange={onChange}
              values={values.trainingDescription}
              error={error ? true : false}
            />
            <Dropdown
              defaultValue={trainerId}
              options={options}
              placeholder="wybierz trenera"
              name="trainerId"
              fluid
              selection
              onChange={onChange}
              values={values.trainerId}
              //   defaultValue={options}
            />

            <Form.Input
              defaultValue={trainingImage}
              placeholder={trainingImage}
              name="trainingImage"
              onChange={onChange}
              values={values.trainingImage}
              error={error ? true : false}
            />
            <Button type="submit" color="teal">
              Submit
            </Button>
          </Form.Field>
          {mutationLoading && <p>Loading...</p>}
          {mutationError && <p>Error :( Please try again</p>}
        </Form>
      </>
    );
  }
  return trainingMarkup;
}

export default SingleTraining;
