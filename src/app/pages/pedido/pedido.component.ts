import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent {
  nombreCliente = '';
  email = '';
  producto = '';
  cantidad: number = 1;
  comentarios = '';
  mostrarAlertaExito: boolean = false;

  enviarPedido(formPedido: NgForm) {
    if (formPedido.invalid) {
      return;
    }

    const nuevoPedido = {
      id: Date.now(), 
      nombreCliente: this.nombreCliente.trim(),
      email: this.email.trim(),
      producto: this.producto,
      cantidad: this.cantidad && this.cantidad > 0 ? this.cantidad : 1,
      comentarios: this.comentarios.trim(),
      fecha: new Date().toLocaleDateString()
    };

    const historial = localStorage.getItem('mis_pedidos')
      ? JSON.parse(localStorage.getItem('mis_pedidos')!)
      : [];

    historial.unshift(nuevoPedido);

    localStorage.setItem('mis_pedidos', JSON.stringify(historial));

    this.mostrarAlertaExito = true;

  setTimeout(() => {
    this.mostrarAlertaExito = false;
  }, 3000);

    formPedido.resetForm();
    setTimeout(() => {
  this.nombreCliente = '';
  this.email = '';  
  this.producto = '';
  this.cantidad = 1; 
  this.comentarios = '';
},0);
}}