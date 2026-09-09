const mongoose = require('mongoose')

const buyRequestSchema =
  new mongoose.Schema(
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
      },

      buyerEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
      },

      sellerEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
      },

      status: {
        type: String,
        enum: [
          'pending',
          'accepted',
          'rejected'
        ],
        default: 'pending'
      }
    },
    {
      timestamps: true
    }
  )

const BuyRequest =
  mongoose.model(
    'BuyRequest',
    buyRequestSchema
  )

module.exports =
  BuyRequest