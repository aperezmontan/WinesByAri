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
        <input type='text' onChange={this.updateSearch} value={this.state.search}/>

        <h1>Listing Products</h1>

        <ul>

          {filteredProducts.map((product) => {
            return <Product product={product} key={product.id}/>
          })}
        </ul>
      </div>
    );
  }
})
