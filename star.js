class Star{
    constructor(locationX, locationY, mass, velocityX, velocityY){
        this.locationX = locationX;
        this.locationY = locationY;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.accelerationX = 0;
        this.accelerationY = 0;
        this.forceX = 0;
        this.forceY = 0;
        this.flag = 0;
        this.mass = mass;
        this.radius = Math.pow(mass, 1/3);
        this.color = "rgb(" + Math.floor(Math.random() * 128 + 127) + "," + Math.floor(Math.random() * 128 + 127) + "," + Math.floor(Math.random() * 128 + 127) + ")";
    }

    draw(context){
        context.save(); //保存绘图环境，保证此次填充样式、线宽等绘图环境属性不影响其他图形绘制 
        context.beginPath(); //开启新路径
        context.arc(this.locationX, this.locationY, this.radius, 0, Math.PI*2, false); //绘制圆路径
        context.lineWidth = 0; //设置线宽
        context.fillStyle = this.color;
        context.shadowColor = this.color;
        context.shadowBlur = 5;
        context.fill();
        context.closePath(); //关闭新路径
        context.restore(); //还原绘图环境
    }

    getDistance(star){
        let distanceX = this.locationX - star.locationX;
        let distanceY = this.locationY - star.locationY;
        let distance = Math.pow(distanceX * distanceX + distanceY * distanceY, 1/2);
        return distance;
    }

    getGravitation(star){
        let distance = this.getDistance(star);
        let gravitation = - this.mass * star.mass / distance / distance;
        return gravitation;
    }

    getGravitationX(star){
        let distanceX = this.locationX - star.locationX;
        let distance = this.getDistance(star);
        let gravitation = this.getGravitation(star);
        let gravitationX = gravitation * distanceX / distance;
        return gravitationX;
    }

    getGravitationY(star){
        let distanceY = this.locationY - star.locationY;
        let distance = this.getDistance(star);
        let gravitation = this.getGravitation(star);
        let gravitationY = gravitation * distanceY / distance;
        return gravitationY;
    }
}