let currentSlidePosition = 0;

(function scrollWindowVertical() {
    let index = 0;
    let y = undefined;
    const scroll = document.querySelector('.scroll');

    window.addEventListener('mousedown', e => {
        if (currentSlidePosition === 0) {
            y = e.offsetY;
        }
    });

    window.addEventListener('mouseup', e => {
        y = undefined;
    });

    window.addEventListener('mousemove', e => {
        if (y === undefined) {
            return;
        }
        const diff = y - e.offsetY;

        if (diff > 80) {
            if (index < 2) {
                index++;
                scroll.style.transform = `translateY(-${index}00vh)`;
                y = undefined;
            }
        } else if (diff < -80) {
            if (index > 0) {
                index--;
                scroll.style.transform = `translateY(-${index}00vh)`;
                y = undefined;
            }
        }
    })
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
        currentSlidePosition = 0;
    } else if (valueSlider <= 80 && valueSlider > 30) {
        currentSlidePosition = 1;
    } else {
        currentSlidePosition = 2;
    }

    updateWindows(currentSlidePosition)
}
