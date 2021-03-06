/**********************************************************************
 maptheme.js

$Comment: provides thematic map extensions for svggis
$Source : maptheme.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2004/12/15 $
$Author: guenter richter $
$Id: maptheme.js 9 2007-06-27 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log: maptheme.js,v $
**********************************************************************/

/** 
 * @fileoverview This file provides the classes for thematic map functions<br>
 * (data collection, distribution and colorizing of shapes)
 * @author Guenter Richter guenter.richter@medienobjekte.de
 * @version 1.1 
 */


// .............................................................................
// locals to get theme definitions object / string
// .............................................................................

var themeStyleTranslateA = new Array(
	 { style: "opacity"			,obj: "nOpacity" }
	,{ style: "fillopacity"		,obj: "fillOpacity" }
	,{ style: "autoopacity"		,obj: "autoOpacity" }
	,{ style: "shadow"			,obj: "fOrigShadow" }
	,{ style: "blur"			,obj: "nBlur" }
	,{ style: "filter"			,obj: "szFilter" }
	,{ style: "dfilter"			,obj: "nDeltaFilter" }
	,{ style: "filterfield"		,obj: "szFilterField" }

	,{ style: "dbtable"			,obj: "coTable" }
	,{ style: "dbtableUrl"		,obj: "coTableUrl" }
	,{ style: "dbtableType"		,obj: "coTableType" }
	,{ style: "dbtableExt"		,obj: "coTableExt" }
	,{ style: "datacache"		,obj: "fDataCache" }
	,{ style: "itemfield"		,obj: "szItemField" }
	,{ style: "lookupfield"		,obj: "szSelectionField" }
	,{ style: "lookuptoupper"	,obj: "fSelectionFieldToUpper" }
	,{ style: "lookupsuffix"	,obj: "szSelectionFieldSuffix" }
	,{ style: "showdata"		,obj: "fShowData"  }
	,{ style: "datafields"		,obj: "szDataFieldsA" ,type: "array" }
	,{ style: "userdraw"		,obj: "userDraw" }

	//,{ style: "ranges"			,obj: "szRanges" }
	,{ style: "ranges"			,obj: "szRangesA" ,type: "array" }
	,{ style: "rangecentervalue",obj: "nRangeCenterValue"  }

	,{ style: "symbols"			,obj: "szSymbolsA" ,type: "array" }
	,{ style: "values"			,obj: "szValuesA" ,type: "array" ,delimiter:"|" }
	,{ style: "label"			,obj: "szOrigLabelA" ,type: "array" ,delimiter:"|" }
	,{ style: "xaxis"			,obj: "szXaxisA" ,type: "array" }
	,{ style: "units"			,obj: "szUnits"  }
	,{ style: "labelunits"		,obj: "szLabelUnits"  }
	,{ style: "units100"		,obj: "szUnits100"  }
	,{ style: "sizevalueunits"	,obj: "szSizeValueUnits"  }
	,{ style: "alphavalueunits"	,obj: "szAlphaValueUnits"  }
	,{ style: "legendunits"		,obj: "szLegendUnits"  }
	,{ style: "weights"			,obj: "szWeights"  }
	,{ style: "align"			,obj: "szAlign"  }

	,{ style: "normalsizevalue"	,obj: "nNormalSizeValue"  }
	,{ style: "normalsizescale"	,obj: "szNormalSizeScale"  }
	,{ style: "scale"			,obj: "nScale"  }
	,{ style: "rangescale"		,obj: "nRangeScale"  }

	,{ style: "valuefield"		,obj: "szValueField"  }
	,{ style: "labelfield"		,obj: "szLabelField"  }
	,{ style: "sizefield"		,obj: "szSizeField"  }
	,{ style: "alphafield"		,obj: "szAlphaField"  }
	,{ style: "alphafield100"	,obj: "szAlphaField100"  }
	,{ style: "dopacitypow"		,obj: "nDopacityPow"  }
	,{ style: "dopacityramp"	,obj: "szDopacityRamp"  }
	,{ style: "dopacityscale"	,obj: "nDopacityScale"  }

	,{ style: "buffersize"		,obj: "nBufferSize"  }
	,{ style: "bufferstep"		,obj: "nBufferSizeStep"  }
	,{ style: "field100min"		,obj: "nField100Min"  }
	,{ style: "fractionscale"	,obj: "nFractionScale"  }
	,{ style: "minvalue"		,obj: "nMinValue"  }
	,{ style: "maxvalue"		,obj: "nMaxValue"  }

	,{ style: "textfont"		,obj: "szTextFont"  }
	,{ style: "textcolor"		,obj: "szTextColor"  }
	,{ style: "linecolor"		,obj: "szLineColor"  }
	,{ style: "linewidth"		,obj: "nLineWidth"  }
	,{ style: "bordercolor"		,obj: "szBorderColor"  }
	,{ style: "borderstyle"		,obj: "szBorderStyle"  }
	,{ style: "borderwidth"		,obj: "szBorderWidth"  }
	,{ style: "borderradius"	,obj: "nBorderRadius"  }
	,{ style: "boxcolor"		,obj: "szBoxColor"  }
	,{ style: "boxopacity"		,obj: "nBoxOpacity"  }
	,{ style: "boxmargin"		,obj: "nBoxMargin"  }

	,{ style: "textplacement"	,obj: "szTextPlacement"  }
	,{ style: "infotitle"		,obj: "szInfoTitle"  }
	,{ style: "titlefield"		,obj: "szTitleField"  }
	,{ style: "snippetfield"	,obj: "szSnippetField"  }
	,{ style: "exclude"			,obj: "szExcludeA" ,type: "array" }
	,{ style: "nodatacolor"		,obj: "szNoDataColor"  }
	,{ style: "titleupper"		,obj: "szTitleUpper"  }
	,{ style: "labelupper"		,obj: "szLabelUpper"  }
	,{ style: "valueupper"		,obj: "szValueUpper"  }
	,{ style: "glowupper"		,obj: "szGlowUpper"  }
	,{ style: "chartupper"		,obj: "szChartUpper"  }
	,{ style: "boxupper"		,obj: "szBoxUpper"  }
	,{ style: "valuescale"		,obj: "nValueScale"  }
	,{ style: "minvaluesize"	,obj: "nValueSizeMin"  }
	,{ style: "valuedecimals"	,obj: "szValueDecimals" }
	,{ style: "fadevaluepow"	,obj: "szFadeValuePow"  }
	,{ style: "fadenegative"	,obj: "nFadeNegative"  }
	,{ style: "centerpart"		,obj: "szCenterPart"  }

	,{ style: "clipframes"		,obj: "nClipFrames"  }
	,{ style: "cliplegend"		,obj: "nClipColorLegend"  }
	,{ style: "clipparts"		,obj: "nClipParts"  }
	,{ style: "minchartsize"	,obj: "nChartSizeMin"  }
	,{ style: "showparts"		,obj: "szShowParts"  }
	,{ style: "gridx"			,obj: "nGridX"  }
	,{ style: "gridwidth"		,obj: "nGridWidth"  }
	,{ style: "gridmatrix"		,obj: "nGridMatrix"  }
	,{ style: "gridwidthpx"		,obj: "nGridWidthPx"  }
	,{ style: "aggregationfield",obj: "szAggregationField"  }
	,{ style: "aggregationscale",obj: "szAggregationFieldA" ,type: "array"  }
	,{ style: "aggregation"		,obj: "szAggregation"  }
	,{ style: "minaggregation"	,obj: "szMinAggregation"  }

	,{ style: "dominantfilter"	,obj: "szDominantFilter" }
	,{ style: "dominantdfilter"	,obj: "nDominantDFilter" }
	,{ style: "overviewchart"	,obj: "szOverviewChart" }
	,{ style: "evidence"		,obj: "evidenceMode" }
	,{ style: "markclass"		,obj: "markedClass" }

	,{ style: "name"			,obj: "szName"  }
	,{ style: "title"			,obj: "szTitle"  }
	,{ style: "snippet"			,obj: "szSnippet"  }
	,{ style: "description"		,obj: "szDescription"  }

);

function __maptheme_getStyleString(themeObj){
	var szStyle = "";
	for ( var i=0; i<themeStyleTranslateA.length; i++ ){
		szStyle += __maptheme_getOneStyleProperty(themeObj[themeStyleTranslateA[i].obj],themeStyleTranslateA[i].style,themeStyleTranslateA[i].type,themeStyleTranslateA[i].delimiter);
	}
	return szStyle;
}
function __maptheme_getOneStyleProperty(styleObj,szProperty,szType,szDelimiter){

	szDelimiter = szDelimiter?szDelimiter:",";

	if ( (typeof(styleObj) != "undefined") && (styleObj != null) ){

		if ( szType && (typeof(szType) != "undefined") ){
			if ( szType == "array" && styleObj && styleObj.length ){
				var szArray = "";
				for ( var i=0; i<styleObj.length; i++ ){
					szArray += ((i>0)?szDelimiter:"") + String(styleObj[i]);
				}
				return szProperty+":"+szArray+";";
			}
		}else{
			return szProperty+":"+String(styleObj)+";";
		}

	}
	return "";
}
function __getArrayString(arrayA,szDelimiter){
	var szArray = "";
	if ( arrayA && (arrayA != "undefined") && (typeof(arrayA) != "undefined") ){
		for ( var i=0; i<arrayA.length; i++ ){
			szArray += ((i>0)?szDelimiter:"") + String(arrayA[i]).replace(/\'/gi," ").replace(/\"/gi," ");
		}
	}
	return szArray;
}
function __maptheme_getStyleObj(themeObj){
	var szStyle = "";
	var styleObj = {};
	for ( var i=0; i<themeStyleTranslateA.length; i++ ){
		if ( (themeObj[themeStyleTranslateA[i].obj] != null) && 
			 (themeObj[themeStyleTranslateA[i].obj] != "undefined") ){
			styleObj[themeStyleTranslateA[i].style] = themeObj[themeStyleTranslateA[i].obj];
		}
	}
	return styleObj;
}


// .............................................................................
// Themes  (holds all map themes)     
// .............................................................................

/**
 * Create a new Themes instance.  
 * @class It realizes an object to create and manage map themes (colorized shapes, charts etc. )
 * @constructor
 * @throws 
 * @return A new Themes object
 */
Map.Themes = function() {
	/** array to hold all generated MapThemes object */
	this.themesA = new Array(0);
	/** array to hold all map shape nodes used; used to accellerate */
	this.themeNodesA = new Array(0);
	/** array to hold all map shape nodes used; used to accellerate */
	this.themeNodesPosA = new Array(0);
	/** array to hold the box of all map shape nodes used; used to accellerate */
	this.themeNodesBoxA = new Array(0);
	/** hold the number of nodes used for themes */
	this.themeNodes = 0;
	/** hold the active theme */
	this.activeTheme = null;
	/** hold the active buffer */
	this.activeBuffer = null;
	/** layer switched on, to make visible a theme */
	this.switchedLayerA = new Array(0);
	/** flag to enable dynamic chart offsets */
	this.enableChartOffset = false;
	/** flag to enable choroplethe theme overlay */
	this.enableMultiChoroplethe = false;
	/** flag to enable subthemes for multi field themes */
	this.enableSubThemes = true;

	/** flag to define the info style for choroplethe values **/
	this.szChoropletheInfoStyle = "histogram";
	/** defines the max number of charts per theme **/
	this.nMaxThemeCharts = 500000;
	/** defines the max number of shadowed charts per theme **/
	this.nMaxShadowCharts = 1000;
	/** defines the number of shapes color changes after which the display will be updated **/
	this.nflushPaintShape = 5000;
	/** defines the number of charts after which the display will be updated **/
	this.nflushChartDraw = 1000;
	/** defines the max height of color scheme legends (in pixel) **/
	this.nColorSchemeMaxHeight = 120;
	/** allways show values of choroplethe themes **/
	this.allwaysShowValues = false;
	/** hide Info buttons and close more on mouseout **/
	this.autoHideInfoTools = false;
	/** array to hold the loaded data sources, for caching **/
	this.themeDataCacheA = new Array(0);
};

Map.Themes.prototype = new Map();
// create instance on load
if ( (typeof(thisversion) == "string") && map.checkVersion(thisversion) ){
	map.Themes = new Map.Themes();
	try{
		HTMLWindow.ixmaps.htmlgui_onInitThemes();
	}
	catch (e){
	}
}
else{
	alert("Map.Themes incompatible !");
}

/**
 * adds a map theme to the list
 * @parameter mapTheme the map theme object to add
 */
Map.Themes.prototype.addTheme = function(mapTheme){
	this.themesA[this.themesA.length] = mapTheme;
	// notify HTML user about the new theme
	if ( !mapTheme.szFlag.match(/selection/i) ){
		try{
			HTMLWindow.ixmaps.htmlgui_onNewTheme(mapTheme.szId);
		}
		catch (e){}
	}
};
/**
 * returns the number of themes in the list
 */
Map.Themes.prototype.getThemeCount = function(){
	return this.themesA.length;
};
/**
 * returns a list of all themes
 */
Map.Themes.prototype.getAllThemes = function(){
	return this.themesA;
};
/**
 * returns true, if theme already exists
 */
Map.Themes.prototype.isTheme = function(szIdStr){
	for ( var i=0; i<this.themesA.length; i++ ){
		if ( this.themesA[i].szIdStr && (this.themesA[i].szIdStr == szIdStr) ){
			return this.themesA[i];
		}
	}
	return false;
};

/**
 * creates a new map theme. (depreciated - please use newTheme2)<br>
 * <br>
 * If fLoadExternalData == true <br>
 * 1. tries to load the map data from external file<br>
 * 2. calls this function again on success or error
 * @parameter szThemes the map layer(themes) to include into the new map theme
 * @parameter szField the name of the field to take the value
 * @parameter szField100 the name of the field to take the fraction value (for % analysis)
 * @parameter szFlag defines the type of the theme and representation details
 * @parameter colorScheme defines the colors to visualize the map theme; the number of colors in the scheme defines the number of classes (bars, pieparts, etc.)
 * @parameter szTitle title text to be displayed in the info pane of the map theme
 * @return A new MapTheme object
 * Parameter descriptions:
 * <br><br>
 * <strong>szFlag</strong>
 *  <table>
 *  <tr><td>CHOROPLETHE</td><td>colorize map shapes</td><td></td></tr>
 *  <tr><td></td><td>EQUIDISTANT</td><td></td></tr>
 *  <tr><td></td><td>QUANTILE</td><td></td></tr>
 *  <tr><td></td><td>DOMINANT</td><td></td></tr>
 *  <tr><td>CHART</td><td>draw chart objects</td></tr>
 *  <tr><td></td><td>BUBBLE</td></tr>
 *  <tr><td></td><td></td>SURFACE</tr>
 *  <tr><td></td><td></td>VALUES</tr>
 *  </table>
 * <br>
 * <strong>Samples:</strong>
 * <br> map.Api.changeThemeStyle("type:CHOROPLETHE|EQUIDISTANT;classes:10;colorscheme:spectrum,pastel;overviewchart:PIE|3D"); 
 * <br> map.Api.changeThemeStyle("type:CHART|BUBBLE|SURFACE|VALUES"); 
 * <br> map.Api.changeThemeStyle("type:CHART|PIE|DONUT|3D|VOLUME");
 * <br><br>
 * <strong>Hints:</strong>
 * <br>
 * CHOROPLETHE type can be changed only to BUBBLE type.<br>
 * CHART type can be changed into DOMINANT type.<br>
 *
 * GR 13.02.2017 deprecated !!!
 */
 /**
Map.Themes.prototype.newTheme = function(szThemes,szFields,szField100,szFlag,colorScheme,szTitle,szLabelA){

	var mapTheme = new MapTheme(szThemes,szFields,szField100,szFlag,colorScheme,szTitle,szLabelA);
	mapTheme.parent = this;
	this.addTheme(mapTheme);
	mapTheme.fRealize = true;

	if ( fLoadExternalData && !fAllIncluded){
		var szThemesA = szThemes.split("|");
		for (var i=0; i<szThemesA.length;i++){
			this.loadExternalData(szThemesA[i],false);
		}
	}
	else{
		executeWithMessage("map.Themes.execute()","... processing ...");
	}

	return mapTheme;
};
**/

/**
 * creates a new map theme. <br>
 * <br>
 * If fLoadExternalData == true <br>
 * 1. tries to load the map data from external file<br>
 * 2. calls this function again on success or error
 * @parameter szThemes the map layer(themes) to include into the new map theme
 * @parameter szField the name of the field to take the value
 * @parameter szField100 the name of the field to take the fraction value (for % analysis)
 * @parameter szStyle define the theme style
 * <br><br>szStyle is a string to define multiple properties with a syntax similar to CSS styles.<br>
 * <br>Sample: <em>'type:CHOROPLETHE;classes:5;colorscheme:spectrum'</em>
 * <br><br>plesase see the documentation of Map.Api.prototype.createTheme() for more specific information.
 * @parameter szTitle title text to be displayed in the info pane of the map theme
 * @parameter szLabel a string with label separated by '|' to define label for classes, or chart parts
 * @return A new MapTheme object
 * <br><br>
 * <strong>Samples:</strong>
 * <br> map.Themes.newTheme2("layer","fieldA","","style=type:CHOROPLETHE|EQUIDISTANT;classes:10;colorscheme:spectrum,pastel"); 
 * <br> map.Themes.newTheme2("layer","fieldA","field100","style=type:CHOROPLETHE;",title="this theme"); 
 * <br><br>
 */
Map.Themes.prototype.newTheme2 = function(szThemes,szFields,szField100,szStyle,szTitle,szLabel){

	if ( !map.isIdle() ){
		setTimeout("map.Themes.newTheme2(\""+szThemes+"\",\""+szFields+"\",\""+szField100+"\",\""+szStyle+"\",\""+szTitle+"\",\""+szLabel+"\")",250);
		return;
	}


	if ( (typeof(szThemes) != "undefined") && (typeof(szThemes) != "string")  ||
		 (typeof(szFields) != "undefined") && (typeof(szFields) != "string")  ||
		 (typeof(szField100) != "undefined") && (typeof(szField100) != "string")  ||
		 (typeof(szStyle) != "undefined") && (typeof(szStyle) != "string")  ||
		 (typeof(szTitle) != "undefined") && (typeof(szTitle) != "string")  ||
		 (typeof(szLabel) != "undefined") && (typeof(szLabel) != "string") )	{
		alert("ERROR: only string argument allowed !");
	}
	var szIdStr = szThemes+szFields+szField100+szStyle+szTitle+szLabel;
	if ( !szStyle.match(/FORCE/) && this.isTheme(szIdStr) ){
		this.removeTheme(null,this.isTheme(szIdStr).szId);
		//displayMessage("removing theme ...",2000);
		return null;
	}

	var szLabelA = ( szLabel && (szLabel != "undefined"))?szLabel.split('|'):null;
	var mapTheme = null;

	var styleObj = null;
	var szStyleA = szStyle.split('style=');
	if ( szStyleA && szStyleA.length > 1 ){
		styleObj = __getStyleObj(szStyleA[1]);
	}
	else{
		styleObj = __getStyleObj(szStyle);
	}

	if (styleObj ){

		var colorSchemeA = new Array(5,"white","blue");
		if ( styleObj.colorscheme ){
			colorSchemeA = (styleObj.colorscheme.match(/\|/)||styleObj.colorscheme.match(/RGB/))?styleObj.colorscheme.split('|'):styleObj.colorscheme.split(',');
		}

		mapTheme = new MapTheme(szThemes,szFields,szField100,styleObj.type,colorSchemeA,szTitle,szLabelA);
		mapTheme.nOrder = this.getThemeCount();
		mapTheme.szIdStr = szIdStr;

		// parse theme parameter 
		this.parseStyle(mapTheme,styleObj);
	}

	// GR 21.12.2011 flag allways show values 
	if ( this.allwaysShowValues ){
		mapTheme.szFlag += "|VALUES";
	}

	mapTheme.parent = this;
	this.addTheme(mapTheme);
	mapTheme.fRealize = true;

	if ( 1 || !fAllIncluded ){
		if ( mapTheme.coTable ){
			this.loadExternalData(mapTheme.coTable,mapTheme.nRefreshTimeout,mapTheme);
			return mapTheme;
		}
		else
		if ( fLoadExternalData ) {
			var szThemesA = szThemes.split("|");
			for (var i=0; i<szThemesA.length;i++){
				this.loadExternalData(szThemesA[i],mapTheme.nRefreshTimeout,mapTheme);
			}
			return mapTheme;
		}
	}

	// GR 05.06.2015 make sure, zoom factors are up to date	
	// -------------
	map.Event.doDefaultZoom();

	executeWithMessage("map.Themes.execute()","... processing ...");
	return mapTheme;
};

// .............................................................................
// h e l p e r   to normalize theme parameter     
// .............................................................................

/**
 * test if object is array 
 * @parameter obj the object to test
 * @return true/false
 * @type boolean
 */
Map.Themes.prototype.isArray = function(obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';
};
/**
 * make sure, object is type array 
 * @parameter obj the object to transform
 * @return array
 * @type array of string
 */
Map.Themes.prototype.toArray = function(obj) {
	if ( this.isArray(obj) ){
		return obj;
	}else{
		return obj.match(/\|/)?obj.split('|'):obj.split(',');
	}
};
/**
 * constructs the creation strings for all map themes 
 * @parameter obj the object to transform
 * @return string or array.join('|')
 * @type string
 */
Map.Themes.prototype.toString = function(obj) {
	if ( this.isArray(obj) ){
		return obj.join('|');
	}else{
		return obj;
	}
};

// .............................................................................
// create new theme from JSON definition     
// .............................................................................

/**
 * creates a new map theme. <br>
 * <br>
 * If fLoadExternalData == true <br>
 * 1. tries to load the map data from external file<br>
 * 2. calls this function again on success or error
 * @parameter szThemes the map layer(themes) to include into the new map theme
 * @parameter szField the name of the field to take the value
 * @parameter szField100 the name of the field to take the fraction value (for % analysis)
 * @parameter szStyle define the theme style
 * <br><br>szStyle is a string to define multiple properties with a syntax similar to CSS styles.<br>
 * <br>Sample: <em>'type:CHOROPLETHE;classes:5;colorscheme:spectrum'</em>
 * <br><br>plesase see the documentation of Map.Api.prototype.createTheme() for more specific information.
 * @parameter szTitle title text to be displayed in the info pane of the map theme
 * @parameter szLabel a string with label separated by '|' to define label for classes, or chart parts
 * @return A new MapTheme object
 * <br><br>
 * <strong>Samples:</strong>
 * <br> map.Themes.newTheme2("layer","fieldA","","style=type:CHOROPLETHE|EQUIDISTANT;classes:10;colorscheme:spectrum,pastel"); 
 * <br> map.Themes.newTheme2("layer","fieldA","field100","style=type:CHOROPLETHE;",title="this theme"); 
 * <br><br>
 */
Map.Themes.prototype.newThemeByObj = function(themeObj){

	_TRACE("newThemeByObj --------------------------------------------");

	if ( !map.isIdle() ){
		// cannot create theme now
		if (themeObj){
			// if new theme definition given
			// stack it and for execution in future
			this.newThemeObjA = this.newThemeObjA || [];
			this.newThemeObjA.push(themeObj);
		}
		_TRACE("ixmaps not idle ! --- retry later ! ---");
		setTimeout("map.Themes.newThemeByObj()",100);
		return;
	}

	// execute a given theme or a stacked one 
	themeObj = themeObj || this.newThemeObjA.pop();

	if ( !themeObj ){
		return;
	}

	// make unique identifier to toggle themes
	var szIdStr = JSON.stringify(themeObj);
	if ( !themeObj.style.type.match(/FORCE/) && this.isTheme(szIdStr) ){
		_TRACE("identic theme -> remove it");
		this.removeTheme(null,this.isTheme(szIdStr).szId);
		//displayMessage("removing theme ...",2000);
		return null;
	}

	var mapTheme = null;
	var styleObj = themeObj.style;

	if ( !styleObj ){
		return null;
	}

	// ----------------------
	// here we go 
	// ----------------------

	if ( this.isArray(styleObj.label) ){
		var szLabelA = styleObj.label;
		var szLabel = styleObj.label.join('|');
	}else{
		var szLabel = styleObj.label;
		var szLabelA = ( szLabel && (szLabel != "undefined"))?szLabel.split('|'):null;
	}

	var colorSchemeA = new Array(5,"white","blue");
	if ( styleObj.colorscheme ){
		colorSchemeA = this.toArray(styleObj.colorscheme);
	}

	themeObj.layer = this.toString(themeObj.layer);
	themeObj.field = this.toString(themeObj.field);

	// make new theme object

	mapTheme = new MapTheme(themeObj.layer,themeObj.field,themeObj.field100,styleObj.type,colorSchemeA,styleObj.title,szLabelA);
	mapTheme.nOrder = this.getThemeCount();
	mapTheme.szIdStr = szIdStr;

	// parse theme parameter 
	this.parseStyle(mapTheme,styleObj);

	// GR 21.12.2011 flag allways show values 
	if ( this.allwaysShowValues ){
		mapTheme.szFlag += "|VALUES";
	}

	// ------------------
	// realize the theme
	// ------------------

	mapTheme.parent = this;
	this.addTheme(mapTheme);
	mapTheme.fRealize = true;

	// if there is data to load, do this first, and draw the theme on callback
	// -----------------------------------------------------------------------
	if ( 1 || !fAllIncluded ){
		if ( mapTheme.coTable ){
			this.loadExternalData(mapTheme.coTable,mapTheme.nRefreshTimeout,mapTheme);
			return mapTheme;
		}
		else
		if ( fLoadExternalData ) {
			var szThemesA = themeObj.layer.split("|");
			for (var i=0; i<szThemesA.length;i++){
				this.loadExternalData(szThemesA[i],mapTheme.nRefreshTimeout,mapTheme);
			}
			return mapTheme;
		}
	}

	// no data to load, so draw the theme
	// ----------------------------------

	// GR 05.06.2015 make sure, zoom factors are up to date	
	map.Event.doDefaultZoom();

	executeWithMessage("map.Themes.execute()","... processing ...");

	return mapTheme;
};

/**
 * parse styleObj and create theme parameter
 * complement to newThemeByObj(...)
 * @return void
 */
Map.Themes.prototype.parseStyle = function(mapTheme,styleObj){

	if ( mapTheme && styleObj){

		if ( styleObj.classes ){
			if ( isNaN(Number(mapTheme.origColorScheme[0])) ){
				var xxx = mapTheme.origColorScheme[mapTheme.origColorScheme.length-1];
				mapTheme.origColorScheme[1] = mapTheme.origColorScheme[0];
				mapTheme.origColorScheme[2] = xxx;
			}
			mapTheme.origColorScheme[0] = Number(styleObj.classes);
		}
		if ( styleObj.colorstyle ){
			if ( mapTheme.origColorScheme[1] == 'spectrum' ){
				mapTheme.origColorScheme[2] = styleObj.colorstyle;
			}
		}
		if ( styleObj.dominantdfilter ){
			mapTheme.nDominantDFilter = Number(styleObj.dominantdfilter);
		}
		if ( styleObj.dominantfilter ){
			mapTheme.szDominantFilter = String(styleObj.dominantfilter);
		}
		if ( styleObj.filter ){
			mapTheme.szFilter = String(styleObj.filter);
		}
		if ( styleObj.filterfield ){
			mapTheme.szFilterField = String(styleObj.filterfield);
		}
		if ( styleObj.filtervalue ){
			mapTheme.szFilterValue = String(styleObj.filtervalue);
		}
		if ( styleObj.overviewchart ){
			mapTheme.szOverviewChart = styleObj.overviewchart;
		}
		if ( styleObj.evidence ){
			mapTheme.evidenceMode = styleObj.evidence;
		}
		if ( styleObj.markclass ){
			mapTheme.markedClass = styleObj.markclass;
		}
		if ( styleObj.fillopacity ){
			if ( styleObj.fillopacity == 'auto' ){
				mapTheme.autoOpacity = true;
				mapTheme.fillOpacity = 0;
			}else{
				mapTheme.fillOpacity = Number(styleObj.fillopacity);
			}
		}
		if ( styleObj.opacity ){
			if ( styleObj.opacity == 'auto' ){
				mapTheme.autoOpacity = true;
				mapTheme.fillOpacity = 0;
			}else{
				mapTheme.nOpacity = Number(styleObj.opacity);
			}
		}
		if ( styleObj.autoopacity ){
			mapTheme.autoOpacity = true;
			mapTheme.fillOpacity = 0;
		}
		if ( styleObj.shadow ){
			mapTheme.fShadow = mapTheme.fOrigShadow = (styleObj.shadow == "false")?false:true;
		}else{
			mapTheme.fShadow = mapTheme.fOrigShadow = false;
		}
		if ( styleObj.maxshadow ){
			mapTheme.nMaxShadowCharts = Number(styleObj.maxshadow);
		}
		if ( styleObj.blur ){
			mapTheme.nBlur = Number(styleObj.blur);
		}
		if ( styleObj.dbtable ){
			var dbTableA = styleObj.dbtable.split(" ");
			mapTheme.coTable = dbTableA[0];
			if ( dbTableA.length == 2){
				mapTheme.coTableType = "jsonDB";
				mapTheme.coTableUrl  = dbTableA[1].split("(")[1].split(")")[0];
			}
			if ( dbTableA.length == 3){
				mapTheme.coTableType = dbTableA[1];
				mapTheme.coTableUrl  = dbTableA[2].split("(")[1].split(")")[0];
			}
			if ( dbTableA.length == 4){
				mapTheme.coTableType = dbTableA[1];
				mapTheme.coTableUrl  = dbTableA[2].split("(")[1].split(")")[0];
				mapTheme.coTableExt  = dbTableA[3].split("(")[1].split(")")[0];
			}
		}
		if ( styleObj.dbtableType ){
			mapTheme.coTableType = styleObj.dbtableType;
		}
		if ( styleObj.dbtableUrl ){
			mapTheme.coTableUrl = styleObj.dbtableUrl;
		}
		if ( styleObj.dbtableExt ){
			mapTheme.coTableExt = styleObj.dbtableExt;
		}
		if ( styleObj.lookupfield ){
			mapTheme.szSelectionField = mapTheme.szItemField = styleObj.lookupfield;
		}
		if ( styleObj.lookuptoupper ){
			mapTheme.fSelectionFieldToUpper = ((styleObj.lookuptoupper == "true")||styleObj.lookuptoupper);
		}
		if ( styleObj.lookupsuffix ){
			mapTheme.szSelectionFieldSuffix = styleObj.lookupsuffix;
		}
		if ( styleObj.lookupprefix ){
			mapTheme.szSelectionFieldPrefix = styleObj.lookupprefix;
		}
		if ( styleObj.itemfield ){
			mapTheme.szItemField = styleObj.itemfield;
		}
		if ( styleObj.ranges ){
			mapTheme.szRangesA = this.toArray(styleObj.ranges);
			mapTheme.szRanges = this.toString(styleObj.ranges);
		}
		if ( styleObj.symbols ){
			mapTheme.szSymbolsA = this.toArray(styleObj.symbols);
		}
		if ( styleObj.values ){
			mapTheme.szValuesA = this.toArray(styleObj.values);
			// GR 07.10.2014 if theme has flag EXACT, then szValues defines the value sequence
			if ( styleObj.type.match(/EXACT/) && mapTheme.szValuesA.length ){
				// push all values into the value/index array
				for ( var i=0; i<mapTheme.szValuesA.length; i++ ){
					mapTheme.getStringValueIndex(mapTheme.szValuesA[i],"set");
				}
			}
		}
		if ( styleObj.align ){
			mapTheme.szAlign = styleObj.align;
		}
		if ( styleObj.units ){
			mapTheme.szUnits = styleObj.units;
		}
		if ( styleObj.units100 ){
			mapTheme.szUnits100 = styleObj.units100;
		}
		if ( styleObj.sizevalueunits ){
			mapTheme.szSizeValueUnits = " "+styleObj.sizevalueunits;
		}
		if ( styleObj.alphavalueunits ){
			mapTheme.szAlphaValueUnits = " "+styleObj.alphavalueunits;
		}
		if ( styleObj.legendunits ){
			mapTheme.szLegendUnits = " "+styleObj.legendunits;
		}
		if ( styleObj.labelunits ){
			mapTheme.szLabelUnits = " "+styleObj.labelunits;
		}
		if ( styleObj.xaxis ){
			mapTheme.szXaxisA = this.toArray(styleObj.xaxis);
		}
		if ( styleObj.name ){
			mapTheme.szName = unescape(styleObj.name);
		}
		if ( styleObj.title ){
			mapTheme.szTitle = unescape(styleObj.title);
		}
		if ( styleObj.snippet ){
			mapTheme.szSnippet = unescape(styleObj.snippet);
		}
		if ( styleObj.description ){
			mapTheme.szDescription = unescape(styleObj.description);
		}
		if ( styleObj.label ){
			mapTheme.szLabelA = mapTheme.szOrigLabelA = this.toArray(styleObj.label);
		}
		if ( styleObj.weights ){
			mapTheme.szWeightsA = this.toArray(styleObj.weights);
			mapTheme.szWeights = this.toString(styleObj.weights);
		}
		if ( styleObj.weight ){
			mapTheme.szWeightsA = [styleObj.weights];
			mapTheme.szWeights = styleObj.weight;
		}
		if ( styleObj.scale ){
			mapTheme.nScale = Number(styleObj.scale);
		}
		if ( styleObj.valuefield ){
			mapTheme.szValueField = styleObj.valuefield;
		}
		if ( styleObj.labelfield ){
			mapTheme.szLabelField = styleObj.labelfield;
		}
		if ( styleObj.titlefield ){
			mapTheme.szTitleField = styleObj.titlefield;
		}
		if ( styleObj.snippetfield ){
			mapTheme.szSnippetField = styleObj.snippetfield;
		}
		if ( styleObj.sizefield ){
			mapTheme.szSizeField = styleObj.sizefield;
		}
		if ( styleObj.alphafield ){
			mapTheme.szAlphaField = styleObj.alphafield;
		}
		if ( styleObj.alphafield100 ){
			mapTheme.szAlphaField100 = styleObj.alphafield100;
		}
		if ( styleObj.refresh ){
			mapTheme.nRefreshTimeout = Number(styleObj.refresh)*1000;
		}
		if ( styleObj.buffersize ){
			mapTheme.nBufferSize = styleObj.buffersize;
		}
		if ( styleObj.bufferstep ){
			mapTheme.nBufferSizeStep = styleObj.bufferstep;
		}
		if ( styleObj.field100min ){
			mapTheme.nField100Min = styleObj.field100min;
		}
		if ( styleObj.fractionscale ){
			mapTheme.nFractionScale = styleObj.fractionscale;
		}
		if ( styleObj.minvalue ){
			mapTheme.nMinValue = styleObj.minvalue;
		}
		if ( styleObj.maxvalue ){
			mapTheme.nMaxValue = styleObj.maxvalue;
		}
		if ( styleObj.showdata ){
			mapTheme.fShowData = ((styleObj.showdata == "true")||styleObj.showdata);
		}
		if ( styleObj.datacache ){
			mapTheme.fDataCache = (styleObj.datacache == "true");
		}
		if ( styleObj.editor ){
			mapTheme.fEditor = (styleObj.editor == "true");
		}
		if ( styleObj.datafields ){
			mapTheme.szDataFieldsA = this.toArray(styleObj.datafields);
		}
		if ( styleObj.textcolor ){
			mapTheme.szTextColor = styleObj.textcolor;
		}
		if ( styleObj.textfont ){
			mapTheme.szTextFont = styleObj.textfont;
		}
		if ( styleObj.linecolor ){
			mapTheme.szLineColor = styleObj.linecolor;
		}
		if ( styleObj.linewidth ){
			mapTheme.nLineWidth = styleObj.linewidth;
		}
		// GR 28.01.2008 CSS like
		if ( styleObj.bordercolor ){
			mapTheme.szBorderColor = styleObj.bordercolor;
		}
		// GR 28.01.2008 CSS like: none,solid,dashed,dotted
		if ( styleObj.borderstyle ){
			mapTheme.szBorderStyle = styleObj.borderstyle;
		}
		// GR 28.01.2008 CSS like: thin,medium,thick
		if ( styleObj.borderwidth ){
			mapTheme.szBorderWidth = styleObj.borderwidth;
		}
		// GR 30.01.2015 CSS like: 1,2,3 ...
		if ( styleObj.borderradius ){
			mapTheme.nBorderRadius = Number(styleObj.borderradius);
		}
		// GR 25.11.2015 box fill opacity
		if ( styleObj.boxcolor ){
			mapTheme.szBoxColor = styleObj.boxcolor;
		}
		// GR 28.08.2014 box fill opacity
		if ( styleObj.boxopacity ){
			mapTheme.nBoxOpacity = styleObj.boxopacity;
		}
		// GR 28.08.2014 box margin
		if ( styleObj.boxmargin ){
			mapTheme.nBoxMargin = styleObj.boxmargin;
		}
		// GR 28.01.2008 inside,outside,dynamic
		if ( styleObj.textplacement ){
			mapTheme.szTextPlacement = styleObj.textplacement;
		}
		// GR 18.03.2008 info title 
		if ( styleObj.infotitle ){
			mapTheme.szInfoTitle = styleObj.infotitle;
		}
		// GR 20.08.2008 define lookup values to exclude 
		if ( styleObj.exclude ){
			mapTheme.szExcludeA = this.toArray(styleObj.exclude);
		}
		// GR 29.01.2009 define aggregation mode
		if ( styleObj.aggregation ){
			mapTheme.szAggregation = styleObj.aggregation;
		}
		// GR 08.02.2009 define a center value for dynamic classes range
		if ( styleObj.rangecentervalue ){
			mapTheme.nRangeCenterValue = Number(styleObj.rangecentervalue);
		}
		// GR 01.02.2015 define the range scale = expansion/compression factor
		if ( styleObj.rangescale ){
			mapTheme.nRangeScale = styleObj.rangescale;
		}
		// GR 21.02.2009 define the value for full size chart symbol
		if ( styleObj.normalsizevalue ){
			mapTheme.nNormalSizeValue = styleObj.normalsizevalue;
		}
		// GR 25.10.2016 define the scale of base to the dynamoc object scaling
		if ( styleObj.normalsizescale ){
			mapTheme.szNormalSizeScale = styleObj.normalsizescale;
			mapTheme.nNormalSizeScale = __scanScaleValue(mapTheme.szNormalSizeScale);
		}
		// GR 21.03.2009 define the color for nodata 
		if ( styleObj.nodatacolor ){
			mapTheme.szNoDataColor = __getSaveColor(styleObj.nodatacolor);
		}
		// GR 15.03.2017 define scaledependency for box display
		if ( styleObj.boxupper ){
			mapTheme.szBoxUpper = styleObj.boxupper;
			mapTheme.nBoxUpper = __scanScaleValue(mapTheme.szBoxUpper);
		}
		// GR 25.05.2015 define scaledependency for label display
		if ( styleObj.titleupper ){
			mapTheme.szTitleUpper = styleObj.titleupper;
			mapTheme.nTitleUpper = __scanScaleValue(mapTheme.szTitleUpper);
		}
		// GR 25.05.2015 define scaledependency for label display
		if ( styleObj.labelupper ){
			mapTheme.szLabelUpper = styleObj.labelupper;
			mapTheme.nLabelUpper = __scanScaleValue(mapTheme.szLabelUpper);
		}
		// GR 21.03.2009 define scaledependency for value label 
		if ( styleObj.valueupper ){
			mapTheme.szValueUpper = styleObj.valueupper;
			mapTheme.nValueUpper = __scanScaleValue(mapTheme.szValueUpper);
		}
		// GR 15.03.2017 accept also 'valuesupper' 
		if ( styleObj.valuesupper ){
			mapTheme.szValueUpper = styleObj.valuesupper;
			mapTheme.nValueUpper = __scanScaleValue(mapTheme.szValueUpper);
		}
		// GR 12.11.2016 define scaledependency for chart glowing 
		if ( styleObj.glowupper ){
			mapTheme.szGlowUpper = styleObj.glowupper;
			mapTheme.nGlowUpper = __scanScaleValue(mapTheme.szGlowUpper);
		}
		// GR 24.02.2016 define scaledependency for chart 
		if ( styleObj.chartupper ){
			mapTheme.szChartUpper = styleObj.chartupper;
			mapTheme.nChartUpper = __scanScaleValue(mapTheme.szChartUpper);
		}
		// GR 22.10.2013 define scale for value label 
		if ( styleObj.valuescale ){
			mapTheme.nValueScale = Number(styleObj.valuescale);
		}
		// GR 06.04.2009 define the number of frames for a clip
		if ( styleObj.clipframes ){
			mapTheme.nClipFrames = styleObj.clipframes;
		}
		if ( styleObj.clipframerate ){
			mapTheme.nClipTimeout = 1/Number(styleObj.clipframerate)*1000;
		}
		if ( styleObj.cliplegend ){
			mapTheme.nClipColorLegend = Number(styleObj.cliplegend);
		}
		// GR 28.01.2015 remains for compatibility reason
		if ( styleObj.clipvaluesize ){
			mapTheme.nValueSizeMin = Number(styleObj.clipvaluesize);
		}
		// GR 20.11.2011 define size clipping for chart values
		if ( styleObj.minvaluesize ){
			mapTheme.nValueSizeMin = Number(styleObj.minvaluesize);
		}
		// GR 18.01.2015 define number of decimals for value display
		if ( styleObj.valuedecimals ){
			mapTheme.szValueDecimals = styleObj.valuedecimals;
		}
		// GR 19.06.2013 define power for calculating label fading 
		if ( styleObj.fadevaluepow ){
			mapTheme.szFadeValuePow = styleObj.fadevaluepow;
		}
		// GR 18.03.2013 define scale for dynamic opacity calculation
		if ( styleObj.dopacityscale){
			mapTheme.nDopacityScale = styleObj.dopacityscale;
		}
		// GR 18.03.2013 define ramp type (linear|pow|log) for dynamic opacity calculation
		if ( styleObj.dopacityramp){
			mapTheme.szDopacityRamp = styleObj.dopacityramp;
		}
		// GR 18.03.2013 define power for dynamic opacity calculation
		if ( styleObj.dopacitypow){
			mapTheme.nDopacityPow = styleObj.dopacitypow;
		}
		// GR 02.10.2013 define fading for negative chart values 
		if ( styleObj.fadenegative ){
			mapTheme.nFadeNegative = Number(styleObj.fadenegative) || 0.5;
		}
		// GR 21.02.2014 define clip for stacked bars 
		if ( styleObj.clipparts ){
			mapTheme.nClipParts = Number(styleObj.clipparts) || 0;
		}
		// GR 16.01.2015 define clip for chart size 
		if ( styleObj.minsize ){
			mapTheme.nChartSizeMin = Number(styleObj.minsize) || 0;
		}
		if ( styleObj.minchartsize ){
			mapTheme.nChartSizeMin = Number(styleObj.minchartsize) || 0;
		}
		// remains for compatibility 
		if ( styleObj.clipsize ){
			mapTheme.nChartSizeMin = Number(styleObj.clipsize) || 0;
		}
		// GR 14.01.2015 define parts to show for stacked bars 
		if ( styleObj.showparts ){
			mapTheme.szShowParts = this.toString(styleObj.showparts);
			mapTheme.szShowPartsA = this.toArray(styleObj.showparts);
		}
		// GR 15.05.2014 define MULTIGRID grid x  
		if ( styleObj.gridx ){
			mapTheme.nGridX = Number(styleObj.gridx) || 1;
		}
		// GR 28.10.2014 define AGGREGATE width  
		if ( styleObj.gridwidth ){
			if ( String(styleObj.gridwidth).match(/px/) ){
				mapTheme.nGridWidthPx = parseFloat(styleObj.gridwidth) || 50;
				map.Themes.doChangeThemeStyle(mapTheme.szId,"AUTOGRID","add");
			}
			mapTheme.nGridWidth = Number(styleObj.gridwidth) || 0;
		}
		// GR 05.11.2015 define AGGREGATE grid columns  
		if ( styleObj.gridmatrix ){
			mapTheme.nGridMatrix = Number(styleObj.gridmatrix) || 20;
			map.Themes.doChangeThemeStyle(mapTheme.szId,"AUTOGRID","add");
		}
		// GR 05.11.2015 define AGGREGATE grid columns  
		if ( styleObj.gridwidthpx ){
			mapTheme.nGridWidthPx = Number(styleObj.gridwidthpx) || 50;
			map.Themes.doChangeThemeStyle(mapTheme.szId,"AUTOGRID","add");
		}
		// GR 12.05.2015 define field for aggregation
		if ( styleObj.aggregationfield ){
			mapTheme.szAggregationField = styleObj.aggregationfield;
		}
		// GR 29.01.2009 define aggregation mode
		if ( styleObj.aggregationscale ){
			mapTheme.szAggregationFieldA = this.toArray(styleObj.aggregationscale);
		}
		// GR 211.10.2016 define ninimal aggregation count
		if ( styleObj.minaggregation ){
			mapTheme.szMinAggregation = styleObj.minaggregation;
			mapTheme.nMinAggregation = Number(styleObj.minaggregation) || 0;
		}
		// GR 11.06.2016 define user draw function
		if ( styleObj.userdraw ){
			mapTheme.userDraw = styleObj.userdraw;
		}
		// GR 26.07.2016 define the center part of a donut with center value
		if ( styleObj.centerpart ){
			mapTheme.szCenterPart = this.toString(styleObj.centerpart);
		}
	}
};

/**
 * constructs the creation strings for all map themes 
 * complement to newTheme2(...)
 * @return array of theme definition strings
 * @type array of string
 */
Map.Themes.prototype.getAllThemeDefinitionStrings = function(){
	var szDefA = new Array(0);
	for ( var i=0; i<this.themesA.length; i++ ){
		szDefA.push(this.getThemeDefinitionString(this.themesA[i]));
	}
	return szDefA;
};

// .............................................................................
// local helper 
// .............................................................................

__toRGB = function(color){
	var rr, gg, bb, hh="0123456789abcdef";
    rr=parseInt(color.substr(1,2),16);
    gg=parseInt(color.substr(3,2),16);
    bb=parseInt(color.substr(5,2),16);
	return "RGB("+rr+","+gg+","+bb+")";
};
__getSaveColor = function(color){
	try	{
		if ( color.charAt(0) == '#' ){
			return __toRGB(color);
		}
	}
	catch (e){}
	return color;
};
__getSaveColorScheme = function(colorSchemeA){
	for ( var i=0; i<colorSchemeA.length; i++){
		colorSchemeA[i] = __getSaveColor(colorSchemeA[i]);
	}
	return colorSchemeA.join('|');
};
__scanScaleValue = function(szScale){
	if ( szScale.match(/:/) ) {
		return Number(szScale.split(':')[1]);
	}else{
		return Number(szScale);
	}
};

// .............................................................................

/**
 * clean up the theme definition object 
 * simplify symbols array and remove default parameter
 * to make a smaller theme definition object
 * @parameter objTheme the theme object as source 
 * @return the cleared theme object
 * @type string
 */
Map.Themes.prototype.cleanUpThemeObj = function(themeObj){

	var style = themeObj.style;

	if ( style.symbols ){
		var first = style.symbols[0];
		for ( i in style.symbols ){
			if ( style.symbols[i] != first ){
				first = null;
				break;
			}
		}
		if ( first ){
			style.symbols.length = 1;
		}
	}
	if ( style.gridwidthpx ){
		if ( style.gridwidth ){
			style.gridwidth = null;
		}
	}
	if ( style.evidence ){
		if ( style.evidence == "isolate" ){
			style.evidence = null;
		}
	}
	if ( style.aggregation){
		style.aggregation = null;
	}
	return themeObj;
};

/**
 * constructs the creation strings of one map theme
 * complement to newTheme2(...)
 * @parameter objTheme the theme object as source 
 * @return the theme definition string
 * @type string
 */
Map.Themes.prototype.getThemeDefinitionString = function(themeObj){

	var	szTheme = "map.Api.newMapTheme"
					+"(\""+themeObj.szThemes+"\",\""+(themeObj.szFields||"")+"\",\""+(themeObj.szField100||"")+"\""
					+",\"type:"+themeObj.szFlag+";"+"colorscheme:"+__getSaveColorScheme(themeObj.origColorScheme)+";"+__maptheme_getStyleString(themeObj)+"\""
					+");";
	return szTheme;
};
/**
 * constructs the style strings of one map theme
 * @parameter szId the id of the theme
 * @return the theme style string
 * @type string
 */
Map.Themes.prototype.getMapThemeStyleString = function(szId){
	var themeObj = this.getTheme(szId) || this.activeTheme;
	if (themeObj && themeObj.colorScheme ){
		return "type:"+themeObj.szFlag+";"+"colorscheme:"+themeObj.colorScheme+";"+__maptheme_getStyleString(themeObj)+"";
	}else{
		return null;
	}
};
/**
 * constructs the creation object of one map theme
 * @parameter objTheme the theme object as source 
 * @return the theme definition object
 * @type object
 */
Map.Themes.prototype.getMapThemeDefinitionObj = function(szId){
	var themeObj = this.getTheme(szId) || this.activeTheme;
	var newObj = {};
	newObj.layer = themeObj.szThemes;
	newObj.field = themeObj.szFields||"";
	newObj.field100 = themeObj.szField100||"";

	var styleObj = { "type":themeObj.szFlag,"colorscheme":themeObj.origColorScheme };
	var sObj = __maptheme_getStyleObj(themeObj);
	for ( a in sObj ){
		styleObj[a] = sObj[a];
	}
	newObj.style = styleObj;

	return this.cleanUpThemeObj(newObj);
};

/**
 * retrieve a MapTheme object from the list 
 * @parameter szId the id of the map theme to retrieve
 */
Map.Themes.prototype.getTheme = function(szId){
	for ( var i=0; i<this.themesA.length; i++ ){
		if ( this.themesA[i].szId == szId ){
			return this.themesA[i];
		}
	}
	return this.activeTheme;
};
/**
 * returns the index of a themes in the list
 */
Map.Themes.prototype.getThemeIndex = function(szId){
	for ( var i=0; i<this.themesA.length; i++ ){
		if ( this.themesA[i].szId == szId  ){
			return i;
		}
	}
};
/**
 * refresh a MapTheme 
 * @parameter szId the id of the theme
 */
Map.Themes.prototype.refreshTheme = function(szId){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		mapTheme.fRealize = true;

		if ( !fAllIncluded ){
			if ( mapTheme.coTable ){
				this.loadExternalData(mapTheme.coTable,true,mapTheme);
				return;
			}
			else if ( fLoadExternalData ){
				var szThemesA = szThemes.split("|");
				for (var i=0; i<szThemesA.length;i++){
					this.loadExternalData(szThemesA[i],true,mapTheme);
				}
				return;
			}
		}
		executeWithMessage("map.Themes.execute()","... processing ...");
	}
};
/**
 * show next frame of a MapTheme type clip
 * @parameter szId the id of the theme
 */
Map.Themes.prototype.nextClipFrame = function(szId){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		mapTheme.realizeNextClipFrame();
	}
};
/**
 * show a specifiv frame of a MapTheme type clip
 * @parameter szId the id of the theme
 */
Map.Themes.prototype.setClipFrame = function(szId,n){
	var mapTheme = szId?(this.getTheme(szId.split(':')[0])):this.activeTheme;
	if ( mapTheme ){
		mapTheme.setClipFrame(n);
	}
};
/**
 * pause a MapTheme type clip
 * @parameter szId the id of the theme
 */
Map.Themes.prototype.pauseClip = function(szId){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		mapTheme.pauseClip();
	}
};
/**
 * restart a MapTheme type clip
 * @parameter szId the id of the theme
 */
Map.Themes.prototype.startClip = function(szId){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		mapTheme.startClip();
	}
};
/**
 * load external data via JSLoader
 * do not load if data already loaded, but reload, if fRefresh == true 
 * @parameter szData the name of the external data; either equal theme or cotable
 * @parameter fRefresh flag, whether thedata should be reloaded if already present
 */
Map.Themes.prototype.loadExternalData = function(szData,fRefresh,themeObj){

	// if not exists, create global array to preserve resolved external data script paths
	if ( !this.coTableExt ){
		this.coTableExt = [];
	}

	_TRACE("... load external data ...:"+szData);
	if ( szData ){
		var szMessage = map.Dictionary.getLocalText("... creating theme ...");
		if ( fRefresh ){
			eval(szData+".table = null");
			szMessage = map.Dictionary.getLocalText("... refreshing theme ...");
		}

		// test 2 possible data formats !!
		// old one: data_table = {} and new one: data.table = {}
		this.__test = null;
		try{
			eval("this.__test = "+szData+".table");
		}
		catch (e){
			try{
				eval("this.__test = "+szData+"_table");
			}
			catch (e){
			}
		}

		// load data if data object not found
		// ----------------------------------

		// check, if we have already loaded from this source
		//
		var fCached = themeObj.fEditor || false;
		if ( this.themeDataCacheA[szData] ){
			if ( ((!this.themeDataCacheA[szData].coTableUrl && !themeObj.coTableUrl) || (this.themeDataCacheA[szData].coTableUrl == themeObj.coTableUrl)) &&
				 ((!this.themeDataCacheA[szData].coTableExt && !themeObj.coTableExt) || (this.themeDataCacheA[szData].coTableExt == themeObj.coTableExt)) ) {
				fCached = true;
			}
		}

		// if data loaded, source equal and cache not disabled
		// 
		if ( (this.__test && fCached && !(themeObj.fDataCache == false)) ){
			_TRACE("data is already loaded, then make the theme");
			// data is already loaded, then make the theme 
			executeWithMessage('map.Themes.execute()',szMessage);

			// if there is an external data script, get the stored resolved path
			// need this for sharing URL's
			if ( themeObj && themeObj.coTableExt ){
				themeObj.coTableExt = this.coTableExt[themeObj.coTable];
			}
			return;
		}
		else{
			// if not, try to load external data

			// GR 20.10.2013 new external data loader by explicit data url 
			// -----------------------------------------------------------
			if ( themeObj && (themeObj.coTableUrl || themeObj.coTableExt) ){
				if ( 0 && (themeObj.coTableType == "jsonDB") ){
					if ( fLocalHost ){
						this.loadExternalDataUrl(szData,themeObj.coTableUrl,fRefresh,szMessage);
					}else{
						this.loadExternalDataUrlZipped(szData,themeObj.coTableUrl,fRefresh,szMessage);
					}
					return;
				}else{
					try{

						// set cached object
						this.themeDataCacheA[szData] = {"coTableUrl":themeObj.coTableUrl,"coTableExt":themeObj.coTableExt};

						this.fWaitingforData = true;
						HTMLWindow.ixmaps.htmlgui_loadExternalData(themeObj.coTableUrl,{"theme":themeObj,"type":themeObj.coTableType,"name":themeObj.coTable,"ext":themeObj.coTableExt});

						// htmlgui_loadExternalData resolves the path of the external data script to load changing .coTableExt
						// we have save this in a glabel array, for sharing URL's 
						this.coTableExt[themeObj.coTable] = themeObj.coTableExt;

						return;

					}catch(e){}
				}
			}
			// if no URL given, try to load from default path, that is the maps directory
			// --------------------------------------------------------------------------
			if ( fLocalHost ){
				this.loadExternalDataDefault(szData,fRefresh,szMessage);
			}else{
				this.loadExternalDataZipped(szData,fRefresh,szMessage);
			}
		}
	}
};
Map.Themes.prototype.loadExternalDataUrlZipped = function(szData,szUrl,fRefresh,szMessage){
	this.fWaitingforData = true;
	displayMessage(map.Dictionary.getLocalText("... loading data ..."));
	_TRACE("... loading data ...");
	var jsLoader = new JSLoader();
	jsLoader.finishedCallback = "map.Themes.loadExternalDataFinish('"+szMessage+"')"; 
	jsLoader.errorCallback = "map.Themes.loadExternalDataUrl('"+szData+"','"+szUrl+"',"+fRefresh+",'"+szMessage+"')"; 
	jsLoader.szMessage = map.Dictionary.getLocalText("... loading data ..."); 
	jsLoader.loadScript(szUrl+".gz",fRefresh);
};
Map.Themes.prototype.loadExternalDataUrl = function(szData,szUrl,fRefresh,szMessage){
	this.fWaitingforData = true;
	displayMessage(map.Dictionary.getLocalText("... loading data ..."));
	_TRACE("... loading data ...");
	var jsLoader = new JSLoader();
	jsLoader.finishedCallback = "map.Themes.loadExternalDataFinish('"+szMessage+"')"; 
	jsLoader.errorCallback = "map.Themes.loadExternalDataDefault('"+szData+"',"+fRefresh+",'"+szMessage+"')"; 
	jsLoader.szMessage = map.Dictionary.getLocalText("... loading data ..."); 
	jsLoader.loadScript(szUrl,fRefresh);
};
Map.Themes.prototype.loadExternalDataZipped = function(szData,fRefresh,szMessage){
	this.fWaitingforData = true;
	displayMessage(map.Dictionary.getLocalText("... loading data ..."));
	_TRACE("... loading data ...");
	var jsLoader = new JSLoader();
	jsLoader.finishedCallback = "map.Themes.loadExternalDataFinish('"+szMessage+"')"; 
	jsLoader.errorCallback = "map.Themes.loadExternalDataDefault('"+szData+"',"+fRefresh+",'"+szMessage+"')"; 
	jsLoader.szMessage = map.Dictionary.getLocalText("... loading data ..."); 
	jsLoader.loadScript(szData+".js.gz",fRefresh);
};
Map.Themes.prototype.loadExternalDataDefault = function(szData,fRefresh,szMessage){
	this.fWaitingforData = true;
	displayMessage(map.Dictionary.getLocalText("... loading data ..."));
	_TRACE("... loading data ...");
	var jsLoader = new JSLoader();
	jsLoader.finishedCallback = "map.Themes.loadExternalDataFinish('"+szMessage+"')"; 
	jsLoader.errorCallback = "map.Themes.loadExternalDataFinish('"+szMessage+"')"; 
//	jsLoader.errorCallback = "displayMessage('Error on loading data',1000)"; 
	jsLoader.szMessage = map.Dictionary.getLocalText("... loading data ..."); 
	jsLoader.loadScript(szData+".js",fRefresh);
};
Map.Themes.prototype.loadExternalDataFinish = function(szMessage){
	this.fWaitingforData = false;
	executeWithMessage('map.Themes.execute()',szMessage);
};
/**
 * activate a MapTheme 
 * @parameter evt the event
 * @parameter szId the id of the theme
 */
Map.Themes.prototype.activateTheme = function(evt,szId){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		mapTheme.fRedraw = true;
		executeWithMessage("map.Themes.execute()","... processing ...");
	}
	evt.stopPropagation();
    evt.preventDefault();
};
/**
 * remove a MapTheme 
 * @parameter evt the event
 * @parameter szId the id of the theme
 */
Map.Themes.prototype.removeTheme = function(evt,szId){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		if (mapTheme.szFlag.match(/CHART/)){
			mapTheme.fToggle = true;
		}
		mapTheme.fRemove = true;
		executeWithMessage("map.Themes.execute()","... processing ...");
	}
	if(evt){
		evt.stopPropagation();
		evt.preventDefault();
	}
};
/**
 * remove all map themes
 * @parameter evt the event
 */
Map.Themes.prototype.removeAll = function(evt){
	for ( var i=0; i<this.themesA.length; i++ ){
		if ( !this.themesA[i].szFlag.match(/LOCKED/) ){
			this.themesA[i].fRemove = !this.themesA[i].fRealize;
		}
	}
	executeWithMessage("map.Themes.execute()","... processing ...");
	if ( evt ){
		evt.stopPropagation();
		evt.preventDefault();
	}
};
/**
 * remove all map themes
 * @parameter evt the event
 */
Map.Themes.prototype.removeAllCharts = function(evt){
	for ( var i=0; i<this.themesA.length; i++ ){
		if (this.themesA[i].szFlag.match(/CHART/) && !this.themesA[i].szFlag.match(/LOCKED/) ){
			this.themesA[i].fRemove = !this.themesA[i].fRealize;
		}
	}
	executeWithMessage("map.Themes.execute()","... processing ...");
	if ( evt ){
		evt.stopPropagation();
		evt.preventDefault();
	}
};
/**
 * remove all map themes
 * @parameter evt the event
 */
Map.Themes.prototype.removeAllChoroplethe = function(evt){
	for ( var i=0; i<this.themesA.length; i++ ){
		if (this.themesA[i].szFlag.match(/CHOROPLETHE/) && !this.themesA[i].szFlag.match(/LOCKED/) ){
			this.themesA[i].fRemove = !this.themesA[i].fRealize;;
		}
	}
	executeWithMessage("map.Themes.execute()","... processing ...");
	if ( evt ){
		evt.stopPropagation();
		evt.preventDefault();
	}
};
/**
 * remove all map themes
 * @parameter evt the event
 */
Map.Themes.prototype.removeAllSelections = function(evt){
	for ( var i=0; i<this.themesA.length; i++ ){
		if (this.themesA[i].szFlag.match(/SELECTION/)){
			this.themesA[i].fRemove = true;
		}
	}
	executeWithMessage("map.Themes.execute()","... processing ...");
	if ( evt ){
		evt.stopPropagation();
		evt.preventDefault();
	}
};
/**
 * refresh all map theme info displays
 * @parameter evt the event
 */
Map.Themes.prototype.redrawInfoAll = function(evt){
	for ( var i=0; i<this.themesA.length; i++ ){
		this.themesA[i].fRedrawInfo = true;
	}
	executeWithMessage("map.Themes.execute()","... processing ...");
	if ( evt ){
		evt.stopPropagation();
		evt.preventDefault();
	}
};
/**
 * reformat themes display on map resize
 * @parameter evt the event
 */
Map.Themes.prototype.reformat = function(evt){

	this.minX = 0;
	this.minY = 0;

	for ( var i=0; i<this.themesA.length; i++ ){
		this.themesA[i].fRepositionInfo = true;
		this.themesA[i].fRedrawInfo = true;
	}
	executeWithMessage("map.Themes.execute()","... processing ...");
	if ( evt ){
		evt.stopPropagation();
		evt.preventDefault();
	}
};
/**
 * execute the various actions on the MapTheme, which have been programmized by flags 
 */
Map.Themes.prototype.execute = function(){
	
	_TRACE("Map.Themes.execute() =====>");

	var fDisable = false;
	var i = 0;

	if ( this.fWaitingforData ){
		return;
	}
	if ( map.Tiles.isLoading() ){
		setTimeout("map.Themes.execute()",250);
		this.fExecuteDelayed = true;
		return;
	}
	if ( this.fExecuteDelayed ){
		this.fExecuteDelayed = false;
		executeWithMessage("map.Themes.execute()"," ... ");
		return;
	}
	// disable theme widgets, if necessary
	for ( i=0; i<this.themesA.length; i++ ){
		if ( this.themesA[i].fRealize || this.themesA[i].fRedraw || this.themesA[i].fToFront ){
			if ( this.themesA[i].szFlag.match(/CHOROPLETHE/) && !this.themesA[i].szFlag.match(/SUBTHEME/)){
				fDisable = this.themesA[i].szShapeType;
				_TRACE("Disable =====>");
			}
		}
	}
	if ( fDisable && this.enableMultiChoroplethe ){
		_TRACE("do Disable =====>");
		for ( i=0; i<this.themesA.length; i++ ){
			if ( this.themesA[i].szFlag && this.themesA[i].szFlag.match(/CHOROPLETHE/) && (this.themesA[i].szShapeType == fDisable) ){
				this.themesA[i].disable();
				this.themesA[i].isVisible = false;
				// GR 31.08.2008 to avoid enable via redrawInfoAll()
				this.themesA[i].fRedrawInfo = false;
//				this.unlabelMap();
			}
		}
	}
	if ( fDisable && !this.enableMultiChoroplethe ){
		_TRACE("test Remove old choroplethe themes =====>");
		for ( i=0; i<this.themesA.length; i++ ){
			if ( this.themesA[i].szFlag && this.themesA[i].szFlag.match(/CHOROPLETHE/) && (this.themesA[i].szShapeType == fDisable) ){
				if ( !(this.themesA[i].fRealize || this.themesA[i].fRedraw || this.themesA[i].fToFront) ){
					_TRACE("do Remove old choroplethe theme" + this.themesA[i].szId + "=====>");
					this.themesA[i].fRemove = true;
				}
			}
		}
	}
	// execute projected methods
	for ( i=0; i<this.themesA.length; i++ ){
		if ( this.themesA[i].fToggle ){
	_TRACE("Toggle =====>");
			this.themesA[i].toggle();
			this.themesA[i].fToggle = false;
			this.execute();
//			setTimeout("map.Themes.execute()",100);
			break;
		}
		if ( this.themesA[i].fRemove ){
	_TRACE("Remove =====> " + this.themesA[i].szId);
			if ( (this.themesA.length > 1) && !this.themesA[i].szFlag.match(/SELECTION/) && !this.themesA[i].szFlag.match(/CHART/) ) { 
				this.activateNextPaint(this.themesA[i]);
			}
			this.themesA[i].removeElements();
			this.remove(this.themesA[i]);
			this.reformat();
			this.execute();
			break;
		}
		if ( this.themesA[i].fRealize ){
			// GR must be set to false, if not possible conflict with realize()
			this.themesA[i].fRedraw = false;
	_TRACE("Realize =====> " + this.themesA[i].szId);
			this.themesA[i].fEnableProgressBar = true;
			setTimeout("map.Themes.showProgressBar()",5000);
			this.themesA[i].fRealize = false;
			this.themesA[i].realize();
//			this.themesA[i].fRedrawInfo = true;
			continue;
		}
		if ( this.themesA[i].fRedraw ){
	_TRACE("Redraw =====> " + this.themesA[i].szId);
			if ( this.themesA[i].checkHiddenLayerState && this.themesA[i].checkHiddenLayerState() ){
				this.themesA[i].fRealize = true;
				this.themesA[i].fRedraw = false;
				this.themesA[i].fReload = false;
				this.themesA[i].unpaintMap();
				map.Themes.execute();
				continue;
			}
			this.themesA[i].fEnableProgressBar = true;
			this.themesA[i].redraw(false);
			continue;
		}
		if ( this.themesA[i].fActualize ){
	_TRACE("Actualize =====> " + this.themesA[i].szId);
			this.themesA[i].fActualize = false;
			if ( this.themesA[i].checkHiddenLayerState && this.themesA[i].checkHiddenLayerState() ){
				this.themesA[i].fRealize = true;
				this.themesA[i].fRedraw = false;
				this.themesA[i].fReload = false;
				this.themesA[i].unpaintMap();
				map.Themes.execute();
				continue;
			}
			this.themesA[i].fEnableProgressBar = true;
			this.themesA[i].redraw(false);
			continue;
		}
		if ( this.themesA[i].fToFront ){
	_TRACE("ToFront =====> " + this.themesA[i].szId);
			this.themesA[i].fEnableProgressBar = false;
			this.themesA[i].toFront();
			this.themesA[i].fToFront = false;
			continue;
		}
		if ( this.themesA[i].fResize ){
	_TRACE("Resize =====> " + this.themesA[i].szId);
			this.themesA[i].resize(this.themesA[i].fResize);
			this.themesA[i].fResize = false;
			continue;
		}
		if ( this.themesA[i].fOpacity ){
	_TRACE("Opacity =====> " + this.themesA[i].szId);
			this.themesA[i].opacity(this.themesA[i].fOpacity);
			this.themesA[i].fOpacity = false;
			continue;
		}
		if ( this.themesA[i].fBlur ){
	_TRACE("Blur =====> " + this.themesA[i].szId);
			this.themesA[i].blur(this.themesA[i].nBlur);
			this.themesA[i].fBlur = false;
			continue;
		}
		if ( this.themesA[i].fOffset ){
	_TRACE("Offset =====> " + this.themesA[i].szId);
			this.themesA[i].offset(this.themesA[i].fOffset);
			this.themesA[i].fOffset = false;
			continue;
		}
		if ( this.themesA[i].fRedrawInfo ){
	_TRACE("Redraw Info =====> " + this.themesA[i].szId);
			if ( this.themesA[i].widgetNode ){
				this.themesA[i].showInfo();
			}
			this.themesA[i].fRedrawInfo = false;
			continue;
		}
		if ( this.themesA[i].fResort ){
	_TRACE("Resort =====> " + this.themesA[i].szId);
			try{
				this.themesA[i].sortChartObjects();
			}
			catch (e){
			}
			this.themesA[i].fResort = false;
			continue;
		}
		if ( this.themesA[i].fDeclutter ){
	_TRACE("Declutter =====> " + this.themesA[i].szId);
			try{
				this.themesA[i].declutterCharts();
			}
			catch (e){
			}
			this.themesA[i].fDeclutter = false;
			continue;
		}
	}
	if ( this.executeCallback ){
		_TRACE("Callback =====> ");
		eval(this.executeCallback);
		this.executeCallback = null;
	}
	clearMessage(100);
	clearMessage(1000);
	_TRACE("Fin =====> ");
};
/**
 * continue to execute the various actions on the MapTheme, which have been programmized by flags 
 */
Map.Themes.prototype.continueExecute = function(){
	for ( var i=0; i<this.themesA.length; i++ ){
		if ( this.themesA[i].fAggregate ){
			this.themesA[i].fAggregate = false;
			this.themesA[i].realize_aggregate();
		}else
		if ( this.themesA[i].fDraw ){
			this.themesA[i].fDraw = false;
			this.themesA[i].realize_draw();
		}else
		if ( this.themesA[i].fContinue ){
			this.themesA[i].fContinue = false;
			this.themesA[i].realizeContinue(this.themesA[i].continueIndex);
		}
	}
};
/**
 * a theme reports end of realization
 */
Map.Themes.prototype.realizeDone = function(mapTheme){
	for ( var i=0; i<this.themesA.length; i++ ){
		if ( this.themesA[i].szFlag.match(/SELECTION/) ){
			this.themesA[i].fRealize = true;
		}
	}
	mapTheme.fRealizeDone = true;
	// notify HTML user about the new theme
	try{
		HTMLWindow.ixmaps.htmlgui_onDrawTheme(mapTheme.szId);
	}
	catch (e){
	}
	if ( mapTheme.szFlag.match(/TEXTONLY/) ){
		setTimeout("map.Layer.adaptLabel()",10);
	}

};
/**
 * show progress bar while drawing 
 */
Map.Themes.prototype.showProgressBar = function(){
	for ( var i=0; i<this.themesA.length; i++ ){
		if ( (this.themesA[i].fRealize || this.themesA[i].fContinue || this.themesA[i].fAggregate || this.themesA[i].fDraw) &&
			 this.themesA[i].nCount/this.themesA[i].nDoneCount > 2	 &&
			 this.themesA[i].mapSleep								 ){
			this.themesA[i].mapSleep.fShowProgressBar = true;
		}else if(this.themesA[i].fRealize || this.themesA[i].fContinue || this.themesA[i].fAggregate || this.themesA[i].fDraw){
			//this.themesA[i].mapSleep = new Map.Sleep("map.Themes.continueExecute",25,map.Dictionary.getLocalText("do selection"));
			//this.themesA[i].mapSleep.nCount = this.themesA[i].nCount;
			//this.themesA[i].mapSleep.szCancel = "map.Themes.cancelExecute()";
			setTimeout("map.Themes.showProgressBar()",1000);
		}
	}
};

/**
 * remove one MapTheme object from the list 
 * @parameter mapTheme the map theme object, to remove
 */
Map.Themes.prototype.remove = function(mapTheme){
	if ( mapTheme == this.activeTheme ){
		this.activeTheme = null;
	}
	if ( mapTheme == this.activeBuffer ){
		this.activeBuffer = null;
	}
	for ( var i=0; i<this.themesA.length; i++ ){
		if ( this.themesA[i] == mapTheme ){
			for ( ;i<this.themesA.length-1; i++ ){
				this.themesA[i] = this.themesA[i+1];
			}
			this.themesA.length--;
		}
	}
};
/**
 * cancel execution of map themes
 */
Map.Themes.prototype.cancelExecute = function(){
	this.activeTheme.fCancel = true;
};
/**
 * play a sequence of map themes
 */
Map.Themes.prototype.sequence = function(){
	this.sequenceNr = 0;
	this.sequenceNext();
};
/**
 * activate the next theme in sequence
 */
Map.Themes.prototype.sequenceNext = function(){
	if ( this.sequenceNr < this.themesA.length ){
		this.themesA[this.sequenceNr].fRedraw = true;
		map.Themes.executeCallback = "setTimeout('map.Themes.sequenceNext()',500)";
		map.Themes.execute();
		this.sequenceNr++;
	}
};
/**
 * activate the next theme in sequence
 */
Map.Themes.prototype.activateNextPaint = function(mapTheme){
	var iStart = this.getThemeIndex(mapTheme.szId);
	for ( var i = iStart-1; i!=iStart; i-- ){
		if ( i<0 ){
			i = this.themesA.length-1;
		}
		if ( i==iStart ){
			return false;
		}
		if ( this.themesA[i].isChecked && !this.themesA[i].szFlag.match(/CHART/) ){
			this.themesA[i].fRedraw = true;
			this.themesA[i].fRedrawInfo = false;
			return true;
		}
	}
	return false;
};
/**
 * change the value display of all themes
 * @param evt the event
 * @param fFlag the change flag 
 */
Map.Themes.prototype.toggleThemeValues = function(evt,fFlag){
	// this.allwaysShowValues = !this.activeTheme.szFlag.match(/VALUES/);
	this.toggleValueDisplay(evt,this.activeTheme.szId,!this.activeTheme.szFlag.match(/VALUES/));
	/** all othes themes; not active; deactivated
	for ( var i=0; i<this.themesA.length; i++ ){
		this.toggleValueDisplay(evt,this.themesA[i].szId,fFlag);
	}
	**/
};
/**
 * change the legend display of all themes
 * @param evt the event
 * @param fFlag the change flag 
 */
Map.Themes.prototype.toggleThemeLegends = function(evt,fFlag){
	SVGThemeGroup.style.setProperty("display",fFlag?"inline":"none","");
};
/**
 * minimize the legend display of all themes
 * @param evt the event
 */
Map.Themes.prototype.minimizeThemeLegends = function(evt){
	this.fMinimizedLegends = true;
	for ( var i=0; i<this.themesA.length; i++ ){
		this.minimizeInfo(evt,this.themesA[i].szId);
	}
};
/**
 * change the size of all chart objects
 * @param evt the event
 * @param nDelta the scaling factor 
 */
Map.Themes.prototype.changeAllChartScaling = function(evt,nDelta){
	for ( var i=0; i<this.themesA.length; i++ ){
		this.themesA[i].fResize = 999;
		executeWithMessage("map.Themes.execute()","... processing ...");
	}
	evt.stopPropagation();
    evt.preventDefault();
};
/**
 * change the size of the chart objects
 * @param evt the event
 * @param szId the id of the chart group 
 * @param nDelta the scaling factor 
 */
Map.Themes.prototype.changeChartScaling = function(evt,szId,nDelta){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		mapTheme.fResize = nDelta;
		executeWithMessage("map.Themes.execute()","... processing ...");
	}
	evt.stopPropagation();
    evt.preventDefault();
};
/**
 * change the opacity of the chart objects
 * @param evt the event
 * @param szId the id of the chart group 
 * @param nDelta the opacity factor 
 */
Map.Themes.prototype.changeChartOpacity = function(evt,szId,nDelta){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		mapTheme.fOpacity = nDelta;
		executeWithMessage("map.Themes.execute()","... processing ...");
	}
	evt.stopPropagation();
    evt.preventDefault();
};
/**
 * change the position of the chart objects
 * @param evt the event
 * @param szId the id of the chart group 
 * @param szLeadId the id of the lead chart (who's position has been changed) 
 */
Map.Themes.prototype.changeChartOffset = function(evt,szId,szLeadId){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		if ( mapTheme.leadOffset ){
			var leadObj = SVGDocument.getElementById(szLeadId);
			if ( leadObj ){
				leadObj.fu = new Methods(leadObj);
				var newLeadOffset = leadObj.fu.getPosition();
				var newLeadScale  = leadObj.fu.getGroupScale();
				mapTheme.fOffset = new point(newLeadOffset.x-mapTheme.leadOffset.x,newLeadOffset.y-mapTheme.leadOffset.y);
				leadObj.fu.setPosition(mapTheme.leadOffset.x,mapTheme.leadOffset.y);
				mapTheme.fOffset.x /= map.Zoom.nZoom/newLeadScale.x;
				mapTheme.fOffset.y /= map.Zoom.nZoom/newLeadScale.y;
				mapTheme.offset(mapTheme.fOffset);
				mapTheme.fOffset = false;
				mapTheme.leadOffset = false;
		//		executeWithMessage("map.Themes.execute()","... processing ...");
			}
		}
	}
};
/**
 * get the actual chart offset of the lead chart, the chart which has been moved
 * @param evt the event
 * @param szId the id of the chart group 
 * @param szLeadId the id of the lead chart (who's position has been changed) 
 */
Map.Themes.prototype.tellChartOffset = function(evt,szId,szLeadId){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme && !mapTheme.leadOffset && this.enableChartOffset ){
		var leadObj = SVGDocument.getElementById(szLeadId);
		if ( leadObj ){
			leadObj.fu = new Methods(leadObj);
			mapTheme.leadOffset = leadObj.fu.getPosition();
			_TRACE("Map.Themes.tellChartOffset((): "+mapTheme.leadOffset.x+','+mapTheme.leadOffset.y);
		}
	}
};
/**
 * called on the begining of moving the lead object
 * @param evt the event
 * @param szId the id of the chart group 
 * @param szLeadId the id of the lead chart (who's position has been changed) 
 */
Map.Themes.prototype.initChartOffset = function(evt,szId,szLeadId){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		var leadObj = SVGDocument.getElementById(szLeadId);
		if ( leadObj ){
			if ( !leadObj.origPosition ){
				leadObj.origPosition = leadObj.fu.getPosition();
			}
			leadObj.onMouseMove = function(evt){
				leadObj.actualPosition = leadObj.fu.getPosition();
				map.Themes.makeChartOffsetPointer(leadObj);
				};
			leadObj.widgetObj = new Widget(leadObj,leadObj);
		}
	}
};
/**
 * called at the end of the moving of the lead object
 * @param evt the event
 * @param szId the id of the chart group 
 * @param szLeadId the id of the lead chart (who's position has been changed) 
 */
Map.Themes.prototype.endChartOffset = function(evt,szId,szLeadId){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		var leadObj = SVGDocument.getElementById(szLeadId);
		if ( leadObj ){
			leadObj.widgetObj.remove();
		}
	}
};

/**
 * create the pointing edge from offset to position
 */
Map.Themes.prototype.makeChartOffsetPointer = function(node){

	var newPath = null;

	if ( node.pointerObj ){
		map.Dom.clearGroup(node.pointerObj);
		map.Dom.clearGroup(node.pointShObj);
	}
	else{
		node.pointerObj = map.Dom.newGroup(node);
		node.pointShObj = map.Dom.newGroup(node);
		node.pointerObj.parentNode.insertBefore(node.pointerObj,node.pointerObj.parentNode.firstChild);
		node.pointShObj.parentNode.insertBefore(node.pointShObj,node.pointShObj.parentNode.firstChild);
	}

	if ( !node.origPosition && !node.actualPosition ){
		return;
	}

	var xPos = 0;
	var yPos = 0;
	var bBox = new box(0,0,100,75);
	var ptOffset = new point(node.actualPosition.x-node.origPosition.x,node.actualPosition.y-node.origPosition.y);

	var pWidth  = map.Scale.normalX(15);
	var pHeight = map.Scale.normalX(5);
	var pSize   = map.Scale.normalX(10);
	var pXoff   = map.Scale.normalX(5);

	pHeight = ptOffset.y+bBox.height/2;
	pWidth  = ptOffset.x+bBox.width/2;

	if ( (Math.abs(pHeight)+bBox.width/2-bBox.height/2 > Math.abs(pWidth))  ){
		if ( bBox.width/3 > pSize ){
			if ( ptOffset.x > -bBox.width/3 ){
				pWidth -= bBox.width/3;
			}
			if ( ptOffset.x < -bBox.width/3*2 ){
				pWidth += bBox.width/3;
			}
		}
		if ( pHeight > 0 ){
			newPath = map.Dom.newShape('path',node.pointShObj,'M'+(-ptOffset.x)+','+(-ptOffset.y)+' l '+(pWidth-map.Scale.normalX(5))+','+(ptOffset.y+map.Scale.normalX(1))+' '+map.Scale.normalX(4)+',0 z','fill:black;fill-opacity:0.5');
			newPath = map.Dom.newShape('path',node.pointerObj,'M'+(-ptOffset.x)+','+(-ptOffset.y)+' l '+(pWidth-map.Scale.normalX(5))+','+(ptOffset.y+map.Scale.normalX(1))+' '+map.Scale.normalX(3)+',0 z','fill:red');
		}
		else{
			newPath = map.Dom.newShape('path',node.pointShObj,'M'+(-ptOffset.x)+','+(-ptOffset.y)+' l '+(pWidth-map.Scale.normalX(4))+','+(ptOffset.y+bBox.height)+' '+map.Scale.normalX(4)+',0 z','fill:black;fill-opacity:0.5');
			newPath = map.Dom.newShape('path',node.pointerObj,'M'+(-ptOffset.x)+','+(-ptOffset.y)+' l '+(pWidth-map.Scale.normalX(4))+','+(ptOffset.y+bBox.height)+' '+map.Scale.normalX(3)+',0 z','fill:red');
		}
	}
	else {
		if ( bBox.height/5 > pSize ){
			if ( ptOffset.y > -bBox.height/3 ){
				pHeight -= bBox.height/3;
			}
			if ( ptOffset.y < -bBox.height/3*2 ){
				pHeight += bBox.height/3;
			}
		}
		if ( pWidth > 0 ){
			newPath = map.Dom.newShape('path',node.pointShObj,'M'+(-ptOffset.x)+','+(-ptOffset.y)+' l '+(ptOffset.x-bBox.width)+','+(pHeight-map.Scale.normalX(4))+' 0,'+map.Scale.normalX(4)+' z','fill:black;fill-opacity:0.5');
			newPath = map.Dom.newShape('path',node.pointerObj,'M'+(-ptOffset.x)+','+(-ptOffset.y)+' l '+(ptOffset.x-bBox.width)+','+(pHeight-map.Scale.normalX(4))+' 0,'+map.Scale.normalX(3)+' z','fill:red');
		}
	else{
			newPath = map.Dom.newShape('path',node.pointShObj,'M'+(-ptOffset.x)+','+(-ptOffset.y)+' l '+(ptOffset.x+bBox.width)+','+(pHeight-map.Scale.normalX(4))+' 0,'+map.Scale.normalX(4)+' z','fill:black;fill-opacity:0.5');
			newPath = map.Dom.newShape('path',node.pointerObj,'M'+(-ptOffset.x)+','+(-ptOffset.y)+' l '+(ptOffset.x+bBox.width)+','+(pHeight-map.Scale.normalX(4))+' 0,'+map.Scale.normalX(3)+' z','fill:red');
		}
	}
};

/**
 * align charts which are visible to the highest y position
 * and make a pointer to the original position 
 * @type void
 */
MapTheme.prototype.declutterCharts = function(){

	// GR 11.11.2016 new: avoid overlapping charts and align on same y position
	// ------------------------------------------------------------------------

	var nodesA = this.chartGroup.childNodes;

	// remove old declutter position changes
	// -------------------------------------
	for ( i=0; i<nodesA.length; i++ ){
		if ( nodesA[i].actualPosition ){
			nodesA[i].fu.setPosition(nodesA[i].origPosition.x,nodesA[i].origPosition.y);
			nodesA[i].origPosition = null;
			nodesA[i].actualPosition = null;
			if ( nodesA[i].pointerObj ){
				map.Dom.clearGroup(nodesA[i].pointerObj);
				map.Dom.clearGroup(nodesA[i].pointShObj);
			}
			nodesA[i].pointerObj = null;
			nodesA[i].pointShObj = null;
		}
	}

	// strart decluttering
	// ---------------------------
	if ( !nodesA[0].actualPosition ){

		// get the box of one chart for the aligning offset
		var chartBox = nodesA[0].fu.getBox();

		// get actual visible map bounds 
		var zoomBox = map.Zoom.getBox();

		// collect all visible charts
		var chartDeclutterA = [];

		for ( var i=0; i<nodesA.length; i++ ){

			var fDone = false;

			var pos = nodesA[i].fu.getPosition();
			var box = nodesA[i].fu.getBox();
			box.x += pos.x;
			box.y += pos.y;

			for ( var g in chartDeclutterA ){
				for ( var c in chartDeclutterA[g] ){
					if ( box.y+box.height < chartDeclutterA[g][c].box.y-chartDeclutterA[g][c].box.height*0.3   ||
						 box.y			  > chartDeclutterA[g][c].box.y+chartDeclutterA[g][c].box.height*1.3   ||
						 box.x+box.width  < chartDeclutterA[g][c].box.x-chartDeclutterA[g][c].box.width		   ||
						 box.x			  > chartDeclutterA[g][c].box.x+chartDeclutterA[g][c].box.width*2      ){
						continue;
					}else{
						chartDeclutterA[g].push({node:nodesA[i],y:nodesA[i].fu.getPosition().x,box:box});
						fDone = true;
						break;
					}
				}
			}

			if ( !fDone ){
				chartDeclutterA.push([{node:nodesA[i],y:nodesA[i].fu.getPosition().x,box:box}]);
			}

		}

		// loop over declutter groups
		for ( var g=0; g<chartDeclutterA.length; g++ ){

			var chartXPosA = chartDeclutterA[g];
			chartXPosA.sort(this.sortUpChartObjectsCompare);

			// if we have more than one chart in the group
			// then we align the charts on the highest position 

			if ( chartXPosA.length > 1 ){

				var posTop = chartXPosA[0].node.fu.getPosition();

				for ( var i=0; i<chartXPosA.length; i++ ){
					var pos = chartXPosA[i].node.fu.getPosition();
					if ( pos.y < posTop.y ) {
						posTop.x = pos.x;
						posTop.y = pos.y;
					}
				}
				posTop.y -= map.Scale.normalX(50)*map.Scale.nZoomScale;

				var pos = chartXPosA[0].node.fu.getPosition();

				for ( var i=0; i<chartXPosA.length; i++ ){

					chartXPosA[i].node.origPosition =  chartXPosA[i].node.fu.getPosition();
					chartXPosA[i].node.fu.setPosition(pos.x+(chartBox.width*1.2*i),posTop.y);
					chartXPosA[i].node.actualPosition = new point(pos.x+(chartBox.width*1.2*i),posTop.y);

					scale = chartXPosA[i].node.fu.getScale().x;
					chartXPosA[i].node.actualPosition.x = chartXPosA[i].node.origPosition.x - (chartXPosA[i].node.origPosition.x-chartXPosA[i].node.actualPosition.x)/scale;
					chartXPosA[i].node.actualPosition.y = chartXPosA[i].node.origPosition.y - (chartXPosA[i].node.origPosition.y-chartXPosA[i].node.actualPosition.y)/scale;
					map.Themes.makeChartOffsetPointer(chartXPosA[i].node);
				}
			}
		}
	}
};

/**
 * change the visibility of the chart text values
 * @param evt the event
 * @param szId the id of the chart group 
 * @param fFlag true or false 
 */
Map.Themes.prototype.setChartSizeType = function(evt,szId,szSizeType){

	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		var szNewStyle = "";
		var szStyle = mapTheme.szFlag;
		var szStyleA = szStyle.split('|');
		for ( var i=0; i<szStyleA.length; i++){
			if ( !(szStyleA[i] == "SIZE") && 
				 !(szStyleA[i] == "FIXSIZE") && 
				 !(szStyleA[i] == "NOSIZE") && 
				 !(szStyleA[i] == "HEIGHT") && 
				 !((szStyleA[i] == "3D") && (szSizeType == "2D"))
				){
				szNewStyle += (szNewStyle.length?"|":"") + szStyleA[i];
			}
		}
		szNewStyle += "|"+szSizeType;
		executeWithMessage("map.Themes.doChangeThemeStyle('"+mapTheme.szId+"','type:"+szNewStyle+"')","... processing ...");
	}
	evt.stopPropagation();
    evt.preventDefault();
};
/**
 * change the visibility of the chart text values
 * @param evt the event
 * @param szId the id of the chart group 
 * @param fFlag true or false 
 */
Map.Themes.prototype.toggleValueDisplay = function(evt,szId,fFlag){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		var szNewStyle = "";
		var szStyle = mapTheme.szFlag;
		var szStyleA = szStyle.split('|');
		for ( var i=0; i<szStyleA.length; i++){
			if ( szStyleA[i] != "VALUES" ){
				szNewStyle += (szNewStyle.length?"|":"") + szStyleA[i];
			}
		}
		if (fFlag){
			szNewStyle += "|VALUES";
		}
		executeWithMessage("map.Themes.doChangeThemeStyle('"+mapTheme.szId+"','type:"+szNewStyle+"')","... processing ...");
	}
	if ( evt ){
		evt.stopPropagation();
		evt.preventDefault();
	}
};
/**
 * change the dynamic opacity feature
 * @param evt the event
 * @param szId the id of the chart group 
 * @param fFlag true or false 
 */
Map.Themes.prototype.toggleDopacity = function(evt,szId,fFlag){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		var szNewStyle = "";
		var szStyle = mapTheme.szFlag;
		var szStyleA = szStyle.split('|');
		for ( var i=0; i<szStyleA.length; i++){
			if ( !szStyleA[i].match(/DOPACITY/) ){
				szNewStyle += (szNewStyle.length?"|":"") + szStyleA[i];
			}
		}
		if (fFlag){
			szNewStyle += "|DOPACITYMAX";
		}
		executeWithMessage("map.Themes.doChangeThemeStyle('"+mapTheme.szId+"','type:"+szNewStyle+"')","... processing ...");
	}
	if ( evt ){
		evt.stopPropagation();
		evt.preventDefault();
	}
};
/**
 * change the dynamic opacity feature alpha ramp
 * @param evt the event
 * @param szId the id of the chart group 
 * @param fFlag true or false 
 */
Map.Themes.prototype.changeDopacityAlphaRamp = function(evt,szId,nFactor){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		var szNewStyle = mapTheme.szFlag;
		mapTheme.nDopacityScale = mapTheme.nDopacityScale || 1;
		mapTheme.nDopacityScale *= nFactor;
		//mapTheme.nDopacityScale = Math.max(mapTheme.nDopacityScale,1);

		
		executeWithMessage("map.Themes.doChangeThemeStyle('"+mapTheme.szId+"','type:"+szNewStyle+"')","... processing ...");
	}
	if ( evt ){
		evt.stopPropagation();
		evt.preventDefault();
	}
};

/**
 * change the visibility of the chart objects
 * @param evt the event
 * @param szId the id of the chart group 
 * @param fFlag true or false 
 */
Map.Themes.prototype.toggleChartDisplay = function(evt,szId,fFlag){

	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		mapTheme.fToggle = true;
		executeWithMessage("map.Themes.execute()","... processing ...");
	}
	evt.stopPropagation();
    evt.preventDefault();
};

/**
 * zoom to the shapes of a selected class (chloroplete only)
 * @param evt the event
 * @param szId the id of the chart group 
 * @param szClass the class number
 */
Map.Themes.prototype.zoomToClass = function(evt,szId,szClass,szStep){
	setTimeout("map.Themes.doZoomToClass('"+szId+"','"+szClass+"','"+szStep+"')",100);
};
/**
 * mark the shapes of a selected class (chloroplete only)
 * @param evt the event
 * @param szId the id of the chart group 
 * @param szClass the class number
 */
Map.Themes.prototype.markClass = function(evt,szId,szClass,szStep){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme && mapTheme.isVisible && !mapTheme.showInfoMore){

		// GR 22.05.2015 toggle 
		if ( (typeof(mapTheme.markedClass) != "undefined") && (mapTheme.markedClass == szClass) ){
			this.unmarkClass(evt,szId);
			return;
		}
		mapTheme.markedClass = szClass;

		mapTheme.fMarkEnable = true;
		mapTheme.fUnmarkEnable = false;
		if ( this.markTimeout ){
			clearTimeout(this.markTimeout);
		}
		if ( this.unmarkTimeout ){
			clearTimeout(this.unmarkTimeout);
		}
		displayMessage("...",1000,true);
		this.markTimeout = setTimeout("map.Themes.doMarkClass('"+szId+"','"+szClass+"','"+szStep+"')",500);
	}
};
/**
 * unmark the shapes of a selected class
 * @param evt the event
 * @param szId the id of the chart group 
 */
Map.Themes.prototype.unmarkClass = function(evt,szId){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme && mapTheme.isVisible && !mapTheme.showInfoMore){
		mapTheme.markedClass = null;
		displayMessage("...",1000,true);
		this.unmarkTimeout = setTimeout("map.Themes.doUnmarkClass('"+szId+"')",500);
		mapTheme.fUnmarkEnable = true;
		mapTheme.fMarkEnable = false;
	}
};
/**
 * zoom to the shapes of a selected class (chloroplete only)
 * @param szId the id of the chart group 
 * @param szClass the class number
 */
Map.Themes.prototype.doZoomToClass = function(szId,szClass,szStep){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		mapTheme.zoomToClass(Number(szClass),Number(szStep));
	}
};
/**
 * mark the shapes of a selected class (chloroplete only)
 * @param szId the id of the chart group 
 * @param szClass the class number
 */
Map.Themes.prototype.doMarkClass = function(szId,szClass,szStep){
	if ( 0 &&  this.subTheme ){
		return;
	}
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		mapTheme.markClass(Number(szClass),Number(szStep));
		// notify HTML user about the new theme
		try{
			HTMLWindow.ixmaps.htmlgui_onDrawTheme(mapTheme.szId);
		}
		catch (e){
		}
	}
};
/**
 * unmark the shapes of a selected class
 * @param szId the id of the chart group 
 */
Map.Themes.prototype.doUnmarkClass = function(szId){
	if ( this.subTheme ){
		this.subTheme.removeSubTheme();
		this.subTheme = null;
		return;
	}
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		mapTheme.unmarkClass();
		// notify HTML user about the new theme
		try{
			HTMLWindow.ixmaps.htmlgui_onDrawTheme(mapTheme.szId);
		}
		catch (e){
		}
	}
};
/**
 * hide the shapes of a selected class (chloroplete only)
 * @param evt the event
 * @param szId the id of the chart group 
 * @param szClass the class number
 */
Map.Themes.prototype.hideClass = function(evt,szId,szClass,szStep){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme && mapTheme.isVisible ){
		mapTheme.showClass(Number(szClass),Number(szStep),false);
	}
};
/**
 * show the shapes of a selected class (chloroplete only)
 * @param evt the event
 * @param szId the id of the chart group 
 * @param szClass the class number
 */
Map.Themes.prototype.showClass = function(evt,szId,szClass,szStep){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme && mapTheme.isVisible ){
		mapTheme.showClass(Number(szClass),Number(szStep),true);
	}
};
/**
 * filter the items of a theme
 * @param evt the event
 * @param szId the id of the theme 
 * @param szFilter the filter string
 * @param mode the filer mode (tbd)
 */
Map.Themes.prototype.filterItems = function(evt,szId,szFilter,opt){
	var mapTheme = szId?this.getTheme(szId.split(':')[0]):this.activeTheme;
	if ( mapTheme && mapTheme.isVisible && !mapTheme.showInfoMore){
		mapTheme.fMarkEnable = true;
		mapTheme.fUnmarkEnable = false;
		if ( this.markTimeout ){
			clearTimeout(this.markTimeout);
		}
		if ( this.unmarkTimeout ){
			clearTimeout(this.unmarkTimeout);
		}
		this.opt = opt;
		this.markTimeout = setTimeout("map.Themes.doFilterItems('"+szId+"','"+szFilter+"')",500);
	}
};
/**
 * filter the items of a theme
 * @param szId the id of the theme 
 * @param szFilter the filter string
 * @param mode the filer mode (tbd)
 */
Map.Themes.prototype.doFilterItems = function(szId,szFilter){
	executeWithMessage("map.Themes.doFilterItemsGo('"+szId+"','"+szFilter+"')","applying filter ...");
};
/**
 * filter the items of a theme
 * @param szId the id of the theme 
 * @param szFilter the filter string
 * @param mode the filer mode (tbd)
 */
Map.Themes.prototype.doFilterItemsGo = function(szId,szFilter){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		mapTheme.filterItems(szFilter,this.opt);
		this.activeTheme = mapTheme;
	}
};

/**
 * select the filtered items
 * @param evt the event
 * @param szId the id of the theme 
 */
Map.Themes.prototype.selectFilterItems = function(evt,szId){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		mapTheme.selectFilterItems();
	}
};


/**
 * display popup to change the type of the chart 
 * @param evt the event
 * @param szId the id of the chart group 
 * @param szDisplayId the id of the info display (parent of the menu popup)
 */
Map.Themes.prototype.chartTypeMenu = function(evt,szId,szDisplayId,szOrigType){

	var mapTheme = (szId?(this.getTheme(szId.split(':')[0])):map.Themes.activeTheme);
	if ( mapTheme ){
		if ( mapTheme.szFlag.match(/CHART/)){
			mapTheme.chartMenu(szDisplayId,szOrigType,"chart");
		}
		else{
			mapTheme.chartMenu(szDisplayId,szOrigType,"chart");
		}
	}
};
/**
 * display popup to change the type of the chart 
 * @param evt the event
 * @param szId the id of the chart group 
 * @param szDisplayId the id of the info display (parent of the menu popup)
 */
Map.Themes.prototype.chartColorMenu = function(evt,szId,szDisplayId,szOrigType){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		mapTheme.chartMenu(szDisplayId,szOrigType,"variation");
	}
};
/**
 * toggle info display (more)
 * @param evt the event
 * @param szId the id of the chart group 
 */
Map.Themes.prototype.toggleMore = function(evt,szId){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		mapTheme.showInfoMore = !mapTheme.showInfoMore;
		mapTheme.unmarkClass();
		mapTheme.fRedrawInfo = true;
		// if widegt (info) has not been moved, reposition it
		if ( mapTheme.ptWidget && (mapTheme.ptWidget.x == mapTheme.widgetNode.fu.getPosition().x ) ){
			mapTheme.fRepositionInfo = true;
		}
		map.Themes.execute();
//		setTimeout("map.Themes.autoPositionInfo(null,'"+szId+"')",100);
	}
};
/**
 * exit info display (more)
 * @param evt the event
 * @param szId the id of the chart group 
 */
Map.Themes.prototype.exitMore = function(evt,szId){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		mapTheme.showInfoMore = false;
		mapTheme.unmarkClass();
		mapTheme.fRedrawInfo = true;
		// if widegt (info) has not been moved, reposition it
		if ( mapTheme.ptWidget && (mapTheme.ptWidget.x == mapTheme.widgetNode.fu.getPosition().x ) ){
			mapTheme.fRepositionInfo = true;
		}
		map.Themes.execute();
	}
};
/**
 * onclick info display (more)
 * @param evt the event
 * @param szId the id of the chart group 
 */
Map.Themes.prototype.onclickInfo = function(evt,szId){
	var szTargetId = evt.target.getAttributeNS(null,"id");
	if ( !szTargetId || !szTargetId.match(/background/) ){
		return;
	}
	var buttonGroup = SVGDocument.getElementById(szId+':display:widget:infobuttons');
	var oldStyle = buttonGroup.style.getPropertyValue('display');
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( oldStyle == "none" ){
		buttonGroup.style.setProperty('display','inline','');
		this.fMinimized = mapTheme.szFlag.match(/MINIMIZED/);
		this.maximizeInfo(null,szId);
		this.resizeInfo(null,szId);
	}else{
		SVGDocument.getElementById(szId+':display:widget:infobuttons').style.setProperty('display','none','');
		if ( this.fMinimized ){
			this.fMinimized = null;
			this.minimizeInfo(null,szId);
		}
		this.exitMore(null,szId);
	}
};
/**
 * onout info display (more)
 * @param evt the event
 * @param szId the id of the chart group 
 */
Map.Themes.prototype.onoverInfo = function(evt,szId){
	this.onInfoOverTimeout = setTimeout("map.Themes.doOnoverInfo(null,'"+szId+"')",400);
	if ( this.onInfoOutTimeout ){
		clearTimeout(this.onInfoOutTimeout);
	}
};
/**
 * onover info display (more)
 * @param evt the event
 * @param szId the id of the chart group 
 */
Map.Themes.prototype.doOnoverInfo = function(evt,szId){
	var buttonGroup = SVGDocument.getElementById(szId+':display:widget:infobuttons');
	var oldStyle = buttonGroup.style.getPropertyValue('display');
	buttonGroup.style.setProperty('display','inline','');
	if ( oldStyle == "none" ){
		this.resizeInfo(null,szId);
	}
};
/**
 * onclick info display (more)
 * @param evt the event
 * @param szId the id of the chart group 
 */
Map.Themes.prototype.ondownInfo = function(evt,szId){
	if ( this.onInfoOverTimeout ){
		clearTimeout(this.onInfoOverTimeout);
	}
	if ( this.onInfoOutTimeout ){
		clearTimeout(this.onInfoOutTimeout);
	}
};

/**
 * onout info display (more)
 * @param evt the event
 * @param szId the id of the chart group 
 */
Map.Themes.prototype.onoutInfo = function(evt,szId){
	this.onInfoOutTimeout = setTimeout("map.Themes.doOnoutInfo(null,'"+szId+"')",400);
	if ( this.onInfoOverTimeout ){
		clearTimeout(this.onInfoOverTimeout);
	}
};
/**
 * exec onout info display (more)
 * @param evt the event
 * @param szId the id of the chart group 
 */
Map.Themes.prototype.doOnoutInfo = function(evt,szId){
	try{
		SVGDocument.getElementById(szId+':display:widget:infobuttons').style.setProperty('display','none','');
		this.exitMore(null,szId);
	}catch (e){}
};
/**
 * exec onout info display (more)
 * @param evt the event
 * @param szId the id of the chart group 
 */
Map.Themes.prototype.resizeInfo = function(evt,szId){
		
	var szDisplayId = szId + ":display:widget";
	var bgRect = SVGDocument.getElementById(szDisplayId+":backgroundrect:noobject");
	var shRect = SVGDocument.getElementById(szDisplayId+":shadowrect:noobject");
	var displayGroup = bgRect.parentNode;

	var nTopMargin      = 5;
	var nLeftMargin     = 5;
	var nRightMargin    = 2;
	var nBottomMargin   = 0;

	var textBox = map.Dom.getBox(displayGroup);

	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme.removebutton ){
		mapTheme.removebutton.setPosition(textBox.width-map.Scale.normalX(2),map.Scale.normalY(7));
	}
	if ( mapTheme.maximizebutton ){
		mapTheme.maximizebutton.setPosition(textBox.width-map.Scale.normalX(map.Scale.nButtonSize+5),map.Scale.normalY(7));
	}
	if ( mapTheme.minimizebutton ){
		mapTheme.minimizebutton.setPosition(textBox.width-map.Scale.normalX(map.Scale.nButtonSize+5),map.Scale.normalY(7));
	}
	if ( mapTheme.chartbutton ){
		mapTheme.chartbutton.setPosition(textBox.width-map.Scale.normalX(2),mapTheme.chartbutton.getPosition().y);
	}
	if ( mapTheme.morebutton ){
		mapTheme.morebutton.setPosition(textBox.width-map.Scale.normalX(2),mapTheme.morebutton.getPosition().y-map.Scale.normalY(map.Scale.nButtonSize*0.2));
	}

	var textBox = map.Dom.getBox(displayGroup);
	// textBox.width += map.Scale.normalX(5);

	// resize info display	
	bgRect.setAttributeNS(null,"x",-map.Scale.normalX(nLeftMargin));
	bgRect.setAttributeNS(null,"y",-map.Scale.normalY(nTopMargin));
	bgRect.setAttributeNS(null,"width",textBox.width+map.Scale.normalX(nLeftMargin)+map.Scale.normalX(nRightMargin));
	bgRect.setAttributeNS(null,"height",textBox.height+map.Scale.normalY(nTopMargin)+map.Scale.normalY(nBottomMargin));
	// shadow	
	shRect.setAttributeNS(null,"x",-map.Scale.normalX(nLeftMargin-8));
	shRect.setAttributeNS(null,"y",-map.Scale.normalY(nTopMargin-8));
	shRect.setAttributeNS(null,"width",textBox.width+map.Scale.normalX(nLeftMargin)+map.Scale.normalX(nRightMargin-5));
	shRect.setAttributeNS(null,"height",textBox.height+map.Scale.normalY(nTopMargin)+map.Scale.normalY(nBottomMargin-5));
};

/**
 * make info visible 100% 
 * @param evt the event
 * @param szId the id of the chart group 
 */
Map.Themes.prototype.autoPositionInfo = function(evt,szId){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){ 
		var ptPosition = mapTheme.widgetNode.fu.getPosition();
		var newPosition = map.Scale.clipWidgetObjectToSVG(mapTheme.widgetNode,ptPosition,new point(0,0),null);
		mapTheme.widgetNode.fu.setPosition(newPosition.x,newPosition.y);
	}
};
/**
 * change the style of the theme given by szId 
 * @param szId the id of the chart group 
 * @param szStyle the new style
 */
Map.Themes.prototype.changeThemeStyle = function(evt,szId,szStyle,szFlag){
	_TRACE("changeThemeStyle"+": '"+szId+"' , '"+szStyle+"' , '"+szFlag+"'");
	executeWithMessage("map.Themes.doChangeThemeStyle('"+szId+"','"+szStyle+"','"+szFlag+"')","... processing ...");
	if (evt){
		evt.stopPropagation();
		evt.preventDefault();
	}
};

// .............................................................................
// local helper 
// .............................................................................

function __calcNewValue(value,number,szFlag){
	value = value||1;
	number = number||1;
	if ( szFlag && szFlag.match(/pow/) ){
		return Math.pow(value,number);
	}else
	if ( szFlag && szFlag.match(/factor/) ){
		return value*number;
	}else
	if ( szFlag && (szFlag.match(/add/) || szFlag.match(/delta/)) ){
		return value+number;
	}else{
		return number;
	}
}
function __calcFactor(value,number,szFlag){
	value = value||1;
	number = number||1;
	if ( szFlag && szFlag.match(/factor/) ){
		return number;
	}else
	if ( szFlag && szFlag.match(/add/) ){
		return (value+number)/value;
	}else{
		return number/value;
	}
}

// .............................................................................

/**
 * change the style of the theme given by szId (wrapper)
 * @param szId the id of the chart group 
 * @param szStyle the new style
 * The following styles can be changed/set:
 * <br><br>
 *  <table>
 *  <tr><td>type</td><td>change the theme/chart type</td><td>CHOROPLETHE,QUANTILE,BUBBLE,etc. see create chart for complete list</td></tr>
 *  <tr><td>classes</td><td>change the number of classes for choroplethe themes</td><td>1 - 50</td></tr>
 *  <tr><td>colorscheme</td><td>define a new colorscheme</td><td>e.g. 'colorscheme:#eeeeff,#0000dd'</td></tr>
 *  <tr><td>colorstyle</td><td>define color scheme derivations for 'spectrum' colorscheme</td><td>e.g. 'colorstyle:pastel'</td></tr>
 *  <tr><td>filter</td><td>filter for 'DOMINANT' themes; defines the condition together with dfilter</td><td>min / max / mean / median</td></tr>
 *  <tr><td>dfilter</td><td>defines the percentage to add to the filter</td><td>e.g. 'filter:mean;dfilter:30' means: mean + 30% is the significant value fo dominance</td></tr>
 *  <tr><td>overviewchart</td><td>define the type of overviewchart for choroplethte themes</td><td>none / PIE / DONUT</td></tr>
 *  <tr><td>evidence</td><td>how to evidence class member, if the mouse is over a class in the legend</td><td>isolate / highlight</td></tr>
 *  </table>
 * <br>
 * <strong>Samples:</strong>
 * <br> map.Api.changeThemeStyle("type:CHOROPLETHE|EQUIDISTANT;classes:10;colorscheme:spectrum,pastel;overviewchart:PIE|3D"); 
 * <br> map.Api.changeThemeStyle("type:CHART|BUBBLE|SURFACE|VALUES"); 
 * <br> map.Api.changeThemeStyle("type:CHART|PIE|DONUT|3D|VOLUME");
 * <br><br>
 * <strong>Hints:</strong>
 * <br>
 * CHOROPLETHE type can be changed only to BUBBLE type.<br>
 * CHART type can be changed into DOMINANT type.<br>
 */
Map.Themes.prototype.doChangeThemeStyle = function(szId,szStyle,szFlag){
	var mapTheme = this.getTheme(szId.split(':')[0]) || this.activeTheme;
	if ( mapTheme ){
		var styleObj = __getStyleObj(szStyle);
		if (styleObj ){
			if ( styleObj.type ){

				styleObj.origType = styleObj.type;

				// flag 'add,'remove','toggle'
				// ---------------------------
				if ( szFlag && szFlag.match(/add/) ){
					var styleA = styleObj.type.split("|");
					this.szTempStyle = mapTheme.szFlag;
					for ( var i=0; i<styleA.length; i++ ){
						if ( !eval("this.szTempStyle.match(/"+styleA[i]+"/)") ){
							this.szTempStyle += "|" + styleA[i];
						}
					}
					styleObj.type = this.szTempStyle;
				}else
				if ( szFlag && szFlag.match(/remove/) ){
					var styleA = mapTheme.szFlag.split("|");
					var szTempStyle = "";
					for ( var i=0; i<styleA.length; i++ ){
						if ( styleA[i] != styleObj.type ){
							szTempStyle += ((szTempStyle.length?"|":"")+styleA[i]);
						}
					}
					styleObj.type = szTempStyle;
				}else
				if ( szFlag && szFlag.match(/toggle/) ){
					var styleA = mapTheme.szFlag.split("|");
					var szTempStyle = "";
					var found = false;
					for ( var i=0; i<styleA.length; i++ ){
						if ( styleA[i] != styleObj.type ){
							szTempStyle += ((szTempStyle.length?"|":"")+styleA[i]);
						}else{
							found = true;
						}
					}
					styleObj.type = szTempStyle + (found?"":("|"+styleObj.type));
				}
				// ---------------------------
				else{
					if ( (styleObj.type.match(/CHART/)		 && !mapTheme.szFlag.match(/CHART/))		||
						 (styleObj.type.match(/CHOROPLETHE/) && !mapTheme.szFlag.match(/CHOROPLETHE/))	){
						mapTheme.unpaintMap();
						this.activateNextPaint(mapTheme);
					}
					if ( mapTheme.szFlag.match(/FRACTION/) ){
						styleObj.type += "|FRACTION";
					}
					if ( mapTheme.szFlag.match(/PERMILLE/) ){
						styleObj.type += "|PERMILLE";
					}
					if ( mapTheme.szFlag.match(/CALCVAL/) ){
						styleObj.type += "|CALCVAL";
					}
					if ( mapTheme.szFlag.match(/CALC100/) ){
						styleObj.type += "|CALC100";
					}
					if ( mapTheme.szFlag.match(/PRODUCT/) ){
						styleObj.type += "|PRODUCT";
					}
					if ( mapTheme.szFlag.match(/RELATIVE/) ){
						styleObj.type += "|RELATIVE";
					}
					if ( mapTheme.szFlag.match(/INVERT/) ){
						styleObj.type += "|INVERT";
					}
					if ( mapTheme.szFlag.match(/INVERTSIZE/) ){
						styleObj.type += "|INVERTSIZE";
					}
					if ( mapTheme.szFlag.match(/DENSITY/) ){
						styleObj.type += "|DENSITY";
					}
					//if ( mapTheme.szFlag.match(/DOPACITY/) ){
					//	styleObj.type += "|DOPACITY";
					//}
					if ( mapTheme.szFlag.match(/SUM/) ){
						styleObj.type += "|SUM";
					}
					if ( mapTheme.szFlag.match(/CALCMEAN/) ){
						styleObj.type += "|CALCMEAN";
					}
					if ( mapTheme.szFlag.match(/AUTO100/) ){
						styleObj.type += "|AUTO100";
					}
					if ( styleObj.type.match(/EQUIDISTANT/) ||
						 styleObj.type.match(/LOG/)			||
						 styleObj.type.match(/QUANTILE/) ){
						mapTheme.szOldRanges = mapTheme.szRanges?mapTheme.szRanges:mapTheme.szOldRanges;
						mapTheme.szRanges = null;
						mapTheme.szOldLabelA = mapTheme.szLabelA?mapTheme.szLabelA:mapTheme.szOldLabelA;
						mapTheme.szLabelA = null;
					}
					if ( styleObj.type.match(/RANGES/) ){
						mapTheme.szRanges = mapTheme.szOldRanges?mapTheme.szOldRanges:mapTheme.szRanges;
						mapTheme.szRangesA = styleObj.ranges.split(styleObj.ranges.match(/\|/)?'|':',');
						mapTheme.szLabelA = mapTheme.szOldLabelA?mapTheme.szOldLabelA:mapTheme.szLabelA;
						if ( Number(mapTheme.origColorScheme[0]) && mapTheme.szRanges ){
							mapTheme.origColorScheme[0] = mapTheme.szRangesA.length - 1;
						}
					}
				}
				var oldFlag = mapTheme.szFlag;
				mapTheme.szFlag = styleObj.type;

				// GR 20.09.2011 charts preset with shadow
				if ( mapTheme.szFlag.match(/CHART/) && !mapTheme.szFlag.match(/BUFFER/) && !oldFlag.match(/CHART/) ){
					mapTheme.fShadow = mapTheme.fOrigShadow = true;
				}


				if ( styleObj.origType.match(/AGGREGATE/) || styleObj.origType.match(/RECT/)){
					mapTheme.fRealize = true;
					mapTheme.fRedraw = false;
					mapTheme.unpaintMap();
					mapTheme.themeNodesPosA = [];
				}else{
					mapTheme.fRedraw = true;
					mapTheme.fRedrawInfo = true;
				}
			
			}else

			// if 'remove' flag set
			// remove the style(s) from the theme definition
			//	
			if ( szFlag && szFlag.match(/remove/) ){
				for ( p in styleObj ){
					for ( s in themeStyleTranslateA ){
						if ( themeStyleTranslateA[s].style == p ){
							mapTheme[themeStyleTranslateA[s].obj] = null;
						}
					}
				}
				map.Themes.unmarkClass(null,szId);
				mapTheme.fReload = true;
				mapTheme.fRealize = true;

				// redraw the theme and exit 

				executeWithMessage("map.Themes.execute()","... processing ...");
				return;
			}

			// if not remove, go through the styles
			// and change in theme definition
			//
			if ( styleObj.classes ){
				if ( isNaN(Number(mapTheme.origColorScheme[0])) ){
					mapTheme.origColorScheme[3] = mapTheme.origColorScheme[mapTheme.origColorScheme.length/2];
					mapTheme.origColorScheme[4] = '2colors';
					var xxx = mapTheme.origColorScheme[mapTheme.origColorScheme.length-1];
					mapTheme.origColorScheme[1] = mapTheme.origColorScheme[0];
					mapTheme.origColorScheme[2] = xxx;
				}
				mapTheme.origColorScheme[0] = Number(styleObj.classes);

				if ( mapTheme.szFlag.match(/CHART/) ){
					mapTheme.unpaintMap();
				}
				mapTheme.szOldRanges = mapTheme.szRanges;
				mapTheme.szRanges = null;
				mapTheme.fRealize = true;
			}
			if ( styleObj.ranges ){
				mapTheme.szRanges = styleObj.ranges;
				mapTheme.szRangesA = styleObj.ranges.split(styleObj.ranges.match(/\|/)?'|':',');
				mapTheme.fRealize = true;
			}
			if ( styleObj.colorstyle ){
				if ( mapTheme.origColorScheme[1] == 'spectrum' ){
					mapTheme.origColorScheme[2] = styleObj.colorstyle;
					if ( mapTheme.szFlag.match(/CHART/) ){
						mapTheme.unpaintMap();
					}
					mapTheme.fRealize = true;
				}
			}
			if ( styleObj.colordef ){
				mapTheme.origColorScheme = styleObj.colordef.match(/\|/)?styleObj.colordef.split('|'):styleObj.colordef.split(',');
			}
			if ( styleObj.colorscheme ){
				var argA = styleObj.colorscheme.match(/\|/)?styleObj.colorscheme.split('|'):styleObj.colorscheme.split(',');
				if ( argA && argA.length ){
					if ( isNaN(Number(mapTheme.origColorScheme[0])) ){
						mapTheme.origColorScheme[0] = mapTheme.origColorScheme.length;
					}
					mapTheme.origColorScheme.length = 1;
					for ( var i=0; i<5; i++ ){
						if ( i<argA.length ){
							mapTheme.origColorScheme[i+1] = argA[i];
						}else{
							mapTheme.origColorScheme[i+1] = null;
						}
					}
					try	{
						mapTheme.colorScheme = ColorScheme.createColorScheme(mapTheme.origColorScheme[1],mapTheme.origColorScheme[2],mapTheme.origColorScheme[0],mapTheme.origColorScheme[3],mapTheme.origColorScheme[4]);
					}
					catch (e){
						mapTheme.colorScheme = mapTheme.defaultColorScheme;
					}

					mapTheme.fRedraw = true;
					if ( !mapTheme.szFlag.match(/CHART/) ){
						mapTheme.fRealize = true;
					}
					mapTheme.fRedrawInfo = true;
					mapTheme.showInfo();
				}
			}
			if ( styleObj.colorschemegeneration ){
				if ( !isNaN(Number(mapTheme.origColorScheme[0])) ){
					switch(styleObj.colorschemegeneration){
					case 'warm': 
						mapTheme.origColorScheme[4] = '#FFFDD8';
						break;
					case 'cold': 
						mapTheme.origColorScheme[4] = '#FFFFFF';
						break;
					default:
						mapTheme.origColorScheme[4] = styleObj.colorschemegeneration;
						break;
					}
					if ( mapTheme.szFlag.match(/CHART/) ){
						mapTheme.unpaintMap();
					}
					try	{
						mapTheme.colorScheme = ColorScheme.createColorScheme(mapTheme.origColorScheme[1],mapTheme.origColorScheme[2],mapTheme.origColorScheme[0],mapTheme.origColorScheme[3],mapTheme.origColorScheme[4]);
					}
					catch (e){
						mapTheme.colorScheme = mapTheme.defaultColorScheme;
					}
					mapTheme.fRedraw = true;
					mapTheme.fRedrawInfo = true;
				}
			}
			if ( styleObj.symbols ){
				mapTheme.szSymbolsA = styleObj.symbols.split(styleObj.symbols.match(/\|/)?'|':',');
				mapTheme.fRealize = true;
			}
			if ( styleObj.dominantdfilter ){
				mapTheme.nDominantDFilter = Number(styleObj.dominantdfilter);
				mapTheme.fRealize = true;
			}
			if ( styleObj.dominantfilter ){
				mapTheme.szDominantFilter = String(styleObj.dominantfilter);
				mapTheme.fRealize = true;
			}
			if ( styleObj.filter ){
				if ( szFlag && szFlag.match(/remove/) ){
					mapTheme.szFilter = "";
				}else{
					mapTheme.szFilter = String(styleObj.filter);
				}
				mapTheme.fRealize = true;
				mapTheme.unpaintMap();
			}
			if ( styleObj.filterfield ){
				mapTheme.szFilterField = String(styleObj.filterfield);
				mapTheme.fRealize = true;
			}
			if ( styleObj.field100min ){
				mapTheme.nField100Min = styleObj.field100min;
				mapTheme.fRealize = true;
			}
			if ( styleObj.overviewchart ){
				if ( !mapTheme.szFlag.match(/CHART/) ){
					mapTheme.szOverviewChart = styleObj.overviewchart;
					mapTheme.fRedrawInfo = true;
				}
			}
			if ( styleObj.evidence ){
				mapTheme.evidenceMode = styleObj.evidence;
			}
			if ( styleObj.aggregation ){
				mapTheme.szAggregation = styleObj.aggregation;
			}
			if ( styleObj.opacity ){
				mapTheme.fOpacity =  __calcNewValue(mapTheme.fOpacity,Number(styleObj.opacity),szFlag); 
			}
			if ( styleObj.fillopacity ){
				mapTheme.fillOpacity = __calcNewValue(mapTheme.fillOpacity,Number(styleObj.fillopacity),szFlag);
				mapTheme.fillOpacity = Math.min(Math.max(mapTheme.fillOpacity,0.001),1);
				mapTheme.fRedraw = true;
			}
			if ( styleObj.shadow ){
				if ( styleObj.shadow == "toggle" ){
					mapTheme.fShadow = mapTheme.fOrigShadow = !mapTheme.fOrigShadow;
				}else{
					mapTheme.fShadow = mapTheme.fOrigShadow = (styleObj.shadow == "false")?false:true;
				}
				mapTheme.fRedraw = true;
			}
			if ( styleObj.blur ){
				if ( styleObj.blur == "toggle" ){
					if ( mapTheme.nBlur ){
						mapTheme.nOldBlur = mapTheme.nBlur;
						mapTheme.nBlur = 0;
					}else{
						mapTheme.nBlur = (mapTheme.nOldBlur||1);
					}
				}else{
					mapTheme.nBlur = __calcNewValue(mapTheme.nBlur,Number(styleObj.blur),szFlag);
				}
				mapTheme.fBlur = true;
			}
			if ( styleObj.scale ){
				mapTheme.fResize = __calcFactor(mapTheme.nScale,Number(styleObj.scale),szFlag);
			}
			if ( styleObj.dopacityscale ){
				mapTheme.nDopacityScale = __calcNewValue(mapTheme.nDopacityScale,Number(styleObj.dopacityscale),szFlag);
				mapTheme.fRedraw = true;
			}
			if ( styleObj.d_dopacityscale ){
				mapTheme.nDopacityScale = mapTheme.nDopacityScale*Number(styleObj.d_dopacityscale);
				mapTheme.fRedraw = true;
			}
			if ( styleObj.alphafield ){
				mapTheme.szAlphaField = String(styleObj.alphafield);
				mapTheme.fRealize = true;
			}
			if ( styleObj.alphafield100 ){
				mapTheme.szAlphaField100 = String(styleObj.alphafield100);
				mapTheme.fRealize = true;
			}
			if ( styleObj.dopacityramp){
				mapTheme.szDopacityRamp = styleObj.dopacityramp;
				mapTheme.fRealize = true;
			}
			if ( styleObj.dopacitypow){
				mapTheme.nDopacityPow = __calcNewValue(mapTheme.nDopacityPow,Number(styleObj.dopacitypow),szFlag);
				mapTheme.fRealize = true;
			}
			if ( styleObj.rangescale ){
				mapTheme.nRangeScale = __calcNewValue(mapTheme.nRangeScale||1,Number(styleObj.rangescale),szFlag);
				mapTheme.fRedraw = true;
			}
			if ( styleObj.sizefield ){
				mapTheme.szSizeField = String(styleObj.sizefield);
				mapTheme.fRealize = true;
			}
			if ( styleObj.labelfield ){
				mapTheme.szLabelField = String(styleObj.labelfield);
				mapTheme.fRealize = true;
			}
			if ( styleObj.valuefield ){
				mapTheme.szValueField = String(styleObj.valuefield);
				mapTheme.fRealize = true;
			}
			if ( styleObj.normalsizevalue ){
				if ( !mapTheme.nNormalSizeValue ){
					mapTheme.nNormalSizeValue = mapTheme.szSizeField?mapTheme.nMaxSize:mapTheme.nMax;
				}
				mapTheme.nNormalSizeValue = __calcNewValue(mapTheme.nNormalSizeValue,Number(styleObj.normalsizevalue),szFlag);
				mapTheme.fRedraw = true;
//				mapTheme.fRealize = true;
			}
			if ( styleObj.valuedecimals){
				mapTheme.szValueDecimals = styleObj.valuedecimals;
//				mapTheme.fRealize = true;
				mapTheme.fRedraw = true;
			}
			// GR 21.03.2009 define scaledependency for value label 
			if ( styleObj.valueupper ){
				mapTheme.szValueUpper = styleObj.valueupper;
				mapTheme.nValueUpper = __scanScaleValue(mapTheme.szValueUpper);
				mapTheme.fRedraw = true;
			}
			// GR 02.03.2017 define scaledependency for box title 
			if ( styleObj.titleupper ){
				mapTheme.szTitleUpper = styleObj.titleupper;
				mapTheme.nTitleUpper = __scanScaleValue(mapTheme.szTitleUpper);
				mapTheme.fRedraw = true;
			}
			// GR 02.03.2017 define scaledependency for box title 
			if ( styleObj.boxupper ){
				mapTheme.szBoxUpper = styleObj.boxupper;
				mapTheme.nBoxUpper = __scanScaleValue(mapTheme.szBoxUpper);
				mapTheme.fRedraw = true;
			}
			if ( styleObj.minvaluesize){
				mapTheme.nValueSizeMin = __calcNewValue(mapTheme.nValueSizeMin,Number(styleObj.minvaluesize),szFlag);
//				mapTheme.fRealize = true;
				mapTheme.fRedraw = true;
			}
			// remains for compatibility
			if ( styleObj.clipvaluesize){
				mapTheme.nValueSizeMin = __calcNewValue(mapTheme.nValueSizeMin,Number(styleObj.clipvaluesize),szFlag);
//				mapTheme.fRealize = true;
				mapTheme.fRedraw = true;
			}
			if ( styleObj.minsize){
				mapTheme.nChartSizeMin =  __calcNewValue(mapTheme.nChartSizeMin,Number(styleObj.minsize),szFlag);
//				mapTheme.fRealize = true;
				mapTheme.fRedraw = true;
			}
			if ( styleObj.minchartsize){
				mapTheme.nChartSizeMin =  __calcNewValue(mapTheme.nChartSizeMin,Number(styleObj.minchartsize),szFlag);
//				mapTheme.fRealize = true;
				mapTheme.fRedraw = true;
			}
			// remains for compatibility
			if ( styleObj.clipsize){
				mapTheme.nChartSizeMin =  __calcNewValue(mapTheme.nChartSizeMin,Number(styleObj.clipsize),szFlag);
//				mapTheme.fRealize = true;
				mapTheme.fRedraw = true;
			}
			if ( styleObj.clipparts){
				mapTheme.nClipParts = Number(styleObj.clipparts);
//				mapTheme.fRealize = true;
				mapTheme.fRedraw = true;
			}
			if ( styleObj.showparts ){
				mapTheme.szShowParts = styleObj.showparts;
				mapTheme.szShowPartsA = styleObj.showparts.split(styleObj.showparts.match(/\|/)?'|':',');
				map.Themes.unmarkClass(null,szId);
				mapTheme.fRedraw = true;
			}
			if ( styleObj.gridx){
				mapTheme.nGridX = Number(styleObj.gridx) || 7;
//				mapTheme.fRealize = true;
				mapTheme.fRedraw = true;
			}
			if ( styleObj.gridwidth){
				mapTheme.szAggregationField = null;
				if ( styleObj.gridwidth == "auto" ){
					mapTheme.nGridWidthPx = mapTheme.nGridWidthPx || 50; 
				}else
				if ( styleObj.gridwidth.match(/px/) ){
					mapTheme.nGridWidthPx = __calcNewValue(mapTheme.nGridWidthPx||1,Number(styleObj.gridwidth),szFlag); 
				}else
				if ( szFlag == "factor" ){
					if ( mapTheme.nGridWidthPx ){
						mapTheme.nGridWidthPx = __calcNewValue(mapTheme.nGridWidthPx||1,Number(styleObj.gridwidth),szFlag); 
					}else{
						mapTheme.nGridWidth   = __calcNewValue(mapTheme.nGridWidth||1000,Number(styleObj.gridwidth),szFlag); 
					}
				}else{
					mapTheme.nGridWidthPx = null;
					mapTheme.nGridWidth = __calcNewValue(mapTheme.nGridWidth||1,Number(styleObj.gridwidth),szFlag);
				}
				mapTheme.fRealize = true;
				mapTheme.fRedraw = true;
				mapTheme.fSuppressAggregationScale = true;
				mapTheme.unpaintMap();
				mapTheme.themeNodesPosA = [];
			}
			if ( styleObj.gridmatrix){
				mapTheme.szAggregationField = null;
				mapTheme.nGridMatrix = __calcNewValue(mapTheme.nGridMatrix||1,Number(styleObj.gridmatrix),szFlag); 
				mapTheme.fRealize = true;
				mapTheme.fRedraw = true;
				mapTheme.fSuppressAggregationScale = true;
				mapTheme.unpaintMap();
				mapTheme.themeNodesPosA = [];
			}
			if ( styleObj.gridwidthpx){
				mapTheme.szAggregationField = null;
				mapTheme.nGridWidthPx = __calcNewValue(mapTheme.nGridWidthPx||50,Number(styleObj.gridwidthpx),szFlag); 
				mapTheme.fRealize = true;
				mapTheme.fRedraw = true;
				mapTheme.fSuppressAggregationScale = true;
				mapTheme.unpaintMap();
				mapTheme.themeNodesPosA = [];
			}
			if ( styleObj.aggregationfield ){
				mapTheme.szAggregationField = styleObj.aggregationfield;
				mapTheme.fRealize = true;
				mapTheme.fRedraw = true;
				mapTheme.fSuppressAggregationScale = true;
				mapTheme.unpaintMap();
				mapTheme.themeNodesPosA = [];
			}
			if ( styleObj.snippet ){
				mapTheme.szSnippet = unescape(styleObj.snippet);
				mapTheme.fRealize = true;
			}
			if ( styleObj.title ){
				mapTheme.szTitle = unescape(styleObj.title);
				mapTheme.fRealize = true;
			}
		}
		mapTheme.fRedrawInfo = true;
		executeWithMessage("map.Themes.execute()","... processing ...");
	}
};
/**
 * build a list of all themed layer
 * @return a list of layer
 */
Map.Themes.prototype.getThemeLayerList = function(){

	var szThemeA = new Array(0);
	var a;
	for ( var i=0; i<this.themesA.length; i++ ){
		if ( this.themesA[i].objThemesA && 
			!this.themesA[i].fRemove	 ) {
			for ( a in this.themesA[i].objThemesA ){
				szThemeA[szThemeA.length] = a;
			}
		}
	}
	return szThemeA;
};
/**
 * check if layer is part of a themed layer
 * @param szLayer the layer to check
 * @return true or false
 */
Map.Themes.prototype.isThemeLayerUsed = function(szLayer){
	var szThemeLayerA = this.getThemeLayerList();
	for ( var l=0; l<szThemeLayerA.length; l++){
		if ( szLayer == szThemeLayerA[l] ){
			return true;
		}
	}
	return false;
};
/**
 * check if node is part of a themed layer
 * @param objNode the SVG node to check
 * @return true or false
 */
Map.Themes.prototype.isNodePartOfAnyTheme = function(objNode){

	var layerItem = map.Layer.getLayerObjOfNode(objNode);
	if ( layerItem ){
		var szThemeLayerA = map.Themes.getThemeLayerList();
		for ( var l=0; l<szThemeLayerA.length; l++){
			if ( layerItem.szName == szThemeLayerA[l] ){
				return true;
			}
		}
	}
	return false;
};
/**
 * discard cache of theme nodes (see .getItemNodes() )
 * @return ---
 */
Map.Themes.prototype.resetThemeNodesCache = function(){
	this.themeNodesA = new Array(0);
	this.themeNodes = 0;
};
/**
 * build cache of theme nodes (see .getItemNodes() )
 * @return ---
 */
Map.Themes.prototype.addToThemeNodesCache = function(sourceGroup){

	// build node cache --------------------------------------
	var count = 0;
	nodeA = sourceGroup.getElementsByTagName('g');
	for ( n=0; n<nodeA.length;n++){

		var szId = String(map.Tiles.getMasterId(nodeA.item(n).getAttributeNS(null,"id")));
		if ( szId ){
			if (!map.Themes.themeNodesA[szId]){
				map.Themes.themeNodesA[szId] = new Array();
			}
			map.Themes.themeNodesA[szId].push(nodeA.item(n));
			map.Themes.themeNodes++;
			count++;
		}
	}
	_TRACE("Tiling: -------------------------------------------------------------- "+count+" added to NodesCache");
};
/**
 * discard theme nodes from cache 
 * @return ---
 */
Map.Themes.prototype.removeFromThemeNodesCache = function(sourceGroup){

	// remove from node cache --------------------------------------
	var count = 0;
	nodeA = sourceGroup.getElementsByTagName('g');
	for ( n=0; n<nodeA.length;n++){

		var szId = String(map.Tiles.getMasterId(nodeA.item(n).getAttributeNS(null,"id")));
		if ( szId && map.Themes.themeNodesA[szId] ){
			var index = map.Themes.themeNodesA[szId].indexOf(nodeA.item(n));
			if (index > -1) {
				map.Themes.themeNodesA[szId].splice(index, 1);
				count++;
			}
		}
	}
	_TRACE("Tiling: -------------------------------------------------------------- "+count+" removed from NodesCache");
};
/**
 * set this theme as active
 * @param themeObj the theme to set active
 */
Map.Themes.prototype.setActive = function(themeObj){
	this.activeTheme = themeObj;
};
/**
 * minimize info display 
 * @parameter evt the event
 * @parameter szId the id of the theme
 */
Map.Themes.prototype.minimizeInfo = function(evt,szId){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		var infoNode = mapTheme.widgetNode.firstChild;
		if ( infoNode ){
			var nTitleHeight = Number(infoNode.getAttributeNS(szMapNs,"titleheight"));
			if ( nTitleHeight <= 0 ){
				nTitleHeight = 420;
			}
			var partNodesA = infoNode.childNodes;
			for ( var i=0; i<partNodesA.length; i++ ){
				var partNode = partNodesA.item(i);
				var szPartId = partNode.getAttributeNS(null,"id");
				if ( szPartId.match(/body/) ){
					partNode.style.setProperty("display","none","");
				}
				if ( szPartId.match(/footer/) ){
					partNode.style.setProperty("display","none","");
				}
				if ( szPartId.match(/backgroundrect/) ){
					partNode.setAttributeNS(szMapNs,"maxheight",partNode.getAttributeNS(null,"height"));
					partNode.setAttributeNS(null,"height",nTitleHeight);
				}
				if ( szPartId.match(/shadowrect/) ){
					partNode.setAttributeNS(szMapNs,"maxheight",partNode.getAttributeNS(null,"height"));
					partNode.setAttributeNS(null,"height",String(nTitleHeight-100));
				}
				if ( szPartId.match(/minimizebutton/) ){
					partNode.style.setProperty("display","none","");
				}
			}
			mapTheme.minimizebutton.nodeObj.style.setProperty("display","none","");
			mapTheme.morebutton.nodeObj.style.setProperty("display","none","");
			mapTheme.addDefinitionToFlag("MINIMIZED");
		}
	}
};
/**
 * maximize info display 
 * @parameter evt the event
 * @parameter szId the id of the theme
 */
Map.Themes.prototype.maximizeInfo = function(evt,szId){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		var infoNode = mapTheme.widgetNode.firstChild;
		if ( infoNode ){
			var partNodesA = infoNode.childNodes;
			for ( var i=0; i<partNodesA.length; i++ ){
				var partNode = partNodesA.item(i);
				var szPartId = partNode.getAttributeNS(null,"id");
				if ( szPartId.match(/body/) ){
					partNode.style.setProperty("display","inline","");
				}
				if ( szPartId.match(/footer/) ){
					partNode.style.setProperty("display","inline","");
				}
				if ( szPartId.match(/backgroundrect/) ){
					partNode.setAttributeNS(null,"height",partNode.getAttributeNS(szMapNs,"maxheight"));
				}
				if ( szPartId.match(/shadowrect/) ){
					partNode.setAttributeNS(null,"height",partNode.getAttributeNS(szMapNs,"maxheight"));
				}
				if ( szPartId.match(/minimizebutton/) ){
					partNode.style.setProperty("display","inline","");
				}
			}
			mapTheme.minimizebutton.nodeObj.style.setProperty("display","inline","");
			mapTheme.morebutton.nodeObj.style.setProperty("display","inline","");
			mapTheme.removeDefinitionFromFlag("MINIMIZED");
		}
	}
};
/**
 * get all charts of the node of all themes
 * @param szId the id of the node
 * @param targetGroup the target SVG group for the chart to create
 * @return the chart node
 */
Map.Themes.prototype.getChartAll = function(szId,targetGroup,szFlag){
	var szBaseId = targetGroup.getAttributeNS(null,"id");
	var nChartOffY = 0;
	for ( var i=0; i<this.themesA.length; i++ ){
		var chartGroup = map.Dom.newGroup(targetGroup,szBaseId+":C1");
		this.getChart(szId,chartGroup,szFlag,this.themesA[i]);
		var bBox = map.Dom.getBox(chartGroup);
		if ( bBox.width < 0){
			bBox = new box(0,0,0,0);
		}
		chartGroup.fu.setPosition(0,nChartOffY);
		nChartOffY += bBox.height+map.Scale.normalY(10);	
	}
};
/**
 * get the chart of the node of a theme
 * @param szId the id of the node
 * @param targetGroup the target SVG group for the chart to create
 * @return the chart node
 */
Map.Themes.prototype.getChart = function(szId,targetGroup,szFlag,mapTheme){
	if (!mapTheme){
//		return this.getChartAll(szId,targetGroup,szFlag);
		mapTheme = this.activeTheme;
	}
	if ( !mapTheme ){
		return null;
	}
	// GR 28.09.2010 strip trailing :paint
	if ( szId && (szId.substr(szId.length-6,6) == ":paint") ){
		szId = szId.substr(0,szId.length-6);
	}

	if (  mapTheme.szFlag.match(/CHOROPLETHE/) && mapTheme.szFlag.match(/DOMINANT/) ){

		// a) charts for choroplethe themes that show dominant values; show the original values of the item 
		// ================================================================================================

		var nChartSize = 30;
		if ( mapTheme.nOrigSumA.length > 2 ){
			nChartSize = 15*mapTheme.nOrigSumA.length/Math.log(mapTheme.nOrigSumA.length);
		}
		var chartGroup = map.Dom.newGroup(targetGroup,targetGroup.getAttributeNS(null,"id")+":1");

		if ( mapTheme.szFlag.match(/PERCENTOFMEAN/) || mapTheme.szFlag.match(/PERCENTOFMEDIAN/) || mapTheme.szFlag.match(/DEVIATION/) ){

			// 1. chart with values
			// --------------------
//			mapTheme.drawChart(chartGroup,szId,nChartSize,"CHART|BAR|3D|AXIS|VALUES",(szId&&mapTheme.itemA[szId])?mapTheme.itemA[szId].nDominant:null);
//			mapTheme.drawChart(chartGroup,szId,nChartSize,"CHART|BAR|3D|VALUES|ZOOM",(szId&&mapTheme.itemA[szId])?mapTheme.itemA[szId].nDominant:null);
			mapTheme.drawChart(chartGroup,szId,nChartSize,"CHART|BAR|VALUES|ZOOM",(szId&&mapTheme.itemA[szId])?mapTheme.itemA[szId].nDominant:null);

			var bBox = map.Dom.getBox(chartGroup);
			if ( bBox.width < 0){
				bBox = new box(0,0,0,0);
			}
			else{
//				map.Dom.newText(chartGroup,bBox.width/2+map.Scale.normalX(5),-map.Scale.normalY(5),"font-family:arial;font-size:"+map.Scale.normalY(4)+"px;fill:#808080",map.Dictionary.getLocalText("values"));
			}
			chartGroup = map.Dom.newGroup(targetGroup,targetGroup.getAttributeNS(null,"id")+":2");

			// 2. chart with deviations
			// ------------------------
			// !! the real chart flag will be set in drawChart() !!
			// !! hope we can change this in future
			var ptNull = mapTheme.drawChart(chartGroup,szId,nChartSize,"VALUES|ZOOM");

			var bBox2 = map.Dom.getBox(chartGroup);

			var nScale = (mapTheme.nOrigSumA.length > 1)?(bBox.width/bBox2.width*1.015):(bBox2.width/bBox2.height); // factor heuristic
			var nOff   = ((bBox2.x-bBox.x));  // +map.Scale.normalX(mapTheme.partsA.length*1.02))/nScale;

			chartGroup.fu.setPosition(nOff,bBox.height+bBox.y+Math.min(map.Scale.normalY(200),Math.max(map.Scale.normalY(10),-bBox2.y+map.Scale.normalY(6))));
			chartGroup.fu.scale(nScale,1.0);

			var szMean = mapTheme.szFlag.match(/PERCENTOFMEDIAN/)?"median":"mean";
			var xPos = bBox2.width;
			if ( 0 && ( mapTheme.nOrigSumA.length > 1  )){
				xPos = bBox2.width/2+map.Scale.normalX(8);
			}
			map.Dom.newText(chartGroup,xPos,map.Scale.normalY(0+0.9),"font-family:arial;font-size:"+map.Scale.normalY(4)+"px;fill:#808080",map.Dictionary.getLocalText(szMean));
			map.Dom.newText(chartGroup,xPos,map.Scale.normalY(0+5.5),"font-family:arial;font-size:"+map.Scale.normalY(4)+"px;fill:#808080",map.Dictionary.getLocalText("-"));
			map.Dom.newText(chartGroup,xPos,map.Scale.normalY(0-3.7),"font-family:arial;font-size:"+map.Scale.normalY(4)+"px;fill:#808080",map.Dictionary.getLocalText("+"));
		}else{
			// ony 1 chart with values
			// -----------------------
			var szChartType = "CHART|BAR|SPACED|VALUES|ZOOM";
			if ( mapTheme.szFlag.match(/3D/) ){
				szChartType += "|3D";
			}
			if ( mapTheme.szFlag.match(/SORT/) ){
				szChartType += "|SORT";
			}
			if ( mapTheme.szFlag.match(/HORZ/) ){
				szChartType += "|HORZ|AXIS";
			}
			mapTheme.drawChart(chartGroup,szId,nChartSize,szChartType,null);
		}
		return new point(0,map.Scale.normalY(30)); 
	}
	else{
		// b) buffers don't have charts 
		// ============================
		if ( mapTheme.szFlag.match(/BUFFER/) && mapTheme.szFlag.match(/CHART/)  ){
			return null;
		}

		// d) normal choroplethe themes, evtl. with distribution histogram
		// ===============================================================
		if ( mapTheme.szFlag.match(/CHOROPLETHE/) && mapTheme.itemA[szId] ){
			var nValue = mapTheme.itemA[szId].nValuesA[0];
			var szTextStyle = __scaleStyleString(map.Scale.tStyle.Summary.szStyle,1); 

			if ( mapTheme.szFlag.match(/EXACT/) && mapTheme.szLabelA && mapTheme.szLabelA.length ){
				var szValueText = mapTheme.szLabelA[nValue-1];
			}else{
				var szValueText = mapTheme.formatValue(nValue,2)+mapTheme.szUnit;
			}

			map.Dom.newText(targetGroup,-40,0,szTextStyle+";font-weight:normal;fill:#444444",szValueText);

			// GR 27.04.2011 new get distribution histogram
			if ( !mapTheme.szFlag.match(/EXACT/) ){
				if ( mapTheme.szChoropletheInfoStyle.match(/HISTOGRAM/) || 
					 mapTheme.szChoropletheInfoStyle.match(/histogram/) ||
					 mapTheme.szChoropletheInfoStyle.match(/CLASSES/)   ||
					 mapTheme.szChoropletheInfoStyle.match(/classes/)    ) {
					var fHistogramStyle = (mapTheme.szChoropletheInfoStyle.match(/HISTOGRAM/) || mapTheme.szChoropletheInfoStyle.match(/histogram/));
					var chartGroup = map.Dom.newGroup(targetGroup,targetGroup.getAttributeNS(null,"id")+":histogram");
					this.getHistogram(szId,chartGroup,fHistogramStyle?"DISTRIBUTION":"CLASSES",mapTheme);
					chartGroup.fu.setPosition(0,map.Scale.normalY(4));
				}
			}

			return new point(0,0); 
		}
		// e) zoomed clones of map charts
		// ==============================
		else{
			if ( mapTheme.szFlag.match(/INFOSIZE/) ){
				return mapTheme.drawChart(targetGroup,szId,30,szFlag);
			}else{
				var nChartSize = 30;
				if ( mapTheme.szFlag.match(/SEQUENCE/) ){
					nChartSize = 25;
				}
				if ( mapTheme.szFlag.match(/BAR/) ){
					if ( mapTheme.szFlag.match(/STACKED/) ){
						nChartSize = 30;
					}else 
					if ( mapTheme.nOrigSumA.length <= 2 ){
						nChartSize = 30;
					}else
					if ( mapTheme.szFlag.match(/UP/) ){
						nChartSize = 15*mapTheme.nOrigSumA.length/Math.log(mapTheme.nOrigSumA.length);
					}else
					if ( mapTheme.szFlag.match(/CENTER/) || mapTheme.szFlag.match(/SEQUENCE/) ){
						nChartSize = 15*mapTheme.nOrigSumA.length/Math.log(mapTheme.nOrigSumA.length);
					}else{
						nChartSize = 15*mapTheme.nOrigSumA.length/Math.log(mapTheme.nOrigSumA.length);
					}
				}
				return mapTheme.drawChart(targetGroup,szId,nChartSize,szFlag);
			}
		}
	}
	return null;
};
/**
 * get the summary (text) of the node of a theme
 * @param szId the id of the node
 * @return the summary text
 * @type string
 */
Map.Themes.prototype.getSummary = function(szId,mapTheme){
	if (!mapTheme){
		mapTheme = this.activeTheme;
	}
	if ( !mapTheme || !szId ){
		return null;
	}
	// GR 28.06.2007 look also for upper value
	if ( !mapTheme.itemA[szId] ){
		aA = szId.split('::');
		if ( aA.length > 1 ){
			szId = aA[0]+"::"+String(aA[1]).toUpperCase();
		}
	}
	if ( !mapTheme.itemA[szId] ){
		return null;
	}
	var nPartsA = mapTheme.itemA[szId].nOrigValuesA;
	var nMySum = 0;
	for ( var i=0; i<nPartsA.length; i++ ){
		if ( isNaN(nPartsA[i]) ){
			nPartsA[i] = 0;
		}
		nMySum += nPartsA[i];
	}
	if ( mapTheme.szFlag.match(/DIFFERENCE/) ){
		nMySum = nPartsA[nPartsA.length-1];
	}
	if ( mapTheme.itemA[szId].nValue100 ){
		// GR 17.06.2013 new parameter 'units100'
		// mapTheme.szUnits100 = mapTheme.szUnits100 || map.Dictionary.getLocalText("items");
		mapTheme.szUnits100 = mapTheme.szUnits100 || "";

		if ( mapTheme.szFlag.match(/RELATIVE/) || mapTheme.szFlag.match(/DIFFERENCE/) ){
			return map.Dictionary.getLocalText("Relative to")+": "+String(__formatValue(mapTheme.itemA[szId].nValue100,2))+" "+(mapTheme.szUnits100||"");
		}else if( mapTheme.itemA[szId].nSize ){
			if ( mapTheme.szAggregation.match(/sum/) ){
				return map.Dictionary.getLocalText("Counted")+": "+String(__formatValue(mapTheme.itemA[szId].nSize,2))+" "+(mapTheme.szUnits100||"");
			}else{
				return map.Dictionary.getLocalText("Total")+": "+String(__formatValue(mapTheme.itemA[szId].nSize,2))+" "+(mapTheme.szUnits100||"");
			}
		}else{
			if ( nMySum != mapTheme.itemA[szId].nValue100 ){
				return String(__formatValue(nMySum,2))+" / "+String(__formatValue(mapTheme.itemA[szId].nValue100,2))+" "+(mapTheme.szUnits100||"");
			}else{
				return map.Dictionary.getLocalText("Total")+": "+String(__formatValue(nMySum,2))+" "+(mapTheme.szUnits100||"");
			}
		}
	}
	else if( mapTheme.itemA[szId].nSize ){
		if( mapTheme.szFlag.match(/EXACT/) && (mapTheme.itemA[szId].nValuesA.length == 1) && mapTheme.szValueField ){
			return mapTheme.szLabelA[mapTheme.itemA[szId].nValuesA[0]-1];
		}else{
			return map.Dictionary.getLocalText("Total")+": "+String(__formatValue(mapTheme.itemA[szId].nSize,2))+" "+(mapTheme.szSizeValueUnits||"");
		}
	}
	else if( mapTheme.itemA[szId].nAlpha ){
		return map.Dictionary.getLocalText("Alpha value")+": "+String(__formatValue(mapTheme.itemA[szId].nAlpha,2))+" "+(mapTheme.szAlphaValueUnits||"");
	}
	else if ( mapTheme.szFlag.match(/SUM/) && !mapTheme.szFlag.match(/SEQUENCE/) && !mapTheme.szFlag.match(/CLIP/)){
//		return map.Dictionary.getLocalText("Value:")+" "+String(__formatValue(nMySum,2))+mapTheme.szUnits;
	}
return null;
};
/**
 * get a text to comment the value of the node of a theme
 * @param szId the id of the node
 * @return the summary text
 * @type string
 */
Map.Themes.prototype.getValueComment = function(szId,mapTheme){
	if (!mapTheme){
		mapTheme = this.activeTheme;
	}
	if ( !mapTheme || !szId ){
		return null;
	}
	// GR 28.06.2007 look also for upper value
	if ( !mapTheme.itemA[szId] ){
		aA = szId.split('::');
		if ( aA.length > 1 ){
			szId = aA[0]+"::"+String(aA[1]).toUpperCase();
		}
	}
	if ( !mapTheme.itemA[szId] ){
		return null;
	}
	var nPartsA = mapTheme.itemA[szId].nOrigValuesA;
	var nMySum = 0;
	for ( var i=0; i<nPartsA.length; i++ ){
		if ( isNaN(nPartsA[i]) ){
			nPartsA[i] = 0;
		}
		nMySum += nPartsA[i];
	}
	if ( mapTheme.szFlag.match(/DIFFERENCE/) ){
		nMySum = nPartsA[nPartsA.length-1];
	}
	if ( mapTheme.szFlag.match(/OFFSETMEAN/) ){
		return map.Dictionary.getLocalText("value")+": "+String(__formatValue(mapTheme.itemA[szId].nValuesA[0],2)) + " " +
			   map.Dictionary.getLocalText("mean")+": "+String(__formatValue(mapTheme.nMeanA[0],2));
	}
	/**
	if ( mapTheme.itemA[szId].nValue100 ){
		if ( mapTheme.szFlag.match(/RELATIVE/) || mapTheme.szFlag.match(/DIFFERENCE/) ){
			return map.Dictionary.getLocalText("Relative to")+": "+String(__formatValue(mapTheme.itemA[szId].nValue100,2));
		}else if( mapTheme.itemA[szId].nSize ){
			if ( mapTheme.szAggregation.match(/sum/) ){
				return map.Dictionary.getLocalText("Counted")+": "+String(mapTheme.itemA[szId].nSize)+" "+map.Dictionary.getLocalText("items");
			}else{
				return map.Dictionary.getLocalText("Total")+": "+String(mapTheme.itemA[szId].nSize)+" "+mapTheme.szUnit;
			}
		}else{
			if ( nMySum != mapTheme.itemA[szId].nValue100 ){
				return map.Dictionary.getLocalText("Counts")+": "+String(nMySum)+" / "+String(mapTheme.itemA[szId].nValue100)+" "+map.Dictionary.getLocalText("items");
			}else{
				return map.Dictionary.getLocalText("Total")+": "+String(nMySum)+" "+map.Dictionary.getLocalText("items");
			}
		}
	}
	else if ( mapTheme.szFlag.match(/SUM/) && !mapTheme.szFlag.match(/SEQUENCE/) && !mapTheme.szFlag.match(/CLIP/)){
//		return map.Dictionary.getLocalText("Value:")+" "+String(__formatValue(nMySum,2))+mapTheme.szUnits;
	}
	**/
return null;
};

/**
 * get the title (text) of the node of a theme
 * @param szId the id of the node
 * @return the title of the chart
 * @type string
 */
Map.Themes.prototype.getTitle = function(szId,mapTheme){
	if (!mapTheme){
		mapTheme = this.activeTheme;
	}
	if ( !mapTheme || !szId ){
		return null;
	}
	// GR 28.06.2007 look also for upper value
	if ( !mapTheme.itemA[szId] ){
		aA = szId.split('::');
		if ( aA.length > 1 ){
			szId = aA[0]+"::"+String(aA[1]).toUpperCase();
		}
	}
	if ( !mapTheme.itemA[szId] ){
		return null;
	}
	return mapTheme.itemA[szId].szTitle || null;
};

/**
 * get the label (text) of the node of a theme
 * @param szId the id of the node
 * @return the summary text
 * @type string
 */
Map.Themes.prototype.getLabel = function(szId,mapTheme){
	if (!mapTheme){
		mapTheme = this.activeTheme;
	}
	if ( !mapTheme || !szId ){
		return null;
	}
	// GR 28.06.2007 look also for upper value
	if ( !mapTheme.itemA[szId] ){
		aA = szId.split('::');
		if ( aA.length > 1 ){
			szId = aA[0]+"::"+String(aA[1]).toUpperCase();
		}
	}
	if ( !mapTheme.itemA[szId] ){
		return null;
	}
	return mapTheme.itemA[szId].szLabel || null;
};
/**
 * get all text nodes of all themes
 * @return an array with the nodes
 * @type Array
 */
Map.Themes.prototype.getTextObjects = function(){
	var allNodes = [];
	for ( var i=0; i<this.themesA.length; i++ ){

		if ( this.themesA[i].szFlag.match(/TEXTONLY/) && this.themesA[i].chartGroup ) {

			// class highlighting active ? exclude text switched of by class highlighting
			if ( (typeof(this.themesA[i].markedClass) != "undefined") && (this.themesA[i].markedClass != null) ){

				nClass = this.themesA[i].markedClass;

				var nodeA = this.themesA[i].chartGroup.getElementsByTagName('text');
				for ( n=0; n<nodeA.length;n++){
					if ( nodeA.item(n).firstChild.nodeValue.length > 0 ){
						if ( Number(nodeA.item(n).getAttributeNS(szMapNs,"class")) == nClass ){
							allNodes.push(nodeA.item(n));
						}
					}
				}
			// nothing to exclude
			}else{

				var nodeA = this.themesA[i].chartGroup.getElementsByTagName('text');
				for ( n=0; n<nodeA.length;n++){
					if ( nodeA.item(n).firstChild.nodeValue.length > 0 ){
						allNodes.push(nodeA.item(n));
					}
				}
			}
		}
	}
	return allNodes;
};
/**
 * get the max value of one chart
 * @param szId the id of the node
 * @param mapTheme the theme object; if null take activeTheme
 * @return the max value
 * @type number
 */
Map.Themes.prototype.getMaxValue = function(szId,mapTheme){

	if (!mapTheme){
		mapTheme = this.activeTheme;
	}
	if ( !mapTheme || !szId ){
		return null;
	}
	var nMax = 0;
	var nPartsA = mapTheme.itemA[szId].nValuesA;
	for ( var i=0; i<nPartsA.length; i++ ){
		if ( isNaN(nPartsA[i]) ){
			nPartsA[i] = 0;
		}
		nMax = Math.max(nMax,nPartsA[i]);
	}
	return nMax;
};
/**
 * get a text array with the data values of one chart
 * @param szId the id of the node
 * @return the data value array
 * @type array of string
 */
Map.Themes.prototype.getDataRow = function(szId,mapTheme){
	if (!mapTheme){
		mapTheme = this.activeTheme;
	}
	if ( !mapTheme || !szId ){
		return null;
	}
	// GR 28.06.2007 look also for upper value
	if ( !mapTheme.itemA[szId] ){
		aA = szId.split('::');
		if ( aA && (aA.length > 1) ){
			szId = aA[0]+"::"+String(aA[1]).toUpperCase();
		}
	}
	if ( !mapTheme.itemA[szId] ){
		return null;
	}
	// GR 14.05.2016 if more than 1 item integrated, don't show raw data
	if ( mapTheme.szFlag.match(/AGGREGATE/) && mapTheme.itemA[szId].nCount > 1 ){
		return null;
	}

	var szTheme = mapTheme.szThemesA[0];
	var objTheme = mapTheme.objThemesA[szTheme];
	var fields = objTheme.dbFields;

	var dataIndexA = [];
	// GR 23.05.2015 handle data selection array
	if ( mapTheme.szDataFieldsA ){
		for ( var i=0; i<mapTheme.szDataFieldsA.length; i++ ){
			for ( var ii=0; ii<objTheme.dbFields.length; ii++ ){
				if ( mapTheme.szDataFieldsA[i] == objTheme.dbFields[ii].id ){
					dataIndexA.push(ii);
				}
			}
		}
	}else{
		for ( var ii=0; ii<objTheme.dbFields.length; ii++ ){
			dataIndexA.push(ii);
		}
	}

	var valuesA = new Array();

	if ( objTheme.dbRecords ){
		if ( typeof(mapTheme.itemA[szId].dbIndex) != "undefined" ){

			// we have a data row associated
			var i = mapTheme.itemA[szId].dbIndex;
			var allNumbers = true;
			var nMaxFieldLen = 0;
			var nMaxRecordLen = 0;

			// check if we have all values == numbers
			for ( var ii=0; ii<objTheme.dbFields.length; ii++ ){
				if ( isNaN(objTheme.dbRecords[i][ii]) ){
					allNumbers = false;
				}
				nMaxFieldLen  = Math.max(nMaxFieldLen, objTheme.dbFields[ii].id.length);
				nMaxRecordLen = Math.max(nMaxRecordLen,objTheme.dbRecords[i][ii].length);
			}

			// all numbers -> values first
			if ( allNumbers || (nMaxFieldLen > (nMaxRecordLen*2)) ){
				for ( var ii=0; ii<dataIndexA.length; ii++ ){
					valuesA.push(objTheme.dbRecords[i][dataIndexA[ii]]);
				}
				for ( var ii=0; ii<dataIndexA.length; ii++ ){
					valuesA.push(objTheme.dbFields[dataIndexA[ii]].id);
				}
			// not all numbers -> description first
			}else{
				for ( var ii=0; ii<dataIndexA.length; ii++ ){
					valuesA.push(objTheme.dbFields[dataIndexA[ii]].id);
				}
				for ( var ii=0; ii<dataIndexA.length; ii++ ){
					valuesA.push(objTheme.dbRecords[i][dataIndexA[ii]]);
				}
			}
			return valuesA;
		}

		szId = (szId.split('::')[1]);
		for ( var i=0; i<objTheme.dbRecords.length; i++ ){
			if (  objTheme.dbRecords[i] && 
				  objTheme.dbRecords[i][objTheme.nFieldSelectionIndex] && 
				  (String((objTheme.dbRecords[i][objTheme.nFieldSelectionIndex])).toUpperCase() ==  String(szId).toUpperCase()) ){
				for ( var ii=0; ii<objTheme.dbFields.length; ii++ ){
					valuesA.push(objTheme.dbFields[ii].id);
				}
				for ( var ii=0; ii<objTheme.dbFields.length; ii++ ){
					valuesA.push(objTheme.dbRecords[i][ii]);
				}
				return valuesA;
			}
		}
	}
	return valuesA;
};
/**
 * get a number array with the field indices of the theme
 * @param szId the id of the node
 * @param mapTheme the theme object
 * @return the index array
 * @type array of numbers
 */
Map.Themes.prototype.getFieldIndexArray = function(mapTheme){
	if (!mapTheme){
		mapTheme = this.activeTheme;
	}
	if ( !mapTheme ){
		return [];
	}
	if ( mapTheme.szDataFieldsA ){
		return [];
	}

	mapTheme.fieldIndexArray = [];
	for ( var i=0; i<mapTheme.objThemesA[mapTheme.szThemesA[0]].nFieldIndexA.length; i++){
		mapTheme.fieldIndexArray.push(mapTheme.objThemesA[mapTheme.szThemesA[0]].nFieldIndexA[i]);
	}
	if ( mapTheme.objThemesA[mapTheme.szThemesA[0]].nField100Index >= 0  ){
		mapTheme.fieldIndexArray.push(mapTheme.objThemesA[mapTheme.szThemesA[0]].nField100Index);
	}
	return mapTheme.fieldIndexArray;
};

/**
 * get the distribution of a theme
 * @param nTicks the the number of ticks
 * @param szFlag additional flags
 * @return an array with the distribution
 * @type array
 */
Map.Themes.prototype.getScatterArray = function(mapTheme,nTicks,szFlag){
	if (!mapTheme){
		mapTheme = this.activeTheme;
	}
	var nValuePos = 0;
	var nCountMax = 0;
	var nMin = mapTheme.nMin;
	var nMax = mapTheme.nMax;
	var dValue = 0;
	var a;

	_TRACE("nMin:"+nMin+" nMax:"+nMax);
	if ( szFlag.match(/LOG/) ){
		dValue = 1-nMin;
		nMin = Math.log(nMin+dValue);
		nMax = Math.log(nMax+dValue);
	}
	_TRACE("nMin:"+nMin+" nMax:"+nMax);
	var nPop = (nMax - nMin)/nTicks;
	var nPopA = new Array(0);
	for (var i=0; i<nTicks+1; i++ ){
		nPopA[i] = 0;
	}
	for ( a in mapTheme.itemA ){
		var xValue = mapTheme.itemA[a].nValuesA[0];
		if ( typeof(xValue) == 'number' ){
			if ( szFlag.match(/LOG/) ){
				xValue = Math.log(xValue+dValue);
			}
			nPos = Math.max(0,Math.min(nTicks-1,Math.floor((xValue-nMin)/nPop)));
			nPopA[nPos]++;
			nCountMax = Math.max(nCountMax,nPopA[nPos]);
		}
	}
	_TRACE("nTicks:"+nTicks);
	_TRACE("nPop:"+nPop+" nMax:"+nMax);
	_TRACE("nCountMax:"+nCountMax);
	return nPopA;
};
/**
 * get and index of the quality of a distribution of the theme
 * @param nPopA the popolation array of the distribution
 * @type number
 * @return quality index
 */
Map.Themes.prototype.getResolutionQualityOfArray = function(nPopA){

	var nTicks = nPopA.length;
	var nCountMax = -1000000;
	var nTickMax = 0;
	var nMean = 0;
	var nVarianz = 0;
	var nDeviation = 0;

	for (var i=0; i<nTicks; i++ ){
		nCountMax = Math.max(nCountMax,nPopA[i]);
	}
	nCount = 0;
	for (var i=0; i<nTicks; i++ ){
		if ( nPopA[i] > nCountMax/10 ){
			nCount++;
		}
	}
	return nCount/nTicks*100;
};
/**
 * get the deviation of a popolation array 
 * @param nPopA the popolation array of the distribution
 * @type number
 * @return the standard deviation
 */
Map.Themes.prototype.getDeviationOfArray = function(nPopA){

	_TRACE("getDeviationOfArray --->");

	var nTicks = nPopA.length;
	var nCountMax = -1000000;
	var nTickMax = 0;
	var nMean = 0;
	var nVarianz = 0;
	var nDeviation = 0;

	for (var i=0; i<nTicks; i++ ){
		nCountMax = Math.max(nCountMax,nPopA[i]);
		if ( nPopA[i] == nCountMax ){
			nTickMax = i;
		}
		nMean += nPopA[i];
	}
	nMean /= nTicks;

	_TRACE("nCountMax: "+nCountMax);
	_TRACE("nTickMax: "+nTickMax);
	_TRACE("nMean: "+nMean);
	
	for (var i=0; i<nTicks; i++ ){
		nVarianz += (nPopA[i]-nMean)*(nPopA[i]-nMean);
	}
	nVarianz /= nTicks;
	nDeviation = Math.sqrt(nVarianz);

	_TRACE("nVarianz: "+nVarianz);	
	_TRACE("nDeviation: "+nDeviation);	


	return nDeviation;
};
/**
 * get the value histogramm of a theme
 * @param szId the id of the node
 * @param targetGroup the target SVG group for the chart to create
 * @param szFlag additional flags
 * @param mapTheme optional parameter to select a map theme other than the active theme
 * @return the histogram node
 * @type object
 */
Map.Themes.prototype.getHistogram = function(szId,targetGroup,szFlag,mapTheme){ 

	_TRACE("map.Themes.getHistogram --->");

	if (!targetGroup){
		return null;
	}
	if (!mapTheme){
		mapTheme = this.activeTheme;
	}
	if ( !mapTheme ){
		return null;
	}
	if ( mapTheme.nMin == mapTheme.nMax ){
		return null;
	}

	if ( szId ){
		// GR 28.06.2007 look also for upper value
		if ( !mapTheme.itemA[szId] ){
			aA = szId.split('::');
			if ( aA.length > 1 ){
				szId = aA[0]+"::"+String(aA[1]).toUpperCase();
			}
		}
		if ( !mapTheme.itemA[szId] ){
			return null;
		}
	}

	this.histGroup = map.Dom.newGroup(targetGroup,targetGroup.getAttributeNS(null,"id")+":group");
	this.histFlag = szFlag;
	this.histTheme = mapTheme;

	var nWidth = map.Scale.normalX(70);
	var nHeight = map.Scale.normalY(20);

	map.Dom.newShape('rect',this.histGroup,0,0,nWidth-map.Scale.normalX(0.5),nHeight,"fill:none;stroke:none;");

	if ( szId ){
		setTimeout("map.Themes.makeHistogram('"+szId+"')",100);
	}else{
		setTimeout("map.Themes.makeHistogram()",100);
	}
};

/**
 * make the complete (SVG) value histogramm of a theme 
 * @param szId the id of an item to mark within the histogram
 * @return the histogram group node (SVG)
 * @type object
 */
Map.Themes.prototype.makeHistogram = function(szId){

	_TRACE("map.Themes.makeHistogram --->");
			
	var histGroup	= this.histGroup;
	var szFlag		= this.histFlag;
	var mapTheme	= this.histTheme;
	if ( szFlag.match("CLASSES") ){
		var nWidth = map.Scale.normalX(50);
		var nHeight = map.Scale.normalY(5);
		var nStep = nWidth/mapTheme.colorScheme.length;
		var nX = 0;
		var nY = 0;
		var nValue = szId?mapTheme.itemA[szId].nValuesA[0]:0;
		var nValuePos = 0;

		// create the histogram; width of color swatches depends on ranges (equidistant,quantile,... etc)
		for (var i=0; i<mapTheme.partsA.length; i++ ){

			nStep = nWidth/mapTheme.nCount*mapTheme.partsA[i].nCount;
			var newClassRect = map.Dom.newShape('rect',histGroup,nX,nY,nStep,nHeight,"fill:"+mapTheme.colorScheme[i]+";stroke:black;stroke-width:1;");
			if ( newClassRect ){
				newClassRect.setAttributeNS(szMapNs,"tooltip",mapTheme.szLegendLabelA[i]+" ("+mapTheme.formatValue(mapTheme.partsA[i].nCount)+" "+map.Dictionary.getLocalText("members")+")");
			}
			nX += nStep;

			// calcolate item marker position 
			if ( nValue > mapTheme.partsA[i].max ){
				nValuePos += nStep;
			}else
			if ( nValue > mapTheme.partsA[i].min ){
				nValuePos += nStep/(mapTheme.partsA[i].max-mapTheme.partsA[i].min)*(nValue-mapTheme.partsA[i].min);
			}
		}

		// mark the item value within the histogram
		map.Dom.newShape('circle',histGroup,nValuePos,-map.Scale.normalX(0.1),map.Scale.normalX(1),"fill:#444444;stroke:none;");

	// make a distribution histogram
	// distribute the values in nTicks classes, or linear or logarithmic
	//
	}else if ( szFlag.match("DISTRIBUTION") ) {
		var nClasses = Math.min(140,Math.max(20,mapTheme.nCount/5));
		var nClasses = Math.min(500,Math.max(20,mapTheme.nCount/5));

		var nWidth = map.Scale.normalX(70);
		var nHeight = map.Scale.normalY(12);
		if ( szFlag.match("INTERACTIVE") ){
			var nHeight = map.Scale.normalY(20);
		}
		var nClassWidth = nWidth/nClasses;

		var nX = 0;
		var nY = 0;

		var nValue = szId?mapTheme.itemA[szId].nValuesA[0]:0;
		var nValuePos = 0;
		var nCountMax = 0;
		var nMin = mapTheme.nMin;
		var nMax = mapTheme.nMax;
		var	dValue = 0;

		// create a distribution (linear or logarithmic)
		// =============================================

		// 1. create the linear distribution
		var nPopA = this.getScatterArray(mapTheme,nClasses,"");
		var nDeviation = this.getDeviationOfArray(nPopA);
		// 2. create the logarithmic distribution
		var nPopALog = this.getScatterArray(mapTheme,nClasses,"LOG");
		var nDeviationLog = this.getDeviationOfArray(nPopALog);

		var fDoLog = false;
		var nClassStep = (nMax - nMin)/nClasses;

		_TRACE("nDeviation:"+nDeviation+" <> nDeviationLog:"+nDeviationLog);

		// test which distribution (log or non log) has the best standard deviation
		//
		if ( nDeviationLog && (nDeviationLog < nDeviation) ){
			// if take the log, scale the variables 
			nPopA = nPopALog;
			dValue = 1-nMin;
			nMin = Math.log(nMin+dValue);
			nMax = Math.log(nMax+dValue);
			nValue = Math.log(nValue+dValue);
			nClassStep = (nMax - nMin)/nClasses;
			fDoLog = true;
		}
		// get the maximum count
		//
		for (var i=0; i<nClasses; i++ ){
			nCountMax = Math.max(nCountMax,nPopA[i]);
		}

		// create the histogram;
		// ================================================	
		
		// draw color classes
		// 
		nX = -20;
		nY = 0;

		mapTheme.histogram = new Map.Histogram(mapTheme);
		mapTheme.histogram.fDoLog = fDoLog;
		mapTheme.histogram.dValue = dValue;
		mapTheme.histogram.nWidth = nWidth;
		mapTheme.histogram.nMin = nMin;
		mapTheme.histogram.nMax = nMax;

		var szSliderTextStyle = __scaleStyleString(map.Scale.tStyle.Summary.szStyle,0.4); 

		var nLastStep = 0;
		for (var i=0; i<mapTheme.partsA.length; i++ ){
			if ( fDoLog ){
				var nClassColorWidth = nWidth / (nMax - nMin) * (Math.min(nMax,Math.log(mapTheme.partsA[i].max+dValue)) - nMin);
			}else{
				var nClassColorWidth = nWidth / (nMax - nMin) * (Math.min(nMax,mapTheme.partsA[i].max) - nMin);
			}
			nStep = nClassColorWidth - nX;
			var newClassRect = map.Dom.newShape('rect',histGroup,nX,nY,nStep,nHeight,"fill:"+mapTheme.colorScheme[i]+";stroke:black;stroke-width:"+map.Scale.normalX(0.2)+";stroke-opacity:0.1");
			if ( newClassRect ){
				newClassRect.setAttributeNS(szMapNs,"tooltip",mapTheme.szLegendLabelA[i]+" ("+mapTheme.formatValue(mapTheme.partsA[i].nCount)+" "+map.Dictionary.getLocalText("members")+")");
				newClassRect.setAttributeNS(szMapNs,"onoverstyle","fill:"+mapTheme.colorScheme[i]+";stroke:black;stroke-width:"+map.Scale.normalX(0.5)+";");
				newClassRect.setAttributeNS(null,"onmouseover","map.Themes.markClass(evt,'"+mapTheme.szId+"','"+i+"','"+1+"')");
				newClassRect.setAttributeNS(null,"onmouseout","map.Themes.unmarkClass(evt,'"+mapTheme.szId+"')");
			}

			mapTheme.histogram.classRectA[i] = newClassRect;
			mapTheme.histogram.classRectXA[i] = nX;
			mapTheme.histogram.classRectWidthA[i] = nStep;
			mapTheme.histogram.classRectMaxA[i] = mapTheme.partsA[i].max;
	
			if ( szFlag.match("INTERACTIVE") ){
				// class slider
				var classSliderGroup = map.Dom.newGroup(histGroup,"");
				var newSliderText = null;
				if ( i>0 ){
					map.Dom.newShape('line',classSliderGroup,nX,nY-map.Scale.normalY(2),nX,nY+nHeight,"stroke:black;stroke-width:"+map.Scale.normalX(0.5)+";stroke-opacity:0.5");
					var newSliderRect = map.Dom.newShape('rect',classSliderGroup,nX-map.Scale.normalY(1.5),nY-map.Scale.normalY(6),map.Scale.normalX(3),map.Scale.normalY(5),"fill:"+mapTheme.colorScheme[i]+";stroke:black;styroke-width(1);");
					if ( newSliderRect ){
						newSliderRect.setAttributeNS(null,"rx",map.Scale.normalX(2));
						newSliderRect.setAttributeNS(null,"ry",map.Scale.normalY(1.5));
					}
					newSliderText = map.Dom.newText(classSliderGroup,nX,nY-map.Scale.normalY(7),szSliderTextStyle+"display:none;font-weight:normal;text-anchor:middle",mapTheme.formatValue(mapTheme.partsA[i-1].max,1));
				}
				var classSlider = new Slider(classSliderGroup,new box(-nLastStep,0,nLastStep+nStep,0));
				classSlider.setId(String(i));
				classSlider.parent = mapTheme.histogram;
				classSlider.textObj = newSliderText;
				nLastStep = nStep;
			}

			nX += nStep;
		}

		// draw distribution histogram
		// 
		nX = nClassWidth/3;
		nY = 0;

		// scale the histogram in Y ! max values may bee outside after scaling !  
		nScalingFactor = 0.9;
		// get the percent of values within 10% of maximum
		var nQuality = this.getResolutionQualityOfArray(nPopA);
		_TRACE(nQuality+"%");
		// if we have to many small values, increase scaling
		if ( nQuality < 10 ){
			nScalingFactor = 10-nQuality;
		}

		for (var i=0; i<nClasses; i++ ){
			var xHeight = nPopA[i]/nCountMax*nHeight*nScalingFactor;
			var	xMinValue = fDoLog?(Math.exp(nMin+i*nClassStep)-dValue):(nMin+i*nClassStep);
			var	xMaxValue = fDoLog?(Math.exp(nMin+(i+1)*nClassStep)-dValue):(nMin+(i+1)*nClassStep);

			var szColor = "black";
			// adapt histogram color to color class (switched off)
			if ( 0 ){
				for (var p=0; p<mapTheme.partsA.length; p++ ){
					if ( xMinValue < mapTheme.partsA[p].max ){
						szColor = mapTheme.colorScheme[p];
						break;
					}
				}
				var cColor = __maptheme_getChartColors(szColor);
				szColor = cColor.lowColor;
			}

			if ( xHeight && !isNaN(xHeight) ){
				xHeight = Math.min(nHeight,Math.max(map.Scale.normalY(0.5),xHeight));
			}else{
				xHeight = 0;
			}

			var newLine = map.Dom.newShape('line',histGroup,nX,nY+nHeight,nX,nY+nHeight-xHeight,"stroke:"+szColor+";stroke-width:"+nClassWidth+";");
			if ( newLine ){
				newLine.setAttributeNS(szMapNs,"tooltip",mapTheme.formatValue(xMinValue,2)+' ... '+mapTheme.formatValue(xMaxValue,2)+mapTheme.szUnit+" ("+nPopA[i]+" members)");
				newLine.setAttributeNS(szMapNs,"onoverstyle","stroke:yellow;stroke-width:"+Math.max(map.Scale.normalX(1),nClassWidth)+";");
			}

			nX += nClassWidth;
		}

		// frame the histogram
		//
		map.Dom.newShape('line',histGroup,-map.Scale.normalX(0.5),nHeight+1,nWidth-map.Scale.normalX(0.5),nHeight+1,"stroke:black;stroke-width:"+map.Scale.normalX(0.1)+";");

		// draw x axis
		// ===========
		var nPosXLeft  = -map.Scale.normalX(0.5);
		var nPosXRight = nWidth-map.Scale.normalX(0.5);
		var nTickHeight = map.Scale.normalX(2);
		map.Dom.newShape('line',histGroup,nPosXLeft,nHeight,nPosXLeft,nHeight+nTickHeight,"stroke:black;stroke-width:"+map.Scale.normalX(0.2)+";");
		map.Dom.newShape('line',histGroup,nPosXRight,nHeight,nPosXRight,nHeight+nTickHeight,"stroke:black;stroke-width:"+map.Scale.normalX(0.2)+";");

		var szTextStyle = __scaleStyleString(map.Scale.tStyle.Summary.szStyle,0.4); 
		var nTextHeight = map.Scale.tStyle.Summary.nFontHeight*0.4;
		var nTextPosY   = nHeight+nTickHeight+nTextHeight*0.8;
		var szMinValue = mapTheme.formatValue(mapTheme.nMin,0);
		var szMaxValue = mapTheme.formatValue(mapTheme.nMax,0);

		// show min value allways
		map.Dom.newText(histGroup,nPosXLeft-10,nTextPosY,szTextStyle+";font-weight:normal;text-anchor:start",szMinValue);
		
		// define 0 point, only if we have negative and positive values 
		if ( mapTheme.nMin < 0 && mapTheme.nMax > 0){
			var nValuePos = (0-nMin)/nClassStep*nClassWidth;
			map.Dom.newShape('line',histGroup,nValuePos,nHeight,nValuePos,nHeight+nTickHeight,"stroke:black;stroke-width:"+map.Scale.normalX(0.2)+";");
			map.Dom.newText(histGroup,nValuePos,nTextPosY,szTextStyle+";font-weight:normal;text-anchor:start","0");
		}

		// make scala 10, 20, ...
		var nNextFreeTextPos = 0;
		for ( var i=10; i<mapTheme.nMax; i*=10 ) {
			for ( var ii=1; ii<9; ii++ ) {
				if ( i*ii > mapTheme.nMax || i*ii < mapTheme.nMin ){
					break;
				}
				nValuePos = ((fDoLog?Math.log(i*ii+dValue):i*ii)-nMin)/nClassStep*nClassWidth;
				var szValue = mapTheme.formatValue(i*ii,0);
				if ( nValuePos > nNextFreeTextPos + szValue.length*nTextHeight*3/8 ){
					map.Dom.newShape('line',histGroup,nValuePos,nHeight,nValuePos,nHeight+nTickHeight,"stroke:black;stroke-width:"+map.Scale.normalX(0.2)+";");
					map.Dom.newText(histGroup,nValuePos,nTextPosY,szTextStyle+";font-weight:normal;text-anchor:middle",szValue);
					nNextFreeTextPos = nValuePos + szValue.length*nTextHeight*3/8;
				}else{
					map.Dom.newShape('line',histGroup,nValuePos,nHeight,nValuePos,nHeight+nTickHeight/2,"stroke:black;stroke-width:"+map.Scale.normalX(0.2)+";");
				}
			}
		}
		// if possible show max value
		if ( nPosXRight > nNextFreeTextPos + szMaxValue.length*nTextHeight*3/8 ){
			map.Dom.newText(histGroup,nPosXRight,nTextPosY,szTextStyle+";font-weight:normal;text-anchor:middle;",szMaxValue);
		}
		
		// mark the item value within the histogram
		// ========================================
		if ( szId && !szFlag.match("INTERACTIVE") ){
			nValuePos = (nValue-nMin)/nClassStep*nClassWidth;
			map.Dom.newShape('circle',histGroup,nValuePos,-map.Scale.normalX(0.1),map.Scale.normalX(1),"fill:#dd0000;stroke:none;");
			map.Dom.newShape('line',histGroup,-10,-5,nValuePos-10,-5,"stroke:#000000;stroke-width:"+map.Scale.normalX(0.5)+";stroke-opacity:0.3");
		}

	}else{
		var nTicks = 700;
		var nWidth = map.Scale.normalX(70);
		var nHeight = map.Scale.normalY(12);
		var nStep = nWidth/nTicks;
		var nX = 0;
		var nY = 0;
		var nValue = szId?mapTheme.itemA[szId].nValuesA[0]:0;
		var nValuePos = 0;
		var nCountMax = 0;
		var nMin = mapTheme.nMin;
		var nMax = mapTheme.nMax;
		var nRange = nMax - nMin;
		var nScale = nHeight/nMax;
		var nAcc = Math.max(1,Math.ceil(mapTheme.nCount/nTicks));

		var nValueA = new Array(0);
		var nAccI = 0;
		var a;

		var nValueXA = [];
		for ( a in mapTheme.itemA ){
			nValueXA.push(mapTheme.itemA[a].nValuesA[0]);
		}
		nValueXA.sort(mapTheme.sortUp);

		for ( a in nValueXA ){
			if ( nAccI%nAcc ){
				nValueA[nValueA.length-1] += nValueXA[a]/nAcc;
			}else{
				nValueA[nValueA.length] = nValueXA[a]/nAcc;
			}
			nAccI++;
		}
		nValueA.sort(mapTheme.sortUp);

		// create the histogram;
		
		for (var i=0; i<nValueA.length; i++ ){
			var xValue = nValueA[i];
			var xHeight = nValueA[i] * nScale * 0.9;
			var szColor = "black";
			for (var p=0; p<mapTheme.partsA.length; p++ ){
				if ( nValueA[i] < mapTheme.partsA[p].max ){
					szColor = mapTheme.colorScheme[p];
					break;
				}
			}

			var newLine = map.Dom.newShape('line',histGroup,nX,nY,nX,nHeight,"stroke:"+szColor+";stroke-width:"+nStep+";");
			newLine.setAttributeNS(szMapNs,"tooltip",mapTheme.formatValue(xValue,2)+mapTheme.szUnit);

			if ( isNaN(xHeight) ){
				xHeight = 0;	
			}
			newLine = map.Dom.newShape('line',histGroup,nX,nY+nHeight,nX,nY+nHeight-xHeight,"stroke:#000000;stroke-width:"+nStep+";");
			newLine.setAttributeNS(szMapNs,"tooltip",mapTheme.formatValue(xValue,2)+mapTheme.szUnit);

			nX += nStep;
		}
		// if possible show min/max value
		if ( 1 ){
			var szMinValue = mapTheme.formatValue(mapTheme.nMin,0);
			var szMaxValue = mapTheme.formatValue(mapTheme.nMax,0);
			var szTextStyle = __scaleStyleString(map.Scale.tStyle.Summary.szStyle,0.4); 
			map.Dom.newText(histGroup,nX+map.Scale.normalX(1),nY+nHeight,szTextStyle+";font-weight:normal;text-anchor:start;stroke-opacity:0.8;",szMinValue);
			map.Dom.newText(histGroup,nX+map.Scale.normalX(1),nY+map.Scale.normalY(3.5),szTextStyle+";font-weight:normal;text-anchor:start;stroke-opacity:0.8;",szMaxValue);
		}

		// rescale the histogram to fit the required width, n*nStep is not exact enough
		if (histGroup){
			histGroup.fu.scale(nWidth/nX,1);
		}
	}

	return histGroup;
};

// .............................................................................
// histogram class
// .............................................................................

Map.Histogram = function(mapTheme) {
	this.mapTheme = mapTheme;
	this.fDoLog = false;
	this.dValue = 0;
	this.classRectA = new Array(0);
	this.classRectXA = new Array(0);
	this.classRectWidthA = new Array(0);
	this.classRectMaxA = new Array(0);
};
Map.Histogram.prototype = new Map();

Map.Histogram.prototype.onMouseOver = function(evt,szId,slider){
	if ( slider.textObj ){
		slider.textObj.style.setProperty("display","inline","");
	}
};
Map.Histogram.prototype.onMouseOut = function(evt,szId,slider){
	if ( slider.textObj ){
		slider.textObj.style.setProperty("display","none","");
	}
};
Map.Histogram.prototype.onMouseMove = function(evt,szId,slider){
	_TRACE(szId+' - '+slider.value.x);
	var classRect = this.classRectA[Number(szId)];
	if ( classRect ){
		classRect.setAttributeNS(null,"x",this.classRectXA[Number(szId)]+slider.value.x);
		classRect.setAttributeNS(null,"width",this.classRectWidthA[Number(szId)]-slider.value.x);
	}
	var classRect = this.classRectA[Number(szId)-1];
	if ( classRect ){
		classRect.setAttributeNS(null,"width",this.classRectWidthA[Number(szId)-1]+slider.value.x);

		var newX = this.classRectXA[Number(szId)]+slider.value.x;
		var nToValueScale = (this.nMax - this.nMin) / this.nWidth;
		var	nNewValue = this.nMin + newX * nToValueScale;
		nNewValue = this.fDoLog?(Math.exp(nNewValue)-this.dValue):nNewValue;
		this.classRectMaxA[Number(szId)-1] = nNewValue;
	}
	if ( slider.textObj ){
		slider.textObj.firstChild.nodeValue = __formatValue(nNewValue,1);
	}
};
Map.Histogram.prototype.onMouseUp = function(evt,szId,slider){
	var classRect = this.classRectA[Number(szId)-1];
	if ( classRect ){
		this.classRectWidthA[Number(szId)-1] = classRect.getAttributeNS(null,"width");
	}
	var szRanges = "ranges:"+String(this.nMin);
	for ( var i=0; i<this.classRectMaxA.length; i++ ){
		szRanges += "," + String(this.classRectMaxA[i]);
	}
	map.Themes.changeThemeStyle(evt,this.mapTheme.szId,szRanges);
};

// .............................................................................


/**
 * Display an error summary for the chart created
 * @parameter evt the event
 * @parameter szId the id of the theme
 */
Map.Themes.prototype.showErrorInfo = function(evt,szId){
	var mapTheme = this.getTheme(szId.split(':')[0]);
	if ( mapTheme ){
		mapTheme.showErrorInfo();
	}
};

/**
 * redraw actual theme ( may be necessary after zoom )
 * @parameter nZoomChangeFactor 1 if zoom not! changed
 */
Map.Themes.prototype.actualizeActiveTheme = function(nZoomChangeFactor){
	for ( var i=0; i<this.themesA.length; i++ ){
		if ( this.themesA[i].szFlag.match(/CHART/) ) {
			if ( nZoomChangeFactor && (nZoomChangeFactor != 1) && this.themesA[i].szFlag.match(/DYNAMICSCALE/)){
				this.themesA[i].nScale *= Math.sqrt(nZoomChangeFactor);
				this.themesA[i].fRealize = true;
				this.themesA[i].fRedraw = false;
				this.themesA[i].unpaintMap();
			}
			if ( this.themesA[i].szFlag.match(/DECLUTTER/)){
				this.themesA[i].fDeclutter = true;
				map.Themes.execute();
			}
			if ( nZoomChangeFactor && ((nZoomChangeFactor != 1)||(this.themesA[i].szFlag.match(/FIXGRID/))) &&
									 (this.themesA[i].nChartSizeMin	|| 
									  this.themesA[i].nValueSizeMin	|| 
									  this.themesA[i].szAggregationFieldA	||
									  this.themesA[i].nGridWidth	||		
									  this.themesA[i].nGridMatrix	||		
									  this.themesA[i].nGridWidthPx	||		
									  this.themesA[i].nChartUpper	||
									  this.themesA[i].nValueUpper	||
									  this.themesA[i].nBoxUpper		||
									  this.themesA[i].nTitleUpper	||
									  this.themesA[i].nLabelUpper	)
				){

				if ( this.themesA[i].fRealizeDone && (this.themesA[i].szFlag.match(/AUTOGRID/) || this.themesA[i].nGridWidthPx || this.themesA[i].szAggregationFieldA) ){
					this.themesA[i].fRealize = true;
					this.themesA[i].fRedraw = false;
					this.themesA[i].unpaintMap();
					this.themesA[i].themeNodesPosA = [];
					if ( this.themesA[i].szAggregationFieldA ){
						for ( var a=0; a<this.themesA[i].szAggregationFieldA.length; a++ ){
							var lower = Number(this.themesA[i].szAggregationFieldA[a].split(':')[1]);
							if ( lower && (map.Scale.getTrueMapScale()*map.Scale.nZoomScale > lower) ){
								if ( !isNaN(parseFloat(this.themesA[i].szAggregationFieldA[a+1])) ){
									this.themesA[i].nGridWidthPx = parseFloat(this.themesA[i].szAggregationFieldA[a+1]); 
									this.themesA[i].szAggregationField = null;
								}else{
									this.themesA[i].szAggregationField = this.themesA[i].szAggregationFieldA[a+1];
								}
							}
							a++;
						}
					}
					if ( this.themesA[i].nGridWidthPx ){
						var maxDist = map.Scale.getDistanceInMeter(1000,1000,1000+map.Scale.normalX(this.themesA[i].nGridWidthPx),1000);
						this.themesA[i].nGridWidth = maxDist/map.Scale.nZoomScale; 
					}else{
						var mapArea = map.Zoom.getBox();
						var maxDist = map.Scale.getDistanceInMeter(1000,1000,1000+mapArea.width,1000);
						this.themesA[i].nGridWidth = maxDist/(this.themesA[i].nGridMatrix||20)/map.Scale.nZoomScale; 
					}
				}else{
					if ( this.themesA[i].fRealizeDone && (nZoomChangeFactor<1) && (this.themesA[i].nChartSizeMin || this.themesA[i].nValueSizeMin) ){
						this.themesA[i].unpaintMap();
					}
					this.themesA[i].fRedraw = true;
				}
			}else{
				if (this.themesA[i].szFlag.match(/AGGREGATE/)){
					this.themesA[i].fRedraw = true;
				}else{
					this.themesA[i].fActualize = true;
				}
			}
		}
		else if ( this.themesA[i].isChecked && !this.themesA[i].fMarkClass) {
			this.themesA[i].fRedraw = true;
		}
	}
	//executeWithMessage("map.Themes.execute()","... actualize ...",100);
	map.Themes.execute();
	return null;
};
/**
 * resort all chart themes
 * @parameter evt the event
 */
Map.Themes.prototype.resortCharts = function(evt){

	var fToDo = false;
	if (this.themesA.length){
		for ( var i=0; i<this.themesA.length; i++ ){
			if ( this.themesA[i].fDone ){
				this.themesA[i].fResort = true;
				fToDo = true;
			} 
		}
		if ( fToDo ){
			map.Themes.execute();
		}
	}
	if ( evt ){
		evt.stopPropagation();
		evt.preventDefault();
	}
};
/**
 * clear the map theme list 
 */
Map.Themes.prototype.clear = function(){
	this.themesA.length = 0;
};







// .............................................................................
// ObjTheme  object that holds information about one layer which is part of a map theme 
// .............................................................................

/**
 * This is the ObjTheme class.  
 * It realizes an object for one layer (theme) which is part of a map theme
 * @constructor
 * @parameter szTheme the name of the layer (theme)
 * @parameter nIndex the index of this part of a map theme
 * @parameter coTable the name of the javascript object which holds external data 
 * @parameter szSelectionField name of the data field that contains the correlation to the map
 * @parameter szItemField name of the data field that identifies the item (if different from selection field)
 * @throws 
 * @return A new ObjTheme object
 */
function ObjTheme(szTheme,nIndex,coTable,szSelectionField,szItemField	) {
	/** name of the theme (layer) */
	this.szName = szTheme;
	/** data object assoziated with the theme */
	this.coTable = coTable;
	/** name of the data field that contains the correlation to the map */
	this.szSelectionField = szSelectionField;
	/** name of the data field that identifies the item (if different from selection field */
	this.szItemField = szItemField;
	/** index of the theme (layer) within the map theme */
	this.nIndex = nIndex;
	/** array of indices to find the map theme fields in this layer */
	this.nFieldIndexA = new Array(0);
	/** index of the 100 % (fraction,diff) field in this layer */
	this.nField100Index = -1;
	/** index of the selection field of this layer, from this field, the id of the shapes is created */
	this.nFieldSelectionIndex = -1;
	/** Array of indices to selection fields, neccessary for lan/lon coord */
	this.nFieldSelectionIndexA = new Array(0);
	/** index of the theme (layer) within the map theme */
	this.nFieldItemIndex = -1;
	/** index of the label field of this layer, from this field, the char label is created */
	this.nValueFieldIndex = -1;
	/** index of the value display field of this layer, from this field, the textual value is created */
	this.nLabelFieldIndex = -1;
	/** if true, the chart objects can be moved synchronously */
	this.leadOffset = false;
}

/**
 * method to resolve the various field names of a theme to the data array column indexes  
 * @return true, if all names could be resolved
 * @type boolean
 */
ObjTheme.prototype.getFields = function(){

	this.szFields = this.theme.szFields;
	this.szFieldsA = this.theme.szFields.split('|');
	this.szField100 = this.theme.szField100;
	this.szValueField = this.theme.szValueField;
	this.szLabelField = this.theme.szLabelField;
	this.szTitleField = this.theme.szTitleField;
	this.szSnippetField = this.theme.szSnippetField;
	this.szSizeField = this.theme.szSizeField;
	this.szAlphaField = this.theme.szAlphaField;
	this.szAlphaField100 = this.theme.szAlphaField100;
	this.szFilterField = this.theme.szFilterField;
	this.szAggregationField = this.theme.szAggregationField;
    this.szSelectionFieldsA = (this.theme.szSelectionField||"").split('|');
    
	this.nFieldIndexA[0] = -1;
	this.nFieldSelectionIndexA[0] = -1;

	var i;
	var j;
	var k;

	var szTableName = this.coTable?this.coTable:this.szName;

	if ( !this.szFields || this.szFields == "" ){
		return true;
	}
	try{
		eval("this.dbTable = "+szTableName+".table");
	}
	catch (e){
		try{
			eval("this.dbTable = "+szTableName+"_table");
		}
		catch (e){
		}
	}

	if ( this.coTable && !this.dbTable ){
		displayMessage("Data not loaded!",1000,true);
		return false;
	}
	if (this.dbTable){
		try{
		eval("this.dbFields = "+szTableName+".fields");
		}
		catch (e){
			try{
				eval("this.dbFields = "+szTableName+"_fields");
			}
			catch (e){
			}
		}
		try{
			if ( !this.szSelectionField ) {
				this.szSelectionField = map.Layer.getLayerObj(this.szName).szSelection;
			}
			_TRACE(this.szName+" selection field = "+this.szSelectionField);
		}
		catch (e){
			alert("no selection field found !!");
			return false;
		}
		for ( j=0;j<this.dbTable.fields;j++ ){
			if ( !this.dbFields || (this.dbFields.length == 0) || !this.dbFields[j] || !this.dbFields[j].id ){
				alert("ERROR: theme '"+this.szName+"' - table '"+szTableName+".js' - object 'fields' incorrect !");
				return false;
			}
		}
		for ( j=0;j<this.dbFields.length;j++ ){
			// item field to compose the ids of the theme shapes
			if ( typeof(this.szItemField) != "undefined" && 
				(String(this.dbFields[j].id).toLowerCase() == String(this.szItemField).toLowerCase()) ){
				_TRACE("db-query:"+this.dbFields[j].id+" found [item] at "+j);
				this.nFieldItemIndex = j;
			}
			// selection field to compose the ids of the theme shapes
			if ( typeof(this.szSelectionField) != "undefined" && 
				(String(this.dbFields[j].id).toLowerCase() == String(this.szSelectionField).toLowerCase()) ){
				_TRACE("db-query:"+this.dbFields[j].id+" found [selection] at "+j);
				this.nFieldSelectionIndex = j;
			}
			// multiple selection field (lat/lon)
			for (  k=0; k<this.szSelectionFieldsA.length;k++ ){
				if (this.dbFields[j].id == this.szSelectionFieldsA[k] ){
					_TRACE("db-query:"+this.dbFields[j].id+" found at "+j);
					this.nFieldSelectionIndexA[k] = j;
				}
			}
			// get the values
			for (  k=0; k<this.szFieldsA.length;k++ ){
				if (this.szFieldsA[k].substr(0,1) == "!" ){
					if (this.dbFields[j].id == this.szFieldsA[k].substr(1,this.szFieldsA[k].length-1) ){
						_TRACE("db-query:"+this.dbFields[j].id+" found at "+j);
						this.nFieldIndexA[k] = j;
					}
				}
				else{
					if (this.dbFields[j].id == this.szFieldsA[k] ){
						_TRACE("db-query:"+this.dbFields[j].id+" found at "+j);
						this.nFieldIndexA[k] = j;
					}
				}
			}
			// for % values
			if (this.szField100){
				if (this.dbFields[j].id == this.szField100 ){
					_TRACE("db-query:"+this.dbFields[j].id+" found [100] at "+j);
					this.nField100Index = j;
				}
			}
			// for value display
			if (this.szValueField){
				if (this.dbFields[j].id == this.szValueField ){
					_TRACE("db-query:"+this.dbFields[j].id+" found [label] at "+j);
					this.nValueFieldIndex = j;
				}
			}
			// for label
			if (this.szLabelField){
				if (this.dbFields[j].id == this.szLabelField ){
					_TRACE("db-query:"+this.dbFields[j].id+" found [label] at "+j);
					this.nLabelFieldIndex = j;
				}
			}
			// for title
			if (this.szTitleField){
				if (this.dbFields[j].id == this.szTitleField ){
					_TRACE("db-query:"+this.dbFields[j].id+" found [title] at "+j);
					this.nTitleFieldIndex = j;
				}
			}
			// for title
			if (this.szSnippetField){
				if (this.dbFields[j].id == this.szSnippetField ){
					_TRACE("db-query:"+this.dbFields[j].id+" found [snippet] at "+j);
					this.nSnippetFieldIndex = j;
				}
			}
			// for size
			if (this.szSizeField){
				if (this.dbFields[j].id == this.szSizeField ){
					_TRACE("db-query:"+this.dbFields[j].id+" found [size] at "+j);
					this.nSizeFieldIndex = j;
				}
			}
			// for alpha by value
			if (this.szAlphaField){
				if (this.dbFields[j].id == this.szAlphaField ){
					_TRACE("db-query:"+this.dbFields[j].id+" found [alpha] at "+j);
					this.nAlphaFieldIndex = j;
				}
			}
			if (this.szAlphaField100){
				if (this.dbFields[j].id == this.szAlphaField100 ){
					_TRACE("db-query:"+this.dbFields[j].id+" found [alpha100] at "+j);
					this.nAlphaField100Index = j;
				}
			}
			// for filter
			if (this.szFilterField){
				if (this.dbFields[j].id == this.szFilterField ){
					_TRACE("db-query:"+this.dbFields[j].id+" found [filter] at "+j);
					this.nFilterFieldIndex = j;
				}
			}
			// for aggregation
			if (this.szAggregationField){
				if (this.dbFields[j].id == this.szAggregationField ){
					_TRACE("db-query:"+this.dbFields[j].id+" found [title] at "+j);
					this.nAggregationFieldIndex = j;
				}
			}
		}
		if ( (this.nFieldSelectionIndex == -1) && (this.nFieldSelectionIndexA[0] == -1)  ){
			if ( !this.szSelectionField || !this.szSelectionField.length ){
				alert("ERROR: theme '"+this.szName+"', selection not defined !");
			}else{
				alert("ERROR: theme '"+this.szName+"' selection field '"+this.szSelectionField+"' not found !");
			}
		}
		for (  k=0; k<this.szFieldsA.length;k++ ){
			if ( typeof(this.nFieldIndexA[k]) == 'undefined' ){
				alert("ERROR: theme '"+this.szName+"' value field '"+this.szFieldsA[k]+"' not found !");
				return false;
			}
		}

	}
	else{
		var themeNode = SVGDocument.getElementById(this.szName);
		if (themeNode == null){
			var themeNodesA = map.Tiles.getTileNodes(this.szName);
			if (themeNodesA){
				themeNode = themeNodesA[0];
			}
		}
		if (!themeNode){
			_TRACE(this.szName+'- not found');
			this.szName = "";
			return false;
		}
		var szFields = themeNode.getAttributeNS(szMapNs,"info");
		if (szFields == null || szFields == ""){
			this.szName = "";
			return false;
		}
		var szFieldsA = szFields.split('|');
		for ( j=0;j<szFieldsA.length;j++ ){
			// get the values
			for ( k=0; k<this.szFieldsA.length;k++ ){
				if (this.szFieldsA[k].substr(0,1) == "!" ){
					if (szFieldsA[j] == this.szFieldsA[k].substr(1,this.szFieldsA[k].length-1) ){
						_TRACE("shape-query:"+szFieldsA[j]+" found at "+j);
						this.nFieldIndexA[k] = j;
					}
				}
				else{
					if (szFieldsA[j] == this.szFieldsA[k] ){
						_TRACE("shape-query:"+szFieldsA[j]+" found at "+j);
						this.nFieldIndexA[k] = j;
					}
				}
			}
			// for % values
			if (this.szField100){
				if (szFieldsA[j] == this.szField100 ){
					_TRACE("shape-query:"+szFieldsA[j]+" found [100] at "+j);
					this.nField100Index = j;
				}
			}
			// for value display
			if (this.szValueField){
				if (szFieldsA[j] == this.szValueField ){
					_TRACE("db-query:"+szFieldsA[j]+" found [label] at "+j);
					this.nValueFieldIndex = j;
				}
			}
			// for label
			if (this.szLabelField){
				if (szFieldsA[j] == this.szLabelField ){
					_TRACE("db-query:"+szFieldsA[j]+" found [label] at "+j);
					this.nLabelFieldIndex = j;
				}
			}
			// for size
			if (this.szSizeField){
				if (szFieldsA[j] == this.szSizeField ){
					_TRACE("db-query:"+szFieldsA[j]+" found [size] at "+j);
					this.nSizeFieldIndex = j;
				}
			}
			// for alpha by value
			if (this.szAlphaField){
				if (szFieldsA[j] == this.szAlphaField ){
					_TRACE("db-query:"+szFieldsA[j]+" found [alpha] at "+j);
					this.nAlphaFieldIndex = j;
				}
			}
			if (this.szAlphaField100){
				if (szFieldsA[j] == this.szAlphaField100 ){
					_TRACE("db-query:"+szFieldsA[j]+" found [alpha100] at "+j);
					this.nAlphaField100Index = j;
				}
			}
		}
	}
	for (  k=0; k<this.szFieldsA.length;k++ ){
		if (this.nFieldIndexA[k] < 0){
			if ( !((this.szFieldsA[k] == "$item$") || (this.szFieldsA[k] == "$index$")) ){
				_ERROR("error: "+this.szFieldsA[k]+" not found in "+this.szName+" !" );
			}
			this.szName = "";
		}
	}
	return true;
};





// .............................................................................
// MapTheme   
// .............................................................................

/**
 * This is the MapTheme class.  
 * It realizes an object for map themes (colorized shapes, charts, ...)
 * @constructor
 * @parameter mapThemes the map layer(themes) to include into the new map theme
 * @parameter szField the name of the field to take the value
 * @parameter szField100 the name of the field to take the fraction value (for % analysis)
 * @parameter szFlag defines the type of the theme and representation details
 * @parameter colorScheme defines the colors to visualize the map theme; the number of colors in the scheme defines the number of classes (bars, pieparts, etc.)
 * @parameter szTitle title text to be displayed in the info pane of the map theme
 * @throws 
 * @return A new MapTheme object
 */
function MapTheme(szThemes,szFields,szField100,szFlag,colorScheme,szTitle,szLabelA) {

	var i;

	this.fDone = false;

	/** minimum value (found) of the theme */
	this.nMin = 300000000;
	/** maximum value (found) of the theme */
	this.nMax = 0;
	/** sum of all values (found) of the theme */
	this.nSum = 0;
	/** number of values of the theme */
	this.nCount = 0;
	/** number of no data values of the theme */
	this.nNoData = 0;

	this.szThemes = szThemes;
	this.szThemesA = szThemes.split('|');

	this.checkTheme();

	this.objThemesA = new Array(0);

	this.szFields = szFields;
	this.szFieldsA = szFields.split('|');
	this.szField100 = szField100;

	this.nFieldsA = new Array(0);
	this.nFields100A = new Array(0);
	this.nFieldsSelectionA = new Array(0);

	this.nMinA = new Array(0);
	this.nMaxA = new Array(0);
	this.nSumA = new Array(0);
	this.nMeanA = new Array(0);
	this.nMedianA = new Array(0);
	this.nDeviationA = new Array(0);
	this.nOrigMinA = new Array(0);
	this.nOrigMaxA = new Array(0);
	this.nOrigSumA = new Array(0);
	for ( i=0; i<this.szFieldsA.length; i++ ){
		this.nMinA[i] = 300000000;
		this.nMaxA[i] = 0;
		this.nSumA[i] = 0;
		this.nOrigMinA[i] = 300000000;
		this.nOrigMaxA[i] = 0;
		this.nOrigSumA[i] = 0;
		this.nMedianA[i] = 0;
		this.nMeanA[i] = 0;
	}
	this.nMin100 = 300000000;
	this.nMax100 = 0;
	this.nSum100 = 0;

	// GR 03.08.2007 size by sizefield
	this.nMinSize = 300000000;
	this.nMaxSize = 0;
	this.nSumSize = 0;

	// GR 22.09.2013 alpha by alphafield
	this.nMinAlpha = 300000000;
	this.nMaxAlpha = 0;
	this.nSumAlpha = 0;

	this.szDominantFilter = null;
	this.nDominantDFilter = null;

	this.nFilterA = new Array(0);

	this.dbTableA = new Array(0);
	this.dbFieldsA = new Array(0);
	this.dbRecordsA = new Array(0);

	// GR 10.10.2006 copy the array to be independent from caller
	/** the colorscheme defined for the theme */
	if (colorScheme){
		this.origColorScheme = new Array(0);
		for ( i in colorScheme ){
			this.origColorScheme[i] = colorScheme[i];
		}
	}
	else{
		this.origColorScheme = null;
	}
	/** a default colorscheme, used if no colorscheme defined */
	this.defaultColorScheme = new Array("#008888","#00aaaa","#00cccc","#00eeee","#00ffff" );
	/** a textstring used as title for the info pane */
	this.szTitle = szTitle?szTitle:szThemes + " ["+szFields+"]";
	this.szTitle = map.Dictionary.getLocalText(this.szTitle);
	this.szTitle = (this.szTitle.length > 60)?(this.szTitle.slice(0,50) + " ..."):this.szTitle;
	/** textstrings used as value unit */
	this.szUnits = "";
	/** textstrings used as unit for size value display */
	this.szSizeValueUnits = null;
	/** textstrings used as unit for alpha value display */
	this.szAlphaValueUnits = null;
	/** textstrings used as value unit */
	this.szXaxisA = null;
	/** textstrings to be used as legend label */
	this.szLabelA = szLabelA;
	/** textstrings preserve the original label */
	this.szOrigLabelA = szLabelA;
	/** textstrings to store the really used legend label */
	this.szLegendLabelA = new Array(0);
	/** textstrings to hold flags for the legend style */
	this.szLegendStyle = "";
	/** evidence sigle shapes by highlight, or by fading out th other */
	this.evidenceMode = "isolate";
	/** method to aggregate theme values, for overviewcharts and selections */
	this.szAggregation = "mean";
	/** all values found */
	this.nValuesA = new Array(0);

	/** all exact values (string allowed) defined or generated */
	this.szValuesA = null;
	/** all ranges defined or generated */
	this.szRangesA = null;
	/** all ranges defined or generated */
	this.szExactA = null;

	/** the items of the theme */
	this.itemA = new Array(0);

	/** flag: if true, reload data always */
	this.fDataCache = true;
	/** flag: if true, don't load data */
	this.fEditor = false;
	/** flag: if true, 0 (zero) is a valued */
	this.fNullIsValue = false;
	/** flag: if true, negative values are allowed */
	this.fNegativeValuePossible = false;
	/** running counter to convert stringd (exact values) to number */
	this.nStringToValue = 1;
	/** running counter to convert stringd (exact values) to number */
	this.nStringToValueA = new Array(0);
	/** flag: holds the flag that defines the theme type, info pane style, ...) */
	this.szFlag = szFlag?szFlag:"CHOROPLETHE";
	/** holds the original flag */
	this.szOrigFlag = this.szFlag;
	/** the scaling of the chart objects */
	this.nScale = 1.0;
	/** a refresh timeout in seconds */
	this.nRefreshTimeout = 0;
	/** holds the (created) unique id of the theme */
	this.szId = "theme"+String(Math.random());
	/** holds the type of the theme layer (for paint) */
	this.szShapeType = "polygon";
	var layerInfo = map.Layer.getLayerObj(this.szThemesA[0]);
	if ( layerInfo ){
		this.szShapeType = layerInfo.szType;
		if ( this.szShapeType == "line" && this.szOrigFlag.match(/BUFFER/) ){
			this.szShapeType += "+buffer";
		}
	}
	/** layer not present, maybe scaledepentent */
	this.hiddenLayerA = new Array(0);

	_TRACE("new MapTheme("+szThemes+","+szFields+","+szField100+","+szFlag+","+colorScheme+")");

	// workaround for older style definitions
	if (!this.szFlag.match(/CHART/)){
		if (this.szFlag.match(/PIE/)){
			this.szOverviewChart = "PIE";
		}
		else if (this.szFlag.match(/DONUT/)){
			this.szOverviewChart = "DONUT";
		}
	}
	if (this.szFlag.match(/ZEROISVALUE/)){
		this.fNullIsValue = true;
	}
	if (this.szFlag.match(/NEGATIVEISVALUE/)){
		this.fNegativeValuePossible = true;
	}
	if (this.szFlag.match(/SUM/)){
		this.szAggregation = "sum";
	}
	// GR 16.01.2007 charts must have 0 value
	if (this.szFlag.match(/CHART/)){
		if ( this.szFlag.match(/EXACT/) || this.szFieldsA.length > 1 ) {
			this.fNullIsValue = true;
		}
		// GR 20.09.2011 charts preset with shadow
		if (!this.szFlag.match(/BUFFER/)){
			this.fShadow = this.fOrigShadow = true;
		}
	}
	// GR 25.04.2011 EXACT must have szLabelA
	if (this.szFlag.match(/EXACT/) && !this.szLabelA ){
		this.szLabelA = new Array(0);
	}
	/** if true, the chart drawing will be clipped to the visible map area */
	this.fClipCharts = true;

	/** if true, the chart will be sorted before drawn */
	this.fSortBeforeDraw = true;

	/** if true, color scheme legend classes with no members will be grayed */
	this.fGrayNoMember = true;

	/** minimal duration of one frame */
	this.nClipTimeout = 1000;

	/** array to hold all painted shapes */
	this.paintedShapeNodesA = new Array(0);

	/** flag to define the info style for choroplethe values **/
	this.szChoropletheInfoStyle = map.Themes.szChoropletheInfoStyle;

	/** defines the max number of charts per theme **/
	this.nMaxThemeCharts = map.Themes.nMaxThemeCharts;

	/** defines the max number of shadowed charts per theme **/
	this.nMaxShadowCharts = map.Themes.nMaxShadowCharts;

	/** defines the number of shapes color changes after which the display will be updated **/
	this.nflushPaintShape = map.Themes.nflushPaintShape;

	/** defines the number of charts after which the display will be updated **/
	this.nflushChartDraw = map.Themes.nflushChartDraw;

	/** array to hold all map shape nodes used; used to accellerate */
	this.themeNodesPosA = new Array(0);

}
/**
 * check the theme; check presence of theme layers
 */
MapTheme.prototype.checkTheme = function(){

	if ( !this.szThemesA ){
		return false;
	}
	for ( var i=0; i<this.szThemesA.length; i++) {
		if ( (this.szThemesA[i] == "generic") || map.Layer.isLoaded(this.szThemesA[i]) ){
			return true;
		}
	}
	for ( var i=0; i<this.szThemesA.length; i++) {
		return true;
	}
	this.ErrorMessage = "theme layer not loaded ! zoom in ?";
	return false;
};
/**
 * get the theme definition object
 */
MapTheme.prototype.def = function(){

	return map.Themes.getMapThemeDefinitionObj(this.szId);
};
/**
 * get the theme definition object
 * long form of function name 
 */
MapTheme.prototype.getDefinitionObject = function(){

	return map.Themes.getMapThemeDefinitionObj(this.szId);
};

/**
 * initialize the map theme values
 */
MapTheme.prototype.initValues = function(){

	this.nMin = 300000000;
	this.nMax = 0;
	this.nSum = 0;
	this.nCount = 0;
	this.nNoData = 0;

	for ( var i=0; i<this.szFieldsA.length; i++ ){
		this.nMinA[i] = 300000000;
		this.nMaxA[i] = 0;
		this.nSumA[i] = 0;
		this.nOrigMinA[i] = 300000000;
		this.nOrigMaxA[i] = 0;
		this.nOrigSumA[i] = 0;
		this.nMedianA[i] = 0;
		this.nMeanA[i] = 0;
		this.nDeviationA[i] = 0;
	}

	this.nMin100 = 300000000;
	this.nMax100 = 0;
	this.nSum100 = 0;

	this.itemA = new Array(0);
	this.posItemA = new Array(0);
	this.chartPosA = new Array(0);
	this.exactCountA = new Array(0);
	this.exactSizeA = new Array(0);

	if ( !this.szAggregation ){
		if ( this.szField100 ){
			this.szAggregation = "mean";
		}else{
			this.szAggregation = "sum";
		}
	}
	// GR 24.03.2016 new: aggregation by scale (different aggregation fields with acale lower range)
	// GR 27.01.2017 may be suppressed by maptheme.changeThemeStyle() via this.fSuppressAggregationScale
	// 
	if ( this.szAggregationFieldA && !this.fSuppressAggregationScale ){
		for ( var a=0; a<this.szAggregationFieldA.length; a++ ){
			var lower = Number(this.szAggregationFieldA[a].split(':')[1]);
			if ( lower && (map.Scale.getTrueMapScale()*map.Scale.nZoomScale > lower) ){
				if ( !isNaN(parseFloat(this.szAggregationFieldA[a+1])) ){
					this.nGridWidthPx = parseFloat(this.szAggregationFieldA[a+1]); 
					this.szAggregationField = null;
				}else{
					this.szAggregationField = this.szAggregationFieldA[a+1];
				}
			}
			a++;
		}
	}
	this.fSuppressAggregationScale = false;
	this.nWrongRecordLengthCount = 0;
};
/**
 * realize the map theme
 */
MapTheme.prototype.realize = function(){
	
	_TRACE("== MapTheme.realize()===> ");

	var x = new Date();

	this.fShowProgressBar = false;

	this.initValues();

	if (!this.getFields()){
		this.fRemove = true;
		return;
	}

	if (!this.loadValues()){
		this.fRemove = true;
		return;
	}

	this.timeLoading = new Date() - x;

	this.fAggregate = true;
	if ( ((this.timeLoading > 1000) || this.szFlag.match(/VERBOSE/)) && !this.szFlag.match(/SILENT/) ){
		executeWithMessage("map.Themes.continueExecute();", this.szFlag.match(/AGGREGATE/)?"aggregating":"parsing data");
	}else{
		map.Themes.continueExecute();
	}
};

/**
 * realize the map theme
 */
MapTheme.prototype.realize_aggregate = function(){
	
	_TRACE("== MapTheme.realize_aggregate()===> ");

	var x = new Date();

	_TRACE("++++ distributeValues ---->");
	this.distributeValues();
	_TRACE("++++ done");

	this.timeAggregating = new Date() - x;

	this.fDraw = true;
	if ( (this.timeLoading > 1000 || this.szFlag.match(/VERBOSE/)) && !this.szFlag.match(/SILENT/) ){
		executeWithMessage("map.Themes.continueExecute();","drawing");
	}else{
		map.Themes.continueExecute();
	}
};


/**
 * realize the map theme
 */
MapTheme.prototype.realize_draw = function(){
	
	_TRACE("== MapTheme.realize_draw()===> ");

	_TRACE("++++ get shapes in cache ---->");
	//this.getShapes();
	_TRACE("++++ done");

	this.nDoneCount = 0;
	this.nSkipCount = 0;
	this.nRealizedCount = 0;
	this.nZeroValueCount = 0;
	this.nMissingRangeCount = 0;
	this.nMissingPositionCount = 0;
	this.missedA = [];
	this.nActualFrame = 0;

	var szDrawing = ( this.szFlag.match(/VERBOSE/) )?"drawing":"";

	// make the theme creation 'multitasking'
	// -------------------------------------

	this.mapSleep = new Map.Sleep("map.Themes.continueExecute",this.nflushPaintShape,map.Dictionary.getLocalText(szDrawing));
	this.mapSleep.nCount = this.nCount;
	this.mapSleep.szCancel = "map.Themes.cancelExecute()";
	if ( this.szFlag.match(/CLIP/)){
		this.mapSleep = null;
		this.nClipIncr = 1;
	}

	// the main theme creation is here
	// -------------------------------

	if ( this.szFlag.match(/CHART/)){
		if (this.mapSleep){
			this.mapSleep.initCheckSleep(this.nflushChartDraw,szDrawing);
		}
		this.chartMap();
	}
	else{
		this.unlabelMap();
		this.paintMap();
		this.makeVisible();
	}
	this.isChecked = true;

	// -------------------------------

	if ( this.szFlag.match(/BUFFER/)){
		map.Themes.activeBuffer = this;
	}else{
		map.Themes.activeTheme = this;
	}
	// notify HTML user about the actual theme
	try{
		HTMLWindow.ixmaps.htmlgui_setActualTheme(this.szId);
	}
	catch (e){
	}

	if ( !( this.szFlag.match(/CHART/) ) ||
		  ( this.szFlag.match(/BUBBLE/)	|| this.szFlag.match(/SQUARE/) || this.szFlag.match(/SYMBOL/)) || 
		  ( this.szFlag.match(/BAR/) && (this.colorScheme && this.nOrigSumA && this.nOrigSumA.length != this.colorScheme.length))	){
		this.isMarkable = true;
	}else{
		this.isMarkable = false;
	}
};

/**
 * continue realizing the map theme with a given startIndex
 * @param startIndex the next theme part index to ralize 
 * @return void
 */
MapTheme.prototype.realizeContinue = function(startIndex){
	_TRACE("realizeContinue");
	if ( this.fMakeLabel ){
		this.labelMap(startIndex);
	}else
	if ( this.szFlag.match(/CHART/)){
		this.chartMap(startIndex);
	}
	else{
		this.paintMap(startIndex);
	}
};

/**
 * realize the next clip frame,
 * if LOOP is set don't stop at the last frame
 * if BACK is set, step back through frames 
 * @return void
 */
MapTheme.prototype.realizeNextClipFrame = function(){
	_TRACE("realizeNextFrame");
	if ( this.fClipPause ){
		return;
	}
	this.nActualFrame += this.nClipIncr;
	if ( this.nActualFrame >= this.nClipFrames ){
		if ( this.szFlag.match(/BACK/)){
			this.nClipIncr = -this.nClipIncr;
			this.clipTimeout = setTimeout("map.Themes.nextClipFrame('"+this.szId+"')",2000);
			return;
		}
		if ( this.szFlag.match(/LOOP/)){
			this.nActualFrame = -1;
			this.clipTimeout = setTimeout("map.Themes.nextClipFrame('"+this.szId+"')",2000);
			return;
		}else{
			this.nActualFrame = this.nClipFrames-1;
			this.pauseClip();
			return;
		}
	}
	if ( this.nActualFrame < 0 ){
		if ( this.szFlag.match(/BACK/)){
			this.nClipIncr = -this.nClipIncr;
			this.clipTimeout = setTimeout("map.Themes.nextClipFrame('"+this.szId+"')",10);
			return;
		}else{
			this.nActualFrame = 0;
			this.pauseClip();
			return;
		}
	}
	displayMessage("... "+this.nActualFrame+" ...",5000);
	this.mapSleep = null;
	if ( this.szFlag.match(/CHART/)){
		this.chartPosA = new Array(0);
		this.posItemA = new Array(0);
		this.fRedraw = true;
		this.chartMap();
	}
	else{
		this.paintMap();
	}
	this.fRedrawInfo = true;
};

/**
 * realize a specific clip frame,
 * @param the frame number
 */
MapTheme.prototype.setClipFrame = function(n){
	_TRACE("setClipFrame: "+n);
	this.fClipPause = true;
	this.nActualFrame = Math.min(n,this.nClipFrames);
	this.mapSleep = null;
	if ( this.szFlag.match(/CHART/)){
		this.chartPosA = new Array(0);
		this.posItemA = new Array(0);
		this.unpaintMap();
		this.chartMap();
	}
	else{
		this.paintMap();
	}
	this.fRedrawInfo = true;
};

/**
 * continue realizing the map theme with a given startIndex
 * @param startIndex the next theme part index to ralize 
 */
MapTheme.prototype.startClip = function(){
	_TRACE("startClip");
	var pauseButtonNode = SVGDocument.getElementById(this.szId+":display:widget:clippausebutton:button");
	if (pauseButtonNode){
		pauseButtonNode.style.setProperty("display","inline","");
	}
	var startButtonNode = SVGDocument.getElementById(this.szId+":display:widget:clipstartbutton:button");
	if (startButtonNode){
		startButtonNode.style.setProperty("display","none","");
	}
	this.fClipPause = false;
	this.nActualFrame = 0;
	this.realizeNextClipFrame();
};

/**
 * pause realizing the map theme with a given startIndex
 * @param startIndex the next theme part index to ralize 
 */
MapTheme.prototype.pauseClip = function(){
	_TRACE("pauseClip");
	var pauseButtonNode = SVGDocument.getElementById(this.szId+":display:widget:clippausebutton:button");
	if (pauseButtonNode){
		pauseButtonNode.style.setProperty("display","none","");
	}
	var startButtonNode = SVGDocument.getElementById(this.szId+":display:widget:clipstartbutton:button");
	if (startButtonNode){
		startButtonNode.style.setProperty("display","inline","");
	}
	this.fClipPause = true;
};

/**
 * finish realizing the map theme 
 */
MapTheme.prototype.realizeDone = function(){
	if ( this.nRefreshTimeout ){
		setTimeout("map.Themes.refreshTheme('"+this.szId+"')",this.nRefreshTimeout);
	}
	if ( this.szFlag.match(/CLIP/) ){
		if ( this.clipTimeout ){
			clearTimeout(this.clipTimeout);
		}
		this.clipTimeout = setTimeout("map.Themes.nextClipFrame('"+this.szId+"')",(this.nActualFrame?this.nClipTimeout:2000));
	}
	clearMessage();
	if (this.nWrongRecordLengthCount && fDebug){
		displayMessage("Data Error:  "+this.nWrongRecordLengthCount+" items have wrong record length",10000,"notify");
	}
	this.fRedraw = false;
	this.fRealize = false;
	this.fDone = true;
	map.Themes.realizeDone(this);
};

/**
 * do all things before drawing on the map
 */
MapTheme.prototype.beginDraw = function(){
	if ( !this.fOverviewMap ){
		this.fOverviewMap = map.Zoom.hideOverviewMap();
	}
};
/**
 * do all things after drawing on the map
 */
MapTheme.prototype.endDraw = function(){
	if ( this.fOverviewMap ){
		map.Zoom.showOverviewMap();
		this.fOverviewMap = false;
	}
};

/**
 * redraw the map theme
 * @param fEnable if true, get the theme into forground  
 */
MapTheme.prototype.redraw = function(fEnable){

	_TRACE("MapTheme.redraw() =====>");

	// GR 07.11.2013 remove clip rtimeout !
	if ( this.clipTimeout ){
		clearTimeout(this.clipTimeout);
	}
	// GR 18.04.2011 see loadValues()
	if ( this.fDataIncomplete && (this.__themeNodes != map.Themes.themeNodes) ){
		_TRACE("here we load again!");
		this.fDataIncomplete = false;
		this.initValues();
		this.loadValues();
		this.distributeValues();
	}

	if ( this.szFlag.match(/CHART/)){
		if ( (this.fClipCharts && this.nSkipCount) || this.fRedraw ){ // && !this.szFlag.match(/EXACT/)){
			_TRACE("skip="+this.nSkipCount);
			this.nSkipCount = 0;
			this.nDoneCount = 0;
			this.nRealizedCount = 0;
			this.nZeroValueCount = 0;
			this.nMissingRangeCount = 0;
			this.nMissingPositionCount = 0;
			if ( 0 && this.szFlag.match(/EXACT/) ){
				for ( i=0; i<this.partsA.length; i++ ){
					this.partsA[i].nCount = 0;
					this.partsA[i].nSum = 0;
				}
			}
			this.chartMap();
		}
		if ( fEnable ){
			this.enable();
		}
	}
	else{
		if ( this.isChecked ){
			if ( this.partsA ){
				for ( i=0; i<this.partsA.length; i++ ){
					this.partsA[i].nCount = 0;
					this.partsA[i].nSum = 0;
				}
			}
			if (this.mapSleep){
				this.mapSleep.initCheckSleep(this.nflushPaintShape,"painting map");
			}
			this.makeVisible();
			this.paintMap();
		}
		if ( fEnable ){
			this.enable();
		}
	}
};

/**
 * bring map theme to front
 */
MapTheme.prototype.toFront = function(){
	if ( 0 && (map.Themes.activeTheme == this) ){
		this.enable();
		return;
	}
	_TRACE("toFront !!!!! " + this.szId);
	if ( this.szFlag.match(/CHART/)){
		this.chartGroup.parentNode.appendChild(this.chartGroup);

		// GR 21.01.2011 work around to force the browserb to re-render 
		// due to an Chrome error; mixing up chart positions after the re-append
		if ( (matrixA = getMatrix(this.chartGroup)) ){
			setMatrix(this.chartGroup,matrixA);
		}

//		this.fRedrawInfo = true;
		this.enable();
	}
	else{
		if ( this.isChecked ){
			for ( i=0; i<this.partsA.length; i++ ){
				this.partsA[i].nCount = 0;
				this.partsA[i].nSum = 0;
			}
			if (this.mapSleep){
				this.mapSleep.initCheckSleep(this.nflushPaintShape,"painting map");
			}
			this.paintMap();
		}else{
			this.enable();
		}
	}
};

/**
 * find the indices of all fields of the theme
 */
MapTheme.prototype.getFields = function(){

	_TRACE("== MapTheme.getFields()===> ");

	for (var i=0; i<this.szThemesA.length;i++){
		
		var szTheme = this.szThemesA[i];

		this.objThemesA[szTheme] = new ObjTheme(szTheme,i,this.coTable,this.szSelectionField,this.szItemField);
		this.objThemesA[szTheme].theme = this;
		if ( !this.objThemesA[szTheme].getFields() ){
//			displayMessage("Data '"+this.coTable+"' not found!",2000,true);
			try{
				HTMLWindow.ixmaps.htmlgui_onErrorTheme(szTheme);
			}catch (e){}
			return false;
		}
	}
	_TRACE("== done === ");
	return true;
};

/**
 * add the values of one item and calcolate min,max and sums
 * its a 'big' function that does a lot of calculations 
 * @parameter szId the id of the corresponding map shape
 * @parameter nValueA the array of values
 * @parameter nValue100 an optional value for the 100%
 * @parameter nValueSize an optional value to size the theme chart 
 * @parameter nValueAlpha an optional value for the theme opacity
 */
MapTheme.prototype.addItemValues = function(szId,nValuesA,nValue100,nValueSize,nValueAlpha){

	// short way !!!
	// ------------
	if ( this.szFlag.match(/RAW/) && !(nValue100|nValueSize|nValueAlpha) ){

		this.itemA[szId] = {nOrigValuesA:[],nValuesA:nValuesA,nValue100:nValue100,nValueSum:0};

		if ( !this.szFlag.match(/AGGREGATE/) ){
			for ( i=0; i<nValuesA.length; i++ ){
				this.nMin = Math.min(this.nMin,nValuesA[i]);
				this.nMax = Math.max(this.nMax,nValuesA[i]);
				this.nSum += nValuesA[i];

				if ( this.__fExact && this.exactCountA ){
					if ( nValuesA[i] ){
						if (this.exactCountA[nValuesA[i]-1]){
							this.exactCountA[nValuesA[i]-1]++;
							this.exactSizeA[nValuesA[i]-1] += this.itemA[szId].nSize||1;
						}else{
							this.exactCountA[nValuesA[i]-1] = 1;
							this.exactSizeA[nValuesA[i]-1] = this.itemA[szId].nSize||1;
						}
					}
				}
			}
		}
		
		this.nCount++;
		return;
	}
	// ------------

	var i;

	// GR 20.08.2008 handle lookup values to exclude 
	if ( this.szExcludeA ){
		for ( i=0; i<this.szExcludeA.length; i++ ){
			if ( szId.split("::")[1] == this.szExcludeA[i] ){
				return;
			}
		}
	}

	// GR 25.07.2007 QaD test
	/**
	if ( this.szFlag.match(/BUFFER/) && this.szFlag.match(/CHART/) && this.szFields && this.szFields.length && this.szRangesA.length ){
		var fSelect = false;
		for ( i=0; i<rangesA.length; i++ ){
			if ( (nValuesA[0] == this.szRangesA[i]) || (Number(nValuesA[0]) == Number(this.szRangesA[i])) ){
				fSelect = true;
			}
		}
		if ( !fSelect){
			return;
		}
	}
	**/

	// GR 30.08.2007 check minimum for nValue100
	if ( this.nField100Min && nValue100 && (nValue100 < this.nField100Min) ){
		return;
	}
	// GR 20.01.2010 check minimum for values
	if ( this.nMinValue && nValuesA && !nValue100 ){
		var fMinValueOk = false;
		for ( var i=nValuesA.length-1;i>=0;i-- ){
			if ( nValuesA[i] >= this.nMinValue ){
				fMinValueOk = true;
			}
		}
		if ( !fMinValueOk ){
			return;
		}	
	}
	// GR 24.08.2007 calcolate density = value per area
	var nArea = 1;
	if ( this.__fDensity || this.__fDensityAlpha ){
		nArea = this.getNodeArea(szId);
		if ( !nArea && this.__fTiledLayer ){
			this.fDataIncomplete = true;
			return;
		}
	}
	// GR 23.10.2007 weighted values
	if ( this.szWeights ){
		for ( var i=0; i<nValuesA.length; i++ ){
			nValuesA[i] *= (this.szWeightsA[i]||this.szWeightsA[0]);
		}
	}
	// GR 23.10.2007 calcolate auto sum 100
	if ( this.__fAuto100 ){
		var i;
		nValue100 = 0;
		for ( i=0; i<nValuesA.length; i++ ){
			nValue100 += nValuesA[i] || 0;
		}
		this.fField100 = true;
	}

	// ------------------------------------------------------------------------------------

	this.itemA[szId] = {nOrigValuesA:[],nValuesA:nValuesA,nValue100:nValue100,nValueSum:0};

	// ------------------------------------------------------------------------------------

	for ( var i=0; i<nValuesA.length; i++ ){

		this.itemA[szId].nOrigValuesA[i] = !isNaN(nValuesA[i])?nValuesA[i]:0;

		// GR 04.04.2011
		this.itemA[szId].nValueSum += nValuesA[i];
		
		if (this.fField100){
			if (nValue100){
				var nValue = nValuesA[i];
				// fieldname starting with '!'
				if (nValue == 0 && !this.szFlag.match(/ZEROISVALUE/) ){
					nValue = 0;
				}
				else
				if (this.szFieldsA[i].substr(0,1) == "!"){
					nValue = nValue100-nValue;
					this.itemA[szId].nOrigValuesA[i] = nValue;
				}
				else
				if (this.szFlag.match(/CALCVAL/) || this.szFlag.match(/CALC100/)){
					nValue = nValue100?Math.round(nValue*nValue100/100):nValue;
					this.itemA[szId].nOrigValuesA[i] = nValue;
				}
				else
				if (this.szFlag.match(/PRODUCT/)){
					nValue = nValue100?nValue*nValue100:nValue;
				}
				else
				if (this.szFlag.match(/DIFFERENCE/) && (nValuesA.length == 1) && !this.szFlag.match(/RELATIVE/) ){
					nValue100 = i>0?nValuesA[i-1]:this.itemA[szId].nValue100;
					nValue = nValue-nValue100;
				}
				else{ 
					nValue = nValue100?nValue/nValue100:1;
					if (this.szFlag.match(/FRACTION/)){
						nValue = nValue*(this.nFractionScale||1);
					}else
					if (this.szFlag.match(/PERMILLE/)){
						nValue = nValue*1000;
					}
					else{
						nValue = nValue*100;
						if ( nValue>0 && this.szFlag.match(/RELATIVE/)){
							nValue -= 100;
						}else
						if ( nValue>0 && this.szFlag.match(/INVERT/)){
							nValue = 100-nValue;
						}else{
							// GR 07.12.2013 to be verified
							//nValue = Math.min(nValue,100);
						}
					}
				}
				nValuesA[i] = nValue;
			}
			else{
				nValuesA[i] = 0;
			}
		}

		// GR 24.08.2007 calcolate density = value per area
		if ( this.__fDensity ){
			nValuesA[i] = nValuesA[i]/nArea;
		}
	}

	if ( this.__fDifference && (nValuesA.length > 1) ){
		for ( var i=0; i<nValuesA.length; i++ ){
			if ( i<nValuesA.length-1 ){
				var nTemp = nValuesA[i];
				nValuesA[i] = nValuesA[i+1] - nValuesA[i];
				if (this.szFlag.match(/RELATIVE/) ){
					nValuesA[i] = 100/nTemp*nValuesA[i];
				}
			}
			else if (!this.szFlag.match(/STACKED/)){
				nValuesA[i] = 0;
			}
		}
		nValuesA.pop();
	}


	for ( var i=0; i<nValuesA.length; i++ ){

		if (!this.nSumA){
			return;
		}
		if (!isNaN(nValuesA[i])){
			this.nMin = Math.min(this.nMin,nValuesA[i]);
			this.nMax = Math.max(this.nMax,nValuesA[i]);
			this.nSum += nValuesA[i];
			this.nMinA[i] = Math.min(this.nMinA[i],nValuesA[i]);
			this.nMaxA[i] = Math.max(this.nMaxA[i],nValuesA[i]);
			this.nSumA[i] += nValuesA[i];
			this.nOrigMinA[i]  = Math.min(this.nOrigMinA[i],this.itemA[szId].nOrigValuesA[i]);
			this.nOrigMaxA[i]  = Math.max(this.nOrigMaxA[i],this.itemA[szId].nOrigValuesA[i]);
			this.nOrigSumA[i] += this.itemA[szId].nOrigValuesA[i];
		}
		if (nValuesA[i] < 0){
			this.fNegativeValues = true;
		}
	}

	if (!isNaN(nValue100)){
		this.nMin100 = Math.min(this.nMin100,nValue100);
		this.nMax100 = Math.max(this.nMax100,nValue100);
		this.nSum100 += nValue100;
	}

	// handle size value
	if ( nValueSize && this.szSizeField ){
		if (!isNaN(nValueSize)){
			this.itemA[szId].nSize = nValueSize;
			this.nMinSize = Math.min(this.nMinSize,nValueSize);
			this.nMaxSize = Math.max(this.nMaxSize,nValueSize);
			this.nSumSize += nValueSize;
		}
	}
	// handle alpha value
	if ( this.szAlphaField && (nValueAlpha!=null) && !isNaN(nValueAlpha) ){
		if ( this.__fDensityAlpha ){
			if ( nArea ){
				nValueAlpha = nValueAlpha/nArea;
				nValueAlpha = Math.min(nValueAlpha,50000);
			}else{
				nValueAlpha = 0;
			}
		}
		this.itemA[szId].nAlpha = nValueAlpha;
		this.nMinAlpha = Math.min(this.nMinAlpha,nValueAlpha);
		this.nMaxAlpha = Math.max(this.nMaxAlpha,nValueAlpha);
		this.nSumAlpha += nValueAlpha;
	}

	if ( this.__fExact && this.exactCountA ){
		for ( var i=0; i<nValuesA.length; i++ ){
			// GR 16.04.2011
			if ( nValuesA[i] ){
				if (this.exactCountA[nValuesA[i]-1]){
					this.exactCountA[nValuesA[i]-1]++;
					this.exactSizeA[nValuesA[i]-1] += this.itemA[szId].nSize||1;
				}else{
					this.exactCountA[nValuesA[i]-1] = 1;
					this.exactSizeA[nValuesA[i]-1] = this.itemA[szId].nSize||1;
				}
			}
		}
	}

	this.nCount++;
};

//...................................................................
// we need to translate string values into numbers (for EXACT themes)
// therefore we use an array of 'string value'/'numeric index' pairs
//...................................................................

/**
 * get the index for a string value
 * if index not yet associated, create new value / index pair 
 * @parameter szValue the string value 
 * @parameter szFlag if 'set', the value is added to the string/value array if not exixts
 * @type number
 * @return associated index
 */
MapTheme.prototype.getStringValueIndex = function(szValue,szFlag){

	if ( (szValue.length == 0) || (szValue == " ") ){
		if ( this.szFlag.match(/UNDEFINEDISVALUE/) ){
			szValue = "undefined";
		}else{
			return -1;
		}
	}
	if ( this.szFlag.match(/IGNORECASE/) ){
		szValue = szValue.toUpperCase();
	}
	// add szValue/index pairs, only if no szValuesA array given or flag "set" is true
	// so create on init, it values are given, or on data load, if not 
	//
	if ( ( typeof(this.nStringToValueA[szValue] ) == 'undefined') &&
		 ( !this.szValuesA || !this.szValuesA.length || szFlag == "set" )					){

		// make new entry
		//

		// create arrays, if null
		this.szLabelA = this.szLabelA || [];
		this.szExactA = this.szExactA || [];

		this.nStringToValueA[szValue] = this.nStringToValue;
		// set Label for the value, if not yet given
		this.szLabelA[this.nStringToValue-1] = this.szLabelA[this.nStringToValue-1] || szValue;
		// add index to ranges, for EXACT themes 
		this.szExactA.push(this.nStringToValue);
		// next possibel index 
		this.nStringToValue++;
	}
	return this.nStringToValueA[szValue];
};

//...................................................................
// helper
//...................................................................

MapTheme.prototype.checkHiddenLayerState = function(){
	for ( i=0; i<this.szThemesA.length;i++){
		if (  map.Layer.isScaleDependentLayer(this.szThemesA[i]) ){
			 if ( this.hiddenLayerA[this.szThemesA[i]] && map.Layer.isScaleDependentLayerOn(this.szThemesA[i]) ){
				 return true;
			 } else 
			 if ( !this.hiddenLayerA[this.szThemesA[i]] && !map.Layer.isScaleDependentLayerOn(this.szThemesA[i]) ){
				 return true;
			 }
		}
	}
	return false;
};

//...................................................................
// local helper
//...................................................................

 __scanValue = function(nValue){
    // strips blanks inside numbers (e.g. 1 234 456 --> 1234456)
	if ( String(nValue).match(/,/) ){
		return parseFloat(String(nValue).replace(/\./gi,"").replace(/,/gi,"."));
	}else{
		return parseFloat(String(nValue).replace(/ /gi,""));
	}
 };

/**
 * load the values of the map theme from the map
 * @type boolean
 * @return true if all theme values could be loaded 
 */
MapTheme.prototype.loadValues = function(){

	_TRACE("== MapTheme.loadValues()===> ");

	this.nMissingLookupCount = 0;

	// get some process flags here once to fasten execution
	// -----------------------------------------------
	this.__fExact			= (this.szFlag.match(/EXACT/));
	this.__fDifference		= (this.szFlag.match(/DIFFERENCE/));
	this.__fFilter			= (this.szFilter && this.szFilter.length);
	this.__fDensity			= (this.szFlag.match(/DENSITY/));
	this.__fDensityAlpha	= (this.szAlphaField100 && this.szAlphaField100.match(/\$density\$/i));
	this.__fAuto100			= (this.szFlag.match(/AUTO100/) &&  !this.szFlag.match(/AGGREGATE/));
	this.__fTiledLayer		= (map.Layer.getLayerObj(this.szThemesA[0])?map.Layer.getLayerObj(this.szThemesA[0]).szFlag.match(/tiled/):false);

	this.__themeNodes       = map.Themes.themeNodes;

	for ( i=0; i<this.szThemesA.length;i++){

		if (  map.Layer.isScaleDependentLayer(this.szThemesA[i]) && 
			 !map.Layer.isScaleDependentLayerOn(this.szThemesA[i]) ){
			this.hiddenLayerA[this.szThemesA[i]] = true;
			this.fReload = true;
			continue;
		}else{
			this.hiddenLayerA[this.szThemesA[i]] = false;
		}

		// no external data, do this
		// -------------------------
		if ( !this.objThemesA[this.szThemesA[i]].dbTable ){
			return this.loadValuesFromMap();
		}

		// load external data
		// --------------------------------		
		if ( !this.loadValuesOfTheme(this.szThemesA[i]) ){
			return false;
		}
		// --------------------------------	
		
	}
	return true;
}

/**
 * applicate filter to one theme item
 * @parameter j the index (data row) of the item to check
 * @type boolean
 * @return true if item passes the filter
 */
MapTheme.prototype.filterValues = function(j){

	if ( this.szFilter.match(/WHERE/) ){

		// first time ?
		// get query parts

		if ( !this.objTheme.filterQueryA ){
			
			var szPartsA = this.szFilter.split('WHERE ')[1].split('AND');
			var szFieldA = [];
			var filterObj = {};

			// test if BETWEEN x AND y and join two parts around AND
			for ( i=0; i<szPartsA.length; i++ ){
				if ( szPartsA[i].match(/BETWEEN/) ){
					szPartsA[i] = szPartsA[i] + "AND" + szPartsA[i+1];
					szPartsA.splice(i+1,1);
				}
			}

			// strip leading or trailing blanks
			for ( i=0; i<szPartsA.length; i++ ){
				szPartsA[i] = szPartsA[i].trim();
			}

			// ok lets create the queries
			this.objTheme.filterQueryA = [];

			for ( var i=0; i<szPartsA.length; i++ ){

				// 1. split string by " " 
				szFieldA = szPartsA[i].split(" ");

				// test for quotes and join the included text parts
				for ( var ii=0; ii<szFieldA.length; ii++ ){
					if ( (szFieldA[ii][0] == '"') && (szFieldA[ii][szFieldA[ii].length-1] != '"') ){
						do{
							szFieldA[ii] = szFieldA[ii] + " " + szFieldA[ii+1];
							szFieldA.splice(ii+1,1);
						}
						while (szFieldA[ii][szFieldA[ii].length-1] != '"');
					}
				}
				// do the same for single quotes 
				for ( var ii=0; ii<szFieldA.length; ii++ ){
					if ( (szFieldA[ii][0] == "'") && (szFieldA[ii][szFieldA[ii].length-1] != "'") ){
						do{
							szFieldA[ii] = szFieldA[ii] + " " + szFieldA[ii+1];
							szFieldA.splice(ii+1,1);
						}
						while (szFieldA[ii][szFieldA[ii].length-1] != "'");
					}
				}

				// no we should have all parts ready
				// ---------------------------------
				// make the query object
				filterObj = {};
				filterObj.szFilterField = szFieldA[0].replace(/("|')/g, "");
				filterObj.szFilterOp	= szFieldA[1];
				filterObj.szFilterValue = szFieldA[2].replace(/("|')/g, "").replace('.','\\.').replace(/\//gi,'\\/');
				if ( (filterObj.szFilterOp == "BETWEEN") && (szFieldA[3] == "AND") ){
					filterObj.szFilterValue2 = szFieldA[4].replace('.','\\.').replace(/\//gi,'\\/');
				}
				// get data table column index for query field
				for ( var ii=0; ii<this.objTheme.dbFields.length; ii++ ){
					if ( this.objTheme.dbFields[ii].id == filterObj.szFilterField ){
						filterObj.nFilterFieldIndex = ii;
					}
				}

				// add the query object
				this.objTheme.filterQueryA.push(filterObj);
			}
		}

		// start filtering
		
		for ( i in this.objTheme.filterQueryA ){

			// get the value to test
			this.__szValue		 = String(this.objTheme.dbRecords[j][this.objTheme.filterQueryA[i].nFilterFieldIndex]);
			this.__szFilterOp	 = this.objTheme.filterQueryA[i].szFilterOp; 
			this.__szFilterValue = this.objTheme.filterQueryA[i].szFilterValue;
			this.__szFilterValue2 = this.objTheme.filterQueryA[i].szFilterValue2;

			// do the query 
			// ------------
			var result = true;
			var nValue = parseFloat(this.__szValue);
			if ( this.__szFilterOp == "=" ){
				result = ( (this.__szValue == this.__szFilterValue) || (nValue == Number(this.__szFilterValue)) );
			}else
			if ( this.__szFilterOp == "<>" ){
				result = !( (this.__szValue == this.__szFilterValue) || (nValue == Number(this.__szFilterValue)) );
			}else
			if ( this.__szFilterOp == ">" ){
				result = ( nValue > Number(this.__szFilterValue) );
			}else
			if ( this.__szFilterOp == "<" ){
				result = ( nValue < Number(this.__szFilterValue) );
			}else
			if ( this.__szFilterOp == ">=" ){
				result = ( nValue >= Number(this.__szFilterValue) );
			}else
			if ( this.__szFilterOp == "<=" ){
				result = ( nValue <= Number(this.__szFilterValue) );
			}else
			if ( this.__szFilterOp == "LIKE" ){
				result = eval("this.__szValue.match(/"+this.__szFilterValue+"/i)");
			}else
			if ( this.__szFilterOp == "IN" ){
				result = eval("this.__szFilterValue.match(/\\("+this.__szValue+"\\,/)") || 
						 eval("this.__szFilterValue.match(/\\,"+this.__szValue+"\\,/)") ||
						 eval("this.__szFilterValue.match(/\\,"+this.__szValue+"\\)/)")
						;
			}else
			if ( (this.__szFilterOp == "BETWEEN") ){
				result = ( (nValue >= Number(this.__szFilterValue)) &&
						   (nValue <= Number(this.__szFilterValue2)) );
			}else {
			// default operator	
				result = eval("this.__szValue.match(/"+this.__szFilterValue+"/i)");
			}
			// exec query result
			if ( !result ){
				return false;
			}
		}
	}else{

		// match with all row cells
		// ------------------------
		this.__szValue = this.objTheme.dbRecords[j].join(' ');
		if ( !eval("this.__szValue.match(/"+this.szFilter+"/i)") ){
			return false;
		}
	}
	return true;
}

/**
 * get the selection id of a theme item
 * this can either be the id of a map feature (SVG node) or a geo position (lat/lon) 
 * @parameter j the index (data row) of the item to check
 * @parameter j the index (data row) of the item to check
 * @type boolean
 * @return true if item passes the filter
 */
MapTheme.prototype.getSelectionId = function(szTheme,j){

	// if we have set the type, fasten the alg 
	// --------------------------------------------
	if ( this.fSelection ){

		if ( this.fSelection.match(/LatLon/) ){

			var lat = Number(this.objTheme.dbRecords[j][this.objTheme.nFieldSelectionIndexA[0]]);
			var lon = Number(this.objTheme.dbRecords[j][this.objTheme.nFieldSelectionIndexA[1]]);
			if ( lat && lon ){
				if ( isNaN(lat) || isNaN(lon) ){
					return null;
				}
				return szTheme+"::"+ (this.objTheme.dbRecords[j][this.objTheme.nFieldSelectionIndexA[0]]+','+this.objTheme.dbRecords[j][this.objTheme.nFieldSelectionIndexA[1]]) + (this.szSelectionFieldSuffix||"");
			}
			return null; 
		}

		if ( this.fSelection.match(/MultiPoint/) ){

			szId = this.objTheme.dbRecords[j][this.objTheme.nFieldSelectionIndex];
			var szMA = null;
			if ( (szMA = szId.match(positionRegExp)) ){
				return szTheme+"::"+ (szMA[2] + ',' + szMA[1]) + (this.szSelectionFieldSuffix||"");
			}
			return null;
		}

		szId = __mpap_decode_utf8(String(this.objTheme.dbRecords[j][this.objTheme.nFieldSelectionIndex]));
		if ( this.fSelectionFieldToUpper ){
			szId = String(szId).toUpperCase();
		}
		return szTheme+"::"+ szId + (this.szSelectionFieldSuffix||"");
	}

	// 1. time, get through it all and set the type 
	// --------------------------------------------

	// GR 02.03.2014 multi selection field, (lat/lon/)
	if ( this.objTheme.nFieldSelectionIndexA && this.objTheme.nFieldSelectionIndexA.length > 1 ){
		this.fSelection = "LatLon";
		return this.getSelectionId(szTheme,j);
	// single selection field 
	}else{
		szId = __mpap_decode_utf8(String(this.objTheme.dbRecords[j][this.objTheme.nFieldSelectionIndex]));
			
		// GR 22.05.2015 geo-json point definition
		if ( szId.match(/MultiPoint/) ){
			this.fSelection = "MultiPoint";
			return this.getSelectionId(szTheme,j);
		}

		// GR 01.07.2007 new style property to force selection to upper case
		if ( this.fSelectionFieldToUpper ){
			szId = String(szId).toUpperCase();
		}
	}

	// final selection id
	return szTheme+"::"+ szId + (this.szSelectionFieldSuffix||"");
};


/**
 * load the values of the map theme from the map
 * @parameter szThemeLayer the id of one layer of the theme
 * @type boolean
 * @return true if all values could be loaded
 */
MapTheme.prototype.loadValuesOfTheme = function(szThemeLayer){

	var i;
	var j;
	var k;
	var szId;
	var szSelectionId;
	var nValueA;
	var nValue100;
	var nvalueA;

	_TRACE("== MapTheme.loadValuesOfTheme()===> ");

	this.fField100 = false;
	this.fNegativeValues = false;

	// important !!! ???
	this.szUnit = ((this.szUnits && (this.szUnits.substr(0,1)=='.')) ? "":" ") + (this.szUnits||"");

	var fDone = true;

	this.objTheme = this.objThemesA[szThemeLayer];

	if ( this.objTheme.nField100Index > 0 ){
		this.fField100 = true;
	}

	if (this.objTheme.dbTable && szThemeLayer && szThemeLayer.length ){
		if ( this.coTable ){
			try{
				eval("this.objTheme.dbRecords = "+this.coTable+".records");
			}
			catch (e){
				eval("this.objTheme.dbRecords = "+this.coTable+"_records");
			}
			if ( !this.objTheme.dbRecords ){
				displayMessage("Data "+this.coTable+" could not be loaded!",2000,true);
				return false;
			}
		}
		else{
			try{
				eval("this.objTheme.dbRecords = "+szThemeLayer+".records");
			}
			catch (e){
				eval("this.objTheme.dbRecords = "+szThemeLayer+"_records");
			}
		}

		_TRACE("coTable: "+this.objTheme.dbRecords.length+" records");

		if ( !this.objTheme.nFieldSelectionIndexA.length ){
			this.objTheme.nFieldSelectionIndexA == null;
		}


		// if we have number values, 
		// test parseFloat() contro __scanValue()
		// to include . or , decimals 
		// test 40 values, if find difference in one, set  this.__fScanValue = true; 
		//
		if ( (this.szFieldsA[0] != "$item$") && !this.szFlag.match(/EXACT/) ){
			var maxTest = Math.min(40,this.objTheme.dbRecords.length);
			for ( j=0; j<maxTest; j++ ){
				if ( this.objTheme.dbRecords[j] ){
					for ( k=0; k<this.szFieldsA.length; k++ ){
						var nValue = this.objTheme.dbRecords[j][this.objTheme.nFieldIndexA[k]];
						if ( __scanValue(nValue) != parseFloat(nValue) ){
							this.__fScanValue = true;
							_TRACE("this.__fScanValue = "+this.__fScanValue);
							j = maxTest;
							break;
						}
					}
				}
			}
		}

		
		// -----------------------------------------------
		// loop over the records
		// -----------------------------------------------

		for ( j=0;j<this.objTheme.dbRecords.length;j++ ){

			if ( j%10000 == 0 ){
				_TRACE(this.szFlag+','+j);
			}

			if ( !this.objTheme.dbRecords[j] || (this.objTheme.dbRecords[j].length < this.objTheme.dbFields.length) ){
				this.nWrongRecordLengthCount++;
				continue;
			}

			if ( this.__fFilter && !this.filterValues(j) ){
				continue;
			}

			// the value(s)
			// ----------------------

			nValueA = [];

			if ( this.szFieldsA[0] == "$item$" ){
				nValueA[0] = 1;
			}else
			if ( this.szFieldsA[0] == "$index$" ){
				nValueA[0] = (j+1);
			}else{
				for ( k=0; k<this.szFieldsA.length; k++ ){

					var nValue = this.objTheme.dbRecords[j][this.objTheme.nFieldIndexA[k]];

					if ( this.__fExact ){
						nValue = this.getStringValueIndex(String(nValue));
					}else
					if ( this.__fScanValue ){
						// GR 17.01.2014 strip all blancs ( es. 12 345 456.34 --> 12345456.34 )
						nValue = __scanValue(nValue);
					}else{
						nValue = parseFloat(nValue);
					}
					if (isNaN(nValue)){
						continue;
					}
					if ( nValue==0 && !this.fNullIsValue ){
						continue;
					}
					if ( nValue<0 && !this.fNegativeValuePossible ){
						continue; 
					}
					nValueA[k] = nValue;
				}
			}
			nValueA.length = this.szFieldsA.length;

			// handle 100 value field 
			// ----------------------

			if ( this.szField100 == "$item$" ){
				nValue100 = 1;
			}else{
				nValue100 = (this.objTheme.nField100Index<0) ? 0 : __scanValue(this.objTheme.dbRecords[j][this.objTheme.nField100Index]);
			}
			if ( nValue100==0 && !this.fNullIsValue ){
				nValue100 = null;
			}
			if ( nValue100<0 && !this.fNegativeValuePossible ){
				nValue100 = null;
			}

			// handle explizit size field 
			// ----------------------
			var nValueSize = null;
			if ( this.szSizeField ){
				nValueSize = __scanValue((this.objTheme.dbRecords[j][this.objTheme.nSizeFieldIndex]));
			}
			// GR 22.09.2013
			// handle explizit alpha field 
			// ----------------------
			var nValueAlpha = null;
			if ( this.szAlphaField ){
				nValueAlpha = __scanValue((this.objTheme.dbRecords[j][this.objTheme.nAlphaFieldIndex]));
				if (isNaN(nValueAlpha)){
					nValueAlpha = 0;
				}
				//_TRACE(nValueAlpha);
			}
			if ( this.szAlphaField100 ){
				if ( this.objTheme.nAlphaField100Index ){
					nValueAlpha = 100/__scanValue((this.objTheme.dbRecords[j][this.objTheme.nAlphaField100Index]))*nValueAlpha;
					if (isNaN(nValueAlpha)){
						nValueAlpha = 0;
					}
				}
			}

			// --------------------------------------------------
			// the selection field -> id -> map shape or position
			// --------------------------------------------------

			szSelectionId = szId = this.getSelectionId(szThemeLayer,j);

			if ( !szSelectionId ){
				this.nMissingLookupCount++;
				continue;
			}

			// --------------------------------
			// ok, we have a selection/position
			// --------------------------------

			// GR 08.04.2011 new nFieldItemIndex to define different fields for chart id and (position) lookup id
			// ---------------------------------------------------------------------------------------------------
			if ( (this.objTheme.nFieldItemIndex >= 0) && (this.objTheme.nFieldItemIndex != this.objTheme.nFieldSelectionIndex) ){
				szId = __mpap_decode_utf8(String(this.objTheme.dbRecords[j][this.objTheme.nFieldItemIndex]));
				if ( this.fSelectionFieldToUpper ){
					szId = String(szId).toUpperCase();
				}
				szId = szThemeLayer+"::"+szId;
			}

			// make unique items !!!
			// -----------------------
			if(this.itemA[szId]){
				szId += "*" + Math.random(); 
				if(this.itemA[szId]){
					continue;
				}
			}

			this.addItemValues(szId,nValueA,nValue100,nValueSize,nValueAlpha);
			
			// if item added; GR 20.01.2010
			if ( this.itemA[szId] ){
				// add text value
				if ( this.szValueField ){
					this.itemA[szId].szValue = (this.szValueField == "$index$")?(j+1):__mpap_decode_utf8((this.objTheme.dbRecords[j][this.objTheme.nValueFieldIndex]));
				}
				// add label value
				if ( this.szLabelField ){
					this.itemA[szId].szLabel = (this.szValueField == "$index$")?(j+1):__mpap_decode_utf8((this.objTheme.dbRecords[j][this.objTheme.nLabelFieldIndex]));
				}
				// add title value
				if ( this.szTitleField ){
					this.itemA[szId].szTitle = __mpap_decode_utf8((this.objTheme.dbRecords[j][this.objTheme.nTitleFieldIndex]));
				}
				// add snippet value
				if ( this.szSnippetField ){
					this.itemA[szId].szSnippet = __mpap_decode_utf8((this.objTheme.dbRecords[j][this.objTheme.nSnippetFieldIndex]));
				}
				// add selection id if this.nFieldItemIndex >= 0 (item id differs from selection id))
				if ( szSelectionId ){
					this.itemA[szId].szSelectionId = szSelectionId;
				}else{
					this.itemA[szId].szSelectionId = szId;
				}
				// add aggregation value
				if ( this.szAggregationField ){
					this.itemA[szId].szAggregation = __mpap_decode_utf8((this.objTheme.dbRecords[j][this.objTheme.nAggregationFieldIndex]));
				}
				// store data source row
				this.itemA[szId].dbIndex = j;
			}
		}
	}
	else{
		fDone = false;
	}

	if ( fDone ){
		_TRACE("coTable: "+this.nMissingLookupCount+" lookups missing");
		_TRACE("coTable: "+(100-this.nMissingLookupCount/this.objTheme.dbRecords.length*100).toFixed(2) + " % mapped");

		_TRACE("== done with js data loaded === ");
		return true;
	}
}


/**
 * load the values of the map theme from the map meta data
 * the meta data is stored in attributes of the items SVG element 
 */
MapTheme.prototype.loadValuesFromMap = function(){

	var i;
	var j;
	var k;
	var szId;
	var szSelectionId;
	var nValueA;
	var nValue100;
	var nvalueA;

	_TRACE("== MapTheme.loadValues()===> ");

	this.fField100 = false;
	this.fNegativeValues = false;

	this.szUnit = " " + (this.szUnits||"");

	// get values
	var nodeA = new Array(0);

	// GR 20.08.2007 accellerate value loading for untiled layer
	var valueRootNodeA = new Array();
	for ( var iTheme=0; iTheme<this.szThemesA.length; iTheme++){

		var szTheme = this.szThemesA[iTheme];
		this.objTheme = this.objThemesA[szTheme];

		var layerObj = map.Layer.getLayerObj(this.szThemesA[iTheme]);
		if ( layerObj == null ){
			alert("MapTheme error: no layer like '"+this.szThemesA[iTheme]+"'");
			return false;
		}
		if (layerObj.szFlag.match(/tiled/)){
			valueRootNodeA[0] = map.Scale.canvasNode;
			valueRootNodeA.length = 1;
			// GR 18.04.2011 check if all tiles loaded
			this.fDataIncomplete = !map.Tiles.allTilesLoaded();
			break;
		}else{
			valueRootNodeA[valueRootNodeA.length] = SVGDocument.getElementById(layerObj.szName);
		}
	}

	var __fIdInParent = true;
	for ( var iRoot=0; iRoot < valueRootNodeA.length; iRoot++){
		var childsA = valueRootNodeA[iRoot].getElementsByTagName('path');
		var childsB = valueRootNodeA[iRoot].getElementsByTagName('use');
		var childsC = valueRootNodeA[iRoot].getElementsByTagName('circle');

		for ( i=0; i<childsA.length; i++){
			nodeA[nodeA.length] = childsA.item(i);
		}
		for ( i=0; i<childsB.length; i++){
			nodeA[nodeA.length] = childsB.item(i);
		}
		for ( i=0; i<childsC.length; i++){
			nodeA[nodeA.length] = childsC.item(i);
		}
	}

	// GR 07.10.2013 if no shapes present (flag NOSHAPE), search in <g> elements 
	if ( nodeA.length == 0 ){
		__fIdInParent = false;
		for ( var iRoot=0; iRoot < valueRootNodeA.length; iRoot++){
			var childsA = valueRootNodeA[iRoot].getElementsByTagName('g');
			for ( i=0; i<childsA.length; i++){
				nodeA[nodeA.length] = childsA.item(i);
			}
		}
	}

	for ( i=0;i<nodeA.length;i++ ){
		if (nodeA[i].nodeType == 1 && nodeA[i].hasAttributeNS(szMapNs,"info") ){

			szId = __fIdInParent?nodeA[i].parentNode.getAttributeNS(null,"id"):nodeA[i].getAttributeNS(null,"id");
			var fMatch = -1;
			if ( szId && (szId.length !== 0) ){
				var szTest = map.Tiles.getMasterId(szId).split(':')[0];
				for ( j=0; j<this.szThemesA.length; j++){
					if ( szTest == this.szThemesA[j] ){
						fMatch = j;
					}
				}
			}
			// one tile representation of a shape is sufficient
			var szMasterId = map.Tiles.getMasterId(szId);
			if(this.itemA[szMasterId]){
				continue;
			}

			if ( fMatch >=0 ){
				var infoA = nodeA[i].getAttributeNS(szMapNs,"info").split('|');
				nValueA = new Array(0);
				nValue100 = (this.objTheme.nField100Index<0) ? 0 : Number(infoA[this.objThemesA[this.szThemesA[fMatch]].nField100Index]);
				if ( nValue100==0 && !this.fNullIsValue ){
					nValue100 = null;
				}
				if ( nValue100<0 && !this.fNegativeValuePossible ){
					nValue100 = null;
				}

				// GR 25.07.2007 QaD test
				if ( this.szFlag.match(/CHART/) && this.szFlag.match(/BUFFER/) ){
					if ( this.szFields && this.szRangesA && this.szRangesA.length ){
						nValueA[0] = infoA[this.objThemesA[this.szThemesA[fMatch]].nFieldIndexA[0]];
					}
					else{
						nValueA[0] = this.nBufferSize;
						this.nCount = 1;
					}
				}
				else{
					for ( k=0; k<this.szFieldsA.length; k++ ){
						nValue = infoA[this.objThemesA[this.szThemesA[fMatch]].nFieldIndexA[k]];
						var xValue = nValue;
						nValue = Number(nValue);
						if (isNaN(nValue)){
							if ( this.szFlag.match(/EXACT/) ){
								nValue = this.getStringValueIndex(xValue);
							}else{
								continue; 
							}
						}
						if ( nValue==0 && !this.fNullIsValue ){
							continue; 
						}
						if ( nValue<0 && !this.fNegativeValuePossible ){
							continue; 
						}
						nValueA[k] = nValue;
					}
					nValueA.length = this.szFieldsA.length;
				}

				// handle explizit size field 
				var nValueSize = null;
				if ( this.szSizeField ){
					nValueSize = Number(infoA[this.objThemesA[this.szThemesA[fMatch]].nSizeFieldIndex]);
				}

				// GR 22.09.2013
				// handle explizit alpha field 
				var nValueAlpha = null;
				if ( this.szAlphaField ){
					nValueAlpha = Number(infoA[this.objThemesA[this.szThemesA[fMatch]].nAlphaFieldIndex]);
				}
				if ( this.szAlphaField100 ){
					if ( this.objTheme.nAlphaField100Index ){
						nValueAlpha = 100/Number(infoA[this.objThemesA[this.szThemesA[fMatch]].nAlphaField100Index])*nValueAlpha;
						if (isNaN(nValueAlpha)){
							nValueAlpha = 0;
						}
					}
				}

				// GR 08.03.2011
				szMasterId = __mpap_decode_utf8(szMasterId);

				if(this.itemA[szMasterId]){
					continue;
				}
				this.addItemValues(szMasterId,nValueA,nValue100,nValueSize,nValueAlpha);

				if (!this.itemA[szMasterId]){
					continue;
				}

				// add textual value
				if ( this.szValueField ){
					this.itemA[szMasterId].szValue = infoA[this.objThemesA[this.szThemesA[fMatch]].nValueFieldIndex];
				}
				// add label value
				if ( this.szLabelField ){
					this.itemA[szMasterId].szLabel = infoA[this.objThemesA[this.szThemesA[fMatch]].nLabelFieldIndex];
				}
				// add title value
				if ( this.szTitleField ){
					this.itemA[szMasterId].szTitle = infoA[this.objThemesA[this.szThemesA[fMatch]].nTitleFieldIndex];
				}
				// add snippet value
				if ( this.szSnippetField ){
					this.itemA[szMasterId].szSnippet = infoA[this.objThemesA[this.szThemesA[fMatch]].nSnippetFieldIndex];
				}

				// GR 11.04.2011 new, see above
				this.itemA[szMasterId].szSelectionId = szMasterId;
			}
		}
	}
	_TRACE("== done from shapes === ");
	return true;
};


/**
 * aggregate items with rules
 */
MapTheme.prototype.aggregateValues = function(){

	_TRACE("== MapTheme.aggregateValues()===> ");

	var uniqueTopicA = [];
	var uniqueTopicCount = [];
	var uniqueTopicValue = [];
	var uniqueTopicPos = [];
	var uniqueTopicTitleCount = [];

	var firstItemId = null;
	var nUniqueTopics = 0;

	this.nTopicsSkipedByZeroExclusion = 0;

	// --------------------------------------------
	// calcolate grid for aggregation
	// --------------------------------------------

	// grid defined in screen pixel, so gridwidth(meter) must be calcolated
	if ( this.nGridWidthPx ){
		var maxDist = map.Scale.getDistanceInMeter(1000,1000,1000+map.Scale.normalX(this.nGridWidthPx),1000);
		this.nGridWidth = maxDist; 
	}
	// grid defined by matrix, make grid with n x n parts (n = nGridMatrix || 20)   
	if ( this.nGridMatrix ){
		var mapArea = map.Zoom.getBox();
		var maxDist = map.Scale.getDistanceInMeter(1000,1000,1000+mapArea.width,1000);
		this.nGridWidth = maxDist/(this.nGridMatrix||20)/map.Scale.nZoomScale; 
	}

	// meters to internal x,y
	var nGridWidthMap = this.nGridWidth?(Math.round(map.Scale.getDeltaXofDistanceInMeter(this.nGridWidth)/20)*map.Scale.nZoomScale*20):0;

	// GR 10.09.2015 limit precision, solving problem: different gridposition with different map position
	// nGridWidthMap = Math.floor(nGridWidthMap*10000)/10000;	


	// --------------------------------------------
	// build array of unique topics to aggregate by
	// --------------------------------------------

	// A: aggregate by selectionId (= map position)
	// --------------------------------------------
	for ( a in this.itemA ){

		var uI = "undefined";

		firstItemId = firstItemId || a

		// GR 12.05.2015 new
		//
		// A G G R E G A T E    B Y   value  
		//
		// -----------------------------------------------------------------------------------------
		if ( this.szAggregationField ){

			uI = this.itemA[a].szAggregation;

			// create unique item to collect, if not exist 
			if ( !uniqueTopicA[uI] ){
				uniqueTopicA[uI] = [];
			    uniqueTopicPos[uI] = new point(0,0);
				uniqueTopicCount[uI] = 0;
				uniqueTopicValue[uI] = 0;
				nUniqueTopics++;
			}

			// add item to aggregation
			uniqueTopicA[uI][a] = this.itemA[a];

			// important: preset size with 1, if undefined 
			uniqueTopicA[uI][a].nSize = this.itemA[a].nSize || 1;
			uniqueTopicA[uI][a].szTitle = uI;
			uniqueTopicValue[uI] += uniqueTopicA[uI][a].nSize;

			// add the node position to the collection, later we make the media (center of the collection)  
			var ptPos = this.getNodePosition(this.itemA[a].szSelectionId);
			if ( ptPos ){
				uniqueTopicPos[uI].x += ptPos.x
				uniqueTopicPos[uI].y += ptPos.y
				uniqueTopicCount[uI]++;
			}
		}
		else {
			// A G G R E G A T E    B Y   position  
			//
			// -----------------------------------------------------------------------------------------

			var ptPos = this.getNodePosition(this.itemA[a].szSelectionId);
			var szLayer = this.itemA[a].szSelectionId.split("::")[0];

			if ( ptPos ) {

				// D I F F U S E   T O  4  points 
				//
				// if we have an aggregation grid defined and diffuse flag = true
				// create 4 grid points that get a part of the value due to the distance from the orig point
				// the sum of the values = the original value
				// -----------------------------------------------------------------------------------------
				if ( this.szFlag.match(/DIFFUSE/) && this.nGridWidth ) {

					var ptPosA = [];
					var nDistA = [];

					// make 4 grid new points around the original point
					ptPosA[0] = new point(Math.ceil(ptPos.x/nGridWidthMap)*nGridWidthMap,Math.ceil(ptPos.y/nGridWidthMap)*nGridWidthMap);
					ptPosA[1] = new point(Math.ceil(ptPos.x/nGridWidthMap)*nGridWidthMap,Math.floor(ptPos.y/nGridWidthMap)*nGridWidthMap);
					ptPosA[2] = new point(Math.floor(ptPos.x/nGridWidthMap)*nGridWidthMap,Math.floor(ptPos.y/nGridWidthMap)*nGridWidthMap);
					ptPosA[3] = new point(Math.floor(ptPos.x/nGridWidthMap)*nGridWidthMap,Math.ceil(ptPos.y/nGridWidthMap)*nGridWidthMap);

					// calc the distances
					var nDiag = Math.pow(nGridWidthMap,2) + Math.pow(nGridWidthMap,2);
					nDistA[0] = nDiag - (Math.pow((ptPosA[0].x-ptPos.x),2) + Math.pow((ptPosA[0].y-ptPos.y),2));				
					nDistA[1] = nDiag - (Math.pow((ptPosA[1].x-ptPos.x),2) + Math.pow((ptPosA[1].y-ptPos.y),2));				
					nDistA[2] = nDiag - (Math.pow((ptPosA[2].x-ptPos.x),2) + Math.pow((ptPosA[2].y-ptPos.y),2));				
					nDistA[3] = nDiag - (Math.pow((ptPosA[3].x-ptPos.x),2) + Math.pow((ptPosA[3].y-ptPos.y),2));	
					
					// total distance
					var nTotalDist = nDistA[0] + nDistA[1] + nDistA[2] + nDistA[3];			

					// create 4 new grid points to get the 'diffused' value
					// -----------------------------------------------------
					var ax;
					for ( var x=0; x<4; x++ ){

						// make extended point id
						ax = a + "-" + x;

						// take one point from array and create new item
						this.themeNodesPosA[ax] = ptPosA[x];

						// handle unique positions for aggregation 
						//
						uI = String(this.themeNodesPosA[ax].x)+","+String(this.themeNodesPosA[ax].y);
						if ( !uniqueTopicA[uI] ){
							uniqueTopicA[uI] = [];
							uniqueTopicCount[uI] = 0;
							nUniqueTopics++;
						}

						// create item and give it a value as function of the distance from the original point
						//
						var item = {nValuesA:[],nOrigValuesA:[]};
						for ( var v=0; v<this.itemA[a].nValuesA.length; v++ ){
							item.nValuesA[v] = this.itemA[a].nValuesA[v] * (this.szFlag.match(/EXACT/)?1:(nDistA[x]/nTotalDist));
							item.nOrigValuesA[v] = this.itemA[a].nOrigValuesA[v] * (this.szFlag.match(/EXACT/)?1:(nDistA[x]/nTotalDist));
						}
						item.nValue100 = (this.itemA[a].nValue100||100) * (this.szFlag.match(/EXACT/)?1:(nDistA[x]/nTotalDist));
						uniqueTopicA[uI][ax] = item;
						uniqueTopicA[uI][ax].nSize = (this.itemA[a].nSize || 1) / nTotalDist * nDistA[x];
						uniqueTopicCount[uI]++;
					}

				}else{

					// A G G R E G A T E   T O   1  
					//
					// if we have an aggregation grid without diffusion, 
					// round the position to the nearest grid point
					// -----------------------------------------------------------------------------------------
					if ( this.nGridWidth ){

						var newPos = null;

						if ( this.szFlag.match(/RECT/) ){
							// rectangular grid
							// GR 02.05.2017, fixgrid: grid fixed to screen, not to map position
							if ( this.szFlag.match(/FIXGRID/) ) {
								var dX = map.Scale.mapCenter.x*map.Scale.nZoomScale;
								var dY = map.Scale.mapCenter.y*map.Scale.nZoomScale;
								newPos = new point( Math.round((ptPos.x+dX)/nGridWidthMap)*nGridWidthMap-dX,
													Math.round((ptPos.y+dY)/nGridWidthMap)*nGridWidthMap-dY);
							}else{
								newPos = new point( Math.round(ptPos.x/nGridWidthMap)*nGridWidthMap,
													Math.round(ptPos.y/nGridWidthMap)*nGridWidthMap);
							}
						}else{
							// diagonal grid

							if ( this.szFlag.match(/PLOTY/) ){
								var y = Math.round(ptPos.y/nGridWidthMap)*nGridWidthMap;
								var dx = ( Math.round(y/nGridWidthMap)%2)?(nGridWidthMap*1.15)/2:0;
								newPos = new point( Math.round((ptPos.x+dx)/(nGridWidthMap*1.15))*(nGridWidthMap*1.15)-dx,
													y);
							}else{
								var x = Math.round(ptPos.x/nGridWidthMap)*nGridWidthMap;
								var dy = ( Math.round(x/nGridWidthMap)%2)?(nGridWidthMap*1.15)/2:0;
								newPos = new point( x,
													Math.round((ptPos.y+dy)/(nGridWidthMap*1.15))*(nGridWidthMap*1.15)-dy);
							}

							// HEXAGONAL GRID
							// above, we rounded the position to a rectangolar grid
							// because the diagonal grid is like a hexagonal grid, we must check if far out points belong to neighbours.
							// we do this, by comparing the distance of the original point to the rectangular center to 
							// the distance of the center of two neighbours or to the left, or to the right
							// if the distance to the neighbour is shorter, the point belongs to him

							// if the point is within the left or right triangle of the hexagon
							if ( Math.abs(x - ptPos.x) > nGridWidthMap/4 ){

								var ptPosA = [];
								var nDistA = [];
								// in a diagonal grid the neighbours are half way up and down
								dy = ( Math.round(x/nGridWidthMap)%2)?0:(nGridWidthMap*1.15)/2;

								if ( x > ptPos.x ){
									// get 2 neighbours to the left
									ptPosA[0] = new point(newPos.x-nGridWidthMap,newPos.y-nGridWidthMap*1.15/2);
									ptPosA[1] = new point(newPos.x-nGridWidthMap,newPos.y+nGridWidthMap*1.15/2);
								}else{
									// get 2 neighbours to the right
									ptPosA[0] = new point(newPos.x+nGridWidthMap,newPos.y-nGridWidthMap*1.15/2);
									ptPosA[1] = new point(newPos.x+nGridWidthMap,newPos.y+nGridWidthMap*1.15/2);
								}

								// calc the distances
								nDistA[0] = Math.sqrt(Math.pow((ptPosA[0].x-ptPos.x),2) + Math.pow((ptPosA[0].y-ptPos.y),2));				
								nDistA[1] = Math.sqrt(Math.pow((ptPosA[1].x-ptPos.x),2) + Math.pow((ptPosA[1].y-ptPos.y),2));				
								nDistA[3] = Math.sqrt(Math.pow((newPos.x-ptPos.x),2) + Math.pow((newPos.y-ptPos.y),2));				
					
								// check if point belongs to neighbour
								if ( nDistA[0] < nDistA[3] ){
									newPos = new point(Math.round( ptPosA[0].x    / nGridWidthMap       )* nGridWidthMap,
													   Math.round((ptPosA[0].y+dy)/(nGridWidthMap*1.15) )*(nGridWidthMap*1.15)-dy );
								}else
								if ( nDistA[1] < nDistA[3] ){
									newPos = new point(Math.round( ptPosA[1].x    / nGridWidthMap       )* nGridWidthMap,
													   Math.round((ptPosA[1].y+dy)/(nGridWidthMap*1.15) )*(nGridWidthMap*1.15)-dy );
								}
							}
						}
						// this is the aggregation point id

						uI = szLayer+"::"+String(newPos.x)+","+String(newPos.y);

						// if no relocation of the aggregation center to the center of the original points, 
						// we must set the aggregation center here 
						this.themeNodesPosA[a] = newPos;

					}else{
						// no grid, take the position to aggregate
						// ---------------------------------------
						uI = String(ptPos.x)+","+String(ptPos.y);
						uI = this.itemA[a].szSelectionId;
					}
					if ( !uniqueTopicA[uI] ){
						uniqueTopicA[uI] = [];
						uniqueTopicPos[uI] = new point(0,0);
						uniqueTopicCount[uI] = 0;
						nUniqueTopics++;
					}
					// add item to gridded point
					uniqueTopicA[uI][a] = this.itemA[a];
					// important: preset size with 1, if undefined 
					uniqueTopicA[uI][a].nSize = this.itemA[a].nSize || 1;
					if ( ptPos ){
						uniqueTopicPos[uI].x += ptPos.x
						uniqueTopicPos[uI].y += ptPos.y
					}
					uniqueTopicCount[uI]++;
				}

			}else{

				// position undefined
				// ------------------
				if ( !uniqueTopicA[uI] ){
					uniqueTopicA[uI] = [];
					uniqueTopicPos[uI] = new point(0,0);
					uniqueTopicCount[uI] = 0;
					this.fDataIncomplete = fTilesLoaded;
					nUniqueTopics++;
				}
				uniqueTopicA[uI][a] = this.itemA[a];
				uniqueTopicA[uI][a].nSize = this.itemA[a].nSize || 1;
				uniqueTopicCount[uI]++;

				// GR 29.11.2016
				// may be we have not loaded the tile, so this flag will force a tile load check
				// important for tiled layer, if the layer which defines the theme positions is not completely loaded
				// we can't do correct aggregation; fDataIncomplete -> waiting for the tiles and redraw the theme 
				this.fDataIncomplete = true;

			}
		}
	}

	_TRACE("== "+nUniqueTopics+" unique positions found == ");

	// --------------------------------------------
	// aggregate within topics
	// --------------------------------------------

	if ( this.szFlag.match(/EXACT/) ){

		// A: aggregate by EXACT value ( = sum the sizes )
		// ---------------------------------------------

		_TRACE("== aggregate by EXACT value == ");

		// with EXACT values, .nSize holds the aggregation value
		// so we must set the .szSizeField to a dummy, if not set in the definition of the theme,
		// to program the char draw algorithm to size the bubbles, ...
		//
		if ( !this.szSizeField ){
			this.szSizeField = "aggregation";
		}
		for ( t in uniqueTopicA ){
			var itemA = uniqueTopicA[t];

			// GR 02.06.2016 count unique titles as number of aggregated items 
			// because we aggregate by exact values and position, and only the titlefield gives an entity id
			uniqueTopicTitleCount[t] = 0;
			var uniqueTitle = [];
			
			if (1){
				// new aggregation by EXACT value
				//
				// first divide by EXACT value in .nValuesA[0]
				var exactItemA = [];
				for ( a in itemA ){
					if ( !uniqueTitle[itemA[a].szTitle] ){
						uniqueTitle[itemA[a].szTitle] = 1;
						uniqueTopicTitleCount[t]++;
					}
					if ( !exactItemA[itemA[a].nValuesA[0]] ){
						exactItemA[itemA[a].nValuesA[0]] = {itemA:[]};
					}
					exactItemA[itemA[a].nValuesA[0]].itemA[a] = itemA[a];
				}
				// then aggregate 
				for ( v in exactItemA ){
					var itemX = exactItemA[v].itemA
					for ( a in itemX ){
						if ( itemX[a] ){
							itemX[a].nCount = 1;
							for ( b in itemX ){
								if ( itemX[b] && (b != a) ){
									itemX[a].nCount += 1;
									itemX[a].nSize = (itemX[a].nSize||1) + (itemX[b].nSize||1);
									itemX[a].nAlpha = (itemX[a].nAlpha||1) + (itemX[b].nAlpha||1);
									itemX[a].szValue = String(itemX[a].nSize);
									itemX[b] = null;
									uniqueTopicA[t][b] = null;
								}
							}
							if ( nGridWidthMap && !this.szAggregationField && (!itemX[a].szTitle || (itemX[a].nCount > 3) ) ){
								itemX[a].szTitle = (this.formatValue(itemX[a].nCount,2) + " " + map.Dictionary.getLocalText("items aggregated"));
							}
						}
					}
				}
			}else{
				// old aggregation by EXACT value
				//
				for ( a in itemA ){
					if ( itemA[a] ){
						itemA[a].nCount = 1;
						for ( b in itemA ){
							if ( itemA[b] && (b != a) && (itemA[a].nValuesA[0] == itemA[b].nValuesA[0]) ){
								itemA[a].nCount += 1;
								itemA[a].nSize = (itemA[a].nSize||1) + (itemA[b].nSize||1);
								itemA[a].nAlpha = (itemA[a].nAlpha||1) + (itemA[b].nAlpha||1);
								itemA[a].szValue = String(itemA[a].nSize);
								delete itemA[b];
							}
						}
					}
				}
			}
		}


	}
	else{

		// B: aggregate the values
		// --------------------------------------------

		_TRACE("== aggregate the values == ");

		for ( t in uniqueTopicA ){
			var itemA = uniqueTopicA[t];

			// if we make average from aggregation ( SUM no set )
			// don't aggregate items with 1 zero value  
			if ( !this.szFlag.match(/SUM/) && !this.szFlag.match(/ZEROISVALUE/) ){

				var skipA = [];
				var nItems = 0;

				for ( a in itemA ){
					nItems++;
					if ( itemA[a] ){
						for ( var v=0; v<itemA[a].nValuesA.length; v++ ){
							if ( itemA[a].nOrigValuesA[v] == 0 ){
								skipA[a] = a;
								break;
							} 
						}
					}
				}
				if ( nItems > 1 ){
					for ( a in skipA ){
						itemA[a] = null;
						this.nTopicsSkipedByZeroExclusion++;
					}
				}
			}
			// -------------------------------------------- 

			for ( a in itemA ){
				if ( itemA[a] ){
					itemA[a].nCount = 1;
					for ( b in itemA ){
						if ( itemA[b] && (b != a) ){
							for ( var v=0; v<itemA[a].nValuesA.length; v++ ){
								itemA[a].nValuesA[v] = (itemA[a].nValuesA[v]||0) + (itemA[b].nValuesA[v]||0);
								itemA[a].nOrigValuesA[v] = (itemA[a].nOrigValuesA[v]||0) + (itemA[b].nOrigValuesA[v]||0);
							}
							itemA[a].nCount += 1;
							itemA[a].nValue100 += itemA[b].nValue100;
							itemA[a].nSize = (itemA[a].nSize||1) + (itemA[b].nSize||1);
							itemA[a].nAlpha = (itemA[a].nAlpha||1) + (itemA[b].nAlpha||1);
							itemA[a].szValue = String(itemA[a].nSize);
							if ( nGridWidthMap && !this.szAggregationField && itemA[a].szTitle && itemA[b].szTitle && (itemA[a].szTitle != itemA[b].szTitle)){
								itemA[a].szTitle = itemA[a].szTitle + "," + itemA[b].szTitle;
							}
							itemA[b] = null;
						}
					}
					if ( nGridWidthMap && !this.szAggregationField && (!itemA[a].szTitle || (itemA[a].nCount > 3) ) ){
						itemA[a].szTitle = (this.formatValue(itemA[a].nCount,2) + " " + map.Dictionary.getLocalText("items aggregated"));
					}
				}
			}
		}
	}

	_TRACE("== values aggregated by unique topics == ");

	// ---------------------------
	// get the aggregation center
	// ---------------------------
	if ( this.szAggregationField || this.szFlag.match(/RELOCATE/)){
		var centerPos = new point(0,0);
		var low = 0;
		var left = 1000000;
		var centerCount = 0;
		var chartCount = 0;
		for ( t in uniqueTopicA ){

			left = Math.min(left,uniqueTopicPos[t].x/uniqueTopicCount[t])
			low = Math.max(low,uniqueTopicPos[t].y/uniqueTopicCount[t])

			centerPos.x += uniqueTopicPos[t].x*(uniqueTopicValue[t]||1);
			centerPos.y += uniqueTopicPos[t].y*(uniqueTopicValue[t]||1);

			centerCount += uniqueTopicCount[t]*(uniqueTopicValue[t]||1);
			chartCount += 1;
		}
		centerPos.x /= centerCount;
		centerPos.y /= centerCount;
		var leftPos = new point(left,centerPos.y);
		var lowPos = new point(centerPos.x,low);
	}

	_TRACE("== aggregation center set == ");

	// ---------------------------
	// set itemA = aggreated items
	// ---------------------------

	this.nMin = 300000000;
	this.nMax = -300000000;

	this.nMinSize = 300000000;
	this.nMaxSize = 0;
	this.nSumSize = 0;

	this.nMinAlpha = 300000000;
	this.nMaxAlpha = 0;
	this.nSumAlpha = 0;

	if ( this.szFlag.match(/EXACT/) ){
		this.nMinA = [];
		this.nMaxA = [];
		this.nSumA = [];
		this.nOrigMinA = [];
		this.nOrigMaxA = [];
		this.nOrigSumA = [];
		this.nMedianA = [];
		this.nMeanA = [];
		this.nCountA = [];
	}

	// make array creation string for pivot values
	// array size = number of string to value entries 
	var szExactSize = "[";
	var nExactSize = this.nStringToValue-1;
	for ( var i=0; i<nExactSize; i++ ){
		szExactSize += "0,";
	}
	szExactSize += "]";
	
	this.itemA = [];
	var nUnique = 0;
	var	nParts = Math.max(this.szRangesA?this.szRangesA.length:0,this.szExactA?this.szExactA.length:0)-(this.szFlag.match(/EXACT/)?0:1);

	_TRACE("== make aggregated topics == ");

	for ( t in uniqueTopicA ){
		nUnique++;		
		if ( t != "undefined" ){
			var itemA = uniqueTopicA[t];
			var x;	

			// -------------------------------------------------------------------------------------------
			// if EXACT and multi part charts defined in theme (pie, donut, sequence of bars)
			// resort values, every item gets n=coloscheme values with the aggregated size per EXACT value 
			// -------------------------------------------------------------------------------------------
			//
			if ( this.szFlag.match(/EXACT/) && ( this.szFlag.match(/PIE/) || this.szFlag.match(/BAR/) || this.szFlag.match(/SEQUENCE/) || this.szFlag.match(/PLOT/) || this.szFlag.match(/DOMINANT/) ) ){
				// get a valid item id
				//
				for ( a in itemA ){
						// get a valid item id
						x = a;
						break;
				}

				// define one item and redefine n values 
				//
				this.itemA[x] = {};

				// create values array  
				//
				eval("var nValuesA = "+szExactSize+";");
//				var nValuesA = [].slice.apply(new Uint8Array(nExactSize));

				var nMinA = [];
				var nMaxA = [];

				/**
				var nValuesA = [];
				// !! must be preset with 0 !!
				// length = number of EXACT values defined
				for ( v in this.nStringToValueA ){
					nValuesA.push(0);
				}
				**/

				// grid points have new selection id = grid point position 
				//
				this.itemA[x].szSelectionId = x;
				this.itemA[x].szTitle = itemA[x].szTitle;

				// GR 12.05.2015
				// if aggregated by field values, position has been collected over points of same field value, 
				// here we must divide the x,y by the collection item count, and set it for the aggregated item
				//
				if ( this.szAggregationField || this.szFlag.match(/RELOCATE/) ){

					if ( this.szFlag.match(/ALIGN/) ){
						// a) align the charts
						// set all positions to the center of the theme
						// set unique selection Id (thes first we have found)
						// and let do the positioning by the CHART drawing function
						this.itemA[x].szSelectionId = firstItemId;
						if ( this.szFlag.match(/UP/) ){
							this.themeNodesPosA[x] = new point( lowPos.x ,lowPos.y );
						}else{
							this.themeNodesPosA[x] = new point( centerPos.x ,centerPos.y );
						}
					}else{
						// b) set the center of the aggregation area
						this.themeNodesPosA[x] = new point( (uniqueTopicPos[t].x/uniqueTopicCount[t]),
															(uniqueTopicPos[t].y/uniqueTopicCount[t]) );
					}

				}

				// because we aggregated before by the EXACT value and position
				// every item (a) rappresents the aggregated sum of one EXACT value
				// so in the new item we create, every EXACT sum is one value of the values array (nValuesA)
				// sum all size values to a final size 
				//
				var nSizeSum = 0;
				var nSizeCount = 0;
				for ( a in itemA ){
					if ( itemA[a] && itemA[a].nValuesA ){
						// here we set the sum of one EXACT value by the aggregated value kept in .nSize
						// -1 because n EXACT values are stores in the array nValuesA by index: 1 - n !!! and not by 0 - (n-1) as usual !!!
						//
						nValuesA[itemA[a].nValuesA[0]-1] = itemA[a].nSize/((this.szFlag.match(/SUM/))?1:itemA[a].nCount);
						nSizeSum += itemA[a].nSize;
						nSizeCount += itemA[a].nCount;
					}
				}

				// set the new values (aggregated sizes)
				this.itemA[x].nValuesA = this.itemA[x].nOrigValuesA  = nValuesA;
				this.itemA[x].nMinA = nMinA;
				this.itemA[x].nMaxA = nMaxA;
				this.itemA[x].nSize = nSizeSum/((this.szFlag.match(/SUM/))?1:nSizeCount);

				this.itemA[x].szTitle = (this.nGridWidth && !this.szAggregationField && (uniqueTopicTitleCount[t] > 1))?(__formatValue(uniqueTopicTitleCount[t],2) + " item(s) aggregated"):(this.itemA[x].szTitle||t);
				this.itemA[x].szValue = this.itemA[x].szTitle;
				this.itemA[x].szLabel = this.itemA[x].szTitle;

				// calcolate min/max size
				this.nMin = this.nMinSize = Math.min(this.nMinSize,this.itemA[x].nSize);
				this.nMax = this.nMaxSize = Math.max(this.nMaxSize,this.itemA[x].nSize);
				this.nSumSize += nSizeSum/((this.szFlag.match(/SUM/))?1:nSizeCount);

				// calcolate min/max alpha
				this.nMinAlpha = Math.min(this.nMinAlpha,this.itemA[x].nAlpha);
				this.nMaxAlpha = Math.max(this.nMaxAlpha,this.itemA[x].nAlpha);
				this.nSumAlpha += this.itemA[x].nAlpha;

				// calcolate auto sum 100
				if ( this.szFlag.match(/AUTO100/)){
					var i;
					nValue100 = 0;
					for ( i=0; i<this.itemA[x].nValuesA.length; i++ ){
						nValue100 += this.itemA[x].nValuesA[i] || 0;
					}
					this.itemA[x].nValue100 = nValue100;
					this.fField100 = true;
					for ( i=0; i<this.itemA[x].nValuesA.length; i++ ){
						this.itemA[x].nValuesA[i] = this.itemA[x].nOrigValuesA[i]/this.itemA[x].nValue100*100;
					}
				}
				if ( this.szFlag.match(/EXACT/) ){
					if ( !this.nMinA.length ){
						for ( i=0; i<this.itemA[x].nValuesA.length; i++ ){
							this.nMinA[i] = 300000000;
							this.nMaxA[i] = -300000000;
							this.nSumA[i] = 0;
							this.nOrigMinA[i] = 300000000;
							this.nOrigMaxA[i] = -300000000;
							this.nOrigSumA[i] = 0;
							this.nMedianA[i] = 0;
							this.nMeanA[i] = 0;
							this.nCountA[i] = 0;
						}
					}
					for ( i=0; i<this.itemA[x].nValuesA.length; i++ ){
						this.nMinA[i] = Math.min(this.nMinA[i],this.itemA[x].nValuesA[i]||300000000);
						this.nMaxA[i] = Math.max(this.nMaxA[i],this.itemA[x].nValuesA[i]||-300000000);
						this.nSumA[i] += this.itemA[x].nValuesA[i];
						this.nOrigMinA[i]  = Math.min(this.nOrigMinA[i],this.itemA[x].nOrigValuesA[i]||300000000);
						this.nOrigMaxA[i]  = Math.max(this.nOrigMaxA[i],this.itemA[x].nOrigValuesA[i]||-300000000);
						this.nOrigSumA[i] += this.itemA[x].nOrigValuesA[i];
						if (this.itemA[x].nValuesA[i]){
							this.nCountA[i]++; 
						}
					}
				}
				this.nCount = nUnique*nParts;

			}else{
				// ---------------------------------------------
				// for all other charts set the aggregated value 
				// ---------------------------------------------
				//
				for ( a in itemA ){

					if ( itemA[a] ){

						var newId = a;
						// GR 03.02.2017
						// if aggregation by grid, not by field, 
						// the new id must be the aggregatiuon topic = the agggregation position = the grid point
						// multiple aggregation (EXACT and not! multipart symbol, bar or pie), needed for MULTIPLE or MULTIGRID 
						if ( !this.szAggregationField ){
							var newId = t;
							if( this.itemA[newId] ){
								newId = newId.split("*")[0] + "*" + Math.random(); 
							}
						}

						this.itemA[newId] = itemA[a];
						//itemA[a].szLabel = itemA[a].szLabel || 1;
						itemA[a].szValue = itemA[a].szValue || 1;
						var nCount = (this.szFlag.match(/SUM/)||this.szFlag.match(/EXACT/))?1:itemA[a].nCount; 

						//this.itemA[a].nSize /= nCount;
						this.itemA[newId].nValue100 /= nCount;

						// calcolate min/max size
						this.nMinSize = Math.min(this.nMinSize,this.itemA[newId].nSize);
						this.nMaxSize = Math.max(this.nMaxSize,this.itemA[newId].nSize);
						this.nSumSize += this.itemA[newId].nSize;

						// calcolate min/max alpha
						this.nMinAlpha = Math.min(this.nMinAlpha,this.itemA[newId].nAlpha);
						this.nMaxAlpha = Math.max(this.nMaxAlpha,this.itemA[newId].nAlpha);
						this.nSumAlpha += this.itemA[newId].nAlpha;

						// recalcolate min and max 
						//
						if ( this.nGridWidth || this.szAggregationField ){
							// and for gridded aggregation also evt. percentages,...
							//
							this.itemA[newId].szSelectionId = a;
							for ( var v=0; v<this.itemA[newId].nValuesA.length; v++ ){
								this.itemA[newId].nValuesA[v] /= nCount;
								this.itemA[newId].nOrigValuesA[v] /= nCount;
								// recalcolate percentages, ...
								if ( this.itemA[newId].nValue100 ){
									this.itemA[newId].nValuesA[v] = this.itemA[newId].nOrigValuesA[v]/this.itemA[newId].nValue100;
									if ( !this.szFlag.match(/FRACTION/) ){
										this.itemA[newId].nValuesA[v] *= this.szFlag.match(/PERMILLE/)?1000:100;
									}
									if ( this.szFlag.match(/INVERT/) ){
										this.itemA[newId].nValuesA[v] = 100-this.itemA[newId].nValuesA[v];
									}
								}
								/**
								this.nMinA[v] = Math.min(this.nMinA[v],this.itemA[a].nValuesA[v]);
								this.nMaxA[v] = Math.max(this.nMaxA[v],this.itemA[a].nValuesA[v]);
								this.nSumA[v] += this.itemA[a].nValuesA[v];
								this.nOrigMinA[v]  = Math.min(this.nOrigMinA[v],this.itemA[a].nOrigValuesA[v]);
								this.nOrigMaxA[v]  = Math.max(this.nOrigMaxA[v],this.itemA[a].nOrigValuesA[v]);
								this.nOrigSumA[v] += this.itemA[a].nOrigValuesA[v];
								**/

								this.nMin = Math.min(this.itemA[newId].nValuesA[v]||300000000,this.nMin||300000000);
								this.nMax = Math.max(this.itemA[newId].nValuesA[v]||-300000000,this.nMax||-300000000);
							}
						}else{
							this.nMin = Math.min(this.itemA[newId].nSize,this.nMin||300000000);
							this.nMax = Math.max(this.itemA[newId].nSize,this.nMax||-300000000);
						}

						if ( this.szAggregationField  || this.szFlag.match(/RELOCATE/) ){

							if ( this.szFlag.match(/ALIGN/) ){
								// a) align the charts
								// set all positions to the center of the theme
								// set unique selection Id (thes first we have found)
								// and let do the positioning by the CHART drawing function
								if ( this.szFlag.match(/UP/) ){
									this.themeNodesPosA[newId] = new point( lowPos.x ,lowPos.y );
								}else{
									this.themeNodesPosA[newId] = new point( centerPos.x ,centerPos.y );
								}
							}else{
								// b) set the center of the aggregation area
								this.themeNodesPosA[a]		= new point( (uniqueTopicPos[t].x/uniqueTopicCount[t]),
																	     (uniqueTopicPos[t].y/uniqueTopicCount[t]) );
								this.themeNodesPosA[newId]	= new point( (uniqueTopicPos[t].x/uniqueTopicCount[t]),
																	     (uniqueTopicPos[t].y/uniqueTopicCount[t]) );
							}

						}
					}
				}
			}
		}
	}


	var nItems = 0;
	for ( a in this.itemA ){
		nItems++;
	}
	_TRACE("== "+nUnique+' unique positions -> '+nItems+' aggregated items');

	// GR 11.10.2016 filter by min aggregation count
	// ---------------------------------------------
	if ( this.szMinAggregation ){

		// get media aggregation count
		// used for minaggregation == 'auto'
		var nCount = 0;
		var nMediaCount = 0;
		for ( a in this.itemA ){
			nMediaCount += this.itemA[a].nCount;
			nCount++;
		}
		nMediaCount /= nCount;

		// filter by media aggregation count/2 or giver minimum
		for ( a in this.itemA ){
			if ( this.itemA[a].nCount && (this.itemA[a].nCount < (this.nMinAggregation||nMediaCount/2)) ){
				delete this.itemA[a];
			}else
			if ( this.itemA[a].nSize && (this.itemA[a].nSize < (this.nMinAggregation||nMediaCount/2)) ){
				delete this.itemA[a];
			}
		}
	}
	// -----------------------------------------------

	this.fSorted = true;

	_TRACE("== aggregation done == ");

};

/**
 * distribute the values to the color scheme classes
 * @type boolean
 * @return true if success
 */
MapTheme.prototype.distributeValues = function(){

	if (this.nCount == 0 ){
		return false;
	}

	if ( this.szFlag.match(/AGGREGATE/) ){
		this.aggregateValues();
	}else{
		if ( this.szSizeField == "aggregation" ){
			this.szSizeField = null;
		}
	}

	_TRACE("== MapTheme.distributeValues()===> ");

	// GR 25.04.2011 EXACT must have ranges !
	if ( this.szFlag.match(/EXACT/) && (!this.szExactA || !this.szExactA.length) ){
		this.szExactA = this.szExactA || [];
		// create ranges from value/index array
		if ( this.nStringToValueA ){
			for ( a in this.nStringToValueA ){
				this.szExactA.push(this.nStringToValueA[a]);
			}
			_TRACE("values: "+this.szExactA+" (generated)");
		}
	}
	// GR 25.04.2011 EXACT must have labels !
	if ( this.szFlag.match(/EXACT/) && !(this.szLabelA && this.szLabelA.length) ){
		if ( this.szValuesA ){
			this.szLabelA = this.szValuesA;
			_TRACE("(label generated from values)");
		}
	}
	
	// make colorscheme
	// ----------------

	if (!this.origColorScheme){
		this.origColorScheme = this.colorScheme = this.defaultColorScheme;
	}
	_TRACE("colorScheme:"+this.origColorScheme+" (defined)");

	if( !isNaN(Number(this.origColorScheme[0])) ) {
		// colorscheme must be >= number of fields
		if ( !this.szFlag.match(/SEQUENCE/) ){ 
			if ( this.szFieldsA.length > this.origColorScheme[0] ){
				this.origColorScheme[0] = this.szFieldsA.length;
			}
		}
		if ( this.szFlag.match(/EXACT/) ){ 
			this.origColorScheme[0] = this.szExactA.length;
		}
		try{
			this.colorScheme = ColorScheme.createColorScheme(this.origColorScheme[1],this.origColorScheme[2],this.origColorScheme[0],this.origColorScheme[3],this.origColorScheme[4]);
		}
		catch (e){
			this.colorScheme = this.defaultColorScheme;
		}
	}
	else{
		this.colorScheme = this.origColorScheme;
	}
	_TRACE("colorScheme:"+this.colorScheme+" (generated)");

	// GR 13.11.2016 user defined color scheme ?
	if ( this.colorScheme[0].match(/user/i)  ){
		try	{
			HTMLWindow.ixmaps.htmlgui_colorScheme(this);
		}catch(e){}
	}
	
	// GR 23.04.2011
	// make shure that we have enough colors defined for DOMINANT type
	if ( this.szFlag.match(/DOMINANT/) ){
		while ( this.colorScheme.length < this.szFieldsA.length ){
			this.colorScheme[this.colorScheme.length] = "#dddddd";
			_TRACE("colorscheme: dummy color "+this.colorScheme[this.colorScheme.length-1]+" added! -2-");
		}
	}

	// sizefield defined and flag INVERTSIZE set
	// --------------------------------------------
	if ( this.szFlag.match(/NORMALIZE/) && this.nMax ){
		for ( a in this.itemA ){
			this.itemA[a].nValuesA[0] /= this.nMax;
		}
		this.nMin /= this.nMax;
		this.nMax /= this.nMax;
	}

	// sizefield defined and flag INVERTSIZE set
	// --------------------------------------------
	if ( this.szFlag.match(/INVERTSIZE/) && this.szSizeField ){
		for ( a in this.itemA ){
			this.itemA[a].nSize = this.nMaxSize - this.itemA[a].nSize;
		}
		this.nNormalSizeValue = this.nNormalSizeValue || this.nMaxSize;
	}

	// prepare median and quantile !! only 1. field 
	// --------------------------------------------
	if ( !this.szFlag.match(/EXACT/) ){
		var quantileA = new Array();
		for ( a in this.itemA ){
			if (this.itemA[a].nValuesA[0]){
				quantileA.push(this.itemA[a].nValuesA[0]);
			}
		}

		if ( !(this.szFieldsA[0] == "$item$") ){
			quantileA.sort(this.sortUp);
		}
		this.nMedianA[0] = quantileA[Math.round(quantileA.length/2)];
	}

	// distribute values in ranges (classes)
	// -------------------------------------
	var nParts = this.colorScheme.length;
	var nRange = this.nMax-this.nMin;
	var nMin = this.nMin;
	var nMax = this.nMax;

	if ( (this.nRangeCenterValue != null) && !isNaN(this.nRangeCenterValue) ){
		var nSymRange = Math.max(Math.abs(this.nRangeCenterValue-nMin),Math.abs(nMax-this.nRangeCenterValue));
		nMin = this.nRangeCenterValue-nSymRange;
		nMax = this.nRangeCenterValue+nSymRange;
		nRange = nMax-nMin;
	}

	if ( this.szFlag.match(/INTEGER/) ){
		if ( nParts > nRange ){
			nParts = nRange;
		}
		else if ( nParts > nRange/2 ){
			nParts = Math.floor(nRange/2);
		}
		else {
			nRange += nParts - nRange%nParts;
		}
	}
	else{
		// clip range to nearest precision
		var nPreClip = 1;
		if ( this.szField100 ){
			nPreClip = 0.01;
		}
		while ( nRange > nPreClip*1000 ){
			nPreClip*=10;
		}
		if (nPreClip > 1){
			nMin	= Math.floor(nMin/nPreClip)*nPreClip;
			nMax	= Math.ceil(nMax/nPreClip)*nPreClip;
		}
		else{
			nMax += nMax/100000;
		}
		nRange = nMax-nMin;
	}

	// set the one or the other range values
	//
	this.nRangesA = this.szRangesA || this.szExactA;

	if ( this.nRangesA && this.nRangesA.length ){

		// explicit ranges
		//
		// n ranges are defined by n+1 values 
		// example: 1,5,10,15 defines 3 ranges: 1-5, 5-10, 10-15 
		// 
		// in case of flag | EXACT, n ranges define n discret values
		// ! the ranges are created by maptheme.getStringValueIndex(value)
		// ---------------------------------------------------------------

		// set number of parts from ranges, if flag EXACT, parts = number of rangevalues, if not, parts = number of rangevalues-1 
		nParts = this.nRangesA.length-(this.szFlag.match(/EXACT/)?0:1);
		// ------------------------------------------------------

		// if we have symbols, make shure that we have enought
		if ( this.szSymbolsA && this.szSymbolsA.length ){
			while ( this.szSymbolsA.length < nParts ){
				this.szSymbolsA[this.szSymbolsA.length] = this.szSymbolsA[0];
				_TRACE("symbols: dummy "+this.szSymbolsA[this.szSymbolsA.length-1]+" added!");
			}
		}
		// if we have a color scheme, make shure that we have enough colors defined
		if ( this.colorScheme && this.colorScheme.length ){
			while ( this.colorScheme.length < nParts ){
				this.colorScheme[this.colorScheme.length] = "#dddddd";
				_TRACE("colorscheme: dummy color "+this.colorScheme[this.colorScheme.length-1]+" added! -1-");
			}
		}
		_TRACE("colorScheme:"+this.origColorScheme+" (corrected)");

		// set the part values to range limits, if flag EXACT, min == max !
		// --------------------------------------------------------------------
		var i;
		this.partsA = new Array();
		for ( i=0; i<nParts; i++ ){
			var nMin = Number(this.nRangesA[i]);
			var nMax = Number(this.nRangesA[i+(this.szFlag.match(/EXACT/)?0:1)]) + 0.000000001;
			this.partsA[this.partsA.length] = {min:(nMin),max:(nMax),color:this.colorScheme[i],nCount:0,nSum:0};
		}
		if ( this.szFlag.match(/EXACT/) && this.exactCountA ){
			for ( i=0; i<nParts; i++ ){
				this.partsA[i].nCount = this.exactCountA[i];
			}
		}
		// get media and deviation 
		if ( this.szFlag.match(/PLOTVAR/)){
			for ( i=0; i<nParts; i++ ){
				var quantileA = new Array();
				for ( a in this.itemA ){
					quantileA.push(this.itemA[a].nValuesA[i]);
				}
				var nMedianMember = Math.round(quantileA.length/2);
				this.nMedianA[i] = quantileA[nMedianMember];
				//this.nMeanA[i] = this.nSumA[i]/this.nCount*nParts;
				this.nMeanA[i] = this.nSumA[i]/this.nCountA[i];
			}
			// get deviation
			for ( i=0; i<nParts; i++ ){
				var nPopA = new Array(0);
				for ( a in this.itemA ){
					if (this.itemA[a].nValuesA[i]){
						nPopA.push(this.itemA[a].nValuesA[i]);
					}
				}
				this.nDeviationA[i] = this.parent.getDeviationOfArray(nPopA);
			}
		}
	}	
	else {

		// automatic ranges 
		//
		// created by distribution algorithms
		//
		// EQUIDISTANT, LOG, QUANTILE etc.
		// ---------------------------------------------------------------

		var i;
		var nStep = nRange/nParts;

		_TRACE("nStep:"+nStep);
		if ( nStep > nPreClip ){
			nStep = Math.floor(nStep/nPreClip)*nPreClip;
		}
		_TRACE("nStep:"+nStep+" (clipped)" );

		_TRACE("mapTheme min:"+this.nMin+" max:"+this.nMax+" Range:"+nRange+" Parts:"+nParts+" Step:"+nStep);
		
		this.partsA = new Array();
		for ( i=0; i<nParts; i++ ){
			this.partsA[this.partsA.length] = {min:(nMin+i*nStep),max:nMin+(i+1)*nStep,color:this.colorScheme[i],nCount:0,nSum:0};
		}
		this.partsA[this.partsA.length-1].max = nMax;

		if ( this.szFlag.match(/QUANTILE/) ){
			quantileA[quantileA.length] = nMax;
			var nMaxMember = Math.round(quantileA.length/nParts);
			for ( i=0; i<this.partsA.length; i++ ){
				this.partsA[i].min = quantileA[i    *nMaxMember];
				this.partsA[i].max = quantileA[(i+1)*nMaxMember];
			}
			this.partsA[this.partsA.length-1].max = nMax;
		}

		if ( this.szFlag.match(/LOG/) ){
			var nMin = Math.log(this.nMin?this.nMin:1);
			var nRange = Math.log(this.nMax?this.nMax:1)-Math.log(this.nMin?this.nMin:1);
			var nStep  = nRange/nParts;
			this.partsA = new Array();
			for ( i=0; i<nParts; i++ ){
				this.partsA[this.partsA.length] = {min:Math.exp(nMin+i*nStep),max:Math.exp(nMin+(i+1)*nStep),color:this.colorScheme[i],nCount:0,nSum:0};
			}
			this.partsA[this.partsA.length-1].max = this.nMax;
		}

		if ( this.szFlag.match(/DOMINANT/) || this.szFlag.match(/OFFSETMEAN/) || this.szFlag.match(/OFFSETMEDIAN/) || this.szFlag.match(/DEVIATION/) || this.szFlag.match(/PLOTVAR/)){

			for ( i=0; i<this.szFieldsA.length; i++ ){

				var quantileA = new Array();
				for ( a in this.itemA ){
					if (this.itemA[a].nValuesA[i]){
						quantileA.push(this.itemA[a].nValuesA[i]);
					}
				}
				if ( !(this.szFieldsA[i] == "$item$") ){
					quantileA.sort(this.sortUp);
				}
				this.nMedianA[i] = quantileA[Math.round(quantileA.length/2)];

				if ( this.nSum100 ){
					if (this.szFlag.match(/DIFFERENCE/)){
						this.nMeanA[i] = this.nSumA[i]/this.nCount;	
					}
					else{
						this.nMeanA[i] = this.nOrigSumA[i]/this.nSum100; 
						if (this.szFlag.match(/FRACTION/)){
							this.nMeanA[i] *= (this.nFractionScale||1);
						}else
						if (this.szFlag.match(/PERMILLE/)){
							this.nMeanA[i] *= 1000;
						}
						else{
							this.nMeanA[i] *= 100;
							if (this.szFlag.match(/RELATIVE/)){
								this.nMeanA[i] -= 100;
							}else
							if (this.szFlag.match(/INVERT/)){
								this.nMeanA[i] = 100 - this.nMeanA[i];
							}
						}
					}
				}
				else{
					this.nMeanA[i] = this.nSumA[i]/this.nCount;
				}

				// preset with default if not set
				//
				this.szDominantFilter = this.szDominantFilter || "mean";
				this.nDominantDFilter = this.nDominantDFilter || 0;

				if ( this.szDominantFilter.match(/min/)){
					this.nFilterA[i] = this.nMinA[i] + ((this.nMaxA[i]-this.nMinA[i]) / 100 * this.nDominantDFilter);
				}
				else if ( this.szDominantFilter.match(/max/)){
					this.nFilterA[i] = this.nMinA[i] + ((this.nMaxA[i]-this.nMinA[i]) / 100 * this.nDominantDFilter);
				}
				else if ( this.szDominantFilter.match(/mean/)){
					this.nFilterA[i] = this.nMeanA[i] + ((this.nMaxA[i]-this.nMeanA[i]) / 100 * this.nDominantDFilter);
				}
				else if ( this.szDominantFilter.match(/median/)){
					this.nFilterA[i] = this.nMedianA[i] + ((this.nMaxA[i]-this.nMedianA[i]) / 100 * this.nDominantDFilter);
				}
				if ( this.szLabelA && this.szLabelA.length >= i ){
					_TRACE("part-"+i+": "+this.szLabelA[i]+" min:"+this.nMinA[i]+" max:"+this.nMaxA[i]+" mean:"+this.nMeanA[i]+" median:"+this.nMedianA[i]+" filter:"+this.nFilterA[i]);
				}
				else{
					_TRACE("part-"+i+": "+" min:"+this.nMinA[i]+" max:"+this.nMaxA[i]+" mean:"+this.nMeanA[i]+" median:"+this.nMedianA[i]+" filter:"+this.nFilterA[i]);
				}
			}
		}

		if ( this.szFlag.match(/DEVIATION/) || this.szFlag.match(/PLOTVAR/)){
			// get deviation
			for ( i=0; i<this.szFieldsA.length; i++ ){
				var nPopA = new Array(0);
				for ( a in this.itemA ){
					if (this.itemA[a].nValuesA[i]){
						nPopA.push(this.itemA[a].nValuesA[i]);
					}
				}
				this.nDeviationA[i] = this.parent.getDeviationOfArray(nPopA);
			}
		}

	}
	// GR 23.04.2015 we test for < max, so add something little for the last part 
	this.partsA[this.partsA.length-1].max += 0.001;

	_TRACE("== done === ");
	return true;
};

// .............................................................................
// local helpers 
// .............................................................................

/**
 * private sort function 
 */
MapTheme.prototype.sortUp = function(a,b){
	if ( a > b){
		return 1;
	}
	return -1;
};
/**
 * private sort function 
 */
MapTheme.prototype.sortIndexUp = function(a,b){
	if ( a.value > b.value){
		return 1;
	}
	return -1;
};
/**
 * private sort function 
 */
MapTheme.prototype.sortIndexDown = function(a,b){
	if ( a.value < b.value){
		return 1;
	}
	return -1;
};
/**
 * private sort function 
 */
MapTheme.prototype.sortPartsUp = function(a,b){
	if ( a.nCount > b.nCount){
		return 1;
	}
	return -1;
};
/**
 * private sort function 
 */
MapTheme.prototype.sortMeanUp = function(a,b){
	if ( a.mean > b.mean){
		return 1;
	}
	return -1;
};
/**
 * private unsort function 
 * GR 15.11.2013 cached random added
 */
MapTheme.prototype.shuffleArray = function(a,randA){
	for ( var i=a.length-1; i>0; i-- ){
		var j = Math.floor( ((randA && randA[i])?randA[i]:Math.random())*i+1 );
		var tmp = a[i];
		a[i] = a[j];
		a[j] = tmp;
	}
};
/**
 * private random array function 
 * cache random, so the chart will not change on redraw
 */
MapTheme.prototype.getRandomNumberArray = function(count){
	var r = new Array();
	for ( var i=0; i<count; i++ ){
		r.push(Math.random());
	}
	return r;
};

// .............................................................................
//
// make choroplethe themes
//
// .............................................................................

/**
 * colorize the map shapes of the theme
 * is called several times with a item index to start or continue
 * @parameter startIndex if 0, init painting map items, else, continue painting
 */
MapTheme.prototype.paintMap = function(startIndex){

	_TRACE("== MapTheme.paintMap("+startIndex+")===> "+(this.szId));

	this.beginDraw();
	
	if ( this.mapSleep ){
		this.mapSleep.checkSleepMessage = "painting map";
	}

	var nValue = 0;
	var nPercentOfMean = 0;
	var nPercentOfMedian = 0;
	var nDeviation = 0;
	var nRelevanz = 0;
	var nOpacity = 0;
	var szLabel="";
	var szRelevanz="";
	var szMean = map.Dictionary.getLocalText("of mean");
	var szMedian = map.Dictionary.getLocalText("of median");

	var xFound = false;
	var nLastRelevant = 0;
	var i = 0;
	var j = 0;
	var a = 0;

	var tilesNodesA = null;

	// GR 28.07.2012 for paint opacity = fillopacity
	this.fillOpacity = this.fillOpacity?this.fillOpacity:this.nOpacity;
	this.szStyle = "fill-opacity:"+String(this.fillOpacity?this.fillOpacity:(fTransparentMap?0.6:1.0));
	if ( this.autoOpacity ){
		this.szStyle = "fill-opacity:"+String(Math.max(0.3,(Math.min(1,0.3+0.5/Math.max(1,Math.log(map.Zoom.nZoom))))));
	}
	if ( this.szShapeType.match(/line/) ){
		this.szStyle = this.fillOpacity?"stroke-opacity:"+this.fillOpacity+";":"stroke-opacity:1";
	}
	
	if ( !startIndex || startIndex == 0 ){
		startIndex = 0;
		this.indexA = new Array(0);

		for (a in this.itemA){
			this.indexA[this.indexA.length]= a;
			this.itemA[a].todo = true; 
		}

		// I. try - exclude by center 
		if (0){
			var zoomBox = map.Zoom.getBox();
			for (a in this.itemA){
				if ( this.itemA[a].nValuesA && (this.itemA[a].nValuesA.length > 0)){
					var ptOff = this.getNodePosition(this.itemA[a].szSelectionId);
					if ( !ptOff ){
						this.itemA[a].todo = false;
						continue;
					}
					if ( ptOff.x < zoomBox.x				||
						 ptOff.x > zoomBox.x+zoomBox.width  ||
						 ptOff.y < zoomBox.y				||
						 ptOff.y > zoomBox.y+zoomBox.height ){
						this.itemA[a].todo = false; 
					}
				}
			}
		}
		// II. try - exclude by box
		if (0){
			var zoomBox = map.Zoom.getBox();
			for (a in this.itemA){
				if ( this.itemA[a].nValuesA && (this.itemA[a].nValuesA.length > 0)){
					var ptBox = this.getNodeBox(this.itemA[a].szSelectionId);
					if ( !ptBox ){
						this.itemA[a].todo = false;
						continue;
					}
					if ( ptBox.x + ptBox.width  < zoomBox.x				  ||
						 ptBox.x			    > zoomBox.x+zoomBox.width ||
						 ptBox.y + ptBox.height < zoomBox.y				  ||
						 ptBox.y			    > zoomBox.y+zoomBox.height ){
						this.itemA[a].todo = false; 
					}
				}
			}
		}
		this.nDoneCount = 0;
	}

	for ( var nAi=startIndex; nAi<this.indexA.length; nAi++ ){

		// sleep work around to show progress -----------------
		if ( this.mapSleep ){
			this.mapSleep.nDoneCount = this.nDoneCount;
			if ( this.mapSleep.checkSleep(nAi,10) ){
				this.fContinue = true;
				this.continueIndex = nAi;
				return;
			}
		}

		var a = this.indexA[nAi];
		
		this.nDoneCount++;

		xFound = false;
		nLastRelevant = 0;

		if ( this.szFlag.match(/COMPOSECOLOR/) ){

		// ===================================
		// color defined by explicit algorithm
		// ===================================
			var szColor = __maptheme_getComposedColor(this.itemA[a].nValuesA,this.colorScheme);
		}else

		// ================================
		// dominant value choroplethe theme
		// ================================
		if ( this.szFlag.match(/DOMINANT/) ){


			xFound = true;

			// search for dominant value above filter 
			nIndex = -1;
			for ( i=0;i<this.itemA[a].nValuesA.length;i++ ){

				nValue = this.itemA[a].nValuesA[i];

				nPercentOfMean = 100/this.nMeanA[i]*nValue;
				nPercentOfMedian = 100/this.nMedianA[i]*nValue;
				nDeviation = (nValue-this.nMeanA[i])/this.nDeviationA[i];

				nRelevanz = nValue;
				if ( this.szFlag.match(/PERCENTOFMEAN/) ){
					nRelevanz = nPercentOfMean; 
				}
				if ( this.szFlag.match(/PERCENTOFMEDIAN/) ){
					nRelevanz = nPercentOfMedian; 
				}
				if ( this.szFlag.match(/DEVIATION/) ){
					nRelevanz = nDeviation; 
				}
				if ( nValue > this.nFilterA[i] && nRelevanz > nLastRelevant ){

					this.itemA[a].nClass = i;
					nLastRelevant = nRelevanz;
					nIndex = i;
				}
			}

			// if we have found a dominant value; do colorize 
			if ( nIndex >= 0 ){
				this.itemA[a].nDominant = nIndex;
				nValue = this.itemA[a].nValuesA[nIndex];

				szLabel = " "+this.szFieldsA[nIndex]+" ";
				if (this.szLabelA &&  this.szLabelA[nIndex] ){
					szLabel = " "+this.szLabelA[nIndex]+" ";
				}
				if ( this.szFlag.match(/PERCENTOFMEAN/) || this.szFlag.match(/DEVIATION/)){
					szRelevanz =  map.Dictionary.getLocalText(" ( mean: ")+this.formatValue(this.nMeanA[nIndex],1)+this.szUnit+")";
				}
				if ( this.szFlag.match(/PERCENTOFMEDIAN/) ){
					szRelevanz =  map.Dictionary.getLocalText(" ( median: ")+this.formatValue(this.nMedianA[nIndex],1)+this.szUnit+")";
				}
				// colorize 
				this.itemA[a].nValue  = this.itemA[a].nValuesA[nIndex];
				this.itemA[a].szLabel = szLabel;
				this.itemA[a].szColor = this.colorScheme[nIndex];

				tilesNodesA = this.getItemNodes(a);
				for ( j=0; j<tilesNodesA.length ;j++ ){
					var paintShape = this.paintShape(tilesNodesA[j],this.colorScheme[nIndex]);
					paintShape.setAttributeNS(szMapNs,"tooltip",this.formatValue(nValue,2)+this.szUnit+szLabel+szRelevanz);

					// GR 08.08.2012 new
					// variate the opacity to give importance to 1) the value 2) the item count at base
					if ( this.szFlag.match(/DOPACITY/) ){
						var nPartsA = this.itemA[a].nOrigValuesA;
						var nMyValue = 0;
						var nMyMaxVal = 0;
						var nOpacity = 0;

						// calcolate importance from all parts > max and value = sum over all parts
						// 
						// for ( var xi=0; xi<nPartsA.length; xi++ ){
						//	 nMySum += isNaN(nPartsA[xi])?0:nPartsA[xi];
						//	 nTotalSum += isNaN(this.nOrigMaxA[xi])?0:this.nOrigMaxA[xi];
						// }
						// calcolate importance only from the dominant part
						//
						nMyValue = isNaN(this.itemA[a].nValuesA[nIndex])?0:this.itemA[a].nValuesA[nIndex];
						nMyMaxVal = isNaN(this.nMaxA[nIndex])?0:this.nMaxA[nIndex];

						if ( this.szAlphaField ){
							nOpacity = 0;
							if ( typeof(this.itemA[a].nAlpha) != "undefined" ){
								var nPow = 1/(this.nDopacityPow||1);
								nOpacity = (this.nDopacityScale||1)/Math.pow(this.nMaxAlpha,nPow)*Math.pow(this.itemA[a].nAlpha,nPow);
							}
						}
						else
						if ( this.szFlag.match(/DOPACITYLOGMEAN/) ){
							nOpacity = Math.log((this.nDopacityScale||1)*(nPercentOfMean-100))/Math.log(100);
						}
						else
						if ( this.szFlag.match(/DOPACITYPOWMEAN/) ){
							var nPow = 1/(this.nDopacityPow||1);
							nOpacity = Math.pow((this.nDopacityScale||1)*(nPercentOfMean-100),nPow)/Math.pow(100,nPow);
						}
						else
						if ( this.szFlag.match(/DOPACITYMEAN/) ){
							nOpacity = (this.nDopacityScale||1)*(nPercentOfMean-100)/100;
						}
						else
						if ( this.szFlag.match(/DOPACITYLOGMAX/) ){
							// calc opacity from value/max
							nOpacity = Math.log(nMyValue)/Math.log(nMyMaxVal);
						}
						else 
						if ( this.szFlag.match(/DOPACITYPOWMAX/) ){
							// calc opacity from value/max
							var nPow = 1/(this.nDopacityPow||1);
							nOpacity = (this.nDopacityScale||1)*Math.pow(nMyValue,nPow)/Math.pow(nMyMaxVal,nPow);
						}
						else 
						if ( this.szFlag.match(/DOPACITYMAX/) ){
							// calc opacity from value/max
							nOpacity = (this.nDopacityScale||2)/nMyMaxVal*nMyValue;
						}
						else{
							// calc opacity from log(value)/log(max)
							nOpacity = Math.log((this.nDopacityScale||1)*nMyValue)/Math.log(nMyMaxVal);
						}

						// clip opacity
						nOpacity = (nOpacity < 0.0001) ? 0 : nOpacity;
						nOpacity = Math.min((this.nOpacity||0.9),nOpacity);

						// flag for auto opacity = more zoom, more transparency
						if ( this.autoOpacity ){
							nOpacity *= Math.max(0.3,(Math.min(1,0.3+0.7/Math.max(1,Math.log(map.Zoom.nZoom)))));
						}

						paintShape.style.setProperty("fill-opacity",String(nOpacity),"");

						//_TRACE("dopacity: pfm:"+nPercentOfMean+" sum:"+nTotalSum+" this.sum:"+nMyValue);

					} // ------------------------------------------------------------------------------
				}
				this.partsA[nIndex].nCount++;
			}
			// if not, remove old color
			else{
				tilesNodesA = this.getItemNodes(a);
				for ( j=0; j<tilesNodesA.length ;j++ ){
					this.unPaintShape(tilesNodesA[j]);
					tilesNodesA[j].removeAttributeNS(szMapNs,"tooltip");
				}
			}
		}
		// ===================================
		// normal choroplethe theme
		// ===================================
		else{
			if ( this.szFlag.match(/CLIP/) && this.nClipFrames ){
				if ( (this.nClipFrames == this.itemA[a].nValuesA.length) ){
					nValue = Number(this.itemA[a].nValuesA[this.nActualFrame]);
				}else{
					nValue = this.itemA[a].nValuesA[0]*(this.nClipFrames-1-this.nActualFrame)/(this.nClipFrames-1) + this.itemA[a].nValuesA[1]*this.nActualFrame/(this.nClipFrames-1);
				}
			}else{
				nValue = this.itemA[a].nValuesA[0];
			}
			for ( i=0;i<this.partsA.length;i++ ){
				if (nValue < this.partsA[i].max){

					// colorize 
					this.itemA[a].nValue  = nValue;
					this.itemA[a].szColor = this.partsA[i].color;

					if ( this.itemA[a].todo ){ 
						tilesNodesA = this.getItemNodes(a);
						for ( j=0; j<tilesNodesA.length ;j++ ){
							var paintShape = this.paintShape(tilesNodesA[j],this.partsA[i].color,nValue);
							if ( this.szLabelA && this.szLabelA[i] && this.szFlag.match(/EXACT/) ){
								paintShape.setAttributeNS(szMapNs,"tooltip",this.szLabelA[i]);
								}
							else if (this.itemA[a].nValue100){
								paintShape.setAttributeNS(szMapNs,"tooltip",this.formatValue(nValue,2)+this.szUnit); //+"  ["+this.szTitle+"] "+Math.ceil(nValue*this.itemA[a].nValue100*0.01)+"  total="+this.itemA[a].nValue100);
							}
							else{
								paintShape.setAttributeNS(szMapNs,"tooltip",this.formatValue(nValue,2)+this.szUnit); //+"  ["+this.szTitle+"]");
							}
							// dynamic alpha / opacity
							// -----------------------
							if ( this.szFlag.match(/DOPACITY/) ){

								// explicit alpha field or $density$
								// -----------------------------------------
								if ( this.szAlphaField ){
									nOpacity = 0;
									if ( typeof(this.itemA[a].nAlpha) != "undefined" ){
										var nPow = 1/(this.nDopacityPow||1);
										nOpacity = (this.nDopacityScale||1)/Math.pow(this.nMaxAlpha,nPow)*Math.pow(this.itemA[a].nAlpha,nPow);
									}
								}
								else

								// bipolar ? show min and max 
								// -----------------------------------------
								if ( (this.nMin < 0) && (this.nMax > 0) ){
									nOpacity = 0; 
									if ( this.szFlag.match(/DOPACITYMAX/) ){
										var nPow = 1/(this.nDopacityPow||1);
										nOpacity = Math.pow(Math.abs(nValue),nPow)/Math.pow((this.nMedianA[0]-this.nMin),nPow)*(this.fillOpacity||1)*(this.nDopacityScale||1);
									}
									else
									if ( this.szFlag.match(/DOPACITYLOG/) ){
										nOpacity = Math.log(Math.abs(nValue))/Math.log((this.nMedianA[0]-this.nMin))*0.5*(this.fillOpacity||1)*(this.nDopacityScale||1);
									}
									else{
										nOpacity = Math.abs(nValue)/(this.nMedianA[0]-this.nMin)*0.5*(this.fillOpacity||1)*(this.nDopacityScale||1);
									}
								}
								else

								// bipolar ? show min and max 
								// -----------------------------------------
								if ( this.szFlag.match(/BIPOLAR/) || this.szFlag.match(/DOPACITYMINMAX/) ){
									nOpacity = 0; 
									if ( this.szFlag.match(/DOPACITYMAX/) ){
										var nPow = 1/(this.nDopacityPow||1);
										if ( nValue >= this.nMeanA[0] ){
											nOpacity = Math.pow(Math.abs(nValue-this.nMeanA[0]),nPow)/Math.pow(Math.abs(this.nMax-this.nMeanA[0]),nPow)*(this.fillOpacity||1)*(this.nDopacityScale||1);
										}else{
											nOpacity = Math.pow(Math.abs(this.nMeanA[0]-nValue),nPow)/Math.pow(Math.abs(this.nMeanA[0]-this.nMin),nPow)*(this.fillOpacity||1)*(this.nDopacityScale||1);
										}
									}
									else
									if ( this.szFlag.match(/DOPACITYLOG/) ){
										if ( nValue >= this.nMedianA[0] ){
											nOpacity = Math.log(Math.abs(nValue-this.nMedianA[0]))/Math.log((this.nMax-this.nMedianA[0]))*(this.fillOpacity||1)*(this.nDopacityScale||1);
										}else{
											nOpacity = Math.log(Math.abs(nValue-this.nMedianA[0]))/Math.log((this.nMedianA[0]-this.nMin))*(this.fillOpacity||1)*(this.nDopacityScale||1);
										}
									}
									else{
										var nPow = 1/(this.nDopacityPow||1);
										if ( nValue >= this.nMedianA[0] ){
											nOpacity = Math.pow(Math.abs(nValue-this.nMedianA[0]),nPow)/Math.pow((this.nMax-this.nMedianA[0]),nPow)*(this.fillOpacity||1)*(this.nDopacityScale||1);
										}else{
											nOpacity = Math.pow(Math.abs(nValue-this.nMedianA[0]),nPow)/Math.pow((this.nMedianA[0]-this.nMin),nPow)*(this.fillOpacity||1)*(this.nDopacityScale||1);
										}
									}
								}

								// one range from min to max
								// --------------------------------------
								else{
									if ( this.szFlag.match(/DOPACITYMIN/) ){
										var nPow = 1/(this.nDopacityPow||1);
										nOpacity = Math.pow((this.nMax-nValue),nPow)/Math.pow((this.nMax-this.nMin),nPow)*(this.fillOpacity||1)*(this.nDopacityScale||1);
									} // ------------------------------------------------------------------------------
									else
									if ( this.szFlag.match(/DOPACITYMAX/) ){
										var nPow = 1/(this.nDopacityPow||1);
										nOpacity = Math.pow((nValue-this.nMin),nPow)/Math.pow((this.nMax-this.nMin),nPow)*(this.fillOpacity||1)*(this.nDopacityScale||1);
									} // ------------------------------------------------------------------------------
									else
									if ( this.szFlag.match(/DOPACITYLOG/) ){
										nOpacity = Math.log(nValue-this.nMin)/Math.log(this.nMedianA[0]-this.nMin)*0.5*(this.fillOpacity||1)*(this.nDopacityScale||1);
									} // ------------------------------------------------------------------------------
									else
									if ( this.szFlag.match(/DOPACITY/) ){
										nOpacity = (nValue-this.nMin)/(this.nMedianA[0]-this.nMin)*0.5*(this.fillOpacity||1)*(this.nDopacityScale||1);
									} // ------------------------------------------------------------------------------
								}

								// clip opacity
								nOpacity = (nOpacity < 0.0001) ? 0 : nOpacity;
								nOpacity = Math.min((this.nOpacity||0.9),nOpacity);

								// flag for auto opacity = more zoom, more transparency
								if ( this.autoOpacity ){
									nOpacity *= Math.max(0.3,(Math.min(1,0.3+0.7/Math.max(1,Math.log(map.Zoom.nZoom)))));
								}

								paintShape.style.setProperty("fill-opacity",String(nOpacity),"");
							}
						}
						this.itemA[a].todo = false; 
					}
					this.partsA[i].nCount++;
					this.partsA[i].nSum+=nValue;
					xFound = true;
					break;
				}
			}
		}

		if (!xFound){
			_TRACE('no value: '+a+', '+this.itemA[a].nValuesA[0]+', '+nValue);
			this.itemA[a].szColor = this.szNoDataColor?this.szNoDataColor:"white";
			tilesNodesA = this.getItemNodes(a);
			for ( j=0; j<tilesNodesA.length ;j++ ){
				var paintShape = this.paintShape(tilesNodesA[j],this.szNoDataColor?this.szNoDataColor:"white",-1);
				paintShape.setAttributeNS(szMapNs,"tooltip","no value");
				if ( this.szFlag.match(/DOPACITY/) ){
					paintShape.style.setProperty("fill-opacity","0","");
				} 
				this.nNoData++;
			}
		}
	}
	_TRACE("== done === ");
	this.isVisible = true;
	this.realizeDone();

	this.fShowProgressBar = false;
	this.showInfo();

	this.endDraw();

	if ( this.szFlag.match(/CLIP/) ){

		if ( (this.nClipFrames == this.itemA[a].nValuesA.length) ){
			if ( this.szXaxisA && this.szXaxisA[this.nActualFrame] ){
				displayMessage(this.szXaxisA[this.nActualFrame],3000,"big");
			}else
			if ( this.szLabelA && this.szLabelA[this.nActualFrame] ){
				displayMessage(this.szLabelA[this.nActualFrame],3000,"big");
			}
		}
		else{
			var labelA = this.szXaxisA || this.szLabelA;
			if ( labelA ){
				if ( this.nActualFrame == 0 ){
					displayMessage(labelA[0],3000,"big");
				}else
				if ( this.nActualFrame == (this.nClipFrames-1) ){
					displayMessage(labelA[1],3000,"big");
				}else{
					displayMessage(" ... ",3000,"big");
				}
			}
		}
	}else{
		if ( this.ErrorMessage ){
			displayMessage(this.ErrorMessage,10000,"notify");
			this.ErrorMessage = null;
		}else{
			clearMessage();
		}
	}

	// init creating label by a sleep and continue  
	// this way we allow the rendering of the choroplethe theme
	if ( this.szFlag.match(/VALUES/) &&
		 (!this.szValueUpper || (map.Scale.getTrueMapScale()*map.Scale.nZoomScale <= this.nValueUpper)) ){ 

		if (this.mapSleep){
			this.mapSleep.initCheckSleep(25);
		}
		this.fMakeLabel = true;
		this.fContinue = true;
		this.continueIndex = 0;
		this.nDoneCount = 0;
		this.nSkipCount = 0;
		this.nRealizedCount = 0;
		this.nZeroValueCount = 0;
		this.nMissingRangeCount = 0;
		this.nMissingPositionCount = 0;
		this.nActualFrame = 0;
		setTimeout("map.Themes.continueExecute()",250);

	}else{
		this.unlabelMap();
	}

};

/**
 * remove the map shapes colorizing styles of the theme
 */
MapTheme.prototype.unpaintMap = function(){

	_TRACE("== MapTheme.unpaintMap() ===> ");
	if ( this.szFlag.match(/CHART/)){
		if ( this.chartGroup ){

			// GR 29.04.2014 clear chart objects hosted by an other theme; if own chart group is empty  
			// 
			if ( (this.chartGroup.childNodes.length == 0) && this.itemA ){
				var chartGroup = null;
				for (a in this.itemA){
					if ( (chartGroup = SVGDocument.getElementById(this.szId+":"+a+":chartgroup" )) ){
						chartGroup.parentNode.removeChild(chartGroup);
					}
				}
			}

			var szId = this.chartGroup.getAttributeNS(null,"id");
			if ( this.szFlag.match(/CLIP/) || this.szFlag.match(/CLEAR/) || this.nGridWidthPx){
				map.Dom.removeElementById(szId);
			}else{
				executeWithMessage("map.Dom.removeElementById('"+szId+"');","cleaning up ...");
			}
			this.chartGroup = null;
		}
		return;
	}

	this.beginDraw();

	_TRACE("begin ===> ");
	for (var j=0; j<this.paintedShapeNodesA.length ;j++ ){
		this.unPaintShape(this.paintedShapeNodesA[j]);
		this.paintedShapeNodesA[j].removeAttributeNS(szMapNs,"tooltip");
	}
	this.paintedShapeNodesA.length = 0;
	_TRACE("end ===> ");

	this.unlabelMap();

	this.endDraw();

	_TRACE("== unpaintMap done === ");
	this.isVisible = false;
	this.checkVisible();

	setTimeout("map.Layer.adaptLabel(null)",10);
};

/**
 * paint one map shape
 * @parameter shapeNode the SVG node
 * @parameter szColor the color to set
 * @parameter nValue a number to store as metadata (SVG node attribute with namespace ixmaps) 
 */
MapTheme.prototype.paintShape = function(shapeNode,szColor,nValue){

	this.paintedShapeNodesA.push(shapeNode);

	switch ( this.szShapeType ){
		case "line":
			shapeNode.setAttributeNS(null,"style","stroke:"+szColor+";"+this.szStyle);
			break;
		case "line+buffer":
			var szId = shapeNode.getAttributeNS(null,"id");
			if ( !szId.match(":paint") ){
				var cloneShape = SVGDocument.getElementById(szId+":paint");
				if ( !cloneShape ){
					var cloneShape = shapeNode.cloneNode(1000);
					shapeNode.parentNode.insertBefore(cloneShape,shapeNode);
					cloneShape.setAttributeNS(null,"id",szId+":paint");
				}
				shapeNode = cloneShape;
			}
			var nStrokeWidth = 4;
			if ( this.nBufferSize ){
				if ( this.nBufferSize.match(/\$value\$/) ){
					var szEvalA = this.nBufferSize.split("$value$");
					var szEval = "";
					for ( var i=0; i<szEvalA.length; i++ ){
						szEval += szEvalA[i];
						if ( i < szEvalA.length-1 ){
							szEval += "nValue";
						}
					}
					nStrokeWidth = eval(szEval);
				}
				else
				if ( this.nBufferSize.match(/value/) ){
					var nDelta = 100/(this.nMin+0.000000001)*(this.nMax-this.nMin);
					if (nDelta>1000){
						nStrokeWidth = 6 + Math.log(nValue/this.nMax);
					}
					else {
						nStrokeWidth = 10 * nValue/(this.nMax-this.nMin);
					}
				}
				else{
					nStrokeWidth = this.nBufferSize;
				}
			}
			// GR 22.03.2011 adapt to featurescaling by zooming (maybe dynamic!)
			nStrokeWidth *= Math.log(1+1/__featureScaling_lastScale);

			shapeNode.setAttributeNS(null,"style","stroke:"+szColor+";stroke-width:"+map.Scale.normalX(nStrokeWidth)*map.Scale.nZoomScale+";"+this.szStyle+";stroke-linecap:butt;");
			break;

		default:
			shapeNode.setAttributeNS(null,"style","fill:"+szColor+";"+this.szStyle);
			break;
	}

	return shapeNode;
};
/**
 * unpaint one shape 
 * @parameter shapeNode the SVG node
 */
MapTheme.prototype.unPaintShape = function(shapeNode){

	if ( this.szShapeType == "line+buffer" ){
		var szId = shapeNode.getAttributeNS(null,"id");
		var cloneShape = SVGDocument.getElementById(szId+":paint");
		if (cloneShape){
			cloneShape.parentNode.removeChild(cloneShape);
		}
	}

	shapeNode.removeAttributeNS(null,"style");
};

// .............................................................................
//
// evidence choroplethe or chart classes by changing color, or isolate them
//
// .............................................................................

/**
 * zoom to the shapes of one class
 * @parameter nClass the index of the class to evidence  
 * @parameter nStep number of subsequent classes to evidence  
 */
MapTheme.prototype.zoomToClass = function(nClass,nStep){

	_TRACE("== MapTheme.zoomToClass() ===> ");

	var nCount=0;
	if ( this.szFlag.match(/DOMINANT/)){
		for (a in this.itemA){
			if ( this.itemA[a].nClass == nClass ){
				nCount++;
			}
		}
	}
	else{
		nCount = this.partsA[nClass].nCount;
	}

	if (  nCount == 0 ){
		displayMessage("No members !");
		return;
	}

	var j;
	var tilesNodesA = null;

	if ( this.szFlag.match(/CHART/)){
		var chartsA = this.chartGroup.childNodes;
		for ( var i=0; i<chartsA.length; i++){
			var chartNode = chartsA.item(i);
			if (chartNode.getAttributeNS(szMapNs,"value") == "seechilds" ){
				var childA = chartNode.firstChild.childNodes;
				for ( var ii=0; ii<childA.length; ii++){
					var childNode = childA.item(ii);
					var value = Number(childNode.getAttributeNS(szMapNs,"class"));
					if ( value == nClass ){
					}
				}
			}
			else{
				var value = Number(chartNode.getAttributeNS(szMapNs,"class"));
				if ( value == nClass ){
				}
			}
		}
		return;
	}

	if ( this.szFlag.match(/DOMINANT/)){
		for (a in this.itemA){
			if ( this.itemA[a].nClass == nClass && this.evidenceMode == "highlight" ){
				// highlight 
				tilesNodesA = this.getItemNodes(a);
				for ( j=0; j<tilesNodesA.length ;j++ ){

				}
			}
			else if ( this.itemA[a].nClass != nClass && this.evidenceMode != "highlight" ){
				// switch off 
				tilesNodesA = this.getItemNodes(a);
				for ( j=0; j<tilesNodesA.length ;j++ ){

				}
			}
		}
	}	
	else{

		var pStart = new point(100000,100000);
		var pEnd   = new point(-100000,-100000);

		var nMin = this.partsA[nClass].min;
		var nMax = this.partsA[nClass].max;
		for ( i=1; i<nStep; i++){
			nMin = Math.min(nMin,this.partsA[nClass+i].min);
			nMax = Math.max(nMax,this.partsA[nClass+i].max);
		}
		// GR 25.04.2011 
		if (this.szFlag.match(/EXACT/)){
			nMin++;
			nMax++;
		}

		for (a in this.itemA){
			if ( this.itemA[a].nValuesA[0] > nMin &&
				 this.itemA[a].nValuesA[0] < nMax ){
				tilesNodesA = this.getItemNodes(a);
				for ( j=0; j<tilesNodesA.length ;j++ ){
					bBox = map.Dom.getBox(tilesNodesA[j]);
					if ( bBox.width == 0 || bBox.height == 0 ){
						var nodeMatrixA = getMatrix(tilesNodesA[j]);
						bBox.x += nodeMatrixA[4]; 
						bBox.y += nodeMatrixA[5]; 
						bBox.width  = map.Scale.viewBox.width/20;
						bBox.height = map.Scale.viewBox.height/20;
						bBox.x -= bBox.width/2;
						bBox.y -= bBox.height/2;
					}
					var ptOffset = map.Scale.getMapOffset(tilesNodesA[j]);
					bBox.x += ptOffset.x;
					bBox.y += ptOffset.y;
					pStart.x = Math.min(pStart.x,bBox.x);
					pStart.y = Math.min(pStart.y,bBox.y);
					pEnd.x   = Math.max(pEnd.x,bBox.x+bBox.width);
					pEnd.y   = Math.max(pEnd.y,bBox.y+bBox.height);
				}
			}
		}
		var allBox = new box(pStart.x,pStart.y,pEnd.x-pStart.x,pEnd.y-pStart.y);
		allBox.scale(1.2);
		allBox =  map.Zoom.clipArea(allBox);

		map.Zoom.setNewArea(allBox);
	}
	_TRACE("== zoomToClass done === ");
};

/**
 * mark the map shapes of one class
 * @parameter nClass the index of the class to evidence  
 * @parameter nStep number of subsequent classes to evidence  
 */
MapTheme.prototype.markClass = function(nClass,nStep){

	_TRACE("== MapTheme.markClass() ===> ");

	if ( this.fMarkEnable == false ){
		return;
	}

	if ( ( map.Themes.enableSubThemes									) && 
		 ( this.szFields.match(/\|/)									) && 
		 ( this.szFlag.match(/DOMINANT/) && !this.szFlag.match(/CHART/)	) ) { 
		this.createSubTheme(nClass);
		return;
	}

	var fFilter = (this.szItemFilter && this.szItemFilter.length);

	if ( !this.szFlag.match(/CHART/) || fFilter ){
		this.fUnmarkEnable = true;
		this.unmarkClass();
		this.fUnmarkEnable = false;
	}

	if ( this.fMarkEnable == false ){
		return;
	}

	var nCount=0;
	if ( this.szFlag.match(/DOMINANT/) && !this.szFlag.match(/CHART/) ){
		for (a in this.itemA){
			if ( this.itemA[a].nClass == nClass ){
				nCount++;
			}
		}
	}
	else{
		nCount = this.partsA[nClass].nCount;
	}
	if ( nCount > 500 && this.evidenceMode == "highlight" ){
		displayMessage("Sorry ! to many members");
		return;
	}
	if (  nCount == 0 ){
		displayMessage("No members !");
		return;
	}

	clearMessage();
	highLightList.removeAll();

	var j;
	var tilesNodesA = null;

	if ( this.szFlag.match(/CHART/)){
		var chartsA = this.chartGroup.childNodes;
		for ( var i=0; i<chartsA.length; i++){
			var chartNode = chartsA.item(i);
			if (chartNode.getAttributeNS(szMapNs,"value") == "seechilds" ){

				// go through all child groups and look for atribute classng
				// switch on/off elements by class
				var childA = chartNode.getElementsByTagName('g');
				for ( var ii=0; ii<childA.length; ii++){

					var childAA = childA.item(ii).childNodes;
					for ( var iii=0; iii<childAA.length; iii++){

						var childNode = childAA.item(iii);
						if ( childNode.getAttributeNS && childNode.getAttributeNS(szMapNs,"class") ){

							if ( this.szFlag.match(/SEQUENCE/) && !this.szFlag.match(/PLOT/) ){
								var szTransform = childNode.getAttributeNS(null,"transform");
								if ( szTransform && szTransform.length ){
									childNode.setAttributeNS(szMapNs,"orig-transform",szTransform);
									childNode.setAttributeNS(null,"transform","");
								}
							}

							var value = Number(childNode.getAttributeNS(szMapNs,"class"));

							if ( this.szFlag.match(/PIE/) && ((this.szFieldsA.length > 1) || (this.szFlag.match(/AGGREGATE/) && this.szFlag.match(/EXACT/))) ){
								if ( value == nClass ){
									if ( this.szFlag.match(/VALUES/) || DonutCharts.partDrawOut(childNode) ){
										childNode.style.setProperty("opacity","1","");
									}
									childNode.style.setProperty("display","inline","");
								}else {
									if ( !DonutCharts.partDrawIn(childNode) ){
										childNode.style.setProperty("display","none","");
									}
									//childNode.style.setProperty("opacity","0.2","");
								}
							}else
							if ( this.szFlag.match(/BAR/)&& this.szFlag.match(/3D/) && !this.szFlag.match(/STACKED/) && ((this.szFieldsA.length > 1) || (this.szFlag.match(/AGGREGATE/) && this.szFlag.match(/EXACT/))) ){
								if ( value == nClass ){
									childNode.setAttributeNS(null,"transform","matrix(1 0 0 1 -10 6.6)");
									childNode.style.setProperty("fill-opacity","1","");
								}else {
									childNode.setAttributeNS(null,"transform","matrix(1 0 0 1 0 0)");
									childNode.style.setProperty("fill-opacity","0.85","");
								}
							}else
							if ( value == nClass ){
								if ( !fFilter ) {
									childNode.style.setProperty("display","inline","");
								}
							}
							else {
								childNode.style.setProperty("display","none","");
							}
						}
					}
				}
			}
			else{
				var value = Number(chartNode.getAttributeNS(szMapNs,"class"));
				if ( value == nClass ){
					if ( !fFilter ) {
						chartNode.style.setProperty("display","inline","");
					}
				}
				else {
					chartNode.style.setProperty("display","none","");
				}
			}
		}
		return;
	}

	this.beginDraw();
	if ( this.szFlag.match(/DOMINANT/)){
		for (a in this.itemA){
			if ( this.itemA[a].nClass == nClass && this.evidenceMode == "highlight" ){
				// highlight 
				tilesNodesA = this.getItemNodes(a);
				for ( j=0; j<tilesNodesA.length ;j++ ){
					highLightList.addItem(tilesNodesA[j]);
				}
			}
			else if ( this.itemA[a].nClass != nClass && this.evidenceMode != "highlight" ){
				// switch off 
				tilesNodesA = this.getItemNodes(a);
				for ( j=0; j<tilesNodesA.length ;j++ ){
					tilesNodesA[j].setAttributeNS(szMapNs,"themestyle",tilesNodesA[j].getAttributeNS(null,"style"));
					tilesNodesA[j].style.setProperty("display","none","");
				}
			}
		}
	}	
	else{
		var nMin = this.partsA[nClass].min;
		var nMax = this.partsA[nClass].max;
		for ( i=1; i<nStep; i++){
			nMin = Math.min(nMin,this.partsA[nClass+i].min);
			nMax = Math.max(nMax,this.partsA[nClass+i].max);
		}

		for (a in this.itemA){

			if (this.szFlag.match(/EXACT/) && (this.itemA[a].nValuesA[0] == nMin) ){
				if ( this.evidenceMode == "highlight" ){
					// highlight 
					tilesNodesA = this.getItemNodes(a);
					for ( j=0; j<tilesNodesA.length ;j++ ){
						highLightList.addItem(tilesNodesA[j]);
					}
				}
			}
			else
			if ( this.itemA[a].nValuesA[0] > nMin &&
				 this.itemA[a].nValuesA[0] < nMax ){
				if ( this.evidenceMode == "highlight" ){
					// highlight 
					tilesNodesA = this.getItemNodes(a);
					for ( j=0; j<tilesNodesA.length ;j++ ){
						highLightList.addItem(tilesNodesA[j]);
					}
				}
			}
			else{
				if ( this.evidenceMode != "highlight" ){
					// switch off 
					tilesNodesA = this.getItemNodes(a);
					for ( j=0; j<tilesNodesA.length ;j++ ){
						if ( this.szFlag.match(/BUFFER/) ){
							var nNode = SVGDocument.getElementById(tilesNodesA[j].getAttributeNS(null,"id")+":paint");
							if (nNode){
								nNode.style.setProperty("display","none","");
							}
						}
						else{
							tilesNodesA[j].setAttributeNS(szMapNs,"themestyle",tilesNodesA[j].getAttributeNS(null,"style"));
							tilesNodesA[j].setAttributeNS(null,"style",tilesNodesA[j].getAttributeNS(szMapNs,"origthemestyle"));
							// GR 11.11.2011 look for value node
							var nNode = SVGDocument.getElementById(tilesNodesA[j].firstChild.nextSibling.getAttribute("id")+"L");
							if (nNode){
								nNode.setAttributeNS(szMapNs,"display",nNode.style.getPropertyValue("display"));
								nNode.style.setProperty("display","none","");
							}
							var nNode = SVGDocument.getElementById(tilesNodesA[j].firstChild.nextSibling.getAttribute("id")+"L:bg");
							if (nNode){
								nNode.setAttributeNS(szMapNs,"display",nNode.style.getPropertyValue("display"));
								nNode.style.setProperty("display","none","");
							}
						}
					}
				}
			}
		}
	}

	this.endDraw();
	this.fMarkClass = true;
	_TRACE("== markClass done === ");
};

/**
 * unmark the map shapes of one class
 * @parameter nClass the index of the class to evidence  
 */
MapTheme.prototype.unmarkClass = function(nClass){

	if ( this.fUnmarkEnable == false ){
		return;
	}
	if ( this.subTheme ){
		this.removeSubTheme();
		return;
	}
	if ( this.szItemFilter && this.szItemFilter.length ){
		this.fMarkEnable = true;
		this.filterItems(this.szItemFilter,this.itemFilterOpt);
		return;
	}

	_TRACE("== MapTheme.unmarkClass() ===> ");
	clearMessage();

	if ( this.szFlag.match(/CHART/)){
		var chartsA = this.chartGroup.childNodes;
		for ( var i=0; i<chartsA.length; i++){
			var chartNode = chartsA.item(i);
			if (chartNode.getAttributeNS(szMapNs,"value") == "seechilds" ){

				// go through all child groups
				// switch on all elements with attribute class
				var childA = chartNode.getElementsByTagName('g');
				for ( var ii=0; ii<childA.length; ii++){

					var childAA = childA.item(ii).childNodes;
					for ( var iii=0; iii<childAA.length; iii++){

						var childNode = childAA.item(iii);
						if ( childNode.getAttributeNS && childNode.getAttributeNS(szMapNs,"class") ){

							if ( this.szFlag.match(/SEQUENCE/) ){
								var szTransform = childNode.getAttributeNS(szMapNs,"orig-transform");
								if ( szTransform && szTransform.length ){
									childNode.removeAttributeNS(szMapNs,"orig-transform");
									childNode.setAttributeNS(null,"transform",szTransform);
								}
							}

							if ( this.szFlag.match(/PIE/) ){
								DonutCharts.partDrawIn(childNode);
								childNode.style.setProperty("opacity","1","");
							}
							if ( this.szFlag.match(/BAR/) && this.szFlag.match(/3D/) && !this.szFlag.match(/STACKED/)){
								childNode.setAttributeNS(null,"transform","matrix(1 0 0 1 0 0)");
								childNode.style.setProperty("fill-opacity","1","");
							}
							if (childNode.style){
								childNode.style.setProperty("display","inline","");
							}
						}
					}
				}
			}
			else{
				chartNode.style.setProperty("display","inline","");
			}
		}
		if ( this.szFlag.match(/TEXTONLY/) ){
			setTimeout("map.Layer.adaptLabel()",10);
		}
		return;
	}
	
	this.beginDraw();

	if ( this.evidenceMode != "highlight" ){
		for (a in this.itemA){
			// switch on
			var tilesNodesA = this.getItemNodes(a);
			for (var j=0; j<tilesNodesA.length ;j++ ){
				if ( this.szFlag.match(/BUFFER/) ){
					var nNode = SVGDocument.getElementById(tilesNodesA[j].getAttributeNS(null,"id")+":paint");
					if (nNode){
						nNode.style.setProperty("display","inline","");
					}
				}
				else{
					var szThemeStyle = tilesNodesA[j].getAttributeNS(szMapNs,"themestyle");
					if ( szThemeStyle && szThemeStyle.length && szThemeStyle != "null" ){
						tilesNodesA[j].setAttributeNS(null,"style",szThemeStyle);
						tilesNodesA[j].removeAttributeNS(szMapNs,"themestyle");
						// GR 11.11.2011 look for value node
						var nNode = SVGDocument.getElementById(tilesNodesA[j].firstChild.nextSibling.getAttribute("id")+"L");
						if (nNode){
							nNode.style.setProperty("display",nNode.getAttributeNS(szMapNs,"display"),"");
						}
						var nNode = SVGDocument.getElementById(tilesNodesA[j].firstChild.nextSibling.getAttribute("id")+"L:bg");
						if (nNode){
							nNode.style.setProperty("display",nNode.getAttributeNS(szMapNs,"display"),"");
						}
					}
				}
			}
		}
	}
	else{
		highLightList.removeAll();
	}
	this.endDraw();
	this.fMarkClass = false;
	_TRACE("== unmarkClass done === ");
};

/**
 * show/hide the map shapes of one class
 * does choroplete and charts
 * @parameter nClass the index of the class to show  
 * @parameter nStep the index of the class to evidence  
 * @parameter fStatus the index of the class to evidence  
 */
MapTheme.prototype.showClass = function(nClass,nStep,fStatus){

	_TRACE("== MapTheme.showClass() ===> ");

	var nCount=0;
	if ( this.szFlag.match(/DOMINANT/)){
		for (a in this.itemA){
			if ( this.itemA[a].nClass == nClass ){
				nCount++;
			}
		}
	}
	else{
		nCount = this.partsA[nClass].nCount;
	}

	clearMessage();

	var j;
	var tilesNodesA = null;
	var szDisplayAttribute = fStatus?"inline":"none";

	if ( this.szFlag.match(/CHART/)){

		// chart themes
		// -------------

		var chartsA = this.chartGroup.childNodes;
		for ( var i=0; i<chartsA.length; i++){
			var chartNode = chartsA.item(i);
			if (chartNode.getAttributeNS(szMapNs,"value") == "seechilds" ){
				var childA = chartNode.firstChild.childNodes;
				for ( var ii=0; ii<childA.length; ii++){
					var childNode = childA.item(ii);
					var value = Number(childNode.getAttributeNS(szMapNs,"class"));
					if ( value == nClass ){
						childNode.style.setProperty("display",szDisplayAttribute,"");
					}
				}
			}
			else{
				var value = Number(chartNode.getAttributeNS(szMapNs,"class"));
				if ( value == nClass ){
					chartNode.style.setProperty("display",szDisplayAttribute,"");
				}
			}
		}

	}else{

		// choroplete themes
		// ------------------

		this.beginDraw();

		if ( this.szFlag.match(/DOMINANT/)){
			for (a in this.itemA){
				if ( this.itemA[a].nClass == nClass ){
					// switch off 
					tilesNodesA = this.getItemNodes(a);
					for ( j=0; j<tilesNodesA.length ;j++ ){
						tilesNodesA[j].setAttributeNS(szMapNs,"themestyle",tilesNodesA[j].getAttributeNS(null,"style"));
						tilesNodesA[j].style.setProperty("display",szDisplayAttribute,"");
					}
				}
			}
		}	
		else{
			var nMin = this.partsA[nClass].min;
			var nMax = this.partsA[nClass].max;
			for ( i=1; i<nStep; i++){
				nMin = Math.min(nMin,this.partsA[nClass+i].min);
				nMax = Math.max(nMax,this.partsA[nClass+i].max);
			}
			// GR 25.04.2011 
			if (this.szFlag.match(/EXACT/)){
				nMin++;
				nMax++;
			}
			for (a in this.itemA){
				if ( ( this.szFlag.match(/EXACT/) && (this.itemA[a].nValuesA[0] == nMin)) ||
					 ((this.itemA[a].nValuesA[0] > nMin) && (this.itemA[a].nValuesA[0] < nMax))
					){
					tilesNodesA = this.getItemNodes(a);
					for ( j=0; j<tilesNodesA.length ;j++ ){
						if ( this.szFlag.match(/BUFFER/) ){
							var nNode = SVGDocument.getElementById(tilesNodesA[j].getAttributeNS(null,"id")+":paint");
							if (nNode){
								nNode.style.setProperty("display",szDisplayAttribute,"");
							}
						}
						else{
							if ( fStatus ){							// show theme color
								var szThemeStyle = tilesNodesA[j].getAttributeNS(szMapNs,"themestyle");
								if ( szThemeStyle && szThemeStyle.length && szThemeStyle != "null" ){
									tilesNodesA[j].setAttributeNS(null,"style",szThemeStyle);
									tilesNodesA[j].removeAttributeNS(szMapNs,"themestyle");
								}
							}
							else{
								// show orig layer color
								tilesNodesA[j].setAttributeNS(szMapNs,"themestyle",tilesNodesA[j].getAttributeNS(null,"style"));
								tilesNodesA[j].setAttributeNS(null,"style",tilesNodesA[j].getAttributeNS(szMapNs,"origthemestyle"));
							}
						}
					}
				}
			}
		}
		this.endDraw();
	}

	_TRACE("== showClass done === ");
};

// .............................................................................
//
// subtheme of a dominant choroplethe theme
//
// .............................................................................

/**
 * make a sub theme of a dominant theme
 * this is a 'normal' choroplete theme with one color/data column of the multicolumn dominant theme  
 * @parameter nClass the index of the class to create the SubTheme
 */
MapTheme.prototype.createSubTheme = function(nClass){

	if ( this.subTheme ){
		this.removeSubTheme();
	}
	var	szDbTable = "";
	var	szLookupField = "";
	var	szAlphaField = "";
	var	szAlphaField100 = "";
	var szDopacityScale = "";
	var szDopacityPow = "";
	var szDopacity = "";
	var szAttributes = "";

	if ( this.coTable && (typeof(this.coTable) != "undefined") ){
		szDbTable = "dbtable:"+this.coTable+";";
	}
	if ( this.szSelectionField && (typeof(this.szSelectionField) != "undefined") ){
		szLookupField = "lookupfield:"+this.szSelectionField+";";
	}
	if ( this.szAlphaField && (typeof(this.szAlphaField) != "undefined") ){
		szAlphaField = "alphafield:"+this.szAlphaField+";";
	}
	if ( this.szAlphaField100 && (typeof(this.szAlphaField100) != "undefined") ){
		szAlphaField100 = "alphafield100:"+this.szAlphaField100+";";
	}
	if ( this.nDopacityScale && (typeof(this.nDopacityScale) != "undefined") ){
		szDopacityScale = "dopacityscale:"+this.nDopacityScale+";";
	}
	if ( this.nDopacityPow && (typeof(this.nDopacityPow) != "undefined") ){
		szDopacityPow = "dopacitypow:"+this.nDopacityPow+";";
	}
	if ( this.szFlag.match(/DOPACITY/)){
		szDopacity += "DOPACITYMAX|";
	}
	if ( this.szFlag.match(/AGGREGATE/)){
		szDopacity += "AGGREGATE|";
	}
	if ( this.szFlag.match(/SUM/)){
		szDopacity += "SUM|";
	}
	if ( this.szFlag.match(/ZEROISVALUE/)){
		szDopacity += "ZEROISVALUE|";
	}
	if ( this.szFlag.match(/VALUES/)){
		szDopacity += "VALUES|";
	}
	if ( this.szAggregationField && (typeof(this.szAggregationField) != "undefined") ){
		szAttributes += "aggregationfield:"+this.szAggregationField+";";
	}
	if ( this.szUnits && (typeof(this.szUnits) != "undefined") ){
		szAttributes += "units:"+this.szUnits+";";
	}
	map.Themes.enableMultiChoroplethe = true;
	
	var tempTheme = 
	map.Themes.newTheme2(this.szThemes
						,this.szFields.split("|")[nClass],this.szField100
						,"type:CHOROPLETHE|QUANTILE|NOINFO|SUBTHEME|"+szDopacity+";colorscheme:7|white|"+this.colorScheme[nClass]+ ";" + szDbTable + szLookupField + szAlphaField + szAlphaField100 + szDopacityScale + szDopacityPow + szAttributes
						// ,"type:CHART|BAR|POINTER|OFFSETMEAN|DOMINANT|PERCENTOFMEAN|NOINFO|SUBTHEME;scale:1.2;colorscheme:7,white,"+this.colorScheme[nClass]+ ";" + szDbTable + szLookupField
						,this.szLabelA[nClass]
						,"");
	this.subTheme = tempTheme;

	map.Themes.subTheme = this;
};
/**
 * delete a sub theme of a dominant theme
 */
MapTheme.prototype.removeSubTheme = function(){

	map.Themes.enableMultiChoroplethe = false;
	if ( this.subTheme ){
		map.Themes.subTheme = false;
		map.Themes.removeTheme(null,this.subTheme.szId);
		this.subTheme = null;
		map.Themes.realizeDone(this);
	}
};

// .............................................................................
//
// filter items of a realized theme 
//
// .............................................................................

/**
 * apply filter to one theme item and return boolean result
 * @parameter objTheme javascript object tha holds all theme values  
 * @parameter item the theme item to check
 * @parameter szFilter a filter expression to check
 * @parameter opt optional options (obj)
 * @type boolean
 * @return true if item matches the filter condition
 */
MapTheme.prototype.isItemInFilter = function(objTheme,item,szFilter,opt){
	if ( (szFilter.length == 0) && !(opt && opt.field) ){
		return true;
	}
	if ( typeof(item.dbIndex) != "undefined" ){
		var row = item.dbIndex;
		this.__szValue = objTheme.dbRecords[row].join(' ');
		if ( szFilter.length ){
			if ( eval("this.__szValue.match(/"+szFilter.replace(/\//gi,"\\/")+"/i)") ){
				return true;
			}
		}else{
			if ( opt && opt.field ){

				for ( var i=0; i<objTheme.dbFields.length; i++ ){
					if ( objTheme.dbFields[i].id == opt.field ){
						if ( opt.min && (objTheme.dbRecords[row][i] < opt.min) ){
							return false;
						}
						if ( opt.max && (objTheme.dbRecords[row][i] > opt.max) ){
							return false;
						}
					}
				}
				return true;
			}
		}
	}
	return false;
};
/**
 * mark or isolate the theme items which match to a filter string
 * @parameter szFilter a filter expression to check
 * @parameter opt optional options (obj)
 */
MapTheme.prototype.filterItems = function(szFilter,opt){

	_TRACE("== MapTheme.filterItems() ===> ");

	if ( this.fMarkEnable == false ){
		return;
	}

	this.szItemFilter = szFilter;
	this.itemFilterOpt = opt;
	this.filterNodesA = (szFilter.length || (opt && opt.field) )?[]:null;

	var objTheme = null;
	var row = null;

	for ( var i=0; i<this.szThemesA.length; i++ ){
		objTheme = this.objThemesA[this.szThemesA[i]];
		if ( objTheme && objTheme.dbRecords ){
			break;
		}
	}
	if ( !objTheme || !objTheme.dbRecords ){
		return;
	}

	if ( this.szFlag.match(/CHART/) ){
		var chartsA = this.chartGroup.childNodes;
		for ( var i=0; i<chartsA.length; i++){

			var nodesA = [];
			var chartNode = chartsA.item(i);
			nodesA.push(chartNode);

			for ( var ii=0; ii<nodesA.length; ii++ ){
				szId = nodesA[ii].getAttributeNS(null,"id");
				szId = szId.split(":")[1]+"::"+szId.split(":")[3];
				if ( this.itemA[szId] ){
					if ( this.isItemInFilter(objTheme,this.itemA[szId],szFilter,opt) ){
						chartNode.style.setProperty("display","inline","");
						if ( this.filterNodesA ){
							this.filterNodesA.push(szId);
						}
					}else{
						chartNode.style.setProperty("display","none","");
					}
				}else{
					chartNode.style.setProperty("display","inline","");
				}
			}
		}
	}else{
		this.beginDraw();
		for (a in this.itemA){
			if ( this.itemA[a] ){
				if ( typeof(this.itemA[a].dbIndex) != "undefined" ){

					if ( this.isItemInFilter(objTheme,this.itemA[a],szFilter,opt) ){

						if ( this.filterNodesA ){
							this.filterNodesA.push(a);
						}

						// switch on 
						tilesNodesA = this.getItemNodes(a);
						for ( j=0; j<tilesNodesA.length ;j++ ){
							if ( this.szFlag.match(/BUFFER/) ){
								var nNode = SVGDocument.getElementById(tilesNodesA[j].getAttributeNS(null,"id")+":paint");
								if (nNode){
									nNode.style.setProperty("display","inline","");
								}
							}
							else{
								var szThemeStyle = tilesNodesA[j].getAttributeNS(szMapNs,"themestyle");
								if ( szThemeStyle && szThemeStyle.length && szThemeStyle != "null" ){
									tilesNodesA[j].setAttributeNS(null,"style",szThemeStyle);
									tilesNodesA[j].removeAttributeNS(szMapNs,"themestyle");
									// GR 11.11.2011 look for value node
									var nNode = SVGDocument.getElementById(tilesNodesA[j].firstChild.nextSibling.getAttribute("id")+"L");
									if (nNode){
										nNode.style.setProperty("display",nNode.getAttributeNS(szMapNs,"display"),"");
									}
									var nNode = SVGDocument.getElementById(tilesNodesA[j].firstChild.nextSibling.getAttribute("id")+"L:bg");
									if (nNode){
										nNode.style.setProperty("display",nNode.getAttributeNS(szMapNs,"display"),"");
									}
								}
							}
						}
					}else{
						// switch off 
						tilesNodesA = this.getItemNodes(a);
						for ( j=0; j<tilesNodesA.length ;j++ ){
							if ( this.szFlag.match(/BUFFER/) ){
								var nNode = SVGDocument.getElementById(tilesNodesA[j].getAttributeNS(null,"id")+":paint");
								if (nNode){
									nNode.style.setProperty("display","none","");
								}
							}
							else{
								if ( !tilesNodesA[j].getAttributeNS(szMapNs,"themestyle") ){
									tilesNodesA[j].setAttributeNS(szMapNs,"themestyle",tilesNodesA[j].getAttributeNS(null,"style"));
								}
								tilesNodesA[j].setAttributeNS(null,"style",tilesNodesA[j].getAttributeNS(szMapNs,"origthemestyle"));
								// GR 11.11.2011 look for value node
								var nNode = SVGDocument.getElementById(tilesNodesA[j].firstChild.nextSibling.getAttribute("id")+"L");
								if (nNode){
									nNode.setAttributeNS(szMapNs,"display",nNode.style.getPropertyValue("display"));
									nNode.style.setProperty("display","none","");
								}
								var nNode = SVGDocument.getElementById(tilesNodesA[j].firstChild.nextSibling.getAttribute("id")+"L:bg");
								if (nNode){
									nNode.setAttributeNS(szMapNs,"display",nNode.style.getPropertyValue("display"));
									nNode.style.setProperty("display","none","");
								}
							}
						}
					}
				}
			}
		}
		this.endDraw();
	}

	this.fMarkClass = true;
	_TRACE("== filterItems done === ");
};

/**
 * make a theme selection out of the filtered items
 */
MapTheme.prototype.selectFilterItems = function(){
	var newSelection = map.Selections.newSelection("generic",this.filterNodesA,"type:queryresult",this.szItemFilter);
};



// .............................................................................
//
// value label for chloroplethe themes
//
// .............................................................................

/**
 * create value label on the map
 * is called several times with a item index to start or continue
 * @parameter startIndex if 0, init labeling map items, else, continue labeling
 */
MapTheme.prototype.labelMap = function(startIndex){

	_TRACE("== MapTheme.labelMap("+startIndex+")===> "+(this.szId));
	_TRACE("== ==> ");

	var zoomBox = map.Zoom.getBox();
	var ptOff = null;

	var nFontSize = 11;
	var szFontFamily = "verdana";

	this.szValuesTextStyle   = "font-family:"+szFontFamily+";font-size:"+map.Scale.normalX(nFontSize) +"px;pointer-events:none";

	if ( !startIndex || startIndex == 0 ){
		var a = 0;
		startIndex = 0;
		this.indexA = new Array(0);

		// check visibility
		// 
		var nToDraw = 0;
		var nCharts = 0;
		if ( this.fClipCharts ){ 
			for (a in this.itemA){
				nCharts++;
				if ( this.itemA[a].nValuesA && (this.itemA[a].nValuesA.length > 0)){
					var ptOff = this.getNodePosition(this.itemA[a].szSelectionId);
					if ( !ptOff ){
						continue;
					}
					if ( ptOff.x < zoomBox.x				||
						 ptOff.x > zoomBox.x+zoomBox.width  ||
						 ptOff.y < zoomBox.y				||
						 ptOff.y > zoomBox.y+zoomBox.height ){
						this.nSkipCount++;
						if ( (chartGroup = SVGDocument.getElementById(this.szId+":"+a+":chart" )) ){
							chartGroup.parentNode.removeChild(chartGroup);
							this.chartPosA[this.itemA[a].szSelectionId] = null;
							this.posItemA[this.itemA[a].szSelectionId] = null;
						}
						continue;
					}
					this.indexA[this.indexA.length] = a;
					nToDraw++;
				}
			}
		}else{
			for (a in this.itemA){
				this.indexA[this.indexA.length] = a;
				nCharts++;
				nToDraw++;
			}
		}

		_TRACE(nToDraw+" to draw ("+nCharts+")");

		if ( nToDraw > this.nMaxThemeCharts ){
			this.indexA.length = 0;
			this.nSkipCount = nToDraw;
		}
		
		if ( this.mapSleep ){
			this.mapSleep.nCount = nToDraw;
		}
		this.fEnableProgressBar = false;
	}

	for ( var nAi=startIndex; nAi<this.indexA.length; nAi++ ){

		// execution canceled ? -----------------
		if ( this.fCancel ){
			displayMessage("Canceled by user",1000,true);
			this.fCancel = false;
			return;
		}

		// sleep work around to show progress -----------------
		if ( this.mapSleep ){
			this.mapSleep.nDoneCount = this.nDoneCount;
			if ( this.mapSleep.checkSleep(nAi,10) ){
				this.fContinue = true;
				this.continueIndex = nAi;
				return;
			}
		}

		var a = this.indexA[nAi];
			
		this.nDoneCount++;

		if ( this.itemA[a].nValuesA && (this.itemA[a].nValuesA.length > 0)){

			// first check, if we have a position, if not -> no chart
			ptOff = this.getNodePosition(this.itemA[a].szSelectionId);

			if (!ptOff ){
				_TRACE("missing position: "+a);
				this.nMissingPositionCount++;
				continue;
			}

			// check if position visible
			if ( this.fClipCharts && !this.szFlag.match(/BUFFER/) ){ // && !this.szFlag.match(/EXACT/) ){
				if ( ptOff.x < zoomBox.x				||
					 ptOff.x > zoomBox.x+zoomBox.width  ||
					 ptOff.y < zoomBox.y				||
					 ptOff.y > zoomBox.y+zoomBox.height ){
					this.nSkipCount++;
					continue;
				}
			}

			var tilesNodesA = this.getItemNodes(a);
			for ( j=0; j<tilesNodesA.length ;j++ ){
				var nValue = this.itemA[a].szLabel?this.itemA[a].szLabel:this.itemA[a].nValue;
				this.labelShape(tilesNodesA[j],this.itemA[a].szColor,nValue);
			}
		}
	}

	this.fMakeLabel = false;
	
	setTimeout("map.Layer.adaptLabel(null)",10);

	_TRACE("== done === ");
};

/**
 * unlabel one theme 
 */
MapTheme.prototype.unlabelMap = function(){

	for (a in map.Layer.generatedLabelA){
		map.Dom.removeElementById(a);
		map.Layer.generatedLabelA[a] = null;
	}

};

/**
 * create label for one map shape
 * @parameter shapeNode the map shape node (SVG) to label
 * @parameter szColor the color for the label
 * @parameter nValue the value to display (as label)
 */
MapTheme.prototype.labelShape = function(shapeNode,szColor,nValue){
			
	if ( this.szFlag.match(/VALUES/) && nValue != "undefined" && typeof(nValue) != "undefined" ){

		// GR 21.10.2015 don't draw zeros if NOZERO is set
		if ( this.szFlag.match(/NOZERO/) && (nValue == 0) ){
			return;
		}
		var szFontStyle = "font-family:verdana;font-weight:normal";

		var szParentId = shapeNode.parentNode.getAttributeNS(null,"id");
		var labelParentNode = SVGDocument.getElementById(szParentId+":label");
		if ( labelParentNode ){
			var valueParentBgNode = SVGDocument.getElementById(szParentId+":values:bg");
			if ( !valueParentBgNode ){
				valueParentBgNode = map.Dom.newGroup(labelParentNode.parentNode,szParentId+":values:bg");
				map.Layer.generatedLabelA[szParentId+":values:bg"] = valueParentBgNode;
			}
			var valueParentNode = SVGDocument.getElementById(szParentId+":values");
			if ( !valueParentNode ){
				valueParentNode = map.Dom.newGroup(labelParentNode.parentNode,szParentId+":values");
				map.Layer.generatedLabelA[szParentId+":values"] = valueParentNode;
			}

			// make label id
			try{
				var szId = shapeNode.firstChild.nextSibling.getAttributeNS(null,"id");
				var szIdA = szId.split("#");
				var szValueNodeId = szIdA[0]+"L"+(szIdA[1]?("#"+szIdA[1]):"");
			}
			catch (e){
				var szValueNodeId = shapeNode.getAttributeNS(null,"id") + ":::value";
			}

			// test if we have already the value text
			if ( SVGDocument.getElementById(szValueNodeId) ){
				return;
			}
			// create the value text
			var cColor = __maptheme_getChartColors(szColor);

			if ( typeof(nValue) == "string" ){
				var szValue = nValue;
			}else{
				var szValue = this.formatValue(nValue,this.szValueDecimals||1)+ (this.szUnit.match(/\%/)?"%":"");
			}

			var szTColor  = "#ffffff";
			var szTColor  = this.szTextColor||cColor.highColor;
			var szBgColor = cColor.lowColor;

			// GR 04.07.2013 DOPACITY
			// ----------------------
			var nScale = 1;
			var szOpacity = "1";
			if ( this.szFlag.match(/DOPACITY/) ){
				szOpacity = shapeNode.style.getPropertyValue("fill-opacity");
				nScale = Math.min(1.3,(3*Number(szOpacity)));
			}
			// ----------------------
			// var nFontSize = map.Scale.normalX(11)*map.Scale.nZoomScale*nScale;
			var nFontSize = map.Scale.normalX(11) * map.Scale.nZoomScale * nScale * map.Scale.nLabelScaling * (this.nLabelScale||1);
			var newTextbg  = map.Dom.newText(valueParentBgNode,0,0,szFontStyle+";font-size:"+ nFontSize +"px;text-anchor:middle;fill:none;stroke:"+szBgColor+";stroke-width:"+ map.Scale.normalX(4)*map.Scale.nZoomScale +";stroke-opacity:0.5;pointer-events:none;display:none;stroke-linejoin:bevel;",szValue);
			var newText  = map.Dom.newText(valueParentNode,0,0,szFontStyle+";font-size:"+ nFontSize +"px;text-anchor:middle;fill:"+szTColor+";stroke:none;pointer-events:none;display:none;",szValue);

			newText.setAttributeNS(null,"id",szValueNodeId);
			newTextbg.setAttributeNS(null,"id",szValueNodeId+":bg");

			// GR 04.07.2013 DOPACITY
			// ----------------------
			if ( this.szFlag.match(/DOPACITY/) ){
				newText.style.setProperty("fill-opacity",szOpacity,"");
				newTextbg.style.setProperty("stroke-opacity",szOpacity,"");
			}
			// ----------------------

			var szCenter = shapeNode.getAttributeNS(szMapNs,"center");
			if ( szCenter ){
				var szCenterA = szCenter.split(',');
				var ptPos = new point( Number(szCenterA[0].split(':')[1]), Number(szCenterA[1].split(':')[1]) );
			}else{
				var ptPos = this.getNodePosition(shapeNode.getAttributeNS(null,"id"));
			}

			if ( ptPos ){
				newText.fu.setPosition(ptPos.x,ptPos.y);
				newTextbg.fu.setPosition(ptPos.x,ptPos.y);
			}
			else{
				_TRACE(shapeNode.getAttributeNS(null,"id")+" no position");
			}
		}
		else{
			// _TRACE(shapeNode.getAttributeNS(null,"id")+" not found");
		}
	}
};

// .............................................................................
//
// chart themes
//
// .............................................................................

/**
 * create charts of one theme on the map
 * is called several times with a item index to start or continue
 * @parameter startIndex if 0, init labeling map items, else, continue labeling
 */
MapTheme.prototype.chartMap = function(startIndex){

	_TRACE("== MapTheme.chartMap("+startIndex+")===> "+(this.szId));
	_TRACE("== ==> ");

	if ( this.nChartUpper && !(map.Scale.getTrueMapScale()*map.Scale.nZoomScale <= this.nChartUpper) ){ 
		this.unpaintMap();
		this.realizeDone();
		return;
	}

	// GR 20.10.2016 test test test if (0)
	if ( 0 && !startIndex && this.szFlag.match(/CLEAR/) ){
		for ( var i=0; i<map.Themes.themesA.length; i++ ){
			if ( (map.Themes.themesA[i] != this) && map.Themes.themesA[i].szFlag.match(/CHART/)){
				map.Themes.themesA[i].unpaintMap();
				map.Themes.themesA[i].fRemove = true;
			}
		}
	}
	if ( this.chartGroup && !startIndex  ){
			this.chartPosA = new Array(0);
	}

	var nChartSize = this.nChartSize?this.nChartSize:30;
	var zoomBox = map.Zoom.getBox();

	// GR 13.12.2015 box must be larger, to show all charts also if they are partly outside 
	if ( this.szFlag.match(/AGGREGATE/) && this.nGridWidth ){
		var deltaX = map.Scale.getDeltaXofDistanceInMeter((this.nGridWidth||0))*map.Scale.nZoomScale;
		zoomBox.x -= deltaX/2;
		zoomBox.y -= deltaX/2;
		zoomBox.width  += deltaX;
		zoomBox.height += deltaX;
	}else{
		var deltaX = map.Scale.normalX(30)*map.Scale.nZoomScale;
		zoomBox.x -= deltaX/2;
		zoomBox.y -= deltaX/2;
		zoomBox.width  += deltaX;
		zoomBox.height += deltaX;
	}

	var ptOff = null;

	var szColor = "#777777";
	var szLColor = "#888888";
	var nFontSize = 8;

	// ---------------------------------
	// first call, do the initializing !
	// ---------------------------------

	if ( !startIndex || startIndex == 0 ){

		_TRACE("first call to chartMap(), do the initializing !");

		// no values, no charts		
		// --------------------				
		if ( !this.partsA ){
			return;
		}
		var a = 0;
		startIndex = 0;
		this.indexA = new Array(0);

		// some preparations
		// -----------------
		this.szValuesLineStyle   = "stroke:white;stroke-width:"+map.Scale.normalX(1.5)+";opacity:0.5;";
		this.szValuesLineBgStyle = "stroke:"+szLColor+";stroke-width:"+map.Scale.normalX(0.5)+";opacity:1;";
		this.szValuesTextStyle   = "font-family:"+(this.szTextFont||"arial")+";font-size:"+map.Scale.normalX(nFontSize) +"px;fill:"+szColor+";pointer-events:none";

		var objectGroup = map.Layer.objectGroup;
		if ( !this.chartGroup ){
			this.chartGroup = map.Dom.newGroup(objectGroup,this.szId+":chartgroup");
			this.chartGroup.style.setProperty("opacity",String(this.nOpacity?this.nOpacity:1),"");

			// GR 17.12.2015 aggregated by grid with autosize, no object scaling on zoom	 
			if ( this.szFlag.match(/NOSCALE/) ){
				antiZoomAndPanList.addGroup(this.chartGroup);
			}
			// GR 17.12.2015 aggregated by grid with autosize, no object scaling on zoom	 
			if ( this.szFlag.match(/AGGREGATE/) && (this.szFlag.match(/AUTOSIZE/)||this.szFlag.match(/GRIDSIZE/)) ){
				antiZoomAndPanList.addGroup(this.chartGroup);
			}

			if ( this.szFlag.match(/BUFFER/) ){
				if ( this.szFlag.match(/OVERLAY/) && !this.szShapeType.match(/line/) ){
					this.chartGroup.style.setProperty("opacity",String(1),"");
				}
				// GR buffer sotto object
				var layerObj = map.Layer.getLayerObj(this.szThemesA[0]);
				if (0 && !layerObj.szFlag.match(/tiled/)){
					layerRootNode = SVGDocument.getElementById(layerObj.szName);
					this.chartGroup = layerRootNode.parentNode.insertBefore(this.chartGroup,layerRootNode);
				}
				this.chartGroup.style.setProperty("pointer-events","none","");
				antiZoomAndPanList.addGroup(this.chartGroup);

				// GR 20.09.2011 try to set style here !! for all buffer charts
				// -------------------------------------------------------
				var szColor		= this.colorScheme[0];
				var szLineColor = this.colorScheme[1]?this.colorScheme[1]:"red";
				if ( typeof(this.szBorderColor) != 'undefined' ) {
					szLineColor = this.szBorderColor;
				}
				var szLineStyle = "stroke-width:0;";
				if ( typeof(this.szBorderStyle) != 'undefined' ) {
					switch(this.szBorderStyle){
						case "dotted": szLineStyle = "stroke-width:"+map.Scale.normalX(1.0)+";stroke-linecap:round;stroke-dasharray:1,50;"; break; 
						case "dashed": szLineStyle = "stroke-width:"+map.Scale.normalX(1.0)+";stroke-linecap:butt;stroke-dasharray:30,30;"; break; 
						case "solid":  szLineStyle = "stroke-width:"+map.Scale.normalX(1.0)+";"; break; 
						case "none":   szLineStyle = "stroke-width:0;"; break; 
					}
				}
				if ( typeof(this.szBorderWidth) != 'undefined' ) {
					switch(this.szBorderWidth){
						case "thin":   szLineStyle += "stroke-width:"+map.Scale.normalX(0.5)+";"; break; 
						case "thick":  szLineStyle += "stroke-width:"+map.Scale.normalX(1.5)+";"; break; 
					}
				}
				var nFillOpacity = this.fillOpacity?this.fillOpacity:(this.nOpacity?this.nOpacity:0);
				this.chartGroup.setAttributeNS(null,"style","fill:"+szColor+";fill-opacity:"+nFillOpacity+";stroke:"+szLineColor+";"+szLineStyle+";");
				// -------------------------------------------------------
			}
		}
		// GR 04.11.2014 make blur for the objects
		this.blur(this.nBlur);

		if ( this.mapSleep ){
			this.mapSleep.checkSleepMessage = "creating charts";
		}

		// check the chart size
		var nSize = nChartSize*this.nScale*map.Scale.nFeatureScaling*map.Scale.nObjectScaling*map.Zoom.nZoom;
		if (  fObjectScaling ){
			nSize = nChartSize*this.nScale*map.Scale.nFeatureScaling*map.Scale.nObjectScaling;
		}
		// get the canvas rotation
		var nRot = getRotateAttributeValue(map.Scale.canvasNode);

		// GR 15.12.2016 we must sort all charts 
		// -------------------------------------
		if ( this.szFlag.match(/SORT/) && !(this.szFlag.match(/SEQUENCE/)||this.szFlag.match(/3D/)) ){

			this.indexA = [];

			for (a in this.itemA){
				this.indexA[this.indexA.length] = a;
			}
			var sortA = [];

			for ( var i=0; i<this.indexA.length; i++){
				var nValue = this.itemA[this.indexA[i]].nValuesA[this.nActualFrame || 0];
				if ( this.itemA[this.indexA[i]].nSize ){
					nValue = this.itemA[this.indexA[i]].nSize;
				}
				else if ( this.szFlag.match(/SIZE/) && this.itemA[this.indexA[i]].nValueSum ){
					nValue = this.itemA[this.indexA[i]].nValueSum;
				}
				if ( isNaN(nValue) ){
					continue;
				}
				sortA.push({a:this.indexA[i],y:nValue});
			}

			// sort charts
			// attention; up -> down because the last chart will be on top of the others
			if ( this.szFlag.match(/UP/) ){
				sortA.sort(this.sortDownChartObjectsCompare);
			}else{
				sortA.sort(this.sortUpChartObjectsCompare);
			}

			if ( this.szValueField && (this.szValueField == "$index$") ){
				for ( var i=0; i<sortA.length; i++){
					this.itemA[sortA[i].a].szValue = String(sortA.length-i);
				}
			}

			this.indexA = [];
		}

		// ----------------- end of some preparations

		// clear counts for sequenze parts
		// -----------------------------
		if ( this.szFlag.match(/CHART/) && !this.szFlag.match(/EXACT/)  ){
			for ( s=0;s<this.partsA.length;s++ ){
				this.partsA[s].nCount = 0;
				this.partsA[s].nSum = 0;
			}
			this.fRedrawInfo = true;
			// GR 20.11.2013 if SEQUENCE set nFadeNegative to 1 if not yet set
			if ( this.szFlag.match(/SEQUENCE/) ){
				this.nFadeNegative = this.nFadeNegative || 1;
			}
		}

		// check visibility
		// 
		var nToDraw = 0;
		var nCharts = 0;
		var nNoPos = 0;
		if ( this.fClipCharts && !this.szFlag.match(/BUFFER/) ){ 
			for ( i=0;i<this.partsA.length;i++ ){
				//this.partsA[i].nCount = 0;
				this.partsA[i].nSum   = 0;
			}
			for (a in this.itemA){
				nCharts++;
				if ( this.itemA[a].nValuesA && (this.itemA[a].nValuesA.length > 0)){
					var ptOff = this.getNodePosition(this.itemA[a].szSelectionId);
					if ( !ptOff ){
						this.missedA[a] = a;
						nNoPos++;
						continue;
					}
					if ( ptOff.x < zoomBox.x				||
						 ptOff.x > zoomBox.x+zoomBox.width  ||
						 ptOff.y < zoomBox.y				||
						 ptOff.y > zoomBox.y+zoomBox.height ){
						this.nSkipCount++;
						if ( (chartGroup = SVGDocument.getElementById(this.szId+":"+a+":chart" )) ){
							chartGroup.parentNode.removeChild(chartGroup);
							this.chartPosA[this.itemA[a].szSelectionId] = null;
							this.posItemA[this.itemA[a].szSelectionId] = null;
						}
						continue;
					}
					// chart is visibile !
					// ------------------
					this.indexA[this.indexA.length] = a;

					// sum counts for sequenze parts
					// and make value sum of visible charts for dynamic theme legends
					// --------------------------------------------------------------
					if ( this.szFlag.match(/CHART/) && !this.szFlag.match(/EXACT/)  ){
						for ( i=0;i<this.partsA.length;i++ ){
							this.partsA[i].nCount++;
							this.partsA[i].nSum += !isNaN(this.itemA[a].nValuesA[i])?this.itemA[a].nValuesA[i]:0;
						}
					}else
					if ( this.szFlag.match(/CHART/) ){
						if ( this.itemA[a].nValuesA.length > 1 ){
							// multiple value charts like pies,stars, ...
							for ( i=0;i<this.partsA.length;i++ ){
								this.partsA[i].nSum += !isNaN(this.itemA[a].nValuesA[i])?this.itemA[a].nValuesA[i]:0;
							}
						}else{
							// single value charts like bubble, label, ...
							if (this.partsA[this.itemA[a].nValuesA[0]-1]){
								this.partsA[this.itemA[a].nValuesA[0]-1].nSum += !isNaN(this.itemA[a].nSize)?this.itemA[a].nSize:1;
							}
						}
					}

					nToDraw++;
				}
			}

			// GR 29.11.2016 no position found ? may be we have to wait for tiles ?
			// -------------------------------------------------------------------
			if ( (nCharts == nNoPos) && !map.Tiles.allTilesLoaded() ){
				this.fDataIncomplete = true;
				this.fRedraw = true;
				setTimeout("map.Themes.execute()",1);
				return;
			}
		}else{
			for (a in this.itemA){
				this.indexA[this.indexA.length] = a;
				// sum counts for sequenze parts
				// -----------------------------
				if ( this.szFlag.match(/CHART/) && !this.szFlag.match(/EXACT/)  ){
					for ( i=0;i<this.partsA.length;i++ ){
						this.partsA[i].nCount++;
						this.partsA[i].nSum += !isNaN(this.itemA[a].nValuesA[i])?this.itemA[a].nValuesA[i]:0;
					}
					// GR 08.03.2013 we have to store the number of drawn
				}
				nCharts++;
				nToDraw++;
			}
		}

		_TRACE(nToDraw+" to draw ("+nCharts+")");

		if ( nToDraw > this.nMaxThemeCharts ){
			this.ErrorMessage = "max charts ("+this.nMaxThemeCharts+") exceeded; please zoom in";
			this.indexA.length = 0;
			this.nSkipCount = nToDraw;
			for (a in this.itemA){
				if ( (chartGroup = SVGDocument.getElementById(this.szId+":"+a+":chart" )) ){
					chartGroup.parentNode.removeChild(chartGroup);
				}
			}
		}

		this.fRedrawAllCharts = false;
		// GR 26.07.2012 chrome crashes if more objects with shadow
		// if ( szViewer.match(/chrome/i) && (nToDraw > 1000) ){
		if ( (nToDraw > this.nMaxShadowCharts ) ){
			if ( this.fShadow ) {
				this.fRedrawAllCharts = true;
			}
			this.fShadow = false;
		}else{
			if ( this.fOrigShadow && !this.fShadow ) {
				this.fRedrawAllCharts = true;
			}
			this.fShadow = this.fOrigShadow;
		}
		
		if ( this.mapSleep ){
			this.mapSleep.nCount = nToDraw;
		}

		// sort the charts before drawing them
		// 
		this.fSorted = false;
		if ( this.fSortBeforeDraw && ( !this.szFlag.match(/NOSRT/) )															&& 
									 ( !this.szFlag.match(/NOSIZE/) || this.szFlag.match(/3D/) || this.szFlag.match(/SORT/) )	&&
									 ( !this.szFlag.match(/EXACT/)	|| this.szFlag.match(/AGGREGATE/) || this.szSizeField )        )
			{ 
		
			_TRACE("sort before drawing");

			var chartYPosA = new Array(0);

			if (  (this.szFlag.match(/3D/) || this.szFlag.match(/BOX/) || this.szFlag.match(/POINTER/) ) &&
				 !((this.szFlag.match(/MULTIPLE/) || this.szFlag.match(/MULTIGRID/)) && !this.szFlag.match(/AGGREGATE/) ) ){
				// sort by y position 
				// ------------------
				for ( var i=0; i<this.indexA.length; i++){
					if ( (ptOff = this.getNodePosition(this.itemA[this.indexA[i]].szSelectionId)) ){
						if ( nRot ){
							chartYPosA[i] = {a:this.indexA[i],y:(ptOff.x*Math.sin(nRot)+ptOff.y*Math.cos(nRot)) };
						}else{
							chartYPosA[i] = {a:this.indexA[i],y:ptOff.y};
						}
					}else{
						chartYPosA[i] = {a:this.indexA[i],y:0};
					}
				}
			}
			else{
				// sort by value 
				// -------------
				for ( var i=0; i<this.indexA.length; i++){
					var nValue = this.itemA[this.indexA[i]].nValuesA[this.nActualFrame || 0];
					if ( this.itemA[this.indexA[i]].nSize ){
						nValue = this.itemA[this.indexA[i]].nSize;
					}
					else if ( this.szFlag.match(/SIZE/) && this.itemA[this.indexA[i]].nValueSum ){
						nValue = this.itemA[this.indexA[i]].nValueSum;
					}
					if ( isNaN(nValue) ){
						//nValue = 0;
						// GR 02.02.2016 don't set if not number
						continue;
					}
					chartYPosA.push({a:this.indexA[i],y:nValue});
				}
			}

			_TRACE("sort ---> ");

			// sort charts
			// attention; up -> down because the last chart will be on top of the others
			if ( this.szFlag.match(/SORT/) && this.szFlag.match(/UP/) && !(this.szFlag.match(/SEQUENCE/)||this.szFlag.match(/3D/)) ){
				chartYPosA.sort(this.sortDownChartObjectsCompare);
			}else{
				chartYPosA.sort(this.sortUpChartObjectsCompare);
			}
			_TRACE("done");
			for ( var i=0; i<chartYPosA.length; i++){
				this.indexA[i] = chartYPosA[i].a;
			}
			this.fSorted = true;
		}
	}

	// ---------------------------------
	// lets do some charts
	// ---------------------------------

	this.chart = {	szColor:this.colorScheme[0], 
					szLineColor:(this.colorScheme[1]?this.colorScheme[1]:"none"), 
					szTextColor:(this.colorScheme[1]?this.colorScheme[1]:"none") };

	if ( this.colorScheme.length > 2 || this.szFlag.match(/EXACT/) ){
		this.chart.szColor		= this.colorScheme[this.colorScheme.length-1];
		this.chart.szLineColor  = this.colorScheme[0];
	}
	if ( this.szFlag.match(/NOLINES/) ){
		this.chart.szLineColor = "none";
	}else
	if ( this.chart.szLineColor == "none" ){
		var cColor = __maptheme_getChartColors(szColor);
		this.chart.szLineColor = cColor.textColor;
	}

	// GR 30.11.2016 calcolate scale to fit PLOT into grid
	// 
	if ( this.szFlag.match(/PLOT/) && (this.szFlag.match(/GRIDSIZE/) || this.szFlag.match(/AUTOSIZE/)) ){
		var nRadius = 0;
		var nDynScale = map.Layer.nDynamicObjectScale;
		var nAutoSize = this.szFlag.match(/GAP/)?1.2:1.15;
		if ( this.nGridWidthPx ){
			nRadius = map.Scale.normalX(this.nGridWidthPx)/nAutoSize*this.nScale/nDynScale;
		}else{
			nRadius = this.nGridWidth?(map.Scale.getDeltaXofDistanceInMeter(this.nGridWidth)/nAutoSize*this.nScale/nDynScale):map.Scale.normalX(nChartSize/3);
		}
		this.nAutoScale = nRadius / map.Scale.normalX((nChartSize*( this.itemA[a].nValuesA.length / (this.nGridX||1))));
		this.nAutoWidth = nRadius;
	}

	_TRACE("start drawing");

	for ( var nAi=startIndex; nAi<this.indexA.length; nAi++ ){

		// execution canceled ? -----------------
		if ( this.fCancel ){
			displayMessage("Canceled by user",1000,true);
			this.fCancel = false;
			return;
		}

		// sleep work around to show progress -----------------
		if ( this.mapSleep ){
			this.mapSleep.nDoneCount = this.nDoneCount;
			if ( this.mapSleep.checkSleep(nAi,10) ){
				this.fContinue = true;
				this.continueIndex = nAi;

				// GR 11.06.2015 if filter defined, apply on new items
				if ( this.szItemFilter && this.szItemFilter.length ){
					this.filterItems(this.szItemFilter,this.itemFilterOpt);
				}
				if ( this.markedClass != null ){
					this.markClass(this.markedClass,1);
				}

				return;
			}
		}

		var shapeGroup = null;
		var a = this.indexA[nAi];
		
		this.nDoneCount++;

		if ( this.itemA[a].nValuesA && (this.itemA[a].nValuesA.length > 0)){

			var selectionId = this.itemA[a].szSelectionId;
			// check, if we have a position, if not -> no chart
			ptOff = this.getNodePosition(selectionId);
			// tbd maybe a flag to switch this behaviour
			if ( 1 ){
				ptOff.x = isNaN(ptOff.x)?0:ptOff.x;
				ptOff.y = isNaN(ptOff.y)?0:ptOff.y;
			}
			if (!ptOff || isNaN(ptOff.x) || isNaN(ptOff.y) ){
				_TRACE("missing position: "+a);
				this.nMissingPositionCount++;
				continue;
			}
			// check if position visible, if not -> no chart
			if ( this.fClipCharts && !this.szFlag.match(/BUFFER/) ){ // && !this.szFlag.match(/EXACT/) ){
				if ( ptOff.x < zoomBox.x				||
					 ptOff.x > zoomBox.x+zoomBox.width  ||
					 ptOff.y < zoomBox.y				||
					 ptOff.y > zoomBox.y+zoomBox.height ){
					this.nSkipCount++;
					continue;
				}
			}

			// if chart exists
			if ( this.fRedraw ){
				// if .fRedraw get chart from DOM
				this.itemA[a].chartNode = this.itemA[a].chartNode || SVGDocument.getElementById(this.szId+":"+a+":chart");
			}
			if ( this.itemA[a].chartNode && this.itemA[a].chartNode.parentNode){
				// if fRedraw or other conditions, remove and redraw
				if ( this.fRedraw || this.fRedrawAllCharts || ((this.szFlag.match(/BUFFER/)) && (this.szShapeType.match(/line/))) ){
					this.itemA[a].chartNode.parentNode.removeChild(this.itemA[a].chartNode);
					this.itemA[a].chartNode = null;
				}
				// if not, we must reappend the chart for sorting reasons and quit
				else{
					this.itemA[a].chartNode.parentNode.appendChild(this.itemA[a].chartNode);
					this.nRealizedCount++;
					continue;
				}
			}

			var ptNull = new point(0,0);

			// ---------------
			// ok, here we go
			// ---------------
			
			// make chart hosting group

			// GR 11.04.2014 get multiple charts into one group
			// ------------------------------------------------
			shapeGroup = null;
			if ( selectionId ){
				shapeGroup = SVGDocument.getElementById(this.szId+":"+selectionId+":chart");
				if ( shapeGroup ){
					shapeGroup.fu = new Methods(shapeGroup);
				}else{
					shapeGroup = map.Dom.newGroup(this.chartGroup,this.szId+":"+selectionId+":chart");

					if( this.szFlag.match(/BOX/) ){

						var szLineColor = "#bbbbbb";
						if ( typeof(this.szBorderColor) != 'undefined' ) {
							szLineColor = this.szBorderColor;
						}
						var szLineStyle = "stroke-width:"+map.Scale.normalX(0.5)+";stroke-opacity:0.3;";
						if ( typeof(this.szBorderStyle) != 'undefined' ) {
							switch(this.szBorderStyle){
								case "dotted": szLineStyle = "stroke-width:"+map.Scale.normalX(1.0)+";stroke-linecap:round;stroke-dasharray:1,50;"; break; 
								case "dashed": szLineStyle = "stroke-width:"+map.Scale.normalX(1.0)+";stroke-linecap:butt;stroke-dasharray:30,30;"; break; 
								case "solid":  szLineStyle = "stroke-width:"+map.Scale.normalX(1.0)+";"; break; 
								case "none":   szLineStyle = "stroke-width:0;"; break; 
							}
						}
						if ( typeof(this.szBorderWidth) != 'undefined' ) {
							switch(this.szBorderWidth){
								case "thin":   szLineStyle += "stroke-width:"+map.Scale.normalX(0.3)+";"; break; 
								case "thick":  szLineStyle += "stroke-width:"+map.Scale.normalX(1.5)+";"; break; 
							}
						}
						newBox = map.Dom.newShape('rect',shapeGroup,0,0,1,1,"fill:"+(this.szBoxColor||"white")+";fill-opacity:"+(this.nBoxOpacity||1)+";stroke:"+szLineColor+";"+szLineStyle);
						newBox.setAttributeNS(null,"id",this.szId+":"+selectionId+":chart:box");
						switch(this.szSymbolBoxStyle){
							case "frame": this.boxShape.setAttributeNS(null,"fill-opacity",0); break; 
							case "field": this.boxShape.setAttributeNS(null,"fill-opacity",1); break; 
						}
					}
				}
			}
			// ------------------------------------------------

			this.itemA[a].chartNode = shapeGroup;

			// store value
			shapeGroup.setAttributeNS(szMapNs,"value",String(this.itemA[a].nValuesA[0]));

			// ------------------------------------------------
			// ===== here we do the chart ===================== 
			// ------------------------------------------------

			ptNull = this.drawChart(shapeGroup,a,nChartSize,this.szFlag+"|SILENT");

			// ------------------------------------------------
			//
			// ------------------------------------------------

			// position and scale the chart

			// may bee we have an autoscale configurated, use it
			var __scale = this.nScale;
			this.nScale = this.nAutoScale || this.nScale;

			if ( ptNull && ptOff && shapeGroup ){

				// GR 05.03.2017 place plots to the center of the plot box
				if ( this.szFlag.match(/PLOT/) && this.nAutoWidth && this.nAutoScale ){
					//var box = shapeGroup.fu.getBox();
					//console.log(box.width);
					//console.log(this.nAutoWidth/this.nAutoScale);

					ptNull.x += this.nAutoWidth/this.nAutoScale/2;
					ptNull.y -= this.nAutoWidth/this.nAutoScale/2;
				}
				var nObjectScaling = this.szFlag.match(/BUFFER/)?1:map.Scale.nObjectScaling;
				if ( this.szFlag.match(/NOSCALE/) ){
					shapeGroup.fu.setPosition(ptOff.x-(ptNull.x),ptOff.y-(ptNull.y)*this.nScale);
					shapeGroup.fu.scale(this.nScale,this.nScale);
				}else
				if (  fObjectScaling ){
					shapeGroup.fu.setPosition(ptOff.x-(ptNull.x)*map.Layer.nObjectScale*this.nScale,ptOff.y-(ptNull.y)*map.Layer.nObjectScale*this.nScale);
					shapeGroup.fu.scale(this.nScale*map.Layer.nObjectScale*nObjectScaling,this.nScale*map.Layer.nObjectScale*nObjectScaling);
				}
				else {
					shapeGroup.fu.setPosition(ptOff.x-(ptNull.x*map.Scale.nFeatureScaling*nObjectScaling*this.nScale),ptOff.y-(ptNull.y)*map.Scale.nFeatureScaling*nObjectScaling*this.nScale);
					shapeGroup.fu.scale(this.nScale*map.Scale.nFeatureScaling*nObjectScaling,this.nScale*map.Scale.nFeatureScaling*nObjectScaling);
				}
			}
			this.nScale = __scale;

			if ( ptNull ){
				selectionId = selectionId.split('*')[0];

				// GR 19.04.2011 calcolate char offset for multi charts at one position
				// GR 22.01.2014 new flag 'MULTIPLE' to do it only if wanted (.getBox() is time intensive!)

				if( (this.szFlag.match(/MULTIPLE/) || this.szFlag.match(/ALIGN/)) && shapeGroup.lastChild.firstChild ){
					var bBox = map.Dom.getBox(shapeGroup.lastChild);
					var offset = this.szFlag.match(/UP/)?(bBox.height):(bBox.width);
					if ( this.chartPosA[selectionId] ){
						this.chartPosA[selectionId] += this.szFlag.match(/TEXTONLY/)?5:offset*0.5;
						var ptChart = shapeGroup.lastChild.fu.getPosition();
						var line = offset*(this.nGridX || 10);
						if ( this.szFlag.match(/UP/) ){
							shapeGroup.lastChild.fu.setPosition(ptChart.x+bBox.width*Math.floor(this.chartPosA[selectionId]/line),ptChart.y-this.chartPosA[selectionId]%line);
						}else{
							shapeGroup.lastChild.fu.setPosition(ptChart.x+this.chartPosA[selectionId]%line,ptChart.y-bBox.height*Math.floor(this.chartPosA[selectionId]/line));
						}
						this.chartPosA[selectionId] += this.szFlag.match(/TEXTONLY/)?offset:offset*0.5;
					}else{
						this.chartPosA[selectionId] = this.szFlag.match(/TEXTONLY/)?offset:offset*0.5;
					}
					// GR 19.04.2011 prepare reverse identification of multi charts at one position
					if ( this.posItemA ){
						if ( !this.posItemA[selectionId] ){
							this.posItemA[selectionId] = new Array(0);
						}
						this.posItemA[selectionId].push(this.itemA[a]);
					}
				}else
				if( (this.szFlag.match(/MULTIFIX/) || this.szFlag.match(/MULTIGRID/)) && shapeGroup.lastChild ){
					var offset = 1;
					var dX = map.Scale.normalX(15);
					var dY = map.Scale.normalX(15);
					if ( this.chartPosA[selectionId] ){
						var ptChart = shapeGroup.lastChild.fu.getPosition();
						var actOffset = this.chartPosA[selectionId];
						var line = this.nGridX || 7;
						if ( this.szFlag.match(/UP/) ){
							shapeGroup.lastChild.fu.setPosition(ptChart.x+dX*Math.floor(actOffset/line),ptChart.y-dY*(actOffset%line));
						}else{
							shapeGroup.lastChild.fu.setPosition(ptChart.x+dX*(actOffset%line),ptChart.y-dY*Math.floor(actOffset/line));
						}
						this.chartPosA[selectionId] += offset;
					}else{
						this.chartPosA[selectionId] = offset;
					}
					// GR 19.04.2011 prepare reverse identification of multi charts at one position
					if ( this.posItemA ){
						if ( !this.posItemA[selectionId] ){
							this.posItemA[selectionId] = new Array(0);
						}
						this.posItemA[selectionId].push(this.itemA[a]);
					}
					// GR 20.12.2016 only display last label of row
					if ( this.itemA[a].labelGroup && !(actOffset%line == line-1) )	{
						this.itemA[a].labelGroup.style.setProperty("display","none","");
					}
				}
				if ( this.szFlag.match(/TEXTONLY/) && fCheckLabelOverlap ){
					var text = SVGDocument.getElementById(this.szId+":"+a+":text");
					if ( text ){
						var cItem = new Map.Label.Item(text);
						cItem.setDisplay("none");
					}
				}

				// GR 14.11.2007 compense canvas rotation 
				if ( nRot ){
					setRotate(shapeGroup,-Number(nRot));
				}

				// GR 30.06.2007 make shadow for the objects
				if ( (this.fShadow == true) && SVGDocument.getElementById(szShadowFilterId) ){
						shapeGroup.style.setProperty("filter","url(#"+szShadowFilterId+")","");
				}else
				if ( (this.fShadow == true) ){ 
					_TRACE("create shadow filter for objects ! --------------------------------------");
					var filterNode = map.Dom.newNode('filter',this.chartGroup.parentNode);

					filterNode.setAttributeNS(null,"id",szShadowFilterId);
					filterNode.setAttributeNS(null,"filterUnits","objectBoundingBox");
					filterNode.setAttributeNS(null,"x","-50%");
					filterNode.setAttributeNS(null,"y","-50%");
					filterNode.setAttributeNS(null,"width","200%");
					filterNode.setAttributeNS(null,"height","200%");

					var filter = map.Dom.newNode('feGaussianBlur',filterNode);
					filter.setAttributeNS(null,"stdDeviation","15");
					filter.setAttributeNS(null,"result","BlurAlpha");

					filter = map.Dom.newNode('feOffset',filterNode);
					filter.setAttributeNS(null,"in","BlurAlpha");
					filter.setAttributeNS(null,"dx","20");
					filter.setAttributeNS(null,"dy","20");
					filter.setAttributeNS(null,"result","OffsetBlurAlpha");

					filter = map.Dom.newNode('feColorMatrix',filterNode);
					filter.setAttributeNS(null,"in","OffsetBlurAlpha");
					filter.setAttributeNS(null,"type","matrix");
					filter.setAttributeNS(null,"values","0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0");
					filter.setAttributeNS(null,"result","matrixOut");

					filter = map.Dom.newNode('feMerge',filterNode);
					var merge = map.Dom.newNode('feMergeNode',filter);
					merge.setAttributeNS(null,"in","matrixOut");
					merge = map.Dom.newNode('feMergeNode',filter);
					merge.setAttributeNS(null,"in","SourceGraphic");

					//GR 09.09.2014 now here, to avoid zero shadows, causing error of Chrome version 37.0.2062.103 m
					var bBox = map.Dom.getBox(shapeGroup.lastChild);
					if ( bBox.width && bBox.height ){
						shapeGroup.style.setProperty("filter","url(#"+szShadowFilterId+")","");
					}
				}
			}
		}
	}
	
	// if BOX flag set, resize chart boxes
	// must be done here after all draw, because of MULTIPLE or MULTIGRID

	if( this.szFlag.match(/BOX/) ){

		if ( this.nBoxUpper && (map.Scale.getTrueMapScale()*map.Scale.nZoomScale > this.nBoxUpper) ){
			var boxGroup = SVGDocument.getElementById(this.szId+":"+p+":chart:box");
			if (boxGroup){
				boxGroup.parentNode.removeChild(boxGroup);
			}
		}else
		for ( var nAi=0; nAi<this.indexA.length; nAi++ ){
			var a = this.indexA[nAi];
			if ( this.itemA[a].fDone ) {

				// for all charts done
				//
				var p = this.itemA[a].szSelectionId;
				var shapeGroup = SVGDocument.getElementById(this.szId+":"+p+":chart");
				var boxGroup = SVGDocument.getElementById(this.szId+":"+p+":chart:box");

				// if box exists and not yet sized
				//
				if ( shapeGroup && boxGroup && !boxGroup.getAttributeNS(szMapNs,"boxed") ){

					// get the size of the chart
					//
					var bBox = map.Dom.getBox(shapeGroup);

					var margin = map.Scale.normalX(this.nBoxMargin||2);
					margin = Math.min(margin*2,margin*(bBox.width/map.Scale.normalX(nChartSize)));
					
					// make box title above the chart, if defined
					// 
					if ( this.szFlag.match(/TITLE/) && this.szTitleField && ( !this.nTitleUpper || (map.Scale.getTrueMapScale()*map.Scale.nZoomScale <= this.nTitleUpper) ) ){

						var nFontSize = Math.max(bBox.width/10,map.Scale.normalX(4));
						var szTitle = this.itemA[a].szTitle;
						try{
							var szTitle = HTMLWindow.ixmaps.htmlgui_onInfoTitle(this.itemA[a].szTitle,this.itemA[a]);
						}catch (e){}
						var textColor = this.szTextColor || "#888888";
						var newText = map.Dom.newText(shapeGroup,bBox.x,bBox.y-nFontSize*1,"font-family:arial;font-size:"+nFontSize+"px;text-anchor:start;fill:"+textColor+";stroke:none;pointer-events:none;",String(szTitle||" "));

						if (this.szFlag.match(/LONGTITLE/)){
							// enlarge the box to include all of the title
							bBox = map.Dom.getBox(shapeGroup);
							bBox.y += nFontSize*0.1;
							bBox.height	-= nFontSize*0.1;
						}else{
							// or clip the title to the box
							var oldHeight = bBox.height;
							bBox.height	+= nFontSize*1.8;
							bBox.y -= bBox.height-oldHeight;
							map.Dom.setClipRect(newText,new box(bBox.x,bBox.y-nFontSize*10,bBox.width-nFontSize/3,nFontSize*20));
						}
					}

					// PLOTX or PLOTY must be sized by the biggest value, to make equal large boxes
					//
					if (this.szFlag.match(/PLOTX/)){
						var oldHeight = bBox.height;
						bBox.height	= map.Scale.normalX(nChartSize);
						bBox.y		= -map.Scale.normalX(nChartSize/2);
						bBox.width	= this.nMax*map.Scale.normalX(nChartSize*1.1)/this.nMax*5*(this.nRangeScale||1);
					}else
					if (this.szFlag.match(/PLOTY/)){
						var oldHeight = bBox.height;
						var oldWidth  = bBox.width;
						bBox.width	= map.Scale.normalX(nChartSize);
						bBox.height	= this.nMax*map.Scale.normalX(nChartSize*1.1)/this.nMax*5*(this.nRangeScale||1);
						bBox.x -= (bBox.width-oldWidth)/2;
						bBox.y -= (bBox.height-oldHeight)/2;
					}
					
					// margins around the chart
					//
					boxGroup.setAttributeNS(null,"x",bBox.x-margin);
					boxGroup.setAttributeNS(null,"y",bBox.y-margin);
					boxGroup.setAttributeNS(null,"width",bBox.width+margin*2);
					boxGroup.setAttributeNS(null,"height",bBox.height+margin*2);

					// if AUITOSIZE or GRIDSIZE make rectangular boxes
					//
					if ( (this.szFlag.match(/AUTOSIZE/) || this.szFlag.match(/GRIDSIZE/)) && (bBox.width>bBox.height)){
						boxGroup.setAttributeNS(null,"y",bBox.y-margin-(bBox.width-bBox.height));
						boxGroup.setAttributeNS(null,"height",bBox.width+margin*2);
					}

					// make round corners
					//
					if ( typeof(this.nBorderRadius) != 'undefined' ) {
						var nCorner = Math.min(map.Scale.normalX(this.nBorderRadius),map.Scale.normalX(this.nBorderRadius*(bBox.width/map.Scale.normalX(nChartSize))));
						boxGroup.setAttributeNS(null,'rx',nCorner);
						boxGroup.setAttributeNS(null,'ry',nCorner);
					}
					var nStroke = map.Scale.normalX((this.szBorderWidth||1)*0.2*(bBox.width/map.Scale.normalX(nChartSize)));
					boxGroup.style.setProperty("stroke-width",nStroke);

					boxGroup.setAttributeNS(szMapNs,"boxed","1");
				}
			}
		}
	}

	_TRACE("== done === ");

	// GR 11.06.2015 if filter defined, apply on new items
	if ( this.szItemFilter && this.szItemFilter.length ){
		this.filterItems(this.szItemFilter,this.itemFilterOpt);
	}
	if ( this.markedClass != null ){
		this.markClass(this.markedClass,1);
	}

	this.isVisible = true;
	this.realizeDone();

	this.fShowProgressBar = false;
	this.showInfo();

	if ( (this.szFlag.match(/SHOWSTATISTIC/))			 ){
		this.showErrorInfo();
	}

	// GR 26.01.2014 don't do this any more (via '0 &&' )
	if ( 0 && nSize < 10 && !this.szFlag.match(/BUBBLE/) && !this.szFlag.match(/SQUARE/)&& !this.szFlag.match(/SYMBOL/) ){
		displayMessage("Please zoom in to see the charts",3000,true);
	}
	else{
		if ( this.szFlag.match(/CLIP/) ){
			if ( (this.nClipFrames == this.itemA[a].nValuesA.length) ){
				if ( this.szXaxisA && this.szXaxisA[this.nActualFrame] ){
					displayMessage(this.szXaxisA[this.nActualFrame],3000,"big");
				}else
				if ( this.szLabelA && this.szLabelA[this.nActualFrame] ){
					displayMessage(this.szLabelA[this.nActualFrame],3000,"big");
				}
			}
			else{
				var labelA = this.szXaxisA || this.szLabelA;
				if ( labelA ){
					if ( this.nActualFrame == 0 ){
						displayMessage(labelA[0],3000,"big");
					}else
					if ( this.nActualFrame == (this.nClipFrames-1) ){
						displayMessage(labelA[1],3000,"big");
					}else{
						displayMessage(" ... ",3000,"big");
					}
				}
			}
		}else{
			if ( this.ErrorMessage ){
				displayMessage(this.ErrorMessage,10000,"notify");
				this.ErrorMessage = null;
			}else{
				clearMessage();
			}
		}
	}

	if ( !this.fSorted ) { 
		this.fResort = true;
		map.Themes.execute();
	}

	if ( this.szFlag.match(/DECLUTTER/) ){
		this.fDeclutter = true;
		map.Themes.execute();
	}

};

/**
 * sort and reappend the mapobjects, in order to their y position.
 * important for the 3D effect
 */
MapTheme.prototype.sortChartObjects = function(){
	if (  !this.chartGroup											|| 
		  this.szFlag.match(/NOSRT/)								||
		( this.szFlag.match(/NOSIZE/) && !this.szFlag.match(/3D/) ) ||
		( this.szFlag.match(/EXACT/)  && !this.szFlag.match(/AGGREGATE/) && !this.szSizeField ) ){
		return;
	}
	var chartNode = null;
	var chartYPosA = new Array(0);
	var chartsA = this.chartGroup.childNodes;
	if ( this.szFlag.match(/BUBBLE/) || this.szFlag.match(/SQUARE/) || this.szFlag.match(/BUFFER/) || this.szFlag.match(/TEXTONLY/) ){
		for ( var i=0; i<chartsA.length; i++){
			var chartNode = chartsA.item(i);
			chartYPosA[i] = {node:chartNode,y:Math.abs(Number(chartNode.getAttributeNS(szMapNs,"value")))};
		}
	}
	else{
		var nRot = getRotateAttributeValue(map.Scale.canvasNode)/180*Math.PI;
		for ( var i=0; i<chartsA.length; i++){
			var chartNode = chartsA.item(i);
			if ( nRot ){
				chartYPosA[i] = {node:chartNode,y:(getTranslate(chartNode).x*Math.sin(nRot)+getTranslate(chartNode).y*Math.cos(nRot)) };
			}else{
				chartYPosA[i] = {node:chartNode,y:getTranslate(chartNode).y};
			}
		}
	}
	// sort charts
	// attention; up -> down because the last chart will be on top of the others
	if ( this.szFlag.match(/SORT/) && this.szFlag.match(/UP/) && !this.szFlag.match(/SEQUENCE/) ){
		chartYPosA.sort(this.sortDownChartObjectsCompare);
	}else{
		chartYPosA.sort(this.sortUpChartObjectsCompare);
	}
	for ( var i=0; i<chartYPosA.length; i++){
		chartYPosA[i].node.parentNode.appendChild(chartYPosA[i].node);
	}
	// GR 21.01.2011 work around to force the browserb to re-render 
	// due to an Chrome error; mixing up chart positions after the re-append
	if ( (matrixA = getMatrix(this.chartGroup)) ){
		setMatrix(this.chartGroup,matrixA);
	}
};

/**
 * private sort function, to sort objects of the type: node:nodeObj y:nodeposition.y
 * @param a the first object to compare
 * @param b the second object to compare
 * @return 1 if the yPosition of a > yPosition of b; else return -1 
 */
MapTheme.prototype.sortUpChartObjectsCompare = function(a,b){
	if ( a.y > b.y){
		return 1;
	}
	return -1;
};

/**
 * private sort function, to sort objects of the type: node:nodeObj y:nodeposition.y
 * @param a the first object to compare
 * @param b the second object to compare
 * @return 1 if the yPosition of a > yPosition of b; else return -1 
 */
MapTheme.prototype.sortDownChartObjectsCompare = function(a,b){
	if ( a.y < b.y){
		return 1;
	}
	return -1;
};

/**
 * get the size of one chart 
 * @param a the item index (string) of the (future) chart you want to know the height
 * @param nChartSize the normalized chart size
 * @param szFlag the chart type definition
 * @param nMySum the sum of all chart values (determines height for some chart types)
 * @type Number
 * @return the calculated chart height
 */
MapTheme.prototype.getChartSize = function(a,nChartSize,szFlag,nMySum){

		if ( szFlag.match(/NOSIZE/) ){
			return Math.max(5,nChartSize/4);
		}

		// must be positive
		nMySum = Math.abs(nMySum);

		var nHeight = 0;
		var nSize = Math.max(5,nChartSize/2);
		var nRange	  = this.nMax - this.nMin;
		var nRange100 = this.nMax100 - this.nMin100;
		if ( this.nNormalSizeValue ){
			nRange = nRange100 = this.nMaxSize = this.nNormalSizeValue;
		}
		var nValue100 = this.itemA[a].nValue100;

		if ( szFlag.match(/SIZE/) && !szFlag.match(/NORMSIZE/) && this.szSizeField && a && this.itemA[a] ){
			if ( szFlag.match(/LINEAR/) ){
				nSize = nSize / this.nMaxSize * this.itemA[a].nSize;
			}else
			if ( szFlag.match(/SIZELOG/) ){
				nSize = nSize / Math.log((this.nMaxSize)) * Math.log(this.itemA[a].nSize);
			}else
			if ( szFlag.match(/SIZEP4/) ){
				nSize = nSize / Math.pow((this.nMaxSize),1/4) * Math.pow(this.itemA[a].nSize,1/4);
			}else
			if ( szFlag.match(/3D/) || szFlag.match(/SIZEP3/) || szFlag.match(/SIZEVOLUME/) ){
				nSize = nSize / Math.pow((this.nMaxSize),1/3) * Math.pow(this.itemA[a].nSize,1/3);
			}else{
				nSize = nSize / Math.sqrt((this.nMaxSize)) * Math.sqrt(this.itemA[a].nSize);
			}
		}
		else if ( szFlag.match(/SIZE/) && !szFlag.match(/NORMSIZE/) ){
			if ( szFlag.match(/LINEAR/) ){
				nSize = nSize / nRange * nMySum;
			}else
			if ( szFlag.match(/SIZELOG/) ){
				nSize = nSize / Math.log((nRange)) * Math.log(nMySum);
			}else
			if ( szFlag.match(/SIZEP4/) ){
				nSize = nSize / Math.pow((nRange),1/4) * Math.pow(nMySum,1/4);
			}else
			if ( szFlag.match(/3D/) || szFlag.match(/SIZEP3/) || szFlag.match(/SIZEVOLUME/) ){
				nSize = nSize / Math.pow((nRange),1/3) * Math.pow(nMySum,1/3);
			}else{
				nSize = nSize / Math.sqrt((nRange)) * Math.sqrt(nMySum);
			}
			// _TRACE("nMySum:"+nMySum+" -> nSize:"+nSize);
		}
		
		nHeight = map.Scale.normalX(10);
		// variable height, last trim GR 04.04.2014
		if ( szFlag.match(/HEIGHT/) && !szFlag.match(/NORMSIZE/) ){
			if ( szFlag.match(/SIZE/) ){
				if ( this.szSizeField && a && this.itemA[a] ){
					nHeight = nHeight * Math.pow((10 /nRange*this.itemA[a].nSize),1/3)*3;
				}else{
					nHeight = nHeight * Math.pow((10 /nRange*nMySum),1/3)*3;
				}
			}else{
				if ( nValue100 && this.nMax100 && this.nMin100 && !szFlag.match(/FRACTION/) ){
					nHeight = nHeight * 10 / (nRange100) * nValue100;
				}
				else {
					nHeight = nHeight * 10 / (nRange) * nMySum;
				}
			}
		}

		if ( szFlag.match(/ZOOM/) ){
			nSize *= map.Scale.nObjectScaling;
			this.origSize = nSize;
			nSize = nChartSize/10 + nSize * 1 / Math.log(Math.abs(nRange)) * Math.log(Math.abs(nMySum));
			nSize = Math.min(nSize,nChartSize);
			nSize = Math.max(nSize,nChartSize/5);
		}

	return nSize;
};

/**
 * check chart size of a theme item if size clipping set 
 * @param a the item index (string) of the (future) chart you want to know the height
 * @param nChartSize the normalized chart size
 * @param szFlag the chart type definition
 * @param nSum the sum of all chart values (determines height for some chart types)
 * @type boolean
 * @return true, if the chart size passes the check
 */
MapTheme.prototype.checkChartSize = function(a,nChartSize,szFlag,nSum){
	if ( this.nChartSizeMin && !szFlag.match(/ZOOM/) ){
		var nSize = this.getChartSize(a,nChartSize,szFlag,nSum);
		if ( nSize/map.Layer.nObjectScale < this.nChartSizeMin ){
			return false;
		}
	}
	return true;
};

//.................................................................
// create one chart 
//.................................................................

/**
 * create one chart object (SVG grafic) for one item of a theme
 * @param chartGroup the SVG group node to host the chart object
 * @param a the item index (string) of the (future) chart you want to know the height
 * @param nChartSize the normalized chart size
 * @param szFlag the chart type definition
 * @param nMark for multi value charts (es. barchart), the partnumber to evidence in some way
 * @type point object
 * @return the anchor point of the chart created; if null, creatuion failed
 */
MapTheme.prototype.drawChart = function(chartGroup,a,nChartSize,szFlag,nMark){

	var nPartsA = null;
	var nValue100 = 0;
	var nMax = 0;

	// only for text label purpose
	this.szChartFlag = szFlag;

	// item chart
	// ------------------------------------------------------------------

	if (a){
		if (!this.itemA[a]){
			return null;
		}
		// GR 01.02.2015 we need to know later, if chart has been drawn
		this.itemA[a].fDone = false;
		var nPartsA = this.itemA[a].nValuesA;
		var nValue100 = this.itemA[a].nValue100;
		var nMax = Math.max(this.nMax,Math.abs(this.nMin));
		var nMySum = 0;
		if ( !this.szFlag.match(/BUFFER/) ){
			for ( var i=0; i<nPartsA.length; i++ ){
				if ( isNaN(nPartsA[i]) ){
					nPartsA[i] = 0;
				}
				nMySum += nPartsA[i];
			}
		}
		if ( this.szFlag.match(/MORPH/) && this.szFlag.match(/CLIP/) && this.nClipFrames ){
			nPartsA = new Array();
			var nValueA = this.itemA[a].nValuesA;
			for ( i=0; i<nValueA.length/2; i++ ){
				var nValue = nValueA[i]*(this.nClipFrames-1-this.nActualFrame)/(this.nClipFrames-1) + nValueA[i+nValueA.length/2]*this.nActualFrame/(this.nClipFrames-1);
				nPartsA[i]=nValue;
			}
			var nMySum = 0;
			for ( var i=0; i<nPartsA.length; i++ ){
				if ( isNaN(nPartsA[i]) ){
					nPartsA[i] = 0;
				}
				nMySum += nPartsA[i];
			}
		}

		var nSize = this.getChartSize(a,nChartSize,szFlag,nMySum);

		// GR 16.01.2015 new
		if ( this.nChartSizeMin && !szFlag.match(/ZOOM/) ){
			if ( nSize/map.Layer.nObjectScale < this.nChartSizeMin ){
				return null;
			}
		}else
		if ( !this.szFlag.match(/MULTIFIX/) && !this.szFlag.match(/MULTIGRID/) ){
			if ( isNaN(nSize) || (nSize == 0) ){
				return null;
			}
		}

		/**
		** test test test 
		**/
		if ( szFlag.match(/DOT/) ){

			var nValue = nPartsA[0];

			// GR 26.06.2006 bubbles with colorscheme (classes)
			if ( szFlag.match(/EXACT/) || (this.colorScheme.length > 2) || (this.szRanges && this.szRanges.length) ){
				fDoDraw = false; 
				for ( i=0;i<this.partsA.length;i++ ){
					if ( nValue < this.partsA[i].max ){
						this.chart.szColor = this.colorScheme[i];
						var cColor = __maptheme_getChartColors(szColor);
						if ( szFlag.match(/NOLINES/) ){
							this.chart.szLineColor = "none";
						}else{
							this.chart.szLineColor = cColor.textColor;
						}
						if ( szFlag.match(/RANGE/) && !szFlag.match(/RANGES/) ){
							nSize = map.Scale.normalX(2+5*(i+1)/this.partsA.length);
						}
						if ( !szFlag.match(/ZOOM/) && !szFlag.match(/MENUSIZE/) && !szFlag.match(/NORMSIZE/) ){
							this.partsA[i].nCount++;
						}
						// value attributes are defined in child nodes
						chartGroup.setAttributeNS(szMapNs,"value","seechilds");
						nClass = i;
						fDoDraw = true; 
						break;
					}
				}
			}

			var nLineWidth = map.Scale.normalX((this.nLineWidth||0.1)/nChartSize*nSize);
			if ( szFlag.match(/OUTLINE/) ){
				nLineWidth = map.Scale.normalX(Math.min(1,1/nChartSize*nSize)); 
			}

			var shapeGroup = map.Dom.newGroup(chartGroup,this.szId+":"+a+(a?":chartgroup":":ochrtgroup"));
			newShape = map.Dom.newShape('circle',shapeGroup,0,0,map.Scale.normalX(nSize),"fill:"+this.chart.szColor+";stroke:"+(this.szLineColor||this.chart.szLineColor)+";stroke-width:"+(this.szTextColor||this.chart.szLineColor)+";");
			if ( newShape ) {
				newShape.setAttributeNS(szMapNs,"tooltip",this.formatValue(nPartsA[0],2)+this.szUnit+" "+this.szTitle+"");
				// define value and class, if set 
				//
				if ( nClass != null ){
					newShape.setAttributeNS(szMapNs,"value",String(nValue));
					newShape.setAttributeNS(szMapNs,"class",String(nClass));
				}
			}

			return new point(0,0);

			/**
			** test end 
			**/
		}
	}

	// sum or overview chart
	// ------------------------------------------------------------------

	else{
		var nPartsA = new Array(0);
		var nMySum = 0;

		// GR 26.08.2015 AGGREGATE|EXACT themes are like multiple field themes, but have fieldsA with length 1, so take colorscheme   
		if ( this.szOrigFlag.match(/AGGREGATE/) && this.szOrigFlag.match(/EXACT/) ){
			for ( var i=0; i<this.colorScheme.length; i++ ){
				nPartsA[i] = this.nOrigSumA[i];
				nMax = Math.max(nMax,this.nOrigSumA[i]);
				nMySum += nPartsA[i];
			}
		} else {
			for ( var i=0; i<this.szFieldsA.length; i++ ){
				nPartsA[i] = this.nOrigSumA[i];
				nMax = Math.max(nMax,this.nOrigSumA[i]);
				nMySum += nPartsA[i];
			}
		}
		var nValue100 = this.nSum100;
		if ( nValue100 ){
			nMax = 0;
			nMySum = nValue100;
			for ( var i=nPartsA.length-1;i>=0;i-- ){
				if (this.szFlag.match(/DIFFERENCE/)){
					nValue100 = i>0?nPartsA[i-1]:this.nSum100;	
				}
				else
				if (this.szFlag.match(/CALCVAL/) || this.szFlag.match(/CALC100/)){
					nPartsA[i] = nPartsA[i];
				}
				else
				if (this.szFlag.match(/PRODUCT/)){
					nPartsA[i] = nPartsA[i];
				}
				else{
					nPartsA[i] = nPartsA[i]/nValue100; 
					nMax = Math.max(nMax,nPartsA[i]);
					if (this.szFlag.match(/PERMILLE/)){
						nPartsA[i] =nPartsA[i]*1000;
					}else
					if (!this.szFlag.match(/FRACTION/)){
						nPartsA[i] =nPartsA[i]*100;
					}
					if (this.szFlag.match(/RELATIVE/)){
						nPartsA[i] =nPartsA[i]-100;
					}
					if (this.szFlag.match(/INVERT/)){
						nPartsA[i] = 100 - nPartsA[i];
					}
				}
			}
			// must clip the height !!
			// nValue100 = nValue100/100;
			if (this.szFlag.match(/STACKED/)){
				nMax = 100;
				if (this.szFlag.match(/NORMSIZE/)||szFlag.match(/NORMSIZE/)){
					nMax = 0;
					for ( var i=0; i<nPartsA.length; i++ ){
						nMax += nPartsA[i]; 
					}
				}
			}
			else{
				nMax = nMax*100;
				nMax += nMax/10;
				nMax = this.nMax;
			}
		}
		else{
			if (this.szFlag.match(/DIFFERENCE/) ){
				for ( var i=nPartsA.length-1;i>=0;i-- ){
					if ( i>0 ){
						nPartsA[i] -= nPartsA[i-1];
					}
					else if (!this.szFlag.match(/STACKED/)){
						nPartsA[i] = 0;
					}
				}
			}
			if ( this.szAggregation && this.szAggregation.match(/mean/)){
				for ( var i=0; i<nPartsA.length; i++ ){
					nPartsA[i] = nPartsA[i]/this.nCount; 
				}
				if (this.szFlag.match(/MENUSIZE/)){
					nMax = nMax/this.nCount;
				}else{
					nMax = this.nMax;
				}
			}
			if ( this.szFlag.match(/STACKED/) && (this.szFlag.match(/NORMSIZE/)||szFlag.match(/NORMSIZE/)||this.szFlag.match(/MENUSIZE/)||szFlag.match(/MENUSIZE/))){
				nMax = 0;
				for ( var i=0; i<nPartsA.length; i++ ){
					nMax += nPartsA[i]; 
				}
			}
		}
	}

	// some presets and checks
	// ------------------------------------------------------------------

	var ptNull = new point(0,0);

	// handle chart type
	if ( !szFlag ){
		szFlag = this.szFlag;
	}
	else if ( !szFlag.match(/CHART/) && szFlag.match(/VALUES/) || szFlag.match(/NORMSIZE/) || szFlag.match(/MENUSIZE/)){
		szFlag = this.szFlag + "|" + szFlag;
	}

	// !! here we make deviation charts for chloroplethe themes
	// --------------------------------------------------------
	if (szFlag.match(/DOMINANT/) && !szFlag.match(/CHART/)  ){
		if ( 1 || this.szOrigFlag.match(/DOMINANT/) ){
			if ( szFlag.match(/PERCENTOFMEAN/) ){
				szFlag = "BAR|OFFSETMEAN|POINTER"+"|VALUES|ZOOM";
			}else if ( szFlag.match(/PERCENTOFMEDIAN/) ){
				szFlag = "BAR|OFFSETMEDIAN|POINTER"+"|VALUES|ZOOM";
			}else if ( szFlag.match(/DEVIATION/) ){
				szFlag = "BAR|DEVIATION|POINTER"+"|VALUES|ZOOM";
			}else{
				szFlag = "BAR|3D"+"|VALUES|ZOOM";
			}
		}
		else{
			szFlag = this.szOrigFlag;
		}
	}

	// GR 05.10.2013 if we want a zoomed chart, don't size it
	// GR 24.01.2014 new ZOOM algorithm, so comment it out
	if ( szFlag.match(/ZOOM/) && szFlag.match(/BAR/) && szFlag.match(/POINTER/) && (nPartsA.length > 1) ){
		szFlag = this.removeDefinition(szFlag,"SIZE") + "|COMPRESSMAX";
	}

	// GR 18.01.2007 if zero and not allowed, don't draw
	if ( nPartsA.length == 1 && nPartsA[0] == 0 && !szFlag.match(/ZEROISVALUE/) && !szFlag.match(/EXACT/) ){
		this.nZeroValueCount++;
		return null;
	}

	// GR 29.01.2015 if nValueUpper and zoom not sufficient, remove VALUES from flag 
	if ( szFlag.match(/VALUES/) ){ 
		this.fHideValues = (this.szValueUpper && (map.Scale.getTrueMapScale()*map.Scale.nZoomScale > this.nValueUpper) );
	}

	// ------------------------------------------------------------------
	// here we go --->
	// ------------------------------------------------------------------

	// GR 16.09.2008 if not a defined, name ochrtgroup to avoid infodisplay on mouseover
	var shapeGroup = map.Dom.newGroup(chartGroup,this.szId+":"+a+(a?":chartgroup":":ochrtgroup"));
	var shapeOnTopGroup = null;
	var topGroup = null;

	if ( szFlag.match(/MOVABLE/) ){
		shapeGroup.setAttributeNS(null,"id",shapeGroup.getAttributeNS(null,"id")+":movable");
		shapeGroup.setAttributeNS(null,"onmousedown","map.Themes.initChartOffset(evt,\""+this.szId+"\",\""+this.szId+":"+a+":chartgroup:movable"+"\")");
		shapeGroup.setAttributeNS(null,"onmouseup","map.Themes.endChartOffset(evt,\""+this.szId+"\",\""+this.szId+":"+a+":chartgroup:movable"+"\")");
	}

	if ( szFlag.match(/CHOROPLETHE/) ){
		var nMaxRadius = map.Scale.normalX(nChartSize/2);
		var	nRadius    = nMaxRadius*2/3; 
		var szColor		= this.colorScheme[0];
		var szLineColor = this.colorScheme[1]?this.colorScheme[1]:"none";	
		var nLineWidth = map.Scale.normalX(0.1)*map.Scale.nFeatureScaling*map.Scale.nObjectScaling;
		var newShape  = map.Dom.constructNode('use',shapeGroup,{'xlink:href':'#choroplethe_icon'});
		newShape.fu.scale(2,2);
		nChartSize = nRadius*2/map.Scale.normalX(1);
		ptNull.x = 0;
		ptNull.y = nRadius+map.Scale.normalY(5);
	}

	// == user created chart  =======================================================================

	if ( szFlag.match(/USER/) ){
		try{
			var objTheme = this.objThemesA[this.szThemesA[0]];
			var ptNullUser = HTMLWindow.ixmaps.htmlgui_drawChart(SVGDocument,{target:shapeGroup,theme:this,item:a,values:nPartsA,maxSize:nChartSize,flag:szFlag,mark:nMark,dbRecord:(objTheme.dbRecords?objTheme.dbRecords[this.itemA[a].dbIndex]:null)});
			if ( ptNullUser ){
				// position the generated chart object
				shapeGroup.fu.setPosition(shapeGroup.fu.getPosition().x-ptNullUser.x,shapeGroup.fu.getPosition().y-ptNullUser.y);
				ptNullUser.x = 0;
				ptNullUser.y = 0;
				return ptNullUser;
			}
		}catch (e){}
	}

	// == PIE / DONUT  =======================================================================

	if ( szFlag.match(/PIE/) ){

		if ( (nMySum == 0) && !szFlag.match(/AUTOCOMPLETE/) ){
			return null;
		}

		// GR 15.10.2014 new, last value == center part
		// --> Donut with center (inner radius) == last value 
		// GR 26.07.2016 center part variabile
		// --------------------------------------------------
		if ( szFlag.match(/CENTER/) ){
			this.nCenter = 0;
			var __nSum = 0;
			var __nMax = -30000000;
			var __nMin =  30000000;

			for ( var p=0; p<nPartsA.length; p++ ){
				__nSum += nPartsA[p];
				if (  nPartsA[p] < __nMin )	{
					__nMin = nPartsA[p];
					this.nCenterMin = p;
				}
				if (  nPartsA[p] > __nMax )	{
					__nMax = nPartsA[p];
					this.nCenterMax = p;
				}
			}

			this.szCenterPart = this.szCenterPart || "max";

			if ( this.szCenterPart ){
				if ( this.szCenterPart == "first" ){
					this.nCenter = 0;
				}else
				if ( this.szCenterPart == "last" ){
					this.nCenter = nPartsA.length-1;
				}else
				if ( this.szCenterPart == "min" ){
					this.nCenter = this.nCenterMin;
				}else
				if ( this.szCenterPart == "max" ){
					this.nCenter = this.nCenterMax;
				}else
				if ( Number(this.szCenterPart) ){
					this.nCenter = Number(this.szCenterPart);
				}
			}
			this.nCenterValue = nPartsA[this.nCenter];
			this.nCenterSize  = this.nCenterValue/__nSum*100;
		}
		// --------------------------------------------------

		var nHeight = 0;
		var nSize = Math.max(5,nChartSize/2);
		var nRange	  = this.nMax - this.nMin;
		var nRange100 = this.nMax100 - this.nMin100;
		if ( this.nNormalSizeValue ){
			nRange = nRange100 = this.nMaxSize = this.nNormalSizeValue;
		}

		if ( szFlag.match(/SIZE/) && !szFlag.match(/NORMSIZE/) && this.szSizeField && a && this.itemA[a] ){
			if ( szFlag.match(/SIZELOG/) ){
				nSize = nSize / Math.log((this.nMaxSize)) * Math.log(this.itemA[a].nSize);
			}else
			if ( szFlag.match(/SIZEP4/) ){
				nSize = nSize / Math.pow((this.nMaxSize),1/4) * Math.pow(this.itemA[a].nSize,1/4);
			}else
			if ( szFlag.match(/3D/) || szFlag.match(/SIZEP3/) || szFlag.match(/SIZEVOLUME/) ){
				nSize = nSize / Math.pow((this.nMaxSize),1/3) * Math.pow(this.itemA[a].nSize,1/3);
			}else{
				nSize = nSize / Math.sqrt((this.nMaxSize)) * Math.sqrt(this.itemA[a].nSize);
			}
		}
		else if ( 0 && szFlag.match(/SIZE/) && !szFlag.match(/NORMSIZE/) && nValue100 && this.nMax100 && this.nMin100 && !szFlag.match(/FRACTION/) ){
			if ( szFlag.match(/SIZELOG/) ){
				nSize = nSize / Math.log((nRange100)) * Math.log(nValue100);
			}else
			if ( szFlag.match(/SIZEP4/) ){
				nSize = nSize / Math.pow((nRange100),1/4) * Math.pow(nValue100,1/4);
			}else
			if ( szFlag.match(/3D/) || szFlag.match(/SIZEP3/) || szFlag.match(/SIZEVOLUME/) ){
				nSize = nSize / Math.pow((nRange100),1/3) * Math.pow(nValue100,1/3);
			}else{
				nSize = nSize / Math.sqrt((nRange100)) * Math.sqrt(nValue100);
			}
		}
		else if ( szFlag.match(/SIZE/) && !szFlag.match(/NORMSIZE/) ){
			if ( szFlag.match(/SIZELOG/) ){
				nSize = nSize / Math.log((nRange)) * Math.log(nMySum);
			}else
			if ( szFlag.match(/SIZEP4/) ){
				nSize = nSize / Math.pow((nRange),1/4) * Math.pow(nMySum,1/4);
			}else
			if ( szFlag.match(/3D/) || szFlag.match(/SIZEP3/) || szFlag.match(/SIZEVOLUME/) ){
				nSize = nSize / Math.pow((nRange),1/3) * Math.pow(nMySum,1/3);
			}else{
				nSize = nSize / Math.sqrt((nRange)) * Math.sqrt(nMySum);
			}
		}
		
		nHeight = map.Scale.normalX(10);
		// variable height, last trim GR 04.04.2014
		if ( szFlag.match(/HEIGHT/) && !szFlag.match(/NORMSIZE/) ){
			if ( szFlag.match(/SIZE/) ){
				if ( this.szSizeField && a && this.itemA[a] ){
					nHeight = nHeight * Math.pow((10 /nRange*this.itemA[a].nSize),1/3)*3;
				}else{
					nHeight = nHeight * Math.pow((10 /nRange*nMySum),1/3)*3;
				}
			}else{
				if ( nValue100 && this.nMax100 && this.nMin100 && !szFlag.match(/FRACTION/) ){
					nHeight = nHeight * 10 / (nRange100) * nValue100;
				}
				else {
					nHeight = nHeight * 10 / (nRange) * nMySum;
				}
			}
		}

		if ( szFlag.match(/ZOOM/) ){
			nSize *= map.Scale.nObjectScaling;
			this.origSize = nSize;
			nSize = nChartSize/10 + nSize * 3 / Math.log((nRange)) * Math.log(nMySum) * map.Layer.nDynamicObjectScale;
			nSize = Math.min(nSize,nChartSize*1.2);
			nSize = Math.max(nSize,nChartSize/2);
		}

		var donut = DonutCharts.newChart(SVGDocument,shapeGroup,0,0,map.Scale.normalX(nSize),0);

		ptNull.x = 0; 
		ptNull.y = map.Scale.normalY(nSize)+map.Scale.normalY(5);

		donut.setStyle("flat");
		donut.setLine("#555566");
		donut.setLineWidth(map.Scale.normalX(0.1));
		if ( szFlag.match(/NOLINES/) ){
			donut.setLine("none");
		}
		if ( szFlag.match(/WHITELINES/) ){
			donut.setLine("white");
		}
		if ( this.szLineColor ){
			donut.setLine(this.szLineColor);
		}
		if ( szFlag.match(/3D/) ){
			donut.setStyle("3D");

			var nPow = 1/2;
			if ( szFlag.match(/P3/) ){
				nPow = 1/3;
			}else
			if ( szFlag.match(/P4/) ){
				nPow = 1/4;
			}
			if ( szFlag.match(/SIZE/) && !szFlag.match(/NORMSIZE/) && this.szSizeField && a && this.itemA[a] ){
				nHeight = nHeight / Math.pow((this.nMaxSize),nPow) * Math.pow(this.itemA[a].nSize,nPow);
			}
			else if ( szFlag.match(/SIZE/) && !szFlag.match(/NORMSIZE/) ){
				nHeight = nHeight / Math.pow((nRange),nPow) * Math.pow(nMySum,nPow);
			}

			if ( szFlag.match(/ZOOM/) ){
				nHeight *= map.Scale.nObjectScaling;
				nHeight = nHeight/this.origSize*nSize;
			}
			ptNull.y *= 0.7;
		}

		if ( szFlag.match(/VOLUME/) ){
			donut.addStyle("VOLUME");
		}

		if ( szFlag.match(/CENTER/) ){
			var radius = Math.sqrt(Math.pow(map.Scale.normalX(nSize),2)/100*this.nCenterSize);
			donut.setRadInner(radius);
		}else
		if ( szFlag.match(/DONUT/) ){
			if ( szFlag.match(/3D/) ){
				donut.setRadInner(map.Scale.normalX(nSize*0.5));
			}else
			if ( szFlag.match(/THIN/) ){
				donut.setRadInner(map.Scale.normalX(nSize*0.66));
			}else
			if ( szFlag.match(/THICK/) ){
				donut.setRadInner(map.Scale.normalX(nSize*0.33));
			}else{
				donut.setRadInner(map.Scale.normalX(nSize*0.42));
			}
		}
		if ( szFlag.match(/STARBURST/) ){
			donut.addStyle("STARBURST");
			ptNull.y *= 0.8;
		}
		if ( szFlag.match(/XSFLOWER/) || szFlag.match(/XSRAYS/) ){
			donut.addStyle("XSRAYS");
			ptNull.y *= 0.8;
		}else
		if ( szFlag.match(/SFLOWER/) || szFlag.match(/SRAYS/)  ){
			donut.addStyle("SRAYS");
			ptNull.y *= 0.8;
		}else
		if ( szFlag.match(/FLOWER/) || szFlag.match(/RAYS/)  ){
			donut.addStyle("RAYS");
			ptNull.y *= 0.8;
		}
		if ( szFlag.match(/SILENT/) ){
			donut.addStyle("SILENT");
		}
		// GR 14.04.2011
		if ( szFlag.match(/AUTOCOMPLETE/) ){
			donut.addStyle("AUTOCOMPLETE");
		}
		// GR 20.02.2014
		if ( szFlag.match(/BIGTOTOP/) ){
			donut.addStyle("BIGTOTOP");
		}
		// GR 25.12.2014
		if ( szFlag.match(/NOROTATE/) ){
			donut.addStyle("NOROTATE");
		}

		// for donuts, get max value and recalclate percentages
		var nMaxI = 0;
		var nMinI = 0;
		var nMaxValue = 0;
		if ( szFlag.match(/DONUT/) ){
			for ( var i=0;i<nPartsA.length;i++ ){
				if ( nPartsA[i] > nPartsA[nMaxI] ){
					nMaxI = i;
				}
				if ( nPartsA[i] < nPartsA[nMinI] ){
					nMinI = i;
				}
			}
		}
		// 20.02.2014 also here
		if ( szFlag.match(/SORT/) ){
			this.sortedIndex = new Array(0);
			for ( i=0;i<nPartsA.length;i++ ){
				this.sortedIndex[i] = {index:i,value:nPartsA[i]};
			}
			this.sortedIndex.sort(this.sortIndexDown);
		}
		else{
			this.sortedIndex = null;
		}

		var nSumPercent = 0;
		for ( var i=0;i<(this.nClipParts?Math.min(this.nClipParts,nPartsA.length):nPartsA.length);i++ ){

			var szLabel = "";
			var nI = (i);
			if ( this.sortedIndex ){
				nI = this.sortedIndex[nI].index;
			}

			// GR 26.07.2016 new donut with center part argorithm
			if ( szFlag.match(/CENTER/) ){
				if ( nI == this.nCenter ){
					continue;
				}
			}

			if ( this.szLabelA && this.szLabelA[nI] ){
				szLabel = "  "+this.szLabelA[nI];
			}
			else{
				szLabel = "  "+this.szFieldsA[nI];
			}

			var szColor = this.colorScheme[nI];

			// pie with 1 value but color classes
			if ( nPartsA.length == 1 ){
				for ( x=0;x<this.partsA.length;x++ ){
					if ( (szFlag.match(/EXACT/) && (nPartsA[nI] == this.partsA[x].min)) || (!szFlag.match(/EXACT/) && (nPartsA[nI] < this.partsA[x].max)) ){
						szColor = this.colorScheme[x];
						chartGroup.setAttributeNS(szMapNs,"class",String(x));
						break;
					}
				}
			}
			var szUnit = ((szFlag.match(/AUTOCOMPLETE/) && !this.szUnit.match(/%/))?" % ":"") + this.szUnit;
	
			if ( this.szShowParts ){
				var szTmpColor = szColor;
				szColor = "none";
				for ( p in this.szShowPartsA ){
					if ( this.szShowPartsA[p] == nI ){
						szColor = szTmpColor;
					}
				}
			}

			var donutPart = donut.addPart(nPartsA[nI],nHeight,szColor,0,(this.szAggregation && this.szAggregation.match(/sum/))?this.formatValue(nPartsA[nI],this.szValueDecimals||(nPartsA[nI]<5?0:0),"ROUND")+szUnit:this.formatValue(nPartsA[nI],this.szValueDecimals||(nPartsA[nI]<5?0:0),"ROUND")+szUnit,this.formatValue(nPartsA[nI],2)+szUnit+szLabel);

			if (this.colorScheme[i] == "none"){
				donut.setLine("black");
			}
			nSumPercent += nPartsA[nI];
		}

		donut.realize();

		if ( szFlag.match(/CENTER/) && !szFlag.match(/DONUT/) ){
			var nRadius = Math.sqrt(Math.pow(map.Scale.normalX(nSize),2)/100*this.nCenterSize);
			var szColor = this.colorScheme[this.nCenter];
			map.Dom.newShape('circle',shapeGroup,0,0,nRadius*0.95,"fill:"+szColor+";");
			if ( szFlag.match(/CENTERVALUE/) || szFlag.match(/ZOOM/) || (szFlag.match(/VALUES/) && !this.fHideValues) ) {
				var szText = this.formatValue(this.nCenterValue,this.szValueDecimals||(((this.nCenterSize<1)||(nMaxValue<10))?0:0),"ROUND")+(this.szUnit.length<=5?this.szUnit:"");
				var cColor = __maptheme_getChartColors(szColor);
				var szTextColor = cColor.textColor;
				var nFontSize = String(Math.min(nRadius*0.8,nRadius*(3.5/szText.length)));
				map.Dom.newText(shapeGroup,0,nFontSize*0.33,"font-family:arial;font-size:"+nFontSize+"px;font-weight:bold;text-anchor:middle;fill:"+szTextColor+";opacity:"+String(this.nOpacity?this.nOpacity:1)+";stroke:none;pointer-events:none",szText);
			}
		}
		
		if ( szFlag.match(/VALUES/) &&
		 ( szFlag.match(/ZOOM/) || !this.szValueUpper || (map.Scale.getTrueMapScale()*map.Scale.nZoomScale <= this.nValueUpper)) ){
			// GR check possible fontsize here, if to small, don't create inline text
			var nFontSize = Math.min(nSize*0.8,nSize*(3.4/donut.partsA[0].szText.length));
			if ( ( nPartsA.length > 1 ) || szFlag.match(/NOINLINETEXT/) ||
				 ( szFlag.match(/ZOOM/) && (nFontSize < 6) ) 
				){
				this.drawDonutText(donut,map.Scale.normalX(11) / ((szFlag.match(/ZOOM/)||szFlag.match(/NORMSIZE/))?1.6:2) );
			}else{
				var szText = donut.partsA[0].szText; // this.formatValue(nValue,1)+(this.szUnit.length<=5?this.szUnit:"");
				var cColor = __maptheme_getChartColors(szColor);
				var szTextColor = this.szTextColor||cColor.textColor;
				var nRadius = map.Scale.normalX(nSize);
				var nFontSize = String(Math.min(nRadius*0.8,nRadius*(3.4/szText.length)));
				var nOpacity = this.nValueSizeMin?(nFontSize/map.Scale.normalX(5)):1; 
				// GR 03.04.2013 have to to this here 
				if ( szFlag.match(/VOLUME/) ){
					nHeight = donut.donutPartsA[0].nHeight;
				}
				if ( !szFlag.match(/3D/) ){
					nHeight = nRadius*0.6;
				}
				var newText  = map.Dom.newText(shapeGroup,0,-nHeight+nRadius/2+nFontSize*0.45,"font-family:arial;font-size:"+nFontSize+"px;text-anchor:middle;fill:"+szTextColor+";opacity:"+nOpacity+";stroke:none;pointer-events:none",szText);
				if ( szFlag.match(/3D/) ){
					newText.fu.setPosition(0,-nRadius/2+nFontSize*(szFlag.match(/VOLUME/)?0.5:0.25));
					newText.fu.scale(1,0.5);
				}
			}

		}

		// GR 15.10.2014 new, fillopacity also in PIE/DONUT 
		// 
		if ( this.fillOpacity ){
			shapeGroup.setAttributeNS(null,"opacity",String(this.fillOpacity));
		}
		if ( this.nOpacity ){
			shapeGroup.setAttributeNS(null,"fill-opacity",String(this.nOpacity));
			shapeGroup.setAttributeNS(null,"stroke-opacity",String(this.nOpacity));
		}

		// GR 22.01.2014 try to limit the visual effect of extraordinary high values 
		// 
		if ( szFlag.match(/FADEDEVIATION/) ){
			var nDev = (nPartsA[0]-this.nMeanA[0])/this.nDeviationA[0];
			if ( nDev > 10 ){
				var nOpacity = (Math.pow(10,1/2)/Math.pow(nDev,1/2));
				shapeGroup.setAttributeNS(null,"opacity",String(nOpacity));
			}
		}else
		if ( szFlag.match(/LIMITDEVIATION/) ){
			var nDev = (nPartsA[0]-this.nMeanA[0])/this.nDeviationA[0];
			if ( nDev > 10 ){
				shapeGroup.setAttributeNS(null,"opacity","0");
			}
		}

		// GR 17.08.2015 for mark/unmark class
		//
		if ( (nPartsA.length == 1) && szFlag.match(/EXACT/) ){
			donut.donutPartsA[0].objNode.setAttributeNS(szMapNs,"class",chartGroup.getAttributeNS(szMapNs,"class"));
			if ( donut.donutPartsA[0].textNode ){
				donut.donutPartsA[0].textNode.setAttributeNS(szMapNs,"class",chartGroup.getAttributeNS(szMapNs,"class"));
			}
		}else{
			for ( var i=0; i<donut.donutPartsA.length; i++ ){
				donut.donutPartsA[i].objNode.setAttributeNS(szMapNs,"class",String(this.sortedIndex?this.sortedIndex[i].index:i));
				if ( donut.donutPartsA[i].textNode ){
					donut.donutPartsA[i].textNode.setAttributeNS(szMapNs,"class",String(this.sortedIndex?this.sortedIndex[i].index:i));
				}
			}
		}
		if ( nPartsA.length > 1 ){
			chartGroup.setAttributeNS(szMapNs,"value","seechilds");
		}

		this.nRealizedCount++;
	}

	// == LABEL ==
	// == BUBBLE ==
	// == SQUARE =======================================================================================

	else if ( szFlag.match(/BUBBLE/) || 
			  szFlag.match(/SQUARE/) ||
			  szFlag.match(/LABEL/)  ){
		var nMaxRadius = map.Scale.normalX(nChartSize/2);
		var nMaxValue  = this.nMaxA[0];
		if ( this.nNormalSizeValue ){
			nMaxValue = this.nNormalSizeValue;
			this.nMaxSize = this.nNormalSizeValue;
			}
		var nValue	   = nPartsA[0];
		// GR 07.04.2009 
		if ( this.szFlag.match(/CLIP/) && !this.szFlag.match(/MORPH/) && this.nClipFrames ){
			if ( (this.nClipFrames == nPartsA.length) ){
				nValue = Number(nPartsA[this.nActualFrame]);
				nMaxValue  = this.nMaxA[this.nActualFrame];
			}else{
				nValue = nPartsA[0]*(this.nClipFrames-1-this.nActualFrame)/(this.nClipFrames-1) + nPartsA[nPartsA.length-1]*this.nActualFrame/(this.nClipFrames-1);
			}
			if ( (nValue == 0) && !(szFlag.match(/ZEROISVALUE/)) ){
				return null;
			}
		}
		if ( szFlag.match(/INVERTSIZE/) ){
			if ( (nMaxValue-nPartsA[0] == 0) && !(szFlag.match(/ZEROISVALUE/)) ){
				return null;
			}
		}
		// GR 03.09.2007 explicit size field
		if ( 0 && a && this.itemA[a] && this.szSizeField && !szFlag.match(/FIXSIZE/) && !szFlag.match(/NOSIZE/) ){
			nRadius    = nMaxRadius / Math.sqrt(this.nMaxSize) * Math.sqrt(Math.abs(this.itemA[a].nSize||0)); 
			if ( szFlag.match(/ZOOM/) ){
				nRadius    = Math.max(nRadius,nMaxRadius*0.33);
			}
		}else{
			var nSizeValue = (a && this.itemA[a] && this.szSizeField)?(this.itemA[a].nSize||0):nValue;
			var nSizeMax = (a && this.itemA[a] && this.szSizeField)?this.nMaxSize:nMaxValue;

			if ( szFlag.match(/MENUSIZE/) ){
				nRadius = map.Scale.normalX(nChartSize/2.5); 
			}else{
				var	nRadius    = nMaxRadius / Math.sqrt(nSizeMax) * Math.sqrt(Math.abs(nSizeValue)); 
				if ( szFlag.match(/LINEAR/) ){
					nRadius    = nMaxRadius / nSizeMax * Math.abs(nSizeValue); 
				}else
				if ( szFlag.match(/SIZEP3/) ){
					nRadius    = nMaxRadius / Math.pow(nSizeMax,1/3) * Math.pow(Math.abs(nSizeValue),1/3); 
				}else
				if ( szFlag.match(/SIZEP4/) ){
					nRadius    = nMaxRadius / Math.pow(nSizeMax,1/4) * Math.pow(Math.abs(nSizeValue),1/4);  
				}else
				if ( szFlag.match(/SIZELOG/) ){
					nRadius    = nMaxRadius / Math.log(nSizeMax) * Math.log(Math.abs(nSizeValue));  
				}else
				if ( szFlag.match(/EXACT/) && !this.szSizeField ){
					nRadius    = nMaxRadius / 3; 
				}else
				if ( szFlag.match(/NOSIZE/) ){
					nRadius    = nMaxRadius / 2; 
				}else
				if ( szFlag.match(/FIXSIZE/) ){
					nRadius    = nMaxRadius / 2 / (this.nNormalSizeValue||1); 
				}else
				if ( szFlag.match(/ZOOM/) ){
					nRadius    = (nMaxRadius*3/3);// GR 15.11.2013  / (szFlag.match(/EXACT/)?1:(Math.log(nMaxValue) * Math.log(Math.abs(nSizeValue)))); 
				}else
				if ( szFlag.match(/NORMSIZE/) ){
					nRadius    = (nMaxRadius*2/3) / (szFlag.match(/EXACT/)?1:(Math.log(nSizeMax) * Math.log(Math.abs(nSizeValue))));
				}else
				if ( szFlag.match(/MENUSIZE/) || (szFlag.match(/SUM/) && !a) ){
					nRadius    = nMaxRadius*2/3; 
				}
			}
		}

		var fDoDraw		= true;
		var nClass		= null;
		var newShape	= null;	
		var newShapeBg	= null;	
		var newText		= null;	
		var newTextBg	= null;	

		/** 
			!!! try to do this only once in parent function !!!
			---------------------------------------------------
		**/
		var szColor		= this.colorScheme[0];
		var szLineColor = this.colorScheme[1]?this.colorScheme[1]:"none";
		var szTextColor = szLineColor;

		if ( this.colorScheme.length > 2 || szFlag.match(/EXACT/) ){
			szColor		= this.colorScheme[this.colorScheme.length-1];
			szLineColor = this.colorScheme[0];
		}
		if ( szFlag.match(/NOLINES/) ){
			szLineColor = "none";
		}else
		if ( szLineColor == "none" ){
			var cColor = __maptheme_getChartColors(szColor);
			szLineColor = cColor.textColor;
		}

		// GR 26.06.2006 bubbles with colorscheme (classes)
		if ( this.colorScheme.length > 2 || szFlag.match(/EXACT/) || (this.szRanges && this.szRanges.length) ){

			fDoDraw = false; 

			// GR 15.02.2016 color shows the dominant value of n values
			if ( this.szFlag.match(/DOMINANT/) ){

				var nRelevanz = 0;
				var nLastRelevant = 0;

				// search for dominant value above filter 
				nIndex = -1;
				for ( i=0;i<this.itemA[a].nValuesA.length;i++ ){
					nValue = this.itemA[a].nValuesA[i];

					var nPercentOfMean	 = 100/this.nMeanA[i]*nValue;
					var nPercentOfMedian = 100/this.nMedianA[i]*nValue;
					var nDeviation		 = (nValue-this.nMeanA[i])/this.nDeviationA[i];

					nRelevanz = nValue;
					if ( this.szFlag.match(/PERCENTOFMEAN/) ){
						nRelevanz = nPercentOfMean; 
					}
					if ( this.szFlag.match(/PERCENTOFMEDIAN/) ){
						nRelevanz = nPercentOfMedian; 
					}
					if ( this.szFlag.match(/DEVIATION/) ){
						nRelevanz = nDeviation; 
					}
					if ( (nValue > this.nFilterA[i]) && (nRelevanz > nLastRelevant) ){
						// store next best dominant value
						this.itemA[a].nClass = i;
						nLastRelevant = nRelevanz;
						nIndex = i;
					}
				}

				// if we have found a dominant value; 
				if ( nIndex >= 0 ){
					this.itemA[a].nDominant = nIndex;
					nValue = this.itemA[a].nValuesA[nIndex];

					szLabel = " "+this.szFieldsA[nIndex]+" ";
					if (this.szLabelA &&  this.szLabelA[nIndex] ){
						szLabel = " "+this.szLabelA[nIndex]+" ";
					}
					if ( this.szFlag.match(/PERCENTOFMEAN/) || this.szFlag.match(/DEVIATION/)){
						szRelevanz =  map.Dictionary.getLocalText(" ( mean: ")+this.formatValue(this.nMeanA[nIndex],1)+this.szUnit+")";
					}
					if ( this.szFlag.match(/PERCENTOFMEDIAN/) ){
						szRelevanz =  map.Dictionary.getLocalText(" ( median: ")+this.formatValue(this.nMedianA[nIndex],1)+this.szUnit+")";
					}
					// get the color 
					this.itemA[a].nValue  = this.itemA[a].nValuesA[nIndex];
					this.itemA[a].szLabel = szLabel;
					szColor = this.colorScheme[nIndex];
					var cColor = __maptheme_getChartColors(szColor);
					if ( szFlag.match(/NOLINES/) ){
						szLineColor = "none";
					}else{
						szLineColor = cColor.textColor;
					}
					// value attributes are defined in child nodes
					chartGroup.setAttributeNS(szMapNs,"value","seechilds");
					nClass = nIndex;
					fDoDraw = true; 
				}
			}else{	

				for ( i=0;i<this.partsA.length;i++ ){
					if ( nValue < this.partsA[i].max ){
						szColor = this.colorScheme[i];
						var cColor = __maptheme_getChartColors(szColor);
						if ( szFlag.match(/NOLINES/) ){
							szLineColor = "none";
						}else{
							szLineColor = cColor.textColor;
						}
						if ( szFlag.match(/RANGE/) && !szFlag.match(/RANGES/) ){
							nRadius = map.Scale.normalX(2+5*(i+1)/this.partsA.length);
						}
						if ( !szFlag.match(/ZOOM/) && !szFlag.match(/MENUSIZE/) && !szFlag.match(/NORMSIZE/) ){
							this.partsA[i].nCount++;
						}
						// value attributes are defined in child nodes
						chartGroup.setAttributeNS(szMapNs,"value","seechilds");
						nClass = i;
						fDoDraw = true; 
						break;
					}
				}
			}
		}
		/** 
			---------------------------------------------------
		**/

		// GR 25.09.2014 overwrite with defined
		// !! preset textcolor with calcolated linecolor, than evt. overwrite linecolor
		szTextColor = this.szTextColor||szLineColor;	
		szLineColor = this.szLineColor||szLineColor;
		if ( fDoDraw ){

			var nLineWidth = this.nLineWidth||0.1;
			if ( szFlag.match(/OUTLINE/) ){
				nLineWidth = map.Scale.normalX(Math.min(1,1/nMaxRadius*nRadius)); //*map.Scale.nFeatureScaling*map.Scale.nObjectScaling;
			}else{
				nLineWidth = map.Scale.normalX(nLineWidth/nMaxRadius*nRadius); 
			}
			
			if (szFlag.match(/BUBBLE/)){
				// GR 09.09.2014 test pseudo shadow
				if ( !this.fShadow && this.fOrigShadow && (nRadius > map.Scale.normalX(5)) ){
					newShape = map.Dom.newShape('circle',shapeGroup,nRadius*0.02,nRadius*0.02,nRadius*1.01,"fill:#000000;stroke:none;opacity:"+0.6*(this.fillOpacity?this.fillOpacity:1));
					newShape.setAttributeNS(szMapNs,"class",String(nClass));
					newShape = map.Dom.newShape('circle',shapeGroup,nRadius*0.03,nRadius*0.03,nRadius*1.04,"fill:"+szColor+";stroke:none;opacity:"+0.2*(this.fillOpacity?this.fillOpacity:1));
					newShape.setAttributeNS(szMapNs,"class",String(nClass));
				}
				if ((szFlag.match(/GLOW/) && !szFlag.match(/ZOOM/)) &&
				    (!this.szGlowUpper || (map.Scale.getTrueMapScale()*map.Scale.nZoomScale <= this.nGlowUpper)) ){ 
					newShape = map.Dom.newShape('circle',shapeGroup,0,0,nRadius*6,"fill:"+szColor+";stroke:none;fill-opacity:0.05;");
					if (newShape){
						newShape.setAttributeNS(szMapNs,"class",String(nClass));
					}
					newShape = map.Dom.newShape('circle',shapeGroup,0,0,nRadius*2,"fill:"+szColor+";stroke:none;fill-opacity:0.1;");
					if (newShape){
						newShape.setAttributeNS(szMapNs,"class",String(nClass));
					}
				}else
				if ((szFlag.match(/AURA/) && !szFlag.match(/ZOOM/)) &&
				    (!this.szGlowUpper || (map.Scale.getTrueMapScale()*map.Scale.nZoomScale <= this.nGlowUpper)) ){ 
					newShape = map.Dom.newShape('circle',shapeGroup,0,0,nRadius*1.3,"fill:"+(this.szLineColor||szColor)+";stroke:none;fill-opacity:0.3;");
					if (newShape){
						newShape.setAttributeNS(szMapNs,"class",String(nClass));
					}
				}
				newShape = map.Dom.newShape('circle',shapeGroup,0,0,nRadius,"fill:"+szColor+";stroke:"+szLineColor+";stroke-width:"+nLineWidth+";");
			}
			else
			if (szFlag.match(/SQUARE/)){
				newShape = map.Dom.newShape('rect',shapeGroup,-nRadius,-nRadius,nRadius*2,nRadius*2,"fill:"+szColor+";stroke:"+szLineColor+";stroke-width:"+nLineWidth+";");
				}
			else
			if (szFlag.match(/TEXTONLY/)){
				newShape = map.Dom.newShape('rect',shapeGroup,-nRadius,-8,nRadius*2.05,8,"fill:none;stroke:none;");
				}
			else
			if (szFlag.match(/LABEL/)){
				// GR 16.04.2013 needed for label background
				var szText = this.formatValue(nValue,this.szValueDecimals||(((nValue<1)||(nMaxValue<10))?1:0),"ROUND")+(this.szUnit.length<=5?this.szUnit:"");
				// GR 05.05.2014 make a positive sign, if positive value is result of a diff operation
				if ( (nValue > 0) && (this.szFlag.match(/DIFFERENCE/) || this.szFlag.match(/RELATIVE/)) ){
					szText = "+"+szText;
				}
				var nFontHeight = Math.min(nRadius*0.8,nRadius*(3.4/szText.length));
				// -----------------------------------------
				if ( !this.fShadow && this.fOrigShadow && (nRadius > map.Scale.normalX(5)) ){

					newShape = map.Dom.newShape('rect',shapeGroup,-nRadius+nRadius*0.02,-nFontHeight*0.83+nRadius*0.02,nRadius*2.05,nFontHeight*1.6,"fill:#000000;stroke:none;opacity:"+0.4*(this.fillOpacity?this.fillOpacity:1));
					if ( newShape ){
						newShape.setAttributeNS(null,'rx',map.Scale.normalX(2*nRadius/nMaxRadius));
						newShape.setAttributeNS(null,'ry',map.Scale.normalX(2*nRadius/nMaxRadius));
					}

					newShape = map.Dom.newShape('rect',shapeGroup,-nRadius+nRadius*0.03,-nFontHeight*0.83+nRadius*0.03,nRadius*2.05,nFontHeight*1.6,"fill:"+szColor+";stroke:none;opacity:"+0.2*(this.fillOpacity?this.fillOpacity:1));
					if ( newShape ){
						newShape.setAttributeNS(null,'rx',map.Scale.normalX(2*nRadius/nMaxRadius));
						newShape.setAttributeNS(null,'ry',map.Scale.normalX(2*nRadius/nMaxRadius));
					}
				}
				newShape = map.Dom.newShape('rect',shapeGroup,-nRadius,-nFontHeight*0.83,nRadius*2.05,nFontHeight*1.6,"fill:"+szColor+";stroke:"+szLineColor+";stroke-width:"+nLineWidth+";");
				if ( newShape ){
					newShape.setAttributeNS(null,'rx',map.Scale.normalX(2*nRadius/nMaxRadius));
					newShape.setAttributeNS(null,'ry',map.Scale.normalX(2*nRadius/nMaxRadius));
				}
			}
			if (newShape){
				if ( !szFlag.match(/SILENT/) ){
					if ( szFlag.match(/EXACT/) && this.szLabelA && this.szLabelA[i] ){
						newShape.setAttributeNS(szMapNs,"tooltip",this.szLabelA[i]+" "+this.szTitle+"");
					}else{
						newShape.setAttributeNS(szMapNs,"tooltip",this.formatValue(nValue,2)+this.szUnit+" "+this.szTitle+"");
					}
				}
				newText = null;
				if ( szFlag.match(/VALUES/) &&
					(!this.szValueUpper || (map.Scale.getTrueMapScale()*map.Scale.nZoomScale <= this.nValueUpper)) ){ 
					var szText = null;
					if ( this.szValueField && this.itemA[a] ){
						// GR 25.05.2015 explizit value display field
						if ( 1 || szValue == Number(szValue) ){
							szText = this.formatValue(this.itemA[a].szValue,this.szValueDecimals||(((szValue<1)||(nMaxValue<10))?1:0),"ROUND")+(this.szUnit.length<=5?this.szUnit:"");
						}else{
							// if not number, take it as it is
							szText = this.itemA[a].szValue + (this.szUnit.length<=5?this.szUnit:"");
						}
					}else
					if ( szFlag.match(/EXACT/) && this.szLabelA ){
						szText = this.szLabelA[nValue-1]||"?";
					}else{
						szText = this.formatValue(nValue,this.szValueDecimals||(((nValue<1)||(nMaxValue<10))?1:0),"ROUND")+(this.szUnit.length<=5?this.szUnit:"");
						// GR 05.05.2014 make a positive sign, if positive value is result of a diff operation
						if ( (nValue > 0) && (this.szFlag.match(/DIFFERENCE/) || this.szFlag.match(/RELATIVE/)) ){
							szText = "+"+szText;
							}
					}
					var nFontSize = String(Math.min(nRadius*0.8,nRadius*(3.3/szText.length)));

					if ( szFlag.match(/TEXTONLY/) ){
						szTextColor = cColor.textColor;
						nFontSize = String(Math.max(Math.min(nRadius*0.8,map.Scale.normalX(500)),map.Scale.normalX(2)));
						if ( this.nValueSizeMin && !szFlag.match(/ZOOM/) ){
							if ( nFontSize*map.Layer.nDynamicObjectScale < map.Scale.normalX(this.nValueSizeMin) ){
								return null;
							}
						}
						var szFont = this.szTextFont || "arial";
						newTextBg = map.Dom.newText(shapeGroup,0,0,"font-family:"+szFont+";font-size:"+nFontSize+"px;font-weight:normal;text-anchor:middle;fill:none;stroke:"+szColor+";stroke-width:"+ nFontSize/7 +";stroke-opacity:0.5;pointer-events:none;stroke-linejoin:bevel;",szText);
						newTextBg.setAttributeNS(null,"id",this.szId+":"+a+":text:bg");
						newText   = map.Dom.newText(shapeGroup,0,0,"font-family:"+szFont+";font-size:"+nFontSize+"px;font-weight:normal;text-anchor:middle;fill:"+(this.szTextColor||"#000000")+";opacity:"+nOpacity+";stroke:none;",szText);
						newText.setAttributeNS(null,"id",this.szId+":"+a+":text");
						newShape.parentNode.removeChild(newShape);
					}else
					if ( szFlag.match(/ZOOM/) && (nFontSize<map.Scale.normalX(6)) ){
						szTextColor = "black";
						newText  = map.Dom.newText(shapeGroup,nRadius+nMaxRadius*0.1,-nRadius/2,this.szValuesTextStyle,szText);
					}else
					if ( szFlag.match(/LABEL/) || (nFontSize > map.Scale.normalX(1)) ){
						var nOpacity = this.nValueSizeMin?(nFontSize/map.Scale.normalX(5)):1; 
						newText  = map.Dom.newText(shapeGroup,0,nFontSize*0.33,"font-family:arial;font-size:"+nFontSize+"px;font-weight:bold;text-anchor:middle;fill:"+szTextColor+";opacity:"+nOpacity+";stroke:none;pointer-events:none",szText);
					}
				}
				if ( szFlag.match(/DTEXT/) && a && !szFlag.match(/ZOOM/) ){
					var nTextOpacity = Math.pow(Math.abs(nRadius),1/3)/Math.pow(nMaxRadius,1/3);
					newShape.style.setProperty("fill-opacity",String(nTextOpacity),"");
					newShape.style.setProperty("stroke-opacity",String(nTextOpacity),"");
					if (newText){
						newText.style.setProperty("fill-opacity",String(nTextOpacity),"");
					}
				}else{
					newShape.style.setProperty("fill-opacity",String(this.fillOpacity?this.fillOpacity:1),"");
					if ( szFlag.match(/OUTLINE/) || this.szLineColor ){
						newShape.style.setProperty("stroke-opacity","1","");
					}else{
						newShape.style.setProperty("stroke-opacity",String((this.fillOpacity && this.fillOpacity<0.5)?1:0.3),"");
					}
				}
			}

			// define value and class, if set 
			//
			if ( nClass != null ){
				if ( newShape ) {
					newShape.setAttributeNS(szMapNs,"value",String(nValue));
					newShape.setAttributeNS(szMapNs,"class",String(nClass));
				}
				if ( newText ) {
					newText.setAttributeNS(szMapNs,"value",String(nValue));
					newText.setAttributeNS(szMapNs,"class",String(nClass));
				}
				if ( newTextBg ) {
					newTextBg.setAttributeNS(szMapNs,"value",String(nValue));
					newTextBg.setAttributeNS(szMapNs,"class",String(nClass));
				}
			}
			nChartSize = nRadius*2/map.Scale.normalX(1);
			ptNull.x = 0;
			ptNull.y = nRadius+map.Scale.normalY(5);

			this.nRealizedCount++;
		}
		else{
			this.nMissingRangeCount++;
			return null;
		}
	}

	// == SYMBOL ================================================================================

	else if ( szFlag.match(/SYMBOL/) ){

		// check if symbol with box 
		// -------------------------
		if ( typeof(this.szSymbolBoxStyle) != 'undefined' ) {

			var szLineColor = "#dddddd";
			if ( typeof(this.szBorderColor) != 'undefined' ) {
				szLineColor = this.szBorderColor;
			}
			var szLineStyle = "stroke-width:0;";
			if ( typeof(this.szBorderStyle) != 'undefined' ) {
				switch(this.szBorderStyle){
					case "dotted": szLineStyle = "stroke-width:"+map.Scale.normalX(1.0)+";stroke-linecap:round;stroke-dasharray:1,50;"; break; 
					case "dashed": szLineStyle = "stroke-width:"+map.Scale.normalX(1.0)+";stroke-linecap:butt;stroke-dasharray:30,30;"; break; 
					case "solid":  szLineStyle = "stroke-width:"+map.Scale.normalX(1.0)+";"; break; 
					case "none":   szLineStyle = "stroke-width:0;"; break; 
				}
			}
			var newFrame = map.Dom.newShape('rect',shapeGroup,0,0,1,1,"fill:white;stroke:"+szLineColor+";"+szLineStyle);
			switch(this.szSymbolBoxStyle){
				case "frame": newFrame.setAttributeNS(null,"fill-opacity",0); break; 
				case "field": newFrame.setAttributeNS(null,"fill-opacity",1); break; 
			}
		}
		var nSymbols = 0;
		var nSymbolOffsetX = 0;
		var nSymbolOffsetY = 0;

		// check symbols definition, if not, create it
		// -------------------------------------------

		if ( !this.szSymbolsA ){
			this.szSymbolsA = new Array();
			for ( i=0;i<nPartsA.length;i++ ){
				this.szSymbolsA.push("circle");
			}
		}else
		if ( (this.szSymbolsA.length < nPartsA.length) ){
			for ( i=this.szSymbolsA.length;i<nPartsA.length;i++ ){
				this.szSymbolsA.push(this.szSymbolsA[0]);
			}
		}

		// value attributes are defined in child nodes
		chartGroup.setAttributeNS(szMapNs,"value","seechilds");

		var shapeTextGroup = null;
		if ( szFlag.match(/VALUES/) ){
			shapeTextGroup = map.Dom.newGroup(shapeGroup,this.szId+":"+a+":textgroup");
		}

		this.initAngle = 0;

		// sort by value, if flags set
		// ---------------------------
		if ( szFlag.match(/SORT/) ){
			if ( szFlag.match(/MEAN/) ){
				this.sortedIndex = new Array(0);
				this.sortedMax = 0;
				for ( i=0;i<nPartsA.length;i++ ){
					this.sortedIndex[i] = {index:i,value:nPartsA[i],tvalue:nPartsA[i],mean:this.nMeanA[i]};
					this.sortedMax = Math.max(this.sortedMax,nPartsA[i]);
				}
				this.sortedIndex.sort(this.sortMeanUp);
				this.initAngle = 0; 
			}
			else
			if ( szFlag.match(/MEDIAN/) ){
				this.sortedIndex = new Array(0);
				this.sortedMax = 0;
				for ( i=0;i<nPartsA.length;i++ ){
					this.sortedIndex[i] = {index:i,value:nPartsA[i],tvalue:nPartsA[i],mean:this.nMedianA[i]};
					this.sortedMax = Math.max(this.sortedMax,nPartsA[i]);
				}
				this.sortedIndex.sort(this.sortMeanUp);
				this.initAngle = 0; 
			}
			else
			if ( szFlag.match(/UP/) ){
				this.sortedIndex = new Array(0);
				this.sortedMax = 0;
				for ( i=0;i<nPartsA.length;i++ ){
					this.sortedIndex[i] = {index:i,value:nPartsA[i],tvalue:nPartsA[i]};
					this.sortedMax = Math.max(this.sortedMax,nPartsA[i]);
				}
				this.sortedIndex.sort(this.sortIndexUp);
				this.initAngle = 0; 
			}
			else
			if ( szFlag.match(/DOWN/) ){
				this.sortedIndex = new Array(0);
				this.sortedMax = 0;
				for ( i=0;i<nPartsA.length;i++ ){
					this.sortedIndex[i] = {index:i,value:nPartsA[i],tvalue:nPartsA[i]};
					this.sortedMax = Math.max(this.sortedMax,nPartsA[i]);
				}
				this.sortedIndex.sort(this.sortIndexDown);
				this.initAngle = 0; 
			}
			else
			if ( szFlag.match(/RANDOM/) ){
				this.sortedIndex = new Array(0);
				this.sortedMax = 0;

				if ( this.nClipParts && (this.nClipParts < nPartsA.length) ){
					var tempIndex = new Array(0);
					for ( i=0;i<nPartsA.length;i++ ){
						tempIndex[i] = {index:i,value:nPartsA[i],tvalue:nPartsA[i]};
					}
					tempIndex.sort(this.sortIndexDown);
					for ( i=0;i<this.nClipParts;i++ ){
						var sI = tempIndex[i].index;
						this.sortedIndex[i] = {index:sI,value:nPartsA[sI],tvalue:nPartsA[sI]};
						this.sortedMax = Math.max(this.sortedMax,nPartsA[i]);
					}
				}else{
					for ( i=0;i<nPartsA.length;i++ ){
						this.sortedIndex[i] = {index:i,value:nPartsA[i],tvalue:nPartsA[i]};
						this.sortedMax = Math.max(this.sortedMax,nPartsA[i]);
					}
				}
				if ( a ){
					if ( !this.itemA[a].randomA ){
						this.itemA[a].randomA = this.getRandomNumberArray(nPartsA.length+1);
					}
					this.shuffleArray(this.sortedIndex,this.itemA[a].randomA);
					this.initAngle = Math.floor(this.itemA[a].randomA[0]*360);
				}else{
					this.initAngle = 0;
				}
			}
		}
		else{
			this.sortedIndex = null;
		}
		if ( szFlag.match(/RINGS/) ){
			if ( this.sortedIndex ){
				var dValue = 0;
				for ( i=0; i<this.sortedIndex.length;i++ ){
					if (this.sortedIndex[i].value){
						this.sortedIndex[i].value += dValue;
						dValue = this.sortedIndex[i].value;
					}
				}
				this.sortedIndex.sort(this.sortIndexDown);
			}else {
				var dValue = 0;
				this.sortedIndex = new Array(0);
				for ( i=0;i<nPartsA.length;i++ ){
					this.sortedIndex[i] = {index:i,value:nPartsA[i],tvalue:nPartsA[i]};
					if (this.sortedIndex[i].value){
						this.sortedIndex[i].value += dValue;
						dValue = this.sortedIndex[i].value;
					}
				}
				this.sortedIndex.sort(this.sortIndexDown);
			}
		}

		var topShape = null;
		var topText  = null;
		var topGrid  = null;

		var nClass = 0;

		var nStarRadius = 0;
		var nAllMaxValue = null;
		var nAllMinValue = null;
		var nChartMaxValue = 0;
		var nNonZeroValues = 0;
		var nNonZeroValuesDone = 0;

		var fPlotInit = false;

		// GR 21.02.2014 enable parts clipping
		var nStartI = 0;
		var nMaxI = nPartsA.length;
		if ( this.nClipParts && (this.nClipParts < nPartsA.length) ){
			if ( szFlag.match(/UP/) ){
				nStartI = nPartsA.length-this.nClipParts;
			}else{
				nMaxI = this.nClipParts;
			}
		}

		// GR 15.02.2016 DOMINANT or PERCENTOFMEAN
		// ---------------------------------------
		// special case of symbol color	
		// color represents the dominant value (out of n <=> colorscheme values)
		// implemented by selecting the right part of the symbol sequence
		if ( this.szFlag.match(/DOMINANT/) ){

			var nRelevanz = 0;
			var nLastRelevant = 0;

			// search for dominant value above filter 
			var nnIndex = -1;
			for ( i=0;i<this.itemA[a].nValuesA.length;i++ ){
				var nValue = this.itemA[a].nValuesA[i];

				var nPercentOfMean	 = 100/this.nMeanA[i]*nValue;
				var nPercentOfMedian = 100/this.nMedianA[i]*nValue;
				var nDeviation		 = (nValue-this.nMeanA[i])/this.nDeviationA[i];

				nRelevanz = nValue;
				if ( this.szFlag.match(/PERCENTOFMEAN/) ){
					nRelevanz = nPercentOfMean; 
				}
				if ( this.szFlag.match(/PERCENTOFMEDIAN/) ){
					nRelevanz = nPercentOfMedian; 
				}
				if ( this.szFlag.match(/DEVIATION/) ){
					nRelevanz = nDeviation; 
				}
				if ( (nValue > this.nFilterA[i]) && (nRelevanz > nLastRelevant) ){

					this.itemA[a].nClass = i;
					nLastRelevant = nRelevanz;
					nnIndex = i;
				}
			}

			// if we have found a dominant value, set the nStartI and nMaxI to select it
			if ( nnIndex >= 0 ){
				this.itemA[a].nDominant = nnIndex;
				nStartI = nnIndex;
				nMaxI = nStartI+1;
				nClass = nnIndex;
			}
		}	
		// ----------------------------------------------------
		

		for ( i=nStartI; i<nMaxI; i++ ){
			nNonZeroValues += (nPartsA[i] != 0);
			nAllMaxValue = Math.max(nAllMaxValue||this.nMaxA[i],this.nMaxA[i]);
			nAllMinValue = Math.min(nAllMinValue||this.nMinA[i],this.nMinA[i]);
			nChartMaxValue = Math.max(nChartMaxValue,nPartsA[i]);
		}

		for ( i=nStartI; i<nMaxI; i++ ){
			var nIndex = i;
			var nValue	   = nPartsA[nIndex];
			var tValue	   = nPartsA[nIndex];

			if ( this.sortedIndex ){
				nValue = this.sortedIndex[nIndex].value;
				tValue = this.sortedIndex[nIndex].tvalue;
				nIndex = this.sortedIndex[nIndex].index;
			}

			if ( this.szValueField && this.itemA[a] ){
				// GR 25.05.2015 explizit value display field, take it as is
				tValue = __scanValue(this.itemA[a].szValue);
			}

			if ( this.szShowParts ){
				var skipIt = true;
				for ( p in this.szShowPartsA ){
					if ( this.szShowPartsA[p] == nIndex%(this.nGridX||1000000) ){
						skipIt = false;
					}
				}
				if ( skipIt ){
					continue;
				}
			}
			
			// preset color class with chart part index 
			nClass = nIndex;

			// a) symbol equals value
			// ----------------------
			if ( szFlag.match(/EXACT/) && !szFlag.match(/AGGREGATE/) ) {

				var szSymbol = "";
				if ( this.nRangesA && this.nRangesA.length ){
					for ( ii=0; ii<this.nRangesA.length; ii++ ){
						if ((nValue == this.nRangesA[ii]) || (Number(nValue) == Number(this.nRangesA[ii])) ){
							szSymbol = this.szSymbolsA[ii] || this.szSymbolsA[0] || "circle";
							nClass = ii;
							break;
						}
					}
				}

				var szTooltip = String(nValue);
				var szLabel = String(nValue);

				if ( this.szLabelA && this.szLabelA[nClass] ){
					szTooltip = this.szLabelA[nClass];
					szLabel = this.szLabelA[nClass];
				}

				if ( !szSymbol.length && nIndex == 0 ){
					szSymbol = "empty";
					szTooltip = szLabel = "no data";
					nClass = 0;
				}
				if ( szSymbol.length ){
					nSymbols++;
					var newShape = null;

					szColor = this.colorScheme[nClass];
					if ( szFlag.match(/NOLINES/) ){
						szLineColor = "none";
					}else{
						szLineColor = this.colorScheme[nClass];
						if (szColor == "white" || szColor == "#ffffff" ){
							szLineColor = "gray";
						}
					}

					if ( szSymbol == "circle" || szSymbol == "square" || szSymbol == "carot" || szSymbol == "diamond" || szSymbol == "triangle" ||szSymbol == "hexagon" || szSymbol == "empty" ){
						var nRadius = map.Scale.normalX(nChartSize/3);
						// GR 10.05.2015 explicit size field
						if ( this.szSizeField && a && this.itemA[a]){
							nRadius    = nRadius / Math.sqrt(this.nMaxSize) * Math.sqrt(this.itemA[a].nSize); 
						}
						switch ( szSymbol ){
							case "empty":
								newShape = map.Dom.newShape('circle',shapeGroup,0,0,nRadius,"fill:#888888;fill-opacity:0;stroke:#888888;stroke-width:"+map.Scale.nFeatureScaling*map.Scale.nObjectScaling+";");
								break;
							case "circle":
								newShape = map.Dom.newShape('circle',shapeGroup,0,0,nRadius,"fill:"+szColor+";stroke:"+szLineColor+";stroke-width:"+map.Scale.nFeatureScaling*map.Scale.nObjectScaling+";");
								break;
							case "square":
								newShape = map.Dom.newShape('rect',shapeGroup,-nRadius*0.8,-nRadius*0.8,nRadius*2*0.8,nRadius*2*0.8,"fill:"+szColor+";stroke:"+szLineColor+";stroke-width:"+map.Scale.nFeatureScaling*map.Scale.nObjectScaling+";");
								break;
							case "diamond":
							case "carot":
								newShape = map.Dom.newShape('rect',shapeGroup,-nRadius*0.8,-nRadius*0.8,nRadius*2*0.8,nRadius*2*0.8,"fill:"+szColor+";stroke:"+szLineColor+";stroke-width:"+map.Scale.nFeatureScaling*map.Scale.nObjectScaling+";");
								if ( newShape ){
									newShape.setAttributeNS(null,"transform","rotate(45)");
								}
								break;
							case "triangle":
								newShape = map.Dom.newShape('path',shapeGroup,"M 0,"+nRadius+" l"+nRadius*1.2+",-"+nRadius*2+" -"+nRadius*2.4+",0 "+nRadius*1.2+","+nRadius*2+"z","fill:"+szColor+";stroke:"+szLineColor+";stroke-width:"+map.Scale.nFeatureScaling*map.Scale.nObjectScaling+";");
								break;
							case "hexagon":
								var A = nRadius/2;
								var B = nRadius*Math.sin(60/180*Math.PI);
								var C = nRadius;
								newShape = map.Dom.newShape('path',shapeGroup,"M -"+nRadius+","+0+" l "+A+",-"+B+" "+C+","+0+" "+A+","+B+" -"+A+","+B+" -"+C+","+0+" -"+A+",-"+B+" z","fill:"+szColor+";stroke:"+szLineColor+";stroke-width:"+nLineWidth+";");
								break;
						}
						if (szFlag.match(/HORZ/)){
							if ( szFlag.match(/VALUES/) ){
								var cColor = __maptheme_getChartColors(szColor);
								szLineColor = cColor.textColor;
								var newText  = map.Dom.newText(shapeTextGroup,0,0,"font-family:arial;font-size:"+ String(nRadius/2) +"px;text-anchor:start;baseline-shift:-90%;fill:"+"#bbbbbb"+";stroke:none;pointer-events:none",szLabel);
								newText.fu.setPosition(nIndex*nRadius*2,-nRadius-map.Scale.normalX(5));
								if( nPartsA.length > 1 ){
									setRotate(newText,-45);
								}
							}
							if ( szFlag.match(/AXIS/) && this.szXaxisA ){
								var cColor = __maptheme_getChartColors(szColor);
								szLineColor = cColor.textColor;
								var szAxisText = this.szXaxisA[i];
								var newText  = map.Dom.newText(shapeTextGroup,0,0,"font-family:arial;font-size:"+ String(nRadius/2) +"px;text-anchor:start;baseline-shift:-90%;fill:"+"#bbbbbb"+";stroke:none;pointer-events:none",szAxisText);
								newText.fu.setPosition(nIndex*nRadius*2+map.Scale.normalX(2),nRadius+map.Scale.normalX(1));
								if( nPartsA.length > 1 ){
									setRotate(newText,45);
								}
							}
							newShape.setAttributeNS(szMapNs,"tooltip",szTooltip);
							newShape.fu.setPosition(nIndex*nRadius*2,0);
						}
						else{
							if ( szFlag.match(/VALUES/) && (!this.fHideValues || szFlag.match(/ZOOM/)) ){
								var cColor = __maptheme_getChartColors(szColor);
								szLineColor = cColor.textColor;
								var newText  = map.Dom.newText(shapeTextGroup,0,0,"font-family:arial;font-size:"+ String(nRadius/2) +"px;text-anchor:start;baseline-shift:-45%;fill:"+"#bbbbbb"+";stroke:none;pointer-events:none",szLabel);
								newText.fu.setPosition(nRadius+map.Scale.normalX(3),-nIndex*(nRadius*2-map.Scale.normalY(0)));
							}
							newShape.setAttributeNS(szMapNs,"tooltip",szTooltip);
							newShape.fu.setPosition(0,-nIndex*(nRadius*2-map.Scale.normalY(0)));
						}
					}else{
						var nRadius = map.Scale.normalX(nChartSize*0.4);
						newShape  = map.Dom.constructNode('use',shapeGroup,{'xlink:href':'#'+szSymbol+":antizoomandpan"});
						newShape.setAttributeNS(null,"style","fill:"+szColor+";stroke:"+szLineColor);
						// GR 20.04.2011 explicit size field
						if ( this.szSizeField && a && this.itemA[a]){
							var nScale = 1 / Math.sqrt(this.nMaxSize) * Math.sqrt(this.itemA[a].nSize); 
							newShape.fu.scale(nScale,nScale);
						}
						newShape.fu.setPosition(map.Scale.normalX(0)+nIndex*map.Scale.normalX(20),map.Scale.normalY(0));
						if ( nIndex>0 ){
							map.Dom.newText(shapeGroup,map.Scale.normalX(-9)+nIndex*map.Scale.normalX(20),0,"font-family:arial;font-size:"+ String(360) +"px;text-anchor:middle;baseline-shift:-50%;fill:none;stroke:black;stroke-width:60;pointer-events:none;opacity:0.3;","+");
							map.Dom.newText(shapeGroup,map.Scale.normalX(-9)+nIndex*map.Scale.normalX(20),0,"font-family:arial;font-size:"+ String(360) +"px;text-anchor:middle;baseline-shift:-50%;fill:white;stroke:none;pointer-events:none;opacity:0.8;","+");
						}
						if ( szFlag.match(/VALUES/) ){
							var cColor = __maptheme_getChartColors(szColor);
							szLineColor = cColor.textColor;
							var newText  = map.Dom.newText(shapeTextGroup,0,0,"font-family:arial;font-size:"+ String(nRadius/2) +"px;text-anchor:start;baseline-shift:-45%;fill:"+"#bbbbbb"+";stroke:none;pointer-events:none",szLabel);
							newText.fu.setPosition(nRadius/2+map.Scale.normalX(3),-nIndex*(nRadius*2));
							if ( this.szSizeField && a && this.itemA[a]){
								newText  = map.Dom.newText(shapeTextGroup,0,0,"font-family:arial;font-size:"+ String(nRadius/2) +"px;text-anchor:start;baseline-shift:-45%;fill:"+"#bbbbbb"+";stroke:none;pointer-events:none",String(this.itemA[a].nSize)+this.szSizeValueUnits);
								newText.fu.setPosition(nRadius/2+map.Scale.normalX(3),-nIndex*(nRadius*2)+(nRadius/2));
							}
						}
					}
					newShape.setAttributeNS(szMapNs,"value",String(nValue));
					newShape.setAttributeNS(szMapNs,"class",String(nClass%(this.nGridX||1000000)));
					this.nRealizedCount++;
				}
				else{
					this.nMissingRangeCount++;
				}
			}
			// b) symbolsize equals value
			// --------------------------
			else{

				var nMaxRadius = map.Scale.normalX(nChartSize/2);
				var nMaxValue  = nAllMaxValue;

				if (szFlag.match(/MENUSIZE/) ){
					nMaxValue  = nChartMaxValue*5;
				}else
				if ( this.nNormalSizeValue && !( szFlag.match(/SEQUENCE/) && this.szSizeField ) ){
					nMaxValue = this.nNormalSizeValue;
					this.nMaxSize = this.nNormalSizeValue;
				}
				if ( szFlag.match(/ZOOM/) && szFlag.match(/SEQUENCE/) ){
					nMaxValue  = nChartMaxValue/2 + nChartMaxValue/2*Math.pow(nMaxValue,1/2)/Math.pow(nChartMaxValue,1/2);
				}
				if ( szFlag.match(/INVERTSIZE/) ){
					if ( (nMaxValue-nValue == 0) && !(szFlag.match(/ZEROISVALUE/)) ){
						return null;
					}
				}
				// GR 07.04.2009 test test test 
				if ( this.szFlag.match(/CLIP/) && !this.szFlag.match(/MORPH/) && this.nClipFrames ){
					if ( (this.nClipFrames == nPartsA.length) ){
						nValue = Number(nPartsA[this.nActualFrame]);
					}else{
						nValue = nPartsA[nIndex]*(this.nClipFrames-1-this.nActualFrame)/(this.nClipFrames-1) + nPartsA[nPartsA.length-1]*this.nActualFrame/(this.nClipFrames-1);
					}
				}

				// calc symbol size (nRadius)
				// ---------------------------

				var nRadius = 0;

				if ( szFlag.match(/AUTOSIZE/) ){
					var nDynScale = map.Layer.nDynamicObjectScale;
					var nAutoSize = szFlag.match(/RECT/)?(szFlag.match(/GAP/)?2.3:2.0):(szFlag.match(/GAP/)?1.6:1.5);
					nMaxValue = Math.max(nAllMaxValue,this.nMax);
					if ( this.nGridWidthPx ){
						nMaxRadius = map.Scale.normalX(this.nGridWidthPx)/nAutoSize/nDynScale;
					}else{
						nMaxRadius = this.nGridWidth?(map.Scale.getDeltaXofDistanceInMeter(this.nGridWidth)/nAutoSize/nDynScale):nMaxRadius;
					}
				}	
				
				if ( szFlag.match(/GRIDSIZE/) && !szFlag.match(/PLOT/) ){
					var nDynScale = map.Layer.nDynamicObjectScale;
					var nAutoSize = szFlag.match(/RECT/)?(szFlag.match(/GAP/)?2.3:2.0):(szFlag.match(/GAP/)?1.6:1.5);
					if ( this.nGridWidthPx ){
						nRadius = map.Scale.normalX(this.nGridWidthPx)/nAutoSize/this.nScale/nDynScale;
					}else{
						nRadius = this.nGridWidth?(map.Scale.getDeltaXofDistanceInMeter(this.nGridWidth)/nAutoSize/this.nScale/nDynScale):map.Scale.normalX(nChartSize/3);
					}
				}else
				if ( szFlag.match(/NOSIZE/) ){
					nRadius = map.Scale.normalX(nChartSize/3);
				}else
				if ( szFlag.match(/FIXSIZE/) ){
					nRadius = map.Scale.normalX(nChartSize/3) / (this.nNormalSizeValue||1);
				}else
				if ( szFlag.match(/LINEAR/) ){
					nRadius    = nMaxRadius / nMaxValue * nValue; 
				}else{
					if ( szFlag.match(/SIZELOG/) ){
						nRadius  = nMaxRadius / Math.log(nMaxValue) * Math.log(nValue); 
					}else
					if ( szFlag.match(/SIZEP4/) ){
						nRadius  = nMaxRadius / Math.pow(nMaxValue,1/4) * Math.pow(nValue,1/4); 
					}else
					if ( szFlag.match(/SIZEP3/) || szFlag.match(/SIZEVOLUME/) ){
						nRadius  = nMaxRadius / Math.pow(nMaxValue,1/3) * Math.pow(nValue,1/3); 
					}else{
						nRadius  = nMaxRadius / Math.sqrt(nMaxValue) * Math.sqrt(nValue);
					}
				}

				if ( szFlag.match(/SEQUENCE/) ){

					// special size fot MENU and ZOOM

					if ( szFlag.match(/MENUSIZE/) || (szFlag.match(/SUM/) && !a) ){
						nRadius    *= this.szField100?1:2; 
					}
					else
					if ( szFlag.match(/ZOOM/) && !szFlag.match(/PLOT/) ){
						nRadius    *= 2; 
					}

					// GR 03.09.2007 explicit size field
					// GR 05.02.2016 only for not AGGREGATE, which have 
					// symbol size from value, but chart size from sizefield

					else
					if ( !(szFlag.match(/AGGREGATE/) && szFlag.match(/EXACT/)) && this.szSizeField && a && this.itemA[a] ){

						if ( szFlag.match(/SIZELOG/) ){
							nRadius  = nRadius  / Math.log(this.nMaxSize) * Math.log(this.itemA[a].nSize); 
						}else
						if ( szFlag.match(/SIZEP4/) ){
							nRadius  = nRadius  / Math.pow(this.nMaxSize,1/4) * Math.pow(this.itemA[a].nSize,1/4); 
						}else
						if ( szFlag.match(/SIZEP3/) || szFlag.match(/SIZEVOLUME/) ){
							nRadius  = nRadius  / Math.pow(this.nMaxSize,1/3) * Math.pow(this.itemA[a].nSize,1/3); 
						}else{
							nRadius  = nRadius  / Math.sqrt(this.nMaxSize) * Math.sqrt(this.itemA[a].nSize); 
						}
					}
				}else{

					// special size for MENU and ZOOM

					if ( szFlag.match(/MENUSIZE/) || (szFlag.match(/SUM/) && !a) ){
						nRadius    = nMaxRadius * 1.5; 
					}
					else
					if ( szFlag.match(/ZOOM/) && !szFlag.match(/PLOT/) ){
						nRadius    = Math.max(nRadius,nMaxRadius*2/3); 
					}

					// GR 03.09.2007 explicit size field

					else
					if ( this.szSizeField && a && this.itemA[a]){
						nRadius    = nMaxRadius / Math.sqrt(this.nMaxSize) * Math.sqrt(this.itemA[a].nSize); 
					}
				}

				// GR 17.01.2014 don't draw stupid zero symbols
				if ( isNaN(nRadius) || !nRadius ){
					nRadius = 0;
					if ( !(szFlag.match(/STAR/) || szFlag.match(/STACKED/)) ){
						continue;
					}
				}

				// get the symbol
				// ---------------

				var szSymbol = this.szSymbolsA[nIndex];

				// GR 31.10.2015 set exact value as text label
				if ( this.szValueField && szFlag.match(/EXACT/) && this.szValuesA ){
					tValue = this.szValuesA[nIndex];
				}

				// get the symbol color
				// ---------------------

				if ( (szFlag.match(/SEQUENCE/) || szFlag.match(/DOMINANT/) ) && (this.colorScheme.length == this.partsA.length) ){
					var szColor = this.colorScheme[nIndex%(this.nGridX||10000)];
					var szLineColor = this.colorScheme[nIndex];
				}else{
					var szColor		= this.colorScheme[0];
					var szLineColor = this.colorScheme[1]?this.colorScheme[1]:"none";	
					if ( this.colorScheme.length > 2 ){
						szColor		= this.colorScheme[this.colorScheme.length-1];
						szLineColor = this.colorScheme[0];
					}
					if ( szFlag.match(/NOLINES/) ){
						szLineColor = "none";
					}else
					if ( szLineColor == "none" ){
						var cColor = __maptheme_getChartColors(szColor);
						szLineColor = cColor.textColor;
					}
					// GR 26.06.2006 bubbles with colorscheme (classes)
					if ( this.colorScheme.length > 2 || (this.szRanges && this.szRanges.length) ){
						for ( ii=0;ii<this.partsA.length;ii++ ){
							if ( (szFlag.match(/EXACT/) && (nValue == this.partsA[ii].min)) || (!szFlag.match(/EXACT/) && (nValue < this.partsA[ii].max)) ){
								szColor = this.colorScheme[ii];
								var cColor = __maptheme_getChartColors(szColor);
								szLineColor = cColor.textColor;
								if ( szFlag.match(/RANGE/) && !szFlag.match(/RANGES/) ){
									nRadius = map.Scale.normalX(2+5*(ii+1)/this.partsA.length);
								}
								nClass = ii;
								chartGroup.setAttributeNS(szMapNs,"class",String(nClass%(this.nGridX||1000000)));
								break;
							}
						}
						if ( szFlag.match(/NOLINES/) ){
							szLineColor = "none";
						}
					}
				}

				// make the symbol
				// ----------------

				if ( szSymbol == "circle" || szSymbol == "square" || szSymbol == "carot"|| szSymbol == "diamond" || szSymbol == "triangle" || szSymbol == "hexagon" || szSymbol == "empty" || szSymbol == "label" ){
					szLineColor = this.szLineColor || szLineColor;
					var nLineWidth = (this.nLineWidth || 1)*map.Scale.normalX(Math.min(2*nRadius/nMaxRadius,0.2)); // map.Scale.normalX(0.2); //*map.Scale.nFeatureScaling*map.Scale.nObjectScaling;
					switch ( szSymbol ){
						case "empty":
							newShape = map.Dom.newShape('circle',shapeGroup,0,0,nRadius,"fill:#888888;fill-opacity:0;stroke:#888888;stroke-width:"+nLineWidth+";");
							break;
						case "circle":
							if ( !this.fShadow && this.fOrigShadow ){
								newShapeBg = map.Dom.newShape('circle',shapeGroup,map.Scale.normalX(0.5)+nRadius*0.02,map.Scale.normalX(0.5)+nRadius*0.02,nRadius*1.02,"fill:#000000;stroke:none;opacity:"+0.6*(this.fillOpacity?this.fillOpacity:1));
							}
							// GR 29.12.2016 new
							if ((szFlag.match(/GLOW/) && !szFlag.match(/ZOOM/)) &&
								(!this.szGlowUpper || (map.Scale.getTrueMapScale()*map.Scale.nZoomScale <= this.nGlowUpper)) ){ 
								newShape = map.Dom.newShape('circle',shapeGroup,0,0,nRadius*6,"fill:"+szColor+";stroke:none;fill-opacity:0.05;");
								if (newShape){
									newShape.setAttributeNS(szMapNs,"class",String(nClass));
								}
								newShape = map.Dom.newShape('circle',shapeGroup,0,0,nRadius*2,"fill:"+szColor+";stroke:none;fill-opacity:0.1;");
								if (newShape){
									newShape.setAttributeNS(szMapNs,"class",String(nClass));
								}
							}else
							if ((szFlag.match(/AURA/) && !szFlag.match(/ZOOM/)) &&
								(!this.szGlowUpper || (map.Scale.getTrueMapScale()*map.Scale.nZoomScale <= this.nGlowUpper)) ){ 
								newShape = map.Dom.newShape('circle',shapeGroup,0,0,nRadius*1.3,"fill:"+(this.szLineColor||szColor)+";stroke:none;fill-opacity:0.3;");
								if (newShape){
									newShape.setAttributeNS(szMapNs,"class",String(nClass));
								}
							}
							newShape = map.Dom.newShape('circle',shapeGroup,0,0,nRadius,"fill:"+szColor+";stroke:"+szLineColor+";stroke-width:"+nLineWidth+";");
							break;
						case "square":
							newShape = map.Dom.newShape('rect',shapeGroup,-nRadius,-nRadius,nRadius*2,nRadius*2,"fill:"+szColor+";stroke:"+szLineColor+";stroke-width:"+nLineWidth+";");
							break;
						case "carot":
						case "diamond":
							newShape = map.Dom.newShape('rect',shapeGroup,-nRadius,-nRadius,nRadius*2,nRadius*2,"fill:"+szColor+";stroke:"+szLineColor+";stroke-width:"+nLineWidth+";");
							if ( newShape ){
								newShape.setAttributeNS(null,"transform","rotate(45)");
							}
							break;
						case "triangle":
							newShape = map.Dom.newShape('path',shapeGroup,"M 0,"+nRadius+" l"+nRadius*1.2+",-"+nRadius*2+" -"+nRadius*2.4+",0 "+nRadius*1.2+","+nRadius*2+"z","fill:"+szColor+";stroke:"+szLineColor+";stroke-width:"+nLineWidth+";");
							break;
						case "hexagon":
							var A = nRadius/2;
							var B = nRadius*Math.sin(60/180*Math.PI);
							var C = nRadius;
							newShape = map.Dom.newShape('path',shapeGroup,"M -"+nRadius+","+0+" l "+A+",-"+B+" "+C+","+0+" "+A+","+B+" -"+A+","+B+" -"+C+","+0+" -"+A+",-"+B+" z","fill:"+szColor+";stroke:"+szLineColor+";stroke-width:"+nLineWidth+";");
							break;
						case "label":
							var szText = this.formatValue(tValue,this.szValueDecimals||(((tValue<1)||(nMaxValue<10))?1:0),"ROUND")+(this.szUnit.length<=5?this.szUnit:"");
							if ( szFlag.match(/TEXTONLY/) ){
								szTextColor = __maptheme_getChartColors(szColor).textColor;
								nFontSize = String(Math.max(Math.min(nRadius*0.8,map.Scale.normalX(500)),map.Scale.normalX(2)));
								if ( this.nValueSizeMin && !szFlag.match(/ZOOM/) ){
									if ( nFontSize*map.Layer.nDynamicObjectScale < map.Scale.normalX(this.nValueSizeMin) ){
										newShape = map.Dom.newShape('rect',shapeGroup,0,0,0,0,"fill:none;");
										newShapeBg = map.Dom.newShape('rect',shapeGroup,0,0,0,0,"fill:none;");
										break;
									}
								}
								var szFont = this.szTextFont || "arial";
								newShapeBg = map.Dom.newText(shapeGroup,0,0,"font-family:"+szFont+";font-size:"+nFontSize+"px;font-weight:bold;text-anchor:middle;fill:none;stroke:"+szColor+";stroke-width:"+ nFontSize/7 +";stroke-opacity:0.5;pointer-events:none;stroke-linejoin:bevel;",szText);
								newShapeBg.setAttributeNS(null,"id",this.szId+":"+a+":text:bg");
								newShape   = map.Dom.newText(shapeGroup,0,0,"font-family:"+szFont+";font-size:"+nFontSize+"px;font-weight:bold;text-anchor:middle;fill:"+"#000000"+";opacity:"+nOpacity+";stroke:none;",szText);
								newShape.setAttributeNS(null,"id",this.szId+":"+a+":text");
							}else{
								var nFontSize = String(Math.max(1,Math.min(nRadius*0.8,nRadius*(3.4/szText.length))));
								if ( this.nValueSizeMin && !szFlag.match(/ZOOM/) ){
									if ( nFontSize*map.Layer.nDynamicObjectScale < map.Scale.normalX(this.nValueSizeMin) ){
										newShape = map.Dom.newShape('rect',shapeGroup,0,0,0,0,"fill:none;");
										break;
									}
								}
								newShape = map.Dom.newShape('rect',shapeGroup,-nRadius,-nFontSize*0.83,nRadius*2.05,nFontSize*1.6,"fill:"+szColor+";stroke:"+szLineColor+";stroke-width:"+nLineWidth+";");
								newShape.setAttributeNS(null,'rx',map.Scale.normalX(2*nRadius/nMaxRadius));
								newShape.setAttributeNS(null,'ry',map.Scale.normalX(2*nRadius/nMaxRadius));
							}
							break;
					}
					if ( newShape ){

						// set opacity
						// -----------
						if ( szFlag.match(/OUTLINE/) ){
							newShape.style.setProperty("stroke-width",String(map.Scale.normalX(0.5)));
							newShape.style.setProperty("stroke-opacity","1");
							newShape.style.setProperty("fill-opacity","0.7");
						}else
						if ( szFlag.match(/RANDOM/) ){
							newShape.style.setProperty("stroke-opacity",String(this.nOpacity?this.nOpacity:1),"");
							newShape.style.setProperty("fill-opacity",String(this.fillOpacity?this.fillOpacity:(this.nOpacity?this.nOpacity:1)),"");
							if (szFlag.match(/DOPACITY/)){
								var nPow = 1/(this.nDopacityPow||1);
								var nOpacity = Math.pow((nValue),nPow)/Math.pow(this.sortedMax,nPow)*(this.nOpacity||1)*(this.nDopacityScale||1);
								newShape.style.setProperty("fill-opacity",String(nOpacity),"");
							}
						}else
						if ( szFlag.match(/SORT/) && szFlag.match(/DOPACITY/) ){
							newShape.style.setProperty("stroke-opacity",String(this.nOpacity?this.nOpacity:1),"");
							var nPow = 1/(this.nDopacityPow||1);
							var nOpacity = Math.pow((nValue),nPow)/Math.pow(this.sortedMax,nPow)*(this.nOpacity||1)*(this.nDopacityScale||1);
							newShape.style.setProperty("fill-opacity",String(nOpacity),"");
							//newShape.style.setProperty("fill-opacity",String((this.nOpacity?this.nOpacity:1)*Math.pow(nValue,2)/Math.pow(this.sortedMax,2)),"");
						}else
						if ( szFlag.match(/DOPACITY/) && this.szAlphaField ){
							if ( a && (typeof(this.itemA[a].nAlpha) != "undefined") ){
								var nPow = 1/(this.nDopacityPow||1);
								var nOpacity = (this.nDopacityScale||1)/Math.pow(this.nMaxAlpha,nPow)*Math.pow(this.itemA[a].nAlpha,nPow);
								newShape.style.setProperty("fill-opacity",String(nOpacity),"");
							}
						}else
						if ( szFlag.match(/DOPACITY/) ){
							var nPow = 1/(this.nDopacityPow||1);
							//var nOpacity = (this.nDopacityScale||1)/Math.pow(nMaxValue,nPow)*Math.pow(nValue,nPow);
							var nOpacity = Math.pow((nValue-this.nMin),nPow)/Math.pow((this.nMax-this.nMin),nPow)*(this.fillOpacity||1)*(this.nDopacityScale||1);
							newShape.style.setProperty("fill-opacity",String(nOpacity),"");
						}else{
							newShape.style.setProperty("fill-opacity",String(this.fillOpacity?this.fillOpacity:(this.nOpacity?this.nOpacity:1)),"");
						}

						if ( this.chartGroup ){
							this.chartGroup.style.setProperty("opacity",String(1),"");
						}

						// set tooltip
						// -----------
						if ( (szFlag.match(/ZOOM/)||szFlag.match(/NORMSIZE/)) && this.szLabelA ){
							var szValue = this.formatValue(tValue,2);
							var szTooltip =  szValue + this.szUnit;
							szTooltip += " - " + this.szLabelA[nIndex%(this.nGridX||10000000)];
							if ( this.szXaxisA && this.szXaxisA.length ){
								szTooltip += " (" + this.szXaxisA[Math.floor(nIndex/(this.nGridX||1))] +")";
							}
							newShape.setAttributeNS(szMapNs,"tooltip",szTooltip);
						}else{
							var szValue = this.formatValue(tValue,2);
							var szTooltip = " " + szValue + this.szUnit;
							newShape.setAttributeNS(szMapNs,"tooltip",szTooltip);
						}
					}

				}else
				if ( szFlag.match(/MULTIPLE/) && !szFlag.match(/NORMSIZE/) && !szFlag.match(/MENUSIZE/)){
					newShape = map.Dom.newGroup(shapeGroup,shapeGroup.getAttributeNS(null,"id")+":multiple");
					for ( var z=0; z<nValue; z++ ){
						var newSymbol  = map.Dom.constructNode('use',newShape,{'xlink:href':'#'+szSymbol+":antizoomandpan"});
						// GR 09.02.2011 workaround to get an event on 'use' elements
						newSymbol.fu.setPosition(z*(nMaxRadius+map.Scale.normalX(1)),0);
						newSymbol.fu.scale(1,1);
						newSymbol.setAttributeNS(null,"style","fill:"+szColor+";stroke:"+szLineColor);
						map.Dom.newShape('circle',newShape,z*nMaxRadius,0,nRadius*0.5,"fill:white;stroke:none;opacity:0");
					}
				}else{
					newShape  = map.Dom.constructNode('use',shapeGroup,{'xlink:href':'#'+szSymbol+":antizoomandpan"});
					// GR 09.02.2011 workaround to get an event on 'use' elements
					map.Dom.newShape('circle',shapeGroup,0,0,nRadius*0.5,"fill:white;stroke:none;opacity:0");
					newShape.fu.scale(nRadius/nMaxRadius,nRadius/nMaxRadius);
					newShape.setAttributeNS(null,"style","fill:"+szColor+";stroke:"+szLineColor);
				}
				
				if ( newShape && szFlag.match(/VALUES/) && (!this.fHideValues || szFlag.match(/ZOOM/)) ){
					var newText = null;

					var szText = this.formatValue(tValue,this.szValueDecimals||"")+(this.szUnit.length<=5?this.szUnit:"");

					// GR 21.09.2016 valuate 'biggest' text of theme to decide font-size
					var szMaxText = this.formatValue(nAllMaxValue,this.szValueDecimals||"")+(this.szUnit.length<=5?this.szUnit:"");
					
					var cColor = __maptheme_getChartColors(szColor);
					var szTextColor = this.szTextColor || cColor.textColor;
					var nFontSize = String(Math.min(nRadius*0.5,nRadius*(((szSymbol == "hexagon")?2.7:3.2)/szMaxText.length)));
					if ( szFlag.match(/ZOOM/) && szFlag.match(/LINES/) && ( (this.nGridX == null) || (this.nGridX <= 1) || (szFlag.match(/STACKED/)) ) ){ 
						szTextColor = "black";
						if ( !shapeOnTopGroup ){
							shapeOnTopGroup = map.Dom.newGroup(chartGroup,this.szId+":"+a+":chartontop");
						}
						nFontSize = 4+(0.5*nPartsA.length/(this.nGridX?(this.nGridX*2):1));

						newText = this.createTextLabel(SVGDocument,shapeOnTopGroup,"",szText,nFontSize,"" ,cColor.lowColor, "white" );
						newText.setAttributeNS(null,"opacity","0.5");
						//newText  = map.Dom.newText(shapeOnTopGroup,0,-nRadius,"font-family:arial;font-size:"+map.Scale.normalX(nFontSize)+"px;fill:"+cColor.lowColor+";stroke:none;pointer-events:none",szText);
					}else
					if ( szFlag.match(/ZOOM/) && !szFlag.match(/SEQUENCE/) ){ // && (nFontSize<map.Scale.normalX(6)) ){
						szTextColor = "black";
						newText  = map.Dom.newText(shapeGroup,nRadius*0.5+nMaxRadius*0.2,-nRadius/2,this.szValuesTextStyle,szText);
						//newText  = map.Dom.newText(shapeGroup,-nRadius*0.5-nMaxRadius*0.2,-nRadius*1-map.Scale.normalY(nFontSize*1.2),this.szValuesTextStyle,szText);
					}else{
						if ( szSymbol == "circle" || szSymbol == "square" || szSymbol == "triangle" || szSymbol == "hexagon" || szSymbol == "label"|| szSymbol == "empty" ){
							if ( szFlag.match(/CENTER/) || szFlag.match(/TOP/) || szFlag.match(/BOTTOM/) ){
								if ( nValue ){
									var nTextSize = 6;
									if ( 0 && szFlag.match(/ZOOM/) ){
										var xPos = (i==nPartsA.length-1)?0:(nRadius*0.66);
										var yPos = (i==nPartsA.length-1)?(map.Scale.normalX(2)):(-nRadius*0.5+map.Scale.normalX(2));
										newText  = map.Dom.newText(shapeGroup,xPos,yPos,"font-family:arial;font-size:"+map.Scale.normalX(6)+"px;text-anchor:middle;fill:"+cColor.lowColor+";stroke:none;pointer-events:none",szText);
										}
									else {
										this.szChartFlag += "|VALUEBACKGROUND";
										if ( !shapeOnTopGroup ){
											shapeOnTopGroup = map.Dom.newGroup(chartGroup,this.szId+":"+a+":chartontop");
										}
										nStarRadius = nStarRadius?nStarRadius:nRadius;
										var xPos = -map.Scale.normalX(1); //StarRadius*0.33;
										var yPos = -map.Scale.normalX(nTextSize*1.33)*(nNonZeroValues-nNonZeroValuesDone-1); //(i==nPartsA.length-1)?(map.Scale.normalX(2)):(-nRadius*0.5+map.Scale.normalX(2));
										newText = this.createTextLabel(SVGDocument,shapeOnTopGroup,"",szText,nTextSize,"",szColor);
										newText.fu.setPosition(xPos,yPos);
										if ( a && (szFlag.match(/ZOOM/)||szFlag.match(/NORMSIZE/)) && this.szLabelA ) {
											var tWidth = newText.fu.getBox().width;
											newText  = map.Dom.newText(shapeOnTopGroup,0,0,this.szValuesTextStyle+";color:#000;",this.szLabelA[nIndex]);
											newText.fu.setPosition(xPos+tWidth+map.Scale.normalX(6),yPos-map.Scale.normalX(-1));
											newText.fu.scale(0.6,0.6);
										}
										newText.setAttributeNS(szMapNs,"class",String(nClass%(this.nGridX||1000000)));
										newText = null; // important , see below
										nNonZeroValuesDone++;
									}
								}
							}else{
								if ( 0 && szFlag.match(/ZOOM/)){
									newText  = map.Dom.newText(shapeGroup,0,nFontSize*0.33,"font-family:arial;font-size:"+nFontSize+"px;text-anchor:middle;fill:"+cColor.lowColor+";stroke:none;pointer-events:none",szText);
								}else{
									newText  = map.Dom.newText(shapeGroup,0,nFontSize*0.33,"font-family:arial;font-size:"+nFontSize+"px;text-anchor:middle;fill:"+szTextColor+";stroke:none;pointer-events:none",szText);
								}
							}
						}else{
							nFontSize = String(Math.min(nRadius*0.8,nRadius/2));
							nFontSize = Math.max(nFontSize,1);
							newText  = this.createTextLabel(SVGDocument,shapeGroup,"",szText,nFontSize/map.Scale.normalX(1),"",szColor);
							newText.fu.setPosition(map.Scale.normalX(0)+nSymbolOffsetX,map.Scale.normalY(0)+nSymbolOffsetY);
						}
					}
				}
				if ( newShape ){
					// GR 17.08.2015 make class attribute for multiple symbols (sequenze) to mark class
					newShape.setAttributeNS(szMapNs,"class",String(nClass%(this.nGridX||1000000)));

					if ( newText ){
						newText.setAttributeNS(szMapNs,"class",String(nClass%(this.nGridX||1000000)));
					}
					if ( newShapeBg ){
						newShapeBg.setAttributeNS(szMapNs,"class",String(nClass%(this.nGridX||1000000)));
					}

					if (!szFlag.match(/CENTER/)){
						// position STAR, RANDOM, HORZ, ...
						// --------------------------------
						if (szFlag.match(/STAR/)){
							if ( i == 0 ){
								// STAR, on first element make star (inner) radius
								topShape = newShape;
								topText  = newText;
								nStarRadius = nRadius;
								if ( szFlag.match(/EXPAND/) && szFlag.match(/SORT/) && szFlag.match(/UP/) ){
									if ( szFlag.match(/LINEAR/) ){
										nStarRadius = (szFlag.match(/EXPANDMAX/)?2:0.5)*nMaxRadius/nMaxValue*this.sortedIndex[nPartsA.length-1].value;
									}else{
										nStarRadius = (szFlag.match(/EXPANDMAX/)?2:0.5)* nMaxRadius / Math.sqrt(nMaxValue) * Math.sqrt(this.sortedIndex[nPartsA.length-1].value);
									}
								}
								if ( szFlag.match(/ZOOM/) && szFlag.match(/STAR/) && szFlag.match(/UP/) ){
									nStarRadius *= 2; 
								}else
								if ( szFlag.match(/COMPRESS/) ){
									nStarRadius *= (szFlag.match(/COMPRESSMAX/)?0.25:0.5);
								}
							}
							if ( ((i > 0) || szFlag.match(/UP/)) && nRadius ) {
								var nStarParts = (this.nClipParts && (this.nClipParts<this.partsA.length))?this.nClipParts:this.partsA.length;

								// GR 02.06.2014 calc angles from radius an fit circles
								// used c*c = a*a + b*b, h = a*b/c, alpha = arcsin(h/a)

								// 1. calc angle by radius of satellite circle
								var _a = nRadius;
								var	_c = nStarRadius+nRadius;
								var _b = Math.sqrt(Math.pow(_c,2)-Math.pow(_a,2));
								var _h = (_a)*_b/(_c);
								var _f = 90 - Math.asin(_h/_a)/Math.PI*180;

								// 2. define radius for satellite circle and squeeze satellites if many
								var _r = nStarRadius+nRadius;
								if ( szFlag.match(/UP/) ){
									if ( i>5 ){
										_f /= (1+2*(nRadius/nMaxRadius));
									}
									_r = nStarRadius*(1+nStarParts/5);
								}

								if ( !szFlag.match(/ZOOM/) ){
									if ( this.nRangeScale ){
										_r *= this.nRangeScale;
									}else{
										_r = (szFlag.match(/EXPANDMAX/)?_r*2:(szFlag.match(/EXPAND/)?_r*1.5:_r));
									}
								}

								// 3. get position by angle and radius
								this.initAngle += _f;
								nSymbolOffsetX = Math.cos( this.initAngle/180*Math.PI ) * (_r); 
								nSymbolOffsetY = Math.sin( this.initAngle/180*Math.PI ) * (_r); 
								this.initAngle += _f;

								newShape.fu.setPosition(map.Scale.normalX(0)+nSymbolOffsetX,map.Scale.normalY(0)+nSymbolOffsetY);
								if ( newShapeBg ){
									newShapeBg.fu.setPosition(map.Scale.normalX(0)+nSymbolOffsetX,map.Scale.normalY(0)+nSymbolOffsetY);
								}
								if ( newText ){
									newText.fu.setPosition(map.Scale.normalX(0)+nSymbolOffsetX,map.Scale.normalY(0)+nSymbolOffsetY);
								}
							}
						}else
						if (szFlag.match(/RANDOM/)){

							var dRadius = (szFlag.match(/EXPANDMAX/)?nRadius*2:(szFlag.match(/EXPAND/)?nRadius*1.5:nRadius));
							if ( szFlag.match(/ZOOM/) ){
								nMaxRadius *= 2;
								dRadius *= 2; 
							}
							nSymbolOffsetX = Math.cos( this.initAngle + (360/(this.partsA.length)*(i)) /180*Math.PI ) * Math.min(nMaxRadius,(dRadius)); 
							nSymbolOffsetY = Math.sin( this.initAngle + (360/(this.partsA.length)*(i)) /180*Math.PI ) * Math.min(nMaxRadius,(dRadius)); 
							newShape.fu.setPosition(map.Scale.normalX(0)+nSymbolOffsetX,map.Scale.normalY(0)+nSymbolOffsetY);
							if ( newShapeBg ){
								newShapeBg.fu.setPosition(map.Scale.normalX(0)+nSymbolOffsetX,map.Scale.normalY(0)+nSymbolOffsetY);
							}
							if ( newText ){
								newText.fu.setPosition(map.Scale.normalX(0)+nSymbolOffsetX,map.Scale.normalY(0)+nSymbolOffsetY);
							}
						}else
						if (szFlag.match(/HORZ/)){

							nSymbolOffsetX += nRadius;
							newShape.fu.setPosition(map.Scale.normalX(0)+nSymbolOffsetX,map.Scale.normalY(0)+nSymbolOffsetY);
							if ( newShapeBg ){
								newShapeBg.fu.setPosition(map.Scale.normalX(0)+nSymbolOffsetX,map.Scale.normalY(0)+nSymbolOffsetY);
							}
							if ( newText ){
								newText.fu.setPosition(map.Scale.normalX(0)+nSymbolOffsetX,map.Scale.normalY(0)+nSymbolOffsetY);
							}
							nSymbolOffsetX += nRadius;
						}else
						if (szFlag.match(/BOTTOM/)){

							newShape.fu.setPosition(map.Scale.normalX(0),-nRadius);
							if ( newShapeBg ){
								newShapeBg.fu.setPosition(map.Scale.normalX(0),-nRadius);
							}
							if ( newText ){
								newText.fu.setPosition(map.Scale.normalX(0),-nRadius);
							}
						}else
						if (szFlag.match(/TOP/)){

							newShape.fu.setPosition(-nRadius*0.3,nRadius*0.7-nMaxRadius);
							if ( newShapeBg ){
								newShapeBg.fu.setPosition(-nRadius*0.3,nRadius*0.7-nMaxRadius);
							}
							if ( newText ){
								newText.fu.setPosition(-nRadius*0.3,nRadius*0.7-nMaxRadius);
							}
						}else
						if (szFlag.match(/CONE/)){

							newShape.fu.setPosition(map.Scale.normalY(i*0.33),-map.Scale.normalY(i*1));
							if ( newShapeBg ){
								newShapeBg.fu.setPosition(map.Scale.normalY(i*0.33),-map.Scale.normalY(i*1));
							}
							if ( newText ){
								newText.fu.setPosition(map.Scale.normalY(i*0.33),-map.Scale.normalY(i*1));
							}
						}else
						if (szFlag.match(/BASE/)){

							newShape.fu.setPosition(map.Scale.normalX(0),nSymbolOffsetY-nRadius);
							if ( newShapeBg ){
								newShapeBg.fu.setPosition(map.Scale.normalX(0),nSymbolOffsetY-nRadius);
							}
							if ( newText ){
								newText.fu.setPosition(map.Scale.normalX(0),nSymbolOffsetY-nRadius);
							}
							nSymbolOffsetY -= nRadius*(szFlag.match(/VALUES/)?1.25:1);
						}else
						if (szFlag.match(/PLOT/)){

							// ---------------------------------------------------------------------------------------	
							// PLOT 
							// special case of multi symbol charts
							//
							// in fact, bubble, line and area charts are derivants from SYMBOL charts ! 
							// ---------------------------------------------------------------------------------------	

							if ( (nValue == 0) && !szFlag.match(/STACKED/) ){
								newShape.parentNode.removeChild(newShape);
								if ( newShapeBg ){
									newShapeBg.parentNode.removeChild(newShapeBg);
								}
								if ( newText ){
									newText.parentNode.removeChild(newText);
								}
								//continue;
							}

							var nStep = map.Scale.normalX(nChartSize)*(szFlag.match(/LINES/)?1:(2/3));

							var nAxis = i*nStep;
							if ( this.nGridX ){
								if (szFlag.match(/PLOTVAR/)){
									nAxis = Math.floor(i%this.nGridX)*nStep;
								}else{
									nAxis = Math.floor(i/this.nGridX)*nStep;
								}
							}

							var nMaxValue = this.nMaxValue || (nAllMaxValue || this.nMax);
							var nMinValue = this.nMinValue || Math.min(this.nMin,nAllMinValue);
							var nScale = map.Scale.normalX(nChartSize)/(nMaxValue-nMinValue)*(szFlag.match(/ZOOM/)?5:5)*(this.nRangeScale||1);

							if ( !shapeOnTopGroup ){
								shapeOnTopGroup = map.Dom.newGroup(chartGroup,this.szId+":"+a+":chartontop");
							}

							if ( szFlag.match(/AREA/) ){
								var gridGroup = map.Dom.newGroup(shapeOnTopGroup,"");
							}else{
								var gridGroup = map.Dom.newGroup(shapeGroup,"");
								gridGroup.parentNode.insertBefore( gridGroup, gridGroup.parentNode.firstChild);
							}

							topGroup = map.Dom.newGroup(shapeOnTopGroup,"");

							if (szFlag.match(/PLOTYX/)){
								newShape.fu.setPosition((nMaxValue+Math.abs(nMaxValue-nValue))*nScale,nAxis);
								if ( newShapeBg ){
									newShapeBg.fu.setPosition((nMaxValue+Math.abs(nMaxValue-nValue))*nScale,nAxis);
								}
								if ( newText ){
									newText.fu.setPosition((nMaxValue+Math.abs(nMaxValue-nValue))*nScale,nAxis);
								}
							}else
							if (szFlag.match(/PLOTY/)){
								newShape.fu.setPosition(0,(-nMaxValue+Math.abs(nMaxValue-nValue))*nScale);
								if ( newShapeBg ){
									newShapeBg.fu.setPosition(0,(-nMaxValue+Math.abs(nMaxValue-nValue))*nScale);
								}
								if ( newText ){
									newText.fu.setPosition(0,(-nMaxValue+Math.abs(nMaxValue-nValue))*nScale);
								}
								var nYStep = 1;
								nYStep = nMaxValue / 5;
								nYStep = (Math.ceil(nYStep/(Math.floor(Math.log(nYStep))*10))*(Math.floor(Math.log(nYStep))*10))||1;
								nMaxValue = Math.ceil(nMaxValue/nYStep)*nYStep;
								if ( !fPlotInit ){
									fPlotInit = true;
									if ( szFlag.match(/BOX/) && szFlag.match(/GRID/) ){
										for ( var s=map.Scale.normalX(nChartSize)/2; s<nMaxValue*nScale; s+=nScale*nYStep ){
											map.Dom.newShape('line',gridGroup,-20,-s,20,-s,"stroke:#444444;stroke-width:"+map.Scale.normalX(1)+";");
										}
									}
								}
							}else
							if (szFlag.match(/PLOTX/)){
								newShape.fu.setPosition((nMaxValue-Math.abs(nMaxValue-nValue))*nScale,0);
								if ( newShapeBg ){
									newShapeBg.fu.setPosition((nMaxValue-Math.abs(nMaxValue-nValue))*nScale,0);
								}
								if ( newText ){
									newText.fu.setPosition((nMaxValue-Math.abs(nMaxValue-nValue))*nScale,0);
								}
								var nYStep = 1;
								nYStep = nMaxValue / 5;
								nYStep = (Math.ceil(nYStep/(Math.floor(Math.log(nYStep))*10))*(Math.floor(Math.log(nYStep))*10))||1;
								nMaxValue = Math.ceil(nMaxValue/nYStep)*nYStep;
								if ( !fPlotInit ){
									fPlotInit = true;
									if ( szFlag.match(/BOX/) && szFlag.match(/GRID/) ){
										for ( var s=map.Scale.normalX(nChartSize); s<nMaxValue*nScale+map.Scale.normalX(nChartSize); s+=nScale*nYStep ){
											map.Dom.newShape('line',gridGroup,s,-20,s,20,"stroke:#444444;stroke-width:"+map.Scale.normalX(1)+";");
										}
									}
								}
							}else{
								var nYStep = 1;
								nYStep = Math.ceil(nMaxValue-nMinValue) / 5.1;
								if ( nYStep > 1 ){
									nYStep = (Math.ceil(nYStep/(Math.floor(Math.log(nYStep))*10))*(Math.floor(Math.log(nYStep))*10))||1;
								}
								nMaxValue = Math.ceil(nMaxValue/nYStep)*nYStep;
								nMinValue = Math.floor(nMinValue/nYStep)*nYStep;

								// ---------------------------------------------------------------------------------------	
								// init the plot, if not yet done
								// ---------------------------------------------------------------------------------------	

								if ( !fPlotInit ){
									fPlotInit = true;
									this.plot_last_last_position = [];
									this.plot_last_position = [];
									this.plot_last_value = [];
									this.plot_last_stacked_value = [];
									this.plot_last_shape = [];
									this.plot_last_mean = [];
									this.plot_last_areaValue = [];

									this.plot_area_points = [];
									this.plot_area_shapes = [];

									this.plot_area_shapes[0] = map.Dom.newShape('path',shapeGroup,'M0,0',
											 "fill:"+szColor+";fill-opacity:"+(this.fillOpacity||1)+";stroke:none");

									var nScaleFontSize = map.Scale.normalX(szFlag.match(/ZOOM/)?7:10);

									// make coordinate grid
									// ---------------------------------------------------------------------------------------	
									if ( szFlag.match(/BOX/) && szFlag.match(/GRID/) ){
										var nBgOpacity = 0.8;
										for ( var s=0; s<=(nMaxValue-nMinValue)*nScale; s+=nScale*nYStep ){
											var left = -nStep/(szFlag.match(/LINES/)?3:1);
											var right = nStep*((this.nGridX)?nPartsA.length/this.nGridX-1:nPartsA.length-1);
											if ( szFlag.match(/PLOTVAR/) && (nPartsA.length/this.nGridX > 1)){
												right = nStep*this.nGridX;
											}
											if ( szFlag.match(/GRADIENT/) && (s != 0) ){
												var myRight = right + (szFlag.match(/LINES/)?0:0);
												plotShape = map.Dom.newShape('path',shapeGroup,'M'+(left)+','+(-s)+
																		   ' L '+(myRight)+','+(-s)+' '+
																				 (myRight)+','+(-s+nScale*nYStep)+' '+
																				 (left)+','+(-s+nScale*nYStep)+' z',"fill:#d8d8dd;fill-opacity:"+nBgOpacity+";stroke:none;");
												nBgOpacity -= 0.3;
											}
											map.Dom.newShape('line',gridGroup,left,-s,right,-s,"stroke:#aaaaaa;stroke-width:"+((s==0)?map.Scale.normalX(0.5):map.Scale.normalX(0.2))+";");
											if ( nMaxValue > 5 ){
												map.Dom.newText(gridGroup,left*1.1,-s+nScaleFontSize*0.3,"font-family:arial;font-size:"+nScaleFontSize+"px;text-anchor:end;fill:#888888;stroke:none;pointer-events:none;",String(Math.round(szFlag.match(/INVERT/)?(nMaxValue-s/nScale+nMinValue):(s/nScale+nMinValue))));
											}else{
												map.Dom.newText(gridGroup,left*1.1,-s+nScaleFontSize*0.3,"font-family:arial;font-size:"+nScaleFontSize+"px;text-anchor:end;fill:#888888;stroke:none;pointer-events:none;",this.formatValue(Math.round(szFlag.match(/INVERT/)?(nMaxValue-s/nScale+nMinValue):(s/nScale+nMinValue)*10)/10,1));
											}
											this.nPlotHeight = s;
										}

										map.Dom.newShape('line',gridGroup,nAxis,0,nAxis,-(nMaxValue-nMinValue)*nScale,"stroke:#aaaaaa;stroke-width:"+(map.Scale.normalX(0.1))+";");

										if ( this.szXaxisA && this.szXaxisA.length ){
											for ( var s=0; s<this.szXaxisA.length; s++ ){
												map.Dom.newShape('line',gridGroup,nStep*s,100,nStep*s,-(nMaxValue-nMinValue)*nScale,"stroke:#444444;stroke-width:"+(map.Scale.normalX(0.5))+";stroke-dasharray:20 80;");
												map.Dom.newText(gridGroup,nStep*s,250,"font-family:arial;font-size:"+nScaleFontSize+"px;text-anchor:middle;fill:#888888;stroke:none;pointer-events:none;",this.szXaxisA[s]);
											}
										}
										if (0){
										if ( this.szXaxisA && this.szXaxisA.length ){
											for ( var s=0; s<this.szXaxisA.length; s++ ){
												map.Dom.newText(topGroup,nStep*s,250,"font-family:arial;font-size:"+nScaleFontSize+"px;text-anchor:middle;fill:#888888;stroke:none;pointer-events:none;",this.szXaxisA[s]);
												if ( szFlag.match(/AREA/) && szFlag.match(/GAP/)){
													map.Dom.newShape('line',topGroup,nStep*(s+0.5),0,nStep*(s+0.5),-(nMaxValue-nMinValue)*nScale,"stroke:#ffffff;stroke-width:"+(map.Scale.normalX(1))+";");
												}
											}
										}
										}
									}
								}

								var xi = this.nGridX?(Math.floor(i/this.nGridX)+1):1;
								var yi = this.nGridX?(i%this.nGridX):1;

								var nPValue = (szFlag.match(/INVERT/)?(nMaxValue-nValue):nValue);

								nPValue -= nMinValue;

								nPValue += (szFlag.match(/STACKED/)?(this.plot_last_stacked_value[xi]||0):0);
								newShape.fu.setPosition(nAxis,(-nPValue)*nScale);
								if ( newShapeBg ){
									newShapeBg.fu.setPosition(nAxis,(-nPValue)*nScale);
								}
								if ( newText ){
									if ( szFlag.match(/LINES/) && ( (this.nGridX == null) || (this.nGridX <= 1) || (szFlag.match(/STACKED/)) ) ){ 
										newText.fu.setPosition(nAxis-map.Scale.normalX(nChartSize/4),(-nPValue)*nScale-map.Scale.normalY(nChartSize/4)/(this.nGridX||1));
									}else{
										newText.fu.setPosition(nAxis,(-nPValue)*nScale);
									}
								}

								// ---------------------------------------------------------------------------------------	
								// lines and area charts
								// ---------------------------------------------------------------------------------------	

								if ( szFlag.match(/LINES/) ) {
									var plotShape = null;

									if ( (szFlag.match(/ZEROISVALUE/) && this.plot_last_position[yi] && (nValue || this.plot_last_position[yi].y)) ||
										 (nValue && this.plot_last_position[yi] && this.plot_last_position[yi].y)						     ) {			
										if ( szFlag.match(/AREA/) ) {
											plotShape = map.Dom.newShape('path',shapeGroup,'M'+(this.plot_last_position[yi].x-2)+','+(this.plot_last_position[yi].y)+
																	   ' L '+(nAxis)+','+((-nPValue)*nScale)+' '+
																			 (nAxis)+','+((-nPValue+nValue-nMinValue)*nScale)+' '+
																			 (this.plot_last_position[yi].x-2)+','+
																			 (this.plot_last_last_position[yi-1]?this.plot_last_last_position[yi-1].y:0)+
																			 ' z',
																			 "fill:"+szColor+";fill-opacity:"+(this.fillOpacity||1)+";");
											plotShape.setAttributeNS(szMapNs,"value",String(nValue));
											plotShape.setAttributeNS(szMapNs,"class",String(nClass%(this.nGridX||1000000)));
											plotShape.setAttributeNS(szMapNs,"tooltip",(this.szLabelA?(this.szLabelA[nClass%(this.nGridX||1000000)]+": "):"")+this.formatValue(this.plot_last_areaValue[yi],this.szValueDecimals||2)+this.szUnit+" ... "+this.formatValue(nValue,this.szValueDecimals||2)+this.szUnit);
											plotShape = map.Dom.newShape('line',shapeGroup,this.plot_last_position[yi].x,this.plot_last_position[yi].y,nAxis,(-nPValue)*nScale,"stroke:"+szColor+";stroke-width:"+map.Scale.normalX(szFlag.match(/STACKED/)?1:3)+";");
											plotShape.setAttributeNS(szMapNs,"value",String(nValue));

										}else{
											plotShape = map.Dom.newShape('line',shapeGroup,this.plot_last_position[yi].x,this.plot_last_position[yi].y,nAxis,(-nPValue)*nScale,"stroke:"+szColor+";stroke-width:"+map.Scale.normalX(3)+";stroke-linecap:round;");
											plotShape.setAttributeNS(szMapNs,"value",String(nValue));
											plotShape.setAttributeNS(szMapNs,"class",String(nClass%(this.nGridX||1000000)));
											try	{
												shapeGroup.insertBefore(plotShape,this.plot_last_shape[yi]);
											} catch (e) {}
										}
									}
									if ( szFlag.match(/PLOTVAR/) ) {
										var nMean = szFlag.match(/MEDIAN/)?this.nMedianA[nIndex]:this.nMeanA[nIndex];
										nMean -= nMinValue;
										if ( this.plot_last_mean[yi] ){
											plotShape = map.Dom.newShape('path',gridGroup,'M'+(this.plot_last_mean[yi].x)+','+(this.plot_last_mean[yi].y-this.nDeviationA[nIndex-1]*nScale)+
																	   ' L '+(nAxis)+','+((-nMean-this.nDeviationA[nIndex])*nScale)+' '+
																			 (nAxis)+','+((-nMean+this.nDeviationA[nIndex])*nScale)+' '+
																			 (this.plot_last_mean[yi].x)+','+(this.plot_last_mean[yi].y+this.nDeviationA[nIndex-1]*nScale)+' z',"fill:#d8d8dd;fill-opacity:0.2;stroke:none;");
											plotShape.setAttributeNS(szMapNs,"tooltip","standard deviation");
											plotShape = map.Dom.newShape('line',shapeGroup,this.plot_last_mean[yi].x,this.plot_last_mean[yi].y,nAxis,(-nMean)*nScale,"stroke:#888888;stroke-width:"+map.Scale.normalX(2)+";stroke-linecap:round;stroke-dasharray:10 80;");
											plotShape.setAttributeNS(szMapNs,"tooltip","mean");
											if(0){
											plotShape = map.Dom.newShape('line',shapeGroup,this.plot_last_mean[yi].x,this.plot_last_mean[yi].y-this.nDeviationA[nIndex-1]*nScale,nAxis,(-nMean-this.nDeviationA[nIndex])*nScale,"stroke:#ffffff;stroke-opacity:0.5;stroke-width:"+map.Scale.normalX(1)+";stroke-linecap:round;stroke-dasharray:10 80;");
											plotShape.setAttributeNS(szMapNs,"tooltip","standard deviation");
											plotShape = map.Dom.newShape('line',shapeGroup,this.plot_last_mean[yi].x,this.plot_last_mean[yi].y+this.nDeviationA[nIndex-1]*nScale,nAxis,(-nMean+this.nDeviationA[nIndex])*nScale,"stroke:#ffffff;stroke-opacity:0.5;stroke-width:"+map.Scale.normalX(1)+";stroke-linecap:round;stroke-dasharray:10 80;");
											plotShape.setAttributeNS(szMapNs,"tooltip","standard deviation");
											}
										}
										this.plot_last_mean[yi] = new point(nAxis,(-nMean)*nScale);
									}
									this.plot_last_last_position[yi] = szFlag.match(/STACKED/)?(this.plot_last_position[yi]||new point(0,0)):new point(0,0);
									this.plot_last_position[yi] = (nPValue>=0)?new point(nAxis,(-nPValue)*nScale):new point(nAxis,0);
									this.plot_last_shape[yi] = newShape;
									this.plot_last_areaValue[yi] = nValue;

									this.plot_area_points.push(new point(nAxis,((-nPValue)*nScale)));

								}
								else
								if ( nPartsA.length/this.nGridX > 1 ){

									// plot with more than 1 set of values
									// -----------------------------------
									// bubble, line or area charts with more than one item per x value 
									// es. a line chart with 2 lines
									//
									// the data for every item must be a value array with X x Y values
									//
									// example: 3 curves with 10 values
									// the data array must have 30 values, with the order:    
									// curve1valueA, curve2valueA, curve3valueA, curve1valueB, curve2valueB, curve3valueB, ...
									//
									// and this.nGridX must be 3 !!!
									// ---------------------------------------------------------------------------------------	

									if ( szFlag.match(/PLOTVAR/) ) {
										newShape.style.setProperty("fill-opacity",((xi==(nPartsA.length/this.nGridX))?"1":"0.2"),"");
										newShape.style.setProperty("stroke-width",((xi==(nPartsA.length/this.nGridX))?"0":"3"),"");

										var plotShape = null;
										if ( this.plot_last_position[yi] ){
											if ( szFlag.match(/PLOTVAR/) ) {
												plotShape = map.Dom.newShape('line',shapeGroup,this.plot_last_position[yi].x,this.plot_last_position[yi].y,nAxis,(-nPValue)*nScale,"stroke:"+szColor+";stroke-width:"+map.Scale.normalX(2)+";");
												plotShape.setAttributeNS(szMapNs,"value",String(nValue));
												plotShape.setAttributeNS(szMapNs,"class",String(nClass%(this.nGridX||1000000)));
												plotShape.parentNode.insertBefore(plotShape,plotShape.parentNode.firstChild);

												plotShape = map.Dom.newShape('line',shapeGroup,this.plot_last_position[yi].x-40,this.plot_last_position[yi].y,this.plot_last_position[yi].x+40,this.plot_last_position[yi].y,"stroke:"+szColor+";stroke-width:"+map.Scale.normalX(3)+";");
												plotShape.setAttributeNS(szMapNs,"value",String(nValue));
												plotShape.setAttributeNS(szMapNs,"class",String(nClass%(this.nGridX||1000000)));
												plotShape.parentNode.insertBefore(plotShape,plotShape.parentNode.firstChild);

												plotShape = map.Dom.newShape('line',shapeGroup,nAxis,0,nAxis,-this.nPlotHeight,"stroke:#dddddd;stroke-width:"+map.Scale.normalX(0.25)+";");
												plotShape.setAttributeNS(szMapNs,"value",String(nValue));
												plotShape.setAttributeNS(szMapNs,"class",String(nClass%(this.nGridX||1000000)));
												plotShape.parentNode.insertBefore(plotShape,plotShape.parentNode.firstChild);
											}else{
												plotShape = map.Dom.newShape('line',shapeGroup,this.plot_last_position[yi].x,this.plot_last_position[yi].y,nAxis,(-nPValue)*nScale,"stroke:"+szColor+";stroke-width:"+map.Scale.normalX(3)+";");
												plotShape.setAttributeNS(szMapNs,"value",String(nValue));
												plotShape.setAttributeNS(szMapNs,"class",String(nClass%(this.nGridX||1000000)));
												shapeGroup.insertBefore(plotShape,this.plot_last_shape[yi]);
											}
										}
										this.plot_last_last_position[yi] = this.plot_last_position[yi]||new point(0,0);
										this.plot_last_position[yi] = new point(nAxis,(-nPValue)*nScale);
										this.plot_last_shape[yi] = newShape;
									}else if ( szFlag.match(/BOX/) ){
										map.Dom.newShape('line',gridGroup,nAxis,0,nAxis,-this.nPlotHeight,"stroke:#dddddd;stroke-width:"+map.Scale.normalX(0.25)+";");
									}
								}else{
									
									// 'normal' plot
									// -------------

									if ( szFlag.match(/PLOTVAR/) ) {

										// show standard deviation
										//
										var plotShape = null;
										var nMean = szFlag.match(/MEDIAN/)?this.nMedianA[nIndex]:this.nMeanA[nIndex];
										nMean -= nMinValue;

										plotShape = map.Dom.newShape('line',gridGroup,nAxis,-(nMean-this.nDeviationA[nIndex])*nScale,nAxis,-(nMean+this.nDeviationA[nIndex])*nScale,"stroke:"+"#aaaaaa"+";stroke-width:"+map.Scale.normalX(1)+";");
										plotShape.setAttributeNS(szMapNs,"value",String(nValue));
										plotShape.setAttributeNS(szMapNs,"class",String(nClass%(this.nGridX||1000000)));

										plotShape = map.Dom.newShape('line',gridGroup,nAxis-40,-(nMean)*nScale,nAxis+40,-(nMean)*nScale,"stroke:"+"#aaaaaa"+";stroke-width:"+map.Scale.normalX(2)+";");
										plotShape.setAttributeNS(szMapNs,"value",String(nValue));
										plotShape.setAttributeNS(szMapNs,"class",String(nClass%(this.nGridX||1000000)));

										plotShape = map.Dom.newShape('line',gridGroup,nAxis-80,-(nMean-this.nDeviationA[nIndex])*nScale,nAxis+80,-(nMean-this.nDeviationA[nIndex])*nScale,"stroke:"+"#aaaaaa"+";stroke-width:"+map.Scale.normalX(1)+";");
										plotShape.setAttributeNS(szMapNs,"value",String(nValue));
										plotShape.setAttributeNS(szMapNs,"class",String(nClass%(this.nGridX||1000000)));
										plotShape = map.Dom.newShape('line',gridGroup,nAxis-80,-(nMean+this.nDeviationA[nIndex])*nScale,nAxis+80,-(nMean+this.nDeviationA[nIndex])*nScale,"stroke:"+"#aaaaaa"+";stroke-width:"+map.Scale.normalX(1)+";");
										plotShape.setAttributeNS(szMapNs,"value",String(nValue));
										plotShape.setAttributeNS(szMapNs,"class",String(nClass%(this.nGridX||1000000)));

										map.Dom.newShape('line',gridGroup,nAxis,0,nAxis,-this.nPlotHeight,"stroke:#dddddd;stroke-width:"+map.Scale.normalX(0.25)+";");
										if ( this.plot_last_position[yi] ){
											plotShape = map.Dom.newShape('line',gridGroup,this.plot_last_position[yi].x,this.plot_last_position[yi].y,nAxis,(-nMean)*nScale,"stroke:#888888;stroke-width:"+map.Scale.normalX(1)+";");
										}
									
										this.plot_last_last_position[yi] = this.plot_last_position[yi]||new point(0,0);
										this.plot_last_position[yi] = new point(nAxis,(-nMean)*nScale);
									
									}else if ( szFlag.match(/BOX/) ){
										map.Dom.newShape('line',gridGroup,nAxis,0,nAxis,-this.nPlotHeight,"stroke:#dddddd;stroke-width:"+map.Scale.normalX(0.25)+";");
									}
								}

								this.plot_last_value[xi] = nValue;
								this.plot_last_stacked_value[xi] = nPValue;
							}
							nSymbolOffsetY = 0;

						}else{

							if ( szSymbol == "label" ){
								nSymbolOffsetY -= nFontSize*1.2;
							}
							newShape.fu.setPosition(map.Scale.normalX(0)+nSymbolOffsetX,map.Scale.normalY(0)+nSymbolOffsetY);
							if ( newShapeBg ){
								newShapeBg.fu.setPosition(map.Scale.normalX(0)+nSymbolOffsetX,map.Scale.normalY(0)+nSymbolOffsetY);
							}
							if ( newText ){
								newText.fu.setPosition(nSymbolOffsetX,map.Scale.normalY(0)+nSymbolOffsetY);
							}
							if ( szSymbol == "label" ){
								nSymbolOffsetY -= nFontSize*0.33;
							}else{
								nSymbolOffsetY -= nRadius;
							}
						}
					}
				}
			}
		}
		// if we have values, move to top
		if (shapeTextGroup ){
			shapeTextGroup.parentNode.appendChild(shapeTextGroup);
		}
		// if we have one shape of a sequence defined as top, move it there
		if ( topShape ){
			topShape.parentNode.appendChild(topShape);
		}
		// also the text !
		if ( topText ){
			topText.parentNode.appendChild(topText);
		}
		// also lines on top of the chart !
		if ( topGroup ){
			 topGroup.parentNode.appendChild(topGroup);
		}

		// for single color area chart, redraw continous polygon to avoid 'ugly' vertical lines  
		if ( 0 & szFlag.match(/AREA/) && !this.nGridX && this.plot_area_points && this.plot_area_points.length ){
			var fdo = true;
			var np = this.plot_area_points.length;
			for ( var p=0; p<np; p++ ){
				if ( this.plot_area_points[p].y == 0 ){
					fdo = false;
				}
			}
			if ( fdo || szFlag.match(/ZEROISVALUE/) ){
				var d = "M"+(this.plot_area_points[0].x)+','+(this.plot_area_points[0].y)+" L ";
				for ( var p=1; p<np; p++ ){
					d += (this.plot_area_points[p].x)+','+(this.plot_area_points[p].y)+" ";
				}
				d += (this.plot_area_points[np-1].x)+','+(0)+" ";
				d += (0)+','+(0)+" ";
				d += "z ";
				this.plot_area_shapes[0].setAttributeNS(null,"d",d);
			}
		}

		// set frame size
		if ( typeof(this.szSymbolBoxStyle) != 'undefined' ) {
			var bBox = map.Dom.getBox(shapeGroup);
			newFrame.setAttributeNS(null,"x",-map.Scale.normalX(15));
			newFrame.setAttributeNS(null,"y",-map.Scale.normalY(15));
			newFrame.setAttributeNS(null,"width",map.Scale.normalX(30*nSymbols));
			newFrame.setAttributeNS(null,"height",map.Scale.normalY(30));
			newFrame.setAttributeNS(null,"fill-opacity",1.0);
		}

		ptNull.x = map.Scale.normalY(0);
		ptNull.y = map.Scale.normalY((szFlag.match(/ZOOM/)||szFlag.match(/MENUSIZE/))?20:0);
	}

	// == BUFFER ==============================================================================

	else if ( szFlag.match(/BUFFER/) ){
		var nMaxValue  = this.nMaxA[0];
		var nValue	   = nPartsA[0];
		var nRadius    = this.nBufferSize?this.nBufferSize:1000;
		// line buffer cannot be scaled, so we must apply scale on redraw
		if ( this.szShapeType.match(/line/) ){
			nRadius *= this.nScale;
		}

		nRadius = map.Scale.getDeltaXofDistanceInMeter(nRadius);
		var szColor		= this.colorScheme[0];

		if ( this.szFields && this.szFields.length && this.nRangesA && this.nRangesA.length ){
			szColor = null;
			var i;
			if ( this.nRangesA.length == this.colorScheme.length ){
				for ( i=0; i<this.nRangesA.length; i++ ){
					if ((nValue == this.nRangesA[i]) || (Number(nValue) == Number(this.nRangesA[i])) ){
						szColor = this.colorScheme[i];
						var cColor = __maptheme_getChartColors(szColor);
						if ( typeof(this.szBorderColor) != 'undefined' ) {
							szLineColor = this.szBorderColor;
						}
						else{
							szLineColor = (this.fillOpacity < 0.8)?"#888888":cColor.textColor;
						}
						break;
					}
				}
			}
		}
		if ( this.szShapeType.match(/point/) ){
			// circle buffer	
			if ( szColor ){
				nChartSize = nRadius*2/map.Scale.normalX(1);
				ptNull.x = 0;
				ptNull.y = nRadius+map.Scale.normalY(5);
				var nFillOpacity = 1;
				nFillOpacity = 0.75;
				if ( this.szFlag.match(/OVERLAY/) || (this.fillOpacity == 0) ){
					nFillOpacity = this.fillOpacity?this.fillOpacity:(this.nOpacity?this.nOpacity:0);
				}
				nFillOpacity = this.fillOpacity?this.fillOpacity:(this.nOpacity?this.nOpacity:0);
				// GR 20.09.2011 style is set in chart group g element
				var newShape = map.Dom.newShape('circle',shapeGroup,0,0,nRadius,"");
				if ( this.szFlag.match(/VALUE/) ){
					var szTextStyle	= "font-family:arial;font-size:"+(map.Scale.normalX(5))+"px;fill:#222222;stroke-dasharray:none;pointer-events:none;";
					var newText = map.Dom.newText(shapeGroup,nRadius-map.Scale.normalX(5),0,szTextStyle,Map.Scale.prototype.formatDistanceString(this.nBufferSize));
				}
				this.nRealizedCount++;
			}
			else {
				return new point(0,0);
			}
		}
		if ( this.szShapeType.match(/line/) ){
			// linear buffer
			var shapeNode = SVGDocument.getElementById(a);
			var szId = shapeNode.getAttributeNS(null,"id");
			if ( !szId.match(":paint") ){
				var cloneShape = SVGDocument.getElementById(szId+":paint");
				if ( !cloneShape ){
					var cloneShape = shapeNode.cloneNode(1000);
					shapeGroup.appendChild(cloneShape);
					cloneShape.setAttributeNS(null,"id",szId+":paint");
				}
				shapeNode = cloneShape;
				this.nRealizedCount++;
			}
			var nStrokeWidth = nRadius*2/map.Scale.normalX(1);
			shapeNode.setAttributeNS(null,"style","fill:none;stroke:"+szColor+";stroke-linejoin:round;stroke-linecap:round;stroke-width:"+map.Scale.normalX(nStrokeWidth)*map.Scale.nZoomScale+";stroke-opacity:"+String(this.fillOpacity?this.fillOpacity:(this.nOpacity?this.nOpacity:0))+"");
			// return null, to disable positioning or scaling
			return null;
		}
	}

	// == BAR CHART =================================================================================

	else if ( szFlag.match(/BAR/) ||szFlag.match(/BARS/) ){
		var nPosX = 0; 
		var nPosY = 0;

		var origChartSize = nChartSize; 
		var nSizer = 1;

		// ----- get nSizer ------------------------------------------------------

		var nHeight = 0;
		var nSize = 1;
		var nRange	  = this.nMax - this.nMin;
		var nRange100 = this.nMax100 - this.nMin100;
		if ( this.nNormalSizeValue ){
			nRange = nRange100 = this.nMaxSize = this.nNormalSizeValue;
		}

		// by sizefield
		//
		if ( szFlag.match(/SIZE/) && !szFlag.match(/NORMSIZE/) && this.szSizeField && a && this.itemA[a] ){
			if ( szFlag.match(/SIZELOG/) ){
				nSizer = 1 / Math.log((this.nMaxSize)) * Math.log(this.itemA[a].nSize);
			}else
			if ( szFlag.match(/SIZEP4/) ){
				nSizer = 1 / Math.pow((this.nMaxSize),1/4) * Math.pow(this.itemA[a].nSize,1/4);
			}else
			if ( szFlag.match(/3D/) || szFlag.match(/SIZEP3/) || szFlag.match(/SIZEVOLUME/) ){
				nSizer = 1 / Math.pow((this.nMaxSize),1/3) * Math.pow(this.itemA[a].nSize,1/3);
			}else{
				nSizer = 1 / Math.sqrt((this.nMaxSize)) * Math.sqrt(this.itemA[a].nSize);
			}
		}
		// by 100% values
		else
		if ( 0 && szFlag.match(/WIDTH/) && szFlag.match(/SIZE/) && !szFlag.match(/NORMSIZE/) && nValue100 && 
			 ( !(szFlag.match(/DIFFERENCE/) || szFlag.match(/RELATIVE/) || szFlag.match(/FRACTION/)) ||
				(szFlag.match(/OFFSETMEAN/) || szFlag.match(/OFFSETMEDIAN/) | szFlag.match(/DEVIATION/))					)
			){
			if ( szFlag.match(/SIZELOG/) ){
				nSizer = 1 / Math.log((this.nMax100 - this.nMin100)) * Math.log(Math.abs(nValue100));
			}else 
			if ( szFlag.match(/SIZEP4/) ){
				nSizer = 1 / Math.pow((this.nMax100 - this.nMin100),1/4) * Math.pow(Math.abs(nValue100),1/4);
			}else 
			if ( szFlag.match(/3D/) ){
				nSizer = 1 / Math.pow((this.nMax100 - this.nMin100),1/3) * Math.pow(Math.abs(nValue100),1/3);
			}else{
				nSizer = 1 / Math.pow((this.nMax100 - this.nMin100),1/2) * Math.pow(Math.abs(nValue100),1/2);
			}
		}
		// by values
		//
		else if ( szFlag.match(/SIZE/) && !szFlag.match(/NORMSIZE/) ){

			var nValueSum = nMySum;
			// GR 30.01.2015 special case POINTER, they will be sized individually 
			//
			if ( szFlag.match(/POINTER/) ){
				nValueSum /= nPartsA.length;
			}

			if ( szFlag.match(/SIZELOG/) ){
				nSizer = 1 / Math.log((nRange)) * Math.log(Math.abs(nValueSum));
			}else
			if ( szFlag.match(/SIZEP4/) ){
				nSizer = 1 / Math.pow((nRange),1/4) * Math.pow(Math.abs(nValueSum),1/4);
			}else
			if ( szFlag.match(/3D/) || szFlag.match(/SIZEP3/) || szFlag.match(/SIZEVOLUME/) ){
				nSizer = 1 / Math.pow((nRange),1/3) * Math.pow(Math.abs(nValueSum),1/3);
			}else{
				nSizer = 1 / Math.pow((nRange),1/2) * Math.pow(Math.abs(nValueSum),1/2);
			}
		}
		// ------------------------------------------------------------

		// GR 12.03.2013 in case of nMySum == max value -> 0 so set it to fix
		if ( (nSizer == 0) && (nMySum != 0) ){
			nSizer = 30/nChartSize;
		}

		// calcolate chartsize
		// -------------------
		//
		nChartSize = nChartSize*nSizer;

		// bar width and textsize
		// ----------------------

		//var nWidth = map.Scale.normalX(Math.min(8*nSizer,nChartSize/nPartsA.length)); 
		var nWidth = map.Scale.normalX(nChartSize/nPartsA.length*0.66); 

		if ( szFlag.match(/STACKED/) ){
			nWidth = map.Scale.normalX(nChartSize/3); 
			if ( this.nGridX && !szFlag.match(/MULTI/) ){
				nWidth /= 2;
			}
		}
		// GR 16.06.2011 give me nice MENUSIZE bars
		if ( szFlag.match(/MENUSIZE/) && nPartsA.length == 1 ){
			nWidth = map.Scale.normalX(nChartSize/2); 
		}

		//var nTextSize = Math.min(map.Scale.normalX(6),(nWidth<map.Scale.normalX(5)?(nWidth*4/5):(nWidth*5/5))); 
		var nTextSize = (nWidth<map.Scale.normalX(5)?(nWidth*4/5):(nWidth*5/5)); 
		var nTextOpacity = 1; 

		if ( szFlag.match(/COLUMN/) ){
			nWidth = nWidth*(szFlag.match(/THICK/)?2:(szFlag.match(/THIN/)?1:1.5)); 
		}
		if ( szFlag.match(/THIN/) ){
			nWidth = nWidth*0.6; 
			nTextSize = nTextSize*0.75;
		}
		if ( szFlag.match(/THICK/) ){
			nWidth = nWidth*1.5; 
			nTextSize = nTextSize*1.5;
		}
		if ( szFlag.match(/STACKED/) ){
			nTextSize = map.Scale.normalX(5); 
		}else
		if ( (szFlag.match(/ZOOM/)||szFlag.match(/NORMSIZE/)) && (nPartsA.length == 1) ){
			nTextSize = nTextSize*2.5; 
		}

		if ( szFlag.match(/STACKED/) && !szFlag.match(/ZOOM/) ){
			nTextSize *= nSizer;
		}

		//nTextSize = Math.max(map.Scale.normalX(2),nTextSize);
		var szTextStyle	= "font-family:arial;font-size:"+(nTextSize*0.95)+"px;fill:#606060;pointer-events:none;";
		szTextStyle = map.Scale.tStyle.Values.szStyle + "font-size:"+(nTextSize*0.95)+"px";
		var szTextBgStyle	= szTextStyle+";fill:none;stroke:none;";


		// bar height scale (nStep)
		// ----------------------------------
		//

		// GR 04.04.2009 - if we don't want normalized size
		if ( !szFlag.match(/NORMSIZE/) && !szFlag.match(/MENUSIZE/) && !this.szFlag.match(/NORMSIZE/) && !this.szFlag.match(/MENUSIZE/) ){
			// GR 22.03.2009 - override by directly defined normal size value
			if ( this.nNormalSizeValue && (!this.szField100 || szFlag.match(/POINTER/)) ){
				nMax  = this.nNormalSizeValue;
			}
		}
		// GR 15.06.2011 - override by directly defined max size - needed for selections
		if ( this.nOverrideMax ){
			nMax  = this.nOverrideMax;
		}

		var nStep  = map.Scale.normalX(origChartSize) / nMax; // this.nMax;

		if ( szFlag.match(/OFFSETMEAN/) || szFlag.match(/OFFSETMEDIAN/) || szFlag.match(/DEVIATION/) ){
			nStep =  map.Scale.normalX(nChartSize) / 300;
		}
		if (szFlag.match(/SIZE/) && szFlag.match(/SEQUENCE/) && a && (nPartsA.length>1) && !this.szSizeField && !this.szField100 ){
			nStep = nStep * nPartsA.length / nSizer;
		}else
		if ( szFlag.match(/SIZE/) && a && (nPartsA.length>1) && !szFlag.match(/EXPAND/) ){
			if ( this.szField100 || szFlag.match(/POINTER/) ){
				nStep = nStep * nSizer;
			}else{
				nStep = nStep / (szFlag.match(/SIZEP4/)?(nSizer*nSizer):nSizer);
			}
		}

		if ( this.nRangeScale && !( szFlag.match(/ZOOM/) && szFlag.match(/HORZ/) ) ){
			nStep = nStep*this.nRangeScale;
		}

		if ( szFlag.match(/COMPRESSMAX/) ){
			nStep = nStep/4;
		}else
		if ( szFlag.match(/COMPRESSMORE/) ){
			nStep = nStep/3;
		}else
		if ( szFlag.match(/COMPRESS/) ){
			nStep = nStep/2;
		}else
		if ( szFlag.match(/EXPANDMAX/) ){
			nStep = nStep*4;
		}else
		if ( szFlag.match(/EXPANDMORE/) ){
			nStep = nStep*3;
		}else
		if ( szFlag.match(/EXPAND/) ){
			nStep = nStep*2;
		}

		if ( 0 && szFlag.match(/SEQUENCE/) ){
			nStep = nStep/1.5;
		}
		if ( szFlag.match(/POINTER/) && !szFlag.match(/NORMSIZE/) ){
			nStep*=1.2;
		}

		// some other parameters
		// ----------------------

		var barGroup = map.Dom.newGroup(shapeGroup,"");

		if ( szFlag.match(/SORT/) ){
			this.sortedIndex = new Array(0);
			for ( i=0;i<nPartsA.length;i++ ){
				this.sortedIndex[i] = {index:i,value:nPartsA[i]};
			}
			this.sortedIndex.sort(szFlag.match(/STACKED/)?this.sortIndexUp:this.sortIndexDown);
		}
		else{
			this.sortedIndex = null;
		}

		var nStartI = 0;
		if ( szFlag.match(/UP/) ){
			nStartI = nPartsA.length-1;
		}
		var nCenter = 1;
		if ( szFlag.match(/CENTER/) ){
			nCenter=2;
		}

		// --------------------
		// make the bars
		// --------------------

		var minNextTextPos = new point(0,0);
		var lastValue = null;
		var lastHeight = null;
		var lastX = null;
		var lastY = null;
		var lastWidth = null;
		var lastColor = null;
		var nValueSum = 0;
		var nBarsDrawn = 0;
		var nClass = null;

		var nOldStep = nStep;

		for ( i=((this.nClipParts && (this.nClipParts<nPartsA.length))?(nPartsA.length-this.nClipParts):0); i<nPartsA.length; i++ ){

			if ( this.szShowParts ){
				var skipIt = true;
				for ( p in this.szShowPartsA ){
					if ( this.szShowPartsA[p] == i ){
						skipIt = false;
					}
				}
				if ( skipIt ){
					continue;
				}
			}


			nStep = nOldStep;

			var nIndex = Math.abs(nStartI-i);
			if ( this.sortedIndex ){
				nIndex = this.sortedIndex[nIndex].index;
			}

			// to make bars switchable
			nClass = nIndex;

			var nValue = nPartsA[nIndex];

			// GR 18.02.2009 clip = sequence
			// ------------------------------
			if ( this.szFlag.match(/CLIP/) && !this.szFlag.match(/MORPH/) && this.nClipFrames ){
				if ( (this.nClipFrames == nPartsA.length) ){
					nValue = Number(nPartsA[this.nActualFrame]);
				}else{
					nValue = nPartsA[0]*(this.nClipFrames-1-this.nActualFrame)/(this.nClipFrames-1) + nPartsA[nPartsA.length-1]*this.nActualFrame/(this.nClipFrames-1);
				}
				nIndex = this.nActualFrame;
				i = nPartsA.length;
			}

			var nTextValue = nValue;

			// GR 20.10.2015
			if ( szFlag.match(/INVERT/) ){
				if ( (nValue != 0) || (szFlag.match(/ZEROISVALUE/)) ){
					nValue	= this.nMax-nValue;
				}
			}

			// GR 01.02.2011
			if (szFlag.match(/DIFFERENCE/) && szFlag.match(/SUM/)){
				nValueSum += nValue;
				nTextValue = nValueSum;
			}
			var szValue = this.formatValue(nValue,this.szValueDecimals||2);

			// special case where we calcolate the deviation from mean/median
			// --------------------------------------------------------------
			if ( szFlag.match(/OFFSETMEAN/) || szFlag.match(/OFFSETMEDIAN/) ){
				if ( szFlag.match(/OFFSETMEAN/) ){
					nValue = 100/this.nMeanA[nIndex]*nValue;
				}
				if ( szFlag.match(/OFFSETMEDIAN/) ){
					nValue = 100/this.nMedianA[nIndex]*nValue;
				}
				nValue -= 100;
				// GR 30.06.2014 assert nValue
				nValue = (isFinite(nValue) && !isNaN(nValue))?nValue:0; 
				nTextValue = nValue;
				nMax = 100;
				szValue = this.formatValue(nValue,this.szValueDecimals||2);
				if ( nValue>0 ){
					szValue = "+"+szValue;
				}
			}else
			if ( szFlag.match(/DEVIATION/) ){
				nValue = (nValue-this.nMeanA[nIndex])/this.nDeviationA[nIndex];
				// GR 30.06.2014 assert nValue
				nValue = (isFinite(nValue) && !isNaN(nValue))?nValue:0; 
				nTextValue = nValue;
				nValue *= 100;
				szValue = this.formatValue(nValue,this.szValueDecimals||2);
				if ( nValue>0 ){
					szValue = "+"+szValue;
				}
			}

			// define color
			// --------------------------------------------------------------
			// position -> color
			var nColor = this.colorScheme[nIndex];

			// or: value -> class -> color 
			if ( (szFlag.match(/SEQUENCE/) || (nPartsA.length == 1)) && this.colorScheme.length >= 2 ){
				nColor = this.colorScheme[this.partsA.length-1];
				for ( ii=0;ii<this.partsA.length;ii++ ){
					if (nValue < this.partsA[ii].max){
						nColor = this.colorScheme[ii];
						this.partsA[ii].nCount++;
						nClass = ii;
						break;
					}
				}
			}

			// handle different chart types 
			// --------------------------------------------------------------
			if ( szFlag.match(/LEFT/) && szFlag.match(/HORZ/) ){
				nValue = -nValue;
			}

			if ( nValue < 0 && !szFlag.match(/STACKED/) ){
				nPosY = -nValue*nStep;
				nValue = -nValue;
			}

			// special bar derivations 
			// --------------------------------------------------------------
			if ( szFlag.match(/VOLUME/) && szFlag.match(/3D/) ){

				// 3D qube
				// -------

				nStep   = 1;
				// GR 03.09.2007 explicit size field
				if ( this.szSizeField && a ){
					nValue  = nWidth = (map.Scale.normalX(nChartSize/3*2) * Math.pow((1/this.nMaxSize * this.itemA[a].nSize),1/3));
				} else {
					nValue  = nWidth = (map.Scale.normalX(nChartSize/3*2) * Math.pow((1/nMax * nValue),1/3));
				}
			}else{

				// sized pointer
				//
				// dynamic width of pointer, must e done here, because we need nMax
				// ----------------------------------------------------------------
				if ( szFlag.match(/POINTER/) && szFlag.match(/SIZE/) && a ){
					if ( szFlag.match(/WIDTH/) && nValue100 &&
						( !(szFlag.match(/DIFFERENCE/) || szFlag.match(/RELATIVE/) || szFlag.match(/FRACTION/)) ||
						   (szFlag.match(/OFFSETMEAN/) || szFlag.match(/OFFSETMEDIAN/) || szFlag.match(/DEVIATION/))						)
					   ){
						// dynamic width by value100 -> width equals importance
						nWidth = (map.Scale.normalX(nChartSize) * Math.pow(Math.abs(1/this.nMax100 * nValue100),1/2) );
					}else{
						// dynamic width by value -> pointer sized 
						nWidth = (map.Scale.normalX(nChartSize) * Math.pow(Math.abs(1/nMax * nValue),1/3) );
					}

					// dynamic text size and opacity - experimental !
					// ----------------------------------------------
					nTextSize = nWidth*0.6; 
					if ( this.nValueSizeMin && !szFlag.match(/ZOOM/) ){
						nTextSize = ((nTextSize*map.Layer.nDynamicObjectScale) > map.Scale.normalX(this.nValueSizeMin)) ? nTextSize:0;
					}
					if ( !szFlag.match(/ZOOM/) ){
						nTextOpacity = Math.pow(Math.abs(nValue),1/2)/Math.pow(nMax,1/2); 
						if ( this.szFadeValuePow && Number(this.szFadeValuePow) ){
							nTextOpacity = Math.pow(Math.abs(nValue),Number(this.szFadeValuePow))/Math.pow(nMax,Number(this.szFadeValuePow)); 
						}
					}
				}

				// normal pointer with dynamic fade label
				// ----------------------------------------------------------------
				if ( szFlag.match(/DTEXT/) && a && !szFlag.match(/ZOOM/) ){
					// dynamic text size and opacity - experimental !
					// ----------------------------------------------

					if ( 0 && this.szSizeField && a ){
						nTextSize = (map.Scale.normalX(nChartSize/3*2) * Math.pow((1/this.nMaxSize * this.itemA[a].nSize),1/2))*0.5;
						nTextOpacity = Math.pow(Math.abs(this.itemA[a].nSize),1/3)/Math.pow(this.nMaxSize,1/3); 
					}else{
						nTextSize = (map.Scale.normalX(nChartSize/3*2) * Math.pow(Math.abs(1/nMax * nValue),1/2) )*0.75; 
						if ( this.nValueSizeMin && !szFlag.match(/ZOOM/) ){
							nTextSize = ((nTextSize*map.Layer.nDynamicObjectScale) > map.Scale.normalX(this.nValueSizeMin)) ? nTextSize:0;
						}
						nTextOpacity = Math.pow(Math.abs(nValue),1/3)/Math.pow(nMax,1/3); 
					}
				}else{
					if ( this.nValueSizeMin && !szFlag.match(/ZOOM/) ){
						nTextSize = ((nTextSize*map.Layer.nDynamicObjectScale) > map.Scale.normalX(this.nValueSizeMin)) ? nTextSize:0;
					}
				}

			}
			
			// =======================
			// finally, make the bar !
			// =======================

			// GR 30.06.2014 assert nValue
			nValue = (isFinite(nValue) && !isNaN(nValue))?nValue:0; 

			if ( (nValue == 0) && szFlag.match(/NOZERO/) ){
				nPosY = 0;
				continue;
			}
			if ( (nTextValue < 0) && szFlag.match(/NONEGATIVE/) ){
				nPosY = 0;
				continue;
			}
			if ( (nTextValue > 0) && szFlag.match(/ONLYNEGATIVE/) ){
				nPosY = 0;
				continue;
			}

			var barShape = map.Dom.newGroup(barGroup,""); 

			chartGroup.setAttributeNS(szMapNs,"value","seechilds");

			// GR 16.06.2011 give me nice MENUSIZE bars, make invisible bg rect to help sizeing 
			if ( this.szFlag.match(/MENUSIZE/) && (nPartsA.length == 1) && !szFlag.match(/VOLUME/)){
				nWidth *= 0.8;
				nValue = nWidth / nStep * 1.7;
				map.Dom.newShape('rect',barShape,0,-map.Scale.normalY(nChartSize*0.75),map.Scale.normalX(nChartSize*0.5),map.Scale.normalY(nChartSize*0.75),"fill:red;stroke:none;fill-opacity:0");
			}

			var nnValue = nValue;
			if ( szFlag.match(/COLUMN/) ){

				// -------------
				// 3D column bar
				// -------------

				if ( nValue*nStep > 0 ){
					var donut = DonutCharts.newChart(SVGDocument,barShape,nPosX+nWidth/2,0,nWidth/2,0);
					donut.setStyle("3D");
					donut.addStyle("SILENT");
					donut.addPart(100,nValue*nStep*2-(szFlag.match(/SPACED/)?(nWidth/2):nWidth/5),nColor,0,(this.szAggregation && this.szAggregation.match(/sum/))?this.formatValue(nPartsA[nI],this.szValueDecimals||(nPartsA[nI]<5?1:0),"ROUND")+this.szUnit:this.formatValue(nPartsA[nI],this.szValueDecimals||(nPartsA[nI]<5?1:0),"ROUND")+this.szUnit,this.formatValue(nPartsA[nI],2)+this.szUnit+szLabel);
					donut.realize();
				}

			}else
			if ( szFlag.match(/3D/) ){

				// -------------
				// 3D pointer bar
				// -------------

				var cColor = __maptheme_getChartColors(nColor);

				if ( szFlag.match(/VOLUME/) && lastHeight ){
					var nDY = (nValue*nStep-lastHeight)/15;
					nPosY += nDY;
					var szColor = "white";
					szColor = "#444444";
					szColor = lastColor.borderColor;
					szFillColor = lastColor.mainColor;
					szFillOpacity = 0.3;
					if ( lastHeight < nValue*nStep ){
						szFillOpacity = 0.2;
					}
					map.Dom.newShape('line',barShape,lastX+lastWidth,lastY-nDY,nPosX,nPosY-nDY,"stroke:"+szColor+";stroke-width:"+map.Scale.normalX(0.25)+";");
					map.Dom.newShape('line',barShape,lastX+lastWidth,lastY-lastHeight-nDY,nPosX,nPosY-nValue*nStep-nDY,"stroke:"+szColor+";stroke-width:"+map.Scale.normalX(0.25)+";");
					map.Dom.newShape('line',barShape,lastX+lastWidth+lastWidth/3,lastY-lastWidth/4-nDY,nPosX+nWidth/3,nPosY-nWidth/4-nDY,"stroke:"+szColor+";stroke-width:"+map.Scale.normalX(0.25)+";");
					map.Dom.newShape('line',barShape,lastX+lastWidth+lastWidth/3,lastY-lastHeight-lastWidth/4-nDY,nPosX+nWidth/3,nPosY-nValue*nStep-nWidth/4-nDY,"stroke:"+szColor+";stroke-width:"+map.Scale.normalX(0.25)+"");
					map.Dom.newShape('path',barShape,'M'+(lastX+lastWidth)+','+(lastY-nDY)+' L '+(nPosX)+','+(nPosY-nDY)+' '+(nPosX)+','+(nPosY-nValue*nStep-nDY)+' '+(lastX+lastWidth)+','+(lastY-lastHeight-nDY)+' z',"fill:"+szFillColor+";stroke:"+szColor+";stroke-width:"+map.Scale.normalX(0.05)+";fill-opacity:"+szFillOpacity);
					if ( (lastHeight - nValue*nStep) > -nWidth/4 ){
						map.Dom.newShape('path',barShape,'M'+(lastX+lastWidth)+','+(lastY-lastHeight-nDY)+' L '+(nPosX)+','+(nPosY-nValue*nStep-nDY)+' '+(nPosX+nWidth/3)+','+(nPosY-nValue*nStep-nWidth/4-nDY)+' '+(lastX+lastWidth+lastWidth/3)+','+(lastY-lastHeight-lastWidth/4-nDY)+' z',"fill:"+szFillColor+";stroke:"+szColor+";stroke-width:"+map.Scale.normalX(0.05)+";fill-opacity:"+szFillOpacity);
					}
				}
				lastHeight = nValue*nStep;
				lastX	   = nPosX;
				lastY	   = nPosY;
				lastWidth  = nWidth;
				lastColor  = cColor;

				// GR 07.11.2008 show mean or median
				nnValue = this.nFilterA[nIndex];
				if (nnValue){
					var tmpStyle = "fill:#FFFFFF;stroke:gray;stroke-width:"+map.Scale.normalX(0.5)+";fill-opacity:0.1;stroke-opacity:0.1";
					map.Dom.newShape('path',barShape,'M'+(nPosX)+','+(0)+' l '+nWidth+','+0+' '+nWidth/3+','+(-nWidth/4)+' '+(-nWidth)+' '+0+' z',tmpStyle);
					map.Dom.newShape('rect',barShape,nPosX+nWidth/3,-nnValue*nStep/nCenter-nWidth/4,nWidth,nnValue*nStep,tmpStyle);
					map.Dom.newShape('path',barShape,'M'+(nPosX)+','+(0)+' l '+'0,'+(-nnValue*nStep/nCenter)+' '+nWidth/3+','+(-nWidth/4)+' 0,'+(nnValue*nStep)+' z',tmpStyle);
					map.Dom.newShape('rect',barShape,nPosX,-nnValue*nStep/nCenter,nWidth,nnValue*nStep,tmpStyle);
					map.Dom.newShape('path',barShape,'M'+(nPosX+nWidth)+','+(0)+' l '+'0,'+(-nnValue*nStep/nCenter)+' '+nWidth/3+','+(-nWidth/4)+' 0,'+(nnValue*nStep)+' z',tmpStyle);
					cColor.highColor = ColorScheme.getDerivateColor(nColor,0.9);
				}

				if ( (nPosY <= 0) || szFlag.match(/LEFT/) || szFlag.match(/VOLUME/)){
					if ( nValue ) {
						// 3D bar front 
						if ( nValue == 0 ){ cColor = __maptheme_getChartColors("none"); }
						map.Dom.newShape('rect',barShape,nPosX,-nValue*nStep/nCenter,nWidth,nValue*nStep,"fill:"+cColor.mainColor+";stroke:"+cColor.borderColor+";stroke-width:"+map.Scale.normalX(0.05)+";stroke-opacity:0.3");
						// 3D bar side 
						map.Dom.newShape('path',barShape,'M'+(nPosX+nWidth)+','+(0)+' l '+'0,'+(-nValue*nStep/nCenter)+' '+nWidth/3+','+(-nWidth/4)+' 0,'+(nValue*nStep)+' z',"fill:"+cColor.lowColor+";stroke:"+cColor.borderColor+";stroke-width:"+map.Scale.normalX(0.05)+"");
						cColor.highColor = ColorScheme.getDerivateColor(nColor,0.9);
					}
					// 3D bar top 
					var strokeOpacity = 1;
					if ( 0 && (nValue == 0) ){ cColor.highColor = "none"; strokeOpacity = 0.3; }
					map.Dom.newShape('path',barShape,'M'+(nPosX)+','+(-nValue*nStep/nCenter)+' l '+nWidth+','+0+' '+nWidth/3+','+(-nWidth/4)+' '+(-nWidth)+' '+0+' z',"fill:"+cColor.highColor+";stroke:"+cColor.borderColor+";stroke-width:"+map.Scale.normalX(0.05)+";stroke-opacity:"+strokeOpacity);
				}else{
					map.Dom.newShape('path',barShape,'M'+(nPosX)+','+(0)+' l '+nWidth+','+0+' '+nWidth/3+','+(-nWidth/4)+' '+(-nWidth)+' '+0+' z',"fill:"+cColor.highColor+";stroke:"+cColor.borderColor+";stroke-width:"+map.Scale.normalX(0.05)+";fill-opacity:0.2");
					map.Dom.newShape('rect',barShape,nPosX+nWidth/3,-nValue*nStep/nCenter-nWidth/4,nWidth,nValue*nStep,"fill:"+cColor.mainColor+";stroke:"+cColor.borderColor+";stroke-width:"+map.Scale.normalX(0.05)+";fill-opacity:0.4");
					map.Dom.newShape('path',barShape,'M'+(nPosX)+','+(0)+' l '+'0,'+(-nValue*nStep/nCenter)+' '+nWidth/3+','+(-nWidth/4)+' 0,'+(nValue*nStep)+' z',"fill:"+cColor.lowColor+";stroke:"+cColor.borderColor+";stroke-width:"+map.Scale.normalX(0.05)+";fill-opacity:0.4");
					cColor.highColor = ColorScheme.getDerivateColor(nColor,0.9);
					map.Dom.newShape('rect',barShape,nPosX,-nValue*nStep/nCenter,nWidth,nValue*nStep,"fill:"+cColor.mainColor+";stroke:"+cColor.borderColor+";stroke-width:"+map.Scale.normalX(0.05)+";fill-opacity:0.4");
					map.Dom.newShape('path',barShape,'M'+(nPosX+nWidth)+','+(0)+' l '+'0,'+(-nValue*nStep/nCenter)+' '+nWidth/3+','+(-nWidth/4)+' 0,'+(nValue*nStep)+' z',"fill:"+cColor.lowColor+";stroke:"+cColor.borderColor+";stroke-width:"+map.Scale.normalX(0.05)+";fill-opacity:0.4");
					cColor.highColor = ColorScheme.getDerivateColor(nColor,0.9);
				}
				// GR 07.11.2008 show mean or median
				if (nnValue){
					map.Dom.newShape('rect',barShape,nPosX,-nnValue*nStep/nCenter,nWidth,nnValue*nStep,"fill:#FFFFFF;stroke:none;stroke-width:"+map.Scale.normalX(0.05)+";fill-opacity:0.25");
					if ( nnValue > nValue ){
						map.Dom.newShape('path',barShape,'M'+(nPosX)+','+(-nnValue*nStep/nCenter)+' l '+nWidth+','+0+' '+nWidth/3+','+(-nWidth/4)+' '+(-nWidth)+' '+0+' z',"fill:#8888FF;stroke:#444488;stroke-width:"+map.Scale.normalX(0.1)+";fill-opacity:0.2");
					}else {
						map.Dom.newShape('path',barShape,'M'+(nPosX)+','+(-nnValue*nStep/nCenter)+' l '+nWidth+','+0+' '+nWidth/3+','+(-nWidth/4)+' '+(-nWidth)+' '+0+' z',"fill:#8888FF;stroke:"+cColor.borderColor+";stroke-width:"+map.Scale.normalX(0.1)+";fill-opacity:0.1;stroke-opacity:0.4");
					}
				}
			}
			else
			if ( szFlag.match(/Border/) ){
				map.Dom.newShape('rect',barShape,nPosX,-nValue*nStep/nCenter,nWidth,nValue*nStep,"fill:"+nColor+";stroke:none;");
				var nOff = 2;
				var x1 = nPosX+nOff;
				var x2 = nPosX+nWidth-nOff;
				var y1 = nOff-nValue*nStep/nCenter;
				var y2 = y1+nValue*nStep-nOff;
				var cColor = __maptheme_getChartColors(nColor);
				map.Dom.newShape('line',barShape,x1,y1,x1,y2,"stroke:white;stroke-width:"+map.Scale.normalX(0.001)+";stroke-opacity:1.0");
				map.Dom.newShape('line',barShape,x1,y1,x2,y1,"stroke:white;stroke-width:"+map.Scale.normalX(0.001)+";stroke-opacity:1.0");
				map.Dom.newShape('line',barShape,x1,y2,x2,y2,"stroke:black;stroke-width:"+map.Scale.normalX(0.001)+";stroke-opacity:0.9");
				map.Dom.newShape('line',barShape,x2,y1,x2,y2,"stroke:black;stroke-width:"+map.Scale.normalX(0.001)+";stroke-opacity:0.9");
			}
			else{
				// ------
				// 2D bar
				// ------

				if ( szFlag.match(/POINTER/) && nValue ){

					// ---------------
					// 2D pointer bar
					// --------------

					// GR 30.11.2013 clip extremely heigh bar, by let them grow with .pow after height of 1000  
					if ( (szFlag.match(/OFFSETMEAN/) || szFlag.match(/OFFSETMEDIAN/) || szFlag.match(/DEVIATION/)) && (Math.abs(nValue*nStep) > 1000) ){
						nStep = ( 1000 + (Math.abs(nValue*nStep)-1000)/10 + Math.abs(nValue*nStep)%1000 ) / Math.abs(nValue);
					}

					var szStyle = "fill:"+nColor+";fill-opacity:"+(this.fillOpacity||1)+";stroke:black;stroke-opacity:0.5;stroke-width:"+map.Scale.normalX(0.25)+"";
					if ( nPosY <= 0){
						// positive value
						if ( !this.fShadow && this.fOrigShadow ){
							map.Dom.newShape('path',barShape,'M'+(nPosX+nWidth/7+10)+','+(-nValue*nStep/nCenter+10)+' l '+
																-nWidth/7+','+0+' '+
																0+','+(-nWidth/15)+' '+
																 nWidth/2+','+(-nWidth/3)+' '+nWidth/2+','+nWidth/3+' '+
																0+','+(nWidth/15)+' '+
																-nWidth/7+','+0+' '+
																'0,'+(nValue*nStep)+' '+(-nWidth*5/7)+',0 '+
																'z',"fill:000000;fill-opacity:0.5;stroke:none;");
						}
						map.Dom.newShape('path',barShape,'M'+(nPosX+nWidth/7)+','+(-nValue*nStep/nCenter)+' l '+
															-nWidth/7+','+0+' '+
															0+','+(-nWidth/15)+' '+
															 nWidth/2+','+(-nWidth/3)+' '+nWidth/2+','+nWidth/3+' '+
															0+','+(nWidth/15)+' '+
															-nWidth/7+','+0+' '+
															'0,'+(nValue*nStep)+' '+(-nWidth*5/7)+',0 '+
															'z',szStyle);
					}else 
					 if ( !(szFlag.match(/NONEGATIVE/)) ){
						// negative value
						if ( !(szFlag.match(/LEFT/)) ){
							if ( szFlag.match(/ZOOM/) || szFlag.match(/NORMSIZE/) ){
								szStyle = "fill:"+nColor+";stroke:"+nColor+";stroke-width:"+map.Scale.normalX(0.25)+";fill-opacity:0.5";
							}else 
							if ( (this.partsA.length > 2) ){
								var cColor = __maptheme_getChartColors(nColor);
								szStyle = "fill:"+nColor+";stroke:"+cColor.lowColor+";stroke-width:"+map.Scale.normalX(0.25)+";fill-opacity:"+(this.nFadeNegative||0.1)+";stroke-opacity:0.8";
							}else{
								var cColor = __maptheme_getChartColors(nColor);
								szStyle = "fill:"+(1?nColor:"white")+";stroke:"+cColor.highColor+";stroke-width:"+map.Scale.normalX(0.5)+";fill-opacity:"+(this.nFadeNegative||0.1)+";stroke-opacity:1";
							}
						}
						map.Dom.newShape('path',barShape,'M'+(nPosX+nWidth/7)+','+(-nValue*nStep/nCenter)+' l '+
															nWidth*5/7+',0 0,'+(nValue*nStep)+' '+
															nWidth/7+','+0+' '+
															(-nWidth/2)+','+(nWidth/4)+' '+(-nWidth/2)+','+(-nWidth/4)+' '+
															nWidth/7+','+0+' '+
															'z',szStyle);
					}
				}else{

					// -------------
					// simple 2D bar
					// -------------

					if ( (nPosY <= 0) || szFlag.match(/LEFT/) ){
						map.Dom.newShape('rect',barShape,nPosX,-nValue*nStep/nCenter,nWidth,nValue*nStep,"fill:"+nColor+";stroke:black;stroke-width:"+map.Scale.normalX(0.05)+";stroke-opacity:0.1");
					}
					else{
						map.Dom.newShape('rect',barShape,nPosX,-nValue*nStep/nCenter,nWidth,nValue*nStep,"fill:"+nColor+";stroke:"+nColor+";stroke-width:"+map.Scale.normalX(0.25)+";fill-opacity:0.3");
					}
					// GR 07.11.2008 show mean or median
					nnValue = this.nFilterA[nIndex];
					if (nnValue){
						if ( (nPosY <= 0) || szFlag.match(/LEFT/) ){
							map.Dom.newShape('rect',barShape,nPosX,-nnValue*nStep/nCenter,nWidth,nnValue*nStep,"fill:none;stroke:black;stroke-width:"+map.Scale.normalX(0.5)+";stroke-opacity:0.1");
						}
						else{
							map.Dom.newShape('rect',barShape,nPosX,-nnValue*nStep/nCenter,nWidth,nnValue*nStep,"fill:none;stroke:"+nColor+";stroke-width:"+map.Scale.normalX(0.5)+";fill-opacity:0.3");
						}
					}
				}
			}

			// add text values
			// ---------------
			if ( (szFlag.match(/VALUES/) || this.szXaxisA) &&
					 !((nPosY > 0) && szFlag.match(/NONEGATIVE/)) &&
					  ( szFlag.match(/ZOOM/) || !this.szValueUpper || (map.Scale.getTrueMapScale()*map.Scale.nZoomScale <= this.nValueUpper)) ){

				if ( !nValue ){
					nValue = 0;
				}
				// GR 07.08.2008 new axis text
				// ---------------------------
				if ( szFlag.match(/AXIS/) && !szFlag.match(/STACKED/) && (this.szLabelA||this.szXaxisA)){
					var xi = nIndex;
					// GR 06.01.2014 not necessary !
					if ( 0 && szFlag.match(/UP/) ){
						xi = nPartsA.length-nIndex-1;
					}
					var szAxisText = this.szXaxisA?this.szXaxisA[xi]:(this.szLabelA?this.szLabelA[xi]:"");
					var nAxisTextSize = nTextSize*0.8;
					if ( szFlag.match(/UP/) ){
						nAxisTextSize = nTextSize*0.9;
					}

					var newText = map.Dom.newText(barShape,0,0,szTextStyle+";fill:#666666;text-anchor:end;font-size:"+(nAxisTextSize)+"px"," "+szAxisText+" ");

					var ptPos = new point(map.Scale.normalX(0.8),nWidth/2+nTextSize/5*2);

					if ( this.fNegativeValues ){
						newText.setAttributeNS(null,"transform","translate("+(nPosX+ptPos.y)+","+(-ptPos.x+nTextSize*0.9+10)+") rotate(270)");
					}else if ( szFlag.match(/CENTER/) ){
						newText.setAttributeNS(null,"transform","translate("+(nPosX+ptPos.y)+","+(map.Scale.normalX(nChartSize/2)+nTextSize*0.9)+") rotate(270)");
					}else if ( szFlag.match(/HORZ/) ){
						newText.setAttributeNS(null,"transform","translate("+(nPosX+ptPos.y)+","+(-ptPos.x+nTextSize*0.9+10)+") rotate(270)");
					}else{
						newText.style.setProperty("text-anchor","end","");
						if ( nPartsA.length == 1 ){
							newText.setAttributeNS(null,"transform","translate("+(nPosX+(szFlag.match(/VOLUME/)?nWidth*1.3:ptPos.y*1.5))+","+(-ptPos.x)+") ");
						}else{
							if ( szAxisText.length > 1 ){
								newText.setAttributeNS(null,"transform","translate("+(nPosX+ptPos.y)+","+(-ptPos.x+nTextSize*0.8)+") rotate(315)");
							}else{
								newText.setAttributeNS(null,"transform","translate("+(nPosX+ptPos.y*0.1)+","+(-ptPos.x+nTextSize)+")");
							}
						}
					}
				}
				// make the bar value label
				// ------------------------
				if ( szFlag.match(/VALUES/) && (nTextSize > 0) && !(this.nGridX && (this.partsA.length/this.nGridX > 2)) ){

					var szText = this.formatValue(nTextValue,this.szValueDecimals||((this.nMax<10)?1:0));
					if ( szFlag.match(/POINTER/) && (nTextValue > 0) && ( this.nMin<0 || szFlag.match(/OFFSETMEAN/) || szFlag.match(/OFFSETMEDIAN/) ) ){
						szText = "+"+szText;
					}
					if ( !szFlag.match(/VOLUME/) ){
						szText += (this.szUnit?(" "+this.szUnit+" "):"");
					}
					if ( szFlag.match(/STACKED/) && (nTextValue != 0) && (!nValue100) && (!this.nGridX) ){
						szText = szText +" ("+ Math.round(nTextValue/nMySum*100)+"%)";
					}

					var nTextLen = szText.length*nTextSize*4/8;

					var newText = this.createTextLabel(SVGDocument,barShape,"",szText,nTextSize/map.Scale.normalX(1.0),null,((nTextValue>0)&&(szFlag.match(/CTEXT/)||szFlag.match(/VALUEBACKGROUND/)))?nColor:null,this.szTextColor);
						newText.style.setProperty("opacity",String(nTextOpacity),"");

					var newTextBg = null;
					var newUnitText = null;
					var newXaxisText = null;
					
					// add the xaxis description (if defined) GR 15.10.2007
					if ( this.szXaxisA && szFlag.match(/EXACT/) && !szFlag.match(/AXIS/) ){
						var newXaxisText = map.Dom.newTSpan(newText,"fill:fill:#444444;font-size:"+(nTextSize)+"px"," "+this.szXaxisA[i]);
					}

					// position the value label
					// ------------------------
					var tLen = newText.fu.getBox().width;
					var ptPos = new point(map.Scale.normalX(-4),nWidth/2+nTextSize*0.15);
					var fTextInside = true;

					if ( 
					   ( !szFlag.match(/DOINLINETEXT/) || szFlag.match(/ZOOM/) || szFlag.match(/NORMSIZE/) ) &&
					   ( szFlag.match(/VALUE/) && !(szFlag.match(/VOLUME/) && !szFlag.match(/ZOOM/)) && (
						 szFlag.match(/THIN/) || szFlag.match(/NOINLINETEXT/) || szFlag.match(/DTEXT/) || szFlag.match(/SIZE/) ||
						 (tLen+map.Scale.normalX(1)) > nValue*nStep/nCenter || szFlag.match(/STACKED/) || szFlag.match(/NORMSIZE/)|| szFlag.match(/ZOOM/))
						)){

						// text to large to keep inside the bar
						// ------------------------------------

						fTextInside = false;

						if ( szFlag.match(/STACKED/) ){

							// with stacked bars, don't show zero values; the bar part doesn't exist  
							if ( (nValue == 0) && !(szFlag.match(/ZEROISVALUE/)) ){
								newText.parentNode.removeChild(newText);

							}else{

								// special label placement for stacked bars
								// ----------------------------------------
								ptPos.x = 0;
								if ( szFlag.match(/3D/) ){
									ptPos.x += nWidth/4;
									ptPos.y += nWidth/3;
								}
								// GR 01.02.2011
								var nTopDx = nValue*nStep/(szFlag.match(/SUM/)?2:2);

								minNextTextPos.x = Math.max(0,minNextTextPos.x + (nTextSize*0.75 - nTopDx));
								var ptTextPos = new point(minNextTextPos.x+ptPos.x+nTopDx-nTextSize/3,0);

								var nIndent = map.Scale.normalX(1.5);

								var nXPos1 = nPosX+ptPos.y+nWidth/3; 
								var nXPos2 = nPosX+ptPos.y+nWidth*7/8; 
								var nYPos1 = -ptPos.x-nTopDx; 
								var nYPos2 = -ptTextPos.x-nTextSize/3;
								// if dubble stacked bar, first n label must go to the left
								// --------------------------------------------------------
								if ( this.nGridX && nBarsDrawn < this.nGridX ){
									ptPos.y -= nWidth*2 + newText.fu.getBox().width;
									var nTemp = nXPos2;
									nXPos2 = nXPos1 - (szFlag.match(/3D/)?(nWidth*1.5):(nWidth*1.4));
									nXPos1 = nTemp  - (szFlag.match(/3D/)?(nWidth*7/4):(nWidth*1.4));
									if ( szFlag.match(/3D/) ){
										nYPos1 += nWidth/5; 
										nYPos2 += nWidth/5;
										ptTextPos.x -= nWidth/7;
									}
									nIndent = -nIndent;
								}

								newText.setAttributeNS(null,"transform","translate("+(nPosX+ptPos.y+nWidth+nIndent-nTextSize)+","+(-ptTextPos.x-nTextSize*0.25)+") ");

								var linebgGroup = map.Dom.newGroup(barShape,"");
								var lineGroup   = map.Dom.newGroup(barShape,"");

								map.Dom.newShape('line',linebgGroup,nXPos1,nYPos1,nXPos1+nIndent,nYPos1,"stroke-width:"+map.Scale.normalX(1.5)+";stroke:white;opacity:0.2;");
								map.Dom.newShape('line',lineGroup  ,nXPos1,nYPos1,nXPos1+nIndent,nYPos1,"stroke-width:"+map.Scale.normalX(0.5)+";stroke:#888888;");

								map.Dom.newShape('line',linebgGroup,nXPos1+nIndent,nYPos1,nXPos2,nYPos2,"stroke-width:"+map.Scale.normalX(1.5)+";stroke:white;opacity:0.2;stroke-linecap:round;");
								map.Dom.newShape('line',lineGroup  ,nXPos1+nIndent,nYPos1,nXPos2,nYPos2,"stroke-width:"+map.Scale.normalX(0.5)+";stroke:#888888;");

								map.Dom.newShape('line',linebgGroup,nXPos2,nYPos2,nXPos2+nIndent,nYPos2,"stroke-width:"+map.Scale.normalX(1.5)+";stroke:white;opacity:0.2;");
								map.Dom.newShape('line',lineGroup  ,nXPos2,nYPos2,nXPos2+nIndent,nYPos2,"stroke-width:"+map.Scale.normalX(0.5)+";stroke:#888888;");

								minNextTextPos.x = Math.max(0,minNextTextPos.x + (nTextSize*2/3 - (nValue*nStep-nTopDx)));
							}
						}
						else{
							// normal bars and barcharts 
							// -------------------------

							ptPos.x += nWidth/4;

							if ( szFlag.match(/3D/) ){
								ptPos.x += nWidth/4;
								ptPos.y = nWidth*0.30+nTextSize/2;
							}
							if ( szFlag.match(/POINTER/) && (nTextValue > 0) ){
								ptPos.x += nWidth*0.25;
							}
							var xValue = nValue;
							if ( (tLen+map.Scale.normalX(1)) > (nnValue-nValue)*nStep/nCenter ){
								xValue = Math.max(nValue,nnValue);
								if ( nnValue > nValue ){
									xValue += nWidth/nStep*0.2;
									map.Dom.newShape('line',barShape,nPosX+nWidth*0.6,-ptPos.x-nValue*nStep/nCenter+nWidth/3,nPosX+nWidth*0.6,-ptPos.x-nnValue*nStep/nCenter-nWidth*0.4,"stroke:white;");
								}
							}
							if (szFlag.match(/VOLUME/)){
								xValue += nWidth/5;
							}
							if ( nPartsA.length == 1 && !szFlag.match(/HORZ/) && !szFlag.match(/VOLUME/) ) {//&& szFlag.match(/NORMSIZE/) ){
								if ( szFlag.match(/ZOOM/) || szFlag.match(/NORMSIZE/) ){
									ptPos.y += szFlag.match(/3D/)?nWidth*0.75:nWidth*0.5;
									var dy = Math.min(0,nTextSize*0.55-nValue*nStep);
									var dx = nTextSize;
									if ( (szFlag.match(/3D/)||szFlag.match(/ZOOM/)) && !szFlag.match(/SIZE/) ){
										dx = 0;
									}
									newText.setAttributeNS(null,"transform","translate("+(nPosX+dx)+","+(dy-nTextSize*0.5) +")");
								}else{
									ptPos.y += szFlag.match(/3D/)?(szFlag.match(/VOLUME/)?nWidth*0.75:nWidth*0.6):nWidth*0.2;
									newText.setAttributeNS(null,"transform","translate("+(nPosX-nWidth*0.8)+","+(-xValue*nStep/nCenter-nTextSize*0.8-((szFlag.match(/POINTER/)&&(nTextValue>0))?nWidth*0.3:0))+")");
								}
								if ( nTextValue < 0 ){
									newText.style.setProperty("opacity",String(nTextOpacity*0.75),"");
								}
							}else{
								if (szFlag.match(/VOLUME/)){
									newText.setAttributeNS(null,"transform","translate("+(nPosX+ptPos.y)+","+(-ptPos.x-xValue*nStep/nCenter)+")  scale(0.9,0.9)");
								} else {
									newText.setAttributeNS(null,"transform","translate("+(nPosX+ptPos.y)+","+(-0-xValue*nStep/nCenter)+") rotate(270) scale(0.9,0.9)");
								}
							}
							newText.style.setProperty("fill","#404040","");
						}
					}
					else{
						// label text inside the bar (no background needed but adapted color)
						// ------------------------------------------------------------------
						var cColor = __maptheme_getChartColors(nColor);

						newText.removeChild(newText.firstChild);

						newText.firstChild.style.setProperty("fill",cColor.textColor,"");
						if ( newUnitText ){
							newUnitText.style.setProperty("fill",cColor.textColor,"");
						}
						if ( newXaxisText ){
							newXaxisText.style.setProperty("fill",cColor.textColor,"");
						}
						if ( newTextBg ){
							newTextBg.parentNode.removeChild(newTextBg);
						}

						var dX = map.Scale.normalX(0);
						var dY = map.Scale.normalY(0.5);


						if (szFlag.match(/VOLUME/)){
							nScale = (nValue*nStep)/(tLen+map.Scale.normalX(2));
							// GR 21.03.2013 remove already drawn text and make new centered text 
							newText.parentNode.removeChild(newText);
							newText = map.Dom.newText(barShape,nPosX+(nValue*nStep)/2,nTextSize*nScale/4-(nValue*nStep)/2,"font-family:arial;font-size:"+nTextSize*nScale+"px;text-anchor:middle;fill:"+cColor.textColor+";opacity:"+nOpacity+";stroke:none;pointer-events:none",szText);

						}else{
							nScale = Math.min(1,(nValue*nStep)/(tLen));
							if ( nScale < 0.33 ){
								newText.parentNode.removeChild(newText);
							}else{
								if ( nTextValue > 0 ){
									ptPos.x += nValue*nStep - (tLen+map.Scale.normalX(3)) * nScale;
								}
								dY /= nScale;
								newText.firstChild.style.setProperty("font-size",String(nTextSize*nScale));
								newText.firstChild.setAttributeNS(null,"transform","translate("+(nPosX+ptPos.y-dY)+","+(-ptPos.x-dX)+") rotate(270)	");
							}
						}
						minNextTextPos.x = Math.max(0,minNextTextPos.x - nValue*nStep);
					}
				}
			}

			// add a mark sign
			// ---------------
			if ( (nMark != null) && (i == nMark) ){
				var nSize = nTextSize*2;
				if ( 0 ){
					var szTemp	= "font-family:arial;font-size:"+(nSize)+"px;fill:#666666;pointer-events:none;";
					var newText = map.Dom.newText(barShape,0,0,szTemp,">");
					var ptPos = new point(map.Scale.normalX(-0.5),nWidth/2+nSize*0.35);
					newText.setAttributeNS(null,"transform","translate("+(nPosX+ptPos.y)+","+(-ptPos.x+50)+") rotate(270)");
					var newText = map.Dom.newText(barShape,0,0,szTemp,"-");
					var ptPos = new point(map.Scale.normalX(-1.35),nWidth/2+nSize*0.265);
					newText.setAttributeNS(null,"transform","translate("+(nPosX+ptPos.y)+","+(-ptPos.x+50)+") rotate(270)");
				}
				else{
					var cColor = __maptheme_getChartColors(nColor);
					var newPath;
					newPath = map.Dom.newShape('path',barShape,'M5,0 l 35,-45 -25,0 0,-30 -20,0 0,30 -25,0 35,45',"fill:#404040;stroke:white;stroke-width:"+map.Scale.normalX(0.2)+"");
					newPath.fu.setPosition(i*(nWidth+1.5)+nWidth*0.5,-nValue*nStep+(fTextInside?-map.Scale.normalX(3):-tLen-map.Scale.normalX(5.5)));
				}
			}

			// add a trend line 
			// ----------------
			if ( szFlag.match(/TRENDLINE/) ){

				var dY = Math.min((nValue*nStep/2),map.Scale.normalY(1.5));
				var cColor = __maptheme_getChartColors(nColor);
				var szColor = cColor.lowColor;//"white";
				var nSize = nTextSize/5;

				if ( i > 0 ){
					var x1 = (i-1)*(nWidth+(szFlag.match(/SPACED/)?nWidth/5:1))+nWidth/2;
					var x2 = (i)*(nWidth+(szFlag.match(/SPACED/)?nWidth/5:1))+nWidth/2;
					szColor = "white";
					szColor = (lastValue>nValue?"#CC3333":(lastValue<nValue?"#22BB22":cColor.lowColor));
					map.Dom.newShape('line',barShape,x1,-lastValue*nStep+dY,x2,-nValue*nStep+dY,"stroke:"+"#666666"+";stroke-width:"+map.Scale.normalX(1/nPartsA.length*1.2)+";opacity:0.8");
				}
				var newSpot = map.Dom.newShape('circle',barShape,0,0,nSize,"fill:"+szColor+";stroke:none;opacity:0.8");
				newSpot.fu.setPosition(i*(nWidth+(szFlag.match(/SPACED/)?nWidth/5:0))+nWidth/2,-nValue*nStep+dY);
			}

			// make a tooltip
			// ----------------
			if ( !szFlag.match(/SILENT/) ){
				if ( this.szFlag.match(/SEQUENCE/) ){
					barShape.setAttributeNS(szMapNs,"tooltip",szValue+" ("+(this.szLabelA?this.szLabelA[nClass]:"")+") ["+this.szFieldsA[nIndex]+"]");
				}
				else{
					var	szLabel = this.szFieldsA[nIndex];
					if (this.szLabelA &&  this.szLabelA[nIndex] ){
						szLabel = this.szLabelA[nIndex];
					}
					if ( nMySum && 	!(this.szField100 && !this.szFlag.match(/FRACTION/)) ){
						szValue = szValue + " (" + this.formatValue(100/nMySum*nValue,2) + "%)";
					}
					barShape.setAttributeNS(szMapNs,"tooltip",szValue+this.szUnit+" "+szLabel+"");
				}
			}

			// applicate special styles
			// ------------------------
			if ( szFlag.match(/FADEIN/) ){
				if ( (nPartsA.length == 2) && (i == 0) ){
					barShape.style.setProperty("opacity",String(0.6),"");
				}else
				if ( !szFlag.match(/NORMSIZE/) ){
					var nPow = szFlag.match(/FADEINP4/)?10:3;
					barShape.style.setProperty("opacity",String(0.1+0.9*Math.pow((i+1),nPow)/Math.pow(nPartsA.length,nPow)),"");
				}
			}
			if ( szFlag.match(/FADENEGATIVE/) ){
				if ( nTextValue < 0 ){
					barShape.style.setProperty("opacity",String(0.5),"");
				}
			}

			// make bar markable/switchable 
			// ----------------------------
			barShape.setAttributeNS(szMapNs,"class",String(nClass));

			// finally position this bar within the chart
			// ------------------------------------------

			barShape.fu.setPosition(0,nPosY);

			if ( szFlag.match(/STACKED/) ){
				nPosY -= nValue*nStep;
			}
			else{
				nPosY = 0;
				nPosX += nWidth;
				if ( szFlag.match(/VOLUME/) && szFlag.match(/SPACED/) ){
					nPosX += nWidth/(nPartsA.length==2?2:4);
				}else
				if ( szFlag.match(/SPACED/) ){
					nPosX += nWidth/5;
				}else{
					if ( !szFlag.match(/UP/) ){
						nPosX += 1;
					}
				}
			}

			// needed for positioning
			// ----------------------
			nBarsDrawn++;

			if ( szFlag.match(/STACKED/) && !szFlag.match(/MULTI/) && this.nGridX && ( nBarsDrawn%this.nGridX == 0 ) ){
				nPosY = 0;
				nPosX += nWidth+nWidth/20;
			}
			// store last values
			// -----------------
			lastValue = nValue;
		}

		// finish the bar chart 
		// --------------------

		if ( szFlag.match(/HOR/) ){
			barGroup.setAttributeNS(null,"transform","rotate(90) translate("+(-nPosX)+",0)");
		}

		// position the bar relative 0 point
		// ---------------------------------

		ptNull.y = 0;
		ptNull.x = 0;

		if ( szFlag.match(/HOR/) ){
			ptNull.y -= nWidth*1/2;
			if ( szFlag.match(/3D/) ){
				ptNull.y -= nWidth*1/3;
			}
		}
		else{
			if ( szFlag.match(/STACKED/) ){
				ptNull.x = nWidth/2;
			}
			else if ( szFlag.match(/Up/) || szFlag.match(/HOR/) ){
				ptNull.x = 0;
			}
			else {
				ptNull.x = nWidth*(nBarsDrawn)/2;
			}
		}
		if ( szFlag.match(/MENUSIZE/) ){
			ptNull.x += nWidth*(szFlag.match(/HORZ/)?1:0);
			ptNull.y += nWidth*(szFlag.match(/HORZ/)?0.3:0);
			ptNull.y += nWidth*((szFlag.match(/HORZ/)&&szFlag.match(/3D/))?1:(szFlag.match(/VOLUME/)?0.3:0.6));
		}

		this.nRealizedCount++;

		var barPositionGroup = map.Dom.newGroup(shapeGroup,""); 
		barPositionGroup.appendChild(barGroup);

		if ( szFlag.match(/ZOOM/) ){
			var nScale = 240/nTextSize/((nPartsA.length>1)?2:1);
			barPositionGroup.fu.scale(nScale,nScale);
		}
		barPositionGroup.fu.setPosition(shapeGroup.fu.getPosition().x-ptNull.x,-ptNull.y);

		ptNull.x = 0;
		ptNull.y = 0;

		if ( szFlag.match(/HOR/) ){
			ptNull.y = nWidth*1/2;
		}

	}

	// ===================================================================================
	// == charts drawing finished ========================================================
	// ===================================================================================

	// call user plugin to add elements to the chart

	if ( szFlag.match(/EXTEND/) && HTMLWindow.ixmaps.htmlgui_drawChartAfter ){
		try{
			var objTheme = this.objThemesA[this.szThemesA[0]];
			HTMLWindow.ixmaps.htmlgui_drawChartAfter(SVGDocument,{target:shapeGroup,theme:this,item:a,values:nPartsA,maxSize:nChartSize,flag:szFlag,mark:nMark,dbRecord:(objTheme.dbRecords?objTheme.dbRecords[this.itemA[a].dbIndex]:null)});
		}catch (e){}
	}

	// align the generated chart object
	if ( !szFlag.match(/NORMSIZE/) ){

		var ptNullOrig = new point(ptNull.x,ptNull.y);
		ptNull.y = 0;
		ptNull.x = 0;

		if ( this.szAlign && !szFlag.match(/PLOT/) ){
			if ( this.szAlign.match(/center/)){
				ptNull.y = 0;
			}
			if ( this.szAlign.match(/top/)){
				ptNull.y =  (ptNullOrig.y?ptNullOrig.y:map.Scale.normalX(nChartSize/5));
			}
			if ( this.szAlign.match(/above/)){
				ptNull.y =  (ptNullOrig.y?ptNullOrig.y:map.Scale.normalX(nChartSize/2));
			}
			if ( this.szAlign.match(/2above/)){
				ptNull.y += map.Scale.normalX(nChartSize/2);
			}
			if ( this.szAlign.match(/below/)){
				ptNull.y = -(ptNullOrig.y?ptNullOrig.y:map.Scale.normalX(nChartSize/2));
			}
			if ( this.szAlign.match(/2below/)){
				ptNull.y -= map.Scale.normalX(nChartSize/2);
			}
			if ( this.szAlign.match(/bottom/)){
				ptNull.y = -(ptNullOrig.y?ptNullOrig.y:map.Scale.normalX(nChartSize/2));
			}
			if ( this.szAlign.match(/2bottom/)){
				ptNull.y -= map.Scale.normalX(nChartSize/2);
			}
			if ( this.szAlign.match(/right/)){
				ptNull.x = -(ptNullOrig.y?ptNullOrig.y:map.Scale.normalX(nChartSize/2));
			}
			if ( this.szAlign.match(/2right/)){
				ptNull.x -= map.Scale.normalX(nChartSize/2);
			}
			if ( this.szAlign.match(/left/)){
				ptNull.x = (ptNullOrig.y?ptNullOrig.y:map.Scale.normalX(nChartSize/2));
			}
			if ( this.szAlign.match(/2left/)){
				ptNull.x += map.Scale.normalX(nChartSize/2);
			}
			if ( this.szAlign.match(/baseline/)){
				ptNull.y +=  map.Scale.normalY(nChartSize/5);
			}
		}
	}
	// make chart label, if source field is defined 

	if ( a && this.szLabelField && !szFlag.match(/NORMSIZE/) && !szFlag.match(/ZOOM/) && ( !this.nLabelUpper || (map.Scale.getTrueMapScale()*map.Scale.nZoomScale <= this.nLabelUpper) ) ){
		var szLabel = this.itemA[a].szLabel;
		if ( !szLabel ){
			szLabel = this.szLabelField+"?";
		}else{
			if ( !isNaN(__scanValue(szLabel)) ){
				szLabel = this.formatValue(__scanValue(szLabel),2) + (this.szLabelUnits || "");
			}else{
				szLabel += (this.szLabelUnits || "");
			}
		}
		var nTextSize = map.Scale.normalX(6); 
		var szTextStyle		= "opacity:0.7;font-family:arial;font-size:"+(nTextSize)+"px;text-anchor:middle;fill:#000000;pointer-events:none";
		var szBgStyle		= "opacity:1;fill:white;fill-opacity:0.4;stroke:#000000;stroke-width:"+map.Scale.normalX(1)+"pointer-events:none;";
		var nTextLen = (szLabel.length+2)*nTextSize*0.50;

		// push to bottom 
		var labelGroup = map.Dom.newGroup(shapeGroup,""); 
		labelGroup.parentNode.insertBefore(labelGroup,labelGroup.parentNode.firstChild);
		if (!szFlag.match(/MULTI/)){
			labelGroup.setAttributeNS(szMapNs,"class",String(nClass));
		}

		var newBg = map.Dom.newShape('rect',labelGroup,-nTextLen/2,-nTextSize*0.95,nTextLen,nTextSize*1.2,szBgStyle);
		newBg.setAttributeNS(null,'rx',nTextSize*0.2);
		newBg.setAttributeNS(null,'ry',nTextSize*0.2);

		var newText = map.Dom.newText(labelGroup,0,0,szTextStyle,szLabel);

		var bBox = newText.fu.getBox();
		var nWidth = Math.max(bBox.width,nTextLen);

		newBg.setAttributeNS(null,"x" ,-nWidth/2);
		newBg.setAttributeNS(null,"width" ,nWidth);

		labelGroup.fu.setPosition(nWidth/3,nTextSize/1.5+ptNullOrig.y);

		this.itemA[a].labelGroup = labelGroup;
	}

	// position the generated chart object
	if (szFlag.match(/MENU/)){
		var box = shapeGroup.fu.getBox();
		shapeGroup.fu.setPosition(-box.x-box.width/2,-box.y-box.height/2-map.Scale.normalY(nChartSize/2)-map.Scale.normalY(2));
	}else{
 		shapeGroup.fu.setPosition(shapeGroup.fu.getPosition().x-ptNull.x,shapeGroup.fu.getPosition().y-ptNull.y);
	}

	// GR 20.03.2013 make shure, the chart does not exeeds height 150 
	if (szFlag.match(/ZOOM/)){
		var chartBox = map.Dom.getBox(chartGroup);
		if ( chartBox.height > map.Scale.normalY(150) ){
			var nScale = Math.min(1,(map.Scale.normalY(150)/chartBox.height));
			// GR 17.05.2013 make shure, the chart is minimum height 30 
			nScale = Math.max(nScale,(map.Scale.normalY(30)/chartBox.height));
			shapeGroup.fu.scale(nScale,nScale);
			if ( shapeOnTopGroup ){
				shapeOnTopGroup.fu.scale(nScale,nScale);
			}
		}
	}

	ptNull.x = 0;
	ptNull.y = 0;
	// GR 01.02.2015 we need to know later, if chart has been drawn
	if ( a ){
		this.itemA[a].fDone = true;
	}

	return ptNull;
};

//..............................................
// H E L P E R
//..............................................

/**
 * get relevant shapes (incl. tiles)
 */  
MapTheme.prototype.getShapes = function(){

	// not on tiled layer
	var layerItem = map.Layer.getLayerObj(this.szThemesA[0]);
	if ( layerItem && layerItem.szFlag.match(/tiled/) ){
		_TRACE("== done === ");
		return;
	}

	_TRACE("== MapTheme.getShapes() ===> ");
	for (a in this.itemA){
		if ( !this.parent.themeNodesA[a] ){
			this.parent.themeNodesA[a] = this.getShapeA(a);
		}
	}
	_TRACE("== done === ");
};
/**
 * get relevant nodes of one item (incl. tiles)
 * @param a the (map) id of the item
 */  
MapTheme.prototype.getItemNodes = function(a){

	if ( !this.parent.themeNodesA[a] || !this.parent.themeNodesA[a].length ){
		this.parent.themeNodesA[a] = this.getShapeA(a);
	}

	return this.parent.themeNodesA[a]|| new Array();
};
/**
 * get shape array of one item 
 * one item can have n shapes in n tiles
 * @param a the (map) id of the item
 */
MapTheme.prototype.getShapeA = function(a){

	a = __mpap_decode_utf8(a);
	var sNode = SVGDocument.getElementById(a.trim());
	if ( sNode ){
		return new Array(sNode);
	}
	return [];
};
/**
 * calcolate shape positions
 */
MapTheme.prototype.getPositions = function(){

	_TRACE("== MapTheme.getPositions() ===> ");
	for (a in this.itemA){
		this.getNodePosition(this.itemA[a].szSelectionId);
	}
	_TRACE("== done === ");
};
/**
 * get the position (in internal map coordinates) one theme item shape
 * @param a the (map) id of the item
 */
MapTheme.prototype.getNodePosition = function(a){

	if ( typeof(a) == "undefined" ){
		return null;
	}
	var themeNodesPosA = (this.nGridWidth||this.szAggregationField)?this.themeNodesPosA:this.parent.themeNodesPosA;

	if ( !themeNodesPosA[a] ){
		if ( a.match(/:clone/)){
			return null;
		}
		// GR 18.10.2013 new: lookup field may contain geo position
		if ( a.match(/(-?[0-9\.]+) ?, ?(-?[0-9\.]+)/)){
			var ptPos = this.getMapPosition(a);
			themeNodesPosA[a] = new point(ptPos.x,ptPos.y);
			return themeNodesPosA[a];
		}

		if ( !this.parent.themeNodesA[a] ){
			this.parent.themeNodesA[a] = this.getShapeA(a);
		}
		var sNode = this.parent.themeNodesA[a][0];
		// if we have more than 1 shape, search the biggest one
		if ( this.parent.themeNodesA[a].length > 1){
			var nMaxArea = parseFloat(sNode.getAttributeNS(szMapNs,"area"));
			for ( var i=1; i<this.parent.themeNodesA[a].length; i++ ){
				var tNode = this.parent.themeNodesA[a][i];
				var nArea = parseFloat(tNode.getAttributeNS(szMapNs,"area"));
				if ( nArea > nMaxArea ){
					nMaxArea = nArea;
					sNode = tNode;
				}
			}
		}
		if (sNode){
			if (this.szShapeType.match(/line/)){
				var bBox = map.Dom.getBox(sNode);
			}
			else{
				var szCenter = sNode.getAttributeNS(szMapNs,"center");
				if ( !szCenter ){
					szCenter = sNode.parentNode.getAttributeNS(szMapNs,"center");
				}
				if ( szCenter && szCenter.length > 2 ){
					var szCenterA = szCenter.split(',');
					var bBox = new box( Number(szCenterA[0].split(':')[1]), Number(szCenterA[1].split(':')[1]), 0,0 );
				}
				else{
					var bBox = map.Dom.getBox(sNode);
				}
			}
			var ptMapOffset = map.Scale.getMapOffset(sNode);
			themeNodesPosA[a] = new point((ptMapOffset.x+bBox.x+bBox.width/2),(ptMapOffset.y+bBox.y+bBox.height/2));
		}
	}
	if ( themeNodesPosA[a] && (typeof(themeNodesPosA[a].x) != 'undefined') && (typeof(themeNodesPosA[a].y) != 'undefined') ){
		return themeNodesPosA[a];
	}
	return null;
};
/**
 * get the bounding box of one themn item node (shape)
 * @param a the (map) id of the item
 */
MapTheme.prototype.getNodeBox = function(a){

	if ( typeof(a) == "undefined" ){
		return null;
	}

	if ( !this.parent.themeNodesBoxA[a] ){
		if ( a.match(/:clone/)){
			return null;
		}
		if ( !this.parent.themeNodesA[a] ){
			this.parent.themeNodesA[a] = this.getShapeA(a);
		}
		var sNode = this.parent.themeNodesA[a][0];
		// if we have more than 1 shape, search the biggest one
		if ( this.parent.themeNodesA[a].length > 1){
			var nMaxArea = parseFloat(sNode.getAttributeNS(szMapNs,"area"));
			for ( var i=1; i<this.parent.themeNodesA[a].length; i++ ){
				var tNode = this.parent.themeNodesA[a][i];
				var nArea = parseFloat(tNode.getAttributeNS(szMapNs,"area"));
				if ( nArea > nMaxArea ){
					nMaxArea = nArea;
					sNode = tNode;
				}
			}
		}
		if (sNode){
			var bBox = map.Dom.getBox(sNode);
			var ptMapOffset = map.Scale.getMapOffset(sNode);
			this.parent.themeNodesBoxA[a] = new box( (ptMapOffset.x+bBox.x)
													,(ptMapOffset.y+bBox.y)
													,(bBox.width)
													,(bBox.height)
													);
		}
	}
	return this.parent.themeNodesBoxA[a];
};
/**
 * get the calcolated and stored area of one theme shape in square KM
 * @param a the (map) id of the item
 */
MapTheme.prototype.getNodeArea = function(a){

	var tilesNodesA = this.getItemNodes(a);
	var xNode = tilesNodesA[0];
	if ((xNode)){
		return Number(xNode.getAttributeNS(szMapNs,"area"))/1000000;
	}
	return 0;
};
/**
 * if the theme item id is a (lat,lon) position	
 * turn the geo coordinate string (lat,lon) into a map position
 * @param a the (map) id of the item
 */
positionRegExp=/(-?[0-9\.]+) ?, ?(-?[0-9\.]+)/;
MapTheme.prototype.getMapPosition = function(a){
	if (a){
		var szM = a;
		var szMA = null;
		if (szM && (szMA = szM.match(positionRegExp)) ){
			var pt = map.Scale.getMapPositionOfLatLon(parseFloat(szMA[1]),parseFloat(szMA[2]));
			return map.Scale.getMapPositionOfLatLon(parseFloat(szMA[1]),parseFloat(szMA[2]));
		}
	}
	return new point(0,0);
};

//..............................................
// theme legend in SVG
//..............................................

/**
 * handle onClick on the info pane field
 * @param evt the event
 */
MapTheme.prototype.onClick = function(evt){
	if ( !this.fRemove ){
		if ( this.widgetNode ){
			this.enable();
		}
		this.fToFront = true;
		executeWithMessage("map.Themes.execute()","... processing ...");

		map.Themes.onclickInfo(evt,this.szId);
	}
};

/**
 * Display an error summary for the chart creation
 */
MapTheme.prototype.showErrorInfo = function(){

	_TRACE("== MapTheme.showErrorInfo("+this.szId+")===> ");

	if ( this.nMissingPositionCount == 0 ){
		return;
	}
	var szDisplayId = this.szId+":errordisplay:widget";
	var szTitle = map.Dictionary.getLocalText("Chart statistic");

	var newInfo = new InfoContainer(SVGDocument,this.widgetNode,szDisplayId+":movable",new point(map.Scale.normalX(0),map.Scale.normalX(0)),new point(-map.Scale.normalX(15),map.Scale.normalX(80)),"fixed",szTitle);
	var infoWorkspace = newInfo.workspaceNode;
	
	var textA = new Array(   map.Dictionary.getLocalText("total items")
							,map.Dictionary.getLocalText("charts drawn")
							,map.Dictionary.getLocalText("missing positions")
							,map.Dictionary.getLocalText("missing value match")
							,map.Dictionary.getLocalText("zero values")
						    ,String(this.nCount)
							,String(this.nRealizedCount)
							,String(this.nMissingPositionCount)
							,String(this.nMissingRangeCount)
							,String(this.nZeroValueCount)

						);

	var gridGroup = map.Dom.newGroup(infoWorkspace,"");
	gridGroup.fu.setPosition(0,map.Scale.normalY(3));
	var newText = createTextGrid(SVGDocument,gridGroup,szDisplayId+":textgrid",textA,2);

	newInfo.reformat();
};

/**
 * Display the data of a theme item
 * @param szShapeId the id of the theme item
 * @param targetGroup the SVG target group
 * @type SVG element
 * @return the SVG element created
 */
MapTheme.prototype.getDataGrid = function(szShapeId,targetGroup){
	var textA = map.Themes.getDataRow(szShapeId,this);
	if ( textA && textA.length ){ 
		for ( var x=0; x<textA.length; x++ ){
			textA[x] = textA[x] || "---";	
		}

		var scrollObj = new ScrollArea(null,targetGroup,null,10,10,10);
		if ( scrollObj ){
			scrollObj.reformat();
			gridGroup = scrollObj.workspaceNode;
		}else{
			gridGroup = targetGroup;
		}
		// get all theme field indices to show with extra color
		var styleA = new Array(0);
		var indexA = map.Themes.getFieldIndexArray(this);
		for ( var i=0;i<indexA.length;i++ ){
			styleA[indexA[i]] = "font-weight:bold;fill:#087BBB";
			styleA[indexA[i+textA.length/2]] = "font-weight:bold;fill:#087BBB";
		}

		var newText = createTextGrid(SVGDocument,gridGroup,":textgrid",textA,2,12,styleA);
		if ( !scrollObj ){
			return newText.fu;
		}else{
			scrollObj.setWidth(Math.min(newText.fu.getBox().width/map.Scale.normalX(1)+15,map.Scale.bBox.width/map.Scale.normalY(2.2)));
			scrollObj.setHeight(Math.min(newText.fu.getBox().height/map.Scale.normalY(1)+15,map.Scale.bBox.height/map.Scale.normalY(2.2)));
			scrollObj.reformat();
			if ( scrollObj.hasScrollBars() ){
				scrollObj.setScrollPosition(new point(0,0));
			}
			return scrollObj;
		}
	}
};

//..............................................
// value label for PIE, DONUT, ...
//..............................................

function __sortYposUp(a,b){
	if ( a.y > b.y){
		return 1;
	}
	return -1;
}
function __sortYposDown(a,b){
	if ( a.y < b.y){
		return 1;
	}
	return -1;
}

/**
 * Create the value label for one quadrant of the pie,...
 * makes the texts positions it well and draws a lines from the text to the pie part
 * @param donut the pie/donut object
 * @param quadA an array with the label to draw for this quadrant
 * @param nFontSize the font size for the label text
 * @param szTextOrientation a style def for the SVG text to create
 * @param xDir increment direction for the label
 * @param yDir increment direction for the label
 * @param xMax horizontal position limits for this quadrant
 * @param yMax vertical position limits for this quadrant
 * @type void
 */
MapTheme.prototype.drawTextforOneQuadrant = function(donut,quadA,nFontSize,szTextOrientation,xDir,yDir,xMax,yMax){

	var nLineHeight = donut.szStyle.match(/3D/)?nFontSize*2.4:nFontSize*1.2;
	var yMin = nLineHeight/2;
	var ySpace = yMax-nLineHeight*(quadA.length-2);
	var szColor = "#777777";
	var szLColor = "#888888";
	for ( i=0; i<quadA.length;i++ ){

		var nKnee = quadA[i].y/quadA[i].ly;	
		
		var yPos = Math.max(yMin,Math.min(quadA[i].y,ySpace));
		yMin = yPos+nLineHeight;
		ySpace += nFontSize;

		var xPos = quadA[i].x*1.2;
		xPos = xMax+map.Scale.normalX(2);

		if ( yPos > quadA[i].y ){
			nKnee = Math.max(nKnee,yPos/quadA[i].y);
		}

		var startX = donut.mX+quadA[i].lx*xDir; 
		var startY = donut.mY+quadA[i].ly*yDir; 
		var kneeX = donut.mX+quadA[i].x*xDir; 
		var kneeY = donut.mY+quadA[i].y*yDir; 
		var endX = donut.mX+xPos*xDir; 
		var endY = donut.mY+yPos*yDir; 

		var textGroup = map.Dom.newGroup(donut.frameGroup,"");
		donut.donutPartsA[quadA[i].index].textNode = textGroup;

		var linebgGroup = map.Dom.newGroup(textGroup,"");
		var lineGroup = map.Dom.newGroup(textGroup,"");

		if ( nKnee ){
			map.Dom.newShape('line', linebgGroup,startX,startY,kneeX,kneeY,"stroke:white;stroke-width:"+map.Scale.normalX(1.5)+";opacity:0.2;");
			map.Dom.newShape('line', lineGroup  ,startX,startY,kneeX,kneeY,"stroke:"+szLColor+";stroke-width:"+map.Scale.normalX(0.5)+";opacity:1;");
			startX = kneeX;
			startY = kneeY;
		}

		if ( quadA[i].x < xMax - map.Scale.normalX(3) ) {
			map.Dom.newShape('line', linebgGroup,startX,startY,donut.mX+(xMax-map.Scale.normalX(3))*xDir,startY,"stroke:white;stroke-width:"+map.Scale.normalX(1.5)+";opacity:0.2;stroke-linecap:round;");
			map.Dom.newShape('line', lineGroup  ,startX,startY,donut.mX+(xMax-map.Scale.normalX(3))*xDir,startY,"stroke:"+szLColor+";stroke-width:"+map.Scale.normalX(0.5)+";opacity:1;");
			startX = donut.mX+(xMax-map.Scale.normalX(3))*xDir;
		}
		
		map.Dom.newShape('line', linebgGroup,startX,startY,endX,endY,"stroke:white;stroke-width:"+map.Scale.normalX(1.5)+";opacity:0.2;stroke-linecap:round;");
		map.Dom.newShape('line', lineGroup  ,startX,startY,endX,endY,"stroke:"+szLColor+";stroke-width:"+map.Scale.normalX(0.5)+";opacity:1;");
		startX = endX;
		endX += map.Scale.normalX(2)*xDir;

		map.Dom.newShape('line', linebgGroup,startX,endY,endX,endY,"stroke:white;stroke-width:"+map.Scale.normalX(1.5)+";opacity:0.2;");
		map.Dom.newShape('line', lineGroup  ,startX,endY,endX,endY,"stroke:"+szLColor+";stroke-width:"+map.Scale.normalX(0.5)+";opacity:1;");
		endX += map.Scale.normalX(1.5)*xDir;
	
		szText = donut.partsA[quadA[i].index].szText?donut.partsA[quadA[i].index].szText:null;
		if ( !szText ){
			szText = donut.partsA[quadA[i].index].szInfo?donut.partsA[quadA[i].index].szInfo:Math.round(donut.partsA[quadA[i].index].nInfoValue*10)/10+" % ";
		}
		if ( 0 && this.szChartFlag.match(/ZOOM/) ){
			szText = donut.partsA[quadA[i].index].szInfo;
		}		
		// GR 17.10.2011 new background for text
		var nTextLen = szText.length*nFontSize*5/8;
		var newTextField = this.createTextLabel(SVGDocument,textGroup,"",szText,nFontSize/map.Scale.normalX(1),szTextOrientation ,donut.partsA[quadA[i].index].color, (this.szChartFlag.match(/ZOOM/)?null:this.szTextColor) );
		newTextField.fu.setPosition(endX-nFontSize,endY-nFontSize*0);

		newTextField.setAttributeNS(szMapNs,"tooltip",donut.partsA[quadA[i].index].szInfo);

		// 3D donuts are squeezed !!
		if ( donut.szStyle.match(/3D/) ){
			newTextField.fu.scale(1,2);
		}
	}
};
/**
 * Generate textvalues for pie/donut charts
 * @param donut the pie/donut object
 * @param nFontSize the font size for the label texts
 */
MapTheme.prototype.drawDonutText = function(donut,nFontSize){

	var nYmaxPos = 0;
	var nXmaxPos = 0;
	var nXminPos = 0;

	// get the text positions from the pie/donut object, and create separate arrays for each quadrant
	var quad1A = new Array();
	var quad2A = new Array();
	var quad3A = new Array();
	var quad4A = new Array();
	for ( i=0; i<this.partsA.length;i++ ){
		var ptText = donut.getTextPosition(i);
		if ( !ptText ){
			continue;
		}

		if ( this.szShowPartsA ){
			var fShow = false;
			for ( p in this.szShowPartsA ){
				if ( this.szShowPartsA[p] == i ){
					fShow = true;
				}
			}
			if ( !fShow ){
				continue;
			}
		}
		
		nYmaxPos = Math.max(nYmaxPos,Math.abs(ptText.y));
		nXmaxPos = Math.max(nXmaxPos,ptText.x);
		nXminPos = Math.min(nXminPos,ptText.x);
		if ( donut.szStyle.match(/STARBURST/) ){
			nXmaxPos = Math.max(nXmaxPos,ptText.x);
			nXminPos = Math.min(nXminPos,ptText.x);
		}else{
			nXmaxPos = donut.nRadOuter;
			nXminPos = -donut.nRadOuter;
		}

		if ( ptText.x > 0 ){
			if (ptText.y > 0 ){
				quad2A[quad2A.length] = {index:i,x:ptText.x,y:ptText.y,lx:ptText.lx,ly:ptText.ly};
			}else{
				quad1A[quad1A.length] = {index:i,x:ptText.x,y:-ptText.y,lx:ptText.lx,ly:-ptText.ly};
			}
		}else{
			if (ptText.y > 0 ){
				quad3A[quad3A.length] = {index:i,x:-ptText.x,y:ptText.y,lx:-ptText.lx,ly:ptText.ly};
			}else{
				quad4A[quad4A.length] = {index:i,x:-ptText.x,y:-ptText.y,lx:-ptText.lx,ly:-ptText.ly};
			}
		}
	}
	quad1A.sort(__sortYposUp);
	quad2A.sort(__sortYposUp);
	quad3A.sort(__sortYposUp);
	quad4A.sort(__sortYposUp);

	if ( !nFontSize ){
		nFontSize = map.Scale.normalX(12);
	}

	this.drawTextforOneQuadrant(donut,quad1A,nFontSize,"text-anchor:start;",1,-1,nXmaxPos,nYmaxPos);
	this.drawTextforOneQuadrant(donut,quad2A,nFontSize,"text-anchor:start;",1,1,nXmaxPos,nYmaxPos);
	this.drawTextforOneQuadrant(donut,quad3A,nFontSize,"text-anchor:end;",-1,1,-nXminPos,nYmaxPos);
	this.drawTextforOneQuadrant(donut,quad4A,nFontSize,"text-anchor:end;",-1,-1,-nXminPos,nYmaxPos);
};

//..............................................
// v a r i o u s 
//..............................................

/**
 * Display the given text with autosizing background 
 * @param SVGDocument		the target document
 * @param SVGTargetGroup	the target group
 * @param szId				give the new element this id
 * @param szText			the text to display
 * @param nFontSize			the font size for the label texts
 * @param szTextOrientation a style def for the SVG text to create (text-anchor) 
 * @param szBgColor			the color of the label background (optional) 
 * @param szTColor			the color of the label text (optional)
 */
MapTheme.prototype.createTextLabel = function(SVGDocument,SVGTargetGroup,szId,szText,nFontSize,szTextOrientation,szBgColor,szTColor){

	var szTextColor = "#555555";
	var fBackground = true;
	var fShadow = true;
	var bgOpacity = 1;

	var testFlag = " " + this.szChartFlag + "|" + this.szFlag;
	if ( testFlag.match(/ZOOM/)		|| 
		 testFlag.match(/MENUSIZE/) || 
		 testFlag.match(/NORMSIZE/) || 
		 testFlag.match(/INFOSIZE/) ||
		 testFlag.match(/AXIS/)		||
		 testFlag.match(/SELECTION/)){
		fBackground = szBgColor?fBackground:false;
		fShadow = false;
	}
	if ( testFlag.match(/VALUEBACKGROUND/) ){
		fBackground = true;
	}

	if ( !nFontSize){
		nFontSize   = 12;
	}
	if ( !szTextOrientation){
		szTextOrientation   = "";
	}
	if ( !szBgColor || !fBackground ){
		szBgColor = "#fefeff";
		szTextColor = (Number(szText)<0?"#ee3333":szTextColor);
	}else{
		szTextColor = szTColor||ColorScheme.getTextColor(szBgColor); // szInfoBodyColor;
		bgOpacity = (testFlag.match(/ZOOM/)?0.9:0.5);
	}

	if(SVGDocument && SVGTargetGroup){
		var newGroup = map.Dom.newGroup(SVGTargetGroup,szId);
		var shadowRect = null;
		if ( fShadow && !this.fShadow && this.fOrigShadow ){
			shadowRect = map.Dom.newShape('rect',newGroup,1,1,1,1,"fill:#444444;fill-opacity:0.4;stroke:none;");
		}
		var newRect = map.Dom.newShape('rect',newGroup,1,1,1,1,"fill:"+szBgColor+";fill-opacity:"+bgOpacity+";stroke:#dddddd;stroke-width:"+map.Scale.normalX(0.2)+"");
		var szTextStyle = map.Scale.tStyle.Values.szStyle + (this.szTextFont?("font-family:"+this.szTextFont):"")+ ";font-size:"+map.Scale.normalY(nFontSize)+"px;fill:"+szTextColor+";"+szTextOrientation;
		var newText = map.Dom.newText(newGroup,map.Scale.normalX(nFontSize),map.Scale.normalY(nFontSize*0.25),szTextStyle,szText);

		var bBox = map.Dom.getBox(newText);
		newRect.setAttributeNS(null,"rx" ,map.Scale.normalX(1));
		newRect.setAttributeNS(null,"ry" ,map.Scale.normalX(1));
		newRect.setAttributeNS(null,"x"  ,bBox.x-map.Scale.normalX(nFontSize*0.3));
		newRect.setAttributeNS(null,"y"  ,bBox.y-map.Scale.normalY(nFontSize*0.0));
		newRect.setAttributeNS(null,"width" ,bBox.width +map.Scale.normalX(nFontSize*0.7));
		newRect.setAttributeNS(null,"height",bBox.height+map.Scale.normalY(nFontSize)*0.1);
		if ( shadowRect ){
			shadowRect.setAttributeNS(null,"rx" ,map.Scale.normalX(1));
			shadowRect.setAttributeNS(null,"ry" ,map.Scale.normalX(1));
			shadowRect.setAttributeNS(null,"x"  ,bBox.x-map.Scale.normalX(nFontSize*0.3)+map.Scale.normalX(1+nFontSize*0.02));
			shadowRect.setAttributeNS(null,"y"  ,bBox.y+map.Scale.normalY(nFontSize*0.0)+map.Scale.normalY(1+nFontSize*0.02));
			shadowRect.setAttributeNS(null,"width" ,bBox.width +map.Scale.normalX(nFontSize*0.7));
			shadowRect.setAttributeNS(null,"height",bBox.height+map.Scale.normalY(nFontSize)*0.1);
		}
		if ( !fBackground ){
			newRect.style.setProperty("display","none","");
			if ( shadowRect ){
				shadowRect.style.setProperty("display","none","");
			}
		}

		return newGroup;
	}
};

//..............................................
// for theme legend in SVG
//..............................................

/**
 * Generate an overview chart of the theme
 * @param targetGroup the target group for the char to create
 * @param szDisplayId id of the parent widget (SVG)
 */
MapTheme.prototype.getOverviewChart = function(targetGroup,szDisplayId){

	// GR 18.05.2015
	targetGroup.fu = new Methods(targetGroup);

	var nChartSize = 30;
	// important for text value label
	this.szChartFlag += "|MENUSIZE";

	// make overview chart for choroplethe maps
	// ----------------------------------------
	if ( this.szOverviewChart && this.szOverviewChart != "NONE" && this.nCount ) {

		var mX = map.Scale.normalX(100);
		var mY = map.Scale.normalY(100);
		var nRadOuter = map.Scale.normalX(75); 
		var nRadInner = map.Scale.normalX(50); 


		if (typeof(DonutCharts) != 'undefined'){

			var pieGroup = map.Dom.newGroup(targetGroup);
			var donut = DonutCharts.newChart(SVGDocument,pieGroup,mX,mY,nRadOuter,nRadInner);

			if (this.szOverviewChart.match(/PIE/)){
				donut.setStyle("flat");
				donut.setRadInner(0);
				donut.setRadOuter(map.Scale.normalX(55));
				donut.setCenter(map.Scale.normalX(80),map.Scale.normalY(55));
			}
			if (this.szOverviewChart.match(/DONUT/) || this.szOverviewChart.match(/3D/)){
				donut.setStyle("3D");
				donut.setCenter(map.Scale.normalX(80),map.Scale.normalY(100));
			}
			donut.setLine("white");
			donut.setLineWidth(map.Scale.normalX(0.1));

			var nHeight = map.Scale.normalY(20);

			for ( var i=0;i<this.partsA.length;i++ ){
				var nPercent = this.partsA[i].nCount/this.nCount*100;
				var nPercentOfValue = 100/this.nSum*this.partsA[i].nSum;
				if ( this.nRealizedCount && this.szFlag.match(/CHART/) ){
					nPercent = this.partsA[i].nCount/this.nRealizedCount*100;
				}
				if ( this.nExactCount && this.exactSizeA ){
					nPercent = this.partsA[i].nCount/this.nExactCount*100;
					nPercentOfValue = this.exactSizeA[i];
				}
				if ( this.szOverviewChart.match(/DONUT/) ){
					nHeight = map.Scale.normalY(this.partsA[i].nSum/this.nSum*80);
				}

				var szValue			 = String(this.partsA[i].nCount);
				var szPercent		 = nPercent		  ?String(" = "+this.formatValue(nPercent,1)+" %"):"";
				var szPercentOfValue = nPercentOfValue?String(", " +this.formatValue(nPercentOfValue,1)+" % of value"):"";

				if (this.szOverviewChart.match(/PERCENTOFVALUE/)){
					nPercent = nPercentOfValue;
					szPercent= "";
					szValue = String(this.formatValue(nPercent,1)+(this.szFlag.match(/CHART/)?this.szUnit:" %"));
				}
				else if ( !this.szOverviewChart.match(/DONUT/) ){
					szPercentOfValue = "";
				}
				if (this.szFlag.match(/EXACT/)){
					szPercent += " ("+this.szLabelA[i]+")";
					szPercentOfValue = "";
				}
				else if (this.szLegendLabelA && this.szLegendLabelA.length) {
					szPercent += " ["+this.szLegendLabelA[i]+"])";
				}

				donut.addPart(nPercent,nHeight,this.partsA[i].color,0
					,szValue
					,String(this.partsA[i].nCount)+" member(s)"+szPercent+szPercentOfValue
					,"map.Themes.markClass(evt,'"+this.szId+"','"+i+"')"
					,"map.Themes.unmarkClass(evt,'"+this.szId+"')"
					);
			}
			donut.realize();

			this.drawDonutText(donut);

			var chartBox = map.Dom.getBox(targetGroup);
			if ( chartBox.width > 0 && chartBox.height > 0 ){
				var ptPos = targetGroup.fu.getPosition();
				var szSummarize = this.szOverviewChart.match(/PERCENTOFVALUE/)?"*  value / class":"*  members / class";
				var nYoff = map.Scale.normalY(10);
				if (this.szOverviewChart.match(/DONUT/) || this.szOverviewChart.match(/3D/)){
					nYoff = map.Scale.normalY(15);
				}
				map.Dom.newText(targetGroup,map.Scale.normalX(80),chartBox.y+chartBox.height+nYoff,map.Scale.tStyle.Note.szStyle+";text-anchor:middle;",szSummarize);
			}
		}
	}
	else{
		// make overview chart for bubble, square, symbols 
		// ----------------------------------------------------
		if ( ( this.szFlag.match(/BUBBLE/) || this.szFlag.match(/SQUARE/) || this.szFlag.match(/SYMBOL/) ) && 
			!( this.szFlag.match(/EXACT/) && this.szFlag.match(/SYMBOL/) )									){

			var nMinValue = this.nMinA[0];
			var nMaxValue = this.nMaxA[0];
			// GR 03.09.2007 new 
			if ( this.szSizeField ){
				nMinValue = this.nMinSize;
				nMaxValue = this.nMaxSize;
			}
			var nMaxRadius = map.Scale.normalX(nChartSize/2);//  * map.Scale.nFeatureScaling*map.Scale.nObjectScaling;
			var	nMinRadius = nMaxRadius / Math.sqrt(nMaxValue) * Math.sqrt(nMinValue);
			if ( this.szFlag.match(/LINEAR/) ){
				nMinRadius = nMaxRadius / nMaxValue * nMinValue;
			}
			var szLineColor = this.colorScheme[1]?this.colorScheme[1]:"none";
			var szSummarize = this.szFlag.match(/SUM/)?"sum":"mean";

			nLinePos = 5;
			nXPos = 20;
			var sumGroup = map.Dom.newGroup(targetGroup);

			if ( !this.szFlag.match(/EXACT/) ){
				var sChartGroup = map.Dom.newGroup(sumGroup);
				var ptNull = this.drawChart(sChartGroup,null,nChartSize*1.5,"VALUES|ZOOM|NORMSIZE");

				if ( this.szFlag.match(/SEQUENCE/) ){
					sChartBox = map.Dom.getBox(sChartGroup);
					var ptPos = sChartGroup.fu.getPosition();
					sChartGroup.fu.setPosition(sChartBox.width/1.5+ptPos.x,-sChartBox.height/2+ptPos.y);
					var scale = map.Scale.normalX(nChartSize*7)/sChartBox.height;
					sChartGroup.fu.scale(scale,scale);
					nChartSize *= 7;
				}

				map.Dom.newText(sumGroup,map.Scale.normalX(0),map.Scale.normalY(5),map.Scale.tStyle.Note.szStyle+";text-anchor:left;",map.Dictionary.getLocalText(szSummarize));

				sumGroup.fu.setPosition(map.Scale.normalX(nXPos),map.Scale.normalY(nChartSize));
				nLinePos = nChartSize + 15;
			}

			if ( !this.szFlag.match(/SEQUENCE/) ){

				var minmaxGroup = map.Dom.newGroup(targetGroup);
				sumBox = map.Dom.getBox(sumGroup);
				minmaxGroup.fu.setPosition(sumBox.x+sumBox.width+map.Scale.normalX(nChartSize*0.66),map.Scale.normalY(-5));
				nLinePos = 0;
				var szLineStyle = "fill:none;stroke:black;stroke-width:"+map.Scale.normalX(0.25)+"px";

				var maxGroup = map.Dom.newGroup(minmaxGroup);
				if (this.szFlag.match(/BUBBLE/)){
					map.Dom.newShape('circle', maxGroup,0,0,nMaxRadius,szLineStyle);
				}
				else if (this.szFlag.match(/SQUARE/)){
					map.Dom.newShape('rect', maxGroup,-nMaxRadius,-nMaxRadius,nMaxRadius*2,nMaxRadius*2,szLineStyle);
				}
				map.Dom.newShape('line', maxGroup,0,-nMaxRadius,nMaxRadius*1.1,-nMaxRadius,szLineStyle);
				map.Dom.newText(maxGroup,nMaxRadius*1.1+map.Scale.normalX(2),-nMaxRadius,"font-family:arial;font-size:"+ map.Scale.normalX(10) +"px;text-anchor:left;baseline-shift:-10%;fill:black;stroke:none;pointer-events:none",this.formatValue(nMaxValue,1)+this.szUnit);
				maxGroup.fu.setPosition(map.Scale.normalX(nXPos),map.Scale.normalY(nLinePos+nChartSize/2));

				if ( (nMinRadius > 0) && (nMinRadius != nMaxRadius)){
					var minGroup = map.Dom.newGroup(minmaxGroup);
					if (this.szFlag.match(/BUBBLE/)){
						map.Dom.newShape('circle', minGroup,0,0,nMinRadius,szLineStyle);
					}
					else if (this.szFlag.match(/SQUARE/)){
						map.Dom.newShape('rect', minGroup,-nMinRadius,-nMinRadius,nMinRadius*2,nMinRadius*2,szLineStyle);
					}

					map.Dom.newShape('line', minGroup,0,-nMinRadius,nMaxRadius*1.1,-nMinRadius,szLineStyle);
					map.Dom.newText(minGroup,nMaxRadius*1.1+map.Scale.normalX(2),-nMinRadius,"font-family:arial;font-size:"+ map.Scale.normalX(10) +"px;text-anchor:left;baseline-shift:-60%;fill:black;stroke:none;pointer-events:none",this.formatValue(nMinValue,1)+this.szUnit);
					minGroup.fu.setPosition(map.Scale.normalX(nXPos),map.Scale.normalY(nLinePos)+nMaxRadius*2-nMinRadius);
				}

				map.Dom.newText(minmaxGroup,map.Scale.normalX(nXPos),map.Scale.normalY(nLinePos+nChartSize+15),map.Scale.tStyle.Note.szStyle+";text-anchor:left;",map.Dictionary.getLocalText("min / max size-values"));
			}
			targetGroup.fu.scale(1,1);
		}
		// make overview chart for buffer 
		// ----------------------------------------------------
		if ( this.szFlag.match(/CHART/) && this.szFlag.match(/BUFFER/) ){


			var nMaxRadius = map.Scale.normalX(nChartSize/2);//  * map.Scale.nFeatureScaling*map.Scale.nObjectScaling;
			var bBox = map.Dom.getBox(targetGroup.parentNode);
			var classOffset = bBox.width>0?bBox.width/map.Scale.normalX(1)+10:10;
			var maxGroup = map.Dom.newGroup(targetGroup.parentNode);
			map.Dom.newShape('circle', maxGroup,0,0,nMaxRadius,"fill:none;stroke:black;");
			var szLineStyle = "fill:none;stroke:black;stroke-width:"+map.Scale.normalX(1)+";";
			map.Dom.newShape('line', maxGroup,0,0,nMaxRadius,0,szLineStyle);
			map.Dom.newShape('line', maxGroup,0,map.Scale.normalY(-2),0,map.Scale.normalY(2.5),szLineStyle);
			map.Dom.newShape('line', maxGroup,nMaxRadius,0,nMaxRadius+map.Scale.normalX(-3),map.Scale.normalY(-3),szLineStyle);
			map.Dom.newShape('line', maxGroup,nMaxRadius,0,nMaxRadius+map.Scale.normalX(-3),map.Scale.normalY(3),szLineStyle);
			map.Dom.newText(maxGroup,nMaxRadius*1.1+map.Scale.normalX(2),map.Scale.normalX(-10),"font-family:arial;font-size:"+ map.Scale.normalX(10) +"px;text-anchor:left;baseline-shift:-10%;fill:black;stroke:none;pointer-events:none",Map.Scale.prototype.formatDistanceString(this.nBufferSize*this.nScale));
			maxGroup.fu.setPosition(map.Scale.normalX(nChartSize/2+classOffset),map.Scale.normalY(nChartSize/2));
			chartButtonObj = new Button(targetGroup.parentNode,szDisplayId+":bufferselectbutton","BUTTON",'#bufferselect_button'
										,"map.Selections.newSelection('activeLayer','activeBuffer','type:BUFFER;buffersize:200','test');"
										,""
										,"select active layer with this buffer");
			chartButtonObj.setPosition(map.Scale.normalX(nChartSize+classOffset+10),map.Scale.normalY(nChartSize));
			chartButtonObj.scale(1.4,1.4);
			chartButtonObj = null;
			if (_activeTheme){
				map.Dom.newText(targetGroup.parentNode,map.Scale.normalX(nChartSize+classOffset+20),map.Scale.normalY(nChartSize+6),"font-family:arial;font-size:"+ map.Scale.normalX(8) +"px;text-anchor:left;baseline-shift:-10%;fill:gray;stroke:none;pointer-events:none","... "+_activeTheme+"");
			}
		}
		// make overview chart for bar/pie/donut charts
		// --------------------------------------------
		if ( this.szFlag.match(/CHART/) && !this.szFlag.match(/BUBBLE/) && !this.szFlag.match(/SQUARE/) && !this.szFlag.match(/EXACT/) && !this.szFlag.match(/BUFFER/) && !this.szFlag.match(/SYMBOL/)){
			_TRACE("showInfo - drawChart =====>");
			var textBox = map.Dom.getBox(targetGroup.parentNode);
			if ( textBox.width < 0 ){
				textBox = new box(0,0,0,0);
			}
			// GR 17.08.2008 dynamic size
			var nChartSize = 30;
			if ( this.szFlag.match(/BAR/) && (this.nOrigSumA.length > 5) && !(this.szFlag.match(/STACKED/)) ){
				nChartSize = 15*this.nOrigSumA.length/Math.log(this.nOrigSumA.length);
			}

			var ptNull = this.drawChart(targetGroup,null,nChartSize,"VALUES|NORMSIZE"+(this.szFlag.match(/STACKED/)?"|EXPANDMAX":""));
			var chartBox = map.Dom.getBox(targetGroup);
			var nScale = 1;
			nScale = Math.min(2.5,Math.max(textBox.height/chartBox.height,map.Scale.normalX(100)/chartBox.height));
			targetGroup.fu = new Methods(targetGroup);
			targetGroup.fu.scale(nScale,nScale);
			
			summarizeGroup = map.Dom.newGroup(targetGroup,"textGroup");
			summarizeGroup.fu.scale(1/nScale,1/nScale);

			chartBox = targetGroup.fu.getBox();
			if ( 0 && textBox.width > textBox.height*2 ){
				targetGroup.fu.setPosition(-chartBox.x+map.Scale.normalX(10),textBox.height+map.Scale.normalY(10)-chartBox.y);
			}
			else{
				if ( this.szFlag.match(/BAR/) ){
					targetGroup.fu.setPosition(textBox.width-chartBox.x+map.Scale.normalX(10),-chartBox.y+Math.max(10,textBox.height*0.95-chartBox.height));
				}
				else{
					targetGroup.fu.setPosition(textBox.width-chartBox.x+map.Scale.normalX(10),-chartBox.y+Math.max(10,textBox.height/2-chartBox.height/2));
				}
			}

			var szSummarize = " * overall sum";
			if ( this.szAggregation && this.szAggregation.match(/mean/)){
				var szSummarize = " * arithmetic mean";
			}
			var szAnchor = "middle";
			if (  this.szFlag.match(/RIGHT/)					|| 
				  this.szFlag.match(/STACKED/)				    || 
				  this.szFlag.match(/CENTER/)				    || 
				  this.szFlag.match(/POINTER/)				    || 
				  this.partsA.length <= 2						){
				szAnchor = "start";
			}
			map.Dom.newText(summarizeGroup,0,chartBox.height+chartBox.y+map.Scale.normalY(5),map.Scale.tStyle.Note.szStyle+"baseline-shift:-100%;text-anchor:"+szAnchor+";",szSummarize);
		}
	}
};


/**
 * Create a color scheme legend 
 * @param targetGroupp target group (SVG)
 * @param szDisplayId id of the parent widget (SVG)
 * @type group
 * @return legend group (SVG)
 */
MapTheme.prototype.drawColorSchemeLegend = function(targetGroupp,szDisplayId){

	_TRACE("== colorlegend ==>");

	var legendGroup = null;

	// preparations
	// -----------------------

	var nFontSize       = map.Scale.nButtonSize?map.Scale.nButtonSize*0.66 : 12;
	var nSwatchHeight   = map.Scale.nButtonSize || 12;
	var nSwatchWidth    = map.Scale.nButtonSize?map.Scale.nButtonSize*1.2 : 18;
	var nSwatchWidthDef = nSwatchWidth;

	var nChartSize = 30;

	var szTextStyle		= "font-family:arial;font-size:"+map.Scale.normalY(nFontSize)+"px;fill:#666666;pointer-events:none;";


	var nLine = 0;
	var nLineHeight = nSwatchHeight*1.2;
	if ( this.szFlag.match(/BAR/) && this.szFlag.match(/UP/) ){
		nLineHeight = nSwatchHeight;
	}
	var nTextOff = nFontSize*1.15;
	var nLinePos = nLine*nLineHeight;
	var nStartI = 0;
	if ( this.szFlag.match(/BAR/) && (this.szFlag.match(/UP/) || this.szFlag.match(/STACKED/)) ){
		nStartI = this.partsA.length-1;
	}

	if ( this.showInfoMore || this.szFlag.match(/EXACT/) || this.szFlag.match(/UP/) || this.szFlag.match(/SYMBOL/) || (this.szLabelA && (!this.szFlag.match(/CLIP/))) || (this.partsA.length <= 2) ){
		this.szLegendStyle = "large";
	}else{
		this.szLegendStyle = "compact";
	}

	// GR make legend scrollable
	var scrollObj = new ScrollArea(null,targetGroupp,null,10,10,10);
	if ( scrollObj ){
		scrollObj.reformat();
		legendGroup = scrollObj.workspaceNode;
	}else{
		legendGroup = map.Dom.newGroup(targetGroupp,szDisplayId+":legend");
	}

	// calculate the precision for the min increment; 
	// reason: min < value >= max but partsA[i].min == partsA[i-1].max
	// so we have to increment the min value in the legend by 0.01, 0.1 or 1
	var nMinInc = 1;
	_TRACE("colorlegend: "+this.partsA.length+" parts --->");
	for (var i=0;i<this.partsA.length;i++ ){
		if ( this.partsA[i].min ){
			if (this.partsA[i].min.toFixed(0) != this.partsA[i].min){
				nMinInc = Math.min(nMinInc,0.1);
			}
			if (this.partsA[i].min.toFixed(1) != this.partsA[i].min){
				nMinInc = Math.min(nMinInc,0.01);
			}
		}
	}

	var _indexA = new Array(0);
	for (var i=0;i<this.partsA.length;i++ ){
		_indexA[i] = new Object();
		_indexA[i].i = i;
		_indexA[i].value = this.partsA[i].nCount;
	}

	if ( this.szFlag.match(/SYMBOL/) && this.szFlag.match(/EXACT/) && this.szFlag.match(/SORTDOWN/) ){
		_indexA.sort(this.sortIndexDown);
	}

	if ( (this.szFlag.match(/POINTER/) || this.szFlag.match(/INVERT/)) && !this.szLegendStyle.match(/compact/) ){
		_indexA.reverse();
	}

	var nStep = 1;
	if ( !this.szLabelA && (_indexA.length > 15) ){
		nStep = Math.floor(_indexA.length/10);
		nSwatchHeight*= 1.5;
	}

	var nXpos = ( (this.showInfoMore && this.isMarkable) )?18:10;

	// check, if we have counts for dynamic swatch width
	// -------------------------------------------------
	var fSumSwatch = false;
	if ( this.szFlag.match(/CHART/) && this.szFieldsA.length > 1 && !(this.szFlag.match(/OFFSET/) || this.szFlag.match(/DEVIATION/))){	
		var sss = 0;
		for ( var s=0; s<this.nOrigSumA.length; s++ ){
			if (  this.partsA[s] && typeof(this.partsA[s].nSum) != "undefined" ){
				sss++;
			}
		}
		var fSumSwatch = (sss == this.nOrigSumA.length);
	}

	// here we go
	// ===========
	for (var n=0;n<_indexA.length;n+=nStep ){
		var i = _indexA[n].i;

		var nIndex = Math.min(Math.abs(nStartI-i),this.partsA.length-nStep);
		var newText = null;
		var classRect = null;

		if ( this.szFlag.match(/SYMBOL/) && this.szFlag.match(/EXACT/) ){
			if ( this.nSkipCount == 0 ){
				nSwatchWidth = nChartSize/10 * this.partsA[i].nCount/this.nCount*100;
			}
			else{
				nSwatchWidth = nChartSize/this.nCount*10 * this.partsA[i].nCount;
			}
		}else
		if ( fSumSwatch ){
			var nSumMax = 0;
			var width = 0;
			if ( this.szFlag.match(/MORPH/) ){
				for ( var s=0; s<this.nOrigSumA.length/2; s++ ){
					var nSum = this.nOrigSumA[s]*(this.nClipFrames-1-this.nActualFrame)/(this.nClipFrames-1) + this.nOrigSumA[s+this.nOrigSumA.length/2]*this.nActualFrame/(this.nClipFrames-1);
					nSumMax = Math.max(nSumMax,nSum);
				}
				width = (this.nOrigSumA[nIndex]*(this.nClipFrames-1-this.nActualFrame)/(this.nClipFrames-1) + this.nOrigSumA[nIndex+this.nOrigSumA.length/2]*this.nActualFrame/(this.nClipFrames-1))/nSumMax;
			}else{
				for ( var s=0; s<this.nOrigSumA.length; s++ ){
					nSumMax = Math.max(nSumMax,this.partsA[s].nSum);
				}
				width = this.partsA[nIndex].nSum/nSumMax;
			}
			nSwatchWidth = nChartSize*2*width;
		}

		// GR 30.06.2014 assert nSwatchWidth
		nSwatchWidth = isNaN(nSwatchWidth)?nSwatchWidthDef:nSwatchWidth;

		if ( this.szFlag.match(/BUBBLE/) ){
			var nSize = ( this.szFlag.match(/EXACT/) || this.szSizeField) ? nSwatchHeight/2 : nSwatchHeight/4+nSwatchHeight/4*(i+1)/this.partsA.length;
			classRect = map.Dom.newShape('circle',legendGroup,map.Scale.normalX(nXpos+nSwatchHeight/2),map.Scale.normalY(nLinePos+nSwatchHeight/2),map.Scale.normalY(nSize),"fill:"+this.colorScheme[nIndex]+";stroke:#eeeeee;stroke-width:"+map.Scale.normalX(0.1)+";");
		}
		else{
			if ( nStep > 1 ){
				classRect = map.Dom.newGroup(legendGroup,"");
				for ( var k=0; k<nStep;k++ ){
					map.Dom.newShape('rect',classRect,map.Scale.normalX(nXpos),map.Scale.normalY(nLinePos+nSwatchHeight/nStep*k),map.Scale.normalX(nSwatchWidth),map.Scale.normalY(nSwatchHeight/nStep),"fill:"+this.colorScheme[nIndex+k]+";stroke:none;");
				}
			}else{
				classRect = map.Dom.newShape('rect',legendGroup,map.Scale.normalX(nXpos),map.Scale.normalY(nLinePos),map.Scale.normalX(nSwatchWidth),map.Scale.normalY(nSwatchHeight),"fill:"+this.colorScheme[nIndex]+";stroke:#eeeeee;stroke-width:"+map.Scale.normalX(0.1)+";");
			}
		}

		if (classRect){

			var nClassCount = this.partsA[nIndex].nCount;	
			for ( var k=1; k<nStep; k++){
				nClassCount += this.partsA[nIndex+k].nCount;
			}

			// GR 10.02.2009 create checkboxes to toggle class display
			//
			if (this.isMarkable && this.showInfoMore){
				// GR 10.12.2010 prevent clicking on background --> refresh 
				var helpRect = map.Dom.newShape('rect',legendGroup,map.Scale.normalX(-5),map.Scale.normalY(nLinePos-2),map.Scale.normalX(nSwatchWidth),map.Scale.normalY(nSwatchHeight+4),"fill:white;stroke:none;opacity:0;");
				helpRect.setAttributeNS(null,"id",this.szId+":widget:background:"+nIndex);

				buttonObj = new Button(legendGroup,this.szId+":class:"+nIndex,"CHECKBOX|SELECTED",""
											,"map.Themes.showClass(evt,'"+this.szId+"','"+nIndex+"','"+nStep+"')"
											,"map.Themes.hideClass(evt,'"+this.szId+"','"+nIndex+"','"+nStep+"')"
											,"show/hide class");
				buttonObj.setPosition(map.Scale.normalX(map.Scale.nButtonSize/2-1),map.Scale.normalY(nLinePos+map.Scale.nButtonSize/2-1));
				buttonObj.scale(0.75,0.75);
			}

			// make class label
			//
			var nMinVal  = this.partsA[nIndex].min+(n?nMinInc:0);
			var nMaxVal  = this.partsA[nIndex+nStep-1].max;
			var nDezimal = ((nMaxVal-nMinVal)>100)?0:2;
			szMin = this.formatValue(nMinVal,nDezimal);
			szMax = this.formatValue(nMaxVal,nDezimal);
			szMembers = "";
			if ( this.szFlag.match(/SHOWMEMBERS/) ){
				szMembers = "  ["+nClassCount+"]";
			}
			if ( szMin != szMax ){
				szLabel = szMin+"..."+szMax+(this.szLegendUnits?this.szLegendUnits:"")+this.szUnit+szMembers;
			}else{
				szLabel = szMin+(this.szLegendUnits?this.szLegendUnits:"")+this.szUnit+szMembers;
			}
			if ( !this.szFlag.match(/CLIP/) || this.szFlag.match(/MORPH/) ){
				if (this.szLabelA && this.szLabelA[nIndex] ){
					szLabel = this.szLabelA[nIndex];
				}
			}
			this.szLegendLabelA[nIndex] = szLabel;

			if ( this.szLegendStyle.match(/compact/) ) {
				if ( this.fGrayNoMember && (nClassCount == 0) && this.szFlag.match(/CHOROPLETHE/) && this.szFlag.match(/DOMINANT/) ){
					classRect.style.setProperty("fill-opacity","0.03","");
					var color = classRect.style.getPropertyValue("fill");
					classRect.style.setProperty("stroke-opacity","0.2","");
					classRect.style.setProperty("stroke","black","");
					classRect.style.setProperty("stroke-width",map.Scale.normalX(0.3),"");
				}
				if ( !this.szFlag.match(/EXACT/) && !(this.szFlag.match(/DOMINANT/) && szLabel.length > 15) ){
					var szSize = ";font-size:"+map.Scale.normalX(nFontSize*0.9)+"px;";
					if ( n == 0 ){
						szLabel = (szLabel.length > 0)?(szMin+this.szUnit):szLabel;
						newText = map.Dom.newText(legendGroup,map.Scale.normalX(nXpos+2),map.Scale.normalY(nLinePos+nTextOff*(nStep+1.5)),szTextStyle+szSize,szLabel);
					}else if ( n == _indexA.length-nStep ){
						szLabel = (szLabel.length > 0)?(szMax+this.szUnit):szLabel;
						newText = map.Dom.newText(legendGroup,map.Scale.normalX(nXpos+2),map.Scale.normalY(nLinePos+nTextOff*(nStep+1.5)),szTextStyle+szSize,szLabel);
					}
				}
			}
			else {

				// symbol and text
				//
				if ( this.szFlag.match(/SYMBOL/) && this.szFlag.match(/EXACT/)  ){
					var nXoff = nSwatchWidth+2;

					var szText = String(this.partsA[i].nCount);
					if ( this.nSkipCount == 0 ){
						szText = String(Math.round(100/this.nCount*this.partsA[i].nCount)) + "%";
					}
					var nValueTextLen = szText.length*5/7*nFontSize;
					if ( (this.szTextPlacement == "dynamic") && (nValueTextLen < nSwatchWidth) ){
						nXoff -= String(this.partsA[i].nCount).length*5/7*nFontSize;
					}
					newText = map.Dom.newText(legendGroup,map.Scale.normalX(nXpos+nXoff),map.Scale.normalY(nLinePos+nTextOff+1),szTextStyle,szText);
					nXoff += nValueTextLen;

					if ( this.szSymbolsA[i] && this.szSymbolsA[i].match(/symbol/) ){
						var newShape  = map.Dom.constructNode('use',legendGroup,{'xlink:href':'#'+this.szSymbolsA[i]+":antizoomandpan"});
						newShape.setAttributeNS(null,"style","fill:"+this.colorScheme[nIndex]);
						newShape.fu.scale(0.5,0.5);
						newShape.fu.setPosition(map.Scale.normalX(nXpos+nXoff+10),map.Scale.normalY(nLinePos+nTextOff-3));
						nXoff += 20;
					}
					newText = map.Dom.newText(legendGroup,map.Scale.normalX(nXpos+nXoff),map.Scale.normalY(nLinePos+nTextOff),szTextStyle,"("+szLabel+")");
					newText.style.setProperty("fill","#bbbbdd","");
				}
				// only text
				//
				else{
					var nXoff = nSwatchWidth+4;
					if ( fSumSwatch ){
						var tValue = this.partsA[nIndex].nSum;
						if ( this.szFlag.match(/MORPH/) ){
							tValue = this.nOrigSumA[nIndex]*(this.nClipFrames-1-this.nActualFrame)/(this.nClipFrames-1) + this.nOrigSumA[nIndex+this.nOrigSumA.length/2]*this.nActualFrame/(this.nClipFrames-1);
						}
						if ( (this.szField100 && !this.szFlag.match(/SUM/)) || (this.szAggregation && !this.szAggregation.match(/sum/)) ){
							tValue /= this.partsA[nIndex].nCount;
						}
						szLabel = szLabel + "  (" + this.formatValue(tValue,1)+this.szUnit+")";
					}
					newText = map.Dom.newText(legendGroup,map.Scale.normalX(nXpos+nXoff),map.Scale.normalY(nLinePos+nTextOff),szTextStyle,szLabel);
					if ( this.fGrayNoMember && nClassCount == 0 && this.szFlag.match(/CHOROPLETHE/) ){
						newText.style.setProperty("fill","#bbbbdd","");
						classRect.style.setProperty("opacity","0.1","");
					}
				}
			}
			if ( this.szFlag.match(/BUFFER/) ){
				classRect.style.setProperty("fill-opacity",this.fillOpacity?this.fillOpacity:(this.nOpacity?this.nOpacity:0),"");
			}
			if ( this.szFieldsA.length == 1 || !this.szFlag.match(/CHART/) || (this.szFlag.match(/SYMBOL/) && this.szFlag.match(/EXACT/)) ){
				if ( this.szLegendStyle.match(/compact/) ){
					classRect.setAttributeNS(szMapNs,"tooltip",szLabel+" ("+nClassCount+" member(s))");
				}else{
					classRect.setAttributeNS(szMapNs,"tooltip",nClassCount+" member(s)");
				}

				// get actual classRect and set style for onover
				var szRectStyle = classRect.getAttributeNS(null,"style");
				classRect.setAttributeNS(szMapNs,"onoverstyle",szRectStyle+";stroke:black;stroke-width:"+map.Scale.normalX(0.5)+";");

				classRect.setAttributeNS(null,"onmouseover","map.Themes.markClass(evt,'"+this.szId+"','"+nIndex+"','"+nStep+"')");
				classRect.setAttributeNS(null,"onmouseout","map.Themes.unmarkClass(evt,'"+this.szId+"')");
				classRect.setAttributeNS(null,"onclick","map.Themes.zoomToClass(evt,'"+this.szId+"','"+nIndex+"','"+nStep+"')");
				classRect.setAttributeNS(null,"id",szDisplayId+":widget:classrect:"+nIndex);
			}
			else if ( this.szFlag.match(/SYMBOL/) ){
				if ( this.szFlag.match(/EXACT/) ){
					classRect.setAttributeNS(szMapNs,"tooltip",this.partsA[i].nCount+" ("+this.formatValue(this.partsA[i].nCount/this.nCount*100,1)+" %)");
				}
				else if ( this.szFlag.match(/SEQUENCE/) ){
					classRect.setAttributeNS(szMapNs,"tooltip",this.nOrigSumA[i]+" ("+this.formatValue(this.nOrigSumA[i]/this.nSum*100,1)+" %)");
				}
			}
			else if ( this.szFieldsA.length > 1 && !this.szFlag.match(/SEQUENCE/) ){
				if (this.nSum100){
					classRect.setAttributeNS(szMapNs,"tooltip",this.formatValue(100/this.nSum100*this.nOrigSumA[nIndex],1)+" %");
				}
				else if (this.nSum){
					classRect.setAttributeNS(szMapNs,"tooltip",this.nOrigSumA[nIndex]+" ("+this.formatValue(100/this.nSum*this.nOrigSumA[nIndex],1)+" %)");
				}
				classRect.setAttributeNS(null,"onmouseover","map.Themes.markClass(evt,'"+this.szId+"','"+nIndex+"','"+nStep+"')");
				classRect.setAttributeNS(null,"onmouseout","map.Themes.unmarkClass(evt,'"+this.szId+"')");
			}
		}
		// one swatch done 
		// ------------------
		if ( this.szLegendStyle.match(/compact/)){
			nXpos += nSwatchWidth;
		}else{
			nLinePos += nLineHeight*9/10;
		}
	}
	if ( this.szLegendStyle.match(/compact/) ){
		nLinePos += nLineHeight*nStep*2;
	}else
	if ( this.nNoData ){
		nLinePos += nLineHeight*1.5/10;
		classRect = map.Dom.newShape('rect',legendGroup,0,map.Scale.normalY(nLinePos),map.Scale.normalX(nSwatchWidth),map.Scale.normalY(nSwatchHeight),"fill:"+(this.szNoDataColor?this.szNoDataColor:"#ffffff")+";stroke:#000000;stroke-width:"+map.Scale.normalX(0.1)+";");
		classRect.setAttributeNS(szMapNs,"tooltip",this.nNoData+" member(s)");
		classRect.setAttributeNS(null,"onmouseover","map.Themes.markClass(evt,'"+this.szId+"','"+nIndex+"')");
		classRect.setAttributeNS(null,"onmouseout","map.Themes.unmarkClass(evt,'"+this.szId+"')");
		newText = map.Dom.newText(legendGroup,map.Scale.normalX(22),map.Scale.normalY(nLinePos+nTextOff),szTextStyle,map.Dictionary.getLocalText("no data"));
		nLinePos += nLineHeight*9/10;
	}

	if ( scrollObj ){
		scrollObj.setWidth(-1);
		scrollObj.setHeight(Math.min(nLinePos+nLineHeight,(map.Scale.bBox.height/map.Scale.normalY(2.2))));
		if ( this.nClipColorLegend ){
			scrollObj.setHeight(this.nClipColorLegend);
		}
		scrollObj.reformat();
		if ( scrollObj.hasScrollBars() ){
			legendGroup.style.setProperty("display","none","");
			map.Dom.newShape('rect',targetGroupp,0,0,map.Scale.normalX(scrollObj.getWidth()),map.Scale.normalY(scrollObj.getHeight()),"fill:none;stroke:none;");
		}
	}

	return legendGroup;
};


/**
 *	
 * Display the info pane for a realized map theme
 *
 */

MapTheme.prototype.showInfo = function(){

	_TRACE("== MapTheme.showInfo("+this.szId+")===> ");

	if ( this.szFlag.match(/NOINFO/) ){
		return;
	}
	if ( this.nCount == 0 ){
		return;
	}
	if ( this.widgetNode && !this.fRedrawInfo ){
		return;
	}
	this.fRedrawInfo = false;

	var nTopMargin      = 5;
	var nLeftMargin     = 5;
	var nRightMargin    = 10;
	var nBottomMargin   = 5;

	var nFontSize       = 12;
	var nSwatchHeight   = 12;
	var nSwatchWidth    = 18;

	var legendParamNode = SVGDocument.getElementById("legend:param");
	if ( legendParamNode ){
		nFontSize	  = Number(legendParamNode.getAttributeNS(szMapNs,"fontsize"));
		nSwatchHeight = Number(legendParamNode.getAttributeNS(szMapNs,"swatchheight"));
		nSwatchWidth  = Number(legendParamNode.getAttributeNS(szMapNs,"swatchwidth"));
	}

	var szLineStyle		= "fill:none;stroke:darkblue;stroke-width:"+map.Scale.normalX(1)+";opacity:1.0";
	var szLineBgStyle	= "fill:none;stroke:white;stroke-width:"+map.Scale.normalX(5)+";opacity:0.5";
	var szFillBgStyle	= "fill:white;stroke:blue;stroke-width:"+map.Scale.normalX(0.1)+";opacity:0.8";
	var szShadowStyle	= "fill:#444444;stroke:none;opacity:0.2";
	var szTextStyle		= "font-family:arial;font-size:"+map.Scale.normalY(nFontSize)+"px;fill:black;pointer-events:none;";

	var szDisplayId = this.szId+":display:widget";
	var displayGroup = null;
	var fPositionInfo = true;
	var chartButtonObj = null;
	var closeButtonObj = null;
	var openButtonObj = null;
	var moreButtonObj = null;
		
	// get or make info widget
	// -----------------------
	if ( this.widgetNode ){
		displayGroup = this.widgetNode.firstChild;
		map.Dom.clearGroup(displayGroup);
		if ( !this.fRepositionInfo ){
			fPositionInfo = false;
		}
		this.fRepositionInfo = false;
		szDisplayId = this.widgetNode.getAttributeNS(null,"id");
		szDisplayId = szDisplayId.substr(0,szDisplayId.length-8);
		this.enable();
	}
	else{
		displayGroup = map.Dom.newGroup(SVGThemeGroup,szDisplayId+":movable");
		if ( this.szFlag.match(/BUBBLE/) ){
			displayGroup.setAttributeNS(szMapNs,"menu","thememenu");
		}else if ( this.szFlag.match(/DOMINANT/) ){
			displayGroup.setAttributeNS(szMapNs,"menu","chartmenu");
		}else if ( this.szFlag.match(/CHART/) ){
			displayGroup.setAttributeNS(szMapNs,"menu","chartmenu");
		}else{
			displayGroup.setAttributeNS(szMapNs,"menu","thememenu");
		}
		// forward mouse events to the 
		new Widget(displayGroup,this);
		this.widgetNode = displayGroup;
		displayGroup = map.Dom.newGroup(displayGroup,szDisplayId+":workspace:noobject");
}

	// preparations
	// -----------------------
	var nLine = 0;
	var nLineHeight = nFontSize*3/2;
	var nTextOff = nFontSize*7/8;
	var nLinePos = nLine*nLineHeight;

	var bgRect   = map.Dom.newShape('rect',displayGroup,0,0,1,1,szFillBgStyle);
	bgRect.setAttributeNS(null,"id",szDisplayId+":backgroundrect:noobject");
	bgRect.setAttributeNS(null,"rx",map.Scale.normalX(3));
	bgRect.setAttributeNS(null,"ry",map.Scale.normalX(3));

	var szThemesText = this.szThemes;
	if (szThemesText.length > 30){
		szThemesText = szThemesText.substr(0,30)+"...";
	}

	// ----------------------------------------------------
	// Title 
	// ----------------------------------------------------

	var fToggleButtonInTitle = false;

	nLinePos += nLineHeight*0.2;

	var nTitleX = fToggleButtonInTitle?12:10;
	var titleGroup = map.Dom.newGroup(displayGroup,szDisplayId+":title");
	var  oldTextStyle = szTextStyle;
	szTextStyle = map.Scale.tStyle?map.Scale.tStyle.ContainerTitle.szStyle:"";
	if (this.szTitle){
		var newText = map.Dom.newText(titleGroup,map.Scale.normalX(nTitleX),map.Scale.normalY(nLinePos+nTextOff),szTextStyle,this.szTitle);
		nLinePos += nLineHeight;
	}
	else{
		var newText = map.Dom.newText(titleGroup,map.Scale.normalX(nTitleX),map.Scale.normalY(nLinePos+nTextOff),szTextStyle,"Theme: "+szThemesText);
		nLinePos += nLineHeight;
		map.Dom.newText(titleGroup,map.Scale.normalX(0),map.Scale.normalY(nLinePos+nTextOff),szTextStyle,"Value: "+this.szFields);
		nLinePos += nLineHeight;
	}
	szTextStyle = oldTextStyle;
	map.Dom.newShape('rect',titleGroup,newText.fu.getTextLength()+map.Scale.normalX(30),map.Scale.normalY(nLinePos+nTextOff),1,1,"fill:none;stroke:none");
	nLinePos += nLineHeight/5;
	displayGroup.setAttributeNS(szMapNs,"titleheight",String(map.Scale.normalY(nLinePos)));

	if ( 0 && fToggleButtonInTitle ){
		var buttonObj = new Button(titleGroup,this.szId,"CHECKBOX|SELECTED",""
									,"map.Themes.toggleChartDisplay(evt,'"+this.szId+"',1)"
									,"map.Themes.toggleChartDisplay(evt,'"+this.szId+"',0)"
									,"show/hide objects");
		buttonObj.setPosition(0,map.Scale.normalY(3));
	}

	// ----------------------------------------------------
	// snippet 
	// ----------------------------------------------------

	if (this.szSnippetn && map.Scale.tStyle ){
		var  oldTextStyle = szTextStyle;
		szTextStyle = map.Scale.tStyle.Snippet.szStyle;
		nLinePos += 1;
		var newText = map.Dom.newText(titleGroup,map.Scale.normalX(nTitleX),map.Scale.normalY(nLinePos+2),szTextStyle,this.szSnippet);
		nLinePos += map.Scale.tStyle.Snippet.nFontHeight/map.Scale.normalY(1)+1;
		szTextStyle = oldTextStyle;
	}
	// ----------------------------------------------------
	// Body 
	// ----------------------------------------------------

	var bodyGroup = map.Dom.newGroup(displayGroup,szDisplayId+":body");
	bodyGroup.fu.setPosition(0,map.Scale.normalY(nLinePos));
	bodyGroup.fu.scale(1/map.Scale.getEmbedScale(),1/map.Scale.getEmbedScale());

	nLinePos = 0;

	// ----------------------------------------------------
	// chart 
	// ----------------------------------------------------

	var nChartSize = 30;

	var szMin = null;
	var szMax = null;
	var szMembers = null;
	if ( 0 && this.szFlag.match(/BUBBLE/) ){
		this.partsA.length = 1;
	}
	// squeeze color legend if we have horizontal bars with many bars
	if ( this.nOrigSumA.length > 1 && this.szFlag.match(/BAR/) && this.szFlag.match(/HOR/) && !this.szFlag.match(/SPACED/) && !this.szFlag.match(/STACKED/) ){
		if ( this.nOrigSumA.length*nLineHeight > nChartSize*2 ){
			nLineHeight = nFontSize;
		}
	}

	// draw color scheme legend 
	// ----------------------------------------------------
	var drawColorSchemeLegend = true;
	var legendGroup = null;

	if (this.szFlag.match(/CHART/) && !this.szFlag.match(/EXACT/) && (this.nOrigSumA.length != this.colorScheme.length) && (this.colorScheme.length <= 2)){
		drawColorSchemeLegend = false;
	}
	// GR 14.02.2013 exception +/ mean chart 
	if ( this.szFlag.match(/CHART/) && this.szFlag.match(/OFFSETMEAN/) ){
		drawColorSchemeLegend = true;
	}

	if ( drawColorSchemeLegend ){
		legendGroup = this.drawColorSchemeLegend(bodyGroup,szDisplayId);
	}

	var textBox = map.Dom.getBox(bodyGroup);

	if ( !drawColorSchemeLegend || this.showInfoMore || this.szFlag.match(/UP/) ){

		var hBox = new box(0,0,0,0);
		var histogramGroup = null;

		if ( this.szFlag.match(/CHOROPLETHE/) && !this.szFlag.match(/DOMINANT/) ){
			var histogramGroup = map.Dom.newGroup(bodyGroup,"histogram"+String(Math.random()));
			histogramGroup.fu.setPosition((textBox.width>0?textBox.width+map.Scale.normalX(15):0),map.Scale.normalY(15));
			histogramGroup.fu.scale(2,2);
			map.Themes.getHistogram(null,histogramGroup,"DISTRIBUTION|INTERACTIVE",this);
			hBox = map.Dom.getBox(histogramGroup);
			hBox.height += map.Scale.normalX(30);
		}

		if ( !this.szFlag.match(/OFFSETMEAN/) ){
			var targetGroup = map.Dom.newGroup(bodyGroup,"donut"+String(Math.random()));
			targetGroup.fu.setPosition((textBox.width>0?textBox.width+map.Scale.normalX(15):map.Scale.normalX(5)),map.Scale.normalX(10)+hBox.height);
			targetGroup.fu.scale(0.75,0.75);
			this.getOverviewChart(targetGroup,szDisplayId);
		}
		// magic, the below is not working if we have no histogram
		if ( histogramGroup ){
			cBox = map.Dom.getBox(targetGroup);
			targetGroup.fu.setPosition((textBox.width>0?textBox.width+map.Scale.normalX(15):0)-cBox.x/2,map.Scale.normalX(10)-cBox.y+hBox.height);
		}
	}
	textBox = map.Dom.getBox(displayGroup);

	// button to change the chart type
	// ------------------------------------
	if(0){
	if ( !(this.szFlag.match(/CHART/) && this.szFlag.match(/BUFFER/)) ){
		chartButtonObj = new Button(bodyGroup,szDisplayId+":chartselectbutton","BUTTON",'#chartselect_button'
									,"map.Themes.chartTypeMenu(evt,'"+this.szId+"','"+szDisplayId+"','"+this.szOrigFlag+"')"
									,""
									,"change chart type");
		chartButtonObj.setPosition(textBox.width,map.Scale.normalY(nLinePos));
		chartButtonObj.scale(1.2,1.2);
	}
	}
	// ----------------------------------------------------
	// Footer 
	// ----------------------------------------------------

	textBox = map.Dom.getBox(displayGroup);

	var nButtonSize = map.Scale.normalX(map.Scale.nButtonSize);
	var nFontSize = map.Scale.normalY(map.Scale.nButtonSize*0.6);
	var szButtonFontStyle = "font-family:arial;font-size:"+nFontSize+"px;fill:#666666;baseline-shift:-30%;pointer-events:none";

	// GR 09.03.2012 hide buttons and show only on mouseover
	var infoButtonGroup = map.Dom.newGroup(displayGroup,szDisplayId+":infobuttons");

	var footerGroup = map.Dom.newGroup(infoButtonGroup,szDisplayId+":footer");
	footerGroup.fu.setPosition(0,textBox.height);

	if ( this.szFlag.match(/CLIP/) ){
		footerGroup.fu.setPosition(0,textBox.height+map.Scale.normalX(10));
		var frameSlider = map.Dom.newGroup(displayGroup,szDisplayId+":frameslider"); 

		clipButtonObj = new Button(frameSlider,szDisplayId+":clipstartbutton","BUTTON",'#start_button'
									,"map.Themes.startClip('"+this.szId+"')"
									,""
									,"start clip");
		clipButtonObj.setPosition(map.Scale.normalX(3),map.Scale.normalX(10));
		clipButtonObj.scale(0.8,0.8);
		clipButtonObj.nodeObj.style.setProperty("display","none","");


		clipButtonObj = new Button(frameSlider,szDisplayId+":clippausebutton","BUTTON",'#pause_button'
									,"map.Themes.pauseClip('"+this.szId+"')"
									,""
									,"pause clip");
		clipButtonObj.setPosition(map.Scale.normalX(3),map.Scale.normalX(10));
		clipButtonObj.scale(0.8,0.8);

		frameSlider.fu.setPosition(map.Scale.normalX(15),textBox.height);
		var nSliderWidth  = textBox.width-map.Scale.normalX(30);
		var nSliderHeight = map.Scale.normalY(5);
		var szSliderTrackStyle = "fill:lightgray;stroke:none;";
		var szSliderThumbStyle = "fill:darkgray;stroke:none";
		map.Dom.newShape('rect',frameSlider,map.Scale.normalX(11),map.Scale.normalY(10)-nSliderHeight*0.5,nSliderWidth,nSliderHeight,szSliderTrackStyle);
		var nProgress = nSliderWidth/this.nClipFrames*(this.nActualFrame+1);
		map.Dom.newShape('rect',frameSlider,map.Scale.normalX(11),map.Scale.normalY(10)-nSliderHeight*0.5,nProgress,nSliderHeight,szSliderThumbStyle);

	}

	if ( this.showInfoMore || (this.parent.autoHideInfoTools) ){

		// make size and fade buttons for chart themes
		// --------------------------------------------
		if ( this.szFlag.match(/CHART/) ){

			var newText = null;
			var buttonGroup = null;
			var buttonObj = null;

			var nXpos = map.Scale.normalX(map.Scale.nButtonSize/2);
			var nYpos = map.Scale.normalY(map.Scale.nButtonSize+7);

			if ( !fToggleButtonInTitle ){
				buttonObj = new Button(footerGroup,this.szId,"CHECKBOX|SELECTED",""
											,"map.Themes.toggleChartDisplay(evt,'"+this.szId+"',1)"
											,"map.Themes.toggleChartDisplay(evt,'"+this.szId+"',0)"
											,"show/hide objects");
				buttonObj.setPosition(nXpos,nYpos);
				buttonObj.scale(0.8,0.8);
				nXpos += map.Scale.normalX(25);
			}

			// buttons to change the opacity 
			// -----------------------------
			nXoff = 0;
			buttonGroup = map.Dom.newGroup(footerGroup,"opacitybuttons"+String(Math.random()));
			buttonObj = new Button(buttonGroup,this.szId,"BUTTON",'#minus_button'
										,"map.Themes.changeChartOpacity(evt,'"+this.szId+"',0.66)"
										,""
										,"fade out");
			buttonObj.scale(1,1);
			buttonObj.setPosition(nXoff,0);
			nXoff += map.Scale.normalX(11);

			newText = map.Dom.newText(buttonGroup,nXoff,0,szButtonFontStyle,map.Dictionary.getLocalText("opacity"));
			nXoff += newText.fu.getTextLength()+map.Scale.normalX(11);

			buttonObj = new Button(buttonGroup,this.szId,"BUTTON",'#plus_button'
										,"map.Themes.changeChartOpacity(evt,'"+this.szId+"',1.5)"
										,""
										,"fade in");
			buttonObj.scale(1,1);
			buttonObj.setPosition(nXoff,0);
			nXoff += map.Scale.normalX(10);

			// checkbox to change the text 
			// -----------------------------
			if (!this.szFlag.match(/PIE/)){
				nXoff += map.Scale.normalX(10);
				buttonObj = new Button(buttonGroup,this.szId+":text","CHECKBOX"+(this.szFlag.match(/VALUES/)?"|SELECTED":""),""
											,"map.Themes.toggleValueDisplay(evt,'"+this.szId+":text"+"',1)"
											,"map.Themes.toggleValueDisplay(evt,'"+this.szId+":text"+"',0)"
											,"text values");
				buttonObj.setPosition(nXoff,0);
				buttonObj.scale(0.8,0.8);
				nXoff += map.Scale.normalX(12);

				newText = map.Dom.newText(buttonGroup,nXoff,0,szButtonFontStyle,map.Dictionary.getLocalText("values"));
				nXoff += newText.fu.getTextLength()+map.Scale.normalX(7);
			}
			buttonGroup.fu.setPosition(nXpos,nYpos);
			nMinXpos = nXpos = nXpos + nXoff + map.Scale.normalX(6);
			nXoff = 0;

			// buttons to change the scaling 
			// -----------------------------

			// GR 26.08.2007 extended for buffer themes
			var nFactorMinus = 0.9;
			var nFactorPlus = 1.1;
			if ( this.szFlag.match(/BUFFER/) ){
				var nBufferStep = this.nBufferSizeStep?(this.nBufferSizeStep/this.nBufferSize):0.1;
				nFactorMinus = 1 - nBufferStep / this.nScale;
				nFactorPlus = 1 + nBufferStep / this.nScale;
			}

			buttonGroup = map.Dom.newGroup(footerGroup,"sizebuttons"+String(Math.random()));
			buttonObj = new Button(buttonGroup,this.szId,"BUTTON",'#minus_button'
										,"map.Themes.changeChartScaling(evt,'"+this.szId+"',"+nFactorMinus+")"
										,""
										,"smaller charts");
			buttonObj.scale(1,1);
			buttonObj.setPosition(nXoff,0);
			nXoff += map.Scale.normalX(12);

			newText = map.Dom.newText(buttonGroup,nXoff,0,szButtonFontStyle,map.Dictionary.getLocalText("size"));
			nXoff += newText.fu.getTextLength()+map.Scale.normalX(12);

			buttonObj = new Button(buttonGroup,this.szId,"BUTTON",'#plus_button'
										,"map.Themes.changeChartScaling(evt,'"+this.szId+"',"+nFactorPlus+")"
										,""
										,"bigger charts");
			buttonObj.scale(1,1);
			buttonObj.setPosition(nXoff,0);

			buttonGroup.fu.setPosition(nXpos+map.Scale.normalX(5),nYpos);
			nMinXpos = nXpos = nXpos + nXoff + map.Scale.normalX(map.Scale.nButtonSize);

			if ( this.showInfoMore && !this.szFlag.match(/BUFFER/) && !this.szFlag.match(/SYMBOL/) ){

				// chart variation SIZE, HEIGHT 

				nYpos -= map.Scale.normalY(4);

				var nSize = (this.szFlag.match(/STARBURST/)||this.szFlag.match(/BAR/))?30:20;

				var chartButton = this.chartButton(footerGroup,nSize,"");
				var ptPos = chartButton.fu.getPosition();
				var bBox  = chartButton.fu.getBox();
				chartButton.fu.setPosition(nMinXpos+ptPos.x,nYpos+ptPos.y);
				var szParam = "";
				if ( this.szFlag.match(/BUBBLE/) || this.szFlag.match(/SQUARE/) || this.szFlag.match(/LABEL/)  ){
					szParam = "FIXSIZE";
				}
				chartButton.setAttributeNS(null,"onclick","map.Themes.setChartSizeType(evt,'"+this.szId+"','"+szParam+"')");

				nMinXpos += bBox.width + map.Scale.normalX(10);

				var chartButton = this.chartButton(footerGroup,nSize,"SIZE");
				var ptPos = chartButton.fu.getPosition();
				var bBox  = chartButton.fu.getBox();
				chartButton.fu.setPosition(nMinXpos+ptPos.x,nYpos+ptPos.y);
				chartButton.setAttributeNS(null,"onclick","map.Themes.setChartSizeType(evt,'"+this.szId+"','SIZE')");

				nMinXpos += bBox.width + map.Scale.normalX(10);

				if ( this.szFlag.match(/BAR/) || this.szFlag.match(/PIE/) || this.szFlag.match(/DONUT/) ){
					if ( this.szFlag.match(/3D/) ){
						var chartButton = this.chartButton(footerGroup,nSize,"HEIGHT");
						var ptPos = chartButton.fu.getPosition();
						var bBox  = chartButton.fu.getBox();
						chartButton.fu.setPosition(nMinXpos+ptPos.x,nYpos+ptPos.y);
						chartButton.setAttributeNS(null,"onclick","map.Themes.setChartSizeType(evt,'"+this.szId+"','HEIGHT')");

						nMinXpos += bBox.width + map.Scale.normalX(10);

						var chartButton = this.chartButton(footerGroup,nSize,"2D");
						var ptPos = chartButton.fu.getPosition();
						chartButton.fu.setPosition(nMinXpos+ptPos.x,nYpos+ptPos.y);
						chartButton.setAttributeNS(null,"onclick","map.Themes.setChartSizeType(evt,'"+this.szId+"','2D')");
					}else{
						var chartButton = this.chartButton(footerGroup,nSize,"3D");
						var ptPos = chartButton.fu.getPosition();
						chartButton.fu.setPosition(nMinXpos+ptPos.x,nYpos+ptPos.y);
						chartButton.setAttributeNS(null,"onclick","map.Themes.setChartSizeType(evt,'"+this.szId+"','3D')");
					}
				}
				nYpos += map.Scale.normalY(6);
			}
		}

		// make mode,class ... change buttons for choroplethe themes
		// ----------------------------------------------------------
		else {

			var nXpos = map.Scale.normalX(0);
			var nYpos = map.Scale.normalY(map.Scale.nButtonSize+7);

			var szText = null;
			var szType = "TEXTBUTTON";
			var newText = null;
			var tLen   = 0;

			if ( this.szFlag.match(/DOMINANT/) ){
				szText = map.Dictionary.getLocalText("Filter: ");
				newText = map.Dom.newText(footerGroup,nXpos,nYpos,szButtonFontStyle,szText);
				nXpos += newText.fu.getTextLength()  + nFontSize/2;

				if ( this.szFlag.match(/PERCENTOFMEAN/) ){
					szText = map.Dictionary.getLocalText("% of mean ");
					newText = map.Dom.newText(footerGroup,nXpos,nYpos,szButtonFontStyle,szText);
					nXpos += newText.fu.getTextLength()  + nFontSize/2;
				}
				else if ( this.szFlag.match(/PERCENTOFMEDIAN/) ){
					szText = map.Dictionary.getLocalText("% of median ");
					newText = map.Dom.newText(footerGroup,nXpos,nYpos,szButtonFontStyle,szText);
					nXpos += newText.fu.getTextLength()  + nFontSize/2;
				}
				else{
					// display method (buttons)
					// ------------------------
					szText = map.Dictionary.getLocalText("min");
					szType = this.szDominantFilter == "min"?"TEXTBUTTON|SELECTED":"TEXTBUTTON";
					buttonObj = new Button(footerGroup,this.szId,szType,szText
												,"map.Themes.changeThemeStyle(evt,'"+this.szId+"','filter:min;dfilter:0')"
												,""
												,"change method");
					buttonObj.setPosition(nXpos,nYpos);
					nXpos += buttonObj.bBox.width;

					szText = map.Dictionary.getLocalText("mean");
					tLen  = nFontSize/2*szText.length;
					szType = this.szDominantFilter == "mean"?"TEXTBUTTON|SELECTED":"TEXTBUTTON";
					buttonObj = new Button(footerGroup,this.szId,szType,szText
												,"map.Themes.changeThemeStyle(evt,'"+this.szId+"','filter:mean;dfilter:0')"
												,""
												,"change method");
					buttonObj.setPosition(nXpos,nYpos);
					nXpos += buttonObj.bBox.width;
					nXpos += map.Scale.normalX(2);
				}

				szText = map.Dictionary.getLocalText("+");
				newText = map.Dom.newText(footerGroup,nXpos,nYpos,szButtonFontStyle,szText);
				nXpos += newText.fu.getTextLength()  + nFontSize/2;

				for ( var i=0; i<=90; i+=10 ){
					szType = ( i == this.nDominantDFilter )?"TEXTBUTTON|SELECTED":"TEXTBUTTON";
					buttonObj = new Button(footerGroup,this.szId,szType, (i>0?".":"")+String(i/10) // (i>=0?"+":"")+String(i)
												,"map.Themes.changeThemeStyle(evt,'"+this.szId+"','dfilter:"+String(i)+"')"
												,""
												,"add "+String(i/100)+"*max.value to the filter");
					buttonObj.setPosition(nXpos,nYpos);

					nXpos += buttonObj.bBox.width;
				}
				szText = map.Dictionary.getLocalText("[max]");
				newText = map.Dom.newText(footerGroup,nXpos,nYpos,szButtonFontStyle,szText);
				nXpos += newText.fu.getTextLength()  + nFontSize/2;
			}
			else if ( this.szFlag.match(/DOMINANTXXX/) ){
				szText = map.Dictionary.getLocalText("Filter: ")+map.Dictionary.getLocalText(this.szDominantFilter);
				newText = map.Dom.newText(footerGroup,nXpos,nYpos,szButtonFontStyle,szText);
				nXpos += newText.fu.getTextLength()  + nFontSize/2;

				for ( var i=0; i<=90; i+=10 ){
					var szType = "TEXTBUTTON";
					if ( i == this.nDominantDFilter ){
						szType += "|SELECTED";
					}
					buttonObj = new Button(footerGroup,this.szId,szType,"."+String(i/10)
												,"map.Themes.changeThemeStyle(evt,'"+this.szId+"','dfilter:"+String(i)+"')"
												,""
												,"set lower limit in % of maximum");
					buttonObj.setPosition(nXpos,nYpos);

					nXpos += buttonObj.bBox.width;
				}
				szText = map.Dictionary.getLocalText("max");
				newText = map.Dom.newText(footerGroup,nXpos,nYpos,szButtonFontStyle,szText);
				nXpos += newText.fu.getTextLength()  + nFontSize/2;
			}
			else if ( !this.szFlag.match(/BUBBLE/) ){

				if ( Number(this.origColorScheme[0]) ){

					// display classes (buttons)
					// -------------------------
					szText = map.Dictionary.getLocalText("classes")+":";
					newText = map.Dom.newText(footerGroup,nXpos,nYpos,szButtonFontStyle,szText);
					nXpos += newText.fu.getTextLength()  + nFontSize/2;

					for ( var i=2; i<=20; i++ ){
						if ( i>10 && (i%10 != 0) ){
							continue;
						}
						var szType = "TEXTBUTTON";
						if ( i == this.partsA.length ){
							szType += "|SELECTED";
						}
						buttonObj = new Button(footerGroup,this.szId,szType,String(i)
													,"map.Themes.changeThemeStyle(evt,'"+this.szId+"','classes:"+String(i)+"')"
													,""
													,"change classes");
						buttonObj.setPosition(nXpos,nYpos);

						nXpos += buttonObj.bBox.width;
					}
					nXpos += nFontSize;
				}
				else{
					// buttons to change the opacity 
					// -----------------------------
					buttonGroup = map.Dom.newGroup(footerGroup,"sizebuttons"+String(Math.random()));
					nXpos = map.Scale.normalX(8);
					buttonObj = new Button(buttonGroup,this.szId,"BUTTON",'#minus_button'
												,"map.Themes.changeChartOpacity(evt,'"+this.szId+"',0.66)"
												,""
												,"fade out");
					buttonObj.scale(1,1);
					buttonObj.setPosition(nXpos,nYpos);
					nXpos += map.Scale.normalX(12);

					newText = map.Dom.newText(buttonGroup,nXpos,nYpos,szButtonFontStyle,map.Dictionary.getLocalText("opacity"));
					nXpos += newText.fu.getTextLength()+map.Scale.normalX(12);

					buttonObj = new Button(buttonGroup,this.szId,"BUTTON",'#plus_button'
												,"map.Themes.changeChartOpacity(evt,'"+this.szId+"',1.5)"
												,""
												,"fade in");
					buttonObj.scale(1,1);
					buttonObj.setPosition(nXpos,nYpos);

					nXpos += nButtonSize*1.5;
				}

				// display method (buttons)
				// ------------------------
				if ( !this.szFlag.match(/QUANTILE/) && !this.szFlag.match(/LOG/) && !this.szRanges ){
					this.szFlag += "|EQUIDISTANT";
				}
				szText = map.Dictionary.getLocalText("equidistant");
				szType = (!this.szRanges && this.szFlag.match(/EQUIDISTANT/))?"TEXTBUTTON|SELECTED":"TEXTBUTTON";
				buttonObj = new Button(footerGroup,this.szId,szType,szText
											,"map.Themes.changeThemeStyle(evt,'"+this.szId+"','type:CHOROPLETHE|EQUIDISTANT')"
											,""
											,"change method");
				buttonObj.setPosition(nXpos,nYpos);
				nXpos += buttonObj.bBox.width;

				szText = map.Dictionary.getLocalText("log");
				tLen  = nFontSize/2*szText.length;
				szType = (!this.szRanges && this.szFlag.match(/LOG/))?"TEXTBUTTON|SELECTED":"TEXTBUTTON";
				buttonObj = new Button(footerGroup,this.szId,szType,szText
											,"map.Themes.changeThemeStyle(evt,'"+this.szId+"','type:CHOROPLETHE|LOG')"
											,""
											,"change method");
				buttonObj.setPosition(nXpos,nYpos);
				nXpos += buttonObj.bBox.width;

				szText = map.Dictionary.getLocalText("quantile");
				tLen  = nFontSize/2*szText.length;
				szType = (!this.szRanges && this.szFlag.match(/QUANTILE/))?"TEXTBUTTON|SELECTED":"TEXTBUTTON";
				buttonObj = new Button(footerGroup,this.szId,szType,szText
											,"map.Themes.changeThemeStyle(evt,'"+this.szId+"','type:CHOROPLETHE|QUANTILE')"
											,""
											,"change method");
				buttonObj.setPosition(nXpos,nYpos);
				nXpos += buttonObj.bBox.width;

				if ( this.szRanges || this.szOldRanges ){
					szText = map.Dictionary.getLocalText("ranges");
					tLen  = nFontSize/2*szText.length;
					szType = this.szRanges?"TEXTBUTTON|SELECTED":"TEXTBUTTON";
					buttonObj = new Button(footerGroup,this.szId,szType,szText
												,"map.Themes.changeThemeStyle(evt,'"+this.szId+"','type:CHOROPLETHE|RANGES')"
												,""
												,"change method");
					buttonObj.setPosition(nXpos,nYpos);
					nXpos += buttonObj.bBox.width;
				}
			}

			// buttons to change the opacity 
			// -----------------------------
			if ( Number(this.origColorScheme[0]) ){
				nXpos = map.Scale.normalX(8);
				nYpos += nFontSize+map.Scale.normalY(9);

				buttonGroup = map.Dom.newGroup(footerGroup,"sizebuttons"+String(Math.random()));
				buttonObj = new Button(buttonGroup,this.szId,"BUTTON",'#minus_button'
											,"map.Themes.changeChartOpacity(evt,'"+this.szId+"',0.66)"
											,""
											,"fade out");
				buttonObj.scale(1,1);
				buttonObj.setPosition(nXpos,nYpos);
				nXpos += map.Scale.normalX(11);

				newText = map.Dom.newText(buttonGroup,nXpos,nYpos,szButtonFontStyle,map.Dictionary.getLocalText("opacity"));
				nXpos += newText.fu.getTextLength()+map.Scale.normalX(10);

				buttonObj = new Button(buttonGroup,this.szId,"BUTTON",'#plus_button'
											,"map.Themes.changeChartOpacity(evt,'"+this.szId+"',1.5)"
											,""
											,"fade in");
				buttonObj.scale(1,1);
				buttonObj.setPosition(nXpos,nYpos);
				nXpos += nButtonSize;
			}

			// checkbox to change the value display 
			// ------------------------------------
			if (1){
				nXpos += map.Scale.normalX(10);
				buttonObj = new Button(footerGroup,this.szId+":text","CHECKBOX"+(this.szFlag.match(/VALUES/)?"|SELECTED":""),""
											,"map.Themes.toggleValueDisplay(evt,'"+this.szId+":text"+"',1)"
											,"map.Themes.toggleValueDisplay(evt,'"+this.szId+":text"+"',0)"
											,"text values");
				buttonObj.setPosition(nXpos,nYpos);
				buttonObj.scale(0.9,0.9);
				nXpos += map.Scale.normalX(12);

				newText = map.Dom.newText(footerGroup,nXpos,nYpos,szButtonFontStyle,map.Dictionary.getLocalText("values"));
				nXpos += newText.fu.getTextLength()+map.Scale.normalX(8);
			}
			// checkbox to change the dynamic opacity flag
			// -------------------------------------------
			if (1){
				nXpos += map.Scale.normalX(10);
				buttonObj = new Button(footerGroup,this.szId+":dopacity","CHECKBOX"+(this.szFlag.match(/DOPACITY/)?"|SELECTED":""),""
											,"map.Themes.toggleDopacity(evt,'"+this.szId+":dop"+"',1)"
											,"map.Themes.toggleDopacity(evt,'"+this.szId+":dop"+"',0)"
											,"dynamic opacity");
				buttonObj.setPosition(nXpos,nYpos);
				buttonObj.scale(0.9,0.9);
				nXpos += map.Scale.normalX(12);

				newText = map.Dom.newText(footerGroup,nXpos,nYpos,szButtonFontStyle,map.Dictionary.getLocalText("dyn.opacity"));
				nXpos += newText.fu.getTextLength()+map.Scale.normalX(8);
			}

			// button to change the dynamic opacity 
			// -------------------------------------------
			if (1){
				nXpos += map.Scale.normalX(5);
				buttonGroup = map.Dom.newGroup(footerGroup,"dopacitybuttons"+String(Math.random()));
				buttonObj = new Button(buttonGroup,this.szId,"BUTTON",'#minus_button'
											,"map.Themes.changeDopacityAlphaRamp(evt,'"+this.szId+"',(2/3))"
											,""
											,"fade out");
				buttonObj.scale(1,1);
				buttonObj.setPosition(nXpos,nYpos);
				nXpos += nButtonSize*1.1;

				buttonObj = new Button(buttonGroup,this.szId,"BUTTON",'#plus_button'
											,"map.Themes.changeDopacityAlphaRamp(evt,'"+this.szId+"',(3/2))"
											,""
											,"fade in");
				buttonObj.scale(1,1);
				buttonObj.setPosition(nXpos,nYpos);

				nXpos += nFontSize*2;
			}
			textBox.width = Math.max(textBox.width,nXpos-nFontSize/2);
		}

		// button to change the chart type
		// ------------------------------------
		if ( this.szFlag.match(/DOMINANT/) ){
			chartButtonObj = new Button(footerGroup,szDisplayId+":chartcolorbutton","BUTTON",'#tools_button'
										,"map.Themes.chartColorMenu(evt,'"+this.szId+"','"+szDisplayId+"','"+this.szOrigFlag+"')"
										,""
										,"change chart color");
			chartButtonObj.scale(1.2,1.2);
		}
		else if ( !(this.szFlag.match(/CHART/) && this.szFlag.match(/BUFFER/)) ){
			chartButtonObj = new Button(footerGroup,szDisplayId+":chartselectbutton","BUTTON",'#tools_button'
										,"map.Themes.chartTypeMenu(evt,'"+this.szId+"','"+szDisplayId+"','"+this.szOrigFlag+"')"
										,""
										,"change chart type");
			chartButtonObj.scale(1.2,1.2);
		}
		this.chartbutton = chartButtonObj;
		
		szText = map.Dictionary.getLocalText("close");
		tLen  = nFontSize/2*szText.length;
		szType = "TEXTBUTTON";
		closeButtonObj = new Button(footerGroup,this.szId,"BUTTON",this.showInfoMore?'#minus_button':'#plus_button'
									,"map.Themes.toggleMore(evt,'"+this.szId+"')"
									,""
									,"hide tools");
		closeButtonObj.setPosition((textBox.width-map.Scale.normalX(25)),buttonObj.getPosition().y-map.Scale.normalY(10));
		closeButtonObj.scale(1.0,1.0);

		this.morebutton = closeButtonObj;
		}
	else{
		var nYpos = map.Scale.normalY(0);
		szText = map.Dictionary.getLocalText("more");
		tLen  = nFontSize/2*szText.length;
		szType = "TEXTBUTTON";

		szButton = 'plus_button';
		nButtonOpacity = 0.65;
		openButtonObj = new Button(footerGroup,this.szId,"BUTTON","#"+szButton
									,"map.Themes.toggleMore(evt,'"+this.szId+"')"
									,""
									,"show tools");
		openButtonObj.scale(1.0,1.0);

		this.morebutton = openButtonObj;
	}
	if (this.nMissingPositionCount ){
		szText = map.Dictionary.getLocalText("(!)");
		tLen  = nFontSize*szText.length;
		szType = "TEXTBUTTON";
		var wButtonObj = new Button(footerGroup,this.szId,szType,szText
									,"map.Themes.showErrorInfo(evt,'"+this.szId+"')"
									,""
									,"show warnings");
		wButtonObj.setPosition((textBox.width),wButtonObj.getPosition().y-nFontSize);
		wButtonObj.scale(1,1);
		wButtonObj.nodeObj.style.setProperty("opacity",String(0.5),"");
	}

	// ----------------------------------------------------
	// Finish  
	// ----------------------------------------------------

	if ( this.parent.autoHideInfoTools ){
		if ( !this.showInfoMore ){
			infoButtonGroup.style.setProperty("display","none","");
		}
		if ( this.parent.autoHideInfoTools == "all" ){
			displayGroup.setAttributeNS(null,"onmouseover","map.Themes.onoverInfo(null,'"+this.szId+"')");
			displayGroup.setAttributeNS(null,"onmouseout","map.Themes.onoutInfo(null,'"+this.szId+"')");
			displayGroup.setAttributeNS(null,"onmousedown","map.Themes.ondownInfo(null,'"+this.szId+"')");
		}
	}

	textBox = map.Dom.getBox(displayGroup);
	textBox.width += map.Scale.normalX(25);

	// resize info display	
	bgRect.setAttributeNS(null,"x",-map.Scale.normalX(nLeftMargin));
	bgRect.setAttributeNS(null,"y",-map.Scale.normalY(nTopMargin));
	bgRect.setAttributeNS(null,"width",textBox.width+map.Scale.normalX(nLeftMargin)+map.Scale.normalX(nRightMargin));
	bgRect.setAttributeNS(null,"height",textBox.height+map.Scale.normalY(nTopMargin)+map.Scale.normalY(nBottomMargin));

	// make shadow	
	var xxx = bgRect.cloneNode(1000);
	bgRect.parentNode.insertBefore(xxx,bgRect);
	xxx.setAttributeNS(null,"id",szDisplayId+":shadowrect:noobject");
	xxx.setAttributeNS(null,"style",szShadowStyle);
	xxx.setAttributeNS(null,"x",Number(xxx.getAttributeNS(null,"x"))+map.Scale.normalX(8));
	xxx.setAttributeNS(null,"y",Number(xxx.getAttributeNS(null,"y"))+map.Scale.normalY(9));
	xxx.setAttributeNS(null,"width",Number(xxx.getAttributeNS(null,"width"))-map.Scale.normalY(5));
	xxx.setAttributeNS(null,"height",Number(xxx.getAttributeNS(null,"height"))-map.Scale.normalY(6));

	var buttonObj = null;
	// button to remove 
	if ( this.showInfoMore ){
		buttonObj = new Button(infoButtonGroup,szDisplayId+":removebutton","BUTTON",'#delete_button'
									,"map.Themes.toggleMore(evt,'"+this.szId+"')"
									,""
									,"hide tools");
	}else{
		buttonObj = new Button(infoButtonGroup,szDisplayId+":removebutton","BUTTON",'#delete_button'
									,"map.Themes.removeTheme(evt,'"+szDisplayId+"')"
									,""
									,"remove map theme");
	}
	buttonObj.setPosition(textBox.width-map.Scale.normalX(2),map.Scale.normalY(7));
	this.removebutton = buttonObj;

	// button to maximize 	
	buttonObj = new Button(infoButtonGroup,szDisplayId+":maximizebutton","BUTTON",'#maximize_button'
								,"map.Themes.maximizeInfo(evt,'"+szDisplayId+"')"
								,""
								,"maximize");
	buttonObj.setPosition(textBox.width-map.Scale.normalX(map.Scale.nButtonSize+5),map.Scale.normalY(7));
	this.maximizebutton = buttonObj;

	// button to minimize 	
	buttonObj = new Button(infoButtonGroup,szDisplayId+":minimizebutton","BUTTON",'#minimize_button'
								,"map.Themes.minimizeInfo(evt,'"+szDisplayId+"')"
								,""
								,"minimize");
	buttonObj.setPosition(textBox.width-map.Scale.normalX(map.Scale.nButtonSize+5),map.Scale.normalY(7));
	this.minimizebutton = buttonObj;

	// if (chartButtonObj){
	//	chartButtonObj.setPosition((textBox.width-map.Scale.normalX(map.Scale.nButtonSize+5))*map.Scale.getEmbedScale(),chartButtonObj.getPosition().y);
	// }
	if (closeButtonObj && chartButtonObj){
		closeButtonObj.setPosition((textBox.width-map.Scale.normalX(1)),chartButtonObj.getPosition().y-map.Scale.normalX(3));
	}
	if (chartButtonObj){
		chartButtonObj.setPosition((textBox.width-map.Scale.normalX(1)),nYpos);
	}
	if (openButtonObj){
		openButtonObj.setPosition((textBox.width-map.Scale.normalX(1)),nYpos);
	}

	// lines 	
	if ( this.showInfoMore ){
		map.Dom.newShape('line',footerGroup,0,map.Scale.normalY(8),textBox.width+map.Scale.normalX(map.Scale.nButtonSize*2),map.Scale.normalY(8),"stroke:black;stroke-width:"+map.Scale.normalX(0.2)+";");
	}
	// position info display
	
	if ( fPositionInfo ){
		// needed to cascade the popup windows
		var nCount = this.parent.getThemeIndex(this.szId);
		// default position
		var ptPos = new point(160,map.Scale.mapPosition.y+220);
		// alignment for popup windows defined ?
		var szAlign = map.Viewport.szPopupAlignment?map.Viewport.szPopupAlignment:"";
		var legendPos = map.Legend?map.Legend.getPosition():new point(0,0);
		if ( szAlign.match(/LEFT/) ){
			if ( legendPos.x == 0 ){
				ptPos.x = map.Scale.mapPosition.x+map.Scale.normalX(nLeftMargin+5);
			}
			else{
				ptPos.x = map.Scale.normalX(nLeftMargin+5);
			}
			ptPos.x += map.Scale.normalX(10+(nCount-1)*10);
		}
		else{
			if ( legendPos.x == 0 ){
				ptPos = new point(map.Scale.viewBox.width-textBox.width-map.Scale.normalX(nLeftMargin)-map.Scale.normalX(nRightMargin),map.Scale.normalY(10));
			}
			else{
				ptPos = new point(map.Scale.mapPosition.x+map.Scale.bBox.width-textBox.width-map.Scale.normalX(nLeftMargin)-map.Scale.normalX(nRightMargin),map.Scale.normalY(10));
			}
			ptPos.x -= map.Scale.normalX(4);
			ptPos.x -= map.Scale.normalX((nCount)*10);
		}
		if ( szAlign.match(/BOTTOM/) && !(this.parent.fMinimizedLegends || this.szFlag.match(/MINIMIZED/)) ){
			if ( this.parent.minY ){
				ptPos.y = this.parent.minY - map.Scale.normalY(10);
				ptPos.x += map.Scale.normalX((nCount)*10);
			}else{
				ptPos.y = map.Scale.mapPosition.y+map.Scale.bBox.height-textBox.height-map.Scale.normalX(nBottomMargin+5);
				ptPos.y -= map.Scale.normalY((nCount-1)*10);
			}
			ptPos.y -= map.Scale.normalY(20);
			// if no bottom margin below map, do it in higher position
			if (map.Scale.viewBox.height-(map.Scale.mapPosition.y+map.Scale.bBox.height) <= 0 ){
				ptPos.y -= map.Scale.normalY(15);
			}
		}
		else{
			ptPos.y += map.Scale.normalY((nCount)*20);
		}
		this.widgetNode.fu.setPosition((ptPos.x),(ptPos.y));

		// GR 20.05.2011 store to determine dragging
		this.ptWidget = this.widgetNode.fu.getPosition();

		this.parent.minX = ptPos.x;
		this.parent.minY = ptPos.y;
	}

	if ( legendGroup ){
		legendGroup.style.setProperty("display","inline","");
	}

	_TRACE("== done === ");

	if ( this.parent.fMinimizedLegends || this.szFlag.match(/MINIMIZED/) ){
		map.Themes.minimizeInfo(null,szDisplayId);
	}

};

//..............................................
// C H A R T   T Y P E   M E N U
//..............................................

/**
 * get chart button
 * create a chart variation to be used as a button to change the chart theme 
 * @param targetGroup the SVG group where to create the button
 * @param nChartSize the size of the chart within the button
 * @param szMenuType flag to create size/height arrows within the buttons
 */
MapTheme.prototype.chartButton = function(targetGroup,nChartSize,szMenuType){

	var targetGroup = map.Dom.newGroup(targetGroup,"chartvari"+String(Math.random()));
	var szMerkFlag = this.szFlag;
	if ( szMenuType == "2D" ){
		this.removeDefinitionFromFlag("3D");
	}
	this.szFlag += "|NORMSIZE|SILENT|MENUSIZE|"+szMenuType;
	var ptNull = this.drawChart(targetGroup,null,nChartSize);
	this.szFlag = szMerkFlag;
	var bBox = map.Dom.getBox(targetGroup);
	this.addChartTypeSign(targetGroup,szMenuType);
	var nScale = Math.min(map.Scale.normalX(nChartSize)/bBox.width,map.Scale.normalY(nChartSize)/bBox.height);
	targetGroup.fu.scale(nScale,nScale);
	targetGroup.fu.setPosition(map.Scale.normalX(nChartSize+10),map.Scale.normalY(nChartSize)*nScale);
	return targetGroup; 
};

/**
 * add definition from flag string
 * @param szDef the definition to remove (e.g. "3D" )
 * @type string
 * @return the new flag string without szDef
 */
MapTheme.prototype.addDefinitionToFlag = function(szDef){
	return (this.szFlag = this.szFlag+"|"+szDef);
};

/**
 * remove definition from flag string
 * @param szDef the definition to remove (e.g. "3D" )
 * @type string
 * @return the new flag string without szDef
 */
MapTheme.prototype.removeDefinitionFromFlag = function(szDef){
	var szNewFlag = "";
	var szFlagA = this.szFlag.split('|');
	for ( var i=0; i<szFlagA.length; i++){
		if ( szFlagA[i] != szDef ){
			szNewFlag += (szNewFlag.length?"|":"") + szFlagA[i];
		}
	}
	return (this.szFlag = szNewFlag);
};

/**
 * remove definition from string
 * @param szFlag the definition string
 * @param szDef the definition to remove (e.g. "3D" )
 * @type string
 * @return the new flag string without szDef
 */
MapTheme.prototype.removeDefinition = function(szFlag,szDef){
	var szNewFlag = "";
	var szFlagA = szFlag.split('|');
	for ( var i=0; i<szFlagA.length; i++){
		if ( szFlagA[i] != szDef ){
			szNewFlag += (szNewFlag.length?"|":"") + szFlagA[i];
		}
	}
	return szNewFlag;
};

/**
 * chart menu
 * create a container and load the first chart menu
 * @param szDisplayId the id of the theme info to append the menu 
 * @param szOrigFlag the actual chart type
 * @param szMenuType the initial active tab 
 */
MapTheme.prototype.chartMenu = function(szDisplayId,szOrigFlag,szMenuType){

	if ( !szMenuType ){
		szMenuType = "variation";
	}

	var szMenuId = szDisplayId+":menu";
	var nYoff = 50;
	var ptPos = new point(0,0);

	if ( !SVGDocument.getElementById(szMenuId) ){
		var displayGroup = SVGDocument.getElementById(szDisplayId+":movable");
		if (!displayGroup){
			displayGroup = map.Dom.newGroup(SVGThemeGroup,"chartmenu:movable");
			SVGThemeGroup.style.setProperty("display","inline","");
			ptPos = new point(map.Scale.normalX(50),map.Scale.normalY(150));
		}
		var szTitle = map.Dictionary.getLocalText("Chart toolbox");
		if ( !this.toolBoxContainer || !SVGDocument.getElementById(this.toolBoxContainer.szId) ){
			this.toolBoxContainer = new InfoContainer(SVGDocument,displayGroup,szMenuId,ptPos,new point(0,0),"fixed",szTitle);
		}else{
			this.toolBoxContainer.setTitle(szTitle);
		}
		map.Dom.clearGroup(this.toolBoxContainer.workspaceNode);

		var newInfo = this.toolBoxContainer;
		var infoWorkspace = this.toolBoxContainer.workspaceNode;
		newInfo.szTabSelected = szMenuType;		
		
		// display method (buttons)
		// ------------------------
		var nXpos = map.Scale.normalX(10);
		var nYpos = map.Scale.normalY(30);

		szText = map.Dictionary.getLocalText("chart");
		szType = newInfo.szTabSelected=="chart"?"TEXTBUTTON|SELECTED":"TEXTBUTTON";
		buttonObj = new Button(newInfo.titleTextNode,this.szId,szType,szText
									,"map.Themes.getTheme('"+this.szId+"').chartMenu('"+szDisplayId+"','"+szOrigFlag+"','chart')"
									,""
									,"change menu");
		buttonObj.setPosition(nXpos,nYpos);
		nXpos += buttonObj.bBox.width+map.Scale.normalX(2);

		szText = map.Dictionary.getLocalText("color");
		szType = newInfo.szTabSelected=="color"?"TEXTBUTTON|SELECTED":"TEXTBUTTON";
		buttonObj = new Button(newInfo.titleTextNode,this.szId,szType,szText
									,"map.Themes.getTheme('"+this.szId+"').chartMenu('"+szDisplayId+"','"+szOrigFlag+"','color')"
									,""
									,"change menu");
		buttonObj.setPosition(nXpos,nYpos);
		nXpos += buttonObj.bBox.width+map.Scale.normalX(2);

		szText = map.Dictionary.getLocalText("variation");
		szType = newInfo.szTabSelected=="variation"?"TEXTBUTTON|SELECTED":"TEXTBUTTON";
		buttonObj = new Button(newInfo.titleTextNode,this.szId,szType,szText
									,"map.Themes.getTheme('"+this.szId+"').chartMenu('"+szDisplayId+"','"+szOrigFlag+"','variation')"
									,""
									,"change menu");
		buttonObj.setPosition(nXpos,nYpos);
		nXpos += buttonObj.bBox.width+map.Scale.normalX(2);
		switch( newInfo.szTabSelected){
			case "chart":
				this.getChartTypeMenu(infoWorkspace); 
				break;
			case "color":
			case "variation":
			default:
				this.getChartColorMenu(infoWorkspace,newInfo.szTabSelected); 
				break;
		}

		this.toolBoxContainer.reformat();
	}
};

/**
 * add a size sign to the chart group
 * @param targetGroup the group where to create the sign
 * @param szFlag the actual chart type
 */
MapTheme.prototype.addChartTypeSign = function(targetGroup,szFlag){
	var szPath = "M0,0 l"+map.Scale.normalX(1.5)+",-"+map.Scale.normalX(1.5)+" 0,"+map.Scale.normalX(3)+" -"+map.Scale.normalX(1.5)+",-"+map.Scale.normalX(1.5)+" M"+map.Scale.normalX(2.5)+",0 l"+map.Scale.normalX(17.5)+",0 M"+map.Scale.normalX(22.5)+",0 l-"+map.Scale.normalX(1.5)+",-"+map.Scale.normalX(1.5)+" 0,"+map.Scale.normalX(3)+" "+map.Scale.normalX(1.5)+",-"+map.Scale.normalX(1.5)+"";
	if ( szFlag.match(/SIZE/)){
		var signGroup = map.Dom.newGroup(targetGroup,"");
		map.Dom.newShape('path',signGroup,szPath,"stroke:white;stroke-width:"+map.Scale.normalX(4)+";stroke-opacity:0.5;stroke-linejoin:miter;");
		map.Dom.newShape('path',signGroup,szPath,"stroke:#666666;stroke-width:"+map.Scale.normalX(1.5)+";stroke-linejoin:miter;");
		signGroup.fu.setPosition(-map.Scale.normalX(10),map.Scale.normalX(-5));
	}
	if ( szFlag.match(/HEIGHT/)){
		var signGroup = map.Dom.newGroup(targetGroup,"");
		map.Dom.newShape('path',signGroup,szPath,"stroke:white;stroke-width:"+map.Scale.normalX(4)+";stroke-opacity:0.5;stroke-linejoin:miter;");
		map.Dom.newShape('path',signGroup,szPath,"stroke:#666666;stroke-width:"+map.Scale.normalX(1.5)+";stroke-linejoin:miter;");
		signGroup.setAttributeNS(null,"transform","translate(0,"+(-map.Scale.normalX(25))+") rotate(90)");
	}
};

/**
 * chart type menu
 * make chart type button array in the target group and 
 * return an array of possible char types 
 * @param targetGroup the group where to create the sign
 * @param szType the type of the menu (obsolete) 
 * @param nMaxWidth maximal width (pixel) of the buttonarray to crteate (optional)
 * @type array
 * @return array of chart definitions
 */
MapTheme.prototype.getChartTypeMenu = function(targetGroup,szType,nMaxWidth){
	if ( typeof(szChartTypeList) == "undefined" ){
		szChartTypeList = new Array(
		"CHART|BAR"
		,"CHART|BAR|3D"
		,"CHART|BAR|3D|SORT"
		,"CHART|BAR|HORZ|LEFT|UP"
		,"CHART|BAR|HORZ|RIGHT|UP"
		,"CHART|BAR|HORZ|LEFT|UP|COMPRESS"
		,"CHART|BAR|HORZ|RIGHT|UP|COMPRESS"
		,"CHART|BAR|HORZ|LEFT|UP|3D"
		,"CHART|BAR|HORZ|RIGHT|UP|3D"
		,"CHART|BAR|HORZ|LEFT|UP|COMPRESS|3D"
		,"CHART|BAR|HORZ|RIGHT|UP|COMPRESS|3D"
		,"CHART|BAR|HORZ|CENTER|UP"
		,"CHART|BAR|STACKED"
		,"CHART|BAR|STACKED|3D"
		,"CHART|BAR|SORT|3D|COLUMNS|STACKED"
		,"CHART|BAR|SORT|3D|COLUMNS|STACKED|SIZE"
		,"CHART|PIE"
		,"CHART|PIE|SIZE"
		,"CHART|PIE|3D"
		,"CHART|PIE|3D|SIZE"
		,"CHART|PIE|3D|HEIGHT"
		,"CHART|PIE|3D|VOLUME"
		,"CHART|PIE|DONUT"
		,"CHART|PIE|DONUT|SIZE"
		,"CHART|PIE|DONUT|3D"
		,"CHART|PIE|DONUT|3D|SIZE"
		,"CHART|PIE|DONUT|3D|HEIGHT"
		,"CHART|PIE|DONUT|3D|VOLUME"
		,"CHART|PIE|STARBURST"
		,"CHART|PIE|STARBURST|SIZE"
		,"CHART|PIE|STARBURST|3D"
		,"CHART|PIE|STARBURST|3D|SIZE"
		,"CHART|PIE|STARBURST|3D|HEIGHT"
		,"CHART|PIE|STARBURST|3D|VOLUME"
		,"CHART|PIE|DONUT|STARBURST"
		,"CHART|PIE|DONUT|STARBURST|SIZE"
		,"CHART|PIE|DONUT|STARBURST|3D"
		,"CHART|PIE|DONUT|STARBURST|3D|SIZE"
		,"CHART|PIE|DONUT|STARBURST|3D|HEIGHT"
		,"CHART|PIE|DONUT|STARBURST|3D|VOLUME"
		);
	}
	if ( typeof(szChartTypeListSingleValue_old) == "undefined" ){
		szChartTypeListSingleValue_old = new Array(
		"CHART|BAR"
		,"CHART|BAR|VALUES"
		,"CHART|BAR|3D"
		,"CHART|BAR|3D|VALUES"
		,"CHART|BAR|3D|VOLUME"
		,"CHART|BAR|3D|VOLUME|VALUES"
		,"CHART|BAR|HORZ|RIGHT|UP"
		,"CHART|BAR|HORZ|RIGHT|UP|VALUES"
		,"CHART|BAR|HORZ|RIGHT|UP|3D"
		,"CHART|BAR|HORZ|RIGHT|UP|VALUES|3D"
		,"CHART|BAR|POINTER"
		,"CHART|BAR|POINTER|VALUES"
		,"CHART|BUBBLE|SURFACE"
		,"CHART|BUBBLE|SURFACE|VALUES"
		,"CHART|SQUARE|SURFACE"
		,"CHART|SQUARE|SURFACE|VALUES"
		);
	}
	if ( typeof(szChartTypeListSingleValue) == "undefined" ){
		szChartTypeListSingleValue = new Array(
		 "CHOROPLETHE"
		,"CHART|BUBBLE"
		,"CHART|SQUARE"
		,"CHART|PIE|3D|SIZE"
		,"CHART|PIE|3D|HEIGHT"
		,"CHART|PIE|3D|SIZE|HEIGHT"
 		,"CHART|BAR|3D|VOLUME"
		,"CHART|BAR"
		,"CHART|BAR|3D"
		,"CHART|BAR|3D|SIZE"
		,"CHART|BAR|HORZ|RIGHT|UP"
		,"CHART|BAR|HORZ|RIGHT|UP|3D"
		,"CHART|BAR|POINTER"
		,"CHART|BAR|POINTER|SIZE"
		,"CHART|BAR|HORZ|RIGHT|UP|POINTER"
		,"CHART|LABEL"
		);
	}

	var szOrigFlag = this.szOrigFlag;

	var szTypeList = szChartTypeListSingleValue;
	if ( (this.szFieldsA.length > 1) || 
		 (this.szFlag.match(/EXACT/) && this.szFlag.match(/AGGREGATE/)) ){
		szTypeList = szChartTypeList;
	}
	
	var nSwatch = 60;
	var nNewLine = nMaxWidth?(nMaxWidth/nSwatch):3;

	for ( i=0; i<szTypeList.length; i++ ){
		merkFlag = this.szFlag;

		var aGroup = map.Dom.constructNode("a",targetGroup,{});
		map.Dom.newShape('rect',aGroup,map.Scale.normalX(nSwatch*(i%nNewLine))
											 ,map.Scale.normalY(nSwatch*Math.floor(i/nNewLine))
											 ,map.Scale.normalX(nSwatch)
											 ,map.Scale.normalY(nSwatch),"fill:#f8f8ff;stroke:lightgray;stroke-dasharray:50 50;stroke-width:"+map.Scale.normalX(1)+";");

		var donutGroup = map.Dom.newGroup(aGroup,"szDisplayId"+":chart:"+String(Math.random()));

		map.Dom.setClipRect(donutGroup,new box(-map.Scale.normalX(25),-map.Scale.normalX(nSwatch),map.Scale.normalX(nSwatch),map.Scale.normalX(nSwatch)));

		this.szFlag = szTypeList[i]+"|NORMSIZE|SILENT|MENUSIZE";
		if (merkFlag.match(/EXACT/)){
			this.szFlag += "|EXACT";	
		}
		if (merkFlag.match(/AGGREGATE/)){
			this.szFlag += "|AGGREGATE";	
		}
		if (merkFlag.match(/RELOCATE/)){
			this.szFlag += "|RELOCATE";	
		}
		if (merkFlag.match(/DIFFERENCE/)){
			this.szFlag += "|DIFFERENCE";	
		}
		if (merkFlag.match(/FRACTION/)){
			this.szFlag += "|FRACTION";	
		}
		if (merkFlag.match(/INVERT/)){
			this.szFlag += "|INVERT";	
		}
		if (merkFlag.match(/INVERTSIZE/)){
			this.szFlag += "|INVERTSIZE";	
		}
		if (merkFlag.match(/RELATIVE/)){
			this.szFlag += "|RELATIVE";	
		}
		if (merkFlag.match(/DENSITY/) ){
			this.szFlag += "|DENSITY";
		}
		if (merkFlag.match(/DOPACITYMAX/) ){
			this.szFlag += "|DOPACITYMAX";
		}else
		if (merkFlag.match(/DOPACITYLOGMAX/) ){
			this.szFlag += "|DOPACITYLOGMAX";
		}else
		if (merkFlag.match(/DOPACITYPOWMAX/) ){
			this.szFlag += "|DOPACITYPOWMAX";
		}else
		if (merkFlag.match(/DOPACITYMEAN/) ){
			this.szFlag += "|DOPACITYMEAN";
		}else
		if (merkFlag.match(/DOPACITYLOGMEAN/) ){
			this.szFlag += "|DOPACITYLOGMEAN";
		}else
		if (merkFlag.match(/DOPACITYPOWMEAN/) ){
			this.szFlag += "|DOPACITYPOWMEAN";
		}else
		if (merkFlag.match(/DOPACITYLOG/) ){
			this.szFlag += "|DOPACITYLOG";
		}else
		if (merkFlag.match(/DOPACITY/) ){
			this.szFlag += "|DOPACITY";
		}
		/**
		if (merkFlag.match(/SUM/) ){
			this.szFlag += "|SUM";
		}
		**/

		if (merkFlag.match(/AUTO100/) ){
			this.szFlag += "|AUTO100";
		}
		if (merkFlag.match(/AUTOCOMPLETE/) ){
			this.szFlag += "|AUTOCOMPLETE";
		}
		// GR 12.01.2012 aggregation sum bad for menu charts
		var szTemp = this.szAggregation;
//		this.szAggregation = "mean";

		var ptNull = this.drawChart(donutGroup,null,nSwatch*2/3);

		this.szAggregation = szTemp;

		if ( ptNull ){
			this.szFlag = merkFlag;

			var nMargin = map.Scale.normalX(10);
			ptNull.x   -= map.Scale.normalX(nSwatch/nNewLine);
			donutGroup.fu.setPosition(nMargin-ptNull.x+(i%nNewLine)*map.Scale.normalX(nSwatch),map.Scale.normalY(nSwatch*2/3)+nMargin+ptNull.y+Math.floor(i/nNewLine)*map.Scale.normalY(nSwatch));

			var szOrigFlagKeep = "";
			if ( szOrigFlag.match(/UNDEFINEDISVALUE/)){
				szOrigFlagKeep += "|UNDEFINEDISVALUE";
			}
			if ( szOrigFlag.match(/ZEROISVALUE/)){
				szOrigFlagKeep += "|ZEROISVALUE";
			}
			if ( szOrigFlag.match(/NEGATIVEISVALUE/)){
				szOrigFlagKeep += "|NEGATIVEISVALUE";
			}
			if ( szOrigFlag.match(/NONEGATIVE/)){
				szOrigFlagKeep += "|NEGATIVEISVALUE";
			}
			if ( szOrigFlag.match(/AGGREGATE/)){
				szOrigFlagKeep += "|AGGREGATE";
			}
			if ( szOrigFlag.match(/RELOCATE/)){
				szOrigFlagKeep += "|RELOCATE";
			}
			if ( szOrigFlag.match(/EXACT/)){
				szOrigFlagKeep += "|EXACT";
			}
			if ( szOrigFlag.match(/SUM/)){
				szOrigFlagKeep += "|SUM";
			}
			if ( szOrigFlag.match(/DIFFERENCE/)){
				szOrigFlagKeep += "|DIFFERENCE";
			}
			if ( szOrigFlag.match(/RELATIVE/)){
				szOrigFlagKeep += "|RELATIVE";
			}
			if ( szOrigFlag.match(/INVERT/)){
				szOrigFlagKeep += "|INVERT";
			}
			if ( szOrigFlag.match(/INVERTSIZE/)){
				szOrigFlagKeep += "|INVERTSIZE";
			}
			if ( szOrigFlag.match(/CALCMEAN/)){
				szOrigFlagKeep += "|CALCMEAN";
			}
			if ( szOrigFlag.match(/CALC100/) ){
				szOrigFlagKeep += "|CALC100";
			}
			if ( szOrigFlag.match(/PRODUCT/) ){
				szOrigFlagKeep += "|PRODUCT";
			}
			if ( szOrigFlag.match(/AUTOCOMPLETE/)){
				szOrigFlagKeep += "|AUTOCOMPLETE";
			}
			if ( szOrigFlag.match(/AUTO100/)){
				szOrigFlagKeep += "|AUTO100";
			}
			if ( szOrigFlag.match(/QUANTILE/)){
				szOrigFlagKeep += "|QUANTILE";
			}
			if ( szOrigFlag.match(/DENSITY/)){
				szOrigFlagKeep += "|DENSITY";
			}
			if ( szOrigFlag.match(/DOPACITY/)){
				szOrigFlagKeep += "|DOPACITY";
			}
			if ( szOrigFlag.match(/VALUES/) || merkFlag.match(/VALUES/) ){
				szOrigFlagKeep += "|VALUES";
			}
			if ( szOrigFlag.match(/VALUEBACKGROUND/) ){
				szOrigFlagKeep += "|VALUEBACKGROUND";
			}
			// if new chart type has SIZE flag
			// -------------------------------
			if ( szTypeList[i].match(/SIZE/) ){
				if ( merkFlag.match(/SIZELOG/)){
					szOrigFlagKeep += "|SIZELOG";
				}else
				if ( merkFlag.match(/SIZEP4/)){
					szOrigFlagKeep += "|SIZEP4";
				}else
				if ( merkFlag.match(/SIZEP3/)){
					szOrigFlagKeep += "|SIZEP3";
				}else
				if ( merkFlag.match(/SIZE/)){
					szOrigFlagKeep += "|SIZE";
				}
			}
			if ( merkFlag.match(/SPACED/)){
				szOrigFlagKeep += "|SPACED";
			}
			aGroup.setAttributeNS(null,"onclick","map.Themes.changeThemeStyle(evt,'"+this.szId+"','type:"+szTypeList[i]+szOrigFlagKeep+"')");

			this.addChartTypeSign(donutGroup,szTypeList[i]);
		}
	}
	var retA = [];
	for ( a in szTypeList ){
		retA.push(szTypeList[a]+szOrigFlagKeep);
	}
	return retA;
};

/**
 * color menu
 * create select array of possible color schemes
 * @param szDisplayId the id of the parent group to host the color menu
 * @type void
 */
MapTheme.prototype.chartColorMenu = function(szDisplayId){

	if ( (typeof(this.origColorScheme[0]) == "string") && this.origColorScheme[0].match(/#/) ){
		this.origColorScheme[1] = this.origColorScheme[0];
		this.origColorScheme[2] = this.origColorScheme[this.origColorScheme.length-1];
		this.origColorScheme[0] = this.origColorScheme.length;
		this.origColorScheme.length = 3;
	}

	if ( typeof(szColorSchemeList) == "undefined" ){
		szColorSchemeList = new Array(
		 [null,'red','green','blue',"cold"]
		,[null,'blue','orange','yellow',"2Colors"]
		,[null,'spectrum','default','270','0']
		,[null,'spectrum','default','200','0']
		,[null,'spectrum','default','0','270']
		,[null,'spectrum','default','0','200']
		);
	}
	if ( typeof(szColorSchemeVariantList) == "undefined" ){
		szColorSchemeVariantList = new Array(
		 [null,null,null,"linear","linear"]
		,[null,null,null,"dynamic","dynamic"]
		,[null,null,null,"auto","auto"]
		,[null,null,null,"2colors","2colors"]
		,[null,null,null,"2wide","2wide"]
		,[null,null,null,"2narrow","2narrow"]
		,[null,null,null,"2low","2low"]
		,[null,null,null,"2high","2high"]
		,[null,' ',' ',' ',' ']
		,[null,'green','red','auto',"cold"]
		,[null,'red','green','auto',"cold"]
		,[null,'blue','orange','yellow',"2Colors"]
		,[null,'spectrum','default','270','0']
		,[null,'spectrum','default','200','0']
		,[null,'spectrum','default','0','270']
		,[null,'spectrum','default','0','200']
		);
	}
	if ( typeof(szColorSchemeSpectrumVariantList) == "undefined" ){
		szColorSchemeSpectrumVariantList = new Array(
		 [null,null,"light",null,null]
		,[null,null,"default",null,null]
		,[null,null,"pastel",null,null]
		,[null,null,"soft",null,null]
		,[null,null,"pale",null,null]
		,[null,' ',' ',' ',' ']
		,[null,'spectrum','default','270','0']
		,[null,'spectrum','default','200','0']
		,[null,'spectrum','default','0','270']
		,[null,'spectrum','default','0','200']
		,[null,'green','red','auto',"cold"]
		,[null,'red','green','auto',"cold"]
		,[null,'blue','orange','yellow',"2Colors"]
		);
	}
	var szMenuId = szDisplayId+":colormenu";
	var nYoff = 50;

	if ( !SVGDocument.getElementById(szMenuId) ){
		var displayGroup = SVGDocument.getElementById(szDisplayId+":movable");
		if (!displayGroup){
			return;
		}
		var szTitle = map.Dictionary.getLocalText("Select color scheme variation")
			;
		var newInfo = new InfoContainer(SVGDocument,displayGroup,szMenuId,new point(0,0),new point(0,0),"fixed",szTitle);
		var infoWorkspace = newInfo.workspaceNode;

		// display method (buttons)
		// ------------------------
		var nXpos = map.Scale.normalX(10);
		var nYpos = map.Scale.normalY(30);

		szText = map.Dictionary.getLocalText("chart");
		szType = "TEXTBUTTON";
		buttonObj = new Button(newInfo.titleTextNode,this.szId,szType,szText
									,"map.Themes.changeThemeStyle(evt,'"+this.szId+"','filter:min;dfilter:0')"
									,""
									,"change method");
		buttonObj.setPosition(nXpos,nYpos);
		nXpos += buttonObj.bBox.width+map.Scale.normalX(2);

		szText = map.Dictionary.getLocalText("color");
		szType = "TEXTBUTTON|SELECTED";
		buttonObj = new Button(newInfo.titleTextNode,this.szId,szType,szText
									,"map.Themes.changeThemeStyle(evt,'"+this.szId+"','filter:mean;dfilter:0')"
									,""
									,"change method");
		buttonObj.setPosition(nXpos,nYpos);
		nXpos += buttonObj.bBox.width+map.Scale.normalX(2);

		map.Dom.newShape('rect',infoWorkspace,0,0,350,350,"fill:white");

		var szTypeList = szColorSchemeVariantList;
		if ( this.origColorScheme[1] == "spectrum" ){
			szTypeList = szColorSchemeSpectrumVariantList;
		}
		var nCols = 1;
		var nXSize = 100;
		var nYSize = 30;
		var nChartSize = 80;

		nXSize = 200;

		for ( i=0; i<szTypeList.length; i++ ){
			map.Dom.newShape('rect',infoWorkspace,map.Scale.normalX(nXSize*(i%nCols))
												 ,map.Scale.normalY(nYSize*Math.floor(i/nCols))
												 ,map.Scale.normalX(nXSize)
												 ,map.Scale.normalY(nYSize),"fill:#f8f8ff;stroke:lightgray;stroke-dasharray:50 50;stroke-width:"+map.Scale.normalX(1)+";");

			var aGroup = map.Dom.constructNode("a",infoWorkspace,{});
			var donutGroup = map.Dom.newGroup(aGroup,"szDisplayId"+":chart:"+String(Math.random()));
			var myColorScheme = new Array(0);
			for ( var k=0; k<szTypeList[i].length; k++ ){
				if ( szTypeList[i][k] ){
					myColorScheme[k] = szTypeList[i][k];
				}else{
					myColorScheme[k] = this.origColorScheme[k];
				}
			}
			var tmpColorScheme = ColorScheme.createColorScheme(myColorScheme[1],myColorScheme[2],myColorScheme[0],myColorScheme[3],myColorScheme[4]);

			var nPartWidth = map.Scale.normalX((nXSize-10-10)/tmpColorScheme.length);
			for ( var c=0;c<tmpColorScheme.length;c++ ){
				var nXpos = map.Scale.normalX(10+nXSize*(i%nCols));
				map.Dom.newShape('rect',donutGroup,nXpos+nPartWidth*c
													 ,map.Scale.normalY(nYSize*Math.floor(i/nCols)+10)
													 ,nPartWidth
													 ,map.Scale.normalY(nYSize-10-10),"fill:"+tmpColorScheme[c]+";stroke:lightgray;stroke-width:"+map.Scale.normalX(1)+";");
			}
			
			donutGroup.setAttributeNS(null,"onclick","map.Themes.changeThemeStyle(evt,'"+this.szId+"','colorscheme:"+myColorScheme[1]+","+myColorScheme[2]+","+myColorScheme[3]+","+myColorScheme[4]+"')");
		}
		newInfo.reformat();
	}
};

/**
 * select chart color scheme
 * create select array of possible color schemes 
 * @param targetGroup the target (SVG) group 
 * @param szType the color selection type ("color" or "variation")
 */
MapTheme.prototype.getChartColorMenu = function(targetGroup,szType){

	var origColorScheme = new Array(0);
	for (var i=0; i<this.origColorScheme.length; i++ ){
		origColorScheme[i] = this.origColorScheme[i];
	}

	if ( (typeof(origColorScheme[0]) == "string") && origColorScheme[0].match(/#/) ){
		var nColors = Math.min(this.origColorScheme.length,this.partsA.length);
		var leftColor = origColorScheme[0];
		var rightColor = origColorScheme[nColors-1];
		var midColor = origColorScheme[Math.floor((nColors-1)/2)];
		origColorScheme[0] = nColors;
		origColorScheme[1] = leftColor;
		origColorScheme[2] = rightColor;
		origColorScheme[3] = null;
		origColorScheme[4] = midColor;
		origColorScheme.length = 5;
	}

	if ( typeof(szColorSchemeList) == "undefined" ){
		szColorSchemeList = new Array(
		 [null,'#ffeeee','#dd0000',"dynamic","cold"]
		,[null,'#eeffee','#00dd00',"dynamic","cold"]
		,[null,'#eeeeff','#0000dd',"dynamic","cold"]
		,[null,'#FFFDD8','#952D44',null,null]
		,[null,'#FEFDDF','#008A56',null,null]
		,[null,'#FEFDDF','#00308F',null,null]
		,[null,'#FEFDDF','#91308F',null,null]
		,[null,'#FEFDDF','#E5891F',null,null]
		,[null,'#EBF4FB','#00308F',null,null]
		,[null,'#EBF4FB','#91308F',null,null]
		,[null,'#FAE9D6','#E5891F',null,null]
		,[null,'#F9DECA','#9C2700 ','2colors','#F4793B']
		,[null,'#9C2700','#F9DECA ','2colors','#F4793B']
		,[null,'#FFFDD8','#B5284B','2colors','#FCBA6C']
		,[null,'#FFFDB0','#800800','2colors','#F79E00']
		,[null,'#FFFDB0','#6B0601','2colors','#E69511']
		,[null,'#800800','#FFFDB0','2colors','#F79E00']
		
		,[null,'green','red',null,"warm"]
		,[null,'green','#952D44',null,"warm"]
		,[null,'#026622','#8A5195',null,null]
		,[null,'#8A5195','#026622',null,null]
		,[null,'green','red',null,"cold"]
		,[null,'green','#952D44',null,"cold"]
		,[null,'#026622','#8A5195',null,"cold"]
		,[null,'#8A5195','#026622',null,"cold"]

		,[null,'red','green',null,"warm"]
		,[null,'#FF4800','#7CB832','auto','#F7FA7A']

		,[null,'blue','white',"2colors",'orange']
		,[null,'blue','red',null,null]
		,[null,'blue','red','auto',null]
		,[null,'blue','red',"2colors",'orange']
		,[null,'blue','orange',"2low",'red']
		,[null,'blue','#ffcc77',"2low",'red']
		,[null,'#ffcc77','blue',"2high",'red']
		,[null,'#D1EC6E','#F7C025',null,null]
		,[null,'#D1EC6E','#FF8085',null,null]
		,[null,'#ffffff','#444444',"dynamic","cold"]
		,[null,'#444444','#ffffff',"dynamic","cold"]
		,[null,'#444444','#444444',"dynamic","cold"]
		,[null,' ',' ',' ',' ']
		,[null,'spectrum','default','270','0']
		,[null,'spectrum','default','230','0']
		,[null,'spectrum','default','200','0']
		,[null,'spectrum','default','0','270']
		,[null,'spectrum','default','0','230']
		,[null,'spectrum','default','0','200']
		,[null,'office','','','']
		,[null,'pastel','','','']
		,[null,'mineral','','','']
		,[null,'harvest','','','']
		);
	}
	if ( typeof(szColorSchemeVariantList) == "undefined" ){
		szColorSchemeVariantList = new Array(
		 [null,null,null,"linear",null]
		,[null,null,null,"dynamic",null]
		,[null,null,null,"auto",null]
		,[null,null,null,"2colors",null]
		,[null,null,null,"2wide",null]
		,[null,null,null,"2narrow",null]
		,[null,null,null,"2low",null]
		,[null,null,null,"2high",null]
		);
	}
	if ( typeof(szColorSchemeSpectrumVariantList) == "undefined" ){
		szColorSchemeSpectrumVariantList = new Array(
		 [null,null,"light",null,null]
		,[null,null,"default",null,null]
		,[null,null,"pastel",null,null]
		,[null,null,"soft",null,null]
		,[null,null,"pale",null,null]
		);
	}

	var szTypeList = szColorSchemeList;
	switch(szType){
		case "color": 
			szTypeList = szColorSchemeList;
			break;
		case "variation":
			szTypeList = szColorSchemeVariantList;
			if ( origColorScheme[1] == "spectrum" ){
				szTypeList = szColorSchemeSpectrumVariantList;
			}
			break;
	}

	var nCols = 1;
	var nXSize = 200;
	var nYSize = 30;

	nXSize = Math.min(200,15*origColorScheme[0]);

	for ( i=0; i<szTypeList.length; i++ ){
		map.Dom.newShape('rect',targetGroup,map.Scale.normalX(nXSize*(i%nCols))
										   ,map.Scale.normalY(nYSize*Math.floor(i/nCols))
 										   ,map.Scale.normalX(nXSize)
										   ,map.Scale.normalY(nYSize),"fill:#f8f8ff;stroke:lightgray;stroke-dasharray:50 50;stroke-width:"+map.Scale.normalX(1)+";");

		var aGroup = map.Dom.constructNode("a",targetGroup,{});
		var donutGroup = map.Dom.newGroup(aGroup,"szDisplayId"+":chart:"+String(Math.random()));
		var myColorScheme = new Array(0);
		for ( var k=0; k<szTypeList[i].length; k++ ){
			if ( szTypeList[i][k] ){
				myColorScheme[k] = szTypeList[i][k];
			}else{
				myColorScheme[k] = origColorScheme[k];
			}
		}
		myColorScheme[0] = Math.min(15,myColorScheme[0]);
		var tmpColorScheme = ColorScheme.createColorScheme(myColorScheme[1],myColorScheme[2],myColorScheme[0],myColorScheme[3],myColorScheme[4]);
		var nPartWidth = map.Scale.normalX((nXSize-10-10)/tmpColorScheme.length);
		for ( var c=0;c<tmpColorScheme.length;c++ ){
			var nXpos = map.Scale.normalX(10+nXSize*(i%nCols));
			map.Dom.newShape('rect',donutGroup,nXpos+nPartWidth*c
												 ,map.Scale.normalY(nYSize*Math.floor(i/nCols)+10)
												 ,nPartWidth
												 ,map.Scale.normalY(nYSize-10-10),"fill:"+tmpColorScheme[c]+";stroke:lightgray;stroke-width:"+map.Scale.normalX(1)+";");
		}
		donutGroup.setAttributeNS(null,"onclick","map.Themes.changeThemeStyle(evt,'"+this.szId+"','colorscheme:"+myColorScheme[1]+","+myColorScheme[2]+","+myColorScheme[3]+","+myColorScheme[4]+"')");
		donutGroup.setAttributeNS(null,"tooltip",myColorScheme[1]+","+myColorScheme[2]+","+myColorScheme[3]+","+myColorScheme[4]);
	}
};

/**
 * convert a number into a formatted string; if the number > 1000 it will be formatted like 1.023.234 
 * @param nValue the number to format
 * @param nPrecision the wanted decimal points 
 * @param szFlag "CEIL" or "FLOOR" (round either up or down)
 */
MapTheme.prototype.formatValue = function(nValue,nPrecision,szFlag){
	if ( isNaN(nValue) ){
		return nValue;
	}
	if ( this.nMin > 999 && this.nMax < 3000 ){
		return __formatValue(nValue,nPrecision,szFlag+"|NOBREAKS");
	}
	return __formatValue(nValue,nPrecision,szFlag);
};

/**
 * remove the theme (from the parents theme list) 
 * @param evt the event
 */
MapTheme.prototype.remove = function(evt){
	this.parent.removeTheme(evt,this.szId);
};

/**
 * remove the representation of this theme (chart objects, shape colorizing, info display ...) 
 * @param evt the event
 */
MapTheme.prototype.removeElements = function(evt){
	if ( this.widgetNode ){
		widgetList.removeWidget(this.widgetNode);
		this.widgetNode.parentNode.removeChild(this.widgetNode);
		this.widgetNode = null;
	}

	// GR 29.12.2013 remove clip timeout !
	if ( this.clipTimeout ){
		clearTimeout(this.clipTimeout);
	}
	
	// remove old theme colors
	// if we have a new choroplethe theme over an existing one, don't clear the old theme
	var fUnpaint = true;
	if ( 0 && (this.parent.themesA.length > 1) && this.szFlag.match(/CHOROPLETHE/) ){
		for ( i in this.parent.themesA ){
			if ( this.parent.themesA[i].fRealize && this.parent.themesA[i].szFlag.match(/CHOROPLETHE/) && !this.parent.themesA[i].szFlag.match(/CLEAR/) ){
				fUnpaint = false;
			}
		}
	}
	if ( fUnpaint ) {
		this.unpaintMap();
	}

	if ( this.onremove ){
		try{
			eval(this.onremove);
		}
		catch (e){
		}
	}
	// notify HTML user about the new theme
	try{
		HTMLWindow.ixmaps.htmlgui_onRemoveTheme(this.szId);
	}
	catch (e){
	}

};

/**
 * remove the shape colorizing (depreciated; now use method this.unpaintMap() )
 * @param szThemes the colorized themes(layer)
 */
MapTheme.prototype.removeMapThemeStyles = function(szThemes){
	var szThemesA = szThemes.split('|');
	var childsA = SVGRootElement.getElementsByTagName('path');
	for (var i=0;i<childsA.length;i++ ){
		if (childsA.item(i).nodeType == 1 ){
			var szId = childsA.item(i).parentNode.getAttributeNS(null,"id");
			var fMatch = false;
			if ( szId && (szId.length !== 0) ){
				var szTest = map.Tiles.getMasterId(szId).split(':')[0];
				for (var j=0; j<szThemesA.length; j++){
					if ( szTest == szThemesA[j] ){
						fMatch = true;
					}
				}
			}
			if ( fMatch ){
				childsA.item(i).parentNode.removeAttributeNS(null,"style");
			}
		}
	}
};

/**
 * hide or fade the info display of this theme
 */
MapTheme.prototype.disable = function(){
	if ( this.szFlag.match(/CHART/)	){
		return;
	}
	if (this.widgetNode){
		var subNodesA = this.widgetNode.getElementsByTagName('g');
		for ( var i=0; i<subNodesA.length; i++ ){
			subNodesA.item(i).setAttributeNS(null,"opacity","0.9");
		}
	}
};

/**
 * show (opacity = 1 && tofront) the info display of this theme
 */
MapTheme.prototype.enable = function(){
	if (this.widgetNode){
		var subNodesA = this.widgetNode.getElementsByTagName('g');
		for ( var i=0; i<subNodesA.length; i++ ){
			subNodesA.item(i).setAttributeNS(null,"opacity","1.0");
		}
		this.widgetNode.parentNode.appendChild(this.widgetNode);
	}
	map.Themes.setActive(this);
};

/**
 * force the layer(s) referenced within this theme to be visible
 */
MapTheme.prototype.makeVisible = function(){

	for ( var i=0; i<this.szThemesA.length; i++){
		if ( !map.Layer.isLayerOn(this.szThemesA[i])		    && 
			 !map.Layer.isScaleDependentLayer(this.szThemesA[i]) ) {
			map.Themes.switchedLayerA[this.szThemesA[i]] = true;
			map.Api.switchMapTheme(this.szThemesA[i],"on");
		}
		// GR 30.10.2015 important!
		map.Tiles.switchScaleDependentTiles();
	}
};

/**
 * check the layer(s) referenced within this theme to continuo to be visible
 */
MapTheme.prototype.checkVisible = function(){
	for ( var i=0; i<this.szThemesA.length; i++){
		if ( !(map.Themes.isThemeLayerUsed(this.szThemesA[i]) && this.isVisible) &&
			  map.Themes.switchedLayerA[this.szThemesA[i]]     ){
			map.Api.switchMapTheme(this.szThemesA[i],"off");
			map.Themes.switchedLayerA[this.szThemesA[i]] = null;
		}
	}
};

/**
 * resize the chart objects
 * @param nDelta the resizing factor
 */
MapTheme.prototype.resize = function(nDelta){
	// GR 15.02.2011 see resize all charts
	if ( nDelta != 999 ){
		this.nScale *= nDelta;
	}
	// line buffer cannot be scaled, so we must redraw them
	if ( (this.szFlag.match(/BUFFER/)) && (this.szShapeType.match(/line/)) ){
		this.fRedraw = true;
		this.fRedrawInfo = true;
		this.nSkipCount = 1; // QaD see .redraw();
		map.Themes.execute();
	}else{
		map.Layer.changeObjectScaling(null,nDelta,this.chartGroup);
		if ( this.szFlag.match(/DECLUTTER/) ){
			this.declutterCharts();
		}
		if ( (this.szFlag.match(/BUFFER/)) ){
			var nodeStyleA = this.chartGroup.getElementsByTagName('circle');
			for ( n=0; n<nodeStyleA.length;n++){
				var szStyle = nodeStyleA.item(n).getAttributeNS(null,"style");
				if (szStyle && szStyle.length){
					szNewStylesValue = __scaleStyleString(szStyle,1/nDelta);
					nodeStyleA.item(n).setAttributeNS(null,"style",szNewStylesValue);
				}
			}
		}
		this.f  = true;

		this.showInfo();
	}
};

/**
 * change the offset of the chart objects
 * @param ptOffset the offset as pont object
 */
MapTheme.prototype.offset = function(ptOffset){
	var ptOldOffset = this.chartGroup.fu.getPosition();
	this.chartGroup.fu.setPosition(ptOldOffset.x+ptOffset.x,ptOldOffset.y+ptOffset.y);
};

/**
 * change the opacity of the chart objects
 * @param nDelta the opacity factor
 */
MapTheme.prototype.opacity = function(nDelta){

	this.fillOpacity = (this.fillOpacity?this.fillOpacity:1)*nDelta;
	this.fillOpacity = Math.min(1,this.fillOpacity);
	this.fillOpacity = Math.max(0,this.fillOpacity);

	this.nOpacity = (this.nOpacity?this.nOpacity:1)*nDelta;
	this.nOpacity = Math.min(1,this.nOpacity);
	this.nOpacity = Math.max(0,this.nOpacity);

	if ( this.chartGroup ){
		var chartObjA = this.chartGroup.childNodes;
		for ( var i=0; i<chartObjA.length; i++ ){
			map.Layer.changeNodeOpacity(chartObjA.item(i),nDelta);
		}
	}
	else{
		if ( this.szShapeType.match(/line/) ){
			for ( var i=0; i<this.szThemesA.length; i++ ){
				map.Layer.changeLayerOpacity(this.szThemesA[i],nDelta);
			}
		}
		else{
			for (a in this.itemA){
				var tilesNodesA = this.getItemNodes(a);
				for (var j=0; j<tilesNodesA.length ;j++ ){
					map.Layer.changeNodeOpacity(tilesNodesA[j],nDelta,"fill-opacity");
				}
			}
		}
	}
};

/**
 * change the blur effect on theme charts
 * @param nBlur the blur factor
 */
MapTheme.prototype.blur = function(nBlur){

	if ( this.chartGroup ){
		// GR 04.11.2014 make blur for the objects
		if ( this.nBlur ) {
			szBlurFilterId = "blur-3";
			var filterNode = SVGDocument.getElementById(szBlurFilterId);
			if ( !filterNode ){
				var filterNode = map.Dom.newNode('filter',this.chartGroup.parentNode);
				filterNode.setAttributeNS(null,"id",szBlurFilterId);
				filter = map.Dom.newNode('feGaussianBlur',filterNode);
				filter.setAttributeNS(null,"stdDeviation",map.Scale.normalX(nBlur));
			}else{
				filterNode.firstChild.setAttributeNS(null,"stdDeviation",map.Scale.normalX(nBlur));
			}
			this.chartGroup.style.setProperty("filter","url(#"+szBlurFilterId+")","");
		}else{
			this.chartGroup.style.removeProperty("filter");
		}
	} else
	if ( this.szThemesA[0] ){

		var layerObj = SVGDocument.getElementById("maplayer");
		if ( layerObj ){
			// GR 04.11.2014 make blur for the objects
			if ( this.nBlur ) {
				szBlurFilterId = "blur-map";
				var filterNode = SVGDocument.getElementById(szBlurFilterId);
				if ( !filterNode ){
					var filterNode = map.Dom.newNode('filter',layerObj.parentNode);
					filterNode.setAttributeNS(null,"id",szBlurFilterId);
					filterNode.setAttributeNS(null,"x",0);
					filterNode.setAttributeNS(null,"y",0);
					filterNode.setAttributeNS(null,"width","100%");
					filterNode.setAttributeNS(null,"height","100%");
					filter = map.Dom.newNode('feGaussianBlur',filterNode);
					filter.setAttributeNS(null,"stdDeviation",map.Scale.normalX(nBlur)/map.Zoom.nZoom);
				}else{
					filterNode.firstChild.setAttributeNS(null,"stdDeviation",map.Scale.normalX(nBlur)/map.Zoom.nZoom);
				}
				layerObj.style.setProperty("filter","url(#"+szBlurFilterId+")","");
			}else{
				layerObj.style.removeProperty("filter");
			}
		}
	}

};

/**
 * toggle the chart objects
 */
MapTheme.prototype.toggle = function(){
	_TRACE("----->>>>>> toggle:"+this.szId+" -------->>>>>>");
	if ( this.chartGroup ){
		if ( this.chartGroup.style.getPropertyValue("display") == "none" ){
			this.chartGroup.style.setProperty("display","inline","");
		} else {
			this.chartGroup.style.setProperty("display","none","");
		}
	}
	else {
		if ( this.isChecked ){
			this.unpaintMap();
			this.isChecked = false;
			if ( map.Themes.activateNextPaint(this) ){
				this.fToggle = false;
				map.Themes.execute();
				if (this.widgetNode){
					this.widgetNode.setAttributeNS(null,"opacity","1.0");
					this.widgetNode.parentNode.appendChild(this.widgetNode);
				}
			}
		}
		else{
			this.isChecked = true;
			this.fRedraw = true;
			this.fToggle = false;
			map.Themes.execute();
		}
	}
};

/**
 * get Histogram
 * create a theme value distribution
 * @param szId an item it to mark within the histogram (optional)
 * @param targetGroup where to create
 * @param szFlag type of histogram "DISTRIBUTION", "CLASSES"

 */
MapTheme.prototype.getHistogram = function(szId,targetGroup,szFlag){
	map.Themes.getHistogram(szId,targetGroup,szFlag,this);
};

var __maptheme_chartcolors = new Array(0);
/**
 * get color derivates for 3D chart objects
 * if color object exists, return this, else build derivate colors
 * @parameter nColor the main color
 */
function __maptheme_getChartColors(nColor){
	if ( !__maptheme_chartcolors[nColor] ){
		__maptheme_chartcolors[nColor] = new ChartColors(nColor);
	}
	return __maptheme_chartcolors[nColor];
}
/**
 * This is the ChartColors class.  
 * It realizes an object for color derivates to realize 3d chart objects
 * @constructor
 * @parameter nColor the main color
 * @throws 
 * @return A new ChartColors object
 */
function ChartColors(nColor){
	if (typeof(nColor) != 'string'){
		nColor = "#ffffff";
	}
	this.mainColor = nColor;
	this.lowColor = ColorScheme.getDerivateColor(nColor,0.7);
	this.highColor = ColorScheme.getDerivateColor(nColor,1.3);
	this.borderColor = ColorScheme.getBorderColor(nColor);
	this.textColor = ColorScheme.getTextColor(nColor);
}

// utf8 handling
// -----------------

function __mpap_hex2dec(n) {
	return parseInt(n,16);
}
function __mpap_decode_utf8( s )
{
	if ( (typeof(s) == "string") && s.match(/&#x/) ){
		var text = "";
		sA = s.split("&#x");
		text = sA[0];
		for ( var i=1; i<sA.length; i++){
			text += String.fromCharCode(__mpap_hex2dec(sA[i].substr(0,2)));
			text += sA[i].substr(3,sA[i].length-3);
		}
		return text;
	}
	return s; 
}
// .............................................................................
// EOF
// .............................................................................

