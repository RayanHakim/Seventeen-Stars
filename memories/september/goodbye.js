class GoodbyeScene {

    constructor() {

        // =====================================
        // BASIC INFORMATION
        // =====================================

        this.month =
            "SEPTEMBER 2026";

        this.title =
            "GOODBYE";

        this.subtitle =
            "One light was about to leave the journey.";

        this.buttonText =
            "CONTINUE";


        // =====================================
        // PARTICIPANTS
        // =====================================

        this.participants = [

            "ME",
            "SH",
            "KI",
            "BE",
            "PU",
            "GE",
            "SA",
            "AD",
            "AJ",
            "AR",
            "EK",
            "FA",
            "HA",
            "NA",
            "ST",
            "ZA",
            "AL"

        ];


        // =====================================
        // TARGET
        // =====================================

        this.targetCode =
            "AL";


        // =====================================
        // STATE
        // =====================================

        this.alFound =
            false;

        this.completed =
            false;


        // =====================================
        // STAR POSITIONS
        // =====================================

        this.stars = [];


        // =====================================
        // CONSTELLATION LINES
        // =====================================

        this.connections = [];


        // =====================================
        // PARTICLES
        // =====================================

        this.particles = [];


        // =====================================
        // MESSAGE
        // =====================================

        this.messageAlpha =
            0;

        this.messageTimer =
            0;


        // =====================================
        // AL FADE
        // =====================================

        this.alFade =
            0;


        // =====================================
        // HOVER
        // =====================================

        this.hoveredStar =
            null;


        // =====================================
        // INTRO
        // =====================================

        this.introProgress =
            0;


        // =====================================
        // DIM OTHER UI
        // =====================================

        this.originalStarVisibility =
            true;

    }


    // =========================================
    // ENTER
    // =========================================

    enter() {

        this.alFound =
            false;

        this.completed =
            false;

        this.messageAlpha =
            0;

        this.messageTimer =
            0;

        this.alFade =
            0;

        this.hoveredStar =
            null;

        this.introProgress =
            0;


        this.createStars();

        this.createConnections();

        this.createParticles();


        // Hide global star system because
        // this scene has its own constellation.

        if (
            typeof starSystem !== "undefined" &&
            starSystem &&
            starSystem.hideAll
        ) {

            starSystem.hideAll();

        }

    }


    // =========================================
    // CREATE STARS
    // =========================================

    createStars() {

        this.stars = [];


        const centerX =
            width * 0.5;

        const centerY =
            height * 0.47;


        const radiusX =
            min(
                width * 0.34,
                430
            );


        const radiusY =
            min(
                height * 0.24,
                190
            );


        /*
         * Fixed positions.
         *
         * AL deliberately has a position
         * that is not too obvious.
         *
         * The user needs to search for AL.
         */

        const positions = [

            [ -0.82, -0.25 ],
            [ -0.62,  0.30 ],
            [ -0.44, -0.45 ],
            [ -0.27,  0.08 ],
            [ -0.12,  0.48 ],
            [  0.04, -0.38 ],
            [  0.20,  0.20 ],
            [ 0.36, -0.10 ],
            [ 0.52,  0.38 ],
            [ 0.70, -0.28 ],
            [ 0.84,  0.12 ],
            [ -0.73, -0.62 ],
            [ -0.32, -0.72 ],
            [ 0.08,  0.68 ],
            [ 0.43,  0.65 ],
            [ 0.68,  0.60 ],
            [ 0.15, -0.70 ]

        ];


        for (
            let i = 0;
            i < this.participants.length;
            i++
        ) {

            const code =
                this.participants[i];


            const position =
                positions[i];


            let x =
                centerX +
                position[0] *
                radiusX;


            let y =
                centerY +
                position[1] *
                radiusY;


            /*
             * Make sure the constellation does not
             * overlap the top title or bottom button.
             */

            y =
                constrain(
                    y,
                    height * 0.22,
                    height * 0.72
                );


            this.stars.push({

                code: code,

                x: x,

                y: y,

                baseSize:
                    code === this.targetCode
                        ? 7
                        : 5,

                phase:
                    random(
                        TWO_PI
                    ),

                speed:
                    random(
                        0.008,
                        0.018
                    ),

                brightness:
                    random(
                        0.75,
                        1
                    )

            });

        }

    }


    // =========================================
    // CREATE CONNECTIONS
    // =========================================

    createConnections() {

        this.connections = [];


        /*
         * Manually selected connections so the
         * constellation looks intentional.
         */

        const pairs = [

            [0, 2],
            [0, 11],
            [1, 3],
            [1, 11],
            [2, 3],
            [2, 12],
            [3, 4],
            [3, 6],
            [4, 13],
            [5, 6],
            [5, 12],
            [5, 16],
            [6, 7],
            [6, 13],
            [7, 8],
            [7, 9],
            [8, 10],
            [8, 15],
            [9, 10],
            [9, 16],
            [10, 15],
            [11, 12],
            [12, 16],
            [13, 14],
            [14, 15],
            [14, 8]

        ];


        for (
            let i = 0;
            i < pairs.length;
            i++
        ) {

            this.connections.push({

                a:
                    pairs[i][0],

                b:
                    pairs[i][1],

                alpha:
                    random(
                        18,
                        38
                    )

            });

        }

    }


    // =========================================
    // CREATE PARTICLES
    // =========================================

    createParticles() {

        this.particles = [];


        for (
            let i = 0;
            i < 55;
            i++
        ) {

            this.particles.push({

                x:
                    random(
                        width
                    ),

                y:
                    random(
                        height
                    ),

                size:
                    random(
                        0.5,
                        1.6
                    ),

                alpha:
                    random(
                        15,
                        60
                    ),

                speed:
                    random(
                        0.05,
                        0.25
                    ),

                phase:
                    random(
                        TWO_PI
                    )

            });

        }

    }


    // =========================================
    // UPDATE
    // =========================================

    update() {

        this.introProgress =
            min(
                1,
                this.introProgress +
                0.012
            );


        // =====================================
        // PARTICLES
        // =====================================

        for (
            let i = 0;
            i < this.particles.length;
            i++
        ) {

            const particle =
                this.particles[i];


            particle.y -=
                particle.speed;


            if (
                particle.y < -10
            ) {

                particle.y =
                    height + 10;

            }

        }


        // =====================================
        // AL FADE
        // =====================================

        if (
            this.alFound
        ) {

            this.alFade =
                min(
                    1,
                    this.alFade +
                    0.012
                );

        }


        // =====================================
        // MESSAGE
        // =====================================

        if (
            this.alFound
        ) {

            this.messageTimer++;

            if (
                this.messageTimer > 35
            ) {

                this.messageAlpha =
                    min(
                        255,
                        this.messageAlpha +
                        3
                    );

            }

        }


        // =====================================
        // COMPLETION
        // =====================================

        if (
            this.alFound &&
            this.alFade >= 1 &&
            this.messageAlpha >= 255
        ) {

            this.completed =
                true;

        }

    }


    // =========================================
    // DISPLAY
    // =========================================

    display() {

        this.drawAtmosphere();

        this.drawParticles();

        this.drawConnections();

        this.drawStars();

        this.drawInstruction();

        this.drawGoodbyeMessage();

    }


    // =========================================
    // ATMOSPHERE
    // =========================================

    drawAtmosphere() {

        noStroke();


        /*
         * Central soft glow
         */

        for (
            let r = 420;
            r > 30;
            r -= 30
        ) {

            const alpha =
                map(
                    r,
                    420,
                    30,
                    0,
                    2
                );


            fill(
                70,
                110,
                255,
                alpha
            );


            circle(
                width * 0.5,
                height * 0.47,
                r
            );

        }

    }


    // =========================================
    // PARTICLES
    // =========================================

    drawParticles() {

        noStroke();


        for (
            let i = 0;
            i < this.particles.length;
            i++
        ) {

            const particle =
                this.particles[i];


            const pulse =
                sin(
                    frameCount *
                    0.02 +
                    particle.phase
                );


            fill(
                120,
                150,
                255,
                particle.alpha +
                pulse * 10
            );


            circle(
                particle.x,
                particle.y,
                particle.size
            );

        }

    }


    // =========================================
    // CONNECTIONS
    // =========================================

    drawConnections() {

        for (
            let i = 0;
            i < this.connections.length;
            i++
        ) {

            const connection =
                this.connections[i];


            const a =
                this.stars[
                    connection.a
                ];


            const b =
                this.stars[
                    connection.b
                ];


            if (
                !a ||
                !b
            ) {

                continue;

            }


            /*
             * Connections touching AL gradually
             * disappear after AL is selected.
             */

            let alpha =
                connection.alpha;


            if (
                this.alFound &&
                (
                    a.code === this.targetCode ||
                    b.code === this.targetCode
                )
            ) {

                alpha *=
                    1 -
                    this.alFade;

            }


            stroke(
                90,
                125,
                230,
                alpha
            );


            strokeWeight(
                0.7
            );


            line(
                a.x,
                a.y,
                b.x,
                b.y
            );

        }


        noStroke();

    }


    // =========================================
    // STARS
    // =========================================

    drawStars() {

        for (
            let i = 0;
            i < this.stars.length;
            i++
        ) {

            const star =
                this.stars[i];


            const pulse =
                sin(
                    frameCount *
                    star.speed +
                    star.phase
                );


            const isAL =
                star.code ===
                this.targetCode;


            const isHovered =
                this.hoveredStar ===
                star;


            let brightness =
                star.brightness;


            let blue =
                255;


            let red =
                70;


            let green =
                120;


            let alpha =
                170 +
                pulse * 35;


            /*
             * AL becomes dark after clicking.
             */

            if (
                isAL &&
                this.alFound
            ) {

                const fade =
                    this.alFade;


                red =
                    lerp(
                        70,
                        45,
                        fade
                    );


                green =
                    lerp(
                        120,
                        45,
                        fade
                    );


                blue =
                    lerp(
                        255,
                        55,
                        fade
                    );


                alpha =
                    lerp(
                        210,
                        45,
                        fade
                    );

            }


            /*
             * Hover effect
             */

            if (
                isHovered &&
                !this.alFound
            ) {

                brightness =
                    1.35;

            }


            const size =
                star.baseSize *
                brightness *
                (
                    1 +
                    pulse * 0.12
                );


            // =================================
            // OUTER GLOW
            // =================================

            noStroke();


            fill(
                red,
                green,
                blue,
                alpha * 0.12
            );


            circle(
                star.x,
                star.y,
                size * 6
            );


            fill(
                red,
                green,
                blue,
                alpha * 0.25
            );


            circle(
                star.x,
                star.y,
                size * 3
            );


            // =================================
            // STAR CORE
            // =================================

            fill(
                red,
                green,
                blue,
                alpha
            );


            circle(
                star.x,
                star.y,
                size
            );


            // =================================
            // AL HIGHLIGHT
            // =================================

            if (
                isAL &&
                !this.alFound
            ) {

                noFill();


                stroke(
                    120,
                    165,
                    255,
                    90 +
                    sin(
                        frameCount *
                        0.05
                    ) * 35
                );


                strokeWeight(
                    1
                );


                circle(
                    star.x,
                    star.y,
                    size * 2.8
                );


                noStroke();

            }


            // =================================
            // CODE LABEL
            // =================================

            this.drawStarLabel(
                star,
                isAL
            );

        }

    }


    // =========================================
    // STAR LABEL
    // =========================================

    drawStarLabel(
        star,
        isAL
    ) {

        let alpha =
            155;


        if (
            isAL &&
            this.alFound
        ) {

            alpha =
                45;

        }


        if (
            this.hoveredStar === star &&
            !this.alFound
        ) {

            alpha =
                255;

        }


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


        textStyle(
            NORMAL
        );


        fill(
            255,
            255,
            255,
            alpha
        );


        text(
            star.code,
            star.x,
            star.y - 15
        );

    }


    // =========================================
    // INSTRUCTION
    // =========================================

    drawInstruction() {

        if (
            this.alFound
        ) {

            return;

        }


        const alpha =
            map(
                this.introProgress,
                0,
                1,
                0,
                180
            );


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


        textStyle(
            NORMAL
        );


        fill(
            255,
            255,
            255,
            alpha
        );


        text(
            "FIND AL",
            width * 0.5,
            height * 0.79
        );

    }


    // =========================================
    // GOODBYE MESSAGE
    // =========================================

    drawGoodbyeMessage() {

        if (
            !this.alFound
        ) {

            return;

        }


        const alpha =
            this.messageAlpha;


        textAlign(
            CENTER,
            CENTER
        );


        textFont(
            "Cormorant Garamond"
        );


        textSize(
            23
        );


        textStyle(
            NORMAL
        );


        fill(
            255,
            255,
            255,
            alpha
        );


        text(
            "One light leaves the journey.",
            width * 0.5,
            height * 0.79
        );


        textFont(
            "Inter"
        );


        textSize(
            9
        );


        fill(
            255,
            255,
            255,
            alpha * 0.55
        );


        text(
            "A new chapter begins beyond this constellation.",
            width * 0.5,
            height * 0.83
        );

    }


    // =========================================
    // HOVER
    // =========================================

    updateHover() {

        this.hoveredStar =
            null;


        if (
            this.alFound
        ) {

            return;

        }


        for (
            let i = 0;
            i < this.stars.length;
            i++
        ) {

            const star =
                this.stars[i];


            const distance =
                dist(
                    mouseX,
                    mouseY,
                    star.x,
                    star.y
                );


            if (
                distance <
                24
            ) {

                this.hoveredStar =
                    star;

                break;

            }

        }

    }


    // =========================================
    // CLICK
    // =========================================

    mousePressed() {

        if (
            this.alFound
        ) {

            return;

        }


        for (
            let i = 0;
            i < this.stars.length;
            i++
        ) {

            const star =
                this.stars[i];


            const distance =
                dist(
                    mouseX,
                    mouseY,
                    star.x,
                    star.y
                );


            /*
             * Slightly generous hit area so AL
             * is not frustrating to click.
             */

            if (
                distance <
                30
            ) {

                if (
                    star.code ===
                    this.targetCode
                ) {

                    this.selectAL();

                }


                return;

            }

        }

    }


    // =========================================
    // SELECT AL
    // =========================================

    selectAL() {

        this.alFound =
            true;

        this.messageTimer =
            0;

        this.messageAlpha =
            0;

        this.alFade =
            0;


        this.createDepartureParticles();

    }


    // =========================================
    // DEPARTURE PARTICLES
    // =========================================

    createDepartureParticles() {

        const al =
            this.stars.find(
                star =>
                    star.code ===
                    this.targetCode
            );


        if (!al) {

            return;

        }


        for (
            let i = 0;
            i < 25;
            i++
        ) {

            this.particles.push({

                x:
                    al.x,

                y:
                    al.y,

                size:
                    random(
                        1,
                        2.5
                    ),

                alpha:
                    random(
                        80,
                        180
                    ),

                speed:
                    random(
                        0.3,
                        1.2
                    ),

                phase:
                    random(
                        TWO_PI
                    ),

                departure:
                    true,

                angle:
                    random(
                        TWO_PI
                    )

            });

        }

    }


    // =========================================
    // CONTINUE
    // =========================================

    canContinue() {

        return this.completed;

    }


    // =========================================
    // EXIT
    // =========================================

    exit() {

        if (
            typeof starSystem !== "undefined" &&
            starSystem &&
            starSystem.hideAll
        ) {

            starSystem.hideAll();

        }

    }

}