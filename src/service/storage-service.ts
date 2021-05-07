function saveToken(accessToken: string) {
  localStorage.setItem("accessToken", accessToken);
}

function removeToken() {
  localStorage.removeItem("accessToken");
}

function getToken(): string | null {
  return localStorage.getItem("accessToken");
}

export default {
  saveToken,
  removeToken,
  getToken,
};
