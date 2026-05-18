import type { CapacitorConfig } from "@capacitor/cli";

// TODO: replace appId and appName with real values before publishing.
const config: CapacitorConfig = {
  appId: "com.example.psi.website",
  appName: "PSI",
  webDir: "dist",
  backgroundColor: "#f3eadc",
  ios: {
    contentInset: "always",
  },
  android: {
    allowMixedContent: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 800,
      backgroundColor: "#f3eadc",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
    },
    StatusBar: {
      style: "LIGHT",
      backgroundColor: "#f3eadc",
    },
  },
};

export default config;
