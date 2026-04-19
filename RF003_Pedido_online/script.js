document.addEventListener('DOMContentLoaded', () => {
    const lista = document.getElementById('items-list');
    const subtotalTxt = document.getElementById('subtotal-val');
    const totalTxt = document.getElementById('total-final');
    const form = document.getElementById('final-form');

    // Recupera o que foi salvo na página anterior
    const dados = localStorage.getItem('carrinhoCepers');

    if (!dados) {
        alert("Carrinho não encontrado!");
        window.location.href = "../RF002_Pg_Inicial/index.html";
        return;
    }

    const carrinho = JSON.parse(dados);
    let soma = 0;

    // Limpa e preenche a lista
    lista.innerHTML = "";
    carrinho.forEach(item => {
        const valor = item.price * item.quantity;
        soma += valor;
        
        const itemDiv = document.createElement('div');
        itemDiv.style.display = "flex";
        itemDiv.style.justifyContent = "space-between";
        itemDiv.innerHTML = `<span>${item.quantity}x ${item.title}</span> <span>R$ ${valor.toFixed(2)}</span>`;
        lista.appendChild(itemDiv);
    });

    // Atualiza valores na tela
    const taxa = 5.00;
    subtotalTxt.innerText = `R$ ${soma.toFixed(2)}`;
    totalTxt.innerText = `R$ ${(soma + taxa).toFixed(2)}`;

    // Envio do formulário
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            
            const pedido = {
                cliente: document.getElementById('nome').value,
                endereco: document.getElementById('endereco').value,
                pagamento: document.getElementById('pagamento').value,
                total: totalTxt.innerText
            };

            alert(`Sucesso! Pedido de ${pedido.total} enviado para ${pedido.cliente}`);
            
            localStorage.removeItem('carrinhoCepers'); // Limpa o carrinho após finalizar
            window.location.href = "../RF002_Pg_Inicial/index.html";
        };
    }
});