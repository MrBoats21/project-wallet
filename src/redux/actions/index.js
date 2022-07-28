export const USER_EMAIL = 'USER_EMAIL';

export const sendEmail = (email) => ({
  type: USER_EMAIL,
  email,
});
