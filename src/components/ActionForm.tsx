import React from 'react';

//react 19 allows you to pass in a function to the form action attribute, making it easy to access form data without having to use react state.
const ActionForm = () => {
  //this function allows you to access the formData directly. just create the function and set it as the action attribute in the form.

  //note: Must assign 'value' attribute to radio, checkbox, and option inputs. if you want to grab data from somewhere there can be multiple inputs (e.g. in this form, dietary restrictions), use formData.getAll and it will return an array of all the values.

  function signUp(formData) {
    //grabbing data one line at a time:
    const email = formData.get('email');
    const password = formData.get('password');
    const employmentStatus = formData.get('employmentStatus');
    const dietaryRestrictions = formData.getAll('dietaryRestrictions');
    const favColor = formData.get('favColor');

    //grabbing data more efficiently if needed:
    const data = Object.fromEntries(formData);
    //however, if you have something with multiple answers, such as dietaryRestrictions, you have to grab it, then create a new object and override the the value of the one with multiple answers. otherwise, the one with multiple answers only returns one answer.
    const allData = { ...data, dietaryRestrictions };
  }
  return (
    <form action={signUp}>
      <label htmlFor='email'>Email:</label>
      <input
        id='email'
        defaultValue='joe@schmoe.com'
        type='email'
        name='email'
        placeholder='joe@schmoe.com'
      />

      <label htmlFor='password'>Password:</label>
      <input
        id='password'
        defaultValue='password123'
        type='password'
        name='password'
      />

      <label htmlFor='description'>Description:</label>
      <textarea
        id='description'
        name='description'
        defaultValue='This is a description'
      ></textarea>

      <fieldset>
        <legend>Employment Status:</legend>
        <label>
          <input type='radio' name='employmentStatus' value='unemployed' />
          Unemployed
        </label>
        <label>
          <input type='radio' name='employmentStatus' value='part-time' />
          Part-time
        </label>
        <label>
          <input
            type='radio'
            name='employmentStatus'
            defaultChecked={true}
            value='full-time'
          />
          Full-time
        </label>
      </fieldset>

      <fieldset>
        <legend>Dietary restrictions:</legend>
        <label>
          <input type='checkbox' name='dietaryRestrictions' value='kosher' />
          Kosher
        </label>
        <label>
          <input type='checkbox' name='dietaryRestrictions' value='vegan' />
          Vegan
        </label>
        <label>
          <input
            type='checkbox'
            name='dietaryRestrictions'
            defaultChecked={true}
            value='gluten-free'
          />
          Gluten-free
        </label>
      </fieldset>

      <label htmlFor='favColor'>What is your favorite color?</label>
      <select id='favColor' name='favColor' defaultValue='indigo'>
        <option value='' disabled>
          Choose a color
        </option>
        <option value='red'>Red</option>
        <option value='orange'>Orange</option>
        <option value='yellow'>Yellow</option>
        <option value='green'>Green</option>
        <option value='blue'>Blue</option>
        <option value='indigo'>Indigo</option>
        <option value='violet'>Violet</option>
      </select>

      <button>Submit</button>
    </form>
  );
};

export default ActionForm;
