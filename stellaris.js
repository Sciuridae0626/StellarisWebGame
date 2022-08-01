function addStar(){
    let locationX = Number(document.getElementById("locationX").value);
    let locationY = Number(document.getElementById("locationY").value);
    let velocityX = Number(document.getElementById("velocityX").value) / 1000;
    let velocityY = Number(document.getElementById("velocityY").value) / 1000;
    let mass = Number(document.getElementById("mass").value);
    star[count] = new Star(locationX, locationY, mass, velocityX, velocityY);
    star[count].draw(context);
    count++;
}

function addRandomStar(){
    star[count] = new Star(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 100, Math.random() * 2 - 1, Math.random() * 2 - 1);
    star[count].draw(context);
    count++;
}

function start(){
    if(!flag){
        flag = 1;
        next();
    }
}

function next(){
    context.save(); //保存绘图环境，保证此次填充样式、线宽等绘图环境属性不影响其他图形绘制 
    context.beginPath(); //开启新路径
    context.rect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 0; //设置线宽
    context.fillStyle = "rgba(0, 0, 0, 0.1)";
    context.fill();
    context.closePath(); //关闭新路径
    context.restore(); //还原绘图环境
    let max = 0;
    for(let i = 0; i < count; i++){
        if(star[i].flag) continue;
        if(star[i].mass > star[max].mass) max = i;
        gravitate(i);
        star[i].velocityX += star[i].accelerationX;
        star[i].velocityY += star[i].accelerationY;
        star[i].locationX += star[i].velocityX;
        star[i].locationY += star[i].velocityY;
    }
    let correctedLocationX = canvas.width / 2 - star[max].locationX;
    let correctedLocationY = canvas.height / 2 - star[max].locationY;
    for(let i = 0; i < count; i++){
        if(star[i].flag) continue;
        star[i].locationX += correctedLocationX;
        star[i].locationY += correctedLocationY;
        star[i].draw(context);
    }
    if(flag) setTimeout(next, speed)
}

function stop(){
    flag = 0;
}

function restore(){
    location.reload();
}

function gravitate(i){
    star[i].forceX = 0;
    star[i].forceY = 0;
    for(let j = 0; j < count; j++){
        if(j == i) continue;
        if(star[j].flag) continue;
        star[i].forceX += star[i].getGravitationX(star[j]);
        star[i].forceY += star[i].getGravitationY(star[j]);
        if(star[i].getDistance(star[j]) < star[i].radius + star[j].radius){ //碰撞检定
            let mass = star[i].mass + star[j].mass;
            star[i].velocityX = (star[i].velocityX * star[i].mass + star[j].velocityX * star[j].mass) / mass;
            star[i].velocityY = (star[i].velocityY * star[i].mass + star[j].velocityY * star[j].mass) / mass;
            star[i].accelerationX = 0;
            star[i].accelerationY = 0;
            star[i].forceX = 0;
            star[i].forceY = 0;
            if(star[i].mass < star[j].mass) star[i].color = star[j].color;
            star[i].mass = mass;
            star[i].radius = Math.pow(mass, 1/3);
            star[j].flag = 1;
        }
    }
    star[i].accelerationX = star[i].forceX / star[i].mass;
    star[i].accelerationY = star[i].forceY / star[i].mass;
}