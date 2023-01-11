export const login_page = {
    CRYPTO_PASSWORD: 'Mcdp_2021',
    Russia: "Russia",
    English: "English",
    languageList: [{ 'value': 'English' }, { 'value': 'Russia' }],
    usernameRequired: "Username is required",
    passwordRequired: "Password is required",
    loginSuccess: "lang.constantData.loginsuccess",
    invalidEmail: "Enter a valid username",
    invalidPassword: "Enter a valid password",
    email: 'email',
    password: 'password',
    reponseCode: 200,
    errreponseCode: 203,
    error_code_400: 400,
    error_code_500: 500,
    error_code_403: 403,
    passwordPattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$',
    loginResponse: "loginResponse",
    logincredetials: "logincredetials",
    offerpage: 'offer',
    packageId: 'packageId',
    packagename: 'packagename',
    saveSuccessMessage: "lang.constantData.saveSuccessMessage",
    submitSuccessMessage: "lang.constantData.submitSuccessMessage",
    modalBasic: "modal-basic-title",
    pressEsc: "by pressing ESC",
    byClickBack: "by clicking on a backdrop",
    passwordAlbanumericValid: '"/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W\_])[A-Za-z\d\W\_]{8,15}$/"',
    applicationType: 'application/vnd.ms-excel',
    xlxs: '.xlsx',
    pdf: '.pdf',
    report: 'Report_',
    completed: 'Completed',
    saved: 'Saved',
    submitted: 'Submitted',
    pending: 'Pending',
    failed: 'Failed',
    offerConfigId: 'offerConfigId',
    scenario_result_name: "scenario_result_name",
    channel: 'channel',
    kpichange: 1,
    offerId: 'offerId',
    passworResetMessage: "lang.constantData.passworResetMessage",
    passworUpdateMessage: "lang.constantData.passworUpdateMessage",
    emailValid: '^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
    passwordvalid: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$',
    status: 'ERROR',
    forgot: 'forgot',
    reset: 'reset',
    offer_recommend: "Promo Recommender",
    scenario_planner: "Scenario Planner",
    feed_creation: "Feed Creation",
    scenario_compare: "Scenario Comparison",
    performance_reports: "Performance Reports",
    logout: "Logout",
    dashboardTitle: "Dashboard",
    noActiveEmailIdWarningMss: "lang.forgot.noActiveEmailId",
    invalidTokenWarningMss: "lang.reset.reset_inner.invalidToken",
    oldPasswordWarningMss: "lang.reset.reset_inner.oldPassword",
    setProductdropdown: "lang.discount_config.netsale",
    scenario_id: "scenario_id",
    calculate_id: "calculate_id",
    calculate_id_scenario: "calculate_id_scenario",
    offerIdScenario: "offerIdScenario",
    pageCheck: "page_check",
    zero: "0",
    one: "1",
    two: "2",
    three: "3",
    invalidtoken: "Token not found",
    pagefrom: "pagefrom",
    currencyCode: "currencyCode",
    deletmesag: "lang.constantData.deletesuccess",
    discount_config_mechanic_note: "discount_config_mechanic_note",
    discount_config_segment_note: "discount_config_segment_note",
    discount_result_impact_note: "discount_result_impact_note",
    discount_result_recommendeder_note: "discount_result_recommendeder_note",
    setHeightInPert: "100%",
    setHeightInPx: "200px",


};

export const SUMMARY_PAGE = {
    TABLE_DATA: {
        "data": {
            "data": [
                {
                    "scenario_id": 159,
                    "package_id": 1158,
                    "scenario_name": "Discount Package 007",
                    "coop": ["Alabama NW Florida", "Alaska"],
                    "channel": "Non Digital Mass",
                    "promo_type": ["Deal", "Value"],
                    "coops": [
                        {
                            "coop_name": "Alabama NW Florida",
                            "promo_type": "Deal",
                            "start_date": "2022-10-03",
                            "duration": 6,
                        },
                        {
                            "coop_name": "Alabama NW Florida",
                            "promo_type": "Value",
                            "start_date": "2022-10-10",
                            "duration": 10,
                        },
                        {
                            "coop_name": "Alaska",
                            "promo_type": "Deal",
                            "start_date": "2022-10-03",
                            "duration": 8,
                        },
                    ],
                    "min_start_date": "2022-10-03",
                    "max_start_date": "2022-10-10",
                    "duration": [6, 8],
                    "status": "Active",
                    "modified_at": "2022-09-05",
                    "created_by": "admin",
                },
                {
                    "scenario_id": 159,
                    "package_id": 1158,
                    "scenario_name": "Discount Package 007",
                    "coop": ["NewYork", "Miami"],
                    "channel": "Non Digital Mass",
                    "promo_type": ["Deal", "Value"],
                    "coops": [
                        {
                            "coop_name": "NewYork",
                            "promo_type": "Deal",
                            "start_date": "2022-10-03",
                            "duration": 6,
                        },
                        {
                            "coop_name": "NewYork",
                            "promo_type": "Value",
                            "start_date": "2022-10-10",
                            "duration": 10,
                        },
                        {
                            "coop_name": "Miami",
                            "promo_type": "Deal",
                            "start_date": "2022-10-03",
                            "duration": 8,
                        },
                    ],
                    "min_start_date": "2022-10-03",
                    "max_start_date": "2022-10-10",
                    "duration": [6, 10],
                    "status": "Active",
                    "modified_at": "2022-09-05",
                    "created_by": "admin",
                },
            ],

            "filters": {
                "status": [
                    "Completed",
                    "Saved"
                ],
                "channels": [
                    "Offline",
                    "online"
                ],
                "promo_types": [
                    "Deal",
                    "Value"
                ],
                "geos": [
                    "Alabama NW Florida",
                    "Alaska",
                    "NewYork",
                    "Miami"
                ]
            },
            "total_count": 2
        },
        "status": "OK",
        "http_code": 200,
    }




    // CHANNEL_VALUE: [{ name: 'offline mass', id: 1 }, { name: 'offline mass 2', id: 2 }],
    // GEO_NAME: [{ name: 'National', id: 1 }, { name: 'Philadelphia', id: 1 }],
    // PROMO_TYPE: [{ name: 'Value', id: 1 }, { name: 'Deal', id: 1 }],
};

export const OFFER_CONFIGURATION = {
    PROMO_CHANNEL_ONLINE: 1,
    PROMO_CHANNEL_OFFLINE: 2,
    PROMO_CHANNEL_ONLINE_NAME: 'Online',
    PROMO_CHANNEL_OFFLINE_NAME: 'Offline',
    CHANNEL_NAME_VALIDATION: 'Mass Online',
    PROMO_CHANNEL_ONLINE_OFFLINE: 3,
    PROMO_CHANNEL_MASS_ONLINE: 1,
    OBJECTIVE: 1,
    PRODUCT: 2,
    MAX_OFFERS: 3,
    KFC: 1,
    BURGER_KING: 2,
    PATCH_DEFAULT_OBJECTIVE: 1,
    OFFER_DURATION_DEFAULT_VAULE: 2,
    OBJECTIVE_FORM_NAME: 'objective',
    LOWER_BOUND_FORM_NAME: 'lower_bound',
    COMPETITION_DISCOUNTS: 'competition_discounts',
    PRODUCT_FORM_NAME: 'product',
    MAX_OFFERS_FORM_NAME: 'max_offers',
    DAY_PART_FORM_NAME: 'daypart',
    OFFER_FORM_NAME: 'offer',
    OFFER_PERIOD: 'period',
    modalBasic: "modal-basic-title",
    pressEsc: "by pressing ESC",
    byClickBack: "by clicking on a backdrop",
    preview: "preview",
    type: "type",
    copy: "copy",
    offerId: "offerId",
    segmentWarningMessage: "lang.constantData.segmentWarningMessage",
    maxDiscountWarningMessage: "lang.constantData.maxDiscountWarningMessage",
    maxComDiscountWarningMessage: "lang.constantData.maxCompetitionDiscountWarningMessage",
    lowerBoundErrorMessage: "lang.constantData.lowerBoundErrorMessage",
    applySuccessMessage: "lang.constantData.applySucessMessage",
    applyAllSucessMessage: "lang.constantData.applyAllSucessMessage",
    start_date_default_weak: 8,
    offer_package_name: "Russia Discount Engine",
    massOnlineWarningMss: "lang.discount_config.massOnlineWarningMss",
    discountPackId: "lang.jobsummary.offer_id",
    regularPriceRoundOff: 2,
    pctDecimal: 2,
};


export const offer_package_summary = {
    displayColumns: ['scenario_id', 'scenario_name', 'start_date', 'geoName', 'channelValue', 'promoType', 'status', 'last_updated', 'actions'],
    filteredData: "filteredData",
    desc: "desc",
    impactIndex: "impact_index",
    coopsDisplayColumns: ['coop_name', 'promo_type', 'start_date', 'duration'],
    week: "Weeks"
}


export const NAVIGATION = {
    HOME_PAGE: 'mcd/dashboard',
    OFFER_RECOMMENDER_PREVIEW_SCREEN: 'mcd/discount/offer-recommender/',
    OFFER_RECOMMENDER_PREVIEW_SCREEN_COPY: 'mcd/discount/offer-recommender/copy/',
    OFFER_CONFIGURATION: 'mcd/discount/offer-configuration/',
    OFFER_CONFIGURATION_COPY: 'mcd/discount/offer-configuration/copy/',
    OFFER_CONFIGURATION_BACK_TO_PREVIEW: 'mcd/discount/offer-configuration/preview',
    DASHBOARD: 'mcd/dashboard',
    LOGIN: "/login",
    FORGOT: "/forgot",
    RESET: "/RESET",
    JOB_SUMMARY: 'mcd/discount',
    ISSUETRACKER: 'mcd/issue-tracker',
    VIEW_KPI: 'mcd/view-kpi',

    RECOMMENDED_IMPACT: 'mcd/discount/recommended-impact',
    OFFER_PACKAGE_SUMMARY: 'mcd/discount/offer-package-summary/',


    CREATE_SCENARIO: "mcd/planner/scenario-name",
    EDIT_SCENARIO: "mcd/planner/scenario-name/edit",
    COPY_SCENARIO: "mcd/planner/scenario-name/copy",
    SCENARIO_RESULTS: "mcd/planner/scenario-results",
    SCENARIO_LANDING: "mcd/planner",
    SCENARIO_IMPACT: "mcd/planner/scenario-impact",

    SCENARIO_COMPARISON: "mcd/comparison",
    SCENARIO_COMPARE: "mcd/comparison/scenario-comparision",

    FEED_SELECTION: "mcd/feed/feed-selection",

    IMPORT_RECOMMENDER: "mcd/planner/import-recommender",
    FORGOT_PASSWORD_SCREEN: 'forgot'
}


export const preview_page = {
    cancelBtn: "offer-configuration",
    submitSuccess: "lang.constantData.submitSuccess",
    saveSuccess: "lang.constantData.saveSuccess",
    modalBasic: "modal-basic-title",
    pressEsc: "by pressing ESC",
    byClickBack: "by clicking on a backdrop",
    Online: "lang.constantData.online",
    offline: "lang.constantData.offline",
    on_offline: "lang.constantData.on_offline",
    zero: 0,
    one: 1,
    two: 2,
    ten: 10,
    five: 5,
    twentytwo: 22,
    getPreview: "prevSubmit",
    getOffersList: "offersList",
    getSelectedList: "selectedList",
    getSelectedGeoList: "selectedGeoList",
    initialPayload: {
        "offer_package_id": "",
        "offer_package_name": "",
        "promo_id": [],
        "segment_id": [],
        "start_date": "2021-11-25",
        "end_date": "2021-12-25",
        "created_by": "",
        "status_name": ""
    },
    promoDropdown: {
        "primaryKey": "promo_id",
        "labelKey": "promo_types",
        "text": "Promo Type",
        "selectAllText": "Select All",
        "unSelectAllText": "UnSelect All",
        "classes": "myclass custom-class",
        "enableSearchFilter": true,
        "badgeShowLimit": 1,
        "position": "bottom"
    },
    segmentDropdown: {
        "primaryKey": "segment_id",
        "labelKey": "channels",
        "text": "Channel",
        "selectAllText": "Select All",
        "unSelectAllText": "UnSelect All",
        "classes": "myclass custom-class",
        "enableSearchFilter": true,
        "badgeShowLimit": 1,
        "position": "bottom"
    },
    statusDropdown: {
        "primaryKey": "id",
        "labelKey": "status",
        "text": "Status",
        "selectAllText": "Select All",
        "unSelectAllText": "UnSelect All",
        "classes": "myclass custom-class",
        "enableSearchFilter": true,
        "badgeShowLimit": 1,
        "position": "bottom"
    },
    geoDropdown: {
        "primaryKey": "id",
        "labelKey": "geo_name",
        "text": "Business Unit",
        "selectAllText": "Select All",
        "unSelectAllText": "UnSelect All",
        "classes": "myclass custom-class",
        "enableSearchFilter": true,
        "badgeShowLimit": 1,
        "position": "bottom"
    },


    promoChannelDropdownSettings: {
        "primaryKey": "promo_id",
        "labelKey": "promo_name",
        "text": "Select Promo Channel",
        "selectAllText": "Select All",
        "unSelectAllText": "UnSelect All",
        "classes": "myclass custom-class",
        "enableSearchFilter": true,
        "badgeShowLimit": 1,
        "position": "bottom"
    },


    segmentDropdownSettings: {
        "primaryKey": "segment_id",
        "labelKey": "segment_name",
        "text": "Select Segment",
        "selectAllText": "Select All",
        "unSelectAllText": "UnSelect All",
        "classes": "myclass custom-class",
        "enableSearchFilter": true,
        "badgeShowLimit": 1,
        "position": "bottom"
    },
    dateFormat: "yyyy-MM-dd",
    splitHash: "##"
}

