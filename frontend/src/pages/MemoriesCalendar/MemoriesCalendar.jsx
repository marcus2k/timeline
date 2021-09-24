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
  getDatesWithMemoriesByMonthAndYear,
  setChosenDate,
} from "../../actions/calendar";
import { getMemoriesByDate } from "../../services/calendarService";
import MemoryCard from "./MemoryCard";
import { convertUTCtoDate } from "../../utils/datetime";

const useStyles = makeStyles((theme) => ({
  calendar: {
    width: "100%",
    height: "auto",
    padding: theme.spacing(2, 0),
  },
  highlight: {
    backgroundColor: COLORS.PRIMARY_PURPLE,
  },
}));

const MemoriesCalendar = () => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  // const [selectedDay, setSelectedDay] = useState(new Date().getUTCDate());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getUTCMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getUTCFullYear());
  const [memoriesOfSelectedDate, setMemoriesOfSelectedDate] = useState([]);
  const dispatch = useDispatch();
  const markedDates = useSelector((state) => state.calendar.markedDates);
  const selectedDate = useSelector((state) => state.calendar.selectedDate);

  const onYearOrMonthChange = (newDate) => {
    // setSelectedDay(newDate.getUTCDate());
    setSelectedMonth(newDate.getUTCMonth());
    setSelectedYear(newDate.getUTCFullYear());
  };

  const onDateChange = async (newDate) => {
    // setSelectedDay(newDate.getUTCDate());
    // setSelectedMonth(newDate.getUTCMonth());
    // setSelectedYear(newDate.getUTCFullYear());
    dispatch(setChosenDate(newDate));
    const memories = await getMemoriesByDate(newDate);
    setMemoriesOfSelectedDate(memories);
  };

  // const mark = ["06-09-2021", "07-09-2021", "09-09-2021"];

  useEffect(() => {
    dispatch(getDatesWithMemoriesByMonthAndYear(selectedMonth, selectedYear));
  }, [selectedMonth, selectedYear, dispatch]);

  return (
    <>
      <Box display="flex" justifyContent="center">
        <PrivatePageHeader
          text="Calendar"
          icon={
            <TodayIcon
              style={{ fontSize: "30pt", color: COLORS.PRIMARY_PURPLE }}
            />
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
        {memoriesOfSelectedDate.length > 0 &&
          memoriesOfSelectedDate.map((memory) => (
            <MemoryCard memory={memory} key={memory.memoryId} />
          ))}
      </Box>
    </>
  );
};

export default MemoriesCalendar;
