
//Server specs
port_number = 9090
port_number_ack = 9091
game_master_port = 8080
game_master_ip = 'localhost'

var statuses = {'game_master':'offline', 'player': 'offline'};
var scores = {'opponent_scores': 0, 'player_scores': 0}


function checkStatuses()
{
    console.log(statuses);
}
setInterval(checkStatuses, 1000);

var net = require('net');
var server = net.createServer(function(socket) {
        

    socket.on('data', function (data)
    {   
        answer = generate_answer();
        socket.write(answer);
        if (data != 'Request')
        {
            console.info("Game Answer sent directly to player: " + answer);    
            statuses['player'] = 'online'
        }
        else
        {
            console.info("Game Answer sent to Game master: " + answer);
        }
    })

    socket.on('error', (err) => {
        console.log('game_master not found.')
        statuses['game_master'] = 'offline';
        statuses['player'] = 'unknown';    
    });
});

server.listen(port_number, function () {
    console.log('listening 9090...');       
});

function generate_answer()
{
    string = Math.ceil(Math.random() * 3)
    string = string + 'O'
    return string
}

var net_ack = require('net');
var server_ack = net_ack.createServer(function(socket_ack) {
    
    socket_ack.setEncoding('utf8')    

    statuses['game_master'] = 'online'    
    socket_ack.write('ACK');
    console.info("Answer sent to game master: ACK");    
    
    socket_ack.on('error', (err) => {
    console.log('game_master not found.')
    statuses['game_master'] = 'offline';
    statuses['player'] = 'unknown';
    });
    
    socket_ack.on('data', function (data)
    {
        console.log('ACK received with status codes: ', data)
        if (data == 'Pon')
        {
            statuses['player'] = 'online'
        }
        else
        {
            statuses['player'] = 'offline'
        }
    })

})

server_ack.listen(port_number_ack, function () {
    console.log('listening 9091...');       
});

