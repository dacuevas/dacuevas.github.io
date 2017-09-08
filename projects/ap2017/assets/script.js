/*****************************************************************
 * Load data
*****************************************************************/
var player_data = {};
$(document).ready(function(){
    $.ajax("assets/player.tsv").done(function(pdata){
        fill_table_players(pdata);
        $.ajax("assets/team.tsv").done(function(tdata){
            fill_table_teams(tdata);
            // Bind table sorting and
            // preset sort for wins in descending order (column 4)
            // then sort by division (column 3)
            // then sort by ties (column 6)
            $("#table_teams").tablesorter({sortList: [[3, 1],
                                                      [2, 1],
                                                      [5, 1]]
            });
        });
    });
});

function fill_table_teams(data) {
    var table_data = {};
    data = data.split("\n");
    for (i = 1; i <= 32; ++i) {
        ll = data[i].split("\t");
        table_data[ll[0]] = ll.slice(1);
    }
    var html = "";
    for (var team in table_data) {
        var cl;
        switch (player_data[team]) {
            case "Bryan":
                cl = "bryan";
                break;
            case "Daniel":
                cl = "daniel";
                break;
            case "Dorothy":
                cl = "dorothy";
                break;
            case "Gabri":
                cl = "gabri";
                break;
            case "Martin":
                cl = "martin";
                break;
            case "Meg":
                cl = "meg";
                break;
            case "Paula":
                cl = "paula";
                break;
            default:
                cl = "vic";
        }
        html += "<tr>";
        html += "<td id=\"" + cl + "\" class=\"" + cl + "\">" + team + "</td>";
        for (var i of table_data[team]) {
            html += "<td>" + i + "</td>";
        }
        html += "</tr>";
    }
    $("#table_teams > tbody:last-child").append(html);
}

function fill_table_players(data) {
    var table_data = {};
    data = data.split("\n");
    for (i = 1; i <= 8; ++i) {
        ll = data[i].split("\t");
        table_data[ll[0]] = ll.slice(1);
    }
    var order_of_players = ["Bryan", "Daniel", "Dorothy", "Gabri",
                            "Martin", "Meg", "Paula", "Vic"];
    var html = "";
    for (i = 0; i < 4; ++i) {
        html += "<tr>";
        for (var p of order_of_players) {
            var team = table_data[p][i];
            html += "<td><a href=\"https:www.google.com/search?q=" + team +
                " score\" target=\"_blank\">" + team + "</a></td>";
            player_data[team] = p;
        }
        html += "</tr>";
    }
    $("#table_players > tbody:last-child").append(html);
}


/*****************************************************************
 * Bindings
*****************************************************************/
function highlight(who) {
    $("#table_teams").find("td:not(." + who + ")").attr("class", "noname");
    $("td[id=" + who + "]").attr("class", who);
}

function reset_highlight() {
    var players = ["bryan", "daniel", "dorothy", "gabri",
                   "martin", "meg", "paula", "vic"];
    for (p of players) {
        $("[id=" + p + "]").attr("class", p);
    }
}
