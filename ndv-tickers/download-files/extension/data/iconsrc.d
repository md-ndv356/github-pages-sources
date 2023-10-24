// アイコンデザイン
ct.fillStyle = "#000";
ct.fillRect(0,0,128,128);
ct.fillStyle = "#444";
ct.fillRect(0,32,128,64);
ct.fillStyle = "yellow";
ct.beginPath();
ct.moveTo(64,0);
ct.lineTo(48,80);
ct.lineTo(68,-0.5*68+104);
ct.lineTo(64,128);
ct.lineTo(80,48);
ct.lineTo(60,-0.5*60+88);
ct.lineTo(64,0);
ct.fill();
ct.strokeStyle = "#e22";
ct.lineJoin = "bevel";
ct.lineWidth = 2.5;
ct.beginPath();
ct.moveTo(0,64);
ct.lineTo(42,64);
ct.lineTo(44,64-18);
ct.lineTo(46,64+14);
ct.lineTo(48,64-17);
ct.lineTo(50,64+21);
ct.lineTo(52,64-12);
ct.lineTo(54,64+13);
ct.lineTo(56,64-9);
ct.lineTo(58,64+12);
ct.lineTo(60,64-11);
ct.lineTo(62,64+7);
ct.lineTo(64,64-12);
ct.lineTo(66,64+14);
ct.lineTo(68,64-6);
ct.lineTo(70,64+12);
ct.lineTo(72,64-11);
ct.lineTo(74,64+7);
ct.lineTo(76,64-16);
ct.lineTo(78,64+27);
ct.lineTo(80,64-31);
ct.lineTo(82,64+47);
ct.lineTo(84,64-52);
ct.lineTo(86,64+33);
ct.lineTo(88,64-41);
ct.lineTo(90,64+39);
ct.lineTo(92,64-48);
ct.lineTo(94,64+40);
ct.lineTo(96,64-46);
ct.lineTo(98,64+39);
ct.lineTo(100,64-35);
ct.lineTo(102,64+36-2);
ct.lineTo(104,64-35+0);
ct.lineTo(106,64+33-7);
ct.lineTo(108,64-32+2);
ct.lineTo(110,64+30-2);
ct.lineTo(112,64-29+6);
ct.lineTo(114,64+27-7);
ct.lineTo(116,64-26+2);
ct.lineTo(118,64+24-4);
ct.lineTo(120,64-23+7);
ct.lineTo(122,64+21-10);
ct.lineTo(124,64-20+11);
ct.lineTo(126,64+18-4);
ct.lineTo(128,64-17+8);
ct.stroke()

// Maximum Seismic Intensity
ct.fillStyle = "#fff";
ct.font = "bold 18px Helvetica-Neue";
ct.fillText("Maximum", 0, 18, 70);
ct.fillText("Seismic", 0, 36, 70);
ct.fillText("Intensity", 0, 54, 70);

// ~/img/texts/maxint/
ct.globalCompositeOperation = "source-over";
ct.fillStyle = "#0f0";
ct.fillRect(0, 0, 130, 60);
ct.globalCompositeOperation = "destination-out";
ct.fillStyle = "#f00";
ct.fillRect(0, 0, 130, 60);
ct.globalCompositeOperation = "source-over";
ct.fillStyle = "#fff";
ct.font = "bold 18px Helvetica-Neue";
ct.fillText("Maximum", 0, 18, 70);
ct.fillText("Seismic", 0, 36, 70);
ct.fillText("Intensity", 0, 54, 70);
ct.font = "bold 25px sans-serif";
ct.fillText("最大震度", 0, 25, 70);
ct.font = "bold 46px AdobeHeitiStd-Regular";
ct.fillText("1", 96, 45);
ct.fillText("5-", 83, 45);
ct.font = "bold 46px AdobeHeitiStd-Regular";
ct.fillText("5", 83, 45);
ct.font = "bold 30px AdobeHeitiStd-Regular";
ct.fillText("+", 109, 45);

// ~/img/texts/*.png
ct.fillStyle = "#fff";
ct.font = "bold 25px Helvetica-Neue";
ct.fillText("M", 0, 25);
ct.fillText("Epicenter", 0, 25, 51);
ct.fillText("Depth", 0, 25, 51);
ct.fillText("㎞", 0, 25);
ct.fillText("Occurrence at", 0, 25, 113);
ct.font = "bold 25px sans-serif";
ct.fillText("震源", 0, 25);
ct.fillText("深さ", 0, 25);
ct.fillText("発生時刻", 0, 25);
ct.font = "bold 24px HiraginoSans-W5";
ct.fillText("JST", 1, 24, 34);

