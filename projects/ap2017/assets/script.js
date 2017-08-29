/*****************************************************************
 * Load data
*****************************************************************/
var player_data = {};
$(document).ready(function(){
    fill_table_players();
    fill_table_teams();
});

function fill_table_teams() {
    var table_data = {};
    $.ajax("assets/team.tsv", {async:false})
        .done(function(data) {
            data = data.split("\n");
            for (i = 1; i <= 32; ++i) {
                ll = data[i].split("\t");
                table_data[ll[0]] = ll.slice(1);
            }
        });
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
                html += "<td class=\"" + cl + "\">" + team + "</td>";
                for (var i of table_data[team]) {
                    html += "<td>" + i + "</td>";
                }
                html += "</tr>";
            }
            $("#table_teams > tbody:last-child").append(html);
}

function fill_table_players() {
    var table_data = {};
    $.ajax('assets/player.tsv',{async:false})
        .done(function(data) {
            data = data.split("\n");
            for (i = 1; i <= 8; ++i) {
                ll = data[i].split("\t");
                table_data[ll[0]] = ll.slice(1);
            }
        });
    var order_of_players = ["Bryan", "Daniel", "Dorothy", "Gabri",
                            "Martin", "Meg", "Paula", "Vic"];
    var html = "";
    for (i = 0; i < 4; ++i) {
        html += "<tr>";
        for (var p of order_of_players) {
            var team = table_data[p][i];
            html += "<td>" + team + "</td>";
            player_data[team] = p;
        }
        html += "</tr>";
    }
    $("#table_players > tbody:last-child").append(html);
}

function sortTable(n, id) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById(id);
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
