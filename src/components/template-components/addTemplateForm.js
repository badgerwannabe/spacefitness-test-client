
import React, {useState}  from "react";
import {useMutation } from "@apollo/client";
import {useForm} from '../../utils/hooks'
import { Button, Form  } from "semantic-ui-react";

import {FETCH_TEMPLATES_QUERY, ADD_TEMPLATES_MUTATION} from '../../utils/graphql'

//hook for form functioning
function AddTemplateForm (props){
   
    const {values, onChange, onSubmit} = useForm(createDayCallback,{
        date:'', 
        // dayTrainings:[]
    });
  //addTraningObject State 
    const [trainingObjects, setTrainingObjects] = useState([]);

//apollo hook to send data through GraphQL    
const [createDay, {error}] = useMutation(ADD_TEMPLATES_MUTATION, {
    errorPolicy: 'all',
     variables:{values,trainingObjects},
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

  



   //addTraningObject function
    function addTraining(){
      // console.table(trainingObjects);
      let newCount = trainingObjects.length + 1;
      console.log(newCount)
        const newTrainingObject =  {
              time:"",
              training:"",
              id: newCount
              };
      
         setTrainingObjects([...trainingObjects, newTrainingObject]);
    }



    function updateObjectValues(event, index){

      const {name,value} = event.target;
      // console.log(name + " " + value + " "+id)


      // const todoIndex = trainingObjects.findIndex((obj) => obj.id === id);

      let values = [...trainingObjects]

      values[index][name] = value
      // let newObj = values[todoIndex]
      // console.log(newObj)
      // let updObj = {...newObj, [name]: value}
      // console.log(updObj)
      // values[todoIndex] = updObj

      setTrainingObjects(values)

      console.table(trainingObjects)
  // fix state from updating not to lose values
  // send the values through form 

    }
  


  //little component I want to dynamically add each time people press a button  
  const AddDayTraining =({trainingObject, trainingItemIndex}) =>{
// console.log(trainingObject)

  let isThat = trainingObjects.find( item => 
                   item.id === trainingObject.id)

    return(
      <>
      <Form.Field>
            <Form.Input
               placeholder="time"
               name="time"
               onChange={
                //  (event)=>
                //  console.log(event.target.value)
                (event) => updateObjectValues(event, trainingItemIndex)
               }
                value={trainingObject.time}
               error={error ? true : false}
               />
            <Form.Input
               placeholder="training"
               name="training"
               onChange={ (event) => updateObjectValues(event, trainingItemIndex)}
               value={trainingObject.training}
               error={error ? true : false}
               />
       </Form.Field>
      </>
    )
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
                 <Button type="button" onClick={addTraining}>Add training</Button>
                  </Form.Field>

                  <div className='list of trainings'>
                    {trainingObjects.length === 0 ? "" : trainingObjects.map((trainingObject, index) => (
                    <AddDayTraining trainingObject={trainingObject} trainingItemIndex={index} key={index}/>
                
                ))}
                </div>
                 
              
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