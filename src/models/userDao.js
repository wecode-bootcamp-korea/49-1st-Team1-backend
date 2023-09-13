const { myDataSource } = require("./dataSource");

const save = async (nickname, email, password, phoneNumber, birthday, profileImage) => {
  await myDataSource.query(
    `
  INSERT INTO users (
    nickname,
    email,
    password,
    phone_number,
    birth_day,
    profile_image
    )
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [nickname, email, password, phoneNumber, birthday, profileImage]
  );
};

const findById = async (id) => {
  const [user] = await myDataSource.query(
    `
    SELECT *
    FROM users
    WHERE id = ?
    `,
    [id]
  );

  return user;
};

const findByEmail = async (email) => {
  const [user] = await myDataSource.query(
    `
    SELECT *
    FROM users
    WHERE email = ?
    `,
    [email]
  );

  return user;
};

module.exports = { save, findById, findByEmail };
