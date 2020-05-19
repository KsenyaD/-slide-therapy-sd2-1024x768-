const scroll = document.querySelector('.scroll');
const ellipse1 = document.getElementById('ellipse1');
const ellipse2 = document.getElementById('ellipse2');
const ellipse3 = document.getElementById('ellipse3');
const contentWindowOne = document.querySelector('.content__window-one');
const windowThree = document.querySelector('.window-three');
const windowFour = document.querySelector('.window-four');
const windowFive = document.querySelector('.window-five');
const slider = document.querySelector('.slider');
const next = document.querySelector('.next');
let currentHorizontalIndex = 0;
let currentVerticalIndex = 0;
let mouseTouchStartY = undefined;
let horizontalScrollBlocked = false;

(function addWindowListeners() {
    window.addEventListener('touchstart', e => {
        const touchObj = e.changedTouches[0];
        if (currentHorizontalIndex === 0 || currentVerticalIndex !== 2) {
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
        const touchObj = e.changedTouches[0];
        const diff = mouseTouchStartY - parseInt(touchObj.clientY);
        updateVerticalIndex(diff);
        moveWindowOneForParallaxEffect();
        updateEllipse();
        hideNext(currentVerticalIndex > 0);
    });
    updateEllipse();
})();

function updateVerticalIndex(diff) {
    if (diff > 80) {
        if (currentVerticalIndex < 2) {
            currentVerticalIndex++;
            scroll.style.transform = `translateY(-${currentVerticalIndex}00vh)`;
            mouseTouchStartY = undefined;
        }
    } else if (diff < -80) {
        if (currentVerticalIndex > 0) {
            currentVerticalIndex--;
            scroll.style.transform = `translateY(-${currentVerticalIndex}00vh)`;
            mouseTouchStartY = undefined;
        }
    }
}

function hideNext(hide) {
    if (hide) {
        next.classList.add('next_close')
    } else {
        next.classList.remove('next_close')
    }
}

function updateEllipse() {
    switch (currentVerticalIndex) {
        case 0 : {
            ellipse1.classList.add('ellipse-orange');
            ellipse2.classList.remove('ellipse-orange');
            break;
        }
        case 1: {
            ellipse2.classList.add('ellipse-orange');
            ellipse1.classList.remove('ellipse-orange');
            ellipse3.classList.remove('ellipse-orange');
            break;
        }
        case 2: {
            ellipse3.classList.add('ellipse-orange');
            ellipse2.classList.remove('ellipse-orange');
            break;
        }
    }
}

function moveWindowOneForParallaxEffect() {
    if (currentVerticalIndex === 1) {
        contentWindowOne.style.transform = `translateY(-010vh)`;
    } else {
        contentWindowOne.style.transform = `translateY(-000vh)`;
    }
}

function updateHorizontalPosition(index) {
    blockHorizontalScrollOnTimeout();
    switch (index) {
        case 0: {
            windowThree.style.transform = 'translateX(000px)';
            windowFour.style.transform = 'translateX(-100vw)';
            windowFive.style.transform = 'translateX(-100vw)';
            break;
        }
        case 1: {
            windowThree.style.transform = 'translateX(100vw)';
            windowFour.style.transform = 'translateX(000vw)';
            windowFive.style.transform = 'translateX(-100vw)';
            break;
        }
        case 2: {
            windowThree.style.transform = 'translateX(100vw)';
            windowFour.style.transform = 'translateX(100vw)';
            windowFive.style.transform = 'translateX(000vw)';
            break;
        }
    }
}

function blockHorizontalScrollOnTimeout() {
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

    const horizontalPosition = currentHorizontalIndex;
    const valueSlider = slider.value;

    if (valueSlider > 80) {
        currentHorizontalIndex = 0;
    } else if (valueSlider <= 80 && valueSlider > 30) {
        currentHorizontalIndex = 1;
    } else {
        currentHorizontalIndex = 2;
    }
    if (Math.abs(currentHorizontalIndex - horizontalPosition) === 2) {
        currentHorizontalIndex = 1
    }
    if (currentHorizontalIndex !== horizontalPosition) {
        updateHorizontalPosition(currentHorizontalIndex)
    }
}
