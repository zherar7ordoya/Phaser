import * as Phaser from 'phaser';

// Una escena en Phaser es como un “nivel” o “pantalla” del juego.
export class Game extends Phaser.Scene {

    // El constructor llama a super() con una clave (key: 'game') que identifica
    // a esta escena dentro del juego.
    constructor() {
        super({ key: 'game' });
    }

    // La función preload() se ejecuta antes de que el juego comience. Aquí
    // cargamos todos los recursos (imágenes, sonidos, etc.) que vamos a usar.
    preload() {

        // Carga imágenes desde archivos. Les asigna una clave ('background',
        // 'gameover', etc.) que se usa luego para referenciarlas.
        this.load.image('background', '/images/background.png');
        this.load.image('gameover', '/images/gameover.png');
        this.load.image('platform', '/images/platform.png');
        this.load.image('ball', '/images/ball.png')
    }

    // La función create() se ejecuta una vez cuando se inicia la escena. Aquí
    // se colocan los objetos del juego en pantalla.
    create() {
        
        // Activa los límites del mundo físico (colisiones). true en los 3
        // primeros ejes (izquierda, derecha y arriba) y false en el de abajo →
        // permite que la pelota caiga fuera de pantalla.
        this.physics.world.setBoundsCollision(true, true, true, false);

        // Añade la imagen de fondo en la posición (400, 250).
        this.add.image(400, 250, 'background');

        // Carga la imagen de "Game Over", pero la oculta. Se mostrará si
        // perdemos.
        this.gameoverImage = this.add.image(400, 90, 'gameover');
        this.gameoverImage.visible = false;

        // Crea la plataforma como objeto físico. setImmovable() indica que no
        // se moverá al chocar con algo.
        this.platform = this.physics.add.image(400, 460, 'platform').setImmovable();

        // La plataforma no es afectada por la gravedad (se mantiene en su
        // lugar).
        this.platform.body.allowGravity = false;

        // Crea la pelota, como objeto físico también, y hace que rebote en los
        // bordes del mundo (excepto abajo, porque desactivamos eso antes).
        this.ball = this.physics.add.image(400, 30, 'ball');
        this.ball.setCollideWorldBounds(true);

        // Calcula una velocidad aleatoria multiplicando 100 por un número
        // decimal entre 1.3 y 2.
        let velocity = 100 * Phaser.Math.Between(1.3, 2);

        // 50% de las veces invierte el signo de la velocidad → para que la
        // pelota arranque yendo a la izquierda o derecha al azar.
        if (Phaser.Math.Between(0, 10) > 5) {
            velocity = 0 - velocity;
        }

        // Aplica esa velocidad horizontal aleatoria y una velocidad vertical de
        // 10.
        this.ball.setVelocity(velocity, 10);

        // Hace que la pelota y la plataforma colisionen (rebote garantizado).
        this.physics.add.collider(this.ball, this.platform);
        
        // Configura el rebote perfecto: cada vez que choca, conserva su energía
        // (no se ralentiza).
        this.ball.setBounce(1);

        // Crea un objeto cursors que captura las teclas de flechas del teclado
        // (← ↑ → ↓).
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    // Esta función corre continuamente (como un bucle) mientras la escena está
    // activa. Aquí se manejan las acciones del jugador.
    update() {
        
        // Si se está presionando la flecha izquierda, mueve la plataforma
        // rápidamente hacia la izquierda.
        if (this.cursors.left.isDown) {
            this.platform.setVelocityX(-500);
        }

        // Si se presiona la flecha derecha, la plataforma va a la derecha.
        else if (this.cursors.right.isDown) {
            this.platform.setVelocityX(500);
        }

        // Si no se presiona ninguna flecha, la plataforma se detiene.
        else {
            this.platform.setVelocityX(0);
        }

        // Si la pelota cae por debajo de la posición y = 500 (fuera de la
        // pantalla), se considera fin del juego:
        // 1. Muestra la imagen de "Game Over"
        // 2. Detiene la escena (no se actualiza más).
        if (this.ball.y > 500) {
            console.log('Game Over');
            this.gameoverImage.visible = true;
            this.scene.pause();
        }
    }
}
