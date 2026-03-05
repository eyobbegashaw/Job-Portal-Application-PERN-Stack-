const { PrismaClient } = require('@prisma/client');

// Create Prisma client instance
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'info', 'warn', 'error']
    : ['error'],
  errorFormat: 'pretty',
});

// Test database connection
const testConnection = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connection established successfully');
    
    // Run a simple query to verify
    const result = await prisma.$queryRaw`SELECT 1+1 as result`;
    console.log('✅ Database query test passed');
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

// Graceful shutdown
const disconnect = async () => {
  await prisma.$disconnect();
  console.log('Database connection closed');
};

// Handle connection errors
prisma.$on('error', (e) => {
  console.error('Prisma Client error:', e);
});

module.exports = {
  prisma,
  testConnection,
  disconnect
};