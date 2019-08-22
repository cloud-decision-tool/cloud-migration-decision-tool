
import { sm, isM } from '../pages/util/util';

let UIConstants ={
  majorColor: '#1890ff'
};

let Colors = {
  orange: '#ff6a00',
  orangelight : '#ffc092',
  white: '#ffffff',
  dark: '#303030',
  mediumdark: '#BDC3C7',
  verylightdark : '#ECF0F1',
  veryverylightdark: '#F2F1EF',
  lightdark : '#dcdcdc',
  error: '#D91E18',
  translucent : 'rgba(0,0,0,0.7)',
  transparent : 'rgba(0,0,0,0)',
  green : '#2ECC71',
  greenlight : "#91DC5A",
  greenaccept : "#30B650",
  blue : '#0095fb',
  purple : '#BF55EC',
  cement : '#34495E',
  yellow : '#fff68f',
  lightyellow :'#fff9de'
};
function isIOS(){
  return false;
}

module.exports = {
    fullSize : {width : '100%',height : '100%',},
    resizeContain:{resizeMode : 'contain'},
    resizeCover:{resizeMode : 'cover'},
    overlayBg : {
        backgroundColor : 'rgba(0, 0, 0, 0.3)',
        position: 'absolute',
        width : '100%',
        height : '100%'
    },

    posAbs: { position : 'absolute'},
    posRel: { position : 'relative'},

    posYbottom : { bottom : 0},
    posXRight : { right : 0},

    //background
    bgwhite :{ backgroundColor : Colors.white, borderColor: Colors.white },
    bglight :{ backgroundColor : Colors.verylightdark},
    bgtext : {backgroundColor: Colors.orange},
    bgtransparent : {backgroundColor: Colors.transparent},
    bgtranslucent : {backgroundColor: Colors.translucent},
    bgorange : {backgroundColor: Colors.orange},
    bgyellow : {backgroundColor: Colors.yellow},
    bglightyellow : {backgroundColor: Colors.lightyellow},
    bggreen: {backgroundColor: Colors.green, borderColor: Colors.green},
    bgblue: {backgroundColor: Colors.blue, borderColor: Colors.blue},
    textwhite : {color : Colors.white},

    //letterSpacing
    spacing: {letterSpacing : 1.5},
    spacing3: {letterSpacing : 3},

    displayinline : { display: 'inline-block'},

    //Colors
    textprimary : {color: Colors.orange},
    textsecondary : {color : Colors.dark},
    textgrey : {color : Colors.mediumdark},
    textlightdark :{color: Colors.lightdark},
    textgreen :{color: Colors.greenaccept},

    //margin
    mar5 : { margin: 5 },
    mar10:{margin: 10},
    mar15:{margin: 15},
    mar20:{margin: 20},
    marTop0 : {marginTop : 0},
    marTop5 : {marginTop : 5},
    marTop : {marginTop : 10},
    marTop20 : {marginTop : 20},
    marTop40 : {marginTop : 40},
    marTop80 : {marginTop : 80},
    marTop90 : {marginTop : 90},
    marTop100 : {marginTop: 100},
    marTop300 : {marginTop: 100},
    marRight:{marginRight : 10},
    marRight5 :{marginRight : 5},
    marRight20:{marginRight : 20},
    marBot0 : {marginBottom : 0},
    marBot10 : {marginBottom : 10},
    marBot14 : {marginBottom : 14},
    marBot20 : {marginBottom : 20},
    marBot40 : {marginBottom : 40},
    marBot50 : {marginBottom : 50},
    marBot65 : {marginBottom : 65},
    marLeft5: {marginLeft: 5},
    marLeft10: {marginLeft: 10},
    marLeft20: {marginLeft: 20},
    //padding
    pad0 : {padding: 0},
    pad2 : {padding: 2},
    pad5 : {padding: 5},
    pad10 : {padding: 10},
    pad15 : {padding: 15},
    pad20 : {padding: 20},
    pad25 : {padding: 25},
    pad35 : {padding: 35},
    padTop5 : { paddingTop : 5},
    padTop10 : { paddingTop : 10},
    padTop15 : { paddingTop : 15},
    padTop20 : { paddingTop : 20},
    padTop30 : {paddingTop : 30},
    padTop40 : {paddingTop : 40},
    padTop60 : {paddingTop : 70},
    padTop80 : {paddingTop : 80},
    padBot10 : { paddingBottom : 10},
    padBot15 : { paddingBottom : 15},
    padBot20 : { paddingBottom : 20},
    padBot50 : {paddingBottom : 50},
    padBot60 : {paddingBottom : 70},
    padLeft10 : { paddingLeft : 10},
    padLeft15 : { paddingLeft : 15},
    padLeft20 : { paddingLeft : 20},
    padLeft30 : { paddingLeft : 30},
    padRight10 : { paddingRight : 10},
    padRight15 : { paddingRight : 15},
    padRight20 : { paddingRight : 20},
    padRight30 : { paddingRight : 30},

    //fontsize
    fs10 : {fontSize : 10},
    fs12 : {fontSize : 12},
    fs14 : {fontSize : 14},
    fs16 : {fontSize : 16},
    fs18 : {fontSize : 18},
    fs22 : {fontSize : 22},
    fs25 : {fontSize : 25},
    fs35 : {fontSize : 35},
    fs40 : {fontSize : 40},
    fs45 : {fontSize : 45},

    //fontStyles
    fsExtraBold : { fontFamily: isIOS() ? 'Montserrat-ExtraBold' : 'MontserratExtraBold' },
    fsSemiBold : { fontFamily: isIOS() ? 'Montserrat-SemiBold' : 'MontserratSemiBold'},
    fsMedium : { fontFamily: isIOS() ? 'Montserrat-Medium': 'MontserratMedium'},
    fsRegular : { fontFamily: isIOS() ? 'Montserrat-Regular': 'MontserratRegular'},
    //text colors

    textCenter : {textAlign : 'center'},
    textRight : {textAlign : 'right'},
    //content alignment
    centerContent : {justifyContent : 'center'},
    centerAlign : {
        alignItems : 'center',
        justifyContent : 'center'
    },
    selfCenter : {
      display: 'flex',
      justifyContent: 'center',
      // alignSelf : 'center',
      margin: '0 auto'
    },
    overflowY : {
      overflowY: 'scroll'
    },

    alignBottom : {
        flex : 1,
        alignItems : 'flex-end'
    },
    alignLeft : {alignSelf : 'flex-start'},
    alignRight : {alignSelf : 'flex-end'},

    overflowHidden : { overflow: 'hidden'},

    //borderRadius
    borderradius: {borderRadius : 6},
    borderradius15 : {borderRadius : 15},
    borderrad120: {borderRadius : isIOS() ? 120/2 :120 },
    borBot: { borderBottomWidth: 1, borderBottomColor: '#504c49'},
    borBotWhite: { borderBottomWidth: 1, borderBottomColor: '#ffffff'},

    //height
    h20 :{height : 20},
    h25 :{height : 25},
    h30 :{height : 30},
    h40 :{height : 40},
    h50 :{height : 50},
    h60 :{height : 60},
    h70 :{height : 70},
    h80 :{height : 80},
    h100 :{height : 100},
    h120 :{height : 120},
    h140 :{height : 140},
    h160 :{height : 160},
    h200 :{height : 200},
    h300 :{height : 300},
    h100p :{height : '100%'},
    hauto: {height: 'auto'},

    minH300 : { minHeight : 300 },
    maxH100size :{maxHeight : 150},
    //Width
    w20 :{width : 20},
    w25 :{width : 25},
    w30 :{width : 30},
    w40 :{width : 40},
    w50 :{width : 50},
    w80 :{width : 80},
    w120 :{width : 120},
    w200 :{width : 200},
    w150 :{width : 150},
    w100p : {width: '100%'},
    w50p : {width: '50%'},
    //minWidth
    minWid80 : {minWidth : '80%'},
    minWid70 : {minWidth : '70%'},
    minWid60 : {minWidth : '60%',},
    minWid40 : {minWidth : '40%',},
    maxWid80 : {maxWidth : '80%'},
    maxWid70 : {maxWidth : '70%'},
    maxWid60 : {maxWidth : '60%',},
    maxWid40 : {maxWidth : '40%',},
    maxWid100 : {maxWidth : '100%'},
    maxWid300 : {maxWidth : 300},
    maxWid320 : {maxWidth : 320},
    maxWid400 : {maxWidth : 400},
    //maximum height
    maxH80 : {maxHeight : '80%'},
    maxH60 : {maxHeight : '60%',},
    maxH40 : {maxHeight : '40%',},

   //text sytles
    textBold:{fontWeight : 'bold'},
    textLight:{fontWeight : '100'},
    //button
    button: {
        backgroundColor: UIConstants.majorColor,
        margin : 20,
        padding : 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderRadius : 3
    },
    //flex
    flexRow : {flexDirection : 'row',},
    flexCol : {flexDirection : 'column',},
    flexHeightMin : {minHeight : "100vh"},
    flexHeight : {height: "100vh"},
    flexHeightNoMobile : {
      height : isM()? "auto" : "100vh"
    },
    flexMinHeight : {minHeight: "100vh"},

    cursor : { cursor : "pointer"}
};
