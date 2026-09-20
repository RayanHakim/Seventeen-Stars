class BasketballScene {

    constructor() {

        this.month =
            "SEPTEMBER 2026";


        this.title =
            "BASKETBALL";


        this.subtitle =
            "One afternoon. One court.";


        this.buttonText =
            "CONTINUE";


        /*
         * =====================================
         * BALL
         * =====================================
         */

        this.ballX =
            0;

        this.ballY =
            0;

        this.ballRadius =
            9;


        /*
         * =====================================
         * SHOT
         * =====================================
         */

        this.shots =
            0;

        this.score =
            0;

        this.shooting =
            false;

        this.shotProgress =
            0;

        this.shotStartX =
            0;

        this.shotStartY =
            0;

        this.shotTargetX =
            0;

        this.shotTargetY =
            0;

        this.shotMade =
            false;


        /*
         * =====================================
         * GAME
         * =====================================
         */

        this.completed =
            false;


        /*
         * =====================================
         * EFFECTS
         * =====================================
         */

        this.ringFlash =
            0;

        this.missFlash =
            0;

        this.messageAlpha =
            0;


        /*
         * =====================================
         * PARTICLES
         * =====================================
         */

        this.particles =
            [];


        /*
         * =====================================
         * BALL TRAIL
         * =====================================
         */

        this.trail =
            [];


        /*
         * =====================================
         * TIME
         * =====================================
         */

        this.time =
            0;

    }


    /*
     * =========================================
     * ENTER
     * =========================================
     */

    enter() {

        this.time =
            0;


        this.shots =
            0;


        this.score =
            0;


        this.completed =
            false;


        this.shooting =
            false;


        this.shotProgress =
            0;


        this.shotMade =
            false;


        this.ringFlash =
            0;


        this.missFlash =
            0;


        this.messageAlpha =
            0;


        this.particles =
            [];


        this.trail =
            [];


        /*
         * Starting position
         */

        this.ballX =
            width * 0.30;


        this.ballY =
            height * 0.67;


        /*
         * Participants
         */

        starSystem.showParticipants([

            "AD",
            "AJ",
            "AR",
            "EK",
            "FA",
            "HA",
            "ST",
            "ZA",
            "AL"

        ]);

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

        this.ringFlash =
            lerp(
                this.ringFlash,
                0,
                0.08
            );


        this.missFlash =
            lerp(
                this.missFlash,
                0,
                0.08
            );


        this.messageAlpha =
            lerp(
                this.messageAlpha,
                0,
                0.035
            );


        /*
         * =====================================
         * SHOOTING
         * =====================================
         */

        if (
            this.shooting
        ) {

            this.updateShot();

        }


        /*
         * Particles
         */

        this.updateParticles();

    }


    /*
     * =========================================
     * UPDATE SHOT
     * =========================================
     */

    updateShot() {

        this.shotProgress +=
            0.025;


        const t =
            min(
                this.shotProgress,
                1
            );


        /*
         * =====================================
         * BALL TRAIL
         * =====================================
         */

        this.trail.push({

            x:
                this.ballX,

            y:
                this.ballY,

            alpha:
                150

        });


        if (
            this.trail.length >
            14
        ) {

            this.trail.shift();

        }


        /*
         * =====================================
         * BALL MOVEMENT
         * =====================================
         */

        this.ballX =
            lerp(
                this.shotStartX,
                this.shotTargetX,
                t
            );


        /*
         * Arc trajectory
         */

        this.ballY =
            lerp(
                this.shotStartY,
                this.shotTargetY,
                t
            ) -
            sin(
                t * PI
            ) *
            180;


        /*
         * =====================================
         * SHOT FINISHED
         * =====================================
         */

        if (
            t >= 1
        ) {

            this.shooting =
                false;


            this.shots++;


            /*
             * Check whether
             * the ball entered the hoop.
             */

            if (
                this.shotMade
            ) {

                this.score++;


                this.ringFlash =
                    1;


                this.messageAlpha =
                    1;


                this.createScoreParticles(

                    this.shotTargetX,

                    this.shotTargetY

                );


                /*
                 * Three successful shots.
                 */

                if (
                    this.score >= 3
                ) {

                    this.completed =
                        true;

                }

            }

            else {

                /*
                 * Miss
                 */

                this.missFlash =
                    1;


                this.messageAlpha =
                    1;


                this.createMissParticles(

                    this.shotTargetX,

                    this.shotTargetY

                );

            }


            /*
             * Return ball
             * to starting position.
             */

            this.ballX =
                width * 0.30;


            this.ballY =
                height * 0.67;


            this.trail =
                [];

        }

    }


    /*
     * =========================================
     * DISPLAY
     * =========================================
     */

    display() {

        this.displayBackground();


        this.displayCourt();


        this.displayHoop();


        this.displayAim();


        this.displayTrail();


        this.displayParticles();


        this.displayBall();


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
            220
        );


        rect(
            0,
            0,
            width,
            height
        );


        /*
         * Ambient court lights
         */

        for (
            let i = 0;
            i < 18;
            i++
        ) {

            const x =
                (
                    i * 157
                ) %
                width;


            const y =
                (
                    i * 83
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
                170,
                200,
                255,
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
     * COURT
     * =========================================
     */

    displayCourt() {

        const left =
            width * 0.18;


        const top =
            height * 0.30;


        const courtWidth =
            width * 0.64;


        const courtHeight =
            height * 0.42;


        /*
         * Court glow
         */

        noFill();


        stroke(
            120,
            180,
            255,
            12
        );


        strokeWeight(
            8
        );


        rect(
            left,
            top,
            courtWidth,
            courtHeight,
            8
        );


        /*
         * Court border
         */

        stroke(
            180,
            210,
            255,
            90
        );


        strokeWeight(
            1.5
        );


        rect(
            left,
            top,
            courtWidth,
            courtHeight,
            5
        );


        /*
         * Center line
         */

        stroke(
            180,
            205,
            245,
            45
        );


        strokeWeight(
            1
        );


        line(
            width / 2,
            top,
            width / 2,
            top +
            courtHeight
        );


        /*
         * Free throw area
         */

        noFill();


        stroke(
            180,
            210,
            255,
            65
        );


        rect(
            width * 0.55,
            height * 0.30,
            width * 0.18,
            height * 0.23
        );


        /*
         * Free throw arc
         */

        arc(
            width * 0.64,
            height * 0.53,
            150,
            150,
            PI,
            TWO_PI
        );


        /*
         * Three point arc

         */

        arc(
            width * 0.64,
            height * 0.48,
            280,
            280,
            HALF_PI,
            PI + HALF_PI
        );


        /*
         * Floor reflection
         */

        noStroke();


        fill(
            150,
            190,
            255,
            8
        );


        ellipse(
            width * 0.48,
            height * 0.70,
            width * 0.48,
            35
        );

    }


    /*
     * =========================================
     * HOOP
     * =========================================
     */

    displayHoop() {

        const hoopX =
            width * 0.70;


        const hoopY =
            height * 0.38;


        /*
         * Backboard glow
         */

        noStroke();


        fill(
            150,
            200,
            255,
            8 +
            this.ringFlash * 25
        );


        rect(
            hoopX - 55,
            hoopY - 70,
            110,
            75,
            5
        );


        /*
         * Backboard
         */

        fill(
            8,
            12,
            22,
            220
        );


        stroke(
            190,
            215,
            250,
            110
        );


        strokeWeight(
            1.5
        );


        rect(
            hoopX - 50,
            hoopY - 65,
            100,
            70,
            4
        );


        /*
         * Backboard square
         */

        noFill();


        stroke(
            200,
            220,
            255,
            90
        );


        strokeWeight(
            1
        );


        rect(
            hoopX - 20,
            hoopY - 42,
            40,
            30
        );


        /*
         * Hoop glow
         */

        noStroke();


        fill(
            255,
            150,
            80,
            10 +
            this.ringFlash * 35
        );


        ellipse(
            hoopX,
            hoopY,
            80 +
            this.ringFlash * 20,
            30 +
            this.ringFlash * 10
        );


        /*
         * Rim
         */

        noFill();


        stroke(
            255,
            180,
            100,
            210
        );


        strokeWeight(
            4
        );


        ellipse(
            hoopX,
            hoopY,
            48,
            16
        );


        /*
         * Net
         */

        stroke(
            220,
            225,
            240,
            80
        );


        strokeWeight(
            1
        );


        for (
            let i = -3;
            i <= 3;
            i++
        ) {

            line(

                hoopX +
                i * 6,

                hoopY + 5,

                hoopX +
                i * 4,

                hoopY + 40

            );

        }


        for (
            let i = 0;
            i < 4;
            i++
        ) {

            line(

                hoopX - 18 +
                i * 12,

                hoopY + 12,

                hoopX - 14 +
                i * 9,

                hoopY + 40

            );

        }


        /*
         * Score flash
         */

        if (
            this.ringFlash >
            0.01
        ) {

            noFill();


            stroke(
                200,
                225,
                255,
                this.ringFlash *
                100
            );


            strokeWeight(
                1.5
            );


            ellipse(
                hoopX,
                hoopY,
                65 +
                (
                    1 -
                    this.ringFlash
                ) *
                80,
                28 +
                (
                    1 -
                    this.ringFlash
                ) *
                35
            );

        }

    }


    /*
     * =========================================
     * AIM
     * =========================================
     */

    displayAim() {

        if (
            this.shooting ||
            this.completed
        ) {

            return;

        }


        const hoopX =
            width * 0.70;


        const hoopY =
            height * 0.38;


        /*
         * Aim line
         */

        stroke(
            180,
            215,
            255,
            35
        );


        strokeWeight(
            1
        );


        line(
            this.ballX,
            this.ballY,
            hoopX,
            hoopY
        );


        /*
         * Target ring
         */

        noFill();


        stroke(
            180,
            215,
            255,
            70
        );


        strokeWeight(
            1
        );


        ellipse(
            hoopX,
            hoopY,
            65,
            24
        );


        /*
         * Small target point
         */

        noStroke();


        fill(
            200,
            225,
            255,
            130
        );


        circle(
            hoopX,
            hoopY,
            4
        );

    }


    /*
     * =========================================
     * TRAIL
     * =========================================
     */

    displayTrail() {

        noStroke();


        for (
            let i = 0;
            i < this.trail.length;
            i++
        ) {

            const point =
                this.trail[i];


            const alpha =
                20 +
                (
                    i /
                    this.trail.length
                ) *
                100;


            fill(
                190,
                220,
                255,
                alpha
            );


            circle(
                point.x,
                point.y,
                3 +
                i * 0.25
            );

        }

    }


    /*
     * =========================================
     * BALL
     * =========================================
     */

    displayBall() {

        const pulse =
            sin(
                this.time * 8
            ) *
            0.5 +
            0.5;


        /*
         * Glow
         */

        noStroke();


        fill(
            180,
            215,
            255,
            12
        );


        circle(
            this.ballX,
            this.ballY,
            35 +
            pulse * 8
        );


        fill(
            210,
            225,
            255,
            35
        );


        circle(
            this.ballX,
            this.ballY,
            23
        );


        /*
         * Ball
         */

        fill(
            245,
            245,
            250,
            240
        );


        circle(
            this.ballX,
            this.ballY,
            this.ballRadius * 2
        );


        /*
         * Ball lines
         */

        noFill();


        stroke(
            80,
            90,
            110,
            100
        );


        strokeWeight(
            1
        );


        arc(
            this.ballX,
            this.ballY,
            13,
            13,
            -PI * 0.3,
            PI * 0.7
        );


        arc(
            this.ballX,
            this.ballY,
            13,
            13,
            PI * 0.7,
            PI * 1.7
        );


        /*
         * Highlight
         */

        noStroke();


        fill(
            255,
            255,
            255,
            200
        );


        circle(
            this.ballX - 2,
            this.ballY - 2,
            3
        );

    }


    /*
     * =========================================
     * SCORE PARTICLES
     * =========================================
     */

    createScoreParticles(
        x,
        y
    ) {

        for (
            let i = 0;
            i < 25;
            i++
        ) {

            const angle =
                random(
                    TWO_PI
                );


            const speed =
                random(
                    1,
                    3.5
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
     * MISS PARTICLES
     * =========================================
     */

    createMissParticles(
        x,
        y
    ) {

        for (
            let i = 0;
            i < 14;
            i++
        ) {

            const angle =
                random(
                    TWO_PI
                );


            const speed =
                random(
                    0.5,
                    2
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
                        2.5
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
                180,
                215,
                255,
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
         * Score
         */

        textSize(
            11
        );


        fill(
            190,
            210,
            240,
            150
        );


        text(
            "SHOTS  " +
            this.shots,
            width / 2,
            height * 0.79
        );


        textSize(
            20
        );


        fill(
            255,
            255,
            255,
            220
        );


        text(
            this.score +
            " / 3",
            width / 2,
            height * 0.83
        );


        /*
         * Instruction
         */

        if (
            !this.shooting &&
            !this.completed
        ) {

            textSize(
                9
            );


            fill(
                190,
                205,
                230,
                110
            );


            text(
                "CLICK THE COURT TO SHOOT",
                width / 2,
                height * 0.88
            );

        }


        /*
         * Miss
         */

        if (
            this.missFlash >
            0.05
        ) {

            textSize(
                11
            );


            fill(
                255,
                200,
                210,
                this.missFlash *
                220
            );


            text(
                "MISS",
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

            textSize(
                11
            );


            fill(
                190,
                225,
                255,
                190
            );


            text(
                "THREE SHOTS MADE",
                width / 2,
                height * 0.88
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
            this.shooting ||
            this.completed
        ) {

            return;

        }


        /*
         * Only click inside court.
         */

        if (

            mouseX >
            width * 0.18 &&

            mouseX <
            width * 0.82 &&

            mouseY >
            height * 0.30 &&

            mouseY <
            height * 0.72

        ) {

            /*
             * Start shot
             */

            this.shooting =
                true;


            this.shotProgress =
                0;


            this.shots =
                this.shots;


            this.shotStartX =
                this.ballX;


            this.shotStartY =
                this.ballY;


            /*
             * Ring position
             */

            this.shotTargetX =
                width * 0.70;


            this.shotTargetY =
                height * 0.38;


            /*
             * =================================
             * DETERMINE SHOT
             * =================================
             *
             * Klik dekat target = masuk.
             * Klik jauh = meleset.
             */

            const distanceToTarget =
                dist(

                    mouseX,
                    mouseY,

                    this.shotTargetX,
                    this.shotTargetY

                );


            this.shotMade =
                distanceToTarget <
                110;

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