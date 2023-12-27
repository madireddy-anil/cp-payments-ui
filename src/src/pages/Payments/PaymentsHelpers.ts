import moment from "moment";
import { PaymentFilterForm } from "./Payments.interface";

export const paymentFilterFormValidation = (
  paymentFilterValues: PaymentFilterForm
) => {
  const isFromToDateSame =
    paymentFilterValues?.fromToDate &&
    moment(paymentFilterValues.fromToDate[0]).format("ll") ===
      moment(paymentFilterValues.fromToDate[1]).format("ll");

  // if dates were same then add time accordingly
  if (paymentFilterValues?.fromToDate && isFromToDateSame) {
    const [start, end] = paymentFilterValues.fromToDate;
    paymentFilterValues.dateFrom = start.startOf("day").format("x");
    paymentFilterValues.dateTo = end.endOf("day").format("x");
  } else {
    paymentFilterValues.dateFrom = paymentFilterValues?.fromToDate?.length
      ? moment(paymentFilterValues.fromToDate[0])?.format("x")
      : undefined;
    paymentFilterValues.dateTo = paymentFilterValues?.fromToDate?.length
      ? moment(paymentFilterValues.fromToDate[1])?.format("x")
      : undefined;
  }
  return paymentFilterValues;
};
