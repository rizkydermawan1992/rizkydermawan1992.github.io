function startConnect(){
    host = document.getElementById("host").value;
    port = document.getElementById("port").value;
    clientID = "clientID" + parseInt(Math.random()*100);

    btn_connect = document.getElementById("btn-connect");
    btn_connect.value = "Connecting . . .";
    btn_connect.style.backgroundColor = "gray";

    document.getElementById("messages").innerHTML = "<span>Connecting to "+host+" on port "+port+"</span</br>";
    client = new Paho.MQTT.Client(host, Number(port), clientID); 

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({
        onSuccess : onConnect,
        onFailure : onFailure
    });
}

function onConnect(){
    btn_connect = document.getElementById("btn-connect");
    topic_s = document.getElementById("topic_s").value;
    document.getElementById("messages").innerHTML += "<span> Subscribing topic "+topic_s+"</span><br>";
    client.subscribe(topic_s);

    btn_connect.value = "Disconnect";
    btn_connect.style.backgroundColor = "red";
}

function onFailure(err){
    document.getElementById("messages").innerHTML += "<span>Connection Failed! Error Message: "+err.errorMessage+"</span>"
}


function onConnectionLost(response){
    document.getElementById("messages").innerHTML += "<span> Connection is lost</span></br>";
    if(response != 0){
        document.getElementById("messages").innerHTML += "<span>Error Message: "+response.errorMessage+"</br>";
    }
    btn_connect = document.getElementById("btn-connect");
    btn_connect.value = "Connect";
    btn_connect.style.backgroundColor = "#007bff";
}

function onMessageArrived(message){
    console.log("Message Arrived: "+message.payloadString);
    document.getElementById("messages").innerHTML += "<span> Topik: "+message.destinationName+" Pesan: "+message.payloadString+"</span><br>";
}

function startDisconnect(){
   client.disconnect();
   document.getElementById("messages").innerHTML += "<span>Disconnect from broker!!!</span><br>";
}


function publishMessage(){
    msg  = document.getElementById("message").value;
    topic_p = document.getElementById("topic_p").value;

    Message = new Paho.MQTT.Message(msg);
    Message.destinationName = topic_p;

    client.send(Message);
}
