import { tipo } from '../enums/tipo.enum';
export interface ItemMenu {
  tipo: tipo;
  nombre: string;
  options: object;
  url: string;
}
