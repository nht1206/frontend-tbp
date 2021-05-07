import User from "@/models/User";
import jwtDecode from "jwt-decode";
function saveToken(accessToken: string) {
  localStorage.setItem("accessToken", accessToken);
}

function removeToken() {
  localStorage.removeItem("accessToken");
}

function getToken(): string | null {
  return localStorage.getItem("accessToken");
}

function extractUser(): User | null {
  const token = getToken();
  if (token) {
    return jwtDecode<User | null>(token);
  }
  return null;
}

export default {
  saveToken,
  removeToken,
  getToken,
  extractUser,
};
