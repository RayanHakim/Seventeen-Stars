class LaptopScene {

    constructor() {

        this.month =
            "AUGUST 2026";


        this.title =
            "THE LAPTOP";


        this.subtitle =
            "A new device. A new beginning.";


        this.buttonText =
            "CONTINUE";


        /*
         * =====================================
         * LAPTOP DATA
         * =====================================
         */

        this.laptops = [];


        this.activeCount =
            0;


        this.completed =
            false;


        /*
         * =====================================
         * ANIMATION
         * =====================================
         */

        this.time =
            0;


        this.activationFlash =
            0;


        this.hoverLaptop =
            -1;


        /*
         * =====================================
         * PARTICLES
         * =====================================
         */

        this.particles = [];

    }


    /*
     * =========================================
     * ENTER
     * =========================================
     */

    enter() {

        this.laptops =
            [];


        this.activeCount =
            0;


        this.completed =
            false;


        this.time =
            0;


        this.activationFlash =
            0;


        this.hoverLaptop =
            -1;


        this.particles =
            [];


        /*
         * Show all 17 stars
         */

        starSystem.showAll();


        /*
         * =====================================
         * GRID
         * =====================================
         */

        const columns =
            5;


        const rows =
            4;


        for (
            let i = 0;
            i < 17;
            i++
        ) {

            const col =
                i % columns;


            const row =
                floor(
                    i / columns
                );


            const x =
                width * 0.22 +
                col *
                width * 0.14;


            const y =
                height * 0.25 +
                row *
                height * 0.15;


            this.laptops.push({

                x:
                    x,

                y:
                    y,

                active:
                    false,

                hover:
                    false,

                activation:
                    0,

                phase:
                    random(
                        TWO_PI
                    ),

                screenGlow:
                    random(
                        TWO_PI
                    ),

                particles:
                    []

            });

        }

    }


    /*
     * =========================================
     * UPDATE
     * =========================================
     */

    update() {

        this.time +=
            0.02;


        /*
         * Global activation flash
         */

        this.activationFlash =
            lerp(
                this.activationFlash,
                0,
                0.08
            );


        /*
         * Update laptops
         */

        for (
            const laptop
            of this.laptops
        ) {

            /*
             * Smooth activation
             */

            const target =
                laptop.active
                    ? 1
                    : 0;


            laptop.activation =
                lerp(
                    laptop.activation,
                    target,
                    0.08
                );


            /*
             * Screen animation
             */

            laptop.screenGlow +=
                0.025;


            /*
             * Generate particles
             * only when activated.
             */

            if (
                laptop.active &&
                laptop.particles.length < 8
            ) {

                laptop.particles.push({

                    angle:
                        random(
                            TWO_PI
                        ),

                    radius:
                        random(
                            25,
                            50
                        ),

                    speed:
                        random(
                            0.003,
                            0.009
                        ),

                    size:
                        random(
                            0.5,
                            1.4
                        ),

                    alpha:
                        random(
                            70,
                            160
                        )

                });

            }


            /*
             * Rotate particles
             */

            for (
                const particle
                of laptop.particles
            ) {

                particle.angle +=
                    particle.speed;

            }

        }

    }


    /*
     * =========================================
     * DISPLAY
     * =========================================
     */

    display() {

        /*
         * Background connections
         */

        this.displayConnections();


        /*
         * Laptops
         */

        for (
            let i = 0;
            i < this.laptops.length;
            i++
        ) {

            this.displayLaptop(
                this.laptops[i],
                i
            );

        }


        /*
         * Progress UI
         */

        this.displayProgress();

    }


    /*
     * =========================================
     * CONNECTIONS
     * =========================================
     */

    displayConnections() {

        /*
         * Draw very subtle connections
         * between the laptop grid.
         */

        stroke(
            150,
            190,
            255,
            12
        );


        strokeWeight(
            0.5
        );


        for (
            let i = 0;
            i < this.laptops.length;
            i++
        ) {

            const laptop =
                this.laptops[i];


            /*
             * Connect to next laptop
             */

            if (
                i + 1 <
                this.laptops.length
            ) {

                const next =
                    this.laptops[i + 1];


                /*
                 * Avoid weird line
                 * between row endings.
                 */

                const sameRow =
                    floor(i / 5) ===
                    floor((i + 1) / 5);


                if (
                    sameRow
                ) {

                    line(
                        laptop.x,
                        laptop.y,
                        next.x,
                        next.y
                    );

                }

            }


            /*
             * Connect downward
             */

            if (
                i + 5 <
                this.laptops.length
            ) {

                const below =
                    this.laptops[i + 5];


                line(
                    laptop.x,
                    laptop.y,
                    below.x,
                    below.y
                );

            }

        }

    }


    /*
     * =========================================
     * LAPTOP
     * =========================================
     */

    displayLaptop(
        laptop,
        index
    ) {

        push();


        /*
         * =====================================
         * POSITION
         * =====================================
         */

        const x =
            laptop.x;


        const y =
            laptop.y;


        /*
         * =====================================
         * HOVER
         * =====================================
         */

        const hover =
            laptop.hover
                ? 1
                : 0;


        /*
         * =====================================
         * ACTIVE
         * =====================================
         */

        const active =
            laptop.activation;


        /*
         * =====================================
         * FLOAT
         * =====================================
         */

        const floating =
            sin(
                this.time * 1.4 +
                laptop.phase
            ) *
            1.5;


        translate(
            0,
            floating
        );


        /*
         * =====================================
         * OUTER GLOW
         * =====================================
         */

        noStroke();


        if (
            active > 0.01
        ) {

            fill(
                120,
                190,
                255,
                10 *
                active
            );


            ellipse(
                x,
                y + 4,
                105,
                80
            );


            fill(
                120,
                190,
                255,
                18 *
                active
            );


            ellipse(
                x,
                y,
                80,
                60
            );

        }


        /*
         * =====================================
         * LAPTOP SCREEN FRAME
         * =====================================
         */

        rectMode(
            CENTER
        );


        /*
         * Screen outer body
         */

        fill(
            8,
            10,
            18,
            230
        );


        stroke(
            150,
            180,
            220,
            70 +
            active * 100 +
            hover * 70
        );


        strokeWeight(
            hover
                ? 1.5
                : 1
        );


        rect(
            x,
            y - 7,
            76,
            48,
            5
        );


        /*
         * =====================================
         * SCREEN
         * =====================================
         */

        const screenAlpha =
            35 +
            active * 145;


        noStroke();


        fill(
            20,
            35,
            55,
            screenAlpha
        );


        rect(
            x,
            y - 7,
            66,
            38,
            3
        );


        /*
         * =====================================
         * SCREEN SCAN LINE
         * =====================================
         */

        if (
            active > 0.05
        ) {

            const scan =
                (
                    sin(
                        laptop.screenGlow
                    ) *
                    0.5 +
                    0.5
                );


            fill(
                150,
                210,
                255,
                25 +
                active * 50
            );


            rect(
                x,
                y - 24 +
                scan * 34,
                58,
                1
            );

        }


        /*
         * =====================================
         * SCREEN CONTENT
         * =====================================
         */

        if (
            active > 0.1
        ) {

            /*
             * Small UI lines
             */

            fill(
                180,
                220,
                255,
                80 +
                active * 80
            );


            rect(
                x - 20,
                y - 15,
                22,
                2
            );


            rect(
                x - 20,
                y - 9,
                34,
                2
            );


            rect(
                x - 20,
                y - 3,
                28,
                2
            );


            /*
             * Small indicator
             */

            fill(
                150,
                220,
                255,
                170
            );


            circle(
                x + 19,
                y - 14,
                4
            );

        }


        /*
         * =====================================
         * CAMERA
         * =====================================
         */

        fill(
            180,
            190,
            210,
            100 +
            active * 80
        );


        circle(
            x,
            y - 31,
            2
        );


        /*
         * =====================================
         * LAPTOP BASE
         * =====================================
         */

        fill(
            12,
            14,
            22,
            240
        );


        stroke(
            150,
            180,
            220,
            60 +
            active * 90
        );


        strokeWeight(
            1
        );


        quad(
            x - 38,
            y + 18,
            x + 38,
            y + 18,
            x + 46,
            y + 27,
            x - 46,
            y + 27
        );


        /*
         * =====================================
         * KEYBOARD
         * =====================================
         */

        noStroke();


        for (
            let row = 0;
            row < 2;
            row++
        ) {

            for (
                let col = 0;
                col < 7;
                col++
            ) {

                const keyX =
                    x -
                    27 +
                    col *
                    9;


                const keyY =
                    y +
                    21 +
                    row *
                    4;


                fill(
                    150,
                    180,
                    210,
                    25 +
                    active * 55
                );


                rect(
                    keyX,
                    keyY,
                    5,
                    2,
                    1
                );

            }

        }


        /*
         * Trackpad
         */

        noFill();


        stroke(
            160,
            190,
            220,
            30 +
            active * 50
        );


        rect(
            x,
            y + 25,
            18,
            5,
            1
        );


        /*
         * =====================================
         * ACTIVE LIGHT
         * =====================================
         */

        noStroke();


        fill(
            150,
            215,
            255,
            70 +
            active * 150
        );


        circle(
            x,
            y + 33,
            4 +
            active * 2
        );


        /*
         * =====================================
         * PARTICLES
         * =====================================
         */

        if (
            active > 0.2
        ) {

            for (
                const particle
                of laptop.particles
            ) {

                const px =
                    x +
                    cos(
                        particle.angle
                    ) *
                    particle.radius;


                const py =
                    y +
                    sin(
                        particle.angle
                    ) *
                    particle.radius;


                fill(
                    150,
                    210,
                    255,
                    particle.alpha *
                    active
                );


                circle(
                    px,
                    py,
                    particle.size
                );

            }

        }


        /*
         * =====================================
         * HOVER RING
         * =====================================
         */

        if (
            hover > 0
        ) {

            noFill();


            stroke(
                160,
                210,
                255,
                100
            );


            strokeWeight(
                1
            );


            ellipse(
                x,
                y,
                105,
                78
            );


            /*
             * Small corner lights
             */

            fill(
                180,
                225,
                255,
                180
            );


            noStroke();


            circle(
                x - 52,
                y - 38,
                3
            );


            circle(
                x + 52,
                y - 38,
                3
            );


            circle(
                x - 52,
                y + 38,
                3
            );


            circle(
                x + 52,
                y + 38,
                3
            );

        }


        /*
         * =====================================
         * ACTIVATION PULSE
         * =====================================
         */

        if (
            laptop.activation >
            0.85
        ) {

            const pulse =
                (
                    sin(
                        this.time * 4 +
                        laptop.phase
                    ) *
                    0.5 +
                    0.5
                );


            noFill();


            stroke(
                150,
                215,
                255,
                30 +
                pulse * 40
            );


            strokeWeight(
                1
            );


            ellipse(
                x,
                y,
                95 +
                pulse * 20,
                70 +
                pulse * 15
            );

        }


        pop();

    }


    /*
     * =========================================
     * PROGRESS
     * =========================================
     */

    displayProgress() {

        const centerX =
            width / 2;


        const progressY =
            height * 0.82;


        /*
         * Progress text
         */

        textAlign(
            CENTER,
            CENTER
        );


        textFont(
            "Inter"
        );


        textSize(
            11
        );


        fill(
            180,
            210,
            240,
            150
        );


        text(
            "SYSTEM ACTIVATION",
            centerX,
            progressY - 18
        );


        /*
         * Progress bar width
         */

        const barWidth =
            230;


        const barHeight =
            3;


        /*
         * Background
         */

        noStroke();


        fill(
            255,
            255,
            255,
            25
        );


        rect(
            centerX -
            barWidth / 2,
            progressY,
            barWidth,
            barHeight,
            2
        );


        /*
         * Progress amount
         */

        const progress =
            this.activeCount /
            17;


        if (
            progress > 0
        ) {

            fill(
                150,
                210,
                255,
                180
            );


            rect(
                centerX -
                barWidth / 2,
                progressY,
                barWidth *
                progress,
                barHeight,
                2
            );

        }


        /*
         * Counter
         */

        textSize(
            13
        );


        fill(
            255,
            255,
            255,
            190
        );


        text(
            this.activeCount +
            " / 17",
            centerX,
            progressY + 22
        );


        /*
         * Completion message
         */

        if (
            this.completed
        ) {

            fill(
                170,
                220,
                255,
                180
            );


            textSize(
                10
            );


            text(
                "ALL SYSTEMS ONLINE",
                centerX,
                progressY + 43
            );

        }

    }


    /*
     * =========================================
     * MOUSE PRESSED
     * =========================================
     */

    mousePressed() {

        for (
            let i = 0;
            i < this.laptops.length;
            i++
        ) {

            const laptop =
                this.laptops[i];


            const distance =
                dist(
                    mouseX,
                    mouseY,
                    laptop.x,
                    laptop.y
                );


            /*
             * Click area
             */

            if (
                distance < 55
            ) {

                if (
                    !laptop.active
                ) {

                    laptop.active =
                        true;


                    this.activeCount++;


                    /*
                     * Activation flash
                     */

                    this.activationFlash =
                        1;


                    /*
                     * Give particles
                     * a burst.
                     */

                    for (
                        let p = 0;
                        p < 8;
                        p++
                    ) {

                        laptop.particles.push({

                            angle:
                                random(
                                    TWO_PI
                                ),

                            radius:
                                random(
                                    20,
                                    55
                                ),

                            speed:
                                random(
                                    0.004,
                                    0.012
                                ),

                            size:
                                random(
                                    0.7,
                                    1.7
                                ),

                            alpha:
                                random(
                                    100,
                                    190
                                )

                        });

                    }

                }

            }

        }


        /*
         * Complete when all 17
         * laptops are active.
         */

        if (
            this.activeCount >= 17
        ) {

            this.completed =
                true;

        }

    }


    /*
     * =========================================
     * HOVER
     * =========================================
     */

    updateHover() {

        this.hoverLaptop =
            -1;


        for (
            let i = 0;
            i < this.laptops.length;
            i++
        ) {

            const laptop =
                this.laptops[i];


            const distance =
                dist(
                    mouseX,
                    mouseY,
                    laptop.x,
                    laptop.y
                );


            laptop.hover =
                distance < 55;


            if (
                laptop.hover
            ) {

                this.hoverLaptop =
                    i;

            }

        }

    }


    /*
     * =========================================
     * CONTINUE
     * =========================================
     */

    canContinue() {

        return this.completed;

    }


    /*
     * =========================================
     * EXIT
     * =========================================
     */

    exit() {

        starSystem.hideAll();

    }

}