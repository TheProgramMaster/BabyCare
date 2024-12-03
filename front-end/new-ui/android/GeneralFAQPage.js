/* eslint-disable */
import * as React from 'react';
import { ScrollView, View, StyleSheet, Image, Pressable} from 'react-native';
import { Text } from 'react-native-paper';
import PregnantWoman from './assets/pregnant-woman.jpg';


const BulletPoint = ({ item }) => {
    return (
        <Text style={StyleSheet.listItem}>
            <Text style={styles.bulletPoint}>• </Text>
            <Text>{item}</Text>
        </Text>
    );
};

const GeneralFAQPage = () => {
    const fact1 = "General Information for undergoing pregnancies. This includes trimester schedule, pregnancy symptoms, baby shower, etc.";
    const fact2 = "Introduction to pregnancy.";
    const fact3 = "Week by week schedule for OBGYN visits.";
    const fact4 = "Nutrition Information.";
    const items = [fact1,fact2,fact3,fact4];
    return (
        <ScrollView style = {styles.container}>
            <h1>General Information Page</h1>
            <p>This is the generation Information page for 
                pregnant women and new mothers who make use of our website!
            </p>
            <p>
                In the following sections and links on this page, we have pages
                and videos that explore the following topics:
            </p>
            {items.map((item, index) => (
                <BulletPoint key={index} item={item} />
            ))}
            <hr></hr>
            <h2>General Information</h2>
            <p>Pregnancy is a deeply personal life transition for many that involves various
                stages of preparation for infant development. Women and others undergoing this
                process must maintain a variety of information in keeping with their needs
                (e.g. trimester schedule, tracking pregnancy symptoms, maintaining health,
                ensuring access to maternal clothes, etc.), as well as potentially participating
                in a wealth of social events, such as baby showers. For all of this information
                and more, go to the following link from Baby Link to find many tips on preparing
                for your newest life development!
            </p>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonPressed,
                ]}
                onPress={() => {
                    window.open('https://www.babylist.com/hello-baby/pregnancy', '_blank');
                }}
                >
                    <Text style={styles.buttonText}>Baby Link</Text>
                </Pressable>
            <Image 
                source={require('./assets/pregnant-woman.jpg')}
                alt="Happy New Mother"
                style={styles.imageStyle}
            />
            <hr></hr>
            <h2>Introduction to Pregnancy</h2>
            <p>When first discovering one is pregnant, a little anxiety and
                uncertainty is to be expected. To assure your confidence, we
                have provided the following advice and guidance of Bridget Taylor,
                noted Childbirth Educator! Follow along through her Youtube tutorial
                videos for advice when you have one on the way!
            </p>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonPressed,
                ]}
                onPress = {() => {
                    window.open('https://www.youtube.com/@BridgetTeyler/playlists', '_blank');
                }}>
                    <Text style={styles.buttonText}>Bridget Taylor YouTube Playlist</Text>
                </Pressable>
            <Image 
                source={require('./assets/Bridget-Taylor.jpg')}
                alt="Bridget Taylor Picture"
                style={styles.imageStyle}
                />
            <hr></hr>
            <h2>Week By Week OBYGN Visit Schedule</h2>
            <p>When keeping track of progress on your journey through pregnancy, you may
                need consultation of a reproductive healthcare professional, especially 
                an OBGYN official. In doing so, we have provided the following YouTube
                playlist of The Doctor Bjorkman, an OBGYN official and a pediatrician
                who undergo a mutual pregnancy of their own throughout the YouTube 
                playlist series.
            </p>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonPressed,
                ]}
                onPress = {() => {
                    window.open('https://www.youtube.com/@TheDoctorsBjorkman/playlists', '_blank');
                }}>
                    <Text style={styles.buttonText}>The Doctor Bjorkman YouTube Playlist</Text>
                </Pressable>
            <Image
                source={require('./assets/the-doctors-bjorkman.jpg')}
                alt="The Doctor's Bjorkman"
                style={styles.imageStyle}
                />
            <hr></hr>
            <h2>Nutrition Information</h2>
            <p>As you undergo pregnancy, you will need to maintain a healthy diet
                throughout this life-changing journey. To grant quality advice on
                this topic, we have provided the following YouTube playlist series
                of Nikole, self-labeled 'Health Nut', who maintains an online cookbook
                of potential healthy recipes of her own.
            </p>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonPressed,
                ]}
                onPress = {() => {
                    window.open('https://www.youtube.com/@HealthNutNutrition/playlists', '_blank');
                }}>
                <Text style={styles.buttonText}>Health Nut YouTube Playlist</Text>
            </Pressable>
            <Image
                source={require('./assets/health-nut.jpg')}
                alt="The Health Nut"
                style={styles.imageStyle}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    listItem: {
        fontSize: 20,
        marginBottom: 10,
    },
    bulletPoint: {
        fontSize: 20,
    },
    imageStyle: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#0056b3',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonPressed: {
        backgroundColor: '#0056b3',
        borderColor: '#003f7f',
    },
});

export default GeneralFAQPage;
