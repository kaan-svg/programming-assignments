import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function MenuScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>CARD RUNNER</Text>
        <Text style={styles.subtitle}>Mystical Forest</Text>
      </View>

      {/* Menu Buttons */}
      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => router.push('/game')}
        >
          <Ionicons name="play" size={32} color="#fff" />
          <Text style={styles.menuButtonText}>START RUN</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuButton, styles.secondaryButton]}
          onPress={() => router.push('/workshop')}
        >
          <Ionicons name="hammer" size={28} color="#fff" />
          <Text style={styles.menuButtonText}>WORKSHOP</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuButton, styles.secondaryButton]}
          onPress={() => router.push('/tutorial')}
        >
          <Ionicons name="help-circle" size={28} color="#fff" />
          <Text style={styles.menuButtonText}>TUTORIAL</Text>
        </TouchableOpacity>
      </View>

      {/* Forest Theme */}
      <View style={styles.decorContainer}>
        <Ionicons name="leaf" size={40} color="#4ade80" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 64,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4ade80',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    color: '#94a3b8',
    marginTop: 8,
  },
  menuContainer: {
    width: '80%',
    maxWidth: 320,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  secondaryButton: {
    backgroundColor: '#3b82f6',
  },
  menuButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 12,
  },
  decorContainer: {
    position: 'absolute',
    bottom: 48,
    opacity: 0.3,
  },
});