import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import useStyles from "./styles";
import Header from "./Header";
import Body from "./Body";
import { useSelector } from "react-redux";
import { base_URL } from "../../constants";

const Employer = () => {
  const classes = useStyles();
  const [employer, setEmployer] = useState(null);
  const { id } = useParams();

  const loggedIn = useSelector((state) => state.loggedIn);
  const userType = useSelector((state) => state.user?.accountType);

  const loadEmployer = async (id) => {
    const response = await axios.get(
      base_URL + `/api/employers/${id}`
    );
    setEmployer(response.data.employer);
  };

  useEffect(() => {
    loadEmployer(id);
  }, [id]);

  return (
    <Box className={classes.section}>
      {employer && (
        <Header employer={employer} loggedIn={loggedIn} userType={userType} />
      )}
      {employer && (
        <Body employer={employer} loggedIn={loggedIn} userType={userType} />
      )}
    </Box>
  );
};

export default Employer;