export const segementData = {
    displayColumns: ['serial_no', 'granularity_value', 'gc_lift', 'avg_lift', 'gp_lift', 'netsales_lift', 'effect_on_margin_lift', 'upt_lift', 'urw_lift'],
}
export const segementDataScenario = {
    displayColumns: ['serial_no', 'segment', 'gc_change', 'uc_change', 'avg_check', 'gp_change', 'net_sales'],
}
export const offer_package_detail = {
    displayColumns: ['checked', 'segment_name', 'promo_mech', 'product', 'items', 'discount_depth', 'regular_price', 'promo_price', 'offer_usage', 'actions'],
    impactdisplayColumns: ['segment_name', 'promo_mech', 'product', 'items', 'discount_depth', 'regular_price', 'promo_price', 'impact_index', 'actions'],
    displayColumnschild: ['checkedchild', 'segment_namechild', 'promo_mechchild', 'product_child', 'itemschild', 'discount_depthchild', 'regular_pricechild', 'promo_pricechild', 'offer_usagechild', 'actionschild'],
    impactdisplaychild: ['segment_namechild', 'promo_mechchild', 'product_child', 'itemschild', 'discount_depthchild', 'regular_pricechild', 'promo_pricechild', 'impact_indexchild', 'actionschild'],
    activePromosDisplayColumns: ['checked', 'start_date', 'duration', 'geo', 'channel', 'promo_type', 'promo_mechanic', 'promo_name', 'regular_price', 'promo_price', 'promo_depth', 'impact_index'],
    promoEngineRecommendationDisplayColumns: ['checked', 'start_date', 'duration', 'geo', 'channel', 'promo_type', 'promo_mechanic', 'promo_name', 'regular_price', 'promo_price', 'promo_depth', 'impact_index'],
    filteredData: "filteredData",
    is_edit: "is_edit",
    week: "Weeks"
}
export const scenario_package_detail = {
    displayColumns: ['checked', 'segment_name', 'promo_mech', 'items', 'discount_depth', 'regular_price', 'promo_price', 'impact_index', 'offer_usage', 'actions'],
    displayColumnschild: ['checkedchild', 'segment_namechild', 'promo_mechchild', 'product_child', 'itemschild', 'discount_depthchild', 'regular_pricechild', 'promo_pricechild', 'offer_usagechild'],
    displayImpactIndexColumnschild: ['segment_namechild', 'promo_mechchild', 'product_child', 'itemschild', 'discount_depthchild', 'regular_pricechild', 'promo_pricechild', 'impact_indexchild'],
    filteredData: "filteredData",
}
export const impact_promo_channel = {
    displayColumns: ['sno', 'coop_name', 'promo_type', 'gc', 'sales', 'gp', 'acv', 'upt', 'urw'],
    filteredData: "filteredData",
}
export const scenario_comparision_table = {
    displayColumns: ['sno', 'kpi'],
    filteredData: "filteredData",
}
export const impactPromoData = [{ "granularity": "Channel", "granularity_value": "Offline", "gc_scenario": 614, "gc_lift": -1, "avg_scenario": 303, "avg_lift": 0, "netsales_scenario": 4647, "netsales_lift": -2, "gp_scenario": 4384, "gp_lift": 0, "uc_scenario": null, "uc_lift": null, "upt_scenario": 3687, "upt_lift": 0, "urw_scenario": 8744, "urw_lift": 0, "effect_on_margin_scenario": 57815, "effect_on_margin_lift": 0 }, { "granularity": "Channel", "granularity_value": "Offline", "gc_scenario": 614, "gc_lift": -1, "avg_scenario": 303, "avg_lift": 0, "netsales_scenario": 4647, "netsales_lift": -2, "gp_scenario": 3345693118, "gp_lift": 0, "uc_scenario": null, "uc_lift": null, "upt_scenario": 3687, "upt_lift": 0, "urw_scenario": 8744, "urw_lift": 0, "effect_on_margin_scenario": 57815, "effect_on_margin_lift": 0 }, { "granularity": "Channel", "granularity_value": "Offline", "gc_scenario": 614, "gc_lift": -1, "avg_scenario": 303, "avg_lift": 0, "netsales_scenario": 5517519225, "netsales_lift": 0, "gp_scenario": 4384, "gp_lift": 0, "uc_scenario": null, "uc_lift": null, "upt_scenario": 3687, "upt_lift": 0, "urw_scenario": 8744, "urw_lift": 0, "effect_on_margin_scenario": 57815, "effect_on_margin_lift": 0 }, { "granularity": "Channel", "granularity_value": "Offline", "gc_scenario": 614, "gc_lift": -1, "avg_scenario": 303, "avg_lift": 0, "netsales_scenario": 5517519225, "netsales_lift": 0, "gp_scenario": 3345693118, "gp_lift": 0, "uc_scenario": null, "uc_lift": null, "upt_scenario": 3687, "upt_lift": 0, "urw_scenario": 8744, "urw_lift": 0, "effect_on_margin_scenario": 57815, "effect_on_margin_lift": 0 }, { "granularity": "Channel", "granularity_value": "Offline", "gc_scenario": 7008154, "gc_lift": 2, "avg_scenario": 303, "avg_lift": 0, "netsales_scenario": 4647, "netsales_lift": -2, "gp_scenario": 4384, "gp_lift": 0, "uc_scenario": null, "uc_lift": null, "upt_scenario": 3687, "upt_lift": 0, "urw_scenario": 8744, "urw_lift": 0, "effect_on_margin_scenario": 57815, "effect_on_margin_lift": 0 }, { "granularity": "Channel", "granularity_value": "Offline", "gc_scenario": 7008154, "gc_lift": 2, "avg_scenario": 303, "avg_lift": 0, "netsales_scenario": 4647, "netsales_lift": -2, "gp_scenario": 3345693118, "gp_lift": 0, "uc_scenario": null, "uc_lift": null, "upt_scenario": 3687, "upt_lift": 0, "urw_scenario": 8744, "urw_lift": 0, "effect_on_margin_scenario": 57815, "effect_on_margin_lift": 0 }, { "granularity": "Channel", "granularity_value": "Offline", "gc_scenario": 7008154, "gc_lift": 2, "avg_scenario": 303, "avg_lift": 0, "netsales_scenario": 5517519225, "netsales_lift": 0, "gp_scenario": 4384, "gp_lift": 0, "uc_scenario": null, "uc_lift": null, "upt_scenario": 3687, "upt_lift": 0, "urw_scenario": 8744, "urw_lift": 0, "effect_on_margin_scenario": 57815, "effect_on_margin_lift": 0 }, { "granularity": "Channel", "granularity_value": "Offline", "gc_scenario": 7008154, "gc_lift": 2, "avg_scenario": 303, "avg_lift": 0, "netsales_scenario": 5517519225, "netsales_lift": 0, "gp_scenario": 3345693118, "gp_lift": 0, "uc_scenario": null, "uc_lift": null, "upt_scenario": 3687, "upt_lift": 0, "urw_scenario": 8744, "urw_lift": 0, "effect_on_margin_scenario": 57815, "effect_on_margin_lift": 0 }, { "granularity": "Channel", "granularity_value": "Online", "gc_scenario": 2064, "gc_lift": -1, "avg_scenario": null, "avg_lift": null, "netsales_scenario": 4647, "netsales_lift": -2, "gp_scenario": 7845, "gp_lift": 0, "uc_scenario": null, "uc_lift": null, "upt_scenario": 3667, "upt_lift": 0, "urw_scenario": 8714, "urw_lift": 0, "effect_on_margin_scenario": 5777, "effect_on_margin_lift": 0 }, { "granularity": "Channel", "granularity_value": "Overall", "gc_scenario": 7824, "gc_lift": -1, "avg_scenario": null, "avg_lift": null, "netsales_scenario": 5445647, "netsales_lift": -2, "gp_scenario": 845, "gp_lift": 0, "uc_scenario": null, "uc_lift": null, "upt_scenario": 3617, "upt_lift": 0, "urw_scenario": 8747, "urw_lift": 0, "effect_on_margin_scenario": 57477, "effect_on_margin_lift": 0 }]
export const productCatgoryData = {
    displayColumns: ['serial_no', 'granularity_value', 'sales', 'gp', 'upt', 'urw'],
    segmentList: [
        { value: '% Change' },
        { value: 'Scenario Change' }
    ],
    segmentPayload: {
        "granularity": "segment", "offer_config_id": 1
    },
    productPayload: {
        "granularity": "product category", "offer_config_id": 1
    },
    Percent: "% Change",
    Scenario: "Scenario Change",
    detailedImpact: "recommended-impact"
}
export const segmentChart: any = {
    title: {
        text: ''
    },
    chart: {
        type: 'column'
    },
    legend: {
        // align: 'right',
        // verticalAlign: 'bottom',
        // layout: 'vertical',
        // itemWidth: 200,
        // x: 0,
        // y: 0
        enabled: false
    },
    xAxis: {
        categories: [],
        crosshair: true,
    },
    yAxis: {
        labels: {
            format: '{text}%'
        },
        gridLineDashStyle: 'Dash',
        gridLineColor: '#EDEDED',
        //  min: 0,
        title: {
            text: '',

        },
    },
    colors: ['#2A4A64', '#0265AD', '#09918B', '#E50101', '#FF8B00'],
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.05,
            borderWidth: 0,
            pointWidth: 8
        }
    },
    series: [],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                },
                yAxis: {
                    labels: {
                        align: 'left',
                        x: 0,
                        y: -5
                    },
                    title: {
                        text: null
                    }
                },
                subtitle: {
                    text: null
                },
                credits: {
                    enabled: false
                }
            }
        }]
    }
}
export const segmentProdChart: any = {
    title: {
        text: ''
    },
    chart: {
        type: 'column'
    },
    legend: {
        // align: 'right',
        // verticalAlign: 'bottom',
        // layout: 'vertical',
        // itemWidth: 200,
        // x: 0,
        // y: 0
        enabled: false
    },
    xAxis: {
        categories: [],
        crosshair: true,
    },
    yAxis: {
        labels: {
            format: '{text}%'
        },
        gridLineDashStyle: 'Dash',
        gridLineColor: '#EDEDED',
        //  min: 0,
        title: {
            text: '',

        },
    },
    colors: ['#2A4A64', '#0265AD', '#09918B', '#E50101', '#FF8B00'],
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.05,
            borderWidth: 0,
            pointWidth: 8
        }
    },
    series: [],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                },
                yAxis: {
                    labels: {
                        align: 'left',
                        x: 0,
                        y: -5
                    },
                    title: {
                        text: null
                    }
                },
                subtitle: {
                    text: null
                },
                credits: {
                    enabled: false
                }
            }
        }]
    }
}
export const segmentData = "segment"
export const categoryData = "product category"
export const categoryChart = {
    title: {
        text: ''
    },
    chart: {
        type: 'column'
    },
    legend: {
        align: 'right',
        verticalAlign: 'bottom',
        layout: 'vertical',
        itemWidth: 200,
        x: 0,
        y: 0
    },
    xAxis: {
        categories: [],
        crosshair: true,
    },
    yAxis: {
        labels: {
            format: '{text}%'
        },
        gridLineDashStyle: 'Dash',
        gridLineColor: '#EDEDED',
        //   min: 0,
        title: {
            text: '',

        },
    },
    colors: ['#2A4A64', '#0265AD', '#09918B', '#E50101', '#FF8B00'],
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    // plotOptions: {
    //     column: {
    //         pointPadding: 0.2,
    //         borderWidth: 0
    //     }
    // },
    series: [],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                },
                yAxis: {
                    labels: {
                        align: 'left',
                        x: 0,
                        y: -5
                    },
                    title: {
                        text: null
                    }
                },
                subtitle: {
                    text: null
                },
                credits: {
                    enabled: false
                }
            }
        }]
    }
}
export const overviewChart = {
    chart: {
        type: 'column'
    },
    title: {
        text: ''
    },
    legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical',
        itemWidth: 200,
        x: 0,
        y: 0
    },
    xAxis: {
        categories: [],
        crosshair: true,
    },
    yAxis: {
        labels: {
            format: '{text}%'
        },
        gridLineDashStyle: 'Dash',
        gridLineColor: '#EDEDED',
        //   min: 0,
        title: {
            text: '',

        },
    },
    colors: ['#2A4A64', '#0265AD', '#09918B', '#E50101', '#FF8B00'],
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.05,
            borderWidth: 0,
            pointWidth: 8
        }
    },
    series: []
}
export const segmentKpiChart = {
    chart: {
        type: 'column'
    },
    title: {
        text: ''
    },
    legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical',
        itemWidth: 200,
        x: 0,
        y: 0
    },
    xAxis: {
        categories: [],
        crosshair: true,
    },
    yAxis: {
        labels: {
            format: '{text}%'
        },
        gridLineDashStyle: 'Dash',
        gridLineColor: '#EDEDED',
        //    min: 0,
        title: {
            text: '',

        },
    },
    colors: ['#2A4A64', '#0265AD', '#09918B', '#E50101', '#FF8B00'],
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.05,
            borderWidth: 0,
            pointWidth: 8
        }
    },
    series: []
}
export const productKpiChart = {
    chart: {
        type: 'column'
    },
    title: {
        text: ''
    },
    legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical',
        itemWidth: 200,
        x: 0,
        y: 0
    },
    xAxis: {
        categories: [],
        crosshair: true,
    },
    yAxis: {
        labels: {
            format: '{text}%'
        },
        gridLineDashStyle: 'Dash',
        gridLineColor: '#EDEDED',
        //   min: 0,
        title: {
            text: '',

        },
    },
    colors: ['#2A4A64', '#0265AD', '#09918B', '#E50101', '#FF8B00'],
    tooltip: {

        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.05,
            borderWidth: 0,
            pointWidth: 8
        }
    },
    states: {
        hover: {
            animation: {
                duration: 5000
            }
        }
    },
    series: []
}
export const scenario_discount_data = [{ "promo_name": "Online", "recommended_offer": [{ "offer_id": 1, "creative_color": "Solid Red", "creative_background": "B1", "product_type": "Individual", "promo_mechanic": "Price Discount - % Off", "regular_price": 50.0, "promo_price": 30.0, "discount_depth": 40, "impact_index": 2, "offer_usage": 31.2, "segment_config_id": 1, "segment_name": "Mass Online", "promo_id": 1, "promo_name": "Online", "items": [{ "item_id": 1010, "item_name": "BF Pancakes" }] }, { "offer_id": 2, "creative_color": "Solid Red", "creative_background": "B1", "product_type": "Pair", "promo_mechanic": "Price Discount - Pay % Less", "regular_price": 270.0, "promo_price": 180.0, "discount_depth": 33, "impact_index": 1, "offer_usage": 29.5, "segment_config_id": 1, "segment_name": "Mass Online", "promo_id": 1, "promo_name": "Online", "items": [{ "item_id": 1011, "item_name": "BF Sausage & Egg McMuffin" }, { "item_id": 1011, "item_name": "BF Sausage & Egg McMuffin" }] }, { "offer_id": 3, "creative_color": "Solid Yellow", "creative_background": "B1", "product_type": "Set of 2", "promo_mechanic": "Promo code", "regular_price": 149.0, "promo_price": 135.0, "discount_depth": 9, "impact_index": 3, "offer_usage": 22.1, "segment_config_id": 1, "segment_name": "Mass Online", "promo_id": 1, "promo_name": "Online", "items": [{ "item_id": 1017, "item_name": "BF Big Breakfast" }, { "item_id": 1019, "item_name": "BF Cheese & Egg McMuffin" }] }] }]

