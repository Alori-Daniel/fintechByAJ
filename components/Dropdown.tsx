import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as DropdownMenu from "zeego/dropdown-menu";
import RoundBtn from "./RoundBtn";

const Dropdown = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <RoundBtn
          icon={"ellipsis-horizontal"}
          text={"More"}
          onPress={() => ""}
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item key="statement">
          <DropdownMenu.ItemTitle>Statement</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon
            ios={{ name: "list.bullet.below.rectangle", pointSize: 24 }}
            androidIconName="ic_menu_today"
          />
        </DropdownMenu.Item>
        <DropdownMenu.Item key="converter">
          <DropdownMenu.ItemTitle>Converter</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon
            ios={{ name: "coloncurrencysign.arrow.circlepath", pointSize: 24 }}
            androidIconName="ic_input_add"
          />
        </DropdownMenu.Item>
        <DropdownMenu.Item key="background">
          <DropdownMenu.ItemTitle>background</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon
            ios={{ name: "photo.fill", pointSize: 24 }}
            androidIconName="ic_dialog_map"
          />
        </DropdownMenu.Item>
        <DropdownMenu.Item key="account">
          <DropdownMenu.ItemTitle>Account</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon
            ios={{ name: "plus.rectangle.fill.on.folder.fill", pointSize: 24 }}
            androidIconName="ic_menu_info_details"
          />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Dropdown;

const styles = StyleSheet.create({});
