import { useEffect } from "react";
import { Control, SubmitHandler, useForm } from "react-hook-form";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Button, { HTMLButtonType } from "../components/Buttons/Button";
import TextField, { TextFieldTypes } from "../components/forms/TextField";
import PageHeading from "../components/typography/PageHeading";
import { InputType } from "../constants/inputType";
import {
  MeDocument,
  MeQuery,
  useLoginMutation,
  useMeQuery,
} from "../generated/graphql";
import { urlResolver } from "../lib/UrlResolver";
import snakeToCamelCase from "../utils/snakeToCamelCase";
import { Error } from "../components/skeletons/Error";

enum FormNames {
  USERNAME = "username",
  PASSWORD = "password",
}

interface FormValues {
  username: string;
  password: string;
}

interface UserError {
  field?: string | null | undefined;
  message?: string;
}

type FormFields = keyof FormValues;

const useLoginForm = (user: FormValues, navigate: NavigateFunction) => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: user,
  });

  // Login User
  const [login, { loading, error }] = useLoginMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // prevent page-navigation-modal from showing as this is the login page

    const { username, password } = data;

    const result = await login({
      variables: { input: { username, password } },
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: "Query",
            me: data?.login.user,
          },
        });
      },
    });

    if (result.data?.login.user) navigate("/"); // let use effect do the redirect
    // handle errors
    const resultUserErrors: UserError[] = result.data?.login?.errors || [];
    resultUserErrors.map(({ field, message }) => {
      const camelKey = snakeToCamelCase(field as string);
      const errorKey: FormFields | null = Object.keys(data).find(
        (field) => camelKey === field
      )
        ? (camelKey as FormFields)
        : null;
      if (errorKey) {
        setError(errorKey, { message, type: "server" });
      }
    });
  };

  const submitForm = handleSubmit(onSubmit);
  return {
    loading,
    error,
    register,
    submitForm,
    errors,
    control,
    reset,
    setValue,
  };
};

const LoginPage = () => {
  const { data, loading: meLoading } = useMeQuery();

  const navigate = useNavigate();

  // setup form
  const {
    errors,
    submitForm,
    control,
    loading: loginLoading,
    error: loginError,
  } = useLoginForm(
    {
      username: "",
      password: "",
    },
    navigate
  );

  // prevent from logging in when already logged in
  useEffect(() => {
    if (data?.me) {
      navigate("/");
    }
  }, [data?.me, meLoading, navigate]);

  return (
    <div className="flex flex-row items-center h-[70vh] absolute top-0 bottom-0 left-0 right-0">
      <main className="overflow-auto flex-1">
        <div className="ml-12 mr-12">
          <div className="flex flex-col justify-between items-center w-full mb-17">
            <PageHeading heading="Login" />

            <form onSubmit={submitForm}>
              <div className="flex flex-col items-start">
                <TextField
                  required
                  name={FormNames.USERNAME}
                  control={control as unknown as Control}
                  containerClass="w-full sm:w-80"
                  placeholder="Username"
                  label="Username"
                  type={TextFieldTypes.OUTLINED}
                  extraClass="w-full"
                  labelClass="mt-4.5 mb-2"
                  error={errors[FormNames.USERNAME]}
                />
                <TextField
                  required
                  name={FormNames.PASSWORD}
                  control={control as unknown as Control}
                  containerClass="w-full sm:w-80"
                  placeholder="Password"
                  label="Password"
                  type={TextFieldTypes.OUTLINED}
                  inputType={InputType.Password}
                  extraClass="w-full"
                  labelClass="mt-4.5 mb-2"
                  error={errors[FormNames.PASSWORD]}
                />
                <br />

                <div className="flex-col gap-2">
                  <Button
                    buttonType={HTMLButtonType.SUBMIT}
                    label="Login"
                    extraClass="w-full"
                    loading={loginLoading}
                  />
                  {loginError && <Error text={loginError.message} />}
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

LoginPage.defaultProps = {
  referer: urlResolver.index(),
};

export default LoginPage;
