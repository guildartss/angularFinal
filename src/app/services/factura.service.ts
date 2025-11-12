import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Factura } from '../interfaces/factura.interface';
import { StorageService } from './storage.service';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FacturaService {
  private readonly KEY = 'facturas';
  private readonly URL = '/facturas.json';

  constructor(private http: HttpClient, private storage: StorageService) {
    this.cargarInicial();
  }

  private async cargarInicial() {
    if (!this.storage.get<Factura[]>(this.KEY)) {
      try {
        const data = await firstValueFrom(this.http.get<Factura[]>(this.URL));
        this.storage.set(this.KEY, data);
      } catch {
        this.storage.set(this.KEY, []);
      }
    }
  }

  getAll(): Factura[] {
    return this.storage.get<Factura[]>(this.KEY) || [];
  }

  getById(id: number): Factura | undefined {
    return this.getAll().find(f => f.id === id);
  }

  save(factura: Factura) {
    const list = this.getAll();
    if (factura.id) {
      const i = list.findIndex(f => f.id === factura.id);
      list[i] = factura;
    } else {
      factura.id = Date.now();
      list.push(factura);
    }
    this.storage.set(this.KEY, list);
  }

  delete(id: number) {
    const list = this.getAll().filter(f => f.id !== id);
    this.storage.set(this.KEY, list);
  }
}