import { FormEvent, useCallback, useState } from "react"
import { SearchResult } from "../components/SearchResults";

type Results = {
  totalPrice: number;
  data: any[];
}

export default function Home(){
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: []
  })


  async function handleSearch(event: FormEvent){
    event.preventDefault();

    // verificar se a busca não está vazia, caso esteja vazia a funcção não vai executar
    if(!search.trim()){
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json();

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    const products = data.map(product =>{
      return{
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price),
      }
    })

    const totalPrice =  data.reduce((total,product) => {
          return total + product.price;
        }, 0)

    setResults({totalPrice, data: products});
  }

  const addToWishlist = useCallback((id: number) => {
    console.log(id)
  }, [])

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        {/* no onChange, cada vez que o usuário digitar algo será atualizado o valor de pesquisa */}
        <input type="text" 
        value={search} 
        onChange={e => setSearch(e.target.value)} />
        <button type="submit">Buscar</button>
      </form>

      <SearchResult 
      onAddToWishList={addToWishlist}
      results={results.data}
      totalPrice={results.totalPrice}
      />
    </div>
  )
}
