class Garbage {
    #data
    #wrapper = document.querySelector('.game_screen .garbage_container')
    #index
    #item

    constructor(garbageData,index) {
        this.#data = garbageData;
        this.#index = index;

        this.#init();
    }

    getType() {
        return this.#data.type;
    }

    freeze(){
        this.#item.classList.add('hide');
        this.#item.classList.remove('active');

        const position = this.#drawPosition();
        this.#item.setAttribute('style',`left:${position.left}%;top:${position.top}%;`);

        setTimeout(()=>{
            this.#item.classList.remove('hide');
        },2500)
    } 

    #drawPosition() {
        let top = Math.floor(Math.random() * 100);
        let left = Math.floor(Math.random() * 100);

        left = left < 91 ? left : 90;
        top = top < 91 ? top : 90;

        return {top,left}
    }

    #init() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('garbage_item');
        wrapper.setAttribute('data-index',this.#index);

        const position = this.#drawPosition();
        wrapper.setAttribute('style',`left:${position.left}%;top:${position.top}%;`)

        if(this.#data?.img) {
            const image = document.createElement('img');
            img.alt = this.#data.name;
            img.src = this.#data.img;

            wrapper.appendChild(image);
        }

        const name = document.createElement('span');
        name.innerText = this.#data.name;

        wrapper.appendChild(name);

        this.#wrapper.appendChild(wrapper);

        wrapper.addEventListener('click',e => {
            document.querySelector('div.garbage_item.active')?.classList.remove('active');
            e.target.classList.add('active');
        })

        this.#item = wrapper;
    }
}