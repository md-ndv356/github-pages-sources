(()=>{
  let message_status = {
    resolve: null,
    reject: null,
    isConnect: false
  };
  window.addEventListener("message", event => {
    // if (!message_status.isConnect) return;
    message_status.isConnect = false;
    message_status.resolve(event.data);
  });
  const iframe_sandbox = document.getElementById("sandbox-webassembly");
  window.connect2sandbox = (type, message) => {
    return new Promise((resolve, reject) => {
      if (message_status.isConnect) reject();
      let send_data = { type, main: message };
      message_status.resolve = resolve;
      message_status.reject = reject;
      iframe_sandbox.contentWindow.postMessage(send_data, "*");
    })
  };
})();
