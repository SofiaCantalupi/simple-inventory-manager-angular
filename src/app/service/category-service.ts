import { Injectable, signal } from '@angular/core';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories = signal<Category[]>([
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Furniture' },
    { id: 3, name: 'Office Supplies' }
  ]);

  private nextId = signal(4);
  // Methods
  getCategories() {
    return this.categories.asReadonly();
  }

  getCategoryById(id: number): Category | undefined {
    return this.categories().find((c) => c.id === id);
  }

  addCategory(categoryData: Omit<Category, 'id'>) {
    const newCategory: Category = {
      id: this.nextId(),
      ...categoryData
    };

    this.categories.update(list =>[...list, newCategory]);
    this.nextId.update(id => id + 1);
  }

  deleteCategory(id: number){
    this.categories.update(list => list.filter(c => c.id !== id));
  }

  update(updatedCategory: Category){
    this.categories.update(list => list.map(
      category => category.id === updatedCategory.id ? category : updatedCategory
    ));
  }
}
