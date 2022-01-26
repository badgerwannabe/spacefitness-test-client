import React from "react";
import {Transition, Grid,  Button } from "semantic-ui-react";
import {Link} from "react-router-dom"
import TemplateCard from "./templateCard";
import {useQuery} from '@apollo/client';
import { FETCH_TEMPLATES_QUERY } from '../../utils/graphql';


function TemplateComponent(props){

    
    const {
        loading,
        data: { getDays: days } = {}
      } = useQuery(FETCH_TEMPLATES_QUERY);
      console.log(days)
    
    const TemplateComponent = (
        <Transition.Group>
         
        {days &&  
            days.map((day) => (
              <Grid.Column key={day.id} style={{ marginBottom: 20 }}>
                <TemplateCard day={day} />
              </Grid.Column>
            ))}


              <Grid.Column>
      
        <Button primary massive style={{ paddingLeft:50, paddingRight:50, marginBottom:10  }}   as={Link}
              to={`/add-template`}>
          <h3>Add template</h3>
        </Button>
   
     
      </Grid.Column>
        </Transition.Group>
    )
    return TemplateComponent
}

export default TemplateComponent;