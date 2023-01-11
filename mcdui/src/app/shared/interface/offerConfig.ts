export interface OfferConfiguration {
    fixed_promo_called: boolean;
    duration:any [];
    objective: any;
    fixed_promos: [];
    parent_ohm_id: number;
    child_ohm_id: number;
    start_date:string,
    is_edit:boolean,
    scenario_name: string,
    status:string,
    ohm_channel: string,
    is_copy:boolean,
    promo_channel: string,
    coop_name: string,
    promo_type: string,
    subSegment_coop_name: string,
    offer_duration: number,
    offer_config_id:number,
    offer_package_name:string,
    competition_discounts: [],
    product_categories: [],
    maximum_product_categories: [],
    maximum_day_part:[],
    object_lower_bound: [],
    promo_mechanics:[],
    segment:Segment[];
}

export interface CompetitionDicounts {
    competition_brand_id: number,
    competition_brand_name: string,
    competition_offer_id: number,
    competition_offer_name: string,
    discount_depth: number,
}

export interface Segment {
    segment_id:number;
    promo_id:number
    segment_name:string;
    objective : Objective;
    product : Product;
    offer : MaxOffers;
    
}

export interface Objective{
    maximize:Maximize;
    lower_bound:LowerBound[];
}

export interface Maximize{
    objective_id:number,
    objective_name:string,
    promo_id:number,
    promo_objective_id:number;
}

export interface LowerBound{
    lower_bound_name:string,
    lower_bound_percentage:number,
}


export interface Product{
    product_item:ProductItem[]
    item:Item[],
    max_offers:Max_Offers[];

}

export interface ProductItem{
    category_id:number,
    category:string,
}


export interface Item{
    item_id:number;
    item_code:string;
    item_name:string;
    promo_id:number;
    category_id:number,
    category_name:string,

}

export interface MaxOffers{
    promo_mechanic:PromoMechanic[];
    no_of_offers:MaxOffer[];
    discount_depth:MaxOffer[];
}

export interface MaxOffer{
    id:number;
}

export interface PromoMechanic{
    promomech_id:number;
    promomech_name:string;
}

export interface Max_Offers{
    product_item:number;
    max_offer:number;
    product_name:string;
}