// оптимизация загрузки
var myScroll;
function loaded() {
	myScroll = new IScroll('.main', {
		disablePointer: true,
		disableMouse: true,
	});
}

// burger
let burger = document.querySelector('.hero__burger');
let nav = document.querySelector('.nav');
let header = document.querySelector('header');
if (nav) {
	var navClose = nav.querySelector('.nav__close');
	var navBg = nav.querySelector('.nav__bg');
}

function closeMenu() {
	nav.classList.remove('nav--active');
	document.body.classList.remove('lock');
}

if (burger) {
	burger.addEventListener('click', function () {
		if (window.innerWidth > 768) {
			nav.classList.add('nav--active');
			document.body.classList.add('lock');
		} else {
			nav.classList.toggle('nav--active');
			document.body.classList.toggle('lock');
			header.classList.toggle('header--active')
		}

		let links = nav.querySelectorAll('.nav__link');
		links.forEach(function (link) {
			link.addEventListener('click', function () {
				closeMenu();
				header.classList.remove('header--active');
			})
		})

		if (window.innerWidth < 768 && !header.classList.contains('header--fixed')) {
			burger.classList.toggle('burger--fixed');
		}
	})

	navClose.addEventListener('click', closeMenu)
	navBg.addEventListener('click', closeMenu)
}

// прилипание шапки
window.addEventListener('scroll', function () {
	if (window.pageYOffset > 20) {
		header.classList.add('header--fixed');
	} else {
		header.classList.remove('header--fixed');
	}
});

// popup
let requestPopup = document.querySelector('.popup-request');
let openRequestPopup = document.querySelectorAll('.callback-popup');

let mapPopup = document.querySelector('.popup-map');
let openMapPopup = document.querySelector('.header__address-link');

let confPopup = document.querySelector('.popup-conf');
let openConfPopup = document.querySelectorAll('.conf');

// открытие формы звонка
openRequestPopup.forEach(function (item) {
	item.addEventListener('click', function () {
		requestPopup.classList.add('active');
		document.body.classList.add('lock');
	});
})

// открытие popup-карты
openMapPopup.addEventListener('click', function () {
	mapPopup.classList.add('active');
	document.body.classList.add('lock');
});

// открытие popup-политики конф
openConfPopup.forEach(function (item) {
	item.addEventListener('click', function () {
		confPopup.classList.add('active');
		document.body.classList.add('lock');
	});
})

// закрытие popup
let popups = document.querySelectorAll('.popup');
popups.forEach(function (popup) {
	let close = popup.querySelector(".popup__close");
	let bg = popup.querySelector(".popup__bg");

	close.addEventListener('click', function () {
		popup.classList.remove('active');
		document.body.classList.remove('lock');
	})
	bg.addEventListener('click', function () {
		popup.classList.remove('active');
		document.body.classList.remove('lock');
	})
})

// checkbox 
let checkbox = document.querySelectorAll('.agree__checkbox');
checkbox.forEach(function (item) {
	let mainBtn = item.closest('form').querySelector('.main-btn');
	item.classList.add('check');

	item.addEventListener('click', function () {
		item.classList.toggle('check');
		if (!item.classList.contains('check')) {
			mainBtn.setAttribute('disabled', 'disabled');
		} else {
			mainBtn.removeAttribute('disabled', 'disabled');
		}
		mainBtn.classList.toggle('disabled');
	})
})

// кнопка наверх
let heightOfHero = document.querySelector('.hero').offsetHeight;
let btnUp = document.querySelector('.btn-top');
window.addEventListener('scroll', function () {
	if (window.pageYOffset > heightOfHero - 400) {
		btnUp.classList.add('active')
	} else {
		btnUp.classList.remove('active')
	}
});
if (btnUp) {
	btnUp.addEventListener('click', function () {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	})
}

// select
let select = document.querySelectorAll('select');
select.forEach(function (item) {
	if (item) {
		customSelect(item);
	}
})

