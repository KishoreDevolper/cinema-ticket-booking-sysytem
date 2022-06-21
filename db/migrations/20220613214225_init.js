
exports.up = function(knex) {
  return knex.schema

.createTable('user',(table)=>{
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('roles').notNullable();
    table.timestamps(true,true);     
    
})

.createTable('Screen_Gold_Morning',(table)=>{
  table.increments();
  table.integer('Gold_users').references('id').inTable('user') 
  table.string('movie_name');
  table.string('seat_number').unique();
  table.string('seat_availability');
  table.timestamps(true,true);
})
.createTable('Screen_Gold_Afternoon',(table)=>{
  table.increments();
  table.integer('Gold_users').references('id').inTable('user') 
  table.string('movie_name');
  table.string('seat_number').unique();
  table.string('seat_availability');
  table.timestamps(true,true);
})
.createTable('Screen_Gold_Night',(table)=>{
  table.increments();
  table.integer('Gold_users').references('id').inTable('user') 
  table.string('movie_name');
  table.string('seat_number').unique();
  table.string('seat_availability');
  table.timestamps(true,true);
})
.createTable('Screen_Silver_Morning',(table)=>{
  table.increments();
  table.integer('silver_users').references('id').inTable('user') 
  table.string('movie_name');
  table.string('seat_number').unique();
  table.string('seat_availability');
  table.timestamps(true,true);
})
.createTable('Screen_Silver_Afternoon',(table)=>{
  table.increments();
  table.integer('silver_users').references('id').inTable('user') 
  table.string('movie_name');
  table.string('seat_number').unique();
  table.string('seat_availability');
  table.timestamps(true,true);
})
.createTable('Screen_Silver_Night',(table)=>{
  table.increments();
  table.integer('silver_users').references('id').inTable('user') 
  table.string('movie_name');
  table.string('seat_number').unique();
  table.string('seat_availability');
  table.timestamps(true,true);
})

};

exports.down = function(knex) {

  return knex.schema
.dropSchemaIfExists('user')
.dropSchemaIfExists('Screen_Gold_Morning')
.dropSchemaIfExists('Screen_Gold_Afternoon')
.dropSchemaIfExists('Screen_Gold_Night')
.dropSchemaIfExists('Screen_Silver_Morning')
.dropSchemaIfExists('Screen_Silver_Afternoon')
.dropSchemaIfExists('Screen_Silver_Night')


};
