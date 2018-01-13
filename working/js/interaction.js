var home = $('.home');
var doubleNav = $('*[data-select="double"]');
var chooseNav = $('*[data-select="choose"]');
var double = $('.double');
var dubVid = $('.double video');
var choose = $('.choose');
var logo = $('.main-nav');
var cards = $('.card');
var compareGloves = $('.cd-image-container');
var videoTimer;
var vid = videojs("my-video");
var chooseButton = $(".choose-glove");
var infoButton = $(".info");
var infoModal = $(".info-modal");
var infoClose = $(".info-modal .close");
var alert = $(".alert");
var alertClose = $(".alert .close");
//modal
var modal          = $(".modal");
var modalCurtain   = $(".modal-backdrop");
var modalButton    = $(".modal-close");
var sources        = $(".sources");
var sourceTrigger  = $(".source-trigger");

//timing units
var t0 = 0.15;
var t1 = 0.25;
var t2 = 0.5;
var t3 = 1;
var t4 = 1.5;
var t5 = 3;
var t6 = 6;

function isActive(x,y) {
	x.click(function(){
		y.toggleClass("active");
	});
}

//Modal constructors
function triggerModal(x,y,z,a) {
  x.click(function(){
    if (y.hasClass("active")) {
      y.children().hide();
      a.show();
      $(modalButton).show();
    } else {
      y.children().hide();
      y.addClass("active");
      TweenMax.to(y, t1, {top:"0", opacity: 1, display: "block", ease: Circ.easeOut});
      z.addClass('active');
      a.show();
      $(modalButton).show();
    }
  });
}

function dismissModal(x,y,z) {
    x.click(function(){
    if (y.hasClass("active")) {
      y.removeClass("active");
      TweenMax.to(y, t1, {top:"-2em", opacity: 0, display: "none", ease: Circ.easeOut});
		z.removeClass('active');
    } else {
      //do nothing
    }
  });
}


function resetStage() {
	//set everything back to default.
	chooseButton.hide();
	TweenMax.set(double.find('h2'), {opacity: 1, display: "block"});
	TweenMax.set(dubVid, {opacity: 0, display: "none"});
	TweenMax.set($(".video-js"), {opacity: 0, display: "none"});
	TweenMax.set($(".video-js video"), {opacity: 0, display: "none"});
	TweenMax.set(double, {background: "#FFFFFF", display: "none"});
	vid.trigger('loadstart');
	vid.posterImage.show(); //shows your poster image//
	vid.currentTime(0);
	vid.pause();
	vid.removeClass("vjs-has-started");
	vid.controlBar.hide(); //hides your controls//
	vid.bigPlayButton.show(); //shows your play button//
	infoModal.removeClass("active");
}

function mainNavigation(x,y) {
	x.click(function(){
		resetStage();
		//move cards
		cards.removeClass('active');
		y.addClass('active');
		var tl = new TimelineMax();
		TweenMax.to(cards, t2, {display: "none", opacity: 0, ease: Circ.easeOut});
		TweenMax.to(y, t2, {top:"0", opacity: 1, display: "flex", ease: Circ.easeOut});
		doubleUp();
		chooseGlove();
	});
}

function doubleUp() {
	if (double.hasClass('active')) {
		var tl = new TimelineMax();
		tl.add(TweenMax.to(double.find('h2'), t1, {display: "none", opacity: 0, ease: Circ.easeOut, delay: t5}) );
		tl.add('flip');
		tl.to($(".video-js"), t3, {display: "block", opacity: 1, ease: Circ.easeOut}, 'flip')
		  .to(double, t3, {background: "#1a1a1a", ease: Circ.easeOut}, 'flip')
		  .to($(".video-js video"), t3, {display: "block", opacity: 1, ease: Circ.easeOut}, 'flip');
	}
}

function chooseGlove() {
	if (choose.hasClass('active')) {
		TweenMax.set(choose.find('h2'), {opacity: 1, display: "block"});
		TweenMax.set(compareGloves, {opacity: 0, display: "none"});
		TweenMax.set(alert, {opacity: 0, display: "none", bottom: "-1em"});
		var tl = new TimelineMax();
		tl.add(TweenMax.to(choose.find('h2'), t1, {display: "none", opacity: 0, ease: Circ.easeOut, delay: t5}) );
		tl.add(TweenMax.to(compareGloves, t3, {display: "block", opacity: 1, ease: Circ.easeOut}) );
		TweenMax.set(alert, {opacity: 0, display: "none", bottom: "-5em"});
		tl.add(TweenMax.to(alert, t3, {display: "block", opacity: 1, bottom: "3em", ease: Power4.easeOut}) );
		tl.add(TweenMax.to(alert, t2, {display: "none", opacity: 0, ease: Circ.easeOut, delay: t6}) );
	}
}

function returnHome() {
	if (double.hasClass('active')) {
		console.log("Phone home");
		cards.removeClass('active');
		home.addClass('active');
		var tl = new TimelineMax();
		TweenMax.to(cards, t2, {display: "none", opacity: 0, ease: Circ.easeOut});
		TweenMax.to(home, t2, {top:"0", opacity: 1, display: "flex", ease: Circ.easeOut});
	}
}

//show a CTA on video end
vid.on("ended", function() {
	chooseButton.show();
	//vid.posterImage.show(); //shows your poster image//
	vid.currentTime(0);
	vid.pause();
	vid.removeClass("vjs-has-started");
	vid.controlBar.hide(); //hides your controls//
	//vid.bigPlayButton.show(); //shows your play button//
});

vid.on("play", function() {
	vid.addClass("vjs-has-started");
	vid.posterImage.hide(); //hides your poster//
    vid.controlBar.show(); //shows your controls//
    vid.bigPlayButton.hide(); //hides your play button//
});

$("#my-video").click(function(){
	chooseButton.hide();
});

alertClose.click(function(){
	TweenMax.to(alert, t2, {display: "none", opacity: 0, ease: Circ.easeOut});
});

//Constructors
mainNavigation(doubleNav, double);
mainNavigation(chooseNav, choose);
mainNavigation(logo, home);
mainNavigation(chooseButton, choose);
isActive(infoButton, infoModal);
isActive(infoClose, infoModal);
doubleUp();
triggerModal(sourceTrigger, modal, modalCurtain, sources);
dismissModal(modalCurtain, modal, modalCurtain);
dismissModal(modalButton, modal, modalCurtain);
$( ".cd-handle" ).draggable({addClasses: false});
