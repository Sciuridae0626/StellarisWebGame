const M = 1.98847e30;
const AU = 1.495978707e11;
const D = 86400;
const G = 6.674e-11 * M * D * D / AU / AU / AU;

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var star = new Array();
var count = 0;
var flag = 0;
var speed = 1;

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;
document.getElementById("locationX").value = canvas.width / 2;
document.getElementById("locationY").value = canvas.height / 2;
context.save(); //保存绘图环境，保证此次填充样式、线宽等绘图环境属性不影响其他图形绘制 
context.beginPath(); //开启新路径
context.rect(0, 0, canvas.width, canvas.height);
context.lineWidth = 0; //设置线宽
context.fillStyle = "rgb(0, 0, 0)";
context.fill();
context.closePath(); //关闭新路径
context.restore(); //还原绘图环境