const HorsesService = {
  getAllHorses(knex) {
    return knex.select('*').from('stable_horses');
  },
  insertHorse(knex, newHorse) {
    return knex
      .insert(newHorse)
      .into('stable_horses')
      .returning('*')
      .then((rows) => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex.from('stable_horses').select('*').where('id', id).first();
  },

  deleteHorse(knex, id) {
    return knex('stable_horses').where({ id }).delete();
  },
  updateHorse(knex, id, newHorseFields) {
    return knex('stable_horses').where({ id }).update(newHorseFields);
  },
};
module.exports = HorsesService;
