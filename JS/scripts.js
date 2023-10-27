function openModal(){
    const modal = document.getElementById('janela-modal')
    modal.classList.add('abrir')

    modal.addEventListener('click',(e) =>{
        if(e.target.id == 'fechar' || e.target.id == 'janela-modal')
            modal.classList.remove('abrir')
    })
    
}

const tbody = document.getElementById('tbody');
const input1 = document.getElementById('nome');
const input2 = document.getElementById('funcao');
const input3 = document.getElementById('salario');
const buttonS = document.getElementById('btnSalvar');

const funcionarios = [];

function mostrarFunc(){
    const funcionariosLocal = JSON.parse(localStorage.getItem('funcionarios'));
        if (funcionariosLocal) {
            funcionarios.length = 0;
            funcionarios.push(...funcionariosLocal);
        }
    
    tbody.innerHTML = "";

    funcionarios.forEach((funcionario,index)=>{
        const linha = document.createElement("tr");
        linha.innerHTML = `
        <td>${funcionario.nome}</td>
        <td>${funcionario.funcao}</td>
        <td>R$ ${funcionario.salario}</td>
        <td><button onclick="abrirModalEdit(${index})" id = "edit">Editar</button></td>
        <td><button onclick="excluirFunc(${index})" id ="remove">Excluir</button></td>`;
        tbody.appendChild(linha);
    });
}
function editarFuncionario(index, dadosEditados) {
    funcionarios[index] = dadosEditados;
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
    mostrarFunc();
}

function excluirFunc(index) {
    funcionarios.splice(index, 1);
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
    mostrarFunc();
}

function addFunc(){
    const nome = input1.value;
    const funcao = input2.value;
    const salario = parseFloat(input3.value);

    const index = buttonS.getAttribute('data-index');

    if (index !== null) {
        funcionarios[index] = {
            nome,
            funcao,
            salario
        };   
        buttonS.removeAttribute('data-index');
    } else {
        const novoFuncionario = {
            nome,
            funcao,
            salario
        };
        editarFuncionario(index)
        funcionarios.push(novoFuncionario);
    }
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
    mostrarFunc();
}
buttonS.addEventListener('click',addFunc);
window.addEventListener('load',mostrarFunc);

function abrirModalEdit(index){
    const funcionario = funcionarios[index];
    input1.value = funcionario.nome;
    input2.value = funcionario.funcao;
    input3.value = funcionario.salario;
    
    buttonS.setAttribute('data-index', index);
    
    const modal = document.getElementById('janela-modal');
    modal.classList.add('abrir');

    modal.addEventListener('click',(e) =>{
        if(e.target.id == 'fechar' || e.target.id == 'janela-modal')
            modal.classList.remove('abrir')
    })

}
// buttonS.addEventListener('click',addFunc);
mostrarFunc();
