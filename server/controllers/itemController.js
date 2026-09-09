const fs =
  require('fs')

const path =
  require('path')

const crypto =
  require('crypto')

const {
  Resend
} = require('resend')

const Item =
  require('../models/Item')

const BuyRequest =
  require('../models/BuyRequest')


const resend =
  new Resend(
    process.env.RESEND_API_KEY
  )


// =====================================
// CREATE ITEM
// =====================================

async function createItem(
  req,
  res
) {

  try {

    const {
      title,
      description,
      price,
      sellerName,
      sellerEmail
    } = req.body


    // VALIDATION

    if (
      !title ||
      !description ||
      price === undefined ||
      !sellerName ||
      !sellerEmail
    ) {

      return res.status(400).json({
        message:
          'All fields are required.'
      })

    }


    if (
      Number(price) < 0
    ) {

      return res.status(400).json({
        message:
          'Price cannot be negative.'
      })

    }


    // CREATE OWNER TOKEN

    const ownerToken =
      crypto.randomBytes(
        32
      ).toString('hex')


    // IMAGE PATH

    const imagePath =
      req.file
        ? req.file.path
        : null


    // CREATE ITEM

    const item =
      new Item({

        title:
          title.trim(),

        description:
          description.trim(),

        price:
          Number(price),

        image:
          imagePath,

        sellerName:
          sellerName.trim(),

        sellerEmail:
          sellerEmail
            .trim()
            .toLowerCase(),

        ownerToken

      })


    await item.save()


    // RETURN PUBLIC ITEM
    // WITHOUT PRIVATE EMAIL

    const publicItem =
      item.toObject()

    delete publicItem.sellerEmail
    delete publicItem.ownerToken


    res.status(201).json({

      message:
        'Item listed successfully.',

      item:
        publicItem,

      ownerToken

    })


  } catch (error) {

    console.error(
      'Create item error:',
      error
    )


    // DELETE UPLOADED IMAGE
    // IF DATABASE SAVE FAILED

    if (req.file) {

      try {

        fs.unlinkSync(
          req.file.path
        )

      } catch (
        deleteError
      ) {

        console.error(
          'Could not delete uploaded file:',
          deleteError
        )

      }

    }


    res.status(500).json({

      message:
        'Could not list item.'

    })

  }

}



// =====================================
// GET ALL ITEMS
// =====================================

async function getItems(
  req,
  res
) {

  try {

    const items =
      await Item
        .find()
        .select(
          '-sellerEmail -ownerToken'
        )
        .sort({
          createdAt: -1
        })


    res.json({

      items

    })


  } catch (error) {

    console.error(
      'Get items error:',
      error
    )


    res.status(500).json({

      message:
        'Could not get items.'

    })

  }

}



// =====================================
// GET MY ITEMS
// =====================================

async function getMyItems(
  req,
  res
) {

  try {

    const {
      email
    } = req.query


    if (
      !email ||
      email.trim() === ''
    ) {

      return res.status(400).json({

        message:
          'Seller email is required.'

      })

    }


    const sellerEmail =
      email
        .trim()
        .toLowerCase()


    const items =
      await Item
        .find({
          sellerEmail
        })
        .select(
          '-sellerEmail -ownerToken'
        )
        .sort({
          createdAt: -1
        })


    res.json({

      items

    })


  } catch (error) {

    console.error(
      'Get my items error:',
      error
    )


    res.status(500).json({

      message:
        'Could not get your listings.'

    })

  }

}



// =====================================
// DELETE ITEM
// =====================================

async function deleteItem(
  req,
  res
) {

  try {

    const itemId =
      req.params.id


    const ownerToken =
      req.headers[
        'x-owner-token'
      ]


    if (
      !ownerToken
    ) {

      return res.status(401).json({

        message:
          'Owner token is required.'

      })

    }


    const item =
      await Item.findById(
        itemId
      )


    if (!item) {

      return res.status(404).json({

        message:
          'Item not found.'

      })

    }


    // CHECK OWNER TOKEN

    if (
      item.ownerToken !==
      ownerToken
    ) {

      return res.status(403).json({

        message:
          'You do not have permission to delete this item.'

      })

    }


    // DELETE IMAGE

    if (
      item.image
    ) {

      const imagePath =
        path.resolve(
          item.image
        )


      if (
        fs.existsSync(
          imagePath
        )
      ) {

        fs.unlinkSync(
          imagePath
        )

      }

    }


    // DELETE ITEM

    await Item.findByIdAndDelete(
      itemId
    )


    res.json({

      message:
        'Item deleted successfully.'

    })


  } catch (error) {

    console.error(
      'Delete item error:',
      error
    )


    res.status(500).json({

      message:
        'Could not delete item.'

    })

  }

}



// =====================================
// SEND BUY REQUEST
// =====================================

async function sendBuyRequest(
  req,
  res
) {

  try {

    const itemId =
      req.params.id


    const {
      buyerEmail
    } = req.body


    // CHECK BUYER EMAIL

    if (
      !buyerEmail ||
      buyerEmail.trim() === ''
    ) {

      return res.status(400).json({

        message:
          'Buyer email is required.'

      })

    }


    const cleanBuyerEmail =
      buyerEmail
        .trim()
        .toLowerCase()


    // FIND ITEM

    const item =
      await Item.findById(
        itemId
      )


    if (!item) {

      return res.status(404).json({

        message:
          'Item not found.'

      })

    }


    // PREVENT SELLER
    // FROM BUYING OWN ITEM

    if (
      cleanBuyerEmail ===
      item.sellerEmail
    ) {

      return res.status(400).json({

        message:
          'You cannot send a buy request for your own item.'

      })

    }


    // SAVE BUY REQUEST

    const buyRequest =
      new BuyRequest({

        itemId:
          item._id,

        buyerEmail:
          cleanBuyerEmail,

        sellerEmail:
          item.sellerEmail,

        status:
          'pending'

      })


    await buyRequest.save()


    // SEND EMAIL TO SELLER

    await resend.emails.send({

      from:
        process.env.EMAIL_FROM,

      to:
        item.sellerEmail,

      replyTo:
        cleanBuyerEmail,

      subject:
        `New Buy Request for ${item.title}`,

      html: `

        <h2>
          New Buy Request
        </h2>

        <p>
          Someone is interested in buying your item.
        </p>

        <p>
          <strong>Item:</strong>
          ${item.title}
        </p>

        <p>
          <strong>Price:</strong>
          ₹${item.price}
        </p>

        <p>
          <strong>Buyer Email:</strong>
          ${cleanBuyerEmail}
        </p>

        <p>
          You can reply directly to this email
          to contact the buyer.
        </p>

      `

    })


    // SUCCESS

    res.status(201).json({

      message:
        'Buy request sent successfully!'

    })


  } catch (error) {

    console.error(
      'Buy request error:',
      error
    )


    res.status(500).json({

      message:
        'Could not send buy request.'

    })

  }

}



// =====================================
// EXPORT
// =====================================

module.exports = {

  createItem,

  getItems,

  getMyItems,

  deleteItem,

  sendBuyRequest

}