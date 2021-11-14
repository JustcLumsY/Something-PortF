const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener('resize', function(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;  
});

let hue = 0;

const model = {     
    hasGeneratedArray: false
}
const mouse = {
    x: undefined,
    y: undefined,
}


let floatinBubblesArray = [];
class FloatingBubbles {
    constructor (size) {
        this.x = mouse.x;
        this.y = mouse.y;
       // this.blur = 'blur(3px) contrast(2)'; 
        this.weight = Math.random() * 2.5 + 2.5;
        this.size = size;
        this.color = 'hsl(' + hue + ', 100%, 50%';
        // this.speedX = Math.random() * 3 - 1.5;
        // this.speedY = Math.random() * 3 - 1.5;
        this.directionX = Math.random() * 6;
        
    }
    updateFloatingBubbles(){
        
          this.y -= this.weight;
          this.x += this.directionX;
         if(this.size >= 0.3) this.size -= 0.1;

    }
    drawFloatingBubbles(){
  
        // ctx.shadowOffsetX = 2;
         //ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 25;
        ctx.shadowColor = 'black';
        ctx.globalCompositeOperation = 'hue';
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

       // ctx.filter = this.blur;
      
       
    }  
}
//canvas.style.webkitfilter = "blur(2)";

function handleFloatingBubbles()
{ 

    if(model.hasGeneratedArray){
        for (let i = 0; i < floatinBubblesArray.length; i++){
            floatinBubblesArray[i]. updateFloatingBubbles();
            floatinBubblesArray[i]. drawFloatingBubbles();
            if (floatinBubblesArray[i].size <= 1){
                floatinBubblesArray.splice(i, 1);
                    i--;
                }
            }
            return;    
      }  
    
        floatinBubblesArray = [];  
        model.hasGeneratedArray = true;

          //if(model.pressedBtn == "Flames") return;

        canvas.addEventListener('mousemove', function(event){
            mouse.x = event.x;
            mouse.y = event.y;
            for (let i = 0; i < 10; i++)
            floatinBubblesArray.push(new FloatingBubbles());
            createFloatingBubbles();
        });
    
   
}

function createFloatingBubbles()
{
   
    let size = Math.random() * 35 + 5;
    // let x = this.directionX;
    // let y = this.weight;
    floatinBubblesArray.push(new FloatingBubbles(size));

}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //createFloatingBubbles();
    handleFloatingBubbles();
    hue++;
    requestAnimationFrame(animate);
}
animate();