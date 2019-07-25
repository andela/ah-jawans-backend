/* eslint-disable require-jsdoc */
import checkRole from './helpers/checkRole';
import findUser from './helpers/findUser';
import model from '../models';

const { Permissions, User } = model;

class PermitionsController {
  static async createRole(req, res) {
    try {
      const { actions, role } = req.body;
      if ((await checkRole(role, actions))) return res.status(401).json({ error: 'role exist!' });
      const tablesAllowed = req.body.tablesAllowed.split(',');
      return (await Permissions.create({ role, actions, tablesAllowed })) ? res.status(201).json({ message: 'Role successfully created' })
        : res.status(401).json({ error: 'tableAllowed, role, and permissions are required ' });
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  }

  static async deleteRole(req, res) {
    try {
      const { actions, role } = req.body;
      if (role === 'superAdmin') return res.status(403).json({ error: 'Not allowed to delete super admin!' });
      if (!(await checkRole(role, actions))) return res.status(401).json({ error: 'role does not exist!' });
      return (await Permissions.destroy({ where: { role, actions } })) && res.status(200).json({ message: 'Role successfully deleted!' });
    } catch (error) {
      return res.status(500).json({ error: 'Server error!' });
    }
  }

  static async getAllRoles(req, res) {
    try {
      const roles = await Permissions.findAll();
      return roles.length && res.status(200).json({ roles });
    } catch (error) {
      return res.status(500).json({ error: 'Server error!' });
    }
  }

  static async updateRole(req, res) {
    try {
      const { actions, role } = req.body;
      const roleAvailable = await checkRole(role, actions);
      if (!roleAvailable) return res.status(401).json({ error: 'role does not exist!' });
      const addTables = req.body.tablesAllowed ? req.body.tablesAllowed.split(',') : [];
      if (!addTables.length) return res.status(401).json({ error: 'Nothing to update' });
      const roles = await Permissions.update({ tablesAllowed: addTables },
        { where: { role, actions } });
      return roles && res.status(200).json({ message: 'Role successfully updated' });
    } catch (error) {
      return res.status(500).json({ error: 'Server error!' });
    }
  }

  static async addRoles(req, res) {
    try {
      const user = await findUser(req.params.id);
      const role = req.body.roles ? req.body.roles.split(',') : [];
      if (!user) return res.status(404).json({ error: 'No user found!' });
      if (!role.length) return res.status(401).json({ error: 'Nothing to update' });
      const updaterole = await User.update({ roles: role },
        { where: { id: req.params.id } });
      return updaterole && res.status(200).json({ message: 'User role add successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Server error!' });
    }
  }
}

export default PermitionsController;
