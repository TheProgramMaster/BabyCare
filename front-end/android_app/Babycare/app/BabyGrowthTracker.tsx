// BabyGrowthTracker.tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

interface Measurement {
  date: Date;
  weight: number;
  height: number;
  bmi: number;
}

const BabyGrowthTracker = () => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const calculateBMI = (weight: number, height: number): number => {
    // BMI = weight(kg) / (height(m))^2
    const heightInMeters = height / 100;
    return Number((weight / (heightInMeters * heightInMeters)).toFixed(2));
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setCurrentDate(selectedDate);
    }
  };

  const handleSubmit = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const bmi = calculateBMI(weightNum, heightNum);

    const newMeasurement = {
      date: currentDate,
      weight: weightNum,
      height: heightNum,
      bmi: bmi
    };
    setMeasurements([...measurements, newMeasurement]);
    setWeight('');
    setHeight('');
  };

  const renderDatePicker = () => (
    <View style={styles.datePickerContainer}>
      <ThemedText>Date: {currentDate.toLocaleDateString()}</ThemedText>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}>
        <ThemedText>Change Date</ThemedText>
      </TouchableOpacity>
      
      {showDatePicker && (
        <DateTimePicker
          value={currentDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<ThemedText style={styles.title}>Baby Growth Tracker</ThemedText>}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.form}>
          {renderDatePicker()}
          
          <TextInput
            style={styles.input}
            placeholder="Weight (kg)"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Height (cm)"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}>
            <ThemedText style={styles.buttonText}>Add Measurement</ThemedText>
          </TouchableOpacity>
        </View>

        {measurements.length > 0 && (
          <View style={styles.chartsContainer}>
            <ThemedText style={styles.chartTitle}>Weight Progress (kg)</ThemedText>
            <LineChart
              data={{
                labels: measurements.map(m => m.date.toLocaleDateString()),
                datasets: [{
                  data: measurements.map(m => m.weight)
                }]
              }}
              width={340}
              height={200}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(10, 126, 164, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16
                }
              }}
              bezier
              style={styles.chart}
            />

            <ThemedText style={styles.chartTitle}>Height Progress (cm)</ThemedText>
            <LineChart
              data={{
                labels: measurements.map(m => m.date.toLocaleDateString()),
                datasets: [{
                  data: measurements.map(m => m.height)
                }]
              }}
              width={340}
              height={200}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(161, 206, 220, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16
                }
              }}
              bezier
              style={styles.chart}
            />

            <View style={styles.bmiContainer}>
              <ThemedText style={styles.chartTitle}>Latest BMI: {measurements[measurements.length - 1]?.bmi}</ThemedText>
            </View>
          </View>
        )}
      </ScrollView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40, // Add extra padding at bottom for scrolling
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingTop: 40,
  },
  form: {
    marginBottom: 20,
  },
  datePickerContainer: {
    marginBottom: 15,
  },
  dateButton: {
    backgroundColor: '#A1CEDC',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#0a7ea4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chartsContainer: {
    marginTop: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
  bmiContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(161, 206, 220, 0.2)',
    borderRadius: 8,
  }
});

export default BabyGrowthTracker;