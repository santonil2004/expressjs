module.exports = class TodoController {
  index(req, res, next) {
    res.json({
      items: [1, 2, 3, 4],
    });
  }

  show(req, res, next) {
    res.json(req.query);
  }

  async update(req, res, next) {
    console.log(req.body.data.eventName);
    res.json(req.body);
  }
};
