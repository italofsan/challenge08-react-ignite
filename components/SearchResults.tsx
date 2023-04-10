import { ProductItem } from "./ProductItem";
// import { useMemo } from 'react';
import { List, ListRowRenderer } from 'react-virtualized'

interface SearchResultsProps {
  totalPrice: number;
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>
  onAddToWishList: (id: number) => void;
}

export function SearchResult({ results, onAddToWishList, totalPrice }: SearchResultsProps) {

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      // Ao utilizar o rowRenderer, é necessário sempre ter uma div em volta do que será mostrado
      <div
      key={key}
      style={style}//o style controla se o item será mostrado em tela ou não
      > 
        <ProductItem
          onAddToWishList={onAddToWishList}
          product={results[index]} />
      </div>
    )
  }

  //código antigo
  // const totalPrice = useMemo( () => {
  //   return results.reduce((total,product) => {
  //     return total + product.price;
  //   }, 0)
  // }, [results])//toda vez que o results mudar, a função será executada novamente

  return (
    <div>
      <h2>{totalPrice}</h2>
      <List 
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer }//função que vai renderizar cada item da lista
      />
    </div>
  )
}