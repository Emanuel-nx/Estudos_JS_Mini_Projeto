const SUPABASE_URL = 'SUA_URL_DO_SUPABASE';
const SUPABASE_KEY = 'SUA_API_KEY';
import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function salvarProduto() {
    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const quantidade = parseInt(document.getElementById('quantidade').value);

    const { data, error } = await supabase
        .from('produtos')
        .insert([{ nome, preco, quantidade }]);

    if (error) {
        console.error('Erro ao salvar produto:', error);
    } else {
        console.log('Produto salvo:', data);
        listarProdutos();
    }
}

async function listarProdutos() {
    const { data, error } = await supabase
        .from('produtos')
        .select('*');

    if (error) {
        console.error('Erro ao buscar produtos:', error);
    } else {
        const lista = document.getElementById('listaProdutos');
        lista.innerHTML = '';
        data.forEach(produto => {
            const item = document.createElement('li');
            item.textContent = `${produto.nome} - R$${produto.preco.toFixed(2)} - ${produto.quantidade} unidades`;
            lista.appendChild(item);
        });
    }
}
document.addEventListener('DOMContentLoaded', listarProdutos);
