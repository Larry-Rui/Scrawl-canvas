var mycode = function() {
	'use strict';
	//hide-start
	var testTicker = Date.now(),
		testTime = testTicker,
		testNow,
		testMessage = document.getElementById('testmessage');
	//hide-end

	//define variables
	var pad = scrawl.pad.mycanvas,
		bubbles,
		bar,
		hits,
		hitbubbles,
		color,
		i, iz;

	//define bar entity
	scrawl.makeGroup({
		name: 'bargroup',
		order: 1
	});
	bar = scrawl.makeLine({
		startX: 50,
		endX: 150,
		startY: 200,
		endY: 200,
		collisionPoints: 10,
		lineWidth: 4,
		group: 'bargroup'
	});

	//define bubble entitys
	bubbles = scrawl.makeGroup({
		name: 'bubbles',
		entitySort: false
	});
	hitbubbles = scrawl.makeGroup({
		name: 'hitbubbles'
	});
	color = scrawl.makeColor({
		rMax: 200,
		gMax: 200,
		bMax: 200,
		aMax: 1,
		aMin: 1
	});
	for (i = 0; i < 40; i++) {
		scrawl.makeWheel({
			radius: Math.ceil(Math.random() * 40) + 5,
			startX: Math.ceil((Math.random() * 100) + 150),
			startY: Math.ceil((Math.random() * 100) + 150),
			handleX: Math.ceil((Math.random() * 300) - 150),
			handleY: Math.ceil((Math.random() * 300) - 150),
			globalAlpha: 0.4,
			group: 'bubbles',
			fillStyle: color.get('random')
		});
	}

	//stop touchmove dragging the page up/down
	scrawl.addListener('move', function(e) {
		if (e) {
			e.stopPropagation();
			e.preventDefault();
		}
	}, scrawl.canvas.mycanvas);

	//animation object
	scrawl.makeAnimation({
		fn: function() {
			hitbubbles.setEntitysTo({
				globalAlpha: 0.4
			});
			hitbubbles.entitys.length = 0;
			hits = bubbles.getEntitysCollidingWith(bar);
			hitbubbles.addEntitysToGroup(hits);
			hits = bubbles.getAllEntitysAt(pad.getMouse());
			hitbubbles.addEntitysToGroup(hits);
			hitbubbles.setEntitysTo({
				globalAlpha: 0.8
			});
			bubbles.updateEntitysBy({
				roll: 0.5
			});
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
	extensions: ['path', 'factories', 'collisions', 'animation', 'wheel', 'color'],
	callback: function() {
		window.addEventListener('load', function() {
			scrawl.init();
			mycode();
		}, false);
	},
});
