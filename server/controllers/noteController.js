const crypto = require('crypto')
const Note = require('../models/Note')
const fs = require('fs')
const path = require('path')


// CREATE NOTE
const createNote = async (req, res) => {

    try {

        const {
            title,
            subject,
            course,
            semester,
            uploader
        } = req.body


        if (!req.file) {

            return res.status(400).json({
                message: 'Please upload a file'
            })

        }


        // Generate a unique secret token
        // for the owner of this note
        const ownerToken =
            crypto.randomBytes(32).toString('hex')


        const note = await Note.create({

            title,

            subject,

            course,

            semester,

            fileName:
                req.file.originalname,

            fileType:
                req.file.mimetype,

            filePath:
                req.file.path,

            uploader,

            ownerToken

        })


        res.status(201).json({

            note,

            ownerToken

        })

    } catch (error) {

        console.error(
            'Create note error:',
            error.message
        )

        res.status(500).json({
            message: 'Could not create note'
        })

    }

}


// GET ALL NOTES
const getNotes = async (req, res) => {

    try {

        const search =
            req.query.search || ''


        const page =
            Number(req.query.page) || 1


        const limit =
            Number(req.query.limit) || 10


        const skip =
            (page - 1) * limit


        const searchFilter = search
            ? {
                $or: [

                    {
                        title: {
                            $regex: search,
                            $options: 'i'
                        }
                    },

                    {
                        subject: {
                            $regex: search,
                            $options: 'i'
                        }
                    },

                    {
                        course: {
                            $regex: search,
                            $options: 'i'
                        }
                    },

                    {
                        semester: {
                            $regex: search,
                            $options: 'i'
                        }
                    }

                ]
            }

            : {}


        const notes =
            await Note.find(searchFilter)
                .select('-ownerToken')
                .sort({
                    createdAt: -1
                })
                .skip(skip)
                .limit(limit)


        const totalNotes =
            await Note.countDocuments(
                searchFilter
            )


        const totalPages =
            Math.ceil(
                totalNotes / limit
            )


        res.status(200).json({

            notes,

            currentPage:
                page,

            totalPages,

            totalNotes

        })

    } catch (error) {

        console.error(
            'Get notes error:',
            error.message
        )

        res.status(500).json({
            message: 'Could not get notes'
        })

    }

}


// DELETE NOTE
const deleteNote = async (req, res) => {

    try {

        const note =
            await Note.findById(
                req.params.id
            )


        if (!note) {

            return res.status(404).json({
                message: 'Note not found'
            })

        }


        // Get the owner's token from
        // the request header
        const ownerToken =
            req.headers['x-owner-token']


        if (!ownerToken) {

            return res.status(401).json({
                message: 'Owner token is required'
            })

        }


        // Check whether the token belongs
        // to this note
        if (
            ownerToken !== note.ownerToken
        ) {

            return res.status(403).json({
                message:
                    'You are not allowed to delete this note'
            })

        }


        // Get the physical file path
        const filePath =
            path.resolve(
                note.filePath
            )


        // Delete the uploaded file
        if (
            fs.existsSync(filePath)
        ) {

            fs.unlinkSync(filePath)

        }


        // Delete the database record
        await Note.findByIdAndDelete(
            req.params.id
        )


        res.status(200).json({

            message:
                'Note and file deleted successfully'

        })

    } catch (error) {

        console.error(
            'Delete note error:',
            error.message
        )

        res.status(500).json({
            message: 'Could not delete note'
        })

    }

}


module.exports = {

    createNote,

    getNotes,

    deleteNote

}