// code away!
require('dotenv').config();
const server = require('./server.js');

const port = process.env.PORT;

// server.listen(8000, () => {
//   console.log('\n* Server Running on http://localhost:8000 *\n');
// }fff); 
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});