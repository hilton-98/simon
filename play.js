const btnDescriptions = [
    { file: 'sound1.mp3', hue: 120 },
    { file: 'sound2.mp3', hue: 0 },
    { file: 'sound3.mp3', hue: 60 },
    { file: 'sound4.mp3', hue: 240 },
  ];


class Button {

    constructor(descr, element) {
        this.element = element;
        this.hue = descr.hue;
        this.sound = loadSound(descr.file);
        this.paint(25);
    }

    paint(level) {
        const background = `hsl(${this.hue}, 100%, ${level}%)`;
        this.element.style.backgroundColor = background;
    }

    async press(volume) {
        this.paint(50);
        await this.play(volume);
        this.paint(25);
    }

    async play(volume = 1.0) {
        this.sound.volume = volume;
        await new Promise((resolve) => {
            this.sound.onended = resolve;
            this.sound.play();
        });
    }
}


class Game {

    constructor() {

        const playerName = document.querySelector('.player-name');
        playerName.textContent = this.getPlayerName();
    }

    getPlayerName() {
        return localStorage.getItem('userName') ?? 'Mystery player';
    }
}



const game = new Game();
