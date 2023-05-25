import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "../styles";
import axios from "axios";
import NotificationPreviewAdmin from "./NotificationPreviewAdmin";
import NotificationActionsAdmin from "./NotificationActionsAdmin";
import { base_URL } from "../../../constants";

const NotificationsAdmin = () => {
  const classes = useStyles();

  const [notifications, setNotifications] = useState([]);

  const [selection, setSelection] = useState([]);

  const [clearPressed, setClearPressed] = useState(false);

  const getNotifications = async () => {
    try {
      const response = await axios.get(
        base_URL + `/api/admin/notifications`
      );
      setNotifications(response.data.notifications);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <Box className={classes.panelWrapper}>
      <Typography variant="h5">Notifications</Typography>

      <NotificationActionsAdmin
        selection={selection}
        setSelection={setSelection}
        notifications={notifications}
        getNotifications={getNotifications}
        clearPressed={clearPressed}
        setClearPressed={setClearPressed}
      />

      <Divider sx={{ mt: 1, mb: 3 }} />

      {notifications.length > 0
        ? notifications.map((notification, i) => (
            <NotificationPreviewAdmin
              key={notification._id}
              notification={notification}
              notifications={notifications}
              selection={selection}
              setSelection={setSelection}
              getNotifications={getNotifications}
              clearPressed={clearPressed}
            />
          ))
        : "You have no notifications."}
    </Box>
  );
};

export default NotificationsAdmin;
