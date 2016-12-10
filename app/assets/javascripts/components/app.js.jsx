var App = React.createClass ({
  getInitialState: function(){
    return {
      currentPage: 1,
      defaultPaginationValue: 2,
      lastPage: Math.ceil(this.props.products.length/2),
      productCount: this.props.products.length,
      productsPerPage: '',
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
      return nil
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
    console.log("Current Page", this.state.currentPage);
    if (this.state.currentPage == 1){
      return nil
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
    this.setState({ search: e.target.value });
  },
  render () {
    var filteredProducts = []
    if (this.state.search.length > 1){
      filteredProducts = this.props.products.filter(
        (product) => {
          search_string = Object.values(product).filter((el) => { return el != null; }).join("")
          return search_string.toLowerCase().indexOf(this.state.search.toLowerCase()) != -1;
        }

      );
    } else {
      filteredProducts = this.props.products;
    }
    // USE THIS TO IMPLEMENT BETTER SEARCH
    // else if ( this.state.search.indexOf(":") != -1){
    //   searchObjectString = '{' + this.state.search + '}'
    // }

    // PAGINATION
    if (!this.state.productsPerPage){
      paginatedProducts =  filteredProducts.slice(2 * (this.state.currentPage - 1), 2 * this.state.currentPage)
    } else {
    console.log("Calculating pagination");
      paginatedProducts =  filteredProducts.slice(this.state.productsPerPage * (this.state.currentPage - 1), this.state.productsPerPage * this.state.currentPage)
    }

    return (
      <div>
        <div className="apiDataButtons">
          <button data-disable-with="Please wait..." name="button" onClick={this.loadDataAjax} type="submit">Load API Data !!</button>
          <button data-disable-with="Please wait..." name="button" onClick={this.deleteDataAjax} type="submit">Delete API Data</button>
        </div>
        <div>
          <button data-disable-with="Please wait..." name="button" onClick={this.previousPage} type="submit">Previous</button>
          <h4>Page {this.state.currentPage} of {this.state.lastPage}</h4>
          <button data-disable-with="Please wait..." name="button" onClick={this.nextPage} type="submit">Next</button>
        </div>

        <h3>Products</h3>

        <button data-disable-with="Please wait..." name="button" onClick={this.newProduct} type="submit">New Product</button>
        <div>
          <label for="paginationControl">Products per page</label>
          <input className='form-control' type='text' id="paginationControl" onChange={this.updatePagination} value={this.state.productsPerPage} placeholder='2'/>
        </div>
        <div>
          <input className='form-control' type='text' onChange={this.updateSearch} value={this.state.search} placeholder='Search Products'/>
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
