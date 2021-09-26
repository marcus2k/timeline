import server from "../utils/server"

export const userChangePassword = async (oldPassword, newPassword) => {
  try {
    const body = {
      oldPassword,
      newPassword,
    }
    await server.post('/users/changepassword', body);
  } catch (err) {
    throw err;
  }
}
