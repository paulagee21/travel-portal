import User from '../models/user';

class UserController {

  model = new User();

  login = async (req, res) => {
    const { username, password } = req.body;
    try {
      const data = await this.model.login(username, password);
      res.status(200).json({ data: data });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  getManagers = async (req, res) => {
    try {
      const data = await this.model.getManagers();
      res.status(200).json({ data: data });
    } catch (error) {
      res.status(400).end({ error: error.message });
    }
  }

}

export default UserController;
