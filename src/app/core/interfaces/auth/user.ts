export interface User {
  success: boolean;
  message: string;
  title: string;
  data: {
    firstName: string;
    lastName: string;
    jwt: string;
  };
}