// 地震情報 文字
canvas.width = 220; canvas.height = 60;
gr = ct.createLinearGradient(0, 20, 0, 60);
gr.addColorStop(0.75, "#444");
gr.addColorStop(1.00, "#882");
gr.addColorStop(0.00, "#444");
gr.addColorStop(0.75, "#723");
gr.addColorStop(1.00, "#a12");
ct.fillStyle = gr;
ct.fillRect(0, 0, 220, 60);
ct.font = "400 30px 'ヒラギノ角ゴシック'";
ct.fillStyle = "#fff";
ct.textAlign = "end";
ct.letterSpacing = "0px";
ct.fillText("地震情報", 210, 31);
ct.font = "21px HelveticaNeue-Light";
ct.letterSpacing = "1px";
ct.fillText("Earthquake Information", 215, 53, 206);

// texture data
{
    let text = "0123456789.,abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!+-*/";
    let json = `{"datas":[`;
    let colorcode = "";
    let fontname = "";
    let fontsize = 0;
    ct.clearRect(0, 0, 16384, 16384);
    ct.font = "bld or itlc "+fontsize+"px '"+fontname+"'";
    ct.fillStyle = "#"+colorcode;
    let x = 4;
    let y = 42;
    let maxupper = 0;
    let maxlower = 0;
    for(let i=0,l=text.length; i<l; i++){
        let measure = ct.measureText(text[i]);
        ct.fillText(text[i], x, y);
        json += `{"font":{"actualBoundingBoxAscent":${measure.actualBoundingBoxAscent},"actualBoundingBoxDescent":${measure.actualBoundingBoxDescent},"actualBoundingBoxLeft":${measure.actualBoundingBoxLeft},"actualBoundingBoxRight":${measure.actualBoundingBoxRight},"fontBoundingBoxAscent":${measure.fontBoundingBoxAscent},"fontBoundingBoxDescent":${measure.fontBoundingBoxDescent},"width":${measure.width}},"position":{x:${x},y:${y}}},`;
        x += Math.ceil(measure.width) + 3;
        maxupper = Math.max(maxupper, measure.fontBoundingBoxAscent);
        maxlower = Math.max(maxlower, measure.fontBoundingBoxDescent);
    }
    console.log(json+`],"name":"${fontname}","size":${fontsize},"bold":true,"italic":false,"color":"${colorcode}","text":"${text}"}`);
    console.log("END: "+x+"px / "+(maxupper+maxlower)+"px("+maxupper+"+"+maxlower+")");
}
// beta
{
    let text = "0123456789.,abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!+-*/";
    let colorcode = "ffffff";
    let fontname = "Microsoft Sans Serif";
    let fontsize = 40;
    ct.clearRect(0, 0, 16384, 16384);
    ct.font = "bold "+fontsize+"px '"+fontname+"'";
    ct.fillStyle = "#"+colorcode;
    let x = 2;
    let y = 42;
    let maxupper = 0;
    let maxlower = 0;
    let list = [];
    for(let i=0,l=text.length; i<l; i++){
        let measure = ct.measureText(text[i]);
        ct.fillText(text[i], x+measure.actualBoundingBoxLeft, y);
        console.log("["+text[i]+"] offset: "+(x+"").padStart(4," ")+"px / right: "+measure.actualBoundingBoxRight.toFixed(7).padStart(10," ")+"px / left: "+measure.actualBoundingBoxLeft.toFixed(7).padStart(10," ")+"px");
        list.push(`{"font":{"actualBoundingBoxAscent":${measure.actualBoundingBoxAscent},"actualBoundingBoxDescent":${measure.actualBoundingBoxDescent},"actualBoundingBoxLeft":${measure.actualBoundingBoxLeft},"actualBoundingBoxRight":${measure.actualBoundingBoxRight},"fontBoundingBoxAscent":${measure.fontBoundingBoxAscent},"fontBoundingBoxDescent":${measure.fontBoundingBoxDescent},"width":${measure.width}},"position":{"x":${x},"y":${y}}}`);
        x += Math.ceil(measure.actualBoundingBoxRight + measure.actualBoundingBoxLeft)+3;
        maxupper = Math.max(maxupper, measure.fontBoundingBoxAscent);
        maxlower = Math.max(maxlower, measure.fontBoundingBoxDescent);
    }
    // console.log(`{"datas":[`+list.join(",")+`],"name":"${fontname}","size":${fontsize},"bold":true,"italic":false,"color":"${colorcode}","text":"${text}"}`);
    console.log("END: "+x+"px / "+(maxupper+maxlower)+"px("+maxupper+"+"+maxlower+")");
}

