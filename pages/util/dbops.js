import dbConn from './db';
import Config from './config';
import { b64DecodeUnicode } from './util';
import { message, modal, notification } from 'antd';
var qs = require('qs');
import axios from 'axios';
import jsCookie from 'js-cookie';

function log(message){
  console.log(message)
}

class DB_operations{
    constructor() {
        this.db = dbConn;

        this.autocomplete = this.autocomplete.bind(this);
        this.addUser = this.addUser.bind(this);
        this.create_user = this.create_user.bind(this);

        this.get_time = this.get_time.bind(this);
        this.get_user_info = this.get_user_info.bind(this);
        this.get_user_type = this.get_user_type.bind(this);
        this.get_current_user = this.get_current_user.bind(this);
        this.getData = this.getData.bind(this);
        this.getDataWithKey = this.getDataWithKey.bind(this);

        this.log = this.log.bind(this);
        this.listen_user_events = this.listen_user_events.bind(this);

        this.redirect = this.redirect.bind(this);
        this.resetEmail = this.resetEmail.bind(this);

        this.sign_in = this.sign_in.bind(this);
        this.sign_out = this.sign_out.bind(this);
        this.save_data = this.save_data.bind(this);
        this.save_data_push = this.save_data_push.bind(this);

        this.success = this.success.bind(this);
        this.error = this.error.bind(this);
        // this.query = this.query.bind(this);

        this.uploadStudents = this.uploadStudents.bind(this);
        this.disableUser = this.disableUser.bind(this);

        this.query = this.query.bind(this);
        this.queryFS = this.queryFS.bind(this);

        this.uploadFile = this.uploadFile.bind(this);
    }

    axiosreq = (path, valueObj) => {
      return axios.post(path,
        qs.stringify(valueObj)
      );
    }

    addUser = (path, userObject, callback, error) => {
      // debugger;
      userObject.time = (new Date()).getTime();
      this.db.auth().currentUser.getIdToken()
      .then((idToken) => {
          let options = {
            'idToken': idToken,
            'userData' : userObject
          };
          return axios.post(path,
            qs.stringify(options)
          );
      })
      .then( callback ? callback : (response) => {
        console.log(response);
      })
      .catch(error? error :(err) => {
        console.log(err);
      });
    }

    autocomplete = (path, query, callback, error) => {
      this.db.database().ref(path)
        .orderByChild('uid')
        .startAt(query)
        .endAt(`${query}\uf8ff`)
        .limitToFirst(5)
        .on('child_added', (child) => {
          let childtemp =
              {
                id: child.key
              };

          // console.log(childtemp);

          if(callback)
            callback(childtemp)

        }, (err)=> {
          if(error)
            error(err)
          else
            console.log(err);
        })
    }


    search_fire = (collection, queryKey, condition,  queryString, limit, callback, error) => {
        var query = this.db.firestore().collection(collection);

        if(queryString)
        query = query.where(queryKey , '==', queryString);
        query = query.limit(limit);
        query.get()
        .then(callback ? callback : (querySnapshot) => {})
        .catch(error ? error : (e) => {});

      // this.db.database().ref(path)
      //   .orderByChild('uid')
      //   .startAt(query)
      //   .endAt(`${query}\uf8ff`)
      //   .limitToFirst(5)
      //   .on('child_added', (child) => {
      //     let childtemp =
      //         {
      //           id: child.key
      //         };
      //
      //     // console.log(childtemp);
      //
      //     if(callback)
      //       callback(childtemp)
      //
      //   }, (err)=> {
      //     if(error)
      //       error(err)
      //     else
      //       console.log(err);
      //   })
    }


    autocomplete_fire = (collection, queryKey, queryString, limit, callback, error) => {
        var query = this.db.firestore().collection(collection);

        if(queryString)
        query = query.where(queryKey , '>=', queryString);
        query = query.limit(limit);
        query.get()
        .then(callback ? callback : (querySnapshot) => {})
        .catch(error ? error : (e) => {});

      // this.db.database().ref(path)
      //   .orderByChild('uid')
      //   .startAt(query)
      //   .endAt(`${query}\uf8ff`)
      //   .limitToFirst(5)
      //   .on('child_added', (child) => {
      //     let childtemp =
      //         {
      //           id: child.key
      //         };
      //
      //     // console.log(childtemp);
      //
      //     if(callback)
      //       callback(childtemp)
      //
      //   }, (err)=> {
      //     if(error)
      //       error(err)
      //     else
      //       console.log(err);
      //   })
    }

