const Discord = require("discord.js");
const client = new Discord.Client();
var statustring = "No signal";

var request = require('request');
var mcCommand = '/minecraft'; // Command for triggering
var mcIP = 'WalCraft.biz.tm'; // Your MC server IP
var prefix = '-';
var status = '';
var mcPort = 25565; // Your MC server port

var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;


function update() {
  
  /*seconds = seconds + 1;
  secondsString = seconds.toString();
  client.user.setActivity(secondsString, { type: 'Playing' })
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);*/
  
  request(url, function(err, response, body) {
    
      if(err) {
          console.log(err);
      }
    
      body = JSON.parse(body);
      status = 'Server offline';
      console.log(body.motd);
    
      if(body.online) {
        
          if((body.motd=="&cWe are under maintenance.")||(body.players.now>=body.players.max)){
            
            client.user.setStatus('idle')
            .catch(console.error);
            
          }else{
            
            client.user.setStatus('online')
            .catch(console.error);
          }
            if(body.players.now) {
              
                status = ' ' + body.players.now + '  of  ' + body.players.max;
              
              } else {
                
                status = ' 0  of  ' + body.players.max;
        }
      } else {
        
        client.user.setStatus('dnd')
        //.then(console.log)
        .catch(console.error);

      }
      client.user.setActivity(status, { type: 'PLAYING' })
      .then(presence => console.log(status))
      .catch(console.error);
  });

}

client.on("ready", () => {
  
  console.log("I am ready!");
  client.setInterval(update,60000);
});

client.on("message", async message => {
  
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) return;
  
  if (message == "-help") {
    message.channel.send("-----**HELP**------------------------------------------------------------- \n-about: Information about the bot.");
    message.channel.send("-status: Gives the WalCraft server status.");
    message.channel.send("-version: Shows the Minecraft version on the server.");
    message.channel.send("-players: Shows the amount of players on the server.");
    message.channel.send("----------------------------------------------------------------------");
  }
  
  if (message == "-status") {    
     if (status == "Server Offline") {
           message.channel.send("WalCraft is offline.");
     }
     else {
       message.channel.send("WalCraft is online.");
     }
  }
  
  if (message == "-players") {   
    message.channel.send("There are currently" + status + " players online.")
  }
  
  if (message == "-version") {    
    message.channel.send("Minecraft 1.13")
  }
 
  if (message == "-about") {    
    message.channel.send("This bot is used to check the status of **WalCraft.biz.tm**. It updates every **5** minutes.")
  }
});

client.login("NDczOTgzOTMxOTY4OTEzNDEx.DkJ5zw.HWOaFXWer_Yv81FyriXfcg-qRxg");
