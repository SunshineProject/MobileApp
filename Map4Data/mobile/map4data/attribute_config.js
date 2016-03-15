/*parametri di configurazione per le feacture da aggiornare
 * 
 * 
 * 
 * 
 */
//Da DEcidere se i valori peresi in considerazione sono da stabile a libello appliccatico o altro
//per esempio in caso di check box, come faccio a capire il tipo in cui sono memorizzati? 
//in caso non matcha nesssuno dei valori forniti come comportarsi?
//capire se il valore è nullo come funziona la richiesta e se è possibile aggiorare i valori in qulche modo 
var config_obj=JSON.parse(localStorage.getItem('config_object'));
var attribute_list = config_obj.listParameter;
console.log('listParameter');
console.log(attribute_list);


function generateInfoButton(id){
	var infotab = "";
	if (infoAtribute == undefined){
		infotab = "";
	}else {//'+infoAtribute+'
		infotabtext=infoAtribute;
		infotab =  '<a  onclick="setInfo('+id+');" data-role="button" data-icon="info" data-iconpos="notext">info</a>';
	}
	return infotab;
}

function setInfo(id){
	infotabtext = attribute_list[id].info;
	 //$("#infoText").text(infotabtext);
	$("#infoHtml").empty();
	$("#infoHtml").append(infotabtext);
	 console.log('varico la visualizazione');
	 window.location.href = "index.html#infoPage";
}


/*var attribute_list=[
                {
                	db_name: 'piani',
                	nome_visualizzato: 'numero Piani',
                	tipologia: 'intero',
                	valori:['1','2','3','4','5+']                
                
                },
                {
                	db_name: 'epoca',
                	nome_visualizzato: 'epoca',
                	tipologia: 'radioButton',
                	valori:['<1970','<1980','<1990','2000','<2100']                
                
                },
                {
                	db_name: 'uso',
                	nome_visualizzato: 'uso',
                	tipologia: 'checkBox',
                	valori:['residenziale','commercio','uffici','industria','artigianato'],                
                
                },
                {
                	db_name: 'consumo',
                	nome_visualizzato: 'consumo',
                	tipologia: 'intero',
                	valori:[]                
                
                },
         
];

*/
/*
 * funzioni che generano la finestra per i tipi de si vuole aggiungere le impostazioni per atri tipi registrarla da qui 
 */



function attribute_addTextArea(db_name,nome_visualizzato,valori,value,style,infoAtribute,id) {
	classe = 'ui-input-text ui-body-c ui-corner-all ui-shadow-inset';
	var infotab =generateInfoButton(id);
	li='<li data-role="fieldcontain">'+
	'<div for="'+db_name+'_attribute" style=" display: inline-block">' +
	infotab+ 
	'</div>'+
		'<label for="'+db_name+'" class="ui-input-text" style="'+style+'">'+nome_visualizzato+':</label>'+
		'<textarea cols="40" rows="8" name="'+db_name+'_attribute" id="'+db_name+'_attribute" class="'+classe+'" '+
		 'style="margin: 0px; height: 64px; width: 100%; "></textarea>'+
		 '</li>';
	
	return li;
};

function attribute_addText(db_name,nome_visualizzato,valori,value,style,style,infoAtribute,id) {
	//classe = 'ui-input-text ui-body-c ui-corner-all ui-shadow-inset';
	console.log(value)
	var infotab =generateInfoButton(id);
	li='<li data-role="fieldcontain">'+
	'<div for="'+db_name+'_attribute" style=" display: inline-block">' +
	infotab+ 
	'</div>'+
		'<label for="'+db_name+'" class="ui-input-text" style="'+style+'">'+nome_visualizzato+':</label>'+
		'<input name="'+db_name+'_attribute" id="'+db_name+'_attribute" value='+value+' class="custom" >'
		 '</li>';
	
	return li;
};


function attribute_addIntero(db_name,nome_visualizzato,valori,value,style,infoAtribute,id) {
	//classe = 'ui-input-text ui-body-c ui-corner-all ui-shadow-inset';
	var infotab =generateInfoButton(id);
	console.log(value)
	li='<li data-role="fieldcontain">'+
	'<div for="'+db_name+'_attribute" style=" display: inline">' +
	infotab+ 
	'</div>'+
		'<label for="'+db_name+'" class="ui-input-text" style="'+style+'">'+nome_visualizzato+':</label>'+
		'<input type="number" name="'+db_name+'_attribute" id="'+db_name+'_attribute" value='+value+' class="custom" >'
		 '</li>';
	
	return li;
};



