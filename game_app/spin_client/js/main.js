/* .........Main JS code written here .......... */

var spinClient = new SpinClient();

function spinStart(){
			
			/*---------Alert status for Win & Bonus -------------*/
			document.getElementById('statMod').style.display="none";
			document.getElementById('bon').style.display="none";
			
			/*--------- Image Animation start -------------------*/
			document.getElementById("fig1").classList.add("figure");
			document.getElementById("fig2").classList.add("figure");
			document.getElementById("fig3").classList.add("figure");			
			
			setTimeout(function(){ 
				spinClient.playSpin();
			}, 3000);
					
}
	
function SpinClient(){

    this.playSpin = function(){

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
					
					document.getElementById("fig1").classList.remove("figure");
					document.getElementById("fig2").classList.remove("figure");
					document.getElementById("fig3").classList.remove("figure");
				
				
				
                   if (xmlhttp.status == 200) {
                       var resultJSON = xmlhttp.responseText;
                       var resultObject = JSON.parse(resultJSON);
                       var num1 = resultObject.first;
                       var num2 = resultObject.second;
                       var num3 = resultObject.third;
					  
					  /*---------Allocating images as per received number value -------------*/
					  var imgUrl1 = "images/Symbol_"+ num1 +".png";
							document.getElementById('fig1').getElementsByTagName("img")[0].src=imgUrl1;
					   var imgUrl2 = "images/Symbol_"+ num2 +".png";
							document.getElementById('fig2').getElementsByTagName("img")[0].src=imgUrl2;
					   var imgUrl3 = "images/Symbol_"+ num3 +".png";
							document.getElementById('fig3').getElementsByTagName("img")[0].src=imgUrl3; 
						
						/*---------Check for winning status here ----------------------------*/
						if(num1 == num2){
							if(num1 == num3){
								document.getElementById('statMod').getElementsByTagName("h3")[0].innerHTML="Big Win";
								document.getElementById('statMod').style.display="block";
							}
							else{
								document.getElementById('statMod').getElementsByTagName("h3")[0].innerHTML="Small Win";
								document.getElementById('statMod').style.display="block";
							}
						}
						else{
							if(num1==num3){
								document.getElementById('statMod').getElementsByTagName("h3")[0].innerHTML="Small Win";
								document.getElementById('statMod').style.display="block";
							}
							else if (num2==num3){
								document.getElementById('statMod').getElementsByTagName("h3")[0].innerHTML="Small Win";
								document.getElementById('statMod').style.display="block";
							}
							else{
								document.getElementById('statMod').getElementsByTagName("h3")[0].innerHTML="No Win";
								document.getElementById('statMod').style.display="block";
							}	
						}
					/*---------call for Bonus alert-------------*/
					spinClient.checkBonus();
                   }
                   else{
                      alert('Server down. Play later.');
                   }
                }
        };
        
        xmlhttp.open("GET", "http://localhost:3000/api/play", true);                
        xmlhttp.send();
    }

	this.checkBonus = function(){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
				   if (xmlhttp.status == 200) {
					   var result = xmlhttp.responseText;
					   if(result == "true"){
							document.getElementById('bon').getElementsByTagName("h3")[0].innerHTML="Bonus";
							document.getElementById('bon').style.display="block";
						}
						else{}
				   }
				   else{
					  alert('Server down. Play later.');
				   }
				}
		};
		
		xmlhttp.open("GET", "http://localhost:3000/api/bonus", true);
		xmlhttp.send();
	}

}

