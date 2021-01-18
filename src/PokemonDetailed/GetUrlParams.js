const GetUrlParams = (ourUrl) => {
    const searchParams = new URLSearchParams(ourUrl.search);
    const pokemonIdUrl = searchParams.get('pokemonId');
    if (pokemonIdUrl !== null && pokemonIdUrl !== undefined) {
        console.log(pokemonIdUrl)
        return pokemonIdUrl;
    } else {
        console.log("nada")
    }
}

export default GetUrlParams;