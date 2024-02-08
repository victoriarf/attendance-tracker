const ClassModel = require('../../models/class.model');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, payment = false, price, schedule } = req.body;

    const userClass = await ClassModel.findById(id);
    if (!!name) {
      userClass.name = name;
    }

    if (!!payment) {
      userClass.payment = payment;
    }

    if (!!price) {
      console.log('price?.amount', price?.amount);

      userClass.price = {
        amount: price.amount,
        recurring: price.recurring,
      };
    }

    if (!!schedule) {
      userClass.schedule = schedule;
    }

    await userClass.save();
    res.json(userClass);
  } catch (e) {
    console.log('Error updating class ', e);
  }
};
