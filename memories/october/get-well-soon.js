class GetWellSoonScene {
    constructor() {
        this.score = 0;
        this.targetScore = 10;
        this.completed = false;
        this.time = 0;
        this.cardSpawnTimer = 0;

        this.usedWishIds = new Set();

        this.wishesList = [
            { id: 1, text: "Semoga lekas sembuh dan pulih sepenuhnya.", icon: "🤍" },
            { id: 2, text: "Semoga setiap rasa sakit segera mereda.", icon: "🕊️" },
            { id: 3, text: "Semoga kaki kanan kembali kuat dan sehat.", icon: "🌿" },
            { id: 4, text: "Semoga proses pemulihan berjalan lancar.", icon: "✨" },
            { id: 5, text: "Semoga selalu diberi kekuatan dan kesabaran.", icon: "💛" },
            { id: 6, text: "Semoga istirahatmu nyaman dan berkualitas.", icon: "🌙" },
            { id: 7, text: "Semoga hari-harimu segera dipenuhi senyum.", icon: "🌼" },
            { id: 8, text: "Semoga selalu dikelilingi perhatian dan kebaikan.", icon: "💗" },
            { id: 9, text: "Semoga bisa beraktivitas kembali dengan nyaman.", icon: "🌈" },
            { id: 10, text: "Semoga kesehatan dan kebahagiaan menyertaimu selalu.", icon: "🙏" }
        ];

        this.cards = [];
        this.particles = [];
        this.sparkles = [];
        this.floatingHearts = [];

        this.messageAlpha = 0;
        this.messageText = "";
        this.lastClickedWish = null;

        this.createParticles();
        this.createSparkles();
    }

    enter() {
        this.score = 0;
        this.completed = false;
        this.time = 0;
        this.cardSpawnTimer = 0;

        this.cards = [];
        this.particles = [];
        this.sparkles = [];
        this.floatingHearts = [];

        this.usedWishIds.clear();

        this.messageAlpha = 0;
        this.messageText = "";
        this.lastClickedWish = null;

        this.createParticles();
        this.createSparkles();
        this.spawnCards();

        if (typeof starSystem !== "undefined") {
            starSystem.showParticipants([
                "AD", "AJ", "AR", "EK", "FA",
                "HA", "ST", "ZA", "AL"
            ]);
        }
    }

    exit() {
        if (typeof starSystem !== "undefined") {
            starSystem.showAll();
        }
    }

    createParticles() {
        this.particles = [];

        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: random(width),
                y: random(height),
                size: random(1, 3.5),
                speed: random(0.12, 0.48),
                alpha: random(25, 110),
                drift: random(-0.2, 0.2),
                phase: random(TWO_PI)
            });
        }
    }

    createSparkles() {
        this.sparkles = [];

        for (let i = 0; i < 35; i++) {
            this.sparkles.push({
                x: random(width),
                y: random(height * 0.08, height * 0.75),
                size: random(2, 5),
                phase: random(TWO_PI),
                speed: random(0.015, 0.05)
            });
        }
    }

    getAvailableWishes() {
        return this.wishesList.filter(
            wish => !this.usedWishIds.has(wish.id)
        );
    }

    spawnCards() {
        const available = this.getAvailableWishes();

        while (this.cards.length < 4 && available.length > 0) {
            const index = floor(random(available.length));
            const wish = available.splice(index, 1)[0];

            this.cards.push(this.makeCard(wish));
        }
    }

    makeCard(wish) {
        return {
            x: random(width * 0.18, width * 0.82),
            y: random(height * 0.36, height * 0.68),

            vx: random(-0.28, 0.28),
            vy: random(-0.18, 0.18),

            w: min(285, width * 0.34),
            h: 68,

            wish: wish,

            pulse: random(TWO_PI),
            tilt: random(-0.018, 0.018),

            hover: 0,
            age: 0
        };
    }

    update() {
        this.time += 0.025;
        this.cardSpawnTimer++;

        // Partikel background
        for (const particle of this.particles) {
            particle.y -= particle.speed;

            particle.x +=
                sin(this.time + particle.phase) * particle.drift;

            if (particle.y < -5) {
                particle.y = height + 5;
                particle.x = random(width);
            }
        }

        // Sparkle
        for (const sparkle of this.sparkles) {
            sparkle.phase += sparkle.speed;
        }

        // Animasi efek hati dan cahaya
        for (
            let i = this.floatingHearts.length - 1;
            i >= 0;
            i--
        ) {
            const effect = this.floatingHearts[i];

            effect.x += effect.vx || 0;
            effect.y -= effect.vy || 0;

            effect.alpha -= effect.fade || 2;
            effect.scale += 0.004;

            if (effect.alpha <= 0) {
                this.floatingHearts.splice(i, 1);
            }
        }

        // Gerakan kartu
        if (!this.completed) {
            for (const card of this.cards) {
                card.x += card.vx;
                card.y += card.vy;

                card.pulse += 0.045;
                card.age++;

                const hover = this.isInside(
                    mouseX,
                    mouseY,
                    card.x,
                    card.y,
                    card.w,
                    card.h
                );

                card.hover = lerp(
                    card.hover,
                    hover ? 1 : 0,
                    0.12
                );

                const left = width * 0.10 + card.w / 2;
                const right = width * 0.90 - card.w / 2;

                const top = height * 0.32 + card.h / 2;
                const bottom = height * 0.72 - card.h / 2;

                if (card.x < left || card.x > right) {
                    card.vx *= -1;
                }

                if (card.y < top || card.y > bottom) {
                    card.vy *= -1;
                }

                card.x = constrain(card.x, left, right);
                card.y = constrain(card.y, top, bottom);
            }

            if (
                this.cards.length < 4 &&
                this.cardSpawnTimer > 35
            ) {
                this.spawnCards();
                this.cardSpawnTimer = 0;
            }
        }

        if (this.messageAlpha > 0) {
            this.messageAlpha = max(
                0,
                this.messageAlpha - 0.35
            );
        }
    }

    display() {
        this.drawBackground();
        this.drawWindowGlow();
        this.drawHospitalRoom();
        this.drawWindow();

        this.drawHospitalBed();
        this.drawPatient();
        this.drawBedRails();

        this.drawRightAnkleCast();

        this.drawMedicalEquipment();
        this.drawFlowersAndDetails();
        this.drawHealingAura();

        this.drawWishCards();
        this.drawFloatingEffects();

        this.drawHeader();
        this.drawProgress();
    }

    // ======================================
    // BACKGROUND
    // ======================================

    drawBackground() {
        const ctx = drawingContext;

        const gradient = ctx.createLinearGradient(
            0, 0, width, height
        );

        gradient.addColorStop(0, "#142b42");
        gradient.addColorStop(0.38, "#426b82");
        gradient.addColorStop(0.72, "#b4c6bc");
        gradient.addColorStop(1, "#e9c9a6");

        ctx.save();
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();

        noStroke();

        fill(255, 226, 180, 30);
        ellipse(
            width * 0.80,
            height * 0.15,
            width * 0.50,
            height * 0.45
        );

        fill(255, 255, 255, 15);
        ellipse(
            width * 0.15,
            height * 0.08,
            width * 0.40,
            height * 0.30
        );

        this.drawDistantSkyline();
        this.drawAmbientParticles();
    }

    drawDistantSkyline() {
        noStroke();

        fill(18, 42, 62, 105);

        rect(
            0,
            height * 0.31,
            width,
            height * 0.20
        );

        for (let i = 0; i < 12; i++) {
            const x = i * width / 11;

            const buildingH =
                height * (0.045 + (i % 4) * 0.018);

            fill(
                20 + i * 2,
                47 + i * 2,
                68 + i * 2,
                95
            );

            rect(
                x,
                height * 0.31 - buildingH,
                width * 0.055,
                buildingH
            );

            fill(255, 225, 175, 45);

            for (let row = 0; row < 3; row++) {
                rect(
                    x + 5,
                    height * 0.32 - buildingH + row * 8,
                    3,
                    3
                );
            }
        }
    }

    drawAmbientParticles() {
        noStroke();

        for (const p of this.particles) {
            fill(255, 244, 220, p.alpha);
            circle(p.x, p.y, p.size);
        }

        for (const s of this.sparkles) {
            const glow = (sin(s.phase) + 1) * 0.5;

            fill(255, 244, 210, 35 + glow * 90);

            circle(
                s.x,
                s.y,
                s.size * (0.65 + glow)
            );

            if (glow > 0.88) {
                stroke(255, 248, 225, 100);
                strokeWeight(1);

                line(
                    s.x - 5, s.y,
                    s.x + 5, s.y
                );

                line(
                    s.x, s.y - 5,
                    s.x, s.y + 5
                );

                noStroke();
            }
        }
    }

    drawWindowGlow() {
        noStroke();

        fill(255, 231, 190, 22);

        rect(
            width * 0.055,
            height * 0.16,
            width * 0.31,
            height * 0.31,
            20
        );

        fill(255, 247, 220, 12);

        rect(
            width * 0.07,
            height * 0.175,
            width * 0.28,
            height * 0.28,
            16
        );
    }

    // ======================================
    // RUANGAN RUMAH SAKIT
    // ======================================

    drawHospitalRoom() {
        noStroke();

        fill(238, 232, 218, 245);

        rect(
            width * 0.055,
            height * 0.16,
            width * 0.89,
            height * 0.60,
            18
        );

        fill(215, 220, 216, 150);

        rect(
            width * 0.055,
            height * 0.16,
            width * 0.89,
            height * 0.025,
            12
        );

        fill(255, 255, 255, 85);

        rect(
            width * 0.075,
            height * 0.19,
            width * 0.85,
            height * 0.008
        );

        fill(222, 226, 219, 190);

        rect(
            width * 0.055,
            height * 0.64,
            width * 0.89,
            height * 0.12
        );

        stroke(190, 202, 198, 150);
        strokeWeight(1);

        line(
            width * 0.055,
            height * 0.64,
            width * 0.945,
            height * 0.64
        );

        noStroke();

        fill(190, 183, 169, 220);

        rect(
            width * 0.055,
            height * 0.74,
            width * 0.89,
            height * 0.035,
            0, 0, 18, 18
        );

        fill(255, 255, 255, 35);

        rect(
            width * 0.08,
            height * 0.75,
            width * 0.84,
            height * 0.008
        );
    }

    // ======================================
    // JENDELA
    // ======================================

    drawWindow() {
        const x = width * 0.105;
        const y = height * 0.235;

        const w = width * 0.245;
        const h = height * 0.235;

        noStroke();

        fill(30, 65, 87, 255);

        rect(
            x - 7,
            y - 7,
            w + 14,
            h + 14,
            10
        );

        const ctx = drawingContext;

        const sky = ctx.createLinearGradient(
            x, y, x, y + h
        );

        sky.addColorStop(0, "#8dc4d8");
        sky.addColorStop(0.58, "#d7e8df");
        sky.addColorStop(1, "#f4d5a9");

        ctx.fillStyle = sky;
        ctx.fillRect(x, y, w, h);

        noStroke();

        fill(255, 237, 183, 230);

        circle(
            x + w * 0.76,
            y + h * 0.25,
            h * 0.20
        );

        fill(255, 255, 255, 110);

        ellipse(
            x + w * 0.28,
            y + h * 0.25,
            w * 0.28,
            h * 0.07
        );

        ellipse(
            x + w * 0.37,
            y + h * 0.23,
            w * 0.18,
            h * 0.08
        );

        fill(92, 145, 128, 190);

        beginShape();

        vertex(x, y + h * 0.78);
        vertex(x + w * 0.22, y + h * 0.59);
        vertex(x + w * 0.42, y + h * 0.76);
        vertex(x + w * 0.68, y + h * 0.55);
        vertex(x + w, y + h * 0.73);
        vertex(x + w, y + h);
        vertex(x, y + h);

        endShape(CLOSE);

        fill(68, 116, 105, 190);

        rect(
            x + w * 0.08,
            y + h * 0.66,
            w * 0.10,
            h * 0.34
        );

        rect(
            x + w * 0.52,
            y + h * 0.68,
            w * 0.12,
            h * 0.32
        );

        rect(
            x + w * 0.83,
            y + h * 0.62,
            w * 0.09,
            h * 0.38
        );

        stroke(248, 248, 239, 245);
        strokeWeight(5);
        noFill();

        rect(x, y, w, h, 3);

        line(
            x + w * 0.50,
            y,
            x + w * 0.50,
            y + h
        );

        line(
            x,
            y + h * 0.53,
            x + w,
            y + h * 0.53
        );

        noStroke();

        fill(255, 250, 237, 185);

        beginShape();

        vertex(x - 13, y - 10);
        vertex(x + 12, y - 10);
        vertex(x + 20, y + h + 12);
        vertex(x - 8, y + h + 12);

        endShape(CLOSE);

        beginShape();

        vertex(x + w - 12, y - 10);
        vertex(x + w + 13, y - 10);
        vertex(x + w + 8, y + h + 12);
        vertex(x + w - 18, y + h + 12);

        endShape(CLOSE);
    }

    // ======================================
    // TEMPAT TIDUR
    // ======================================

    drawHospitalBed() {
        const bedX = width * 0.27;
        const bedY = height * 0.49;

        const bedW = width * 0.57;
        const bedH = height * 0.22;

        noStroke();

        fill(31, 43, 55, 45);

        ellipse(
            bedX + bedW * 0.50,
            bedY + bedH * 1.06,
            bedW * 1.03,
            18
        );

        fill(95, 116, 128);

        rect(
            bedX + 16,
            bedY + bedH * 0.73,
            bedW - 32,
            12,
            5
        );

        rect(
            bedX + 30,
            bedY + bedH * 0.78,
            8,
            height * 0.10,
            3
        );

        rect(
            bedX + bedW - 38,
            bedY + bedH * 0.78,
            8,
            height * 0.10,
            3
        );

        fill(65, 83, 95);

        circle(
            bedX + 34,
            bedY + bedH + height * 0.10,
            12
        );

        circle(
            bedX + bedW - 34,
            bedY + bedH + height * 0.10,
            12
        );

        fill(250, 250, 244);

        rect(
            bedX,
            bedY,
            bedW,
            bedH * 0.72,
            13
        );

        fill(225, 235, 235);

        rect(
            bedX + 5,
            bedY + bedH * 0.60,
            bedW - 10,
            bedH * 0.12,
            5
        );

        fill(245, 248, 243);

        beginShape();

        vertex(bedX + bedW * 0.16, bedY + bedH * 0.14);
        vertex(bedX + bedW * 0.80, bedY + bedH * 0.14);
        vertex(bedX + bedW * 0.91, bedY + bedH * 0.65);
        vertex(bedX + bedW * 0.13, bedY + bedH * 0.65);

        endShape(CLOSE);

        stroke(211, 221, 219, 150);
        strokeWeight(1);

        line(
            bedX + bedW * 0.25,
            bedY + bedH * 0.27,
            bedX + bedW * 0.47,
            bedY + bedH * 0.58
        );

        line(
            bedX + bedW * 0.52,
            bedY + bedH * 0.22,
            bedX + bedW * 0.67,
            bedY + bedH * 0.56
        );

        noStroke();

        fill(126, 153, 158);

        rect(
            bedX - 8,
            bedY - 20,
            15,
            bedH * 0.92,
            7
        );

        fill(255, 255, 255, 75);

        rect(
            bedX - 4,
            bedY - 15,
            4,
            bedH * 0.75,
            3
        );

        fill(255, 255, 250);

        rect(
            bedX + bedW * 0.08,
            bedY + bedH * 0.06,
            bedW * 0.21,
            bedH * 0.34,
            12
        );

        fill(220, 230, 229, 110);

        arc(
            bedX + bedW * 0.18,
            bedY + bedH * 0.25,
            bedW * 0.16,
            bedH * 0.15,
            0,
            PI
        );
    }

        // ======================================
    // PASIEN
    // ======================================

    drawPatient() {
        const headX = width * 0.365;
        const headY = height * 0.475;

        noStroke();

        fill(65, 53, 48);
        ellipse(headX, headY - 3, 43, 42);

        fill(226, 184, 151);
        ellipse(headX, headY + 2, 34, 34);

        fill(70, 57, 51);
        arc(
            headX,
            headY - 5,
            37,
            28,
            PI,
            TWO_PI
        );

        stroke(102, 74, 65, 170);
        strokeWeight(1.2);

        line(
            headX - 7,
            headY + 3,
            headX - 3,
            headY + 3
        );

        line(
            headX + 4,
            headY + 3,
            headX + 8,
            headY + 3
        );

        noStroke();

        fill(190, 112, 103, 150);
        ellipse(headX, headY + 10, 5, 2);

        fill(143, 190, 190);

        beginShape();

        vertex(headX - 17, headY + 18);
        vertex(headX + 17, headY + 18);
        vertex(width * 0.48, height * 0.59);
        vertex(width * 0.31, height * 0.59);

        endShape(CLOSE);

        stroke(221, 244, 235, 125);
        strokeWeight(1);

        for (let i = 0; i < 5; i++) {
            line(
                width * 0.34 + i * 7,
                height * 0.53,
                width * 0.33 + i * 8,
                height * 0.58
            );
        }

        noStroke();

        fill(226, 185, 153);

        push();

        translate(
            width * 0.48,
            height * 0.565
        );

        rotate(-0.12);

        rect(
            0,
            0,
            width * 0.12,
            12,
            8
        );

        ellipse(
            width * 0.12,
            6,
            17,
            13
        );

        pop();
    }

    // ======================================
    // PAGAR TEMPAT TIDUR
    // ======================================

    drawBedRails() {
        const x1 = width * 0.30;
        const x2 = width * 0.78;
        const y = height * 0.60;

        stroke(155, 177, 181, 230);
        strokeWeight(4);

        line(x1, y, x2, y);

        line(
            x1 + 5,
            y - 19,
            x1 + 5,
            y + 2
        );

        line(
            x1 + 55,
            y - 19,
            x1 + 55,
            y + 2
        );

        line(
            x2 - 5,
            y - 19,
            x2 - 5,
            y + 2
        );

        line(
            x2 - 55,
            y - 19,
            x2 - 55,
            y + 2
        );

        line(
            x1 + 5,
            y - 19,
            x2 - 5,
            y - 19
        );

        noStroke();

        fill(225, 237, 235, 220);

        rect(
            x1 - 5,
            y - 23,
            12,
            8,
            4
        );

        rect(
            x2 - 7,
            y - 23,
            12,
            8,
            4
        );
    }

    // ======================================
    // ALAT MEDIS
    // ======================================

    drawMedicalEquipment() {
        this.drawHeartMonitor();
        this.drawIVStand();
        this.drawBedsideCabinet();
        this.drawMedicalWallPanel();
    }

    // ======================================
    // MONITOR DETAK JANTUNG
    // ======================================

    drawHeartMonitor() {
        const x = width * 0.12;
        const y = height * 0.505;

        const w = width * 0.135;
        const h = height * 0.105;

        noStroke();

        fill(39, 55, 66, 65);

        rect(
            x + 4,
            y + 5,
            w,
            h,
            8
        );

        fill(42, 61, 71);

        rect(
            x,
            y,
            w,
            h,
            8
        );

        fill(15, 35, 43);

        rect(
            x + 7,
            y + 7,
            w - 14,
            h - 14,
            5
        );

        fill(80, 220, 172, 15);

        rect(
            x + 10,
            y + 10,
            w - 20,
            h - 20,
            3
        );

        noFill();

        stroke(98, 237, 175);
        strokeWeight(1.8);

        beginShape();

        const startX = x + 12;
        const startY = y + h * 0.48;

        for (let i = 0; i < w - 27; i += 3) {
            let offset =
                sin((i + this.time * 48) * 0.12) * 3;

            const beat = i % 43;

            if (beat > 15 && beat < 21) {
                offset -= 10;
            }

            if (beat >= 21 && beat < 25) {
                offset += 5;
            }

            vertex(
                startX + i,
                startY + offset
            );
        }

        endShape();

        noStroke();

        fill(174, 255, 208);
        textAlign(LEFT, CENTER);
        textSize(max(7, width * 0.009));

        text(
            "72 BPM",
            x + 10,
            y + h * 0.78
        );
    }

    // ======================================
    // TIANG INFUS
    // ======================================

    drawIVStand() {
        const x = width * 0.835;

        const top = height * 0.285;
        const bottom = height * 0.78;

        stroke(119, 143, 151, 230);
        strokeWeight(3);

        line(x, top, x, bottom);

        line(
            x - 17,
            top + 4,
            x + 17,
            top + 4
        );

        noStroke();

        // Kantong infus
        fill(220, 245, 244, 205);

        stroke(255, 255, 255, 220);
        strokeWeight(1.5);

        rect(
            x - 14,
            top + 7,
            28,
            45,
            7
        );

        noStroke();

        fill(125, 196, 206, 125);

        rect(
            x - 11,
            top + 31,
            22,
            18,
            4
        );

        fill(255, 255, 255, 150);

        rect(
            x - 8,
            top + 12,
            4,
            15,
            2
        );

        // Selang infus
        stroke(190, 224, 226, 210);
        strokeWeight(2);

        line(
            x,
            top + 52,
            x,
            top + 73
        );

        noStroke();

        // Tetesan cairan bergerak
        fill(128, 204, 219, 220);

        ellipse(
            x,
            top + 63 + (this.time * 30 % 8),
            4,
            6
        );

        stroke(143, 174, 179, 220);
        strokeWeight(2);

        line(
            x,
            top + 73,
            x,
            height * 0.54
        );

        noStroke();

        // Kaki tiang infus
        stroke(119, 143, 151, 230);
        strokeWeight(2);

        line(
            x,
            bottom,
            x - 23,
            bottom + 8
        );

        line(
            x,
            bottom,
            x + 23,
            bottom + 8
        );

        line(
            x,
            bottom,
            x,
            bottom + 11
        );

        noStroke();

        fill(74, 94, 104);

        circle(
            x - 23,
            bottom + 9,
            8
        );

        circle(
            x + 23,
            bottom + 9,
            8
        );

        circle(
            x,
            bottom + 12,
            8
        );
    }

    // ======================================
    // MEJA SAMPING TEMPAT TIDUR
    // ======================================

    drawBedsideCabinet() {
        const x = width * 0.69;
        const y = height * 0.43;

        const w = width * 0.105;
        const h = height * 0.17;

        noStroke();

        fill(45, 62, 69, 45);

        rect(
            x + 4,
            y + 5,
            w,
            h,
            7
        );

        fill(194, 207, 199);

        rect(
            x,
            y,
            w,
            h,
            7
        );

        fill(225, 232, 221);

        rect(
            x - 3,
            y - 6,
            w + 6,
            10,
            4
        );

        fill(164, 184, 179);

        rect(
            x + 8,
            y + 20,
            w - 16,
            4,
            2
        );

        rect(
            x + 8,
            y + 49,
            w - 16,
            4,
            2
        );

        fill(106, 131, 133);

        circle(
            x + w * 0.5,
            y + 34,
            5
        );

        circle(
            x + w * 0.5,
            y + 64,
            5
        );

        // Gelas air
        fill(220, 244, 243, 175);

        rect(
            x + w * 0.63,
            y - 24,
            13,
            20,
            3
        );

        fill(120, 190, 202, 130);

        rect(
            x + w * 0.65,
            y - 13,
            9,
            7,
            2
        );
    }

    // ======================================
    // PANEL MEDIS DINDING
    // ======================================

    drawMedicalWallPanel() {
        const x = width * 0.49;
        const y = height * 0.25;

        noStroke();

        fill(205, 216, 208, 190);

        rect(
            x,
            y,
            width * 0.17,
            height * 0.055,
            6
        );

        fill(255, 255, 250, 210);

        rect(
            x + 7,
            y + 7,
            width * 0.045,
            height * 0.035,
            4
        );

        fill(132, 169, 161);

        circle(
            x + width * 0.105,
            y + height * 0.027,
            8
        );

        circle(
            x + width * 0.135,
            y + height * 0.027,
            8
        );

        fill(95, 133, 130);

        rect(
            x + width * 0.15,
            y + 8,
            12,
            4,
            2
        );
    }

    // ======================================
    // BUNGA DAN DEKORASI
    // ======================================

    drawFlowersAndDetails() {
        this.drawFlowerVase(
            width * 0.17,
            height * 0.68,
            0.82
        );

        this.drawFlowerVase(
            width * 0.89,
            height * 0.68,
            0.58
        );

        noFill();

        stroke(255, 255, 247, 180);
        strokeWeight(3);

        rect(
            width * 0.48,
            height * 0.34,
            width * 0.13,
            height * 0.095,
            4
        );

        noStroke();

        fill(112, 157, 139, 180);

        ellipse(
            width * 0.545,
            height * 0.385,
            18,
            28
        );

        stroke(240, 246, 225, 160);
        strokeWeight(1.2);

        line(
            width * 0.545,
            height * 0.37,
            width * 0.545,
            height * 0.40
        );

        noStroke();
    }

    drawFlowerVase(x, y, scaleFactor) {
        push();

        translate(x, y);
        scale(scaleFactor);

        noStroke();

        fill(220, 237, 230, 205);

        triangle(
            -12, 0,
            12, 0,
            8, 29
        );

        fill(245, 250, 244, 225);

        ellipse(
            0,
            28,
            20,
            7
        );

        stroke(92, 145, 116, 210);
        strokeWeight(2);

        line(0, 3, -10, -27);
        line(0, 3, 1, -34);
        line(0, 3, 12, -25);
        line(0, 3, 18, -18);

        noStroke();

        this.drawFlower(
            -10, -29,
            color(245, 177, 157)
        );

        this.drawFlower(
            1, -37,
            color(255, 222, 151)
        );

        this.drawFlower(
            12, -27,
            color(231, 177, 204)
        );

        this.drawFlower(
            18, -20,
            color(255, 239, 202)
        );

        pop();
    }

    drawFlower(x, y, petalColor) {
        noStroke();

        fill(petalColor);

        for (let i = 0; i < 5; i++) {
            const angle = TWO_PI * i / 5;

            ellipse(
                x + cos(angle) * 5,
                y + sin(angle) * 5,
                8,
                8
            );
        }

        fill(235, 190, 105);

        circle(x, y, 5);
    }

    // ======================================
    // CAHAYA DI AREA TEMPAT TIDUR
    // ======================================

    drawHealingAura() {
        const x = width * 0.635;
        const y = height * 0.60;

        const pulse =
            (sin(this.time * 2.2) + 1) * 0.5;

        noStroke();

        fill(255, 226, 166, 18 + pulse * 20);

        ellipse(
            x,
            y,
            125 + pulse * 15,
            65 + pulse * 10
        );

        fill(255, 255, 238, 12 + pulse * 10);

        ellipse(
            x,
            y,
            90 + pulse * 10,
            42 + pulse * 8
        );
    }

    // ======================================
    // GIPS KAKI KANAN
    // ======================================

    drawRightAnkleCast() {
        const legX = width * 0.635;
        const legY = height * 0.585;

        const pulse = sin(this.time * 3) * 3;

        noStroke();

        fill(255, 228, 180, 35);

        ellipse(
            legX + 20,
            legY + 9,
            105 + pulse,
            55 + pulse
        );

        fill(226, 185, 153);

        beginShape();

        vertex(legX - 48, legY - 9);
        vertex(legX - 12, legY - 8);
        vertex(legX + 1, legY + 9);
        vertex(legX - 44, legY + 12);

        endShape(CLOSE);

        fill(250, 250, 244);

        stroke(192, 202, 197);
        strokeWeight(1.4);

        beginShape();

        vertex(legX - 15, legY - 13);
        vertex(legX + 14, legY - 11);
        vertex(legX + 29, legY + 6);
        vertex(legX + 52, legY + 9);
        vertex(legX + 54, legY + 27);
        vertex(legX + 18, legY + 29);
        vertex(legX - 6, legY + 30);
        vertex(legX - 18, legY + 7);

        endShape(CLOSE);

        stroke(211, 220, 213, 220);
        strokeWeight(1.3);

        line(
            legX - 9, legY - 8,
            legX + 8, legY + 4
        );

        line(
            legX - 2, legY - 1,
            legX + 18, legY + 12
        );

        line(
            legX + 8, legY + 5,
            legX + 38, legY + 17
        );

        line(
            legX + 19, legY + 12,
            legX + 46, legY + 25
        );

        noStroke();

        fill(226, 185, 153);

        ellipse(
            legX + 58,
            legY + 14,
            11,
            9
        );

        ellipse(
            legX + 59,
            legY + 20,
            9,
            7
        );

        ellipse(
            legX + 57,
            legY + 25,
            8,
            6
        );

        ellipse(
            legX + 54,
            legY + 29,
            6,
            5
        );

        fill(245, 218, 201);

        ellipse(
            legX + 61,
            legY + 14,
            4,
            3
        );
    }

        // ======================================
    // KARTU DOA
    // ======================================

    drawWishCards() {
        if (this.completed) return;

        rectMode(CENTER);

        for (const card of this.cards) {
            const floatY = sin(card.pulse) * 4;

            const cx = card.x;
            const cy = card.y + floatY;

            const lift = card.hover * 5;

            const w = card.w + card.hover * 8;
            const h = card.h + card.hover * 4;

            push();

            translate(cx, cy - lift);

            rotate(
                card.tilt * (1 - card.hover)
            );

            // Bayangan kartu
            noStroke();

            fill(
                255,
                211,
                155,
                24 + card.hover * 30
            );

            rect(
                0,
                5,
                w + 15,
                h + 15,
                16
            );

            // Permukaan kartu
            fill(255, 251, 239, 245);

            stroke(
                card.hover > 0.2
                    ? color(255, 226, 163)
                    : color(255, 255, 255, 210)
            );

            strokeWeight(1.5);

            rect(
                0,
                0,
                w,
                h,
                13
            );

            noStroke();

            // Garis dekorasi kartu
            fill(210, 164, 117, 210);

            rect(
                -w / 2 + 5,
                0,
                5,
                h - 12,
                3
            );

            // Lingkaran ikon
            fill(245, 226, 195);

            circle(
                -w * 0.37,
                0,
                34
            );

            fill(83, 107, 102);

            textAlign(CENTER, CENTER);
            textSize(17);

            text(
                card.wish.icon,
                -w * 0.37,
                1
            );

            // Tulisan doa
            fill(58, 78, 76);

            textAlign(LEFT, CENTER);
            textStyle(BOLD);

            const fontSize = max(
                9,
                min(12, width * 0.013)
            );

            textSize(fontSize);

            this.drawWrappedText(
                card.wish.text,
                -w * 0.25,
                -2,
                w * 0.68,
                14
            );

            pop();
        }

        rectMode(CORNER);
    }

    // ======================================
    // MEMBUAT TEKS DOA MENJADI BEBERAPA BARIS
    // ======================================

    drawWrappedText(value, x, y, maxWidth, lineHeight) {
        const words = value.split(" ");
        let line = "";
        const lines = [];

        for (const word of words) {
            const testLine = line
                ? line + " " + word
                : word;

            if (
                textWidth(testLine) > maxWidth &&
                line !== ""
            ) {
                lines.push(line);
                line = word;
            } else {
                line = testLine;
            }
        }

        if (line) {
            lines.push(line);
        }

        const totalHeight =
            lines.length * lineHeight;

        let startY =
            y - totalHeight / 2 + lineHeight / 2;

        for (const item of lines) {
            text(
                item,
                x,
                startY
            );

            startY += lineHeight;
        }
    }

    // ======================================
    // EFEK HATI DAN KILAUAN
    // ======================================

    drawFloatingEffects() {
        textAlign(CENTER, CENTER);

        for (const effect of this.floatingHearts) {
            push();

            translate(
                effect.x,
                effect.y
            );

            scale(
                effect.scale || 1
            );

            noStroke();

            fill(
                255,
                244,
                221,
                effect.alpha
            );

            textSize(
                effect.size || 13
            );

            text(
                effect.text,
                0,
                0
            );

            pop();
        }
    }

    // ======================================
    // JUDUL UTAMA
    // HANYA GET WELL SOON SH
    // ======================================

    drawHeader() {
        textAlign(CENTER, CENTER);

        noStroke();

        // Cahaya lembut di belakang judul
        const pulse =
            (sin(this.time * 1.5) + 1) * 0.5;

        fill(
            255,
            225,
            185,
            18 + pulse * 12
        );

        ellipse(
            width / 2,
            height * 0.105,
            width * 0.42,
            height * 0.105
        );

        // Judul utama
        fill(255, 255, 248);

        textStyle(BOLD);

        textSize(
            max(
                21,
                min(34, width * 0.041)
            )
        );

        drawingContext.shadowColor =
            "rgba(255,255,255,0.55)";

        drawingContext.shadowBlur = 15;

        text(
            "GET WELL SOON SH",
            width / 2,
            height * 0.115
        );

        drawingContext.shadowBlur = 0;
    }

    // ======================================
    // PROGRESS 10 KLIK
    // ======================================

    drawProgress() {
        const centerX = width / 2;

        const y = height * 0.855;

        const barW = min(
            width * 0.42,
            390
        );

        const barH = 9;

        const progress = constrain(
            this.score / this.targetScore,
            0,
            1
        );

        textAlign(CENTER, CENTER);
        noStroke();

        fill(255, 249, 231, 235);

        textStyle(BOLD);

        textSize(
            max(10, width * 0.013)
        );

        // Hanya angka progress
        text(
            `${this.score} / ${this.targetScore}`,
            centerX,
            y - 17
        );

        // Background progress bar
        fill(255, 255, 255, 75);

        rectMode(CENTER);

        rect(
            centerX,
            y,
            barW,
            barH,
            8
        );

        // Progress yang terisi
        if (progress > 0) {
            fill(255, 220, 165, 245);

            rect(
                centerX - barW / 2 +
                    (barW * progress) / 2,
                y,
                barW * progress,
                barH,
                8
            );
        }

        rectMode(CORNER);
    }

    // ======================================
    // DETEKSI MOUSE
    // ======================================

    mousePressed() {
        if (this.completed) return;

        for (
            let i = this.cards.length - 1;
            i >= 0;
            i--
        ) {
            const card = this.cards[i];

            const cy =
                card.y + sin(card.pulse) * 4;

            if (
                this.isInside(
                    mouseX,
                    mouseY,
                    card.x,
                    cy,
                    card.w + 10,
                    card.h + 10
                )
            ) {
                this.sendWish(card, i);
                return;
            }
        }
    }

    // ======================================
    // MENGIRIM DOA
    // ======================================

    sendWish(card, index) {
        if (
            this.usedWishIds.has(card.wish.id)
        ) {
            return;
        }

        this.score++;

        this.usedWishIds.add(
            card.wish.id
        );

        this.lastClickedWish = card.wish;

        // Partikel cahaya mengelilingi kartu
        for (let i = 0; i < 12; i++) {
            const angle =
                TWO_PI * i / 12;

            this.floatingHearts.push({
                x: card.x + cos(angle) * 8,

                y: card.y + sin(angle) * 8,

                vx: cos(angle) * random(0.25, 0.9),

                vy: random(0.55, 1.25),

                alpha: 255,

                fade: random(2.2, 3.4),

                scale: random(0.8, 1.2),

                size: random(10, 17),

                text: random([
                    "✦",
                    "♥",
                    "✨",
                    "✧",
                    "🤍"
                ])
            });
        }

        // Efek ikon doa
        this.floatingHearts.push({
            x: card.x,
            y: card.y,

            vx: 0,
            vy: 1.0,

            alpha: 255,
            fade: 2,

            scale: 1,
            size: 22,

            text: card.wish.icon
        });

        // Tampilkan doa yang dipilih
        this.messageText =
            card.wish.text;

        this.messageAlpha = 255;

        // Hapus kartu yang sudah diklik
        this.cards.splice(index, 1);

        // Jika sudah 10 klik
        if (
            this.score >= this.targetScore
        ) {
            this.completed = true;

            this.cards = [];

            this.messageText =
                "Semoga lekas sembuh dan selalu diberi kesehatan.";

            this.messageAlpha = 255;

            this.createCompletionBurst();

        } else {
            this.spawnCards();
        }
    }

        // ======================================
    // EFEK KETIKA 10 DOA SELESAI
    // ======================================

    createCompletionBurst() {
        const symbols = [
            "✦",
            "✨",
            "💛",
            "🤍",
            "🌼",
            "🕊️"
        ];

        for (let i = 0; i < 65; i++) {
            this.floatingHearts.push({
                x: random(
                    width * 0.18,
                    width * 0.82
                ),

                y: random(
                    height * 0.30,
                    height * 0.75
                ),

                vx: random(-0.7, 0.7),

                vy: random(0.5, 1.7),

                alpha: 255,

                fade: random(1.0, 2.1),

                scale: random(0.8, 1.5),

                size: random(11, 22),

                text: random(symbols)
            });
        }
    }

    // ======================================
    // STATUS PENYELESAIAN
    // ======================================

    canContinue() {
        return this.completed;
    }

    // ======================================
    // DETEKSI AREA KLIK
    // ======================================

    isInside(mx, my, x, y, w, h) {
        return (
            mx >= x - w / 2 &&
            mx <= x + w / 2 &&
            my >= y - h / 2 &&
            my <= y + h / 2
        );
    }
}