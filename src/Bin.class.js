class Bin{
    #type
    #wrapper = document.querySelector('.game_screen .trash_containers');
    #index
    #item

    constructor(binData,index) {
        this.#type = binData.type;
        this.#index = index;

        this.#createDom(binData.img);
    }

    getType() {
        return this.#type;
    }

    delete(){
        this.#item.remove();
    }

    #createDom(src) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('trash_bin');
        wrapper.setAttribute('data-index',this.#index);

        const image = document.createElement('img');
        image.alt = `${this.#type}_bin`;
        image.src = src;

        wrapper.appendChild(image)
        this.#wrapper?.appendChild(wrapper);

        this.#item = wrapper
    }
}