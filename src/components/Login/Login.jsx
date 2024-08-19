import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/operation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./Login.module.css";
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

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const onSubmit = data => {
    dispatch(login({
      email: data.email,
      password: data.password,
    }))
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.container} action="">
      <div className={css.textBlock}>
        <h2 className={css.title}>Log In</h2>
        <p className={css.text}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for an teacher.
        </p>
      </div>
      <div className={css.containerInput}>
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
        <button className={css.btn} type="submit">
          Log In
        </button>
      </div>
    </form>
  );
};

export default Login;
