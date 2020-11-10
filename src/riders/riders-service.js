const RidersService = {
  getAllRiders(knex) {
    return knex.select('*').from('stable_riders');
  },

  insertRider(knex, newRider) {
    return knex
      .insert(newRider)
      .into('stable_riders')
      .returning('*')
      .then((rows) => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex.from('stable_riders').select('*').where('id', id).first();
  },

  deleteRider(knex, id) {
    return knex('stable_riders').where({ id }).delete();
  },
  updateRider(knex, id, newRiderFields) {
    return knex('stable_riders').where({ id }).update(newRiderFields);
  },
};

module.exports = RidersService;
