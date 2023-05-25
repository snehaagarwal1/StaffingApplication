import { Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { base_URL } from "../../../constants";

const NotificationActions = ({
  selection,
  setSelection,
  notifications,
  getNotifications,
  clearPressed,
  setClearPressed,
}) => {
  const markAsRead = async () => {
    try {
      const response = await axios.patch(
        base_URL +`/api/notifications/markAsRead`,
        { selectionList: selection }
      );
      console.log(response.data);
      getNotifications();
      setSelection([]);
    } catch (error) {
      console.log(error.response);
    }
  };
  const markAsUnread = async () => {
    try {
      const response = await axios.patch(
        base_URL +`/api/notifications/markAsUnread`,
        { selectionList: selection }
      );
      console.log(response.data);
      getNotifications();
      setSelection([]);
    } catch (error) {
      console.log(error.response);
    }
  };

  const clearAll = async () => {
    try {
      const response = await axios.delete(
        base_URL +`/api/admin/clearNotifications`
      );
      console.log(response.data);
      getNotifications();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
      {selection.length > 0 && (
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="caption">
            Selected: {selection.length}
          </Typography>
          <Button
            size="small"
            onClick={() => {
              setClearPressed(!clearPressed);
              setSelection([]);
            }}
          >
            Clear
          </Button>
        </Stack>
      )}
      <Stack direction="row" spacing={1} sx={{ ml: "auto" }}>
        <Button
          size="small"
          disableElevation
          onClick={markAsRead}
          disabled={selection.length === 0}
        >
          Mark As Read
        </Button>
        <Button
          size="small"
          disableElevation
          onClick={markAsUnread}
          disabled={selection.length === 0}
        >
          Mark As Unread
        </Button>
        <Button
          size="small"
          color="error"
          disableElevation
          onClick={clearAll}
          disabled={notifications.length === 0}
        >
          Clear All
        </Button>
      </Stack>
    </Stack>
  );
};

export default NotificationActions;
