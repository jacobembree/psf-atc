(function($){
  Drupal.behaviors.psfatc = {
    attach: function (context, settings) {
      if (typeof settings.psfatc == 'undefined') {
        settings.psfatc = {};
      }

      // Provide trim() support for IE8
      if (typeof String.prototype.trim !== 'function') {
        String.prototype.trim = function() {
          return this.replace(/^\s+|\s+$/g, '');
        }
      }

      // Add classes from a to parent li.
      $('ul#superfish-1').children('li').each(function () {
        $(this).addClass($(this).find('a.headerNav:first').attr('class'));
      });


      // Make parent clickable
      $('ul#superfish-1-accordion > li > a').unbind();


      // Remove empty paragraphs from body text.
      $('article p').filter(function () {
        return this.innerHTML == "&nbsp;" || this.innerHTML == ""
      }).remove();


      // Accordions
      var read_more_text = "Read More";
      var change = function(event, ui) {
      };
      $('.asstart').accordion({
        create: function(event, ui) {
          $(this).find('.asstart-header').text(read_more_text);
        },

        beforeActivate: function (event, ui) {
          ui.newHeader.detach().insertAfter(ui.newPanel);
          ui.newHeader.one("click", function () {
            $(this).detach().insertBefore(ui.newPanel);
          });
          ui.newHeader.text("Collapse");
          ui.oldHeader.text(read_more_text);
        },

        /* change is for older versions of jQueryUI, activate for newer. */
        change: change,
        activate: change,

        active: false,
        animated: false,
        autoHeight: false,
        collapsible: true,
        header: ".asstart-header",
        icons: false
      });

      /* Workaround to simulate clicking on the logo even when .sf-hidden
       * menu is covering up the link.
       */
      var simulate_logo_click = function (e) {
        if (!$(e.target).is('#superfish-1-toggle')) {
          $('#logo').css('z-index', 305);// Somewhere above 300
          if (e.pageX && e.pageY) {
            $(document.elementFromPoint(e.pageX, e.pageY)).click();
          }
          $('#logo').css('z-index', 30);// Not sure what the default is
        }
      }
      $("#menu-wrapper").has("#superfish-1-accordion.sf-hidden").click(simulate_logo_click);
      /*$("#menu-wrapper").has("#superfish-1-accordion.sf-hidden").tap(simulate_logo_click);*/

      /* Fix height of Main menu sub ul's for the box-shadow. */
      $('#superfish-1 li.sf-depth-1 > ul').css('height', function () {
        var height = 0;
        $(this).children('li').children('a').each(function () {
          height += $(this).innerHeight() - 0.5;
        });
        return height - 10;/* Compensating for something unknown. */
      }).css('width', function () {
        return $(this).find('li a').outerWidth();
      });

      /*if (Modernizr.video) {
        var div=document.getElementById('actualFlashDiv');
        if (div) {
          div.innerHTML='<p><iframe width="766" scrolling="no" height="264" style="border:none;padding:0;margin:0;width:766px;height:264px;overflow: hidden;" src="/video.html"></p>';
        }
      }*/

      /* Set the number of visible frames in "Diverse Clientele" carousel. */
      /* See also responsive.custom.css. */
      var delay = (function(){
        var timer = 0;
        return function(callback, ms){
          clearTimeout (timer);
          timer = setTimeout(callback, ms);
        };
      })();
      var cycle_num_slides = function (object) {
        /* divisor = width of slide + padding-left + padding-right */
        var divisor = 170;
        return Math.floor($(this).parent().width() / divisor);
      }
      $("#clients .cycle-slideshow").on("cycle-bootstrap", function (event, optionHash) {
        optionHash["carouselVisible"] = cycle_num_slides($(this));
      });
      $(window).resize(function () {
        delay(function () {
          var carousel = $("#clients .cycle-slideshow");
          if (carousel.length && $(carousel).data()["cycleCarouselVisible"] != cycle_num_slides(carousel)) {
            $(carousel).cycle("reinit");
          }
        }, 500);
      });


      /* Resize fixed menu in relative units to consume the same physical space.
       */
      var fix_fixed_menu = function () {
        if (typeof settings.psfatc['original-window-height'] == 'undefined') {
          settings.psfatc['original-window-height'] = $(window).height();
        }
        if (typeof settings.psfatc['original-menu-height'] == 'undefined') {
          settings.psfatc['original-menu-height'] = parseFloat($('.region-header').css('height'));
        }
        if (typeof settings.psfatc['original-device-height'] == 'undefined') {
          settings.psfatc['original-device-height'] = window.innerHeight;
        }
        if (settings.psfatc['original-window-height'] != $(window).height()) {
          settings.psfatc['original-window-height'] = $(window).height();
          return;
        }
        var current_device_height = window.innerHeight
        var ratio = current_device_height / settings.psfatc['original-device-height'];
        var height = ratio * settings.psfatc['original-menu-height'];
        $(".region-header").css("height", height + "px");
        $("#superfish-1-toggle").css("height", (ratio * 25) + "px");
        $(".region-header li").css("font-size", ratio + "em");
        $(".region-header li").css("margin-top", (ratio * 5) + "em");
      };
      fix_fixed_menu();
      $('body').on("touchend", fix_fixed_menu);


      /* Move around elements for "What Clients Are Saying" */
      /* Add classes to the elements missing them. */
      $("#node-92, #node-95, #node-99").find("blockquote").each(function () {
        $(this).parent().not(".what-clients-are-saying").addClass("what-clients-are-saying");
      });
      $('.what-clients-are-saying').each(function () {
        if (!$(this).find(".who-said-clone").length) {
          $(this).find("div div:has('img')").not(":has('a')").clone().appendTo($(this)).addClass("who-said-clone").hide();
        }
      });

      !function(breakName, query){
        // Run the callback on current viewport
        psfatc_media({
          media: query,
          matches: matchMedia(query).matches
        });
        // Subscribe to breakpoint changes
        matchMedia(query).addListener(psfatc_media);
      }(name, 'only screen and (max-width: 480px)');
      function psfatc_media(data) {
        if (data.matches) {
          $('.what-clients-are-saying').each(function () {
            $(this).find("div div:has('img')").not(":has('a')").hide();
            $(this).find(".who-said-clone").show();
          });
        }
        else {
          $('.what-clients-are-saying .who-said-clone').hide();
          $('.what-clients-are-saying').find("div div:has('img')").not(":has('a')").show();
        }
      }


      // Place a label on colorbox photos to indicate they can be enlarged.
      $(".colorbox-load > img").each(function () {
        $(this).wrap('<div style="display: inline-block; position: relative"></div>').parent().css("float", $(this).css("float"));
        $(this).css("float", "none");
        $(this).after('<span style="display: block; text-align: center;">Click to enlarge</span>');
      });


      // Send environment argument to "Contact Us" iframe.
      $('iframe[src="https://go.pardot.com/l/21672/2013-08-14/jkjp"]').attr('src', "https://go.pardot.com/l/21672/2013-08-14/jkjp?environment=" + (location.hostname.indexOf("test") > -1 ? "test" : "live"));


    }
  };
})(jQuery);

