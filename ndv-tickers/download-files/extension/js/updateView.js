let sy = window.location.search.substring(1).split('&').map((p) => p.split('=')).reduce((obj, e) => ({...obj, [e[0]]: e[1]}), {});
document.getElementById("current").innerText = decodeURIComponent(sy.app);
document.getElementById("latest").innerText = decodeURIComponent(sy.new);
document.querySelector("textarea").value = "今回のアップデート内容：\n"+decodeURIComponent(sy.txt);
document.querySelector("a").href = decodeURIComponent(sy.url);
