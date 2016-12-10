var Product = React.createClass ({
  propTypes: {
    externalId: React.PropTypes.number,
    name: React.PropTypes.string,
    url: React.PropTypes.string,
    description: React.PropTypes.string,
    priceMin: React.PropTypes.number,
    priceMax: React.PropTypes.number,
    priceRetail: React.PropTypes.number,
    type: React.PropTypes.string,
    year: React.PropTypes.string,
    id: React.PropTypes.string
  },
  expandRow: function(){
    alert("You clicked the row !");
  },
  render () {
    return (
      <tr data-toggle="collapse" className="accordion-toggle">
        <td>{this.props.product.name}</td>
        <td className="text-center">{parseFloat(this.props.product.price_min).toFixed(2)}</td>
        <td className="text-center">{parseFloat(this.props.product.price_max).toFixed(2)}</td>
        <td className="text-center">{parseFloat(this.props.product.price_retail).toFixed(2)}</td>
        <td className="text-center">{this.props.product.type}</td>
        <td className="text-center">{this.props.product.year}</td>
        <td className="text-center"><a href={'products/' + this.props.product._id["$oid"]}>#</a></td>
        <td className="text-center"><a href={'products/' + this.props.product._id["$oid"] + '/edit'}>#</a></td>
        <td className="text-center"><a data-confirm="Are you sure?" data-method="delete" href={'products/' + this.props.product._id["$oid"]} rel="nofollow">#</a></td>
      </tr>
    );
  }
})

var ProductDescription = React.createClass({
  render(){
    return (
      <tr>
        <td className="hiddenRow">
            <div className="accordian-body collapse">
              <h1>Hi from the hiddenRow</h1>
            </div>
        </td>
      </tr>
    );
  }
})

        // <td>{this.props.product.description}</td>
        // <td>{this.props.product.url}</td>
