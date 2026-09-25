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
        // =====================================

        this.scenes = [

            // =================================
            // AUGUST 2026
            // =================================

            new OnboardingScene(),

            new LaptopScene(),

            new PadelScene(),

            new AugustCafeScene(),

            new CinemaScene(),


            // =================================
            // SEPTEMBER 2026
            // =================================

            new BasketballScene(),

            new RunningScene(),

            new DuckScene(),

            new FireDrillScene(),

            new HealthCheckScene(),

            new WarungScene(),

            new FutsalScene(),

            new SummareconScene(),

            new GoodbyeScene()

        ];


        // =====================================
        // MONTH RANGES
        // =====================================

        this.monthRanges = {

            august: {

                start: 0,

                end: 4,

                label:
                    "AUGUST 2026"

            },


            september: {

                start: 5,

                end: 13,

                label:
                    "SEPTEMBER 2026"

            }

        };


        // =====================================
        // STORY UI
        // =====================================

        this.storyUI =
            document.getElementById(
                "story-ui"
            );


        this.button =
            document.getElementById(
                "next-button"
            );


        this.month =
            document.getElementById(
                "month"
            );


        this.title =
            document.getElementById(
                "title"
            );


        this.subtitle =
            document.getElementById(
                "subtitle"
            );


        // =====================================
        // HOME
        // =====================================

        this.homeMenu =
            document.getElementById(
                "home-menu"
            );


        this.followButton =
            document.getElementById(
                "follow-story-button"
            );


        this.memoriesButton =
            document.getElementById(
                "memories-button"
            );


        // =====================================
        // MONTH MENU
        // =====================================

        this.monthMenu =
            document.getElementById(
                "month-menu"
            );


        this.augustButton =
            document.getElementById(
                "month-august"
            );


        this.septemberButton =
            document.getElementById(
                "month-september"
            );


        this.backHomeButton =
            document.getElementById(
                "back-home-button"
            );


        // =====================================
        // HOME EVENTS
        // =====================================

        if (
            this.followButton
        ) {

            this.followButton.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    event.stopPropagation();

                    startMusic();

                    this.startJourney();

                }
            );

        }


        if (
            this.memoriesButton
        ) {

            this.memoriesButton.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    event.stopPropagation();

                    startMusic();

                    this.showMemories();

                }
            );

        }


        // =====================================
        // AUGUST
        // =====================================

        if (
            this.augustButton
        ) {

            this.augustButton.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    event.stopPropagation();

                    startMusic();

                    this.startMonth(
                        "august"
                    );

                }
            );

        }


        // =====================================
        // SEPTEMBER
        // =====================================

        if (
            this.septemberButton
        ) {

            this.septemberButton.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    event.stopPropagation();

                    startMusic();

                    this.startMonth(
                        "september"
                    );

                }
            );

        }


        // =====================================
        // BACK HOME
        // =====================================

        if (
            this.backHomeButton
        ) {

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
        // CONTINUE
        // =====================================

        if (
            this.button
        ) {

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
    // START
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
            this.scenes[
                this.currentScene
            ];


        if (!scene) {

            return;

        }


        if (
            scene.update
        ) {

            scene.update();

        }


        if (
            scene.updateHover
        ) {

            scene.updateHover();

        }


        if (
            scene.display
        ) {

            scene.display();

        }


        this.updateButton(
            scene
        );

    }


    // =========================================
    // HANDLE CLICK
    // =========================================

    handleClick() {

        if (
            this.mode !== "story" &&
            this.mode !== "memory"
        ) {

            return;

        }


        const scene =
            this.scenes[
                this.currentScene
            ];


        if (!scene) {

            return;

        }


        if (
            scene.mousePressed
        ) {

            scene.mousePressed();

        }

    }


    // =========================================
    // FOLLOW JOURNEY
    // =========================================

    startJourney() {

        this.mode =
            "story";


        this.currentScene =
            0;


        this.endScene =
            this.scenes.length - 1;


        this.hideHome();

        this.hideMemories();

        this.showStory();

        this.showScene();

    }


    // =========================================
    // SHOW MEMORIES
    // =========================================

    showMemories() {

        this.mode =
            "home";


        this.hideHome();

        this.hideStory();


        if (
            this.monthMenu
        ) {

            this.monthMenu.style.display =
                "flex";

        }

    }


    // =========================================
    // START MONTH
    // =========================================

    startMonth(
        monthName
    ) {

        const range =
            this.monthRanges[
                monthName
            ];


        if (!range) {

            return;

        }


        this.mode =
            "memory";


        this.currentScene =
            range.start;


        this.endScene =
            range.end;


        this.hideHome();

        this.hideMemories();

        this.showStory();

        this.showScene();

    }


    // =========================================
    // NEXT
    // =========================================

    next() {

        if (
            this.mode !== "story" &&
            this.mode !== "memory"
        ) {

            return;

        }


        const scene =
            this.scenes[
                this.currentScene
            ];


        if (!scene) {

            return;

        }


        // =====================================
        // CHECK COMPLETION
        // =====================================

        if (
            scene.canContinue &&
            !scene.canContinue()
        ) {

            return;

        }


        // =====================================
        // EXIT
        // =====================================

        if (
            scene.exit
        ) {

            scene.exit();

        }


        // =====================================
        // NEXT SCENE
        // =====================================

        if (
            this.currentScene <
            this.endScene
        ) {

            this.currentScene++;

            this.showScene();

            return;

        }


        // =====================================
        // END FOLLOW JOURNEY
        // =====================================

        if (
            this.mode === "story"
        ) {

            this.showHome();

            return;

        }


        // =====================================
        // END MONTH
        // =====================================

        if (
            this.mode === "memory"
        ) {

            this.showMemories();

        }

    }


    // =========================================
    // SHOW SCENE
    // =========================================

    showScene() {

        const scene =
            this.scenes[
                this.currentScene
            ];


        if (!scene) {

            return;

        }


        if (
            scene.enter
        ) {

            scene.enter();

        }


        this.updateUI(
            scene
        );

    }


    // =========================================
    // UPDATE UI
    // =========================================

    updateUI(
        scene
    ) {

        if (!scene) {

            return;

        }


        if (
            this.month
        ) {

            this.month.textContent =
                scene.month ||
                "";

        }


        if (
            this.title
        ) {

            this.title.textContent =
                scene.title ||
                "";

        }


        if (
            this.subtitle
        ) {

            this.subtitle.textContent =
                scene.subtitle ||
                "";

        }


        if (
            this.button
        ) {

            this.button.textContent =
                scene.buttonText ||
                "CONTINUE";

        }


        this.updateButton(
            scene
        );

    }


    // =========================================
    // BUTTON STATE
    // =========================================

    updateButton(
        scene
    ) {

        if (
            !scene ||
            !this.button
        ) {

            return;

        }


        if (
            scene.canContinue
        ) {

            this.button.disabled =
                !scene.canContinue();

        }

        else {

            this.button.disabled =
                false;

        }

    }


    // =========================================
    // SHOW HOME
    // =========================================

    showHome() {

        if (
            this.mode === "story" ||
            this.mode === "memory"
        ) {

            const scene =
                this.scenes[
                    this.currentScene
                ];


            if (
                scene &&
                scene.exit
            ) {

                scene.exit();

            }

        }


        this.mode =
            "home";


        this.hideStory();

        this.hideMemories();


        if (
            this.homeMenu
        ) {

            this.homeMenu.style.display =
                "flex";

        }

    }


    // =========================================
    // HIDE HOME
    // =========================================

    hideHome() {

        if (
            this.homeMenu
        ) {

            this.homeMenu.style.display =
                "none";

        }

    }


    // =========================================
    // SHOW STORY
    // =========================================

    showStory() {

        if (
            this.storyUI
        ) {

            this.storyUI.style.display =
                "block";

        }

    }


    // =========================================
    // HIDE STORY
    // =========================================

    hideStory() {

        if (
            this.storyUI
        ) {

            this.storyUI.style.display =
                "none";

        }

    }


    // =========================================
    // HIDE MEMORIES
    // =========================================

    hideMemories() {

        if (
            this.monthMenu
        ) {

            this.monthMenu.style.display =
                "none";

        }

    }

}