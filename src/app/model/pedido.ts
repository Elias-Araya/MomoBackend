export interface ProductPedido {
  sku: number;
  cantidad: number;
}

export interface Pedido {
  id_usuario: number;
  fecha: string;
  productos: ProductPedido[];
}
