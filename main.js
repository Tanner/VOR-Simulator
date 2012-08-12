var vor = null;

(function() {
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
})();

$(document).ready(function() {
	if (!isCanvasSupported()) {
		$("#no-canvas").removeClass("hidden");
		return;
	}

	sizeCanvas();

	canvasContext = $("#canvas")[0].getContext('2d');

	vor = new VOR($(window).width() / 2, $(window).height() / 2);

	requestAnimationFrame(draw);
});

function draw() {
	canvasContext.clearRect(0, 0, $("#canvas").width(), $("#canvas").height());

	vor.draw(canvasContext);

	requestAnimationFrame(draw);
}

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