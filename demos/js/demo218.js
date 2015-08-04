var mycode = function() {
	'use strict';
	//hide-start
	var testTicker = Date.now(),
		testTime = testTicker,
		testNow,
		testMessage = document.getElementById('testmessage');
	//hide-end

	//define variables
	var events,
		stopE,
		here;

	// import images
	scrawl.getImagesByClass('demo218');

	//style the stack
	scrawl.stack.mystack.set({
		width: 600,
		height: 400,
		perspectiveZ: 1000,
		border: '1px solid red'
	});
	scrawl.pad.mystack_canvas.set({
		translateZ: -1,
		border: '0'
	});

	//style the stack elements - Scrawl does not include an internal method of cloning DOM elements
	scrawl.element.mydiv1.set({
		startX: 50,
		startY: 50,
		width: 250,
		height: 175,
		pitch: 20,
		yaw: 30,
		includeCornerTrackers: true
	});
	scrawl.element.mydiv2.set({
		startX: 350,
		startY: 50,
		width: 250,
		height: 175,
		pitch: 20,
		yaw: 30,
		includeCornerTrackers: true
	});

	//build entitys
	scrawl.makeFrame({
		name: 'lockedSwan',
		lockFrameTo: 'mydiv1',
		source: 'swan'
	}).clone({
		lockFrameTo: 'mydiv2',
	});

	scrawl.makeFrame({
		name: 'staticSwan',
		cornersData: [50, 250, 250, 250, 200, 350, 100, 350],
		source: 'swan'
	}).clone({
		cornersData: [350, 250, 550, 250, 500, 350, 400, 350]
	});

	//animation object
	scrawl.makeAnimation({
		fn: function() {

			scrawl.render();

			//hide-start
			testNow = Date.now();
			testTime = testNow - testTicker;
			testTicker = testNow;
			testMessage.innerHTML = 'Milliseconds per screen refresh: ' + Math.ceil(testTime) + '; fps: ' + Math.floor(1000 / testTime);
			//hide-end
		},
	});
};

scrawl.loadExtensions({
	path: '../source/',
	minified: false,
	extensions: ['stacks', 'frame', 'images'],
	callback: function() {
		window.addEventListener('load', function() {
			scrawl.init();
			mycode();
		}, false);
	},
});
