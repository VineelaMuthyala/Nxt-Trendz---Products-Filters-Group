import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const apiStatusDetails = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    activeOptionId: sortbyOptions[0].optionId,
    titleSearch: '',
    rating: '',
    category: '',
    apiStatus: apiStatusDetails.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    try {
      this.setState({apiStatus: apiStatusDetails.loading})
      const jwtToken = Cookies.get('jwt_token')
      const {activeOptionId, category, titleSearch, rating} = this.state
      const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${category}&title_search=${titleSearch}&rating=${rating}`

      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)
      console.log(response.ok)
      if (response.ok) {
        const fetchedData = await response.json()
        const updatedData = fetchedData.products.map(product => ({
          title: product.title,
          brand: product.brand,
          price: product.price,
          id: product.id,
          imageUrl: product.image_url,
          rating: product.rating,
        }))

        this.setState({
          productsList: updatedData,
          apiStatus: apiStatusDetails.success,
        })
      }
    } catch (error) {
      this.setState({apiStatus: apiStatusDetails.failure})
    }
  }

  categorySelected = id => {
    this.setState({category: id}, this.getProducts)
  }

  ratingSelected = id => {
    this.setState({rating: id}, this.getProducts)
  }

  onClickClearFilter = () => {
    this.setState(
      {
        activeOptionId: sortbyOptions[0].optionId,
        titleSearch: '',
        rating: '',
        category: '',
      },
      this.getProducts,
    )
  }

  searchValue = inputValue => {
    this.setState({titleSearch: inputValue})
  }

  enterSearchValue = () => {
    this.getProducts()
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-view-image"
        alt="products failure"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state
    if (productsList.length === 0) {
      return (
        <div className="no-product-container">
          <img
            className="no-products"
            alt="no products"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          />
          <h1 className="no-products-heading">No Products Found</h1>
          <p className="no-products-description">
            We could not find any products. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view

  renderProductsDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusDetails.loading:
        return this.renderLoader()
      case apiStatusDetails.failure:
        return this.renderFailureView()
      case apiStatusDetails.success:
        return this.renderProductsList()
      default:
        return null
    }
  }

  render() {
    const {titleSearch, category} = this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          categorySelected={this.categorySelected}
          ratingSelected={this.ratingSelected}
          onClickClearFilter={this.onClickClearFilter}
          searchValue={this.searchValue}
          titleSearch={titleSearch}
          enterSearchValue={this.enterSearchValue}
          category={category}
        />

        {this.renderProductsDetails()}
      </div>
    )
  }
}

export default AllProductsSection
