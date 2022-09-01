/* eslint-disable newline-per-chained-call */
const express = require('express');
const { body } = require('express-validator');
const resController = require('../controllers/user');

const router = express.Router();

/**
 * @typedef User
 * @property {string} email.required
 * @property {string} password.required
 * @property {string} role.required
 * @property {boolean} isComplete
 * @property {string} bio
 * @property {string} lastName
 * @property {string} firstName
 * @property {string} job
 * @property {string} address
 * @property {string} city
 * @property {string} country
 * @property {string} birth
 * @property {string} phoneNumber
 * @property {string} dateValidation
 * @property {string} isBanned
 * @property {string} address
 * @property {string} lastLoginDate
 * @property {string} refferal
 * @property {string} identityCard
 * @property {string} refferalCode
 * @property {string} accountStatus
 * @property {string} accountType
 * @property {string} certificationStatus
 */

const bodyValidators = () => [
  body('email').exists().isEmail(),
  body('name').exists().isString(),
];

const [, ...updateValidators] = bodyValidators();

/**
 * Get list of Users
 * @route GET /user/all
 * @group Users
 * @security JWT
 * @returns {Array.<User>} 200 - List of user info
 */
router.get('/all', resController.allUsers);

/**
 * Get list of Users
 * @route GET /user
 * @group Users
 * @security JWT
 * @param {integer} page.query.require
 * @param {integer} limit.query.require
 * @param {string} q.query.require
 * @returns {Array.<User>} 200 - List of user info
 */
router.get('/', resController.getAllUsers);

/**
 * Create a User
 * @route POST /user
 * @group Users
 * @security JWT
 * @param {User.model} User.body.require
 * @returns {User.model} 201 - Created User
 */
router.post('/', ...bodyValidators(), resController.createUser);

/**
 * Get User by ID
 * @route GET /user/{id}
 * @group Users
 * @security JWT
 * @param {string} id.path.require
 * @returns {User.model} 200 - User for given ID
 */
router.get('/:id', resController.getUserByID);

/**
 * Update User by ID
 * @route PUT /user/{id}
 * @group Users
 * @security JWT
 * @param {string} id.path.require
 * @param {User.model} User.body.require
 * @returns {User.model} 200 - Updated User
 */
router.put('/:id', ...updateValidators, resController.updateUserByID);

/**
 * Delete User by ID
 * @route DELETE /user/{id}
 * @group Users
 * @security JWT
 * @param {string} id.path.require
 * @returns {null} 200 - Delete User
 */
router.delete('/:id', resController.deleteUser);

/**
 * Update User by ID
 * @route PUT /user/completeProfile/{id}
 * @group Users
 * @security JWT
 * @param {string} id.path.require
 * @param {User.model} User.body.require
 * @returns {User.model} 200 - Updated User
 */

module.exports = router;
