import { StyleSheet, Text, View } from "react-native";

type Props = {
  timerDate: Date;
};

export const TimerCountDownDisplay: React.FC<Props> = ({ timerDate }) => {
  return (
    <View>
      <Text style={styles.timerCountDownText}>
        {timerDate.getMinutes().toString().padStart(2, "0")}:{" "}
        {timerDate.getSeconds().toString().padStart(2, "0")}{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerCountDownText: {
    fontWeight: "800",
    fontSize: 40,
    color: "#fff",
  },
});