export const issueTracker = {
    requestType: [
        { "type_id": "1", "type_name": "Type 1" },
        { "type_id": "2", "type_name": "Type 2" },
        { "type_id": "3", "type_name": "Type 3" },
    ],
    displayColumns: ['req_no', 'req_name', 'request_type', 'priority', 'comments', 'req_date', 'created_by', 'modified_date', 'modified_by'],
    pendingData: [
        { "req_no": "REQ1", "req_name": "Balaji", "request_type": "Discount Recommender", "priority": "High", "comments": "Need to fix Filters", "req_date": "12-01-2022", "created_by": "Balaji", "modified_date": "13-01-2022", "modified_by": "Balaji" },
        { "req_no": "REQ2", "req_name": "Balaji", "request_type": "Scenario Planner", "priority": "Medium", "comments": "Need to fix Filters", "req_date": "13-01-2022", "created_by": "Balaji", "modified_date": "14-01-2022", "modified_by": "Balaji" },
        { "req_no": "REQ3", "req_name": "Balaji", "request_type": "Scenario Selection", "priority": "High", "comments": "Need to fix Filters", "req_date": "15-01-2022", "created_by": "Balaji", "modified_date": "16-01-2022", "modified_by": "Balaji" },
        { "req_no": "REQ4", "req_name": "Balaji", "request_type": "Scenario Comparison", "priority": "Low", "comments": "Need to fix Filters", "req_date": "20-01-2022", "created_by": "Balaji", "modified_date": "21-01-2022", "modified_by": "Balaji" },
        { "req_no": "REQ5", "req_name": "Balaji", "request_type": "Feed Selection", "priority": "Medium", "comments": "Need to fix Filters", "req_date": "25-01-2022", "created_by": "Balaji", "modified_date": "26-01-2022", "modified_by": "Balaji" }
    ],
    popup_css: "issue_tracker",
    status: "PENDING",
    closed: "CLOSED",
    createSuccess: "lang.help.createSuccess",
    updateSuccess: "lang.help.updateSuccess",
    weightUpdateSuccess: "lang.help.weightUpdateSuccess",
    weightUpdateSuccessMsg: "lang.help.weightUpdateSuccessMsg",
    slash: "/",
    displayedKPIColumns: ['si_no', 'kpi_name', 'formula'],
    guestCount: "lang.help.guestCount",
    userCount: "lang.help.user_count",
    netSales: "lang.help.net_sales",
    grossProfit: "lang.help.gross_profit",
    avgCheck: "lang.help.avg_check",
    effectMargin: "lang.help.effect_on_margin",
    upt: "lang.help.upt",
    urw: "lang.help.urw",
    discountUsage: "lang.help.discount_usage",
    discountUsagePromo: "lang.help.discount_usage_promo",
    impactIndex: "lang.help.impact_index",
    guestCountFormula: "lang.help.guestCountFormula",
    userCountFormula: "lang.help.userCountFormula",
    netSalesFormula: "lang.help.netSalesFormula",
    grossProfitFormula: "lang.help.grossProfitFormula",
    avgCheckFormula: "lang.help.avgCheckFormula",
    effectMarginFormula: "lang.help.effectMarginFormula",
    effectMarginFormulaBullet1: "lang.help.effectMarginFormulaBullet1",
    effectMarginFormulaBullet2: "lang.help.effectMarginFormulaBullet2",
    effectMarginFormulaBullet3: "lang.help.effectMarginFormulaBullet3",
    effectMarginFormulaBullet4: "lang.help.effectMarginFormulaBullet4",
    uptFormula: "lang.help.uptFormula",
    urwFormula: "lang.help.urwFormula",
    discountUsageFormula: "lang.help.discountUsageFormula",
    discountUsagePromoFormula: "lang.help.discountUsagePromoFormula",
    imapctIndexFormula: "lang.help.imapctIndexFormula",
    guestCountGranularity: "lang.help.guestCountGranularity",
    userCountGranularity: "lang.help.userCountGranularity",
    netSalesGranularity: "lang.help.netSalesGranularity",
    grossProfitGranularity: "lang.help.grossProfitGranularity",
    avgCheckGranularity: "lang.help.avgCheckGranularity",
    effectMarginGranularity: "lang.help.effectMarginGranularity",
    uptGranularity: "lang.help.uptGranularity",
    urwGranularity: "lang.help.urwGranularity",
    discountUsageGranularity: "lang.help.discountUsageGranularity",
    discountUsagePromoGranularity: "lang.help.discountUsagePromoGranularity",
    imapctIndexGranularity: "lang.help.imapctIndexGranularity"
}

export const scenario_planner = {
    importOffer: "import",
    initialPayload: {
        "create_from_date": "2021-11-11", "create_to_date": "2021-12-14", "start_date": "", "package_name": ""
    },
    start_date_val: 30,
    twentytwo: 22,
    noOfferWarningMess: "lang.scenario_planner.noOfferExistsWarningMess",
    //dateFormat: 'MMM d, y',
    //dateFormat_create: 'MMM d, yyyy',
    dateTime: 'yyyy-MM-dd h:mm:ss+00:00',
    StartDateTime: 'yyyy-MM-dd',
    scenario_form: "scenario_form",
    offer_config_id: "offer_config_id",

    scenarioSelectionD: ['scenario_name'],
    scenarioSelection: ['scenario_name', 'scenario_id', 'no_of_promos', 'start_date', 'geo', 'channel', 'promo_type', 'modified_at'],
    scenarioSelectionSubCoulmns: ["start_date", "duration", "coop", "channel", "promo_type", "dis_mech_desc", "offer_desc", "offer_price", "discount_depth"],
    sameStartdate: "Scenarios with different start dates or discount duration can’t be compared.",
    sameScenarioName: "Scenarios with same Scenario Name can’t be compared.",
    sameSegments: "Scenarios selected for comparison consist of different Segments.",
    maxfive: "Select any 5 Scenarios",
    scenario_id: "scenario_id",
    sno: "Sl.No",
    kpi: "KPI",
    segment: "segment",
    product: "product",
    impact_index: "impact_index",
    geo: "Geo",
    promoType: "Promo Type",
    kpiValuesGeoPromoType: ['GC', 'Sales', 'Gross Margin $', 'Average Check', 'UPT', 'URW'],
    kpiValuesProduct: ['Sales', 'Gross Margin $', 'UPT', 'URW']

}

export const scenario_name = {
    regprice: "regular_price",
    comdisc: "competition_discount",
    seg: "segment_configuration",
    discountprice: "discount_price",
    disdepth: "discount_depth",
    mindis: "min_discount_price",
    competition_discount: ['competition_brand_name', 'discount', 'depth'],
    scenario_table: ['start_date', 'duration', 'geo', 'channel', 'promo_type', 'promomech_name', 'product_type', 'item_name', 'base_price', 'min_discount_price', 'promo_price', 'discount_depth', 'edit', 'delete'],
    scenario_table_active_promos: ['start_date', 'duration', 'geo', 'channel', 'promo_type', 'promomech_name', 'product_type', 'item_name', 'base_price', 'min_discount_price', 'promo_price', 'discount_depth', 'edit', 'delete'],
    offer_config_id: "offer_config_id",
    current_offer_config_id: "current_offer_config_id",
    scenario_form: "scenario_form",
    warning_comp_data: "lang.scenarioName.warning_comp_data",
    warning_high: "lang.scenarioName.warning_high",
    warning_min: "lang.scenarioName.warning_min",
    warning_reg_high: "lang.scenarioName.warning_reg_high",
    warning_invalid_date: "lang.scenarioName.warning_invalid_date",
    warning_invalid_date_and_duration: "lang.scenarioName.warning_invalid_date_and_duration",
    warning_invalid_date_active_promos: "NOTE: Please verify, some of the Active Promos have older date*",
    warning_min_last: "lang.scenarioName.warning_min_last",
    warning_start_date: "lang.scenarioName.warning_start_date",
    number_validation: "^[0-9.,]+$",
    date_min: 1,
    date_max: 21,
    default: "Scenario",
    disablelist: "disablelist",
    depth_val: "lang.scenarioName.depth_val",
    depth_val_last: "lang.scenarioName.depth_val_last",
    items: "items",
    type: "product_type",
    warning_save: "lang.scenarioName.warning_save",
    //  dateFormat_create: 'MMM d, yyyy',
    segmentConfig: 'segmentConfig',
    promoid: 2,
    brandid: 1,
    kfc: 8,
    bk: 5,
    priceof1: "bogo",
    checkThreshold: "ctp_",
    default_discount_depth: 50,
    scenario_type: "scenario_type",
    scenario_edit: "edit",
    scenario_copy: "copy",
    offline_segment_id: 9,
    fixedPromos: 'fixedPromos',
    promoChannelDropdown: [{ "promo_id": 1, "promo_name": "Non Digital Mass" }],
    durationDropdown: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    promoTypeListDropdown: [{ "promoTypeID": 1, "promoTypeDesc": "Deal" }, { "promoTypeID": 2, "promoTypeDesc": "Value" }],
    geoData: [{ "geo_id": 1, "geo_name": "" }],
}

export const scenarioCompareData = [{
    kpi: "GuestCount", scenario_name1: {
        changevalue: 0,
        value: 1000

    }, scenario_name2: {
        changevalue: 0,
        value: 1000

    }, scenario_name3: {
        changevalue: 0,
        value: 1000

    }, scenario_name4: {
        changevalue: 0,
        value: 1000

    }
},
{
    kpi: "GuestCount", scenario_name1: {
        changevalue: 0,
        value: 1000

    }, scenario_name2: {
        changevalue: 0,
        value: 1000

    }, scenario_name3: {
        changevalue: 0,
        value: 1000

    }, scenario_name4: {
        changevalue: 0,
        value: 1000

    }
}]
export const segmentChartScenario = {
    title: {
        text: ''
    },
    legend: {
        align: 'right',
        verticalAlign: 'bottom',
        layout: 'vertical',
        itemWidth: 200,
        x: 0,
        y: 0
    },
    xAxis: {
        "categories": [
            "Active - High Frequency High Offers",
            "Active - High Frequency Low Offers High Check",
            "Active - High Frequency Low Offers Low Check",
            "Active - Low Frequency",
            "Enrollment - Early beginners",
            "Enrollment - Late start",
            "Inactive - No Transactions",
            "Inactive - At least one transaction",
            "Lapsing - No transactions",
            "Lapsing - At least one transaction",
            "Offline",
            "Pre-registration"
        ],
        crosshair: true,
    },
    yAxis: {
        labels: {
            format: '{text}%'
        },
        gridLineDashStyle: 'Dash',
        gridLineColor: '#EDEDED',
        //   min: 0,
        title: {
            text: '',

        },
    },
    colors: ['#2A4A64', '#0265AD', '#09918B', '#E50101', '#FF8B00'],
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.05,
            borderWidth: 0,
            pointWidth: 8
        }
    },
    series: [{
        "name": "GC",
        "data": [
            0,
            0.0000615231,
            0,
            0.0198677,
            0,
            0,
            0,
            0.00443368,
            0,
            0.00508069,
            0.200169,
            0
        ]
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                },
                yAxis: {
                    labels: {
                        align: 'left',
                        x: 0,
                        y: -5
                    },
                    title: {
                        text: null
                    }
                },
                subtitle: {
                    text: null
                },
                credits: {
                    enabled: false
                }
            }
        }]
    }
}
export const overviewChartScenario = {
    title: {
        text: ''
    },
    chart: {
        type: 'column'
    },
    legend: {
        align: 'right',
        verticalAlign: 'bottom',
        layout: 'vertical',
        itemWidth: 200,
        x: 0,
        y: 0
    },
    xAxis: {
        categories: [
            "Scenario Name 1",
            "Scenario Name 2",

        ],
        crosshair: true,
    },
    yAxis: {
        labels: {
            format: '{text}%'
        },
        gridLineDashStyle: 'Dash',
        gridLineColor: '#EDEDED',
        //    min: 0,
        title: {
            text: '',

        },
    },
    colors: ['#2A4A64', '#0265AD', '#09918B', '#E50101', '#FF8B00'],
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.05,
            borderWidth: 0,
            pointWidth: 8
        }
    },
    "series": [

    ],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                },
                yAxis: {
                    labels: {
                        align: 'left',
                        x: 0,
                        y: -5
                    },
                    title: {
                        text: null
                    }
                },
                subtitle: {
                    text: null
                },
                credits: {
                    enabled: false
                }
            }
        }]
    }
}

