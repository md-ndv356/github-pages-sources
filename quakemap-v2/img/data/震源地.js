eewEpiPos = [12, 12];

context.clearRect(0, 0, 24, 24)
context.fillStyle = "#d00";
context.strokeStyle = "#fff";
context.lineWidth = 1.5;
context.globalAlpha = 1;
context.beginPath();
context.moveTo(eewEpiPos[0]- 7, eewEpiPos[1]-10);
context.lineTo(eewEpiPos[0]-10, eewEpiPos[1]- 7);
context.lineTo(eewEpiPos[0]- 3, eewEpiPos[1]   );
context.lineTo(eewEpiPos[0]-10, eewEpiPos[1]+ 7);
context.lineTo(eewEpiPos[0]- 7, eewEpiPos[1]+10);
context.lineTo(eewEpiPos[0]   , eewEpiPos[1]+ 3);
context.lineTo(eewEpiPos[0]+ 7, eewEpiPos[1]+10);
context.lineTo(eewEpiPos[0]+10, eewEpiPos[1]+ 7);
context.lineTo(eewEpiPos[0]+ 3, eewEpiPos[1]   );
context.lineTo(eewEpiPos[0]+10, eewEpiPos[1]- 7);
context.lineTo(eewEpiPos[0]+ 7, eewEpiPos[1]-10);
context.lineTo(eewEpiPos[0]   , eewEpiPos[1]- 3);
context.closePath();
context.fill();
context.stroke();