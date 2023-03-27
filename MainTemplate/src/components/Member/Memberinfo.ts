export interface Entity {
  id: number;
  text?: string;
  value?: number;
}

export interface User extends Entity {
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  mobile: string;
  homephone: string;
  workphone: string;
}