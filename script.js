document.addEventListener("DOMContentLoaded", () => {

    const lista = document.getElementById("listaProdutos");
    const campoBusca = document.getElementById("busca");
    const msgNenhum = document.getElementById("nenhum-resultado");
    let produtos = [];

    async function carregarProdutos() {
        try {
            const resposta = await fetch("produtos.json");
            const dados = await resposta.json();
            produtos = dados.produtos;

            exibirProdutos(produtos);
        } catch (erro) {
            console.error("Erro ao carregar JSON:", erro);
        }
    }

    carregarProdutos();

    function exibirProdutos(listaProdutos) {
        lista.innerHTML = "";

        listaProdutos.forEach(item => {
            const li = document.createElement("li");

            li.innerHTML = `
                <img src="${item.img}" alt="">
                <p class="titulo">${item.titulo}</p>
                <p class="condição">${item.condicao}</p>
                <p class="preço">${item.preco}</p>
                <p class="comprar">Comprar</p>
                <p class="adicionar">Adicionar<br>ao carrinho</p>
            `;

            lista.appendChild(li);
        });
    }

    campoBusca.addEventListener("input", () => {
        const texto = campoBusca.value.toLowerCase();

        const filtrados = produtos.filter(item =>
            item.titulo.toLowerCase().includes(texto)
        );

        exibirProdutos(filtrados);

        msgNenhum.style.display = filtrados.length === 0 ? "block" : "none";
    });

});
