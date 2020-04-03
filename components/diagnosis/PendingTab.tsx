import React, { useState } from "react";
import { Content } from "native-base";
import SearchField from "./SearchField";

const PendingTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return <Content padder></Content>;
};

export default PendingTab;
