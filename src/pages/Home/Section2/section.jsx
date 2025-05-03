import "./section.css"

const RestaurantSection2 = () => {
  return (
    <div className="restaurant-container">
      {/* History Section */}
      <section className="history-section">
        <div className="content-left">
          <h3 className="subtitle font-great-vibes">History of</h3>
          <h2 className="title font-playfair">Our Restaurant</h2>
          <div className="divider">
            <span className="line"></span>
            <span className="ornament"></span>
            <span className="line"></span>
          </div>
          <p className="description font-lora">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
            atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
          </p>
          <button className="btn-primary font-lora">Our Story</button>
        </div>
        <div className="content-right">
          <div className="image-frame">
            <img
              src="/placeholder.svg?height=400&width=500"
              alt="Restaurant interior with staff serving customers"
              className="restaurant-image"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="content-left">
          <div className="image-frame">
            <img
              src="/placeholder.svg?height=400&width=500"
              alt="Restaurant storefront with outdoor seating"
              className="restaurant-image"
            />
          </div>
        </div>
        <div className="content-right">
          <h3 className="subtitle font-great-vibes">Dedicated</h3>
          <h2 className="title font-playfair">Our Services</h2>
          <div className="divider">
            <span className="line"></span>
            <span className="ornament"></span>
            <span className="line"></span>
          </div>
          <p className="description font-lora">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
            atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
          </p>
          <button className="btn-primary font-lora">View More</button>
        </div>
      </section>
    </div>
  )
}

export default RestaurantSection2
