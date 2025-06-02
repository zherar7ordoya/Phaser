class HelloWorldScene extends Phaser.Scene {
    constructor() {
        super({ key: 'HelloWorldScene' });
    }

    preload() {
        // Load any assets here if needed
    }

    create() {
        this.add.text(100, 100, 'Hello World', { font: '32px Arial', fill: '#ffffff' });
    }

    update() {
        // Update logic goes here
    }
}

export default HelloWorldScene;