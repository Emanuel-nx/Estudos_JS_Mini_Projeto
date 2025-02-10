class Produto{

    constructor(){
       this.id = 1; 
       this.arrayProdutos = [];
    }

    Adicionar(){
        let produto = this.lerDados()
        if(this.Validar(produto) == true) {
            this.Salvar(produto)
        }
        //console.log(this.arrayProdutos)
        this.Listar()
        this.Cancelar()
    }

    lerDados(){
        let produto = {}

        produto.id = this.id;
        produto.nomeProduto = document.getElementById('pdnome').value
        produto.precoProduto = document.getElementById('pdpreco').value

        return produto
    }

    Validar(produto) {
        let msg = '';
    
        if (produto.nomeProduto.trim() === '') {
            msg += 'Por favor, insira corretamente o nome do produto! \n';
        }
    
        // Validação para preço: apenas números e ponto ou vírgula para decimais
        let precoValido = /^[0-9]+([.,][0-9]{1,2})?$/;
    
        if (produto.precoProduto.trim() === '' || !precoValido.test(produto.precoProduto)) {
            msg += 'Por favor, insira um preço válido! (Apenas números, use "." ou "," para centavos) \n';
        }
    
        if (msg !== '') {
            alert(msg);
            return false;
        }
    
        // Se for válido, formata o preço corretamente como moeda
        produto.precoProduto = parseFloat(produto.precoProduto.replace(',', '.')).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    
        return true;
    }
    

    Salvar(produto){
        this.arrayProdutos.push(produto)
        this.id++;
    }

    Listar(){
        let tbody = document.getElementById('tbody')
        tbody.innerText = ''

        for(let i = 0; i < this.arrayProdutos.length; i++){

            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_nome = tr.insertCell();
            let td_preco = tr.insertCell();
            let td_del = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_nome.innerText = this.arrayProdutos[i].nomeProduto;
            td_preco.innerText = this.arrayProdutos[i].precoProduto;
            let imagem = document.createElement('img')
            imagem.src = 'del.png'
            imagem.setAttribute("onclick", "produto.Deletar("+this.arrayProdutos[i].id+")")
            td_del.appendChild(imagem)

        }
    }

    Cancelar(){
        document.getElementById('pdnome').value = ''
        document.getElementById('pdpreco').value = ''
    }

    Deletar(id){
        //alert(`vamos deletar o produto ${id} ?`)
        let tbody = document.getElementById('tbody')
        for ( let i = 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos.splice(i, 1)
                tbody.deleteRow(i)
            }
        }
        alert('O item foi deletado com sucesso!')
    }
        
}

function formatarPreco(campo) {
    // Remove tudo que não for número, ponto ou vírgula
    campo.value = campo.value.replace(/[^0-9.,]/g, '');

    // Substitui múltiplos pontos/vírgulas por um único separador decimal
    let partes = campo.value.split(/[,\.]/);
    if (partes.length > 2) {
        campo.value = partes[0] + '.' + partes.slice(1).join('');
    }

    // Atualiza o valor no objeto produto (se necessário)
    produto.precoProduto = campo.value;
}


var produto = new Produto();