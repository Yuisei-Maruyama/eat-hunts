import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Stack, Link, router } from "expo-router";
import { useAuthStore } from "@/store/auth-store";
import Colors from "@/constants/colors";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    await login(email, password);

    // If login was successful, redirect to home
    if (useAuthStore.getState().isAuthenticated) {
      router.replace("/");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Login",
          headerShown: false,
        }}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400",
            }}
            style={styles.logo}
          />
          <Text style={styles.title}>Restaurant Finder</Text>
          <Text style={styles.subtitle}>
            Discover and save your favorite restaurants
          </Text>
        </View>

        <View style={styles.form}>
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
            />
          </View>

          <Pressable
            style={styles.forgotPassword}
            onPress={() => alert("Reset password functionality would go here")}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </Pressable>

          <Pressable
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.loginButtonText}>Log In</Text>
            )}
          </Pressable>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <Link href="/auth/signup" asChild>
              <Pressable>
                <Text style={styles.signupLink}>Sign Up</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>

      {/* Demo Login */}
      <View style={styles.demoContainer}>
        <Text style={styles.demoText}>For demo purposes, use:</Text>
        <Text style={styles.demoCredentials}>Email: john@example.com</Text>
        <Text style={styles.demoCredentials}>Password: password</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.lightText,
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  errorContainer: {
    backgroundColor: "#FFEBEE",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: Colors.text,
  },
  input: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    color: Colors.lightText,
    fontSize: 14,
  },
  signupLink: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  demoContainer: {
    padding: 16,
    backgroundColor: "#f2f2f2",
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  demoText: {
    fontSize: 14,
    color: Colors.lightText,
    marginBottom: 4,
    textAlign: "center",
  },
  demoCredentials: {
    fontSize: 14,
    color: Colors.text,
    textAlign: "center",
  },
});
