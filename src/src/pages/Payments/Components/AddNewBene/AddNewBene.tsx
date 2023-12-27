import React from "react";
import { Modal } from "@payconstruct/design-system";

interface AddNewBeneProps {
  show: boolean;
  title?: string;
  toggleShow: (v: boolean) => void;
}

const AddNewBene: React.FC<AddNewBeneProps> = ({
  show,
  toggleShow,
  title = "Add New Beneficiary"
}) => {
  return (
    <Modal
      modalView={show}
      modalWidth={500}
      title={title}
      onCancelText={"Cancel"}
      onOkText={"Add Beneficiary"}
      //   onClickOk={() => form.submit()}
      onClickCancel={() => toggleShow(false)}
      description={<div>Coming soon...</div>}
    />
  );
};

export { AddNewBene };
