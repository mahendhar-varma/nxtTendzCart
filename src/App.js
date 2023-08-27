import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(item => {
      if (item.id === id) {
        return {
          id: item.id,
          availability: item.availability,
          brand: item.id,
          description: item.description,
          imageUrl: item.imageUrl,
          price: item.price,
          rating: item.rating,
          title: item.title,
          totalReviews: item.totalReviews,
          quantity: item.quantity + 1,
        }
      }
      return item
    })
    this.setState({cartList: updatedCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const requiredProduct = cartList.filter(item => item.id === id)[0]
    if (requiredProduct.quantity > 1) {
      const updatedCartList = cartList.map(item => {
        if (item.id === id && item.quantity > 1) {
          return {
            id: item.id,
            availability: item.availability,
            brand: item.id,
            description: item.description,
            imageUrl: item.imageUrl,
            price: item.price,
            rating: item.rating,
            title: item.title,
            totalReviews: item.totalReviews,
            quantity: item.quantity - 1,
          }
        }
        return item
      })
      this.setState({cartList: updatedCartList})
    } else {
      this.removeCartItem(requiredProduct.id)
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    const check = cartList.find(item => item.id === product.id)

    if (check !== undefined) {
      const updatedCartList = cartList.map(item => {
        if (item.id === product.id) {
          return {
            id: item.id,
            availability: item.availability,
            brand: item.id,
            description: item.description,
            imageUrl: item.imageUrl,
            price: item.price,
            rating: item.rating,
            title: item.title,
            totalReviews: item.totalReviews,
            quantity: item.quantity + 1,
          }
        }
        return item
      })
      this.setState({cartList: updatedCartList})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(item => item.id !== id)
    this.setState({cartList: filteredCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
