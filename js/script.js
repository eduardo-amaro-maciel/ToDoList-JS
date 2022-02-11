/* Atualiza a interface do usuario */

const atualizarTela = () => {

    let lista = document.querySelector('#lista-de-tarefas').innerHTML = ""
    let dadosLocalStorage = JSON.parse(localStorage.getItem('data'))

    if (dadosLocalStorage != null) {

        dadosLocalStorage.map((obj, indice) => {
            //style="text-decoration: line-through #a430d1 3px"

            if (obj.checkbox) {

                lista = lista + `
                        <li class="tarefas-inclusas">
                            <input data-checkbox="${indice}" checked type="checkbox" name="#">
                            <label data-label="${indice}" style="text-decoration: line-through #a430d1 3px" for="#">${obj.tarefa}</label>
                            <img data-editar="${indice}" src="./images/lapis.png" alt="editar tarefa">
                            <img data-deletar="${indice}" src="./images/lixeira.png" alt="excluir tarefa" >
                        </li>
                    `
            } else {
                
                lista = lista + `
                        <li class="tarefas-inclusas">
                            <input data-checkbox="${indice}" type="checkbox" name="#">
                            <label data-label="${indice}" for="#">${obj.tarefa}</label>
                            <img data-editar="${indice}" src="./images/lapis.png" alt="editar tarefa">
                            <img data-deletar="${indice}" src="./images/lixeira.png" alt="excluir tarefa" >
                        </li>
                    `
            }
            
            document.querySelector('#lista-de-tarefas').innerHTML = lista 
        })
    }
}


/* Adicionar valores no banco de dados */

const adicionarTarefaNoBanco = (tarefa, checkbox) => {

    if (localStorage.getItem('data') == undefined) {
        localStorage.setItem('data', '[]')
    }

    let dadosLocalStorage = JSON.parse(localStorage.getItem('data'))
    dadosLocalStorage.push({tarefa: tarefa, checkbox: checkbox})
    localStorage.setItem('data', JSON.stringify(dadosLocalStorage))

    atualizarTela()
}


/* Deletar valores do bacno de dados */

const deletarTarefasDoBanco = (indice) => {

    let dadosLocalStorage = JSON.parse(localStorage.getItem('data'))
    dadosLocalStorage.splice(indice, 1)
    localStorage.setItem('data', JSON.stringify(dadosLocalStorage))

    atualizarTela()
}


/* Editar valores no banco de dados */

const editarValoresNoBanco = (tarefa, indice) => {

    let dadosLocalStorage = JSON.parse(localStorage.getItem('data'))
    dadosLocalStorage[indice].tarefa = tarefa
    localStorage.setItem('data', JSON.stringify(dadosLocalStorage))

    atualizarTela()
}


/* Botao para adcionar linha tracejada no checkbox */

const inputCheckbox = document.querySelector('#lista-de-tarefas')
inputCheckbox.addEventListener('click', function(evento) {

    const indiceCheckbox = evento.target.dataset.checkbox
    
    if (indiceCheckbox >= 0 && indiceCheckbox !== undefined && indiceCheckbox !== null){

        if (evento.target.checked) {

            let dadosLocalStorage = JSON.parse(localStorage.getItem('data'))
            dadosLocalStorage[indiceCheckbox].checkbox = true
            localStorage.setItem('data', JSON.stringify(dadosLocalStorage))

        } else {

            let dadosLocalStorage = JSON.parse(localStorage.getItem('data'))
            dadosLocalStorage[indiceCheckbox].checkbox = false
            localStorage.setItem('data', JSON.stringify(dadosLocalStorage))
        }
    }

    atualizarTela()
}) 


/* Botao para editar tarefas */

const botaoEditar = document.querySelector('#lista-de-tarefas')
botaoEditar.addEventListener('click', function(evento) {

    const indice = evento.target.dataset.editar

    if (indice >= 0 && indice !== undefined) {
        const novaDescricaoDeTarefa = window.prompt('Edite a tarefa:')

        if (novaDescricaoDeTarefa !== null) {
            editarValoresNoBanco(novaDescricaoDeTarefa, indice) 
        }
    }
})


/* Botao para deletar tarefas */

const botaoDeletar = document.querySelector('#lista-de-tarefas')
botaoDeletar.addEventListener('click', function(evento) {

    const indice = evento.target.dataset.deletar
    
    if (indice >= 0 && indice !== undefined) {
        deletarTarefasDoBanco(indice)
    }
})


/* Botao para adiconar tarefas */

const botaoAdicionarTarefa = document.querySelector('#button-adiconar-tarefas')
botaoAdicionarTarefa.addEventListener('click', function(evento) {

    evento.preventDefault()

    const inputDeDescricao = document.querySelector('#input-text-adicionar-tarefas').value
    
    if (inputDeDescricao === '') { 
        alert('Não foi detectada nenhuma descrição') 
    } else { 
        document.querySelector('#input-text-adicionar-tarefas').value = ""
        adicionarTarefaNoBanco(inputDeDescricao, false) 
    }
})


/* Aplicando os valores apos o carregamento da tela */

window.onload = atualizarTela()