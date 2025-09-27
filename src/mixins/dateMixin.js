import moment from "moment-business-days";

export default {
  methods: {
    formatDate(date) {
      return moment(date, "YYYY-MM-DD").format("Do MMM YY");
    },
    getEndDate(start, days) {
      start = new Date(start);
      start.setDate(start.getDate() + days);
      return start;
    },
    getBusinessEndDate(days) {
      const start = moment().format("DD-MM-YYYY");
      return moment(`${start}`, "DD-MM-YYYY").businessAdd(days)._d;
    }
  }
};
