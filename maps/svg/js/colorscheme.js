if("undefined"==typeof szMapNs)var szMapNs="http://www.medienobjekte.de";
function _circ_getDerivateColor(a,e){if("none"==a)return a;a=_circ_getHexaColor(a);var c,b,m;c=parseInt(a.substr(1,2),16);b=parseInt(a.substr(3,2),16);m=parseInt(a.substr(5,2),16);1<e&&(c=Math.max(c,90),b=Math.max(b,90),m=Math.max(m,90),250<=c||250<=b||250<=m)&&(e=Math.max(.9*e,1.1));c=Math.min(255,Math.floor(c*e));b=Math.min(255,Math.floor(b*e));m=Math.min(255,Math.floor(m*e));c="#"+("0123456789abcdef".charAt(Math.floor(c/16))+"0123456789abcdef".charAt(c%16));c+="0123456789abcdef".charAt(Math.floor(b/
16))+"0123456789abcdef".charAt(b%16);return c+="0123456789abcdef".charAt(Math.floor(m/16))+"0123456789abcdef".charAt(m%16)}function _circ_getBorderColor(a){a=_circ_getHexaColor(a);var e,c,b;e=parseInt(a.substr(1,2),16);c=parseInt(a.substr(3,2),16);b=parseInt(a.substr(5,2),16);return 127<e&&127<c&&127<b?_circ_getDerivateColor(a,.7):_circ_getDerivateColor(a,1.4)}
function _circ_getTextColor(a){a=_circ_getHexaColor(a);var e,c,b;e=parseInt(a.substr(1,2),16);c=parseInt(a.substr(3,2),16);b=parseInt(a.substr(5,2),16);return 300<e+c||400<b+c||400<b+e||127<e&&127<c&&127<b?_circ_getDerivateColor(a,.6):_circ_getDerivateColor(a,4)}
function _circ_createColorScheme(a,e,c,b,m){if("spectrum"==a||"Spectrum"==a||"SPECTRUM"==a||"spectral"==a||"Spectral"==a||"SPECTRAL"==a)return _circ_createSpectrumColorScheme(c,e,b,m);if("office"==a||"OFFICE"==a||"Office"==a)return _circ_createPaletteColorScheme("office",c,Number(e));if("mineral"==a||"MINERAL"==a||"Minaral"==a)return _circ_createPaletteColorScheme("mineral",c,Number(e));if("pastel"==a||"PASTEL"==a||"Pastel"==a)return _circ_createPaletteColorScheme("pastel",c,Number(e));if("harvest"==
a||"HARVEST"==a||"Harvest"==a)return _circ_createPaletteColorScheme("harvest",c,Number(e));if("fruit"==a||"FRUIT"==a||"Fruit"==a)return _circ_createPaletteColorScheme("fruit",c,Number(e));c=Number(c);if(2>c)return Array(e);if(3>c)return[a,e];"string"!=typeof a&&(a="#ffffff");"string"!=typeof e&&(e="#000000");a=_circ_getHexaColor(a);e=_circ_getHexaColor(e);var n,p;n=parseInt(a.substr(1,2),16);p=parseInt(a.substr(3,2),16);a=parseInt(a.substr(5,2),16);var q,h,k;q=parseInt(e.substr(1,2),16);h=parseInt(e.substr(3,
2),16);k=parseInt(e.substr(5,2),16);var f="#FFFDE0",l,d,g;if(127<(n+p+a)/3||127<(q+h+k)/3)l=Math.min(255,.55*(n+q)),d=Math.min(255,.55*(p+h)),g=Math.min(255,.55*(a+k)),f="#"+("0123456789abcdef".charAt(Math.floor(l/16))+"0123456789abcdef".charAt(l%16)),f+="0123456789abcdef".charAt(Math.floor(d/16))+"0123456789abcdef".charAt(d%16),f+="0123456789abcdef".charAt(Math.floor(g/16))+"0123456789abcdef".charAt(g%16);if("auto"==b||"auto"==m)l=Math.min(255,1.5*(n+q)),d=Math.min(255,1.5*(p+h)),g=Math.min(255,
1.5*(a+k)),f="#"+("0123456789abcdef".charAt(Math.floor(l/16))+"0123456789abcdef".charAt(l%16)),f+="0123456789abcdef".charAt(Math.floor(d/16))+"0123456789abcdef".charAt(d%16),f+="0123456789abcdef".charAt(Math.floor(g/16))+"0123456789abcdef".charAt(g%16),b=m="auto";if(b)switch(b){case "auto":case "linear":case "dynamic":case "2colors":case "2wide":case "2narrow":case "2low":case "2high":case "3colors":case "3wide":case "3narrow":case "3low":case "3high":break;default:f=_circ_getHexaColor(b),b="auto",
"#"!=f.substr(0,1)&&(f="#FFFDE0")}b||(b="auto");if(m)switch(m){case "shift":break;case "auto":case "linear":case "dynamic":case "2colors":case "2wide":case "2narrow":case "2low":case "2high":case "3colors":case "3wide":case "3narrow":case "3low":case "3high":b=m;break;case "warm":f="#FFFDD8";break;case "cold":f="#FFFFFF";break;default:f=_circ_getHexaColor(m),"#"!=f.substr(0,1)&&(f="#FFFDE0")}l=parseInt(f.substr(1,2),16);d=parseInt(f.substr(3,2),16);g=parseInt(f.substr(5,2),16);if("linear"==b){m=(q-
n)/(c-1);var r=(h-p)/(c-1),t=(k-a)/(c-1);d="";l=[];for(b=0;b<c;b++)k=Math.floor(n+m*b),h=Math.floor(p+r*b),g=Math.floor(a+t*b),d="#",d+="0123456789abcdef".charAt(Math.floor(k/16))+"0123456789abcdef".charAt(k%16),d+="0123456789abcdef".charAt(Math.floor(h/16))+"0123456789abcdef".charAt(h%16),d+="0123456789abcdef".charAt(Math.floor(g/16))+"0123456789abcdef".charAt(g%16),l[l.length]=d;return l}if("dynamic"==b||"auto"==b&&(127<(n+p+a)/3||127<(q+h+k)/3)){f=0;e="shift"==m?1:0;for(b=0;b<c+e;b++)f+=b;m=(q-
n)/f;r=(h-p)/f;t=(k-a)/f;l=[];f=0;for(b=e;b<c+e;b++)f+=b,k=Math.floor(n+m*f),h=Math.floor(p+r*f),g=Math.floor(a+t*f),d="#",d+="0123456789abcdef".charAt(Math.floor(k/16))+"0123456789abcdef".charAt(k%16),d+="0123456789abcdef".charAt(Math.floor(h/16))+"0123456789abcdef".charAt(h%16),d+="0123456789abcdef".charAt(Math.floor(g/16))+"0123456789abcdef".charAt(g%16),l[l.length]=d;return l}if("auto"==b||"2colors"==b||"2high"==b||"2low"==b||"3colors"==b||"3high"==b||"3low"==b){f=.5;switch(b){case "2low":f=.75;
break;case "2high":f=.23;break;case "3low":f=.75;break;case "3high":f=.23}b=1-f;m=(l-n)/((c-1)*f);r=(d-p)/((c-1)*f);t=(g-a)/((c-1)*f);q=(l-q)/((c-1)*b);var u=(d-h)/((c-1)*b),v=(g-k)/((c-1)*b);l=[];k=n;h=p;g=a;for(b=0;b<c-1;b++)d="#",d+="0123456789abcdef".charAt(Math.floor(k/16))+"0123456789abcdef".charAt(k%16),d+="0123456789abcdef".charAt(Math.floor(h/16))+"0123456789abcdef".charAt(h%16),d+="0123456789abcdef".charAt(Math.floor(g/16))+"0123456789abcdef".charAt(g%16),l[l.length]=d,b<(c-1)*f?(k+=m,h+=
r,g+=t):(k-=q,h-=u,g-=v),k=Math.max(Math.min(255,k),0),h=Math.max(Math.min(255,h),0),g=Math.max(Math.min(255,g),0);l[l.length]=e;return l}if("2narrow"==b||"3narrow"==b){for(b=f=0;b<c/2;b++)f+=b;m=(l-n)/(f+1);r=(d-p)/(f+1);t=(g-a)/(f+1);q=(l-q)/(f+1);u=(d-h)/(f+1);v=(g-k)/(f+1);l=[];k=n;h=p;g=a;for(b=0;b<c-1;b++)b<c/2?(k+=m*b,h+=r*b,g+=t*b):(k-=q*(c-1-b),h-=u*(c-1-b),g-=v*(c-1-b)),d="#",d+="0123456789abcdef".charAt(Math.floor(k/16))+"0123456789abcdef".charAt(k%16),d+="0123456789abcdef".charAt(Math.floor(h/
16))+"0123456789abcdef".charAt(h%16),d+="0123456789abcdef".charAt(Math.floor(g/16))+"0123456789abcdef".charAt(g%16),l[l.length]=d;l[l.length]=e;return l}if("2wide"==b||"3wide"==b){for(b=f=0;b<c/2;b++)f+=b;f-=Math.floor((c/2-Math.floor(c/2))*c/2);m=(l-n)/(f+1);r=(d-p)/(f+1);t=(g-a)/(f+1);q=(l-q)/(f+1);u=(d-h)/(f+1);v=(g-k)/(f+1);l=[];k=n;h=p;g=a;for(b=0;b<c-1;b++)b<c/2?(k+=m*(c/2-1-b),h+=r*(c/2-1-b),g+=t*(c/2-1-b)):(k-=q*(b-c/2),h-=u*(b-c/2),g-=v*(b-c/2)),d="#",d+="0123456789abcdef".charAt(Math.floor(k/
16))+"0123456789abcdef".charAt(k%16),d+="0123456789abcdef".charAt(Math.floor(h/16))+"0123456789abcdef".charAt(h%16),d+="0123456789abcdef".charAt(Math.floor(g/16))+"0123456789abcdef".charAt(g%16),l[l.length]=d;l[l.length]=e;return l}if("2low"==b||"3low"==b){m=(l-n)/(.75*c+1);r=(d-p)/(.75*c+1);t=(g-a)/(.75*c+1);q=(l-q)/(.25*c+1);u=(d-h)/(.25*c+1);v=(g-k)/(.25*c+1);l=[];k=n;h=p;g=a;for(b=0;b<c-1;b++)b<.75*c?(k+=m,h+=r,g+=t):(k-=q,h-=u,g-=v),d="#",d+="0123456789abcdef".charAt(Math.floor(k/16))+"0123456789abcdef".charAt(k%
16),d+="0123456789abcdef".charAt(Math.floor(h/16))+"0123456789abcdef".charAt(h%16),d+="0123456789abcdef".charAt(Math.floor(g/16))+"0123456789abcdef".charAt(g%16),l[l.length]=d;l[l.length]=e;return l}if("2high"==b||"3high"==b){m=(l-n)/(.3*c+1);r=(d-p)/(.3*c+1);t=(g-a)/(.3*c+1);q=(l-q)/(.7*c+1);u=(d-h)/(.7*c+1);v=(g-k)/(.7*c+1);l=[];k=n;h=p;g=a;for(b=0;b<c-1;b++)b<.3*c?(k+=m,h+=r,g+=t):(k-=q,h-=u,g-=v),d="#",d+="0123456789abcdef".charAt(Math.floor(k/16))+"0123456789abcdef".charAt(k%16),d+="0123456789abcdef".charAt(Math.floor(h/
16))+"0123456789abcdef".charAt(h%16),d+="0123456789abcdef".charAt(Math.floor(g/16))+"0123456789abcdef".charAt(g%16),l[l.length]=d;l[l.length]=e;return l}}var _circ_colorNameA=[];_circ_colorNameA.aliceblue="#F0F8FF";_circ_colorNameA.antiquewhite="#FAEBD7";_circ_colorNameA.aqua="#00FFFF";_circ_colorNameA.aquamarine="#7FFFD4";_circ_colorNameA.azure="#F0FFFF";_circ_colorNameA.beige="#F5F5DC";_circ_colorNameA.bisque="#FFE4C4";_circ_colorNameA.black="#000000";_circ_colorNameA.blanchedalmond="#FFEBCD";
_circ_colorNameA.blue="#0000FF";_circ_colorNameA.blueviolet="#8A2BE2";_circ_colorNameA.brown="#A52A2A";_circ_colorNameA.burlywood="#DEB887";_circ_colorNameA.cadetblue="#5F9EA0";_circ_colorNameA.chartreuse="#7FFF00";_circ_colorNameA.chocolate="#D2691E";_circ_colorNameA.coral="#FF7F50";_circ_colorNameA.cornflowerblue="#6495ED";_circ_colorNameA.cornsilk="#FFF8DC";_circ_colorNameA.crimson="#DC143C";_circ_colorNameA.cyan="#00FFFF";_circ_colorNameA.darkblue="#00008B";_circ_colorNameA.darkcyan="#008B8B";
_circ_colorNameA.darkgoldenr0d="#B8860B";_circ_colorNameA.darkgray="#A9A9A9";_circ_colorNameA.darkgreen="#006400";_circ_colorNameA.darkkhaki="#BDB76B";_circ_colorNameA.darkmagenta="#8B008B";_circ_colorNameA.darkolivegreen="#556B2F";_circ_colorNameA.darkorange="#FF8C00";_circ_colorNameA.darkorchid="#9932CC";_circ_colorNameA.darkred="#8B0000";_circ_colorNameA.darksalmon="#E9967A";_circ_colorNameA.darkseagreen="#8FBC8F";_circ_colorNameA.darkslateblue="#483D8B";_circ_colorNameA.darkslategray="#2F4F4F";
_circ_colorNameA.darkturquoise="#00CED1";_circ_colorNameA.darkviolet="#9400D3";_circ_colorNameA.deeppink="#FF1493";_circ_colorNameA.deepskyblue="#00BFFF";_circ_colorNameA.dimgray="#696969";_circ_colorNameA.dodgerblue="#1E90FF";_circ_colorNameA.firebrick="#B22222";_circ_colorNameA.floralwhite="#FFFAF0";_circ_colorNameA.forestgreen="#228B22";_circ_colorNameA.fuchsia="#FF00FF";_circ_colorNameA.gainsboro="#DCDCDC";_circ_colorNameA.ghostwhite="#F8F8FF";_circ_colorNameA.gold="#FFD700";
_circ_colorNameA.goldenrod="#DAA520";_circ_colorNameA.gray="#808080";_circ_colorNameA.green="#008000";_circ_colorNameA.greenyellow="#ADFF2F";_circ_colorNameA.honeydew="#F0FFF0";_circ_colorNameA.hotpink="#FF69B4";_circ_colorNameA.indianred="#CD5C5C";_circ_colorNameA.indigo="#4B0082";_circ_colorNameA.ivory="#FFFFF0";_circ_colorNameA.khaki="#F0E68C";_circ_colorNameA.lavender="#E6E6FA";_circ_colorNameA.lavenderblush="#FFF0F5";_circ_colorNameA.lawngreen="#7CFC00";_circ_colorNameA.lemonchiffon="#FFFACD";
_circ_colorNameA.lightblue="#ADD8E6";_circ_colorNameA.lightcoral="#F08080";_circ_colorNameA.lightcyan="#E0FFFF";_circ_colorNameA.lightgoldenrodyellow="#FAFAD2";_circ_colorNameA.lightgreen="#90EE90";_circ_colorNameA.lightgrey="#D3D3D3";_circ_colorNameA.lightpink="#FFB6C1";_circ_colorNameA.lightsalmon="#FFA07A";_circ_colorNameA.lightseagreen="#20B2AA";_circ_colorNameA.lightskyblue="#87CEFA";_circ_colorNameA.lightslategray="#778899";_circ_colorNameA.lightsteelblue="#B0C4DE";
_circ_colorNameA.lightyellow="#FFFFE0";_circ_colorNameA.lime="#00FF00";_circ_colorNameA.limegreen="#32CD32";_circ_colorNameA.linen="#FAF0E6";_circ_colorNameA.magenta="#FF00FF";_circ_colorNameA.maroon="#800000";_circ_colorNameA.mediumaquamarine="#66CDAA";_circ_colorNameA.mediumblue="#0000CD";_circ_colorNameA.mediumorchid="#BA55D3";_circ_colorNameA.mediumpurple="#9370DB";_circ_colorNameA.mediumseagreen="#3CB371";_circ_colorNameA.mediumslateblue="#7B68EE";_circ_colorNameA.mediumspringgreen="#00FA9A";
_circ_colorNameA.mediumturquoise="#48D1CC";_circ_colorNameA.mediumvioletred="#C71585";_circ_colorNameA.midnightblue="#191970";_circ_colorNameA.mintcream="#F5FFFA";_circ_colorNameA.mistyrose="#FFE4E1";_circ_colorNameA.moccasin="#FFE4B5";_circ_colorNameA.navajowhite="#FFDEAD";_circ_colorNameA.navy="#000080";_circ_colorNameA.oldlace="#FDF5E6";_circ_colorNameA.olive="#808000";_circ_colorNameA.olivedrab="#6B8E23";_circ_colorNameA.orange="#FFA500";_circ_colorNameA.orangered="#FF4500";
_circ_colorNameA.orchid="#DA70D6";_circ_colorNameA.palegoldenrod="#EEE8AA";_circ_colorNameA.palegreen="#98FB98";_circ_colorNameA.paleturquoise="#AFEEEE";_circ_colorNameA.palevioletred="#DB7093";_circ_colorNameA.papayawhip="#FFEFD5";_circ_colorNameA.peachpuff="#FFDAB9";_circ_colorNameA.peru="#CD853F";_circ_colorNameA.pink="#FFC0CB";_circ_colorNameA.plum="#DDA0DD";_circ_colorNameA.powderblue="#B0E0E6";_circ_colorNameA.purple="#800080";_circ_colorNameA.red="#FF0000";_circ_colorNameA.rosybrown="#BC8F8F";
_circ_colorNameA.royalblue="#4169E1";_circ_colorNameA.saddlebrown="#8B4513";_circ_colorNameA.salmon="#FA8072";_circ_colorNameA.sandybrown="#F4A460";_circ_colorNameA.seagreen="#2E8B57";_circ_colorNameA.seashell="#FFF5EE";_circ_colorNameA.sienna="#A0522D";_circ_colorNameA.silver="#C0C0C0";_circ_colorNameA.skyblue="#87CEEB";_circ_colorNameA.slateblue="#6A5ACD";_circ_colorNameA.slategray="#708090";_circ_colorNameA.snow="#FFFAFA";_circ_colorNameA.springgreen="#00FF7F";_circ_colorNameA.steelblue="#4682B4";
_circ_colorNameA.tan="#D2B48C";_circ_colorNameA.teal="#008080";_circ_colorNameA.thistle="#D8BFD8";_circ_colorNameA.tomato="#FF6347";_circ_colorNameA.turquoise="#40E0D0";_circ_colorNameA.violet="#EE82EE";_circ_colorNameA.wheat="#F5DEB3";_circ_colorNameA.white="#FFFFFF";_circ_colorNameA.whitesmoke="#F5F5F5";_circ_colorNameA.yellow="#FFFF00";_circ_colorNameA.yellowgreen="#9ACD32";
function _circ_getHexaColor(a){if("string"!=typeof a)return"#ffffff";if("#"==a.charAt(0))return a;if(a.match(/RGB/i)){try{a="#"+eval("__rgb2hex"+a.slice(3))}catch(e){}return a}return(a=_circ_colorNameA[a])?a:"#ffffff"}
function _circ_createSpectrumColorScheme(a,e,c,b){var m=null;c=c?Number(c):270;m=b?Number(b):0;c=isNaN(c)?270:c;m=isNaN(m)?0:m;b=(m-c)/(a-1);var n="",p=[],m=new Color(0);m.setVariantPreset(e?e:"default");for(e=0;e<a;e++)n="#",m.setBaseColor((c+b*e)%360),n+=m.getHex(0,0,0),p[p.length]=n;return p}
var __officeColors="#9999FF #993366 #FFFFCC #CCFFFF #660066 #FF8080 #0066CC #CCCCFF #000080 #FF00FF #FFFF00 #00FFFF #800080 #800000 #008080 #0000FF #00CCFF #CCFFFF #CCFFCC #FFFF99 #99CCFF #FF99CC #CC99FF #FFCC99".split(" "),__mineralColors="#F3898B #7BFECD #B3B07B #49BA85 #FEDBFE #847FBA #FEA869 #17BCC4 #DC686D #28803C #FFFF00 #C09B43 #746FC0 #9C9C9C #EDFEA5 #0000FF #00E04D #86A9CE #B37B9D #9FD8B3 #FEB676 #C09671 #87CFFE #00A7C7".split(" "),__pastelColors="#D2D2D2 #9DC0C0 #DFC7AA #A1D197 #E2A6A6 #CBA6CB #FEA4A4 #A8ACD1 #C8D89A #F3C4D8 #E9E15E #EEEEEE #C0AB79 #E2E17F #B4E1FE #E8DDFE #E1FEEB #FEF782 #C3FFC3 #CEFE87 #8CFEB3 #D2D2D2 #9DC0C0 #DFC7AA".split(" "),
__harvestColors="#C06549 #FFD700 #BDB76B #F7B567 #CEC395 #CD9B1D #F0E68C #A7AF5E #C09058 #8B4513 #AC96AC #698B69 #8B6914 #8B8B00 #FFFBC3 #BDB056 #DCCEDB #FEF782 #FEEAC6 #FFC7AE #A6B655 #DB6700 #E5A100 #F7D3B3".split(" "),__fruitColors="#1F77B4 #AEC7E8 #FF7F0E #FFBB78 #2CA02C #99DF8B #D62728 #FF9896 #966ABE #C5B0D5 #8C564B #C49C94 #E377C2 #F7B6D2 #7E7E7E #C7C7C7 #BCBD22 #DBDB8D #18BECF #9EDAE5 #1F77B4 #AEC7E8".split(" "),__colorPaletteA=[];__colorPaletteA.office=__officeColors;
__colorPaletteA.mineral=__mineralColors;__colorPaletteA.pastel=__pastelColors;__colorPaletteA.harvest=__harvestColors;__colorPaletteA.fruit=__fruitColors;function _circ_createPaletteColorScheme(a,e,c){a=__colorPaletteA[a];c||(c=0);if(c+e<=a.length)return a.slice(c,c+e);for(var b=[],m=0;m<e;m++)b.push(a[(c+m)%a.length]);return b}var __colWheel=Array(12);__colWheel["0"]=[255,0,0,0,100,100];__colWheel["15"]=[255,51,0,15,100,100];__colWheel["30"]=[255,102,0,30,100,100];
__colWheel["45"]=[255,128,0,45,100,100];__colWheel["60"]=[255,153,0,60,100,100];__colWheel["75"]=[255,178,0,75,100,100];__colWheel["90"]=[255,204,0,90,100,100];__colWheel["105"]=[255,229,0,105,100,100];__colWheel["120"]=[255,255,0,120,100,100];__colWheel["135"]=[204,255,0,135,100,100];__colWheel["150"]=[153,255,0,150,100,100];__colWheel["165"]=[51,255,0,165,100,100];__colWheel["180"]=[0,204,0,180,100,80];__colWheel["195"]=[0,178,102,195,100,70];__colWheel["210"]=[0,153,153,210,100,60];
__colWheel["225"]=[0,102,178,225,100,70];__colWheel["240"]=[0,51,204,240,100,80];__colWheel["255"]=[25,25,178,255,100,70];__colWheel["270"]=[51,0,153,270,100,60];__colWheel["285"]=[64,0,153,285,100,60];__colWheel["300"]=[102,0,153,300,100,60];__colWheel["315"]=[153,0,153,315,100,60];__colWheel["330"]=[204,0,153,330,100,80];__colWheel["345"]=[229,0,102,345,100,90];var __varPresets=[];__varPresets["default"]=[-1,-1,1,-.7,.25,1,.5,1];__varPresets.pastel=[.5,-.9,.5,.5,.1,.9,.75,.75];
__varPresets.soft=[.3,-.8,.3,.5,.1,.9,.5,.75];__varPresets.hard=[1,-1,1,-.6,.1,1,.6,1];__varPresets.light=[.25,1,.5,.75,.1,1,.5,1];__varPresets.pale=[.1,-.85,.1,.5,.1,1,.1,.75];__varPresets.work=[];function __dec2hex(a){a=a.toString(16);2>a.length&&(a="0"+a);return a.toUpperCase()}function __hex2dec(a){return parseInt(a,16)}function __col2Gray(a,e,c){a=Math.round(.299*a+.587*e+.114*c);return __dec2hex(a)+__dec2hex(a)+__dec2hex(a)}
function __rgb2hex(a,e,c){return __dec2hex(a)+__dec2hex(e)+__dec2hex(c)}function Color(a){this.S=[];this.V=[];this.setBaseColor(a)}Color.prototype.setBaseColor=function(a){this.moveHue(a)};
Color.prototype.moveHue=function(a){function e(a,b,c){return a+Math.round((b-a)*c)}this.H=a;var c=Math.round(this.H)%360,b=c%15+(this.H-Math.floor(this.H));a=b/15;b=c-Math.floor(b);c=__colWheel[b];b=__colWheel[(b+15)%360];this.baseR=e(c[0],b[0],a);this.baseG=e(c[1],b[1],a);this.baseB=e(c[2],b[2],a);this.baseS=e(c[4],b[4],a)/100;this.baseV=e(c[5],b[5],a)/100};Color.prototype.setVariant=function(a,e,c){this.S[a]=e;this.V[a]=c};
Color.prototype.getS=function(a){a=0>this.S[a]?-this.S[a]*this.baseS:this.S[a];1<a&&(a=1);0>a&&(a=0);return a};Color.prototype.getV=function(a){a=0>this.V[a]?-this.V[a]*this.baseV:this.V[a];1<a&&(a=1);0>a&&(a=0);return a};Color.prototype.setVariantPreset=function(a){var e=__varPresets[a];e||(e=__varPresets["default"]);for(a=0;4>a;a++)this.setVariant(a,e[2*a],e[2*a+1])};
Color.prototype.getHex=function(a,e,c){var b,m;b=Math.max(Math.max(this.baseR,this.baseG),this.baseB);Math.min(Math.min(this.baseR,this.baseG),this.baseB);m=0>c?this.baseV:this.getV(c);c=0>c?this.baseS:this.getS(c);var n=255*m,p=0<b?n/b:0;b=Math.min(255,Math.round(n-(n-this.baseR*p)*c));m=Math.min(255,Math.round(n-(n-this.baseG*p)*c));c=Math.min(255,Math.round(n-(n-this.baseB*p)*c));a&&(b=51*Math.round(b/51),m=51*Math.round(m/51),c=51*Math.round(c/51));return e?7==e?__col2Gray(b,m,c):getColorBlindColor(b,
m,c,e):__dec2hex(b)+__dec2hex(m)+__dec2hex(c)};Color.prototype.rotate=function(a){this.setBaseColor((this.H+a)%360)};ColorScheme=new _ColorScheme;function _ColorScheme(){this.createColorScheme=_circ_createColorScheme;this.getDerivateColor=_circ_getDerivateColor;this.getBorderColor=_circ_getBorderColor;this.getTextColor=_circ_getTextColor};
