let popup_count = 0;

$(function() {

	/* Button off */
	$(".button").on("click", function(e) {
		$(this).addClass("disabled");
	});


	/* Main buttons */
	$(".start-main").on("click", function(e) {
		$(".pause-main, .reset-main").removeClass("disabled");
		$(".slider").addClass("disabled");
	});

	$(".pause-main").on("click", function(e) {
		$(".start-main").removeClass("disabled");
		$(".slider").removeClass("disabled");
	});	

	$(".reset-main").on("click", function(e) {
		$("#distance").val(0.2);
		$("#mass").val(0.1);
		$("#radius").val(0.08);
		$("#rotation-speed").val(500);
		$("#initial-speed").val(0);
		$("#initial-angle").val(90);

		setText();

		$(".pause-main").addClass("disabled");
		$(".start-main").removeClass("disabled");
		$(".slider").removeClass("disabled");
	});


	/* Sliders */
	function setText() {
		$("#distance, #mass, #radius, #rotation-speed, #initial-speed, #initial-angle").on("input", function() {
			let el = $(this);
			el.closest(".parameters__wrapper").children(".parameters__text").children("span").html(el.val());
		}).trigger("input");
	}
	setText();


	/* Timer */
	let min = 0, sec = 0, ms = 0;
	let isStoped = false, isStarted = false;

	$(".start-timer").on("click", function(e) {
		if (!isStarted)
			Timer();

		isStoped = false;

		$(".pause-timer, .reset-timer").removeClass("disabled");
	});

	$(".pause-timer").on("click", function(e) {
		isStoped = true;

		$(".start-timer").removeClass("disabled");
	});

	$(".reset-timer").on("click", function(e) {
		isStoped = true;

		min = 0;
		sec = 0;
		ms = 0;

		minute = "";
		second = "";
		msecond = "";

		$('.timer__minutes').html("00");
		$('.timer__seconds').html("00");
		$('.timer__milliseconds').html("00");

		$(".pause-timer").addClass("disabled");
		$(".start-timer").removeClass("disabled");
	});

	function Timer() {
		setInterval(function Time() {
			if (!isStoped) {
				sec++;
				if (sec >= 60) {
					min++;
					sec -= 60;
				}

				let minute  = (min < 10) ? '0' + min : min,
				second  = (sec < 10) ? '0' + sec : sec;

				$('.timer__minutes').html(minute);
				$('.timer__seconds').html(second);
			}
		}, 1000);

		setInterval(function Milliseconds() {
			if (!isStoped) {
				ms++;
				if (ms >= 100) 
					ms -= 100; 

				let msecond  = (ms < 10) ? '0' + ms : ms;

				$('.timer__milliseconds').html(msecond);
			}
		}, 10);

		isStarted = true;
	}


	/* Popup */
	$('.popup').mousedown(function() {
		$(this).css("z-index", "10" + popup_count);
		$(".popup").not(this).css("z-index", "10" + popup_count - 1);
	});

	function OnClickNav(nav, popup, handleID, dragID) {
		$(nav).addClass('disabled').closest("li").addClass('disabled');

		if (!($(popup).hasClass('active')))
			popup_count++;

		$(popup).addClass('active');
		Drag(handleID, dragID, popup_count);
	}


	/* Show popup */
	$('.theta-from-phi').click(function() {
		OnClickNav(this, ".popup-theta-from-phi", "handleThetaFromPhi", "dragThetaFromPhi");
	});

	$('.theta-from-t').click(function() {
		OnClickNav(this, ".popup-theta-from-t", "handleThetaFromT", "dragThetaFromT");
	});

	$('.kinetic').click(function() {
		OnClickNav(this, ".popup-kinetic", "handleKinetic", "dragKinetic");		
	});

	$('.potential').click(function() {
		OnClickNav(this, ".popup-potential", "handlePotential", "dragPotential");		
	});

	$('.total').click(function() {
		OnClickNav(this, ".popup-total", "handleTotal", "dragTotal");		
	});

	$('.manual').click(function() {
		OnClickNav(this, ".popup-manual", "handleManual", "dragManual");		
	});

	$('.theory').click(function() {
		OnClickNav(this, ".popup-theory", "handleTheory", "dragTheory");		
	});

	$('.developers').click(function() {
		OnClickNav(this, ".popup-developers", "handleDevelopers", "dragDevelopers");		
	});


	/* Hide popup */
	$('.popup__close').click(function() {
		$(this).closest('.popup').removeClass('active').css("z-index", "100");
		popup_count--;
	});

	$('.popup-theta-from-phi .popup__close').click(function() {
		$('.theta-from-phi').removeClass('disabled').closest("li").removeClass('disabled');
	});

	$('.popup-theta-from-t .popup__close').click(function() {
		$('.theta-from-t').removeClass('disabled').closest("li").removeClass('disabled');
	});

	$('.popup-kinetic .popup__close').click(function() {
		$('.kinetic').removeClass('disabled').closest("li").removeClass('disabled');
	});

	$('.popup-potential .popup__close').click(function() {
		$('.potential').removeClass('disabled').closest("li").removeClass('disabled');
	});

	$('.popup-total .popup__close').click(function() {
		$('.total').removeClass('disabled').closest("li").removeClass('disabled');
	});

	$('.popup-manual .popup__close').click(function() {
		$('.manual').removeClass('disabled').closest("li").removeClass('disabled');
	});

	$('.popup-theory .popup__close').click(function() {
		$('.theory').removeClass('disabled').closest("li").removeClass('disabled');
	});

	$('.popup-developers .popup__close').click(function() {
		$('.developers').removeClass('disabled').closest("li").removeClass('disabled');
	});

});


