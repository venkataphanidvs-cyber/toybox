import { useState } from 'react'
import './App.css'

function ProductDetailsControls({ product, onAdd }) {
  const [qty, setQty] = useState(1)
  return (
    <div className="pd-controls">
      <div className="qty-select">
        <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
        <span>{qty}</span>
        <button onClick={() => setQty((q) => q + 1)}>+</button>
      </div>

      <button
        className="add-cart big"
        onClick={() => onAdd(qty)}
      >
        Add to Cart
      </button>
    </div>
  )
}

const products = [
  {
    id: 1,
    name: 'Turbo Racing Car',
    category: 'Cars',
    description: 'Remote controlled',
    originalPrice: 1199,
    discount: 25,
    rating: 4.7,
    age: '6+',
    emoji: '🏎️',
    color: 'blue'
  },
  {
    id: 2,
    name: 'Dinosaur Explorer',
    category: 'Figures',
    description: 'Adventure set',
    originalPrice: 1899,
    discount: 21,
    rating: 4.8,
    age: '5+',
    emoji: '🦖',
    color: 'green'
  },
  {
    id: 3,
    name: 'Build Your Robot',
    category: 'STEM',
    description: 'STEM kit',
    originalPrice: 2999,
    discount: 23,
    rating: 4.9,
    age: '8+',
    emoji: '🤖',
    color: 'purple'
  },
  {
    id: 4,
    name: 'World Explorer Puzzle',
    category: 'Puzzles',
    description: '500 pieces',
    originalPrice: 899,
    discount: 22,
    rating: 4.6,
    age: '8+',
    emoji: '🧩',
    color: 'pink'
  }
]

const categoriesList = [
  'All',
  'Cars',
  'Puzzles',
  'STEM',
  'Figures',
  'Creative',
  'Building'
]

