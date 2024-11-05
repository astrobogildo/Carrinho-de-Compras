const listaProdutos = [
    { id: 1, nome: "Smartphone", preco: 999.99, emPromocao: true, imagem: "https://via.placeholder.com/150?text=Smartphone" },
    { id: 2, nome: "Notebook", preco: 1299.99, emPromocao: false, imagem: "https://via.placeholder.com/150?text=Notebook" },
    { id: 3, nome: "Fones de Ouvido", preco: 199.99, emPromocao: true, imagem: "https://via.placeholder.com/150?text=Fones" },
    { id: 4, nome: "Relógio Inteligente", preco: 249.99, emPromocao: false, imagem: "https://via.placeholder.com/150?text=Relógio" },
    { id: 5, nome: "Tablet", preco: 499.99, emPromocao: true, imagem: "https://via.placeholder.com/150?text=Tablet" },
    { id: 6, nome: "Câmera Digital", preco: 399.99, emPromocao: false, imagem: "https://via.placeholder.com/150?text=Câmera" },
    { id: 7, nome: "Console de Jogos", preco: 449.99, emPromocao: true, imagem: "https://via.placeholder.com/150?text=Console" },
    { id: 8, nome: "Smart TV", preco: 799.99, emPromocao: false, imagem: "https://via.placeholder.com/150?text=TV" },
    { id: 9, nome: "Impressora", preco: 179.99, emPromocao: true, imagem: "https://via.placeholder.com/150?text=Impressora" },
];

function LojaOnline() {
    const [carrinho, setCarrinho] = React.useState([]);
    const [precoTotal, setPrecoTotal] = React.useState(0);
    const [descontoAplicado, setDescontoAplicado] = React.useState(false);
    const [carrinhoAberto, setCarrinhoAberto] = React.useState(false);

    const adicionarAoCarrinho = (produto) => {
        const produtoExistente = carrinho.find(item => item.id === produto.id);
        
        if (produtoExistente) {
            setCarrinho(carrinho.map(item =>
                item.id === produto.id
                    ? { ...item, quantidade: item.quantidade + 1 }
                    : item
            ));
        } else {
            setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
        }
        setCarrinhoAberto(true); // Abre o carrinho automaticamente ao adicionar um item
    };

    const removerDoCarrinho = (produtoId) => {
        setCarrinho(carrinho.filter(item => item.id !== produtoId));
    };

    const editarQuantidade = (produtoId, novaQuantidade) => {
        if (novaQuantidade < 1) return;
        
        setCarrinho(carrinho.map(item =>
            item.id === produtoId
                ? { ...item, quantidade: novaQuantidade }
                : item
        ));
    };

    React.useEffect(() => {
        const subtotal = carrinho.reduce((soma, item) => {
            const precoItem = item.emPromocao ? item.preco * 0.9 : item.preco;
            return soma + (precoItem * item.quantidade);
        }, 0);

        const total = descontoAplicado ? subtotal * 0.9 : subtotal;
        setPrecoTotal(total);
    }, [carrinho, descontoAplicado]);

    const aplicarDesconto = () => {
        setDescontoAplicado(true);
    };

    const toggleCarrinho = () => {
        setCarrinhoAberto(!carrinhoAberto);
    };

    return (
         <div className={`loja ${carrinhoAberto ? 'carrinho-aberto' : ''}`}>
            <button 
                className={`toggle-carrinho ${carrinhoAberto ? 'aberto' : ''}`} 
                onClick={toggleCarrinho}
            >
                {carrinhoAberto ? '×' : 'Abrir Carrinho'}
            </button>

            <div className={`carrinho-lateral`}>
                <h2>Seu Carrinho</h2>
                {carrinho.length === 0 ? (
                    <p>Seu carrinho está vazio</p>
                ) : (
                    <>
                        {carrinho.map((item) => (
                            <div key={item.id} className="item-carrinho">
                                <span>{item.nome}</span>
                                <span>R$ {item.preco.toFixed(2)}</span>
                                <div className="controles-quantidade">
                                    <button onClick={() => editarQuantidade(item.id, item.quantidade - 1)}>-</button>
                                    <span>{item.quantidade}</span>
                                    <button onClick={() => editarQuantidade(item.id, item.quantidade + 1)}>+</button>
                                </div>
                                <button onClick={() => removerDoCarrinho(item.id)}>Remover</button>
                            </div>
                        ))}
                        <div className="total">
                            <h3>Total: R$ {precoTotal.toFixed(2)}</h3>
                            <button 
                                onClick={aplicarDesconto} 
                                disabled={descontoAplicado}
                                className="botao-desconto"
                            >
                                {descontoAplicado ? 'Desconto Aplicado (10%)' : 'Aplicar Desconto de 10%'}
                            </button>
                        </div>
                    </>
                )}
            </div>

            <div className="produtos">
                {listaProdutos.map((produto) => (
                    <div key={produto.id} className="produto">
                        <img src={produto.imagem} alt={produto.nome} />
                        <h3>{produto.nome}</h3>
                        <p>R$ {produto.preco.toFixed(2)}</p>
                        {produto.emPromocao && <span className="etiqueta-promocao">Promoção! 10% OFF</span>}
                        <button onClick={() => adicionarAoCarrinho(produto)}>
                            Adicionar ao Carrinho
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

ReactDOM.render(<LojaOnline />, document.getElementById('root'));