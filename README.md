
# Let's Chat

A simple React Native Chat App



## Set up development environment

Install Expo Command Line Interface (CLI)

```bash
npm install expo-cli --global
```

## Creating new projects

Create projects (expo project and folder)

```bash
expo init hello-world
```

## Running

```bash
expo start
```

Press "i" for iOS simulator, "a" for android simulator and scan the QR code to run in expo on device (with expo installed)

## Setting up Simulators

For iOS, install XCode and go to "Preferences" and click "Components" to install a simulator

# Android

Install Android Studio and make sure to include "Android Virtual Device".  

# MacOS

Add the location of the Android SDK to the path

```bash
export ANDROID_SDK=/Users/myuser/Library/Android/sdk
```

Add platform-tools to “~/.bash_profile”, 

```bash
export PATH=/Users/myuser/Library/Android/sdk/platform-tools:$PATH
```

Go to "Configure" and select "AVD Manager" and "Crete Virtual Device" to download an emulator

## Set up Firestore

Install Firebase

```bash
npm install --save firebase@7.9.0
```

## Dependencies

```bash
{
  "expo": {
    "name": "lets-chat",
    "slug": "lets-chat",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

