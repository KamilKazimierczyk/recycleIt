class Notification {
    #text
    #type
    #wrapper = document.querySelector('#notifications_wrapper');

    constructor(text,type){
        this.#text = text;
        this.#type = type;

        this.#init();
    }

    #init(){
        const wrapper = document.createElement('div');
        wrapper.classList.add('notification',this.#type);
        wrapper.innerText = this.#text;

        this.#wrapper.appendChild(wrapper);

        setTimeout(()=> {
            wrapper.remove();
        },2000)
    }
}