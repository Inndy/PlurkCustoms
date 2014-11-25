/*jslint browser: true, sloppy: true, white: true */
/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

;
(function($) {

    $.fn.unveil = function(threshold, callback, options) {

        var $w = $(window),
            th = threshold || 0,
            retina = window.devicePixelRatio > 1,
            attrib = retina ? "data-src-retina" : "data-src",
            images = this,
            loaded,
            $scrollBox = $((options.scrollBox && options.scrollBox.jquery && options.scrollBox.length > 0) ? options.scrollBox : $w);

        this.one("unveil", function() {
            var source = this.getAttribute(attrib);
            source = source || this.getAttribute("data-src");
            if (source) {
                this.setAttribute("src", source);
                if (typeof callback === "function") {
                    callback.call(this);
                }
            }
        });

        function unveil() {
            var inview = images.filter(function() {
                var $e = $(this),
                    wt = $scrollBox.scrollTop(),
                    wb = wt + $scrollBox.height(),
                    et = $e.offset().top,
                    eb = et + $e.height();
                if ($e.is(":hidden")) {
                    return;
                }
                return eb >= wt - th && et <= wb + th;
            });

            loaded = inview.trigger("unveil");
            images = images.not(loaded);
        }
        $scrollBox.get(0).addEventListener("scroll", function() {
            console.log('capture')
        }, true)
        $scrollBox.get(0).addEventListener("scroll", unveil, true)
            //$scrollBox.on('scroll', unveil,  true);
            //$scrollBox.scroll(unveil);
        $w.resize(unveil);

        unveil();

        return this;

    };

})(window.jQuery || window.Zepto);