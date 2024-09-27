import { body } from "express-validator";

export const validateAuthors =  [
    body('firstName', 'firstName must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('familyName', 'familyName must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('dateOfBirth', 'dateOfBirth must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('dateOfDeath', 'dateOfDeath must not be empty.').trim().isLength({ min: 1 }).escape(),
]

export const validateBooks = [
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('author', 'Author must be selected.').trim().isLength({ min: 1 }).escape(),
    body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('isbn', 'ISBN must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('genre.*').escape(),
]

export const validateBookInstances = [
    body('book', 'Book name must not be empty').trim().isLength({ min: 1 }).escape(),
    body('imprint', 'Book imprint must not be empty').trim().isLength({ min: 1 }).escape(),
    body('date_available', 'Available date must not be empty').trim().isLength({ min: 1 }).escape(),
    body('status', 'Please choose a status').trim().isLength({ min: 1 }).escape(),
]

export const validateGenres = [
    body('name', 'Genre name must contain at least 3 characters').trim().isLength({ min: 3 }).escape(),
]
