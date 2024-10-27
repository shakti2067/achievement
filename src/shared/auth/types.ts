export interface LoginFormProps {
  email: string;
  password: string;
}

export type SignupRequestParams = {
  username: string;
  email: string;
  password: string;
};

/*
    type that we are using as request for signup
*/

export type SignupFormProps = SignupRequestParams;
