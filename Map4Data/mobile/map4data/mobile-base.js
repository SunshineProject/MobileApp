// API key for http://openlayers.org. Please get your own at
// http://bingmapsportal.com/ and use that instead.
//var apiKey = "AqTGBsziZHIJYYxgivLBf0hVdrAk9mWO5cQcb8Yux8sW5M8c8opEC2lZqKR1ZZXf";

// initialize map when page ready
var map;
var layerEdifici;
var gg = new OpenLayers.Projection("EPSG:4326");
//var sm = new OpenLayers.Projection("EPSG:900913");
//var sm = new OpenLayers.Projection(map_config['srs']);

config_obj=JSON.parse(localStorage.getItem('config_object'))
function showMsg(szMessage) {
	//document.getElementById("nodelist").innerHTML = szMessage;
	//setTimeout(
	//"document.getElementById('nodelist').innerHTML = ''",2000);
	}



function showSuccessMsg(){
	console.log('completato');
	//history.go(-1);
	try {
		console.log("try")
		window.plugins.toast.show('Transaction successfully completed','long', 'center' , function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
		//window.plugins.toast.show('Hello there!', 'long', 'center', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)})
		console.log("ok")
	} catch (e) {
		console.log("allert"+ e )
		alert("Transaction successfully completed");
	}
	layerEdifici.redraw(true);

	window.location.replace(window.location.href.split("#")[0] + "#mappage");
	//$("#div1").load("file2.html");
	};
	 
function showFailureMsg(){
	console.log('fallioto');
	try {
		window.plugins.toast.show('An error occured while operating the transaction, try again', 'long', 'center' ,function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});

	} catch (e) {
		alert("Transaction successfully completed");
	}
	
	};


