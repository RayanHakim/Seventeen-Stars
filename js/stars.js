class Star {

    constructor(
        code,
        index,
        gender
    ) {

        this.code =
            code;

        this.index =
            index;

        this.gender =
            gender;


        /*
         * =====================================
         * POSITION
         * =====================================
         */

        this.x = 0;

        this.y = 0;

        this.targetX = 0;

        this.targetY = 0;


        /*
         * =====================================
         * SIZE
         * =====================================
         */

        this.baseSize =
            code === "ME"
                ? 3.8
                : 3.0;


        this.size =
            this.baseSize;


        /*
         * =====================================
         * VISIBILITY
         * =====================================
         */

        this.alpha =
            0;

        this.targetAlpha =
            0;


        /*
         * =====================================
         * ANIMATION
         * =====================================
         */

        this.phase =
            random(TWO_PI);


        this.twinkleSpeed =
            random(
                0.008,
                0.018
            );


        this.floatOffset =
            random(TWO_PI);


        /*
         * =====================================
         * HOVER
         * =====================================
         */

        this.hover =
            false;


        this.hoverAmount =
            0;


        /*
         * =====================================
         * HOVER EFFECT
         * =====================================
         */

        this.hoverPulse =
            0;


        this.hoverRotation =
            random(TWO_PI);


        /*
         * =====================================
         * PARTICLES
         * =====================================
         */

        this.particles = [];


        const particleCount =
            code === "ME"
                ? 16
                : 10;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            this.particles.push({

                angle:
                    random(TWO_PI),

                radius:
                    random(
                        9,
                        code === "ME"
                            ? 25
                            : 21
                    ),

                speed:
                    random(
                        0.002,
                        0.009
                    ),

                size:
                    random(
                        0.6,
                        1.5
                    ),

                alpha:
                    random(
                        60,
                        170
                    ),

                offset:
                    random(TWO_PI)

            });

        }


        /*
         * =====================================
         * FLOATING DUST
         * =====================================
         */

        this.dustParticles = [];


        for (
            let i = 0;
            i < 5;
            i++
        ) {

            this.dustParticles.push({

                angle:
                    random(TWO_PI),

                radius:
                    random(
                        20,
                        38
                    ),

                speed:
                    random(
                        0.001,
                        0.004
                    ),

                size:
                    random(
                        0.5,
                        1.2
                    ),

                alpha:
                    random(
                        30,
                        100
                    )

            });

        }

    }


    /*
     * =====================================
     * SET TARGET
     * =====================================
     */

    setTarget(
        x,
        y,
        alpha = 1
    ) {

        this.targetX =
            x;

        this.targetY =
            y;

        this.targetAlpha =
            alpha;

    }


    /*
     * =====================================
     * UPDATE
     * =====================================
     */

    update() {

        /*
         * Smooth movement
         */

        this.x =
            lerp(
                this.x,
                this.targetX,
                0.05
            );


        this.y =
            lerp(
                this.y,
                this.targetY,
                0.05
            );


        /*
         * Smooth fade
         */

        this.alpha =
            lerp(
                this.alpha,
                this.targetAlpha,
                0.05
            );


        /*
         * Twinkle
         */

        this.phase +=
            this.twinkleSpeed;


        /*
         * Hover smoothing
         */

        const targetHover =
            this.hover
                ? 1
                : 0;


        this.hoverAmount =
            lerp(
                this.hoverAmount,
                targetHover,
                0.12
            );


        /*
         * Hover pulse
         */

        if (
            this.hover
        ) {

            this.hoverPulse +=
                0.08;

        }

        else {

            this.hoverPulse =
                lerp(
                    this.hoverPulse,
                    0,
                    0.08
                );

        }


        /*
         * Rotate particles
         */

        for (
            const particle
            of this.particles
        ) {

            particle.angle +=
                particle.speed;

        }


        for (
            const particle
            of this.dustParticles
        ) {

            particle.angle +=
                particle.speed;

        }


        this.hoverRotation +=
            0.01;

    }


    /*
     * =====================================
     * COLOR
     * =====================================
     */

    getColor() {

        /*
         * ME
         */

        if (
            this.code === "ME"
        ) {

            return {

                r: 255,
                g: 255,
                b: 255

            };

        }

        if (
            this.gender === "female"
        ) {

            return {

                r: 255,
                g: 185,
                b: 215

            };

        }


        /*
         * MALE
         */

        if (
            this.gender === "male"
        ) {

            return {

                r: 165,
                g: 205,
                b: 255

            };

        }


        /*
         * UNKNOWN
         */

        return {

            r: 220,
            g: 220,
            b: 230

        };

    }


    /*
     * =====================================
     * DISPLAY
     * =====================================
     */

    display() {

        if (
            this.alpha < 0.01
        ) {

            return;

        }


        const color =
            this.getColor();


        /*
         * =================================
         * PULSE
         * =================================
         */

        const pulse =
            sin(
                this.phase
            ) *
            0.5 +
            0.5;


        /*
         * Hover makes star brighter
         */

        const hoverBoost =
            this.hoverAmount;


        /*
         * Star radius
         */

        const radius =
            this.size +

            pulse *
            (
                this.code === "ME"
                    ? 1.7
                    : 1.2
            ) +

            hoverBoost *
            1.8;


        /*
         * =================================
         * OUTER ATMOSPHERIC GLOW
         * =================================
         */

        noStroke();


        fill(
            color.r,
            color.g,
            color.b,
            this.alpha *
            (
                8 +
                hoverBoost * 15
            )
        );


        circle(
            this.x,
            this.y,
            radius * 18
        );


        /*
         * =================================
         * LARGE GLOW
         * =================================
         */

        fill(
            color.r,
            color.g,
            color.b,
            this.alpha *
            (
                12 +
                hoverBoost * 20
            )
        );


        circle(
            this.x,
            this.y,
            radius * 12
        );


        /*
         * =================================
         * MEDIUM GLOW
         * =================================
         */

        fill(
            color.r,
            color.g,
            color.b,
            this.alpha *
            (
                25 +
                hoverBoost * 30
            )
        );


        circle(
            this.x,
            this.y,
            radius * 7
        );


        /*
         * =================================
         * INNER GLOW
         * =================================
         */

        fill(
            color.r,
            color.g,
            color.b,
            this.alpha *
            (
                55 +
                hoverBoost * 40
            )
        );


        circle(
            this.x,
            this.y,
            radius * 3.5
        );


        /*
         * =================================
         * ORBIT PARTICLES
         * =================================
         */

        for (
            const particle
            of this.particles
        ) {

            const px =
                this.x +
                cos(
                    particle.angle
                ) *
                particle.radius;


            const py =
                this.y +
                sin(
                    particle.angle
                ) *
                particle.radius;


            const particlePulse =
                sin(
                    this.phase * 2 +
                    particle.offset
                ) *
                0.5 +
                0.5;


            const particleAlpha =
                this.alpha *
                (
                    particle.alpha *
                    (
                        0.55 +
                        particlePulse * 0.45
                    )
                );


            fill(
                color.r,
                color.g,
                color.b,
                particleAlpha
            );


            circle(
                px,
                py,
                particle.size +
                hoverBoost *
                1.2
            );

        }


        /*
         * =================================
         * FLOATING DUST
         * =================================
         */

        for (
            const particle
            of this.dustParticles
        ) {

            const px =
                this.x +
                cos(
                    particle.angle
                ) *
                particle.radius;


            const py =
                this.y +
                sin(
                    particle.angle
                ) *
                particle.radius;


            fill(
                color.r,
                color.g,
                color.b,
                this.alpha *
                particle.alpha
            );


            circle(
                px,
                py,
                particle.size
            );

        }


        /*
         * =================================
         * CORE
         * =================================
         */

        fill(
            color.r,
            color.g,
            color.b,
            this.alpha *
            (
                230 +
                hoverBoost * 25
            )
        );


        circle(
            this.x,
            this.y,
            radius
        );


        /*
         * =================================
         * CORE HIGHLIGHT
         * =================================
         */

        fill(
            255,
            255,
            255,
            this.alpha *
            (
                90 +
                hoverBoost * 70
            )
        );


        circle(
            this.x - radius * 0.22,
            this.y - radius * 0.22,
            radius * 0.38
        );


        /*
         * =================================
         * ME SPECIAL LIGHT
         * =================================
         */

        if (
            this.code === "ME"
        ) {

            fill(
                255,
                255,
                255,
                this.alpha *
                (
                    65 +
                    hoverBoost * 60
                )
            );


            circle(
                this.x,
                this.y,
                radius * 2.5
            );


            /*
             * Small rotating light
             */

            for (
                let i = 0;
                i < 4;
                i++
            ) {

                const angle =
                    this.hoverRotation +
                    i *
                    HALF_PI;


                const px =
                    this.x +
                    cos(angle) *
                    14;


                const py =
                    this.y +
                    sin(angle) *
                    14;


                fill(
                    255,
                    255,
                    255,
                    this.alpha *
                    110
                );


                circle(
                    px,
                    py,
                    1.5
                );

            }

        }


        /*
         * =================================
         * HOVER RINGS
         * =================================
         */

        if (
            this.hoverAmount > 0.01
        ) {

            noFill();


            stroke(
                color.r,
                color.g,
                color.b,
                this.alpha *
                120 *
                this.hoverAmount
            );


            strokeWeight(
                1
            );


            const ringPulse =
                (
                    sin(
                        this.hoverPulse
                    ) *
                    0.5 +
                    0.5
                );


            circle(
                this.x,
                this.y,
                18 +
                ringPulse * 12
            );


            stroke(
                color.r,
                color.g,
                color.b,
                this.alpha *
                60 *
                this.hoverAmount
            );


            circle(
                this.x,
                this.y,
                30 +
                ringPulse * 18
            );


            /*
             * Rotating orbit ring
             */

            arc(
                this.x,
                this.y,
                42,
                42,
                this.hoverRotation,
                this.hoverRotation +
                PI * 1.25
            );

        }


        /*
         * =================================
         * LABEL
         * =================================
         */

        if (
            this.hoverAmount > 0.01
        ) {

            const labelAlpha =
                this.alpha *
                255 *
                this.hoverAmount;


            /*
             * Label background
             */

            const labelWidth =
                this.code === "ME"
                    ? 54
                    : 48;


            noStroke();


            fill(
                5,
                5,
                10,
                170 *
                this.hoverAmount
            );


            rectMode(
                CENTER
            );


            rect(
                this.x,
                this.y - 34,
                labelWidth,
                22,
                5
            );


            /*
             * Label border
             */

            noFill();


            stroke(
                color.r,
                color.g,
                color.b,
                100 *
                this.hoverAmount
            );


            strokeWeight(
                1
            );


            rect(
                this.x,
                this.y - 34,
                labelWidth,
                22,
                5
            );


            /*
             * Code
             */

            noStroke();


            fill(
                color.r,
                color.g,
                color.b,
                labelAlpha
            );


            textAlign(
                CENTER,
                CENTER
            );


            textFont(
                "Inter"
            );


            textSize(
                this.code === "ME"
                    ? 11
                    : 10
            );


            text(
                this.code,
                this.x,
                this.y - 34
            );


            rectMode(
                CORNER
            );

        }

    }


    /*
     * =====================================
     * HIT DETECTION
     * =====================================
     */

    contains(
        mx,
        my
    ) {

        const distance =
            dist(
                mx,
                my,
                this.x,
                this.y
            );


        /*
         * Hover area dibuat lebih besar
         * daripada ukuran bintang.
         */

        return (
            distance <
            24 +
            this.hoverAmount * 8
        );

    }

}


