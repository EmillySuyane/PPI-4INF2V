import styles from "./Cart.module.css";
import { useContext, useMemo } from "react";
import { CartContext } from "../service/CartContext";
import { Trash } from "lucide-react";

export function Cart() {
  const { cart, updateQtyCart, removeFromCart } = useContext(CartContext);

  const subtotal = useMemo(() => {
    return cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
  }, [cart]);

  const discount = 222.22; 
  const totalPrice = subtotal;
  const totalWithDiscount = subtotal - discount;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.cartContent}>
        <div className={styles.productListContainer}>
          <div className={styles.sectionHeader}>
            <h2>PRODUTO E SERVIÇO</h2>
            <button className={styles.removeAllButton}>REMOVER TODOS OS PRODUTOS</button>
          </div>
          <div className={styles.cartItems}>
            {cart.length === 0 ? (
              <p>Seu carrinho está vazio.</p>
            ) : (
              cart.map((product) => (
                <div key={product.id} className={styles.cartItem}>
                  <img src={product.thumbnail} alt={product.title} className={styles.productImage} />
                  <div className={styles.productDetails}>
                    <p className={styles.productSeller}>Vendido e entregue por: TRJ Megastore!</p>
                    <h3 className={styles.productTitle}>{product.title}</h3>
                    <p className={styles.productInfo}>Com desconto no PIX: R$ {product.price.toFixed(2)}</p>
                    <p className={styles.productInstallments}>Parcelado no cartão sem juros: R$ {(product.price / 10).toFixed(2)}</p>
                    
                  </div>
                  <div className={styles.productActions}>
                    <div className={styles.quantityControls}>
                      <span className={styles.quantityLabel}>Quant.</span>
                      <div className={styles.quantityButtons}>
                        <button disabled={product.quantity <= 1} onClick={() => updateQtyCart(product.id, product.quantity - 1)}>-</button>
                        <span>{product.quantity}</span>
                        <button onClick={() => updateQtyCart(product.id, product.quantity + 1)}>+</button>
                      </div>
                    </div>
                    <p className={styles.priceHighlight}>R$ {product.price.toFixed(2)}</p>
                    <button className={styles.removeButton} onClick={() => removeFromCart(product.id)}>
                      <Trash size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          
        </div>

        <div className={styles.summaryContainer}>
          <div className={styles.summaryBox}>
            <h2 className={styles.summaryTitle}>RESUMO</h2>
            <div className={styles.summaryRow}>
              <p>Valor dos Produtos:</p>
              <p>R$ {subtotal.toFixed(2)}</p>
            </div>
            <div className={styles.summaryRow}>
              <p>Total a prazo:</p>
              <p>R$ {totalPrice.toFixed(2)}</p>
            </div>
            <p className={styles.installmentInfo}>(em até 10x de R$ {(totalPrice / 10).toFixed(2)} sem juros)</p>
            <div className={styles.summaryDiscountBox}>
              <p>Valor à vista no PIX:</p>
              <p>R$ {totalWithDiscount.toFixed(2)}</p>
            </div>
            <p className={styles.discountInfo}>(Economize: R$ {discount.toFixed(2)})</p>
            <button className={styles.continueButton}>CONTINUAR</button>
            <button className={styles.backButton}>VOLTAR</button>
          </div>
        </div>
      </div>
    </div>
  );
}