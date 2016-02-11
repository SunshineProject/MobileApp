

function checkPreAuth(event) {
	console.log("checkPreAuth");
    var form = $("#loginForm");
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        handleLogin();
    }
}


 


function handleLogin() {
    var form = $("#loginForm");    
    //disable the button so we can't resubmit while we wait
    $("#submitButton",form).attr("disabled","disabled");
    var u = $("#username", form).val();
    var p = $("#password", form).val();
    var f = $("#pilot",form ).val();
    console.log(u);
    console.log(p);
    console.log(f);
    
    
    
    function loginPost(res) {
    	console.log(res.state);
    	console.log(res);
        if(res.state == 'true') {
            //store
        	console.log(res);
        	localStorage.clear();
            window.localStorage["username"] = u;
            window.localStorage["password"] = p;             
            //$.mobile.changePage("some.html");
            //var config_object=jQuery.parseJSON( '{ "name": "John" }' );
            //console.log(config_object)
            //localStorage["config"] = config_object;
            //localStorage.setItem('test', config_object);
            //console.log(localStorage.getItem('test')); 
            //var c = localStorage.getItem('username')
            //console.log(c);
            localStorage.setItem('config_object', JSON.stringify(res));
            console.log(JSON.stringify(res));
            //console.log(JSON.parse(localStorage.getItem('test'))); // 'value'
            
            //obj = jQuery.parseJSON( '{ "name": "John" }' );

            //window.location.replace(window.location.href.split("#")[0] + "#mappage");
            //$.mobile.changePage("index.html#mappage",{changeHash: true});
            console.log("valido");
            window.location.href = "index.html#mappage"
            //$.mobile.pageContainer.pagecontainer("index.html", "#page", {  });
            //window.location.replace(window.location.href.split("#")[0] + "#mappage");

        } else {
        	
        	$("#submitButton").removeAttr("disabled");
        	 try {
		    		window.plugins.toast.show('Error: '+res.msg, 'long', 'center' ,function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});

			} catch (e) {
				// TODO: handle exception
				alert('Error: '+res.msg);
			}
        	
        }
     //$("#submitButton").removeAttr("disabled");
    }
    
    
    
    
    
    
    
    if(u != '' && p!= '') {
    	$.ajax({
    		 //url:"http://localhost:8080/it.sinergis.map4data/rest/login2",
    		  //url:"http://172.24.17.13:8080/it.sinergis.map4data-0.0.1-SNAPSHOT/rest/login1", 
    		  //url:"http://lab.sinergis.it/map4data/rest/login1",
    		  url:"http://sunshine.sinergis.it/map4data/rest/login2",
    		  type:"POST",
    		  data:{user:u, psw:p, pilot:f},
    		  contentType:"application/json; charset=utf-8",
    		  dataType:"json",
    		  success: loginPost,
    		  error: function(XMLHttpRequest, textStatus, errorThrown) {
    			  console.log(XMLHttpRequest);
    			  console.log(textStatus);
    			  console.log(errorThrown);
    			     try {
    			    		window.plugins.toast.show('Error:'+textStatus, 'long', 'center' ,function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});

					} catch (e) {'long', 'center' ,
						// TODO: handle exception
						alert("Error:"+textStatus);
					}
    			  
    			  
    			  		
    			  }
    		})
    	
    	
    	
    	
    	
    	/*
    	
        $.post("http://localhost:8080/it.sinergis.map4data/rest/login1", {user:u, psw:p, pilot:f}, function(res) {
        	console.log(res);
            if(res == true) {
                //store
            	console.log(res);
                window.localStorage["username"] = u;
                window.localStorage["password"] = p;             
               // $.mobile.changePage("some.html");
            } else {
                navigator.notification.alert("Your login failed", function() {});
            }
         //$("#submitButton").removeAttr("disabled");
        },"json");
        */
    } else {
        //navigator.notification.alert("You must enter a username and password", function() {});
        $("#submitButton").removeAttr("disabled");
    }
    return false;
}
//checkPreAuth
//$("#loginForm").live("submit",handleLogin);


function reloadPilot(){
	var tmp = 'http://sunshine.sinergis.it/map4data/rest/pilots';
	//$.getJSON('http://localhost:8080/it.sinergis.map4data/rest/pilots', function(data){
	$.getJSON('http://sunshine.sinergis.it/map4data/rest/pilots', function(data){
	    var html = '';
	    $('#pilot').empty();
	    console.log(data.pilots[0]);
	    console.log('data');
	    var len = data.pilots.length;
	    for (var i = 0; i< len; i++) {
	    	if (i== 0){
	    		sel = "selected";
	    	}else sel = "";
	        html = '<option value="' + data.pilots[i].name + '" '+ sel+'>' + data.pilots[i].show + '</option>';
	        console.log(html);
	        $('#pilot').append(html);
	    }
	    
	    $('#pilot').change();
	    //$('#pilot').lis("refresh").trigger("create");
	    
	});
}

$("#reloadPilot").live("click",reloadPilot);
$("#submitButton").live("click",handleLogin);
$("#reloadPilot").ready(reloadPilot);