// select с соцсетями
let selectSocial = document.querySelectorAll('.select-social');
selectSocial.forEach(function (selectWrap) {
	let select = selectWrap.querySelector('select');
	let selectImg = selectWrap.querySelector('.select-social__img');

	select.addEventListener('click', function () {
		selectImg.classList.toggle('active');
	})

	select.addEventListener('change', function () {
		let socialItem = selectImg.querySelectorAll('.social__item');
		socialItem.forEach((item) => {
			item.classList.remove('active');
		})
		if (select.value == "WhatsApp") {
			selectImg.querySelector('.social__item-whatsapp').classList.add('active');
		}
		if (select.value == "Telegram") {
			selectImg.querySelector('.social__item-telegram').classList.add('active');
		}
	});
})

// маска на телефон
$("input[type='tel']").mask('+7(999)999-99-99');
jQuery.validator.addMethod("checkMaskPhone", function (value, element) {
	return /\+\d{1}\(\d{3}\)\d{3}-\d{2}-\d{2}/g.test(value);
});

// валидация формы
$('[data-form-validate-js]').each(function () {
	var form = $(this);

	form.validate({
		errorClass: "validate_error",
		rules: {
			phone: {
				required: true,
				checkMaskPhone: true,
			}
		},
		errorPlacement: function (error, element) { },
		submitHandler: function () {
			var data = form.serialize();
			var action = form.attr('action');
			var method = form.attr('method');

			$.ajax({
				type: method,
				url: action,
				data: data,
				success: function (response) {
					window.location.href = "thanks.html";
				},
				error: function (response) {
					window.location.href = "404.html";
				},
			});
		},
	});
});

$('[data-download-form-js]').each(function () {
	var form = $(this);

	form.validate({
		errorClass: "validate_error",
		rules: {
			phone: {
				required: true,
				checkMaskPhone: true
			}
		},
		errorPlacement: function (error, element) { },
		submitHandler: function () {
			var data = form.serialize();
			var action = form.attr('action');
			var method = form.attr('method');
			var link = document.createElement('a');
			var file = form.attr('data-download-form-js');

			link.setAttribute('href', file);
			link.setAttribute('download', '');

			$.ajax({
				type: method,
				url: action,
				data: data,
				success: function (response) {
					window.location.href = "thanks.html";
					link.click();
				},
				error: function (response) {
					window.location.href = "404.html";
				},
			});
		},
	});
});

$(window).on('scroll', function () {
	$('.animation').each(function () {
		var element = $(this);

		if (!(element.hasClass('visible'))) {
			var scroll = $(window).scrollTop(),
				position = element.offset().top,
				windowHeight = $(window).height();

			if ((scroll + windowHeight) > position) {
				element.addClass('visible');
			};
		};
	});
});

// плавная прокрутка
$("[data-anchor-btn-js]").on("click", function (event) {
	event.preventDefault();
	var headerHeight = $('header').height();

	var target = $(this).attr('href');

	if ($(target).length) {
		if (window.innerWidth > 768) {
			var offset = ($(target).offset().top) - 50;
		} else {
			var offset = ($(target).offset().top) - headerHeight + 40;
		}

		let scroll = $(window).scrollTop();
		let windowHeight = $(window).height();

		if (offset > scroll) {
			var time = Math.round(offset / windowHeight) * 1000;
		} else {
			var time = Math.round((scroll - offset) / windowHeight) * 300;
		}

		$('body,html').animate({
			scrollTop: offset
		}, time);
	} else {
		window.location.href = "index.html";
	}
});

$('.nav__list a').on("click", handler);
$(function () {
	handler(location.hash);
});

function handler(event) {
	var hash = typeof event === 'string' ? event : event.target.hash;
	var headerHeight = $('header').height();

	if (!hash)
		return

	var tag = $(hash);

	if (tag.length) {
		var offset = tag.offset().top - headerHeight;
		$('html, body').stop().animate({
			scrollTop: offset
		}, 2000);
	}
}

window.onhashchange = locationHashChanged;
function locationHashChanged() {
	if (location.hash) {
		history.pushState("", document.title, window.location.pathname);
	}
}


