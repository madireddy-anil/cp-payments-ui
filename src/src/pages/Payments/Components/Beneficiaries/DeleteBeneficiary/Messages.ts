import { Notification } from "@payconstruct/design-system";

export const onSuccessBeneDelete = (beneName: string) =>
  Notification({
    type: "success",
    message: `${beneName} has been deleted.`
  });

export const onFailBeneDelete = (beneName: string) =>
  Notification({
    type: "error",
    message: `Error in deleting ${beneName}`,
    description:
      "We apologies for the inconvenience. Please get in touch with your customer service representative."
  });
