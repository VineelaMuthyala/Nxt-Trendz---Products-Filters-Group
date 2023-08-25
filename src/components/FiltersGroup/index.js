import './index.css'

const FiltersGroup = props => {
  const {
    ratingsList,
    categoryOptions,
    categorySelected,
    ratingSelected,
    onClickClearFilter,
    searchValue,
    titleSearch,
    enterSearchValue,
    category,
  } = props

  const onChangeInputValue = event => {
    const inputValue = event.target.value

    searchValue(inputValue)
  }

  const onEnterSearchValue = event => {
    if (event.key === 'Enter') {
      enterSearchValue()
    }
  }

  console.log(category)

  return (
    <div className="filters-group-container">
      <input
        type="search"
        className="input-search"
        placeholder="Search"
        onChange={onChangeInputValue}
        value={titleSearch}
        onKeyDown={onEnterSearchValue}
      />
      <h1 className="filter-group-heading">Category</h1>
      {/* Replace this element with your code */}
      <ul>
        {categoryOptions.map(eachItem => (
          <li key={eachItem.categoryId}>
            <button
              className={`category-button ${
                eachItem.categoryId === category ? 'blue' : ''
              }`}
              type="button"
              onClick={() => categorySelected(eachItem.categoryId)}
            >
              <p>{eachItem.name}</p>
            </button>
          </li>
        ))}
      </ul>
      <h1 className="filter-group-heading">Rating</h1>
      <ul>
        {ratingsList.map(eachItem => (
          <li key={eachItem.ratingId} className="rating-list-item">
            <button
              type="button"
              className="category-button"
              onClick={() => ratingSelected(eachItem.ratingId)}
            >
              <img
                className="rating-image"
                alt={`rating${eachItem.ratingId}`}
                src={eachItem.imageUrl}
              />
              <span className="rating-text">& Up</span>
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="clear-filter-button"
        onClick={onClickClearFilter}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
import './index.css'

const FiltersGroup = props => {
  const {
    ratingsList,
    categoryOptions,
    categorySelected,
    ratingSelected,
    onClickClearFilter,
    searchValue,
    titleSearch,
    enterSearchValue,
  } = props

  const onChangeInputValue = event => {
    const inputValue = event.target.value

    searchValue(inputValue)
  }

  const onEnterSearchValue = event => {
    if (event.key === 'Enter') {
      enterSearchValue()
    }
  }

  return (
    <div className="filters-group-container">
      <input
        type="search"
        className="input-search"
        placeholder="Search"
        onChange={onChangeInputValue}
        value={titleSearch}
        onKeyDown={onEnterSearchValue}
      />
      <h1 className="filter-group-heading">Category</h1>
      {/* Replace this element with your code */}
      <ul>
        {categoryOptions.map(eachItem => (
          <li key={eachItem.categoryId}>
            <button
              className="category-button"
              type="button"
              onClick={() => categorySelected(eachItem.categoryId)}
            >
              <p>{eachItem.name}</p>
            </button>
          </li>
        ))}
      </ul>
      <h1 className="filter-group-heading">Rating</h1>
      <ul>
        {ratingsList.map(eachItem => (
          <li key={eachItem.ratingId} className="rating-list-item">
            <button
              type="button"
              className="category-button"
              onClick={() => ratingSelected(eachItem.ratingId)}
            >
              <img
                className="rating-image"
                alt={`rating${eachItem.ratingId}`}
                src={eachItem.imageUrl}
              />
              <span className="rating-text">& Up</span>
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="clear-filter-button"
        onClick={onClickClearFilter}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
