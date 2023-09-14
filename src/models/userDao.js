const { myDataSource } = require("./dataSource");

const createUser = async (nickname, email, password, phoneNumber, birthday, profileImage) => {
  await myDataSource.query(`
    INSERT INTO users (
      nickname,
      email,
      password,
      phone_number,
      birth_day,
      profile_image
    ) VALUES (?, ?, ?, ?, ?, ?)
  `,
    [nickname, email, password, phoneNumber, birthday, profileImage]
  );
};

const findUserById = async (id) => {
  const [user] = await myDataSource.query(
    `
    SELECT id, email, password
    FROM users
    WHERE id = ?
    `,
    [id]
  );

  return user;
};

const findUserByEmail = async (email) => {
  const [user] = await myDataSource.query(
    `
    SELECT id, email
    FROM users
    WHERE email = ?
    `,
    [email]
  );

  return user;
};

module.exports = { createUser, findUserById, findUserByEmail };
