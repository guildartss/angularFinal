import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../../services/factura.service';
import { Factura } from '../../../interfaces/factura.interface';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-facturas-list',
  imports: [RouterLink, CommonModule],
  standalone: true,
  templateUrl: './facturas-list.component.html',
  styleUrls: ['./facturas-list.component.css']
})
export class FacturasListComponent implements OnInit {
  facturas: Factura[] = [];

  constructor(private service: FacturaService) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.facturas = this.service.getAll();
  }

  borrar(id: number) {
    if (confirm('¿Borrar esta venta?')) {
      this.service.delete(id);
      this.cargar();
    }
  }
}