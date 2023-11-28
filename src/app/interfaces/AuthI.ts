export interface LoginResponseI {
  message: string;
  data: Data;
  jwt: string;
  successful: boolean;
}
export interface Data {
    adminId:       string;
    adminName:     string;
    adminLastName: string;
    adminPhone:    string;
    adminEmail:    string;
}
