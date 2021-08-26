import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "../../utils/hooks";
import { Button, Form, Dropdown } from "semantic-ui-react";

import {
  ADD_TRAININGS_MUTATION,
  FETCH_TRAININGS_QUERY,
  FETCH_TRAINERS_QUERY,
} from "../../utils/graphql";

function AddTrainingForm(props) {
  const { values, onChange, onSubmit } = useForm(createTrainingCallback, {
    trainingName: "",
    trainingDescription: "",
    trainer: "",
    image: "",
  });
// const [connectedTrainer, setConnectedTrainer] = useState("");

// const onTrainerChange = (event)=>{
//     setConnectedTrainer({...connectedTrainer, [event.target.name]: event.target.value})
// };
  

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

  const { loading, data: { getTrainers: trainers } = {} } =
    useQuery(FETCH_TRAINERS_QUERY);


    const options = [];
    trainers &&
      trainers.map((trainer) =>
        options.push({
          key: trainer.id,
          value: trainer.id,
          text: trainer.name,
        })
      );
  
      console.log(options)


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
            name="trainer"
            fluid
            selection
            onChange={onChange }
            values={values.value}
          />
          <Form.Input
            placeholder="image url"
            name="image"
            onChange={onChange}
            values={values.image}
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
