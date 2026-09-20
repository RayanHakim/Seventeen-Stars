class DuckScene {

    constructor() {

        this.month =
            "SEPTEMBER 2026";


        this.title =
            "DUCK";


        this.subtitle =
            "A meal in the middle of the month.";


        this.buttonText =
            "CONTINUE";


        /*
         * =====================================
         * GAME
         * =====================================
         */

        this.completed =
            false;


        this.progress =
            0;


        this.total =
            4;


        /*
         * =====================================
         * OBJECTS
         * =====================================
         */

        this.objects =
            [];


        /*
         * =====================================
         * EFFECTS
         * =====================================
         */

        this.particles =
            [];


        this.time =
            0;


        this.message =
            "";


        this.messageAlpha =
            0;

    }


    /*
     * =========================================
     * ENTER
     * =========================================
     */

    enter() {

        this.completed =
            false;


        this.progress =
            0;


        this.time =
            0;


        this.particles =
            [];


        this.message =
            "";


        this.messageAlpha =
            0;


        /*
         * =====================================
         * FOOD OBJECTS
         * =====================================
         */

        this.objects = [

            {
                id:
                    0,

                name:
                    "PLATE",

                x:
                    width * 0.50,

                y:
                    height * 0.62,

                radius:
                    55,

                found:
                    false

            },


            {
                id:
                    1,

                name:
                    "DUCK",

                x:
                    width * 0.43,

                y:
                    height * 0.57,

                radius:
                    38,

                found:
                    false

            },


            {
                id:
                    2,

                name:
                    "RICE",

                x:
                    width * 0.57,

                y:
                    height * 0.57,

                radius:
                    32,

                found:
                    false

            },


            {
                id:
                    3,

                name:
                    "SAUCE",

                x:
                    width * 0.50,

                y:
                    height * 0.70,

                radius:
                    30,

                found:
                    false

            }

        ];


        /*
         * Participant belum ditentukan.
         */

        starSystem.hideAll();

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
         * Message fade
         */

        this.messageAlpha =
            lerp(
                this.messageAlpha,
                0,
                0.025
            );


        /*
         * Particle update
         */

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
                0.02;

        }


        this.particles =
            this.particles.filter(
                particle =>
                    particle.life > 0
            );

    }


    /*
     * =========================================
     * DISPLAY
     * =========================================
     */

    display() {

        this.displayBackground();


        this.displayTable();


        this.displayObjects();


        this.displayParticles();


        this.displayStatus();

    }


    /*
     * =========================================
     * BACKGROUND
     * =========================================
     */

    displayBackground() {

        noStroke();


        fill(
            3,
            3,
            7,
            235
        );


        rect(
            0,
            0,
            width,
            height
        );


        /*
         * Ambient particles
         */

        for (
            let i = 0;
            i < 20;
            i++
        ) {

            const x =
                (
                    i * 167
                ) %
                width;


            const y =
                (
                    i * 93
                ) %
                height;


            const pulse =
                sin(
                    this.time +
                    i
                ) *
                0.5 +
                0.5;


            fill(
                255,
                210,
                160,
                3 +
                pulse * 4
            );


            circle(
                x,
                y,
                2
            );

        }

    }


    /*
     * =========================================
     * TABLE
     * =========================================
     */

    displayTable() {

        const cx =
            width / 2;


        const cy =
            height * 0.62;


        /*
         * Table glow
         */

        noStroke();


        fill(
            255,
            190,
            120,
            7
        );


        ellipse(
            cx,
            cy,
            width * 0.60,
            180
        );


        /*
         * Table surface
         */

        fill(
            15,
            16,
            23,
            245
        );


        stroke(
            255,
            220,
            175,
            55
        );


        strokeWeight(
            1.5
        );


        ellipse(
            cx,
            cy,
            width * 0.55,
            145
        );


        /*
         * Table inner ring
         */

        noFill();


        stroke(
            255,
            220,
            175,
            25
        );


        ellipse(
            cx,
            cy,
            width * 0.48,
            115
        );


        /*
         * Chopsticks
         */

        stroke(
            220,
            190,
            145,
            80
        );


        strokeWeight(
            3
        );


        line(
            cx + 110,
            cy - 35,
            cx + 145,
            cy - 5
        );


        line(
            cx + 105,
            cy - 30,
            cx + 140,
            cy + 2
        );


        /*
         * Spoon
         */

        noFill();


        stroke(
            210,
            215,
            225,
            80
        );


        strokeWeight(
            2
        );


        ellipse(
            cx - 125,
            cy - 5,
            15,
            23
        );


        line(
            cx - 125,
            cy + 7,
            cx - 125,
            cy + 38
        );

    }


    /*
     * =========================================
     * OBJECTS
     * =========================================
     */

    displayObjects() {

        for (
            const object
            of this.objects
        ) {

            this.displayObject(
                object
            );

        }

    }


    /*
     * =========================================
     * DISPLAY OBJECT
     * =========================================
     */

    displayObject(
        object
    ) {

        const hover =
            dist(
                mouseX,
                mouseY,
                object.x,
                object.y
            ) <
            object.radius;


        /*
         * Plate is always visible
         */

        if (
            object.name ===
            "PLATE"
        ) {

            this.drawPlate(
                object
            );

        }


        /*
         * Duck

         */

        if (
            object.name ===
            "DUCK"
        ) {

            this.drawDuck(
                object
            );

        }


        /*
         * Rice
         */

        if (
            object.name ===
            "RICE"
        ) {

            this.drawRice(
                object
            );

        }


        /*
         * Sauce
         */

        if (
            object.name ===
            "SAUCE"
        ) {

            this.drawSauce(
                object
            );

        }


        /*
         * Hover ring
         */

        if (
            hover &&
            !object.found
        ) {

            noFill();


            stroke(
                255,
                220,
                175,
                100
            );


            strokeWeight(
                1
            );


            circle(
                object.x,
                object.y,
                object.radius * 1.7
            );

        }


        /*
         * Completed indicator
         */

        if (
            object.found
        ) {

            this.drawCheck(
                object.x,
                object.y
            );

        }


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
            8
        );


        fill(
            255,
            220,
            180,
            object.found
                ? 130
                : hover
                    ? 180
                    : 70
        );


        text(
            object.name,
            object.x,
            object.y +
            object.radius +
            10
        );

    }


    /*
     * =========================================
     * PLATE
     * =========================================
     */

    drawPlate(
        object
    ) {

        const pulse =
            sin(
                this.time * 2
            ) *
            0.5 +
            0.5;


        noFill();


        stroke(
            240,
            235,
            225,
            120
        );


        strokeWeight(
            2
        );


        ellipse(
            object.x,
            object.y,
            105,
            58
        );


        stroke(
            240,
            235,
            225,
            55
        );


        ellipse(
            object.x,
            object.y,
            78,
            40
        );


        /*
         * Plate glow after completion
         */

        if (
            object.found
        ) {

            noStroke();


            fill(
                255,
                210,
                160,
                8 +
                pulse * 8
            );


            ellipse(
                object.x,
                object.y,
                125,
                75
            );

        }

    }


    /*
     * =========================================
     * DUCK
     * =========================================
     */

    drawDuck(
        object
    ) {

        /*
         * Food glow
         */

        noStroke();


        fill(
            190,
            115,
            60,
            12
        );


        ellipse(
            object.x,
            object.y,
            70,
            55
        );


        /*
         * Duck meat
         */

        fill(
            125,
            70,
            38,
            230
        );


        ellipse(
            object.x,
            object.y,
            55,
            34
        );


        /*
         * Crispy highlight
         */

        fill(
            190,
            120,
            65,
            150
        );


        ellipse(
            object.x - 5,
            object.y - 4,
            35,
            15
        );


        /*
         * Small garnish
         */

        fill(
            150,
            175,
            120,
            150
        );


        ellipse(
            object.x + 22,
            object.y - 10,
            10,
            5
        );


        ellipse(
            object.x + 25,
            object.y - 5,
            9,
            5
        );


        /*
         * Steam
         */

        noFill();


        stroke(
            235,
            225,
            210,
            55
        );


        strokeWeight(
            1
        );


        beginShape();


        vertex(
            object.x - 10,
            object.y - 18
        );


        bezierVertex(
            object.x - 18,
            object.y - 32,
            object.x + 2,
            object.y - 37,
            object.x - 5,
            object.y - 50
        );


        endShape();

    }


    /*
     * =========================================
     * RICE
     * =========================================
     */

    drawRice(
        object
    ) {

        noStroke();


        /*
         * Rice shadow
         */

        fill(
            230,
            225,
            210,
            40
        );


        ellipse(
            object.x,
            object.y + 8,
            55,
            25
        );


        /*
         * Rice mound
         */

        fill(
            245,
            240,
            225,
            200
        );


        ellipse(
            object.x,
            object.y,
            48,
            30
        );


        ellipse(
            object.x - 10,
            object.y - 7,
            25,
            22
        );


        ellipse(
            object.x + 10,
            object.y - 6,
            25,
            22
        );


        /*
         * Rice details
         */

        fill(
            180,
            175,
            160,
            90
        );


        circle(
            object.x - 12,
            object.y - 2,
            3
        );


        circle(
            object.x,
            object.y + 1,
            3
        );


        circle(
            object.x + 10,
            object.y - 3,
            3
        );

    }


    /*
     * =========================================
     * SAUCE
     * =========================================
     */

    drawSauce(
        object
    ) {

        /*
         * Bowl
         */

        noStroke();


        fill(
            70,
            45,
            35,
            220
        );


        ellipse(
            object.x,
            object.y,
            38,
            25
        );


        /*
         * Sauce

         */

        fill(
            165,
            65,
            45,
            220
        );


        ellipse(
            object.x,
            object.y - 3,
            28,
            13
        );


        /*
         * Highlight
         */

        fill(
            220,
            115,
            70,
            130
        );


        ellipse(
            object.x - 5,
            object.y - 5,
            9,
            4
        );

    }


    /*
     * =========================================
     * CHECK
     * =========================================
     */

    drawCheck(
        x,
        y
    ) {

        stroke(
            255,
            225,
            185,
            180
        );


        strokeWeight(
            2
        );


        line(
            x - 6,
            y,
            x - 1,
            y + 5
        );


        line(
            x - 1,
            y + 5,
            x + 8,
            y - 7
        );

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
            i < 20;
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
                215,
                170,
                particle.life *
                160
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
     * STATUS
     * =========================================
     */

    displayStatus() {

        textAlign(
            CENTER,
            CENTER
        );


        textFont(
            "Inter"
        );


        /*
         * Progress
         */

        textSize(
            12
        );


        fill(
            255,
            225,
            190,
            160
        );


        text(
            this.progress +
            " / " +
            this.total,
            width / 2,
            height * 0.81
        );


        /*
         * Instruction
         */

        if (
            !this.completed
        ) {

            textSize(
                9
            );


            fill(
                220,
                215,
                205,
                100
            );


            text(
                "PREPARE THE MEAL",
                width / 2,
                height * 0.86
            );

        }


        /*
         * Completion
         */

        if (
            this.completed
        ) {

            textSize(
                11
            );


            fill(
                255,
                225,
                190,
                190
            );


            text(
                "MEAL READY",
                width / 2,
                height * 0.86
            );

        }


        /*
         * Message
         */

        if (
            this.messageAlpha >
            0.05
        ) {

            textSize(
                10
            );


            fill(
                255,
                225,
                190,
                this.messageAlpha *
                180
            );


            text(
                this.message,
                width / 2,
                height * 0.75
            );

        }

    }


    /*
     * =========================================
     * MOUSE PRESSED
     * =========================================
     */

    mousePressed() {

        if (
            this.completed
        ) {

            return;

        }


        /*
         * Check objects
         */

        for (
            const object
            of this.objects
        ) {

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


            if (
                distance <=
                object.radius
            ) {

                /*
                 * Mark object
                 */

                object.found =
                    true;


                this.progress++;


                /*
                 * Message
                 */

                this.message =
                    object.name;


                this.messageAlpha =
                    1;


                /*
                 * Particles
                 */

                this.createParticles(

                    object.x,

                    object.y

                );


                /*
                 * Complete
                 */

                if (
                    this.progress >=
                    this.total
                ) {

                    this.completed =
                        true;


                    this.message =
                        "MEAL READY";


                    this.messageAlpha =
                        1;


                    this.createParticles(

                        width / 2,

                        height * 0.62

                    );

                }


                return;

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