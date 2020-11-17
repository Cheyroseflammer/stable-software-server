const RiderUserService = {
  getAllRiders(db) {
    return db.select('*').from('stable_riders');
  },
  getRidersById(db, rider_id) {
    return db.select('*').from('stable_riders').where({ id: rider_id }).first();
  },
  getRidersByUser(db, user_id) {
    return db
      .from('stable_riders_user')
      .select('*')
      .join('stable_riders', {
        'stable_riders.id': 'stable_riders_user.stable_riders_id',
      })
      .where({ user_id: user_id });
  },
  insertRiders(db, newRider) {
    return db
      .insert(newRider)
      .into('stable_riders_user')
      .returning('*')
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = RiderUserService;
