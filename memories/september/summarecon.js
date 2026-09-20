class SummareconScene {

    constructor() {

        this.month =
            "SEPTEMBER 2026";

        this.title =
            "SUMMARECON";

        this.subtitle =
            "Sit. Drink. Talk.";

        this.buttonText =
            "CONTINUE";


        this.stage =
            0;

        this.completed =
            false;

        this.hoveredSpot =
            -1;

        this.particles =
            [];

        this.lightPhase =
            0;

        this.seatSelected =
            false;

        this.drinkSelected =
            false;

        this.talkComplete =
            false;


        this.spots = [

            {
                x: 0.25,
                y: 0.48,
                label: "SIT"
            },

            {
                x: 0.50,
                y: 0.48,
                label: "DRINK"
            },

            {
                x: 0.75,
                y: 0.48,
                label: "TALK"
            }

        ];

    }


    enter() {

        this.stage =
            0;

        this.completed =
            false;

        this.hoveredSpot =
            -1;

        this.particles =
            [];

        this.lightPhase =
            0;

        this.seatSelected =
            false;

        this.drinkSelected =
            false;

        this.talkComplete =
            false;


        /*
         * Participant belum ditentukan.
         */

        starSystem.hideAll();

    }


    update() {

        this.lightPhase +=
            0.025;


        /*
         * Ambient mall particles
         */

        if (
            frameCount % 5 === 0
        ) {

            this.particles.push({

                x:
                    random(
                        width * 0.10,
                        width * 0.90
                    ),

                y:
                    random(
                        height * 0.25,
                        height * 0.70
                    ),

                size:
                    random(
                        1,
                        2.5
                    ),

                life:
                    1,

                speed:
                    random(
                        0.1,
                        0.4
                    )

            });

        }


        for (
            let i =
                this.particles.length - 1;
            i >= 0;
            i--
        ) {

            const particle =
                this.particles[i];

            particle.y -=
                particle.speed;

            particle.life -=
                0.008;


            if (
                particle.life <= 0
            ) {

                this.particles.splice(
                    i,
                    1
                );

            }

        }

    }


    display() {

        const cx =
            width / 2;

        const mallTop =
            height * 0.22;

        const mallBottom =
            height * 0.70;


        /*
         * =================================
         * MALL ATMOSPHERE
         * =================================
         */

        noStroke();


        /*
         * Soft ceiling glow
         */

        for (
            let i = 0;
            i < 5;
            i++
        ) {

            fill(
                255,
                255,
                255,
                5
            );

            ellipse(
                cx,
                mallTop + 20,
                width *
                    (
                        0.55 +
                        i * 0.08
                    ),
                80 +
                    i * 15
            );

        }


        /*
         * =================================
         * MALL BUILDING
         * =================================
         */

        fill(
            255,
            255,
            255,
            7
        );

        rect(
            width * 0.08,
            mallTop,
            width * 0.84,
            mallBottom -
                mallTop,
            14
        );


        /*
         * Glass wall
         */

        stroke(
            255,
            255,
            255,
            25
        );

        strokeWeight(1);

        noFill();


        rect(
            width * 0.12,
            mallTop + 25,
            width * 0.76,
            190,
            8
        );


        /*
         * =================================
         * MALL CEILING LIGHTS
         * =================================
         */

        noStroke();


        for (
            let i = 0;
            i < 7;
            i++
        ) {

            const x =
                width *
                (
                    0.16 +
                    i * 0.115
                );


            const pulse =
                sin(
                    this.lightPhase +
                    i * 0.8
                );


            fill(
                255,
                255,
                255,
                50 +
                    pulse * 15
            );


            circle(
                x,
                mallTop + 12,
                5
            );


            fill(
                255,
                255,
                255,
                8
            );


            circle(
                x,
                mallTop + 12,
                20
            );

        }


        /*
         * =================================
         * STORE FRONTS
         * =================================
         */

        for (
            let i = 0;
            i < 5;
            i++
        ) {

            const x =
                width *
                (
                    0.16 +
                    i * 0.17
                );


            fill(
                255,
                255,
                255,
                8
            );


            rect(
                x - 45,
                mallTop + 55,
                90,
                75,
                6
            );


            stroke(
                255,
                255,
                255,
                18
            );

            line(
                x - 35,
                mallTop + 70,
                x + 35,
                mallTop + 70
            );


            noStroke();


            /*
             * Store display
             */

            fill(
                255,
                255,
                255,
                20
            );


            rect(
                x - 25,
                mallTop + 85,
                50,
                30,
                4
            );

        }


        /*
         * =================================
         * MALL SIGN
         * =================================
         */

        textAlign(
            CENTER,
            CENTER
        );


        textSize(15);

        fill(
            255,
            255,
            255,
            170
        );


        text(
            "SUMMARECON",
            cx,
            mallTop + 42
        );


        /*
         * =================================
         * FLOOR
         * =================================
         */

        noStroke();


        fill(
            255,
            255,
            255,
            12
        );


        rect(
            width * 0.08,
            mallBottom,
            width * 0.84,
            65,
            10
        );


        /*
         * Floor lines
         */

        stroke(
            255,
            255,
            255,
            14
        );

        strokeWeight(1);


        for (
            let i = 0;
            i < 8;
            i++
        ) {

            const x =
                width *
                (
                    0.10 +
                    i * 0.11
                );


            line(
                cx,
                mallBottom,
                x,
                height * 0.82
            );

        }


        /*
         * =================================
         * PARTICLES
         * =================================
         */

        noStroke();


        for (
            const particle of
            this.particles
        ) {

            fill(
                255,
                255,
                255,
                80 *
                particle.life
            );


            circle(
                particle.x,
                particle.y,
                particle.size
            );

        }


        /*
         * =================================
         * INTERACTION AREA
         * =================================
         */

        this.drawInteractionArea(
            cx
        );


        /*
         * =================================
         * STATUS
         * =================================
         */

        this.drawStatus();

    }


    drawInteractionArea(
        cx
    ) {

        const baseY =
            height * 0.58;


        /*
         * Table shadow
         */

        noStroke();

        fill(
            255,
            255,
            255,
            8
        );


        ellipse(
            cx,
            baseY + 32,
            330,
            65
        );


        /*
         * Table
         */

        fill(
            255,
            255,
            255,
            20
        );


        ellipse(
            cx,
            baseY,
            260,
            75
        );


        stroke(
            255,
            255,
            255,
            35
        );

        strokeWeight(1);


        ellipse(
            cx,
            baseY,
            260,
            75
        );


        /*
         * Three interaction spots
         */

        this.drawSeat(
            cx - 95,
            baseY,
            0
        );


        this.drawDrink(
            cx,
            baseY,
            1
        );


        this.drawTalk(
            cx + 95,
            baseY,
            2
        );

    }


    drawSeat(
        x,
        y,
        index
    ) {

        const active =
            this.seatSelected;

        const hover =
            this.hoveredSpot ===
            index;


        noStroke();


        fill(
            255,
            255,
            255,
            active
                ? 55
                : hover
                    ? 35
                    : 18
        );


        circle(
            x,
            y,
            active
                ? 58
                : 50
        );


        /*
         * Chair
         */

        stroke(
            255,
            255,
            255,
            active
                ? 180
                : 70
        );

        strokeWeight(2);


        rect(
            x - 15,
            y - 13,
            30,
            25,
            5
        );


        line(
            x - 10,
            y + 12,
            x - 13,
            y + 24
        );


        line(
            x + 10,
            y + 12,
            x + 13,
            y + 24
        );


        noStroke();


        if (
            active
        ) {

            fill(
                255,
                255,
                255,
                180
            );


            circle(
                x,
                y,
                5
            );

        }


        this.drawSpotLabel(
            "SIT",
            x,
            y + 42,
            active,
            hover
        );

    }


    drawDrink(
        x,
        y,
        index
    ) {

        const active =
            this.drinkSelected;

        const hover =
            this.hoveredSpot ===
            index;


        noStroke();


        fill(
            255,
            255,
            255,
            active
                ? 50
                : hover
                    ? 35
                    : 18
        );


        circle(
            x,
            y,
            active
                ? 58
                : 50
        );


        /*
         * Cup
         */

        stroke(
            255,
            255,
            255,
            active
                ? 180
                : 90
        );

        strokeWeight(2);


        rect(
            x - 9,
            y - 13,
            18,
            22,
            3
        );


        noFill();


        arc(
            x + 10,
            y - 5,
            12,
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
            255,
            255,
            90
        );

        strokeWeight(1.5);


        const steam =
            sin(
                frameCount *
                0.05
            ) *
            3;


        beginShape();

        vertex(
            x - 4,
            y - 17
        );

        vertex(
            x - 2 +
                steam,
            y - 24
        );

        vertex(
            x + 2,
            y - 29
        );

        endShape();


        beginShape();

        vertex(
            x + 3,
            y - 17
        );

        vertex(
            x + 5 -
                steam,
            y - 24
        );

        vertex(
            x + 3,
            y - 29
        );

        endShape();


        this.drawSpotLabel(
            "DRINK",
            x,
            y + 42,
            active,
            hover
        );

    }


    drawTalk(
        x,
        y,
        index
    ) {

        const active =
            this.talkComplete;

        const hover =
            this.hoveredSpot ===
            index;


        noStroke();


        fill(
            255,
            255,
            255,
            active
                ? 50
                : hover
                    ? 35
                    : 18
        );


        circle(
            x,
            y,
            active
                ? 58
                : 50
        );


        /*
         * Speech bubbles
         */

        stroke(
            255,
            255,
            255,
            active
                ? 180
                : 90
        );

        strokeWeight(2);

        noFill();


        ellipse(
            x - 7,
            y - 5,
            25,
            18
        );


        ellipse(
            x + 9,
            y + 5,
            22,
            16
        );


        noStroke();


        fill(
            255,
            255,
            255,
            active
                ? 170
                : 80
        );


        circle(
            x - 12,
            y - 5,
            2
        );


        circle(
            x - 7,
            y - 5,
            2
        );


        circle(
            x - 2,
            y - 5,
            2
        );


        this.drawSpotLabel(
            "TALK",
            x,
            y + 42,
            active,
            hover
        );

    }


    drawSpotLabel(
        label,
        x,
        y,
        active,
        hover
    ) {

        textAlign(
            CENTER,
            CENTER
        );

        textSize(8);


        fill(
            255,
            255,
            255,
            active
                ? 180
                : hover
                    ? 150
                    : 75
        );


        text(
            label,
            x,
            y
        );

    }


    drawStatus() {

        textAlign(
            CENTER,
            CENTER
        );


        /*
         * Instruction
         */

        if (
            this.stage === 0
        ) {

            textSize(10);

            fill(
                255,
                255,
                255,
                120
            );


            text(
                "A QUIET MOMENT INSIDE THE MALL",
                width / 2,
                height * 0.75
            );

        }


        /*
         * After sitting
         */

        else if (
            this.stage === 1
        ) {

            textSize(10);

            fill(
                255,
                255,
                255,
                140
            );


            text(
                "TAKE A MOMENT",
                width / 2,
                height * 0.75
            );

        }


        /*
         * After drink
         */

        else if (
            this.stage === 2
        ) {

            textSize(10);

            fill(
                255,
                255,
                255,
                140
            );


            text(
                "NOW, JUST STAY A WHILE",
                width / 2,
                height * 0.75
            );

        }


        /*
         * Complete
         */

        if (
            this.completed
        ) {

            textSize(14);

            fill(
                255,
                255,
                255,
                190
            );


            text(
                "SIT. DRINK. TALK.",
                width / 2,
                height * 0.82
            );


            textSize(9);

            fill(
                255,
                255,
                255,
                100
            );


            text(
                "SOME MOMENTS NEED NOTHING MORE",
                width / 2,
                height * 0.87
            );

        }

    }


    updateHover() {

        this.hoveredSpot =
            -1;


        const baseY =
            height * 0.58;


        const spots = [

            {
                x:
                    width / 2 -
                    95,

                y:
                    baseY
            },

            {
                x:
                    width / 2,

                y:
                    baseY
            },

            {
                x:
                    width / 2 +
                    95,

                y:
                    baseY
            }

        ];


        for (
            let i = 0;
            i < spots.length;
            i++
        ) {

            const spot =
                spots[i];


            const distance =
                dist(
                    mouseX,
                    mouseY,
                    spot.x,
                    spot.y
                );


            if (
                distance < 35
            ) {

                this.hoveredSpot =
                    i;

                break;

            }

        }

    }


    mousePressed() {

        const baseY =
            height * 0.58;


        /*
         * SIT
         */

        if (
            this.hoveredSpot === 0 &&
            !this.seatSelected
        ) {

            this.seatSelected =
                true;

            this.stage =
                1;

            this.createBurst(
                width / 2 - 95,
                baseY
            );

            return;

        }


        /*
         * DRINK
         */

        if (
            this.hoveredSpot === 1 &&
            this.seatSelected &&
            !this.drinkSelected
        ) {

            this.drinkSelected =
                true;

            this.stage =
                2;

            this.createBurst(
                width / 2,
                baseY
            );

            return;

        }


        /*
         * TALK
         */

        if (
            this.hoveredSpot === 2 &&
            this.drinkSelected &&
            !this.talkComplete
        ) {

            this.talkComplete =
                true;

            this.stage =
                3;

            this.completed =
                true;

            this.createBurst(
                width / 2 + 95,
                baseY
            );

        }

    }


    createBurst(
        x,
        y
    ) {

        for (
            let i = 0;
            i < 18;
            i++
        ) {

            this.particles.push({

                x:
                    x,

                y:
                    y,

                size:
                    random(
                        1.5,
                        4
                    ),

                life:
                    1,

                speed:
                    random(
                        0.5,
                        2
                    )

            });

        }

    }


    canContinue() {

        return this.completed;

    }


    exit() {

        starSystem.hideAll();

    }

}