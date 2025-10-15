#!/usr/bin/env python3
"""
Card Runner Game Backend API Test Suite
Tests all game-related endpoints for the Card Runner mobile game
"""

import requests
import json
import time
from datetime import datetime

# Get backend URL from frontend env
BACKEND_URL = "https://vibrant-lane-dash.preview.emergentagent.com/api"

def test_root_endpoint():
    """Test the root API endpoint"""
    print("🎮 Testing Root Endpoint...")
    try:
        response = requests.get(f"{BACKEND_URL}/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200 and response.json().get("message") == "Card Runner API":
            print("✅ Root endpoint working correctly")
            return True
        else:
            print("❌ Root endpoint failed")
            return False
    except Exception as e:
        print(f"❌ Root endpoint error: {e}")
        return False

def test_save_game_progress():
    """Test saving game progress"""
    print("\n💾 Testing Save Game Progress...")
    
    # Test data with realistic game values
    test_progress = {
        "device_id": "player-phoenix-2024",
        "cards": [
            {"type": "fire", "level": 2, "count": 3},
            {"type": "shield", "level": 1, "count": 2},
            {"type": "lightning", "level": 3, "count": 1}
        ],
        "gold": 1250,
        "high_score": 8500,
        "total_distance": 15000
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/game/progress",
            json=test_progress,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            result = response.json()
            if result.get("status") == "success" and result.get("message") == "Progress saved":
                print("✅ Save game progress working correctly")
                return True
        
        print("❌ Save game progress failed")
        return False
    except Exception as e:
        print(f"❌ Save game progress error: {e}")
        return False

def test_load_game_progress():
    """Test loading game progress"""
    print("\n📥 Testing Load Game Progress...")
    
    device_id = "player-phoenix-2024"
    
    try:
        response = requests.get(f"{BACKEND_URL}/game/progress/{device_id}")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            progress = response.json()
            # Check if we got the saved progress or default values
            if "cards" in progress and "gold" in progress:
                print("✅ Load game progress working correctly")
                return True
        
        print("❌ Load game progress failed")
        return False
    except Exception as e:
        print(f"❌ Load game progress error: {e}")
        return False

def test_load_nonexistent_progress():
    """Test loading progress for device that doesn't exist"""
    print("\n🔍 Testing Load Non-existent Progress...")
    
    device_id = "nonexistent-device-999"
    
    try:
        response = requests.get(f"{BACKEND_URL}/game/progress/{device_id}")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            progress = response.json()
            # Should return default values
            expected_defaults = {"cards": [], "gold": 0, "high_score": 0, "total_distance": 0}
            if progress == expected_defaults:
                print("✅ Non-existent progress returns correct defaults")
                return True
        
        print("❌ Non-existent progress handling failed")
        return False
    except Exception as e:
        print(f"❌ Non-existent progress error: {e}")
        return False

def test_save_game_session():
    """Test saving game session"""
    print("\n🏆 Testing Save Game Session...")
    
    # Test multiple sessions with different scores
    sessions = [
        {
            "device_id": "player-phoenix-2024",
            "score": 9200,
            "distance": 18500,
            "cards_collected": 7
        },
        {
            "device_id": "player-storm-2024",
            "score": 7800,
            "distance": 14200,
            "cards_collected": 5
        },
        {
            "device_id": "player-blaze-2024",
            "score": 12000,
            "distance": 22000,
            "cards_collected": 9
        }
    ]
    
    saved_sessions = []
    
    for i, session in enumerate(sessions):
        try:
            response = requests.post(
                f"{BACKEND_URL}/game/session",
                json=session,
                headers={"Content-Type": "application/json"}
            )
            print(f"Session {i+1} - Status Code: {response.status_code}")
            
            if response.status_code == 200:
                result = response.json()
                print(f"Session {i+1} - Response: {result}")
                
                # Check if response has required fields
                if all(key in result for key in ["id", "device_id", "score", "timestamp"]):
                    saved_sessions.append(result)
                    print(f"✅ Session {i+1} saved successfully")
                else:
                    print(f"❌ Session {i+1} missing required fields")
                    return False
            else:
                print(f"❌ Session {i+1} failed with status {response.status_code}")
                return False
                
            # Small delay between requests
            time.sleep(0.5)
            
        except Exception as e:
            print(f"❌ Session {i+1} error: {e}")
            return False
    
    print(f"✅ All {len(saved_sessions)} game sessions saved successfully")
    return True

def test_get_leaderboard():
    """Test getting leaderboard"""
    print("\n🏅 Testing Get Leaderboard...")
    
    try:
        response = requests.get(f"{BACKEND_URL}/game/leaderboard")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            leaderboard = response.json()
            print(f"Leaderboard entries: {len(leaderboard)}")
            
            if isinstance(leaderboard, list):
                # Check if entries are sorted by score (descending)
                if len(leaderboard) > 1:
                    scores = [entry.get("score", 0) for entry in leaderboard]
                    is_sorted = all(scores[i] >= scores[i+1] for i in range(len(scores)-1))
                    
                    if is_sorted:
                        print("✅ Leaderboard correctly sorted by score")
                        
                        # Print top 3 for verification
                        print("Top 3 scores:")
                        for i, entry in enumerate(leaderboard[:3]):
                            print(f"  {i+1}. Device: {entry.get('device_id', 'N/A')}, Score: {entry.get('score', 0)}")
                        
                        return True
                    else:
                        print("❌ Leaderboard not properly sorted")
                        return False
                else:
                    print("✅ Leaderboard working (single or no entries)")
                    return True
            else:
                print("❌ Leaderboard should return a list")
                return False
        else:
            print(f"❌ Leaderboard failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Leaderboard error: {e}")
        return False

def run_all_tests():
    """Run all backend API tests"""
    print("🚀 Starting Card Runner Backend API Tests")
    print("=" * 50)
    
    tests = [
        ("Root Endpoint", test_root_endpoint),
        ("Save Game Progress", test_save_game_progress),
        ("Load Game Progress", test_load_game_progress),
        ("Load Non-existent Progress", test_load_nonexistent_progress),
        ("Save Game Session", test_save_game_session),
        ("Get Leaderboard", test_get_leaderboard)
    ]
    
    results = {}
    
    for test_name, test_func in tests:
        print(f"\n{'='*20} {test_name} {'='*20}")
        results[test_name] = test_func()
    
    # Summary
    print("\n" + "="*50)
    print("🎯 TEST RESULTS SUMMARY")
    print("="*50)
    
    passed = 0
    total = len(tests)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All backend API tests passed!")
    else:
        print(f"⚠️  {total - passed} test(s) failed - check logs above")
    
    return results

if __name__ == "__main__":
    run_all_tests()