import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {
  listaPedidos: any[] = [];

  pedidoParaEliminar: number | null = null;
  
  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.listaPedidos = [];

    const datos = localStorage.getItem('mis_pedidos');
    if (datos) {
      try {
        const pedidosGuardados = JSON.parse(datos);
        this.listaPedidos = Array.isArray(pedidosGuardados) ? pedidosGuardados : [pedidosGuardados];
      } catch (error) {
        console.error('No se pudieron leer los pedidos guardados:', error);
      }
    }

    const pedidoGuardado = localStorage.getItem('pedidoGuardado');
    if (pedidoGuardado) {
      try {
        const pedido = JSON.parse(pedidoGuardado);
        const pedidoFormateado = {
          id: pedido.id ?? Date.now(),
          fecha: pedido.fecha ?? new Date().toLocaleDateString('es-CL'),
          nombreCliente: pedido.nombreCliente ?? '',
          email: pedido.email ?? '',
          producto: pedido.producto ?? '',
          cantidad: pedido.cantidad ?? 0,
          comentarios: pedido.comentarios ?? ''
        };

        const yaExiste = this.listaPedidos.some((item: any) => item.id === pedidoFormateado.id);
        if (!yaExiste) {
          this.listaPedidos.unshift(pedidoFormateado);
        }
      } catch (error) {
        console.error('No se pudo leer el pedido guardado:', error);
      }
    }

    this.guardarPedidos();
  }

  private guardarPedidos(): void {
    localStorage.setItem('mis_pedidos', JSON.stringify(this.listaPedidos));
  }

  eliminarPedido(id: number): void {
    this.pedidoParaEliminar = id;
  }

  cancelarEliminacion(): void {
    this.pedidoParaEliminar = null;
  }

  confirmarEliminacion(): void {
    if (this.pedidoParaEliminar === null) return;
    this.listaPedidos = this.listaPedidos.filter(pedido => pedido.id !== this.pedidoParaEliminar);
    this.guardarPedidos();
    this.pedidoParaEliminar = null;
  }
}
