import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent {
  nombreCliente = '';
  producto = '';
  cantidad: number | null = null;
  comentarios = '';
  pedidoGuardado: {
    nombreCliente: string;
    producto: string;
    cantidad: number;
    comentarios: string;
  } | null = null;

  enviarPedido(formPedido: NgForm) {
    if (formPedido.invalid) {
      return;
    }

    this.pedidoGuardado = {
      nombreCliente: this.nombreCliente.trim(),
      producto: this.producto,
      cantidad: this.cantidad ?? 0,
      comentarios: this.comentarios.trim()
    };

    formPedido.resetForm();
    this.nombreCliente = '';
    this.producto = '';
    this.cantidad = null;
    this.comentarios = '';
  }
}
