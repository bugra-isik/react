import React from "react";
import CategoryList from "./CategoryList";
import Navi from "./Navi";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";
import { Component } from "react";

export default class App extends Component {
  state = {
    currentCategory: "",
    products: [],
  };
  changeCategory = (change) => {
    this.setState({
      currentCategory: change.categoryName,
    });
    this.getProducts(change.id);
  };
  componentDidMount() {
    this.getProducts();
  }
  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          products: data,
        })
      );
  };
  render() {
    let categoryInfo = {
      title: "Kaka List",
    };

    let productInfo = {
      title: "Product List",
    };

    return (
      <div>
        <Container>
          <Navi />
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <ProductList
                currentProduct={this.state.products}
                currentCategory={this.state.currentCategory}
                info={productInfo}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
