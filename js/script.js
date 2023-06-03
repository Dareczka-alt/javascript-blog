
'use strict';

function titleClickHandler(event) {
  console.log('Link was clicked!');
  console.log(event);
  const span = ('span');
  sourceCapabilities: InputDeviceCapabilities;
  srcElement: span;
  target: span;
  timeStamp: 15021.600000143051;
  toElement: span;
  type: "click";
}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}