    success = (title, msg) =>{
      // message.success(msg);
      notification['success']({
        message: title,
        description: msg
      });
    }

    error = (title, msg) =>{
      // message.error(msg);
      notification['error']({
        message: title,
        description: msg
      });
      // throw new Error('Error ', msg);
    }

    redirect = (location) => {
      // if(location === undefined)
      // window.location.href = '/';
      // else
      window.location.href = location;
    }

    create_user = (username, pwd, callback, error) => {
      this.db.auth().createUserWithEmailAndPassword(username, pwd).then(callback?callback:(m)=>{this.log(m);}).catch(error?error:(e)=>{this.log(e)});
    }

    log =(m) =>{
        console.log("LOGGER ", m);
    }

    listen_user_events = (callback) => {
        this.db.auth().onAuthStateChanged(callback ? callback : function (user) {
            alert("SDSFD"+JSON.stringify(user));
        });
    }

    get_token = ( callback,error) => {
      this.db.auth().currentUser.getIdToken(true)
      .then( callback ? callback : (response) => {
        console.log(response);
      })
      .catch(error? error :(err) => {
        console.log(err);
      });
    }



    get_claims = ( idToken, callback,error) => {
      this.db.auth().verifyIdToken(idToken)
      .then( callback ? callback : (claims) => {
        debugger;
        console.log(claims);
      })
      .catch(error? error :(err) => {
        console.log(err);
      });
    }

    get_time = () => {
      return (new Date()).getTime();
    }

    get_user_info = (callback,error) => {
        if(this.getCurrentUser())
        this.getData('users/'+this.getCurrentUser()+'/', callback? callback: function(data){
            this.log(data.val())
        });
        else
            error();
    }

    getCurrentUser = () => {
        if(this.db.auth().currentUser)
          return this.db.auth().currentUser;
        else
          return null;
    }

    get_current_user = () => {
        if(this.db.auth().currentUser)
          return this.db.auth().currentUser.uid;
        else
          return null;
    }

    get_current_username = () => {
        if(this.db.auth().currentUser)
          return this.db.auth().currentUser.displayName;
        else
          return null;
    }

    get_user_token = (refresh, callback, error) => {
      this.db.auth().currentUser.getIdToken(refresh).then(callback?callback:(m)=>{this.log(m);}).catch(error?error:(e)=>{this.log(e)});
    }

    getData = (path, callback, error) => {
        this.db.database().ref(path).once('value').then(callback).catch( error ? error : function (error) {
            console.log("data fetch error", error)
        });
    }

    get_data_fire = (collection, doc) => {
        return this.db.firestore().collection(collection).doc(doc).get();
    }

    getDataWithKey = (path, queryParams, callback, error) => {
        /*
         queryParams : orderBy , orderByVal, paging,
         */

        this.db.database().ref(path)
            .orderByChild(queryParams.orderBy)
            .startAt(queryParams.orderByVal)
            .limitToLast(queryParams.paging)
            .once('value')
            .then(callback ? callback : (r) => {
                }).catch(error ? error : (e) => {
            });
    }

