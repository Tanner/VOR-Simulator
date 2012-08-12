$(document).ready(function() {
	if (!isCanvasSupported()) {
		$("#no-canvas").removeClass("hidden");
		return;
	}

	sizeCanvas();

	canvasContext = $("#canvas")[0].getContext('2d');

	var vor = new VOR(100, 100);
	vor.draw(canvasContext);
})

$(window).bind("resize", function() {
	sizeCanvas();
});

function isCanvasSupported() {
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}

function sizeCanvas() {
	canvasWidth = $(window).width();
	canvasHeight = $(window).height();

	$("#canvas").attr('width', canvasWidth);
	$("#canvas").attr('height', canvasHeight);

	$("#canvas").css("width", canvasWidth + "px");
	$("#canvas").css("height", canvasHeight + "px");
}