var INSTRUMENT = (function(x, y) {
	var self = {};

	const SIZE = 200;
	const PADDING = 5;
	const INNER_MARK_LENGTH = 10;

	const CENTER_DOT_RADIUS = 3;

	const SMALL_DOT_RADIUS = 2;
	const SMALL_DOT_PADDING = 3;
	const NUM_SMALL_DOTS = 5;

	const TRIANGLE_WIDTH = 20;
	const TRIANGLE_HEIGHT = 15;
	const TRIANGLE_X_OFFSET = 15;
	const TRIANGLE_PADDING = 10;

	self.x = x;
	self.y = y;

	self.draw = function(context) {
		// Draw container box
		context.fillStyle = '#FFF';
		context.strokeStyle = '#000';
		context.fillRect(self.x, self.y, SIZE, SIZE);
		context.strokeRect(self.x, self.y, SIZE, SIZE);

		const centerX = self.x + SIZE / 2;
		const centerY = self.y + SIZE / 2;

		// Draw large circles
		const largeRadius = SIZE / 2 - PADDING * 2;

		context.beginPath();
		context.arc(centerX, centerY, largeRadius, 0, Math.PI * 2, false);
		context.stroke();

		// Draw small circle
		const smallRadius = largeRadius - 12 * 2;
		
		context.beginPath();
		context.arc(centerX, centerY, smallRadius, 0, Math.PI * 2, false);
		context.stroke();

		// Draw inner marks
		context.beginPath();

		context.moveTo(centerX, centerY - smallRadius);
		context.lineTo(centerX, centerY - smallRadius + INNER_MARK_LENGTH);

		context.moveTo(centerX + smallRadius, centerY);
		context.lineTo(centerX + smallRadius - INNER_MARK_LENGTH, centerY);

		context.moveTo(centerX, centerY + smallRadius);
		context.lineTo(centerX, centerY + smallRadius - INNER_MARK_LENGTH);

		context.moveTo(centerX - smallRadius, centerY);
		context.lineTo(centerX - smallRadius + INNER_MARK_LENGTH, centerY);

		context.stroke();

		// Draw center dot
		context.beginPath();
		context.arc(centerX, centerY, CENTER_DOT_RADIUS, 0, Math.PI * 2, false);
		context.stroke();

		// Draw small dots
		for (var i = 0; i < NUM_SMALL_DOTS; i++) {
			var x = centerX + CENTER_DOT_RADIUS + (SMALL_DOT_RADIUS * 2 + SMALL_DOT_PADDING) * (i + 1);

			context.beginPath();
			context.arc(x, centerY, SMALL_DOT_RADIUS, 0, Math.PI * 2, false);
			context.stroke();
		}

		for (var i = 0; i < NUM_SMALL_DOTS; i++) {
			var x = centerX - CENTER_DOT_RADIUS - (SMALL_DOT_RADIUS * 2 + SMALL_DOT_PADDING) * (i + 1);

			context.beginPath();
			context.arc(x, centerY, SMALL_DOT_RADIUS, 0, Math.PI * 2, false);
			context.stroke();
		}

		// Draw TO triangle
		context.beginPath();

		const innerMarkX = centerX + smallRadius - TRIANGLE_X_OFFSET;

		context.moveTo(innerMarkX, centerY - TRIANGLE_PADDING);

		context.lineTo(innerMarkX - TRIANGLE_WIDTH, centerY - TRIANGLE_PADDING);

		context.lineTo(innerMarkX - TRIANGLE_WIDTH / 2, centerY - TRIANGLE_PADDING - TRIANGLE_HEIGHT);

		context.closePath();
		context.stroke();

		// Draw FROM triangle
		context.beginPath();

		context.moveTo(innerMarkX, centerY + TRIANGLE_PADDING);

		context.lineTo(innerMarkX - TRIANGLE_WIDTH, centerY + TRIANGLE_PADDING);

		context.lineTo(innerMarkX - TRIANGLE_WIDTH / 2, centerY + TRIANGLE_PADDING + TRIANGLE_HEIGHT);

		context.closePath();
		context.stroke();

		// Draw labels for triangles
	}

	return self;
});