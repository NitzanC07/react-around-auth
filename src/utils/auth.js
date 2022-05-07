export const BASE_URL = "https://register.nomoreparties.co";

export const register = ({email, password}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      "password": password,
      "email": email
    }),
  })
  .then((response) => {
    return response.json();
  })
  .then((res) => {
    console.log(`res: ${res.data}`);
    return res;
  }) 
  .catch((err) => {
    console.log(`Error: ${err}`);
  })
}

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      'email': email,
      'password': password
    }),
  })
  .then((response) => {
    return response.json()
  })
  .catch((err) => console.log(err));
};

export const getContent = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${jwt}`,
    }
  })
  .then(res => res.json())
  .then(data => data)
}