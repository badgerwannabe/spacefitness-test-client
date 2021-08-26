import React from "react";
import {
  EDIT_TRAINERS_MUTATION,
  FETCH_TRAINER_QUERY,
  FETCH_TRAINERS_QUERY,
} from "../../utils/graphql";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../../utils/hooks";

function SingleTrainer(props) {
  const trainerId = props.match.params.trainerId;

  const { values, onChange, onSubmit } = useForm(editTrainerCallback, {
    name: "",
    description: "",
    email: "",
    phoneNumber: "",
    image: ""
  });

  const {loading, error, data: { getTrainer } = {} } = useQuery(FETCH_TRAINER_QUERY, {
    variables: {
      trainerId,
    },
  });

  const [editTrainer, { loading: mutationLoading, error: mutationError }] =
    useMutation(EDIT_TRAINERS_MUTATION, {
        errorPolicy: 'all',
        variables:values, 
        update(cache, { data: { editTrainer } }) {
            cache.modify({
              fields: {
                info(existingInfo = []) {
                  const newInfoRef = cache.writeFragment({
                    data: editTrainer,
                    fragment: gql`
                      fragment newInfo on Trainer {
                        name
                        description
                        email
                        phoneNumber
                        image
                      }
                    `
                  });
                  return [...existingInfo, newInfoRef];
                }
              }
            });
            props.history.push('/trainers')
          },
      
    })
    console.log(values)

  function editTrainerCallback() {
    editTrainer({ variables: { trainerId, values } });;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  

  let trainerMarkup;
  if (!getTrainer) {
    trainerMarkup = <p>Loading trainer...</p>;
  } else {
    const { description, name, email, phoneNumber, image } = getTrainer;

    trainerMarkup = (
      <>
        <Form onSubmit={onSubmit}>
          <h2>Edit a trainer :</h2>
          <Form.Field>
            <Form.Input
              placeholder={name}
              name="name"
              onChange={onChange}
              values={values.name}
              error={error ? true : false}
            />
            <Form.Input
              placeholder={description}
              name="description"
              onChange={onChange}
              values={values.description}
              error={error ? true : false}
            />
            <Form.Input
              placeholder={email}
              name="email"
              onChange={onChange}
              values={values.email}
              error={error ? true : false}
            />
            <Form.Input
              placeholder={phoneNumber}
              name="phoneNumber"
              onChange={onChange}
              values={values.phoneNumber}
              error={error ? true : false}
            />
            <Form.Input
              placeholder={image}
              name="image"
              onChange={onChange}
              values={values.image}
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
  return trainerMarkup;
}

export default SingleTrainer;
