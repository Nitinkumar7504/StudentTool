import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SellItem.css'

function SellItem() {

  const navigate = useNavigate()

  const [title, setTitle] =
    useState('')

  const [description, setDescription] =
    useState('')

  const [price, setPrice] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [image, setImage] =
    useState(null)


  // =====================================
  // SUBMIT LISTING
  // =====================================

  async function handleSubmit(event) {

    event.preventDefault()


    // Get student name from localStorage

    const sellerName =
      localStorage.getItem(
        'studentName'
      )


    // Check required fields

    if (
      title.trim() === '' ||
      description.trim() === '' ||
      price === '' ||
      email.trim() === '' ||
      image === null
    ) {

      alert(
        'Please fill all fields and select an image.'
      )

      return

    }


    // Check price

    if (
      Number(price) < 0
    ) {

      alert(
        'Price cannot be negative.'
      )

      return

    }


    // Check seller name

    if (!sellerName) {

      alert(
        'Student name was not found.'
      )

      return

    }


    try {

      // Create FormData

      const formData =
        new FormData()


      formData.append(
        'title',
        title.trim()
      )


      formData.append(
        'description',
        description.trim()
      )


      formData.append(
        'price',
        price
      )


      formData.append(
        'sellerName',
        sellerName
      )


      formData.append(
        'sellerEmail',
        email.trim().toLowerCase()
      )


      formData.append(
        'image',
        image
      )


      // Send data to backend

      const response =
        await fetch(
          'https://studenttool.onrender.com/api/items',
          {
            method: 'POST',
            body: formData
          }
        )


      const data =
        await response.json()


      if (!response.ok) {

        throw new Error(
          data.message ||
          'Could not list item'
        )

      }


      // Get item information

      const itemId =
        data.item._id

      const ownerToken =
        data.ownerToken


      // =================================
      // SAVE OWNER TOKEN
      // =================================

      localStorage.setItem(
        `itemOwnerToken_${itemId}`,
        ownerToken
      )


      // =================================
      // SAVE SELLER EMAIL
      // =================================

      localStorage.setItem(
        'marketplaceSellerEmail',
        email.trim().toLowerCase()
      )


      // Success message

      alert(
        'Item listed successfully!'
      )


      // Clear form

      setTitle('')

      setDescription('')

      setPrice('')

      setEmail('')

      setImage(null)


      // Go to marketplace

      navigate(
        '/marketplace'
      )


    } catch (error) {

      console.error(
        'List item error:',
        error
      )


      alert(
        error.message ||
        'Could not list item.'
      )

    }

  }


  // =====================================
  // PAGE
  // =====================================

  return (

    <div className="sell-item-page">

      <div className="sell-item-card">


        {/* =================================
            HEADER
        ================================= */}

        <h1>
          Sell an Item
        </h1>


        <p>
          List your used study item
          for other students.
        </p>


        {/* =================================
            FORM
        ================================= */}

        <form
          onSubmit={handleSubmit}
        >


          {/* IMAGE */}

          <label>
            Item Image
          </label>


          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={
              event =>
                setImage(
                  event.target.files[0]
                )
            }
          />


          {/* ITEM NAME */}

          <label>
            Item Name
          </label>


          <input
            type="text"
            placeholder="Example: Engineering Mathematics Book"
            value={title}
            onChange={
              event =>
                setTitle(
                  event.target.value
                )
            }
          />


          {/* DESCRIPTION */}

          <label>
            Description
          </label>


          <textarea
            placeholder="Describe the item and its condition..."
            value={description}
            onChange={
              event =>
                setDescription(
                  event.target.value
                )
            }
          />


          {/* PRICE */}

          <label>
            Price (₹)
          </label>


          <input
            type="number"
            min="0"
            placeholder="Example: 250"
            value={price}
            onChange={
              event =>
                setPrice(
                  event.target.value
                )
            }
          />


          {/* EMAIL */}

          <label>
            Your Email
          </label>


          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={
              event =>
                setEmail(
                  event.target.value
                )
            }
          />


          {/* EMAIL NOTE */}

          <p className="email-note">
            Your email will be kept private.
            Buyers will contact you through
            the marketplace request system.
          </p>


          {/* SUBMIT */}

          <button
            type="submit"
          >
            List Item
          </button>


        </form>

      </div>

    </div>

  )

}

export default SellItem