import { FC } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { pokeApi } from "../../api";
import { Pokemon, PokemonListResponse } from "../../interfaces";
import { Layout } from "../../components/layouts";
import { Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { getPokemonInfo } from "../../utils";

interface Props
{
  pokemon: Pokemon
}

const PokemonByNamePage: FC<Props> = ( { pokemon } ) =>
{
  return (
    <Layout
      title={ pokemon.name }
    >
      <Grid.Container
        gap={ 2 }
        css={ {
          marginTop: '5px'
        } }
      >
        <Grid
          xs={ 12 }
          sm={ 4 }
        >
          <Card
            isHoverable
            css={ {} }
          >
            <Card.Body>
              <Card.Image
                src={ pokemon.sprites.other?.dream_world.front_default
                  || './no-image.png' }
                alt={ pokemon.name }
                width="100%"
                height={ 200 }
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid
          xs={ 12 }
          sm={ 8 }
        >
          <Card>
            <Card.Header
              css={ {
                display       : 'flex',
                justifyContent: 'space-between'
              } }
            >
              <Text
                h1
                transform="capitalize"
              >
                { pokemon.name }
              </Text>
            </Card.Header>
            <Card.Body>
              <Text
                size={ 30 }
              >
                Sprites:
              </Text>
              <Container
                direction="row"
                display="flex"
                gap={ 0 }
              >
                <Image
                  src={ pokemon.sprites.front_default }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
                <Image
                  src={ pokemon.sprites.back_default }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
                <Image
                  src={ pokemon.sprites.front_shiny }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
                <Image
                  src={ pokemon.sprites.back_shiny }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async ( ctx ) =>
{
  const { data } = await pokeApi.get<PokemonListResponse>(
    `/pokemon?limit=151`
  )

  const pokemons151 = data.results.map( pokemon => pokemon.name )

  return {
    paths   : pokemons151.map( name => ( {
      params: { name }
    } ) ),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ( { params } ) =>
{
  const { name } = params as { name: string }

  return {
    props: {
      pokemon : await getPokemonInfo(name)
    }
  }
}

export default PokemonByNamePage