// ~/img/eewCancelled.png
context.save();
let gr = context.createLinearGradient(0,24,0,104);
gr.addColorStop(0, "#7be31e");
gr.addColorStop(1, "#269400");
context.fillStyle = "#000a";
context.strokeStyle = "#fff";
context.lineWidth = 2;
context.fillRect(0,0,1080,128);
context.fillStyle = gr;
context.translate(220,0);
context.beginPath();
context.moveTo(470,30);
context.lineTo(470,98);
context.quadraticCurveTo(470,100.45,468.2,102.2);
context.quadraticCurveTo(466.45,104,464,104);
context.lineTo(176,104);
context.quadraticCurveTo(173.55,104,171.75,102.2);
context.quadraticCurveTo(170,100.45,170,98);
context.lineTo(170,30);
context.quadraticCurveTo(170,27.55,171.75,25.75);
context.quadraticCurveTo(173.55,24,176,24);
context.lineTo(464,24);
context.quadraticCurveTo(466.45,24,468.2,25.75);
context.quadraticCurveTo(470,27.55,470,30);
context.fill();
context.stroke();
context.font = "bold 25px 'ヒラギノ角ゴ ProN', JPAPGothic";
context.fillStyle = "#fff";
context.textAlign = "center";
context.fillText("緊急地震速報は",320,60);
context.fillText("取り消されました",320,90);
context.restore();

// ~/img/texts/intensity/*/*.png
ct.clearRect(0, 0, 200, 68);
ct.fillStyle = "#000";
ct.font = '600 35px "ヒラギノ角ゴシック"';
ct.fillText("震度", 15, 42, 180);
ct.font = '700 60px "ヒラギノ角ゴシック"';
ct.fillText("7", 96, 57, 180);
ct.font = '700 45px "ヒラギノ角ゴシック"';
ct.fillText("不明", 94, 52, 180);
ct.font = 'bold 40px "ヒラギノ角ゴ ProN"';
ct.fillText("弱", 141, 56, 180);
ct.fillText("強", 141, 56, 180);
ct.font = 'bold 45px "ヒラギノ角ゴ ProN"';
ct.fillText("概要", 55, 52, 180);

// eew epicenters image
{
    let table = AreaEpicenter;
    let keys = Object.keys(table).sort();
    let colorcode = "ffffff";
    let fontname = "ヒラギノ角ゴ ProN";
    let fontsize = 55;
    let x = 40;
    let y = 65;
    let list = [];
    ct.clearRect(0, 0, 32768, 32768);
    ct.fillStyle = "#"+colorcode;
    for(let i=0, l=keys.length; i<l; i++){
        ct.font = "12px sans-serif";
        ct.fillText(keys[i], 1, y, 350);
        ct.font = "bold "+fontsize+"px '"+fontname+"'";
        ct.fillText(table[keys[i]], x, y, 350);
        list.push(`{"position":{"x":${x},"y":${y}},"id":"`+keys[i]+`"}`);
        y += 65;
    }
    console.log(`{"datas":[`+list.join(",")+`],"name":"${fontname}","size":${fontsize},"bold":true,"italic":false,"color":"${colorcode}"}`);
}

// eew intensity image
ct.save();
ct.clearRect(0, 0, 100, 680);
ct.fillStyle = "#fff";
ct.font = "bold 55px 'ヒラギノ角ゴ ProN'";
ct.fillText("？", 2, 55, 95);
ct.font = "bold 18px 'ヒラギノ角ゴ ProN'";
ct.fillText("不明", 51, 55, 95);

ct.translate(0, 68);
ct.font = "61px Futura";
ct.fillText("1", 12, 58, 95);

ct.translate(0, 68);
ct.font = "61px Futura";
ct.fillText("2", 12, 58, 95);

ct.translate(0, 68);
ct.font = "61px Futura";
ct.fillText("3", 12, 58, 95);

ct.translate(0, 68);
ct.font = "61px Futura";
ct.fillText("4", 12, 58, 95);

