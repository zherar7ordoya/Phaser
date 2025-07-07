export class ScoreBoard {
    constructor(scene) {
        this.relatedScene = scene; // Guarda la escena relacionada
        this.score = 0;
    }

    create() {
        // Crea el texto de puntuación en la escena
        this.scoreText = this.relatedScene.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Verdana, Arial, sans-serif'
        });
    }

    incrementPoints(points) {
        this.score += points;
        this.scoreText.setText('Score: ' + this.score);
    }
}