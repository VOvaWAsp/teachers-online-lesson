import { useDispatch, useSelector } from "react-redux";
import { registered } from "../../redux/auth/operation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./Registration.module.css"
import { ErrorMessage } from '@hookform/error-message';

const schema = yup.object().shape({
  name: yup.string().min(2).max(32),
  email: yup
    .string()
    .email()
    .matches(/^(?!\@*,)/)
    .required(),
  password: yup
    .string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .max(64, "Password is too long - should be 64 chars maximum.")
    .matches(/^(?!.*\s).*$/, "Password should not contain spaces.")
    .required(),
});

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const onSubmit = data => {
    dispatch(registered({ 
        name: data.name, 
        email: data.email, 
        password: data.password,
     }));
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)} className={css.container} action="">
        <div className={css.textBlock}>
          <h2 className={css.title}>Registration</h2>
          <p className={css.text}>
            Thank you for your interest in our platform! In order to register,
            we need some information. Please provide us with the following
            information
          </p>
        </div>
        <div className={css.containerInput}>
          <div>
            <input className={css.input} type="text" placeholder="Name" {...register('name')} />
            <ErrorMessage
              name="name"
              errors={errors}
              render={({ message }) => <p className={css.error}>{message}</p>}
            />
          </div>
          <div>
            <input className={css.input} type="email" placeholder="Email" {...register('email')} />
            <ErrorMessage
              name="email"
              errors={errors}
              render={({ message }) => <p className={css.error}>{message}</p>}
            />
          </div>
          <div>
            <input className={css.input} type="password" placeholder="Password" {...register('password')} />
            <ErrorMessage
              name="password"
              errors={errors}
              render={({ message }) => <p className={css.error}>{message}</p>}
            />
          </div>
          <button className={css.btn} type="submit">Sign Up</button>
        </div>
      </form>
  );
};

export default Registration;
