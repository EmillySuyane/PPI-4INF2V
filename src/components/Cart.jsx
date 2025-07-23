import styles from "./Cart.module.css";

export function Cart({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const parcelado = total;
  const descontoPix = 0.1; // 10% de desconto no PIX
  const totalPix = total * (1 - descontoPix);

  return (
    <div className={styles.cartPage}>
      <h2>Carrinho de Compras</h2>

      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div className={styles.cartContent}>
          {/* Seção de produtos */}
          <div className={styles.products}>
            {cart.map((product, index) => (
              <div key={index} className={styles.productItem}>
                <img src={product.thumbnail} alt={product.title} />
                <div>
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <p><strong>PIX:</strong> R$ { (product.price * (1 - descontoPix)).toFixed(2) }</p>
                  <p><strong>Parcelado:</strong> R$ { product.price.toFixed(2) }</p>
                </div>
              </div>
            ))}

            {/* Garantia simulada */}
            <div className={styles.garantia}>
              <h4>SERVIÇOS</h4>
              <p><strong>Garantia Estendida Original Ampliada</strong></p>
              <div>
                <input type="radio" name="garantia" defaultChecked /> Sem garantia <br />
                <input type="radio" name="garantia" /> 12 Meses – R$ 38,31 <br />
                <input type="radio" name="garantia" /> 24 Meses – R$ 51,83
              </div>
            </div>
          </div>

          {/* Seção de resumo */}
          <div className={styles.summary}>
            <h3>RESUMO</h3>
            <p>Valor dos Produtos: <strong>R$ {parcelado.toFixed(2)}</strong></p>
            <p>Total a prazo: <strong>R$ {parcelado.toFixed(2)}</strong><br />(10x R$ {(parcelado / 10).toFixed(2)} sem juros)</p>
            <p className={styles.pix}>
              Valor à vista no <strong>PIX:</strong><br />
              <span>R$ {totalPix.toFixed(2)}</span><br />
              <small>(Economize R$ {(parcelado - totalPix).toFixed(2)})</small>
            </p>
            <button className={styles.btnPrimary}>CONTINUAR</button>
            <button className={styles.btnSecondary}>VOLTAR</button>
          </div>
        </div>
      )}
    </div>
  );
}
