// Start with the map page

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
    } else 	{
    	console.log('inizializza')
        // initialize map
        init(function(feature) { 
            selectedFeature = feature;             
            $.mobile.changePage("#popup", "pop");
            paginaAttributi();
            
        });
    	stopBar();
        initLayerList();
        initInfoButton();
    }
}

 function initInfoButton (){
	 //console.log('info');
	 $('#option').page();
	 console.log(config_obj.info );
	 //var valore = ;
	 if (config_obj.info != undefined ){
		 $("#infoButton").val(config_obj.info);
	 }else{
		 console.log('undefine');
		 console.log($("#divButton"));
		$("#divButton").css({"display":"none"});
		
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
    	console.log("attivo")
        control.getCurrentLocation();
    } else {
        control.activate();
        console.log("disattivo");
    }
    
});

//fix the content height AFTER jQuery Mobile has rendered the map page
$('#mappage').live('pageshow',function (){
    //fixContentHeight();
});
    

$("#logout").live('click', function(){
	localStorage.clear();
    window.location.href = "login.html"

});

$("#infoButton").live('click', function(){
	
	$("#infoText").text($("#infoButton").val());
	console.log('varico la visualizazione');
    window.location.href = "index.html#infoPage"
    //infoText = $("#infoButton").v;
    

});







$(window).bind("orientationchange resize pageshow", fixContentHeight);

$('#option').live('pageshow',function (){
    //fixContentHeight();
});
$('#layerspage').live('pageshow',function (){
    initLayerList();

    //fixContentHeight();
	
});


/*
$('#popup').live('pageshow',function(event, ui){
    var li = "<form>";

    for(var attr in selectedFeature.attributes){
    	console.log(attr)
        li += "<li valign='midle'><div style='width:25%;float:left'><label>" + attr + ":</label></div>" +
        "<div valign='midle' style='heigth:100%;width:75%;float:right;vertical-align:middle;display:table-cell;'>" 
        + '<input type="text" id="'+attr+'_attribute" value="'+selectedFeature.attributes[attr]+'"'
        + 'autocomplete="off" class="ui" style="display:inline-block;vertical-align:middle;clear: left"/>' 
        + "</div></li>";
    }
    console.log(selectedFeature);
    li += '<li><input id="attBtn_'  + selectedFeature.id + '" type="button" value="Update" onclick="updateAttributes(\'' + selectedFeature.id + '\');">';
    li += '<input id="attBtn_'  + selectedFeature.id + '" type="button" value="go back" onclick="onBackKeyDown();"></li>';
    li += ""
    
    
    
    li += "</form>";
    $("ul#details-list").empty().append(li).listview("refresh");
});
*/

//$('#popup').live('pageshow',function(event, ui){
function paginaAttributi(){
    var li =''; 
    console.log('event');
    //console.log(event);
    //console.log(ui);
    $("ul#details-list").empty()
    dizionarioValori={}
    console.log('selectedFeature')
    console.log(selectedFeature)
    for(var attr in selectedFeature.attributes){
    	console.log(attr)
    	dizionarioValori[attr]=selectedFeature.attributes[attr]
    	//selectedFeature.attributes[attr]
    	//li+=attribute_addCheck(attr,attr,[3,5,6,7,8],5)
    	
    }
    li=attribute_createForm(dizionarioValori,'ul#details-list')
    
    /*
    li='<li data-role="fieldcontain">'+
    	'<fieldset data-role="controlgroup" data-type="horizontal">'+	
    	'<legend>Font styling:</legend>'+	
    	'<input type="checkbox" name="checkbox-6a" id="checkbox-6a" class="custom">'+
    	'<label for="checkbox-6a">b</label>'+
    	'<input type="checkbox" name="checkbox-7a" id="checkbox-7a" class="custom">'+
    	'<label for="checkbox-7a"><em>i</em></label>'+
    	'<input type="checkbox" name="checkbox-8a" id="checkbox-8a" class="custom">'+
    	'<label for="checkbox-8a">u</label>'+
    	'</fieldset>'+
    	'</li>'
    */
    
    
    
    
    
    li+='<li class="ui-body ui-body-b" id=list>' +
                           ' <fieldset class="ui-grid-a"> ' +
                                   ' <div class="ui-block-a"><button type="submit" data-theme="a" onclick="onBackKeyDown();" >Cancel</button></div>' +
                                   ' <div class="ui-block-b"><button type="submit" data-theme="a" onclick="updateAttributes(\'' + selectedFeature.id + '\');">Submit</button></div>' +
                            '</fieldset>' +
                        '</li>'
                            
    //lili='<li class="ui-body ui-body-b" id=list/>';
    //fs='<fieldset class="ui-grid-a" id=gridf/>';
    //im1='<button type="submit" data-theme="d" onclick="onBackKeyDown();" >Cancel</button>'
    //im2='<button type="submit" data-theme="a" onclick="updateAttributes(\'' + selectedFeature.id + '\');">Submit</button>' 
    //$("ul#details-list").append(lili)
    //$("li#list").append(fs)
    //$("fieldset").append(im1)
    //$("fieldset").append(im2)
                            

    //.append(li);
    $("ul#details-list").append(li).listview("refresh").trigger("create");
}
//);

function onBackKeyDownAtt() {
	
    //history.go(-1);
	//    	navigator.app.backHistory();
	window.location.replace(window.location.href.split("#")[0] + "#popup");
}




function onBackKeyDown() {
	
    //history.go(-1);
	//    	navigator.app.backHistory();
	window.location.replace(window.location.href.split("#")[0] + "#mappage");
}

