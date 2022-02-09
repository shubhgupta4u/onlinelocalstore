export interface INavigationHistory {
    id:number;
    parentId:number;
    route: string;
    name: string;
    displayOrder: number
  }
  export class NavigationHistory implements INavigationHistory {
    id:number;
    parentId:number;
    route: string;
    name: string;
    displayOrder: number
    constructor(id:number,parentId:number, name: string,route: string,displayOrder: number) {
        this.name = name;
        this.id = id;
        this.parentId = parentId;
        this.route = route;
        this.displayOrder= displayOrder
    }
}
  