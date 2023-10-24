function adjustTime(current){
  return new Promise((resolve, reject) => {
    fetch("https://weathernews.jp/xml/time.fcgi").then(response => response.text()).then((text) => {
      let time = text.match(/<time>(.*)<\/time>/)[1]*1000;
      resolve({
        timestamp: time,
        difference: time-current
      });
    }).catch(e=>{});
  });
}
