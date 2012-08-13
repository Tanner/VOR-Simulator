var INSTRUMENT = (function(x, y) {
	var self = {};

	const SIZE = 200;
	const PADDING = 3;

	const LARGE_RADIUS = SIZE / 2 - PADDING * 2;
	const SMALL_RADIUS = LARGE_RADIUS - 12 * 2;

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

	const NEEDLE_LENGTH = SMALL_RADIUS * 2 - PADDING * 5;

	const NEEDLE_ROTATION_MIN = Math.PI * 0.2;
	const NEEDLE_ROTATION_MAX = Math.PI * -0.2;

	const NEEDLE_ROTATION_INPUT_MIN = -10;
	const NEEDLE_ROTATION_INPUT_MAX = 10;

	self.x = x;
	self.y = y;

	self.needleRotation = 0;

	self.draw = function(context) {
		const centerX = self.x + SIZE / 2;
		const centerY = self.y + SIZE / 2;

		// Draw container box
		context.fillStyle = '#FFF';
		context.strokeStyle = '#000';

		context.beginPath();
		context.arc(centerX, centerY, SIZE / 2, 0, Math.PI * 2, false);
		context.stroke();
		context.fill();

		// Draw large circles
		context.fillStyle = '#000';
		context.strokeStyle = '#FFF';

		context.beginPath();
		context.arc(centerX, centerY, LARGE_RADIUS, 0, Math.PI * 2, false);
		context.stroke();
		context.fill();

		// Draw small circle
		context.beginPath();
		context.arc(centerX, centerY, SMALL_RADIUS, 0, Math.PI * 2, false);
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

		const innerMarkX = centerX + SMALL_RADIUS - TRIANGLE_X_OFFSET;

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
		context.fillStyle = "#FFF";
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

			context.moveTo(0, -SMALL_RADIUS);
			context.lineTo(0, -SMALL_RADIUS - MAJOR_TICK_LENGTH);
			context.stroke();

			var compassText = i * 360 / NUM_MAJOR_TICKS;
			compassText = compassText.toString().substr(0, 2);
			context.fillText(compassText, -context.measureText(compassText).width / 2, -SMALL_RADIUS - MAJOR_TICK_LENGTH - TICK_TEXT_PADDING);
		}

		// Minor
		for (var i = 0; i < NUM_MAJOR_TICKS * 4; i++) {
			if (i != 0) {
				context.rotate(Math.PI * 2 / (NUM_MAJOR_TICKS * 4));
			}

			if (i % (360 / NUM_MAJOR_TICKS) == 0) {
				continue;
			}

			context.moveTo(0, -SMALL_RADIUS);
			context.lineTo(0, -SMALL_RADIUS - MAJOR_TICK_LENGTH / 3);
			context.stroke();
		}

		context.restore();

		// Draw needle
		context.save();
		context.translate(centerX, centerY - SMALL_RADIUS);

		context.beginPath();
		context.arc(0, SMALL_RADIUS, SMALL_RADIUS, 0, Math.PI * 2, false);
		context.clip();

		var rotationAmount = map(self.needleRotation, NEEDLE_ROTATION_INPUT_MIN, NEEDLE_ROTATION_INPUT_MAX, NEEDLE_ROTATION_MIN, NEEDLE_ROTATION_MAX);
		context.rotate(rotationAmount);

		context.moveTo(0, 0);
		context.lineTo(0, NEEDLE_LENGTH);

		context.stroke();

		context.restore();

		// Draw upper triangle
		context.beginPath();

		context.fillStyle = "#FFF";
		context.strokeStyle = "#000";

		context.moveTo(centerX, centerY - SMALL_RADIUS);
		context.lineTo(centerX + INNER_MARK_LENGTH / 2, centerY - SMALL_RADIUS + INNER_MARK_LENGTH);
		context.lineTo(centerX - INNER_MARK_LENGTH / 2, centerY - SMALL_RADIUS + INNER_MARK_LENGTH);

		context.closePath();
		context.fill();
		context.stroke();
	}

	function map(input, inputMin, inputMax, outputMin, outputMax) {
		var inputSpan = inputMax - inputMin;
		var outputSpan = outputMax - outputMin;

		var inputScaled = (input - inputMin) / inputSpan;

		return outputMin + (inputScaled * outputSpan);
	}

	return self;
});