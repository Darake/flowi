export const findById = (array, id) => {
  return array.filter(category => category.id === id)[0];
};

export default { findById };
