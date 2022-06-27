const express = require('express');
const app = express();
const port = 3010;
const path = require('path');

const testDB = async () => {
  const client = new Client({
    host: 'ec2-44-197-128-108.compute-1.amazonaws.com',
    port: '5432',
    user: 'crvjfieinqjonw',
    password:
      '797572ad534a210ec2a310481d5938b5dc3aa204c50ef34dafcda0f404cb8082',
    database: 'db0mngu4ot6q5d',
    ssl: true,
  });
  await client.connect();
  const res = await client.query('SELECT $1::text as connected', [
    'Connection to postgres successful!',
  ]);
  console.log(res.rows[0].connected);
  await client.end();
};

app.use(express.static('static'));

app.get('/', (req, res) => {
  const { Client } = require('pg');
  res.sendFile(path.resolve('pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
