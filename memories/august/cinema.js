class CinemaScene {

    constructor() {

        this.month =
            "AUGUST 2026";


        this.title =
            "CINEMA";


        this.subtitle =
            "Four seats. One screen.";


        this.buttonText =
            "CONTINUE";


        /*
         * =====================================
         * GAME
         * =====================================
         */

        this.selectedSeats =
            0;


        this.totalSeats =
            4;


        this.completed =
            false;


        /*
         * =====================================
         * PARTICIPANTS
         * =====================================
         */

        this.participants = [

            "BE",
            "AR",
            "EK",
            "SA"

        ];


        /*
         * =====================================
         * SEATS
         * =====================================
         */

        this.seats =
            [];


        /*
         * =====================================
         * EFFECTS
         * =====================================
         */

        this.time =
            0;


        this.hoverSeat =
            -1;


        this.flash =
            0;


        this.screenGlow =
            0;


        /*
         * =====================================
         * PARTICLES
         * =====================================
         */

        this.particles =
            [];

    }


    /*
     * =========================================
     * ENTER
     * =========================================
     */

    enter() {

        this.selectedSeats =
            0;


        this.completed =
            false;


        this.time =
            0;


        this.hoverSeat =
            -1;


        this.flash =
            0;


        this.screenGlow =
            0;


        this.particles =
            [];


        /*
         * =====================================
         * PARTICIPANTS
         * =====================================
         */

        starSystem.showParticipants([

            "BE",
            "AR",
            "EK",
            "SA"

        ]);


        /*
         * =====================================
         * CREATE SEATS
         * =====================================
         */

        this.seats = [

            {

                x:
                    width * 0.40,

                y:
                    height * 0.62,

                selected:
                    false,

                hover:
                    false,

                pulse:
                    random(TWO_PI)

            },


            {

                x:
                    width * 0.60,

                y:
                    height * 0.62,

                selected:
                    false,

                hover:
                    false,

                pulse:
                    random(TWO_PI)

            },


            {

                x:
                    width * 0.40,

                y:
                    height * 0.75,

                selected:
                    false,

                hover:
                    false,

                pulse:
                    random(TWO_PI)

            },


            {

                x:
                    width * 0.60,

                y:
                    height * 0.75,

                selected:
                    false,

                hover:
                    false,

                pulse:
                    random(TWO_PI)

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
         * Fade flash
         */

        this.flash =
            lerp(
                this.flash,
                0,
                0.08
            );


        /*
         * Screen glow
         */

        const targetGlow =
            this.completed
                ? 1
                : 0;


        this.screenGlow =
            lerp(
                this.screenGlow,
                targetGlow,
                0.05
            );


        /*
         * =====================================
         * HOVER
         * =====================================
         */

        this.hoverSeat =
            -1;


        for (
            let i = 0;
            i < this.seats.length;
            i++
        ) {

            const seat =
                this.seats[i];


            seat.hover =
                false;


            seat.pulse +=
                0.025;


            const distance =
                dist(
                    mouseX,
                    mouseY,
                    seat.x,
                    seat.y
                );


            if (
                distance <
                45
            ) {

                seat.hover =
                    true;


                this.hoverSeat =
                    i;

            }

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

        this.displayCinemaBackground();


        this.displayScreen();


        this.displaySeats();


        this.displayParticles();


        this.displayStatus();

    }


    /*
     * =========================================
     * BACKGROUND
     * =========================================
     */

    displayCinemaBackground() {

        /*
         * Dark cinema atmosphere
         */

        noStroke();


        fill(
            2,
            2,
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
         * Ambient lights
         */

        for (
            let i = 0;
            i < 14;
            i++
        ) {

            const x =
                (
                    i * 137
                ) %
                width;


            const y =
                height * 0.10 +
                (
                    i * 61
                ) %
                (
                    height * 0.80
                );


            const pulse =
                sin(
                    this.time * 1.5 +
                    i
                ) *
                0.5 +
                0.5;


            fill(
                170,
                190,
                255,
                5 +
                pulse * 5
            );


            circle(
                x,
                y,
                2
            );

        }


        /*
         * Side wall lights
         */

        fill(
            160,
            190,
            255,
            20
        );


        circle(
            width * 0.08,
            height * 0.50,
            5
        );


        circle(
            width * 0.92,
            height * 0.50,
            5
        );

    }


    /*
     * =========================================
     * SCREEN
     * =========================================
     */

    displayScreen() {

        const screenX =
            width / 2;


        const screenY =
            height * 0.29;


        const screenWidth =
            width * 0.62;


        const screenHeight =
            height * 0.28;


        /*
         * Screen glow
         */

        noStroke();


        fill(
            160,
            200,
            255,
            8 +
            this.screenGlow * 22
        );


        rect(
            screenX -
            screenWidth / 2 -
            20,
            screenY -
            screenHeight / 2 -
            20,
            screenWidth +
            40,
            screenHeight +
            40,
            10
        );


        /*
         * Screen frame
         */

        fill(
            10,
            12,
            20,
            240
        );


        stroke(
            180,
            205,
            245,
            60
        );


        strokeWeight(
            1
        );


        rect(
            screenX -
            screenWidth / 2,
            screenY -
            screenHeight / 2,
            screenWidth,
            screenHeight,
            5
        );


        /*
         * Screen itself
         */

        noStroke();


        if (
            this.completed
        ) {

            /*
             * Film playing
             */

            fill(
                35,
                45,
                70,
                240
            );


            rect(
                screenX -
                screenWidth / 2 +
                8,
                screenY -
                screenHeight / 2 +
                8,
                screenWidth -
                16,
                screenHeight -
                16,
                3
            );


            /*
             * Moving film light
             */

            const moviePulse =
                sin(
                    this.time * 1.5
                ) *
                0.5 +
                0.5;


            fill(
                180,
                210,
                255,
                25 +
                moviePulse * 25
            );


            ellipse(
                screenX,
                screenY,
                screenWidth * 0.45,
                screenHeight * 0.80
            );


            /*
             * Film shapes
             */

            fill(
                220,
                230,
                255,
                80
            );


            circle(
                screenX -
                55,
                screenY -
                15,
                18
            );


            circle(
                screenX +
                50,
                screenY +
                18,
                12
            );


            fill(
                255,
                255,
                255,
                100
            );


            rect(
                screenX -
                35,
                screenY +
                30,
                70,
                2
            );


            rect(
                screenX -
                20,
                screenY +
                37,
                40,
                2
            );

        }

        else {

            /*
             * Empty cinema screen
             */

            fill(
                15,
                18,
                28,
                230
            );


            rect(
                screenX -
                screenWidth / 2 +
                8,
                screenY -
                screenHeight / 2 +
                8,
                screenWidth -
                16,
                screenHeight -
                16,
                3
            );


            /*
             * Screen standby glow
             */

            fill(
                150,
                180,
                220,
                15
            );


            ellipse(
                screenX,
                screenY,
                screenWidth * 0.35,
                screenHeight * 0.65
            );


            /*
             * Screen text
             */

            textAlign(
                CENTER,
                CENTER
            );


            textFont(
                "Cormorant Garamond"
            );


            textSize(
                18
            );


            fill(
                220,
                230,
                250,
                100
            );


            text(
                "SELECT YOUR SEAT",
                screenX,
                screenY
            );

        }


        /*
         * =====================================
         * SCREEN LIGHT BEAM
         * =====================================
         */

        if (
            this.completed
        ) {

            noStroke();


            fill(
                180,
                210,
                255,
                5 +
                this.screenGlow * 5
            );


            triangle(

                screenX -
                screenWidth / 2,

                screenY +
                screenHeight / 2,

                screenX -
                screenWidth * 0.20,

                height,

                screenX +
                screenWidth * 0.20,

                height

            );

        }

    }


    /*
     * =========================================
     * SEATS
     * =========================================
     */

    displaySeats() {

        for (
            let i = 0;
            i < this.seats.length;
            i++
        ) {

            this.displaySeat(
                this.seats[i],
                i
            );

        }

    }


    /*
     * =========================================
     * SINGLE SEAT
     * =========================================
     */

    displaySeat(
        seat,
        index
    ) {

        const hover =
            seat.hover
                ? 1
                : 0;


        const selected =
            seat.selected
                ? 1
                : 0;


        const pulse =
            sin(
                seat.pulse
            ) *
            0.5 +
            0.5;


        /*
         * Seat glow
         */

        noStroke();


        fill(
            150,
            190,
            255,
            8 +
            hover * 15 +
            selected * 25
        );


        ellipse(
            seat.x,
            seat.y,
            90 +
            pulse * 8,
            65 +
            pulse * 6
        );


        /*
         * Hover ring
         */

        if (
            hover ||
            selected
        ) {

            noFill();


            stroke(
                170,
                205,
                255,
                70 +
                hover * 70 +
                selected * 50
            );


            strokeWeight(
                1
            );


            ellipse(
                seat.x,
                seat.y,
                75 +
                pulse * 8,
                60 +
                pulse * 5
            );

        }


        /*
         * =====================================
         * SEAT BACK
         * =====================================
         */

        rectMode(
            CENTER
        );


        fill(
            15,
            17,
            25,
            240
        );


        stroke(
            170,
            190,
            220,
            60 +
            selected * 100
        );


        strokeWeight(
            1.5
        );


        rect(
            seat.x,
            seat.y - 10,
            54,
            40,
            8
        );


        /*
         * Seat cushion
         */

        fill(
            selected
                ? 70
                : 30,
            selected
                ? 90
                : 35,
            selected
                ? 130
                : 50,
            210
        );


        noStroke();


        rect(
            seat.x,
            seat.y + 15,
            58,
            24,
            6
        );


        /*
         * Arm rests
         */

        stroke(
            180,
            195,
            220,
            90
        );


        strokeWeight(
            3
        );


        line(
            seat.x - 32,
            seat.y + 4,
            seat.x - 32,
            seat.y + 20
        );


        line(
            seat.x + 32,
            seat.y + 4,
            seat.x + 32,
            seat.y + 20
        );


        /*
         * Selection light
         */

        if (
            selected
        ) {

            noStroke();


            fill(
                180,
                215,
                255,
                180
            );


            circle(
                seat.x,
                seat.y - 10,
                5
            );


            /*
             * Check mark
             */

            noFill();


            stroke(
                210,
                230,
                255,
                200
            );


            strokeWeight(
                2
            );


            line(
                seat.x - 7,
                seat.y - 10,
                seat.x - 2,
                seat.y - 5
            );


            line(
                seat.x - 2,
                seat.y - 5,
                seat.x + 8,
                seat.y - 16
            );

        }


        /*
         * Seat number
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
            8
        );


        fill(
            200,
            210,
            230,
            selected
                ? 170
                : 70
        );


        text(
            "SEAT " +
            (index + 1),
            seat.x,
            seat.y + 40
        );


        rectMode(
            CORNER
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
                210,
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
         * =====================================
         * NORMAL
         * =====================================
         */

        if (
            !this.completed
        ) {

            textSize(
                10
            );


            fill(
                210,
                220,
                240,
                150
            );


            text(
                "CHOOSE A SEAT",
                width / 2,
                height * 0.86
            );


            /*
             * Progress
             */

            textSize(
                12
            );


            fill(
                255,
                255,
                255,
                190
            );


            text(
                this.selectedSeats +
                " / " +
                this.totalSeats +
                " SEATS",
                width / 2,
                height * 0.90
            );

        }


        /*
         * =====================================
         * COMPLETE
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
                225,
                255,
                190
            );


            text(
                "LIGHTS OFF",
                width / 2,
                height * 0.86
            );


            textSize(
                9
            );


            fill(
                190,
                205,
                230,
                120
            );


            text(
                "THE SCREEN COMES ALIVE",
                width / 2,
                height * 0.90
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
         * Cek setiap kursi.
         */

        for (
            let i = 0;
            i < this.seats.length;
            i++
        ) {

            const seat =
                this.seats[i];


            /*
             * Kursi sudah dipilih?
             */

            if (
                seat.selected
            ) {

                continue;

            }


            const distance =
                dist(
                    mouseX,
                    mouseY,
                    seat.x,
                    seat.y
                );


            /*
             * Klik kursi
             */

            if (
                distance <
                45
            ) {

                seat.selected =
                    true;


                this.selectedSeats++;


                this.flash =
                    1;


                /*
                 * Particle effect
                 */

                this.createParticles(
                    seat.x,
                    seat.y
                );


                /*
                 * =================================
                 * CHECK COMPLETE
                 * =================================
                 */

                if (
                    this.selectedSeats >=
                    this.totalSeats
                ) {

                    this.completed =
                        true;


                    this.screenGlow =
                        1;


                    /*
                     * Cinema celebration
                     */

                    for (
                        let p = 0;
                        p < 35;
                        p++
                    ) {

                        this.createParticles(

                            width / 2 +
                            random(
                                -150,
                                150
                            ),

                            height * 0.35 +
                            random(
                                -60,
                                60
                            )

                        );

                    }

                }


                /*
                 * Satu klik hanya
                 * memilih satu kursi.
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