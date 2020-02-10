//Create scores file

//Server specs
//port for statistics: 6666
game_master_url = "ws://10.0.2.2:8070"
var opponent_ip = '192.168.56.11'
var total = 0
var statuses = {'game_master': 'offline', 'opponent': 'offline'};
var stats = {'statistics': 0, 'start': '', 'end': ''};
var previousMsgTime = {}
//var scores = {'opponent_scores': 0, 'player_scores': 0}

function checkStatuses()
{
    console.log(statuses)
    console.log(stats)
}
setInterval(checkStatuses, 1000)

var port_number = 8090
var port_number_opponent = 9090
var port_number_stats = 6666

//Listeners for different ports
createACKServer();
//createStatisticsListener();

var interArrivalTimeList = []

//used for report questionnaire measurements
function measureInterArrivalRate(index)
{
    var time = new Date().getTime();
    if (index == 25)
    {   
        var sum = 0
        for (i = 0; i < interArrivalTimeList.length; i++)
        {
            sum = sum + interArrivalTimeList[i]
            if (i = 24)
            {
                console.log('Interarrival average: ', sum)
            }
        }
        
    }

    if (index == 1)
    {
        previousMsgTime['prevTime'] = time
    }
    
    else 
    {
        previousTime = previousMsgTime['prevTime']
        interArrivalTime = time - previousTime
        interArrivalTimeList.push(interArrivalTime)
        previousMsgTime['prevTime'] = time
    }
    
}

//used for report questionnaire measurements
function createStatisticsListener()
{
    //Create ACK checker for Player
    var net = require('net');
    var server = net.createServer(function(socket){
        
        socket.setEncoding('utf8')

        socket.on('error', (err) => {
            console.log('error received')
        });
        
        socket.on('data', function (data)
        {   
            
            stats['statistics'] = stats['statistics'] + 1
            
            measureInterArrivalRate(stats['statistics'])

            if (stats['statistics'] == 1)
            {   
                var today = new Date();
                var bMins = today.getMinutes()
                var bSecs = today.getSeconds()
                var bmSecs = today.getMilliseconds()

                var start = bMins + ':' + bSecs + ':' + bmSecs
                stats['start'] = start
            }
            //Setup for message count
            //msgCount = 50
            msgCount = 25
            if (stats['statistics'] == msgCount)
            {   
                
                var today = new Date();
                var eMins = today.getMinutes()
                var eSecs = today.getSeconds()
                var emSecs = today.getMilliseconds()
            
                var end = eMins + ':' + eSecs + ':' + emSecs
                stats['end'] = end
            }

        })
    });

    server.listen(port_number_stats, function(){
        console.log('listening ')
    });
}

//listener for gm acks
function createACKServer()
{
    //Create ACK checker for Player
    var net = require('net');
    var server = net.createServer(function(socket){
        
        socket.setEncoding('utf8')

        socket.write('ACK');
        console.log('ACK Sent to Game master')
        statuses['game_master'] = 'online'    

        socket.on('error', (err) => {
            console.log('game master not found')
            statuses['game_master'] = 'offline'
            statuses['opponent'] = 'unknown'
        });
        
        
        socket.on('data', function (data)
        {
            console.log('ACK received with status codes: ', data)
            if (data == 'Oon')
            {
                statuses['opponent'] = 'online' 
            }
            else 
            {
                statuses['opponent'] = 'offline'
            }
        })
    });

    server.listen(port_number, function(){
        console.log('listening ')
    });
}

//Used for new connection to opponent. Due to time issues, this function remains unfinished
/*
function closeConnectionOpponent(connection, string)
{   
    if(connection.readyState == 0)
    {
        console.log('closing opponent connection after timer..')    
        connection.close()
        opponent_answer = generate_answer() 

        //Fake opponent answer received
        console.log('Generating Fake Opponent answer: ' + opponent_answer)
        calculate_results(string, opponent_answer)
        
    }
}
*/

//Used for new connection to opponent. Due to time issues, this function remains unfinished
/*
function closeConnection(connection, string)
{   
    console.log('string: ', string)
    if(connection.readyState == 0 || connection.readyState != 3)
    {
        console.log('closing game master connection..')    
        connection.close()

        //Open connection to opponent
        opponent_ping_url = "ws://192.168.56.11:9090"
        connection_opponent = new WebSocket(opponent_ping_url);       
        console.log('Creating new connection')
        
        //Set timer for opponent
        setTimeout(closeConnectionOpponent.bind(null, connection_opponent, string), 5000)
        connection_opponent.onopen = (event) => {
            
            console.log('open')
            //Ping self and nodejs to start the new opponent connection
            connection_opponent.setKeepAlive(true, 5000)
            msg = 'ping'
            connection_opponent.send(msg);
            console.log('Message sent: ' + msg);
        };

        connection_opponent.onclose = (event) => {
            console.log('Closing opponent connection')
        };
        
        connection_opponent.onmessage = (event) => {
            console.log("Message received: " + event["data"]);
            //Convert blob to text with fileReader API
            blob = event["data"];       
            var reader = new FileReader();
            connection_opponent.close()

            reader.onload = function() {
                calculate_results(string, reader.result)
                
            }
        
            if(typeof blob != 'string')
            {
                reader.readAsText(blob);   
            }
            
            if(event["data"].length == 2)
            {
                opponent_answer = event["data"]
                //Fake opponent answer received
                console.log('Opponent answer received: ' + opponent_answer)
                calculate_results(string, opponent_answer)
                connection_opponent.close()
            }
            else
            {
                connection_opponent.close()        
            }
        };
        connection_opponent.onerror = (event) => {
            console.error("WebSocket error observed:", event);
 
            console.log('closing opponent connection after timer..')    
            //connection.close()
            opponent_answer = generate_answer()
            console.log('Opponent ans: ', opponent_answer)    

            //Fake opponent answer received
            console.log('Generating Fake Opponent answer: ' + opponent_answer)
            calculate_results(string, opponent_answer)  
        };     
    }  
}
*/

