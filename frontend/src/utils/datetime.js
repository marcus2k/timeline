import moment from "moment";

export const convertUTCtoLocalDisplay = (timestamp) => {
  return moment
    .utc(timestamp)
    .local()
    // .format("YYYY-MM-DD HH:mm A")
    .format("DD MMM YYYY — HH:mm A")
}

export const convertUTCtoDate = (timestamp) => {
  return moment
    .utc(timestamp)
    .local()
    // .format("YYYY-MM-DD HH:mm A")
    .format("DD MMM YYYY")
}
