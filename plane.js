var PLANE = (function(x, y, rotation) {
	var self = {};

	const FUSELAGE_LENGTH = 40;
	const WING_LENGTH = 50;
	const ELEVATOR_LENGTH = 20;

	const WING_FRONT_OFFSET = 10;
	const ELEVATOR_BACK_OFFSET = 5;

	self.x = x;
	self.y = y;
	self.rotation = rotation;

	self.draw = function(context) {
		context.beginPath();

		var fuselageStartY = y - WING_FRONT_OFFSET;
		var fuselageEndY = y + (FUSELAGE_LENGTH - WING_FRONT_OFFSET);
		
		context.moveTo(x, fuselageStartY);
		context.lineTo(x, fuselageEndY);

		context.moveTo(x - WING_LENGTH / 2, y);
		context.lineTo(x + WING_LENGTH / 2, y);

		context.moveTo(x - ELEVATOR_LENGTH / 2, fuselageEndY - ELEVATOR_BACK_OFFSET);
		context.lineTo(x + ELEVATOR_LENGTH / 2, fuselageEndY - ELEVATOR_BACK_OFFSET);

		context.stroke();
	}

	return self;
});