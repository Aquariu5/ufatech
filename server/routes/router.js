import { Router } from "express";
import * as controllers from '../controllers/user.js'

let router = new Router();

router.get('/', controllers.getContacts)
router.post('/', controllers.addContact);
router.delete('/', controllers.removeContact);
router.put('/', controllers.editContact);

export default router;