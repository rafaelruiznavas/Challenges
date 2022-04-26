import { Game } from "./Game.js";

window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas1")
    const ctx = canvas.getContext("2d")

    const game = new Game(canvas)
    let lastTime = 0

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        game.update(deltaTime)
        game.draw(ctx)
        requestAnimationFrame(animate)
    }
    animate(0)

    var options = {
        root: document.querySelector("content-scroll"),
        rootMargin: "10%",
        threshold: 1.0
    };
    
    let observer = new IntersectionObserver(function (entries) {
        console.log('Entries', entries)
        entries.forEach((entry) => {
            if (entry.intersectionRatio > 0.8) {
                entry.target.classList.add("active");
                console.log('activa', entry.target.id)
                game.selected = entry.target.id
            }
        });
    }, options);
    
    let target = document.querySelectorAll(".section");
    target.forEach((item) => {
        observer.observe(item);
    });
})