//Create connection to gm for game messages
function createClient(connection, data)
{   
    console.log('data1', data)
    string = data[1].toString() + data[0]; //1P
    
    //setTimeout(closeConnection.bind(null, connection, string), 1000)

    connection.onopen = (event) => {
        console.log("WebSocket is open now.");
        string = data[1].toString() + data[0]; //1P
        connection.send(string);
        console.log('Message sent: ' + string);
    };

    connection.onclose = (event) => {
        console.log("WebSocket is closed now.");
        
    };

    connection.onerror = (event) => {
        console.error("WebSocket error observed:", event);
        
        selfGenerateAnswer(data);        
    };
    i = 0
    connection.onmessage = (event) => {
        console.log("Message received: " + event["data"]);
        if (event["data"])
        //Convert blob to text with fileReader API
        blob = event["data"];       
        var reader = new FileReader();

        reader.onload = function() {
            calculate_results(string, reader.result)
        }
        
        if(typeof blob != 'string')
        {
            reader.readAsText(blob);   
        }
        
        if(event["data"].length == 2)
        {
            opponent_answer = event["data"]
            //Fake opponent answer received
            console.log('Opponent answer received: ' + opponent_answer)
            calculate_results(string, opponent_answer)
            connection.close()
        }
        else
        {
            connection.close()        
        }
    };
}

//Button is pressed to send the choice
function buttonPress()
{       

    console.log('status')
    console.log(statuses['game_master'])
    var textbox = document.getElementById("text_input");
    if(textbox.value == "1" || textbox.value == "2" || textbox.value == "3")
    {
        //P = Player
        data = ["P", textbox.value]
        connection = new WebSocket(game_master_url);
        createClient(connection, data);
    }
    
    else
    {
        alert("Write 1, 2 or 3");
    }
	
}

//Screen writing function.
function writeToScreen(message)
{
	var pre = document.createElement("p");
	pre.style.wordWrap = "break-word";
	pre.innerHTML = message;
	output.appendChild(pre);
}

function calculate_results(player_answer, opponent_answer)
{   
    player_weapon = turn_int_to_string_weapon(player_answer);
    
    opponent_weapon = turn_int_to_string_weapon(opponent_answer);

    //CHECK GAME RULES AND DECLARE GAME RESULT
    
    //TIE
    if (player_weapon == opponent_weapon)
    {
        alert("You tied with " + player_weapon + " against " + opponent_weapon)
    }
    //LOST
    else if (player_weapon == 'Stone' && opponent_weapon == 'Paper')
    {
        alert("You lost with " + player_weapon + " against " + opponent_weapon)
        //writeScoresToFile(1, 0)
    }
    //WIN
    else if(player_weapon == 'Stone' && opponent_weapon == 'Scissors')
    {
        alert("You won with " + player_weapon + " against " + opponent_weapon)
        //writeScoresToFile(0, 1)
    }
    
    else if (player_weapon == 'Scissors' && opponent_weapon == 'Paper')
    {
        alert("You won with " + player_weapon + " against " + opponent_weapon)
        //writeScoresToFile(0, 1)
    }
    else if(player_weapon == 'Scissors' && opponent_weapon == 'Stone')
    {
        alert("You lost with " + player_weapon + " against " + opponent_weapon)
        //writeScoresToFile(1, 0)  
    }
    
    else if (player_weapon == 'Paper' && opponent_weapon == 'Scissors')
    {
        alert("You lost with " + player_weapon + " against " + opponent_weapon)
        //writeScoresToFile(1, 0)  
    }
    else if(player_weapon == 'Paper' && opponent_weapon == 'Stone')
    {
        alert("You won with " + player_weapon + " against " + opponent_weapon)
        //writeScoresToFile(0, 1)
    }
    
}

function turn_int_to_string_weapon(answer)
{
    
    if(answer.includes("1"))
    {
        weapon = "Stone";
        return weapon
    }
    else if (answer.includes("2"))
    {
        weapon = "Paper";
        return weapon
    }
    else if (answer.includes("3"))
    {
        weapon = "Scissors";
        return weapon
    }
    
}

//For the case of connection failure, function of data processing is here:
function generate_answer()
{
    string = Math.ceil(Math.random() * 3)
    string = string + 'O'
    return string
}

