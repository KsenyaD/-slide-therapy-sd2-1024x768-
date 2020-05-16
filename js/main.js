let currentHorizontalPosition = 0;
let index = 0;

function updateEllipse() {
    const ellipse1 = document.getElementById("ellipse1");
    const ellipse2 = document.getElementById("ellipse2");
    const ellipse3 = document.getElementById("ellipse3");
    switch (index) {
        case 0 : {
            ellipse1.classList.add('ellipse-orange');
            ellipse2.classList.remove('ellipse-orange');
            break
        }
        case 1: {
            ellipse2.classList.add('ellipse-orange');
            ellipse1.classList.remove('ellipse-orange');
            ellipse3.classList.remove('ellipse-orange');
            break
        }
        case 2: {
            ellipse3.classList.add('ellipse-orange');
            ellipse2.classList.remove('ellipse-orange');
            break
        }
    }
}

(function scrollWindowVertical() {
    let mouseTouchY = undefined;
    const scroll = document.querySelector('.scroll');

    window.addEventListener('touchstart', e => {
        let touchObj = e.changedTouches[0]; // первая точка прикосновения
        if (currentHorizontalPosition === 0) {
            mouseTouchY = parseInt(touchObj.clientY);
        }
    });

    window.addEventListener('touchend', e => {
        mouseTouchY = undefined;
    });

    window.addEventListener('touchmove', e => {
        if (mouseTouchY === undefined) {
            return;
        }
        let touchObj = e.changedTouches[0];
        const diff = mouseTouchY - parseInt(touchObj.clientY);

        if (diff > 80) {
            if (index < 2) {
                index++;
                scroll.style.transform = `translateY(-${index}00vh)`;
                mouseTouchY = undefined;
            }
        } else if (diff < -80) {
            if (index > 0) {
                index--;
                scroll.style.transform = `translateY(-${index}00vh)`;
                mouseTouchY = undefined;
            }
        }
        updateEllipse()
    });
    updateEllipse()
})();

function updateWindows(index) {
    const windowTree = document.querySelector('.window-tree');
    const windowFour = document.querySelector('.window-four');
    const windowFive = document.querySelector('.window-five');

    switch (index) {
        case 0: {
            windowTree.style.transform = "translateX(000px)";
            windowFour.style.transform = "translateX(-100vw)";
            windowFive.style.transform = "translateX(-100vw)";
            break
        }
        case 1: {
            windowTree.style.transform = "translateX(100vw)";
            windowFour.style.transform = "translateX(000vw)";
            windowFive.style.transform = "translateX(-100vw)";
            break
        }
        case 2: {
            windowTree.style.transform = "translateX(100vw)";
            windowFour.style.transform = "translateX(100vw)";
            windowFive.style.transform = "translateX(000vw)";
            break
        }
    }
}

function scrollWindowHorizontal() {

    const slider = document.querySelector('.slider');
    let valueSlider = slider.value;

    if (valueSlider > 80) {
        currentHorizontalPosition = 0;
    } else if (valueSlider <= 80 && valueSlider > 30) {
        currentHorizontalPosition = 1;
    } else {
        currentHorizontalPosition = 2;
    }

    updateWindows(currentHorizontalPosition)
}
