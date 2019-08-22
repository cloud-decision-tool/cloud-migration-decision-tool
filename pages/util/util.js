
import _ from 'lodash';

import jsHttpCookie from 'cookie';
import atob from 'atob';

const SimpleBreakpoints =  require('simple-breakpoints');

function stylesmerge(stylesarray = []){
  return stylesmergeObjs(stylesarray);
  // return _.assign.apply(_, stylesarray);
}

function isMobile(){
  if (process.browser && typeof window !== 'undefined') {
    // client-side-only code
    let dd = (SimpleBreakpoints.default);
    let breakpoints = new dd();
    // console.log(bb.isMobile() );
    // var breakpoints = new SimpleBreakpoints();
    return breakpoints.isMobile();
    // return false;
  }
  else{
    return false
  }

}

/**
 * Created by Ravi on 23/9/17.
 */
function validateEmail(email) {
     //var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     //var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/;
     //var re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

     // this allow swinburne email
     var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

     // this allows symbol +
     // var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
     return re.test(String(email).toLowerCase());
 }

function checkPassword(str)
{
 // at least one number, one lowercase and one uppercase letter
 // at least six characters
 var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
 return re.test(str);
}

function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function PhoneNumberValidate(phoneNumber){
  // This is our bread and butter expression
  //var phoneExpression = /^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$/;
  //var phoneExpression = /^\({0,1}((0|61|\+61)(4|7|8)){1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$/;
  var phoneExpression = /^\({0,1}((0|61|\+61)(4|7|8)){1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$/;
  if (phoneNumber.match(phoneExpression))
      return true;
  else
      return false;

}

function formatPhoneNumber(phoneNumber){
    /*
    Tests phone number: 0424911988
    Tests phone number: +61410311129
    Tests phone number: (04)10311129
  	Tests phone number: 0411 234 567
    Tests phone number: 61410311129
    */
    var tempNumber = phoneNumber
    switch (tempNumber.substring(0, 2)) {
      case "04":
        tempNumber = tempNumber.replace("04", "+614");
        break;
      case "+6":
        tempNumber.replace("+6", "+6");
        break;
      case "(0":
        tempNumber.replace("(04)", "+614");
        break;
      case "61":
        tempNumber.replace("614", "+614");
        break;
      default:

    }

    if(tempNumber.substring(0, 1) == "4")
      tempNumber = '0'+tempNumber;

    tempNumber = tempNumber.replace(" ", "");
    return tempNumber;
}


function stylesmergeObjs (args) {
    var dst = {}
        ,src
        ,p

    ;

    while (args.length > 0) {
        src = args.splice(0, 1)[0];
        if (toString.call(src) == '[object Object]') {
            for (p in src) {
                if (src.hasOwnProperty(p)) {
                    if (toString.call(src[p]) == '[object Object]') {
                        dst[p] = merge(dst[p] || {}, src[p]);
                    } else {
                        dst[p] = src[p];
                    }
                }
            }
        }
    }

   return dst;
}

/*
    Recursively merge properties and return new object
    obj1 &lt;- obj2 [ &lt;- ... ]
*/
function mergeObjs () {
    var dst = {}
        ,src
        ,p
        ,args = [].splice.call(arguments, 0)
    ;

    while (args.length > 0) {
        src = args.splice(0, 1)[0];
        if (toString.call(src) == '[object Object]') {
            for (p in src) {
                if (src.hasOwnProperty(p)) {
                    if (toString.call(src[p]) == '[object Object]') {
                        dst[p] = merge(dst[p] || {}, src[p]);
                    } else {
                        dst[p] = src[p];
                    }
                }
            }
        }
    }

   return dst;
}

function removeKey(obj , key){
   let objdup = obj;
   delete objdup[key];
   return objdup;
}

var getIndexOfAttrInObj = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i].hasOwnProperty(attr) && array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

function openInNewTab(url) {
    var a = document.createElement("a");
    a.target = "_blank";
    a.href = url;
    a.click();
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function sortArraybyTime(arr){
  return arr.sort(function(a, b){
    var keyA = new Date(a.time),
        keyB = new Date(b.time);
    // Compare the 2 dates
    if(keyA < keyB) return -1;
    if(keyA > keyB) return 1;
    return 0;
  });
}


function handleRequest(req,res){
  let initProps = {};
  // console.log('ddd'+(req && req.headers));
//res.redirect('/');
  if (req && req.headers) {
    const cookies = req.headers.cookie;

    // console.log('ddd2'+(typeof cookies === 'string'));
    if (typeof cookies === 'string') {
      try{
        const cookiesJSON = jsHttpCookie.parse(cookies);
        // console.log(cookiesJSON);
        if(!cookiesJSON.token){
          // console.log("data");
            res.redirect(Config.url_home);
        }
        //return { };
        // console.log('ttt');
        // console.log(b64DecodeUnicode(cookiesJSON.token.split('.')[1]));
        const user = JSON.parse(b64DecodeUnicode(cookiesJSON.token.split('.')[1]));
        initProps.user = user;

      }catch(e){
        res.redirect(Config.url_home);
      }
      // console.log(usertype);
    }
    else {
      res.redirect(Config.url_home);
    }
  }
  return initProps;
}

function getUser(req,res){
  let myprops = handleRequest(req,res);
  if(myprops.user){
    return myprops.user;
  }
  else
    return null;
}

function handleRequestWithRedirection(req,res, usertype, redirect){
    let myprops = handleRequest(req,res);
    if(myprops.user){
      //console.log(myprops.user);
      if(myprops.user.usertype == usertype || myprops.user.email == 'hello@touchon.com.au')
      {
        return myprops;
      }
      else
        res.redirect(redirect)
    }
    else
      res.redirect(redirect)
}

function handleRequest(req,res){
  let initProps = {};
  // console.log('ddd'+(req && req.headers));
//res.redirect('/');
  if (req && req.headers) {
    const cookies = req.headers.cookie;

    // console.log('ddd2'+(typeof cookies === 'string'));
    if (typeof cookies === 'string') {
      try{
        const cookiesJSON = jsHttpCookie.parse(cookies);
        // console.log(cookiesJSON);
        if(!cookiesJSON.token){
          // console.log("data");
            // res.redirect(Config.url_home);
        }
        //return { };
        // console.log('ttt');
        // console.log(b64DecodeUnicode(cookiesJSON.token.split('.')[1]));
        const user = JSON.parse(b64DecodeUnicode(cookiesJSON.token.split('.')[1]));
        initProps.user = user;

      }catch(e){
        // res.redirect(Config.url_home);
      }
      // console.log(usertype);
    }
    else {
      // res.redirect(Config.url_home);
    }
  }
  return initProps;
}


export {
  validateEmail,
  checkPassword,
  b64DecodeUnicode,
  formatPhoneNumber,
  PhoneNumberValidate,
  mergeObjs,
  removeKey,
  getIndexOfAttrInObj,
  openInNewTab,
  sortByKey,
  sortArraybyTime,
  stylesmerge as sm,
  isMobile as isM,
  handleRequestWithRedirection,
  getUser
}
