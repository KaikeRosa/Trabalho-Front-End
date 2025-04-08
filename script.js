document.addEventListener("DOMContentLoaded", () => {
  const produtos = [
    {
      nome: "Camiseta Preta",
      categoria: "camiseta",
      cor: "preto",
      imagem: "imagens/camiseta-oversized_0002_rectangle-1-copy-2-668dca06037f1.jpg",
      descricao: "Camiseta preta em algodão premium, com corte oversized moderno.",
      preco: "R$ 89,90"
    },
    {
      nome: "Camiseta Branca",
      categoria: "camiseta",
      cor: "branco",
      imagem: "imagens/camiseta-oversized_0006_rectangle-1-copy-6-668dca0472114.jpg",
      descricao: "Camiseta branca minimalista, ideal para o dia a dia.",
      preco: "R$ 79,90"
    },
    {
      nome: "Camiseta Preta Estonada",
      categoria: "camiseta",
      cor: "preto",
      imagem: "imagens/camiseta-oversized-estonada-chumbo-669fc39ab7f1e.jpg",
      descricao: "Camiseta preta com lavagem estonada e visual vintage.",
      preco: "R$ 94,90"
    },
    {
      nome: "Regata Preta",
      categoria: "camiseta",
      cor: "preto",
      imagem: "imagens/f7039bc0ce6d78189eab6c236ad6a0f3-655b7fbe0721b.jpg",
      descricao: "Regata preta em algodão leve, ideal para dias quentes.",
      preco: "R$ 59,90"
    },
    {
      nome: "Regata Branca",
      categoria: "camiseta",
      cor: "branco",
      imagem: "imagens/b2eb68773a8d3cc677a97f3054f00f40-655b7fb564fa8.jpg",
      descricao: "Regata branca confortável com modelagem solta.",
      preco: "R$ 59,90"
    },
    {
      nome: "Camisa Bege",
      categoria: "camiseta",
      cor: "bege",
      imagem: "imagens/work-caqui-67daca3a61003.jpg",
      descricao: "Camisa bege casual, perfeita para looks urbanos.",
      preco: "R$ 79,90"
    },
    {
      nome: "Calça Preta",
      categoria: "calça",
      cor: "preto",
      imagem: "imagens/0c77f199b5262e8c22ef556377691863-660aef8c5b70d.jpg",
      descricao: "Calça preta com caimento reto e tecido encorpado.",
      preco: "R$ 119,90"
    },
    {
      nome: "Calça Clara",
      categoria: "calça",
      cor: "branco",
      imagem: "imagens/b6bf4353e7f68e1993ae562036c259e6-6609fb14ae188.jpg",
      descricao: "Calça clara, confortável e versátil.",
      preco: "R$ 119,90"
    },
    {
      nome: "Calça Xadrez",
      categoria: "calça",
      cor: "preto",
      imagem: "imagens/cala-a-xadrez-preto-e-branco-666875454abab.jpg",
      descricao: "Calça xadrez preto e branco, estilo street moderno.",
      preco: "R$ 139,90"
    },
    {
      nome: "Calça Preta",
      categoria: "calça",
      cor: "preto",
      imagem: "imagens/2029ea480c33d771f94f204b8feddd59-640a1bfde769b.png",
      descricao: "Calça cargo preta com bolsos funcionais.",
      preco: "R$ 129,90"
    },
    {
      nome: "Calça Bege",
      categoria: "calça",
      cor: "bege",
      imagem: "imagens/3.jpg",
      descricao: "Calça bege de alfaiataria com toque minimalista.",
      preco: "R$ 119,90"
    },
    {
      nome: "Calça Cinza",
      categoria: "calça",
      cor: "cinza",
      imagem: "imagens/ai.jpg",
      descricao: "Calça cinza em moletom leve para uso casual.",
      preco: "R$ 99,90"
    },
    {
      nome: "Blusa Moletom Preta",
      categoria: "blusa",
      cor: "preto",
      imagem: "imagens/setembro-2024_0005_blusa-moletom-gola-careca-66e86b9170090.jpg",
      descricao: "Moletom preto gola careca com tecido felpado.",
      preco: "R$ 139,90"
    },
    {
      nome: "Blusa Moletom Canguru Branca",
      categoria: "blusa",
      cor: "branco",
      imagem: "imagens/blusa-moletom-bege-2-667efda7653e1.jpg",
      descricao: "Moletom branco com bolso canguru e capuz.",
      preco: "R$ 149,90"
    },
    {
      nome: "Blusa Moletom Canguru Rosa",
      categoria: "blusa",
      cor: "rosa",
      imagem: "imagens/rosa-barbie-6667254f33817.png",
      descricao: "Moletom rosa vibrante estilo Barbie com capuz.",
      preco: "R$ 149,90"
    }
  ];

  const grid = document.querySelector("#produtos");
  const categoryFilter = document.querySelector("#categoryFilter");
  const colorFilter = document.querySelector("#colorFilter");
  const searchInput = document.querySelector("#searchInput");
  const btnFavoritos = document.querySelector(".ver-favoritos");

  let mostrandoFavoritos = false;
  const favoritos = new Set(JSON.parse(localStorage.getItem("favoritos") || "[]"));

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <img id="modal-img" src="" alt="">
      <h3 id="modal-nome"></h3>
      <p id="modal-descricao"></p>
      <strong id="modal-preco"></strong>
    </div>
  `;
  document.body.appendChild(modal);

  const modalImg = document.getElementById("modal-img");
  const modalNome = document.getElementById("modal-nome");
  const modalDescricao = document.getElementById("modal-descricao");
  const modalPreco = document.getElementById("modal-preco");

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      modal.classList.remove("show");
    }
  });

  function renderProdutos() {
    grid.innerHTML = "";
    const categoria = categoryFilter.value || "";
    const cor = colorFilter.value || "";
    const busca = searchInput.value.toLowerCase() || "";

    const filtrados = produtos.filter(p => {
      const favorito = favoritos.has(p.nome);
      return (
        (!mostrandoFavoritos || favorito) &&
        (categoria === "" || p.categoria === categoria) &&
        (cor === "" || p.cor === cor) &&
        p.nome.toLowerCase().includes(busca)
      );
    });

    filtrados.forEach((produto, index) => {
      const produtoEl = document.createElement("article");
      produtoEl.classList.add("product");

      const isFavorito = favoritos.has(produto.nome);

      produtoEl.innerHTML = `
        <button class="favorite${isFavorito ? " active" : ""}" title="Favoritar">♡</button>
        <div class="img-zoom">
          <img src="${produto.imagem}" alt="${produto.nome}" class="produto-img" style="max-width: 100%; height: auto;">
        </div>
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <strong>${produto.preco}</strong>
      `;

      const favBtn = produtoEl.querySelector(".favorite");
      favBtn.addEventListener("click", () => {
        favBtn.classList.toggle("active");

        favBtn.classList.add("clicked");
        setTimeout(() => favBtn.classList.remove("clicked"), 300);

        if (favoritos.has(produto.nome)) {
          favoritos.delete(produto.nome);
        } else {
          favoritos.add(produto.nome);
        }
        localStorage.setItem("favoritos", JSON.stringify(Array.from(favoritos)));
      });

      produtoEl.querySelector(".produto-img").addEventListener("click", () => {
        modalImg.src = produto.imagem;
        modalNome.textContent = produto.nome;
        modalDescricao.textContent = produto.descricao;
        modalPreco.textContent = produto.preco;
        modal.classList.add("show");
      });

      grid.appendChild(produtoEl);

      setTimeout(() => {
        produtoEl.classList.add("show");
      }, index * 50);
    });

    if (filtrados.length === 0) {
      const aviso = document.createElement("p");
      aviso.textContent = "❌ Nenhum produto encontrado com os filtros aplicados.";
      aviso.classList.add("mensagem-vazia");
      grid.appendChild(aviso);
    }
  }

  categoryFilter.addEventListener("change", renderProdutos);
  colorFilter.addEventListener("change", renderProdutos);
  searchInput.addEventListener("input", renderProdutos);

  btnFavoritos.addEventListener("click", () => {
    mostrandoFavoritos = !mostrandoFavoritos;
    btnFavoritos.classList.toggle("ativo", mostrandoFavoritos);
    btnFavoritos.textContent = mostrandoFavoritos ? "Ver Todos" : "❤ Favoritos";
    renderProdutos();
  });

  renderProdutos();
});

