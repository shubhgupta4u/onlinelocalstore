export interface ICategory {
    _id: number;
    name: string;
    parentId: number;
    displayOrder: number;
    isActive: boolean;
  }
  export class Category implements ICategory {
    _id: number;
    name: string;
    parentId: number;
    displayOrder: number;
    isActive: boolean;
    childCategories: Category[];
  }