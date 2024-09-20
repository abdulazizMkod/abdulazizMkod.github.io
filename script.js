const planets = document.querySelectorAll('.planet');
planets.forEach((planet, index) => {
    planet.style.animationDuration = `${5 + index * 2}s`;
    planet.style.transform = `rotate(${index * 120}deg)`;
});