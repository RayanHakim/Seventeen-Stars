class ProjectCharterScene {

    constructor() {

        this.month = "SEPTEMBER 2026";
        this.title = "PROJECT CHARTER";
        this.subtitle = "An idea was ready to be presented.";

        this.buttonText = "CONTINUE";

        this.state = "intro";

        this.slideIndex = 0;

        this.hoverPresent = false;
        this.hoverNext = false;

        this.presentationStarted = false;
        this.presentationComplete = false;

        this.fade = 0;
        this.screenGlow = 0;

        this.slideTitles = [
            "PROBLEM",
            "SOLUTION",
            "IMPACT"
        ];

        this.slideTexts = [
            "A manual process needed a better way.",
            "A digital process was prepared.",
            "A clearer workflow. A simpler verification."
        ];

        this.particles = [];

        this.createParticles();
    }


    // =========================================================
    // ENTER
    // =========================================================

    enter() {

        this.state = "intro";

        this.slideIndex = 0;

        this.presentationStarted = false;
        this.presentationComplete = false;

        this.fade = 0;
        this.screenGlow = 0;

        this.createParticles();

        if (typeof starSystem !== "undefined") {
            starSystem.hideAll();
        }
    }


    // =========================================================
    // EXIT
    // =========================================================

    exit() {

        if (typeof starSystem !== "undefined") {
            starSystem.showAll();
        }
    }


    // =========================================================
    // PARTICLES
    // =========================================================

    createParticles() {

        this.particles = [];

        for (let i = 0; i < 35; i++) {

            this.particles.push({
                x: random(width),
                y: random(height),
                size: random(1, 2.5),
                speed: random(0.1, 0.35),
                alpha: random(30, 100)
            });
        }
    }


    updateParticles() {

        for (const particle of this.particles) {

            particle.y -= particle.speed;

            if (particle.y < 0) {
                particle.y = height;
                particle.x = random(width);
            }
        }
    }


    // =========================================================
    // UPDATE
    // =========================================================

    update() {

        this.updateParticles();

        if (this.state === "presentation") {

            this.screenGlow += 0.025;

            if (this.screenGlow > TWO_PI) {
                this.screenGlow -= TWO_PI;
            }
        }

        if (this.state === "complete") {

            this.fade = lerp(this.fade, 1, 0.035);
        }
    }


    // =========================================================
    // DISPLAY
    // =========================================================

    display() {

        this.drawAtmosphere();

        if (this.state === "intro") {

            this.drawRoom();
            this.drawIntro();
        }

        else if (this.state === "presentation") {

            this.drawRoom();
            this.drawPresentation();
        }

        else if (this.state === "complete") {

            this.drawRoom();
            this.drawComplete();
        }
    }


    // =========================================================
    // ATMOSPHERE
    // =========================================================

    drawAtmosphere() {

        noStroke();

        for (const particle of this.particles) {

            fill(
                150,
                190,
                255,
                particle.alpha
            );

            circle(
                particle.x,
                particle.y,
                particle.size
            );
        }
    }


    // =========================================================
    // ROOM
    // =========================================================

    drawRoom() {

        const centerX = width / 2;

        // Floor
        noStroke();

        fill(8, 10, 18);

        rect(
            0,
            height * 0.76,
            width,
            height * 0.24
        );


        // Floor line

        stroke(60, 75, 110, 80);

        line(
            width * 0.12,
            height * 0.76,
            width * 0.88,
            height * 0.76
        );


        // Table

        noStroke();

        fill(12, 15, 25);

        rect(
            width * 0.18,
            height * 0.68,
            width * 0.64,
            height * 0.06,
            5
        );


        // Table edge

        fill(25, 30, 45);

        rect(
            width * 0.18,
            height * 0.68,
            width * 0.64,
            3
        );


        // Presenter

        fill(30, 38, 58);

        circle(
            centerX,
            height * 0.58,
            24
        );

        rect(
            centerX - 13,
            height * 0.60,
            26,
            55,
            8
        );


        // Audience silhouettes

        const audience = [
            width * 0.27,
            width * 0.37,
            width * 0.63,
            width * 0.73
        ];

        for (const x of audience) {

            fill(10, 13, 22);

            circle(
                x,
                height * 0.65,
                22
            );

            rect(
                x - 15,
                height * 0.67,
                30,
                40,
                8
            );
        }
    }


    // =========================================================
    // SCREEN
    // =========================================================

    drawScreen() {

        const screenW = min(width * 0.62, 720);
        const screenH = screenW * 0.55;

        const screenX = width / 2;
        const screenY = height * 0.36;

        const glow =
            35 +
            sin(this.screenGlow) * 10;


        // Screen glow

        noStroke();

        fill(
            80,
            150,
            255,
            glow
        );

        rect(
            screenX - screenW / 2 - 10,
            screenY - screenH / 2 - 10,
            screenW + 20,
            screenH + 20,
            8
        );


        // Screen frame

        fill(18, 22, 34);

        rect(
            screenX - screenW / 2,
            screenY - screenH / 2,
            screenW,
            screenH,
            5
        );


        // Screen

        fill(5, 9, 17);

        rect(
            screenX - screenW / 2 + 8,
            screenY - screenH / 2 + 8,
            screenW - 16,
            screenH - 16,
            3
        );


        return {
            x: screenX,
            y: screenY,
            w: screenW,
            h: screenH
        };
    }


    // =========================================================
    // INTRO
    // =========================================================

    drawIntro() {

        const screen = this.drawScreen();

        textAlign(CENTER, CENTER);

        noStroke();

        // Small screen label

        fill(130, 155, 200);

        textSize(11);

        text(
            "PRESENTATION",
            screen.x,
            screen.y - 48
        );


        // Main title

        fill(235, 240, 250);

        textSize(
            min(width * 0.045, 30)
        );

        text(
            "PROJECT CHARTER",
            screen.x,
            screen.y - 8
        );


        // Description

        fill(130, 145, 170);

        textSize(13);

        text(
            "From building the idea...",
            screen.x,
            screen.y + 28
        );

        text(
            "to standing in front of the room.",
            screen.x,
            screen.y + 48
        );


        // Present button

        const buttonW = 150;
        const buttonH = 44;

        const buttonX = width / 2;
        const buttonY = height * 0.84;

        this.hoverPresent = this.isInside(
            mouseX,
            mouseY,
            buttonX,
            buttonY,
            buttonW,
            buttonH
        );


        this.drawButton(
            buttonX,
            buttonY,
            buttonW,
            buttonH,
            "PRESENT",
            this.hoverPresent
        );
    }


    // =========================================================
    // PRESENTATION
    // =========================================================

    drawPresentation() {

        const screen = this.drawScreen();

        const title = this.slideTitles[this.slideIndex];
        const description = this.slideTexts[this.slideIndex];


        textAlign(CENTER, CENTER);

        // Slide number

        noStroke();

        fill(100, 125, 170);

        textSize(11);

        text(
            `SLIDE ${this.slideIndex + 1} / ${this.slideTitles.length}`,
            screen.x,
            screen.y - 60
        );


        // Slide title

        fill(235, 240, 250);

        textSize(
            min(width * 0.06, 38)
        );

        text(
            title,
            screen.x,
            screen.y - 15
        );


        // Slide description

        fill(135, 155, 185);

        textSize(13);

        text(
            description,
            screen.x,
            screen.y + 30
        );


        // Progress indicators

        for (let i = 0; i < this.slideTitles.length; i++) {

            const x =
                screen.x +
                (i - 1) * 22;

            if (i === this.slideIndex) {

                fill(120, 180, 255);
            }

            else {

                fill(70, 85, 110);
            }

            circle(
                x,
                screen.y + 70,
                i === this.slideIndex ? 7 : 5
            );
        }


        // Next slide button

        const buttonW = 150;
        const buttonH = 44;

        const buttonX = width / 2;
        const buttonY = height * 0.84;

        this.hoverNext = this.isInside(
            mouseX,
            mouseY,
            buttonX,
            buttonY,
            buttonW,
            buttonH
        );


        const label =
            this.slideIndex <
            this.slideTitles.length - 1
                ? "NEXT SLIDE"
                : "FINISH";


        this.drawButton(
            buttonX,
            buttonY,
            buttonW,
            buttonH,
            label,
            this.hoverNext
        );
    }


    // =========================================================
    // COMPLETE
    // =========================================================

    drawComplete() {

        const screen = this.drawScreen();

        textAlign(CENTER, CENTER);

        noStroke();


        // Glow

        const glowAlpha =
            80 +
            sin(frameCount * 0.04) * 20;

        fill(
            100,
            170,
            255,
            glowAlpha
        );

        circle(
            screen.x,
            screen.y - 10,
            7
        );


        // Main text

        fill(235, 240, 250);

        textSize(
            min(width * 0.055, 34)
        );

        text(
            "PRESENTATION COMPLETE",
            screen.x,
            screen.y - 20
        );


        // Subtext

        fill(135, 155, 185);

        textSize(13);

        text(
            "The idea had been spoken aloud.",
            screen.x,
            screen.y + 22
        );


        // Final button

        const buttonW = 150;
        const buttonH = 44;

        const buttonX = width / 2;
        const buttonY = height * 0.84;

        this.hoverNext = this.isInside(
            mouseX,
            mouseY,
            buttonX,
            buttonY,
            buttonW,
            buttonH
        );


        this.drawButton(
            buttonX,
            buttonY,
            buttonW,
            buttonH,
            this.buttonText,
            this.hoverNext
        );
    }


    // =========================================================
    // BUTTON
    // =========================================================

    drawButton(
        x,
        y,
        w,
        h,
        label,
        hovered
    ) {

        rectMode(CENTER);

        noStroke();


        // Glow

        if (hovered) {

            fill(
                90,
                150,
                255,
                30
            );

            rect(
                x,
                y,
                w + 18,
                h + 18,
                8
            );
        }


        // Background

        if (hovered) {

            fill(35, 55, 85);
        }

        else {

            fill(17, 22, 34);
        }


        rect(
            x,
            y,
            w,
            h,
            5
        );


        // Border

        noFill();

        stroke(
            hovered
                ? color(120, 180, 255, 180)
                : color(90, 105, 135, 120)
        );

        strokeWeight(1);

        rect(
            x,
            y,
            w,
            h,
            5
        );


        // Text

        noStroke();

        fill(
            hovered
                ? 235
                : 175
        );

        textAlign(CENTER, CENTER);

        textSize(11);

        text(
            label,
            x,
            y
        );


        rectMode(CORNER);
    }


    // =========================================================
    // CLICK
    // =========================================================

    mousePressed() {

        const buttonW = 150;
        const buttonH = 44;

        const buttonX = width / 2;
        const buttonY = height * 0.84;


        // INTRO

        if (this.state === "intro") {

            if (
                this.isInside(
                    mouseX,
                    mouseY,
                    buttonX,
                    buttonY,
                    buttonW,
                    buttonH
                )
            ) {

                this.startPresentation();

                return;
            }
        }


        // PRESENTATION

        if (this.state === "presentation") {

            if (
                this.isInside(
                    mouseX,
                    mouseY,
                    buttonX,
                    buttonY,
                    buttonW,
                    buttonH
                )
            ) {

                this.nextSlide();

                return;
            }
        }


        // COMPLETE

        if (this.state === "complete") {

            if (
                this.isInside(
                    mouseX,
                    mouseY,
                    buttonX,
                    buttonY,
                    buttonW,
                    buttonH
                )
            ) {

                this.finish();

                return;
            }
        }
    }


    // =========================================================
    // START PRESENTATION
    // =========================================================

    startPresentation() {

        this.presentationStarted = true;

        this.slideIndex = 0;

        this.state = "presentation";

        this.screenGlow = 0;
    }


    // =========================================================
    // NEXT SLIDE
    // =========================================================

    nextSlide() {

        if (
            this.slideIndex <
            this.slideTitles.length - 1
        ) {

            this.slideIndex++;

            return;
        }


        this.presentationComplete = true;

        this.state = "complete";

        this.screenGlow = 0;
    }


    // =========================================================
    // FINISH
    // =========================================================

    finish() {

        this.presentationComplete = true;
    }


    // =========================================================
    // CAN CONTINUE
    // =========================================================

    canContinue() {

        return this.state === "complete";
    }


    // =========================================================
    // HELPERS
    // =========================================================

    isInside(
        mx,
        my,
        x,
        y,
        w,
        h
    ) {

        return (
            mx >= x - w / 2 &&
            mx <= x + w / 2 &&
            my >= y - h / 2 &&
            my <= y + h / 2
        );
    }


    // =========================================================
    // HOVER
    // =========================================================

    updateHover() {

        // Hover is calculated
        // directly inside the display functions.

    }
}