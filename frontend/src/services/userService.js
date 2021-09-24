import server from "../utils/server"

export const userChangePassword = async (oldPassword, newPassword) => {
  try {
    const body = {
      oldPassword,
      newPassword,
    }
    const res = await server.post('/users/changepassword', body);
    console.log(res);
  } catch (err) {
    throw err;
  }
}