// всплывающие заголовки
$(".section-title").not('.no-anim').each(anime);
function anime() {
	var thisTitle = $(this);
	var offsetTop = thisTitle.offset().top - $(window).height() - 10;
	if ($(document).scrollTop() > offsetTop) {
		thisTitle.addClass('fade-in');
	}
	$(window).scroll(function (event) {
		offsetTop = thisTitle.offset().top - $(window).height() - 10;
		if ($(document).scrollTop() > offsetTop) {
			thisTitle.addClass('fade-in');
		}
	});
}

// квиз
var number = 0;
var maxNumber = $(".quiz-item").length;
var $element = $(".quiz-item").find("input");
var btnPrev = $(".quiz-btn--prev");
var btnNext = $('.quiz-btn--next');
var isValid;
var dataBlock;
var activeSlide = [];

$element.on('change input', function (e) {
	// var value = $(this).val().trim();
	// isValid = value !== "";
	// btnActive(!isValid);
});

function btnActive(isValid) {
	if (number === 0) {
		btnPrev.prop('disabled', 'false');
		btnNext.prop('disabled', isValid);
	} else {
		btnPrev.prop('disabled', false);
		if (activeSlide[number] === true || isValid === false) {
			btnNext.prop('disabled', false);
		} else {
			btnNext.prop('disabled', true);
		}
	}
}

let quizSingle = document.querySelectorAll('[data-quiz-single-answer]');
quizSingle.forEach(function (item) {
	let inputs = item.querySelectorAll('input[type="radio"]');

	for (let i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener("click", function () {
			for (let j = 0; j < inputs.length; j++) {
				if (inputs[j].getAttribute('checked') == 'checked') {
					inputs[j].removeAttribute('checked')
				}
			};
			inputs[i].setAttribute('checked', 'checked')
		});
	}
})

// progressbar
function progress(num) {
	const percent = parseInt((100 / maxNumber) * (num + 1));
	$('.js-quiz').text(num + 1);
	$('.quiz__progress-inner').css('width', (percent === 100 ? 98.9 : percent) + '%');
}
progress(0);

// btn
function btnClick() {
	btnPrev.on('click', function (event) {
		event.preventDefault();
		--number;
		$(".quiz-item").hide();
		$(".quiz-item").eq(number).fadeIn();
		btnActive(!isValid);
		if (number === 0) {
			btnPrev.hide();
		}
		progress(number);
		// animateTop();
		btnNext.blur();
	});

	btnNext.on('click', function (event) {
		event.preventDefault();
		let quizScroll = $(".quiz__inner").offset().top - 100;

		activeSlide[number] = true;
		++number;
		$(".quiz-item").hide();
		$(".quiz-item").eq(number).fadeIn(1000);
		btnActive(!isValid);

		if (activeSlide[number] === true) {
			btnNext.prop('disabled', false);
		} else {
			btnNext.prop('disabled', true);
		}

		if (number > 0) {
			btnPrev.show();
		}

		$('html, body').animate({
			scrollTop: quizScroll
		}, 1000);

		progress(number);

		if (number === maxNumber - 1) {
			$(".quiz__bottom").hide();
			$(".quiz__right").hide();
			$(".quiz__progress").hide();
			$('.js-quiz').text(number);
			setTimeout(function () {
				quizFinalStep();
			}, 500)
			$('.quiz__inner').addClass('final');
		}

		setTimeout(function () {
			btnNext.trigger("blur");
		}, 500);
	});
}
btnClick();

var quizFinalStep = function () {
	$('.quiz__loader').addClass('visible');
	$('.quiz__body').addClass('blur');

	setTimeout(function () {
		$('.quiz-item--final').addClass('visible');
	}, 1500)

	setTimeout(function () {
		$('.quiz__body').removeClass('blur');
		$('.quiz__loader').removeClass('visible');
	}, 1000)
}

$('input[name^="quiz"]').not('input[name^="quiz2"]').on('change', function () {
	setTimeout(function () {
		btnNext.click();
	}, 500);
});


