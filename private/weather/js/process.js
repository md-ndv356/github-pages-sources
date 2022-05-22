const Map = L.map("map", {
  center: [35.7102, 139.8132],
  zoom: 7,
  minZoom: 2,
  maxZoom: 18
});
L.control.layers({
  "淡色地図": L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png", {
    attribution: "<a href='http://maps.gsi.go.jp/development/ichiran.html'>地理院タイル</a>"
  }).addTo(Map),
  "標準地図": L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
    attribution: "<a href='http://maps.gsi.go.jp/development/ichiran.html'>地理院タイル</a>"
  }),
  "写真": L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg", {
    attribution: "<a href='http://maps.gsi.go.jp/development/ichiran.html'>地理院タイル</a>"
  }),
  "OpenStreetMap": L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
  })
}).addTo(Map);
Map.zoomControl.setPosition("bottomright");

var htmlElements = {};
{
  let s = {};
  let q = function(type, string, num=0){
    switch (type) {
      case "id":
        return document.getElementById(string);
      case "class":
        return document.getElementsByClassName(string)[num];
      case "tag":
        return document.getElementsByTagName(string)[num];
      default :
        throw "Invalid Selector Type";
    }
  }
  s.timeRange = q("id", "time-range");
  s.timeString = q("id", "time-string");
  s.rangeStartTime = q("id", "range-start-time");
  s.rangeEndTime = q("id", "range-end-time");
  htmlElements = s;
}

var targetTimes = [];
var targetNumber = 0;
const LoadLiden = function(timecode){
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function(){

  });
  xhr.open("GET", "https://www.jma.go.jp/bosai/jmatile/data/nowc/"+timecode+"/none/"+timecode+"/surf/liden/data.geojson?id=liden");
  xhr.send();
};
const SetInputRange = function(){
  targetNumber = targetTimes.length - 1;
  htmlElements.timeRange.step = 1;
  htmlElements.timeRange.max = targetNumber;
  htmlElements.rangeEndTime.textContent = targetTimes[0].slice(-6,-4) + ":" + targetTimes[0].slice(-4,-2);
  htmlElements.rangeStartTime.textContent = targetTimes[targetNumber].slice(-6,-4) + ":" + targetTimes[targetNumber].slice(-4,-2);
  htmlElements.timeString.textContent = htmlElements.rangeEndTime.textContent;
  htmlElements.timeRange.value = targetNumber;
  htmlElements.timeRange.addEventListener("input", function(){
    let max = targetTimes.length - 1;
    let value = htmlElements.timeRange.value;
    targetNumber = max - value;
    htmlElements.timeString.textContent = targetTimes[targetNumber].slice(-6,-4) + ":" + targetTimes[targetNumber].slice(-4,-2);
  });
  htmlElements.timeRange.addEventListener("change", function(){
    let max = targetTimes.length - 1;
    let value = htmlElements.timeRange.value;
    targetNumber = max - value;
    htmlElements.timeString.textContent = targetTimes[targetNumber].slice(-6,-4) + ":" + targetTimes[targetNumber].slice(-4,-2);
  });
};
const LoadTargetTimes = function(){
  let xhr = new XMLHttpRequest();
  let array = [];
  xhr.addEventListener("load", function(){
    let json = JSON.parse(this.response);
    for (let i=0, l=json.length; i<l; i++) {
      if (json[i].elements.includes("liden")) array.push(json[i].validtime);
    }
    LoadLiden(array[0]);
    targetTimes = array;
    SetInputRange();
  });
  xhr.open("GET", "https://www.jma.go.jp/bosai/jmatile/data/nowc/targetTimes_N3.json?_="+((new Date())-0));
  xhr.send();
};
LoadTargetTimes();
