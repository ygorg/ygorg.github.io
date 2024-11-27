function offset(el) {
  //https://youmightnotneedjquery.com/#offset
  box = el.getBoundingClientRect();
  docElem = document.documentElement;
  return {
    top: box.top + window.pageYOffset - docElem.clientTop,
    left: box.left + window.pageXOffset - docElem.clientLeft
  };
}

function makeItBouncy(selecteur) {
    [...document.querySelectorAll(selecteur)].forEach((elt) => {
        elt.addEventListener('mousemove', (e) => {
            if (elt.isAlreadyAnimating) {
                return;
            }

            const baseExpX = 9, baseExpY = 5;

            // position of mouse on the screen
            const mouse = {x: e.pageX, y: e.pageY};

            // position of element on the screen
            let elem = offset(elt);
            // position of center of element on the screen
            elem = {x: elem.left + elt.offsetWidth / 2, y: elem.top + elt.offsetHeight / 2}

            // distance between mouse and elem
            const dx = mouse.x - elem.x,
                dy = mouse.y - elem.y;
            // percentage of distance according to elem size
            const px = dx / elt.offsetWidth,
                py = dy / elt.offsetHeight;

            // new top/left positions
            const nx = Math.round(Math.pow(2, Math.abs(px) * baseExpX)) * (px < 0 ? -1 : 1),
                ny = Math.round(Math.pow(2, Math.abs(py) * baseExpY)) * (py < 0 ? -1 : 1);
            
            elt.style.transform = `translateX(${nx}px) translateY(${ny}px)`;
        });

        elt.addEventListener('mouseout', (e) => {
            const translate = /translateX\((.*)px\) translateY\((.*)px\)/g.exec(elt.style.transform);
            const pos = {
                x: parseInt(translate[1], 10),
                y: parseInt(translate[2], 10)
            };

            elt.isAlreadyAnimating = true;

            let b = elt.animate([
                {transform: `translateX(${Math.round(pos.x * .75)}px) translateY(${Math.round(pos.y * .75)}px)`},
                {transform: `translateX(${Math.round(pos.x * -.5)}px) translateY(${Math.round(pos.y * -.5)}px)`},
                {transform: `translateX(${Math.round(pos.x * .25)}px) translateY(${Math.round(pos.y * .25)}px)
                `},
                {transform: `translateX(${Math.round(0)}px) translateY(${Math.round(0)}px)`}
            ], {
                duration: 75,
            }).onfinish = (event) => {
                elt.isAlreadyAnimating = false;
                elt.style.transform = "";
            };
        });
    });
}