class WarungScene {

    constructor() {

        this.month =
            "SEPTEMBER 2026";


        this.title =
            "WARUNG";


        this.subtitle =
            "A small place outside the factory.";


        this.buttonText =
            "CONTINUE";


        /*
         * =====================================
         * GAME PROGRESS
         * =====================================
         */

        this.found =
            0;


        this.total =
            4;


        this.completed =
            false;


        /*
         * =====================================
         * OBJECTS
         * =====================================
         */

        this.objects = [];


        /*
         * =====================================
         * EFFECTS
         * =====================================
         */

        this.particles = [];


        this.time =
            0;


        this.lastClicked =
            -1;


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

        this.found =
            0;


        this.completed =
            false;


        this.time =
            0;


        this.particles =
            [];


        this.lastClicked =
            -1;


        this.message =
            "";


        this.messageAlpha =
            0;


        /*
         * =====================================
         * WARUNG OBJECTS
         * =====================================
         */

        this.objects = [

            {
                id:
                    0,

                name:
                    "COFFEE",

                x:
                    width * 0.43,

                y:
                    height * 0.55,

                radius:
                    35,

                found:
                    false

            },


            {
                id:
                    1,

                name:
                    "CIGARETTE",

                x:
                    width * 0.57,

                y:
                    height * 0.55,

                radius:
                    32,

                found:
                    false

            },


            {
                id:
                    2,

                name:
                    "TABLE",

                x:
                    width * 0.50,

                y:
                    height * 0.65,

                radius:
                    65,

                found:
                    false

            },


            {
                id:
                    3,

                name:
                    "CONVERSATION",

                x:
                    width * 0.50,

                y:
                    height * 0.43,

                radius:
                    55,

                found:
                    false

            }

        ];


        /*
         * Belum ada participant
         * karena datanya belum ditentukan.
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
     * DISPLAY
     * =========================================
     */

    display() {

        this.displayBackground();


        this.displayWarung();


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
            2,
            3,
            8,
            230
        );


        rect(
            0,
            0,
            width,
            height
        );


        /*
         * Small ambient lights
         */

        for (
            let i = 0;
            i < 22;
            i++
        ) {

            const x =
                (
                    i * 173
                ) %
                width;


            const y =
                (
                    i * 91
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
                150,
                4 +
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
     * WARUNG
     * =========================================
     */

    displayWarung() {

        const cx =
            width / 2;


        const cy =
            height * 0.48;


        /*
         * =====================================
         * WARUNG GLOW
         * =====================================
         */

        noStroke();


        fill(
            255,
            190,
            120,
            5
        );


        rect(
            cx - 220,
            cy - 115,
            440,
            250,
            12
        );


        /*
         * =====================================
         * WALL
         * =====================================
         */

        fill(
            12,
            14,
            22,
            240
        );


        stroke(
            255,
            220,
            170,
            45
        );


        strokeWeight(
            1
        );


        rect(
            cx - 190,
            cy - 90,
            380,
            205,
            5
        );


        /*
         * =====================================
         * ROOF
         * =====================================
         */

        noStroke();


        fill(
            255,
            210,
            160,
            20
        );


        triangle(

            cx - 215,
            cy - 90,

            cx,
            cy - 155,

            cx + 215,
            cy - 90

        );


        /*
         * Roof line
         */

        stroke(
            255,
            220,
            175,
            60
        );


        strokeWeight(
            2
        );


        line(
            cx - 210,
            cy - 90,
            cx + 210,
            cy - 90
        );


        /*
         * =====================================
         * WARUNG SIGN
         * =====================================
         */

        noStroke();


        fill(
            255,
            225,
            180,
            15
        );


        rect(
            cx - 105,
            cy - 70,
            210,
            35,
            4
        );


        textAlign(
            CENTER,
            CENTER
        );


        textFont(
            "Cormorant Garamond"
        );


        textSize(
            20
        );


        fill(
            255,
            230,
            195,
            150
        );


        text(
            "WARUNG",
            cx,
            cy - 52
        );


        /*
         * =====================================
         * COUNTER
         * =====================================
         */

        noStroke();


        fill(
            255,
            220,
            175,
            15
        );


        rect(
            cx - 175,
            cy - 5,
            350,
            65,
            5
        );


        stroke(
            255,
            220,
            175,
            45
        );


        strokeWeight(
            1
        );


        line(
            cx - 175,
            cy - 5,
            cx + 175,
            cy - 5
        );


        /*
         * =====================================
         * TABLE
         * =====================================
         */

        const tableX =
            cx;


        const tableY =
            height * 0.65;


        /*
         * Table glow
         */

        noStroke();


        fill(
            255,
            190,
            120,
            8
        );


        ellipse(
            tableX,
            tableY,
            230,
            75
        );


        /*
         * Table surface
         */

        fill(
            20,
            22,
            30,
            245
        );


        stroke(
            255,
            215,
            175,
            70
        );


        strokeWeight(
            1.5
        );


        ellipse(
            tableX,
            tableY,
            210,
            62
        );


        /*
         * Table leg
         */

        stroke(
            255,
            215,
            175,
            45
        );


        line(
            tableX,
            tableY + 30,
            tableX,
            tableY + 75
        );


        /*
         * =====================================
         * CHAIRS
         * =====================================
         */

        noFill();


        stroke(
            255,
            215,
            175,
            40
        );


        strokeWeight(
            2
        );


        ellipse(
            cx - 125,
            tableY,
            55,
            55
        );


        ellipse(
            cx + 125,
            tableY,
            55,
            55
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
     * DISPLAY ONE OBJECT
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
         * Completed object
         */

        if (
            object.found
        ) {

            this.displayCompletedObject(
                object
            );

            return;

        }


        /*
         * Hover glow
         */

        if (
            hover
        ) {

            noStroke();


            fill(
                255,
                210,
                160,
                12
            );


            circle(
                object.x,
                object.y,
                object.radius * 2
            );


            noFill();


            stroke(
                255,
                220,
                180,
                100
            );


            strokeWeight(
                1
            );


            circle(
                object.x,
                object.y,
                object.radius * 1.8
            );

        }


        /*
         * Object itself
         */

        if (
            object.name ===
            "COFFEE"
        ) {

            this.drawCoffee(
                object.x,
                object.y
            );

        }


        else if (
            object.name ===
            "CIGARETTE"
        ) {

            this.drawCigarette(
                object.x,
                object.y
            );

        }


        else if (
            object.name ===
            "TABLE"
        ) {

            this.drawTableMarker(
                object.x,
                object.y
            );

        }


        else if (
            object.name ===
            "CONVERSATION"
        ) {

            this.drawConversation(
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
            185,
            hover
                ? 180
                : 85
        );


        text(
            object.name,
            object.x,
            object.y +
            object.radius +
            12
        );

    }


    /*
     * =========================================
     * COMPLETED OBJECT
     * =========================================
     */

    displayCompletedObject(
        object
    ) {

        const pulse =
            sin(
                this.time * 3
            ) *
            0.5 +
            0.5;


        noStroke();


        fill(
            255,
            215,
            165,
            10 +
            pulse * 10
        );


        circle(
            object.x,
            object.y,
            object.radius * 1.7
        );


        noFill();


        stroke(
            255,
            220,
            180,
            90
        );


        strokeWeight(
            1
        );


        circle(
            object.x,
            object.y,
            object.radius * 1.5
        );


        /*
         * Check mark
         */

        stroke(
            255,
            235,
            210,
            180
        );


        strokeWeight(
            2
        );


        line(
            object.x - 7,
            object.y,
            object.x - 2,
            object.y + 6
        );


        line(
            object.x - 2,
            object.y + 6,
            object.x + 8,
            object.y - 7
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
            255,
            225,
            190,
            130
        );


        text(
            object.name,
            object.x,
            object.y +
            object.radius +
            12
        );

    }


    /*
     * =========================================
     * COFFEE
     * =========================================
     */

    drawCoffee(
        x,
        y
    ) {

        /*
         * Glow
         */

        noStroke();


        fill(
            255,
            190,
            120,
            12
        );


        circle(
            x,
            y,
            55
        );


        /*
         * Cup
         */

        fill(
            235,
            225,
            210,
            180
        );


        rect(
            x - 13,
            y - 10,
            26,
            20,
            4
        );


        /*
         * Coffee surface
         */

        fill(
            35,
            25,
            20,
            230
        );


        ellipse(
            x,
            y - 10,
            26,
            8
        );


        /*
         * Handle
         */

        noFill();


        stroke(
            235,
            225,
            210,
            180
        );


        strokeWeight(
            2
        );


        arc(
            x + 14,
            y,
            13,
            13,
            -HALF_PI,
            HALF_PI
        );


        /*
         * Steam
         */

        noFill();


        stroke(
            255,
            225,
            190,
            80
        );


        strokeWeight(
            1
        );


        beginShape();


        vertex(
            x - 5,
            y - 17
        );


        bezierVertex(
            x - 12,
            y - 28,
            x + 4,
            y - 32,
            x - 2,
            y - 43
        );


        endShape();

    }


    /*
     * =========================================
     * CIGARETTE
     * =========================================
     */

    drawCigarette(
        x,
        y
    ) {

        /*
         * Cigarette
         */

        push();


        translate(
            x,
            y
        );


        rotate(
            -0.15
        );


        stroke(
            230,
            225,
            215,
            180
        );


        strokeWeight(
            4
        );


        line(
            -14,
            0,
            13,
            0
        );


        /*
         * Burning tip
         */

        stroke(
            255,
            170,
            90,
            200
        );


        strokeWeight(
            5
        );


        point(
            14,
            0
        );


        /*
         * Smoke

         */

        noFill();


        stroke(
            220,
            220,
            230,
            65
        );


        strokeWeight(
            1
        );


        beginShape();


        vertex(
            13,
            -4
        );


        bezierVertex(
            5,
            -17,
            20,
            -25,
            10,
            -38
        );


        endShape();


        pop();

    }


    /*
     * =========================================
     * TABLE MARKER
     * =========================================
     */

    drawTableMarker(
        x,
        y
    ) {

        noFill();


        stroke(
            255,
            220,
            175,
            90
        );


        strokeWeight(
            1
        );


        ellipse(
            x,
            y,
            90,
            28
        );


        ellipse(
            x,
            y,
            55,
            18
        );


        /*
         * Small chairs
         */

        ellipse(
            x - 52,
            y,
            20,
            20
        );


        ellipse(
            x + 52,
            y,
            20,
            20
        );

    }


    /*
     * =========================================
     * CONVERSATION
     * =========================================
     */

    drawConversation(
        x,
        y
    ) {

        /*
         * Speech bubbles
         */

        noStroke();


        fill(
            220,
            225,
            240,
            100
        );


        ellipse(
            x - 20,
            y,
            45,
            30
        );


        ellipse(
            x + 22,
            y - 15,
            45,
            30
        );


        /*
         * Bubble tails
         */

        triangle(
            x - 32,
            y + 10,
            x - 22,
            y + 18,
            x - 17,
            y + 8
        );


        triangle(
            x + 30,
            y - 5,
            x + 40,
            y + 4,
            x + 35,
            y - 8
        );


        /*
         * Small dots
         */

        fill(
            40,
            45,
            60,
            180
        );


        circle(
            x - 28,
            y,
            3
        );


        circle(
            x - 20,
            y,
            3
        );


        circle(
            x - 12,
            y,
            3
        );


        circle(
            x + 14,
            y - 15,
            3
        );


        circle(
            x + 22,
            y - 15,
            3
        );


        circle(
            x + 30,
            y - 15,
            3
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
            i < 18;
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
                150
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
            11
        );


        fill(
            255,
            220,
            180,
            150
        );


        text(
            this.found +
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
                210,
                200,
                100
            );


            text(
                "COMPLETE THE MOMENT",
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
                "THE MOMENT IS COMPLETE",
                width / 2,
                height * 0.86
            );

        }


        /*
         * Click message
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
         * Check every object
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
                 * Mark found
                 */

                object.found =
                    true;


                this.found++;


                this.lastClicked =
                    object.id;


                /*
                 * Message
                 */

                this.message =
                    object.name;


                this.messageAlpha =
                    1;


                /*
                 * Particle effect
                 */

                this.createParticles(

                    object.x,

                    object.y

                );


                /*
                 * Completed
                 */

                if (
                    this.found >=
                    this.total
                ) {

                    this.completed =
                        true;


                    this.message =
                        "THE MOMENT IS COMPLETE";


                    this.messageAlpha =
                        1;


                    this.createParticles(

                        width / 2,

                        height * 0.60

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