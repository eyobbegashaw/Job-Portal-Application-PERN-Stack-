const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all pending users
exports.getPendingUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { 
        status: 'Pending',
        userType: { not: 'admin' } // Exclude admins from pending list
      },
      select: {
        id: true,
        name: true,
        email: true,
        userType: true,
        companyName: true,
        profileImagePath: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(users);

  } catch (error) {
    console.error('Error fetching pending users:', error);
    res.status(500).json({ error: 'Failed to fetch pending users' });
  }
};

// Get all users (with filters)
exports.getAllUsers = async (req, res) => {
  try {
    const { status, userType, search } = req.query;

    const where = {};
    
    if (status) where.status = status;
    if (userType) where.userType = userType;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        userType: true,
        status: true,
        companyName: true,
        profileImagePath: true,
        createdAt: true,
        _count: {
          select: {
            jobPostings: true,
            applications: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(users);

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Approve user
exports.approveUser = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.status !== 'Pending') {
      return res.status(400).json({ 
        error: `User is already ${user.status.toLowerCase()}` 
      });
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { status: 'Approved' },
      select: {
        id: true,
        name: true,
        email: true,
        userType: true,
        status: true
      }
    });

    res.json({
      message: 'User approved successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Error approving user:', error);
    res.status(500).json({ error: 'Failed to approve user' });
  }
};

// Reject user
exports.rejectUser = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.status !== 'Pending') {
      return res.status(400).json({ 
        error: `User is already ${user.status.toLowerCase()}` 
      });
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { status: 'Rejected' },
      select: {
        id: true,
        name: true,
        email: true,
        userType: true,
        status: true
      }
    });

    res.json({
      message: 'User rejected successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Error rejecting user:', error);
    res.status(500).json({ error: 'Failed to reject user' });
  }
};

// Add admin company
exports.addCompany = async (req, res) => {
  try {
    const { name, companyId } = req.body;

    // Validate input
    if (!name || !companyId) {
      return res.status(400).json({ 
        error: 'Company name and ID are required' 
      });
    }

    // Check if company already exists
    const existing = await prisma.adminCompany.findFirst({
      where: {
        OR: [
          { name: { equals: name, mode: 'insensitive' } },
          { companyId }
        ]
      }
    });

    if (existing) {
      return res.status(400).json({ 
        error: 'Company with this name or ID already exists' 
      });
    }

    // Create company
    const company = await prisma.adminCompany.create({
      data: { 
        name, 
        companyId 
      }
    });

    res.status(201).json({
      message: 'Company added successfully',
      company
    });

  } catch (error) {
    console.error('Error adding company:', error);
    res.status(500).json({ error: 'Failed to add company' });
  }
};

// Get all admin companies
exports.getCompanies = async (req, res) => {
  try {
    const companies = await prisma.adminCompany.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    res.json(companies);

  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
};

// Delete company
exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.adminCompany.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Company deleted successfully' });

  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ error: 'Failed to delete company' });
  }
};

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      pendingUsers,
      totalJobs,
      activeJobs,
      totalApplications,
      recentUsers,
      recentJobs
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { status: 'Pending' } }),
      prisma.jobPosting.count(),
      prisma.jobPosting.count({ 
        where: { 
          isActive: true,
          deadline: { gte: new Date() }
        } 
      }),
      prisma.jobApplication.count(),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          userType: true,
          status: true,
          createdAt: true
        }
      }),
      prisma.jobPosting.findMany({
        take: 5,
        orderBy: { postedDate: 'desc' },
        include: {
          user: {
            select: {
              name: true
            }
          }
        }
      })
    ]);

    res.json({
      stats: {
        totalUsers,
        pendingUsers,
        totalJobs,
        activeJobs,
        totalApplications,
        approvalRate: totalUsers > 0 
          ? ((totalUsers - pendingUsers) / totalUsers * 100).toFixed(1)
          : 0
      },
      recentUsers,
      recentJobs
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
  }
};