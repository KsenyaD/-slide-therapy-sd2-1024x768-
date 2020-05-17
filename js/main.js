let currentHorizontalPosition = 0;
let currentVerticalPosition = 0;
let mouseTouchStartY = undefined;
let horizontalScrollBlocked = false;

function hidingNex() {
    const next = document.querySelector('.next');
    if (currentVerticalPosition > 0) {
        next.classList.add('next_close')
    } else {
        next.classList.remove('next_close')
    }
}

function updateEllipse() {
    const ellipse1 = document.getElementById("ellipse1");
    const ellipse2 = document.getElementById("ellipse2");
    const ellipse3 = document.getElementById("ellipse3");
    switch (currentVerticalPosition) {
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


function parallaxEffect() {
    const contentWindowOne = document.querySelector('.content__window-one');
    if (currentVerticalPosition === 1) {
        contentWindowOne.style.transform = `translateY(-010vh)`;
    } else {
        contentWindowOne.style.transform = `translateY(-000vh)`;
    }
}

(function scrollWindowVertical() {

    const scroll = document.querySelector('.scroll');

    window.addEventListener('touchstart', e => {
        let touchObj = e.changedTouches[0]; // первая точка прикосновения
        if (currentHorizontalPosition === 0 || currentVerticalPosition !== 2) {
            mouseTouchStartY = parseInt(touchObj.clientY);
        }
    });

    window.addEventListener('touchend', e => {
        mouseTouchStartY = undefined;
    });

    window.addEventListener('touchmove', e => {
        if (mouseTouchStartY === undefined) {
            return;
        }
        let touchObj = e.changedTouches[0];
        const diff = mouseTouchStartY - parseInt(touchObj.clientY);

        if (diff > 80) {
            if (currentVerticalPosition < 2) {
                currentVerticalPosition++;
                scroll.style.transform = `translateY(-${currentVerticalPosition}00vh)`;
                mouseTouchStartY = undefined;
            }
        } else if (diff < -80) {
            if (currentVerticalPosition > 0) {
                currentVerticalPosition--;
                scroll.style.transform = `translateY(-${currentVerticalPosition}00vh)`;
                mouseTouchStartY = undefined;
            }
        }
        parallaxEffect();
        updateEllipse();
        hidingNex();
    });
    updateEllipse();
})();

function updateHorizontalPosition(index) {
    blockHorizontalScroll();
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

function blockHorizontalScroll() {
    horizontalScrollBlocked = true;
    setTimeout(() => {
        horizontalScrollBlocked = false;
        scrollWindowHorizontal()
    }, 1000);
}

function scrollWindowHorizontal() {
    mouseTouchStartY = undefined;

    if (horizontalScrollBlocked) {
        return;
    }

    const slider = document.querySelector('.slider');
    const horizontalPosition = currentHorizontalPosition;
    let valueSlider = slider.value;

    if (valueSlider > 80) {
        currentHorizontalPosition = 0;
    } else if (valueSlider <= 80 && valueSlider > 30) {
        currentHorizontalPosition = 1;
    } else {
        currentHorizontalPosition = 2;
    }

    if (Math.abs(currentHorizontalPosition - horizontalPosition) === 2) {
        currentHorizontalPosition = 1
    }

    if (currentHorizontalPosition !== horizontalPosition) {
        updateHorizontalPosition(currentHorizontalPosition)
    }

}
