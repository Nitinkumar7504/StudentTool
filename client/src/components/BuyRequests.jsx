import { useEffect, useState } from 'react'
import './BuyRequests.css'

function BuyRequests() {

  const [requests, setRequests] =
    useState([])

  const [loading, setLoading] =
    useState(true)


  useEffect(() => {

    async function fetchRequests() {

      try {

        const sellerEmail =
          localStorage.getItem(
            'marketplaceSellerEmail'
          )


        if (!sellerEmail) {

          setRequests([])

          return

        }


        const response =
          await fetch(
            `https://studenttool.onrender.com/api/buy-requests/my?sellerEmail=${encodeURIComponent(sellerEmail)}`
          )


        const data =
          await response.json()


        if (!response.ok) {

          throw new Error(
            data.message ||
            'Could not load buy requests'
          )

        }


        setRequests(
          data.requests
        )


      } catch (error) {

        console.error(
          'Get buy requests error:',
          error
        )

        alert(
          error.message ||
          'Could not load buy requests.'
        )

      } finally {

        setLoading(false)

      }

    }


    fetchRequests()

  }, [])



  if (loading) {

    return (

      <div className="buy-requests-page">

        <div className="buy-requests-header">

          <h1>
            Buy Requests
          </h1>

          <p>
            Loading your buy requests...
          </p>

        </div>

      </div>

    )

  }



  return (

    <div className="buy-requests-page">

      <div className="buy-requests-header">

        <h1>
          Buy Requests
        </h1>

        <p>
          Students who are interested
          in buying your items.
        </p>

      </div>


      {requests.length === 0 ? (

        <div className="no-buy-requests">

          <h2>
            No Buy Requests
          </h2>

          <p>
            You haven't received any
            buy requests yet.
          </p>

        </div>

      ) : (

        <div className="buy-requests-list">

          {requests.map(
            request => (

              <div
                className="buy-request-card"
                key={request._id}
              >

                <h2>
                  {request.itemTitle}
                </h2>


                <p>
                  <strong>
                    Buyer:
                  </strong>{' '}

                  {request.buyerEmail}
                </p>


                <p>
                  <strong>
                    Price:
                  </strong>{' '}

                  ₹{request.itemPrice}
                </p>


                <p>
                  <strong>
                    Status:
                  </strong>{' '}

                  {request.status}
                </p>


                <p className="request-date">

                  Requested on:{' '}

                  {new Date(
                    request.createdAt
                  ).toLocaleString()}

                </p>

              </div>

            )
          )}

        </div>

      )}

    </div>

  )

}


export default BuyRequests