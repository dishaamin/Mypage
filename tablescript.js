/*
File: /weblab.cs.uml.edu/~damin/multiplication.html
91.461 Assignment: creating an Interactive Dynamic Table
Disha Amin, UMass Lowell Computer Science, disha_amin@student.uml.edu
Copyright (c) 2014 by Disha Amin. All rights reserved. May be freely
copied or excerpted for educational purposes with credit to the author.
updated by Disha Amin on October 23, 2014 at 11:22 AM
*/

var form = document.getElementById("theForm");
form.go.onclick = function () {
  // Create a table with rows and columns.
  var row, col;
  /* Please enter the value of rows and columns to create a table. */
  var rL = parseInt(form.rLow.value);
  var rH = parseInt(form.rHigh.value);
  var cL = parseInt(form.cLow.value);
  var cH = parseInt(form.cHigh.value);
  var div = document.getElementById("error") ; 
  var errorDiv = document.getElementById("error") ;
  if (isNaN(rL) || isNaN(rH) || isNaN(cL) || isNaN(cH)) {
    return;
  }
  // The table will be created after the user enters the value for rows and columns.
  // The error message will be displayed if the entered value is invalid.
  var rows = rH - rL + 1;
  var cols = cH - cL + 1;
  if (rows < 1 || rows > 100 || cols < 1 || cols > 100) {
    errorDiv.innerHTML="Make sure that the start number is larger than the end number."// comment and make changes (unable to do error check)
    return;
  }

	
	
  
  var div = document.getElementById("result");
  // If we had a table before, get rid of it.
  if (div.firstChild != null) {
    div.removeChild(div.firstChild);
  }

  var tbl = document.createElement("table");
  tbl.id = "theTable";

  // blank top left cell
  row = tbl.insertRow();
  row.insertCell();
  for (var c = cL; c <= cH; ++c) {
    col = row.insertCell();
    col.innerHTML = c;
  }

  // Generate the HTML for the table
  // r is the row number
  // c is the column number
  for (var r = rL; r <= rH; ++r) {
    row = tbl.insertRow();
    col = row.insertCell();
    col.innerHTML = r;
    for (var c = cL; c <= cH; ++c) {
      var col = row.insertCell();
      col.innerHTML = r * c;
    }
  }
  div.appendChild(tbl);
}