function updateAttributes(fid){
	//window.plugins.toast.show('the data are sending to the server ', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});

	console.log('invio' );
	console.log(select);
	console.log(selectedFeature);
	//var lyr   = map.layers[map.aktLayer];
	var objF = select.features[0]//selectedFeature//lyr.selectedFeatures[0];
	
    for(var i in attribute_list){
    	attr = attribute_list[i]
    	console.log(attr);
    	console.log('provo a salvare ');
    	objF.attributes[attr.dbName]        =  getValue_Attribute(attr)//document.getElementById(attr.db_name+'_attribute').value;
    	
    	objF.state = OpenLayers.State.UPDATE;
    }
	console.log("ogettoF:");
	console.log(objF);
	
	saveStrategy.save();
	// versione 2 
	/*function make_base_auth(user, password) {
		  var tok = user + ':' + password;
		  var hash = btoa(tok);
		  return "Basic " + hash;
		}
	$.ajax
	({
	  type: "GET",
	  url: config_obj['wfs'],
	  //dataType: 'json',
	  //cache: true,
	  beforeSend: function (xhr){ 
	        xhr.setRequestHeader('Authorization', make_base_auth(config_obj['geouser'],  config_obj['geopsw'])); 
	    },
	  //beforeSend: function(xhr) { xhr.setRequestHeader("Authorization", "Basic " + btoa(config_obj['geouser'] + ":" + config_obj['geopsw'])); },
	  async: false,
	  
	  //username: config_obj['geouser'], 
	  //password: config_obj['geopsw'], 
	  
	  headers: {
	    "Authorization": "Basic " + btoa(config_obj['geouser'] + ":" + config_obj['geopsw'])
	  },
	  data: '{}',
	  success: function (){
	    //alert('Thanks for your comment!'); 
		  console.log ("login avvenuto con successo");
		  saveStrategy.save();

	  },
	  error: function (){
		    //alert('Thanks for your comment!'); 
		  console.log ("errore login ");
		  console.log( config_obj['wfs']);
		  console.log(config_obj['geouser']);
		  console.log(config_obj['geopsw']);
		  
		  try {
		  window.plugins.toast.show('Geoserver login error','long', 'center' , function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
		  } catch (e) {
				console.log("allert"+ e );
				alert('Geoserver login error');
			}
		  }
	});*/
}











/*
$('#searchpage').live('pageshow',function(event, ui){
    $('#query').bind('change', function(e){
        $('#search_results').empty();
        if ($('#query')[0].value === '') {
            return;
        }
        $.mobile.showPageLoadingMsg();

        // Prevent form send
        e.preventDefault();

        var searchUrl = 'http://ws.geonames.org/searchJSON?featureClass=P&maxRows=10';
        searchUrl += '&name_startsWith=' + $('#query')[0].value;
        $.getJSON(searchUrl, function(data) {
            $.each(data.geonames, function() {
                var place = this;
                $('<li>')
                    .hide()
                    .append($('<h2 />', {
                        text: place.name
                    }))
                    .append($('<p />', {
                        html: '<b>' + place.countryName + '</b> ' + place.fcodeName
                    }))
                    .appendTo('#search_results')
                    .click(function() {
                        $.mobile.changePage('#mappage');
                        var lonlat = new OpenLayers.LonLat(place.lng, place.lat);
                        map.setCenter(lonlat.transform(gg, sm), 10);
                    })
                    .show();
            });
            $('#search_results').listview('refresh');
            $.mobile.hidePageLoadingMsg();
        });
    });
    // only listen to the first event triggered
    $('#searchpage').die('pageshow', arguments.callee);
});
*/

function initLayerList() {
    //cambia pagina
	$('#layerspage').page();
	 $('#layerslist').empty();
	$('<li>',{
		 "data-role": "list-divider",
         text: "Building layers style"
       
	}).appendTo('#layerslist');
  
	var stili = config_obj['styles'];

	if (typeof  stili  !== "undefined" ){
		
		$.each(stili, function() {
	        
			//console.log(this);
	        
	        addStyleToList(this,stili);
	    });
	    var contenitore = $('<li>', {
	            "data-role": "list-divider",
	            text: "Base Layers"
	    }).appendTo('#layerslist');
	    
	    contenitore.appendTo('#layerslist');
	}    
	   
    var baseLayers = map.getLayersBy("isBaseLayer", true);
    $.each(baseLayers, function() {
        addLayerToList(this);
    });
    
    $('<li>', {
            "data-role": "list-divider",
            text: "Overlay Layers"
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

function addStyleToList(style,stili){
	
	console.log (style.key);
	console.log (layerEdifici.params.STYLES);
	console.log(layerEdifici.params.STYLES);
	if (layerEdifici.params.STYLES === null || typeof  layerEdifici.params.STYLES  == "undefined" || layerEdifici.params.STYLES  == "" ){ 
		layerEdifici.params.STYLES=style.key;
	}
	  var item = $('<li>', {
          "data-icon": "check",
          "class": style.key===layerEdifici.params.STYLES ? "checked" : ""
      })
      .append($('<a />', {
          text: style.value
      })
          .click(function() {
              $.mobile.changePage('#mappage');
              console.log(layerEdifici);
              layerEdifici.params.STYLES = style.key;
              console.log(layerEdifici);
              //layerEdifici.clean(true);
              layerEdifici.redraw(true) ; 
              /*$.each(stili, function() {
            	  console.log(stili);
                  //this.removeClass('checked');
                  
              });*/
              $(item).toggleClass('checked');
              
          })
      )
      .appendTo('#layerslist');
	  
	  
	  

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
window.location.replace(window.location.href.split("#")[0] + "#mappage");

