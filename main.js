image="";
status="";
objects=[];
function preload(){
}
function setup(){
    canvas=createCanvas(250,250);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(250,250);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelLoaded(){
    console.log("CocoSSd model is loaded");
    status=true;
    objectDetector.detect(video,gotResults);
}
function draw(){
    image(video,0,0,250,250);
    if(status!=""){
        objectDetector.detect(gotResults);
        for (i = 0 ; i<objects.length;i++){
            document.getElementById("status").innerHTML="Status : Objects Detected";
            
            fill("#800000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x+15 , objects[i].y+15);
            noFill();
            stroke("#800000");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }

   
}
function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        objects=results;
    }
}