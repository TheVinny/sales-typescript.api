declare namespace Express {
  //realizando um override do Express na interface request e adicionando o user.id
  export interface Request {
    user: {
      id: string;
    };
  }
}
