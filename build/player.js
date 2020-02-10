(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//WEBSOCKET FUNCTIONS *******************
function init()
{
    //Event listeners:
    var btn = document.getElementById("send_button");
    console.log('test2');
    if(btn){
        console.log('test3');
        btn.addEventListener('click', getChoice);
    }
}

//WEBSOCKET FUNCTIONS
/*
function testWebSocket()
{
	//var wsUri = 'wss://echo.websocket.org';
	var wsUri = "ws://127.0.0.1:1337";
    //var wsUri = "ws://localhost:3000/";
    
	websocket = new WebSocket(wsUri);
	websocket.onopen = function(evt) { onOpen(evt) };
	websocket.onclose = function(evt) { onClose(evt) };
	websocket.onmessage = function(evt) { onMessage(evt) };
	websocket.onerror = function(evt) { onError(evt) };
}

function onOpen(evt)
{
	writeToScreen("CONNECTED");
    doSend(data);
	//doSend("Test message");
}

function onClose(evt)
{
	writeToScreen("DISCONNECTED");
}

function onMessage(evt)
{
	//writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data+'</span>');
	alert("Received: " + evt.data);
	var textbox = document.getElementById("text_input");
	winOrLose(evt.data, textbox.value);
	websocket.close();
}

function onError(evt)
{
	writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}
*/
//***************************************


//NODE JS CLIENT
//1. Button is pressed to send the choice

function getChoice()
{
    
    console.log('Button pressed');
    //alert("Button pressed!");
	var textbox = document.getElementById("text_input");
	if(textbox.value == "1" || textbox.value == "2" || textbox.value == "3"){
		connectToServer(textbox);
	}
	else{
		alert("Write 1, 2 or 3");
	}
}

var net = require('net');
//2. Sending the choice from the text box
function connectToServer(input)
{	
    
    console.log('Connecting to server');

    //var client = new net.Socket();
    var connection = new WebSocket("ws://127.0.0.1:1337");
    
    connection.onopen = () => {
        connection.send('hey') 
    }

    connection.onerror = (error) => {
        console.log(`WebSocket error: ${error}`)
    }

connection.onmessage = (e) => {
  console.log(e.data)
}
	//data = ["Player", input.value]
    //writeToScreen("CONNECTED");
    
}

//3. Send the data and write to the page. Turn the choice to string
function doSend(data)
{
	writeToScreen("SENT: " + data[1]);
	websocket.send(data[1].toString());
	alert("SENT: " + data[1]);
}

//4. Screen writing function.
function writeToScreen(message)
{
	var pre = document.createElement("p");
	pre.style.wordWrap = "break-word";
	pre.innerHTML = message;
	output.appendChild(pre);
}

window.addEventListener("load", init, false);

//function winOrLose(data, value){
//	//data = data.split(",");
//	console.log(data)
//	console.log("cpu answer: " + data[1]);
//	console.log("player asnwer: " + value);
//	cpuAnswer = data[1];
	
//}
},{"net":2}],2:[function(require,module,exports){

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL1VzZXJzL25pa29sL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInBsYXllci5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL1VzZXJzL25pa29sL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbGliL19lbXB0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3SEEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvL1dFQlNPQ0tFVCBGVU5DVElPTlMgKioqKioqKioqKioqKioqKioqKlxyXG5mdW5jdGlvbiBpbml0KClcclxue1xyXG4gICAgLy9FdmVudCBsaXN0ZW5lcnM6XHJcbiAgICB2YXIgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZW5kX2J1dHRvblwiKTtcclxuICAgIGNvbnNvbGUubG9nKCd0ZXN0MicpO1xyXG4gICAgaWYoYnRuKXtcclxuICAgICAgICBjb25zb2xlLmxvZygndGVzdDMnKTtcclxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnZXRDaG9pY2UpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL1dFQlNPQ0tFVCBGVU5DVElPTlNcclxuLypcclxuZnVuY3Rpb24gdGVzdFdlYlNvY2tldCgpXHJcbntcclxuXHQvL3ZhciB3c1VyaSA9ICd3c3M6Ly9lY2hvLndlYnNvY2tldC5vcmcnO1xyXG5cdHZhciB3c1VyaSA9IFwid3M6Ly8xMjcuMC4wLjE6MTMzN1wiO1xyXG4gICAgLy92YXIgd3NVcmkgPSBcIndzOi8vbG9jYWxob3N0OjMwMDAvXCI7XHJcbiAgICBcclxuXHR3ZWJzb2NrZXQgPSBuZXcgV2ViU29ja2V0KHdzVXJpKTtcclxuXHR3ZWJzb2NrZXQub25vcGVuID0gZnVuY3Rpb24oZXZ0KSB7IG9uT3BlbihldnQpIH07XHJcblx0d2Vic29ja2V0Lm9uY2xvc2UgPSBmdW5jdGlvbihldnQpIHsgb25DbG9zZShldnQpIH07XHJcblx0d2Vic29ja2V0Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2dCkgeyBvbk1lc3NhZ2UoZXZ0KSB9O1xyXG5cdHdlYnNvY2tldC5vbmVycm9yID0gZnVuY3Rpb24oZXZ0KSB7IG9uRXJyb3IoZXZ0KSB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBvbk9wZW4oZXZ0KVxyXG57XHJcblx0d3JpdGVUb1NjcmVlbihcIkNPTk5FQ1RFRFwiKTtcclxuICAgIGRvU2VuZChkYXRhKTtcclxuXHQvL2RvU2VuZChcIlRlc3QgbWVzc2FnZVwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb25DbG9zZShldnQpXHJcbntcclxuXHR3cml0ZVRvU2NyZWVuKFwiRElTQ09OTkVDVEVEXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvbk1lc3NhZ2UoZXZ0KVxyXG57XHJcblx0Ly93cml0ZVRvU2NyZWVuKCc8c3BhbiBzdHlsZT1cImNvbG9yOiBibHVlO1wiPlJFU1BPTlNFOiAnICsgZXZ0LmRhdGErJzwvc3Bhbj4nKTtcclxuXHRhbGVydChcIlJlY2VpdmVkOiBcIiArIGV2dC5kYXRhKTtcclxuXHR2YXIgdGV4dGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV4dF9pbnB1dFwiKTtcclxuXHR3aW5Pckxvc2UoZXZ0LmRhdGEsIHRleHRib3gudmFsdWUpO1xyXG5cdHdlYnNvY2tldC5jbG9zZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvbkVycm9yKGV2dClcclxue1xyXG5cdHdyaXRlVG9TY3JlZW4oJzxzcGFuIHN0eWxlPVwiY29sb3I6IHJlZDtcIj5FUlJPUjo8L3NwYW4+ICcgKyBldnQuZGF0YSk7XHJcbn1cclxuKi9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcblxyXG4vL05PREUgSlMgQ0xJRU5UXHJcbi8vMS4gQnV0dG9uIGlzIHByZXNzZWQgdG8gc2VuZCB0aGUgY2hvaWNlXHJcblxyXG5mdW5jdGlvbiBnZXRDaG9pY2UoKVxyXG57XHJcbiAgICBcclxuICAgIGNvbnNvbGUubG9nKCdCdXR0b24gcHJlc3NlZCcpO1xyXG4gICAgLy9hbGVydChcIkJ1dHRvbiBwcmVzc2VkIVwiKTtcclxuXHR2YXIgdGV4dGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV4dF9pbnB1dFwiKTtcclxuXHRpZih0ZXh0Ym94LnZhbHVlID09IFwiMVwiIHx8IHRleHRib3gudmFsdWUgPT0gXCIyXCIgfHwgdGV4dGJveC52YWx1ZSA9PSBcIjNcIil7XHJcblx0XHRjb25uZWN0VG9TZXJ2ZXIodGV4dGJveCk7XHJcblx0fVxyXG5cdGVsc2V7XHJcblx0XHRhbGVydChcIldyaXRlIDEsIDIgb3IgM1wiKTtcclxuXHR9XHJcbn1cclxuXHJcbnZhciBuZXQgPSByZXF1aXJlKCduZXQnKTtcclxuLy8yLiBTZW5kaW5nIHRoZSBjaG9pY2UgZnJvbSB0aGUgdGV4dCBib3hcclxuZnVuY3Rpb24gY29ubmVjdFRvU2VydmVyKGlucHV0KVxyXG57XHRcclxuICAgIFxyXG4gICAgY29uc29sZS5sb2coJ0Nvbm5lY3RpbmcgdG8gc2VydmVyJyk7XHJcblxyXG4gICAgLy92YXIgY2xpZW50ID0gbmV3IG5ldC5Tb2NrZXQoKTtcclxuICAgIHZhciBjb25uZWN0aW9uID0gbmV3IFdlYlNvY2tldChcIndzOi8vMTI3LjAuMC4xOjEzMzdcIik7XHJcbiAgICBcclxuICAgIGNvbm5lY3Rpb24ub25vcGVuID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbm5lY3Rpb24uc2VuZCgnaGV5JykgXHJcbiAgICB9XHJcblxyXG4gICAgY29ubmVjdGlvbi5vbmVycm9yID0gKGVycm9yKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFdlYlNvY2tldCBlcnJvcjogJHtlcnJvcn1gKVxyXG4gICAgfVxyXG5cclxuY29ubmVjdGlvbi5vbm1lc3NhZ2UgPSAoZSkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKGUuZGF0YSlcclxufVxyXG5cdC8vZGF0YSA9IFtcIlBsYXllclwiLCBpbnB1dC52YWx1ZV1cclxuICAgIC8vd3JpdGVUb1NjcmVlbihcIkNPTk5FQ1RFRFwiKTtcclxuICAgIFxyXG59XHJcblxyXG4vLzMuIFNlbmQgdGhlIGRhdGEgYW5kIHdyaXRlIHRvIHRoZSBwYWdlLiBUdXJuIHRoZSBjaG9pY2UgdG8gc3RyaW5nXHJcbmZ1bmN0aW9uIGRvU2VuZChkYXRhKVxyXG57XHJcblx0d3JpdGVUb1NjcmVlbihcIlNFTlQ6IFwiICsgZGF0YVsxXSk7XHJcblx0d2Vic29ja2V0LnNlbmQoZGF0YVsxXS50b1N0cmluZygpKTtcclxuXHRhbGVydChcIlNFTlQ6IFwiICsgZGF0YVsxXSk7XHJcbn1cclxuXHJcbi8vNC4gU2NyZWVuIHdyaXRpbmcgZnVuY3Rpb24uXHJcbmZ1bmN0aW9uIHdyaXRlVG9TY3JlZW4obWVzc2FnZSlcclxue1xyXG5cdHZhciBwcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuXHRwcmUuc3R5bGUud29yZFdyYXAgPSBcImJyZWFrLXdvcmRcIjtcclxuXHRwcmUuaW5uZXJIVE1MID0gbWVzc2FnZTtcclxuXHRvdXRwdXQuYXBwZW5kQ2hpbGQocHJlKTtcclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGluaXQsIGZhbHNlKTtcclxuXHJcbi8vZnVuY3Rpb24gd2luT3JMb3NlKGRhdGEsIHZhbHVlKXtcclxuLy9cdC8vZGF0YSA9IGRhdGEuc3BsaXQoXCIsXCIpO1xyXG4vL1x0Y29uc29sZS5sb2coZGF0YSlcclxuLy9cdGNvbnNvbGUubG9nKFwiY3B1IGFuc3dlcjogXCIgKyBkYXRhWzFdKTtcclxuLy9cdGNvbnNvbGUubG9nKFwicGxheWVyIGFzbndlcjogXCIgKyB2YWx1ZSk7XHJcbi8vXHRjcHVBbnN3ZXIgPSBkYXRhWzFdO1xyXG5cdFxyXG4vL30iLCIiXX0=
