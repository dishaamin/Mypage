// File: http://weblab.cs.uml.edu/~damin/assignment7/navigation.js
// 91.461 Assignment: Creating a Single-Page Navigation Interface
// Disha Amin, UMass Lowell Computer Science, disha_amin@student.uml.edu
// Copyright (c) 2014 by Disha Amin. All rights reserved. May be freely
// copied or excerpted for educational purposes with credit to the author.
// updated by Disha Amin on November 6, 2014 at 11:22 AM
// This script implements simple routing by loading partial HTML files 
// named corresponding to fragment identifiers.
//
// https://github.com/curran/screencasts/tree/gh-pages/navigation/examples/code
// Some code have been use from a Curran Kelleher from above URL
// Wrap everything in an immediately invoked function expression,
// so no global variables are introduced.
(function() {
        // Stores the cached partial HTML pages.
        // Keys correspond to fragment identifiers.
        // Values are the text content of each loaded partial HTML file.
        var partialsCache = {}
            // Encapsulates an HTTP GET request using XMLHttpRequest.
            // Fetches the file at the given path, then
            // calls the callback with the text content of the file.

        function fetchFile(path, callback) {
                // Create a new AJAX request for fetching the partial HTML file.
                var request = new XMLHttpRequest();
                // Call the callback with the content loaded from the file.
                request.onload = function() {
                    callback(request.responseText);
                };
                // Fetch the partial HTML file for the given fragment id.
                request.open("GET", path);
                request.send(null);
            }
            // Gets the appropriate content for the given fragment identifier.
            // This function implements a simple cache.

        function getContent(fragmentId, callback) {
                // If the page has been fetched before,
                if (partialsCache[fragmentId]) {
                    // pass the previously fetched content to the callback.
                    callback(partialsCache[fragmentId]);
                } else {
                    // If the page has not been fetched before, fetch it.
                    fetchFile(fragmentId + ".html", function(content) {
                        // Store the fetched content in the cache.
                        partialsCache[fragmentId] = content;
                        // Pass the newly fetched content to the callback.
                        callback(content);
                    });
                }
            }
            // Sets the "active" class on the active navigation link.

        function setActiveLink(fragmentId) {
                var navbarDiv = document.getElementById("navbar"),
                    links = navbarDiv.children,
                    i, link, pageName;
                for (i = 0; i < links.length; i++) {
                    link = links[i];
                    pageName = link.getAttribute("href").substr(1);
                    if (pageName === fragmentId) {
                        link.setAttribute("class", "active");
                    } else {
                        link.removeAttribute("class");
                    }
                }
            }
            // Updates dynamic content based on the fragment identifier.

        function navigate() {
                // Get a reference to the "content" div.
                var contentDiv = document.getElementById("content"),
                    // Isolate the fragment identifier using substr.
                    // This gets rid of the "#" character.
                    fragmentId = location.hash.substr(1);
                // Set the "content" div innerHTML based on the fragment identifier.
                getContent(fragmentId, function(content) {
                    contentDiv.innerHTML = content;
                });
                // Toggle the "active" class on the link currently navigated to.
                setActiveLink(fragmentId);
            }
            // If no fragment identifier is provided,
        if (!location.hash) {
            // default to #home.
            location.hash = "#home";
        }
        // Navigate once to the initial fragment identifier.
        navigate();
        // Navigate whenever the fragment identifier value changes.
        window.addEventListener("hashchange", navigate)
    }
    ());