function init(onSelectFeatureFunction) {
	//var init = function (onSelectFeatureFunction) {

	//function initil(){
    //OpenLayers.ProxyHost = "proxy.cgi?url=";
    var vector = new OpenLayers.Layer.Vector("My own position", {});
    saveStrategy = new OpenLayers.Strategy.Save({scope:this , auto: false});//
    saveStrategy.events.register("success", '', showSuccessMsg);
    saveStrategy.events.register("failure", '', showFailureMsg);

    layerEdifici = new OpenLayers.Layer.WMS("Building layers" , config_obj['wms'], //"http://lab.sinergis.it/geoserver/mapwork_cp/wms",
        {layers: config_obj['layer'], workspace : config_obj['workspace'], transparent: true}, 
        {isBaseLayer:false, opacity: 0.6,} //,  maxScale:1,  minScale:25000
    );

    
    var geolocate = new OpenLayers.Control.Geolocate({
        id: 'locate-control',
        geolocationOptions: {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: 7000
        }
    });

 
    /*edificiVector = new OpenLayers.Layer.Vector("WFS Edifici", { //var
    strategies: [new OpenLayers.Strategy.BBOX({
        resFactor: 1,
        ratio:1
    }),saveStrategy],*/
    

    select = new OpenLayers.Layer.Vector("Selection on building", {
    	styleMap: new OpenLayers.Style(OpenLayers.Feature.Vector.style["select"]),
    	strategies: [ saveStrategy],
    	protocol: new OpenLayers.Protocol.WFS({
        version: "1.1.0", // importante: con la 1.0.0 non funziona perche' non e' supportata la riproiezione
        url:  getUrlWithProxyAddService(config_obj['wfs']),
        workspace:config_obj['workspace'],
        featureType:config_obj['layer'],
        featureNS: config_obj['namespace'],
        featurePrefix: config_obj['workspace'],
        //geometryName : "SHAPE",
        srsName: config_obj['srs'],
        //user: config_obj['geouser'], 
        //password: config_obj['geopsw']
    },{isBaseLayer:false})
    });
    
    var selectControl = new OpenLayers.Control.SelectFeature(select , {
        autoActivate:true,
        onSelect:onSelectFeatureFunction});
    
    // create map
    map = new OpenLayers.Map({
        div: "map",
        theme: null,
        projection: new OpenLayers.Projection(config_obj['srs']),
        numZoomLevels: 22,
        fractionalZoom: true,
        controls: [
            new OpenLayers.Control.Attribution(),
            //new OpenLayers.Control.ScaleLine(),
            new OpenLayers.Control.TouchNavigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            }),
            geolocate,
            selectControl
        ],
        layers: [
            new OpenLayers.Layer.OSM("OpenStreetMap", null, {            	
            	 resolutions: [156543.03390625, 78271.516953125, 39135.7584765625,
                               19567.87923828125, 9783.939619140625, 4891.9698095703125,
                               2445.9849047851562, 1222.9924523925781, 611.4962261962891,
                               305.74811309814453, 152.87405654907226, 76.43702827453613,
                               38.218514137268066, 19.109257068634033, 9.554628534317017,
                               4.777314267158508, 2.388657133579254, 1.194328566789627,
                               0.5971642833948135, 0.25, 0.1, 0.05, 0.025,0.001],
                 serverResolutions: [156543.03390625, 78271.516953125, 39135.7584765625,
                                     19567.87923828125, 9783.939619140625,
                                     4891.9698095703125, 2445.9849047851562,
                                     1222.9924523925781, 611.4962261962891,
                                     305.74811309814453, 152.87405654907226,
                                     76.43702827453613, 38.218514137268066,
                                     19.109257068634033, 9.554628534317017,
                                     4.777314267158508, 2.388657133579254,
                                     1.194328566789627, 0.5971642833948135],                                                                    
                                     transitionEffect: 'resize'
            
            } ),
            //new OpenLayers.Layer.WMS("Ctr250c v2011" , "http://servizigis.regione.emilia-romagna.it/wms/ctr250c", {layers: 'Ctr250c_v2011'} ),
            //new OpenLayers.Layer.WMS("Agea 2011 rgb" , "http://servizigis.regione.emilia-romagna.it/wms/agea2011_rgb", {layers: 'Agea2011_RGB'}  ),
            //new OpenLayers.Layer.WMS("Sfumo Altimetrico40x40" , "http://servizigis.regione.emilia-romagna.it/wms/sfumo_altimetrico40x40", {layers: 'Sfumo_Altimetrico40x40'}  ),
            vector,
           //edificiVector,
            //layerEdifici,
        ],
        center: new OpenLayers.LonLat(config_obj['centerx'],config_obj['centery']),
        zoom: config_obj['zoom']
    });
    
    
    
    
    
    console.log(config_obj['layers']);
    //console.log(config_obj['layers'].length);
    if (config_obj['layers'] != null){
	    for (var i = 0; i <  config_obj['layers'].length ; i+=1){
	    	console.log("i:"+i);
	    	if (config_obj['layers'][i] == null){break;}
	    	
	    	map.addLayer(new OpenLayers.Layer.WMS(config_obj['layers'][i]['name'],config_obj['layers'][i]['wms'], {layers: config_obj['layers'][i]['layer']}  ));
	    	
	    	
	    }
    }
    
    map.addLayer(layerEdifici);
    
    if ( typeof config_obj['layers_more'] !== "undefined" ||   config_obj['layers_more'] != null){
	    for (i = 0; i <  config_obj['layers_more'].length ; i+=1){
	    	console.log("i:"+i);
	    	if (config_obj['layers_more'][i] == null){break;}
				console.log(config_obj['layers_more'][i]);
				if (typeof  config_obj['layers_more'][i].type=== "undefined"  ){
					console.log('error layer ');
					break;
					}
				if (config_obj['layers_more'][i]['type'] == "wms"){
					console.log('add wms');
					console.log(config_obj['layers_more'][i]['name'])  
					//{layers: config_obj['layer'], transparent: true},         {isBaseLayer:false, opacity: 0.7,} //,  maxScale:1,  minScale:25000
					var wmsLayer = new OpenLayers.Layer.WMS(config_obj['layers_more'][i]['name'],config_obj['layers_more'][i]['wms'], {layers: config_obj['layers_more'][i]['layer'], transparent: true}) 
					wmsLayer.setIsBaseLayer(false);
					
					
					map.addLayer( wmsLayer);
					break;
					}
				if (config_obj['layers_more'][i]['type'] == "wfs"){
					console.log('eadd wfs')
					console.log(config_obj['layers_more'][i]['name'])
					var protocol1 = new OpenLayers.Protocol.WFS({
						version: "1.1.0",
						url:  getUrlWithProxyAddService(config_obj['layers_more'][i]['wms']),
						featureType:config_obj['layers_more'][i]['layer'],
						//featureNS: "http://www.openplans.org/topp",
						geometryName: "the_geom"
					});
					console.log(protocol1);
				
				
				
					
					
					mywfs = new OpenLayers.Layer.Vector("nomemappa", {
						//styleMap: new OpenLayers.Style(OpenLayers.Feature.Vector.style["select"]),						
						protocol: protocol1 /*new OpenLayers.Protocol.WFS({
						version: "1.1.0", // importante: con la 1.0.0 non funziona perche' non e' supportata la riproiezione
						url:  getUrlWithProxyAddService(config_obj['layers_more'][i]['wms']),
						featureType:config_obj['layers_more'][i]['layer'],
						//featureNS: "http://schemas.corenet.it/mapwork_cp/servizi",
						//geometryName : "SHAPE",
						srsName: config_obj['srs']
						},{isBaseLayer:false})*/
					});
					
					console.log(mywfs);
					map.addLayer(mywfs);
					
					break;
					}

					
	    	
	    }
    }
    
    
    
    
    
    
    
    
    var style = {
            fillOpacity: 0.0,
            fillColor: '#000',
            strokeColor: '#f00',
            strokeOpacity: 0.6
        };
    
    
    
    geolocate.events.register("locationupdated", this, function(e) {
        vector.removeAllFeatures();
        vector.addFeatures([
            new OpenLayers.Feature.Vector(
                e.point,
                {},
                {
                    graphicName: 'cross',
                    strokeColor: '#f00',
                    strokeWidth: 2,
                    fillOpacity: 0,
                    pointRadius: 10
                }
            ),
            new OpenLayers.Feature.Vector(
                OpenLayers.Geometry.Polygon.createRegularPolygon(
                    new OpenLayers.Geometry.Point(e.point.x, e.point.y),
                    e.position.coords.accuracy / 2,
                    50,
                    0
                ),
                {},
                style
            )
        ]);
        map.zoomToExtent(vector.getDataExtent());
    });
    
    
    
    
 // Controlli per il wms degli edifici
    control = new OpenLayers.Control.GetFeature({
        protocol: OpenLayers.Protocol.WFS.fromWMSLayer(layerEdifici),
        box: false,
        hover: false,
        click:true,
        singles:true,
        clickTolerance : 0, 
        maxFeatures :  10
    });
    
    control.events.register("featureselected", this, function(e) {
    	console.log(e);
        select.addFeatures([e.feature]);
    });
    control.events.register("featureunselected", this, function(e) {
        select.removeFeatures([e.feature]);
    });
    
   
    
   
    

    
    
    map.addLayers([select]);//hover,
    map.addControl(control);
    control.activate();
    //navigator.notification.activityStop();
    //window.location.replace(window.location.href.split("#")[0] + "#mappage");

};

function getUrlWithProxyAddService(urlServizio) {
	
	return urlServizio;//aggiungo il proxy davanti alla url del servizio
	var proxyUrl = "http://localhost:8080/prova_arcgis/call/";
	if (urlServizio.indexOf('http://')!=-1) {
		console.log(proxyUrl+urlServizio.substring('http://'.length));
		return proxyUrl+urlServizio.substring('http://'.length);
	}
}

