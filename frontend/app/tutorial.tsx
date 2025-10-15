import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TutorialScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>TUTORIAL</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Tutorial Content */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎮 Controls</Text>
          <Text style={styles.text}>
            • Swipe LEFT/RIGHT to change lanes{' \n'}
            • Swipe UP to jump over obstacles{' \n'}
            • Swipe DOWN to slide under barriers
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Objective</Text>
          <Text style={styles.text}>
            Survive as long as possible and maximize your score! Dodge obstacles, collect coins, and use cards strategically.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🃏 Cards</Text>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>🔥 Fire Card</Text>
            <Text style={styles.cardDesc}>Destroys obstacles and defeats enemies</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>🛡️ Shield Card</Text>
            <Text style={styles.cardDesc}>Protects you from one hit</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>❄️ Ice Card (Coming Soon)</Text>
            <Text style={styles.cardDesc}>Slows down time temporarily</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>⚡ Lightning Card (Coming Soon)</Text>
            <Text style={styles.cardDesc}>Chain damage + speed boost</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📦 Card Packs</Text>
          <Text style={styles.text}>
            Collect Card Packs during runs to gain random cards. Cards are added to your collection and can be upgraded in the Workshop.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔨 Workshop</Text>
          <Text style={styles.text}>
            Merge identical cards with Gold to upgrade them:{' \n'}
            • 2x Level 1 Cards + 100 Gold = Level 2{' \n'}
            • 2x Level 2 Cards + 500 Gold = Level 3
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💰 Currency</Text>
          <Text style={styles.text}>
            Collect coins during runs to earn Gold. Use Gold to upgrade your cards in the Workshop.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#0f172a',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4ade80',
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4ade80',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#94a3b8',
    lineHeight: 24,
  },
  cardInfo: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: '#94a3b8',
  },
});