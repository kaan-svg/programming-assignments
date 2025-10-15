import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useGameStore } from '../store/gameStore';
import CardItem from '../components/CardItem';

export default function WorkshopScreen() {
  const router = useRouter();
  const { cards, gold, fuseCards, loadProgress } = useGameStore();

  useEffect(() => {
    loadProgress();
  }, []);

  const cardTypes = ['fire', 'shield', 'ice', 'lightning'];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>WORKSHOP</Text>
        <View style={styles.goldContainer}>
          <Ionicons name="logo-bitcoin" size={24} color="#fbbf24" />
          <Text style={styles.goldText}>{gold}</Text>
        </View>
      </View>

      {/* Card Collection */}
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Card Collection</Text>
        <View style={styles.cardsGrid}>
          {cardTypes.map((type) => {
            const card = cards.find((c) => c.type === type) || {
              type,
              level: 0,
              count: 0,
            };
            return (
              <CardItem
                key={type}
                card={card}
                onFuse={() => fuseCards(type)}
              />
            );
          })}
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>How to Upgrade</Text>
          <Text style={styles.instructionsText}>
            • Collect cards during runs{' \n'}
            • Merge 2 identical cards + Gold to upgrade{' \n'}
            • Level 1 → Level 2: 100 Gold{' \n'}
            • Level 2 → Level 3: 500 Gold
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
  goldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  goldText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginLeft: 4,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  instructionsContainer: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 32,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4ade80',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 24,
  },
});