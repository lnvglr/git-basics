"use strict";

$(".spinner, .first").hide();
$("body").addClass("flow");


var img_id,
    prevX,
    prevY,
    dimW = "100",
    dimH = "100",
    photographyY,
    designY,
    aboutY;

function underscore() {
    if (location.hash !== '') {
        var locationHash = location.hash,
            hash = locationHash.substr(1),
            that = $(".first li." + hash),
            width = that.width(),
            offsetTop = that.position().top - 5,
            center = that.position().left + width / 2;

        $(that).siblings(".outer").css("left", center).css("top", offsetTop);
        $(that).siblings(".outer").children(".inner").css("width", width);

    } else {
        $("nav .inner").css("width", "");
    }
}
function fader() {
    var bodyClass = $("body").attr("class");
    if (location.hash !== "#" + bodyClass) {
        if (location.hash !== "") {
            var locationHash = location.hash,
                hash = locationHash.substr(1),
                that = $(".first li." + hash);

            $(".content." + hash).addClass("table");
            $("body").removeClass();
            setTimeout(function() {
                $("body").addClass(hash);
                $(".content:not(." + hash + ")").removeClass("table");
                if (location.hash == undefined) {
                    $("html, body").animate({ scrollTop: 0 }, 0);
                } else if (location.hash == "#photography") {
                    $("html, body").animate({ scrollTop: photographyY }, 0);
                } else if (location.hash == "#design") {
                    $("html, body").animate({ scrollTop: designY }, 0);
                } else if (location.hash == "#about") {
                    $("html, body").animate({ scrollTop: aboutY }, 0);
                }
            }, 300);

        } else {
            $("body").removeClass();
            setTimeout(function() {
                $("body").addClass("home");
                $(".content").removeClass("table").addClass("none");
            }, 300);
        }

    }
}

$(document).ready(function() {
    $(".spinner").fadeIn(0);
});
$(window).resize(function () {
    $("*").addClass("notransition");
    underscore();
    $("*")[0].offsetHeight;
    $("*").removeClass("notransition");
}).load(function () {
    $(".first").fadeTo(300, 0.01);
        $(".spinner").fadeOut(300);
    setTimeout(function () {
        $(".first").fadeTo(300, 1);
        $("body").removeClass("flow");
        fader();
    }, 100);
    setTimeout(function () {
        underscore();
    }, 1700);
});


$(".first li").hover(function () {
    var that = $(this),
        width = that.width(),
        offsetTop = that.position().top - 5,
        center = that.position().left + width / 2;

    $(that).siblings(".outer").css("left", center).css("top", offsetTop).children(".inner").css("width", width);

}).mouseleave(function () {
    $(".social .inner").css("width", "");
    if (location.hash == "") {
        $(".first .inner").css("width", "");
    }
});
$("nav li").click(function () {
    if (location.hash == "#photography") {
        photographyY = $(window).scrollTop();
    } else if (location.hash == "#design") {
        designY = $(window).scrollTop();
    } else if (location.hash == "#about") {
        aboutY = $(window).scrollTop();
    }
    var that_class = $(this).attr("class");
    location.hash = that_class;
    underscore();
    fader();
}).mouseleave(function () {
    underscore();
});
$("header div").click(function () {
    if (location.hash !== "") {
        location.hash = "";
        underscore();
        fader();
    }
});
$(".content img").click(function() {
    var img = $(this),
        path = img.attr("src"),
        width = img.width(),
        height = img.height(),
        winWidth = $(window).innerWidth(),
        winHeight = $(window).innerHeight(),
        offsetLeft = img.offset().left,
        offsetTop = img.offset().top,
        scrollTop = $(window).scrollTop(),
        realPosition =  offsetTop - scrollTop,
        preview = $(".preview"),
        realPrevX = winWidth / 10,
        realPrevY = winHeight / 10;
    if (!$(preview).hasClass("zoom")) {
        $(preview).attr("src", path).css("z-index", "20").css("max-width", width).css("max-height", height).css("left", offsetLeft).css("top", realPosition).css("transition", "300ms");
        $(".preview-block").fadeIn();
        setTimeout(function() {
            $(preview).css("opacity", "1").addClass("zoom").css("left", realPrevX).css("top", realPrevY);
        }, 200);
        setTimeout(function() {
            img.css("opacity","0");
        }, 250);
        $(".first").css("opacity", "0.3").css("-webkit-filter", "blur(20px)").disabled = true;
        $("body").css("overflow", "hidden");
    } else {
        $("body").click();
    }
    img_id = img;
    prevX = realPrevX;
    prevY = realPrevY;
});

function close() {
    var img_prev = img_id,
        img = img_prev,
        width = img.width(),
        height = img.height(),
        offsetLeft = img.offset().left,
        offsetTop = img.offset().top,
        scrollTop = $(window).scrollTop(),
        realPosition =  offsetTop - scrollTop;
        $(".preview").removeClass("zoom").css("max-width", width).css("max-height", height).css("margin", "0").css("left", offsetLeft).css("top", realPosition);
        $(".preview-block").fadeOut();

        setTimeout(function() {
            img.css("opacity","1");
            $(".preview").css("background-image", "").css("transition", "0ms").css("opacity", "0").css("z-index", "-20");
            $("body").css("overflow", "auto");
        }, 400);
        $(".first").css("opacity", "1").css("-webkit-filter", "blur(0px)").disabled = false;

};

// NO SPAM
$("#ml").click(function() {
    var a = "mailto:",
        b = "post",
        c = "@",
        d = "leon",
        e = "vogler.",
        f = "de",
        ad = a + b + c + d + e + f;
    $("#ml a").attr("href", ad).click();
}).hover(function() {
    $(this).attr("title", "Schick mir eine Mail");
});



// RESIZE
$(window).load(function() {
    var dH = $('.content.table').outerHeight(true),
        wH = $(window).height(),
        H = dH + wH,
        S = $(window).scrollTop(),
        P = S/H;

    $(window).scroll(function() {
        S = $(window).scrollTop();
        P = S/H;
    });

    $(window).resize(function() {
        H = $('.content.table').outerHeight(true);
        $(window).scrollTop(P*H);
    });

});

// DRAG
$(".preview-block").click(function() {
    if ($('.preview').hasClass("zoom")) {
        close();
    }
});
$(document).ready(function() {
    var posXnow,
        posYnow,
        delta,
        cursorInside = true,
        dragging = null;


    $('body').on("mousedown", ".preview", function(e) {
        $(this).attr('unselectable', 'on').addClass('draggable');
        var mx = e.pageX - $('.draggable').position().left,
            my = e.pageY - $('.draggable').position().top;

        $('body').on("mousemove", function(e) {
            e.preventDefault();
            if (dragging) {
                dragging.offset({
                    top: e.pageY - my + $(window).scrollTop(),
                    left: e.pageX - mx
                });
            }
        });
        dragging = $(e.target);
    }).on("mouseup", ".draggable", function(e) {
        dragging = null;
        $(this).removeAttr('unselectable').removeClass('draggable');
        posXnow = $('.preview').position().left;
        posYnow = $('.preview').position().top;
        var delta = Math.sqrt(Math.pow(posXnow - prevX, 2) + Math.pow(posYnow - prevY, 2));
        console.log(delta);
        if ((delta >= 100) || (delta < .1)) {
            close();
        } else {
            e.preventDefault();
            $('.preview').css("left", prevX);
            $('.preview').css("top", prevY);
        }
    });
});