function attribute_addUser(db_name,nome_visualizzato,valori,value,style,infoAtribute,id) {
	//classe = 'ui-input-text ui-body-c ui-corner-all ui-shadow-inset';
	console.log(value)
		console.log( window.localStorage["username"]);
	li='<input type="hidden" name="'+db_name+'_attribute" id="'+db_name+'_attribute" value='+ window.localStorage["username"]+' class="custom" >';
	
	return li;
};


function generate_list(db_name,nome_visualizzato,valori){
	var valorim = $.parseJSON(decodeURI(valori));		
    valoril =[]
	console.log("guatdadfa ");
    console.log(valorim);
	tmp_values =  $("button#"+db_name+"_attribute").val();//(li).listview("refresh").trigger("create");
	console.log(tmp_values)
    if (tmp_values == null){
		values = null
    }else    
    	values =tmp_values.split("|");
	console.log(values)

    

	for(i=0; i<n_campi;i++){
		try {
			tmp_v = values[i]
			if (parseInt(tmp_v)>0  ){
				tmp_i = parseInt(tmp_v);
				valoril.push(tmp_i)
			}
			else{
				tmp_i = null;
				valoril.push(null)
			}
		} catch (e) {
			tmp_i = null;
			valoril.push(null)
		}
	}
	
	
	
	
	$("ul#check-list").empty()
    window.location.replace(window.location.href.split("#")[0] + "#popupc");
	li_m = ''
	for (x in  valorim){
		li_m += attribute_addIntero(valorim[x]['key'],valorim[x]['value'],'',valoril[x],style)
		
	}    
	//li_m=attribute_addCheck_u(db_name,nome_visualizzato,valorim,tmp_values)
	
	
    //tmp_values = 
	//li_m=attribute_addCheck_u(db_name,nome_visualizzato,valorim,tmp_values)
	li_m+='<li>' +
                           ' <fieldset class="ui-grid-a"> ' +
                                   ' <div class="ui-block-a"><button type="submit" data-theme="a" onclick="onBackKeyDownAtt();" >Cancel</button></div>' +
                                   ' <div class="ui-block-b"><button type="submit" data-theme="a" onclick="setListAttribute(\''+db_name+'\',\''+ valori+'\' );">OK</button></div>' +
                            '</fieldset>' +
                        '</li>'
	$("ul#check-list").append(li_m).trigger("create");		
	
}



function generate_check(db_name,nome_visualizzato,valori){
    console.log(db_name+' '+nome_visualizzato)
    var valorim = $.parseJSON(decodeURI(valori));
    console.log("guatdadfa ");
    console.log(valorim)
    
    tmp_values =  $("button#"+db_name+"_attribute").val();//(li).listview("refresh").trigger("create");
    
    
    
    console.log(tmp_values)
	//li_m=attribute_addCheck_u(db_name,nome_visualizzato,valorim,tmp_values)
	$("ul#check-list").empty()
	window.location.replace(window.location.href.split("#")[0] + "#popupc");
    tmp_values = 
	li_m=attribute_addCheck_u(db_name,nome_visualizzato,valorim,tmp_values)
	li+='<li>' +
                           ' <fieldset class="ui-grid-a"> ' +
                                   ' <div class="ui-block-a"><button type="submit" data-theme="a" onclick="onBackKeyDownAtt();" >Cancel</button></div>' +
                                   ' <div class="ui-block-b"><button type="submit" data-theme="a" onclick="setCheckAttribute(\''+db_name+'\',\''+ valori+'\' );">OK</button></div>' +
                            '</fieldset>' +
                        '</li>'
	$("ul#check-list").append(li).trigger("create");		
	
}

function setListAttribute(db_name,json){
	
	console.log(json );
	var valorim = $.parseJSON(decodeURI(json));
	tmp_listvalori = []
	for (x in valorim){
		tmp_listvalori .push( $("input#"+valorim[x]['key']+"_attribute").val())
		console.log()
	}
	console.log (tmp_listvalori) 
	
	
	dic = {}
	for (v in valorim){
		dic[valorim[v].key]=valorim[v].value
		
	}
	console.log (dic)
	
	
	valoriv=''
	valoril=''
	for (v in tmp_listvalori){
		
		valoril+=tmp_listvalori[v];
		valoriv+=tmp_listvalori[v];
		
		if (v < valorim.length -1 ) {
			valoril +='|';
			valoriv +=' - ';
		}
		
	}
	if (tmp_listvalori.length == 0)  valoriv = 'no value'
	
	//setto i valori per la nuova lista			
	window.location.replace(window.location.href.split("#")[0] + "#popup");
	$("button#"+db_name+"_attribute").val(valoril);//(li).listview("refresh").trigger("create");
	$("button#"+db_name+"_attribute").text(valoriv).button('refresh')
}










