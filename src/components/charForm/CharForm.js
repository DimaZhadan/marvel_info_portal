import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useState } from 'react';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charForm.scss';

const CharForm = () => {
   const [char, setChar] = useState(null);
   const { loading, error, getCharacterByName, cleareError } = useMarvelService();

   const onCharLoaded = (char) => {
      setChar(char);
   }

   const updateChar = (name) => {
      cleareError();

      getCharacterByName(name)
         .then(onCharLoaded);
   }

   const errorMessage = error ? <div className='form__error'><ErrorMessage /></div> : null;
   const results = !char ? null : char.length > 0 ?
      <div className="form__done">
         <div className="form__done-description">There is! Visit {char[0].name} page?</div>
         <Link to={`/characters/${char[0].id}`} className="button button__secondary">
            <div className="inner">To page</div>
         </Link>
      </div> :
      <div className="form__error">
         The character was not found. Check the name and try again
      </div>;

   return (
      <div className="form">
         <Formik
            initialValues={{
               charName: ''
            }}
            validationSchema={Yup.object({
               charName: Yup.string().required('This field is required')
            })}
            onSubmit={({ charName }) => {
               updateChar(charName);
            }}
            validateOnChange={false}
         >
            <Form>
               <div>
                  <label htmlFor="charName" className='form__lable'>
                     Or find a character by name:
                  </label>
                  <div className="form__wrapper">
                     <Field
                        id="charName"
                        className="form__input"
                        type="text"
                        name="charName"
                        placeholder="Enter name" />
                     <button
                        className="button button__main"
                        type='submit'
                        disabled={loading}>
                        <div className="inner">FIND</div>
                     </button>
                  </div>
                  <FormikErrorMessage name="charName" component="div" className='form__error' />
               </div>
            </Form>
         </Formik>
         {results}
         {errorMessage}
      </div>
   )
}

export default CharForm;