const STAR_DATA = [

    {
        code: "ME",
        gender: "male"
    },

    {
        code: "SH",
        gender: "female"
    },

    {
        code: "KI",
        gender: "female"
    },

    {
        code: "BE",
        gender: "female"
    },

    {
        code: "PU",
        gender: "female"
    },

    {
        code: "GE",
        gender: "female"
    },

    {
        code: "SA",
        gender: "female"
    },

    {
        code: "AD",
        gender: "male"
    },

    {
        code: "AJ",
        gender: "male"
    },

    {
        code: "AR",
        gender: "male"
    },

    {
        code: "EK",
        gender: "male"
    },

    {
        code: "FA",
        gender: "male"
    },

    {
        code: "HA",
        gender: "male"
    },

    {
        code: "NA",
        gender: "male"
    },

    {
        code: "ST",
        gender: "male"
    },

    {
        code: "ZA",
        gender: "male"
    },

    {
        code: "AL",
        gender: "male"
    }

];


class StarSystem {

    constructor() {

        this.stars = [];


        /*
         * Create all stars
         */

        for (
            let i = 0;
            i < STAR_DATA.length;
            i++
        ) {

            const data =
                STAR_DATA[i];


            this.stars.push(
                new Star(
                    data.code,
                    i,
                    data.gender
                )
            );

        }

    }


