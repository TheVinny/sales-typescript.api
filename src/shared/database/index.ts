import { createConnection } from 'typeorm';

createConnection()
  .then(() => {
    console.log('Connected!');
  })
  .catch(err => {
    console.error(err);
  });
