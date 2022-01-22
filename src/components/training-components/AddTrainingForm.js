import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "../../utils/hooks";
import { Button, Form, Dropdown } from "semantic-ui-react";

import {
  ADD_TRAININGS_MUTATION,
  FETCH_TRAININGS_QUERY,
  FETCH_TRAINERS_QUERY,
} from "../../utils/graphql";

//Function component - form

function AddTrainingForm(props) {
  
  //useForm hook - initialize the values
  const { values, onChange, onSubmit } = useForm(createTrainingCallback, {
    trainingName: "",
    trainingDescription: "",
    trainerId: "",
    trainingImage: "",
  });

//useMutation hook to add trainings - read and then write
  const [createTraining, { error }] = useMutation(
    ADD_TRAININGS_MUTATION,
    {
      errorPolicy: "all",
      variables: values,
      update(proxy, result) {
        const data = proxy.readQuery({
          query: FETCH_TRAININGS_QUERY,
        });

        proxy.writeQuery({
          query: FETCH_TRAININGS_QUERY,
          data: {
            getTrainings: [result.data.createTraining, ...data.getTrainings],
          },
        });

        props.history.push("/trainings");
      },
    },
    {}
  );

  function createTrainingCallback() {
    createTraining();
  }
//fetch trainers for a dropdown using useQuery hook
  const { loading, data: { getTrainers: trainers } = {} } =
    useQuery(FETCH_TRAINERS_QUERY);

//create an array for a Dropdown with trainer objects
    const options = [];
    trainers &&
      trainers.map((trainer) =>
        options.push({
          key: trainer.id,
          value: trainer.id,
          text: trainer.name,
        })
      );



  const AddTrainingForm = (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Add a training :</h2>
        <Form.Field>
          <Form.Input
            placeholder="training name"
            name="trainingName"
            onChange={onChange}
            values={values.trainingName}
            error={error ? true : false}
          />
          <Form.Input
            placeholder="description"
            name="trainingDescription"
            onChange={onChange}
            values={values.trainingDescription}
            error={error ? true : false}
          />
    

          <Dropdown
            options={options}
            placeholder='Select a trainer'
            name="trainerId"
            fluid
            selection
            onChange={onChange }
            values={values.trainerId}
          />
          <Form.Input
            placeholder="image url"
            name="trainingImage"
            onChange={onChange}
            values={values.trainingImage}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <li>{error.graphQLErrors[0].message}</li>
        </div>
      )}
    </>
  );
  return AddTrainingForm;
}
export default AddTrainingForm;
