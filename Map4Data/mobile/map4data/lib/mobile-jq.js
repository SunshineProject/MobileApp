// Start with the map page
window.location.replace(window.location.href.split("#")[0] + "#mappage");

var selectedFeature = null;

// fix height of content
function fixContentHeight() {
    var footer = $("div[data-role='footer']:visible"),
        content = $("div[data-role='content']:visible:visible"),
        viewHeight = $(window).height(),
        contentHeight = viewHeight - footer.outerHeight();

    if ((content.outerHeight() + footer.outerHeight()) !== viewHeight) {
        contentHeight -= (content.outerHeight() - content.height() + 1);
        content.height(contentHeight);
    }

    if (window.map && window.map instanceof OpenLayers.Map) {
        map.updateSize();
    } else {
        // initialize map
        init(function(feature) { 
            selectedFeature = feature; 
            $.mobile.changePage("#popup", "pop"); 
        });
        initLayerList();
    }
}

// one-time initialisation of button handlers 

$("#plus").live('click', function(){
    map.zoomIn();
});

$("#minus").live('click', function(){
    map.zoomOut();
});

$("#locate").live('click',function(){
    var control = map.getControlsBy("id", "locate-control")[0];
    if (control.active) {
        control.getCurrentLocation();
    } else {
        control.activate();
    }
});

//fix the content height AFTER jQuery Mobile has rendered the map page
$('#mappage').live('pageshow',function (){
    fixContentHeight();
});
    
$(window).bind("orientationchange resize pageshow", fixContentHeight);



$('#popup').live('pageshow',function(event, ui){
    var li = "";
    //for(var attr in selectedFeature.attributes){
    for(var attr in selectedFeature.attributes){
        li += "<li><div style='width:60%;float:left'>" + attr + "</div><div style='width:40%;float:right'>" 
        + selectedFeature.attributes[attr] + "</div></li>";
    }
    $("ul#details-list").empty().append(li).listview("refresh");
});

$('#searchpage').live('pageshow',function(event, ui){
    $('#query').bind('change', function(e){
        $('#search_results').empty();
        if ($('#query')[0].value === '') {
            return;
        }
        $.mobile.showPageLoadingMsg();
        // Prevent form send
        e.preventDefault();
        //http://api.geonames.org/postalCodeSearchJSON?maxRows=10&username=demo&placename=villa
        var searchUrl = 'http://api.geonames.org/postalCodeSearchJSON?maxRows=10&username=demo';
        searchUrl += '&placename=' + $('#query')[0].value;
        $.getJSON(searchUrl, function(data) {
            if (data != 'undefinded'){
                if (data.status != 'undefined' && data.status.message != 'undefined'){
                    $('<li>')
                        .hide()
                        .append($('<h2 />', {
                            text: "Errore"
                        }))
                        .append($('<p />', {
                            html: data.status.message
                        }))
                        .appendTo('#search_results')
                        .click(function() {
                            $.mobile.changePage('#mappage');
                        })
                        .show();
                }else{
                    $('<li>')
                        .hide()
                        .append($('<h2 />', {
                            text: "Ritorna"
                        }))
                        .append($('<p />', {
                            html: "alla visualizzazione precedente"
                        }))
                        .appendTo('#search_results')
                        .click(function() {
                            $.mobile.changePage('#mappage');
                        })
                        .show();                
                
                
                    $.each(data.postalCodes, function() {
                        var place = this;
                        $('<li>')
                            .hide()
                            .append($('<h2 />', {
                                text: place.placeName + " (" + place.adminCode2 + ")"
                            }))
                            .append($('<p />', {
                                html: 'provincia di <b>' + place.adminName2 + '</b>, ' + place.postalCode
                            }))
                            .appendTo('#search_results')
                            .click(function() {
                                $.mobile.changePage('#mappage');
                                var lonlat = new OpenLayers.LonLat(place.lng, place.lat);
                                map.setCenter(lonlat.transform(gg, sm), 15);
                            })
                            .show();
                    });
                }
            }
            $('#search_results').listview('refresh');
            $.mobile.hidePageLoadingMsg();
        });
    });
    // only listen to the first event triggered
    $('#searchpage').die('pageshow', arguments.callee);
});


function initLayerList() {
    $('#layerspage').page();
    $('<li>', {
            "data-role": "list-divider",
            text: "Sfondo"
        })
        .appendTo('#layerslist');
    var baseLayers = map.getLayersBy("isBaseLayer", true);
    $.each(baseLayers, function() {
        addLayerToList(this);
    });

    $('<li>', {
            "data-role": "list-divider",
            text: "Overlay"
        })
        .appendTo('#layerslist');
    var overlayLayers = map.getLayersBy("isBaseLayer", false);
    $.each(overlayLayers, function() {
        addLayerToList(this);
    });
    $('#layerslist').listview('refresh');
    
    map.events.register("addlayer", this, function(e) {
        addLayerToList(e.layer);
    });
}

function addLayerToList(layer) {
    var item = $('<li>', {
            "data-icon": "check",
            "class": layer.visibility ? "checked" : ""
        })
        .append($('<a />', {
            text: layer.name
        })
            .click(function() {
                $.mobile.changePage('#mappage');
                if (layer.isBaseLayer) {
                    layer.map.setBaseLayer(layer);
                } else {
                    layer.setVisibility(!layer.getVisibility());
                }
            })
        )
        .appendTo('#layerslist');
    layer.events.on({
        'visibilitychanged': function() {
            $(item).toggleClass('checked');
        }
    });
}
