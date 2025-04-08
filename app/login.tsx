import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}
const Page = () => {
  const [password, setPassword] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const router = useRouter();
  const { signIn } = useSignIn();

  const onSignIn = async (type: SignInType) => {
    if (type === SignInType.Phone) {
      try {
        const email = emailAddress;
        console.log("number", email);

        const { supportedFirstFactors }: any = await signIn!.create({
          identifier: email,
          password,
        });

        const firstPhoneFactor: any = supportedFirstFactors.find(
          (factor: any) => {
            return factor.strategy === "email_code";
          }
        );
        const { emailAddressId } = firstPhoneFactor;
        await signIn!.prepareFirstFactor({
          strategy: "email_code",
          emailAddressId,
        });
        router.push({
          pathname: "/verify/[phone]",
          params: { signIn: "true" },
        });
      } catch (err) {
        console.log("error", JSON.stringify(err, null, 2));
        if (isClerkAPIResponseError(err)) {
          if (err.errors[0].code === "form_identifier_not_found") {
            Alert.alert("Error", err.errors[0].message);
          }
        }
      }
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome Back!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your phone number associated with your account
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input]}
            placeholder="Email"
            placeholderTextColor={Colors.gray}
            keyboardType="email-address"
            value={emailAddress}
            onChangeText={setEmailAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={Colors.gray}
            keyboardType="visible-password"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            emailAddress !== "" ? styles.enabled : styles.disabled,
            { marginTop: 20 },
          ]}
          onPress={() => onSignIn(SignInType.Phone)}
        >
          <Text style={defaultStyles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            marginTop: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.gray,
            }}
          ></View>
          <Text style={{ color: Colors.gray, fontSize: 20 }}>Or</Text>
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.gray,
            }}
          ></View>
        </View>
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
          onPress={() => onSignIn(SignInType.Email)}
        >
          <Ionicons name="mail" size={24} color={"#000"} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with Email
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
          onPress={() => onSignIn(SignInType.Google)}
        >
          <Ionicons name="logo-google" size={24} color={"#000"} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
          onPress={() => onSignIn(SignInType.Apple)}
        >
          <Ionicons name="logo-apple" size={24} color={"#000"} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with Apple
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: "column",
    gap: 5,
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});
export default Page;
