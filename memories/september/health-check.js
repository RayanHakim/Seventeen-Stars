class HealthCheckScene {

    constructor() {

        this.month =
            "SEPTEMBER 2026";


        this.title =
            "HEALTH CHECK";


        this.subtitle =
            "A short pause to check in.";


        this.buttonText =
            "CONTINUE";


        // =====================================
        // GAME STATE
        // =====================================

        this.step =
            0;

        /*
         * 0 = Start
         * 1 = Blood Sugar
         * 2 = Uric Acid
         * 3 = Complete
         */


        this.completed =
            false;


        // =====================================
        // SCAN
        // =====================================

        this.scanning =
            false;


        this.scanProgress =
            0;


        // =====================================
        // ANIMATION
        // =====================================

        this.time =
            0;


        this.pulse =
            0;


        this.hover =
            false;


        this.particles =
            [];

    }


    // =========================================
    // ENTER
    // =========================================

    enter() {

        this.step =
            0;


        this.completed =
            false;


        this.scanning =
            false;


        this.scanProgress =
            0;


        this.time =
            0;


        this.pulse =
            0;


        this.hover =
            false;


        this.particles =
            [];


        starSystem.hideAll();

    }


    // =========================================
    // UPDATE
    // =========================================

    update() {

        this.time +=
            0.025;


        this.pulse =
            sin(
                this.time * 3
            ) *
            0.5 +
            0.5;


        // =====================================
        // SCAN
        // =====================================

        if (
            this.scanning
        ) {

            this.scanProgress +=
                0.008;


            if (
                this.scanProgress >=
                1
            ) {

                this.scanProgress =
                    1;


                this.scanning =
                    false;


                this.finishScan();

            }

        }


        // =====================================
        // PARTICLES
        // =====================================

        for (
            const particle
            of this.particles
        ) {

            particle.x +=
                particle.vx;


            particle.y +=
                particle.vy;


            particle.vx *=
                0.97;


            particle.vy *=
                0.97;


            particle.life -=
                0.025;

        }


        this.particles =
            this.particles.filter(
                particle =>
                    particle.life > 0
            );

    }


    // =========================================
    // DISPLAY
    // =========================================

    display() {

        this.displayBackground();

        this.displayMachine();

        this.displayInteraction();

        this.displayParticles();

    }


    // =========================================
    // BACKGROUND
    // =========================================

    displayBackground() {

        background(
            2,
            4,
            8
        );


        noStroke();


        // Ambient dots

        for (
            let i = 0;
            i < 30;
            i++
        ) {

            const x =
                (i * 173) %
                width;


            const y =
                (i * 97) %
                height;


            const alpha =
                5 +
                (
                    sin(
                        this.time +
                        i
                    ) *
                    0.5 +
                    0.5
                ) *
                5;


            fill(
                180,
                220,
                255,
                alpha
            );


            circle(
                x,
                y,
                2
            );

        }


        // Soft center glow

        fill(
            100,
            180,
            255,
            4 +
            this.pulse * 5
        );


        circle(
            width / 2,
            height * 0.48,
            500
        );

    }


    // =========================================
    // MACHINE
    // =========================================

    displayMachine() {

        const cx =
            width / 2;


        const cy =
            height * 0.46;


        // =====================================
        // OUTER GLOW
        // =====================================

        noStroke();


        fill(
            100,
            190,
            255,
            5 +
            this.pulse * 8
        );


        rect(
            cx - 190,
            cy - 145,
            380,
            290,
            18
        );


        // =====================================
        // MACHINE BODY
        // =====================================

        fill(
            10,
            15,
            24,
            250
        );


        stroke(
            170,
            210,
            240,
            70
        );


        strokeWeight(
            1.5
        );


        rect(
            cx - 170,
            cy - 130,
            340,
            260,
            12
        );


        // =====================================
        // TOP SCREEN
        // =====================================

        fill(
            3,
            8,
            15,
            255
        );


        stroke(
            120,
            200,
            240,
            70
        );


        rect(
            cx - 125,
            cy - 105,
            250,
            65,
            7
        );


        // =====================================
        // SCREEN LINE
        // =====================================

        noFill();


        stroke(
            120,
            210,
            255,
            120
        );


        strokeWeight(
            1
        );


        beginShape();


        vertex(
            cx - 105,
            cy - 78
        );


        vertex(
            cx - 80,
            cy - 78
        );


        vertex(
            cx - 70,
            cy - 88
        );


        vertex(
            cx - 60,
            cy - 68
        );


        vertex(
            cx - 50,
            cy - 78
        );


        vertex(
            cx - 20,
            cy - 78
        );


        vertex(
            cx - 10,
            cy - 88
        );


        vertex(
            cx,
            cy - 68
        );


        vertex(
            cx + 10,
            cy - 78
        );


        vertex(
            cx + 45,
            cy - 78
        );


        vertex(
            cx + 55,
            cy - 87
        );


        vertex(
            cx + 65,
            cy - 70
        );


        vertex(
            cx + 75,
            cy - 78
        );


        vertex(
            cx + 105,
            cy - 78
        );


        endShape();


        // =====================================
        // SENSOR AREA
        // =====================================

        fill(
            6,
            11,
            18,
            255
        );


        stroke(
            140,
            195,
            230,
            55
        );


        rect(
            cx - 125,
            cy - 25,
            250,
            90,
            8
        );


        // =====================================
        // SENSOR 1
        // =====================================

        noStroke();


        fill(
            130,
            210,
            255,
            25 +
            this.pulse * 25
        );


        circle(
            cx - 55,
            cy + 20,
            58
        );


        stroke(
            150,
            215,
            255,
            90
        );


        noFill();


        circle(
            cx - 55,
            cy + 20,
            35
        );


        // =====================================
        // SENSOR 2
        // =====================================

        noStroke();


        fill(
            130,
            210,
            255,
            25 +
            this.pulse * 25
        );


        circle(
            cx + 55,
            cy + 20,
            58
        );


        stroke(
            150,
            215,
            255,
            90
        );


        noFill();


        circle(
            cx + 55,
            cy + 20,
            35
        );


        // =====================================
        // STATUS LIGHTS
        // =====================================

        noStroke();


        fill(
            130,
            210,
            255,
            150
        );


        circle(
            cx - 75,
            cy + 100,
            6
        );


        fill(
            170,
            255,
            190,
            150
        );


        circle(
            cx - 55,
            cy + 100,
            6
        );


        fill(
            255,
            210,
            130,
            150
        );


        circle(
            cx - 35,
            cy + 100,
            6
        );

    }


    // =========================================
    // INTERACTION AREA
    // =========================================

    displayInteraction() {

        const cx =
            width / 2;


        // =====================================
        // START
        // =====================================

        if (
            this.step === 0
        ) {

            this.displayGameText(
                "HEALTH CHECK",
                "READY TO BEGIN"
            );


            this.displayGameButton(
                cx,
                height * 0.78,
                "START CHECK"
            );

        }


        // =====================================
        // BLOOD SUGAR
        // =====================================

        else if (
            this.step === 1
        ) {

            this.displayGameText(
                "BLOOD SUGAR",
                this.scanning
                    ? "CHECKING..."
                    : "READY FOR CHECK"
            );


            if (
                this.scanning
            ) {

                this.displayProgress();

            }

            else {

                this.displayGameButton(
                    cx,
                    height * 0.78,
                    "BEGIN CHECK"
                );

            }

        }


        // =====================================
        // URIC ACID
        // =====================================

        else if (
            this.step === 2
        ) {

            this.displayGameText(
                "URIC ACID",
                this.scanning
                    ? "CHECKING..."
                    : "READY FOR CHECK"
            );


            if (
                this.scanning
            ) {

                this.displayProgress();

            }

            else {

                this.displayGameButton(
                    cx,
                    height * 0.78,
                    "BEGIN CHECK"
                );

            }

        }


        // =====================================
        // COMPLETE
        // =====================================

        else if (
            this.step === 3
        ) {

            this.displayComplete();

        }

    }


    // =========================================
    // GAME TEXT
    // =========================================

    displayGameText(
        title,
        description
    ) {

        const cx =
            width / 2;


        textAlign(
            CENTER,
            CENTER
        );


        textFont(
            "Cormorant Garamond"
        );


        textSize(
            24
        );


        fill(
            225,
            235,
            250,
            210
        );


        text(
            title,
            cx,
            height * 0.68
        );


        textFont(
            "Inter"
        );


        textSize(
            9
        );


        fill(
            200,
            215,
            230,
            100
        );


        text(
            description,
            cx,
            height * 0.72
        );

    }


    // =========================================
    // GAME BUTTON
    // =========================================

    displayGameButton(
        x,
        y,
        label
    ) {

        const halfWidth =
            105;


        const halfHeight =
            24;


        this.hover =
            mouseX >=
                x - halfWidth &&
            mouseX <=
                x + halfWidth &&
            mouseY >=
                y - halfHeight &&
            mouseY <=
                y + halfHeight;


        noStroke();


        fill(
            110,
            190,
            255,
            this.hover
                ? 55
                : 18
        );


        rect(
            x - halfWidth,
            y - halfHeight,
            halfWidth * 2,
            halfHeight * 2,
            6
        );


        stroke(
            160,
            215,
            255,
            this.hover
                ? 180
                : 75
        );


        strokeWeight(
            1
        );


        noFill();


        rect(
            x - halfWidth,
            y - halfHeight,
            halfWidth * 2,
            halfHeight * 2,
            6
        );


        noStroke();


        textAlign(
            CENTER,
            CENTER
        );


        textFont(
            "Inter"
        );


        textSize(
            9
        );


        fill(
            220,
            235,
            250,
            200
        );


        text(
            label,
            x,
            y
        );

    }


    // =========================================
    // PROGRESS
    // =========================================

    displayProgress() {

        const cx =
            width / 2;


        const barWidth =
            210;


        const barHeight =
            4;


        const x =
            cx -
            barWidth / 2;


        const y =
            height * 0.78;


        noStroke();


        fill(
            255,
            255,
            255,
            20
        );


        rect(
            x,
            y,
            barWidth,
            barHeight,
            3
        );


        fill(
            150,
            215,
            255,
            180
        );


        rect(
            x,
            y,
            barWidth *
            this.scanProgress,
            barHeight,
            3
        );


        textAlign(
            CENTER,
            CENTER
        );


        textFont(
            "Inter"
        );


        textSize(
            8
        );


        fill(
            200,
            220,
            235,
            90
        );


        text(
            Math.floor(
                this.scanProgress *
                100
            ) +
            "%",
            cx,
            y + 18
        );

    }


    // =========================================
    // COMPLETE
    // =========================================

    displayComplete() {

        const cx =
            width / 2;


        const cy =
            height * 0.68;


        const pulse =
            sin(
                this.time * 3
            ) *
            0.5 +
            0.5;


        noFill();


        stroke(
            170,
            230,
            200,
            90 +
            pulse * 60
        );


        strokeWeight(
            2
        );


        circle(
            cx,
            cy,
            58 +
            pulse * 8
        );


        // Check mark

        line(
            cx - 15,
            cy,
            cx - 4,
            cy + 10
        );


        line(
            cx - 4,
            cy + 10,
            cx + 18,
            cy - 14
        );


        textAlign(
            CENTER,
            CENTER
        );


        textFont(
            "Cormorant Garamond"
        );


        textSize(
            24
        );


        fill(
            215,
            240,
            225,
            210
        );


        text(
            "CHECK COMPLETE",
            cx,
            height * 0.78
        );


        textFont(
            "Inter"
        );


        textSize(
            9
        );


        fill(
            200,
            220,
            210,
            100
        );


        text(
            "A SMALL PAUSE IN THE MIDDLE OF EVERYTHING.",
            cx,
            height * 0.83
        );

    }


    // =========================================
    // MOUSE PRESSED
    // =========================================

    mousePressed() {

        /*
         * Jangan melakukan apa-apa
         * jika sudah selesai.
         */

        if (
            this.completed
        ) {

            return;

        }


        const cx =
            width / 2;


        // =====================================
        // START
        // =====================================

        if (
            this.step === 0
        ) {

            if (
                this.isInsideGameButton(
                    cx,
                    height * 0.78
                )
            ) {

                this.step =
                    1;


                this.scanning =
                    false;


                this.scanProgress =
                    0;


                this.createParticles(
                    cx,
                    height * 0.46
                );

            }


            return;

        }


        // =====================================
        // BLOOD SUGAR / URIC ACID
        // =====================================

        if (
            this.step === 1 ||
            this.step === 2
        ) {

            if (
                this.scanning
            ) {

                return;

            }


            if (
                this.isInsideGameButton(
                    cx,
                    height * 0.78
                )
            ) {

                this.startScan();

            }

        }

    }


    // =========================================
    // BUTTON HIT TEST
    // =========================================

    isInsideGameButton(
        x,
        y
    ) {

        const halfWidth =
            105;


        const halfHeight =
            24;


        return (

            mouseX >=
                x - halfWidth &&

            mouseX <=
                x + halfWidth &&

            mouseY >=
                y - halfHeight &&

            mouseY <=
                y + halfHeight

        );

    }


    // =========================================
    // START SCAN
    // =========================================

    startScan() {

        this.scanning =
            true;


        this.scanProgress =
            0;


        this.createParticles(
            width / 2,
            height * 0.46
        );

    }


    // =========================================
    // FINISH SCAN
    // =========================================

    finishScan() {

        this.createParticles(
            width / 2,
            height * 0.46
        );


        if (
            this.step === 1
        ) {

            this.step =
                2;


            this.scanProgress =
                0;


            this.scanning =
                false;

        }


        else if (
            this.step === 2
        ) {

            this.step =
                3;


            this.completed =
                true;


            this.scanning =
                false;

        }

    }


    // =========================================
    // PARTICLES
    // =========================================

    createParticles(
        x,
        y
    ) {

        for (
            let i = 0;
            i < 30;
            i++
        ) {

            const angle =
                random(
                    TWO_PI
                );


            const speed =
                random(
                    0.5,
                    2.5
                );


            this.particles.push({

                x:
                    x,

                y:
                    y,

                vx:
                    cos(angle) *
                    speed,

                vy:
                    sin(angle) *
                    speed,

                life:
                    1,

                size:
                    random(
                        1,
                        3
                    )

            });

        }

    }


    // =========================================
    // PARTICLES DISPLAY
    // =========================================

    displayParticles() {

        noStroke();


        for (
            const particle
            of this.particles
        ) {

            fill(
                170,
                220,
                255,
                particle.life *
                150
            );


            circle(
                particle.x,
                particle.y,
                particle.size
            );

        }

    }


    // =========================================
    // CAN CONTINUE
    // =========================================

    canContinue() {

        return this.completed;

    }


    // =========================================
    // EXIT
    // =========================================

    exit() {

        starSystem.hideAll();

    }

}