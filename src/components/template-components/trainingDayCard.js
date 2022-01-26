import React from "react";
import { Card } from "semantic-ui-react";
import moment from "moment";
import {FETCH_TRAINING_QUERY} from "../../utils/graphql";
import { useQuery, useMutation, gql } from "@apollo/client";

function TrainingDayCard({ dayTraining: { time, id, training } }) {

 const {loading, data: { getTraining } = {} } = useQuery(FETCH_TRAINING_QUERY, {
      variables: {
       trainingId: training,
      },
    });

  let relatedTraining;
  let trainingDescription
  if (!getTraining) {
    relatedTraining = <p>No training data...</p>;
  } else {
    relatedTraining = getTraining.trainingName;
  }


  return (
    <Card>
      <Card.Content>
        <Card.Description>
                <p>{time}</p>
                <p>{relatedTraining}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  );
}
export default TrainingDayCard;
