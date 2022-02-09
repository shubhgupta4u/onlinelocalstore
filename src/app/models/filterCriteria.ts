export class filterCriteria{
    categoryId:number;
    category:string;
    sellerId:number;
    storeId:number[];
    searchText: string;
    storeName: string;
    priceFrom: number;
    priceTo: number;
    sortBy: string ="PopularityFirst";
    pageNo: number = 1;
    pageSize: number = 10;
}