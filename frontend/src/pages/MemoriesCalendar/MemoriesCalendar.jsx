import "react-calendar/dist/Calendar.css";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { Box, makeStyles, Typography } from "@material-ui/core";
import PrivatePageHeader from "../../components/layout/PrivatePageHeader";
import TodayIcon from "@material-ui/icons/Today";
import { COLORS } from "../../utils/colors";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  addMemoriesOfDateToStore,
  getDatesWithMemoriesByMonthAndYear,
  setChosenDate,
} from "../../actions/calendar";
import MemoryCard from "./MemoryCard";
import { convertUTCtoDate } from "../../utils/datetime";
import { setAlert } from "../../actions/alert";
import { getMemoriesByDate } from "../../services/calendarService";

const useStyles = makeStyles((theme) => ({
  calendar: {
    width: "100%",
    height: "auto",
    padding: theme.spacing(2, 0),
  },
  highlight: {
    backgroundColor: COLORS.PRIMARY_PURPLE,
  },
  todayIcon: {
    fontSize: "30pt", 
    color: COLORS.PRIMARY_PURPLE
  },
}));

const MemoriesCalendar = () => {
  const classes = useStyles();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getUTCMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getUTCFullYear());
  const dispatch = useDispatch();
  const markedDates = useSelector((state) => state.calendar.markedDates);
  const selectedDate = useSelector((state) => state.calendar.selectedDate);
  const memoriesByDate = useSelector((state) => state.calendar.memoriesByDate);

  const onYearOrMonthChange = (newDate) => {
    setSelectedMonth(newDate.getMonth());
    setSelectedYear(newDate.getUTCFullYear());
  };

  const onDateChange = async (newDate) => {
    dispatch(setChosenDate(newDate));
    setSelectedMonth(newDate.getMonth());
    setSelectedYear(newDate.getUTCFullYear());
  };

  // const mark = ["06-09-2021", "07-09-2021", "09-09-2021"];

  useEffect(() => {
    dispatch(getDatesWithMemoriesByMonthAndYear(selectedMonth, selectedYear));
  }, [dispatch, selectedMonth, selectedYear]);

  useEffect(() => {
    const getMemoriesBySelectedDate = async () => {
      try {
        const memories = await getMemoriesByDate(new Date(selectedDate));
        dispatch(addMemoriesOfDateToStore(memories, new Date(selectedDate)));
      } catch (err) {
        dispatch(setAlert(err.message, "error"));
      }
    };
    getMemoriesBySelectedDate();
  }, [dispatch, selectedDate]);

  const getMemories = () => {
    let cachedMemory = memoriesByDate.find(
      (obj) => obj.date === new Date(selectedDate).toLocaleDateString()
    );
    return cachedMemory ? cachedMemory.memories : [];
  };
  return (
    <>
      <Box display="flex" justifyContent="center">
        <PrivatePageHeader
          text="Calendar"
          icon={
            <TodayIcon className={classes.todayIcon} />
          }
        />
      </Box>
      <Box paddingX={1}>
        <Calendar
          onChange={(newDate) => onDateChange(newDate)}
          onClickMonth={(newDate) => onYearOrMonthChange(newDate)}
          onClickYear={(newDate) => onYearOrMonthChange(newDate)}
          value={new Date(selectedDate)}
          className={classes.calendar}
          tileClassName={({ date, view }) => {
            if (
              markedDates &&
              markedDates.find((x) => x === moment(date).format("DD-MM-YYYY"))
            ) {
              return `${classes.highlight}`;
            }
          }}
        />
      </Box>
      <Box padding={2}>
        <Typography variant="h4" align="center">
          Memories made on {convertUTCtoDate(selectedDate)}
        </Typography>
      </Box>
      <Box padding={2} marginBottom={7}>
        {getMemories().map((memory) => (
          <MemoryCard memory={memory} key={memory.memoryId} />
        ))}
      </Box>
    </>
  );
};

export default MemoriesCalendar;
