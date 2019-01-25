//variable nesseccaire pour la comunication entre express et angular
export interface Auth {
  title: string;
  message: string;
  success: boolean;
  token: string;
  user: string;
  list: string;
}
