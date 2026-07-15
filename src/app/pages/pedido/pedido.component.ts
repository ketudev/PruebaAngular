import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent {

  // ================= 1. ESTADO DEL CLIENTE =================
  cliente = {
    nombre: '',
    email: '',
    telefono: '+569', // <- ¡El truco de las páginas bacanes!
    metodoEntrega: 'retiro',
    direccion: '',
    metodoPago: ''
  };

  // ================= 2. CATÁLOGO DE PRODUCTOS =================
  // Aquí están tus productos con sus imágenes correspondientes
  catalogo = [
    { id: 1, nombre: 'Caja de Galletas (8)', imagen: 'galletas.jpg', precio: '$4.000' },
    { id: 2, nombre: 'Tarta Tres Leches', imagen: 'tarta.jpg', precio: '$15.000' },
    { id: 3, nombre: 'Caja de Medialunas', imagen: 'medialuna.jpg', precio: '$7.000' }
  ];

  // ================= 3. VARIABLES DE CONTROL =================
  productoActivo: any = null;
  cantidadElegida: number = 1;
  precioProducto: number = 0; // Variable para almacenar el precio del producto seleccionado
  listaPedido: any[] = [];

  errorCliente: string = '';
  errorProducto: string = '';
  mostrarPopupExito: boolean = false; // Controla el modal de éxito al enviar

  // ================= 4. FUNCIONES DEL CARRITO =================

  seleccionarProducto(prod: any) {
    this.productoActivo = prod;
    this.cantidadElegida = 1;
    this.errorProducto = '';
    this.precioProducto = prod.precio; // Actualizamos el precio del producto seleccionado
  }

  agregarAlCarrito() {
    if (!this.productoActivo) {
      this.errorProducto = 'Por favor, selecciona un producto primero.';
      return;
    }
    if (this.cantidadElegida < 1) {
      this.errorProducto = 'La cantidad mínima es 1.';
      return;
    }

    // MAGIA: Limpiamos el string '$4.000' -> quitamos el '$' y el '.' -> queda '4000' -> lo pasamos a Número
    const precioLimpio = this.productoActivo.precio.replace('$', '').replace(/\./g, '');
    const precioNumerico = parseInt(precioLimpio, 10);
    const subtotal = precioNumerico * this.cantidadElegida;

    this.listaPedido.push({
      producto: this.productoActivo.nombre,
      cantidad: this.cantidadElegida,
      subtotal: subtotal // Guardamos el valor numérico limpio
    });

    // Limpiamos la selección tras agregar al carrito
    this.productoActivo = null;
    this.cantidadElegida = 1;
    this.errorProducto = '';
  }

  eliminarItem(index: number) {
    this.listaPedido.splice(index, 1);
  }

  // Suma todos los subtotales de la lista
  calcularTotalPedido(): number {
    let total = 0;
    for (let item of this.listaPedido) {
      total += item.subtotal;
    }
    return total;
  }

  // Vuelve a poner el formato chileno con el punto de miles y el signo peso
  formatearDinero(valor: number): string {
    return '$' + valor.toLocaleString('es-CL');
  }



  // ================= 5. VALIDACIONES LÓGICAS =================

  // ================= 5. VALIDACIONES LÓGICAS ESTRICTAS =================

  validarEmailEstructura(email: string): boolean {
    // Regex validada en clases: exige texto sin espacios, un arroba, un dominio, un punto y una extensión.
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(email);
  }

  validarTelefono(tel: string): boolean {
    // Regex Chilena Estricta: Obliga a que empiece literalmente con "+569" 
    // y sea seguido por exactamente 8 dígitos (\d{8}). Ni uno más, ni uno menos.
    const patronTel = /^\+569\d{8}$/;
    return patronTel.test(tel);
  }

  // ================= 6. ENVÍO Y GUARDADO FINAL =================

  enviarPedidoFinal() {
    // Limpiamos errores previos
    this.errorCliente = '';

    // Validamos Nombre
    if (this.cliente.nombre.trim() === '' || this.cliente.nombre.length > 30) {
      this.errorCliente = 'El Nombre es obligatorio y no debe superar los 30 caracteres.';
      return;
    }

    // Validamos Email
    if (this.cliente.email.trim() === '' || !this.validarEmailEstructura(this.cliente.email)) {
      this.errorCliente = 'Por favor, ingresa un correo electrónico válido.';
      return;
    }

    // Validamos Teléfono
    if (this.cliente.telefono.trim() === '' || !this.validarTelefono(this.cliente.telefono)) {
      this.errorCliente = 'El teléfono debe tener formato chileno (+569 seguido de 8 números).';
      return;
    }

    // Validamos Dirección (Solo si eligió Despacho)
    if (this.cliente.metodoEntrega === 'despacho' && this.cliente.direccion.trim().length < 5) {
      this.errorCliente = 'Has seleccionado Despacho. La dirección es obligatoria.';
      return;
    }

    // Validamos Método de Pago
    if (this.cliente.metodoPago === '') {
      this.errorCliente = 'Debes seleccionar un método de pago.';
      return;
    }

    // Validamos Productos en el Carrito
    if (this.listaPedido.length === 0) {
      this.errorCliente = 'Debes agregar al menos un Producto a tu lista.';
      return;
    }

    // Creamos el objeto exacto que guardaremos en memoria
    const nuevoPedido = {
      idPedido: Math.random().toString(36).substring(2, 9).toUpperCase(),
      fecha: new Date().toLocaleDateString(),
      nombre: this.cliente.nombre,
      email: this.cliente.email,
      telefono: this.cliente.telefono,
      metodoEntrega: this.cliente.metodoEntrega,
      direccion: this.cliente.metodoEntrega === 'despacho' ? this.cliente.direccion : 'Retiro en Local',
      metodoPago: this.cliente.metodoPago,
      total: this.formatearDinero(this.calcularTotalPedido()), // <-- ¡Agregamos el Total aquí!
      productos: [...this.listaPedido]
    };

    // Rescatamos el historial del navegador o creamos uno nuevo si está vacío
    const datosPrevios = localStorage.getItem('historialPedidos');
    let historial = datosPrevios ? JSON.parse(datosPrevios) : [];

    // Agregamos el nuevo pedido y guardamos
    historial.push(nuevoPedido);
    localStorage.setItem('historialPedidos', JSON.stringify(historial));

    // Desplegamos el popup de éxito y vaciamos todo para un nuevo pedido
    this.mostrarPopupExito = true;
    this.resetearFormulario();
  }

  // ================= 7. UTILIDADES =================

  resetearFormulario() {
    this.cliente = {
      nombre: '',
      email: '',
      telefono: '',
      metodoEntrega: 'retiro',
      direccion: '',
      metodoPago: ''
    };
    this.listaPedido = [];
    this.productoActivo = null;
    this.errorCliente = '';
    this.errorProducto = '';
  }

  cerrarPopup() {
    this.mostrarPopupExito = false;
  }
}