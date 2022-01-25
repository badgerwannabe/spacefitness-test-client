import React from "react";
import { Card, Image } from "semantic-ui-react";
import moment from "moment";
import {FETCH_TRAINING_QUERY} from "../../utils/graphql";
import { useQuery, useMutation, gql } from "@apollo/client";

function TemplateCard({ day: { time, date, id, dayTrainings, createdAt } }) {

 const {loading, data: { getTraining } = {} } = useQuery(FETCH_TRAINING_QUERY, {
      variables: {
        id,
      },
    });

  let relatedTraining;
  if (!getTraining) {
    relatedTraining = <p>No training data...</p>;
  } else {
    relatedTraining = getTraining.trainingName;
  }


  return (
    <Card>
      <Card.Content>
      
        <Card.Header>{date}</Card.Header>
        <Card.Meta>
             <div>
          {moment(createdAt).fromNow(true)}
             </div>
   
        </Card.Meta>
        <Card.Description>
          {dayTrainings &&
            dayTrainings.map((dt) => (
              <Card>
                <p>{dt.time}</p>
                <p>{dt.training}</p>
              </Card>
            ))}
        </Card.Description>
      </Card.Content>
      <Card.Content extra></Card.Content>
    </Card>
  );
}
export default TemplateCard;
