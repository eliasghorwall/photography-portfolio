// TODO: What if TL does not work?
document.addEventListener('turbolinks:load', function() {
	// - - - SETTINGS POPUP - - - //
	// FIXME: Always use querySelecto(All), unifies things and makes them easier to refactor.
	// Use shorthands for qS and qSA:
	let $ = document.querySelectorAll.bind(document);
	let $1 = document.querySelector.bind(document);

	let settingsLink = $1('#settings-link');
	let bubble = $1('.bubble');

	function showPopup() {
		bubble.classList.add('show-popup');
		animatePopupIn();
	};

	function hidePopup() {
		bubble.classList.remove('show-popup');
		animatePopupOut();
	};


	// Not necessary in this case, event handler is only attached once
	//
	// Idempotent version, as recommended by TL
	// function attachSettingsHandlers() {
	// 	let settingsLink = document.getElementById('settings-link');
	//
	// 	if (!settingsLink.dataset.initialized) {
	// 		settingsLink.addEventListener('mouseenter', showPopup);
	// 		settingsLink.addEventListener('mouseleave', hidePopup);
	// 		settingsLink.dataset.initialized = true;
	// 	}
	// }

	if (settingsLink) {
		settingsLink.addEventListener('mouseenter', showPopup);
		settingsLink.addEventListener('mouseleave', hidePopup);
	}

	// Implement option selection and changing colors & backgrounds
	let white = $1('#white');
	let grey = $1('#grey');
	let black = $1('#black');
	let page = $1('.overview-page');
	let changingText = $('.series-title, .link, .about-page div p, .about-page div a');
	let aboutPage = $1('.about-page');
	let aboutTitle = $1('.about-title');
	let descTexts = $('.series-meta, .series-desc')

	// TODO: More descriptive name
	function changeColorTheme(currentOption, otherOptions, bgColor, textColor, bubbleBg, aboutHeadline, aboutBackColor, greyDescColor) {
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
		changingText.forEach((text) => {
			text.classList.remove('white-text')
			text.classList.add(textColor);
		})

		changingText.forEach((text) => {
			text.classList.remove('white-text')
			text.classList.add(textColor);
		})

		// Adjust popup background
		bubble.classList.remove('black-bubble', 'grey-bubble');
		bubble.classList.add(bubbleBg) // FIXME Don't need to use template strings.

		//Adjust about-page background
		aboutPage.classList.remove('black-bg', 'grey-bg', 'white-bg');
		aboutPage.classList.add(bgColor);

		// Adjust about-title color
		aboutTitle.classList.remove('black-about-title', 'grey-about-title')
		aboutTitle.classList.add(aboutHeadline);

		// Adjust aboutBackBtn color
		aboutBackBtn.classList.remove('black-about-back', 'grey-about-back');
		aboutBackBtn.classList.add(aboutBackColor);

		// Adjust selectedOption border-color
		aboutBackBtn.classList.remove('black-about-back', 'grey-about-back');
		aboutBackBtn.classList.add(aboutBackColor);

		// Adjust grey desc colors
		console.log(page.className);

		// FIXME: Always use strict comparison ===
		if (page.className == 'overview-page grey-bg') {
			// FIXME: Use shorthand syntax
			descTexts.forEach((descText) => {
				descText.classList.add(greyDescColor);
			})
		} else {
			descTexts.forEach((descText) => {
				descText.classList.remove(greyDescColor);
			})
		}
	};

	//Not sure if checking for existence of multiple items this way is valid, wrote it intuitively. Could not find anything online.
	if (white, grey, black) {
		white.addEventListener('click', () => {
			changeColorTheme(white, [grey, black], 'white-bg',  'black-text', 'white-bubble', 'white-about-title');
		});

		black.addEventListener('click', () => {
			changeColorTheme(black, [white, grey], 'black-bg', 'white-text', 'black-bubble', 'black-about-title', 'black-about-back');
		});

		grey.addEventListener('click', () => {
			changeColorTheme(grey , [white, black], 'grey-bg', 'white-text', 'grey-bubble', 'grey-about-title', 'grey-about-back', 'grey-desc-color');
		});
	}

	// - - - HIDE/SHOW ABOUT PAGE - - - //
	let aboutLink = $1('#about-link');
	let aboutBackBtn = $1('.about-back');
	let seriesCovers = $('.series-wrapper img');
	let texts = $('.series-title, .series-meta, .series-desc');

	function showAboutPage() {
		animateOverviewSmall(page, aboutBackBtn, seriesCovers, aboutLink);

		seriesCovers.forEach((cover) => {
			cover.classList.add('darken-covers');
		})

		page.classList.add('disable-interaction');
		aboutBackBtn.classList.add('enable-interaction');

		let aboutPageClass = aboutPage.className;
		console.log(aboutPageClass);

		if (aboutPageClass == 'about-page white-bg') {
			texts.forEach((text) => {
				text.classList.add('white-darker-text')
			})
		} else if (aboutPageClass == 'about-page black-bg'){
			texts.forEach((text) => {
				text.classList.add('black-darker-text')
			})
		} else {
			texts.forEach((text) => {
				text.classList.add('grey-darker-text')
			})
		}
	}

	function hideAboutPage() {
		animateOverviewLarge(page, aboutBackBtn, seriesCovers, aboutLink);

		setTimeout(() => {
			seriesCovers.forEach((cover) => {
				cover.classList.remove('darken-covers');
			})
		}, 800);

		page.classList.remove('disable-interaction');
		aboutBackBtn.classList.remove('enable-interaction');

		let aboutPageClass = aboutPage.className;
		console.log(aboutPageClass);

		texts.forEach((text) => {
			text.classList.remove('white-darker-text');
			text.classList.remove('black-darker-text');
			text.classList.remove('grey-darker-text');
		})
	}

	if (aboutLink, aboutBackBtn) {
		aboutLink.addEventListener('click', showAboutPage);
		aboutBackBtn.addEventListener('click', hideAboutPage);
	}

	// - - - INITIAL OVERVIEW AND SERIES LOAD ANIMATION - - - //
	overviewLoadAnimation(aboutLink, settingsLink);
	seriesLoadAnimation();

	//- - - SHOW METADATA ON HOVER - - - //
	let imageWrappers = $('.image-wrapper');

	if (imageWrappers) {
		imageWrappers.forEach((imageWrapper) => {
				let image = imageWrapper.querySelector('img');

			image.addEventListener('mouseenter', () => {
				showMetaAnimation(imageWrapper, image);
			});

			image.addEventListener('mouseleave', () => {
				hideMetaAnimation(imageWrapper, image);
			});
		})
	}

	// let series = $('.series-wrapper')
	//
	// series.addEventListener('click', function() {
	// 	anime({
	// 		targets: 'body',
	// 		opacity: 0,
	// 	})
	// })

	//- - - Turbolinks - - - //
		// let header = $1('.header-wrapper');
		// let content = $1('.content-wrapper');
		//
		// seriesLoadAnimation(header, content);
	// let series = $('.series-wrapper')
	//
	// series.addEventListener('turbolinks:click', (event) => {
	// 	let header = $1('.header-wrapper');
	// 	let content = $1('.content-wrapper');
	//
	// 	anime({
	// 		targets: [header, content],
	// 		opacity: [0, 1],
	// 		duration: 3000,
	// 	})
	// });

	// aboutLink.addEventListener('click', (ev) {
	// 	ev.preventDefault();
	//
	// 	// fetch and insert html
	// 	// show animation
	// })
	//
	// let p = fetch(`http://${window.location.hostname}/about.html`);
	// p.then(function(res) => {
	// 	// Parse HTML from response.
	// 	console.log(res);
	// 	let html = res.xxxxx;
	//
	// 	// Filter HTML so you get just the contents of body
	// 	let about = html.querySelector('body')
	//
	// 	$1('.about-page').innerHTML = about;
	// })
});
