// Appointments.tsx
import { StyleSheet, Platform, TouchableOpacity, Image, ScrollView, View, Button, Text } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import DateTimePicker from '@react-native-community/datetimepicker';

// Define doctor type
interface Doctor {
  id: number;
  name: string;
  specialty: string;
  availableTimes: string[];
  imageUrl: string;
}

// Update doctors data with 3 time slots each
const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    specialty: "Pediatrician",
    availableTimes: ["9:00 AM", "10:00 AM", "11:00 AM"],
    imageUrl: require("@/assets/images/react-logo.png")
  },
  {
    id: 2,
    name: "Dr. Michael Wang", 
    specialty: "Child Development Specialist",
    availableTimes: ["1:00 PM", "2:00 PM", "3:00 PM"],
    imageUrl: require("@/assets/images/react-logo.png")
  },
  {
    id: 3,
    name: "Dr. Lisa Zhang",
    specialty: "Child Nutritionist", 
    availableTimes: ["9:30 AM", "10:30 AM", "11:30 AM"],
    imageUrl: require("@/assets/images/react-logo.png")
  }
];

interface TimeSlotProps {
  time: string;
  isSelected: boolean;
  onSelect: () => void;
}

const TimeSlot = ({ time, isSelected, onSelect }: TimeSlotProps) => (
  <TouchableOpacity
    onPress={onSelect}
    style={[
      styles.timeSlot,
      isSelected && styles.selectedTimeSlot
    ]}
  >
    <Text style={[
      styles.timeText,
      isSelected && styles.selectedTimeText
    ]}>
      {time}
    </Text>
  </TouchableOpacity>
);


export default function AppointmentsScreen() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleBookAppointment = (doctor: Doctor, time: string) => {
    setSelectedDoctor(doctor);
    setSelectedTime(time);
    // Include date in the booking
    const formattedDate = selectedDate.toLocaleDateString();
    alert(`Appointment booked with ${doctor.name} on ${formattedDate} at ${time}`);
  };

  return (
    <ScrollView>
      <View style={{ padding: 16 }}>
        {Platform.OS === 'ios' ? (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        ) : (
          <>
            <Button 
              onPress={() => setShowDatePicker(true)}
              title={`Selected Date: ${selectedDate.toLocaleDateString()}`}
            />
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}
          </>
        )}
        
        <ThemedView style={styles.container}>
          <ThemedText type="title">Book an Appointment</ThemedText>
          
          {doctors.map((doctor) => (
            <View key={doctor.id} style={styles.doctorCard}>
              <Image source={require('doctor.jpg')} style={{ width: 60, height: 60, borderRadius: 30 }} />
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{doctor.name}</Text>
              <Text style={{ color: '#666' }}>{doctor.specialty}</Text>
              <View style={styles.timeContainer}>
                {doctor.availableTimes.map((time) => (
                  <TimeSlot
                    key={time}
                    time={time}
                    isSelected={selectedDoctor?.id === doctor.id && selectedTime === time}
                    onSelect={() => handleBookAppointment(doctor, time)}
                  />
                ))}
              </View>
            </View>
          ))}
        </ThemedView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  doctorCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  doctorInfo: {
    flex: 1,
    gap: 5,
  },
  timeSlots: {
    marginTop: 10,
    gap: 10,
  },
  timeSlot: {
    padding: 12,
    marginVertical: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    alignItems: 'center',
    width: '100%'
  },
  selectedTimeSlot: {
    backgroundColor: '#A1CEDC',
  },
  timeText: {
    fontSize: 14,
    color: '#333',
  },
  selectedTimeText: {
    color: '#fff',
  },
  timeContainer: {
    marginTop: 8,
  }
});