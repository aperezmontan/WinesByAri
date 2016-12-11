var App = React.createClass ({
  getInitialState: function(){
    return {
      currentPage: 1,
      defaultProductsPerPage: 2,
      products: this.props.products,
      lastPage: Math.ceil(this.props.products.length/2),
      productCount: this.props.products.length,
      productsPerPage: '2',
      search: '',
    };
  },
  deleteDataAjax: function(){
    var xhr = new XMLHttpRequest(),
    method = "POST",
    url = "/delete_data";

    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          console.log(xhr.responseText);
      }
    };
    xhr.send();
  },
  loadDataAjax: function(){
    var xhr = new XMLHttpRequest(),
    method = "POST",
    url = "/request_data";

    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          console.log(xhr.responseText);
      }
    };
    xhr.send();
  },
  nextPage: function(){
    if (this.state.currentPage == this.state.lastPage){
      return null
    } else {
      this.setState({
        currentPage: this.state.currentPage + 1
      })
    }
  },
  newProduct: function(){
    window.location.href = "/products/new";
  },
  previousPage: function(){
    if (this.state.currentPage == 1){
      return null
    } else {
      this.setState({
        currentPage: this.state.currentPage - 1
      })
    }
  },
  rowClick: function(){
    this.setState({
      clicked: !this.state.clicked,
    })
  },
  updatePagination: function(e) {
    this.setState({ productsPerPage: e.target.value });
    if (!e.target.value){
      this.setState({ lastPage: Math.ceil(this.state.productCount/2) })
    } else {
      this.setState({ lastPage: Math.ceil(this.state.productCount/e.target.value)})
    }
  },
  updateSearch: function(e) {
    if (!this.state.productsPerPage){
      productsPerPage = this.state.defaultProductsPerPage;
    } else {
      productsPerPage = this.state.productsPerPage;
    }
    search = e.target.value;
    this.setState({ currentPage: 1 })
    this.setState({ search: e.target.value });
    var filteredProducts = []
    if (search.length > 1){
      filteredProducts = this.props.products.filter(
        (product) => {
          search_string = Object.values(product).filter((el) => { return el != null; }).join("")
          return search_string.toLowerCase().indexOf(search.toLowerCase()) != -1;
        }

      );
    } else {
      filteredProducts = this.props.products;
    }
    this.setState({ products: filteredProducts })
    this.setState({ productCount: filteredProducts.length })
    this.setState({ lastPage: Math.ceil(filteredProducts.length/productsPerPage) })
  },
    // USE THIS TO IMPLEMENT BETTER SEARCH
    // else if ( this.state.search.indexOf(":") != -1){
    //   searchObjectString = '{' + this.state.search + '}'
    // }
  render () {

    // PAGINATION
    if (!this.state.productsPerPage){
      paginatedProducts =  this.state.products.slice(2 * (this.state.currentPage - 1), 2 * this.state.currentPage)
    } else {
      paginatedProducts =  this.state.products.slice(this.state.productsPerPage * (this.state.currentPage - 1), this.state.productsPerPage * this.state.currentPage)
    }

    var currentPage = this.state.currentPage;
    var lastPage = this.state.lastPage;

    return (
      <div className="container">
        <div className="apiDataButton">
          <button className="btn btn-lg btn-success" data-disable-with="Please wait..." name="button" onClick={this.loadDataAjax} type="submit">Load API Data !!</button>
        </div>
        <div className="apiDataButton">
          <button className="btn btn-lg btn-danger" data-disable-with="Please wait..." name="button" onClick={this.deleteDataAjax} type="submit">Delete API Data</button>
        </div>

        <div className="form-group form-inline">
          <button className="form-control" data-disable-with="Please wait..." name="button" onClick={this.previousPage} type="submit">&#60;</button>
          <h4 className="form-control-static"> Page {currentPage} of {lastPage} </h4>
          <button className="form-control" data-disable-with="Please wait..." name="button" onClick={this.nextPage} type="submit">&#62;</button>
        </div>

        <h3>Products</h3>

        <button data-disable-with="Please wait..." name="button" onClick={this.newProduct} type="submit">New Product</button>

        <div className="form-group form-inline searchInput paginationInput">
          <label htmlFor="paginationControl">Products per page</label>
          <input className='form-control' type='text' id="paginationControl" onChange={this.updatePagination} value={this.state.productsPerPage} placeholder='2'/>
          <label htmlFor="search">Search</label>
          <input className='form-control' type='text' id="search" onChange={this.updateSearch} value={this.state.search} placeholder='Malbec, Argentina, varietal: 2000...'/>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th className="text-center">Price min</th>
              <th className="text-center">Price max</th>
              <th className="text-center">Price retail</th>
              <th className="text-center">Type</th>
              <th className="text-center">Varietal(Year)</th>
              <th className="text-center">View</th>
              <th className="text-center">Edit</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product) => {
              return [<Product product={product} onClick={this.rowClick} key={product._id["$oid"]}/>, <ProductDescription product={product} key={product._id["$oid"] + 'd'}/>]
            })}
          </tbody>
        </table>
      </div>
    );
  }
})
