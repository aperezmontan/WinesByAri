var App = React.createClass ({
  getInitialState: function(){
    var lastPage;
    if (this.props.products.length == 0) {
      lastPage = 1;
    } else {
      lastPage = Math.ceil(this.props.products.length/2);
    }
    return {
      currentPage: 1,
      defaultProductsPerPage: 2,
      formParameters: { formType: '', isNeeded: false, product: '' },
      products: this.props.products,
      lastPage: lastPage,
      productCount: this.props.products.length,
      productsPerPage: '2',
      progress: 0,
      search: '',
    };
  },
  deleteDataAjax: function(event){
    event.preventDefault();
    var xhr = new XMLHttpRequest(),
    method = "POST",
    url = "/delete_data";
    that = this;

    xhr.addEventListener("progress", updateProgress);
    xhr.addEventListener("load", function(e){

      // that.setState({ products: JSON.parse(xhr.responseText) }).bind(this);
    }.false);
    xhr.addEventListener("error", transferFailed);
    xhr.addEventListener("abort", transferCanceled);

    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log(JSON.parse(xhr.responseText));
        console.log("Deleting")
        products = JSON.parse(xhr.responseText)
        that.setState({ products: products })
        that.setState({ currentPage: 1 })
        that.setState({ productCount: products.length })
        if (products.length == 0) {
          that.setState({ lastPage: 1 })
        } else {
          that.setState({ lastPage: Math.ceil(products.length/that.state.productsPerPage) })
        }
      }
    };

    xhr.send();

    function updateProgress (oEvent) {
      if (oEvent.lengthComputable) {
        var percentComplete = oEvent.loaded / oEvent.total;
        console.log(percentComplete);
        // ...
      } else {
        // Unable to compute progress information since the total size is unknown
      }
    }


    function transferFailed(evt) {
      console.log("An error occurred while transferring the file.");
    }

    function transferCanceled(evt) {
      console.log("The transfer has been canceled by the user.");
    }
  },
  loadDataAjax: function(event){
    event.preventDefault();
    var xhr = new XMLHttpRequest(),
    method = "POST",
    url = "/request_data";
    that = this;

    xhr.addEventListener("progress", updateProgress);
    xhr.addEventListener("load", function(e){

      // that.setState({ products: JSON.parse(xhr.responseText) }).bind(this);
    }.false);
    xhr.addEventListener("error", transferFailed);
    xhr.addEventListener("abort", transferCanceled);

    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        // console.log(JSON.parse(xhr.responseText));
        products = JSON.parse(xhr.responseText)
        that.setState({ products: products })
        that.setState({ currentPage: 1 })
        that.setState({ productCount: products.length })
        if (products.length == 0) {
          that.setState({ lastPage: 1 })
        } else {
          that.setState({ lastPage: Math.ceil(products.length/that.state.productsPerPage) })
        }
      }
    };

    xhr.send();

    function updateProgress (oEvent) {
      if (oEvent.lengthComputable) {
        var percentComplete = oEvent.loaded / oEvent.total;
        console.log(percentComplete);
        console.log("Updating... ")
        that.setState({progress: percentComplete})
        // ...
      } else {
        // Unable to compute progress information since the total size is unknown
      }
    }


    function transferFailed(evt) {
      console.log("An error occurred while transferring the file.");
    }

    function transferCanceled(evt) {
      console.log("The transfer has been canceled by the user.");
    }
  },
  nextPage: function(e){
    e.preventDefault();
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
  previousPage: function(e){
    e.preventDefault();
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
    this.setState({ currentPage: 1 })
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

    // CODE TO FILTER PRODUCTS
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
    /////////////////////////////////////

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
    var productCount = this.state.productCount;

    var parameters = null;

    if (productCount == 1){
      productCountHeader = productCount + " Product";
    } else {
      productCountHeader = productCount + " Products";
    }

    if (this.state.formParameters.isNeeded){
      parameters = this.state.formParameters;
    }

    return (
      <div>
        <div className="row flex-items-xs-center flex-items-sm-center">
          <div className="col-xs-12 col-sm-4">
            <button className="btn btn-lg btn-success col-xs-12 col-sm-12" data-disable-with="Please wait..." name="button" onClick={this.loadDataAjax} type="submit">Load API Data !!</button>
            </div>
          <div className="col-xs-12 col-sm-4">
            <button className="btn btn-lg btn-danger col-xs-12 col-sm-12" data-disable-with="Please wait..." name="button" onClick={this.deleteDataAjax} type="submit">Delete API Data</button>
          </div>
          <div className="col-xs-12 col-sm-4">
            <button className="btn btn-lg btn-primary col-xs-12 col-sm-12" data-disable-with="Please wait..." name="button" onClick={this.newProduct} type="submit">New Product</button>
          </div>
        </div>

        <Form parameters={parameters}/>

        <div className="row">
          <div className="col-xs-12">
            <nav aria-label="...">
              <ul className="pager">
                <li><a href="#" onClick={this.previousPage}>Previous</a></li>
                <li><PaginationInfo currentPage={currentPage} lastPage={lastPage}/></li>
                <li><a href="#" onClick={this.nextPage}>Next</a></li>
              </ul>
                <span className="text-center"><h3>{productCountHeader}</h3></span>
            </nav>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-9">
            <div className="input-group">
              <span className="input-group-addon" id="search-addon3">Search</span>
              <input type="text" className="form-control" onChange={this.updateSearch} value={this.state.search} placeholder='Malbec, Argentina, varietal: 2000...'/>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="input-group">
              <input type="text" className="form-control" onChange={this.updatePagination} value={this.state.productsPerPage} placeholder='2'/>
              <span className="input-group-addon" id="pagination-control-addon3">Products per page</span>
            </div>
          </div>
        </div>

        <ProgressBar progress={this.state.progress}/>
      </div>
    );
  }
})

var Form = React.createClass({
  render(){
    return (
      <div></div>
    );
  }
})

var PaginationInfo = React.createClass({
  render(){
    return (
      <span> Page {this.props.currentPage} of {this.props.lastPage} </span>
    );
  }
})

var ProgressBar = React.createClass({
  render(){
      progress = (this.props.progress * 100) + '%'
    return(
      <div className="progress">
        <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
          {progress}
        </div>
      </div>
    );
  }
})
