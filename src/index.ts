import getCompanies from "./companies";


class Trading212 {
  async getCompanies (){
    return await getCompanies();
  }
  async getPokemon (){
    const data = await fetch('https://pokeapi.co/api/v2/pokemon/ditto').then(res => res.json()).catch((err) => err);
    return data;
  }
}

const trading212 = new Trading212();

export default trading212;




 