import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const itemsCount = cartList.length
      let totalPrice = 0
      cartList.map(item => {
        const {price, quantity} = item
        totalPrice += price * quantity
        return null
      })

      return (
        <div className="cart-summary-container">
          <div className="summary-text-container">
            <h1 className="head">
              Order Total: <span>Rs {totalPrice}/-</span>
            </h1>
            <p className="text">{itemsCount} items in cart</p>
            <button className="button" type="button">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
