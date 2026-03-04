import React from "react";
import {
  Text,
  StyleSheet,
  Alert,
  Pressable,
  View,
  StatusBar,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native";
import { router } from "expo-router";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    Alert.alert("Login Data", JSON.stringify(data));
    router.replace("/");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right"]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={
          Platform.OS === "android" ? "#f3f4f6" : undefined
        }
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Login</Text>

        <Pressable style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
      </View>

      {/* Form Content */}
      <View style={styles.formContainer}>
        {/* Email */}
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required !",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.email && (
                <Text style={styles.error}>
                  {errors.email.message}
                </Text>
              )}
            </View>
          )}
        />

        {/* Password */}
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Minimum 3 characters",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.password && (
                <Text style={styles.error}>
                  {errors.password.message}
                </Text>
              )}
            </View>
          )}
        />

        {/* Button */}
        <Pressable
          onPress={handleSubmit(onSubmit)}
          style={({ pressed }) => [
            styles.button,
            pressed && { opacity: 0.8 },
          ]}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },

  /* Header */
  header: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  backButton: {
    position: "absolute",
    left: 16,
    padding: 8,
  },
  backText: {
    fontSize: 24,
    fontWeight: "600",
  },

  /* Form */
  formContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  inputWrapper: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  error: {
    color: "red",
    marginTop: 6,
    fontSize: 12,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
});