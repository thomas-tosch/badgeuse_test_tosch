/**
 * variable dependecies for communication of express to angular
 */
export interface Auth {
  pieReason: string;
  title: string;
  message: string;
  success: boolean;
  token: string;
  user: string;
  list: string;
  pieData: number;
  errorToken: boolean;
}
