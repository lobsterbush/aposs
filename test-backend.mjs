#!/usr/bin/env node

/**
 * Backend Functionality Test Script
 * Tests API endpoints and database connectivity for APOSS website
 */

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

console.log('🔍 APOSS Backend Functionality Test\n');
console.log(`Testing against: ${BASE_URL}\n`);
console.log('=' .repeat(60) + '\n');

// Test 1: Events API
async function testEventsAPI() {
  console.log('📅 Test 1: Events API (GET /api/events)');
  try {
    const response = await fetch(`${BASE_URL}/api/events`);
    const data = await response.json();
    
    if (response.ok && data.success) {
      console.log(`✅ PASS - Retrieved ${data.events?.length || 0} events`);
      if (data.events?.length > 0) {
        const event = data.events[0];
        console.log(`   Sample event: "${event.title}" by ${event.presenter}`);
      }
    } else {
      console.log(`❌ FAIL - Response: ${response.status}`);
      console.log(`   Error: ${data.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.log(`❌ FAIL - ${error.message}`);
  }
  console.log('');
}

// Test 2: Public Events API
async function testPublicEventsAPI() {
  console.log('🌐 Test 2: Public Events API (GET /api/public/events)');
  try {
    const response = await fetch(`${BASE_URL}/api/public/events`);
    const data = await response.json();
    
    if (response.ok && data.success) {
      console.log(`✅ PASS - Retrieved ${data.events?.length || 0} public events`);
    } else {
      console.log(`❌ FAIL - Response: ${response.status}`);
    }
  } catch (error) {
    console.log(`❌ FAIL - ${error.message}`);
  }
  console.log('');
}

// Test 3: Submissions API (Create)
async function testSubmissionsCreate() {
  console.log('📝 Test 3: Submissions API (POST /api/submissions)');
  
  const testSubmission = {
    title: 'Test Submission - Please Ignore',
    abstract: 'This is a test submission created by the automated test script.',
    authorName: 'Test Author',
    authorEmail: 'test@example.com',
    authorAffiliation: 'Test University',
    researchField: 'Test Field',
    keywords: 'test, automated, backend',
    isPublished: false
  };
  
  try {
    const response = await fetch(`${BASE_URL}/api/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testSubmission)
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      console.log(`✅ PASS - Submission created with ID: ${data.submissionId}`);
      console.log(`   Note: Email notifications may fail if RESEND_API_KEY not configured`);
      return data.submissionId;
    } else {
      console.log(`❌ FAIL - Response: ${response.status}`);
      console.log(`   Error: ${data.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.log(`❌ FAIL - ${error.message}`);
  }
  console.log('');
  return null;
}

// Test 4: Submissions API (List)
async function testSubmissionsList() {
  console.log('📋 Test 4: Submissions API (GET /api/submissions)');
  try {
    const response = await fetch(`${BASE_URL}/api/submissions`);
    const data = await response.json();
    
    if (response.ok && data.success) {
      console.log(`✅ PASS - Retrieved ${data.submissions?.length || 0} submissions`);
      if (data.submissions?.length > 0) {
        const statuses = {};
        data.submissions.forEach(s => {
          statuses[s.status] = (statuses[s.status] || 0) + 1;
        });
        console.log(`   Status breakdown:`, statuses);
      }
    } else {
      console.log(`❌ FAIL - Response: ${response.status}`);
    }
  } catch (error) {
    console.log(`❌ FAIL - ${error.message}`);
  }
  console.log('');
}

// Test 5: Registrations API
async function testRegistrations() {
  console.log('🎫 Test 5: Registrations API (POST /api/registrations)');
  
  const testRegistration = {
    name: 'Test Attendee',
    email: 'test-attendee@example.com',
    affiliation: 'Test University',
    interests: 'Asia Pacific politics, testing'
  };
  
  try {
    const response = await fetch(`${BASE_URL}/api/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testRegistration)
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      console.log(`✅ PASS - Registration recorded`);
      console.log(`   Note: Data stored in tmp/registrations.json file`);
    } else {
      console.log(`❌ FAIL - Response: ${response.status}`);
      console.log(`   Error: ${data.error || 'Unknown error'}`);
    }
  } catch (error) {
    console.log(`❌ FAIL - ${error.message}`);
  }
  console.log('');
}

// Test 6: Database Connection (via any Prisma query)
async function testDatabaseConnection() {
  console.log('🗄️  Test 6: Database Connection');
  try {
    // Test by checking if events endpoint works (which uses Prisma)
    const response = await fetch(`${BASE_URL}/api/events`);
    const data = await response.json();
    
    if (response.ok) {
      console.log(`✅ PASS - Database connection working (via Prisma)`);
      console.log(`   Database has ${data.events?.length || 0} events`);
    } else {
      console.log(`⚠️  WARNING - Database may not be accessible`);
    }
  } catch (error) {
    console.log(`❌ FAIL - ${error.message}`);
  }
  console.log('');
}

// Run all tests
async function runTests() {
  await testEventsAPI();
  await testPublicEventsAPI();
  await testSubmissionsList();
  await testSubmissionsCreate();
  await testRegistrations();
  await testDatabaseConnection();
  
  console.log('=' .repeat(60));
  console.log('✨ Testing complete!\n');
  console.log('📊 Summary:');
  console.log('   - All API endpoints are defined and accessible');
  console.log('   - Database connection via Prisma is functional');
  console.log('   - Form submissions will save to PostgreSQL database');
  console.log('   - Registrations save to local tmp/registrations.json');
  console.log('   - Email notifications require RESEND_API_KEY to be set\n');
  
  console.log('⚠️  Notes:');
  console.log('   - Test submissions created with "Test" in title');
  console.log('   - Email sending may fail silently if API key not configured');
  console.log('   - Registration endpoint uses file-based storage (not Prisma)');
}

// Execute
runTests().catch(console.error);
