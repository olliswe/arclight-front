import React, { useEffect, useState } from "react";
import { Content, Item, Icon, Input } from "native-base";
import SearchField from "./SearchField";
import { gql } from "apollo-boost";
import { NavigationFocusInjectedProps } from "react-navigation";

interface Props extends NavigationFocusInjectedProps {}

const PendingTab: React.FC<Props> = (props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <Content padder>
      <SearchField setSearchTerm={setSearchTerm} />
    </Content>
  );
};

export default PendingTab;
