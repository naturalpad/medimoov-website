"use strict";

$(document).ready(function () {
    $("header").load("/partials/header.html", function () {
        var $navList = $("#navigation > ul");
        var $sections = $("section");

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
            
            $navList.find("li").first().find("span").addClass("current-section");
        }
        
        var afterScrollHandler = function (index, sections) {
            $navList.find("span").removeClass("current-section");
            $navList.find("li[data-section-name='" + sections[index].data("section-name") + "'] span").addClass("current-section");
        };
        
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