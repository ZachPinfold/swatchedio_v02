import React, { useEffect } from "react";
import Backgroud from "./Background";
import { API, graphqlOperation } from "aws-amplify";
import { closeProfile } from "../../actions/layout";

import { listColorHexs } from "../../graphql/queries";

const Landing = ({ openLogin, test }) => {
  useEffect(() => {
    closeProfile();
    getPosts();
    document.body.style.background = "white";
  }, []);

  console.log(test);

  const getPosts = async () => {
    const result = await API.graphql(
      graphqlOperation(listColorHexs, { format: "json" })
    );
    const obj = JSON.parse(result.data.listColorHexs);
  };

  return <Backgroud openLogin={openLogin} />;
};

export default Landing;
