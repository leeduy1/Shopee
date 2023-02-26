import { useQuery } from '@tanstack/react-query'
import { omitBy, isUndefined } from 'lodash'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination.ts'
import useQueryPrams from 'src/hooks/useQueryPrams'
import { ProductListConfig } from 'src/types/product.type'
import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProductList from './SortProductList'

export type queryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryParams: queryConfig = useQueryPrams()
  const queryConfig: queryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit,
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min
    },
    isUndefined
  )

  const { data } = useQuery({
    queryKey: ['Product', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {data && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {data.data.data.products.map((product) => (
                  <div className='col-san-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
