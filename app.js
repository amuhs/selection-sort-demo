var sortedBoundary, lowest, temp, tileVals, boundaryIndex, needSwap;
var elems = ['F', 'D', 'B', 'E', 'H', 'C', 'I', 'A', 'G'];
var chip1 = '<span class="mdl-chip mdl-chip--contact"><span class="mdl-chip__contact mdl-color--Indigo mdl-color-text--white">';
var chip2 = '</span><span class="mdl-chip__text">';
var chip3 = '</span></span>';
var tilePt1 = "<div class=\"demo-card-square mdl-card mdl-shadow--2dp\"><div class=\"mdl-card__title mdl-card--expand\"><h2 class=\"mdl-card__title-text\">";
var tmpTile1 = "<div class=\"demo-card-square mdl-card mdl-shadow--2dp\"><div class=\"temp-tile-bg mdl-card__title mdl-card--expand\"><h2 class=\"temp-tile-text mdl-card__title-text\">";
var tilePt2 = "</h2></div><div class=\"mdl-card__supporting-text\">";
var tilePt3 = "</div></div>";
var h2pt1 = "<h2 class=\"temp-tile-text mdl-card__title-text\">"
var h2pt2 = "</h2>";

$(function () {
    initalSetup(elems);
    main();

    // Functions for buttons
    $(".reset").on("click", function () {
        $(".tiles").children().remove();
        initalSetup(elems);
        main();
        enableStepStart();
    });

    $(".start").on("click", function () {
        setChips(sortedBoundary, lowest);
        disableStart();
        needSwap = false;
    });

    $(".step").on("click", function () {
        if (!$(".start").hasClass("hidden")) {
            alert("Cannot step without starting first!");
            return;
        }

        if (needSwap) {
            setTemp(lowest);
            swap(sortedBoundary, lowest);
        } else {
            setBlankTemp();
            clearChips(sortedBoundary, lowest);
            findLowest();
            setChips(sortedBoundary, lowest);
            needSwap = true;
        }

    });

    function compare (thisObj, thatObj) {
        var low = $(thisObj).text().charCodeAt(0);
        var obj2 = $(thatObj).text().charCodeAt(0);
        if (low > obj2) {
            lowest = thatObj;
        } else {
            lowest = thisObj;
        }
    }

    function findLowest () {
        var i = tileVals.indexOf(sortedBoundary);
        for (var j = 0; j < tileVals.length; j++) {
            compare(lowest, tileVals[j]);
        }
    }

    function swap (sortBound, low) {
        //TODO
        var b, l, currB, currL;
        b = $(sortBound).parent();
        l = $(low).parent();
        currB = b.text();
        currL = l.text();

        l.html(h2pt1 + currB + h2pt2);
        b.html(h2pt1 + currL + h2pt2);
        needSwap = false;
    }

    function setTemp (el) {
        var l, t, currL
        currL = $(el).parent().text();
        $(".temp-tile").children().remove();
        var str = tmpTile1 + currL + tilePt2 + "SWAP" + tilePt3;
        $(str).appendTo(".temp-tile");
    }

    function setBlankTemp () {
        $(".temp-tile").children().remove();
        var tmpTile = tmpTile1 + "null" + tilePt2 + "SWAP" + tilePt3;
        $(tmpTile).appendTo(".temp-tile");
    }

    function disableStep () {
        $(".step").addClass("hidden");
        $(".step-disabled").removeClass("hidden");
    }

    function disableStart () {
        $(".start").addClass("hidden");
        $(".start-disabled").removeClass("hidden");
    }

    function enableStepStart () {
        $(".start").removeClass("hidden");
        $(".start-disabled").addClass("hidden");
        $(".step").removeClass("hidden");
        $(".step-disabled").addClass("hidden");
    }

    function main () {
        var tempArray = $(".tiles").children().toArray();
        tileVals = getTextArray(tempArray);
        console.log(tileVals);
        sortedBoundary = tileVals[0];
        lowest = tileVals[0];
        temp = $(".temp-tile-text")[0];
        console.log(temp);
    }

    /**
    * Addes chips to the first, mid, and last cards
    */
    function setChips (bound, low) {
        var b, l, currB, currL;
        b = $(bound).parent().next();
        l = $(low).parent().next();
        currB = b.text();
        currL = l.text();
        if (currB == currL) {
            b.html(chip1 + currB  + chip2 + "< S / L" + chip3);
        } else  {
            b.html(chip1 + currB  + chip2 + "< SORTED" + chip3);
            l.html(chip1 + currL + chip2 + "LOWEST" + chip3);
        }
    }

    /**
    * Removes chips from the first, mid, and last cards
    */
    function clearChips (bound, low) {
        var b, l, curr;
        // Boundary
        b = $(bound).parent().next();
        curr = b.children().text();
        b.html(curr[0]);

        // Lowest
        l = $(low).parent().next();
        curr = l.children().text();
        l.html(curr[0]);
    }

    function getTextArray (arr) {
        var result = [];
        arr.forEach(function (item) {
            var i = $(item).find(".mdl-card__title-text");
            result.push(i[0]);
        });
        return result;
    }

    /**
    * Sets up the demo.
    */
    function initalSetup (arr) {
        var tiles = $(".tiles");
        for (var index = 0; index < arr.length; index++) {
            var completedTile = tilePt1 + arr[index] + tilePt2 + index + tilePt3;
            $(completedTile).appendTo(tiles);
        }
        setBlankTemp();
    }
});
