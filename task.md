Project type: React Native + Expo (managed workflow, JS)
Goal: Pre-build the folder structure and blank screens only, no business logic, no API, no navigation logic beyond placeholders
Requirements:
Create the following screens as blank functional components with proper naming:
HomeScreen (tab navigation root)
LoginScreen
RegisterScreen
ForgotPasswordScreen
HomeScreen should be set up as a Tab Navigator container, but tabs can be blank for now.
Include one stack inside HomeScreen tab as a placeholder (StackNavigator)
Export each screen as default from its own file under src/screens/
Keep the structure clean and ready for expansion:
src/
  navigation/
  screens/
    HomeScreen.js
    LoginScreen.js
    RegisterScreen.js
    ForgotPasswordScreen.js
  components/
No logic, no hooks, no state, no API calls, no auth checks — only blank screens
Include necessary imports for React, React Native, and React Navigation placeholders (NavigationContainer, createNativeStackNavigator, createBottomTabNavigator)
Use JavaScript, functional components, clean code, consistent formatting
Provide only the files and folder structure ready for development