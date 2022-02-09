export interface IStore {
    _id: number;
    name: string;
    storeCode: string;
    description: string;
    sellerId: number;
    sellerName: string;
    sellerDescription: string;
    categoryId: number;
    category: string;
    startDate: Date;
    endDate: Date;
    createDate: Date;
    lastUpdDate: Date;
    isActive: boolean;
    isSelected: boolean;
  }
  export class Store implements IStore {
    _id: number;
    name: string;
    storeCode: string;
    description: string;
    sellerId: number;
    sellerName: string;
    sellerDescription: string;
    categoryId: number;
    category: string;
    startDate: Date;
    endDate: Date;
    createDate: Date;
    lastUpdDate: Date;
    isActive: boolean;
    isSelected: boolean;
  }
  