function openFileDialog(accept, callback) {
    var inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = accept;
    inputElement.addEventListener("change", callback)
    inputElement.dispatchEvent(new MouseEvent("click"));
}

$("#pickGame").click(function() {
    var fileName = openFileDialog(".json,application/json", getFileData);
});

function getFileData(event) {
    var file = event.srcElement.files[0];
    var fr = new FileReader();
    fr.onloadend = loadGame;
    fr.readAsText(file);
}

function loadGame(event) {
    var d = JSON.parse(event.target.result);
    $("#pickGame").css("display", "none");
    $("#gameTitle").text(d.title);
    $("#gameAuthor").text("By: " + d.author);
    $(document).prop("title", d.title + " by " + d.author + " | A&Q");
    var i = 1;
    var maxClues = 0;
    // find the maximum number of clues
    for (var cat of d.categories) {
        if (cat.clues.length > maxClues) {
            maxClues = cat.clues.length;
        }
    }
    for (var cat of d.categories) {
        $("thead tr").append("<th></th>");
        $("thead tr th:nth-child(" + i + ")").text(cat.category);
        $("tbody").append("<tr></tr>");
        var row = $("tbody tr:nth-child(" + (i) + ")");
        for (var j = 0; j < cat.clues.length; j++) {
            row.append("<td></td>");
            var cell = $("tbody tr:nth-child(" + (i) + ") td:nth-child(" + (j + 1 + ")"));
            cell.text(cat.clues[j].points);
            cell.attr("data-answer", cat.clues[j].answer);
            cell.attr("data-question", cat.clues[j].question);
            cell.attr("data-points", cat.clues[j].points);
            cell.attr("data-category", cat.category);
            cell.attr("data-row", j + 1);
            cell.attr("data-col", i);
            cell.attr("data-dd", cat.clues[j].dailyDouble);
        }

        for (var k = cat.clues.length; k < maxClues; k++) {
            row.append("<td class='empty'></td>");
        }

        i++;
    }

    // Invert Table

    $("table tbody").each(function() {
        var $this = $(this);
        var newrows = [];
        $this.find("tr").each(function() {
            var i = 0;
            $(this).find("td").each(function() {
                i++;
                if (newrows[i] === undefined) {
                    newrows[i] = $("<tr></tr>");
                }
                newrows[i].append($(this));
            });
        });
        $this.find("tr").remove();
        $.each(newrows, function() {
            $this.append(this);
        });
    });


    $("tbody tr td:not(.empty)").click(function() {
        $("#activeCategory").text($(this).attr("data-category"));
        $("#activePoints").text($(this).attr("data-points"));
        $("#activeAnswer").text($(this).attr("data-answer"));
        $("#activeQuestion").text($(this).attr("data-question")).removeClass("visible");
        $("#activeRow").val($(this).attr("data-row"));
        $("#activeCol").val($(this).attr("data-col"));
        $("#activeDD").val($(this).attr("data-dd"));
        $("#activeClose").removeClass("visible");
        if ($(this).attr("data-dd")) {
            $("#currentTeam").text($(".hasControl").find(".teamName").text());
            $("#currentBank").text($(".hasControl").find(".score").text());
            $("#dailyDouble").modal({
                escapeClose: false,
                clickClose: false,
                fadeDuration: 250,
                fadeDelay: 0
            });
        } else {
            $("#activeClue").modal({
                escapeClose: false,
                clickClose: false,
                fadeDuration: 250,
                fadeDelay: 0
            });
        }
    });

    $("#activeClue").click(function() {
        $("#activeQuestion").addClass("visible");
        $("#activeClose").addClass("visible");
    });

    $("#ddShowClue").click(function(){
        $.modal.close();
        $("#activeClue").modal({
            escapeClose: false,
            clickClose: false,
            fadeDuration: 250,
            fadeDelay: 0
        });
    })

}

$("#activeClose").click(function() {
    $("tbody tr:nth-child(" + $("#activeRow").val() + ") td:nth-child(" + $("#activeCol").val() + ")")
        .addClass("viewed")
        .html("&nbsp;");
    $("#lastPoints").text($("#activePoints").text());
    $("#lastCategoryNum").text($("#activeCol").val());
    $("#ddIndicator").empty();
    if($("#activeDD").val()){
        $("#ddIndicator").text(" (DD)");
    }
    $.modal.close();
});


$(".add").click(function() {
    $(".scoreBox.template").clone(true)
        .removeClass("template")
        .appendTo(".scoreBoxContainer");
    if ($(".scoreBox:not(.template)").length == 1) {
        $(".scoreBox:not(.template)").addClass("hasControl");
    }
});

$(".teamName, .score, #lastPoints")
    .focus(function() {
        document.execCommand('selectAll', false, null);
    });

$(".remove").click(function() {
    $(".scoreBoxContainer .scoreBox:not(.template):last-child").remove();
});

$(".addPoints").click(function() {
    $(this).parent().parent().find(".score").text(
        parseInt($(this).parent().parent().find(".score").text()) +
        parseInt($("#lastPoints").text())
    );
    $(".scoreBox").removeClass("hasControl");
    $(this).closest(".scoreBox").addClass("hasControl");
});

$(".removePoints").click(function() {
    $(this).parent().parent().find(".score").text(
        parseInt($(this).parent().parent().find(".score").text()) -
        parseInt($("#lastPoints").text())
    )
});

$(".add").click();