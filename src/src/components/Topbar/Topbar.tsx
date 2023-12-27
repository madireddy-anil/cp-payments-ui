import React from "react";
import { Spacer, Topbar as TopbarWrap } from "@payconstruct/design-system";
import { useMatch, useNavigate } from "react-router-dom";

interface ToobarProps {
  title: string;
}

const Topbar: React.FC<ToobarProps> = ({ title }) => {
  const navigate = useNavigate();
  const match = useMatch("/*");
  const deeperPath = match?.pathname.split("/").length ?? 0;

  return (
    <>
      {/* Create same space as the Top bar, because it's use fixed position it scape layout */}
      <Spacer size={56} />
      {/*  */}
      <TopbarWrap
        showBack={deeperPath > 2}
        goBackAction={() => navigate("/payments")}
        title={title}
      />
    </>
  );
};

export { Topbar };
