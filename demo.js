const FormGuard = require('@ganiya1617/formguard-js');

console.log('='.repeat(60));
console.log('🛡️  DEMO: Testing @ganiya1617/formguard-js');
console.log('='.repeat(60));

// 1. Quick / Multi-field Validation
console.log('\n--- 1. Multi-Field Validation (FormGuard.validate) ---');
const validFormData = {
  email: 'user@example.com',
  password: 'Secret@123',
  username: 'john_doe',
};
console.log('Valid Form Data:', FormGuard.validate(validFormData));

const invalidFormData = {
  email: 'not-an-email',
  password: '',
};
console.log('Invalid Form Data:', FormGuard.validate(invalidFormData));

// 2. Schema-Based Validation
console.log('\n--- 2. Schema-Based Validation ---');
const registrationSchema = {
  email: { required: true, type: 'email' },
  password: { required: true, type: 'password', minLength: 10 },
  phone: { type: 'phone' },
  bio: { type: 'text', maxLength: 100 },
};

const userPayload = {
  email: 'alice@example.com',
  password: 'short',
  phone: '9876543210',
  bio: 'Software engineer exploring formguard-js!',
};

const schemaResult = FormGuard.validate(userPayload, registrationSchema);
console.log('Schema Validation Result:', schemaResult);

// 3. Individual Validators
console.log('\n--- 3. Individual Validators ---');
console.log('Email Valid (test@domain.com):', FormGuard.isEmail('test@domain.com'));
console.log('Email Invalid (bad-email):', FormGuard.isEmail('bad-email'));

console.log('Phone Valid (India):', FormGuard.isPhone('+919876543210', { allowCountryCode: true }));
console.log('Phone Invalid (short):', FormGuard.isPhone('12345', { required: true }));

console.log('Required Check (""):', FormGuard.isRequired(''));
console.log('Required Check ("Valid"):', FormGuard.isRequired('Valid'));

console.log('Length Check ("hi", min: 5):', FormGuard.checkLength('hi', { min: 5 }));
console.log('Length Check ("hello", min: 3, max: 10):', FormGuard.checkLength('hello', { min: 3, max: 10 }));

// 4. Password Strength & Password Check
console.log('\n--- 4. Password Strength & Rules ---');
console.log('Check Password ("Secret@123"):', FormGuard.checkPassword('Secret@123'));
console.log('Check Password ("weak"):', FormGuard.checkPassword('weak'));

console.log('Password Strength ("password"):', FormGuard.passwordStrength('password'));
console.log('Password Strength ("Secret@123"):', FormGuard.passwordStrength('Secret@123'));

// 5. Custom Rules
console.log('\n--- 5. Custom Rules (addRule & validateWith & validateField) ---');
FormGuard.addRule(
  'username',
  (value) => /^[a-zA-Z0-9_]{3,20}$/.test(value),
  'Username must be 3-20 alphanumeric characters or underscores'
);

console.log('Custom Rule ("john_doe"):', FormGuard.validateWith('john_doe', 'username'));
console.log('Custom Rule ("jo"):', FormGuard.validateWith('jo', 'username'));

const fieldResult = FormGuard.validateField('Username', 'ab', [
  { rule: 'required' },
  { rule: 'username' }
]);
console.log('validateField Result:', fieldResult);

console.log('\n' + '='.repeat(60));
console.log('✅ All features tested successfully!');
console.log('='.repeat(60));
