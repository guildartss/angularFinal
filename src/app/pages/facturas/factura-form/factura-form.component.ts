import { Component, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Factura } from '../../../interfaces/factura.interface';

@Component({
  selector: 'app-factura-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './factura-form.component.html',
  styleUrls: ['./factura-form.component.css']
})
export class FacturaFormComponent implements OnInit {
  form!: FormGroup;
  esEdicion = false;
  id?: number;
OnNewfactura = output<Factura>();
  cliente: any;
  total: any;
  producto: any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    // private router: Router,                    // <-- INYECTA Router
    // private facturaService: FacturaService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.esEdicion = !!this.id;
    this.form = this.fb.group({
      cliente: ['', Validators.required],
      fecha: [''],
      producto: [''],
      total: [0, Validators.required],
    });
  }

  guardar() {
    const newfactura: Factura = {
      id: this.id ?? 0,
      cliente: this.form.value.cliente ?? '',
      fecha: this.form.value.fecha ?? '',
      producto: this.form.value.producto ?? '',
      total: this.form.value.total ?? 0,
    };
    this.OnNewfactura.emit(newfactura);
  }  
}
