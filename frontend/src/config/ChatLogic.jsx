// export const getSender = (loggedUser, users) => {
//   return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
// };
// export const getSenderFull = (loggedUser, users) => {
//   return users[0]._id === loggedUser._id ? users[1] : users[0];
// };
export const getSender = (loggedUser, users) => {
  if (!users || users.length < 2 || !loggedUser) return "Unknown User";
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  if (!users || users.length < 2 || !loggedUser) return null;
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};