export interface ReservaGeneral {
  id_mesa: number;
  nombre: string;
  email: string;
  telefono?: number;
  fecha_hora: string;
  cantidad: number;
  mensaje?: string;
}
