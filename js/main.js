document.addEventListener('turbolinks:load', function() {
	// - - - SETTINGS POPUP - - - //
	let settingsLink = document.getElementById('settings-link');
	let bubble = document.querySelector('.bubble');

	function showPopup() {
		bubble.classList.add('show-popup');
		animatePopupIn();
	};

	function hidePopup() {
		bubble.classList.remove('show-popup');
		animatePopupOut();
	};

	if (settingsLink) {
		settingsLink.addEventListener('mouseenter', showPopup);
		settingsLink.addEventListener('mouseleave', hidePopup);
	}

	// Implement option selection and changing colors & backgrounds
	let white = document.getElementById('white');
	let grey = document.getElementById('grey');
	let black = document.getElementById('black');
	let page = document.querySelector('.overview-page');
	let changingText = document.querySelectorAll('.series-title, .link, .about-page div p, .about-page div a');
	let aboutPage = document.querySelector('.about-page');
	let aboutTitle = document.querySelector('.about-title');

	function handleOption(currentOption, otherOptions, bgColor, textColor, bubbleBg, aboutHeadline, aboutBackColor) {
		// Highlight current option
		currentOption.classList.add('selected-option');

		// Deselect remaining two options
		otherOptions.forEach(function(option) {
			option.classList.remove('selected-option');
		})

		// Change color and background of elements
		page.classList.remove('white-bg', 'grey-bg', 'black-bg');
		page.classList.add(`${bgColor}`);

		// Adjust text colors
		changingText.forEach(function(text) {
			text.classList.remove('white-text')
			text.classList.add(`${textColor}`);
		})

		// Adjust popup background
		bubble.classList.remove('black-bubble', 'grey-bubble');
		bubble.classList.add(`${bubbleBg}`)

		//Adjust about-page background
		aboutPage.classList.remove('black-bg', 'grey-bg', 'white-bg');
		aboutPage.classList.add(`${bgColor}`);

		// Adjust about-title color
		aboutTitle.classList.remove('black-about-title', 'grey-about-title')
		aboutTitle.classList.add(`${aboutHeadline}`);

		// Adjust aboutBackBtn color
		aboutBackBtn.classList.remove('black-about-back', 'grey-about-back');
		aboutBackBtn.classList.add(`${aboutBackColor}`);

		// Adjust selectedOption border-color
		aboutBackBtn.classList.remove('black-about-back', 'grey-about-back');
		aboutBackBtn.classList.add(`${aboutBackColor}`);
	};

	if (white, grey, black) {
		// Do we need all the parameters? -> white is default
		white.addEventListener('click', function() {
			handleOption(white, [grey, black], 'white-bg',  'black-text', 'white-bubble', 'white-about-title');
		});

		black.addEventListener('click', function() {
			handleOption(black, [white, grey], 'black-bg', 'white-text', 'black-bubble', 'black-about-title', 'black-about-back');
		});

		grey.addEventListener('click', function() {
			handleOption(grey , [white, black], 'grey-bg', 'white-text', 'grey-bubble', 'grey-about-title', 'grey-about-back');
		});
	}

	// - - - HIDE/SHOW ABOUT PAGE - - - //
	let aboutLink = document.getElementById('about-link');
	let aboutBackBtn = document.querySelector('.about-back');
	let seriesCovers = document.querySelectorAll('.series-wrapper img')

	function showAbout() {
		animateOverviewSmall(page, aboutBackBtn, seriesCovers, aboutLink);

		seriesCovers.forEach(function(cover) {
			cover.classList.add('darken-covers');
		})

		page.classList.add('disable-interaction');
		aboutBackBtn.classList.add('enable-interaction');
	}

	function hideAbout() {
		animateOverviewLarge(page, aboutBackBtn, seriesCovers, aboutLink);

		setTimeout(function () {
			seriesCovers.forEach(function(cover) {
				cover.classList.remove('darken-covers');
			})
		}, 800);

		page.classList.remove('disable-interaction');
		aboutBackBtn.classList.remove('enable-interaction');
	}

	if (aboutLink, aboutBackBtn) {
		aboutLink.addEventListener('click', showAbout);
		aboutBackBtn.addEventListener('click', hideAbout);
	}

	// - - - INITIAL OVERVIEW AND SERIES LOAD ANIMATION - - - //
	overviewLoadAnimation(aboutLink, settingsLink);
	seriesLoadAnimation();

	//- - - SHOW METADATA ON HOVER - - - //
	let imageWrappers = document.querySelectorAll('.image-wrapper');

	if (imageWrappers) {
		imageWrappers.forEach(function(imageWrapper) {
				let image = imageWrapper.querySelector('img');

			image.addEventListener('mouseenter', () => {
				showMetaAnimation(imageWrapper, image);
			});

			image.addEventListener('mouseleave', () => {
				hideMetaAnimation(imageWrapper, image);
			});
		})
	}

	let series = document.querySelectorAll('.series-wrapper')

	series.addEventListener('click', function() {
		anime({
			targets: 'body',
			opacity: 0,
		})
	})

	//- - - Turbolinks - - - //
		// let header = document.querySelector('.header-wrapper');
		// let content = document.querySelector('.content-wrapper');
		//
		// seriesLoadAnimation(header, content);
	// let series = document.querySelectorAll('.series-wrapper')
	//
	// series.addEventListener('turbolinks:click', (event) => {
	// 	let header = document.querySelector('.header-wrapper');
	// 	let content = document.querySelector('.content-wrapper');
	//
	// 	anime({
	// 		targets: [header, content],
	// 		opacity: [0, 1],
	// 		duration: 3000,
	// 	})
	// });
});
