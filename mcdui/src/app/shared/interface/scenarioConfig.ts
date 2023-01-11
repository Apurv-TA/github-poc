export interface SegmentConfig {
    discount_depth_per: any
    scenario_name: string,
    channel: string,
    // start_date: string,
    scenario_id:string,
    // discount_duration: string,
    offers: segData[],
    competition_promo: compData[]
}

export interface segData {

    start_date: any,    
    duration: number,
    coop: any,
    channel: string,
    promo_type: any,
    discount_mechanic: mechanic,
    item_grp_desc: product,  
    offer_desc: items[],
    discount_depth: any,
    base_price: number,
    min_discount_price: any,
    max_discount_price: any,
    offer_price: number,
    scenario_unique_id:number,
    offer_id: number,
    ohm_id: number,
    dis_mech_id: number,
    item_grp_id: number,
    impact_index: number,
    source: string,
    actions: string,
    scenario_offer_id: number
}
export interface segment {
    segment_name: string,
    segment_id: number
}
export interface mechanic {
    promomech_name: string,
    promomech_id: number,
    promomech_code: string
}
export interface product {
    promo_type_name: string,
    promo_type_id: number,
    promo_type_code: string
}
export interface items {
    item_name: string,
    item_id: number,
    item_code: string
}
export interface compData {
    competition_brand_id: number,
    competition_brand_name: string,
    competition_offer_id: number,
    competition_offer_name: string,
    discount_depth: number,
}