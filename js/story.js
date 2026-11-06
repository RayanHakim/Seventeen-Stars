class Story {

    constructor() {

        // =====================================
        // MODE
        // =====================================

        this.mode = "home";


        // =====================================
        // CURRENT SCENE
        // =====================================

        this.currentScene = 0;
        this.endScene = 0;


        // =====================================
        // SCENES
        // ORDER DETERMINES STORY
        // =====================================

        this.scenes = [

            // =================================
            // AUGUST 2026 (0-4)
            // =================================

            new OnboardingScene(),       // 0
            new LaptopScene(),           // 1
            new PadelScene(),            // 2
            new AugustCafeScene(),       // 3
            new CinemaScene(),           // 4


            // =================================
            // SEPTEMBER 2026 (5-14)
            // =================================

            new BasketballScene(),       // 5
            new RunningScene(),           // 6
            new DuckScene(),              // 7
            new FireDrillScene(),         // 8
            new HealthCheckScene(),       // 9
            new WarungScene(),            // 10
            new FutsalScene(),            // 11
            new SummareconScene(),        // 12

            new GoodbyeScene(),           // 13
            new ProjectCharterScene(),    // 14


            // =================================
            // OCTOBER 2026 (15-16)
            // =================================

            new PreparationScene(),       // 15
            new GetWellSoonScene()        // 16

        ];


        // =====================================
        // MONTH RANGES
        // =====================================

        this.monthRanges = {

            august: {
                start: 0,
                end: 4,
                label: "AUGUST 2026"
            },

            september: {
                start: 5,
                end: 14,
                label: "SEPTEMBER 2026"
            },

            october: {
                start: 15,
                end: 16,
                label: "OCTOBER 2026"
            }

        };


        // =====================================
        // STORY UI
        // =====================================

        this.storyUI =
            document.getElementById("story-ui");

        this.button =
            document.getElementById("next-button");

        this.month =
            document.getElementById("month");

        this.title =
            document.getElementById("title");

        this.subtitle =
            document.getElementById("subtitle");


        // =====================================
        // HOME ELEMENTS
        // =====================================

        this.homeMenu =
            document.getElementById("home-menu");

        this.followButton =
            document.getElementById("follow-story-button");

        this.memoriesButton =
            document.getElementById("memories-button");


        // =====================================
        // MONTH MENU ELEMENTS
        // =====================================

        this.monthMenu =
            document.getElementById("month-menu");

        this.augustButton =
            document.getElementById("month-august");

        this.septemberButton =
            document.getElementById("month-september");

        this.octoberButton =
            document.getElementById("month-october");

        this.backHomeButton =
            document.getElementById("back-home-button");


        // =====================================
        // HOME EVENTS
        // =====================================

        if (this.followButton) {

            this.followButton.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();
                    event.stopPropagation();

                    this.playMusic();
                    this.startJourney();

                }
            );

        }


        if (this.memoriesButton) {

            this.memoriesButton.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();
                    event.stopPropagation();

                    this.playMusic();
                    this.showMemories();

                }
            );

        }


        // =====================================
        // AUGUST BUTTON
        // =====================================

        if (this.augustButton) {

            this.augustButton.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();
                    event.stopPropagation();

                    this.playMusic();
                    this.startMonth("august");

                }
            );

        }


        // =====================================
        // SEPTEMBER BUTTON
        // =====================================

        if (this.septemberButton) {

            this.septemberButton.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();
                    event.stopPropagation();

                    this.playMusic();
                    this.startMonth("september");

                }
            );

        }


        // =====================================
        // OCTOBER BUTTON
        // =====================================

        if (this.octoberButton) {

            this.octoberButton.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();
                    event.stopPropagation();

                    this.playMusic();
                    this.startMonth("october");

                }
            );

        }


        // =====================================
        // BACK TO HOME BUTTON
        // =====================================

        if (this.backHomeButton) {

            this.backHomeButton.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();
                    event.stopPropagation();

                    this.showHome();

                }
            );

        }


        // =====================================
        // GLOBAL CONTINUE BUTTON
        // =====================================

        if (this.button) {

            this.button.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();
                    event.stopPropagation();

                    this.next();

                }
            );

        }

    }


    // =========================================
    // PLAY MUSIC SAFELY
    // =========================================

    playMusic() {

        if (typeof startMusic === "function") {

            startMusic();

        }

    }


    // =========================================
    // START APPLICATION
    // =========================================

    start() {

        this.showHome();

    }


    // =========================================
    // UPDATE
    // =========================================

    update() {

        if (
            this.mode !== "story" &&
            this.mode !== "memory"
        ) {

            return;

        }


        const scene =
            this.scenes[this.currentScene];


        if (!scene) {

            return;

        }


        if (typeof scene.update === "function") {

            scene.update();

        }


        if (typeof scene.updateHover === "function") {

            scene.updateHover();

        }


        if (typeof scene.display === "function") {

            scene.display();

        }


        this.updateButton(scene);

    }


    // =========================================
    // HANDLE CANVAS CLICK
    // =========================================

    handleClick() {

        if (
            this.mode !== "story" &&
            this.mode !== "memory"
        ) {

            return;

        }


        const scene =
            this.scenes[this.currentScene];


        if (!scene) {

            return;

        }


        if (typeof scene.mousePressed === "function") {

            scene.mousePressed();

        }

    }


    // =========================================
    // FOLLOW JOURNEY
    // =========================================

    startJourney() {

        this.mode = "story";

        this.currentScene = 0;

        this.endScene = this.scenes.length - 1;


        this.hideHome();

        this.hideMemories();

        this.showStory();

        this.showScene();

    }


    // =========================================
    // SHOW MEMORIES MENU
    // =========================================

    showMemories() {

        this.mode = "home";


        this.hideHome();

        this.hideStory();


        if (this.monthMenu) {

            this.monthMenu.style.display = "flex";

        }

    }


    // =========================================
    // START SELECTED MONTH
    // =========================================

    startMonth(monthName) {

        const range =
            this.monthRanges[monthName];


        if (!range) {

            console.error(
                "Month range not found:",
                monthName
            );

            return;

        }


        // Validate selected scene range.

        if (
            !this.scenes[range.start] ||
            !this.scenes[range.end]
        ) {

            console.error(
                "Scene range is invalid:",
                monthName,
                range
            );

            return;

        }


        this.mode = "memory";

        this.currentScene = range.start;

        this.endScene = range.end;


        this.hideHome();

        this.hideMemories();

        this.showStory();

        this.showScene();

    }


    // =========================================
    // NEXT SCENE
    // =========================================

    next() {

        if (
            this.mode !== "story" &&
            this.mode !== "memory"
        ) {

            return;

        }


        const scene =
            this.scenes[this.currentScene];


        if (!scene) {

            return;

        }


        // =====================================
        // CHECK SCENE COMPLETION
        // =====================================

        if (
            typeof scene.canContinue === "function" &&
            !scene.canContinue()
        ) {

            return;

        }


        // =====================================
        // EXIT CURRENT SCENE
        // =====================================

        if (typeof scene.exit === "function") {

            scene.exit();

        }


        // =====================================
        // ADVANCE TO NEXT SCENE
        // =====================================

        if (this.currentScene < this.endScene) {

            this.currentScene++;

            this.showScene();

            return;

        }


        // =====================================
        // END OF FULL JOURNEY
        // =====================================

        if (this.mode === "story") {

            this.showHome();

            return;

        }


        // =====================================
        // END OF SELECTED MONTH
        // =====================================

        if (this.mode === "memory") {

            this.showMemories();

        }

    }


    // =========================================
    // SHOW CURRENT SCENE
    // =========================================

    showScene() {

        const scene =
            this.scenes[this.currentScene];


        if (!scene) {

            console.error(
                "Scene not found at index:",
                this.currentScene
            );

            return;

        }


        if (typeof scene.enter === "function") {

            scene.enter();

        }


        this.updateUI(scene);

    }


    // =========================================
    // UPDATE STORY INFORMATION
    // =========================================

    updateUI(scene) {

        if (!scene) {

            return;

        }


        if (this.month) {

            this.month.textContent =
                scene.month || "";

        }


        if (this.title) {

            this.title.textContent =
                scene.title || "";

        }


        if (this.subtitle) {

            this.subtitle.textContent =
                scene.subtitle || "";

        }


        if (this.button) {

            this.button.textContent =
                scene.buttonText || "CONTINUE";

        }


        this.updateButton(scene);

    }


    // =========================================
    // UPDATE GLOBAL CONTINUE BUTTON
    // =========================================

    updateButton(scene) {

        if (!this.button) {

            return;

        }


        if (!scene) {

            this.button.disabled = true;

            return;

        }


        if (typeof scene.canContinue === "function") {

            this.button.disabled =
                !scene.canContinue();

        } else {

            this.button.disabled = false;

        }

    }


    // =========================================
    // SHOW HOME
    // =========================================

    showHome() {

        // Exit the current scene before returning home.

        if (
            this.mode === "story" ||
            this.mode === "memory"
        ) {

            const scene =
                this.scenes[this.currentScene];


            if (
                scene &&
                typeof scene.exit === "function"
            ) {

                scene.exit();

            }

        }


        this.mode = "home";


        this.hideStory();

        this.hideMemories();


        if (this.homeMenu) {

            this.homeMenu.style.display = "flex";

        }

    }


    // =========================================
    // HIDE HOME
    // =========================================

    hideHome() {

        if (this.homeMenu) {

            this.homeMenu.style.display = "none";

        }

    }


    // =========================================
    // SHOW STORY UI
    // =========================================

    showStory() {

        if (this.storyUI) {

            this.storyUI.style.display = "block";

        }

    }


    // =========================================
    // HIDE STORY UI
    // =========================================

    hideStory() {

        if (this.storyUI) {

            this.storyUI.style.display = "none";

        }

    }


    // =========================================
    // HIDE MEMORIES
    // =========================================

    hideMemories() {

        if (this.monthMenu) {

            this.monthMenu.style.display = "none";

        }

    }

}