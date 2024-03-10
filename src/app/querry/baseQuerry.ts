

export abstract class BaseQuerry<T> {
    page? : number;
    perPage? : number;
    value? : string | string[] | number | number[];
    target? :  string | T
}