export const userAccess = {

    home_discount_recommen_grid: "home_discount_recommen_grid",
    home_sc_grid: "home_sc_grid",
    home_sp_grid: "home_sp_grid",
    home_fc_grid: "home_fc_grid",
    home_menu: "home_menu",
    discount_recommen_menu: "discount_recommen_menu",
    sp_menu: "sp_menu",
    sc_menu: "sc_menu",
    fc_menu: "fc_menu",
    discount_recommen_configure_dis: "discount_recommen_configure_dis",
    offer_config_prev: "offer_config_prev",
    offer_config_save: "offer_config_save",
    offer_config_submit: "offer_config_submit",
    offer_config_result_detail: "offer_config_result_detail",
    offer_config_impact_export: "offer_config_impact_export",
    offer_config_discount_export: "offer_config_discount_export",
    offer_config_seg_export: "offer_config_seg_export",
    offer_config_prod_export: "offer_config_prod_export",
    sp_import: "sp_import",
    sp_create: "sp_create",
    sp_result_detail: "sp_result_detail",
    sp_impact_export: "sp_impact_export",
    sp_export: "sp_export",
    sp_seg_export: "sp_seg_export",
    sp_prod_export: "sp_prod_export",
    sp_save: "sp_save",
    sp_add_discount: "sp_add_discount",
    sp_comparision: "sp_comparision",
    sc_compare: "sc_compare",
    fc_download: "fc_download",
    sc_copy_btn: "sc_copy_btn",
    sc_edit_btn: "sc_edit_btn",
    sp_back_btn: "sp_back_btn",
    impact_update_btn: "impact_update_btn",

    user_Access: "UserAccess"

}

export const offersByPackage = {
    TABLE_DATA: {

        "data": [
            {
                "scenario_id": 159,
                "offer_id": 1158,
                "ohm_id": 59,
                "channel": "Non Digital Mass",
                "coop": "Alabama NW Florida",
                "source": "fixed",
                "start_date": "2022-10-03",
                "duration": 6,
                "promo_type": "Deal",
                "dis_mech_id": 1,
                "dis_mech_desc": "Price Discount - @ Price Point",
                "item_grp_id": 1,
                "item_grp_desc": "Individual",
                "offer_desc": "EVML Big Mac",
                "base_price": 4.99,
                "offer_price": 3.99,
                "discount_depth": "20%",
                "impact_index": 40,
                "created_by": "admin",
            },
            {
                "scenario_id": 159,
                "offer_id": 1159,
                "ohm_id": 59,
                "channel": "Non Digital Mass",
                "coop": "Albany Buffalo Rochester Syracuse",
                "source": "recommended",
                "start_date": "2022-10-03",
                "duration": 6,
                "promo_type": "Deal",
                "dis_mech_id": 1,
                "dis_mech_desc": "Price Discount - @ Price Point",
                "item_grp_id": 1,
                "item_grp_desc": "Individual",
                "offer_desc": "2 of $4 mcnuggets",
                "base_price": 4,
                "offer_price": 3,
                "discount_depth": "25%",
                "impact_index": 60,
                "created_by": "admin",
            },
            {
                "scenario_id": 158,
                "offer_id": 1157,
                "ohm_id": 5,
                "channel": "Non Digital Mass",
                "coop": "Alabama NW Florida",
                "source": "fixed",
                "start_date": "2022-10-04",
                "duration": 5,
                "promo_type": "Deal",
                "dis_mech_id": 1,
                "dis_mech_desc": "Price Discount - @ Price Point",
                "item_grp_id": 1,
                "item_grp_desc": "Individual",
                "offer_desc": "EVML Big Mac",
                "base_price": 5.99,
                "offer_price": 4.99,
                "discount_depth": "30%",
                "impact_index": 10,
                "created_by": "admin",
            },
            {
                "scenario_id": 156,
                "offer_id": 1156,
                "ohm_id": 56,
                "channel": "Non Digital Mass",
                "coop": "Albany Buffalo Rochester Syracuse",
                "source": "recommended",
                "start_date": "2022-10-06",
                "duration": 8,
                "promo_type": "Deal",
                "dis_mech_id": 1,
                "dis_mech_desc": "Price Discount - @ Price Point",
                "item_grp_id": 1,
                "item_grp_desc": "Individual",
                "offer_desc": "2 of $4 mcnuggets",
                "base_price": 3,
                "offer_price": 2,
                "discount_depth": "30%",
                "impact_index": 30,
                "created_by": "admin",
            },
            {
                "scenario_id": 159,
                "offer_id": 1158,
                "ohm_id": 59,
                "channel": "Non Digital Mass",
                "coop": "Alabama NW Florida",
                "source": "fixed",
                "start_date": "2022-10-03",
                "duration": 6,
                "promo_type": "Deal",
                "dis_mech_id": 1,
                "dis_mech_desc": "Price Discount - @ Price Point",
                "item_grp_id": 1,
                "item_grp_desc": "Individual",
                "offer_desc": "EVML Big Mac",
                "base_price": 4.99,
                "offer_price": 3.99,
                "discount_depth": "20%",
                "impact_index": 40,
                "created_by": "admin",
            },
            {
                "scenario_id": 159,
                "offer_id": 1159,
                "ohm_id": 59,
                "channel": "Non Digital Mass",
                "coop": "Albany Buffalo Rochester Syracuse",
                "source": "recommended",
                "start_date": "2022-10-03",
                "duration": 6,
                "promo_type": "Deal",
                "dis_mech_id": 1,
                "dis_mech_desc": "Price Discount - @ Price Point",
                "item_grp_id": 1,
                "item_grp_desc": "Individual",
                "offer_desc": "2 of $4 mcnuggets",
                "base_price": 4,
                "offer_price": 3,
                "discount_depth": "25%",
                "impact_index": 60,
                "created_by": "admin",
            },
            {
                "scenario_id": 158,
                "offer_id": 1157,
                "ohm_id": 5,
                "channel": "Non Digital Mass",
                "coop": "Alabama NW Florida",
                "source": "fixed",
                "start_date": "2022-10-04",
                "duration": 5,
                "promo_type": "Deal",
                "dis_mech_id": 1,
                "dis_mech_desc": "Price Discount - @ Price Point",
                "item_grp_id": 1,
                "item_grp_desc": "Individual",
                "offer_desc": "EVML Big Mac",
                "base_price": 5.99,
                "offer_price": 4.99,
                "discount_depth": "30%",
                "impact_index": 10,
                "created_by": "admin",
            },
            {
                "scenario_id": 156,
                "offer_id": 1156,
                "ohm_id": 56,
                "channel": "Non Digital Mass",
                "coop": "Albany Buffalo Rochester Syracuse",
                "source": "recommended",
                "start_date": "2022-10-06",
                "duration": 8,
                "promo_type": "Deal",
                "dis_mech_id": 1,
                "dis_mech_desc": "Price Discount - @ Price Point",
                "item_grp_id": 1,
                "item_grp_desc": "Individual",
                "offer_desc": "2 of $4 mcnuggets",
                "base_price": 3,
                "offer_price": 2,
                "discount_depth": "30%",
                "impact_index": 30,
                "created_by": "admin",
            },
            {
                "scenario_id": 159,
                "offer_id": 1158,
                "ohm_id": 59,
                "channel": "Non Digital Mass",
                "coop": "Alabama NW Florida",
                "source": "fixed",
                "start_date": "2022-10-03",
                "duration": 6,
                "promo_type": "Deal",
                "dis_mech_id": 1,
                "dis_mech_desc": "Price Discount - @ Price Point",
                "item_grp_id": 1,
                "item_grp_desc": "Individual",
                "offer_desc": "EVML Big Mac",
                "base_price": 4.99,
                "offer_price": 3.99,
                "discount_depth": "20%",
                "impact_index": 40,
                "created_by": "admin",
            },
            {
                "scenario_id": 159,
                "offer_id": 1159,
                "ohm_id": 59,
                "channel": "Non Digital Mass",
                "coop": "Albany Buffalo Rochester Syracuse",
                "source": "recommended",
                "start_date": "2022-10-03",
                "duration": 6,
                "promo_type": "Deal",
                "dis_mech_id": 1,
                "dis_mech_desc": "Price Discount - @ Price Point",
                "item_grp_id": 1,
                "item_grp_desc": "Individual",
                "offer_desc": "2 of $4 mcnuggets",
                "base_price": 4,
                "offer_price": 3,
                "discount_depth": "25%",
                "impact_index": 60,
                "created_by": "admin",
            },
            {
                "scenario_id": 158,
                "offer_id": 1157,
                "ohm_id": 5,
                "channel": "Non Digital Mass",
                "coop": "Alabama NW Florida",
                "source": "fixed",
                "start_date": "2022-10-04",
                "duration": 5,
                "promo_type": "Deal",
                "dis_mech_id": 1,
                "dis_mech_desc": "Price Discount - @ Price Point",
                "item_grp_id": 1,
                "item_grp_desc": "Individual",
                "offer_desc": "EVML Big Mac",
                "base_price": 5.99,
                "offer_price": 4.99,
                "discount_depth": "30%",
                "impact_index": 10,
                "created_by": "admin",
            },
            {
                "scenario_id": 156,
                "offer_id": 1156,
                "ohm_id": 56,
                "channel": "Non Digital Mass",
                "coop": "Albany Buffalo Rochester Syracuse",
                "source": "recommended",
                "start_date": "2022-10-06",
                "duration": 8,
                "promo_type": "Deal",
                "dis_mech_id": 1,
                "dis_mech_desc": "Price Discount - @ Price Point",
                "item_grp_id": 1,
                "item_grp_desc": "Individual",
                "offer_desc": "2 of $4 mcnuggets",
                "base_price": 3,
                "offer_price": 2,
                "discount_depth": "30%",
                "impact_index": 30,
                "created_by": "admin",
            },
            {
                "scenario_id": 159,
                "offer_id": 1158,
                "ohm_id": 59,
                "channel": "Non Digital Mass",
                "coop": "Alabama NW Florida",
                "source": "fixed",
                "start_date": "2022-10-03",
                "duration": 6,
                "promo_type": "Deal",
                "dis_mech_id": 1,
                "dis_mech_desc": "Price Discount - @ Price Point",
                "item_grp_id": 1,
                "item_grp_desc": "Individual",
                "offer_desc": "EVML Big Mac",
                "base_price": 4.99,
                "offer_price": 3.99,
                "discount_depth": "20%",
                "impact_index": 40,
                "created_by": "admin",
            },
            {
                "scenario_id": 159,
                "offer_id": 1159,
                "ohm_id": 59,
                "channel": "Non Digital Mass",
                "coop": "Albany Buffalo Rochester Syracuse",
                "source": "recommended",
                "start_date": "2022-10-03",
                "duration": 6,
                "promo_type": "Deal",
                "dis_mech_id": 1,
                "dis_mech_desc": "Price Discount - @ Price Point",
                "item_grp_id": 1,
                "item_grp_desc": "Individual",
                "offer_desc": "2 of $4 mcnuggets",
                "base_price": 4,
                "offer_price": 3,
                "discount_depth": "25%",
                "impact_index": 60,
                "created_by": "admin",
            },
            {
                "scenario_id": 158,
                "offer_id": 1157,
                "ohm_id": 5,
                "channel": "Non Digital Mass",
                "coop": "Alabama NW Florida",
                "source": "fixed",
                "start_date": "2022-10-04",
                "duration": 5,
                "promo_type": "Deal",
                "dis_mech_id": 1,
                "dis_mech_desc": "Price Discount - @ Price Point",
                "item_grp_id": 1,
                "item_grp_desc": "Individual",
                "offer_desc": "EVML Big Mac",
                "base_price": 5.99,
                "offer_price": 4.99,
                "discount_depth": "30%",
                "impact_index": 10,
                "created_by": "admin",
            },
            {
                "scenario_id": 156,
                "offer_id": 1156,
                "ohm_id": 56,
                "channel": "Non Digital Mass",
                "coop": "Albany Buffalo Rochester Syracuse",
                "source": "recommended",
                "start_date": "2022-10-06",
                "duration": 8,
                "promo_type": "Deal",
                "dis_mech_id": 1,
                "dis_mech_desc": "Price Discount - @ Price Point",
                "item_grp_id": 1,
                "item_grp_desc": "Individual",
                "offer_desc": "2 of $4 mcnuggets",
                "base_price": 3,
                "offer_price": 2,
                "discount_depth": "30%",
                "impact_index": 30,
                "created_by": "admin",
            },
        ],
        "status": "OK",
        "http_code": 200,
    }
}