    get_user_type = (callback,error,refresh) => {
      this.db.auth().currentUser.getIdToken(refresh?refresh:false)
      .then((idToken) => {
          console.log(idToken);
         // Parse the ID token.
         const payload = JSON.parse(b64DecodeUnicode(idToken.split('.')[1]));
         console.log(payload);
         // debugger;
         // if (!!payload['admin']) {
         //   showAdminUI();
         // }
         callback(payload);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    realtime_update = (collectionref, callback) => {
      let docRef = this.db.firestore().collection(collectionref);
      docRef.onSnapshot( callback ? callback : (doc) => {
          if(doc && doc.exists){
              const myQuote=doc.data();
              console.log("Check out this document I received ",doc);
              // outputHeader.innerText="My Inspirational Quote: "+myQuote.inspirationalQuote;
          }
      });
    }

    resetEmail = (email, callback, error) => {
      this.db.auth().sendPasswordResetEmail(email).then( callback ? callback : () => {
          // Sign-out successful.
          this.redirect(Config.url_home);
      }, error ? error : (e)=> {
          // An error happened.
      });
    }


    sign_out = (callback, error) => {
        this.db.auth().signOut().then( callback ? callback : () => {
            // Sign-out successful.
            jsCookie.remove('token');
            this.redirect(Config.url_home);
        }, error ? error : (e)=> {
            // An error happened.
        });
    }

    set_cookie(key, data){
      jsCookie.set(key, data, { expires: 0.2 });
    }

    sign_in = (username,pwd,callback,error) => {
        this.db.auth().signInWithEmailAndPassword(username, pwd)
        .then((m)=>{
          //this.log(m);
          this.db.auth().currentUser.getIdToken().then((d)=>{
            //this.log(d);
            jsCookie.set('token', d, { expires: 0.2 });
            callback(m);
          });
        }).catch(error?error:(e)=>{this.log(e)});
    }

    register = (username,pwd,callback,error) => {
        this.db.auth().createUserWithEmailAndPassword(username, pwd)
        .then((m)=>{
          //this.log(m);
          this.db.auth().currentUser.getIdToken().then((d)=>{
            //this.log(d);
            jsCookie.set('token', d, { expires: 0.2 });
            callback(m);
          });
        }).catch(error?error:(e)=>{this.log(e)});
    }

    save_data = (path,value, callback, error) => {
        value.time = (new Date()).getTime();
        this.db.database().ref(path).set(value).then(callback).catch( error ? error : function (error) {
            console.log("fb error", error)
        });
    }

    save_data_push = (path,value, callback, error) => {

      value.time = (new Date()).getTime();
        this.db.database().ref(path).push(value).then(callback).catch( error ? error : function (error) {
            console.log("fb error", error)
        });
    }

    save_data_fire = (collection, doc, value, callback, error) => {

        value.time = (new Date()).getTime();
        this.db.firestore().collection(collection).doc(doc).set(value).then(callback? callback : (r)=>{}).catch( error ? error : function (error) {
            console.log("fb error", error)
        });
    }

    save_data_fire_promise = (collection, doc, value, callback, error) => {
        value.time = (new Date()).getTime();
        return this.db.firestore().collection(collection).doc(doc).set(value);
    }

    save_data_fire_push = (collection,value, callback, error) => {
        value.time = (new Date()).getTime();
        this.db.firestore().collection(collection).add(value).then(callback? callback : (r)=>{}).catch( error ? error : function (error) {
            console.log("fb error", error)
        });
    }

    save_data_fire_push_promise = (collection,value) => {
        value.time = (new Date()).getTime();
        return this.db.firestore().collection(collection).add(value);
    }


    set_Doc_Merge = (collection, doc, value ) => {
      //firebase.database().ref(path).push(value, callback ? callback : log);
      return this.db.firestore().collection(collection).doc(doc).set(value, {merge: true});
      // .then(callback? callback : log)
      // .catch( error ? error : log);
    }

    remove_data_fire = (collection, doc, callback, error) => {
        this.db.firestore().collection(collection).doc(doc).delete().then(callback? callback : (r)=>{}).catch( error ? error : function (error) {
            console.log("fb error", error)
        });
    }

    remove_data_fire_promise = (collection, doc) => {
       return  this.db.firestore().collection(collection).doc(doc).delete();
    }

    update_data_fire = (collection, doc, value, callback, error) => {

        value.time = (new Date()).getTime();
        this.db.firestore().collection(collection).doc(doc).update(value).then(callback? callback : (r)=>{}).catch( error ? error : function (error) {
            console.log("fb error", error)
        });
    }

    update_data_fire_promise = (collection, doc, value, disabletime) => {

        if(disabletime){}
        else
          value.time = (new Date()).getTime();
        return this.db.firestore().collection(collection).doc(doc).update(value);
    }


    uploadStudents = (path, studentsData, studentsProfileData, callback, error) => {
      this.db.auth().currentUser.getIdToken()
      .then((idToken) => {
          return axios.post(path,
            qs.stringify({
              'idToken': idToken,
              'usersData' : studentsData,
              'usersSingleData' : studentsProfileData
            })
          );
      })
      .then(function (response) {
        if(callback)
        callback(response)

        // console.log(" TEST ING ");
        // console.log(response);
      })
      .catch((err) => {
        if(error)
        error(err)
        else
        console.log(err);
      });
    }

    disableUser = (path, uid, status, callback, error) => {

      this.db.auth().currentUser.getIdToken()
      .then((idToken) => {
          let options = {
            'idToken': idToken,
            'userId' : uid,
            'status' : status
          };
          return axios.post(path,
            qs.stringify(options)
          );
      })
      .then(function (response) {
          if(callback)
          callback(response)
      })
      .catch((err) => {
        if(error)
        error(err)
        else
        console.log(err);
      });
    }


    query = (path, queryParams, callback, error) => {
      var query = this.db.database().ref(path);

      if(queryParams.orderBy == 'key')
        query = query.orderByKey();
      else if(queryParams.orderBy)
      {
        if(queryParams.orderBy.length > 0){
          query = query.orderByChild(queryParams.orderBy);
          query = query.equalTo(queryParams.orderByValue)
        }
      }

      if(queryParams.order == 'asc'){
        query = query.limitToFirst(queryParams.paging);

        if(queryParams.lastKey)
          query = query.startAt(queryParams.lastKey);
      }

      if(queryParams.order == 'desc'){
        //alert('dd');
        query = query.limitToLast(queryParams.paging);

        if(queryParams.lastKey)
          query = query.endAt(queryParams.lastKey);
      }

      query.once('value')
      .then(callback ? callback : (r) => {})
      .catch(error ? error : (e) => {});

    }


    queryFS = (collection, params, limit, lastKey, orderByKey , callback, error) => {
      var query = this.db.firestore().collection(collection);

      for(var i=0; i< params.length; i++)
      {
        // [{
        //   key : "unitid",
        //   comp : "==",
        //   val : chosenUnit.unitid
        // }]
        query = query.where(params[i].key, params[i].comp, params[i].val);
      }
      if(orderByKey)
      query = query.orderBy(orderByKey, 'desc');
      if(lastKey)
      query = query .startAt(lastKey);
      query = query.limit(limit);

      query.get()
      .then(callback ? callback : (querySnapshot) => {
        // querySnapshot.forEach(function(doc) {
        //   console.log(doc.id, " => ", doc.data());
        // });
      })
      .catch(error ? error : (e) => {});

      // this.db.firestore().collection('students')
      // .orderBy('time','desc')
      // .startAt('1523975701139')
      // .limit(3).get().then((r)=>{
      //   r.forEach(function(doc) {
      //     console.log(doc.id, " => ", doc.data().time);
      //   });
      // }).catch((r)=>{
      //   console.log(r);
      // });

      // this.db.firestore().collection('enrolments')
      // .where("unitid", "==", "INF80015")
      // .limit(3).get().then((r)=>{
      //   r.forEach(function(doc) {
      //     console.log(doc.id, " => ", doc.data().time);
      //   });
      // }).catch((r)=>{
      //   console.log(r);
      // });

    }

    uploadFile = (file, filepath, progressf, successf, errorf) => {
      //var file = e.target.files[0];
      var storageRef = this.db.storage().ref(filepath);
      var task = storageRef.put(file);
      task.on('state_changed', (snapshot) => {
        var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        //uploader.value = percentage;
        log(percentage);
        progressf(percentage);
      }, (err) => {
        log(err);
        errorf(err);
      }, (r) => {
        log("completed", r)
        // successf(r);
      });

      task.then((snapshot) => {
          console.log(snapshot.downloadURL);
          successf(snapshot.downloadURL);
      });

    }

}

export default DB_operations;
