import express from 'express';
import Auth from '../middlewares/Auth';
import checkAction from '../middlewares/roleCheck';
import roles from '../controllers/rolesController';


const role = express.Router();

const { verifyToken } = Auth;

// role.use('/', );

role.post('/role', verifyToken, checkAction('Permissions'), roles.createRole);
role.delete('/role', verifyToken, checkAction('Permissions'), roles.deleteRole);
role.get('/role', verifyToken, checkAction('Permissions'), roles.getAllRoles);
role.patch('/role', verifyToken, checkAction('Permissions'), roles.updateRole);
role.patch('/addrole/:id', verifyToken, checkAction('Permissions'), roles.addRoles);
export default role;
