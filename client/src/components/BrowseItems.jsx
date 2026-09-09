import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './BrowseItems.css'

function BrowseItems() {

  const [items, setItems] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [selectedItem, setSelectedItem] =
    useState(null)

  const [buyerEmail, setBuyerEmail] =
    useState('')


  // =====================================
  // GET ALL ITEMS
  // =====================================

  useEffect(() => {

    async function fetchItems() {

      try {

        const response =
          await fetch(
            'https://studenttool.onrender.com/api/items'
          )

        const data =
          await response.json()

        if (!response.ok) {

          throw new Error(
            data.message ||
            'Could not load items'
          )

        }

        setItems(
          data.items
        )

      } catch (error) {

        console.error(
          'Get items error:',
          error
        )

        alert(
          error.message ||
          'Could not load marketplace items.'
        )

      } finally {

        setLoading(false)

      }

    }

    fetchItems()

  }, [])


  // =====================================
  // OPEN BUY FORM
  // =====================================

  function handleBuy(item) {

    setSelectedItem(item)

    setBuyerEmail('')

  }


  // =====================================
  // CLOSE BUY FORM
  // =====================================

  function closeBuyForm() {

    setSelectedItem(null)

    setBuyerEmail('')

  }


  // =====================================
  // SUBMIT BUY REQUEST
  // =====================================

  async function handleBuySubmit(event) {

    event.preventDefault()


    // =====================================
    // VALIDATE EMAIL
    // =====================================

    if (
      buyerEmail.trim() === ''
    ) {

      alert(
        'Please enter your email.'
      )

      return

    }


    try {

      // ===================================
      // SEND BUY REQUEST TO BACKEND
      // ===================================

      const response =
        await fetch(
          `https://studenttool.onrender.com/api/items/${selectedItem._id}/buy`,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body: JSON.stringify({

              buyerEmail:
                buyerEmail.trim()

            })

          }
        )


      const data =
        await response.json()


      // ===================================
      // CHECK RESPONSE
      // ===================================

      if (!response.ok) {

        throw new Error(
          data.message ||
          'Could not send buy request'
        )

      }


      // ===================================
      // SUCCESS
      // ===================================

      alert(
        'Buy request sent successfully! The seller has been notified by email.'
      )


      // Close modal

      setSelectedItem(null)

      setBuyerEmail('')


    } catch (error) {

      console.error(
        'Buy request error:',
        error
      )


      alert(
        error.message ||
        'Could not send buy request.'
      )

    }

  }


  // =====================================
  // IMAGE URL
  // =====================================

  function getImageUrl(imagePath) {

    if (!imagePath) {

      return null

    }

    return (
      `https://studenttool.onrender.com/${imagePath.replace(/\\/g, '/')}`
    )

  }


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <div className="browse-items-page">

        <div className="browse-items-header">

          <h1>
            Marketplace
          </h1>

          <p>
            Loading items...
          </p>

        </div>

      </div>

    )

  }


  // =====================================
  // PAGE
  // =====================================

  return (

    <div className="browse-items-page">


      {/* =================================
          HEADER
      ================================= */}

      <div className="browse-items-header">

        <h1>
          Marketplace
        </h1>

        <p>
          Buy and sell useful items
          with other students.
        </p>


        {/* =================================
            LIST ITEM BUTTON
        ================================= */}

        <Link
          to="/marketplace/sell"
          className="list-item-button"
        >
          List an Item
        </Link>


        {/* =================================
            MY LISTINGS BUTTON
        ================================= */}

        <Link
          to="/marketplace/my-listings"
          className="my-listings-button"
        >
          My Listings
        </Link>

      </div>


      {/* =================================
          NO ITEMS
      ================================= */}

      {items.length === 0 ? (

        <div className="no-items">

          <h2>
            No items available
          </h2>

          <p>
            There are no items listed
            in the marketplace yet.
          </p>


          <Link
            to="/marketplace/sell"
            className="list-item-button"
          >
            List the First Item
          </Link>

        </div>

      ) : (

        /* =================================
           ITEMS GRID
        ================================= */

        <div className="items-grid">

          {items.map(
            item => (

              <div
                className="item-card"
                key={item._id}
              >


                {/* IMAGE */}

                {item.image ? (

                  <img
                    src={
                      getImageUrl(
                        item.image
                      )
                    }
                    alt={
                      item.title
                    }
                    className="item-image"
                  />

                ) : (

                  <div className="no-item-image">
                    No Image
                  </div>

                )}


                {/* CONTENT */}

                <div className="item-content">

                  <h2>
                    {item.title}
                  </h2>


                  <p className="item-description">
                    {item.description}
                  </p>


                  <p className="item-price">
                    ₹{item.price}
                  </p>


                  <p className="item-seller">

                    Listed by{' '}

                    <strong>
                      {item.sellerName}
                    </strong>

                  </p>


                  {/* BUY BUTTON */}

                  <button
                    className="buy-button"
                    onClick={() =>
                      handleBuy(item)
                    }
                  >
                    I Want to Buy
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      )}


      {/* =================================
          BUY MODAL
      ================================= */}

      {selectedItem && (

        <div className="buy-modal-overlay">

          <div className="buy-modal">


            {/* CLOSE BUTTON */}

            <button
              className="close-modal"
              onClick={
                closeBuyForm
              }
            >
              ×
            </button>


            <h2>
              I Want to Buy
            </h2>


            <p>
              You are interested in:
            </p>


            <h3>
              {selectedItem.title}
            </h3>


            <p className="modal-price">
              ₹{selectedItem.price}
            </p>


            {/* BUY FORM */}

            <form
              onSubmit={
                handleBuySubmit
              }
            >

              <label>
                Your Email
              </label>


              <input
                type="email"
                placeholder="Enter your email"
                value={
                  buyerEmail
                }
                onChange={
                  event =>
                    setBuyerEmail(
                      event.target.value
                    )
                }
              />


              <p className="buyer-email-note">
                Your email will be used
                to contact the seller.
              </p>


              <button
                type="submit"
                className="send-request-button"
              >
                Send Buy Request
              </button>

            </form>

          </div>

        </div>

      )}

    </div>

  )

}

export default BrowseItems