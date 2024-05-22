
export interface TransactionalFunction {
  Nombre: string;
  Tipo: string;
  ComplejidadDET?: number;
  ComplejidadFTR?: number;
  PuntosFuncion?: number;
}

export interface Entity {
  Nombre: string;
  Tipo: string;
  ComplejidadDET?: number;
  ComplejidadRET?: number;
  PuntosFuncion?: number;
  FuncionesTransaccionales: TransactionalFunction[];
}

export interface Result {
  [key: string]: Entity;
}

export interface ApiResponse {
  Resultado: Result;
}
