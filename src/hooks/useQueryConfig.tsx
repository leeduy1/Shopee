import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import { ProductListConfig } from 'src/types/product.type'
import useQueryPrams from './useQueryPrams'

export type queryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function useQueryConfig() {
  const queryParams: queryConfig = useQueryPrams()
  const queryConfig: queryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '20',
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      category: queryParams.category
    },
    isUndefined
  )
  return queryConfig
}