function setCheckAttribute(db_name,json){
	
	
	valori = getListValusesCheck(db_name)
	console.log(valori);
	console.log(json );
	var valorim = $.parseJSON(decodeURI(json));
	
	dic = {}
	for (v in valorim){
		dic[valorim[v].key]=valorim[v].value
		
	}
	console.log (dic)
	
	
	valoriv=''
	valoril=''
	for (v in valori){
		valoril+=valori[v]+'|';
		valoriv+=dic[valori[v]]+', ';			
	}
	if (valori.length == 0)  valoriv = 'no value'
	
	
	
	
	
	window.location.replace(window.location.href.split("#")[0] + "#popup");
	//"'+db_name+'
	$("button#"+db_name+"_attribute").val(valoril);//(li).listview("refresh").trigger("create");
	//$("li#"+(db_name)+"_li").
	//strfun='generate_check(\''+db_name+'\',\''+nome_visualizzato+'\',\''+valori+'\',\''+value+'\');'
	tmp_values = valori
	//$("input#"+db_name+"_attribute").onclick(strfun);//(li).listview("refresh").trigger("create");

	$("button#"+db_name+"_attribute").text(valoriv).button('refresh')
	
	//$("input#"+db_name+"_attribute").reload();
	console.log($("button#"+db_name+"_attribute").val());
	
}





function attribute_addMultipleInt(db_name,nome_visualizzato,valori,value,style,infoAtribute,id) {
	dic = {}
	n_campi = valori.length;
	if (value == null){}
	if (value == null){
		values = null
		stringa = "no value"
    }else    
    	values =value.split("|");
	
	if (values.length<1){
		valoreStringa='no value'
	}
	else {
		valoreStringa='';
		valoril = []
		for(i=0; i<n_campi;i++){
			tmp_v = values[i]
			valoril.push(tmp_v)
			if (parseInt(tmp_v)>0  ){
				tmp_i = parseInt(tmp_v);
			}
			else{
				tmp_i = null;
			}
			valoreStringa+= tmp_i
			if (i<n_campi-1){				
				valoreStringa+=' - '
			}
		}
	}
	
	
	
	
	
	tmp_values = values
	console.log ('tmp_values')

	console.log (tmp_values)
	//strfun='generate_check(\''+db_name+'\',\''+nome_visualizzato+'\',\''+valori+'\',\''+value+'\');'
	console.log("valori!!!!!!!!!!!!!! ");
	console.log(valoril)
	var myJsonString = encodeURI(JSON.stringify(valori));
	//myJsonString = valori 
	strfun='generate_list(\''+db_name+'\',\''+nome_visualizzato+'\',\''+myJsonString+'\');'
	li='<li data-role="fieldcontain" id="'+(db_name)+'_li">'+
		'<label for="'+db_name+'" class="ui-input-text" style="'+style+'">'+nome_visualizzato+':</label>'+
		//'<a href="index.html" data-role="button" data-icon="info" data-iconpos="notext">Delete</a>'+
		//'<input onclick="'+strfun+'"  type="button" name="'+db_name+'_attribute" id="'+db_name+'_attribute" value="'+value+'" class="custom" >'
		'<button  onclick="'+strfun+'" name="'+db_name+'_attribute" id="'+db_name+'_attribute" value="'+value+'" class="custom" >'+valoreStringa+'</button>'
		//'<a href="#popupc" data-role="button" data-mini="true"  name="'+db_name+'_attribute" id="'+db_name+'_attribute">'+valoreStringa+'</a>'
		'</li>';
	
	var infotab =generateInfoButton(id);
	li='<li data-role="fieldcontain" id="'+(db_name)+'_li">'+
	'<div for="'+db_name+'_attribute" style=" display: inline-block">' +
	infotab+ 
	'</div>'+
	'<label  class="ui-input-text" style="'+style+'">'+nome_visualizzato+':</label>'+
	//'<input onclick="'+strfun+'"  type="button" name="'+db_name+'_attribute" id="'+db_name+'_attribute" value="'+value+'" class="custom" >'
	'<button  onclick="'+strfun+'" name="'+db_name+'_attribute" id="'+db_name+'_attribute" value="'+value+'" class="custom" >'+valoreStringa+'</button>'
	//'<a href="#popupc" data-role="button" data-mini="true"  name="'+db_name+'_attribute" id="'+db_name+'_attribute">'+valoreStringa+'</a>'
	'</li>';
	
	return li

};



