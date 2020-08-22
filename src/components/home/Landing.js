import React, { Component } from "react";
import Backgroud from "./Background";
import { API, graphqlOperation } from "aws-amplify";
import { listColorHexs } from "../../graphql/queries";

class Landing extends Component {
  componentDidMount = () => {
    this.getPosts();
  };

  getPosts = async () => {
    const result = await API.graphql(
      graphqlOperation(listColorHexs, { format: "json" })
    );
    // console.log(result.data);
    const obj = JSON.parse(result.data.listColorHexs);
    // console.log(obj[0].colors);
  };

  render() {
    return <Backgroud />;
  }
}

export default Landing;
