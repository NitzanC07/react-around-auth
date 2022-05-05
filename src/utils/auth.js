export const BASE_URL = "https://register.nomoreparties.co";

export const register = ({email, password}) => {
  console.log(`register: ${email} ${password}`);
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
    .then((data) => {
      try {
        if (data.status === 200) {
          console.log(data);
          return data.json();
        }
      } catch (err) {
        return err;
      }
    })
    .catch((err) => console.log(err));
};

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
      try {
        if (response.status === 200) {
          localStorage.setItem("jwt", response.jwt)
          return response.json();
        }
      } catch (e) {
        return e;
      }
    })
    .catch((err) => console.log(err));
};