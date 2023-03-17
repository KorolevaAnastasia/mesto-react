import * as React from "react";
import {useController} from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

function Input(props) {
  const { field, fieldState } = useController(props);

  return (
    <>
      <input id={props.id}
             name={props.name}
             placeholder={props.placeholder}
             className={`popup__input popup__input_type_${props.name} ${fieldState.invalid ? 'popup__input_type_error' : ''}`}
             type={props.type}
             value={props.value}
             onChange={props.onChange}
             {...field}
      />
      <ErrorMessage errors={props.errors} name={props.name}
                    render={({ message }) =>
                      <span className={`${props.name}-input-error popup__error ${fieldState.invalid ? 'popup__error_visible' : ''}`}>{message}</span>
                    }
      />
    </>
  )
}

export default Input;
