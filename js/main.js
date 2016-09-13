"use strict";

$(document).ready(function(){
    $("header").load("/partials/header.html", function(){
        var $navList = $("#navigation > ul");
        var $sections = $("section");
        
        if($sections.length > 1){
            $sections.each(function(i, elem){
                var $anchor;
                var $elem = $(elem);
                
                var listItem = $("<li class='nav-item'>")
                .html($anchor = $("<a href='javascript:void(0);'>")
                      .html($("<span>")
                            .html($elem.attr("title"))));
                $anchor.on("click", function(){
                    $.scrollify.move("#" + $elem.data("section-name"))
                });
                $navList.append(listItem);
            });     
        }

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
            before:function() {},
            after:function() {},
            afterResize:function() {},
            afterRender:function() {}
        });
    });
});