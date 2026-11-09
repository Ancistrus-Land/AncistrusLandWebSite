(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow');
            } else {
                $('.fixed-top').removeClass('shadow');
            }
        } else {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow').css('top', -55);
            } else {
                $('.fixed-top').removeClass('shadow').css('top', 0);
            }
        } 
    });
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:2
            },
            1200:{
                items:2
            }
        }
    });


    // vegetable carousel
    $(".vegetable-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:4
            }
        }
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });
})(jQuery);



// Ancistrus Land mobile cart badge sync
// The existing cart system updates #cart-count.
// This mirrors that exact value to #cart-count-mobile.
(function () {
    let cartBadgeObserver = null;

    function connectCartBadgeSync() {
        const desktopBadge = document.getElementById("cart-count");
        const mobileBadge = document.getElementById("cart-count-mobile");

        if (!desktopBadge || !mobileBadge) return false;

        // Copy the current value immediately.
        mobileBadge.textContent = desktopBadge.textContent.trim();

        // Avoid creating multiple observers.
        if (cartBadgeObserver) {
            cartBadgeObserver.disconnect();
        }

        cartBadgeObserver = new MutationObserver(function () {
            mobileBadge.textContent = desktopBadge.textContent.trim();
        });

        cartBadgeObserver.observe(desktopBadge, {
            childList: true,
            characterData: true,
            subtree: true
        });

        return true;
    }

    function startCartBadgeSync() {
        // Header may be loaded dynamically through layout.js.
        if (connectCartBadgeSync()) return;

        const pageObserver = new MutationObserver(function () {
            if (connectCartBadgeSync()) {
                pageObserver.disconnect();
            }
        });

        pageObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", startCartBadgeSync);
    } else {
        startCartBadgeSync();
    }
})();


// Ancistrus Land quantity control
// Installed only once even if main.js is accidentally loaded more than once.
(function () {
    if (window.__ancistrusQuantityHandlerInstalled) return;
    window.__ancistrusQuantityHandlerInstalled = true;

    document.addEventListener("click", function (event) {
        const button = event.target.closest(".quantity .btn-plus, .quantity .btn-minus");
        if (!button) return;

        // Prevent another quantity click handler from processing the same click.
        event.preventDefault();
        event.stopImmediatePropagation();

        const quantityBox = button.closest(".quantity");
        const input = quantityBox ? quantityBox.querySelector("input") : null;
        if (!input) return;

        let value = parseInt(input.value, 10);
        if (!Number.isFinite(value) || value < 1) value = 1;

        if (button.classList.contains("btn-plus")) {
            value += 1;
        } else {
            value = Math.max(1, value - 1);
        }

        input.value = value;
        input.dispatchEvent(new Event("change", { bubbles: true }));
    }, true);
})();
