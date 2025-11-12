import { TestBed } from '@angular/core/testing';
import { FacturaService } from '../factura.service';
import { StorageService } from '../storage.service';
import { Factura } from '../../interfaces/factura.interface';
import { describe, it, beforeEach, expect } from '@jest/globals';

describe('FacturaService', () => {
  let service: FacturaService;
  let storage: StorageService;

  const mockFacturas: Factura[] = [
    { id: 1, cliente: 'María López', fecha: '2025-11-10', producto: 'Arroz 1kg', total: 15 },
    { id: 2, cliente: 'Pedro Gómez', fecha: '2025-11-11', producto: 'Aceite 1L', total: 28 }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacturaService, StorageService]
    });
    service = TestBed.inject(FacturaService);
    storage = TestBed.inject(StorageService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all facturas from storage', () => {
    storage.set('facturas', mockFacturas);
    const result = service.getAll();
    expect(result.length).toBe(2);
    expect(result[0].cliente).toBe('María López');
  });

  it('should get factura by ID', () => {
    storage.set('facturas', mockFacturas);
    const result = service.getById(2);
    expect(result).toEqual(mockFacturas[1]);
  });

  it('should save a new factura', () => {
    const nueva: Factura = { id: 3, cliente: 'Luis Martínez', fecha: '2025-11-12', producto: 'Harina 1kg', total: 20 };
    service.save(nueva);
    const list = storage.get<Factura[]>('facturas');
    expect(list!.length).toBe(1);
    expect(list![0].cliente).toBe('Luis Martínez');
  });

  it('should update an existing factura', () => {
    storage.set('facturas', [...mockFacturas]);
    const updated: Factura = { ...mockFacturas[0], total: 99 };
    service.save(updated);
    const list = storage.get<Factura[]>('facturas');
    expect(list![0].total).toBe(99);
  });

  it('should delete factura by ID', () => {
    storage.set('facturas', [...mockFacturas]);
    service.delete(1);
    const list = storage.get<Factura[]>('facturas');
    expect(list!.length).toBe(1);
    expect(list![0].id).toBe(2);
});
}

