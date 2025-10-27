import { Injectable, signal } from '@angular/core';
import { Supplier } from '../interfaces/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private suppliers = signal<Supplier[]>([
    { 
      id: 1, 
      name: 'TechCorp', 
      email: 'contact@techcorp.com',
      phone: '+1-555-0101'
    },
    { 
      id: 2, 
      name: 'OfficeMax', 
      email: 'info@officemax.com',
      phone: '+1-555-0102'
    }
  ]);

  private nextId = signal(3);

  // Methods

  getSuppliers(){
    return this.suppliers.asReadonly();
  }

  getSupplierById(id: number): Supplier | undefined{
    return this.suppliers().find(s => s.id === id);
  }

  addSupplier(supplierData: Omit<Supplier, 'id'>){
    const newSupplier: Supplier = {
      id: this.nextId(),
      ...supplierData
    };

    this.suppliers.update(list => [...list, newSupplier]);
    this.nextId.update(id => id + 1);
  }

  deleteSupplier(id: number){
    this.suppliers.update(list => list.filter(s => s.id !== id));
  }

  updateSupplier(updatedSupplier: Supplier){
    this.suppliers.update(list => list.map(
      s => s.id === updatedSupplier.id ? s: updatedSupplier)
    );
  }
}
