// ==UserScript==
// @name         RS Stock indicator
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds stock indicator to RS search results
// @author       Malte Gruber
// @match        https://*.rs-online.com/web/c/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rs-online.com
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    $('#results-table > tbody  > tr').each(function(index, tr) {


        /*Create a indicator next to the price*/
        let indicator_id = "hacked_" + index;
        $(tr).find("td.priceCol").append("<div id='" + indicator_id + "'>Loading stock info...</div>");
        let stock_indicator = $("#" + indicator_id)
        stock_indicator.css("color", "blue")


        /*Load the product page and get the stock info*/
        let url = $(tr).find("a.product-name").attr('href');
        $.get(url, function(data) {
            //Get stock text and add it to table row
            let stock_text = $(data).find("span.stock-msg-content").text();
            stock_indicator.text(stock_text);
            if ($(data).find(".stock-msg.instock").text() == '') {
                //Not in stock
                stock_indicator.css("color", "red")
            } else {
                //In stock
                stock_indicator.css("background-color", "#0c0")
                stock_indicator.css("color", "white")
            }


        });

    });


/*When the user is not logged in we are presented with a different page, this handles the non logged in case*/

    var searchInterval = setInterval(() => {

        let results = $("div[data-qa=table-container-body]>table>tbody>tr");


        results.each(function(index, tr) {

            clearInterval(searchInterval)
            console.log("Whaaat", index);



            /*Create a indicator next to the price*/
            let indicator_id = "hacked_" + index;
            $(tr).find("td.fixedFirstColumnCell").append("<div id='" + indicator_id + "'>Loading stock info...</div>");
            let stock_indicator = $("#" + indicator_id)
            stock_indicator.css("color", "blue")


            /*Load the product page and get the stock info*/
            let url = $(tr).find("a[data-qa=product-tile-container]").attr('href');
            console.log(index, url)
            $.get(url, function(data) {
                //Get stock text and add it to table row
                let stock_em = $(data).find("[data-testid=stock-status-0]")
                let stock_text = stock_em.text();
                console.log("Stock text", stock_text);
                stock_indicator.text(stock_text);
                if ($(stock_em).attr("color") != 'Green') {
                    //Not in stock
                    stock_indicator.css("color", "red")
                } else {
                    //In stock
                    stock_indicator.css("background-color", "#0c0")
                    stock_indicator.css("color", "white")
                }


            });

        });
    }, 5000);

})();