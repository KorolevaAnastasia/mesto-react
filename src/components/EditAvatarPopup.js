import React from 'react';
import {useForm} from "react-hook-form";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const ref = React.useRef();
  const {register, formState: { errors, isValid }, handleSubmit, reset} = useForm({
    mode: 'onBlur'
  });

  React.useEffect(() => {
    ref.current.value = '';
  }, [props.isOpen]);

  function onSubmit() {
    props.onUpdateAvatar({
      avatar: ref.current.value
    });
    reset();
  }

  return(
    <PopupWithForm
      title={'Обновить аватар'}
      name={'avatar'}
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
        <input id="avatar-input"
               {...register('avatar', {
                 required: 'Введите URL.'
               })}
               className={`popup__input popup__input_type_avatar ${errors?.avatar ? 'popup__input_type_error' : ''}`}
               type="url"
               placeholder="Ссылка на картинку"
               ref={ref}/>
        <span className={`avatar-input-error popup__error ${errors?.avatar ? 'popup__error_visible' : ''}`}>
          {errors?.avatar?.message}
        </span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