function attribute_addCheck(db_name,nome_visualizzato,valori,value,style,infoAtribute,id) {
	dic = {}
	for (v in valori){
		dic[valori[v].key]=valori[v].value
		
	}
	if (value == null){
    	values = []
    }else    values =value.split("|");
	
	if (values.length==0){
		valoreStringa='no value'
		value=""
	}
	else {
		valoreStringa='';
		for(i=0; i<values.length;i++){
			if (dic[values[i]]){
				valoreStringa+=dic[values[i]];
				if ( i<values.length-2){
					valoreStringa+=', '
				}
			}
		}
	}
	tmp_values = values
	console.log ('tmp_values')

	console.log (tmp_values)
	//strfun='generate_check(\''+db_name+'\',\''+nome_visualizzato+'\',\''+valori+'\',\''+value+'\');'
	console.log("valori!!!!!!!!!!!!!! ");
	console.log(valori)
	var myJsonString = encodeURI(JSON.stringify(valori));
	//myJsonString = valori 
	strfun='generate_check(\''+db_name+'\',\''+nome_visualizzato+'\',\''+myJsonString+'\');'
	
	var infotab = generateInfoButton(id);
	
	li='<li data-role="fieldcontain" id="'+(db_name)+'_li">'+
		'<div for="'+db_name+'_attribute" style=" display: inline-block">' +
		infotab+ 
		'</div>'+
		'<label for="'+db_name+'" class="ui-input-text" style="'+style+'">'+nome_visualizzato+':</label>'+
		//'<input onclick="'+strfun+'"  type="button" name="'+db_name+'_attribute" id="'+db_name+'_attribute" value="'+value+'" class="custom" >'
		'<button  onclick="'+strfun+'" name="'+db_name+'_attribute" id="'+db_name+'_attribute" value="'+value+'" class="custom" >'+valoreStringa+'</button>'
		//'<a href="#popupc" data-role="button" data-mini="true"  name="'+db_name+'_attribute" id="'+db_name+'_attribute">'+valoreStringa+'</a>'
		'</li>';
	
	
	return li

};
/*
function attribute_addCheck_u_old(db_name,nome_visualizzato,valori,value) {

	li ='<li data-role="fieldcontain"><fieldset data-role="controlgroup">'
    li += '<legend>'+nome_visualizzato+':</legend>'
    if (value == null){
    	values = []
    }else    values =value;//.split("|");
    valori = valori.split(",");
	for (valorei in valori){
		valore = valori[valorei]
    	checked="checked" 
    	if ($.inArray(valore, values) >=0 ){//valore in values
    		checked="checked=checked" 
    	}else{
    		checked=""
    	}
    	
    	li+='<input type="checkbox" name="'+(db_name)+'_attribute" id="'+(db_name+valore)+'_attribute" data-theme="b"  class="custom" value="'+(valore)+'" '+checked+' />'
     	li+='<label for="'+(db_name+valore)+'_attribute">'+valore+'</label>'
    }
	
	li+= '</fieldset></li>'
	//li+= '</fieldset>'+ '</div></li>'			
	return li;
};
*/



function attribute_addCheck_u(db_name,nome_visualizzato,valori,value) {

	li ='<li data-role="fieldcontain"><fieldset data-role="controlgroup">'
    li += '<legend >'+nome_visualizzato+':</legend>'
    
    if (value == null){
    	values = []
    }else    values =value.split("|");
    
	for (valorei in valori){
		valore = valori[valorei]
		console.log (valore)
    	if ($.inArray(valore["key"], values) >=0 ){//valore in values
    		checked="checked=checked" 
    	}else{
    		checked=""
    	}
		console.log (checked)
    	li+='<input type="checkbox" name="'+(db_name)+'_attribute" id="'+(db_name+valore["key"])+'_attribute" data-theme="b"  class="custom" value="'+(valore["key"])+'" '+checked+' />'
     	li+='<label for="'+(db_name+valore["key"])+'_attribute">'+valore["value"]+'</label>'
    }
	
	li+= '</fieldset></li>'
	//li+= '</fieldset>'+ '</div></li>'			
	return li;
};










