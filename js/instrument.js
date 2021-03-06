var INSTRUMENT = (function(x, y) {
	var self = {};

	const SIZE = 200;
	const PADDING = 2;

	const CENTER_X = x + SIZE / 2;
	const CENTER_Y = y + SIZE / 2;

	const NUMBER_GAP = 30;

	const CONTAINER_RADIUS = SIZE / 2;
	const LARGE_RADIUS = SIZE / 2 - PADDING * 2;
	const SMALL_RADIUS = LARGE_RADIUS - NUMBER_GAP;

	const INNER_MARK_LENGTH = 10;

	const CENTER_DOT_RADIUS = 3;

	const SMALL_DOT_RADIUS = 2;
	const SMALL_DOT_PADDING = 3;
	const NUM_SMALL_DOTS = 5;

	const TRIANGLE_WIDTH = 20;
	const TRIANGLE_HEIGHT = 15;
	const TRIANGLE_X_OFFSET = 20;
	const TRIANGLE_PADDING = 10;

	const TO_TEXT = "TO";
	const FROM_TEXT = "FR";
	const DIR_FONT_SIZE = 12;

	const NUM_DEGREES = 360;

	const NUM_INNER_TICKS = 8;

	const NUM_MAJOR_TICKS = 12;
	const MAJOR_TICK_LENGTH = 7;
	const TICK_TEXT_PADDING = 4;

	const NEEDLE_WIDTH = 3;
	const NEEDLE_LENGTH = SMALL_RADIUS * 2 - PADDING * 5;

	const NEEDLE_ANGLE_MIN = Math.PI * 0.2;
	const NEEDLE_ANGLE_MAX = Math.PI * -0.2;

	const OBS_CENTER_X = CENTER_X - LARGE_RADIUS * 0.80;
	const OBS_CENTER_Y = CENTER_Y + LARGE_RADIUS * 0.80;

	const OBS_CONTAINER_RADIUS = SIZE / 10;
	const OBS_SPACING = 5;
	const OBS_RADIUS = OBS_CONTAINER_RADIUS - OBS_SPACING;
	const OBS_FONT_SIZE = 10;
	const OBS_TEXT = "OBS";

	const OBS_TURN_AMOUNT = Math.PI / 30;
	const OBS_COMPASS_SCALE = 0.2;

	const NEEDLE_ANGLE_LIMIT = 45 * Math.PI / 180;

	self.x = x;
	self.y = y;

	self.to = false;
	self.from = false;

	self.needleAngle = 0;
	self.obsKnobRotation = 0;
	self.compassDialRotation = 0;

	self.draw = function(context) {
		// Draw container box
		context.fillStyle = '#FFF';
		context.strokeStyle = '#000';

		context.beginPath();
		context.arc(CENTER_X, CENTER_Y, CONTAINER_RADIUS, 0, Math.PI * 2, false);
		context.stroke();
		context.fill();

		// Draw large circles
		context.fillStyle = '#000';
		context.strokeStyle = '#FFF';

		context.beginPath();
		context.arc(CENTER_X, CENTER_Y, LARGE_RADIUS, 0, Math.PI * 2, false);
		context.stroke();
		context.fill();

		// Draw small circle
		context.beginPath();
		context.arc(CENTER_X, CENTER_Y, SMALL_RADIUS, 0, Math.PI * 2, false);
		context.stroke();

		// Draw center dot
		context.beginPath();
		context.arc(CENTER_X, CENTER_Y, CENTER_DOT_RADIUS, 0, Math.PI * 2, false);
		context.stroke();

		// Draw small dots
		context.beginPath();
		for (var i = 0; i < NUM_SMALL_DOTS; i++) {
			var x = CENTER_X + CENTER_DOT_RADIUS + (SMALL_DOT_RADIUS * 2 + SMALL_DOT_PADDING) * (i + 1);

			context.moveTo(x, CENTER_Y);
			context.arc(x, CENTER_Y, SMALL_DOT_RADIUS, 0, Math.PI * 2, false);
		}

		for (var i = 0; i < NUM_SMALL_DOTS; i++) {
			var x = CENTER_X - CENTER_DOT_RADIUS - (SMALL_DOT_RADIUS * 2 + SMALL_DOT_PADDING) * (i + 1);

			context.moveTo(x, CENTER_Y);
			context.arc(x, CENTER_Y, SMALL_DOT_RADIUS, 0, Math.PI * 2, false);
		}
		context.stroke();

		// Draw triangles
		context.fillStyle = '#FFF';
		const innerMarkX = CENTER_X + SMALL_RADIUS - TRIANGLE_X_OFFSET;
		
		// Draw TO triangle
		context.beginPath();

		context.moveTo(innerMarkX, CENTER_Y - TRIANGLE_PADDING);

		context.lineTo(innerMarkX - TRIANGLE_WIDTH, CENTER_Y - TRIANGLE_PADDING);

		context.lineTo(innerMarkX - TRIANGLE_WIDTH / 2, CENTER_Y - TRIANGLE_PADDING - TRIANGLE_HEIGHT);

		context.closePath();

		if (self.to) {
			context.fill();
		}
		context.stroke();

		// Draw FROM triangle
		context.beginPath();
		context.moveTo(innerMarkX, CENTER_Y + TRIANGLE_PADDING);

		context.lineTo(innerMarkX - TRIANGLE_WIDTH, CENTER_Y + TRIANGLE_PADDING);

		context.lineTo(innerMarkX - TRIANGLE_WIDTH / 2, CENTER_Y + TRIANGLE_PADDING + TRIANGLE_HEIGHT);

		context.closePath();

		if (self.from) {
			context.fill();
		}
		context.stroke();

		// Draw labels for triangles
		var textWidth;

		context.fillStyle = "#FFF";
		context.font = DIR_FONT_SIZE + "px Helvetica";

		textWidth = context.measureText(TO_TEXT).width;
		context.fillText(TO_TEXT, innerMarkX - TRIANGLE_WIDTH / 2 - textWidth / 2, CENTER_Y - TRIANGLE_PADDING - TRIANGLE_HEIGHT - TRIANGLE_PADDING / 2);

		textWidth = context.measureText(FROM_TEXT).width;
		context.fillText(FROM_TEXT, innerMarkX - TRIANGLE_WIDTH / 2 - textWidth / 2, CENTER_Y + TRIANGLE_PADDING + TRIANGLE_HEIGHT + TRIANGLE_PADDING / 2 + DIR_FONT_SIZE);

		// Draw compass dial
		// Draw tick marks
		context.save();
		context.translate(CENTER_X, CENTER_Y);
		context.rotate(self.compassDialRotation);

		// Major
		for (var i = 0; i < NUM_MAJOR_TICKS; i++) {
			if (i != 0) {
				context.rotate(Math.PI * 2 / NUM_MAJOR_TICKS);
			}

			context.moveTo(0, -SMALL_RADIUS);
			context.lineTo(0, -SMALL_RADIUS - MAJOR_TICK_LENGTH);
			context.stroke();

			var compassText = i * NUM_DEGREES / NUM_MAJOR_TICKS;
			compassText = compassText.toString().substr(0, 2);
			context.fillText(compassText, -context.measureText(compassText).width / 2, -SMALL_RADIUS - MAJOR_TICK_LENGTH - TICK_TEXT_PADDING);
		}

		// Minor
		for (var i = 0; i < NUM_MAJOR_TICKS * 4; i++) {
			if (i != 0) {
				context.rotate(Math.PI * 2 / (NUM_MAJOR_TICKS * 4));
			}

			if (i % (NUM_DEGREES / NUM_MAJOR_TICKS) == 0) {
				continue;
			}

			context.moveTo(0, -SMALL_RADIUS);
			context.lineTo(0, -SMALL_RADIUS - MAJOR_TICK_LENGTH / 3);
			context.stroke();
		}

		context.restore();

		// Draw needle
		context.save();
		context.translate(CENTER_X, CENTER_Y - SMALL_RADIUS);

		context.beginPath();
		context.arc(0, SMALL_RADIUS, SMALL_RADIUS, 0, Math.PI * 2, false);
		context.clip();

		context.beginPath();

		context.rotate(self.needleAngle);

		context.moveTo(0, 0);
		context.lineTo(0, NEEDLE_LENGTH);

		context.lineWidth = NEEDLE_WIDTH;

		context.shadowOffsetX = 5;
		context.shadowOffsetY = 5;
		context.shadowBlur = 30;
		context.shadowColor = 'rgba(255, 255, 255, 1)';

		context.stroke();

		context.restore();

		// Draw upper triangle
		context.save();
		context.beginPath();

		context.moveTo(CENTER_X, CENTER_Y - SMALL_RADIUS);
		context.lineTo(CENTER_X + INNER_MARK_LENGTH / 2, CENTER_Y - SMALL_RADIUS + INNER_MARK_LENGTH);
		context.lineTo(CENTER_X - INNER_MARK_LENGTH / 2, CENTER_Y - SMALL_RADIUS + INNER_MARK_LENGTH);

		context.shadowOffsetX = 0;
		context.shadowOffsetY = 5;
		context.shadowBlur = 12;
		context.shadowColor = 'rgba(0, 0, 0, 1)';

		context.closePath();
		context.fill();
		context.stroke();
		context.restore();

		// Draw OBS
		context.save();
		context.translate(OBS_CENTER_X, OBS_CENTER_Y);
		context.rotate(self.obsKnobRotation);

		context.beginPath();
		context.fillStyle = '#000';
		context.arc(0, 0, OBS_CONTAINER_RADIUS, 0, Math.PI * 2, false);
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 0;
		context.shadowBlur = 8;
		context.shadowColor = 'rgba(0, 0, 0, 0.2)';
		context.fill();

		context.beginPath();
		context.strokeStyle = '#FFF';
		context.lineWidth = PADDING;
		context.arc(0, 0, OBS_RADIUS, 0, Math.PI * 2, false);
		context.stroke();

		context.fillStyle = "#FFF";
		context.font = "bold " + OBS_FONT_SIZE + "px Helvetica";

		context.fillText(OBS_TEXT, -context.measureText(OBS_TEXT).width / 2, OBS_FONT_SIZE / 3);

		context.restore();
	}

	self.pointInOBSKnob = function(x, y) {
		return dist(x, y, OBS_CENTER_X, OBS_CENTER_Y) <= OBS_CONTAINER_RADIUS;
	}

	self.mouseTurnKnob = function(x) {
		if (x < OBS_CENTER_X) {
			// Turn knob to the left
			self.obsKnobRotation -= OBS_TURN_AMOUNT;
		} else {
			// Turn knob to the right
			self.obsKnobRotation += OBS_TURN_AMOUNT;
		}

		updateCompassDial()
	}

	self.setNeedleAngle = function(angle) {
		angle = Math.min(angle, NEEDLE_ANGLE_LIMIT);
		angle = Math.max(angle, -NEEDLE_ANGLE_LIMIT);

		self.needleAngle = map(angle, -NEEDLE_ANGLE_LIMIT, NEEDLE_ANGLE_LIMIT, NEEDLE_ANGLE_MIN, NEEDLE_ANGLE_MAX);
	}

	self.getConfinedCompassAngle = function() {
		var rotation = self.compassDialRotation;

		if (rotation > 0) {
			while (rotation > Math.PI * 2) {
				rotation -= Math.PI * 2;
			}

			return rotation;
		} else {
			while (rotation < Math.PI * -2) {
				rotation += Math.PI * 2;
			}

			return rotation;
		}
	}

	self.getPrimaryIndex = function() {
		var rotation = getConfinedCompassRotation();

		if (rotation > 0) {
			return map(rotation, 0, Math.PI * 2, 359, 0);
		} else {
			return map(rotation, Math.PI * -2, 0, 359, 0);
		}
	}

	function updateCompassDial() {
		self.compassDialRotation = self.obsKnobRotation * OBS_COMPASS_SCALE;
	}

	function dist(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	}

	function map(input, inputMin, inputMax, outputMin, outputMax) {
		var inputSpan = inputMax - inputMin;
		var outputSpan = outputMax - outputMin;

		var inputScaled = (input - inputMin) / inputSpan;

		return outputMin + (inputScaled * outputSpan);
	}

	return self;
});