class ScoreBoard{
    #scores
    #scoreToAdd
    #nameToAdd
    #item

    constructor(name,score){
        this.#nameToAdd = name;
        this.#scoreToAdd = score;

        this.#init();
    }

    async #saveScore(){
        const response = await fetch('http://localhost:3004/points',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'name':this.#nameToAdd,'points':this.#scoreToAdd})
        })
            .then(data => data.json())
            .catch(err => console.error(err));

    }

    async #getScores(){
        const response = await fetch('http://localhost:3004/points?_sort=points&_order=desc')
            .then(data => data.json())
            .catch(err => console.error(err));

        this.#scores = response;
    }

    #prepareTable(){
        const wrapper = document.createElement('div');
        wrapper.classList.add('scoreboard_wrapper');

        const score = document.createElement('h2');
        score.innerText = `You manage to collect ${this.#scoreToAdd} pts`;
        wrapper.appendChild(score);

        const scoreboard = document.createElement('div');
        scoreboard.classList.add('scoreboard');

        const header = document.createElement('strong');
        header.innerText = 'Top 10 scores';

        scoreboard.appendChild(header);

        this.#scores.forEach(score => {
            const scoreItem = document.createElement('span');
            scoreItem.innerText = `${score.name} - ${score.points} pts`;

            scoreboard.appendChild(scoreItem);
        });

        wrapper.appendChild(scoreboard)

        document.querySelector('.game_window')?.appendChild(wrapper)

        this.#item = wrapper;
    }

    async #init(){
        await this.#saveScore();
        await this.#getScores();

        this.#prepareTable();
    }
}