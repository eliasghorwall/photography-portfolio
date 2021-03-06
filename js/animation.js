function animatePopupIn() {
	anime({
		targets: '.bubble',
		easing: 'easeOutExpo',
		translateX: [20, 0],
		opacity: [0, 1],
		duration: 800,
	})
}

function animatePopupOut() {
	anime({
		targets: '.bubble',
		easing: 'easeInExpo',
		translateX: [0, -20],
		opacity: [1, 0],
		duration: 700,
	})
}

function animateOverviewSmall(page, aboutBackBtn, seriesCovers, aboutLink) {
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
}


function animateOverviewLarge(page, aboutBackBtn, seriesCovers, aboutLink) {
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
}

function overviewLoadAnimation(aboutLink, settingsLink) {
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
		targets: '.series-wrapper img, .overview-title-wrapper, .series-wrapper p',
		translateY: [-120, 0],
		opacity: [0, 1],
		easing: 'easeOutExpo',
		delay: (el, i, l) => 1100 + 120 * i,
		duration: 1000,
	})
}

function seriesLoadAnimation() {
	anime({
		targets: ['.series-title-series', '.series-meta-series' ,'.series-desc-series'],
		translateX: [200, 0],
		opacity: [0,1],
		easing: 'easeOutExpo',
		delay: (el, i) => 600 + 200 * i,
	})

	anime({
		targets: '.series-back-link',
		opacity: [0,1],
		delay: 600,
		duration: 2000,
		easing: 'easeOutExpo',
	})

	anime({
		targets: '.image',
		translateX: [-500, 0],
		opacity: [0,1],
		easing: 'easeOutExpo',
		delay: (el, i) =>  1200 + 1000 * i,
	})
}

function showMetaAnimation(imageWrapper) {
	let metaTarget = imageWrapper.querySelectorAll('.meta');

	anime.remove(metaTarget);

	anime({
		targets: metaTarget,
		translateX: 200,
		opacity: 1,
		easing: 'easeOutExpo',
		delay: (el, i, l) => 25 * i,
		duration: 950,
	})
}

function hideMetaAnimation(imageWrapper) {
	let metaTarget = imageWrapper.querySelectorAll('.meta');

	anime.remove(metaTarget);

	anime({
		targets: metaTarget,
		translateX: 0,
		opacity: 0,
		easing: 'easeOutExpo',
		delay: (el, i, l) => 25 * i,
	})
}

function aboutHover() {
	anime.timeline()
	 .add({
		 targets: '.letter',
		 translateX: [0,-30],
		 opacity: [1,0],
		 easing: "easeInExpo",
		 duration: 500,
		 delay: (el, i) => 30 * i,
	 })
	 .add({
		 targets: '.letter',
		 translateX: [40,0],
		 opacity: [0,1],
		 easing: "easeOutExpo",
		 duration: 1100,
		 delay: (el, i) => 30 * i,
	 })
}

function revealerToRight() {
	anime.timeline({
		easing: 'easeOutExpo',
		targets: '.revealer',
	})
		.add({
			left: 0,
			duration: 700,
		})
}

function revealerToLeft() {
	anime.timeline({
		easing: 'easeOutExpo',
		targets: '.revealer',
	})
		.add({
			left: ['100vw', 0],
			duration: 700,
		})
}

function animateAboutPage() {
	anime({
		targets: '.about-title',
		opacity: 1,
		translateX: [500, 0],
		easing: 'easeOutExpo',
		duration: 1500,
	})
}
