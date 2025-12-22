export interface LoginSuccessResponse {
  message: string;
  data: {
    _id: string;
    email: string;
    token: string;
    createdAt: string;
  };
}

export interface LoginFormProps {
  email: string;
  password: string;
}
