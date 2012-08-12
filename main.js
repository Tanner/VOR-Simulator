var vor = null;
var plane = null;

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

	$(window).bind("resize", function() {
		sizeCanvas();
	});

	canvasContext = $("#canvas")[0].getContext('2d');

	vor = new VOR($(window).width() / 2, $(window).height() / 2);
	plane = new PLANE(500, 500, Math.PI * 0.32);

	$("#canvas").bind("click", onClick);
	$("#canvas").bind("mousemove", onMouseMove);

	requestAnimationFrame(draw);
});

function draw() {
	canvasContext.clearRect(0, 0, $("#canvas").width(), $("#canvas").height());

	vor.draw(canvasContext);
	plane.draw(canvasContext);

	requestAnimationFrame(draw);
}

function onClick(event) {
	if (event.which == 1) {
		plane.move(event.pageX, event.pageY);
	}
}

function onMouseMove(event) {
	if (event.which == 1) {
		plane.move(event.pageX, event.pageY);
	}
}

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