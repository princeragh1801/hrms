import { SortedOrder } from "./enums"

export interface Response<T>{
    success:boolean,
    data : T,
    message : string
}
export interface Combo{
    id : number,
    name : string,
}
export interface PaginationRequest{
    pageIndex : number,
    pagedItemsCount : number,
    search : string,
    orderKey : string,
    sortedOrder : SortedOrder
}
export interface PaginationResponse<T>{
    data : T,
    totalItems : number,
    totalPages : number,
}