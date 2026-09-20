class FutsalScene {

    constructor() {

        this.month =
            "SEPTEMBER 2026";


        this.title =
            "FUTSAL";


        this.subtitle =
            "A ball. A small court. A moment.";


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


        this.startX =
            0;

        this.startY =
            0;


        this.targetX =
            0;

        this.targetY =
            0;


        /*
         * =====================================
         * GAME
         * =====================================
         */

        this.goals =
            0;


        this.targetGoals =
            3;


        this.shooting =
            false;


        this.shotProgress =
            0;


        this.completed =
            false;


        this.miss =
            false;


        /*
         * =====================================
         * TARGET
         * =====================================
         */

        this.targetOffset =
            0;


        /*
         * =====================================
         * EFFECTS
         * =====================================
         */

        this.particles =
            [];


        this.trail =
            [];


        this.message =
            "";


        this.messageAlpha =
            0;


        this.time =
            0;

    }


    /*
     * =========================================
     * ENTER
     * =========================================
     */

    enter() {

        this.startX =
            width * 0.32;


        this.startY =
            height * 0.57;


        this.ballX =
            this.startX;


        this.ballY =
            this.startY;


        this.targetX =
            width * 0.73;


        this.targetY =
            height * 0.50;


        this.goals =
            0;


        this.shooting =
            false;


        this.shotProgress =
            0;


        this.completed =
            false;


        this.miss =
            false;


        this.targetOffset =
            0;


        this.particles =
            [];


        this.trail =
            [];


        this.message =
            "";


        this.messageAlpha =
            0;


        this.time =
            0;


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
         * Target bergerak sedikit
         */

        this.targetOffset =
            sin(
                this.time * 2
            ) *
            22;


        this.targetY =
            height * 0.50 +
            this.targetOffset;


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
         * =====================================
         * SHOOTING
         * =====================================
         */

        if (
            this.shooting
        ) {

            this.shotProgress +=
                0.035;


            const t =
                min(
                    this.shotProgress,
                    1
                );


            /*
             * Ball movement
             */

            this.ballX =
                lerp(
                    this.startX,
                    this.targetX,
                    t
                );


            this.ballY =
                lerp(
                    this.startY,
                    this.targetY,
                    t
                ) -
                sin(
                    t * PI
                ) *
                100;


            /*
             * Ball trail
             */

            this.trail.push({

                x:
                    this.ballX,

                y:
                    this.ballY,

                life:
                    1

            });


            if (
                this.trail.length >
                15
            ) {

                this.trail.shift();

            }


            /*
             * End of shot
             */

            if (
                t >= 1
            ) {

                this.shooting =
                    false;


                /*
                 * Random chance whether
                 * the shot enters the goal.
                 *
                 * Target is easier than
                 * normal shooting.
                 */

                const goalChance =
                    random();


                if (
                    goalChance >
                    0.25
                ) {

                    this.scoreGoal();

                }

                else {

                    this.missShot();

                }

            }

        }


        /*
         * Trail fade
         */

        for (
            const point
            of this.trail
        ) {

            point.life -=
                0.06;

        }


        this.trail =
            this.trail.filter(
                point =>
                    point.life > 0
            );


        /*
         * Particles
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


        this.displayCourt();


        this.displayGoal();


        this.displayKeeper();


        this.displayTarget();


        this.displayTrail();


        this.displayBall();


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
            4,
            8,
            240
        );


        rect(
            0,
            0,
            width,
            height
        );


        /*
         * Ambient lights
         */

        for (
            let i = 0;
            i < 18;
            i++
        ) {

            const x =
                (
                    i * 193
                ) %
                width;


            const y =
                (
                    i * 97
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
                190,
                220,
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
            width * 0.13;


        const top =
            height * 0.25;


        const courtWidth =
            width * 0.74;


        const courtHeight =
            height * 0.50;


        /*
         * Court glow
         */

        noStroke();


        fill(
            100,
            170,
            255,
            5
        );


        rect(
            left - 10,
            top - 10,
            courtWidth + 20,
            courtHeight + 20,
            10
        );


        /*
         * Court

         */

        fill(
            7,
            14,
            22,
            230
        );


        stroke(
            170,
            205,
            240,
            80
        );


        strokeWeight(
            2
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
            210,
            240,
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
         * Center circle

         */

        noFill();


        stroke(
            180,
            210,
            240,
            40
        );


        circle(
            width / 2,
            height * 0.50,
            100
        );


        /*
         * Penalty area

         */

        rect(
            width * 0.63,
            height * 0.37,
            width * 0.24,
            height * 0.26
        );


        /*
         * Small penalty circle

         */

        circle(
            width * 0.67,
            height * 0.50,
            7
        );


        /*
         * Side markings

         */

        line(
            width * 0.25,
            top,
            width * 0.25,
            top + 18
        );


        line(
            width * 0.25,
            top + courtHeight - 18,
            width * 0.25,
            top + courtHeight
        );

    }


    /*
     * =========================================
     * GOAL
     * =========================================
     */

    displayGoal() {

        const gx =
            width * 0.83;


        const gy =
            height * 0.40;


        const gw =
            width * 0.08;


        const gh =
            height * 0.20;


        /*
         * Net glow

         */

        noFill();


        stroke(
            220,
            230,
            245,
            35
        );


        strokeWeight(
            1
        );


        rect(
            gx,
            gy,
            gw,
            gh
        );


        /*
         * Net lines

         */

        for (
            let x = gx;
            x <= gx + gw;
            x += 10
        ) {

            line(
                x,
                gy,
                x,
                gy + gh
            );

        }


        for (
            let y = gy;
            y <= gy + gh;
            y += 10
        ) {

            line(
                gx,
                y,
                gx + gw,
                y
            );

        }


        /*
         * Goal posts

         */

        stroke(
            245,
            245,
            250,
            150
        );


        strokeWeight(
            3
        );


        line(
            gx,
            gy,
            gx,
            gy + gh
        );


        line(
            gx,
            gy,
            gx + gw,
            gy
        );


        line(
            gx + gw,
            gy,
            gx + gw,
            gy + gh
        );


        /*
         * Goal line

         */

        stroke(
            255,
            255,
            255,
            100
        );


        strokeWeight(
            2
        );


        line(
            gx - 12,
            gy,
            gx - 12,
            gy + gh
        );

    }


    /*
     * =========================================
     * KEEPER
     * =========================================
     */

    displayKeeper() {

        const keeperX =
            width * 0.79;


        const keeperY =
            height * 0.50;


        /*
         * Slight movement
         */

        const movement =
            sin(
                this.time * 2.5
            ) *
            10;


        /*
         * Body

         */

        noStroke();


        fill(
            165,
            205,
            255,
            100
        );


        ellipse(
            keeperX + movement,
            keeperY,
            18,
            35
        );


        /*
         * Head

         */

        fill(
            210,
            225,
            245,
            130
        );


        circle(
            keeperX + movement,
            keeperY - 25,
            13
        );


        /*
         * Arms

         */

        stroke(
            175,
            210,
            255,
            100
        );


        strokeWeight(
            3
        );


        line(
            keeperX + movement - 5,
            keeperY - 2,
            keeperX + movement - 18,
            keeperY - 10
        );


        line(
            keeperX + movement + 5,
            keeperY - 2,
            keeperX + movement + 18,
            keeperY - 10
        );

    }


    /*
     * =========================================
     * TARGET
     * =========================================
     */

    displayTarget() {

        if (
            this.shooting
        ) {

            return;

        }


        const pulse =
            sin(
                this.time * 4
            ) *
            0.5 +
            0.5;


        noFill();


        stroke(
            180,
            220,
            255,
            70 +
            pulse * 80
        );


        strokeWeight(
            2
        );


        circle(
            this.targetX,
            this.targetY,
            45 +
            pulse * 8
        );


        /*
         * Crosshair

         */

        stroke(
            200,
            230,
            255,
            80
        );


        line(
            this.targetX - 28,
            this.targetY,
            this.targetX + 28,
            this.targetY
        );


        line(
            this.targetX,
            this.targetY - 28,
            this.targetX,
            this.targetY + 28
        );


        /*
         * Small text

         */

        noStroke();


        textAlign(
            CENTER,
            CENTER
        );


        textFont(
            "Inter"
        );


        textSize(
            7
        );


        fill(
            200,
            225,
            255,
            110
        );


        text(
            "AIM",
            this.targetX,
            this.targetY - 38
        );

    }


    /*
     * =========================================
     * BALL
     * =========================================
     */

    displayBall() {

        /*
         * Ball glow

         */

        noStroke();


        fill(
            180,
            220,
            255,
            10
        );


        circle(
            this.ballX,
            this.ballY,
            35
        );


        /*
         * Ball

         */

        fill(
            245,
            245,
            245,
            245
        );


        circle(
            this.ballX,
            this.ballY,
            17
        );


        /*
         * Ball detail

         */

        stroke(
            80,
            90,
            105,
            100
        );


        strokeWeight(
            1
        );


        noFill();


        arc(
            this.ballX,
            this.ballY,
            10,
            10,
            0,
            PI
        );


        arc(
            this.ballX,
            this.ballY,
            8,
            8,
            PI,
            TWO_PI
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
            const point
            of this.trail
        ) {

            fill(
                180,
                220,
                255,
                point.life *
                60
            );


            circle(
                point.x,
                point.y,
                point.life * 10
            );

        }

    }


    /*
     * =========================================
     * PARTICLES
     * =========================================
     */

    displayParticles() {

        noStroke();


        for (
            const particle
            of this.particles
        ) {

            fill(
                190,
                225,
                255,
                particle.life *
                170
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
            12
        );


        fill(
            220,
            230,
            245,
            180
        );


        text(
            "GOALS  " +
            this.goals +
            " / " +
            this.targetGoals,
            width / 2,
            height * 0.80
        );


        /*
         * Instruction

         */

        textSize(
            9
        );


        if (
            !this.completed
        ) {

            fill(
                205,
                215,
                230,
                100
            );


            if (
                this.shooting
            ) {

                text(
                    "SHOT IN PROGRESS",
                    width / 2,
                    height * 0.85
                );

            }

            else {

                text(
                    "CLICK THE BALL TO SHOOT",
                    width / 2,
                    height * 0.85
                );

            }

        }


        /*
         * Miss message

         */

        if (
            this.miss &&
            this.messageAlpha >
            0.05
        ) {

            fill(
                255,
                210,
                210,
                this.messageAlpha *
                170
            );


            text(
                this.message,
                width / 2,
                height * 0.73
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
                220,
                235,
                255,
                190
            );


            text(
                "GOAL × 3",
                width / 2,
                height * 0.86
            );

        }

    }


    /*
     * =========================================
     * SHOOT
     * =========================================
     */

    mousePressed() {

        if (
            this.shooting ||
            this.completed
        ) {

            return;

        }


        const distance =
            dist(

                mouseX,
                mouseY,

                this.ballX,
                this.ballY

            );


        if (
            distance <
            45
        ) {

            this.shooting =
                true;


            this.shotProgress =
                0;


            this.miss =
                false;


            this.message =
                "";


            this.messageAlpha =
                0;


            this.trail =
                [];

        }

    }


    /*
     * =========================================
     * GOAL
     * =========================================
     */

    scoreGoal() {

        this.goals++;


        this.message =
            "GOAL";


        this.messageAlpha =
            1;


        this.createParticles(

            this.targetX,

            this.targetY

        );


        /*
         * Complete after 3 goals

         */

        if (
            this.goals >=
            this.targetGoals
        ) {

            this.completed =
                true;


            this.message =
                "GOAL × 3";


            this.messageAlpha =
                1;


            return;

        }


        /*
         * Reset ball

         */

        this.ballX =
            this.startX;


        this.ballY =
            this.startY;

    }


    /*
     * =========================================
     * MISS
     * =========================================
     */

    missShot() {

        this.miss =
            true;


        this.message =
            "MISS — TRY AGAIN";


        this.messageAlpha =
            1;


        /*
         * No score reset.
         * Previous goals remain.
         */

        this.ballX =
            this.startX;


        this.ballY =
            this.startY;

    }


    /*
     * =========================================
     * PARTICLE CREATOR
     * =========================================
     */

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
                        4
                    )

            });

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