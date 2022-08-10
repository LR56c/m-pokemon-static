import type { GetStaticProps, NextPage } from 'next'
import { Layout } from "../components/layouts";
import { pokeApi } from "../api";
import { PokemonListResponse, SmallPokemon } from "../interfaces";
import { PokemonCard } from "../components/pokemon";
import { Grid, Image } from "@nextui-org/react";
interface Props
{
  pokemons: SmallPokemon[]
}


const HomePage: NextPage<Props> = ( { pokemons } ) =>
{
  return (
    <Layout
      title="Pok"
    >
      <Grid.Container
        gap={ 2 }
        justify="flex-start"
      >
        { pokemons.map( ( pokemon ) => (
          <PokemonCard
            key={ pokemon.name }
            pokemon={ pokemon }
          />
        ) )
        }
      </Grid.Container>
    </Layout> )
}

export const getStaticProps: GetStaticProps = async ( ctx ) =>
{
  const { data } = await pokeApi.get<PokemonListResponse>(
    '/pokemon?limit=151'
  )

  const pokemons: SmallPokemon[] = data.results.map( ( pokemon, index ) =>
    ( {
      ...pokemon,
      id : index + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ index
      + 1 }.svg`
    } ) )

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage