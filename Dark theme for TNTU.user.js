// ==UserScript==
// @name         Dark theme for TNTU
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://dl.tntu.edu.ua/*
// @icon         https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Lesser_Coat_of_Arms_of_Ukraine.svg/1200px-Lesser_Coat_of_Arms_of_Ukraine.svg.png
// @grant        none
// ==/UserScript==
//
(function() {
    'use strict';
    // get element by xpath
    const getElementByXpath = (path) => document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    const head = document.getElementsByTagName('head')[0];

    const selector = document.getElementsByClassName('course-selector-a')[0]
    const dropdown = document.getElementsByClassName('course-selector-dropdown')[0]
    // set background color on hover
    selector.onmouseover = () => {
            selector.style.backgroundColor = 'transparent'
        }
    selector.onmouseout = () => {
            selector.style.backgroundColor = 'transparent'
        }
    dropdown.onmouseover = () => {
            selector.style.backgroundColor = 'transparent'
        }
    dropdown.onmouseout = () => {
            selector.style.backgroundColor = 'transparent'
        }

    // get all link tags from head
    const links = head.getElementsByTagName('link');
    const img = getElementByXpath('//*[@id="logo-site-logo"]/img')
    if(img)
        img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Lesser_Coat_of_Arms_of_Ukraine.svg/1200px-Lesser_Coat_of_Arms_of_Ukraine.svg.png'
        img.style = 'object-fit: contain'
    for (let i = 0; i < links.length; i++) {
        // if link tag is stylesheet
        if (links[i].href === 'https://dl.tntu.edu.ua/themes/Australia/css/styles.css?v=3.9'){
            // change href attribute
            links[i].remove();
    }
    }
    // Fetch the CSS file with GET request
    const request = new XMLHttpRequest();
    request.open('GET', 'https://raw.githubusercontent.com/Propsi4/Dark-theme-TNTU/main/styles.css', false);
    request.send(null);
    // Add the CSS to the head
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = `${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`
    style.innerHTML = request.responseText;
    head.appendChild(style);
    const dropdown_style = getElementByXpath('/html/body/div/div/div[1]/div/ul/style');
    if(dropdown_style)
        dropdown_style.innerHTML = '.course-selector-dropdown {backdrop-filter: blur(10px);border-radius: 0px 0px 5px 5px;position: absolute;display: none;z-index: 99999;}.course-selector-dropdown li {clear: both !important;display: block !important;padding: 2px 0;width: 100}.course-selector-dropdown li>a {display: block;width: 100%;color: white;}.course-selector-dropdown li>a:hover {text-decoration: none;}.course-selector-dropdown li:hover {background-color: #191919;}'
})();