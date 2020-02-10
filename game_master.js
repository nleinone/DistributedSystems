
//Player   --> 80
//Player   --> 8070 : GM OK
//GM       --> 8080 -> 8090 : Player OK
//GM       --> 8060 -> 9090 : Opponent
//Opponent --> 8070 : GM
//GM       --> 8080 -> 8090 : Player

//Server specs

port_number = 8070 //Player answer port
port_number_player_ack = 8080 //Will be forwarded to 8090, Player ACK port
port_player_stats = 8666 // Will be forwarded to 6666, Player stats port

port_number_opponent = 8060 //Will be forwarded to 9090, Opponent answer port
port_number_opponent_ack = 8061 //Will be forwarded to 9091, Opponent ACK port

opponent_ip = 'localhost'

var statuses = {'opponent': 'offline', 'game_master': 'offline', 'player': 'offline'};
var answer = {'opponent_answer': ''};
var scores = {'opponent_score': 0, 'player_score': 0};

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}

//Used for report questionnaire measurements
function sendSingleMessage(port, ip, i)
{   
    const net = require('net');
    const client = new net.Socket();
    client.connect(port, ip, () => {
        
        //msgInt = randomInt(0, 1000)
        //var msg = msgInt.toString()

        var today = new Date()
        var mins = today.getMinutes()
        var secs = today.getSeconds()
        var mSecs = today.getMilliseconds()
        
        //var msg = i + ":" + mins + ":" + secs + ":" + mSecs
        
        //Different sizes for msg:
        //msg = "1" // 1 bytes
        msg = "1111111111111111" // 16 bytes
        //msg = "11111111111111111111111111111111" // 32 bytes
        msgSize = msg.toString(2).length;
        //console.log("msgSize: ", msgSize)
            
        client.write(msg);
        console.info("msg" + i + " sent.")
    });
}

//Used for report questionnaire measurements
//sendMessages(50)
//sendMessages(25)

//Used for report questionnaire measurements
function sendMessages(count)
{   

    
    //msg = msg + '|' + time
    for(i = 0; i < count; i++)
    {
        sendSingleMessage(port_player_stats, opponent_ip, i)
    }
    
}

//Check system statuses every 2 seconds
function checkStatuses()
{
    var today = new Date();
    var date = '[' + today.getDate() + '.' + (today.getMonth()+1) + '.' + today.getFullYear() + ']';
    var time = '[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ']';
    var timeString = (date + time);
    console.log(timeString, statuses);
    checkOpponentStatus(port_number_opponent_ack);
    checkPlayerStatus(port_number_player_ack);
}

setInterval(checkStatuses, 2000);

//Listen to PLAYER
var WebSocketServer = require("ws").Server;
var wss = new WebSocketServer({ port: port_number });
statuses['game_master'] = 'online'

wss.on("connection", function (client) {
        
    console.info("websocket connection open");
    client.on("message", function (data) {
        console.info("message received: " + data);
        //client.send("From game master, message received: " + data)
        
        if(data[1] == 'P')
        {
            console.info("message received from player.");
            
            //If opponent is online, send request to opponent
            if (statuses['opponent'] = 'online')
            {
                createConnectionToOpponent(opponent_ip, port_number_opponent, "Request", client)
            }
            else
            {
                fake_opponent_answer = generate_answer();
                console.log("Self generated opponent answer: " + fake_opponent_answer);
                sendMessages(50)
                client.send(fake_opponent_answer)
                console.info("Fake opponent answer sent to player: " + fake_opponent_answer);
            }
        }
        
    });
});

function createConnectionToOpponent(opponent_ip, port_number_opponent, msg, client)
{

    const net = require('net');
    const client_opponent = new net.Socket();
    client_opponent.connect(port_number_opponent, opponent_ip, () => {
        // callback, when connection successfull
        //Wait 1 second, then check the opponent status:
        console.info("Connection to opponent success.");
        client_opponent.write(msg);
    });
    
    client_opponent.on('data', (data) => {
        //Opponent response callback
        console.info("Data received from opponent: " + data);
        //Check if the data is from the opponent
        client_marker = data.includes('O');
        client.send(data)
    });
    
    client_opponent.on('close', (data) => {
        //connection is closed
        console.info("Connection to Opponent closed.");
    });
    
    client_opponent.on('error', (data) => {
        //connection is closed due to error (delay, shut down)
        console.info("Connection to Opponent closed due to Error.");
        //Generate answer for the player to hide the Opponent crash
        fake_opponent_answer = generate_answer();
        console.log("Self generated opponent answer: " + fake_opponent_answer);
        client.send(fake_opponent_answer)
        console.info("Fake opponent answer sent to player: " + fake_opponent_answer);
    });
}

//For the case of connection failure, function of data processing is here:
function generate_answer()
{
    string = Math.ceil(Math.random() * 3)
    string = string + 'O'
    return string
}

var status_flag = "no_response";

function changeOpponentStatus(status_flag) {
    if (status_flag == 'no_response')
    {
        statuses['opponent'] = 'offline';
    } 
    else
    {
        statuses['opponent'] = 'online';
    }
}

function changePlayerStatus(status_flag) {
    if (status_flag == 'no_response')
    {
        statuses['player'] = 'offline';
    } 
    else
    {
        statuses['player'] = 'online';
    }
}

function checkOpponentStatus(port_number_opponent_ack)
{
    //Check Message with info about other nodes
    var msg = "";
    if (statuses['player'] == 'online')
    {
        msg = msg + 'Pon'
    }
    else 
    {
        msg = msg + 'Poff'
    }
    const net = require('net');
    const client_opponent = new net.Socket();
    client_opponent.connect(port_number_opponent_ack, opponent_ip, () => {
        console.log("Sending ACK to Opponent...");
        client_opponent.write(msg);
    });
    
    client_opponent.on('error', (data) => {
        
        console.log("Opponent not found.");
        var status_flag = "no_response";
        changeOpponentStatus(status_flag);
    
    });
    
    client_opponent.on('data', (data) => {
        //Opponent response callback
        client_marker = data.includes('ACK');
        console.log("Opponent found.");
        if(client_marker == true)
        {
            var status_flag = "got_response";
            changeOpponentStatus(status_flag);
        }
    });
}

function checkPlayerStatus(port_number_player_ack)
{
    var msg = "";
    
    var msg = "";
    if (statuses['opponent'] == 'online')
    {
        msg = msg + 'Oon'
    }
    else 
    {
        msg = msg + 'Ooff'
    }
    
    const net = require('net');
    const client_player = new net.Socket();
    client_player.connect(port_number_player_ack, opponent_ip, () => {
        console.log("Sending ACK to Player...");
        client_player.write(msg);
    });
    
    client_player.on('error', (data) => {
        
        console.log("Player not found.");
        var status_flag = "no_response";
        changePlayerStatus(status_flag);
    
    });
    
    client_player.on('data', (data) => {
        //Opponent response callback
        client_marker = data.includes('ACK');
        console.log("Player found.");
        if(client_marker == true)
        {
            var status_flag = "got_response";
            changePlayerStatus(status_flag);
            
        }
    });
}