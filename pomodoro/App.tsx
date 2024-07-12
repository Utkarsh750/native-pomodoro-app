import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { TimerCountDownDisplay } from "./TimerCountDownDisplay";
import { TimerToggleButton } from "./TimerToggleButton";
import { TimerModeDisplay, TimerModes } from "./TimerModeDisplay";

// Define focus time and break time in minutes
const FOCUS_TIME_MINUTES = 25;
const BREAK_TIME_MINUTES = 5;

// Convert minutes to milliseconds
const FOCUS_TIME_MS = FOCUS_TIME_MINUTES * 60 * 1000;
const BREAK_TIME_MS = BREAK_TIME_MINUTES * 60 * 1000;

export default function App() {
  const [timerCount, setTimerCount] = useState<number>(FOCUS_TIME_MS);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<TimerModes>("Focus");

  useEffect(() => {
    if (timerCount === 0) {
      if (timerMode === "Focus") {
        setTimerMode("Break");
        setTimerCount(BREAK_TIME_MS);
      } else {
        setTimerMode("Focus");
        setTimerCount(FOCUS_TIME_MS);
      }
      stopTimer();
    }
  }, [timerCount]);
  const startTimer = () => {
    setIsTimerRunning(true);
    const id = setInterval(() => setTimerCount((prev) => prev - 1000), 1000);
    setTimerInterval(id);
  };

  const stopTimer = () => {
    if (timerInterval != null) {
      clearTimeout(timerInterval);
    }
    setIsTimerRunning(false);
  };

  return (
    <View
      style={{
        ...styles.container,
        ...{ backgroundColor: timerMode === "Break" ? "#2a9d8f" : "#d95550" },
      }}
    >
      <TimerModeDisplay timerMode={timerMode} />
      <StatusBar style="auto" />
      <TimerToggleButton
        isTimerRunning={isTimerRunning}
        startTimer={startTimer}
        stopTimer={stopTimer}
      />
      <TimerCountDownDisplay timerDate={new Date(timerCount)} />
      {/* <Button title="Start Timer" onPress={() => console.log("start timer")} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d95550",
    alignItems: "center",
    justifyContent: "center",
  },
});
