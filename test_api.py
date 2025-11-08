"""
Test script for Period Predictor API
Run this to verify the backend is working correctly
"""

import requests
import json
from datetime import datetime

API_URL = "http://localhost:8000"

def test_health_check():
    """Test the health check endpoint"""
    print("\n🔍 Testing Health Check Endpoint...")
    try:
        response = requests.get(f"{API_URL}/")
        if response.status_code == 200:
            print(f"✅ Health check passed: {response.json()}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_prediction():
    """Test the prediction endpoint"""
    print("\n🔍 Testing Prediction Endpoint...")
    
    # Test data
    test_data = {
        "past_starts": [
            "2025-07-01",
            "2025-07-29",
            "2025-08-27",
            "2025-09-25",
            "2025-10-23"
        ],
        "lookback": 6
    }
    
    print(f"📤 Sending test data: {json.dumps(test_data, indent=2)}")
    
    try:
        response = requests.post(
            f"{API_URL}/predict",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            result = response.json()
            print("\n✅ Prediction successful!")
            print(f"\n📊 Results:")
            print(f"   • Predicted Date: {result['predicted_date']}")
            print(f"   • Mean Cycle: {result['mean_cycle']} days")
            print(f"   • Std Dev: {result['std_dev']} days")
            print(f"   • Confidence Interval: {result['ci_lower']} to {result['ci_upper']}")
            print(f"   • Fertile Window: {result['fertile_window_start']} to {result['fertile_window_end']}")
            if result.get('note'):
                print(f"   • Note: {result['note']}")
            return True
        else:
            print(f"❌ Prediction failed: {response.status_code}")
            print(f"   Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_single_date():
    """Test with single date (edge case)"""
    print("\n🔍 Testing Single Date Edge Case...")
    
    test_data = {
        "past_starts": ["2025-10-01"],
        "lookback": 6
    }
    
    try:
        response = requests.post(
            f"{API_URL}/predict",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Single date test passed!")
            print(f"   • Predicted Date: {result['predicted_date']}")
            print(f"   • Mean Cycle: {result['mean_cycle']} days (should be 28.0)")
            if result.get('note'):
                print(f"   • Note: {result['note']}")
            return True
        else:
            print(f"❌ Single date test failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_invalid_date():
    """Test with invalid date format"""
    print("\n🔍 Testing Invalid Date Format...")
    
    test_data = {
        "past_starts": ["2025-13-45", "invalid-date"],
        "lookback": 6
    }
    
    try:
        response = requests.post(
            f"{API_URL}/predict",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 400:
            print("✅ Invalid date handling works correctly!")
            print(f"   • Error message: {response.json()['detail']}")
            return True
        else:
            print(f"⚠️ Expected 400 error, got: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    print("=" * 60)
    print("🌸 Hayya.AI Period Predictor - API Test Suite")
    print("=" * 60)
    
    print("\n📝 Make sure the server is running on http://localhost:8000")
    print("   Run: python app.py")
    
    input("\nPress Enter to start tests...")
    
    # Run tests
    results = []
    results.append(("Health Check", test_health_check()))
    results.append(("Standard Prediction", test_prediction()))
    results.append(("Single Date Edge Case", test_single_date()))
    results.append(("Invalid Date Handling", test_invalid_date()))
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 Test Summary")
    print("=" * 60)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{status} - {test_name}")
    
    print("\n" + "-" * 60)
    print(f"Total: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n🎉 All tests passed! The API is working correctly.")
    else:
        print(f"\n⚠️ {total - passed} test(s) failed. Check the errors above.")
    
    print("=" * 60)

if __name__ == "__main__":
    main()
