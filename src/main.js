import update from './update.js';
import scrollama from "scrollama";

update();

function init() {
    var scrolly = document.querySelector("#scrolly");
    var article = scrolly.querySelector("article");
    var step = article.querySelectorAll(".step");
    step.forEach(function(step) {
        var v = 100 + Math.floor((Math.random() * window.innerHeight) / 4);
        step.style.padding = v + "px 0px";
      });

    // instantiate the scrollama
    const scroller = scrollama();

    // setup the instance, pass callback functions
    scroller
        .setup({
            step: "#scrolly article .step",
            debug: true,
            offset: 0.5
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit)

    // setup resize event
    window.addEventListener("resize", scroller.resize)

}

function handleStepEnter(response) {
    // response = { element, direction, index }
    console.log(response);
    // add to color to current step
    response.element.classList.add("is-active");
  }

  function handleStepExit(response) {
    // response = { element, direction, index }
    console.log(response);
    // remove color from current step
    response.element.classList.remove("is-active");
  }
init()
console.log('after init');
