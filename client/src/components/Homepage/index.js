import React, { useEffect, useState } from "react";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";
import SectionFour from "./SectionFour";
import axios from "axios";
import { base_URL } from "../../constants";

const Homepage = () => {
  const [homepageData, setHomepageData] = useState();

  const loadData = async () => {
    try {
      const response = await axios.get(base_URL + "/api/admin");
      setHomepageData(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <SectionOne />
      <SectionTwo />
      <SectionThree homepageData={homepageData} />
      <SectionFour />
    </div>
  );
};

export default Homepage;
