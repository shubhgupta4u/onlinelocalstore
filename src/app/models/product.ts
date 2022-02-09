export interface IProduct {
    _id: number;
    storeCode: string;
    store: string;
    categoryId: number;
    category: string;
    code: string;
    name: string;
    title: string;
    description: string;
    imageUrl:string;
    price:number;
    sellPrice:number;
    moreDetail: string;
    offer: string;
    offerTC: string;
    startDate: Date;
    endDate: Date;
    createDate: Date;
    lastUpdDate: Date;
    searchedCount:number;
    isActive: boolean;
    highlights: IProductHighlight[];
    specifications: IProductSpecification[];
    images: IProductImage[];
  }
  export interface IProductHighlight{
    _id: number;
    productId: number;
    highlight: string;
  }
  export interface IProductSpecification{
    _id: number;
    productId: number;
    heading: string;
    information: string;
  }
  export interface IProductImage{
    _id: number;
    productId: number;
    image: string;
    displayOrder: number;
  }
  export class SearchProducts{
    products: IProduct[];
    totalCount: number;
  }
  export class ProductHighlight implements IProductHighlight{
    _id: number;
    productId: number;
    highlight: string;
  }
  export class ProductSpecification implements IProductSpecification{
    _id: number;
    productId: number;
    heading: string;
    information: string;
  }
  export class ProductImage implements IProductImage{
    _id: number;
    productId: number;
    image: string;
    displayOrder: number;
  }