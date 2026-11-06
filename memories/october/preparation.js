class PreparationScene {
    constructor() {
        this.month = "OCTOBER 2026";
        this.title = "PREPARATION";
        this.subtitle = "One month before the trip, the plans began.";

        this.buttonText = "CONTINUE";

        this.state = "cafe";
        this.selectedCard = -1;
        this.completed = [false, false, false, false, false];
        this.hoveredCard = -1;
        this.particles = [];

        this.roles = [
            {
                title: "KETUA",
                description: "Coordinate the plan",
                detail: "Keep the group moving in the same direction."
            },
            {
                title: "SEKRETARIS",
                description: "Record the discussion",
                detail: "Keep the plans and decisions organized."
            },
            {
                title: "BENDAHARA",
                description: "Manage the budget",
                detail: "Track estimated costs and shared expenses."
            },
            {
                title: "PANITIA",
                description: "Prepare the trip",
                detail: "Help coordinate transport, villa, and activities."
            },
            {
                title: "PDD",
                description: "Capture the memories",
                detail: "Prepare documentation and creative content."
            }
        ];

        this.createParticles();
    }

    enter() {
        this.state = "cafe";
        this.selectedCard = -1;
        this.completed = [false, false, false, false, false];
        this.hoveredCard = -1;
        this.createParticles();

        if (typeof starSystem !== "undefined") {
            starSystem.hideAll();
        }
    }

    exit() {
        if (typeof starSystem !== "undefined") {
            starSystem.showAll();
        }
    }

    createParticles() {
        this.particles = [];

        for (let i = 0; i < 35; i++) {
            this.particles.push({
                x: random(width),
                y: random(height),
                size: random(1, 2.5),
                speed: random(0.1, 0.35),
                alpha: random(25, 90)
            });
        }
    }

    update() {
        for (const p of this.particles) {
            p.y -= p.speed;
            if (p.y < 0) {
                p.y = height;
                p.x = random(width);
            }
        }

        this.hoveredCard = -1;

        const layout = this.getLayout();

        for (let i = 0; i < this.roles.length; i++) {
            const card = layout.cards[i];

            if (this.isInside(
                mouseX, mouseY,
                card.x, card.y,
                card.w, card.h
            )) {
                this.hoveredCard = i;
                break;
            }
        }
    }

    display() {
        this.drawBackground();
        this.drawCafe();
        this.drawHeader();
        this.drawCards();
        this.drawProgress();
        // this.drawContinueButton(); // Dihapus agar tidak bertumpuk dengan tombol HTML story.js
    }

    drawBackground() {
        background(5, 7, 13);
        noStroke();

        for (const p of this.particles) {
            fill(150, 185, 255, p.alpha);
            circle(p.x, p.y, p.size);
        }

        // Soft ambient light
        fill(35, 65, 110, 20);
        circle(width / 2, height * 0.4, min(width, height) * 0.8);
    }

    drawCafe() {
        // Window behind the table
        noStroke();
        fill(11, 18, 30);
        rect(width * 0.12, height * 0.20, width * 0.76, height * 0.38, 8);

        stroke(48, 66, 95, 100);
        strokeWeight(1);
        line(width * 0.5, height * 0.20, width * 0.5, height * 0.58);
        line(width * 0.12, height * 0.39, width * 0.88, height * 0.39);

        // Warm lights
        noStroke();
        fill(255, 190, 110, 18);
        circle(width * 0.25, height * 0.27, 100);
        circle(width * 0.75, height * 0.27, 100);

        // Cafe table
        fill(26, 22, 25);
        rect(width * 0.08, height * 0.59, width * 0.84, height * 0.12, 8);

        fill(54, 39, 35);
        rect(width * 0.08, height * 0.59, width * 0.84, 5, 3);

        // Coffee cups
        for (const x of [width * 0.17, width * 0.81]) {
            fill(205, 205, 195);
            rect(x - 9, height * 0.53, 18, 18, 3);

            noFill();
            stroke(205, 205, 195);
            arc(x + 9, height * 0.54, 12, 12, -HALF_PI, HALF_PI);
        }

        noStroke();
        fill(70, 45, 32);
        ellipse(width * 0.17, height * 0.535, 12, 5);
        ellipse(width * 0.81, height * 0.535, 12, 5);
    }

    drawHeader() {
        textAlign(CENTER, CENTER);
        noStroke();

        fill(155, 169, 193);
        textSize(12);
        text(
            "A cafe, a table, and plans for Bandung.",
            width / 2,
            height * 0.155
        );
    }

    getLayout() {
        const compact = width < 650;
        const cardW = compact
            ? min(width * 0.82, 300)
            : min(width * 0.25, 230);
        const cardH = compact ? 64 : 112;
        const gap = compact ? 9 : 16;

        const cards = [];

        if (compact) {
            const totalH = this.roles.length * cardH +
                (this.roles.length - 1) * gap;
            const startY = max(height * 0.20, (height - totalH) / 2 + 12);

            for (let i = 0; i < this.roles.length; i++) {
                cards.push({
                    x: width / 2,
                    y: startY + i * (cardH + gap) + cardH / 2,
                    w: cardW,
                    h: cardH
                });
            }
        } else {
            const totalW = this.roles.length * cardW +
                (this.roles.length - 1) * gap;
            const startX = (width - totalW) / 2;

            for (let i = 0; i < this.roles.length; i++) {
                cards.push({
                    x: startX + i * (cardW + gap) + cardW / 2,
                    y: height * 0.46,
                    w: cardW,
                    h: cardH
                });
            }
        }

        return { cards, compact };
    }

    drawCards() {
        const layout = this.getLayout();

        for (let i = 0; i < this.roles.length; i++) {
            const role = this.roles[i];
            const card = layout.cards[i];
            const isDone = this.completed[i];
            const isHover = this.hoveredCard === i;
            const isSelected = this.selectedCard === i;

            rectMode(CENTER);
            noStroke();

            if (isDone) {
                fill(31, 59, 73, 245);
            } else if (isHover || isSelected) {
                fill(27, 43, 66, 250);
            } else {
                fill(14, 20, 32, 240);
            }

            rect(
                card.x, card.y,
                card.w + (isHover ? 5 : 0),
                card.h + (isHover ? 5 : 0),
                8
            );

            noFill();
            stroke(
                isDone ? color(105, 195, 205, 180)
                    : isHover ? color(115, 170, 255, 200)
                    : color(75, 94, 126, 120)
            );
            rect(card.x, card.y, card.w, card.h, 8);

            noStroke();
            textAlign(CENTER, CENTER);

            fill(isDone ? 155 : 220, isDone ? 220 : 228, 245);
            textSize(layout.compact ? 12 : 15);
            text(role.title, card.x, card.y - (layout.compact ? 10 : 22));

            fill(150, 168, 194);
            textSize(layout.compact ? 10 : 11);
            text(
                isDone ? "✓ PLAN REVIEWED" : role.description,
                card.x,
                card.y + (layout.compact ? 11 : 5)
            );

            if (!layout.compact && isSelected) {
                fill(130, 185, 245);
                textSize(10);
                text(role.detail, card.x, card.y + 28);
            }
        }

        rectMode(CORNER);
    }

    drawProgress() {
        const count = this.completed.filter(Boolean).length;

        textAlign(CENTER, CENTER);
        noStroke();
        fill(160, 177, 205);
        textSize(11);

        text(
            count === this.roles.length
                ? "ALL 5 RESPONSIBILITIES REVIEWED"
                : `EXPLORE THE PLANNING ROLES  ·  ${count}/5`,
            width / 2,
            height * (width < 650 ? 0.82 : 0.65)
        );

        if (this.selectedCard >= 0) {
            const role = this.roles[this.selectedCard];

            fill(205, 215, 235);
            textSize(11);

            text(
                role.detail,
                width / 2,
                height * (width < 650 ? 0.85 : 0.69),
                min(width * 0.88, 600),
                40
            );
        }
    }

    drawContinueButton() {
        // Fungsi sengaja dikosongkan agar tidak menggambar tombol canvas ganda
    }

    mousePressed() {
        const layout = this.getLayout();

        for (let i = 0; i < layout.cards.length; i++) {
            const card = layout.cards[i];

            if (this.isInside(
                mouseX, mouseY,
                card.x, card.y,
                card.w, card.h
            )) {
                this.selectedCard = i;
                this.completed[i] = true;
                return;
            }
        }
    }

    canContinue() {
        return this.completed.every(Boolean);
    }

    isInside(mx, my, x, y, w, h) {
        return mx >= x - w / 2 &&
            mx <= x + w / 2 &&
            my >= y - h / 2 &&
            my <= y + h / 2;
    }

    updateHover() {
        // Hover is calculated in update().
    }
}