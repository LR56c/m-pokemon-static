import { FC } from "react"

import Head from "next/head"
import { Navbar } from "../ui";

interface Props
{
  children: React.ReactNode
  title?: string
}

const origin = (typeof window === "undefined") ? '' : window.location.origin;

export const Layout: FC<Props> = ( { children, title = 'PokeApp' } ) =>
{
  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta
          name="author"
          content="MH"
        />
        <meta
          name="description"
          content={ `info sobre pokemon ${ title }` }
        />
        <meta
          name="keywords"
          content={ `${ title }, pokedex, pokemon` }
        />
        <meta
          name="og:title"
          content={ `info sobre pokemon ${ title }` }
        />
        <meta
          name="og:description"
          content={ `Esta pagina es sobre ${ title }` }
        />
        <meta
          name="og:image"
          content={ `${origin}/banner.png` }
        />
      </Head>
      <Navbar/>
      <main
        style={ {
          padding: '0px 20px',
        } }
      >
        { children }
      </main>
    </>
  )
}