// connect mongoDB

const mongoose = require('mongoose');

main()
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/blog');
}