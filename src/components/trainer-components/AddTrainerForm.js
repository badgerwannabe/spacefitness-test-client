
import React  from "react";
import {useMutation, useQuery, } from "@apollo/client";
import {useForm} from '../../utils/hooks'
import { Button, Form  } from "semantic-ui-react";

import {ADD_TRAINERS_MUTATION, FETCH_TRAINERS_QUERY} from '../../utils/graphql'


function AddTrainerForm (props){
   
    const {values, onChange, onSubmit} = useForm(createTrainerCallback,{
        name:'', description:'', email:'', phoneNumber:''
    });

    
const [createTrainer, {error}] = useMutation(ADD_TRAINERS_MUTATION, {
    errorPolicy: 'all',
    variables:values, 
    update(proxy, result){
        const data = proxy.readQuery({ 
            query: FETCH_TRAINERS_QUERY,
        });
        
        proxy.writeQuery({query:FETCH_TRAINERS_QUERY,
        data:{
            getTrainers: [result.data.createTrainer, ...data.getTrainers]
        }})
       
        props.history.push('/trainers')
    },},
    {});

    function createTrainerCallback(){
        createTrainer();
    }
    

    const AddTrainerForm = (
        <>
        <Form onSubmit={onSubmit}>
        <h2>Add a trainer :</h2>
        <Form.Field>
            <Form.Input
               placeholder="trainer name"
               name="name"
               onChange={onChange}
               values={values.name}
               error={error ? true : false}
               />
            <Form.Input
               placeholder="description"
               name="description"
               onChange={onChange}
               values={values.description}
               error={error ? true : false}
               />
            <Form.Input
               placeholder="email"
               name="email"
               onChange={onChange}
               values={values.email}
               error={error ? true : false}
               />
            <Form.Input
               placeholder="phoneNumber"
               name="phoneNumber"
               onChange={onChange}
               values={values.phoneNumber}
               error={error ? true : false}
               />
            <Form.Input
               placeholder="image url"
               name="image"
               onChange={onChange}
               values={values.image}
               error={error ? true : false}
               />
               <Button type ="submit" color="teal">Submit</Button>
        </Form.Field>
    </Form>
    {error && (
    <div className="ui error message" style={{marginBottom:20}}>
        <li>{error.graphQLErrors[0].message}</li>
    </div>
)}
  
    </>
    )
    return AddTrainerForm
    }
export default AddTrainerForm;