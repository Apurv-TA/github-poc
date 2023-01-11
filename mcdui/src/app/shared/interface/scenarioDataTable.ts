export interface scenarioDataTable{
    start_date: any,
    duration: number,
    geo: string,
    discount_channel: string,
    promo_type:string,
    promomech_name:string,
    product_type:string,
    item_name:string,
    discount_depth:number;
    discount_depth_per:any;
    regular_price:number;
    min_discount_price:number;
    promo_price:number;
    segment_id: any;
    item_code: any;
    isDuplicate?: any;
    promomech_code:string;
    offer_id:any;
}


export interface FixedPromosDataTable{
    start_date: any,
    duration: number,
    geo: string,
    discount_channel: string,
    promo_type:string,
    promomech_name: string,
    product_type:string,
    item_name: string,
    promo_price: number,
    discount_depth: string,
    regular_price:number;
    min_discount_price:number;
    scenario_unique_id: any,
    isDuplicate?: any,
    offer_id:any,
    discount_depth_per:any,
    // regular_price: number,
    // impact_index: number,
}