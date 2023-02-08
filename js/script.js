'use strict';

window.addEventListener('DOMContentLoaded', () => {
    // UI Components
    const animationContainer = document.querySelector("#animationContainer"),
          heading = document.querySelector('#heading');



    // functions

    // auxiliary variables
    const birthday = new Date(`${new Date().getFullYear()}-9-21T00:00:00.000Z`);

    const toCountingData = (endData) => {
        const timeline = Date.parse(endData) - Date.parse(new Date()),
              days = Math.floor(timeline / (3600 * 24 * 1000)),
              hours = Math.floor((timeline / (3600 * 1000)) % 24),
              minutes = Math.floor((timeline / (1000 * 60)) % 60),
              seconds = Math.floor((timeline / 1000) % 60);

        return {
            timeline, days, hours, minutes, seconds
        }
    };

    const addZero = (num) => {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    };

    const setClock = (selector, endData) => {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds');
        let timeInterval = setInterval(updateTimer, 1000);

        updateTimer();

        function updateTimer() {
            const t = toCountingData(endData);

            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            t.timeline <= 0 ? clearInterval(timeInterval) : true;
        }
    };

    setClock('#timer', birthday);

    const animation = bodymovin.loadAnimation({
        container: animationContainer,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "animations/birthday.json",
    });

    const letters = heading.textContent.split('');
    heading.innerHTML = '';
    letters.forEach(letter => {
        const span = document.createElement('span');
        span.textContent = letter;
        heading.append(span);
    });

    gsap.from(heading.children, {
        duration: 1,
        opacity: 0,
        ease: "power3.out",
        stagger: 0.05
    });
    gsap.to(heading.children, {
        duration: 1,
        rotation: 360,
        ease: "power3.out",
        stagger: 0.05
    });
});
