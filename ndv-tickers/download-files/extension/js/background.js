var id = null;
// var intervalID = setInterval(function(){
//     $(function(){
//         $.ajax({
//             type: 'GET',
//             url: "http://www.data.jma.go.jp/developer/xml/feed/extra.xml",
//             dataType: 'xml',
//             cache: false,
//             success: function(data){
//               var entry = $(data).find('entry').eq(0);
//               if($(entry).find('link').attr('href')!=lastattr){
//                 //if($(entry).find('title').text().indexOf("記録的短時間大雨情報")!=-1){
//                   notification("create", $(entry).find('title').text(), $(entry).find('content').text().replace(/【.{1,}】/g, ""), "information_about_a_record-breaking_deluge_in_a_short_period", 1)
//                 //}
//               }
//               lastattr = $(entry).find('link').attr('href');
//             }
//         });
//     });
// }, 20000);
chrome.action.onClicked.addListener(function(){
    open_Main();
});
var lastattr = "";
chrome.windows.onRemoved.addListener(function(c){
    if(id === c)id=null;
    // if(intervalID===null){
    //   intervalID = setInterval(function(){
    //     $(function(){
    //         $.ajax({
    //             type: 'GET',
    //             url: "http://www.data.jma.go.jp/developer/xml/feed/extra.xml",
    //             dataType: 'xml',
    //             cache: false,
    //             success: function(data){
    //               var entry = $(data).find('entry').eq(0);
    //               if($(entry).find('link').attr('href')!=lastattr){
    //                 //if($(entry).find('title').text().indexOf("記録的短時間大雨情報")!=-1){
    //                   notification("create", ($(entry).find('content').text()).split("】")[0]+"】", $(entry).find('content').text().replace(/【.{1,}】/g, ""), "information_about_a_record-breaking_deluge_in_a_short_period", 1);
    //                 //}
    //                 console.log(entry);
    //               }
    //               lastattr = $(entry).find('link').attr('href');
    //             }
    //         })
    //     });
    //   }, 10000);
    // }
});
chrome.commands.onCommand.addListener(function(command){
  if(command == "main_window_open")open_Main();
})
function open_Main(){
  if(id === null){
    chrome.windows.create({
        url: "popup2.html",
        type: "popup",
        height: 500,
        width: 1248
    }, function(c){
        id = c.id;
    });
    // clearInterval(intervalID);
    // intervalID = null;
  } else {
    chrome.windows.update(id, {focused:true});
  }
}
var notification_timeoutID = null;
function notification(a, b, c, d, e){
  switch (a) {
    case "create":
      chrome.notifications.getAll(function(callback){
          if(Object.keys(callback).indexOf(d) != -1){
            chrome.notifications.update(d, {
                iconUrl: 'img/icon128.png',
                type: 'basic',
                title: b,
                message: c,
                priority: e
            });
            clearTimeout(notification_timeoutID);
          } else {
            chrome.notifications.create(d, {
                iconUrl: 'img/icon128.png',
                type: 'basic',
                title: b,
                message: c,
                priority: e
            });
          }
      });
      notification_timeoutID = setTimeout(function(){
          notification("clear",d);
      }, 20000);
      break;
      //b:title, c:message, d:notificationid, e:priority
    case "update":
      chrome.notifications.update(d, {
          iconUrl: 'img/icon128.png',
          type: 'basic',
          title: b,
          message: c,
          priority: e
      });
      break;
      //b:title, c:message, d:notificationid, e:priority
    case "clear":
      chrome.notifications.clear(b);
      clearTimeout(notification_timeoutID);
      notification_timeoutID = null;
      break;
      //b:notificationid
    default:
      console.error("Error: Notification type error");
      break;
  }
}
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    console.log(message);
    sendResponse({response: "ok", sender: sender});
    if(message == "open"){
      open_Main();
      sendResponse({response: "ok", sender: sender});
    } else if(message == "mainclose"){
      chrome.windows.remove(sender.tab.windowId);
    } else if(message.indexOf('ZoomInformation[') != -1){
      chrome.windows.update(id, {
        width: 1248 * Number(
          message.slice(
            message.indexOf(
              'ZoomInformation['
            )+16,
            message.indexOf(
              ']'
            )
          )
        )
      });
      sendResponse({response: "ok", sender: sender});
    } else {
      sendResponse({response: "error", sender: sender});
    }
});
chrome.storage.sync.get(['mode0','mode3'], function(c){
  if(JSON.stringify(c) == "{}"){
    chrome.storage.sync.set({
      mode0:{
        main:[ "<weather/river>", "<weather/temperature/high>", "<weather/rain/1h>", "<weather/rain/24h>", "<weather/wind>" ],
        title:[ "河川情報", "最高気温(℃)", "時降水量(mm/h)", "日降水量(mm/d)", "最大風速(m/s)" ]
      },
      mode3:[ "aaaaああああ｜｜", "文章あいうえお文章あいうえお文章あいうえお文章あいうえお文章あいうえお文章あいうえお文章あいうえおabc-0234", "text" ],
      settings: {
        autorecord: false,
        fixitem: [false,false,false,false,false],
        soraview: false,
        details: {
          earthquake: {
            intensity: "1",
            magnitude: "0",
            depth: "1000"
          },
          eew: {
            intensity: "1",
            unknown: "1",
            magnitude: "0",
            depth: "-1"
          }
        },
        clipboard: { eew: false, quake: false },
        interval: {
          iedred7584EEW: 4000,
          nhkQuake: 14000,
          jmaDevFeed: 15000,
          tenkiJPtsunami: 30000,
          wniMScale: 30000,
          wniSorabtn: 30000,
          wniRiver: 300000,
          wniliveTimeTable: 240000,
          tepcoTeiden: 60000
        },
        volume: {
          eewL: 100,
          eewH: 10,
          eewP: 100,
          gl: 100,
          ntc: 100,
          spW: 100,
          tnm: 100,
          hvra: 100,
          fldoc: 100
        },
        theme: { color: 0 },
        sendEEW: false
      },
      app:{ lastVer: "", newUser: true }
    });
  }
});
