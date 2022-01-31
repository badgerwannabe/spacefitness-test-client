import React from "react";
import { Card, Button } from "semantic-ui-react";
import {Link} from "react-router-dom"
import moment from "moment";
import DeleteButton from "../DeleteButton";
// import {FETCH_TRAINING_QUERY} from "../../utils/graphql";
// import { useQuery, useMutation, gql } from "@apollo/client";
import DayTraining from "./trainingDayCard.js"

function TemplateCard({ day: { time, date, id, dayTrainings, createdAt } }) {

//  const {loading, data: { getTraining } = {} } = useQuery(FETCH_TRAINING_QUERY, {
//       variables: {
//         id,
//       },
//     });

  // let relatedTraining;
  // if (!getTraining) {
  //   relatedTraining = <p>No training data...</p>;
  // } else {
  //   relatedTraining = getTraining.trainingName;
  // }


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
              <DayTraining dayTraining={dt} key={dt.id}/>
            ))}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
        
          as={Link}
          to={`/trainings/${id}`}
          primary
        >
          Edytuj
        </Button>
        <DeleteButton id={id} />
      </Card.Content>
    </Card>
  );
}
export default TemplateCard;
