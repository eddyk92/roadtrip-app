exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
        table.increments(); // id serial primary key
        table.string('email');
        table.string('password');
    }),

    knex.schema.createTable('cities', function(table) {
      table.increments(); // id serial primary key
      table.string('place_id'); //  unique id from google
      table.string('name');
    }),

    //  this holds cities that belong to a trip, but are not the start
    //  or the end city
    knex.schema.createTable('waypoints', function(table) {
      table.increments();
      table.integer('trip_id').references('id').inTable('trips');
      table.integer('city_id').references('id').inTable('cities');
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
  return knex.schema.dropTable('users')
    .dropTable('cities')
    .dropTable('trips')
    .dropTable('waypoints')
    .dropTable('activities');
};
