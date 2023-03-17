import React from 'react';
import {useForm} from "react-hook-form";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Input from "./Input";

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);
  const { handleSubmit, control, formState: { errors, isValid }, reset} = useForm({
    mode: "onChange",
    defaultValues: {
      name: '',
      about: ''
    }
  });

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function onSubmit() {
    props.onUpdateUser({
      name: name,
      about: description,
    });
    reset();
  }

  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      name={'profile'}
      form={'profile'}
      buttonText={'Сохранить'}
      loadingButtonText={'Сохранение...'}
      isLoading={props.isLoading}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverlayClick={props.onOverlayClick}
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
    >
      <label className="popup__field">
        <Input control={control} rules={{
          required: 'Поле обязательно для заполнения.',
          minLength: {
            value: 2,
            message: 'Минимум 2 символа.'
          },
          maxLength: {
            value: 40,
            message: 'Максимум 40 символов.'
          }}}
         id={'name'}
         name={'name'}
         placeholder={'Имя'}
         type={'text'}
         value={name}
         errors={errors}
         onChange={handleNameChange}
       />
      </label>

      <label className="popup__field">
        <Input control={control} rules={{
            required: 'Поле обязательно для заполнения.',
            minLength: {
              value: 2,
              message: 'Минимум 2 символа.'
            },
            maxLength: {
              value: 200,
              message: 'Максимум 200 символов.'
            }}}
         id={'about'}
         name={'about'}
         placeholder={'Род деятельности'}
         type={'text'}
         value={description}
         errors={errors}
         onChange={handleDescriptionChange}
        />
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
