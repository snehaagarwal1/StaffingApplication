import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import WhyWorkWithUsPreview from "../Profile/Employer/WhyWorkWithUsPreview";
import { base_URL } from "../../constants";
moment().format();

const Body = ({ employer }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  const getJobData = async () => {
    const response = await axios.get(
      base_URL + `/api/jobs?jobCategory=All&jobType=All&salaryRange=All&empId=${employer._id}`
    );
    const jobsArray = await response.data.jobs;
    setJobs(jobsArray);
  };

  useEffect(() => {
    getJobData();
  }, []);

  return (
    <Box
      className={classes.container}
      display="flex"
      flexDirection="column"
      py={2}
    >
      <Accordion sx={{ width: 1, my: 0.5 }} square defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">About the Organization</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{employer.about}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ width: 1, my: 0.5 }} square defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Mission</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{employer.mission}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ width: 1, my: 0.5 }} square defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Why work with us?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {employer.whyWorkWithUs.map((benefit, index) => (
            <WhyWorkWithUsPreview
              index={index}
              benefit={benefit}
              variant="body1"
              key={index}
            />
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{ width: 1, my: 0.5 }}
        square
        disabled={employer.openings === 0 && true}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6">Open Jobs</Typography>
            <Avatar
              sx={{
                fontSize: "0.75rem",
                width: "1.55rem",
                height: "1.55rem",
                bgcolor: "primary.dark",
              }}
            >
              {employer.openings}
            </Avatar>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell className={classes.tableHide}>Posted On</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((job) => (
                <TableRow
                  key={job._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {job.title}
                  </TableCell>
                  <TableCell className={classes.tableHide}>
                    {moment(job.postDate).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell>
                    {moment(job.dueDate).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      disableElevation
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/jobs/${job._id}`);
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Body;
