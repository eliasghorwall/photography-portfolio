// TODO: What if TL does not work? + Add cookies to change about and series themes
document.addEventListener('turbolinks:load', function() 	{
	//Set up selector shorthands
	let $ = document.querySelectorAll.bind(document);
	let $1 = document.querySelector.bind(document);

	// - - - SETTINGS POPUP - - - //
	let settingsLink = $1('#settings-link');
	let bubble = $1('.bubble');

	if (settingsLink) {
		settingsLink.addEventListener('mouseenter', () => {
			bubble.classList.add('show-popup');
			animatePopupIn();
		});

		settingsLink.addEventListener('mouseleave', () => {
			bubble.classList.remove('show-popup');
			animatePopupOut();
		});
	}

	// Implement option selection and changing themes
	let white = $1('#white');
	let grey = $1('#grey');
	let black = $1('#black');
	let page = $1('.overview-page');
	let changingTexts = $('.series-title, .link, .link span');
	let aboutPage = $1('.about-page');
	let aboutTitle = $1('.about-title');
	let descTexts = $('.series-meta, .series-desc');

	function changeColorTheme(currentOption, otherOptions, bgColor, textColor, bubbleBg, aboutHeadline, aboutBackColor) {
		// Highlight current option with correct border color
		if (currentOption === black) {
			currentOption.classList.add('selected-option-black');
		} else if (currentOption === grey) {
			currentOption.classList.add('selected-option-grey');
		} else {
			currentOption.classList.add('selected-option-white');
		}

		// Deselect remaining options
		otherOptions.forEach(function(option) {
			option.classList.remove('selected-option-black', 'selected-option-grey', 'selected-option-white');
		})

		if (page, changingTexts, bubble, aboutPage, aboutTitle, aboutBackBtn) {
			// Change color and background of elements
			page.classList.remove('white-bg', 'grey-bg', 'black-bg');
			page.classList.add(bgColor);

			// Adjust text colors
			changingTexts.forEach((text) => {
				text.classList.remove('white-text')
				text.classList.add(textColor);
			})

			// Adjust popup background
			bubble.classList.remove('black-bubble', 'grey-bubble');
			bubble.classList.add(bubbleBg)

			//Adjust about-page background
			aboutPage.classList.remove('black-bg', 'grey-bg', 'white-bg');
			aboutPage.classList.add(bgColor);

			// Adjust grey description colors
			if (page.className === 'overview-page grey-bg') {
				descTexts.forEach((descText) => {
					descText.classList.add('grey-desc-color');
				})
			} else {
				descTexts.forEach((descText) => {
					descText.classList.remove('grey-desc-color');
				})
			}
		}
	};

	// Calling changeColorTheme() with correct classes
	if (white, grey, black) {
		[white, grey, black].forEach((theme) => {
			theme.addEventListener('click', () => {
				if (theme === white) {
					changeColorTheme(white, [grey, black], 'white-bg',  'black-text', 'white-bubble', 'white-about-title');
				} else if (theme === grey){
					changeColorTheme(grey , [white, black], 'grey-bg', 'white-text', 'grey-bubble', 'grey-about-title', 'grey-about-back');
				} else {
					changeColorTheme(black, [white, grey], 'black-bg', 'white-text', 'black-bubble', 'black-about-title', 'black-about-back');
				}
			});
		})
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

		if (aboutPage.className === 'about-page white-bg') {
			texts.forEach((text) => {
				text.classList.add('white-darker-text')
			})
		} else if (aboutPageClass === 'about-page black-bg'){
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

		texts.forEach((text) => {
			text.classList.remove('white-darker-text', 'black-darker-text', 'grey-darker-text');
		})
	}

	if (aboutLink, aboutBackBtn) {
		aboutLink.addEventListener('click', showAboutPage);
		aboutLink.addEventListener('mouseenter', aboutHover);
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

			setTimeout(function () {
				image.addEventListener('mouseenter', () => {
					showMetaAnimation(imageWrapper);
				})

				image.addEventListener('mouseleave', () => {
					hideMetaAnimation(imageWrapper);
				})
			}, 1000);
		})
	}

	//- - - USING FETCH API TO LOAD ABOUT PAGE - - - //
	if (aboutLink) {
		aboutLink.addEventListener('mouseenter', function(e) {
			e.preventDefault();

			let baseURL = `${window.location.protocol}//${window.location.hostname}`;

			if (window.location.port) {
				baseURL += `:${window.location.port}`;
			}

			fetch(`${baseURL}/about.html`)
				.then(function(response) {
					return response.text()
				})
				.then(function(html) {
					let doc = new DOMParser().parseFromString(html, "text/html");

					// Keep fetch from loading the page multiple times when its already loaded
					let testElement = $1('.about-title');
					if (!testElement) {
						aboutPage.appendChild(doc.querySelector('.about-page div'));
					}
				})
		})
	}

	//- - - PAGE FADE OUT WHEN SERIES CLICKED - - - //
	let seriesWrappers = $('.series-wrapper');
	let seriesBackBtn = $('.series-back-link');

	seriesBackBtn.forEach((btn) => {
		btn.addEventListener('click', () => {
			console.log('backbackback');
			revealerToLeft();
		})
	})

	seriesWrappers.forEach((wrapper) => {
		wrapper.addEventListener('click', () => {
			revealerToRight();
		})
	})
});
