import React from "react";
import { useUserAD } from "../../context/authContext";
import { SideMenuLayout } from "../../components";
import { Box } from "@chakra-ui/react";

const ABMPage = () => {
  const { userAD } = useUserAD();

  console.log(userAD, "userAD");
  return (
    <div>
      <SideMenuLayout>
        <Box
          as={"main"}
          bg={"white"}
          h={"calc(100vh - 60px)"}
          color={"black"}
          p={2}
        >
          ABMPage
        </Box>
      </SideMenuLayout>
    </div>
  );
};

export default ABMPage;
