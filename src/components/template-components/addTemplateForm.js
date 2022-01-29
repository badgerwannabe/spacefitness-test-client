
import React, {useState}  from "react";
import {useMutation } from "@apollo/client";
import {useForm} from '../../utils/hooks'
import { Button, Form  } from "semantic-ui-react";

import {FETCH_TEMPLATES_QUERY, FETCH_TRAININGS_QUERY,ADD_TEMPLATES_MUTATION} from '../../utils/graphql'

//hook for form functioning
function AddTemplateForm (props){
   
    const {values, onChange, onSubmit} = useForm(createDayCallback,{
        date:'', dayTrainings:[{
          time:'testing time', training:"60e9e7580a6b113b2486113a"
        },{
          time:'testing2 time2', training:"61ec6a6d0f94870016f419bd"
        }
        ]
    });

//apollo hook to send data through GraphQL    
const [createDay, {error}] = useMutation(ADD_TEMPLATES_MUTATION, {
    errorPolicy: 'all',
    variables:values, 
    update(proxy, result){
        const data = proxy.readQuery({ 
            query:FETCH_TEMPLATES_QUERY,
        });
        
        proxy.writeQuery({query:FETCH_TEMPLATES_QUERY,
        data:{
            getDays: [result.data.createDay, ...data.getDays]
        }})
       
        props.history.push('/templates')
    },},
    {});

    function createDayCallback(){
        createDay();
    }
    
  //little component I want to dynamically add each time people press a button  
  function addDayTraining(){

    const addDayTraining = (
      <>

      <Form.Field>
            <Form.Input
               placeholder="time"
               name="time"
               onChange={()=>{
                 console.log("time")
               }}
               values={values.time}
               error={error ? true : false}
               />
            <Form.Input
               placeholder="training"
               name="training"
               onChange={()=>{
                 console.log("training")
               }}
               values={values.training}
               error={error ? true : false}
               />
  </Form.Field>



      </>
    )
    return addDayTraining
  }
    
//Form component itself
    const AddTemplateForm = (
        <>
        <Form onSubmit={onSubmit}>
        <h2>Add a template :</h2>
        <Form.Field>
            <Form.Input
               placeholder="date"
               name="date"
               onChange={onChange}
               values={values.date}
               error={error ? true : false}
               />
  </Form.Field>
                 <Form.Field> 
                 <Button type="button" onClick={
                   addDayTraining
                 }>Add training</Button>
                 
                </Form.Field>

               <Button type ="submit" color="teal">Submit</Button>
      

        
    </Form>
    {error && (
    <div className="ui error message" style={{marginBottom:20}}>
        <li>{error.graphQLErrors[0].message}</li>
    </div>
)}
  
    </>
    )
    return AddTemplateForm
    }
export default AddTemplateForm;