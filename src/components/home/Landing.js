import React, { Component } from "react";
import Backgroud from "./Background";
import { API, graphqlOperation } from "aws-amplify";
import { listColorHexs } from "../../graphql/queries";
import axios from "axios";

class Landing extends Component {
  componentDidMount = () => {
    this.getPosts();

    // axios
    //   .all([axios.get(`api/palette`), axios.get(`/api/breeds/image/random`)])
    //   .then(
    //     axios.spread((user, dog) => {
    //       const users = user.data;
    //       const dogs = dog.data;
    //       console.log(users, dogs);
    //     })
    //   );
  };

  getPosts = async () => {
    const result = await API.graphql(graphqlOperation(listColorHexs));
    console.log(result);
    // const obj = JSON.parse(result.data.listColorHexs).body;
    // console.log(JSON.parse(obj));
  };

  render() {
    return <Backgroud />;
  }
}

export default Landing;
