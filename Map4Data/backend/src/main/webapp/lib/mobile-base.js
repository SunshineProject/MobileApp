// API key for http://openlayers.org. Please get your own at
// http://bingmapsportal.com/ and use that instead.
//var apiKey = "AqTGBsziZHIJYYxgivLBf0hVdrAk9mWO5cQcb8Yux8sW5M8c8opEC2lZqKR1ZZXf";

// initialize map when page ready
var map;
var gg = new OpenLayers.Projection("EPSG:4326");
//var sm = new OpenLayers.Projection("EPSG:900913");
var sm = new OpenLayers.Projection("EPSG:3857");

var init = function (onSelectFeatureFunction) {
    //OpenLayers.ProxyHost = "proxy.cgi?url=";
    //OpenLayers.ProxyHost = "proxy.php?url=";
    var vector = new OpenLayers.Layer.Vector("La mia posizione", {});

    //var sprintersLayer = new OpenLayers.Layer.Vector("Sprinters", {
    //    styleMap: new OpenLayers.StyleMap({
    //        externalGraphic: "img/mobile-loc.png",
    //        graphicOpacity: 1.0,
    //        graphicWidth: 16,
    //        graphicHeight: 26,
    //        graphicYOffset: -26
    //    })
    //});
    
    var edificiVector = new OpenLayers.Layer.Vector("WFS Edifici", {
        strategies: [new OpenLayers.Strategy.BBOX()],
        projection: new OpenLayers.Projection("EPSG:3857"),
        visibility: false,
        //styleMap: new OpenLayers.StyleMap({
        //    fillColor: "#FF6666"
        //}),
        //preFeatureInsert: yourPreFeatureInsert, 
        protocol: new OpenLayers.Protocol.WFS({
            version: "1.1.0", // importante: con la 1.0.0 non funziona perche' non e' supportata la riproiezione
            url:  "http://lab.sinergis.it/geoserver/wfs",
            featureType: "EDIFICI",
            featureNS: "http://schemas.corenet.it/mapwork_cp/servizi",
            geometryName : "SHAPE",
            srsName: "EPSG:3857"
        },{isBaseLayer:false,  /*maxScale:1,  minScale:5000*/})
    });

    //var sprinters = getFeatures();
    //sprintersLayer.addFeatures(sprinters);

    var layerEdifici = new OpenLayers.Layer.WMS("WMS Edifici" , "http://lab.sinergis.it/geoserver/mapwork_cp/wms",
        {layers: 'EDIFICI', transparent: true}, 
        {isBaseLayer:false, /* maxScale:1,  minScale:25000*/} 
    );    
    
    //var selectControl = new OpenLayers.Control.SelectFeature(sprintersLayer, {
    var selectControl = new OpenLayers.Control.SelectFeature(edificiVector, {
        autoActivate:true,
        onSelect: onSelectFeatureFunction /* successFeatureSelected*/});

    var geolocate = new OpenLayers.Control.Geolocate({
        id: 'locate-control',
        geolocationOptions: {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: 7000
        }
    });
    
    // create map
    map = new OpenLayers.Map({
        div: "map",
        theme: null,
        projection: sm,
        numZoomLevels: 22,
        controls: [
            new OpenLayers.Control.Attribution(),
            new OpenLayers.Control.TouchNavigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            }),
            geolocate,
            selectControl
        ],
        layers: [
            new OpenLayers.Layer.OSM("OpenStreetMap", null, {transitionEffect: 'resize'} ),
            new OpenLayers.Layer.WMS("Ctr250c v2011" , "http://servizigis.regione.emilia-romagna.it/wms/ctr250c", {layers: 'Ctr250c_v2011'} ),
            new OpenLayers.Layer.WMS("Agea 2011 rgb" , "http://servizigis.regione.emilia-romagna.it/wms/agea2011_rgb", {layers: 'Agea2011_RGB'}  ),
            new OpenLayers.Layer.WMS("Sfumo Altimetrico40x40" , "http://servizigis.regione.emilia-romagna.it/wms/sfumo_altimetrico40x40", {layers: 'Sfumo_Altimetrico40x40'}  ),
            vector,
            edificiVector,
            layerEdifici,
            /*sprintersLayer*/
        ],
        //center: new OpenLayers.LonLat(1264192.010809, 5542121.789657),
        center: new OpenLayers.LonLat(1277415.616702, 5522436.209125),
        //center: new OpenLayers.LonLat(1697076.614,4915360.938),
        
        //1697076.614,4915360.938
        zoom: 18
    });
    
    //selectControl.activate();

    /*
    var getFeatureWFS = new OpenLayers.Control.GetFeature({
        protocol: OpenLayers.Protocol.WFS({
            url : 'http://lab.sinergis.it/geoserver/mapwork_cp/wfs',
            featureNS : 'http://schemas.corenet.it/mapwork_cp/servizi',
            featureType: ['EDIFICI'],
            featurePrefix : 'mapwork_cp',
            geometryName : "SHAPE"//,
            //srsName : "EPSG:3003"
        }),
        map: map, 
        box: true
    });
    
    //getFeatureWFS.events.register("featuresselected", this, successFeatureSelected);
    getFeatureWFS.events.register("featuresselected", this, onSelectFeatureFunction);
    getFeatureWFS.activate();
    */
    

    
    var style = {
        fillOpacity: 0.1,
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

    //function successFeatureSelected(event){
    //    alert("cioao");
    //}

    //function yourPreFeatureInsert(myVector) {
        //var geometry = myVector.geometry.clone();
        //geometry.transform(new OpenLayers.Projection("EPSG:3003"), new OpenLayers.Projection("EPSG:3857"));
        //myVector.geometry = geometry.transform(new OpenLayers.Projection("EPSG:3003"), new OpenLayers.Projection("EPSG:3857"));
        //alert("ciao");
    //} 


    //function getFeatures() {
    //    var features = {
    //        "type": "FeatureCollection",
    //        "features": [
    //            { "type": "Feature", "geometry": {"type": "Point", "coordinates": [1332700, 7906300]}, "properties": {"Name": "Igor Tihonov", "Country":"Sweden", "City":"Gothenburg"}},
    //            { "type": "Feature", "geometry": {"type": "Point", "coordinates": [790300, 6573900]}, "properties": {"Name": "Marc Jansen", "Country":"Germany", "City":"Bonn"}},
    //            { "type": "Feature", "geometry": {"type": "Point", "coordinates": [-12362007.067301,5729082.2365672]}, "properties": {"Name": "Tim Schaub", "Country":"United States of America", "City":"Bozeman"}}
    //        ]
    //    };
    //    var reader = new OpenLayers.Format.GeoJSON();
    //    return reader.read(features);
    //}

};
