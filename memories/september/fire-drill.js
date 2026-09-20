class FireDrillScene {

    constructor() {

        this.month =
            "SEPTEMBER 2026";


        this.title =
            "FIRE DRILL";


        this.subtitle =
            "An alarm. A sudden movement. Then the fire truck.";


        this.buttonText =
            "CONTINUE";


        /*
         * =====================================
         * GAME STAGE
         * =====================================
         *
         * 0 = Alarm
         * 1 = Evacuate
         * 2 = Safe Area
         * 3 = Fire
         * 4 = Fire Truck
         * 5 = Complete
         */

        this.stage =
            0;


        this.completed =
            false;


        /*
         * =====================================
         * TIMER
         * =====================================
         */

        this.timer =
            0;


        /*
         * =====================================
         * EFFECTS
         * =====================================
         */

        this.alarmPulse =
            0;


        this.screenFlash =
            0;


        this.truckProgress =
            0;


        this.firePulse =
            0;


        this.message =
            "";


        this.messageAlpha =
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

        this.stage =
            0;


        this.completed =
            false;


        this.timer =
            0;


        this.alarmPulse =
            0;


        this.screenFlash =
            0;


        this.truckProgress =
            0;


        this.firePulse =
            0;


        this.message =
            "";


        this.messageAlpha =
            0;


        this.particles =
            [];


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

        this.timer +=
            1;


        /*
         * Alarm pulse
         */

        this.alarmPulse =
            sin(
                frameCount *
                0.15
            ) *
            0.5 +
            0.5;


        /*
         * Fire animation
         */

        this.firePulse =
            sin(
                frameCount *
                0.12
            ) *
            0.5 +
            0.5;


        /*
         * Flash fade
         */

        this.screenFlash =
            lerp(
                this.screenFlash,
                0,
                0.08
            );


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
         * STAGE 3
         * =====================================
         *
         * Setelah player berhasil menuju
         * safe area, api muncul.
         */

        if (
            this.stage === 3
        ) {

            /*
             * Fire lasts for a moment
             * before truck arrives.
             */

            if (
                this.timer >
                100
            ) {

                this.stage =
                    4;


                this.timer =
                    0;


                this.truckProgress =
                    0;

            }

        }


        /*
         * =====================================
         * STAGE 4
         * =====================================
         *
         * Fire truck approaches.
         */

        if (
            this.stage === 4
        ) {

            this.truckProgress +=
                0.012;


            if (
                this.truckProgress >=
                1
            ) {

                this.truckProgress =
                    1;


                this.stage =
                    5;


                this.completed =
                    true;


                this.message =
                    "DRILL COMPLETE";


                this.messageAlpha =
                    1;


                this.createParticles(

                    width / 2,

                    height * 0.60

                );

            }

        }


        /*
         * Particles
         */

        this.updateParticles();

    }


    /*
     * =========================================
     * DISPLAY
     * =========================================
     */

    display() {

        this.displayBackground();


        /*
         * Stage-specific display
         */

        if (
            this.stage === 0
        ) {

            this.displayAlarm();

        }


        else if (
            this.stage === 1
        ) {

            this.displayEvacuation();

        }


        else if (
            this.stage === 2
        ) {

            this.displaySafeArea();

        }


        else if (
            this.stage === 3
        ) {

            this.displayFire();

        }


        else if (
            this.stage === 4
        ) {

            this.displayFireTruck();

        }


        else {

            this.displayComplete();

        }


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
            235
        );


        rect(
            0,
            0,
            width,
            height
        );


        /*
         * Building grid
         */

        stroke(
            180,
            200,
            230,
            12
        );


        strokeWeight(
            1
        );


        for (
            let x = 0;
            x < width;
            x += 80
        ) {

            line(
                x,
                height * 0.20,
                x,
                height * 0.80
            );

        }


        for (
            let y = height * 0.20;
            y < height * 0.80;
            y += 60
        ) {

            line(
                0,
                y,
                width,
                y
            );

        }


        /*
         * Floor

         */

        noStroke();


        fill(
            255,
            255,
            255,
            4
        );


        rect(
            0,
            height * 0.68,
            width,
            height * 0.20
        );

    }


    /*
     * =========================================
     * STAGE 0 — ALARM
     * =========================================
     */

    displayAlarm() {

        const cx =
            width / 2;


        const cy =
            height * 0.43;


        /*
         * Red alarm glow
         */

        noStroke();


        fill(
            255,
            80,
            90,
            8 +
            this.alarmPulse * 18
        );


        circle(
            cx,
            cy,
            180 +
            this.alarmPulse * 30
        );


        /*
         * Alarm outer ring
         */

        noFill();


        stroke(
            255,
            100,
            110,
            60 +
            this.alarmPulse * 80
        );


        strokeWeight(
            2
        );


        circle(
            cx,
            cy,
            100 +
            this.alarmPulse * 12
        );


        /*
         * Alarm body
         */

        fill(
            25,
            27,
            36,
            240
        );


        stroke(
            255,
            130,
            140,
            140
        );


        strokeWeight(
            2
        );


        circle(
            cx,
            cy,
            62
        );


        /*
         * Alarm light

         */

        noStroke();


        fill(
            255,
            90,
            100,
            180 +
            this.alarmPulse * 60
        );


        circle(
            cx,
            cy,
            24 +
            this.alarmPulse * 6
        );


        /*
         * Alarm side lines
         */

        stroke(
            255,
            120,
            130,
            120
        );


        strokeWeight(
            2
        );


        line(
            cx - 42,
            cy - 30,
            cx - 60,
            cy - 45
        );


        line(
            cx + 42,
            cy - 30,
            cx + 60,
            cy - 45
        );


        line(
            cx - 48,
            cy + 10,
            cx - 70,
            cy + 10
        );


        line(
            cx + 48,
            cy + 10,
            cx + 70,
            cy + 10
        );


        /*
         * Text
         */

        textAlign(
            CENTER,
            CENTER
        );


        textFont(
            "Cormorant Garamond"
        );


        textSize(
            28
        );


        fill(
            255,
            220,
            225,
            210
        );


        text(
            "ALARM",
            cx,
            height * 0.58
        );


        textFont(
            "Inter"
        );


        textSize(
            9
        );


        fill(
            220,
            210,
            215,
            110
        );


        text(
            "THE ORDINARY DAY STOPS",
            cx,
            height * 0.65
        );

    }


    /*
     * =========================================
     * STAGE 1 — EVACUATION
     * =========================================
     */

    displayEvacuation() {

        /*
         * Building entrance
         */

        const doorX =
            width * 0.25;


        const doorY =
            height * 0.48;


        noStroke();


        fill(
            15,
            18,
            26,
            240
        );


        rect(
            doorX - 45,
            doorY - 70,
            90,
            140,
            5
        );


        stroke(
            180,
            210,
            245,
            70
        );


        strokeWeight(
            1
        );


        noFill();


        rect(
            doorX - 45,
            doorY - 70,
            90,
            140,
            5
        );


        /*
         * Exit sign

         */

        noStroke();


        fill(
            150,
            255,
            190,
            35
        );


        rect(
            doorX - 30,
            doorY - 55,
            60,
            20,
            3
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
            180,
            255,
            205,
            180
        );


        text(
            "EXIT",
            doorX,
            doorY - 45
        );


        /*
         * Direction arrow
         */

        stroke(
            190,
            230,
            255,
            120
        );


        strokeWeight(
            2
        );


        line(
            width * 0.35,
            height * 0.58,
            width * 0.65,
            height * 0.58
        );


        line(
            width * 0.65,
            height * 0.58,
            width * 0.61,
            height * 0.54
        );


        line(
            width * 0.65,
            height * 0.58,
            width * 0.61,
            height * 0.62
        );


        /*
         * Evacuate button

         */

        const buttonX =
            width * 0.50;


        const buttonY =
            height * 0.42;


        const hover =
            mouseX >
            buttonX - 90 &&
            mouseX <
            buttonX + 90 &&
            mouseY >
            buttonY - 25 &&
            mouseY <
            buttonY + 25;


        noStroke();


        fill(
            100,
            180,
            255,
            hover
                ? 45
                : 20
        );


        rect(
            buttonX - 90,
            buttonY - 25,
            180,
            50,
            6
        );


        stroke(
            170,
            215,
            255,
            hover
                ? 160
                : 80
        );


        strokeWeight(
            1
        );


        noFill();


        rect(
            buttonX - 90,
            buttonY - 25,
            180,
            50,
            6
        );


        textAlign(
            CENTER,
            CENTER
        );


        textSize(
            12
        );


        fill(
            210,
            230,
            255,
            200
        );


        text(
            "EVACUATE",
            buttonX,
            buttonY
        );


        /*
         * Instruction
         */

        textSize(
            9
        );


        fill(
            210,
            215,
            225,
            100
        );


        text(
            "FOLLOW THE EMERGENCY PROCEDURE",
            width / 2,
            height * 0.72
        );

    }


    /*
     * =========================================
     * STAGE 2 — SAFE AREA
     * =========================================
     */

    displaySafeArea() {

        /*
         * Ground

         */

        noStroke();


        fill(
            15,
            24,
            25,
            230
        );


        rect(
            0,
            height * 0.58,
            width,
            height * 0.15
        );


        /*
         * Safe area glow

         */

        fill(
            130,
            255,
            190,
            8
        );


        rect(
            width * 0.58,
            height * 0.35,
            width * 0.28,
            height * 0.30,
            8
        );


        /*
         * Safe area box

         */

        noFill();


        stroke(
            150,
            255,
            190,
            150
        );


        strokeWeight(
            2
        );


        rect(
            width * 0.58,
            height * 0.35,
            width * 0.28,
            height * 0.30,
            8
        );


        /*
         * Four small person symbols

         */

        for (
            let i = 0;
            i < 4;
            i++
        ) {

            const px =
                width * 0.64 +
                i * 42;


            const py =
                height * 0.51;


            noStroke();


            fill(
                185,
                255,
                210,
                160
            );


            circle(
                px,
                py - 15,
                10
            );


            rect(
                px - 6,
                py - 8,
                12,
                25,
                5
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
            "Cormorant Garamond"
        );


        textSize(
            25
        );


        fill(
            210,
            255,
            225,
            200
        );


        text(
            "SAFE AREA",
            width * 0.72,
            height * 0.30
        );


        textFont(
            "Inter"
        );


        textSize(
            9
        );


        fill(
            210,
            225,
            215,
            110
        );


        text(
            "CLICK THE ASSEMBLY POINT",
            width * 0.72,
            height * 0.70
        );

    }


    /*
     * =========================================
     * STAGE 3 — FIRE
     * =========================================
     */

    displayFire() {

        /*
         * Smoke

         */

        noStroke();


        fill(
            180,
            180,
            190,
            25
        );


        circle(
            width * 0.50,
            height * 0.30,
            80
        );


        fill(
            180,
            180,
            190,
            18
        );


        circle(
            width * 0.55,
            height * 0.25,
            65
        );


        circle(
            width * 0.45,
            height * 0.24,
            55
        );


        /*
         * Fire glow

         */

        fill(
            255,
            100,
            50,
            12 +
            this.firePulse * 12
        );


        circle(
            width * 0.50,
            height * 0.53,
            180 +
            this.firePulse * 20
        );


        /*
         * Outer flame

         */

        fill(
            255,
            125,
            60,
            150
        );


        beginShape();


        vertex(
            width * 0.50,
            height * 0.30
        );


        vertex(
            width * 0.44,
            height * 0.47
        );


        vertex(
            width * 0.46,
            height * 0.58
        );


        vertex(
            width * 0.54,
            height * 0.58
        );


        vertex(
            width * 0.57,
            height * 0.46
        );


        endShape(
            CLOSE
        );


        /*
         * Inner flame

         */

        fill(
            255,
            210,
            100,
            190
        );


        beginShape();


        vertex(
            width * 0.50,
            height * 0.38
        );


        vertex(
            width * 0.47,
            height * 0.51
        );


        vertex(
            width * 0.50,
            height * 0.57
        );


        vertex(
            width * 0.54,
            height * 0.50
        );


        endShape(
            CLOSE
        );


        /*
         * Text

         */

        textAlign(
            CENTER,
            CENTER
        );


        textFont(
            "Cormorant Garamond"
        );


        textSize(
            28
        );


        fill(
            255,
            225,
            205,
            210
        );


        text(
            "FIRE",
            width / 2,
            height * 0.68
        );


        textFont(
            "Inter"
        );


        textSize(
            9
        );


        fill(
            225,
            215,
            210,
            100
        );


        text(
            "THE DRILL CONTINUES",
            width / 2,
            height * 0.75
        );

    }


    /*
     * =========================================
     * STAGE 4 — FIRE TRUCK
     * =========================================
     */

    displayFireTruck() {

        /*
         * Road

         */

        noStroke();


        fill(
            15,
            17,
            23,
            240
        );


        rect(
            0,
            height * 0.58,
            width,
            height * 0.15
        );


        /*
         * Road line

         */

        stroke(
            255,
            220,
            160,
            70
        );


        strokeWeight(
            2
        );


        for (
            let i = 0;
            i < width;
            i += 70
        ) {

            line(
                i,
                height * 0.65,
                i + 35,
                height * 0.65
            );

        }


        /*
         * Truck position

         */

        const startX =
            -180;


        const endX =
            width / 2;


        const truckX =
            lerp(
                startX,
                endX,
                this.truckProgress
            );


        const truckY =
            height * 0.51;


        /*
         * Truck glow

         */

        noStroke();


        fill(
            255,
            80,
            90,
            8
        );


        rect(
            truckX - 100,
            truckY - 55,
            210,
            100,
            8
        );


        /*
         * Main body

         */

        fill(
            160,
            45,
            55,
            220
        );


        stroke(
            255,
            140,
            150,
            120
        );


        strokeWeight(
            1.5
        );


        rect(
            truckX - 85,
            truckY - 35,
            115,
            60,
            5
        );


        /*
         * Cabin

         */

        fill(
            130,
            40,
            50,
            230
        );


        rect(
            truckX + 30,
            truckY - 20,
            60,
            45,
            5
        );


        /*
         * Window

         */

        fill(
            20,
            25,
            35,
            230
        );


        rect(
            truckX + 40,
            truckY - 14,
            40,
            22,
            3
        );


        /*
         * Wheels

         */

        noStroke();


        fill(
            8,
            10,
            15,
            250
        );


        circle(
            truckX - 55,
            truckY + 30,
            28
        );


        circle(
            truckX + 55,
            truckY + 30,
            28
        );


        /*
         * Wheel centers

         */

        fill(
            170,
            175,
            185,
            120
        );


        circle(
            truckX - 55,
            truckY + 30,
            10
        );


        circle(
            truckX + 55,
            truckY + 30,
            10
        );


        /*
         * Siren

         */

        const sirenPulse =
            sin(
                frameCount *
                0.25
            ) *
            0.5 +
            0.5;


        fill(
            255,
            80,
            90,
            180 +
            sirenPulse * 70
        );


        circle(
            truckX - 10,
            truckY - 45,
            12
        );


        /*
         * Truck text

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
            225,
            225,
            180
        );


        text(
            "FIRE",
            truckX - 30,
            truckY - 5
        );

    }


    /*
     * =========================================
     * COMPLETE
     * =========================================
     */

    displayComplete() {

        /*
         * Soft final glow

         */

        noStroke();


        fill(
            150,
            220,
            255,
            8
        );


        circle(
            width / 2,
            height * 0.48,
            230
        );


        /*
         * Check

         */

        noFill();


        stroke(
            190,
            230,
            255,
            160
        );


        strokeWeight(
            2
        );


        circle(
            width / 2,
            height * 0.42,
            70
        );


        line(
            width / 2 - 18,
            height * 0.42,
            width / 2 - 5,
            height * 0.55
        );


        line(
            width / 2 - 5,
            height * 0.55,
            width / 2 + 22,
            height * 0.34
        );


        /*
         * Text

         */

        textAlign(
            CENTER,
            CENTER
        );


        textFont(
            "Cormorant Garamond"
        );


        textSize(
            28
        );


        fill(
            220,
            235,
            255,
            210
        );


        text(
            "DRILL COMPLETE",
            width / 2,
            height * 0.63
        );


        textFont(
            "Inter"
        );


        textSize(
            9
        );


        fill(
            210,
            220,
            235,
            110
        );


        text(
            "AN ORDINARY DAY, REMEMBERED DIFFERENTLY",
            width / 2,
            height * 0.70
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
         * Progress

         */

        textSize(
            9
        );


        fill(
            200,
            215,
            235,
            100
        );


        let statusText =
            "";


        if (
            this.stage === 0
        ) {

            statusText =
                "EMERGENCY ALARM";

        }


        else if (
            this.stage === 1
        ) {

            statusText =
                "EVACUATION";

        }


        else if (
            this.stage === 2
        ) {

            statusText =
                "ASSEMBLY POINT";

        }


        else if (
            this.stage === 3
        ) {

            statusText =
                "EMERGENCY RESPONSE";

        }


        else if (
            this.stage === 4
        ) {

            statusText =
                "EMERGENCY VEHICLE";

        }


        else {

            statusText =
                "COMPLETE";

        }


        text(
            statusText,
            width / 2,
            height * 0.82
        );


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
                220,
                230,
                245,
                this.messageAlpha *
                180
            );


            text(
                this.message,
                width / 2,
                height * 0.76
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
         * =====================================
         * STAGE 0
         * =====================================
         */

        if (
            this.stage === 0
        ) {

            /*
             * Click alarm to respond.
             */

            const distance =
                dist(

                    mouseX,
                    mouseY,

                    width / 2,
                    height * 0.43

                );


            if (
                distance <
                65
            ) {

                this.stage =
                    1;


                this.timer =
                    0;


                this.message =
                    "EVACUATE";


                this.messageAlpha =
                    1;


                this.screenFlash =
                    1;


                this.createParticles(

                    width / 2,

                    height * 0.43

                );

            }

        }


        /*
         * =====================================
         * STAGE 1
         * =====================================
         */

        else if (
            this.stage === 1
        ) {

            const buttonX =
                width * 0.50;


            const buttonY =
                height * 0.42;


            if (

                mouseX >
                buttonX - 90 &&

                mouseX <
                buttonX + 90 &&

                mouseY >
                buttonY - 25 &&

                mouseY <
                buttonY + 25

            ) {

                this.stage =
                    2;


                this.timer =
                    0;


                this.message =
                    "MOVE TO SAFE AREA";


                this.messageAlpha =
                    1;


                this.createParticles(

                    width * 0.50,

                    height * 0.42

                );

            }

        }


        /*
         * =====================================
         * STAGE 2
         * =====================================
         */

        else if (
            this.stage === 2
        ) {

            const safeX =
                width * 0.72;


            const safeY =
                height * 0.50;


            const distance =
                dist(

                    mouseX,
                    mouseY,

                    safeX,
                    safeY

                );


            if (
                distance <
                150
            ) {

                this.stage =
                    3;


                this.timer =
                    0;


                this.message =
                    "SAFE AREA REACHED";


                this.messageAlpha =
                    1;


                this.createParticles(

                    safeX,

                    safeY

                );

            }

        }

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
            i < 28;
            i++
        ) {

            const angle =
                random(
                    TWO_PI
                );


            const speed =
                random(
                    0.5,
                    3
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
                210,
                225,
                255,
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