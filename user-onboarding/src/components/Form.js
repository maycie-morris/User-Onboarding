import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import UserCard from './UserCard';


// Validation Using Yup

const formSchema = yup.object().shape({
    name: yup
        .string()
        .required("Name is a required field"),
    email: yup
        .string()
        .email("Must be a valid email address")
        .required("Email is a required field"),
    password: yup
        .string()
        .min(5, "Password must be at least 5 characters")
        .required("Must include a password"),
    terms: yup
        .boolean()
        .oneOf([true], "Please agree to the Terms of Service")
        .required("You must accept the Terms of Service"),
})

// Form Function

function Form() {

    const [userList, setUserList] = useState([]);

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms: false
    });

const [buttonDisabled, setButtonDisabled] = useState(true);

useEffect(() => {
    formSchema.isValid(formState).then(valid => {
        setButtonDisabled(!valid);
    });
}, [formState]);

const [errorState, setErrorState] = useState({
    name: "",
    email: "",
    password: "",
    terms: ""
});

const validate = e => {
    let value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then(valid => {
          setErrorState({
              ...errorState,
              [e.target.name]: ""
          })
      })
      .catch(err => {
          setErrorState({
              ...errorState,
              [e.target.name]: err.errors[0]
          });
      });
};

// onChange function

const inputChange = e => {
    e.persist();
    validate(e);
    let value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({...formState, [e.target.name]: value});
};

const formSubmit = e => {
    e.preventDefault();
    axios
        .post("https://reqres.in/api/users", formState)
        .then(response => {
            const apiReturn = response.data
            console.log(response.data)
            setUserList([...userList, apiReturn])
            setFormState(formState)
        })
        .catch(err => console.log(err));
};

return (
    <div>
    <form onSubmit={formSubmit}>
    <div className="name-div">
        <label htmlFor="name">
            Name
            <input
                type="text"
                name="name"
                id="name"
                value={formState.name}
                onChange={inputChange}
                />
                {errorState.name.length > 0 ? (
                    <p className="error">{errorState.name}</p>
                ) : null}
        </label>
        </div>
        <div className="email-div">
        <label htmlFor="email">
            Email
            <input
                type="email"
                name="email"
                id="email"
                value={formState.email}
                onChange={inputChange}
                />
                {errorState.email.length > 0 ? (
                    <p className="error">{errorState.email}</p>
                ) : null}
        </label>
        </div>
        <div className="password-div">
        <label htmlFor="password">
            Password
            <input
                type="password"
                name="password"
                id="password"
                value={formState.password}
                onChange={inputChange}
            />
            {errorState.password.length < 0 ? (
                    <p className="error">{errorState.password}</p>
                ) : null}
        </label>
        </div>
        <div className="terms-div">
        <label htmlFor="terms">
                <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={formState.terms}
                    onChange={inputChange}
                />
                {errorState.terms.length > 0 ? (
                    <p className="error">{errorState.terms}</p>
                ) : null}
                I agree to the Terms of Service
            </label>
            </div>
            <div className="button-div">
        <button disabled={buttonDisabled}>Submit</button>
        </div>
    </form>
    <div className="user-card-div">
    <UserCard users={userList} />
    </div>
    </div>
);

};

export default Form
