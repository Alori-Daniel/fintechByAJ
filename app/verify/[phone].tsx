import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput,
  Alert,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import React, { Fragment, useEffect, useState } from "react";
import {
  useSignIn,
  useSignUp,
  isClerkAPIResponseError,
  useAuth,
} from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Colors from "@/constants/Colors";

const CELL_COUNT = 6;

const Page = () => {
  const { email, signin } = useLocalSearchParams<{
    email: string;
    signin: string;
  }>();
  const [code, setCode] = useState("");
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (code.length === 6) {
      if (signin === "true") {
        verifySignIn();
      } else {
        verifyCode();
      }
    }
  }, [code]);
  const router = useRouter();
  useEffect(() => {
    if (isSignedIn) {
      console.log(isSignedIn);
      // Replace with your protected route
    }
  }, [isSignedIn]);

  const verifyCode = async () => {
    try {
      const signUpAttempt = await signUp!.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status === "complete") {
        await setActive!({ session: signUpAttempt.createdSessionId });
        router.replace("/(authenticated)/(tabs)/home");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.log("error", JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].message);
      }
    }
  };

  const verifySignIn = async () => {
    try {
      await signIn!.attemptFirstFactor({
        strategy: "email_code",
        code,
      });
      await setActive!({ session: signIn!.createdSessionId });
    } catch (err) {
      console.log("error", JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].message);
      }
    }
  };
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>6-digit code</Text>
      <Text style={defaultStyles.descriptionText}>
        Code sent to {email} unless you already have an account
      </Text>

      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={
          Platform.select({
            android: "sms-otp",
            default: "one-time-code",
          }) as "sms-otp" | "one-time-code"
        }
        testID="my-code-input"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              <Text style={styles.cellText}>
                {" "}
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
            {index === 2 ? (
              <View key={`separator-${index}`} style={styles.separator} />
            ) : (
              ""
            )}
          </Fragment>
        )}
      />

      <Link href={"/login"} replace asChild>
        <TouchableOpacity>
          <Text style={[defaultStyles.textLink]}>
            Already have an account? Log In
          </Text>
        </TouchableOpacity>
      </Link>
      <Text style={{ marginTop: 20 }}>
        Authentication Status: {isSignedIn ? "Signed In" : "Signed Out"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 12,
  },
  cellRoot: {
    width: 45,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
  },
  cellText: {
    color: "#000",
    fontSize: 36,
    paddingRight: 8,
  },
  focusCell: {
    paddingBottom: 8,
  },
  separator: {
    height: 2,
    width: 10,
    backgroundColor: Colors.gray,
    alignSelf: "center",
  },
});

export default Page;
