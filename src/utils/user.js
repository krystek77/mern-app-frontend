import jwtDecode from 'jwt-decode';
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    storage.setItem('test', 'storage test');
    storage.removeItem('test');
    return true;
  } catch (error) {
    return (
      error instanceof DOMException &&
      (error.code === 22 ||
        error.code === 1014 ||
        error.name === 'QuotaExceededError' ||
        error.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      storage &&
      storage.length !== 0
    );
  }
}

export function getUser() {
  try {
    if (storageAvailable('localStorage')) {
      const user = window.localStorage.getItem('user')
        ? JSON.parse(window.localStorage.getItem('user'))
        : null;
      return user;
    }
  } catch (error) {
    console.log(error.message);
  }
}
export function checkAdmin() {
  let user;
  try {
    user = getUser();
    if (user) {
      return user.role === 'admin' ? user : null;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error.message);
  }
}
export function checkUser() {
  let user;
  try {
    user = getUser();
    if (user) {
      return user.role === 'user' ? user : null;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error.message);
  }
}
export function loginUser(user) {
  try {
    if (storageAvailable('localStorage')) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  } catch (error) {
    console.log(error.message);
  }
}
export function logoutUser() {
  localStorage.clear();
  window.location.reload(false);
}
export function checkTokenExpirationTime() {
  try {
    if (storageAvailable('localStorage')) {
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))?.token
        : null;
      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          logoutUser();
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}
export function getToken() {
  return JSON.parse(localStorage.getItem('user'))?.token;
}

const userAPI = {
  getUser,
  checkAdmin,
  checkUser,
  loginUser,
  logoutUser,
  getToken,
  checkTokenExpirationTime,
};

export default userAPI;
