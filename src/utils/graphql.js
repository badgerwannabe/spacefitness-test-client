import gql from "graphql-tag";

export const FETCH_TRAINERS_QUERY = gql`
  query {
    getTrainers {
      id
      name
      description
      email
      phoneNumber
      createdAt
      image
    }
  }
`;

export const FETCH_TRAINER_QUERY = gql`
  query ($trainerId: ID!) {
    getTrainer(trainerId: $trainerId) {
      id
      name
      description
      email
      phoneNumber
      createdAt
      image
    }
  }
`;

export const FETCH_TRAININGS_QUERY = gql`
  query {
    getTrainings {
      id
      trainingName
      createdAt
      trainingDescription
      trainer
      createdAt
    }
  }
`;
export const FETCH_TRAINING_QUERY = gql`
  query ($trainingId:ID!) {
    getTraining(trainingId:$trainingId) {
      id
      trainingName
      createdAt
      trainingDescription
      trainer
      createdAt
      image
    }
  }
`;
export const ADD_TRAININGS_MUTATION = gql`
  mutation createTraining(
    $trainingName: String!
    $trainingDescription: String!
    $trainer: ID!
    $image: String!
  ) {
    createTraining(
      trainingName: $trainingName
      trainingDescription: $trainingDescription
      trainer: $trainer
      image: $image
    ) {
      id
      trainingName
      trainingDescription
      trainer
      createdAt
      image
    }
  }
`;
export const EDIT_TRAININGS_MUTATION = gql`
  mutation editTraining(
    $trainingName: String
    $trainingDescription: String
    $trainer: ID
    $image: String
  ) {
    editTraining(
      trainingName: $trainingName
      trainingDescription: $trainingDescription
      trainer: $trainer
      image: $image
    ) {
      id
      trainingName
      trainingDescription
      trainer
      createdAt
      image
    }
  }
`;

export const FETCH_TEMPLATES_QUERY = gql`
  query {
    getDays {
      id
      date
      dayTrainings {
        time
        training
        trainer
      }
      createdAt
    }
  }
`;
export const ADD_TRAINERS_MUTATION = gql`
  mutation createTrainer(
    $name: String!
    $description: String!
    $email: String!
    $phoneNumber: String!
    $image: String!
  ) {
    createTrainer(
      name: $name
      description: $description
      email: $email
      phoneNumber: $phoneNumber
      image: $image
    ) {
      id
      name
      description
      email
      phoneNumber
      createdAt
      image
    }
  }
`;
export const EDIT_TRAINERS_MUTATION = gql`
  mutation editTrainer(
    $name: String
    $description: String
    $email: String
    $phoneNumber: String
    $trainerId: ID!
  ) {
    editTrainer(
      name: $name
      description: $description
      email: $email
      phoneNumber: $phoneNumber
      trainerId: $trainerId
    ) {
      id
      name
      description
      email
      phoneNumber
      createdAt
    }
  }
`;

// export const FETCH_PEOPLE_QUERY = gql`
//   query {
//     getPersons {
//       id
//       firstName
//       lastName
//       email
//       phoneNumber
//       healthnotes
//       heardFrom
//       status
//       createdAt
//       dayTrainings {

//         time
//         training
//         trainer

//       }
//       createdAt
//     }
//   }
// `;
