import React from "react";
import { Icon, Input, Item, Button, Spinner } from "native-base";
import { StyleSheet } from "react-native";

interface Props {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  handleSubmit: () => void;
}

const SearchField: React.FC<Props> = (props) => {
  return (
    <Item>
      <Input
        placeholder="Search by Patient Name or Case ID"
        onChangeText={(text) => props.setSearchTerm(text)}
        onSubmitEditing={() => !props.loading && props.handleSubmit()}
      />
      <Button
        bordered
        primary
        onPress={props.handleSubmit}
        disabled={props.loading}
        style={styles.button}
      >
        {props.loading ? <Spinner color="blue" /> : <Icon name="search" />}
      </Button>
    </Item>
  );
};

export default SearchField;

const styles = StyleSheet.create({
  button: {
    width: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
