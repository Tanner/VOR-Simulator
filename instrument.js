var INSTRUMENT = (function(x, y) {
	var self = {};

	const SIZE = 200;

	self.x = x;
	self.y = y;

	self.draw = function(context) {
		context.fillStyle = '#FFF';
		context.strokeStyle = '#000';
		context.fillRect(self.x, self.y, SIZE, SIZE);
		context.strokeRect(self.x, self.y, SIZE, SIZE);
	}

	return self;
});