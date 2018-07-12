document.addEventListener('DOMContentLoaded', function() {
	// - - - SETTINGS POPUP - - - //
	let settingsLink = document.getElementById('settings-link');
	let bubble = document.querySelector('.bubble');

	function showPopup() {
		bubble.classList.add('show-popup');

		anime({
			targets: '.bubble',
			easing: 'easeOutExpo',
			translateX: [10, 0],
			opacity: [0, 1],
			duration: 500,
		})
	};

	function hidePopup() {
		bubble.classList.remove('show-popup');

		anime({
			targets: '.bubble',
			easing: 'easeOutExpo',
			translateX: [0, -10],
			opacity: [1, 0],
			duration: 500,
		})
	};

	if (settingsLink) {
		settingsLink.addEventListener('mouseenter', showPopup);
		settingsLink.addEventListener('mouseleave', hidePopup);
	}

	// Implement option selection and changing background
	let white = document.getElementById('white');
	let grey = document.getElementById('grey');
	let black = document.getElementById('black');
	let page = document.querySelector('.overview-page');

	function handleOption(currentOption, otherOptions, bgClass) {
		// Highlight current option
		currentOption.classList.add('selected-option');

		// Deselect remaining two options
		otherOptions.forEach(function(option) {
			option.classList.remove('selected-option');
		})

		// Change page background
		page.classList.remove('white-bg', 'grey-bg', 'black-bg');
		page.classList.add(`${bgClass}`);
	};

	if (white, grey, black) {
		white.addEventListener('click', function() {
			handleOption(white, [grey, black], 'white-bg');
		});

		grey.addEventListener('click', function() {
			handleOption(grey , [white, black], 'black-bg');
		});

		black.addEventListener('click', function() {
			handleOption(black, [white, grey], 'grey-bg');
		});
	}

	// - - - HIDE/SHOW ABOUT PAGE - - - //
	let aboutLink = document.getElementById('about-link');
	let aboutBackBtn = document.getElementById('about-back-btn');
	let seriesCovers = document.querySelectorAll('.series-wrapper img')

	function showAbout() {
		anime({
			targets: page,
			translateX: 360,
			translateY: 175,
			scale: 0.8,
			easing: 'easeOutExpo',
		})

		// Show about-back button
		anime({
			targets: aboutBackBtn,
			easing: 'easeOutExpo',
			opacity: 1,
			width: [0, 105],
			delay: 600,
			duration: 700,
		})

		anime({
			targets: seriesCovers,
			easing: 'easeOutExpo',
			opacity: 0.7,
		})

		anime({
			targets: aboutLink,
			easing: 'easeOutExpo',
			opacity: 0,
			translateX: 100,
		})

		seriesCovers.forEach(function(cover) {
			cover.classList.add('darken-covers');
		})
	}

	function hideAbout() {
		anime({
			targets: page,
			translateX: 0,
			translateY: 0,
			scale: 1,
			easing: 'easeOutExpo',
			delay: 400,
		})

		anime({
			targets: seriesCovers,
			easing: 'easeOutExpo',
			opacity: 1,
			duration: 2000,
			delay: 600,
		})

		anime({
			targets: aboutLink,
			easing: 'easeOutExpo',
			opacity: 1,
			translateX: 0,
		})

		// Hide about-back button
		anime({
			targets: aboutBackBtn,
			opacity: 0,
			duration: 500,
			width: 0,
			easing: 'easeOutExpo',
		})

		setTimeout(function () {
			seriesCovers.forEach(function(cover) {
				cover.classList.remove('darken-covers');
			})
		}, 800);
	}

	if (aboutLink, aboutBackBtn) {
		aboutLink.addEventListener('click', showAbout);
		aboutBackBtn.addEventListener('click', hideAbout);
	}

	// - - - INITIAL PAGE LOAD ANIMATION - - - //
	anime({
		targets: aboutLink,
		translateX: [-500, 0],
		easing: 'easeOutExpo',
		delay: 300,
	})

	anime({
		targets: settingsLink,
		translateX: [500, 0],
		easing: 'easeOutExpo',
		delay: 300,
	})

	anime({
		targets: '.series-wrapper img, .series-wrapper div, .series-wrapper p',
		translateY: [-150, 0],
		opacity: [0,1],
		easing: 'easeOutExpo',
		delay: function(el, i, l) {
			return 1000 + 100 * i
		},
		duration: 1200,
	})

	//- - - SHOW METADATA ON HOVER - - - //
	let images = document.querySelectorAll('.image img');
	let meta = document.querySelectorAll('.meta-wrapper')

	function showMeta() {
		anime({
			targets: meta,
			translateX: [-176, 0],
			opacity: 1,
			easing: 'easeOutExpo',
		})
	}

	function hideMeta() {
		anime({
			targets: meta,
			translateX: -176,
			delay: 500,
			opacity: 0,
			easing: 'easeOutExpo',
		})
	}

	if (images) {
		images.forEach(function(image) {
			image.addEventListener('mouseenter', showMeta);
			image.addEventListener('mouseleave', hideMeta);
		})
	}
});
