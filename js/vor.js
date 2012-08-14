var VOR = (function(x, y) {
	var self = {};

	const DOT_RADIUS = 5;
	const HEXAGON_RADIUS = 20;

	self.x = x;
	self.y = y;

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
	}

	return self;
});