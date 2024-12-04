import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  View,
  Text,
  Platform,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ParallaxScrollView from '@/components/ParallaxScrollView';

interface Babysitter {
  id: string;
  name: string;
  experience: string;
  rating: number;
  hourlyRate: number;
  imageUrl: string;
}

const BabysitterCard = ({ babysitter, onSelect, selectedTime }: {
  babysitter: Babysitter;
  onSelect: (babysitter: Babysitter, time: string) => void;
  selectedTime: string | null;
}) => (
  <TouchableOpacity 
    style={styles.card}
    onPress={() => onSelect(babysitter, '14:00')}
  >
    <Image 
      source={{ uri: babysitter.imageUrl }} 
      style={styles.avatar}
    />
    <View style={styles.info}>
      <Text style={styles.name}>{babysitter.name}</Text>
      <Text>Experience: {babysitter.experience}</Text>
      <Text>Rating: {babysitter.rating}/5</Text>
      <Text>${babysitter.hourlyRate}/hour</Text>
    </View>
  </TouchableOpacity>
);

export default function FindBabysitterScreen() {
  const [selectedBabysitter, setSelectedBabysitter] = useState<Babysitter | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleBookBabysitter = (babysitter: Babysitter, time: string) => {
    setSelectedBabysitter(babysitter);
    setSelectedTime(time);
    const formattedDate = selectedDate.toLocaleDateString();
    alert(`Babysitter ${babysitter.name} booked for ${formattedDate} at ${time}`);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
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

        {/* Sample babysitters list */}
        {SAMPLE_BABYSITTERS.map((babysitter) => (
          <BabysitterCard
            key={babysitter.id}
            babysitter={babysitter}
            onSelect={handleBookBabysitter}
            selectedTime={selectedTime}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  info: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

// Sample data
const SAMPLE_BABYSITTERS: Babysitter[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    experience: '5 years',
    rating: 4.8,
    hourlyRate: 25,
    imageUrl: 'https://example.com/sarah.jpg',
  },
  {
    id: '2',
    name: 'Mike Wilson',
    experience: '3 years',
    rating: 4.5,
    hourlyRate: 22,
    imageUrl: 'https://example.com/mike.jpg',
  },
];