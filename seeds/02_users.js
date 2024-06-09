/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      user_name: "Maggie",
      user_email: "maggie@tailfinder.com",
      user_password: "1234",
    },
  ]);
};
