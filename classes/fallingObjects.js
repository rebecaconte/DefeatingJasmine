// ALL IMAGES
class FallingObjects {
    constructor() {
        this.maxItems = 10;
        this.maxSteps = 15;
        this.minSteps = 5;

        this.bug1 = new Image();
        this.bug1.src = './images/bug1.png';
        this.bug1.width = 35;
        this.bug1.height = 30;
        this.bug1.imageY = 0;
        this.bug1.type = "bug";

        this.bug2 = new Image();
        this.bug2.src = './images/bug2.png';
        this.bug2.width = 40;
        this.bug2.height = 30;
        this.bug2.imageY = 0;
        this.bug2.type = "bug";

        this.bug3 = new Image();
        this.bug3.src = './images/bug3.png';
        this.bug3.width = 30;
        this.bug3.height = 35;
        this.bug3.imageY = 0;
        this.bug3.type = "bug";

        this.bug4 = new Image();
        this.bug4.src = './images/bug4.png';
        this.bug4.width = 30;
        this.bug4.height = 40;
        this.bug4.imageY = 0;
        this.bug4.type = "bug";

        this.jasmineError = new Image();
        this.jasmineError.src = './images/error.png';
        this.jasmineError.width = 30;
        this.jasmineError.height = 30;
        this.jasmineError.imageY = 0;
        this.jasmineError.type = "error";

        this.jasmineCheck = new Image();
        this.jasmineCheck.src = './images/check.png';
        this.jasmineCheck.width = 35;
        this.jasmineCheck.height = 35;
        this.jasmineCheck.imageY = 0;
        this.jasmineCheck.type = "checkmark";

        this.takeBreak = new Image();
        this.takeBreak.src = './images/break.png';
        this.takeBreak.width = 35;
        this.takeBreak.height = 28;
        this.takeBreak.imageY = 0;
        this.takeBreak.type = "takebreak";

        this.objects = [this.jasmineError, this.jasmineCheck, this.takeBreak, this.bug1, this.bug2, this.bug3, this.bug4]
        this.randomObjects = [];
    }

    // CLEARING & RESET SCREEN
    update () {
        for(let i = 0; i < this.randomObjects.length; i++) {
            if(this.randomObjects[i].imageY >= canvas.height) {
                this.randomObjects[i].imageY = 0;
                this.randomObjects[i].imageX = Math.floor(Math.random() * (canvas.width - this.randomObjects[i].width));
            } else {
                this.randomObjects[i].imageY += this.randomObjects[i].speed;
            }
        }
    }

    reset(object) {
      object.imageY = 0;
      object.imageX = Math.floor(Math.random() * (canvas.width - object.width));
    }

    // RANDOMLY CHOSING FALLING ITEMS
    randomIndex(fallingObjectsArray){
        const random = Math.floor(Math.random() * fallingObjectsArray.length);
        return random
    }
    // GENERATING NEW ITEMS
    setup () {
        for(let i = 0; i < this.maxItems; i++) {
            this.generateNewFallingItem();
        }
    }

    // GENERATE ITEMS BY INDEX
    generateNewFallingItem() {
        const index = this.randomIndex(this.objects);
        const randomImage = this.objects[index];
        // Manual cloning of a random image
        let newRandomImage = new Image();
        newRandomImage.src = randomImage.src;
        newRandomImage.width = randomImage.width;
        newRandomImage.height = randomImage.height;
        newRandomImage.imageX = Math.floor(Math.random() * (canvas.width - randomImage.width));
        newRandomImage.imageY = 0;
        newRandomImage.speed = Math.floor(Math.random() * (this.maxSteps - this.minSteps)) + this.minSteps;
        newRandomImage.type = randomImage.type;
        this.randomObjects.push(newRandomImage);
    }
}
