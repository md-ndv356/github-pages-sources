// 1602161640 ~ 1602162000

var data = {};

document.getElementById("inputJSON").addEventListener("change", function(event){
  for(let i = 0; i < event.target.files.length; i++){
    let reader = new FileReader();
    reader.addEventListener("load", function(){
      data = JSON.parse(reader.result);
      if(data.packet[i].chat.date_usec){
        data.packet.forEach(function(item, i){
          data.packet[i].chat.time = Math.floor(Number(data.packet[i].chat.date)*1000 + Number(data.packet[i].chat.date_usec)/1000);
        });
      } else {
        let dateCount = {};
        data.packet.forEach(function(item, i){
          if(!dateCount.hasOwnProperty(data.packet[i].chat.date)){
            dateCount[data.packet[i].chat.date] = {count: 0, added: 0}
          }
          dateCount[data.packet[i].chat.date].count++;
        });
        data.packet.forEach(function(item, i){
          data.packet[i].chat.time = Math.floor(Number(data.packet[i].chat.date)*1000 + (dateCount[data.packet[i].chat.date].added++)/dateCount[data.packet[i].chat.date].count*1000);
        });
      }
    });
    reader.readAsText(event.target.files[i]);
  }
});

var startAt = 0;
var viewed = 0;
var tickCount = 0;
var columns = [];
var element_time = document.getElementById("time");
var min_commentList = [];
function check(){
  let viewing = (new Date()).getTime() - startAt;
  element_time.innerText = date2String(new Date(viewing)) + " (JST)";
  for(let i = viewed; i < data.packet.length; i++){
    let timestamp = data.packet[i].chat.time;
    if(timestamp <= viewing){
      min_commentList.push(timestamp);
      let tm = new Date(timestamp);
      let cd = document.querySelectorAll(".com")[0];
      let prt = cd.parentNode;
      let add = document.createElement("div");
      add.classList.add("com");
      let a = document.createElement("div");
      a.classList.add("comdate");
      a.innerText = ("0"+tm.getHours()).slice(-2) + ":" + ("0"+tm.getMinutes()).slice(-2) + ":" + ("0"+tm.getSeconds()).slice(-2) + "." + ("00"+tm.getMilliseconds()).slice(-3);
      let b = document.createElement("div");
      b.classList.add("comment");
      b.innerText = data.packet[i].chat.content;
      add.appendChild(a);
      add.appendChild(b);
      columns.push(add);
      prt.insertBefore(add, cd);
      viewed = i+1;
      let overViewing = viewed - 100;
      if(overViewing > 0){
        columns[0].remove();
        columns.shift();
      }
    } else {
      break;
    }
  }
  commentFrequency();
  tickCount ++;

  requestAnimationFrame(check);
}

const element_footer = document.getElementsByTagName("footer")[0];
const per_minute = document.getElementById("per_minute");
let per_minute_last100 = "0.00";
function commentFrequency(){
  let currentTime = Date.now() - startAt;
  for (let time of min_commentList){
    if(currentTime - time >= 60000){
      min_commentList.shift();
    } else break;
  }
  let text = min_commentList.length + "";
  let blue_gradient_pos = min_commentList.length / 2;
  let yellow_gradient_pos = (min_commentList.length - 200) / 3;
  let red_gradient_pos = (min_commentList.length - 500) / 5;
  element_footer.style.backgroundImage = "linear-gradient(90deg, #af0808d1 "+red_gradient_pos+"%, #7f8b09d1 "+(red_gradient_pos+3)+"%, #7f8b09d1 "+yellow_gradient_pos+"%, #2741c4d1 "+(yellow_gradient_pos+3)+"%, #2741c4d1 "+blue_gradient_pos+"%, #000000d1 "+(blue_gradient_pos+3)+"%)";
  if (per_minute_last100 !== text){
    per_minute_last100 = text;
    per_minute.textContent = text;
  }
}

/** @param {Date} dt */
const date2String = dt => ("000"+dt.getFullYear()).slice(-4) + "/" + ("0"+(dt.getMonth()+1)).slice(-2) + "/" + ("0"+dt.getDate()).slice(-2) + " " + ("0"+dt.getHours()).slice(-2) + ":" + ("0"+dt.getMinutes()).slice(-2) + ":" + ("0"+dt.getSeconds()).slice(-2) + "." + ("00"+dt.getMilliseconds()).slice(-3);