const BuyRequest =
  require('../models/BuyRequest')


// =====================================
// GET MY BUY REQUESTS
// =====================================

async function getMyBuyRequests(
  req,
  res
) {

  try {

    const {
      sellerEmail
    } = req.query


    // CHECK SELLER EMAIL

    if (
      !sellerEmail ||
      sellerEmail.trim() === ''
    ) {

      return res.status(400).json({

        message:
          'Seller email is required.'

      })

    }


    const cleanSellerEmail =
      sellerEmail
        .trim()
        .toLowerCase()


    // FIND REQUESTS

    const requests =
      await BuyRequest
        .find({
          sellerEmail:
            cleanSellerEmail
        })
        .populate(
          'itemId',
          'title price'
        )
        .sort({
          createdAt: -1
        })


    // FORMAT RESPONSE

    const formattedRequests =
      requests.map(
        request => ({

          _id:
            request._id,

          buyerEmail:
            request.buyerEmail,

          sellerEmail:
            request.sellerEmail,

          status:
            request.status,

          createdAt:
            request.createdAt,

          itemTitle:
            request.itemId
              ? request.itemId.title
              : 'Item no longer available',

          itemPrice:
            request.itemId
              ? request.itemId.price
              : null

        })
      )


    res.json({

      requests:
        formattedRequests

    })


  } catch (error) {

    console.error(
      'Get buy requests error:',
      error
    )


    res.status(500).json({

      message:
        'Could not get buy requests.'

    })

  }

}


module.exports = {

  getMyBuyRequests

}