import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "trimoverflowtext"
})
export class TrimoverflowtextPipe implements PipeTransform {
  transform(value: string, arg1: number, arg2?: number, arg3?: number): any {
    let width = window.innerWidth;
    if (value == null) {
      return "";
    }
    let limit = value.length;
    if (width < 768) {
      limit = arg3 !=null?arg3:(arg2 != null?arg2:arg1);
    } else if (width > 768 && width < 1024 - 1) {
      limit = arg2 != null?arg2:arg1;
    } else if (width > 1024) {
      limit = arg1;
    }
    if(value.length > limit){
      return value.substr(0, limit - 3) + "...";
    }
    return value;
  }
}
