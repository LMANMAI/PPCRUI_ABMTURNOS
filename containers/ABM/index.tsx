import React from "react";
import { useUserAD } from "../../context/authContext";
import { SideMenuLayout } from "../../components";

const ABMPage = () => {
  const { userAD } = useUserAD();

  console.log(userAD, "userAD");
  return (
    <div>
      <SideMenuLayout>ABMPage</SideMenuLayout>
    </div>
  );
};

export default ABMPage;
