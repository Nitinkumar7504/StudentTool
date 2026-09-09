const mongoose =
  require('mongoose')


const itemSchema =
  new mongoose.Schema(
    {

      // Item name
      title: {
        type: String,
        required: true,
        trim: true
      },


      // Item description
      description: {
        type: String,
        required: true,
        trim: true
      },


      // Item price
      price: {
        type: Number,
        required: true,
        min: 0
      },


      // Item image
      image: {
        type: String,
        default: null
      },


      // Seller's name
      sellerName: {
        type: String,
        required: true,
        trim: true
      },


      // Seller's email
      // This will NOT be shown publicly
      sellerEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
      },


      // Private token used
      // to delete the listing
      ownerToken: {
        type: String,
        required: true
      }

    },

    {
      timestamps: true
    }
  )


const Item =
  mongoose.model(
    'Item',
    itemSchema
  )


module.exports =
  Item