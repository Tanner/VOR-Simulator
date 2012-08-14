var vor = null;
var plane = null;
var instrument = null;

var clickTimerID = null;

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

	const PADDING = 25;

	vor = new VOR($(window).width() / 2, $(window).height() / 2);
	plane = new PLANE($(window).width() / 3, $(window).height() / 3, 0);
	instrument = new INSTRUMENT($(window).width() - 200 - PADDING, PADDING);

	$("#canvas").bind("mousedown", onMouseDown);
	$("#canvas").bind("mouseup", onMouseUp);
	$("#canvas").bind("mousemove", onMouseMove);

	requestAnimationFrame(draw);
});

function draw() {
	canvasContext.clearRect(0, 0, $("#canvas").width(), $("#canvas").height());

	vor.draw(canvasContext);
	plane.draw(canvasContext);
	instrument.draw(canvasContext);

	requestAnimationFrame(draw);
}

function onMouseDown(event) {
	if (event.which == 1) {
		rotateKnob(event.pageX, event.pageY);
		clickTimerID = window.setTimeout(repeatRotateKnob, 1500, event.pageX, event.pageY);
	}
}

function onMouseUp(event) {
	clearTimeout(clickTimerID);
}

function onMouseMove(event) {
	if (event.which == 1) {
		if (plane.pointInPlane(event.pageX, event.pageY)) {
			plane.move(event.pageX, event.pageY);
		}
	}
}

function rotateKnob(x, y) {
	if (instrument.pointInOBSKnob(x, y)) {
		instrument.mouseTurnKnob(x);

		vor.setPrimaryIndex(instrument.getConfinedCompassAngle());
	}
}

function repeatRotateKnob(x, y) {
	rotateKnob(x, y);

	clickTimerID = window.setTimeout(repeatRotateKnob, 25, x, y);
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