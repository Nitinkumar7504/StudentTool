import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './MyListings.css'

function MyListings() {

  const [items, setItems] =
    useState([])

  const [loading, setLoading] =
    useState(true)


  // =====================================
  // GET MY LISTINGS
  // =====================================

  useEffect(() => {

    async function fetchMyItems() {

      try {

        const sellerEmail =
          localStorage.getItem(
            'marketplaceSellerEmail'
          )


        if (!sellerEmail) {

          setItems([])

          return

        }


        const response =
          await fetch(
            `http://localhost:5000/api/items/my?email=${encodeURIComponent(sellerEmail)}`
          )


        const data =
          await response.json()


        if (!response.ok) {

          throw new Error(
            data.message ||
            'Could not get your listings'
          )

        }


        setItems(
          data.items
        )


      } catch (error) {

        console.error(
          'Get my listings error:',
          error
        )

        alert(
          error.message ||
          'Could not load your listings.'
        )

      } finally {

        setLoading(false)

      }

    }


    fetchMyItems()

  }, [])



  // =====================================
  // DELETE LISTING
  // =====================================

  async function handleDelete(
    itemId
  ) {

    const confirmed =
      window.confirm(
        'Are you sure you want to delete this listing?'
      )


    if (!confirmed) {

      return

    }


    const ownerToken =
      localStorage.getItem(
        `itemOwnerToken_${itemId}`
      )


    if (!ownerToken) {

      alert(
        'Delete permission was not found for this item.'
      )

      return

    }


    try {

      const response =
        await fetch(
          `http://localhost:5000/api/items/${itemId}`,
          {
            method:
              'DELETE',

            headers: {
              'x-owner-token':
                ownerToken
            }
          }
        )


      const data =
        await response.json()


      if (!response.ok) {

        throw new Error(
          data.message ||
          'Could not delete item'
        )

      }


      localStorage.removeItem(
        `itemOwnerToken_${itemId}`
      )


      setItems(
        previousItems =>
          previousItems.filter(
            item =>
              item._id !== itemId
          )
      )


      alert(
        'Item deleted successfully!'
      )


    } catch (error) {

      console.error(
        'Delete item error:',
        error
      )


      alert(
        error.message ||
        'Could not delete item.'
      )

    }

  }



  // =====================================
  // IMAGE URL
  // =====================================

  function getImageUrl(
    imagePath
  ) {

    if (!imagePath) {

      return null

    }


    return (
      `http://localhost:5000/${imagePath.replace(/\\/g, '/')}`
    )

  }



  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <div className="my-listings-page">

        <div className="my-listings-header">

          <h1>
            My Listings
          </h1>

          <p>
            Loading your listings...
          </p>

        </div>

      </div>

    )

  }



  // =====================================
  // PAGE
  // =====================================

  return (

    <div className="my-listings-page">


      {/* HEADER */}

      <div className="my-listings-header">

        <h1>
          My Listings
        </h1>


        <p>
          Manage the items you have
          listed in the marketplace.
        </p>


        <Link
          to="/marketplace/sell"
          className="sell-item-button"
        >
          Sell an Item
        </Link>


        <Link
          to="/marketplace/buy-requests"
          className="buy-requests-button"
        >
          Buy Requests
        </Link>

      </div>



      {/* NO LISTINGS */}

      {items.length === 0 ? (

        <div className="no-my-listings">

          <h2>
            You have no listings yet
          </h2>


          <p>
            List an item to sell it
            to another student.
          </p>


          <Link
            to="/marketplace/sell"
            className="sell-item-button"
          >
            Sell an Item
          </Link>

        </div>

      ) : (


        /* LISTINGS */

        <div className="my-listings-grid">

          {items.map(
            item => (

              <div
                className="my-listing-card"
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
                    className="my-listing-image"
                  />

                ) : (

                  <div className="no-listing-image">

                    No Image

                  </div>

                )}



                {/* CONTENT */}

                <div className="my-listing-content">

                  <h2>
                    {item.title}
                  </h2>


                  <p className="my-listing-description">

                    {item.description}

                  </p>


                  <p className="my-listing-price">

                    ₹{item.price}

                  </p>


                  <button
                    className="delete-listing-button"
                    onClick={() =>
                      handleDelete(
                        item._id
                      )
                    }
                  >
                    Delete Listing
                  </button>

                </div>


              </div>

            )
          )}

        </div>

      )}

    </div>

  )

}


export default MyListings