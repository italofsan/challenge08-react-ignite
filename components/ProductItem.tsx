import {memo, useState} from 'react'
import dynamic from 'next/dynamic'
import { AddProductToWishlistProps } from './AddProductToWishlist'

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  return import('./AddProductToWishlist').then(mod => mod.AddProductToWishlist)
},{
  loading: () => <span>Carregando...</span>//enquanto o botão está sendo carregado
})

interface ProductItemProps{
product:{
  id: number;
  price: number;
  priceFormatted: string;
  title: string;
}
onAddToWishList: (id:number) => void;
}

function ProductItemComponent({product, onAddToWishList}: ProductItemProps){

  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)

  return(
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)} >Adicionar aos favoritos</button>
      {isAddingToWishlist &&
      <AddProductToWishlist 
      onAddToWishList={() => onAddToWishList(product.id)}
      onRequestClose={() => setIsAddingToWishlist(false)}
      />
      }
    </div>
  )

}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  // funciona parecido com o if()
  //se o produto anterios tiver as mesmas informações do produto novo, não será renderizado novamente
  return Object.is(prevProps.product, nextProps.product) 
})