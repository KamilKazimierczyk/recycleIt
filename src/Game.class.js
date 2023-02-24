class Game {
    #bins = []
    #garbages = []
    #playerName
    #points = 0
    #pointsContainer = document.querySelector('span.points')
    #time = 0
    #timeContainer = document.querySelector('span.time')
    #intervalId
    #settings = {
        defaultTime: 60,
        timePenalty: -10,
        timeReward: 5,
        pointsReward: 10
    }

    constructor(playerName) {
        this.#playerName = playerName;
        
        this.#init();
    }

    #changeTime(amount) {
        this.#time += amount;
        if(this.#time <= 0) {
            this.#lose();
            this.#time = 0;
        };
        this.#timeContainer.innerText = this.#time;

    }

    #changePoints(amount) {
        this.#points += amount;
        this.#pointsContainer.innerText = this.#points
    }

    async #fetchGarbages(){
        const response = await fetch('http://localhost:3004/garbage')
            .then(data => data.json())
            .catch(err => console.error(err));

        response.forEach((element,index) => {
            this.#garbages.push(new Garbage(element,index));
        });
    }

    async #fetchBins(){
        const response = await fetch('http://localhost:3004/bin')
            .then(data => data.json())
            .catch(err => console.error(err));

        response.forEach((element,index) => {
            this.#bins.push(new Bin(element,index));
        });
    }

    #setEvents(){
        const bins = document.querySelectorAll('.trash_bin');

        bins.forEach(bin => {
            bin.addEventListener('click',e => {
                if(!document.querySelector('.garbage_item.active')){
                    new Notification('First you need to pick up any trash','error')
                    return false;
                }
                const id = e.target.dataset.index;
                const garbageId = document.querySelector('.garbage_item.active').dataset.index;
                this.#checkChoice(id,garbageId);
            })
        })
    }

    #checkChoice(binIndex,garbageIndex){
        if(this.#bins[binIndex].getType() === this.#garbages[garbageIndex].getType()){
            this.#changePoints(this.#settings.pointsReward);
            this.#changeTime(this.#settings.timeReward);
            this.#garbages[garbageIndex].freeze();
        } else {
            this.#changeTime(this.#settings.timePenalty);
            new Notification('That trash should not be put in this bin','error');
        }
    }

    #lose(){
        clearInterval(this.#intervalId)

        this.#garbages.forEach(garbage => garbage.delete())

        this.#bins.forEach(bin => bin.delete())

        document.querySelector('.game_window')?.classList.remove('play');

        new ScoreBoard(this.#playerName,this.#points)
    }

    async #init(){
        await this.#fetchBins();
        await this.#fetchGarbages();
        
        this.#changeTime(this.#settings.defaultTime);
        this.#changePoints(0)

        this.#setEvents();
        this.#intervalId = setInterval(()=>this.#changeTime(-1),1000);
    }
}