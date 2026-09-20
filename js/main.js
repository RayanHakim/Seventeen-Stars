let starSystem;

let story;

let backgroundMusic;

let musicStarted = false;


function setup() {

    createCanvas(
        windowWidth,
        windowHeight
    );


    pixelDensity(1);


    starSystem =
        new StarSystem();


    story =
        new Story();


    backgroundMusic =
        document.getElementById(
            "background-music"
        );


    if (backgroundMusic) {

        backgroundMusic.loop = true;

        backgroundMusic.volume = 0.35;

    }


    story.start();

}


function draw() {

    background(
        2,
        2,
        4
    );


    drawAmbientBackground();


    starSystem.update();

    starSystem.updateHover();

    starSystem.display();


    story.update();

}


function drawAmbientBackground() {

    noStroke();


    for (
        let i = 0;
        i < 20;
        i++
    ) {

        const x =
            (i * 173) %
            width;

        const y =
            (i * 97) %
            height;

        const pulse =
            sin(
                frameCount *
                0.01 +
                i
            );


        fill(
            255,
            255,
            255,
            8 + pulse * 3
        );


        circle(
            x,
            y,
            1.5
        );

    }

}


function startMusic() {

    if (
        !backgroundMusic ||
        musicStarted
    ) {

        return;

    }


    const promise =
        backgroundMusic.play();


    if (
        promise !== undefined
    ) {

        promise
            .then(() => {

                musicStarted =
                    true;

            })
            .catch(() => {

                console.log(
                    "Music menunggu interaksi user."
                );

            });

    }

}


function mousePressed() {

    startMusic();

    story.handleClick();

}


function touchStarted() {

    startMusic();

    story.handleClick();

    return false;

}


function windowResized() {

    resizeCanvas(
        windowWidth,
        windowHeight
    );

}