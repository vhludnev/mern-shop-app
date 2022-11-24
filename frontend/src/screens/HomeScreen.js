import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'
import Product from '../components/Product'
//import products from '../products'
//import axios from 'axios'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'

const HomeScreen = (/* { match } */) => {
  //const keyword = match.params.keyword
  const { keyword, pageNumber = 1 } = useParams()
  const navigate = useNavigate()
  //const [products, setProducts] = useState([])

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get('/api/products')
  //     setProducts(data)
  //   }

  //   fetchProducts()
  // }, [])

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(
    () => dispatch(listProducts(keyword, pageNumber)),
    [dispatch, keyword, pageNumber]
  )

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Button className='btn btn-light my-3' onClick={() => navigate(-1)}>
          Go Back
        </Button>
      )}
      <h1>Latest Products</h1>
      {/* <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row> */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
