import indexCss from "./public/css/index.css";
import imgSrc from "./public/images/mm.jpg"; //引入拿到图片路径

let pp = document.createElement("p");
pp.innerHTML = "爱你";
document.getElementById("root").appendChild(pp);

let myFunc = () => {
  console.log("高琪");
};
myFunc();

// 创建图片标签
let imgNode = new Image();
imgNode.src = imgSrc;
document.getElementById("root").appendChild(imgNode);

//
let a = 100;
console.log(a);
