import React from 'react';
import {useForm} from "react-hook-form";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  const {register, formState: { errors, isValid }, handleSubmit, reset} = useForm({
    mode: 'onBlur',
  });

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function onSubmit() {
    props.onAddPlace({
      name: name,
      link: link
    });
    reset();
  }

  return(
    <PopupWithForm
      title={'Новое место'}
      name={'card'}
      buttonText={'Создать'}
      loadingButtonText={'Сохранение...'}
      isLoading={props.isLoading}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverlayClick={props.onOverlayClick}
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
    >
      <label className="popup__field">
        <input id="card-input"
               {...register('name', {
                 required: 'Поле обязательно для заполнения',
                 minLength: {
                   value: 2,
                   message: 'Минимум 2 символа.'
                 },
                 maxLength: {
                   value: 30,
                   message: 'Максимум 30 символов.'
                 },
               })}
               className={`popup__input popup__input_type_card ${errors?.name ? 'popup__input_type_error' : ''}`}
               type="text"
               placeholder="Название"
               value={name ?? ''}
               onChange={handleNameChange}/>
        <span className={`card-input-error popup__error ${errors?.name ? 'popup__error_visible' : ''}`}>
          {errors?.name?.message}
        </span>
      </label>
      <label className="popup__field">
        <input id="link-input"
               {...register('link', {
                 required: 'Введите URL.',
               })}
               className={`popup__input popup__input_type_link ${errors?.link ? 'popup__input_type_error' : ''}`}
               type="url"
               placeholder="Ссылка на картинку"
               value={link ?? ''}
               onChange={handleLinkChange}/>
          <span className={`link-input-error popup__error ${errors?.link ? 'popup__error_visible' : ''}`}>
            {errors?.link?.message}
          </span>
        }
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
