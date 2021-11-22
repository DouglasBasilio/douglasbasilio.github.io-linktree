//main object

const Main = {
    // responsável por iniciar, fazer o cache dos seletores
    // a palavra this está se referenciando ao Main, ao pai do nosso objeto
    init: function(){
        this.cacheSelectors()
        this.bindEvents()
    },

    // responsável por selecionar os elementos do HTML e armazenar dentro de uma variável
    // o this coloca a variável no Main, para que ela fique disponível para outras funções. se uso o let, a variável existiria somente dentro da função
    // toda variável que for armazenar algum elemento HTML, terá o $ na frente, usar como boa prática
    cacheSelectors: function(){
        this.$checkButtons = document.querySelectorAll('.check')
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeButtons = document.querySelectorAll('.remove')
    },

    // responsável por adicionar eventos de click por exemplo
    bindEvents: function(){
        // aqui o THIS representa o MAIN
        const self = this

        this.$checkButtons.forEach(function(button){
            //console.log(this)
            button.onclick = self.Events.checkButton_click
        })

        //bind(this) - levar o THIS para dentro da função de enveto
        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this)

        this.$removeButtons.forEach(function(button){
            button.onclick = self.Events.removeButton_click
        })
    },

    Events:{
        checkButton_click: function(e){
            const li = e.target.parentElement
            const isDone = li.classList.contains('done')

            if(!isDone){
              return li.classList.add('done')
            } 
            
            li.classList.remove('done')            
        },

        inputTask_keypress: function(e){
            const key = e.key
            const value = e.target.value

            if(key === 'Enter'){
                
                this.$list.innerHTML += `
                    <li>
                        <div class="check"></div>
                        <label for="" class="task">
                            ${value}
                        </label>
                        <button class="remove"></button>
                    </li>
                `

                e.target.value = ''

                // sempre que modificar o HTML, esses itens estão sem o evento, por isso preciso rodar novamente as funções abaixo
                this.cacheSelectors()
                this.bindEvents()
            }
        },

        removeButton_click:function(e){
            let li = e.target.parentElement

            li.classList.add('removed')

            setTimeout(function(){
                li.classList.add('hidden')
            },300)
        }
    }
}

Main.init()