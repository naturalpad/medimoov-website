"use strict";

$(document).ready(function () {
    $("header").load("/partials/header.html", function () {
        var $navList = $("#navigation > ul");
        var $sections = $("section");
        var $navArrow = $('.nav-arrow');
        
        if ($sections.length > 1) {
            $sections.each(function (i, elem) {
                var $anchor;
                var $elem = $(elem);
                var sectionName = $elem.data("section-name");
                
                var listItem = $("<li class='nav-item'>")
                .attr("data-section-name", sectionName)                            
                .html($anchor = $("<a href='javascript:void(0);'>")
                      .html($("<span>")
                            .html($elem.attr("title"))));
                $anchor.on("click", function () {
                    $.scrollify.move("#" + sectionName)
                });
                $navList.append(listItem);
            });
            
            // selected nav item is first section on page load
            $navList.find("li").first().find("span").addClass("current-section");
        }

        var setDefaultNavArrowClickHandler = function () {
            var link = $navArrow.find('a');
            link.unbind('click');
            link.on('click', function () {
                console.log("goto next");
                $.scrollify.next();
            });
        };
        
        var setLastSectionNavArrowClickHandler = function () {
            var link = $navArrow.find('a');
            link.unbind('click');
            link.on('click', function () {
                console.log("goto first");
                $.scrollify.move(0);
            });
        };
        
        
        var afterScrollHandler = function (index, sections) {
            
            // set selected nav item class
            $navList.find("span").removeClass("current-section");
            $navList.find("li[data-section-name='" + sections[index].data("section-name") + "'] span").addClass("current-section");
            
            // nav arrow scrolls to top section when current section is the last one
            if (index === sections.length - 1) {
                $navArrow.find('i').addClass("last-section");
                setLastSectionNavArrowClickHandler();
            } else {
                $navArrow.find('i').removeClass("last-section");    
                setDefaultNavArrowClickHandler();
            }
        };
        
        setDefaultNavArrowClickHandler();

        $.scrollify({
            section : "section",
            sectionName : "section-name",
            interstitialSection : "",
            easing: "easeOutExpo",
            scrollSpeed: 1100,
            offset : 0,
            scrollbars: true,
            standardScrollElements: "",
            setHeights: true,
            overflowScroll: true,
            before: function () {},
            after: afterScrollHandler,
            afterResize: function () {},
            afterRender: function () {}
        });
    });
});