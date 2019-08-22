/**
 * Created by Ravi on 23/9/17.
 */


var firebase = require("firebase");
require("firebase/firestore");

var debug = false;

class DB_Setup{

    constructor() {
        this._isDebug = debug;

        var config = {
            // apiKey: "AIzaSyCbQDxZ7hh5L-u1Ck7vRougC49G-e6ljQo",
            // authDomain: "tcabs-swin.firebaseapp.com",
            // databaseURL: "https://tcabs-swin.firebaseio.com",
            // projectId: "tcabs-swin",
            // storageBucket: "tcabs-swin.appspot.com",
            // messagingSenderId: "85668308042"
            apiKey: "AIzaSyD5YtF8-DLL5XahweYVH8LMYYj_yWggH2g",
            authDomain: "cdtswin.firebaseapp.com",
            databaseURL: "https://cdtswin.firebaseio.com",
            projectId: "cdtswin",
            storageBucket: "cdtswin.appspot.com",
            messagingSenderId: "764244687230"
          };

        // if(debug){
        //     config = {
        //       //set production config
        //     }
        // }
        var app = null;
        if (firebase.apps.length === 0){
            app = firebase.initializeApp(config);

            const firestore = firebase.firestore();
            const settings = { timestampsInSnapshots: true};
            firestore.settings(settings);
          }
        else
            app = firebase;

        this.log = this.log.bind(this);
        this.getIsDevOrProd = this.getIsDevOrProd.bind(this);
        // debugger;
        return app;
    }

    log(m){
        console.log("LOGGER ", m);
    }

    getIsDevOrProd(){
      return this._isDebug;
    }

}

export default new DB_Setup();
