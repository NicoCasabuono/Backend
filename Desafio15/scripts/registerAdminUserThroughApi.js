import axios from 'axios';

async function createUser() {
  const userData = {
    first_name: 'admin',
    last_name: 'admin',
    username: 'admin',
    email: 'admin@admin.com',
    age: 'admin',
    password: 'admin',
    //cart: 'admin',
    rol: 'admin'
  };

  try {
    const response = await axios.post('http://localhost:8080/api/users', userData);
    console.log(response.status);
  } catch (error) {
    console.error(error);
  }
}

createUser();
