class OpeningScene {

    constructor() {

        this.month = "2026";

        this.title = "SEVENTEEN STARS";

        this.subtitle =
            "17 people. Countless moments.";

        this.buttonText =
            "BEGIN";

    }


    enter() {

        starSystem.showAll();

    }


    update() {

        background(
            2,
            2,
            5
        );

    }


    display() {

        push();

        translate(
            width / 2,
            height / 2
        );


        noFill();

        stroke(
            255,
            255,
            255,
            20
        );


        circle(
            0,
            0,
            min(width, height) *
            0.55
        );


        pop();

    }


    mousePressed() {


    }


    canContinue() {

        return true;

    }


    exit() {

        starSystem.hideAll();

    }

}


class OnboardingScene {

    constructor() {

        this.month =
            "AUGUST 2026";

        this.title =
            "ONBOARDING";

        this.subtitle =
            "Bekasi → Karawang";

        this.buttonText =
            "CONTINUE";


        this.progress = 0;

        this.started = false;

    }


    enter() {

        this.progress = 0;

        this.started = true;

        starSystem.showAll();

    }


    update() {

        if (this.started) {

            this.progress +=
                0.0015;

            if (
                this.progress > 1
            ) {

                this.progress = 1;

            }

        }

    }


    display() {

        const startX =
            width * 0.12;

        const endX =
            width * 0.88;


        const roadY =
            height * 0.42;


        stroke(
            255,
            255,
            255,
            35
        );

        strokeWeight(2);

        noFill();


        line(
            startX,
            roadY,
            endX,
            roadY
        );


        const vehicleX =
            lerp(
                startX,
                endX,
                this.progress
            );


        noStroke();


        fill(
            255,
            255,
            255,
            35
        );


        circle(
            vehicleX,
            roadY,
            45
        );


        fill(
            255
        );


        circle(
            vehicleX,
            roadY,
            8
        );


        textAlign(
            CENTER,
            CENTER
        );


        textSize(12);

        fill(
            255,
            255,
            255,
            120
        );


        text(
            "BEKASI",
            startX,
            roadY - 35
        );


        text(
            "KARAWANG",
            endX,
            roadY - 35
        );


        if (
            this.progress >= 1
        ) {

            fill(
                255,
                255,
                255,
                160
            );

            textSize(14);

            text(
                "17 lights arrived.",
                width / 2,
                roadY + 65
            );

        }

    }


    canContinue() {

        return this.progress >= 1;

    }


    exit() {

        starSystem.hideAll();

    }

}