/*

function attribute_addCheck_old(db_name,nome_visualizzato,valori,value) {

	rete='<li  data-role="fieldcontain">\
    <fieldset data-role="controlgroup">\
        <legend>Choose as many snacks as youd like:</legend>\
        <input type="checkbox" name="checkbox-1a" id="checkbox-1a"  class="custom" />\
        <label for="checkbox-1a">Cheetos</label>\
        <input type="checkbox" name="checkbox-2a" id="checkbox-2a" class="custom" />\
        <label for="checkbox-2a">Doritos</label>\
        <input type="checkbox" name="checkbox-3a" id="checkbox-3a" class="custom" />\
        <label for="checkbox-3a">Fritos</label>\
        <input type="checkbox" name="checkbox-4a" id="checkbox-4a" class="custom" />\
        <label for="checkbox-4a">Sun Chips</label>\
    </fieldset>\
</li>'
//return rete
	//li ='<li data-role="list-divider"><div data-role="fieldcontain"> <fieldset data-role="controlgroup">'
	li ='<li data-role="fieldcontain"><fieldset data-role="controlgroup">'
	//li = '<div role="heading" class="ui-controlgroup-label"><legend>'+nome_visualizzato+':</legend></div> '
	//li +='<div class="ui-controlgroup-controls">' + '<fieldset data-role="controlgroup">'
    li += '<legend>'+nome_visualizzato+':</legend>'
    if (value == null){
    	values = []
    }else    values =value.split("|");
    
	for (valorei in valori){
		valore = valori[valorei]
    	checked="checked" 
    	if ($.inArray(valore, values) >=0 ){//valore in values
    		checked="checked=checked" 
    	}else{
    		checked=""
    	}
    	
    	li+='<input type="checkbox" name="'+(db_name)+'_attribute" id="'+(db_name+valore["key"])+'_attribute" data-theme="b"  class="custom" value="'+(valore ["key"])+'" '+checked+' />'
     	li+='<label for="'+(db_name+valore)+'_attribute">'+valore["value"]+'</label>'
    }
	
	li+= '</fieldset></li>'
	//li+= '</fieldset>'+ '</div></li>'			
	return li;
};*/
function attribute_addRadio(db_name,nome_visualizzato,valori,value,style,infoAtribute,id) {
	var infotab =generateInfoButton(id);
	li ='<li data-role="fieldcontain"> <div data-role="fieldcontain">'+
		'<div for="'+db_name+'_attribute" style=" display: inline-block">' +
		infotab+ 
		'</div>';
	//li = '<div role="heading" class="ui-controlgroup-label"><legend>'+nome_visualizzato+':</legend></div> '
	//li +='<div class="ui-controlgroup-controls">' + '<fieldset data-role="controlgroup">'
	li+='<label for="'+(db_name)+'_attribute" style="'+style+'">'+nome_visualizzato+'</label>'
	li+= '<select name="'+(db_name)+'_attribute" id="'+((db_name))+'_attribute" data-native-menu="true">'
	for (valorei in valori){
		valore = valori[valorei];
		console.log(valore["key"]+"pppp");
		console.log(valore["key"]+"-==-"+value+"!!!" )
		if (valore["key"] == value){
			console.log("ugualw" )
			li+='<option value="'+(valore["key"])+'" selected="selected" >'+(valore["value"])+'</option>'
		}else{
			li+='<option value="'+(valore["key"])+'">'+(valore["value"])+'</option>'
		}
	}
	/*for (valorei in valori){
		valore = valori[valorei]
    	checked="checked" 
    	if (valore == value){
    		checked="checked=checked" 
    	}else{
    		checked=""
    	}
    	
    	li+='<input type="radio" name="'+(db_name)+'_attribute" id="'+((db_name+valore))+'_attribute" value="'+(valore)+'" '+checked+'/>'
     	li+='<label for="'+(db_name+valore)+'_attribute">'+valore+'</label>'
    }
	
	*/
	li+='</select></div></li>'			
	return li;
};