    /*
     * =====================================
     * GET STAR
     * =====================================
     */

    getStar(
        code
    ) {

        return this.stars.find(
            star =>
                star.code === code
        );

    }


    /*
     * =====================================
     * SHOW PARTICIPANTS
     * =====================================
     */

    showParticipants(
        participants
    ) {

        if (
            !participants ||
            participants.length === 0
        ) {

            this.hideAll();

            return;

        }


        /*
         * Position participants
         * around the center.
         */

        for (
            const star
            of this.stars
        ) {

            if (
                participants.includes(
                    star.code
                )
            ) {

                const participantIndex =
                    participants.indexOf(
                        star.code
                    );


                const angle =
                    participantIndex *
                    TWO_PI /
                    participants.length;


                const radius =
                    min(
                        width,
                        height
                    ) *
                    0.27;


                const x =
                    width / 2 +
                    cos(angle) *
                    radius;


                const y =
                    height / 2 +
                    sin(angle) *
                    radius;


                star.setTarget(
                    x,
                    y,
                    1
                );

            }

            else {

                star.setTarget(
                    width / 2,
                    height / 2,
                    0
                );

            }

        }

    }


    /*
     * =====================================
     * SHOW ALL
     * =====================================
     */

    showAll() {

        const radius =
            min(
                width,
                height
            ) *
            0.30;


        for (
            let i = 0;
            i < this.stars.length;
            i++
        ) {

            const star =
                this.stars[i];


            const angle =
                i *
                TWO_PI /
                this.stars.length;


            const x =
                width / 2 +
                cos(angle) *
                radius;


            const y =
                height / 2 +
                sin(angle) *
                radius;


            star.setTarget(
                x,
                y,
                1
            );

        }

    }


