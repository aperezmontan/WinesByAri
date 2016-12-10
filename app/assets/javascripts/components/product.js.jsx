var Product = React.createClass ({
  propTypes: {
    externalId: React.PropTypes.node,
    name: React.PropTypes.string,
    url: React.PropTypes.string,
    description: React.PropTypes.string,
    priceMin: React.PropTypes.node,
    priceMax: React.PropTypes.node,
    priceRetail: React.PropTypes.node,
    type: React.PropTypes.string,
    year: React.PropTypes.string,
    id: React.PropTypes.node
  },
  render () {
    return (
      <div>
        <div>External: {this.props.product.externalId}</div>
        <div>Name: {this.props.product.name}</div>
        <div>Url: {this.props.product.url}</div>
        <div>Description: {this.props.product.description}</div>
        <div>Price Min: {this.props.product.priceMin}</div>
        <div>Price Max: {this.props.product.priceMax}</div>
        <div>Price Retail: {this.props.product.priceRetail}</div>
        <div>Type: {this.props.product.type}</div>
        <div>Year: {this.props.product.year}</div>
        <div>Id: {this.props.product.id}</div>
      </div>
    );
  }
})

