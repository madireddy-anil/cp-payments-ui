import React, { useState } from "react";
import { Colors, Modal, Text } from "@payconstruct/design-system";
import { useMutation } from "@apollo/client";
import { removeBeneficiary } from "state/contextProviders/apollo/Mutations/Beneficiary";
import { onFailBeneDelete, onSuccessBeneDelete } from "./Messages";

interface AddNewBeneProps {
  show: boolean;
  beneId: string | undefined;
  beneName: string | undefined;
  toggleShow: (v: boolean) => void;
  callBackOnBeneDelete: () => void;
}

const DeleteBeneficiary: React.FC<AddNewBeneProps> = ({
  show,
  beneId,
  beneName,
  toggleShow,
  callBackOnBeneDelete
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteBene] = useMutation(removeBeneficiary, {
    onCompleted: () => {
      /* since bene delete is taking few seconds to update, 
      added setTimeout once this is fixed from BE we could ignore it. */
      const timeout = setTimeout(() => {
        setLoading(false);
        toggleShow(false);
        callBackOnBeneDelete();
        onSuccessBeneDelete(beneName ?? "");
      }, 3000);
      return () => clearTimeout(timeout);
    },
    onError: () => {
      setLoading(false);
      onFailBeneDelete(beneName ?? "");
    }
  });

  return (
    <Modal
      modalView={show}
      modalWidth={600}
      title={`Are you sure you want to delete ${beneName}?`}
      onCancelText={"Cancel"}
      onOkText={"Delete"}
      onClickOk={() => {
        deleteBene({ variables: { beneficiary: { id: beneId ?? "" } } });
        setLoading(true);
      }}
      onClickCancel={() => toggleShow(false)}
      btnLoading={loading}
      description={
        <Text color={Colors.grey.neutral900} size="small">
          After you delete this beneficiary, you will not be able to retrieve
          the same record. You can add this beneficiary again to your
          beneficiary list using the ‘Add New Beneficiary’ button.
        </Text>
      }
    />
  );
};

export { DeleteBeneficiary };