function attribute_addRadio_old(db_name,nome_visualizzato,valori,value) {

	li ='<li data-role="fieldcontain"><fieldset data-role="controlgroup">'
	//li = '<div role="heading" class="ui-controlgroup-label"><legend>'+nome_visualizzato+':</legend></div> '
	//li +='<div class="ui-controlgroup-controls">' + '<fieldset data-role="controlgroup">'
    li += '<legend>'+nome_visualizzato+':</legend>'
	for (valorei in valori){
		valore = valori[valorei]
    	checked="checked" 
    	if (valore == value){
    		checked="checked=checked" 
    	}else{
    		checked=""
    	}
    	
    	li+='<input type="radio" name="'+(db_name)+'_attribute" id="'+((db_name+valore))+'_attribute" value="'+(valore)+'" '+checked+'/>'
     	li+='<label for="'+(db_name+valore)+'_attribute">'+valore+'</label>'
    }
	
	
	li+= '</fieldset>'+ '</li>'			
	return li;
};





function attribute_createForm(diz){
	
	console.log (attribute_list)
	li = ""
	for (i in attribute_list){
		db_name = attribute_list[i].dbName
		nome_visualizzato =  attribute_list[i].nameShow
		tipologia =  attribute_list[i].kind
		valori = attribute_list[i].values
		style = attribute_list[i].style
		value=diz[db_name]
		
		infoAtribute = attribute_list[i].info
		
		
		stile=""
		
		if (style == 1){
			stile="color: red;font-weight: bold "
		}else {
			stile = ""
		}
		
		if (tipologia=='intero') li+=attribute_addIntero(db_name,nome_visualizzato,valori,value,stile,infoAtribute,i);
		else if (tipologia == 'textArea')li+=attribute_addText(db_name,nome_visualizzato,valori,value,stile,infoAtribute,i);
		else if (tipologia=='radioButton') li+=attribute_addRadio(db_name,nome_visualizzato,valori,value,stile,infoAtribute,i);
		else if (tipologia=='checkBox')  li+=attribute_addCheck(db_name,nome_visualizzato,valori,value,stile,infoAtribute,i);
		else if (tipologia=='multiploInt')  li+=attribute_addMultipleInt(db_name,nome_visualizzato,valori,value,stile,infoAtribute,i);
		else if (tipologia=='hideUser') li+=attribute_addUser(db_name,nome_visualizzato,valori,value,stile,infoAtribute,i);
		else console.log('Non esiste il tipo selezionatato')
	}
	return li;
}
	


/*
function updateAttributes(fid){
	console.log('invio' );
	console.log(attribute_list);
	var lyr   = map.layers[map.aktLayer];
	var objF = selectedFeature//lyr.selectedFeatures[0];
	
    for(var i in attribute_list){
    	attr = attribute_list[i]
    	console.log(attr);
    	console.log('provo a salvare ');
    	objF.attributes[attr.db_name]        = document.getElementById(attr.db_name+'_attribute').value;    	
    	objF.state = OpenLayers.State.UPDATE;
    }saveStrategy.save();
}
*/    


function getValue_Attribute(obj){
	tipo = obj.kind;
	db_name = obj.dbName;
	if (tipo == 'checkBox' ){//|| tipo == 'radioButton'
		console.log('check')
		tmp = document.getElementById(attr.dbName+'_attribute').value
		
		//var tmp = getListValuses(db_name,tipo);
		console.log(tmp)
		return tmp 
	}
	else {
		return document.getElementById(attr.dbName+'_attribute').value;
	}
	
}

function getListValuses(db_name,tipo){
	var valori = []
	$('input[name="'+(db_name)+'_attribute"]:checked').each(function() {
		valori.push(this.value);
		});
	if (tipo == 'checkBox'){
			var str = ''
			for (v in valori){
				str+=valori[v]+'|';
				
			}
			return str
	}
	else if ( tipo == 'radioButton'){
			var str = '';
			var int = 0;
			for (v in valori){
				str=valori[v];
				int+=1;
				
					
			}
			if (int <1) console.log('nullo')
			if (int > 1){ 
				console.log('errore');
				return str;
			}
			return str

	return null;
	}
	
}


function getListValusesCheck(db_name){
	var valori = []
	$('input[name="'+(db_name)+'_attribute"]:checked').each(function() {
		//console.log(this)
		valori.push(this.value);
		});
	return valori;
	/*
	if (tipo == 'checkBox'){
			var str = ''
			for (v in valori){
				str+=valori[v]+'|';
				
			}
			return str
	}*/
	
	
}







		
//var tipologie=['text','intero','textArea','checkBox','radioButton','data'];
		
		
		
