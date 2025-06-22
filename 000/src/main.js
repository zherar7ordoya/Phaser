import Phaser from 'phaser';

// ...existing code...
// Example Hello World scene
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: function () {},
        create: function () {
            this.add.text(200, 300, 'Hello World', { font: '48px Arial', fill: '#ffffff' });
        }
    }
};

const game = new Phaser.Game(config);