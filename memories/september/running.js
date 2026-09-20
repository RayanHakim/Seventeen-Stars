class RunningScene {

    constructor() {

        this.month =
            "SEPTEMBER 2026";

        this.title =
            "RUNNING";

        this.subtitle =
            "Five lights moving forward.";

        this.buttonText =
            "CONTINUE";


        this.distance =
            0;

        this.completed =
            false;

        this.finishPulse =
            0;

        this.particles =
            [];

        this.runners = [

            {
                code: "ZA",
                lane: 0,
                speed: 1.00,
                phase: 0.0
            },

            {
                code: "AL",
                lane: 1,
                speed: 0.92,
                phase: 1.4
            },

            {
                code: "ST",
                lane: 2,
                speed: 1.08,
                phase: 2.7
            },

            {
                code: "AD",
                lane: 3,
                speed: 0.96,
                phase: 4.1
            },

            {
                code: "FA",
                lane: 4,
                speed: 1.04,
                phase: 5.3
            }

        ];

    }


    enter() {

        this.distance =
            0;

        this.completed =
            false;

        this.finishPulse =
            0;

        this.particles =
            [];


        starSystem.showParticipants([

            "ZA",
            "AL",
            "ST",
            "AD",
            "FA"

        ]);

    }


    update() {

        if (
            !this.completed
        ) {

            this.distance +=
                0.38;

        }


        if (
            this.distance >= 100
        ) {

            this.distance =
                100;

            this.completed =
                true;

        }


        /*
         * Finish animation
         */

        if (
            this.completed
        ) {

            this.finishPulse +=
                0.08;

        }


        /*
         * Running particles
         */

        if (
            frameCount % 3 === 0 &&
            !this.completed
        ) {

            const roadY =
                height * 0.53;

            const laneHeight =
                height * 0.075;

            const lane =
                floor(
                    random(5)
                );

            this.particles.push({

                x:
                    width * 0.18,

                y:
                    roadY +
                    (
                        lane - 2
                    ) *
                    laneHeight,

                life:
                    1,

                size:
                    random(
                        1,
                        3
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

            particle.x -=
                1.2;

            particle.life -=
                0.025;

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

        const roadTop =
            height * 0.37;

        const roadBottom =
            height * 0.70;

        const roadHeight =
            roadBottom -
            roadTop;

        const laneHeight =
            roadHeight /
            5;


        /*
         * =========================
         * ATMOSPHERE
         * =========================
         */

        noStroke();


        for (
            let i = 0;
            i < 8;
            i++
        ) {

            const x =
                width *
                (
                    0.10 +
                    i * 0.12
                );

            const y =
                roadTop -
                30 -
                sin(
                    frameCount *
                    0.01 +
                    i
                ) *
                12;

            fill(
                255,
                255,
                255,
                12
            );

            circle(
                x,
                y,
                2
            );

        }


        /*
         * =========================
         * ROAD GLOW
         * =========================
         */

        noStroke();

        fill(
            255,
            255,
            255,
            5
        );

        rect(
            width * 0.08,
            roadTop,
            width * 0.84,
            roadHeight,
            12
        );


        fill(
            255,
            255,
            255,
            8
        );

        rect(
            width * 0.08,
            roadTop,
            width * 0.84,
            2
        );


        /*
         * =========================
         * LANE LINES
         * =========================
         */

        for (
            let i = 1;
            i < 5;
            i++
        ) {

            const y =
                roadTop +
                laneHeight *
                i;

            stroke(
                255,
                255,
                255,
                20
            );

            strokeWeight(1);

            for (
                let x =
                    width * 0.10;
                x <
                    width * 0.90;
                x += 45
            ) {

                const offset =
                    (
                        this.distance *
                        2
                    ) % 45;

                line(
                    x - offset,
                    y,
                    x + 22 - offset,
                    y
                );

            }

        }


        /*
         * =========================
         * ROAD EDGES
         * =========================
         */

        stroke(
            255,
            255,
            255,
            55
        );

        strokeWeight(1);

        line(
            width * 0.08,
            roadTop,
            width * 0.92,
            roadTop
        );

        line(
            width * 0.08,
            roadBottom,
            width * 0.92,
            roadBottom
        );


        /*
         * =========================
         * DISTANCE MARKERS
         * =========================
         */

        textAlign(
            CENTER,
            CENTER
        );

        textSize(8);

        fill(
            255,
            255,
            255,
            70
        );

        const markers = [
            0,
            25,
            50,
            75,
            100
        ];


        for (
            let i = 0;
            i < markers.length;
            i++
        ) {

            const marker =
                markers[i];

            const x =
                width * 0.10 +
                (
                    width * 0.80
                ) *
                (
                    marker / 100
                );

            line(
                x,
                roadTop - 8,
                x,
                roadTop - 2
            );

            noStroke();

            text(
                marker + "M",
                x,
                roadTop - 17
            );

        }


        /*
         * =========================
         * FINISH LINE
         * =========================
         */

        const finishX =
            width * 0.88;


        const finishAlpha =
            this.completed
                ? 120 +
                    sin(
                        this.finishPulse
                    ) *
                    50
                : 55;


        stroke(
            255,
            255,
            255,
            finishAlpha
        );

        strokeWeight(2);


        line(
            finishX,
            roadTop - 2,
            finishX,
            roadBottom + 2
        );


        /*
         * Checkered finish
         */

        noStroke();


        const squareSize =
            9;


        for (
            let row = 0;
            row < 5;
            row++
        ) {

            for (
                let col = 0;
                col < 2;
                col++
            ) {

                if (
                    (
                        row +
                        col
                    ) % 2 === 0
                ) {

                    fill(
                        255,
                        255,
                        255,
                        80
                    );

                }

                else {

                    fill(
                        255,
                        255,
                        255,
                        20
                    );

                }


                rect(
                    finishX -
                    squareSize +
                    col *
                    squareSize,

                    roadTop +
                    row *
                    (
                        squareSize
                    ),

                    squareSize,
                    squareSize
                );

            }

        }


        /*
         * =========================
         * PARTICLES
         * =========================
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
                100 *
                particle.life
            );

            circle(
                particle.x,
                particle.y,
                particle.size
            );

        }


        /*
         * =========================
         * RUNNERS
         * =========================
         */

        for (
            let i = 0;
            i < this.runners.length;
            i++
        ) {

            const runner =
                this.runners[i];


            const y =
                roadTop +
                laneHeight *
                (
                    i + 0.5
                );


            const progress =
                (
                    this.distance *
                    runner.speed
                ) % 100;


            const x =
                width * 0.12 +
                progress *
                (
                    width * 0.0074
                );


            this.drawRunner(
                x,
                y,
                runner.phase,
                i
            );

        }


        /*
         * =========================
         * PROGRESS PANEL
         * =========================
         */

        const panelX =
            width / 2;

        const panelY =
            height * 0.78;


        textAlign(
            CENTER,
            CENTER
        );

        textSize(10);

        fill(
            255,
            255,
            255,
            120
        );

        text(
            "DISTANCE",
            panelX,
            panelY - 18
        );


        /*
         * Progress bar
         */

        const barWidth =
            min(
                width * 0.36,
                360
            );

        const barHeight =
            4;


        noStroke();

        fill(
            255,
            255,
            255,
            18
        );

        rect(
            panelX -
            barWidth / 2,
            panelY,
            barWidth,
            barHeight,
            4
        );


        fill(
            255,
            255,
            255,
            150
        );

        rect(
            panelX -
            barWidth / 2,
            panelY,
            barWidth *
            (
                this.distance /
                100
            ),
            barHeight,
            4
        );


        textSize(12);

        fill(
            255,
            255,
            255,
            180
        );

        text(
            floor(
                this.distance
            ) +
            "%",
            panelX,
            panelY + 20
        );


        /*
         * =========================
         * FINISH MESSAGE
         * =========================
         */

        if (
            this.completed
        ) {

            const alpha =
                170 +
                sin(
                    this.finishPulse
                ) *
                50;


            textSize(14);

            fill(
                255,
                255,
                255,
                alpha
            );

            text(
                "FINISH",
                width / 2,
                height * 0.87
            );


            textSize(9);

            fill(
                255,
                255,
                255,
                110
            );

            text(
                "THE FIVE LIGHTS REACHED THE END",
                width / 2,
                height * 0.91
            );

        }

    }


    drawRunner(
        x,
        y,
        phase,
        index
    ) {

        /*
         * Running animation
         */

        const runningPhase =
            frameCount *
            0.18 +
            phase;


        const step =
            sin(
                runningPhase
            );


        const bounce =
            abs(
                sin(
                    runningPhase
                )
            ) *
            2;


        const bodyY =
            y -
            bounce;


        /*
         * Runner glow
         */

        noStroke();

        fill(
            255,
            255,
            255,
            10
        );

        circle(
            x,
            bodyY,
            30
        );


        fill(
            255,
            255,
            255,
            22
        );

        circle(
            x,
            bodyY,
            20
        );


        /*
         * Speed trail
         */

        stroke(
            255,
            255,
            255,
            25
        );

        strokeWeight(2);


        line(
            x - 22,
            bodyY,
            x - 8,
            bodyY
        );


        line(
            x - 17,
            bodyY + 5,
            x - 7,
            bodyY + 5
        );


        /*
         * Head
         */

        noStroke();

        fill(
            255,
            255,
            255,
            210
        );

        circle(
            x,
            bodyY - 9,
            6
        );


        /*
         * Body
         */

        stroke(
            255,
            255,
            255,
            190
        );

        strokeWeight(2);

        line(
            x,
            bodyY - 5,
            x - 1,
            bodyY + 5
        );


        /*
         * Arms
         */

        const armOffset =
            step * 5;


        line(
            x,
            bodyY - 3,
            x - 7,
            bodyY + armOffset
        );


        line(
            x,
            bodyY - 3,
            x + 7,
            bodyY - armOffset
        );


        /*
         * Legs
         */

        line(
            x - 1,
            bodyY + 5,
            x - 6 -
                step * 4,
            bodyY + 12
        );


        line(
            x - 1,
            bodyY + 5,
            x + 6 +
                step * 4,
            bodyY + 12
        );


        /*
         * Runner identifier
         */

        noStroke();

        textAlign(
            CENTER,
            CENTER
        );

        textSize(7);

        fill(
            255,
            255,
            255,
            90
        );

        text(
            this.runners[index].code,
            x,
            bodyY + 22
        );

    }


    mousePressed() {

        /*
         * Running berjalan
         * secara otomatis.
         */

    }


    canContinue() {

        return this.completed;

    }


    exit() {

        starSystem.hideAll();

    }

}