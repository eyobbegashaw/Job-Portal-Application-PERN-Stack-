const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all active jobs
exports.getActiveJobs = async (req, res) => {
  try {
    const { search, location, jobType, minSalary, maxSalary } = req.query;

    // Build filter conditions
    const where = {
      deadline: {
        gte: new Date()
      },
      isActive: true
    };

    // Add search filter
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { companyName: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Add location filter
    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    // Add job type filter
    if (jobType) {
      where.jobType = jobType;
    }

    // Add salary range filter (simplified - you might want more sophisticated parsing)
    if (minSalary || maxSalary) {
      // This is a simplified approach - adjust based on your salary format
      where.salaryRange = { not: null };
    }

    const jobs = await prisma.jobPosting.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profileImagePath: true
          }
        },
        _count: {
          select: {
            applications: true
          }
        }
      },
      orderBy: {
        postedDate: 'desc'
      }
    });

    res.json(jobs);

  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

// Get job by ID
exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.jobPosting.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profileImagePath: true
          }
        },
        applications: {
          select: {
            id: true,
            status: true,
            appliedDate: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                profileImagePath: true
              }
            }
          }
        }
      }
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(job);

  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
};

// Get jobs by company
exports.getJobsByCompany = async (req, res) => {
  try {
    const { companyName } = req.params;

    const jobs = await prisma.jobPosting.findMany({
      where: {
        companyName: {
          equals: companyName,
          mode: 'insensitive'
        },
        isActive: true
      },
      orderBy: {
        postedDate: 'desc'
      }
    });

    res.json(jobs);

  } catch (error) {
    console.error('Error fetching company jobs:', error);
    res.status(500).json({ error: 'Failed to fetch company jobs' });
  }
};

// Create new job posting
exports.createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      jobType,
      vacancies,
      qualifications,
      skills,
      experience,
      salaryRange,
      deadline,
      location,
      method,
      companyName
    } = req.body;

    // Validate required fields
    const requiredFields = {
      title, description, jobType, vacancies, qualifications,
      skills, experience, deadline, location, method, companyName
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Create job posting
    const job = await prisma.jobPosting.create({
      data: {
        title,
        description,
        jobType,
        vacancies: parseInt(vacancies),
        qualifications,
        skills,
        experience: parseInt(experience),
        salaryRange: salaryRange || null,
        deadline: new Date(deadline),
        location,
        method,
        companyName,
        userId: req.user.id,
        logoFilePath: req.file ? `/uploads/logos/${req.file.filename}` : null
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Job posted successfully',
      job
    });

  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Failed to create job posting' });
  }
};

// Update job posting
exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if job exists and user owns it
    const existingJob = await prisma.jobPosting.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingJob) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (existingJob.userId !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update this job' });
    }

    // Update job
    const job = await prisma.jobPosting.update({
      where: { id: parseInt(id) },
      data: {
        ...updateData,
        ...(updateData.vacancies && { vacancies: parseInt(updateData.vacancies) }),
        ...(updateData.experience && { experience: parseInt(updateData.experience) }),
        ...(updateData.deadline && { deadline: new Date(updateData.deadline) }),
        ...(req.file && { logoFilePath: `/uploads/logos/${req.file.filename}` })
      }
    });

    res.json({
      message: 'Job updated successfully',
      job
    });

  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
};

// Delete job (soft delete)
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if job exists
    const job = await prisma.jobPosting.findUnique({
      where: { id: parseInt(id) }
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check authorization
    if (job.userId !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this job' });
    }

    // Soft delete
    await prisma.jobPosting.update({
      where: { id: parseInt(id) },
      data: { isActive: false }
    });

    res.json({ message: 'Job deleted successfully' });

  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
};

// Save job for user
exports.saveJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check if job exists
    const job = await prisma.jobPosting.findUnique({
      where: { id: parseInt(jobId) }
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if already saved
    const existingSave = await prisma.savedJob.findUnique({
      where: {
        userId_jobId: {
          userId: req.user.id,
          jobId: parseInt(jobId)
        }
      }
    });

    if (existingSave) {
      return res.status(400).json({ error: 'Job already saved' });
    }

    // Save job
    const savedJob = await prisma.savedJob.create({
      data: {
        userId: req.user.id,
        jobId: parseInt(jobId)
      },
      include: {
        job: true
      }
    });

    res.status(201).json({
      message: 'Job saved successfully',
      savedJob
    });

  } catch (error) {
    console.error('Error saving job:', error);
    res.status(500).json({ error: 'Failed to save job' });
  }
};

// Remove saved job
exports.unsaveJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    await prisma.savedJob.delete({
      where: {
        userId_jobId: {
          userId: req.user.id,
          jobId: parseInt(jobId)
        }
      }
    });

    res.json({ message: 'Job removed from saved' });

  } catch (error) {
    console.error('Error removing saved job:', error);
    res.status(500).json({ error: 'Failed to remove saved job' });
  }
};

// Get user's saved jobs
exports.getSavedJobs = async (req, res) => {
  try {
    const savedJobs = await prisma.savedJob.findMany({
      where: { userId: req.user.id },
      include: {
        job: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                profileImagePath: true
              }
            },
            _count: {
              select: {
                applications: true
              }
            }
          }
        }
      },
      orderBy: {
        savedDate: 'desc'
      }
    });

    res.json(savedJobs);

  } catch (error) {
    console.error('Error fetching saved jobs:', error);
    res.status(500).json({ error: 'Failed to fetch saved jobs' });
  }
};

// Apply for job
exports.applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applicationData = req.body;

    // Check if job exists and is active
    const job = await prisma.jobPosting.findUnique({
      where: { id: parseInt(jobId) }
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (!job.isActive || new Date(job.deadline) < new Date()) {
      return res.status(400).json({ error: 'This job is no longer accepting applications' });
    }

    // Check if already applied
    const existingApplication = await prisma.jobApplication.findUnique({
      where: {
        jobId_userId: {
          jobId: parseInt(jobId),
          userId: req.user.id
        }
      }
    });

    if (existingApplication) {
      return res.status(400).json({ error: 'You have already applied for this job' });
    }

    // Create application
    const application = await prisma.jobApplication.create({
      data: {
        jobId: parseInt(jobId),
        userId: req.user.id,
        status: 'pending',
        ...applicationData
      },
      include: {
        job: {
          select: {
            title: true,
            companyName: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Application submitted successfully',
      application
    });

  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
};

// Get job applications (for company/ admin)
exports.getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check if job exists and user has access
    const job = await prisma.jobPosting.findUnique({
      where: { id: parseInt(jobId) }
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check authorization
    if (job.userId !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to view these applications' });
    }

    const applications = await prisma.jobApplication.findMany({
      where: { jobId: parseInt(jobId) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profileImagePath: true
          }
        }
      },
      orderBy: {
        appliedDate: 'desc'
      }
    });

    res.json(applications);

  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};

// Update application status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'reviewed', 'accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const application = await prisma.jobApplication.findUnique({
      where: { id: parseInt(applicationId) },
      include: {
        job: true
      }
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Check authorization
    if (application.job.userId !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update this application' });
    }

    const updated = await prisma.jobApplication.update({
      where: { id: parseInt(applicationId) },
      data: { status }
    });

    res.json({
      message: 'Application status updated',
      application: updated
    });

  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ error: 'Failed to update application' });
  }
};