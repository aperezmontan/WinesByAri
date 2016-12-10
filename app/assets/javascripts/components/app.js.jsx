// import "bootstrap/min/"

var App = React.createClass ({
  getInitialState: function(){
    return { search: '' };
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
    return (
      <div>
        <h3>Products</h3>

        <input className='form-control' type='text' onChange={this.updateSearch} value={this.state.search} placeholder='Search Products'/>

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
            {filteredProducts.map((product) => {
              return <Product product={product} key={product._id["$oid"]}/>
            })}
          </tbody>
        </table>
      </div>
    );
  }
})
              // <th>Description</th>
              // <th>Url</th>
