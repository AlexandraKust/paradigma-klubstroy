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
let navClose = nav.querySelector('.nav__close');
let navBg = nav.querySelector('.nav__bg');
let header = document.querySelector('header');

function closeMenu() {
	nav.classList.remove('nav--active');
	document.body.classList.remove('lock');
}

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
		link.addEventListener('click', closeMenu)
	})

	if (window.innerWidth < 768 && !header.classList.contains('header--fixed')) {
		burger.classList.toggle('burger--fixed');
	}
})

navClose.addEventListener('click', closeMenu)
navBg.addEventListener('click', closeMenu)

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

// прилипание шапки
window.addEventListener('scroll', function () {
	// let headerRowHeight = header.offsetHeight;

	if (window.pageYOffset > 20) {
		header.classList.add('header--fixed');
	} else {
		header.classList.remove('header--fixed');
	}

	if (header.classList.contains('header--fixed') && window.innerWidth < 768) {
		burger.classList.add('burger--fixed');
	} else {
		burger.classList.remove('burger--fixed');
	}
});

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
			var offset = ($(target).offset().top) - headerHeight - 10;
		}

		let scroll = $(window).scrollTop();
		let windowHeight = $(window).height();
		console.log(scroll)
		console.log(windowHeight)
		console.log(offset)

		if (offset > scroll) {
			var time = Math.round(offset / windowHeight) * 300;
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
$(document).ready(function () {
	$('a[href^="#"]').on("click", function (event) {
		var hash = event.target.hash;
		var headerHeight = $('header').height();

		if (hash) {
			event.preventDefault();
			var tag = $(hash);

			if ($(hash).length) {
				if (window.innerWidth > 768) {
					var offset = tag.offset().top - 70;
				} else {
					var offset = tag.offset().top - headerHeight - 10;
				}
				$('html, body').stop().animate({ scrollTop: offset }, 2000);
			}
		}
	});
});

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