const User = require('../models/user');

const index = (req, res, next) => {
  console.log(req.query)
  // Make the query object to use with Student.find based up
  // the user has submitted the search form or now
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  // Default to sorting by name
  let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
  .sort(sortKey).exec(function(err, users) {
    if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
    res.render('games/index', {
      title: 'Game Reviews',
      users,
      user: req.user,
      name: req.query.name,
      sortKey });
  });
}



// function delFact(req, res, next) {
//   Student.findOne({'facts._id': req.params.id}, (err, student) => {
//     student.facts.id(req.params.id).remove();
//     student.save( (err) => {
//       res.redirect('/students');
//     })
//   })
// }

module.exports = {
  index,
  
  // delFact
};