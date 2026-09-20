class PadelScene {

    constructor() {

        this.month =
            "AUGUST 2026";


        this.title =
            "PADEL";


        this.subtitle =
            "Keep the rally alive.";


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


        this.ballVX =
            5;


        this.ballVY =
            2;


        this.ballRadius =
            7;


        /*
         * =====================================
         * PADDLE
         * =====================================
         */

        this.paddleX =
            0;


        this.paddleY =
            0;


        this.paddleWidth =
            13;


        this.paddleHeight =
            90;


        /*
         * =====================================
         * GAME
         * =====================================
         */

        this.rally =
            0;


        /*
         * Target hanya 3 kali tangkis
         */

        this.targetRally =
            3;


        this.completed =
            false;


        this.missed =
            false;


        this.resetTimer =
            0;


        /*
         * =====================================
         * EFFECTS
         * =====================================
         */

        this.hitFlash =
            0;


        this.missFlash =
            0;


        this.hitPulse =
            0;


        this.messageAlpha =
            0;


        /*
         * =====================================
         * TRAIL
         * =====================================
         */

        this.trail =
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
         * GAME STATE
         * =====================================
         */

        this.waitingForBall =
            false;

    }


    /*
     * =========================================
     * ENTER
     * =========================================
     */

    enter() {

        this.rally =
            0;


        this.completed =
            false;


        this.missed =
            false;


        this.resetTimer =
            0;


        this.hitFlash =
            0;


        this.missFlash =
            0;


        this.hitPulse =
            0;


        this.messageAlpha =
            0;


        this.trail =
            [];


        this.particles =
            [];


        this.waitingForBall =
            false;


        /*
         * Initial ball
         *
         * 1 = langsung bergerak
         * menuju paddle.
         */

        this.resetBall(
            1
        );


        /*
         * Paddle
         */

        this.paddleX =
            width * 0.78;


        this.paddleY =
            height / 2;


        /*
         * Participants
         */

        starSystem.showParticipants([

            "SH",
            "SA",
            "ZA",
            "EK",
            "FA",
            "AR"

        ]);

    }


    /*
     * =========================================
     * RESET BALL
     * =========================================
     *
     * Ball selalu muncul kembali
     * tanpa mengubah nilai rally.
     *
     */

    resetBall(
        direction = 1
    ) {

        this.ballX =
            width * 0.50;


        this.ballY =
            height * 0.50;


        /*
         * Kecepatan sedikit meningkat
         * berdasarkan rally.
         */

        const baseSpeed =
            4.5 +
            min(
                this.rally * 0.20,
                2.5
            );


        /*
         * Ball menuju paddle
         */

        this.ballVX =
            direction *
            baseSpeed;


        this.ballVY =
            random(
                -2.2,
                2.2
            );


        /*
         * Clear trail
         */

        this.trail =
            [];


        /*
         * Reset state bola
         */

        this.missed =
            false;


        this.waitingForBall =
            false;


        this.resetTimer =
            0;

    }


    /*
     * =========================================
     * UPDATE
     * =========================================
     */

    update() {

        /*
         * =====================================
         * EFFECTS
         * =====================================
         */

        this.hitFlash =
            lerp(
                this.hitFlash,
                0,
                0.10
            );


        this.missFlash =
            lerp(
                this.missFlash,
                0,
                0.06
            );


        this.hitPulse =
            lerp(
                this.hitPulse,
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
         * MISSED BALL
         * =====================================
         *
         * Jika gagal:
         *
         * 0 / 3 -> tetap 0 / 3
         * 1 / 3 -> tetap 1 / 3
         * 2 / 3 -> tetap 2 / 3
         *
         * Tidak reset rally.
         */

        if (
            this.waitingForBall
        ) {

            this.resetTimer++;


            /*
             * Tunggu sebentar sebelum
             * bola berikutnya muncul.
             */

            if (
                this.resetTimer > 45
            ) {

                this.resetBall(
                    1
                );

            }


            this.updateParticles();


            return;

        }


        /*
         * =====================================
         * STORE TRAIL
         * =====================================
         */

        this.trail.push({

            x:
                this.ballX,

            y:
                this.ballY,

            alpha:
                170

        });


        if (
            this.trail.length > 12
        ) {

            this.trail.shift();

        }


        /*
         * Fade trail
         */

        for (
            const point
            of this.trail
        ) {

            point.alpha *=
                0.90;

        }


        /*
         * =====================================
         * MOVE BALL
         * =====================================
         */

        this.ballX +=
            this.ballVX;


        this.ballY +=
            this.ballVY;


        /*
         * =====================================
         * COURT BOUNDARIES
         * =====================================
         */

        const top =
            height * 0.30;


        const bottom =
            height * 0.70;


        /*
         * =====================================
         * TOP WALL
         * =====================================
         */

        if (
            this.ballY -
            this.ballRadius <
            top
        ) {

            this.ballY =
                top +
                this.ballRadius;


            this.ballVY =
                abs(
                    this.ballVY
                );

        }


        /*
         * =====================================
         * BOTTOM WALL
         * =====================================
         */

        if (
            this.ballY +
            this.ballRadius >
            bottom
        ) {

            this.ballY =
                bottom -
                this.ballRadius;


            this.ballVY =
                -abs(
                    this.ballVY
                );

        }


        /*
         * =====================================
         * LEFT WALL
         * =====================================
         */

        const left =
            width * 0.25;


        if (
            this.ballX -
            this.ballRadius <
            left
        ) {

            this.ballX =
                left +
                this.ballRadius;


            this.ballVX =
                abs(
                    this.ballVX
                );

        }


        /*
         * =====================================
         * PADDLE POSITION
         * =====================================
         */

        this.paddleY =
            constrain(
                mouseY,
                top + 50,
                bottom - 50
            );


        /*
         * =====================================
         * PADDLE COLLISION
         * =====================================
         */

        if (
            this.ballVX > 0
        ) {

            const paddleLeft =
                this.paddleX -
                this.paddleWidth;


            const paddleRight =
                this.paddleX +
                this.paddleWidth;


            const paddleTop =
                this.paddleY -
                this.paddleHeight / 2;


            const paddleBottom =
                this.paddleY +
                this.paddleHeight / 2;


            if (

                this.ballX +
                this.ballRadius >=
                paddleLeft &&

                this.ballX -
                this.ballRadius <=
                paddleRight &&

                this.ballY >=
                paddleTop &&

                this.ballY <=
                paddleBottom

            ) {

                this.hitBall();

            }

        }


        /*
         * =====================================
         * BALL MISSED
         * =====================================
         */

        if (
            this.ballX >
            width * 0.90
        ) {

            this.missBall();

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
     * HIT BALL
     * =========================================
     */

    hitBall() {

        /*
         * Prevent repeated collision
         */

        if (
            this.ballVX < 0
        ) {

            return;

        }


        /*
         * Send ball back
         */

        this.ballVX =
            -abs(
                this.ballVX
            );


        /*
         * Change vertical direction
         * berdasarkan posisi paddle.
         */

        const offset =
            (
                this.ballY -
                this.paddleY
            ) /
            (
                this.paddleHeight / 2
            );


        this.ballVY =
            offset *
            4.5;


        /*
         * =====================================
         * INCREASE RALLY
         * =====================================
         */

        this.rally++;


        /*
         * =====================================
         * HIT EFFECT
         * =====================================
         */

        this.hitFlash =
            1;


        this.hitPulse =
            1;


        this.messageAlpha =
            1;


        /*
         * Particle burst
         */

        this.createHitParticles(
            this.ballX,
            this.ballY
        );


        /*
         * =====================================
         * COMPLETED
         * =====================================
         */

        if (
            this.rally >=
            this.targetRally
        ) {

            this.completed =
                true;

        }

    }


    /*
     * =========================================
     * MISS BALL
     * =========================================
     */

    missBall() {

        /*
         * Prevent repeated miss
         */

        if (
            this.waitingForBall
        ) {

            return;

        }


        this.missed =
            true;


        this.waitingForBall =
            true;


        this.resetTimer =
            0;


        /*
         * =====================================
         * IMPORTANT
         * =====================================
         *
         * Rally TIDAK di-reset.
         *
         * Contoh:
         *
         * 0 / 3 -> gagal -> tetap 0 / 3
         *
         * 1 / 3 -> gagal -> tetap 1 / 3
         *
         * 2 / 3 -> gagal -> tetap 2 / 3
         *
         */

        /*
         * Jangan lakukan:
         *
         * this.rally = 0;
         *
         */


        /*
         * Effects
         */

        this.missFlash =
            1;


        this.messageAlpha =
            1;


        /*
         * Particle burst
         */

        this.createMissParticles(
            this.ballX,
            this.ballY
        );

    }


    /*
     * =========================================
     * HIT PARTICLES
     * =========================================
     */

    createHitParticles(
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
            i < 12;
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
     * DISPLAY
     * =========================================
     */

    display() {

        /*
         * Court
         */

        this.displayCourt();


        /*
         * Trail
         */

        this.displayTrail();


        /*
         * Particles
         */

        this.displayParticles();


        /*
         * Paddle
         */

        this.displayPaddle();


        /*
         * Ball
         */

        this.displayBall();


        /*
         * Status
         */

        this.displayStatus();

    }


    /*
     * =========================================
     * COURT
     * =========================================
     */

    displayCourt() {

        const left =
            width * 0.25;


        const top =
            height * 0.30;


        const courtWidth =
            width * 0.50;


        const courtHeight =
            height * 0.40;


        /*
         * Outer glow
         */

        noFill();


        stroke(
            120,
            180,
            255,
            15
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
            100
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
         * Court center line
         */

        stroke(
            180,
            210,
            255,
            55
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
         * Service lines
         */

        line(
            width * 0.37,
            top,
            width * 0.37,
            top +
            courtHeight
        );


        line(
            width * 0.63,
            top,
            width * 0.63,
            top +
            courtHeight
        );


        /*
         * Horizontal center
         */

        line(
            width * 0.37,
            height * 0.50,
            width * 0.63,
            height * 0.50
        );


        /*
         * Net
         */

        stroke(
            220,
            230,
            255,
            120
        );


        strokeWeight(
            2
        );


        line(
            width / 2,
            top - 5,
            width / 2,
            top +
            courtHeight +
            5
        );


        /*
         * Net glow dots
         */

        noStroke();


        for (
            let i = 0;
            i < 7;
            i++
        ) {

            const y =
                top +
                i *
                courtHeight /
                6;


            fill(
                200,
                220,
                255,
                70
            );


            circle(
                width / 2,
                y,
                3
            );

        }


        /*
         * Court corners
         */

        this.displayCorner(
            left,
            top
        );


        this.displayCorner(
            left +
            courtWidth,
            top
        );


        this.displayCorner(
            left,
            top +
            courtHeight
        );


        this.displayCorner(
            left +
            courtWidth,
            top +
            courtHeight
        );

    }


    /*
     * =========================================
     * COURT CORNER
     * =========================================
     */

    displayCorner(
        x,
        y
    ) {

        noStroke();


        fill(
            170,
            215,
            255,
            130
        );


        circle(
            x,
            y,
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
                point.alpha *
                (
                    i /
                    this.trail.length
                );


            fill(
                180,
                220,
                255,
                alpha
            );


            circle(
                point.x,
                point.y,
                3 +
                i * 0.3
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
                170,
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
     * PADDLE
     * =========================================
     */

    displayPaddle() {

        const paddleY =
            constrain(
                mouseY,
                height * 0.30 + 50,
                height * 0.70 - 50
            );


        const x =
            this.paddleX;


        /*
         * Glow
         */

        noStroke();


        fill(
            150,
            210,
            255,
            15
        );


        ellipse(
            x,
            paddleY,
            55,
            125
        );


        /*
         * Racket head
         */

        noFill();


        stroke(
            200,
            225,
            255,
            190
        );


        strokeWeight(
            3
        );


        ellipse(
            x,
            paddleY - 22,
            42,
            55
        );


        /*
         * Racket inner strings
         */

        stroke(
            180,
            210,
            245,
            45
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
                x - 16,
                paddleY - 22 +
                i * 7,
                x + 16,
                paddleY - 22 +
                i * 7
            );

        }


        for (
            let i = -3;
            i <= 3;
            i++
        ) {

            line(
                x + i * 6,
                paddleY - 47,
                x + i * 6,
                paddleY + 3
            );

        }


        /*
         * Handle
         */

        stroke(
            210,
            225,
            245,
            180
        );


        strokeWeight(
            5
        );


        line(
            x,
            paddleY + 3,
            x,
            paddleY + 48
        );


        /*
         * Handle end
         */

        strokeWeight(
            6
        );


        line(
            x - 5,
            paddleY + 48,
            x + 5,
            paddleY + 48
        );

    }


    /*
     * =========================================
     * BALL
     * =========================================
     */

    displayBall() {

        if (
            this.waitingForBall
        ) {

            return;

        }


        const pulse =
            sin(
                frameCount * 0.15
            ) *
            0.5 +
            0.5;


        /*
         * Ball glow
         */

        noStroke();


        fill(
            170,
            220,
            255,
            20
        );


        circle(
            this.ballX,
            this.ballY,
            30 +
            pulse * 8
        );


        fill(
            190,
            230,
            255,
            45
        );


        circle(
            this.ballX,
            this.ballY,
            19
        );


        /*
         * Ball
         */

        fill(
            245,
            250,
            255
        );


        circle(
            this.ballX,
            this.ballY,
            this.ballRadius * 2
        );


        /*
         * Highlight
         */

        fill(
            255,
            255,
            255,
            220
        );


        circle(
            this.ballX - 2,
            this.ballY - 2,
            3
        );

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
         * Rally label
         */

        fill(
            220,
            230,
            255,
            180
        );


        textSize(
            11
        );


        text(
            "RALLY",
            width / 2,
            height * 0.78
        );


        /*
         * Rally counter
         */

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
            this.rally +
            " / " +
            this.targetRally,
            width / 2,
            height * 0.82
        );


        /*
         * =====================================
         * NORMAL INSTRUCTION
         * =====================================
         */

        if (
            !this.completed &&
            !this.waitingForBall
        ) {

            textSize(
                9
            );


            fill(
                200,
                215,
                240,
                100
            );


            text(
                "MOVE YOUR MOUSE TO RETURN THE BALL",
                width / 2,
                height * 0.87
            );

        }


        /*
         * =====================================
         * MISS MESSAGE
         * =====================================
         */

        if (
            this.waitingForBall
        ) {

            textSize(
                12
            );


            fill(
                255,
                200,
                210,
                this.missFlash *
                220 +
                50
            );


            text(
                "MISS",
                width / 2,
                height * 0.78
            );


            /*
             * Jelaskan bahwa rally
             * tidak hilang.
             */

            textSize(
                9
            );


            fill(
                210,
                220,
                240,
                130
            );


            text(
                "TRY AGAIN — RALLY " +
                this.rally +
                " / " +
                this.targetRally,
                width / 2,
                height * 0.87
            );

        }


        /*
         * =====================================
         * COMPLETED
         * =====================================
         */

        if (
            this.completed
        ) {

            textSize(
                11
            );


            fill(
                180,
                225,
                255,
                190
            );


            text(
                "RALLY COMPLETE",
                width / 2,
                height * 0.87
            );

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