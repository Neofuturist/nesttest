const person = Object.create(null);

function get_full_name() {
  return this.first_name + ' ' + this.last_name;
}

function set_full_name(new_name) {
  let names;
  names = new_name.trim().split(/\s+/);
  this.first_name = names['0'] || '';
  this.last_name = names['1'] || '';
  return 0;
}

// Here we are reusing the previous getter/setter functions
Object.defineProperty(person, 'name', {
  get: get_full_name,
  set: set_full_name,
  configurable: true,
  enumerable: true,
});

// And adding the "greet" function
person.greet = function (person) {
  return this.name + ': Why, hello there, ' + person + '.';
};

// Then we can share those behaviours with Mikhail
// By creating a new object that has it's [[Prototype]] property
// pointing to 'person'.
let mikhail = Object.create(person);
mikhail.first_name = 'Mikhail';
mikhail.last_name = 'Weiß';
mikhail.age = 19;
mikhail.gender = 'Male';

// And we can test whether things are actually working.
// First, `name' should be looked on `person'
console.log(mikhail.name);
// => 'Mikhail Weiß'

// Setting 'name' should trigger the setter
mikhail.name = 'Michael White';

// Such that `first_name' and `last_name' now reflect the
// previous name setting.
console.log(mikhail.first_name);
// => 'Michael'
console.log(mikhail.last_name);
// => 'White'

// `greet' is also inherited from `person'.
console.log(mikhail.greet('you'));
// => 'Michael White: Why, hello there, you.'

// And just to be sure, we can check which properties actually
// belong to 'mikhail'
console.log(Object.keys(mikhail));
// => [ 'first_name', 'last_name', 'age', 'gender' ]
console.table(mikhail);
//__________________________________________________
