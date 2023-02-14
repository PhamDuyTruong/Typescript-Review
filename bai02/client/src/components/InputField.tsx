import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

interface InputFieldProps{
    name: string,
    label: string,
    placeholder: string,
    type: string,
    textarea?:boolean
}

const InputField = (props: InputFieldProps) => {
    const [field, {error}] = useField(props);
  return (
    <FormControl>
        <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
        {props.textarea ? (<Textarea {...field} id={field.name} {...props}/>) : 
          (<Input {...field} id={field.name} {...props}></Input>)
        }
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

export default InputField