export const packageSummaryDetails = {
    offerPackageDetails: {
        "data": [
            {
                "scenario_id": 159,
                "package_id": 1158,
                "scenario_name": "Discount Package 007",
                "channel": "Non Digital Mass",
                "coops": [
                    {
                        "ohm_id": 60,
                        "coop_name": "Alabama NW Florida",
                        "promo_type": "Deal",
                        "start_date": "2022-10-03",
                        "duration": 6,
                        "objective": "GC Lift",
                        "lower_bound": "Margin-80%",
                        "fixed_promo": "Y",
                        "competition_promo": "N",
                        "product_categories": [
                            "DESSERTS",
                            "ENTREES",
                            "COMBO MEALS",
                        ],
                        "items": [
                            { "category_id": 1, "item_id": 1, "category": 'Breakfast', "item_name": 'BF Double Fresh McMuffin', "day_part": 'BreakFast' },
                            { "category_id": 1, "item_id": 2, "category": 'Breakfast', "item_name": 'BF Chicken Fresh McMuffin', "day_part": 'BreakFast' },
                            { "category_id": 1, "item_id": 3, "category": 'Breakfast', "item_name": 'BF Big Breakfast Wrap', "day_part": 'BreakFast' },
                            { "category_id": 1, "item_id": 24, "category": 'Breakfast', "item_name": 'BF Hash Brown', "day_part": 'BreakFast' },
                            { "category_id": 1, "item_id": 42, "category": 'Breakfast', "item_name": 'BF Sausage McMuffin w/o egg', "day_part": 'BreakFast' },
                            { "category_id": 1, "item_id": 43, "category": 'Breakfast', "item_name": 'BF Fresh McMuffin', "day_part": 'ROD' },
                            { "category_id": 1, "item_id": 44, "category": 'Breakfast', "item_name": 'BF Double Sausage & Egg McMuffin', "day_part": 'ROD' }
                        ],
                        "promo_mechanics": ["atpp", "bogomatch", "bogomix"],
                        "promo_item_1_min": 0.1,
                        "promo_item_1_max": 0.2,
                        "promo_item_2_min": 0.2,
                        "promo_item_2_max": 0.3,
                        "max_promotions": [
                            {
                                "product_category": "COMBO MEALS",
                                "max_value": 3
                            },
                            {
                                "product_category": "ENTREES",
                                "max_value": 2
                            },
                            {
                                "product_category": "DESSERTS",
                                "max_value": 2
                            },
                        ]
                    },
                    {
                        "ohm_id": 116,
                        "coop_name": "Alaska",
                        "promo_type": "Deal",
                        "start_date": "2022-10-04",
                        "duration": 8,
                        "objective": "z",
                        "lower_bound": "Margin-60%",
                        "fixed_promo": "Y",
                        "competition_promo": "N",
                        "product_categories": [
                            "DESSERTS",
                            "ENTREES",
                            "COMBO MEALS",
                        ],
                        "items": [
                            { "category_id": 1, "item_id": 1, "category": 'Breakfast', "item_name": 'BF Double Fresh McMuffin', "day_part": 'BreakFast' },
                            { "category_id": 1, "item_id": 2, "category": 'Breakfast', "item_name": 'BF Chicken Fresh McMuffin', "day_part": 'BreakFast' },
                            { "category_id": 1, "item_id": 3, "category": 'Breakfast', "item_name": 'BF Big Breakfast Wrap', "day_part": 'BreakFast' },
                            { "category_id": 1, "item_id": 24, "category": 'Breakfast', "item_name": 'BF Hash Brown', "day_part": 'BreakFast' },
                            { "category_id": 1, "item_id": 42, "category": 'Breakfast', "item_name": 'BF Sausage McMuffin w/o egg', "day_part": 'BreakFast' },
                            { "category_id": 1, "item_id": 43, "category": 'Breakfast', "item_name": 'BF Fresh McMuffin', "day_part": 'ROD' },
                            { "category_id": 1, "item_id": 44, "category": 'Breakfast', "item_name": 'BF Double Sausage & Egg McMuffin', "day_part": 'ROD' }
                        ],
                        "promo_mechanics": ["atpp", "bogomatch", "bogomix"],
                        "promo_item_1_min": 0.1,
                        "promo_item_1_max": 0.2,
                        "promo_item_2_min": 0.2,
                        "promo_item_2_max": 0.3,
                        "max_promotions": [
                            {
                                "product_category": "COMBO MEALS",
                                "max_value": 3
                            },
                            {
                                "product_category": "ENTREES",
                                "max_value": 2
                            },
                            {
                                "product_category": "DESSERTS",
                                "max_value": 2
                            },
                        ]
                    },
                ],
                "start_date": "2022-10-03",
                "duration": [6, 8],
                "status": "Completed",
                "modified_at": "2022-09-05",
                "created_by": "admin",
            },
            {
                "scenario_id": 160,
                "package_id": 1159,
                "scenario_name": "Discount Package 007",
                "channel": "ABC",
                "coops": [
                    {
                        "ohm_id": 61,
                        "coop_name": "ABC Alabama NW Florida",
                        "promo_type": "Deal",
                        "start_date": "2022-10-05",
                        "duration": 6,
                        "objective": "y",
                        "lower_bound": "Margin-50%",
                        "fixed_promo": "Y",
                        "competition_promo": "N",
                        "product_categories": [
                            "DESSERTS",
                            "ENTREES",
                            "COMBO MEALS",
                        ],
                        "items": [
                            { "category_id": 1, "item_id": 1, "category": 'Breakfast', "item_name": 'BF Double Fresh McMuffin', "day_part": 'BreakFast' },
                            { "category_id": 1, "item_id": 2, "category": 'Breakfast', "item_name": 'BF Chicken Fresh McMuffin', "day_part": 'BreakFast' },
                            { "category_id": 1, "item_id": 3, "category": 'Breakfast', "item_name": 'BF Big Breakfast Wrap', "day_part": 'BreakFast' },
                            { "category_id": 1, "item_id": 24, "category": 'Breakfast', "item_name": 'BF Hash Brown', "day_part": 'BreakFast' },
                            { "category_id": 1, "item_id": 42, "category": 'Breakfast', "item_name": 'BF Sausage McMuffin w/o egg', "day_part": 'BreakFast' },
                            { "category_id": 1, "item_id": 43, "category": 'Breakfast', "item_name": 'BF Fresh McMuffin', "day_part": 'ROD' },
                            { "category_id": 1, "item_id": 44, "category": 'Breakfast', "item_name": 'BF Double Sausage & Egg McMuffin', "day_part": 'ROD' }
                        ],
                        "promo_mechanics": ["atpp", "bogomatch", "bogomix"],
                        "promo_item_1_min": 0.1,
                        "promo_item_1_max": 0.2,
                        "promo_item_2_min": 0.2,
                        "promo_item_2_max": 0.3,
                        "max_promotions": [
                            {
                                "product_category": "COMBO MEALS",
                                "max_value": 3
                            },
                            {
                                "product_category": "ENTREES",
                                "max_value": 2
                            },
                            {
                                "product_category": "DESSERTS",
                                "max_value": 2
                            },
                        ]
                    },
                    {
                        "ohm_id": 117,
                        "coop_name": "ABC Alaska",
                        "promo_type": "Deal",
                        "start_date": "2022-10-06",
                        "duration": 8,
                        "objective": "x",
                        "lower_bound": "Margin-70%",
                        "fixed_promo": "Y",
                        "competition_promo": "N",
                        "product_categories": [
                            "DESSERTS",
                            "ENTREES",
                            "COMBO MEALS",
                        ],
                        "items": [
                            { "category_id": 1, "item_id": 1, "category": 'Breakfast', "item_name": 'BF Double Fresh McMuffin', "day_part": 'BreakFast' },
                            { "category_id": 1, "item_id": 2, "category": 'Breakfast', "item_name": 'BF Chicken Fresh McMuffin', "day_part": 'BreakFast' },
                            { "category_id": 1, "item_id": 3, "category": 'Breakfast', "item_name": 'BF Big Breakfast Wrap', "day_part": 'BreakFast' },
                            { "category_id": 1, "item_id": 24, "category": 'Breakfast', "item_name": 'BF Hash Brown', "day_part": 'BreakFast' },
                            { "category_id": 1, "item_id": 42, "category": 'Breakfast', "item_name": 'BF Sausage McMuffin w/o egg', "day_part": 'BreakFast' },
                            { "category_id": 1, "item_id": 43, "category": 'Breakfast', "item_name": 'BF Fresh McMuffin', "day_part": 'ROD' },
                            { "category_id": 1, "item_id": 44, "category": 'Breakfast', "item_name": 'BF Double Sausage & Egg McMuffin', "day_part": 'ROD' }
                        ],
                        "promo_mechanics": ["atpp", "bogomatch", "bogomix"],
                        "promo_item_1_min": 0.1,
                        "promo_item_1_max": 0.2,
                        "promo_item_2_min": 0.2,
                        "promo_item_2_max": 0.3,
                        "max_promotions": [
                            {
                                "product_category": "COMBO MEALS",
                                "max_value": 3
                            },
                            {
                                "product_category": "ENTREES",
                                "max_value": 2
                            },
                            {
                                "product_category": "DESSERTS",
                                "max_value": 2
                            },
                        ]
                    },
                ],
                "start_date": "2022-10-03",
                "duration": [6, 8],
                "status": "Completed",
                "modified_at": "2022-09-05",
                "created_by": "admin",
            }
        ],
        "status": "OK",
        "http_code": 200,
    },

    week: "Weeks",
    promo_item_1: "Promo on 1st Item:",
    promo_item_2: "Promo on 2nd Item:"
}


export const impactByGeo = {

    "data": [
        {
            "coop_name": "Alaska",
            "promo_Type": ["Deal + Value"],
            "metric_type": {
                "scenario_value": {
                    "gc": 4999604,
                    "sales": 52790348,
                    "gp": 54557172,
                    "acv": 21.11781173068907,
                    "urw": 1,
                    "upt": 2080.006336501851
                },
                "lift": {
                    "gc": 0.9786170888689931,
                    "sales": 1.0268545894787293,
                    "gp": 1.0400986040184736,
                    "acv": 1.0492914962945161,
                    "urw": 2,
                    "upt": 1.0008231593280474
                },
                "base_value": {
                    "gc": 5108846,
                    "sales": 51409760,
                    "gp": 52453846,
                    "acv": 20.125781830182394,
                    "urw": 3,
                    "upt": 2078.2955681185144
                },
                "lift_value": {
                    "gc": 23,
                    "sales": 52,
                    "gp": 45,
                    "acv": 64,
                    "urw": 4,
                    "upt": 21
                }
            }
        },
        {
            "coop_name": "Alabama",
            "promo_Type": ["Deal + Value"],
            "metric_type": {
                "scenario_value": {
                    "gc": 4999604,
                    "sales": 52790348,
                    "gp": 54557172,
                    "acv": 21.11781173068907,
                    "urw": 5,
                    "upt": 2080.006336501851
                },
                "lift": {
                    "gc": 0.9786170888689931,
                    "sales": 1.0268545894787293,
                    "gp": 1.0400986040184736,
                    "acv": 1.0492914962945161,
                    "urw": 2,
                    "upt": 1.0008231593280474
                },
                "base_value": {
                    "gc": 5108846,
                    "sales": 51409760,
                    "gp": 52453846,
                    "acv": 20.125781830182394,
                    "urw": 6,
                    "upt": 2078.2955681185144
                },
                "lift_value": {
                    "gc": 23,
                    "sales": 52,
                    "gp": 45,
                    "acv": 64,
                    "urw": 7,
                    "upt": 21
                }
            }
        },
    ],
    "status": "ERROR",
    "http_code": 200,
}


export const impactByProductCategory = {
    "data": [
        {
            "coop_name": "Alaska",
            "graularity": "pg",
            "promo_Type": ["Deal"],
            "granularity_value": "SIDE ITEMS",
            "metric_type": {
                "scenario_value": {
                    "gc": 4999604,
                    "sales": 52790348,
                    "gp": 54557172,
                    "acv": 21.11781173068907,
                    "urw": 1,
                    "upt": 2080.006336501851
                },
                "lift": {
                    "gc": 0.9786170888689931,
                    "sales": 1.0268545894787293,
                    "gp": 1.0400986040184736,
                    "acv": 1.0492914962945161,
                    "urw": 2,
                    "upt": 1.0008231593280474
                },
                "base_value": {
                    "gc": 5108846,
                    "sales": 51409760,
                    "gp": 52453846,
                    "acv": 20.125781830182394,
                    "urw": 3,
                    "upt": 2078.2955681185144
                },
                "lift_value": {
                    "gc": 23,
                    "sales": 52,
                    "gp": 45,
                    "acv": 64,
                    "urw": 4,
                    "upt": 21
                }
            }
        },
        {
            "coop_name": "Alaska",
            "graularity": "pg",
            "promo_Type": ["Deal"],
            "granularity_value": "COMBO MEALS",
            "metric_type": {
                "scenario_value": {
                    "gc": 4999604,
                    "sales": 52790348,
                    "gp": 54557172,
                    "acv": 21.11781173068907,
                    "urw": 1,
                    "upt": 2080.006336501851
                },
                "lift": {
                    "gc": 0.9786170888689931,
                    "sales": 1.0268545894787293,
                    "gp": 1.0400986040184736,
                    "acv": 1.0492914962945161,
                    "urw": 2,
                    "upt": 1.0008231593280474
                },
                "base_value": {
                    "gc": 5108846,
                    "sales": 51409760,
                    "gp": 52453846,
                    "acv": 20.125781830182394,
                    "urw": 3,
                    "upt": 2078.2955681185144
                },
                "lift_value": {
                    "gc": 23,
                    "sales": 52,
                    "gp": 45,
                    "acv": 64,
                    "urw": 4,
                    "upt": 21
                }
            }
        },
        {
            "coop_name": "Alabama",
            "graularity": "pg",
            "promo_Type": ["Deal", "Value"],
            "granularity_value": "COMBO MEALS",
            "metric_type": {
                "scenario_value": {
                    "gc": 4999604,
                    "sales": 52790348,
                    "gp": 54557172,
                    "acv": 21.11781173068907,
                    "urw": 5,
                    "upt": 2080.006336501851
                },
                "lift": {
                    "gc": 0.9786170888689931,
                    "sales": 1.0268545894787293,
                    "gp": 1.0400986040184736,
                    "acv": 1.0492914962945161,
                    "urw": 2,
                    "upt": 1.0008231593280474
                },
                "base_value": {
                    "gc": 5108846,
                    "sales": 51409760,
                    "gp": 52453846,
                    "acv": 20.125781830182394,
                    "urw": 6,
                    "upt": 2078.2955681185144
                },
                "lift_value": {
                    "gc": 23,
                    "sales": 52,
                    "gp": 45,
                    "acv": 64,
                    "urw": 7,
                    "upt": 21
                }
            }
        },
    ],
    "status": "ERROR",
    "http_code": 200,
}

