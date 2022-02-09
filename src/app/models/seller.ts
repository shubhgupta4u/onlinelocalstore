export interface ISeller {
    _id: number;
    name: string;
    firstName: string;
    lastName: string;
    description: string;
    phone: string;
    createDate: Date;
    lastUpdDate: Date;
    isActive: boolean;
  }
  export class Seller implements ISeller {
    _id: number;
    name: string;
    firstName: string;
    lastName: string;
    description: string;
    password: string;
    email: string;
    phone: string;
    createDate: Date;
    lastUpdDate: Date;
    isActive: boolean;
    constructor(name, firstName, lastName,phone,email,password){
        this.name = name;
        this.email = email;
        this.firstName= firstName;
        this.password= password;
        this.lastName= lastName;
        this.phone= phone;
    }
  }
  