/**
 * Created by Ravi on 23/9/17.
 */
const IMG_PATH = "/static/images/";
const API_URL = "https://us-central1-tcabs-swin.cloudfunctions.net"

const FinanceCategories = require('../data/financial_categories.json');
const FinanceAttr = require('../data/financial_attrs.json');

const FinanceCategoriesPublic = require('../data/financial_categories_public.json');
const FinanceAttrPublic = require('../data/financial_attrs.json');

const BUCM = require('../data/BUCM.json');

const DUCM = require('../data/DUCM.json');
// Public
// const FinanceCategories = require('../data/financial_categories.json');
// const FinanceAttr = require('../data/financial_attrs.json');

const URLS = {

  "page_pricing" : "/pricing",
  "userplans" : "userplans",

  //STUDENTS API
  "adminUsersImport" : API_URL+"/adminUsersImport",
  "adminDisableUser" : API_URL+"/disableUser",
  "adminAddUser"     : API_URL+"/addUser",

  //Get UserInfo
  "userinfo" : API_URL+"/getCustomClaims"

};

const UI = {
  "user_save_success" : 'Save Successful',
  "user_save_error" : 'Error saving user profile',
  "user_disable_success" : ' Successful',
  "user_disable_error" : ' user ',
  "user_edit_success" : "",

  "seepricing" : "See Pricing",
  "pricingplans" : [
    {
      "name" : "Eco Plan",
      "price" : "$35",
      "value" : "50",
      "tag" : "per month",
      "features" : [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
      ],
      "className" : "table1"
    },
    {
      "name" : "Premium Plan",
      "price" : "$50",
      "value" : "50",
      "tag" : "per month",
      "features" : [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
      ],
      "className" : "table2"
    }
  ],

  //Database
  "database_error" : 'Unable to fetch data. Please contact database administrator',
  "hillclimb" : IMG_PATH+"climbing.svg"
}


// const DATA = ;


export default {
    "isDebug" : true,

    "UI" : UI,
    "TYPES" : {
      "ADMIN" : "ADMIN",
      "USER" : "USER",
    },

    "URLS" : URLS,
    "DATA" : BUCM.BUCM,
    "FinanceCategories": FinanceCategories,
    "FinanceAttr" : FinanceAttr,

    "DUCM" : DUCM.DUCM,
    // "FinanceCategories": FinanceCategories,
    // "FinanceAttr" : FinanceAttr,
    "FinanceAttrPublic" : FinanceAttrPublic,
    "FinanceCategoriesPublic" : FinanceCategoriesPublic,

    "url_home" : "/", //home page
    "url_forgot" : "/forgot", //forgot

    //***** ADMIN PAGES ******
    "url_admin" : "/admin",  //Admin default page


    //***** ENROL STUDENT PAGES ******
    // "url_admin_enrol" : {
    //   "name" : "ENROL",
    //   "routerURL" : "/admin/enrol", // this is server registered url name
    //   "fileName" : "admin_enrol",   //this if filename
    //   "icon_active" : IMG_PATH+"enrol.svg",
    //   "icon_normal" : IMG_PATH+"enrol-dark.svg",
    // },

    "url_admin_logout" : {
      "name" : "LOGOFF",
      "routerURL" : "/", // this is server registered url name
      "fileName" : "admin_unit",   //this if filename
      "icon_normal" : IMG_PATH+"emergency-exit.svg",
    },

}
