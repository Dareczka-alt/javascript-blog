'use strict';

function titleClickHandler(event) {
    console.log('Link was clicked!');
    console.log(event);
    sourceCapabilities: InputDeviceCapabilities
    srcElement: span
    target: span
    timeStamp: 5530.530000000001
    toElement: span
    type: "click"


    /* remove class 'active' from all article links  */

    /* add class 'active' to the clicked link */

    /* remove class 'active' from all articles */

    /* get 'href' attribute from the clicked link */

    /* find the correct article using the selector (value of 'href' attribute) */

    /* add class 'active' to the correct article */
}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}