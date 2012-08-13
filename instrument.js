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

	const TO_TEXT = "TO";
	const FROM_TEXT = "FR";
	const DIR_FONT_SIZE = 12;

	const NUM_INNER_TICKS = 8;

	const NUM_MAJOR_TICKS = 12;
	const MAJOR_TICK_LENGTH = 7;
	const TICK_TEXT_PADDING = 4;

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

		// Draw upper triangle
		context.beginPath();

		context.moveTo(centerX, centerY - smallRadius);
		context.lineTo(centerX + INNER_MARK_LENGTH / 2, centerY - smallRadius + INNER_MARK_LENGTH);
		context.lineTo(centerX - INNER_MARK_LENGTH / 2, centerY - smallRadius + INNER_MARK_LENGTH);

		context.closePath();
		context.stroke();

		// Draw inner marks
		context.save();
		context.translate(centerX, centerY);

		for (var i = 0; i < NUM_INNER_TICKS; i++) {
			if (i == 0) {
				continue;
			}

			context.rotate(Math.PI * 2 / NUM_INNER_TICKS);

			context.beginPath();
			context.moveTo(0, -smallRadius);
			context.lineTo(0, -smallRadius + INNER_MARK_LENGTH);
			context.stroke();
		}

		context.restore();

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
		var textWidth;
		context.fillStyle = "#000";
		context.font = DIR_FONT_SIZE + "px Helvetica";

		textWidth = context.measureText(TO_TEXT).width;
		context.fillText(TO_TEXT, innerMarkX - TRIANGLE_WIDTH / 2 - textWidth / 2, centerY - TRIANGLE_PADDING - TRIANGLE_HEIGHT - TRIANGLE_PADDING / 2);

		textWidth = context.measureText(FROM_TEXT).width;
		context.fillText(FROM_TEXT, innerMarkX - TRIANGLE_WIDTH / 2 - textWidth / 2, centerY + TRIANGLE_PADDING + TRIANGLE_HEIGHT + DIR_FONT_SIZE);

		// Draw compass radial
		// Draw tick marks
		context.save();
		context.translate(centerX, centerY);

		// Major
		for (var i = 0; i < NUM_MAJOR_TICKS; i++) {
			if (i != 0) {
				context.rotate(Math.PI * 2 / NUM_MAJOR_TICKS);
			}

			context.moveTo(0, -smallRadius);
			context.lineTo(0, -smallRadius - MAJOR_TICK_LENGTH);
			context.stroke();

			var compassText = i * 360 / NUM_MAJOR_TICKS;
			compassText = compassText.toString().substr(0, 2);
			context.fillText(compassText, -context.measureText(compassText).width / 2, -smallRadius - MAJOR_TICK_LENGTH - TICK_TEXT_PADDING);
		}

		// Minor
		for (var i = 0; i < NUM_MAJOR_TICKS * 4; i++) {
			if (i != 0) {
				context.rotate(Math.PI * 2 / (NUM_MAJOR_TICKS * 4));
			}

			if (i % (360 / NUM_MAJOR_TICKS) == 0) {
				continue;
			}

			context.moveTo(0, -smallRadius);
			context.lineTo(0, -smallRadius - MAJOR_TICK_LENGTH / 3);
			context.stroke();
		}

		context.restore();
	}

	return self;
});