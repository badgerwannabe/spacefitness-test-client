import {useState} from 'react'

export const useForm = (callback, initialState={})=>{
    const [values, setValues] = useState(initialState);

    const onChange = (event, result)=>{
        const { name, value } = result || event.target;
        console.table(values)
        setValues({ ...values, [name]: value });
    };
    
    const onSubmit = (event) =>{
        event.preventDefault();
        callback();
      //test
    
    };
    return {
        onChange,
        onSubmit,
        values
    }
}


