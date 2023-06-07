export interface Reserva {
  id_mesa: number;
  id_usuario: number;
  fecha_hora: string;
  cantidad: number;
  mensaje?: string;
}
