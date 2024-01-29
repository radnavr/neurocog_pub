const express = require('express');
const router = express.Router();
const { getItems, createItem, editItem, deleteItem } = require('../controllers/inventory')


router.route('/').get(getItems).post(createItem);

router.route('/:id').put(editItem).delete(deleteItem);

module.exports = router;