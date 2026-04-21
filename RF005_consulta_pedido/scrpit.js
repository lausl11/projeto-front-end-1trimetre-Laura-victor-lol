document.addEventListener('DOMContentLoaded', () => {
    const listaContainer = document.getElementById('meus-pedidos-lista');
    
    // Puxa os pedidos do LocalStorage
    const pedidos = JSON.parse(localStorage.getItem('todosPedidosCepers')) || [];

    if (pedidos.length === 0) {
        listaContainer.innerHTML = `
            <div class="text-center">
                <p class="text-muted">Você ainda não realizou nenhum pedido.</p>
                <a href="../RF002_Pg_Inicial/index.html" class="btn btn-info text-white">Ir para a Loja</a>
            </div>
        `;
        return;
    }

    // Renderiza cada pedido (do mais novo para o mais antigo)
    listaContainer.innerHTML = pedidos.reverse().map(pedido => `
        <div class="col-md-8 mb-4">
            <div class="card shadow-sm border-0" style="border-radius: 15px;">
                <div class="card-body p-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="fw-bold" style="color: #1a5f6b;">Pedido #${pedido.id.toString().slice(-4)}</h5>
                        <span class="badge" style="background-color: #41beb1;">${pedido.status || 'Pendente'}</span>
                    </div>
                    
                    <div class="mb-3">
                        <small class="text-muted">Realizado em: ${pedido.data}</small>
                    </div>

                    <div class="pedido-itens mb-3">
                        ${pedido.itens.map(item => `
                            <div class="d-flex justify-content-between border-bottom py-1">
                                <span>${item.quantity}x ${item.title}</span>
                                <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        `).join('')}
                    </div>

                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <div class="fw-bold" style="font-size: 1.1rem;">Total: R$ ${pedido.total.toFixed(2)}</div>
                        
                        <button onclick="abrirCancelamento(${pedido.id})" class="btn btn-sm btn-outline-danger" style="border-radius: 8px;">
                            Cancelar Pedido
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
});

// Função para levar o ID do pedido para a tela de cancelamento
function abrirCancelamento(id) {
    localStorage.setItem('idPedidoParaCancelar', id);
    window.location.href = "../RF004_cancelamento_ped/index.html";
}