object=[];
status="";
input_text="";


function setup()
{
    canvas=createCanvas(480,380);
    canvas.center();
    
    
    video=createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}
function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";
    input_text=document.getElementById("input").value;

}
function modelLoaded()
{
    console.log("modelLoaded");
    status=true;
   
   
}

function gotResult(error,results)
{
    if (error){
    console.log(error);
    }
    
        console.log(results);
        object=results;

    
}


function draw()
{
    image(video,0,0,640,420);
   if (status !=""){
    objectDetector.detect(video,gotResult);
    r=random(255);
    b=random(255);
    g=random(255);
       for(i=0; i<object.length; i++){
        document.getElementById("status").innerHTML="status:object detected";
       
        
        fill(r,g,b);
        percent=floor(object[i].confidence*100);
        text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
        noFill();
        stroke(r,g,b);
        rect(object[i].x,object[i].y,object[i].width,object[i].height);
        if (object[i].label==input_text)
        {
            document.getElementById("no_of_objects").innerHTML=input_text+" found";

        }
        else{
            document.getElementById("no_of_objects").innerHTML=input_text+" not found";
        }
       }
   }

}
