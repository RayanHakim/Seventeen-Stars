class AugustCafeScene {

    constructor() {

        this.month =
            "AUGUST 2026";


        this.title =
            "CAFE";


        this.subtitle =
            "A table. A few drinks. A little time.";


        this.buttonText =
            "CONTINUE";


        /*
         * =====================================
         * GAME
         * =====================================
         */

        this.completed =
            false;


        this.foundCount =
            0;


        this.totalObjects =
            5;


        /*
         * =====================================
         * TIME
         * =====================================
         */

        this.time =
            0;


        /*
         * =====================================
         * OBJECTS
         * =====================================
         */

        this.objects =
            [];


        /*
         * =====================================
         * PARTICLES
         * =====================================
         */

        this.particles =
            [];


        /*
         * =====================================
         * EFFECTS
         * =====================================
         */

        this.clickFlash =
            0;


        this.completeFlash =
            0;


        this.hoverIndex =
            -1;

    }


    /*
     * =========================================
     * ENTER
     * =========================================
     */

    enter() {

        this.completed =
            false;


        this.foundCount =
            0;


        this.time =
            0;


        this.particles =
            [];


        this.clickFlash =
            0;


        this.completeFlash =
            0;


        this.hoverIndex =
            -1;


        /*
         * =====================================
         * PARTICIPANTS
         * =====================================
         *
         * Sesuai data Cafe sebelumnya.
         */

        starSystem.showParticipants([

            "ME",
            "SH",
            "KI",
            "BE",
            "PU",
            "GE",
            "SA",
            "AD",
            "AR",
            "EK",
            "FA",
            "HA",
            "ST",
            "ZA"

        ]);


        /*
         * =====================================
         * CREATE CAFE OBJECTS
         * =====================================
         */

        this.objects = [

            {
                name:
                    "COFFEE",

                x:
                    width * 0.40,

                y:
                    height * 0.48,

                size:
                    34,

                found:
                    false,

                hover:
                    false,

                pulse:
                    random(TWO_PI),

                type:
                    "coffee"
            },


            {
                name:
                    "DRINK",

                x:
                    width * 0.50,

                y:
                    height * 0.43,

                size:
                    32,

                found:
                    false,

                hover:
                    false,

                pulse:
                    random(TWO_PI),

                type:
                    "drink"
            },


            {
                name:
                    "SNACK",

                x:
                    width * 0.61,

                y:
                    height * 0.48,

                size:
                    34,

                found:
                    false,

                hover:
                    false,

                pulse:
                    random(TWO_PI),

                type:
                    "snack"
            },


            {
                name:
                    "PHONE",

                x:
                    width * 0.45,

                y:
                    height * 0.57,

                size:
                    34,

                found:
                    false,

                hover:
                    false,

                pulse:
                    random(TWO_PI),

                type:
                    "phone"
            },


            {
                name:
                    "MOMENT",

                x:
                    width * 0.56,

                y:
                    height * 0.57,

                size:
                    34,

                found:
                    false,

                hover:
                    false,

                pulse:
                    random(TWO_PI),

                type:
                    "moment"
            }

        ];

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
         * Effects
         */

        this.clickFlash =
            lerp(
                this.clickFlash,
                0,
                0.08
            );


        this.completeFlash =
            lerp(
                this.completeFlash,
                0,
                0.04
            );


        /*
         * =====================================
         * HOVER
         * =====================================
         */

        this.hoverIndex =
            -1;


        for (
            let i = 0;
            i < this.objects.length;
            i++
        ) {

            const object =
                this.objects[i];


            object.hover =
                false;


            const distance =
                dist(
                    mouseX,
                    mouseY,
                    object.x,
                    object.y
                );


            if (
                distance <
                object.size
            ) {

                object.hover =
                    true;


                this.hoverIndex =
                    i;

            }


            object.pulse +=
                0.025;

        }


        /*
         * =====================================
         * PARTICLES
         * =====================================
         */

        this.updateParticles();

    }


    /*
     * =========================================
     * DISPLAY
     * =========================================
     */

    display() {

        this.displayAtmosphere();


        this.displayTable();


        this.displayObjects();


        this.displayParticles();


        this.displayProgress();

    }


    /*
     * =========================================
     * ATMOSPHERE
     * =========================================
     */

    displayAtmosphere() {

        /*
         * Soft cafe atmosphere
         */

        noStroke();


        for (
            let i = 0;
            i < 12;
            i++
        ) {

            const x =
                width * 0.15 +
                (
                    i * 91
                ) %
                (
                    width * 0.70
                );


            const y =
                height * 0.18 +
                (
                    i * 47
                ) %
                (
                    height * 0.48
                );


            const alpha =
                8 +
                sin(
                    this.time +
                    i
                ) *
                4;


            fill(
                255,
                220,
                190,
                alpha
            );


            circle(
                x,
                y,
                2
            );

        }


        /*
         * Warm center glow
         */

        fill(
            255,
            220,
            180,
            7
        );


        ellipse(
            width / 2,
            height / 2,
            width * 0.65,
            height * 0.45
        );

    }


    /*
     * =========================================
     * TABLE
     * =========================================
     */

    displayTable() {

        const tableX =
            width / 2;


        const tableY =
            height * 0.52;


        /*
         * Table outer glow
         */

        noStroke();


        fill(
            255,
            220,
            190,
            8
        );


        ellipse(
            tableX,
            tableY,
            440,
            220
        );


        /*
         * Table surface
         */

        fill(
            18,
            15,
            20,
            230
        );


        stroke(
            255,
            220,
            190,
            45
        );


        strokeWeight(
            1
        );


        ellipse(
            tableX,
            tableY,
            400,
            190
        );


        /*
         * Inner table ring
         */

        noFill();


        stroke(
            255,
            220,
            190,
            18
        );


        ellipse(
            tableX,
            tableY,
            370,
            165
        );


        /*
         * Small center decoration
         */

        noStroke();


        fill(
            255,
            220,
            180,
            20
        );


        ellipse(
            tableX,
            tableY,
            90,
            40
        );


        /*
         * Small plates around table
         */

        for (
            let i = 0;
            i < 4;
            i++
        ) {

            const angle =
                i *
                HALF_PI +
                PI / 4;


            const x =
                tableX +
                cos(angle) *
                135;


            const y =
                tableY +
                sin(angle) *
                65;


            noFill();


            stroke(
                255,
                235,
                220,
                35
            );


            ellipse(
                x,
                y,
                38,
                20
            );

        }

    }


    /*
     * =========================================
     * OBJECTS
     * =========================================
     */

    displayObjects() {

        for (
            let i = 0;
            i < this.objects.length;
            i++
        ) {

            const object =
                this.objects[i];


            this.displayObject(
                object,
                i
            );

        }

    }


    /*
     * =========================================
     * SINGLE OBJECT
     * =========================================
     */

    displayObject(
        object,
        index
    ) {

        const hover =
            object.hover
                ? 1
                : 0;


        const found =
            object.found
                ? 1
                : 0;


        const pulse =
            sin(
                object.pulse
            ) *
            0.5 +
            0.5;


        /*
         * =====================================
         * OBJECT GLOW
         * =====================================
         */

        noStroke();


        fill(
            255,
            220,
            190,
            (
                8 +
                hover * 18 +
                found * 25
            )
        );


        circle(
            object.x,
            object.y,
            object.size * 2.5 +
            pulse * 8
        );


        /*
         * =====================================
         * HOVER RING
         * =====================================
         */

        if (
            hover ||
            found
        ) {

            noFill();


            stroke(
                255,
                220,
                190,
                80 +
                hover * 70 +
                found * 50
            );


            strokeWeight(
                1
            );


            circle(
                object.x,
                object.y,
                object.size * 1.8 +
                pulse * 8
            );

        }


        /*
         * =====================================
         * OBJECT ART
         * =====================================
         */

        if (
            object.type ===
            "coffee"
        ) {

            this.drawCoffee(
                object
            );

        }


        if (
            object.type ===
            "drink"
        ) {

            this.drawDrink(
                object
            );

        }


        if (
            object.type ===
            "snack"
        ) {

            this.drawSnack(
                object
            );

        }


        if (
            object.type ===
            "phone"
        ) {

            this.drawPhone(
                object
            );

        }


        if (
            object.type ===
            "moment"
        ) {

            this.drawMoment(
                object
            );

        }


        /*
         * =====================================
         * FOUND CHECK
         * =====================================
         */

        if (
            found
        ) {

            /*
             * Check mark
             */

            noFill();


            stroke(
                190,
                240,
                210,
                210
            );


            strokeWeight(
                2
            );


            line(
                object.x - 7,
                object.y + 1,
                object.x - 2,
                object.y + 6
            );


            line(
                object.x - 2,
                object.y + 6,
                object.x + 8,
                object.y - 7
            );

        }


        /*
         * =====================================
         * HOVER LABEL
         * =====================================
         */

        if (
            hover &&
            !found
        ) {

            noStroke();


            fill(
                5,
                5,
                10,
                200
            );


            rectMode(
                CENTER
            );


            rect(
                object.x,
                object.y - 42,
                70,
                20,
                5
            );


            fill(
                255,
                225,
                205,
                190
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


            text(
                object.name,
                object.x,
                object.y - 42
            );


            rectMode(
                CORNER
            );

        }

    }


    /*
     * =========================================
     * COFFEE
     * =========================================
     */

    drawCoffee(
        object
    ) {

        push();


        translate(
            object.x,
            object.y
        );


        noStroke();


        /*
         * Cup shadow
         */

        fill(
            0,
            0,
            0,
            50
        );


        ellipse(
            0,
            9,
            28,
            8
        );


        /*
         * Cup
         */

        fill(
            235,
            225,
            215,
            220
        );


        rect(
            -12,
            -9,
            24,
            22,
            4
        );


        /*
         * Coffee surface
         */

        fill(
            70,
            45,
            35,
            230
        );


        ellipse(
            0,
            -9,
            23,
            8
        );


        /*
         * Handle
         */

        noFill();


        stroke(
            235,
            225,
            215,
            190
        );


        strokeWeight(
            3
        );


        arc(
            12,
            -1,
            12,
            15,
            -HALF_PI,
            HALF_PI
        );


        /*
         * Steam
         */

        noFill();


        stroke(
            255,
            235,
            220,
            80
        );


        strokeWeight(
            1
        );


        const steam =
            sin(
                this.time * 2
            ) *
            2;


        arc(
            -5,
            -20,
            8,
            15,
            PI,
            TWO_PI
        );


        arc(
            5 + steam,
            -23,
            7,
            17,
            PI,
            TWO_PI
        );


        pop();

    }


    /*
     * =========================================
     * DRINK
     * =========================================
     */

    drawDrink(
        object
    ) {

        push();


        translate(
            object.x,
            object.y
        );


        /*
         * Glass
         */

        fill(
            170,
            210,
            235,
            35
        );


        stroke(
            210,
            235,
            255,
            160
        );


        strokeWeight(
            1
        );


        rect(
            -10,
            -12,
            20,
            27,
            3
        );


        /*
         * Drink inside
         */

        noStroke();


        fill(
            180,
            210,
            230,
            120
        );


        rect(
            -8,
            -5,
            16,
            17,
            2
        );


        /*
         * Straw
         */

        stroke(
            255,
            200,
            215,
            170
        );


        strokeWeight(
            2
        );


        line(
            3,
            -12,
            10,
            -26
        );


        /*
         * Ice
         */

        noStroke();


        fill(
            235,
            250,
            255,
            100
        );


        rect(
            -5,
            -2,
            5,
            5,
            1
        );


        rect(
            3,
            -1,
            4,
            5,
            1
        );


        pop();

    }


    /*
     * =========================================
     * SNACK
     * =========================================
     */

    drawSnack(
        object
    ) {

        push();


        translate(
            object.x,
            object.y
        );


        /*
         * Plate
         */

        noFill();


        stroke(
            240,
            230,
            220,
            140
        );


        strokeWeight(
            2
        );


        ellipse(
            0,
            7,
            34,
            15
        );


        /*
         * Snack
         */

        noStroke();


        fill(
            210,
            165,
            115,
            220
        );


        ellipse(
            -7,
            0,
            15,
            10
        );


        fill(
            230,
            185,
            125,
            220
        );


        ellipse(
            6,
            -2,
            16,
            11
        );


        fill(
            245,
            205,
            150,
            200
        );


        ellipse(
            0,
            -7,
            14,
            9
        );


        pop();

    }


    /*
     * =========================================
     * PHONE
     * =========================================
     */

    drawPhone(
        object
    ) {

        push();


        translate(
            object.x,
            object.y
        );


        rotate(
            -0.15
        );


        /*
         * Phone body
         */

        fill(
            18,
            20,
            28,
            240
        );


        stroke(
            200,
            210,
            230,
            140
        );


        strokeWeight(
            1
        );


        rect(
            -12,
            -20,
            24,
            40,
            5
        );


        /*
         * Screen
         */

        noStroke();


        fill(
            70,
            100,
            140,
            130
        );


        rect(
            -9,
            -14,
            18,
            28,
            3
        );


        /*
         * Screen light
         */

        fill(
            180,
            215,
            255,
            80
        );


        rect(
            -6,
            -9,
            12,
            2,
            1
        );


        rect(
            -6,
            -3,
            9,
            2,
            1
        );


        /*
         * Home button
         */

        fill(
            230,
            235,
            245,
            120
        );


        circle(
            0,
            16,
            3
        );


        pop();

    }


    /*
     * =========================================
     * MOMENT
     * =========================================
     */

    drawMoment(
        object
    ) {

        push();


        translate(
            object.x,
            object.y
        );


        const pulse =
            sin(
                this.time * 2
            ) *
            0.5 +
            0.5;


        /*
         * Small centerpiece / light
         */

        noStroke();


        fill(
            255,
            220,
            170,
            30 +
            pulse * 25
        );


        circle(
            0,
            0,
            28 +
            pulse * 8
        );


        fill(
            255,
            235,
            190,
            150
        );


        circle(
            0,
            0,
            7
        );


        /*
         * Orbiting particles
         */

        for (
            let i = 0;
            i < 4;
            i++
        ) {

            const angle =
                this.time +
                i *
                HALF_PI;


            const x =
                cos(angle) *
                15;


            const y =
                sin(angle) *
                15;


            fill(
                255,
                220,
                180,
                120
            );


            circle(
                x,
                y,
                2
            );

        }


        pop();

    }


    /*
     * =========================================
     * PARTICLES
     * =========================================
     */

    createParticles(
        x,
        y
    ) {

        for (
            let i = 0;
            i < 16;
            i++
        ) {

            const angle =
                random(
                    TWO_PI
                );


            const speed =
                random(
                    0.7,
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


    /*
     * =========================================
     * UPDATE PARTICLES
     * =========================================
     */

    updateParticles() {

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


    /*
     * =========================================
     * DISPLAY PARTICLES
     * =========================================
     */

    displayParticles() {

        noStroke();


        for (
            const particle
            of this.particles
        ) {

            fill(
                255,
                220,
                190,
                particle.life *
                180
            );


            circle(
                particle.x,
                particle.y,
                particle.size
            );

        }

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
            height * 0.78;


        /*
         * Label
         */

        textAlign(
            CENTER,
            CENTER
        );


        textFont(
            "Inter"
        );


        textSize(
            10
        );


        fill(
            230,
            220,
            215,
            150
        );


        text(
            "FIND THE LITTLE MOMENTS",
            centerX,
            progressY - 20
        );


        /*
         * Progress bar
         */

        const barWidth =
            180;


        const barHeight =
            3;


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


        const progress =
            this.foundCount /
            this.totalObjects;


        fill(
            255,
            210,
            190,
            190
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


        /*
         * Counter
         */

        textSize(
            12
        );


        fill(
            255,
            240,
            230,
            190
        );


        text(
            this.foundCount +
            " / " +
            this.totalObjects,
            centerX,
            progressY + 20
        );


        /*
         * =====================================
         * NORMAL MESSAGE
         * =====================================
         */

        if (
            !this.completed
        ) {

            textSize(
                9
            );


            fill(
                210,
                205,
                210,
                100
            );


            text(
                "CLICK THE OBJECTS ON THE TABLE",
                centerX,
                height * 0.88
            );

        }


        /*
         * =====================================
         * COMPLETE MESSAGE
         * =====================================
         */

        if (
            this.completed
        ) {

            textSize(
                11
            );


            fill(
                210,
                240,
                225,
                200
            );


            text(
                "TABLE COMPLETE",
                centerX,
                height * 0.87
            );

        }

    }


    /*
     * =========================================
     * MOUSE PRESSED
     * =========================================
     */

    mousePressed() {

        /*
         * Jangan melakukan apa-apa
         * kalau sudah selesai.
         */

        if (
            this.completed
        ) {

            return;

        }


        /*
         * Cek semua object.
         */

        for (
            let i = 0;
            i < this.objects.length;
            i++
        ) {

            const object =
                this.objects[i];


            /*
             * Sudah ditemukan?
             */

            if (
                object.found
            ) {

                continue;

            }


            const distance =
                dist(
                    mouseX,
                    mouseY,
                    object.x,
                    object.y
                );


            /*
             * Object diklik.
             */

            if (
                distance <
                object.size
            ) {

                object.found =
                    true;


                this.foundCount++;


                this.clickFlash =
                    1;


                /*
                 * Particle burst
                 */

                this.createParticles(
                    object.x,
                    object.y
                );


                /*
                 * Check complete
                 */

                if (
                    this.foundCount >=
                    this.totalObjects
                ) {

                    this.completed =
                        true;


                    this.completeFlash =
                        1;


                    /*
                     * Extra particles
                     */

                    for (
                        let p = 0;
                        p < 35;
                        p++
                    ) {

                        this.createParticles(
                            width / 2 +
                            random(
                                -100,
                                100
                            ),
                            height / 2 +
                            random(
                                -60,
                                60
                            )
                        );

                    }

                }


                /*
                 * Satu klik hanya
                 * menemukan satu object.
                 */

                break;

            }

        }

    }


    /*
     * =========================================
     * CAN CONTINUE
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