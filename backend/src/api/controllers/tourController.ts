import Tour from '../models/tour';

class TourController {

  model = new Tour();

  create = async (req, res) => {
    const { username } = req;
    const { body: data } = req;
    try {
      const result = await this.model.create(data, { username: username });
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  edit = async (req, res) => {
    const { id } = req.params;
    const { body: data } = req;
    try {
      const result = await this.model.edit(id, data);
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  get = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await this.model.getById(id);
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  getAll = async (req, res) => {
    const { user_id, username, role_id } = req;
    try {
      const result = await this.model.getAll(
        { username: username, user_id: user_id, role_id: role_id }
      );
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  submit = async (req, res) => {
    const { id } = req.params;
    const { body: data } = req;
    try {
      const result = await this.model.submit(id, data);
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  approve = async (req, res) => {
    const { id } = req.params;
    const { user_id, username, role_id } = req;
    try {
      const result = await this.model.approve(
        id,
        { username: username, user_id: user_id, role_id: role_id },
      );
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  reject = async (req, res) => {
    const { id } = req.params;
    const { user_id, username, role_id } = req;
    try {
      const result = await this.model.reject(
        id,
        { username: username, user_id: user_id, role_id: role_id },
      );
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  inquire = async (req, res) => {
    const { id } = req.params;
    const { user_id, username, role_id } = req;
    try {
      const result = await this.model.inquire(
        id,
        { username: username, user_id: user_id, role_id: role_id },
      );
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  addInfo = async (req, res) => {
    const { id } = req.params;
    const { body: data } = req;
    try {
      const result = await this.model.addInfo(id, data);
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default TourController;