export const scenarioComapreByProductCategory = {

    "data": {
        "data": [
            {
                "coop_name": "35 - ALFA",
                "geo_id": "3",
                "gc": [
                    {
                        "product_name": "BEVERAGES",
                        "kpi_details":
                        {

                            "MGTest28Nov": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "BKFST ENTREES",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 714
                            },

                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "BKFST SIDE ITEMS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "BREAKFAST MEALS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "COMBO MEALS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "DESSERTS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "ENTREES",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "HAPPY MEALS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "OTHER",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "SIDE ITEMS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    }
                ],
                "sales": [
                    {
                        "product_name": "BEVERAGES",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 6424526.475673394,
                                "lift": 0.07172786557970699,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 6424526.475673394,
                                "lift": 0.07172786557970699,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "BKFST ENTREES",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 8568060.0250087,
                                "lift": 0.24138433128518133,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 8568060.0250087,
                                "lift": 0.24138433128518133,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "BKFST SIDE ITEMS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 1888049.4911432911,
                                "lift": 0.22352502092113,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 1888049.4911432911,
                                "lift": 0.22352502092113,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "BREAKFAST MEALS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 3360558.490180821,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 3360558.490180821,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "COMBO MEALS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 16093252.08473762,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 16093252.08473762,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "DESSERTS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 2022178.1037644348,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 2022178.1037644348,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "ENTREES",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 10857356.922637764,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 11877860.37651716,
                                "lift": 0.09399188597656113,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "HAPPY MEALS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 4169538.8008718416,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 4169538.8008718416,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "OTHER",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 80095.72768863829,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 80095.72768863829,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "SIDE ITEMS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 5045496.46945082,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 5045496.46945082,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    }
                ],
                "gp": [
                    {
                        "product_name": "BEVERAGES",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 4616429.031461473,
                                "lift": 0.07855276257956607,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 4616429.031461473,
                                "lift": 0.07855276257956607,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "BKFST ENTREES",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 6397916.462685989,
                                "lift": 0.2007382616396296,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 6397916.462685989,
                                "lift": 0.2007382616396296,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "BKFST SIDE ITEMS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 1544490.555594457,
                                "lift": 0.13534169101125818,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 1544490.555594457,
                                "lift": 0.13534169101125818,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "BREAKFAST MEALS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 2326864.7675994816,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 2326864.7675994816,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "COMBO MEALS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 10972096.034648025,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 10972096.034648025,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "DESSERTS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 1606971.2156571383,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 1606971.2156571383,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "ENTREES",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 7821675.019933081,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 8530883.441801058,
                                "lift": 0.09067219234506685,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "HAPPY MEALS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 3052819.6773414514,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 3052819.6773414514,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "OTHER",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 54089.86016956138,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 54089.86016956138,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "SIDE ITEMS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 4471546.931107745,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 4471546.931107745,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    }
                ],
                "acv": [
                    {
                        "product_name": "BEVERAGES",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "BKFST ENTREES",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "BKFST SIDE ITEMS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "BREAKFAST MEALS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "COMBO MEALS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "DESSERTS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "ENTREES",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "HAPPY MEALS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "OTHER",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "SIDE ITEMS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 0,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    }
                ],
                "upt": [
                    {
                        "product_name": "BEVERAGES",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 4502.336135912244,
                                "lift": 0.07206527561337517,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 4327.230130009408,
                                "lift": 0.03037023934488806,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "BKFST ENTREES",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 3024.652996841738,
                                "lift": 0.3449314043086726,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 2907.017420658423,
                                "lift": 0.29262398893306213,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "BKFST SIDE ITEMS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 1057.266011816784,
                                "lift": 0.39375953296978666,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 1016.1465522923463,
                                "lift": 0.3395530815543394,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "BREAKFAST MEALS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 738.9829421701556,
                                "lift": -0.020105185352850795,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 710.2422290098034,
                                "lift": -0.058215504533405786,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "COMBO MEALS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 2512.9205177704143,
                                "lift": -0.02010518535285094,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 2415.1873717468984,
                                "lift": -0.05821550453340589,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "DESSERTS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 907.2667239692507,
                                "lift": -0.020105185352850944,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 871.9810750245574,
                                "lift": -0.058215504533405946,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "ENTREES",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 3459.0449985815762,
                                "lift": -0.02010518535285108,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 3610.42970836298,
                                "lift": 0.022779799431241077,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "HAPPY MEALS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 1020.3506657235184,
                                "lift": -0.020105185352851024,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 980.666927259388,
                                "lift": -0.058215504533405994,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "OTHER",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 18.000448922267832,
                                "lift": -0.02010518535285101,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 17.30037086943323,
                                "lift": -0.05821550453340573,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "SIDE ITEMS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 1918.6233807500907,
                                "lift": -0.020105185352850913,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 1844.0037906321547,
                                "lift": -0.058215504533405744,
                                "scenario_id": 715
                            }
                        }

                    }
                ],
                "urw": [
                    {
                        "product_name": "BEVERAGES",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 3947.4311497028784,
                                "lift": 0.09406158659939032,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 3947.4311497028784,
                                "lift": 0.09406158659939032,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "BKFST ENTREES",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 2651.869850751623,
                                "lift": 0.3725262999712577,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 2651.869850751623,
                                "lift": 0.3725262999712577,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "BKFST SIDE ITEMS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 926.9598409764427,
                                "lift": 0.4223562694039427,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 926.9598409764427,
                                "lift": 0.4223562694039427,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "BREAKFAST MEALS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 647.9045981826735,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 647.9045981826735,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "COMBO MEALS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 2193.9112628174294,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 2193.9112628174294,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "DESSERTS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 795.4477007433522,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 795.4477007433522,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "ENTREES",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 3019.9275016121906,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 3279.6471584144538,
                                "lift": 0.08600195092882583,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "HAPPY MEALS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 890.8195869005231,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 890.8195869005231,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "OTHER",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 196.02812536364223,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 196.02812536364223,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    },
                    {
                        "product_name": "SIDE ITEMS",
                        "kpi_details":
                        {
                            "MGTest28Nov": {
                                "scenario_value": 1675.0587272323137,
                                "lift": 0,
                                "scenario_id": 714
                            },


                            "Scenario_Coop User1_2022-11-28 10:14": {
                                "scenario_value": 1675.0587272323137,
                                "lift": 0,
                                "scenario_id": 715
                            }
                        }

                    }
                ]
            }
        ],
        "scenario_list": [
            {
                "scenario_id": 714,
                "scenario_name": "MGTest28Nov"
            },
            {
                "scenario_id": 715,
                "scenario_name": "Scenario_Coop User1_2022-11-28 10:14"
            }
        ]
    },
    "status": "OK",
    "http_code": 200

}