ct.translate(0, 68);
ct.font = "61px Futura";
ct.fillText("5", 12, 58, 95);
ct.fillRect(53, 41, 25, 6);

ct.translate(0, 68);
ct.font = "61px Futura";
ct.fillText("5", 12, 58, 95);
ct.fillRect(53, 24, 24, 6);
ct.fillRect(62, 15, 6, 24);

ct.translate(0, 68);
ct.font = "61px Futura";
ct.fillText("6", 12, 58, 95);
ct.fillRect(53, 41, 25, 6);

ct.translate(0, 68);
ct.font = "61px Futura";
ct.fillText("6", 12, 58, 95);
ct.fillRect(53, 24, 24, 6);
ct.fillRect(62, 15, 6, 24);

ct.translate(0, 68);
ct.font = "61px Futura";
ct.fillText("7", 12, 58, 95);
ct.restore();

// eew_icon (現在は画像編集した)
context.fillStyle = "#2b4aad";
context.fillRect(0, 60, 900, 68);
context.fillStyle = "#233d91";
context.fillRect(0, 0, 900, 60);
context.fillStyle ="#ffea00";
context.font = "bold 53px 'Microsoft Sans Serif', JPAPGothic";
context.fillText("緊急地震速報", 3, 50, 250);
context.font = "bold 39px 'Microsoft Sans Serif', JPAPGothic";
context.fillText("EEW", 255, 55, 60);

context.fillStyle = "#b8240d";
context.fillRect(0, 60, 900, 68);
context.fillStyle = "#c42810";
context.fillRect(0, 0, 900, 60);
context.fillStyle ="#ffea00";
context.font = "bold 53px 'Microsoft Sans Serif', JPAPGothic";
context.fillText("緊急地震速報", 3, 50, 250);
context.font = "bold 39px 'Microsoft Sans Serif', JPAPGothic";
context.fillText("EEW", 255, 55, 60);
context.fillRect(900, 0, 5, 128);


// ???????
{
    let text = "iiijjj0-";
    let colorcode = "ffffff";
    let fontname = "HelveticaNeue-CondensedBold";
    let fontsize = 40;
    ct.clearRect(0, 0, 16384, 16384);
    ct.font = "bold "+fontsize+"px '"+fontname+"'";
    let x = 2 + Math.ceil(ct.measureText(text[0]).actualBoundingBoxLeft);
    let y = 34;
    let maxupper = 0;
    let maxlower = 0;
    let list = [];
    for(let i=0,l=text.length; i<l; i++){
        let measure = ct.measureText(text[i]);
        ct.fillStyle = "#ff05";
        if ((i+1)%2) ct.fillRect(x, 0, Math.ceil(measure.actualBoundingBoxRight + measure.actualBoundingBoxLeft), 100);
        ct.fillStyle = "#"+colorcode;
        ct.fillText(text[i], x + measure.actualBoundingBoxLeft, y);
        console.log("["+text[i]+"] offset: "+(x+"").padStart(4," ")+"px / right: "+measure.actualBoundingBoxRight.toFixed(7).padStart(10," ")+"px / left: "+measure.actualBoundingBoxLeft.toFixed(7).padStart(10," ")+"px / width: "+measure.width.toFixed(7).padStart(10," ")+"px");
        list.push(`{"font":{"actualBoundingBoxAscent":${measure.actualBoundingBoxAscent},"actualBoundingBoxDescent":${measure.actualBoundingBoxDescent},"actualBoundingBoxLeft":${measure.actualBoundingBoxLeft},"actualBoundingBoxRight":${measure.actualBoundingBoxRight},"fontBoundingBoxAscent":${measure.fontBoundingBoxAscent},"fontBoundingBoxDescent":${measure.fontBoundingBoxDescent},"width":${measure.width}},"position":{"x":${x},"y":${y}}}`);
        x += Math.ceil(measure.actualBoundingBoxRight + measure.actualBoundingBoxLeft)+1;
        maxupper = Math.max(maxupper, measure.fontBoundingBoxAscent);
        maxlower = Math.max(maxlower, measure.fontBoundingBoxDescent);
        // debugger;
    }
    // console.log(`{"datas":[`+list.join(",")+`],"name":"${fontname}","size":${fontsize},"bold":true,"italic":false,"color":"${colorcode}","text":"${text}"}`);
    console.log("END: "+x+"px / "+(maxupper+maxlower)+"px("+maxupper+"+"+maxlower+")");
}