    /*
     * =====================================
     * HIDE ALL
     * =====================================
     */

    hideAll() {

        for (
            const star
            of this.stars
        ) {

            star.setTarget(
                width / 2,
                height / 2,
                0
            );

        }

    }


    /*
     * =====================================
     * UPDATE
     * =====================================
     */

    update() {

        for (
            const star
            of this.stars
        ) {

            star.update();

        }

    }


    /*
     * =====================================
     * DISPLAY
     * =====================================
     */

    display() {

        /*
         * First draw constellation
         * connections.
         */

        this.displayConnections();


        /*
         * Then draw the stars.
         */

        for (
            const star
            of this.stars
        ) {

            star.display();

        }

    }


    /*
     * =====================================
     * CONSTELLATION CONNECTIONS
     * =====================================
     */

    displayConnections() {

        const visibleStars =
            this.stars.filter(
                star =>
                    star.alpha > 0.35
            );


        if (
            visibleStars.length < 2
        ) {

            return;

        }


        /*
         * Connect nearby visible stars.
         */

        for (
            let i = 0;
            i < visibleStars.length;
            i++
        ) {

            const starA =
                visibleStars[i];


            for (
                let j = i + 1;
                j < visibleStars.length;
                j++
            ) {

                const starB =
                    visibleStars[j];


                const distance =
                    dist(
                        starA.x,
                        starA.y,
                        starB.x,
                        starB.y
                    );


                /*
                 * Only connect nearby stars.
                 */

                if (
                    distance > 260
                ) {

                    continue;

                }


                const alpha =
                    map(
                        distance,
                        60,
                        260,
                        38,
                        0,
                        true
                    );


                /*
                 * Hover makes connections
                 * slightly brighter.
                 */

                const hoverBoost =
                    (
                        starA.hoverAmount +
                        starB.hoverAmount
                    ) *
                    18;


                stroke(
                    180,
                    210,
                    255,
                    alpha +
                    hoverBoost
                );


                strokeWeight(
                    0.6
                );


                line(
                    starA.x,
                    starA.y,
                    starB.x,
                    starB.y
                );

            }

        }

    }


    /*
     * =====================================
     * HOVER
     * =====================================
     */

    updateHover() {

        for (
            const star
            of this.stars
        ) {

            star.hover =
                star.alpha > 0.5 &&
                star.contains(
                    mouseX,
                    mouseY
                );

        }

    }

}