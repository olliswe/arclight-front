import React, { useState } from "react";
import { Content, Item, Icon, Input } from "native-base";
import SearchField from "./SearchField";

const ArchivedTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <Content padder>
      <SearchField setSearchTerm={setSearchTerm} />
    </Content>
  );
};

export default ArchivedTab;