/* Dock panel */
function Drag(handleID, dragID, index) {
	let mousePosition,
	offset = [0, 0],
	handle = document.getElementById(handleID),
	drag = document.getElementById(dragID),
	isDown = false;

	if (index <= 2)
		drag.style.top = 100 + 40 * index + "px";
	else if (index > 4)
		drag.style.top = 100 + 40 * (index - 4) + "px";
	else
		drag.style.top = 100 + (-40 * (index - 4)) + "px";

	drag.style.left = 320 + 40 * index + "px";

	handle.addEventListener('mousedown', function(e) {
		isDown = true;
		offset = [drag.offsetLeft - e.clientX, drag.offsetTop - e.clientY];
	}, true);

	document.addEventListener('mouseup', function() { isDown = false; }, true);

	document.addEventListener('mousemove', function(event) {
		if (isDown) {
			mousePosition = { x : event.clientX, y : event.clientY };

			drag.style.left = (mousePosition.x + offset[0]) + 'px';
			drag.style.top  = (mousePosition.y + offset[1]) + 'px';

			let container = document.getElementById("container");
			
			if (drag.offsetTop < 0)
				drag.style.top = "0px";

			if (drag.offsetLeft < 0)
				drag.style.left = "0px";

			if (drag.offsetTop + drag.clientHeight > container.clientHeight - 2)
				drag.style.top = container.clientHeight - drag.clientHeight - 2 + "px";

			if (drag.offsetLeft + drag.clientWidth > container.clientWidth)
				drag.style.left = container.clientWidth - drag.clientWidth + "px";
		}
	}, true);

	drag.style.zIndex = 100 + popup_count;
}


/* Plots */
let brdThetaFromPhi = JXG.JSXGraph.initBoard('ThetaFromPhi', {
	axis: true, 
	boundingbox: [-1, 1, 1, -1], 
	registerEvents: false, 
	grid: true,
	keepAspectRatio: true,
	showCopyright: false,
});
brdThetaFromPhi.suspendUpdate();
let ThetaFromPhiPlot = brdThetaFromPhi.create('functiongraph', [function(x) { return 0.5 * Math.cos(5 * x); }], { strokeWidth: 3, strokeColor: '#1e28ff' });
brdThetaFromPhi.unsuspendUpdate();

$(window).resize(function() { 
	brdThetaFromPhi.resizeContainer($('#ThetaFromPhi').width(), $('#ThetaFromPhi').height(), true, true); 
	brdThetaFromPhi.setBoundingBox([-1, 1, 1, -1], false); 
}); 