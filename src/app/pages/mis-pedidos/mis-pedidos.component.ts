import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-pedidos.component.html',
  styleUrl: './mis-pedidos.component.css'
})
export class MisPedidosComponent implements OnInit {

  listaHistorial: any[] = [];

  // === VARIABLES PARA CONTROLAR EL POPUP ===
  mostrarPopupConfirmacion: boolean = false;
  accionPendiente: string = ''; // Puede ser 'individual' o 'todos'
  indicePendiente: number = -1; // Guarda qué tarjeta exacta se va a borrar

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos() {
    const datosGuardados = localStorage.getItem('historialPedidos');
    if (datosGuardados) {
      this.listaHistorial = JSON.parse(datosGuardados);
      this.listaHistorial.reverse();
    }
  }

  // === PASO 1: ABRIR EL POPUP SEGÚN LO QUE SE QUIERA HACER ===

  prepararEliminarIndividual(index: number) {
    this.accionPendiente = 'individual';
    this.indicePendiente = index;
    this.mostrarPopupConfirmacion = true; // Mostramos el popup
  }

  prepararLimpiarHistorial() {
    this.accionPendiente = 'todos';
    this.mostrarPopupConfirmacion = true; // Mostramos el popup
  }

  // === PASO 2: EJECUTAR LA ACCIÓN SI EL USUARIO DICE "SÍ" ===

  confirmarAccion() {
    if (this.accionPendiente === 'individual') {
      // Borramos solo uno
      this.listaHistorial.splice(this.indicePendiente, 1);
      const arregloParaGuardar = [...this.listaHistorial].reverse();
      localStorage.setItem('historialPedidos', JSON.stringify(arregloParaGuardar));

    } else if (this.accionPendiente === 'todos') {
      // Borramos todos
      localStorage.removeItem('historialPedidos');
      this.listaHistorial = [];
    }

    // Al terminar, cerramos el popup
    this.cerrarPopup();
  }

  // === PASO 3: CANCELAR (SI EL USUARIO DICE "NO") ===

  cerrarPopup() {
    this.mostrarPopupConfirmacion = false;
    this.accionPendiente = '';
    this.indicePendiente = -1;
  }
  formatearDinero(valor: number): string {
    if (valor === undefined || isNaN(valor)) return '';
    return '$' + valor.toLocaleString('es-CL');
  }
}