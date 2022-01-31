import React from "react";
import { Card } from "semantic-ui-react";
import {FETCH_TRAINING_QUERY} from "../../utils/graphql";
import { useQuery} from "@apollo/client";

function TrainingDayCard({ dayTraining: { time, id, training } }) {

 const {loading, data: { getTraining } = {} } = useQuery(FETCH_TRAINING_QUERY, {
      variables: {
       trainingId: training,
      },
    });

  let relatedTraining;
  if (!getTraining) {
    relatedTraining = <p>No training data...</p>;
  } else {
    relatedTraining = getTraining.trainingName;
  }
//loading logic
 let loadingMessage;
if (loading) {
loadingMessage = <p>content is loading</p>
}
  return (
    <Card>
    {loadingMessage}
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
