exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('cities', function(table) {
      table.increments(); // id serial primary key
      table.integer('trip_id').references('id').inTable('trips');
      table.string('place_id');
      table.string('name');
    }),

    knex.schema.createTable('trips', function(table) {
      table.increments(); // id serial primary key
      table.integer('user_id').references('id').inTable('users');
      table.string('title');
      table.string('progress');
      table.integer('start_city').references('id').inTable('cities');
      table.integer('end_city').references('id').inTable('cities');
    }),

    knex.schema.createTable('activities', function(table) {
      table.increments(); // id serial primary key
      table.integer('trip_id').references('id').inTable('trips');
      table.integer('city_id').references('id').inTable('cities');
      table.string('name');
      table.string('address');
      table.string('place_id');
      table.string('category');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trips');
};