export const scenarioComapreByGeoPromoType = {
    "data": {
        "scenario_list": [
            {
                "scenario_id": 1,
                "Scenario_name": "name_1"
            },
            {
                "scenario_id": 2,
                "Scenario_name": "name_2"
            },
            {
                "scenario_id": 3,
                "Scenario_name": "name_3"
            },
            {
                "scenario_id": 4,
                "Scenario_name": "name_4"
            }
        ],
        "gc": [
            {
                "coop_name": "coop_1",
                "geo_id": "1",
                "promo_type": ["Deal", "Value"],
                "kpi_details": [
                    {
                        name_1:
                        {
                            "scenario_id": "1",
                            "lift": "1.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_2:
                        {
                            "scenario_id": "2",
                            "lift": "2.0",
                            "scenario_value": "0.0"

                        }
                    },
                    {
                        name_3:
                        {
                            "scenario_id": "3",
                            "lift": "3.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_4:
                        {
                            "scenario_id": "4",
                            "lift": "4.0",
                            "scenario_value": "0.0"
                        }
                    }
                ]
            },
            {
                "coop_name": "coop_2",
                "geo_id": "2",
                "promo_type": ["Deal", "Value"],
                "kpi_details": [
                    {
                        name_1:
                        {
                            "scenario_id": "1",
                            "lift": "5.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_2:
                        {
                            "scenario_id": "2",
                            "lift": "6.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_3:
                        {
                            "scenario_id": "3",
                            "lift": "7.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_4:
                        {
                            "scenario_id": "4",
                            "lift": "8.0",
                            "scenario_value": "0.0"
                        }
                    }
                ]
            },
            {
                "coop_name": "coop_3",
                "geo_id": "3",
                "promo_type": ["Deal", "Value"],
                "kpi_details": [
                    {
                        name_1:
                        {
                            "scenario_id": "1",
                            "lift": "9.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_2:
                        {
                            "scenario_id": "2",
                            "lift": "1.5",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_3:
                        {
                            "scenario_id": "3",
                            "lift": "2.5",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_4:
                        {
                            "scenario_id": "4",
                            "lift": "8.3",
                            "scenario_value": "0.0"
                        }
                    }
                ]
            },
        ],
        "sales": [
            {
                "coop_name": "coop_1",
                "geo_id": "1",
                "promo_type": ["Deal", "Value"],
                "kpi_details": [
                    {
                        name_1:
                        {
                            "scenario_id": "1",
                            "lift": "9.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_2:
                        {
                            "scenario_id": "2",
                            "lift": "8.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_3:
                        {
                            "scenario_id": "3",
                            "lift": "7.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_4:
                        {
                            "scenario_id": "4",
                            "lift": "6.0",
                            "scenario_value": "0.0"
                        }
                    }
                ]
            },
            {
                "coop_name": "coop_2",
                "geo_id": "2",
                "promo_type": ["Deal", "Value"],
                "kpi_details": [
                    {
                        name_1:
                        {
                            "scenario_id": "1",
                            "lift": "5.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_2:
                        {
                            "scenario_id": "2",
                            "lift": "4.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_3:
                        {
                            "scenario_id": "3",
                            "lift": "3.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_4:
                        {
                            "scenario_id": "4",
                            "lift": "2.0",
                            "scenario_value": "0.0"
                        }
                    }
                ]
            },
            {
                "coop_name": "coop_3",
                "geo_id": "3",
                "promo_type": ["Deal", "Value"],
                "kpi_details": [
                    {
                        name_1:
                        {
                            "scenario_id": "1",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_2:
                        {
                            "scenario_id": "2",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_3:
                        {
                            "scenario_id": "3",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_4:
                        {
                            "scenario_id": "4",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    }
                ]
            },
        ],
        "gp": [
            {
                "coop_name": "coop_1",
                "geo_id": "1",
                "promo_type": ["Deal", "Value"],
                "kpi_details": [
                    {
                        name_1:
                        {
                            "scenario_id": "1",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_2:
                        {
                            "scenario_id": "2",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_3:
                        {
                            "scenario_id": "3",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_4:
                        {
                            "scenario_id": "4",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    }
                ]
            },
            {
                "coop_name": "coop_2",
                "geo_id": "2",
                "promo_type": ["Deal", "Value"],
                "kpi_details": [
                    {
                        name_1:
                        {
                            "scenario_id": "1",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_2:
                        {
                            "scenario_id": "2",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_3:
                        {
                            "scenario_id": "3",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_4:
                        {
                            "scenario_id": "4",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    }
                ]
            },
            {
                "coop_name": "coop_3",
                "geo_id": "3",
                "promo_type": ["Deal", "Value"],
                "kpi_details": [
                    {
                        name_1:
                        {
                            "scenario_id": "1",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_2:
                        {
                            "scenario_id": "2",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_3:
                        {
                            "scenario_id": "3",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_4:
                        {
                            "scenario_id": "4",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    }
                ]
            },
        ],
        "acv": [
            {
                "coop_name": "coop_1",
                "geo_id": "1",
                "promo_type": ["Deal", "Value"],
                "kpi_details": [
                    {
                        name_1:
                        {
                            "scenario_id": "1",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_2:
                        {
                            "scenario_id": "2",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_3:
                        {
                            "scenario_id": "3",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_4:
                        {
                            "scenario_id": "4",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    }
                ]
            },
            {
                "coop_name": "coop_2",
                "geo_id": "2",
                "promo_type": ["Deal", "Value"],
                "kpi_details": [
                    {
                        name_1:
                        {
                            "scenario_id": "1",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_2:
                        {
                            "scenario_id": "2",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_3:
                        {
                            "scenario_id": "3",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_4:
                        {
                            "scenario_id": "4",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    }
                ]
            },
            {
                "coop_name": "coop_3",
                "geo_id": "3",
                "promo_type": ["Deal", "Value"],
                "kpi_details": [
                    {
                        name_1:
                        {
                            "scenario_id": "1",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_2:
                        {
                            "scenario_id": "2",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_3:
                        {
                            "scenario_id": "3",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_4:
                        {
                            "scenario_id": "4",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    }
                ]
            },
        ],
        "upt": [
            {
                "coop_name": "coop_1",
                "geo_id": "1",
                "promo_type": ["Deal", "Value"],
                "kpi_details": [
                    {
                        name_1:
                        {
                            "scenario_id": "1",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_2:
                        {
                            "scenario_id": "2",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_3:
                        {
                            "scenario_id": "3",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_4:
                        {
                            "scenario_id": "4",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    }
                ]
            },
            {
                "coop_name": "coop_2",
                "promo_type": ["Deal", "Value"],
                "geo_id": "2",
                "kpi_details": [
                    {
                        name_1:
                        {
                            "scenario_id": "1",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_2:
                        {
                            "scenario_id": "2",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_3:
                        {
                            "scenario_id": "3",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_4:
                        {
                            "scenario_id": "4",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    }
                ]
            },
            {
                "coop_name": "coop_3",
                "geo_id": "3",
                "promo_type": ["Deal", "Value"],
                "kpi_details": [
                    {
                        name_1:
                        {
                            "scenario_id": "1",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_2:
                        {
                            "scenario_id": "2",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_3:
                        {
                            "scenario_id": "3",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_4:
                        {
                            "scenario_id": "4",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    }
                ]
            },
        ],
        "urw": [
            {
                "coop_name": "coop_1",
                "geo_id": "1",
                "promo_type": ["Deal", "Value"],
                "kpi_details": [
                    {
                        name_1:
                        {
                            "scenario_id": "1",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_2:
                        {
                            "scenario_id": "2",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_3:
                        {
                            "scenario_id": "3",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_4:
                        {
                            "scenario_id": "4",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    }
                ]
            },
            {
                "coop_name": "coop_2",
                "geo_id": "2",
                "promo_type": ["Deal", "Value"],
                "kpi_details": [
                    {
                        name_1:
                        {
                            "scenario_id": "1",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_2:
                        {
                            "scenario_id": "2",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_3:
                        {
                            "scenario_id": "3",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_4:
                        {
                            "scenario_id": "4",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    }
                ]
            },
            {
                "coop_name": "coop_3",
                "geo_id": "3",
                "promo_type": ["Deal", "Value"],
                "kpi_details": [
                    {
                        name_1:
                        {
                            "scenario_id": "1",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_2:
                        {
                            "scenario_id": "2",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_3:
                        {
                            "scenario_id": "3",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    },
                    {
                        name_4:
                        {
                            "scenario_id": "4",
                            "lift": "0.0",
                            "scenario_value": "0.0"
                        }
                    }
                ]
            },
        ],
        "status": "OK",
        "http_code": 200
    }
}

export const byGeoPromoTypeGraph = {
    chart: {
        type: 'column'
    },
    title: {
        text: '',

    },
    xAxis: {
        categories: [],
        crosshair: true
    },
    yAxis: {
        labels: {
            format: '{text}%'
        },
        gridLineDashStyle: 'Dash',
        gridLineColor: '#EDEDED',
        //    min: 0,
        title: {
            text: '',

        },
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0,
            pointWidth: 8
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 210,
        itemMarginTop: 12
    },

    series: []


};

export const byProductCategoryGraph = {
    chart: {
        type: 'column',
        title: ''
    },
    title: {
        text: '',

    },
    xAxis: {
        categories: [],
        crosshair: true
    },
    yAxis: {
        labels: {
            format: '{text}%'
        },
        gridLineDashStyle: 'Dash',
        gridLineColor: '#EDEDED',
        //    min: 0,
        title: {
            text: '',

        },
        // title: {
        //     text: '',
        // },
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        // column: {
        //     pointPadding: 0.05,
        //     borderWidth: 0,
        //     pointWidth: 8
        // }
        column: {
            pointPadding: 0.2,
            borderWidth: 0,
            pointWidth: 8
        }
    },
    legend: {
        // layout: 'vertical',
        // align: 'right',
        // verticalAlign: 'middle',
        // itemWidth: 200,
        // x: 0,
        // y: 0

        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 210,
        itemMarginTop: 12

    },

    series: []


};
export const GeoOffersData =
{

    "data": [
        {
            "coop_name": "Alaska",
            "promo_Type": ["Deal + Value"],
            "metric_type": {
                "scenario_value": {
                    "gc": 4999604,
                    "sales": 52790348,
                    "gp": 54557172,
                    "acv": 21.11781173068907,
                    "urw": 1,
                    "upt": 2080.006336501851
                },
                "lift": {
                    "gc": 0.9786170888689931,
                    "sales": 1.0268545894787293,
                    "gp": 1.0400986040184736,
                    "acv": 1.0492914962945161,
                    "urw": 2,
                    "upt": 1.0008231593280474
                },
                "base_value": {
                    "gc": 5108846,
                    "sales": 51409760,
                    "gp": 52453846,
                    "acv": 20.125781830182394,
                    "urw": 3,
                    "upt": 2078.2955681185144
                },
                "lift_value": {
                    "gc": 23,
                    "sales": 52,
                    "gp": 45,
                    "acv": 64,
                    "urw": 4,
                    "upt": 21
                }
            }
        },
        {
            "coop_name": "Alabama",
            "promo_Type": ["Deal + Value"],
            "metric_type": {
                "scenario_value": {
                    "gc": 4999604,
                    "sales": 52790348,
                    "gp": 54557172,
                    "acv": 21.11781173068907,
                    "urw": 5,
                    "upt": 2080.006336501851
                },
                "lift": {
                    "gc": 0.9786170888689931,
                    "sales": 1.0268545894787293,
                    "gp": 1.0400986040184736,
                    "acv": 1.0492914962945161,
                    "urw": 2,
                    "upt": 1.0008231593280474
                },
                "base_value": {
                    "gc": 5108846,
                    "sales": 51409760,
                    "gp": 52453846,
                    "acv": 20.125781830182394,
                    "urw": 6,
                    "upt": 2078.2955681185144
                },
                "lift_value": {
                    "gc": 23,
                    "sales": 52,
                    "gp": 45,
                    "acv": 64,
                    "urw": 7,
                    "upt": 21
                }
            }
        },
    ],
    "status": "ERROR",
    "http_code": 200,
}


export const scenarioSelectionPage = {
    data: {
        "list_of_scenario": [
            {
                "start_date": "02-07-22",
                "end_date": "03-06-22",
                "channel": "Non Digital Mass",
                "scenario_id": 14,
                "scenario_name": "Package_23",
                "geo": [
                    "Philadelphia"
                ],
                "promo_type": [
                    "Value"
                ],
                "no_of_promos": 3,
                "offers": [
                    {
                        "offer_id": 3,
                        "channel": "Non Digital Mass",
                        "coop": "Philadelphia",
                        "source": "fixed",
                        "duration": 4,
                        "promo_type": "Value",
                        "dis_mech_id": 1,
                        "dis_mech_desc": "Price Discount - @ Price Point",
                        "item_grp_id": 6,
                        "item_grp_desc": "Set of 4",
                        "offer_desc": "$x Meal Bundle (DOUBLE CHEESEBURGER or MCCKN + 4 MCNUGGETS + S FRENCH FRIES + S COKE)",
                        "base_price": 7.89,
                        "offer_price": 7.266,
                        "discount_depth": 800,
                        "offer_impact": "",
                        "child_ohm_id": 148,
                        "min_offer_price": 4,
                        "max_offer_price": 6,
                        "ohm_id": 35,
                        "start_date": "2022-02-07",
                        "end_date": "2022-03-06"
                    },
                    {
                        "offer_id": 15,
                        "channel": "Non Digital Mass",
                        "coop": "Philadelphia",
                        "source": "recommended",
                        "duration": 4,
                        "promo_type": "Value",
                        "dis_mech_id": 8,
                        "dis_mech_desc": "Price Discount - Second @ Price Point",
                        "item_grp_id": 4,
                        "item_grp_desc": "Set of 2",
                        "offer_desc": "Buy 2 (SAUSAGE BURRITO), Get (HB) for $x",
                        "base_price": 2.08,
                        "offer_price": 2.08,
                        "discount_depth": 0,
                        "offer_impact": "",
                        "child_ohm_id": 148,
                        "min_offer_price": 0,
                        "max_offer_price": 1.49,
                        "ohm_id": 35,
                        "start_date": "2022-02-07",
                        "end_date": "2022-03-06"
                    },
                    {
                        "offer_id": 317,
                        "channel": "Non Digital Mass",
                        "coop": "Philadelphia",
                        "source": "recommended",
                        "duration": 4,
                        "promo_type": "Value",
                        "dis_mech_id": 3,
                        "dis_mech_desc": "Buy One, Get One - Mix",
                        "item_grp_id": 3,
                        "item_grp_desc": "Pair - Set2",
                        "offer_desc": "BOGO for $x -Mix (SAUSAGE BISCUIT /SMM /MCCKN BISCUIT /CKN MCGRIDDLE)",
                        "base_price": 1.75,
                        "offer_price": 0.65,
                        "discount_depth": 6300,
                        "offer_impact": "",
                        "child_ohm_id": 148,
                        "min_offer_price": 0,
                        "max_offer_price": 1.09,
                        "ohm_id": 35,
                        "start_date": "2022-02-07",
                        "end_date": "2022-03-06"
                    }
                ]
            },
            {
                "start_date": "08-29-22",
                "end_date": "11-06-22",
                "channel": "Non Digital Mass",
                "scenario_id": 36,
                "scenario_name": "off_coop_alas",
                "geo": [
                    "Alaska",
                    "Philadelphia",
                    "Chicago"
                ],
                "promo_type": [
                    "Deal",
                    "Value"
                ],
                "no_of_promos": 3,
                "offers": [
                    {
                        "offer_id": 5,
                        "channel": "Non Digital Mass",
                        "coop": "Alaska",
                        "source": "fixed",
                        "duration": 5,
                        "promo_type": "Deal",
                        "dis_mech_id": 8,
                        "dis_mech_desc": "Price Discount - Second @ Price Point",
                        "item_grp_id": 4,
                        "item_grp_desc": "Set of 2",
                        "offer_desc": "Free (M FRENCH FRIES) with purchase of (BM)",
                        "base_price": 3.09,
                        "offer_price": 2,
                        "discount_depth": 35.275080906148865,
                        "offer_impact": 0,
                        "child_ohm_id": 61,
                        "min_offer_price": 0,
                        "max_offer_price": 2,
                        "ohm_id": 4,
                        "start_date": "2022-08-29",
                        "end_date": "2022-10-02"
                    },
                    {
                        "offer_id": 6,
                        "channel": "Non Digital Mass",
                        "coop": "Chicago",
                        "source": "recommended",
                        "duration": 2,
                        "promo_type": "Deal",
                        "dis_mech_id": 6,
                        "dis_mech_desc": "Mix and Match – Mix",
                        "item_grp_id": 3,
                        "item_grp_desc": "Pair - Set2",
                        "offer_desc": "2 for $x - Mix (BM /QPC /CCS /10 MCNUGGETS)",
                        "base_price": 9.33,
                        "offer_price": 8,
                        "discount_depth": 15,
                        "offer_impact": 0,
                        "child_ohm_id": 67,
                        "min_offer_price": 5,
                        "max_offer_price": 7,
                        "ohm_id": 10,
                        "start_date": "2022-10-14",
                        "end_date": "2022-10-27"
                    },
                    {
                        "offer_id": 24,
                        "channel": "Non Digital Mass",
                        "coop": "Chicago",
                        "source": "recommended",
                        "duration": 4,
                        "promo_type": "Value",
                        "dis_mech_id": 6,
                        "dis_mech_desc": "Mix and Match – Mix",
                        "item_grp_id": 3,
                        "item_grp_desc": "Pair - Set2",
                        "offer_desc": "2 for $x - Mix (4 MCNUGGETS /MCDOUBLE /MCCKN /S FRENCH FRIES)",
                        "base_price": 4.30299999999999,
                        "offer_price": 3,
                        "discount_depth": 30,
                        "offer_impact": "",
                        "child_ohm_id": 123,
                        "min_offer_price": 2,
                        "max_offer_price": 3.49,
                        "ohm_id": 10,
                        "start_date": "2022-10-02",
                        "end_date": "2022-10-29"
                    }
                ]
            },
            {
                "start_date": "08-29-22",
                "end_date": "10-02-22",
                "channel": "Non Digital Mass",
                "scenario_id": 41,
                "scenario_name": "off_coop_alab",
                "geo": [
                    "Alabama NW Florida"
                ],
                "promo_type": [
                    "Deal"
                ],
                "no_of_promos": 1,
                "offers": [
                    {
                        "offer_id": 4,
                        "channel": "Non Digital Mass",
                        "coop": "Alabama NW Florida",
                        "source": "fixed",
                        "duration": 5,
                        "promo_type": "Deal",
                        "dis_mech_id": 8,
                        "dis_mech_desc": "Price Discount - Second @ Price Point",
                        "item_grp_id": 4,
                        "item_grp_desc": "Set of 2",
                        "offer_desc": "Add (DOUBLE CHEESEBURGER /L FRENCH FRIES) with purchase of (BM /QPC /10 MCNUGGETS /FOF) for $x",
                        "base_price": 3.64,
                        "offer_price": 2,
                        "discount_depth": 45.05494505494506,
                        "offer_impact": 0,
                        "child_ohm_id": 60,
                        "min_offer_price": 0,
                        "max_offer_price": 2,
                        "ohm_id": 3,
                        "start_date": "2022-08-29",
                        "end_date": "2022-10-02"
                    }
                ]
            },
            {
                "start_date": "08-29-22",
                "end_date": "09-02-22",
                "channel": "Non Digital Mass",
                "scenario_id": 131,
                "scenario_name": "abc",
                "geo": [
                    "Alabama NW Florida"
                ],
                "promo_type": [
                    "Deal"
                ],
                "no_of_promos": 1,
                "offers": [
                    {
                        "offer_id": 41,
                        "channel": "Non Digital Mass",
                        "coop": "Alabama NW Florida",
                        "source": "recommended",
                        "duration": 0,
                        "promo_type": "Deal",
                        "dis_mech_id": 5,
                        "dis_mech_desc": "Mix and Match – Match",
                        "item_grp_id": 2,
                        "item_grp_desc": "Pair",
                        "offer_desc": "2 for $x - Match (SME /BEC BISCUIT)",
                        "base_price": 3.44,
                        "offer_price": 2.49,
                        "discount_depth": 24,
                        "offer_impact": 0,
                        "child_ohm_id": 60,
                        "min_offer_price": 2.23,
                        "max_offer_price": 4.96,
                        "ohm_id": 3,
                        "start_date": "2022-08-29",
                        "end_date": "2022-09-02"
                    }
                ]
            },
            {
                "start_date": "10-10-22",
                "end_date": "10-14-22",
                "channel": "Non Digital Mass",
                "scenario_id": 150,
                "scenario_name": "BOGO-Test",
                "geo": [
                    "Alaska",
                    "Chicago"
                ],
                "promo_type": [
                    "Deal"
                ],
                "no_of_promos": 1,
                "offers": [
                    {
                        "offer_id": 6,
                        "channel": "Non Digital Mass",
                        "coop": "Alaska",
                        "source": "recommended",
                        "duration": 0,
                        "promo_type": "Deal",
                        "dis_mech_id": 6,
                        "dis_mech_desc": "Mix and Match – Mix",
                        "item_grp_id": 3,
                        "item_grp_desc": "Pair - Set2",
                        "offer_desc": "2 for $x - Mix (BM /QPC /CCS /10 MCNUGGETS)",
                        "base_price": 11.085,
                        "offer_price": 10,
                        "discount_depth": 10,
                        "offer_impact": 0,
                        "child_ohm_id": 61,
                        "min_offer_price": 5,
                        "max_offer_price": 7,
                        "ohm_id": 4,
                        "start_date": "2022-10-10",
                        "end_date": "2022-10-14"
                    }
                ]
            },
            {
                "start_date": "10-10-22",
                "end_date": "10-14-22",
                "channel": "Non Digital Mass",
                "scenario_id": 150,
                "scenario_name": "BOGO-Test",
                "geo": [
                    "Alaska",
                    "Chicago"
                ],
                "promo_type": [
                    "Deal"
                ],
                "no_of_promos": 1,
                "offers": [
                    {
                        "offer_id": 6,
                        "channel": "Non Digital Mass",
                        "coop": "Alaska",
                        "source": "recommended",
                        "duration": 0,
                        "promo_type": "Deal",
                        "dis_mech_id": 6,
                        "dis_mech_desc": "Mix and Match – Mix",
                        "item_grp_id": 3,
                        "item_grp_desc": "Pair - Set2",
                        "offer_desc": "2 for $x - Mix (BM /QPC /CCS /10 MCNUGGETS)",
                        "base_price": 11.085,
                        "offer_price": 10,
                        "discount_depth": 10,
                        "offer_impact": 0,
                        "child_ohm_id": 61,
                        "min_offer_price": 5,
                        "max_offer_price": 7,
                        "ohm_id": 4,
                        "start_date": "2022-10-10",
                        "end_date": "2022-10-14"
                    }
                ]
            }
        ],
        "filter_data": {
            "scenario_id": [
                41,
                36,
                150,
                131,
                14
            ],
            "scenario_name": [
                "off_coop_alab",
                "off_coop_alas",
                "BOGO-Test",
                "abc",
                "Package_23"
            ],
            "geo": [
                "Philadelphia",
                "Albuquerque El Paso",
                "Chicago",
                "New York Metro",
                "Alaska",
                "Alabama NW Florida"
            ],
            "promo_type": [
                "Deal",
                "Value"
            ]
        },
        "total_count": 105
    },
    http_code: 200,
    status: "OK"

}

export const reviewUserResponse = {
    "home": {
        "show_menu_nav_bar": true,
        "home_page": {
            "link": "/mcd/dashboard",
            "show_page": true,
            "show_scenario_planner_card": false
        }
    },
    "promo_recommender": {
        "show_menu_nav_bar": true,
        "summary_list_page": {
            "link": "/mcd/discount",
            "show_page": true,
            "show_promo_config_button": false,
            "show_edit_copy_menu_option": false
        },
        "promo_recommendation_page": {
            "link": "/mcd/discount/offer-configuration",
            "show_page": false
        },
        "summary_details_page": {
            "link": "/mcd/discount/offer-package-summary/",
            "show_page": true
        },
        "impact_by_pc_page": {
            "link": "/mcd/planner/scenario-impact/",
            "show_page": true
        },
        "offer_preview_page": {
            "link": "/mcd/discount/offer-recommender",
            "show_page": true
        }
    },
    "scenario_planner": {
        "show_menu_nav_bar": false,
        "scenario_planner_home_page": {
            "link": "/mcd/planner",
            "show_page": false
        },
        "scenario_planner_page": {
            "link": "/mcd/planner/scenario-name",
            "show_page": false
        },
        "import_recommender_page": {
            "link": "/mcd/planner/import-recommender",
            "show_page": false
        },
        "scenario_results_page": {
            "link": "/mcd/planner/scenario-results",
            "show_page": true
        },
        "scenario_impact_page": {
            "link": "/mcd/planner/scenario-impact",
            "show_page": true
        }
    },
    "scenario_comparison": {
        "show_menu_nav_bar": true,
        "scenario_list_page": {
            "link": "/mcd/comparison",
            "show_page": true,
            "show_edit_copy_menu_option": false
        },
        "scenario_comparison_page": {
            "link": "/mcd/comparison/scenario-comparision",
            "show_page": true
        }
    },
    "feed_selection": {
        "show_menu_nav_bar": true,
        "feed_selection_page": {
            "link": "/mcd/feed/feed-selection",
            "show_page": true,
            "show_edit_copy_menu_option": false
        }
    }
}

export const productDummyTestData = {
    "data": {
        "data_list": [
            {
                "coop_name": "05 - CNMA",
                "sales": [
                    {
                        "scenario_name": "Package ID 5  - Val +Deal",
                        "Product_Cat_Arr": [
                            "BEVERAGES",
                            "BKFST ENTREES",
                            "DESSERTS",
                            "SIDE ITEMS",
                            "COMBO MEALS",
                            "BKFST SIDE ITEMS",
                            "HAPPY MEALS",
                            "BREAKFAST MEALS",
                            "ENTREES",
                            "OTHER"
                        ],
                        "val": [
                            -3.9,
                            3.3,
                            0.0,
                            0.0,
                            0.0,
                            0.0,
                            0.0,
                            0.0,
                            2.3,
                            0.0
                        ]
                    },
                    {
                        "scenario_name": "PP_Coop User1_2022-12-03 11:05",
                        "Product_Cat_Arr": [
                            "BEVERAGES",
                            "BKFST ENTREES",
                            "DESSERTS",
                            "SIDE ITEMS",
                            "COMBO MEALS",
                            "BKFST SIDE ITEMS",
                            "HAPPY MEALS",
                            "BREAKFAST MEALS",
                            "ENTREES",
                            "OTHER"
                        ],
                        "val": [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    }
                ],
                "gp": [
                    {
                        "scenario_name": "Package ID 5  - Val +Deal",
                        "Product_Cat_Arr": [
                            "BEVERAGES",
                            "BKFST ENTREES",
                            "DESSERTS",
                            "SIDE ITEMS",
                            "COMBO MEALS",
                            "BKFST SIDE ITEMS",
                            "HAPPY MEALS",
                            "BREAKFAST MEALS",
                            "ENTREES",
                            "OTHER"
                        ],
                        "val": [
                            -5.8,
                            3.2,
                            0.0,
                            0.0,
                            0.0,
                            0.0,
                            0.0,
                            0.0,
                            1.9,
                            0.0
                        ]
                    },
                    {
                        "scenario_name": "PP_Coop User1_2022-12-03 11:05",
                        "Product_Cat_Arr": [
                            "BEVERAGES",
                            "BKFST ENTREES",
                            "DESSERTS",
                            "SIDE ITEMS",
                            "COMBO MEALS",
                            "BKFST SIDE ITEMS",
                            "HAPPY MEALS",
                            "BREAKFAST MEALS",
                            "ENTREES",
                            "OTHER"
                        ],
                        "val": [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    }
                ],
                "upt": [
                    {
                        "scenario_name": "Package ID 5  - Val +Deal",
                        "Product_Cat_Arr": [
                            "BEVERAGES",
                            "BKFST ENTREES",
                            "DESSERTS",
                            "SIDE ITEMS",
                            "COMBO MEALS",
                            "BKFST SIDE ITEMS",
                            "HAPPY MEALS",
                            "BREAKFAST MEALS",
                            "ENTREES",
                            "OTHER"
                        ],
                        "val": [
                            0.6,
                            2.2,
                            -2.0,
                            -2.0,
                            -2.0,
                            -2.0,
                            -2.0,
                            -2.0,
                            4.2,
                            -2.0
                        ]
                    },
                    {
                        "scenario_name": "PP_Coop User1_2022-12-03 11:05",
                        "Product_Cat_Arr": [
                            "BEVERAGES",
                            "BKFST ENTREES",
                            "DESSERTS",
                            "SIDE ITEMS",
                            "COMBO MEALS",
                            "BKFST SIDE ITEMS",
                            "HAPPY MEALS",
                            "BREAKFAST MEALS",
                            "ENTREES",
                            "OTHER"
                        ],
                        "val": [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    }
                ],
                "urw": [
                    {
                        "scenario_name": "Package ID 5  - Val +Deal",
                        "Product_Cat_Arr": [
                            "BEVERAGES",
                            "BKFST ENTREES",
                            "DESSERTS",
                            "SIDE ITEMS",
                            "COMBO MEALS",
                            "BKFST SIDE ITEMS",
                            "HAPPY MEALS",
                            "BREAKFAST MEALS",
                            "ENTREES",
                            "OTHER"
                        ],
                        "val": [
                            2.6,
                            4.3,
                            0.0,
                            0.0,
                            0.0,
                            0.0,
                            0.0,
                            0.0,
                            6.4,
                            0.0
                        ]
                    },
                    {
                        "scenario_name": "PP_Coop User1_2022-12-03 11:05",
                        "Product_Cat_Arr": [
                            "BEVERAGES",
                            "BKFST ENTREES",
                            "DESSERTS",
                            "SIDE ITEMS",
                            "COMBO MEALS",
                            "BKFST SIDE ITEMS",
                            "HAPPY MEALS",
                            "BREAKFAST MEALS",
                            "ENTREES",
                            "OTHER"
                        ],
                        "val": [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    }
                ]
            },
            {
                "coop_name": "47 - PHILADELPHIA",
                "sales": [
                    {
                        "scenario_name": "Package ID 5  - Val +Deal",
                        "Product_Cat_Arr": [
                            "BEVERAGES",
                            "BKFST ENTREES",
                            "DESSERTS",
                            "SIDE ITEMS",
                            "COMBO MEALS",
                            "BREAKFAST MEALS",
                            "HAPPY MEALS",
                            "ENTREES",
                            "BKFST SIDE ITEMS",
                            "OTHER"
                        ],
                        "val": [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    {
                        "scenario_name": "PP_Coop User1_2022-12-03 11:05",
                        "Product_Cat_Arr": [
                            "BEVERAGES",
                            "BKFST ENTREES",
                            "DESSERTS",
                            "SIDE ITEMS",
                            "COMBO MEALS",
                            "BKFST SIDE ITEMS",
                            "HAPPY MEALS",
                            "BREAKFAST MEALS",
                            "ENTREES",
                            "OTHER"
                        ],
                        "val": [
                            -4.2,
                            24.9,
                            0.0,
                            -55.8,
                            0.0,
                            0.0,
                            0.0,
                            0.0,
                            -23.4,
                            0.0
                        ]
                    }
                ],
                "gp": [
                    {
                        "scenario_name": "Package ID 5  - Val +Deal",
                        "Product_Cat_Arr": [
                            "BEVERAGES",
                            "BKFST ENTREES",
                            "DESSERTS",
                            "SIDE ITEMS",
                            "COMBO MEALS",
                            "BREAKFAST MEALS",
                            "HAPPY MEALS",
                            "ENTREES",
                            "BKFST SIDE ITEMS",
                            "OTHER"
                        ],
                        "val": [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    {
                        "scenario_name": "PP_Coop User1_2022-12-03 11:05",
                        "Product_Cat_Arr": [
                            "BEVERAGES",
                            "BKFST ENTREES",
                            "DESSERTS",
                            "SIDE ITEMS",
                            "COMBO MEALS",
                            "BKFST SIDE ITEMS",
                            "HAPPY MEALS",
                            "BREAKFAST MEALS",
                            "ENTREES",
                            "OTHER"
                        ],
                        "val": [
                            -6.0,
                            22.4,
                            0.0,
                            -62.4,
                            0.0,
                            0.0,
                            0.0,
                            0.0,
                            -32.8,
                            0.0
                        ]
                    }
                ],
                "upt": [
                    {
                        "scenario_name": "Package ID 5  - Val +Deal",
                        "Product_Cat_Arr": [
                            "BEVERAGES",
                            "BKFST ENTREES",
                            "DESSERTS",
                            "SIDE ITEMS",
                            "COMBO MEALS",
                            "BREAKFAST MEALS",
                            "HAPPY MEALS",
                            "ENTREES",
                            "BKFST SIDE ITEMS",
                            "OTHER"
                        ],
                        "val": [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    {
                        "scenario_name": "PP_Coop User1_2022-12-03 11:05",
                        "Product_Cat_Arr": [
                            "BEVERAGES",
                            "BKFST ENTREES",
                            "DESSERTS",
                            "SIDE ITEMS",
                            "COMBO MEALS",
                            "BKFST SIDE ITEMS",
                            "HAPPY MEALS",
                            "BREAKFAST MEALS",
                            "ENTREES",
                            "OTHER"
                        ],
                        "val": [
                            0.9,
                            34.0,
                            -4.4,
                            -0.7,
                            -4.4,
                            -4.4,
                            -4.4,
                            -4.4,
                            -1.3,
                            0.0
                        ]
                    }
                ],
                "urw": [
                    {
                        "scenario_name": "Package ID 5  - Val +Deal",
                        "Product_Cat_Arr": [
                            "BEVERAGES",
                            "BKFST ENTREES",
                            "DESSERTS",
                            "SIDE ITEMS",
                            "COMBO MEALS",
                            "BREAKFAST MEALS",
                            "HAPPY MEALS",
                            "ENTREES",
                            "BKFST SIDE ITEMS",
                            "OTHER"
                        ],
                        "val": [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    {
                        "scenario_name": "PP_Coop User1_2022-12-03 11:05",
                        "Product_Cat_Arr": [
                            "BEVERAGES",
                            "BKFST ENTREES",
                            "DESSERTS",
                            "SIDE ITEMS",
                            "COMBO MEALS",
                            "BKFST SIDE ITEMS",
                            "HAPPY MEALS",
                            "BREAKFAST MEALS",
                            "ENTREES",
                            "OTHER"
                        ],
                        "val": [
                            5.5,
                            40.1,
                            0.0,
                            3.9,
                            0.0,
                            0.0,
                            0.0,
                            0.0,
                            3.2,
                            0.0
                        ]
                    }
                ]
            }
        ],
        "geo_list": [
            "05 - CNMA",
            "47 - PHILADELPHIA"
        ],
        "product_list": [
            "BEVERAGES",
            "BKFST ENTREES",
            "DESSERTS",
            "SIDE ITEMS",
            "COMBO MEALS",
            "BKFST SIDE ITEMS",
            "HAPPY MEALS",
            "BREAKFAST MEALS",
            "ENTREES",
            "OTHER"
        ],
        "kpi_list": [
            "Sales ($)",
            "Gross Margin ($)",
            "UPT",
            "URW"
        ]
    },
    "status": "OK",
    "http_code": 200
}

export const geoDummyTestData = {
    "data": {
        "gc": [
            {
                "scenario_name": "Package ID 5  - Val +Deal",
                "coop_name_Arr": [
                    "05 - CNMA"
                ],
                "val": [
                    2.1
                ]
            }
        ],
        "sales": [
            {
                "scenario_name": "Package ID 5  - Val +Deal",
                "coop_name_Arr": [
                    "05 - CNMA"
                ],
                "val": [
                    0.6
                ]
            }
        ],
        "gp": [
            {
                "scenario_name": "Package ID 5  - Val +Deal",
                "coop_name_Arr": [
                    "05 - CNMA"
                ],
                "val": [
                    0.3
                ]
            }
        ],
        "acv": [
            {
                "scenario_name": "Package ID 5  - Val +Deal",
                "coop_name_Arr": [
                    "05 - CNMA"
                ],
                "val": [
                    -1.4
                ]
            }
        ],
        "upt": [
            {
                "scenario_name": "Package ID 5  - Val +Deal",
                "coop_name_Arr": [
                    "05 - CNMA"
                ],
                "val": [
                    0.8
                ]
            }
        ],
        "urw": [
            {
                "scenario_name": "Package ID 5  - Val +Deal",
                "coop_name_Arr": [
                    "05 - CNMA"
                ],
                "val": [
                    2.9
                ]
            }
        ],
        "geo_list": [
            "05 - CNMA"
        ],
        "kpi_list": [
            "GC",
            "Sales ($)",
            "Gross Margin ($)",
            "Average Check ($)",
            "UPT",
            "URW"
        ]
    },
    "status": "OK",
    "http_code": 200
}

