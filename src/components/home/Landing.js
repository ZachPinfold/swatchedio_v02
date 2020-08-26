import React, { useEffect } from "react";
import Backgroud from "./Background";
import { API, graphqlOperation } from "aws-amplify";
import { listColorHexs } from "../../graphql/queries";

const Landing = () => {
  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const result = await API.graphql(
      graphqlOperation(listColorHexs, { format: "json" })
    );
    const obj = JSON.parse(result.data.listColorHexs);
  };

  return <Backgroud />;
};

export default Landing;
