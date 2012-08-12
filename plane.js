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
		context.save();
		context.translate(this.x, this.y);

		if (rotation != 0) {
			context.rotate(this.rotation);
		}

		context.beginPath();

		var fuselageStartY = -WING_FRONT_OFFSET;
		var fuselageEndY = FUSELAGE_LENGTH - WING_FRONT_OFFSET;
		
		context.moveTo(0, fuselageStartY);
		context.lineTo(0, fuselageEndY);

		context.moveTo(-WING_LENGTH / 2, 0);
		context.lineTo(WING_LENGTH / 2, 0);

		context.moveTo(-ELEVATOR_LENGTH / 2, fuselageEndY - ELEVATOR_BACK_OFFSET);
		context.lineTo(ELEVATOR_LENGTH / 2, fuselageEndY - ELEVATOR_BACK_OFFSET);

		context.stroke();
		context.restore();
	}

	self.move = function(x, y) {
		self.x = x;
		self.y = y;
	}

	return self;
});