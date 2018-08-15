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
  client.setInterval(update,5000);
});

client.on("message", async message => {
  
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) return;
  
  if (message == "-help") {
    message.reply("-----HELP-------------------------------------------------------------");
    message.reply("-status: Gives the WalCraft server status.");
    message.reply("-version: Shows the Minecraft version on the server.");
    message.reply("-players: Shows the amount of players on the server.");
    message.reply("----------------------------------------------------------------------");
  }
  
  if (message == "-status") {    
     if (status == "Server Offline") {
           message.reply("WalCraft is offline.");
     }
     else {
       message.reply("WalCraft is online.");
     }
  }
  
  if (message == "-status") {   
    message.reply("There are currently " + status + " players online.")
  }
  
  if (message == "-version") {    
    message.reply("Minecraft 1.13")
  }
 
});

client.login("NDczOTgzOTMxOTY4OTEzNDEx.DkJ5zw.HWOaFXWer_Yv81FyriXfcg-qRxg");
