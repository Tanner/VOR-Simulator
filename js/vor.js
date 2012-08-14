var VOR = (function(x, y) {
	var self = {};

	const DOT_RADIUS = 5;
	const HEXAGON_RADIUS = 20;

	const DEBUG_LINE_LENGTH = 300;
	const DEBUG_TO_TEXT = "TO";
	const DEBUG_FR_TEXT = "FR";
	const DEBUG_FONT_SIZE = 12;

	self.x = x;
	self.y = y;

	self.radialAngle = 0;

	self.drawDebug = true;

	self.draw = function(context) {
		context.fillStyle = '#000';
		context.strokeStyle = '#000';

		context.beginPath();
		context.arc(x, y, DOT_RADIUS, 0, Math.PI * 2, true);
		context.fill();

		context.beginPath();
		
		var angle = (360.0 / 6) * (Math.PI / 180);

		for (var i = 0; i < 6; i++) {
			context.lineTo(x + HEXAGON_RADIUS * Math.cos(angle * i), y + HEXAGON_RADIUS * Math.sin(angle * i));
		}

		context.lineTo(x + HEXAGON_RADIUS, y);

		context.stroke();

		if (self.drawDebug) {
			context.save();
			context.translate(x, y);
			context.rotate(self.radialAngle);

			context.font = DEBUG_FONT_SIZE + "px Helvetica";

			context.beginPath();
			context.strokeStyle = '#F00';
			context.moveTo(0, 0);
			context.lineTo(0, DEBUG_LINE_LENGTH);
			context.stroke();
			context.fillText(DEBUG_FR_TEXT, -context.measureText(DEBUG_FR_TEXT).width / 2, DEBUG_LINE_LENGTH + DEBUG_FONT_SIZE * 2);

			context.beginPath();
			context.strokeStyle = '#0F0';
			context.moveTo(0, 0);
			context.lineTo(0, -DEBUG_LINE_LENGTH);
			context.stroke();
			context.fillText(DEBUG_TO_TEXT, -context.measureText(DEBUG_TO_TEXT).width / 2, -DEBUG_LINE_LENGTH - DEBUG_FONT_SIZE);

			context.restore();
		}
	}

	self.pointOnToSide = function(x, y) {
		var anglePerpendicular = self.radialAngle + Math.PI / 2;

		var x1 = self.x - Math.sin(anglePerpendicular) * 100;
		var y1 = self.y + Math.cos(anglePerpendicular) * 100;

		var x2 = self.x + Math.sin(anglePerpendicular) * 100;
		var y2 = self.y - Math.cos(anglePerpendicular) * 100;

		return ((x1 - x) * (y2 - y) - (y1 - y) * (x2 - x)) < 0;
	}

	self.setPrimaryIndex = function(radian) {
		self.radialAngle = radian;
	}

	return self;
});