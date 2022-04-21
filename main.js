song = "";
leftwristX= "";
rightwristX= "";

leftwristY="";
rightwristY="";

scoreleft= "";
scoreright= "";
function preload() {
    songe = loadSound("music.mp3");
}
 function setup() {
     canvas = createCanvas(500,500);
     canvas.position(600,240);
    
     video = createCapture(VIDEO);
     video.hide();

     poser= ml5.poseNet(video, modelLoaded);
      poser.on("pose", gotPoses);
 }
 function modelLoaded() {
     console.log("I am genie and want to tell u that model is loaded");
 }

 function gotPoses(results) {
     if (results.length>0) {
         console.log(results);
         
         leftwristX = results[0].pose.leftWrist.x;
         rightwristX= results[0].pose.rightWrist.x;
         leftwristY= results[0].pose.leftWrist.y;
         rightwristY = results[0].pose.rightWrist.y;

         scoreleft = results[0].pose.keypoints[9].score;
         scoreright = results[0].pose.keypoints[10].score;

     }
 }
 function draw() {
     image(video, 0 , 0, 500, 500);

     fill("blue");
     stroke("blue");

     if (scoreright > 0.2) {
         circle(rightwristX, rightwristY, 20);
         if (rightwristY > 0 && rightwristY <= 100)  {
             document.getElementById("thatoo").innerHTML= "speed = 0.5x";
             songe.rate(0.5);
         } else if(rightwristY > 100 && rightwristY <= 200) {
            document.getElementById("thatoo").innerHTML= "speed = 1x";
            songe.rate(1);
         } else if(rightwristY > 200 && rightwristY <= 300) {
            document.getElementById("thatoo").innerHTML= "speed = 1.5x";
            songe.rate(1.5);
         } else if(rightwristY > 300 && rightwristY <= 400) {
            document.getElementById("thatoo").innerHTML= "speed = 2x";
            songe.rate(2);
         } else if(rightwristY > 400 && rightwristY <= 500) {
            document.getElementById("thatoo").innerHTML= "speed = 2.5x";
            songe.rate(2.5);
             } else if (rightwristY > 500) {
                 document.getElementById("thatoo").innerHTML="speed = 3x";
                 songe.rate(3);
             }

          }

          if (scoreleft > 0.2) {
              circle(leftwristX, leftwristY, 20)
              volume= Number(leftwristY);
              volumetono= Math.floor(volume);
              tohund= volumetono/500;
              document.getElementById("volume").innerHTML= "VOLUME = " + tohund ;
              songe.setVolume(tohund);
          }
 }
 function play() {
     songe.play();
     songe.rate(1);
     songe.setVolume(1);

 }