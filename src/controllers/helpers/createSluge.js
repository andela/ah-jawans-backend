
const createSlug = (text) => {
  let gen = `${text} ${(Math.floor(Math.random() * Math.floor(100000)))}`;
  while (gen.match(/ /g)) {
    gen = gen.replace(' ', '-');
  }
  return gen;
};

export default createSlug;