function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [cart, setCart] = useState([]) // {id, quantity}
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [wishlist, setWishlist] = useState(new Set())

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      category === 'All' || product.category === category

    return matchesSearch && matchesCategory
  })

  const totalCount = cart.reduce((s, it) => s + it.quantity, 0)

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id)
      if (found) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      }
      return [...prev, { id: product.id, quantity: 1 }]
    })
  }

  const changeQuantity = (productId, delta) => {
    setCart((prev) => {
      return prev
        .map((p) => (p.id === productId ? { ...p, quantity: p.quantity + delta } : p))
        .filter((p) => p.quantity > 0)
    })
  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((p) => p.id !== productId))
  }

  const clearCart = () => setCart([])

  const [selectedProduct, setSelectedProduct] = useState(null)

  const addToCartMultiple = (product, qty) => {
    if (!qty || qty <= 0) return
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id)
      if (found) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + qty } : p
        )
      }
      return [...prev, { id: product.id, quantity: qty }]
    })
  }

  return (
    <div className="app">

      {/* Navigation */}
      <header className="navbar">
        <div className="logo">🧸 ToyBox</div>

        <nav>
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">Categories</a>
          <a href="#">Deals</a>
        </nav>

        <div className="cart" onClick={() => setDrawerOpen(true)} style={{cursor: 'pointer'}}>
          🛒 Cart{totalCount > 0 ? ` (${totalCount})` : ''}
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">PLAY • IMAGINE • EXPLORE</p>

          <h1>
            Find something
            <br />
            <span>amazing to play.</span>
          </h1>

          <p className="hero-description">
            Discover toys that spark imagination, creativity
            and endless adventures.
          </p>

          <button>Explore Toys →</button>
        </div>

        <div className="hero-toy">
          🧸
        </div>
      </section>

      {/* Cart Drawer + Overlay */}
      <div
        className={"cart-overlay" + (drawerOpen ? ' open' : '')}
        onClick={() => setDrawerOpen(false)}
      />

      <aside className={"cart-drawer" + (drawerOpen ? ' open' : '')}>
        <div className="cart-drawer-header">
          <h3>Your Cart</h3>
          <button className="close-drawer" onClick={() => setDrawerOpen(false)}>✕</button>
        </div>

        <div className="cart-items">
          {cart.length === 0 && <p className="empty">Your cart is empty.</p>}

          {cart.map((item) => {
            const prod = products.find((p) => p.id === item.id)
            const current = Math.round(prod.originalPrice * (1 - prod.discount / 100))

            return (
              <div className="cart-item" key={item.id}>
                <div className="ci-left">
                  <div className={`product-image small ${prod.color}`}>
                    <div className="toy-emoji">{prod.emoji}</div>
                  </div>
                </div>

                <div className="ci-body">
                  <div className="ci-name">{prod.name}</div>
                  <div className="ci-price">₹{current.toLocaleString('en-IN')}</div>

                  <div className="ci-qty">
                    <button onClick={() => changeQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => changeQuantity(item.id, +1)}>+</button>
                    <button className="ci-remove" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="cart-drawer-footer">
          <div className="subtotal">
            <span>Subtotal</span>
            <strong>
              ₹{cart.reduce((sum, it) => {
                const p = products.find((pp) => pp.id === it.id)
                const price = Math.round(p.originalPrice * (1 - p.discount / 100))
                return sum + price * it.quantity
              }, 0).toLocaleString('en-IN')}
            </strong>
          </div>

          <div className="cart-actions">
            <button className="clear" onClick={clearCart}>Clear Cart</button>
            <button className="checkout" onClick={() => alert('Checkout coming soon!')}>Checkout</button>
          </div>
        </div>
      </aside>

      {/* Categories and Search */}
      <section className="section">
        <p className="eyebrow">EXPLORE</p>

        <div className="shop-heading">
          <h2>Find your next adventure</h2>

          <input
            type="text"
            placeholder="🔍 Search toys..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="categories">
          {categoriesList.map((cat) => {
            // small mapping for icons / labels
            const icons = {
              All: '📦',
              Cars: '🚗',
              Puzzles: '🧩',
              STEM: '🤖',
              Figures: '🦖',
              Creative: '🎨',
              Building: '🧱'
            }

            return (
              <div
                key={cat}
                className={"category" + (category === cat ? ' active' : '')}
                onClick={() => setCategory(cat)}
              >
                <div>{icons[cat] || '📦'}</div>
                <span>{cat === 'STEM' ? 'STEM & Robots' : cat}</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">

        <div className="section-header">

          <div>
            <p className="eyebrow">OUR PICKS</p>
            <h2>Featured toys</h2>
          </div>

          <button
            className="clear-filter"
            onClick={() => {
              setCategory('All')
              setSearch('')
            }}
          >
            Show all →
          </button>

        </div>

        <div className="products">
          {filteredProducts.map((product) => {
            const currentPrice = Math.round(
              product.originalPrice * (1 - product.discount / 100)
            )

            const wished = wishlist.has(product.id)

            return (
              <div
                className="product"
                key={product.id}
                onClick={() => setSelectedProduct(product)}
              >

                <div className={`product-image ${product.color}`}>
                  <div className="discount-badge">-{product.discount}%</div>
                  <button
                    className={"wish-btn" + (wished ? ' wished' : '')}
                    onClick={(e) => {
                      e.stopPropagation()
                      const next = new Set(wishlist)
                      if (next.has(product.id)) next.delete(product.id)
                      else next.add(product.id)
                      setWishlist(next)
                    }}
                    aria-label="Toggle wishlist"
                  >
                    {wished ? '♥' : '♡'}
                  </button>

                  <div className="toy-emoji">{product.emoji}</div>
                </div>

                <h3>{product.name}</h3>

                <div className="meta-row">
                  <span className="age-badge">{product.age}</span>
                  <span className="rating">★ {product.rating}</span>
                </div>

                <p className="muted">{product.description}</p>

                <div className="price-row">
                  <span className="original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  <strong className="current">₹{currentPrice.toLocaleString('en-IN')}</strong>
                </div>

                <button
                  className="add-cart"
                  onClick={(e) => {
                    e.stopPropagation()
                    addToCart(product)
                  }}
                >
                  Add to Cart
                </button>

              </div>
            )
          })}
        </div>

        {/* Product Details View */}
        {selectedProduct && (
          <section className="section product-details">
            <button className="back-btn" onClick={() => setSelectedProduct(null)}>← Back to Toys</button>

            <div className="pd-grid">
              <div className={`product-image large ${selectedProduct.color}`}>
                <div className="discount-badge">-{selectedProduct.discount}%</div>
                <div className="toy-emoji">{selectedProduct.emoji}</div>
              </div>

              <div className="pd-info">
                <h2>{selectedProduct.name}</h2>
                <div className="meta-row">
                  <span className="age-badge">{selectedProduct.age}</span>
                  <span className="rating">★ {selectedProduct.rating}</span>
                </div>

                <p className="muted">{selectedProduct.description}</p>

                <div className="price-row">
                  <span className="original">₹{selectedProduct.originalPrice.toLocaleString('en-IN')}</span>
                  <strong className="current">₹{Math.round(selectedProduct.originalPrice * (1 - selectedProduct.discount/100)).toLocaleString('en-IN')}</strong>
                  <span className="discount">({selectedProduct.discount}% off)</span>
                </div>

                <ProductDetailsControls
                  product={selectedProduct}
                  onAdd={(qty) => addToCartMultiple(selectedProduct, qty)}
                />
              </div>
            </div>
          </section>
        )}

        {filteredProducts.length === 0 && (
          <p className="no-results">
            No toys found. Try another search.
          </p>
        )}

      </section>

      {/* AI Section */}
      <section className="ai-section">

        <div>
          <p className="eyebrow">COMING SOON</p>

          <h2>🤖 Meet ToyBox AI</h2>

          <p>
            Not sure what to buy? Tell us who you're shopping for,
            what they like and your budget. ToyBox AI will help
            you find the perfect toy.
          </p>
        </div>

        <button>
          Ask ToyBox AI →
        </button>

      </section>

      {/* Footer */}
      <footer>
        <strong>🧸 ToyBox</strong>
        <span>Made for curious minds.</span>
      </footer>

    </div>
  )
}

export default App