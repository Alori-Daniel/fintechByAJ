import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { useSignUp } from "@clerk/clerk-expo";

const Page = () => {
  const [password, setPassword] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const router = useRouter();
  const { signUp } = useSignUp();

  const onSignup = async () => {
    const email = emailAddress;
    try {
      await signUp!.create({
        emailAddress: emailAddress,
        password,
      });
      await signUp!.prepareEmailAddressVerification({ strategy: "email_code" });
      router.push({
        pathname: "/verify/[phone]",
        params: { email: emailAddress },
      });
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your email address. We will send a confirmation code there
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input]}
            placeholder="Email Address"
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

        <Link href={"/login"} replace asChild>
          <TouchableOpacity>
            <Text style={defaultStyles.textLink}>
              Already have an account? Log In
            </Text>
          </TouchableOpacity>
        </Link>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            emailAddress !== "" ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ]}
          onPress={onSignup}
        >
          <Text style={defaultStyles.buttonText}>Sign Up</Text>
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
