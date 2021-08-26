import React from "react";
import { Transition, Grid, Button } from "semantic-ui-react";
import TrainingCard from "./trainingCard";
import { useQuery } from "@apollo/client";
import { FETCH_TRAININGS_QUERY } from "../../utils/graphql";
import {Link} from 'react-router-dom'

function TrainingComponent(props) {
  const { loading, data: { getTrainings: trainings } = {} } = useQuery(
    FETCH_TRAININGS_QUERY
  );


  const TrainingComponent = (
    <Transition.Group>
      {trainings &&
        trainings.map((training) => (
          <Grid.Column key={training.id} style={{ marginBottom: 20 }}>
            <TrainingCard training={training} />
          </Grid.Column>
          
        ))}

<Grid.Column>
      
      <Button primary massive style={{ paddingLeft:50, paddingRight:50, marginBottom:10  }}   as={Link}
            to={`/add-training`}>
        <h3>Add training</h3>
      </Button>
 
   
    </Grid.Column>
    </Transition.Group>
  );
  return TrainingComponent;
}

export default TrainingComponent;
