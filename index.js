// code away!

const server = require('./server.js');
require('dotenv').config();
const port = process.env.PORT;

// server.listen(8000, () => {
//   console.log('\n* Server Running on http://localhost:8000 *\n');
// });
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});