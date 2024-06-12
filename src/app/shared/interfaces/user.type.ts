export interface UserCredentials {
    id: number;
    username: string;
    password: string;
    token?: string;
}
export interface User1 {
    uid?: string;
    email: string | null; 
    displayName: string;
    name: string | null;
    apellidoMaterno: string;
    apellidoPaterno: string | null;
    photoURL?: string;
    calle?:string;
    claveCliente?:string;
    codigoPostal?:string;
    colonia?:string;
    estado?:string;
    telefono?: string;
    emailVerified?: boolean;
    fechaNacimiento?:string;
    numero?:string;
    roles?: string[];
    rolId?:string;    
    active?:boolean;

  }

  export enum Role {
    user = 'usuario',
    alumno = 'alumno',   
    admin = 'admin'
  } 