function inputValid(item) {
	if (item.value != '' && item.value > 0) {
		item.classList.add('checked')
	} else {
		item.classList.remove('checked')
	}
}

let quiz2Inputs = document.querySelectorAll('input[name^="quiz2"]');
if (quiz2Inputs) {
	quiz2Inputs.forEach(function (input) {
		input.oninput = function () {
			inputValid(input)

			let quiz2InputsChecked = document.querySelectorAll('input[name^="quiz2"].checked');
			if (quiz2Inputs.length == quiz2InputsChecked.length) {
				btnNext.prop('disabled', false);
			} else {
				btnNext.prop('disabled', true);
			}
		};
	})
}

let inputCount = document.querySelector('.quiz__input-count');
if (inputCount) {
	let inputBtnUp = inputCount.parentNode.querySelector('.input-arrow__up');
	let inputBtnDown = inputCount.parentNode.querySelector('.input-arrow__down');
	inputBtnUp.addEventListener('click', function () {
		event.preventDefault()
		++inputCount.value
		inputValid(inputCount)
		$('.quiz__input-count').trigger("oninput");
	})
	inputBtnDown.addEventListener('click', function () {
		event.preventDefault()
		if (inputCount.value > 0) {
			--inputCount.value
			inputValid(inputCount)
			$('.quiz__input-count').trigger("oninput");
		}
	})
}


// кнопка-стрелка внутри карточки
let arrBtn = document.querySelectorAll('.arrow-btn');
arrBtn.forEach(function (arrow) {
	arrow.addEventListener('click', function () {
		arrow.classList.toggle('active');
		arrow.closest('li').classList.toggle('active');
	})
})

// слайдеры-портфолио
let slidersAll = document.querySelectorAll('.portfolio__swiper');
slidersAll.forEach(function (item) {
	let sliderThumbs = item.parentNode.querySelector('.portfolio__swiper-thumbs');

	let swiperThumbs = new Swiper(sliderThumbs, {
		// spaceBetween: 10,
		slidesPerView: 3,
		direction: 'vertical',
		freeMode: true,
		watchSlidesProgress: true,
	});

	let swiper = new Swiper(item, {
		loop: false,
		speed: 600,
		touchRatio: 1,
		slidesPerView: 1,

		thumbs: {
			swiper: swiperThumbs,
		},

		navigation: {
			nextEl: item.querySelector('.slider-btn-next'),
			prevEl: item.querySelector('.slider-btn-prev'),
		},
	});
})

// слайдеры в контактах
let slidersContacts = document.querySelectorAll('.contacts__slider');
slidersContacts.forEach(function (slider) {
	let swiper = new Swiper(slider, {
		loop: false,
		speed: 600,
		centeredSlides: false,
		touchRatio: 1,
		slidesPerView: 'auto',
		freeMode: true,

		navigation: {
			nextEl: slider.querySelector('.slider-btn-next'),
			prevEl: slider.querySelector('.slider-btn-prev'),
		},
	});
})


// кнопка показать еще
let btnMore = document.querySelectorAll('.btn-more');
btnMore.forEach(function (item) {
	let btnParent = item.parentNode.querySelector('ul');
	let listItem = btnParent.querySelectorAll('li');

	if (listItem.length < 5) {
		item.classList.add('hidden');
	}
	if (item) {
		item.addEventListener('click', function () {
			listItem.forEach(function (li) {
				li.classList.add('visible');
			})
			item.classList.add('hidden');
		})
	}
});

// accordion
let accordionItem = document.querySelectorAll('.accordion__item');
accordionItem.forEach(function (item) {
	item.addEventListener('click', function () {
		item.classList.toggle('active')
	})
})

// анимация подгрузки контента при скролле
$(window).on('scroll', function () {
	$('.animation').each(function () {
		var element = $(this);

		if (!(element.hasClass('visible'))) {
			var scroll = $(window).scrollTop(),
				position = element.offset().top,
				windowHeight = $(window).height();

			if ((scroll + windowHeight) > position) {
				element.addClass('visible');
			};
		};
	});
});