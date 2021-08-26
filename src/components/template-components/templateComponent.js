import React, { useState } from "react";
import { Dropdown,Transition, Menu, Grid, Segment,Text } from "semantic-ui-react";
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

        <Segment>
        <Transition.Group>
          
         
        {days &&  
            days.map((day) => (
              <Grid.Column key={day.id} style={{ marginBottom: 20 }}>
                <TemplateCard day={day} />
              </Grid.Column>
            ))}

</Transition.Group>
        </Segment>
    )
    return TemplateComponent
}

export default TemplateComponent;